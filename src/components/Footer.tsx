import React from 'react';
import { ShieldCheck, BookOpen, Clock, HeartHandshake } from 'lucide-react';

export const Footer: React.FC = () => {
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
              <h4 className="font-bold text-[#2C2C24] text-xs font-serif">100% Kerahasiaan Data</h4>
              <p className="text-[11px] text-[#8A8A70]">Data penelitian dijaga dengan NDA ketat</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#F0F2ED] text-[#5A6B4E] flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-[#2C2C24] text-xs font-serif">Standar Metodologi Baku</h4>
              <p className="text-[11px] text-[#8A8A70]">Interpretasi Bab 4 sesuai pedoman kampus</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#F0F2ED] text-[#5A6B4E] flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-[#2C2C24] text-xs font-serif">Pengerjaan Tepat Waktu</h4>
              <p className="text-[11px] text-[#8A8A70]">Pilihan express 1-2 hari untuk deadline mendesak</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#F0F2ED] text-[#5A6B4E] flex items-center justify-center shrink-0">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-[#2C2C24] text-xs font-serif">Garansi Revisi Dosen</h4>
              <p className="text-[11px] text-[#8A8A70]">Pendampingan perbaikan hasil uji statistik</p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[#A5A58D] text-[11px]">
          <p className="font-medium">© {new Date().getFullYear()} DataStat Platform. Solusi AI & Jasa Olah Data Statistik Akademis.</p>
          <div className="flex gap-4">
            <span className="text-[10px] text-[#A5A58D] font-bold uppercase tracking-widest hover:text-[#5A6B4E] transition cursor-pointer">Panduan Olah Data</span>
            <span className="text-[10px] text-[#A5A58D] font-bold uppercase tracking-widest hover:text-[#5A6B4E] transition cursor-pointer">Terms of Service</span>
            <span className="text-[10px] text-[#A5A58D] font-bold uppercase tracking-widest hover:text-[#5A6B4E] transition cursor-pointer">Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
