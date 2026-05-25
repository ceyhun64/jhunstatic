export const runtime = "nodejs";
import nodemailer from "nodemailer";
import { rateLimit, getRateLimitHeaders } from "@/lib/rate-limit";
import { z } from "zod";

const ADMIN_EMAIL = process.env.EMAIL_USER ?? "";

const MAIL_RATE_LIMIT = { windowMs: 60 * 1000, max: 3 };

const bodySchema = z.object({
  subject: z.string().min(1).max(200),
  message: z.string().min(1).max(5000),
});

export async function POST(req: Request): Promise<Response> {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (!rateLimit(`mail:${ip}`, MAIL_RATE_LIMIT)) {
    return new Response(
      JSON.stringify({ error: "Çok fazla istek. Lütfen bir dakika bekleyin." }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          ...getRateLimitHeaders(`mail:${ip}`, MAIL_RATE_LIMIT),
        },
      },
    );
  }

  if (!ADMIN_EMAIL) {
    console.error("EMAIL_USER environment variable is not set");
    return new Response(JSON.stringify({ error: "Sunucu yapılandırma hatası" }), {
      status: 500,
    });
  }

  let body: z.infer<typeof bodySchema>;
  try {
    const raw = await req.json();
    body = bodySchema.parse(raw);
  } catch {
    return new Response(
      JSON.stringify({ error: "Geçersiz istek verisi" }),
      { status: 400 },
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: Number(process.env.EMAIL_PORT) === 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: ADMIN_EMAIL,
      to: ADMIN_EMAIL,
      subject: body.subject,
      text: body.message,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Mail gönderim hatası:", err);
    return new Response(JSON.stringify({ error: "Mail gönderilemedi." }), {
      status: 500,
    });
  }
}
