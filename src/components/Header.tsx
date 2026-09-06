import React from 'react';
import { UserPlus, ClipboardList, Sparkles, LayoutGrid, FileLineChart, HelpCircle, Globe } from 'lucide-react';
import { Order, ActivePage } from '../types';

interface HeaderProps {
  activePage: ActivePage;
  onSelectPage: (page: ActivePage) => void;
  onOpenRegister: () => void;
  onOpenOrders: () => void;
  onOpenDeployGuide?: () => void;
  orders: Order[];
}

export const Header: React.FC<HeaderProps> = ({
  activePage,
  onSelectPage,
  onOpenRegister,
  onOpenOrders,
  onOpenDeployGuide,
  orders,
}) => {
  return (
    <header className="bg-white/95 backdrop-blur-xs border-b border-[#E8E6DF] text-[#2C2C24] sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        <div
          onClick={() => onSelectPage('home')}
          className="flex items-center gap-3.5 cursor-pointer"
        >
          <div className="w-10 h-10 bg-[#5A6B4E] rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md shadow-[#5a6b4e33]">
            DS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#2C2C24] font-serif">
                DataStat
              </h1>
              <span className="text-[#5A6B4E] font-sans text-[10px] uppercase tracking-widest hidden sm:inline-block font-bold bg-[#F0F2ED] px-2.5 py-0.5 rounded-full border border-[#E8E6DF]">
                Kating Mentor &amp; Asistensi
              </span>
            </div>
            <p className="text-xs text-[#8A8A70] hidden md:block">
              Jasa Bantu Tugas &amp; Praktikum Matkul Statistika bareng Kating
            </p>
          </div>
        </div>

        {/* 3 Main Sections Navigation */}
        <nav className="hidden md:flex items-center bg-[#F4F3ED] p-1 rounded-full border border-[#E8E6DF] text-xs font-semibold">
          <button
            onClick={() => onSelectPage('home')}
            className={`px-3.5 py-1.5 rounded-full transition flex items-center gap-1.5 ${
              activePage === 'home'
                ? 'bg-white text-[#2C2C24] shadow-2xs font-bold'
                : 'text-[#8A8A70] hover:text-[#2C2C24]'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5 text-[#5A6B4E]" />
            <span>1. Katalog Matkul &amp; Layanan</span>
          </button>

          <button
            onClick={() => onSelectPage('portfolio')}
            className={`px-3.5 py-1.5 rounded-full transition flex items-center gap-1.5 ${
              activePage === 'portfolio'
                ? 'bg-white text-[#2C2C24] shadow-2xs font-bold'
                : 'text-[#8A8A70] hover:text-[#2C2C24]'
            }`}
          >
            <FileLineChart className="w-3.5 h-3.5 text-[#5A6B4E]" />
            <span>2. Demo Praktikum &amp; Analisis</span>
          </button>

          <button
            onClick={() => onSelectPage('order')}
            className={`px-3.5 py-1.5 rounded-full transition flex items-center gap-1.5 ${
              activePage === 'order'
                ? 'bg-white text-[#2C2C24] shadow-2xs font-bold'
                : 'text-[#8A8A70] hover:text-[#2C2C24]'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#5A6B4E]" />
            <span>3. Order Bantuan Kating (Rekber)</span>
          </button>
        </nav>

        <div className="flex items-center gap-2 sm:gap-2.5">
          {onOpenDeployGuide && (
            <button
              onClick={onOpenDeployGuide}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#5A6B4E] bg-[#F0F2ED] hover:bg-[#E4E7DF] border border-[#E8E6DF] transition"
              title="Panduan Publikasi Gratis ke Vercel atau Netlify"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Deploy Vercel/Netlify</span>
            </button>
          )}

          {orders.length > 0 && (
            <button
              id="btn-view-orders"
              onClick={onOpenOrders}
              className="relative inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold bg-[#F4F3ED] hover:bg-[#EAE8DF] text-[#2C2C24] border border-[#E8E6DF] transition shadow-xs"
              title="Lihat status tugas / pesanan Anda"
            >
              <ClipboardList className="w-3.5 h-3.5 text-[#5A6B4E]" />
              <span className="hidden sm:inline">Tugas Saya</span>
              <span className="bg-[#5A6B4E] text-white font-bold px-1.5 py-0.2 rounded-full text-[10px]">
                {orders.length}
              </span>
            </button>
          )}

          <button
            id="btn-register-freelancer"
            onClick={onOpenRegister}
            className="inline-flex items-center gap-1.5 bg-[#5A6B4E] hover:bg-[#4a5840] text-white px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold shadow-md shadow-[#5a6b4e33] transition active:scale-95"
          >
            <UserPlus className="w-4 h-4 text-white" />
            <span>Gabung Jadi Kating</span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Tabs */}
      <div className="md:hidden flex items-center justify-around border-t border-[#E8E6DF] bg-[#FAF9F5] px-2 py-1.5 text-[11px] font-semibold">
        <button
          onClick={() => onSelectPage('home')}
          className={`py-1 px-2.5 rounded-full ${
            activePage === 'home' ? 'bg-[#5A6B4E] text-white font-bold' : 'text-[#8A8A70]'
          }`}
        >
          1. Katalog Matkul
        </button>
        <button
          onClick={() => onSelectPage('portfolio')}
          className={`py-1 px-2.5 rounded-full ${
            activePage === 'portfolio' ? 'bg-[#5A6B4E] text-white font-bold' : 'text-[#8A8A70]'
          }`}
        >
          2. Demo Praktikum
        </button>
        <button
          onClick={() => onSelectPage('order')}
          className={`py-1 px-2.5 rounded-full ${
            activePage === 'order' ? 'bg-[#5A6B4E] text-white font-bold' : 'text-[#8A8A70]'
          }`}
        >
          3. Order Rekber
        </button>
      </div>
    </header>
  );
};

