import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Send, Bot, User, RotateCcw, Copy, Check, Sparkles, AlertCircle, HelpCircle } from 'lucide-react';
import { ChatMessage } from '../types';

interface AIConsultantProps {
  onSelectToolFilter?: (tool: string) => void;
}

const QUICK_PROMPTS = [
  'Uji apa yang cocok untuk pengaruh X terhadap Y?',
  'Data saya tidak lolos uji normalitas, solusinya apa?',
  'Kapan harus pakai SmartPLS dibanding SPSS Regresi?',
  'Berapa ukuran sampel minimum dengan rumus Slovin vs Lemeshow?',
  'Cara mengatasi multikolinearitas dengan nilai VIF tinggi?',
];

export const AIConsultant: React.FC<AIConsultantProps> = ({ onSelectToolFilter }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    return [
      {
        id: 'init-msg',
        role: 'assistant',
        content: 'Halo! Saya **AI Consultant Statistika DataStat**. Apa judul penelitian atau kendala olah data Anda? Tanyakan metode uji, software yang tepat, uji asumsi klasik, maupun interpretasi hasil.',
        timestamp: 'Baru saja',
      },
    ];
  });
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (customText?: string) => {
    const textToSend = (customText ?? input).trim();
    if (!textToSend || loading) return;

    const userMessage: ChatMessage = {
      id: 'msg-' + Date.now(),
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!customText) setInput('');
    setErrorMessage(null);
    setLoading(true);

    try {
      // Build history payload
      const historyPayload = messages.map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        text: m.content,
      }));

      const res = await fetch('/api/consult', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: textToSend,
          history: historyPayload,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Gagal memperoleh jawaban dari AI.');
      }

      const aiReply: ChatMessage = {
        id: 'msg-ai-' + Date.now(),
        role: 'assistant',
        content: data.reply || 'Tidak ada respons yang diterima.',
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiReply]);
    } catch (err: unknown) {
      console.error('Error asking AI:', err);
      const errText = err instanceof Error ? err.message : 'Maaf, terjadi masalah koneksi AI.';
      setErrorMessage(errText);
      const fallbackReply: ChatMessage = {
        id: 'msg-err-' + Date.now(),
        role: 'assistant',
        content: `⚠️ **Pemberitahuan:** ${errText}\n\n*Anda tetap dapat memilih dan berkonsultasi langsung dengan tim Freelancer Ahli Data kami di samping.*`,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'init-msg-' + Date.now(),
        role: 'assistant',
        content: 'Halo! Saya **AI Consultant Statistika DataStat**. Apa judul penelitian atau kendala olah data Anda? Tanyakan metode uji, software yang tepat, uji asumsi klasik, maupun interpretasi hasil.',
        timestamp: 'Baru saja',
      },
    ]);
    setErrorMessage(null);
  };

  return (
    <div className="bg-white p-6 sm:p-7 rounded-[28px] sm:rounded-[32px] shadow-xs border border-[#E8E6DF] flex flex-col h-[650px] md:h-[720px] relative">
      {/* Header section */}
      <div className="flex items-start justify-between pb-3.5 border-b border-[#F0F2ED]">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#5A6B4E] ring-4 ring-[#5A6B4E]/15 shrink-0" />
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#2C2C24] font-serif flex items-center gap-2">
              Konsultasi AI Statistika
            </h2>
            <p className="text-xs text-[#8A8A70] mt-0.5">
              Tanyakan judul atau kendala olah data skripsi & metodologi riset.
            </p>
          </div>
        </div>
        <button
          onClick={handleResetChat}
          className="p-1.5 text-[#8A8A70] hover:text-[#2C2C24] rounded-full hover:bg-[#F4F3ED] transition"
          title="Mulai percakapan baru"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Prompts Carousel/Pills */}
      <div className="py-2.5">
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#8A8A70] mb-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-[#5A6B4E]" />
          <span>Contoh Pertanyaan Cepat:</span>
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          {QUICK_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              disabled={loading}
              className="shrink-0 bg-[#F4F3ED] hover:bg-[#EAE8DF] text-[#5A6B4E] px-3 py-1 rounded-full text-[11px] font-semibold transition border border-[#E8E6DF] disabled:opacity-50"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Box */}
      <div
        id="chat-box"
        className="flex-1 overflow-y-auto space-y-3.5 mb-3 p-3.5 bg-[#FAF9F5] rounded-2xl text-sm border border-[#F0F2ED]"
      >
        {messages.map((msg) => {
          const isAssistant = msg.role === 'assistant';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isAssistant ? 'items-start' : 'items-end'}`}
            >
              <div className="flex items-center gap-1.5 mb-1 px-1">
                {isAssistant ? (
                  <>
                    <div className="w-4 h-4 rounded-full bg-[#5A6B4E] text-white flex items-center justify-center text-[10px]">
                      <Bot className="w-2.5 h-2.5" />
                    </div>
                    <span className="text-[11px] font-semibold text-[#2C2C24]">AI Consultant</span>
                  </>
                ) : (
                  <>
                    <span className="text-[11px] font-medium text-[#8A8A70]">Anda</span>
                    <div className="w-4 h-4 rounded-full bg-[#E0E2D9] text-[#5A6B4E] flex items-center justify-center text-[10px]">
                      <User className="w-2.5 h-2.5" />
                    </div>
                  </>
                )}
                <span className="text-[10px] text-[#A5A58D]">{msg.timestamp}</span>
              </div>

              <div
                className={`group relative p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed max-w-[92%] sm:max-w-[85%] shadow-xs ${
                  isAssistant
                    ? 'bg-[#F4F3ED] text-[#2C2C24] rounded-tl-none mr-4 sm:mr-6 border border-[#E8E6DF]'
                    : 'bg-[#5A6B4E] text-white rounded-tr-none ml-4 sm:ml-6 shadow-md shadow-[#5a6b4e26]'
                }`}
              >
                {isAssistant ? (
                  <div className="prose prose-xs sm:prose-sm max-w-none text-[#2C2C24] space-y-2 prose-headings:text-[#2C2C24] prose-headings:font-bold prose-headings:my-1.5 prose-p:my-1 prose-ul:my-1 prose-ul:pl-4 prose-li:my-0.5 prose-strong:text-[#2C2C24] prose-code:bg-[#EAE8DF] prose-code:text-[#5A6B4E] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded text-xs sm:text-[13px]">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                ) : (
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                )}

                {isAssistant && (
                  <button
                    onClick={() => handleCopy(msg.id, msg.content)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 bg-white/90 hover:bg-white text-[#8A8A70] hover:text-[#2C2C24] rounded-md shadow-xs transition"
                    title="Salin jawaban"
                  >
                    {copiedId === msg.id ? (
                      <Check className="w-3 h-3 text-[#5A6B4E]" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-1.5 mb-1 px-1">
              <div className="w-4 h-4 rounded-full bg-[#5A6B4E] text-white flex items-center justify-center text-[10px]">
                <Bot className="w-2.5 h-2.5" />
              </div>
              <span className="text-[11px] font-semibold text-[#2C2C24]">AI Consultant</span>
              <span className="text-[10px] text-[#8A8A70]">Sedang menganalisis...</span>
            </div>
            <div className="bg-[#F4F3ED] border border-[#E8E6DF] p-3.5 rounded-2xl rounded-tl-none max-w-[85%] text-[#2C2C24] flex items-center gap-2.5 shadow-xs">
              <span className="inline-flex gap-1">
                <span className="w-2 h-2 rounded-full bg-[#8A8A70] animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-[#5A6B4E] animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-[#2C2C24] animate-bounce" style={{ animationDelay: '300ms' }} />
              </span>
              <span className="text-xs text-[#5A6B4E] font-medium">Merumuskan metodologi & uji statistik terbaik...</span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input section */}
      <div className="pt-1">
        <div className="relative flex items-center">
          <input
            id="user-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            placeholder="Tulis pertanyaan seputar olah data/skripsi..."
            className="w-full bg-[#F9F8F6] border border-[#E8E6DF] rounded-full py-3.5 pl-4 sm:pl-5 pr-12 text-xs sm:text-sm text-[#2C2C24] placeholder:text-[#8A8A70] focus:outline-none focus:border-[#5A6B4E] focus:bg-white transition shadow-inner"
          />
          <button
            id="btn-ask-gemini"
            onClick={() => handleSend()}
            disabled={loading || !input.trim()}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 bg-[#5A6B4E] hover:bg-[#4a5840] rounded-full flex items-center justify-center text-white shadow-md shadow-[#5a6b4e33] transition disabled:opacity-40 disabled:cursor-not-allowed"
            title="Kirim pertanyaan"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
        <p className="text-[10px] text-[#A5A58D] text-center mt-2 font-medium">
          Didukung Gemini 3.8 Flash • Jawaban AI adalah saran metodologis akademis
        </p>
      </div>
    </div>
  );
};
