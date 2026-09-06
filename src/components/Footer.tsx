import React from 'react';
import { ShieldCheck, BookOpen, Clock, HeartHandshake, Globe, Smartphone } from 'lucide-react';

interface FooterProps {
  onOpenDeployGuide?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDeployGuide }) => {
  return (
    <footer className="bg-white border-t border-[#E8E6DF] mt-12 py-8 text-[#8A8A70] text-xs">
      <div className="max-w-6xl mx-auto px-4">
        {/* Trust Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pb-8 border-b border-[#F0F2ED]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#F0F2ED] text-[#5A6B4E] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-[#2C2C24] text-xs font-serif">Rekber Aman 15%</h4>
              <p className="text-[11px] text-[#8A8A70]">Dana ditahan aman sampai tugas beres</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#F0F2ED] text-[#5A6B4E] flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-[#2C2C24] text-xs font-serif">Kating Asdos &amp; Nilai A</h4>
              <p className="text-[11px] text-[#8A8A70]">Dibimbing langsung kating berprestasi</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#F0F2ED] text-[#5A6B4E] flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-[#2C2C24] text-xs font-serif">Bisa Kilat 6-24 Jam</h4>
              <p className="text-[11px] text-[#8A8A70]">Pilihan express untuk deadline tugas mendesak</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#F0F2ED] text-[#5A6B4E] flex items-center justify-center shrink-0">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-[#2C2C24] text-xs font-serif">Garansi Penjelasan Lengkap</h4>
              <p className="text-[11px] text-[#8A8A70]">Dapat cara hitung &amp; interpretasi output</p>
            </div>
          </div>
        </div>

        {/* Deploy & WhatsApp Admin Bar */}
        <div className="py-4 border-b border-[#F0F2ED] flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#FAF9F5] px-4 rounded-2xl my-4">
          <div className="flex items-center gap-2 text-xs text-[#2C2C24]">
            <Smartphone className="w-4 h-4 text-[#5A6B4E]" />
            <span>WhatsApp Admin Rekber: <strong className="text-[#5A6B4E]">+62 818-1874-1970</strong></span>
          </div>
          {onOpenDeployGuide && (
            <button
              onClick={onOpenDeployGuide}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-[#F0F2ED] text-[#5A6B4E] border border-[#E8E6DF] rounded-full text-xs font-semibold transition"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Panduan Publikasi Vercel / Netlify</span>
            </button>
          )}
        </div>

        {/* Bottom copyright */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-[#A5A58D] text-[11px]">
          <p className="font-medium">© {new Date().getFullYear()} DataStat Platform. Jasa Bantu Matkul Statistika &amp; Mentoring Kating Mahasiswa.</p>
          <div className="flex gap-4">
            <a
              href="https://wa.me/6281818741970?text=Halo%20Admin%20DataStat,%20saya%20mau%20tanya%20bantuan%20matkul%20statistika"
              target="_blank"
              rel="noreferrer"
              className="text-[10px] text-[#5A6B4E] font-bold uppercase tracking-widest hover:underline transition"
            >
              Hubungi WA Admin
            </a>
            <span className="text-[10px] text-[#A5A58D] font-bold uppercase tracking-widest hover:text-[#5A6B4E] transition cursor-pointer">Syarat &amp; Ketentuan</span>
            <span className="text-[10px] text-[#A5A58D] font-bold uppercase tracking-widest hover:text-[#5A6B4E] transition cursor-pointer">Privasi Mahasiswa</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
