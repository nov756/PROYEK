import React, { useState } from 'react';
import { X, Globe, UploadCloud, CheckCircle2, Copy, Check, ExternalLink, Terminal, Sparkles, Smartphone } from 'lucide-react';

interface DeploymentGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeploymentGuideModal: React.FC<DeploymentGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'netlify' | 'vercel'>('netlify');
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C2C24]/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-[28px] sm:rounded-[32px] shadow-2xl border border-[#E8E6DF] w-full max-w-2xl my-8 overflow-hidden">
        {/* Header */}
        <div className="bg-[#5A6B4E] text-white p-5 sm:p-6 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest bg-white/15 text-[#F0F2ED] px-2.5 py-0.5 rounded-full border border-white/20 font-sans mb-1.5 w-fit">
              <Globe className="w-3.5 h-3.5 text-[#ECE7D6]" />
              <span>Panduan Publikasi &amp; Hosting Gratis</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-serif">
              Publish Web ke Vercel atau Netlify
            </h3>
            <p className="text-xs text-[#F0F2ED] mt-1">
              Dapatkan domain tautan resmi gratis (e.g. datastat-kating.netlify.app atau vercel.app) untuk menerima klien mahasiswa!
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-[#E8E6DF] bg-[#FAF9F5] px-6 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('netlify')}
            className={`pb-3 px-4 text-xs font-bold border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'netlify'
                ? 'border-[#5A6B4E] text-[#5A6B4E]'
                : 'border-transparent text-[#8A8A70] hover:text-[#2C2C24]'
            }`}
          >
            <UploadCloud className="w-4 h-4" />
            <span>1. Netlify Drop (Paling Mudah / Drag &amp; Drop)</span>
          </button>
          <button
            onClick={() => setActiveTab('vercel')}
            className={`pb-3 px-4 text-xs font-bold border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'vercel'
                ? 'border-[#5A6B4E] text-[#5A6B4E]'
                : 'border-transparent text-[#8A8A70] hover:text-[#2C2C24]'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>2. Vercel (Auto Git &amp; Fast CDN)</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto text-[#2C2C24]">
          {activeTab === 'netlify' ? (
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-[#F0F2ED] rounded-2xl border border-[#E8E6DF] space-y-1.5">
                <p className="font-bold text-[#2C2C24]">Metode Drag &amp; Drop (Tanpa Koding Tambahan)</p>
                <p className="text-[#8A8A70] leading-relaxed">
                  Netlify memungkinkan Anda mengunggah folder build produksi secara instan dalam 30 detik tanpa biaya sepeserpun.
                </p>
              </div>

              <ol className="space-y-3 pl-1">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#5A6B4E] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <strong className="text-[#2C2C24] block">Lakukan Build Proyek</strong>
                    <p className="text-[#8A8A70] mt-0.5">
                      Jalankan perintah build di terminal untuk menghasilkan folder <code>dist/</code> berisi file <code>index.html</code> dan seluruh aset yang telah dioptimasi:
                    </p>
                    <div className="mt-1.5 flex items-center justify-between bg-[#2C2C24] text-white p-2 rounded-xl font-mono text-[11px]">
                      <span>npm run build</span>
                      <button
                        onClick={() => copyToClipboard('npm run build', 'cmd-build')}
                        className="text-white/80 hover:text-white flex items-center gap-1 text-[10px]"
                      >
                        {copied === 'cmd-build' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#5A6B4E] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <strong className="text-[#2C2C24] block">Buka Halaman Netlify Drop</strong>
                    <p className="text-[#8A8A70] mt-0.5">
                      Kunjungi tautan resmi <a href="https://app.netlify.com/drop" target="_blank" rel="noreferrer" className="text-[#5A6B4E] font-bold underline inline-flex items-center gap-0.5">app.netlify.com/drop <ExternalLink className="w-3 h-3" /></a> di peramban Anda.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#5A6B4E] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <strong className="text-[#2C2C24] block">Tarik &amp; Lepaskan (Drag &amp; Drop) Folder dist/</strong>
                    <p className="text-[#8A8A70] mt-0.5">
                      Drag folder <strong>dist</strong> ke area upload Netlify. Netlify akan memproses dan memberikan domain gratis seperti:
                    </p>
                    <div className="mt-1.5 bg-[#FAF9F5] border border-[#E8E6DF] p-2.5 rounded-xl font-mono text-[11px] text-[#5A6B4E] font-bold">
                      https://datastat-kating.netlify.app
                    </div>
                  </div>
                </li>
              </ol>
            </div>
          ) : (
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-[#F0F2ED] rounded-2xl border border-[#E8E6DF] space-y-1.5">
                <p className="font-bold text-[#2C2C24]">Deployment Otomatis via Vercel</p>
                <p className="text-[#8A8A70] leading-relaxed">
                  Vercel mendeteksi kerangka Vite secara otomatis dengan performa Edge Network tercepat di dunia.
                </p>
              </div>

              <ol className="space-y-3 pl-1">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#5A6B4E] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <strong className="text-[#2C2C24] block">Hubungkan Repositori GitHub</strong>
                    <p className="text-[#8A8A70] mt-0.5">
                      Export atau push kode proyek Anda ke akun GitHub (via menu Settings &gt; Export to GitHub di AI Studio).
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#5A6B4E] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <strong className="text-[#2C2C24] block">Buka Vercel Dashboard</strong>
                    <p className="text-[#8A8A70] mt-0.5">
                      Buka <a href="https://vercel.com/new" target="_blank" rel="noreferrer" className="text-[#5A6B4E] font-bold underline inline-flex items-center gap-0.5">vercel.com/new <ExternalLink className="w-3 h-3" /></a> lalu klik <strong>Import</strong> pada repositori web DataStat Anda.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#5A6B4E] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <strong className="text-[#2C2C24] block">Klik Deploy</strong>
                    <p className="text-[#8A8A70] mt-0.5">
                      Vercel akan otomatis mengenali Vite. Klik Deploy dan dalam 1 menit web Anda sudah tayang resmi di domain gratis:
                    </p>
                    <div className="mt-1.5 bg-[#FAF9F5] border border-[#E8E6DF] p-2.5 rounded-xl font-mono text-[11px] text-[#5A6B4E] font-bold">
                      https://datastat-kating.vercel.app
                    </div>
                  </div>
                </li>
              </ol>
            </div>
          )}

          {/* Rekber note */}
          <div className="p-3.5 bg-[#F9F8F6] border border-[#E8E6DF] rounded-2xl flex items-center justify-between text-xs">
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A8A70]">Nomor WhatsApp Rekber Admin:</span>
              <p className="font-bold text-[#5A6B4E] text-sm">+62 818-1874-1970</p>
            </div>
            <a
              href="https://wa.me/6281818741970?text=Halo%20Admin%20DataStat,%20saya%20ingin%20konsultasi%20transaksi%20Rekber"
              target="_blank"
              rel="noreferrer"
              className="bg-[#5A6B4E] hover:bg-[#4a5840] text-white font-bold px-3.5 py-1.5 rounded-full text-xs transition inline-flex items-center gap-1 shadow-xs"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Tes WA Admin</span>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FAF9F5] border-t border-[#E8E6DF] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#5A6B4E] hover:bg-[#4a5840] text-white font-semibold rounded-full text-xs transition"
          >
            Mengerti &amp; Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
