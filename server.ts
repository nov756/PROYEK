import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

let aiClient: GoogleGenAI | null = null;
function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    });
  });

  // AI Statistical Consultation endpoint
  app.post("/api/consult", async (req, res) => {
    try {
      const { message, history } = req.body;

      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Pesan pertanyaan harus disertakan." });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(503).json({
          error: "GEMINI_API_KEY belum terkonfigurasi pada server. Silakan tambahkan pada panel Secrets AI Studio.",
        });
      }

      const ai = getAiClient();

      const systemInstruction = `Anda adalah AI Konsultan Statistika & Metodologi Penelitian profesional untuk platform DataStat.
Tugas Anda:
1. Membantu mahasiswa, akademisi, dan peneliti memahami kebutuhan olah data, memilih metodologi penelitian yang tepat, dan mengatasi kendala analisis skripsi/tesis.
2. Membimbing pemilihan uji statistik yang tepat (misal: Uji t, ANOVA, Regresi Linier Berganda, Regresi Logistik, SEM-PLS / SmartPLS, CB-SEM / AMOS, Uji Non-Parametrik Mann-Whitney / Kruskal-Wallis, Chi-Square, Time Series ARIMA / EViews, Analisis Jalur, Uji Validitas & Reliabilitas Cronbach's Alpha).
3. Memberikan solusi praktis ketika uji asumsi klasik gagal (normalitas skewness, multikolinearitas VIF tinggi, heteroskedastisitas Glejser/Scatterplot, autokorelasi Durbin-Watson) misalnya dengan transformasi data (Ln/Log10/Sqrt), penanganan outlier, bootstrapping, atau beralih ke pendekatan PLS-SEM/Non-parametrik.
4. Menjelaskan rumus dan penentuan ukuran sampel (rumus Slovin, Lemeshow, Hair et al 5-10x indikator, G*Power).
5. Merekomendasikan software yang cocok (SPSS, SmartPLS 3/4, R Studio, Python, EViews, Stata, Jamovi, NVivo).
6. FORMAT RESPON:
   - Gunakan Markdown yang bersih dan mudah dibaca (gunakan heading ##, bullet point, bold teks penting).
   - Berikan jawaban yang ringkas, terstruktur, ramah, dan solutif.
   - Cantumkan rekomendasi software dan langkah praktis.
   - Sertakan tips singkat jika ingin dibantu langsung oleh tim expert freelancer DataStat.`;

      // Build conversation contents
      const contents: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }> = [];

      if (Array.isArray(history) && history.length > 0) {
        // Add previous turns (limiting to last 8 turns for context speed)
        const recentHistory = history.slice(-8);
        for (const item of recentHistory) {
          if (item.role && item.text) {
            contents.push({
              role: item.role === "assistant" || item.role === "model" ? "model" : "user",
              parts: [{ text: item.text }],
            });
          }
        }
      }

      // Add current message
      contents.push({
        role: "user",
        parts: [
          {
            text: `Pertanyaan Pengguna:\n${message}`,
          },
        ],
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const replyText = response.text || "Maaf, AI tidak dapat menghasilkan saran saat ini.";

      return res.json({
        reply: replyText,
      });
    } catch (err: unknown) {
      console.error("Gemini consult error:", err);
      const errorMessage = err instanceof Error ? err.message : "Terjadi kendala saat memproses konsultasi AI.";
      return res.status(500).json({
        error: errorMessage,
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`DataStat server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
