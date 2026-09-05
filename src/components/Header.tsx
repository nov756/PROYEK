import React from 'react';
import { UserPlus, ClipboardList, Sparkles, LayoutGrid, FileLineChart, HelpCircle } from 'lucide-react';
import { Order, ActivePage } from '../types';

interface HeaderProps {
  activePage: ActivePage;
  onSelectPage: (page: ActivePage) => void;
  onOpenRegister: () => void;
  onOpenOrders: () => void;
  orders: Order[];
}

export const Header: React.FC<HeaderProps> = ({
  activePage,
  onSelectPage,
  onOpenRegister,
  onOpenOrders,
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
              <span className="text-[#8A8A70] font-sans text-[10px] uppercase tracking-widest hidden sm:inline-block font-semibold bg-[#F4F3ED] px-2 py-0.5 rounded-full border border-[#E8E6DF]">
                Looker Portfolio &amp; App
              </span>
            </div>
            <p className="text-xs text-[#8A8A70] hidden md:block">
              Jasa Olah Data &amp; Konsultasi Penelitian Akademis S1/S2/S3
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
            <span>1. Beranda &amp; Katalog</span>
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
            <span>2. Demo Portfolio Analisis</span>
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
            <span>3. Konsultasi &amp; Order Rekber</span>
          </button>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {orders.length > 0 && (
            <button
              id="btn-view-orders"
              onClick={onOpenOrders}
              className="relative inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold bg-[#F4F3ED] hover:bg-[#EAE8DF] text-[#2C2C24] border border-[#E8E6DF] transition shadow-xs"
              title="Lihat status pesanan olah data Anda"
            >
              <ClipboardList className="w-3.5 h-3.5 text-[#5A6B4E]" />
              <span className="hidden sm:inline">Pesanan Saya</span>
              <span className="bg-[#5A6B4E] text-white font-bold px-1.5 py-0.2 rounded-full text-[10px]">
                {orders.length}
              </span>
            </button>
          )}

          <button
            id="btn-register-freelancer"
            onClick={onOpenRegister}
            className="inline-flex items-center gap-1.5 bg-[#5A6B4E] hover:bg-[#4a5840] text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold shadow-md shadow-[#5a6b4e33] transition active:scale-95"
          >
            <UserPlus className="w-4 h-4 text-white" />
            <span>Daftar Mitra</span>
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
          1. Katalog
        </button>
        <button
          onClick={() => onSelectPage('portfolio')}
          className={`py-1 px-2.5 rounded-full ${
            activePage === 'portfolio' ? 'bg-[#5A6B4E] text-white font-bold' : 'text-[#8A8A70]'
          }`}
        >
          2. Demo Analisis
        </button>
        <button
          onClick={() => onSelectPage('order')}
          className={`py-1 px-2.5 rounded-full ${
            activePage === 'order' ? 'bg-[#5A6B4E] text-white font-bold' : 'text-[#8A8A70]'
          }`}
        >
          3. Order &amp; Rekber
        </button>
      </div>
    </header>
  );
};

