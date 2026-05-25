import Anthropic from "@anthropic-ai/sdk";
import type { MessageParam } from "@anthropic-ai/sdk/resources/messages";
import { NextRequest, NextResponse } from "next/server";
import { rateLimit, getRateLimitHeaders } from "@/lib/rate-limit";
import { z } from "zod";

const CHAT_RATE_LIMIT = { windowMs: 60 * 1000, max: 20 };

const bodySchema = z.object({
  message: z.string().min(1).max(2000),
  locale: z.enum(["tr", "en"]).default("tr"),
  context: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string(),
      }),
    )
    .max(12)
    .default([]),
});

if (!process.env.ANTHROPIC_API_KEY) {
  throw new Error("ANTHROPIC_API_KEY is not set");
}

const client = new Anthropic();

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (!rateLimit(`chat:${ip}`, CHAT_RATE_LIMIT)) {
    return NextResponse.json(
      { error: "Çok fazla istek. Lütfen bir dakika bekleyin." },
      {
        status: 429,
        headers: getRateLimitHeaders(`chat:${ip}`, CHAT_RATE_LIMIT),
      },
    );
  }

  let body: z.infer<typeof bodySchema>;
  try {
    const raw = await req.json();
    body = bodySchema.parse(raw);
  } catch {
    return NextResponse.json(
      { error: "Geçersiz istek verisi" },
      { status: 400 },
    );
  }

  const { message, locale, context } = body;

  const systemPrompt =
    locale === "tr"
      ? `Sen Ceyhun Türkmen'in (.jhun) portfolyo sitesinin AI asistanısın. Full-Stack Web gelistirici, 5+ yıl deneyim. React, Next.js, TypeScript, Tailwind CSS kullanıyor. Usak/Türkiye merkezli, uzaktan çalısıyor. WhatsApp: +90 554 149 6377. Kısa ve samimi cevaplar ver. Türkçe konus.`
      : `You are AI assistant for Ceyhun Türkmen's (.jhun) portfolio. Full-Stack developer, 5+ years experience. Uses React, Next.js, TypeScript, Tailwind CSS. Based in Usak, Turkey. Works remotely. Give short friendly responses in English.`;

  const messages: MessageParam[] = [
    ...context.slice(-6).map((msg) => ({
      role: msg.role,
      content: msg.content,
    })),
    { role: "user", content: message },
  ];

  try {
    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 500,
      system: systemPrompt,
      messages,
    });

    const firstBlock = response.content[0];
    const text = firstBlock?.type === "text" ? firstBlock.text : "";

    return NextResponse.json({ response: text });
  } catch (error) {
    console.error("Anthropic error:", error);
    return NextResponse.json({ error: "API hatası" }, { status: 500 });
  }
}
