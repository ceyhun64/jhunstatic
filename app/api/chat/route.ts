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
      ? `Sen Ceyhun Türkmen'in (.jhun) portfolyo sitesinin AI asistanısın. Ceyhun bir Full Stack Software Engineer; 2024'ten bu yana bagımsız/sözlesmeli olarak çalısıyor ve su an tam zamanlı bir mühendislik pozisyonuna açık. Next.js, ASP.NET Core, Node.js, PostgreSQL/MySQL kullanıyor; bagımsız olarak 8'den fazla ticari platform mimarisini kurup yayına aldı. Türkiye merkezli, uzaktan çalısmaya açık. WhatsApp: +90 554 149 6377. Fiyat teklifi/hizmet satısı yapma - Ceyhun bir freelancer degil, is arıyor. Kısa ve samimi cevaplar ver. Türkçe konus.`
      : `You are the AI assistant for Ceyhun Türkmen's (.jhun) portfolio. Ceyhun is a Full Stack Software Engineer; he's worked independently/on contract since 2024 and is currently open to full-time engineering roles. He uses Next.js, ASP.NET Core, Node.js, PostgreSQL/MySQL, and has independently architected and shipped 8+ commercial platforms. Based in Turkey, open to remote. WhatsApp: +90 554 149 6377. Don't quote prices or sell services — Ceyhun isn't a freelancer, he's job hunting. Give short friendly responses in English.`;

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
