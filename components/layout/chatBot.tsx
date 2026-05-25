"use client";
import { useState, useEffect, useRef } from "react";
import {
  MessageCircle,
  X,
  Send,
  Minimize2,
  Trash2,
  BarChart3,
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface LearnedResponse {
  question: string;
  answer: string;
  variations: string[];
  useCount: number;
  confidence: number;
  createdAt: string;
  lastUsed: string;
}

interface Conversation {
  question: string;
  answer: string;
  timestamp: string;
  context: string[];
}

export default function PortfolioChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [conversationContext, setConversationContext] = useState<string[]>([]);
  const [showStats, setShowStats] = useState(false);
  const [stats, setStats] = useState({
    learned: 0,
    conversations: 0,
    confidence: 0,
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Otomatik scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Storage'dan istatistikleri yükle
  useEffect(() => {
    const loadStats = async () => {
      try {
        const learnedResult = await window.storage.get("learned_responses");
        const conversationsResult = await window.storage.get("conversations");

        const learned = learnedResult ? JSON.parse(learnedResult.value) : [];
        const conversations = conversationsResult
          ? JSON.parse(conversationsResult.value)
          : [];

        const avgConfidence =
          learned.length > 0
            ? learned.reduce(
                (sum: number, item: LearnedResponse) => sum + item.confidence,
                0,
              ) / learned.length
            : 0;

        setStats({
          learned: learned.length,
          conversations: conversations.length,
          confidence: Math.round(avgConfidence * 100),
        });
      } catch (error) {
        console.log("Istatistikler yükleniyor...");
      }
    };

    if (isOpen) {
      loadStats();
    }
  }, [isOpen, messages]);

  // Karsılama mesajı
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        setMessages([
          {
            role: "assistant",
            content:
              "Merhaba! Ben Ceyhun'un Akıllı Asistanıyım! 👋\n\nSizinle her konusmadan ögreniyor ve gelisiyorum. Web gelistirme projeleri, fiyatlandırma, teknolojiler ve daha fazlası hakkında sorularınızı yanıtlayabilirim.\n\nNasıl yardımcı olabilirim?",
            timestamp: new Date(),
          },
        ]);
      }, 500);
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const userInput = input.trim();
    setInput("");
    setIsLoading(true);
    setIsTyping(true);

    // Konusma baglamını güncelle
    setConversationContext((prev) => [...prev.slice(-5), userInput]);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Akıllı yanıt üret
      const response = await generateSmartResponse(userInput);

      const assistantMessage: Message = {
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Konusmayı kaydet ve ögren
      await saveConversation(userInput, response);
    } catch (error) {
      console.error("Mesaj gönderme hatası:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Üzgünüm, bir hata olustu. Lütfen tekrar deneyin.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  // Akıllı yanıt üretme sistemi
  const generateSmartResponse = async (userInput: string): Promise<string> => {
    const input = userInput.toLowerCase();

    // 1. Ögrenilmis cevaplara bak
    const learned = await findLearnedResponse(input);
    if (learned) return `🧠 ${learned}`;

    // 2. Direkt API'ye sor - keyword kontrolü YOK
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: userInput,
        locale: "tr",
        context: messages.slice(-6),
      }),
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    if (!data.response) throw new Error("Bos yanıt");

    return data.response;
  };

  // Ögrenilmis yanıtları ara
  const findLearnedResponse = async (input: string): Promise<string | null> => {
    try {
      const result = await window.storage.get("learned_responses");
      if (!result) return null;

      const learned: LearnedResponse[] = JSON.parse(result.value);

      // En iyi eslesmeyi bul
      let bestMatch = null;
      let bestSimilarity = 0;

      for (const item of learned) {
        // Orijinal soru ve tüm varyasyonlarla karsılastır
        const allQuestions = [item.question, ...item.variations];

        for (const q of allQuestions) {
          const similarity = calculateSimilarity(input, q.toLowerCase());
          if (similarity > bestSimilarity && similarity > 0.7) {
            bestSimilarity = similarity;
            bestMatch = item;
          }
        }
      }

      if (bestMatch) {
        // Kullanım sayısını artır
        bestMatch.useCount++;
        bestMatch.lastUsed = new Date().toISOString();
        bestMatch.confidence = Math.min(0.98, bestMatch.confidence + 0.02);

        await window.storage.set("learned_responses", JSON.stringify(learned));

        return bestMatch.answer;
      }
    } catch (error) {
      console.log("Ögrenme verisi henüz yok");
    }
    return null;
  };

  // Benzer konusmaları bul
  const findSimilarConversation = async (
    input: string,
  ): Promise<string | null> => {
    try {
      const result = await window.storage.get("conversations");
      if (!result) return null;

      const conversations: Conversation[] = JSON.parse(result.value);

      const sorted = conversations
        .map((conv) => ({
          ...conv,
          similarity: calculateSimilarity(input, conv.question.toLowerCase()),
        }))
        .filter((conv) => conv.similarity > 0.65)
        .sort((a, b) => b.similarity - a.similarity);

      if (sorted.length > 0) {
        return sorted[0].answer;
      }
    } catch (error) {
      console.log("Henüz konusma geçmisi yok");
    }
    return null;
  };

  // Gelismis benzerlik hesaplama (Jaccard + Trigram)
  const calculateSimilarity = (str1: string, str2: string): number => {
    // Jaccard similarity (kelime bazlı)
    const words1 = new Set(str1.split(" ").filter((w) => w.length > 2));
    const words2 = new Set(str2.split(" ").filter((w) => w.length > 2));
    const intersection = new Set([...words1].filter((x) => words2.has(x)));
    const union = new Set([...words1, ...words2]);
    const jaccardScore = union.size > 0 ? intersection.size / union.size : 0;

    // Trigram similarity (karakter bazlı)
    const getTrigrams = (str: string) => {
      const trigrams = [];
      for (let i = 0; i < str.length - 2; i++) {
        trigrams.push(str.slice(i, i + 3));
      }
      return trigrams;
    };

    const tri1 = getTrigrams(str1);
    const tri2 = getTrigrams(str2);
    const triIntersection = tri1.filter((t) => tri2.includes(t)).length;
    const triUnion = tri1.length + tri2.length - triIntersection;
    const trigramScore = triUnion > 0 ? triIntersection / triUnion : 0;

    // Iki skorun ortalaması
    return jaccardScore * 0.6 + trigramScore * 0.4;
  };

  // Konusmayı kaydet
  const saveConversation = async (question: string, answer: string) => {
    try {
      const result = await window.storage.get("conversations");
      const conversations: Conversation[] = result
        ? JSON.parse(result.value)
        : [];

      conversations.push({
        question,
        answer,
        timestamp: new Date().toISOString(),
        context: conversationContext.slice(-3),
      });

      // Son 200 konusmayı tut
      const recent = conversations.slice(-200);
      await window.storage.set("conversations", JSON.stringify(recent));

      // Pattern analizi yap ve ögren
      await analyzeAndLearn(question, answer);
    } catch (error) {
      console.error("Konusma kaydetme hatası:", error);
    }
  };

  // Pattern analizi ve ögrenme
  const analyzeAndLearn = async (question: string, answer: string) => {
    try {
      const result = await window.storage.get("learned_responses");
      const learned: LearnedResponse[] = result ? JSON.parse(result.value) : [];

      // Aynı sorunun varyasyonlarını grupla
      let existing = null;
      let bestSimilarity = 0;

      for (const item of learned) {
        const similarity = calculateSimilarity(
          question.toLowerCase(),
          item.question.toLowerCase(),
        );
        if (similarity > bestSimilarity && similarity > 0.75) {
          bestSimilarity = similarity;
          existing = item;
        }
      }

      if (!existing) {
        // Yeni ögrenilmis yanıt ekle
        learned.push({
          question,
          answer,
          variations: [question],
          useCount: 1,
          confidence: 0.5,
          createdAt: new Date().toISOString(),
          lastUsed: new Date().toISOString(),
        });
      } else {
        // Mevcut yanıtı güncelle
        if (!existing.variations.includes(question)) {
          existing.variations.push(question);
        }
        existing.useCount++;
        existing.confidence = Math.min(0.98, existing.confidence + 0.03);
        existing.lastUsed = new Date().toISOString();
      }

      await window.storage.set("learned_responses", JSON.stringify(learned));
    } catch (error) {
      console.error("Ögrenme hatası:", error);
    }
  };

  // Gelismis baglamsal yanıtlar
  const getContextualResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();

    const keywords = {
      price: ["fiyat", "ücret", "maliyet", "kaç para", "ne kadar", "para"],
      project: ["proje", "portfolio", "çalısma", "örnek", "yaptıgın"],
      contact: ["iletisim", "mail", "ulas", "e-posta", "telefon", "ara"],
      tech: [
        "teknoloji",
        "kullan",
        "skill",
        "bilgi",
        "yetenekler",
        "programlama",
      ],
      time: ["süre", "zaman", "ne kadar sürer", "teslim", "deadline"],
      seo: ["seo", "google", "arama motoru", "optimizasyon"],
      hosting: ["hosting", "sunucu", "domain", "alan adı", "barındırma"],
      design: ["tasarım", "design", "arayüz", "ui", "ux"],
      mobile: ["mobil", "responsive", "telefon", "tablet", "adaptif"],
      maintenance: ["bakım", "güncelleme", "destek", "support", "yardım"],
      reference: ["referans", "müsteri", "kim", "çalıstın", "firma"],
      payment: ["ödeme", "taksit", "avans", "fatura"],
      greeting: ["merhaba", "selam", "hey", "günaydın", "iyi günler", "naber"],
      thanks: ["tesekkür", "sagol", "güzel", "harika", "süper"],
    };

    const responses = {
      price:
        "💰 **Proje Fiyatlandırması**\n\n📌 Landing Page: 5.000-15.000 TL\n📌 Kurumsal Web: 15.000-40.000 TL\n📌 E-ticaret: 25.000-75.000 TL\n📌 Özel Uygulama: 50.000+ TL\n\nSize özel detaylı teklif için iletisime geçin! Hangi tür projeyle ilgileniyorsunuz?",

      project:
        "🚀 **Portfolio Projelerim**\n\n✨ E-ticaret platformları (Next.js + Stripe)\n✨ SaaS uygulamaları (React + TypeScript)\n✨ Kurumsal web siteleri\n✨ API entegrasyonları\n✨ Dashboard & Admin panelleri\n\nÖrnek projelerimi görmek ister misiniz?",

      contact:
        "📬 **Iletisim Bilgileri**\n\n📧 E-posta: ceyhun@example.com\n📱 Telefon: +90 555 123 4567\n💼 LinkedIn: linkedin.com/in/ceyhun\n\n⏰ Genellikle 24 saat içinde yanıt veriyorum!",

      tech: "⚡ **Teknoloji Yıgınım**\n\n**Frontend:**\n• React, Next.js, TypeScript\n• Tailwind CSS, Framer Motion\n\n**Backend:**\n• Node.js, Express, PostgreSQL\n• REST & GraphQL API\n\n**DevOps:**\n• AWS, Vercel, Docker\n• CI/CD, Git\n\nÖzel bir teknoloji mi arıyorsunuz?",

      time: "⏱️ **Teslim Süreleri**\n\n🚀 Landing Page: 1-2 hafta\n🏢 Kurumsal Web: 3-4 hafta\n🛒 E-ticaret: 6-8 hafta\n⚙️ Özel Proje: 8-12 hafta\n\n⚡ Acil projeler için hızlandırılmıs teslimat (+%30 ücret) mevcut!",

      seo: "🔍 **SEO Optimizasyonu**\n\n✅ Teknik SEO (meta, schema, sitemap)\n✅ Performans optimizasyonu (90+ Lighthouse)\n✅ Core Web Vitals iyilestirme\n✅ Mobile-first indexing\n✅ Sayfa hızı optimizasyonu\n\nTüm projelerime SEO dahildir!",

      hosting:
        "☁️ **Hosting & Domain**\n\n🌐 Domain kaydı destegi\n💻 Hosting önerileri (AWS, Vercel, DigitalOcean)\n🔒 SSL sertifikası kurulumu\n🚀 Deployment & CI/CD\n\nIsterseniz bu islemleri ben hallederim!",

      design:
        "🎨 **Tasarım Süreci**\n\n1️⃣ Ihtiyaç analizi\n2️⃣ Wireframe & Prototip (Figma)\n3️⃣ Kullanıcı testleri\n4️⃣ Final tasarım\n5️⃣ Gelistirme\n\nKendi tasarımınız varsa onunla da çalısabilirim!",

      mobile:
        "📱 **Responsive Tasarım**\n\n✅ %100 mobil uyumlu\n✅ Tüm cihazlarda test edilmis\n✅ Touch-friendly arayüzler\n✅ Hızlı yükleme süreleri\n\nMobil kullanıcı deneyimi önceligimdir!",

      maintenance:
        "🔧 **Bakım & Destek**\n\n✨ 3 ay ücretsiz bakım\n🔄 Küçük güncellemeler ücretsiz\n📊 Aylık performans raporu\n🆘 7/24 acil destek\n\nUzun süreli bakım paketleri de mevcut!",

      reference:
        "🏆 **Referanslar**\n\n✅ 50+ tamamlanmıs proje\n✅ Startuplar & Kurumsal firmalar\n✅ E-ticaret sirketleri\n✅ Ajanslar (white-label)\n\nDetaylı referansları iletisim sonrası paylasabilirim!",

      payment:
        "💳 **Ödeme Kosulları**\n\n1️⃣ %40 Avans (proje baslangıcı)\n2️⃣ %30 Ara ödeme (tasarım onayı)\n3️⃣ %30 Teslimat\n\n📝 Fatura & sözlesme ile çalısıyorum\n💰 Taksit imkanı mevcut",

      greeting:
        "👋 Merhaba! Size nasıl yardımcı olabilirim?\n\n💡 Popüler konular:\n• Proje fiyatlandırması\n• Teknolojiler\n• Teslim süreleri\n• Referanslar\n\nSorunuzu yazabilirsiniz!",

      thanks:
        "😊 Rica ederim! Baska sorunuz varsa çekinmeden sorun. Size yardımcı olmak için buradayım! 🚀",
    };

    // Anahtar kelime eslestirme
    for (const [category, words] of Object.entries(keywords)) {
      if (words.some((word) => input.includes(word))) {
        return responses[category as keyof typeof responses];
      }
    }

    // Varsayılan yanıt
    if (input.length < 15) {
      return "🤔 Sorunuzu biraz daha açar mısınız?\n\n💬 Su konularda yardımcı olabilirim:\n• Proje fiyatları\n• Teknolojiler\n• Süreçler\n• Iletisim\n\nHangi konuda bilgi almak istersiniz?";
    }

    return "🤖 Ilginç bir soru! Bu konuda size daha iyi yardımcı olabilmem için:\n\n1️⃣ Projeniz hakkında daha fazla detay verebilirsiniz\n2️⃣ Iletisim formunu kullanarak direkt görüsebiliriz\n\n📧 Genellikle 24 saat içinde detaylı yanıt veriyorum!";
  };

  // Verileri sıfırla
  const resetData = async () => {
    if (confirm("Tüm ögrenilmis veriler silinecek. Emin misiniz?")) {
      try {
        await window.storage.delete("learned_responses");
        await window.storage.delete("conversations");
        setStats({ learned: 0, conversations: 0, confidence: 0 });
        alert("Veriler sıfırlandı!");
      } catch (error) {
        console.error("Veri sıfırlama hatası:", error);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-linear-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-110 z-50 group"
        aria-label="Sohbeti Aç"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
        {stats.learned > 0 && (
          <span className="absolute -top-2 -left-2 bg-yellow-500 text-xs px-2 py-1 rounded-full font-bold">
            {stats.learned}
          </span>
        )}
      </button>
    );
  }

  return (
    <div
      className={`fixed bottom-6 right-6 bg-white rounded-2xl shadow-2xl z-50 transition-all duration-300 ${
        isMinimized ? "w-80 h-16" : "w-96 h-[600px]"
      }`}
      style={{ maxHeight: "calc(100vh - 100px)" }}
    >
      {/* Header */}
      <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <MessageCircle className="w-5 h-5" />
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">AI Asistan 🧠</h3>
            <p className="text-xs text-white/80">
              {stats.learned > 0
                ? `${stats.learned} yanıt ögrendi`
                : "Ögreniyor..."}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowStats(!showStats)}
            className="hover:bg-white/20 p-2 rounded-lg transition-colors"
            aria-label="Istatistikler"
            title="Istatistikler"
          >
            <BarChart3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="hover:bg-white/20 p-2 rounded-lg transition-colors"
            aria-label="Küçült"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="hover:bg-white/20 p-2 rounded-lg transition-colors"
            aria-label="Kapat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Stats Panel */}
          {showStats && (
            <div className="bg-linear-to-r from-blue-50 to-purple-50 p-4 border-b">
              <h4 className="font-semibold text-sm mb-2">
                📊 Ögrenme Istatistikleri
              </h4>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="bg-white p-2 rounded-lg text-center">
                  <div className="font-bold text-blue-600">{stats.learned}</div>
                  <div className="text-gray-600">Ögrenildi</div>
                </div>
                <div className="bg-white p-2 rounded-lg text-center">
                  <div className="font-bold text-purple-600">
                    {stats.conversations}
                  </div>
                  <div className="text-gray-600">Konusma</div>
                </div>
                <div className="bg-white p-2 rounded-lg text-center">
                  <div className="font-bold text-green-600">
                    {stats.confidence}%
                  </div>
                  <div className="text-gray-600">Güven</div>
                </div>
              </div>
              <button
                onClick={resetData}
                className="mt-2 w-full bg-red-500 text-white text-xs py-1 rounded hover:bg-red-600 transition-colors flex items-center justify-center gap-1"
              >
                <Trash2 className="w-3 h-3" />
                Verileri Sıfırla
              </button>
            </div>
          )}

          {/* Messages */}
          <div
            className={`${
              showStats ? "h-[340px]" : "h-[440px]"
            } overflow-y-auto p-4 space-y-4 bg-gray-50`}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    msg.role === "user"
                      ? "bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-br-none"
                      : "bg-white text-gray-800 shadow-md rounded-bl-none"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-line">
                    {msg.content}
                  </p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {msg.timestamp.toLocaleTimeString("tr-TR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 shadow-md rounded-2xl rounded-bl-none px-4 py-3">
                  <div className="flex gap-1">
                    <span
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t bg-white rounded-b-2xl">
            <div className="flex gap-2 items-end">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Mesajınızı yazın..."
                disabled={isLoading}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed text-sm"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="bg-linear-to-r from-blue-600 to-purple-600 text-white p-3 rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                aria-label="Gönder"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
