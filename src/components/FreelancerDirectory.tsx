import React, { useState, useMemo } from 'react';
import { Search, Star, CheckCircle2, Clock, Briefcase, ChevronDown, Filter, Zap, UserPlus, Sparkles, Trash2 } from 'lucide-react';
import { Freelancer } from '../types';

interface FreelancerDirectoryProps {
  freelancers: Freelancer[];
  onHire: (freelancer: Freelancer) => void;
  selectedToolFilter?: string;
  onSelectToolFilter?: (tool: string) => void;
  onOpenRegister?: () => void;
  onLoadDemoData?: () => void;
  onClearData?: () => void;
}

const TOOL_PILLS = [
  'Semua',
  'SPSS',
  'SmartPLS',
  'R',
  'Python',
  'EViews',
  'Stata',
  'Jamovi',
  'NVivo',
];

const getAvatarTheme = (name: string) => {
  if (name.includes('Budi')) return { bg: 'bg-[#E0E2D9]', text: 'text-[#5A6B4E]' };
  if (name.includes('Siti')) return { bg: 'bg-[#EBDED2]', text: 'text-[#946F55]' };
  if (name.includes('Andi') || name.includes('Dimas')) return { bg: 'bg-[#D6E0EB]', text: 'text-[#557594]' };
  if (name.includes('Anisa')) return { bg: 'bg-[#E2D9E0]', text: 'text-[#7E577A]' };
  if (name.includes('Hendra')) return { bg: 'bg-[#D9E2DC]', text: 'text-[#4A6D56]' };
  return { bg: 'bg-[#ECE7D6]', text: 'text-[#7F7449]' };
};

const getInitials = (name: string) => {
  const parts = name.split(' ');
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return (name.slice(0, 2) || 'DS').toUpperCase();
};

export const FreelancerDirectory: React.FC<FreelancerDirectoryProps> = ({
  freelancers,
  onHire,
  selectedToolFilter = 'Semua',
  onSelectToolFilter,
  onOpenRegister,
  onLoadDemoData,
  onClearData,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTool, setActiveTool] = useState(selectedToolFilter);
  const [sortBy, setSortBy] = useState<'recommended' | 'rating' | 'priceAsc' | 'projects'>('recommended');

  const handleToolClick = (tool: string) => {
    setActiveTool(tool);
    if (onSelectToolFilter) {
      onSelectToolFilter(tool);
    }
  };

  const filteredFreelancers = useMemo(() => {
    return freelancers.filter((f) => {
      const matchesSearch =
        f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
        f.tools.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        f.bio.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTool =
        activeTool === 'Semua' ||
        f.tools.some((t) => t.toLowerCase() === activeTool.toLowerCase()) ||
        f.specialties.some((s) => s.toLowerCase().includes(activeTool.toLowerCase()));

      return matchesSearch && matchesTool;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'priceAsc') return a.pricePerProject - b.pricePerProject;
      if (sortBy === 'projects') return b.completedProjects - a.completedProjects;
      return 0; // default order
    });
  }, [freelancers, searchQuery, activeTool, sortBy]);

  return (
    <div className="bg-white p-6 sm:p-8 rounded-[28px] sm:rounded-[32px] shadow-xs border border-[#E8E6DF] flex flex-col min-h-[650px] md:min-h-[720px]">
      {/* Directory Title & Controls */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#2C2C24] font-serif flex items-center gap-2 mb-1">
              <span>Pilih Expert Data</span>
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border font-sans ${
                freelancers.length === 0 
                  ? 'bg-[#F9F8F6] text-[#8A8A70] border-[#E8E6DF]' 
                  : 'bg-[#F0F2ED] text-[#5A6B4E] border-[#E8E6DF]'
              }`}>
                {freelancers.length === 0 ? '0 Terdaftar' : `${filteredFreelancers.length} Tersedia`}
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-[#8A8A70]">
              Hubungi pakar statistika terverifikasi kami untuk hasil terbaik skripsi &amp; penelitian.
            </p>
          </div>

          {/* Sort Dropdown & Roster Actions */}
          <div className="flex items-center gap-3 self-end sm:self-auto text-xs">
            {freelancers.length > 0 && onClearData && (
              <button
                onClick={onClearData}
                className="text-[11px] text-[#8A8A70] hover:text-[#A94A42] flex items-center gap-1 transition px-2 py-1 rounded-md hover:bg-[#F9F8F6]"
                title="Kosongkan daftar expert untuk pengujian"
              >
                <Trash2 className="w-3 h-3" />
                <span>Kosongkan Daftar</span>
              </button>
            )}

            {freelancers.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-[#8A8A70] font-medium">Urutkan:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-[#F9F8F6] border border-[#E8E6DF] rounded-full px-3 py-1.5 text-xs text-[#2C2C24] focus:outline-none focus:border-[#5A6B4E] font-medium cursor-pointer"
                >
                  <option value="recommended">Rekomendasi Terbaik</option>
                  <option value="rating">Rating Tertinggi ★</option>
                  <option value="priceAsc">Harga Terendah</option>
                  <option value="projects">Paling Banyak Proyek</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Search Input (only if there are freelancers) */}
        {freelancers.length > 0 && (
          <div className="relative mb-3">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8A70]" />
            <input
              type="text"
              placeholder="Cari nama konsultan, metode (Regresi, SEM, ARIMA), atau software..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-12 py-2.5 border border-[#E8E6DF] rounded-full text-xs sm:text-sm bg-[#F9F8F6] text-[#2C2C24] placeholder:text-[#8A8A70] focus:bg-white focus:outline-none focus:border-[#5A6B4E] transition shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#8A8A70] hover:text-[#2C2C24]"
              >
                Batal
              </button>
            )}
          </div>
        )}

        {/* Software / Tools Filter Pills (only if there are freelancers) */}
        {freelancers.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <span className="text-[11px] font-semibold text-[#8A8A70] mr-0.5 flex items-center gap-1 shrink-0">
              <Filter className="w-3 h-3 text-[#5A6B4E]" /> Software:
            </span>
            {TOOL_PILLS.map((tool) => {
              const isActive = activeTool === tool;
              return (
                <button
                  key={tool}
                  onClick={() => handleToolClick(tool)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition shrink-0 border ${
                    isActive
                      ? 'bg-[#5A6B4E] text-white border-[#5A6B4E] shadow-sm'
                      : 'bg-[#F9F8F6] hover:bg-[#F0F2ED] text-[#2C2C24] border-[#E8E6DF]'
                  }`}
                >
                  {tool}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Freelancer List */}
      <div id="freelancer-list" className="space-y-4 flex-1 overflow-y-auto pr-0.5 flex flex-col justify-center">
        {freelancers.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-[#FAF9F5] rounded-3xl border border-dashed border-[#E8E6DF] my-auto">
            <div className="w-16 h-16 rounded-2xl bg-[#E0E2D9] text-[#5A6B4E] flex items-center justify-center mb-4 shadow-sm border border-[#D5D8CC]">
              <UserPlus className="w-8 h-8" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#5A6B4E] bg-[#EAECE4] px-3 py-1 rounded-full mb-2 border border-[#D5D8CC]">
              Roster Belum Terisi
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-[#2C2C24] font-serif mb-2">
              Daftar Expert Masih Kosong
            </h3>
            <p className="text-xs sm:text-sm text-[#8A8A70] max-w-md leading-relaxed mb-6">
              Saat ini belum ada mitra konsultan atau pakar olah data yang terdaftar di platform DataStat. Anda menguasai SPSS, SmartPLS, R, Python, AMOS, atau EViews? Daftarkan diri Anda sekarang untuk menjadi mitra ahli pertama kami!
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {onOpenRegister && (
                <button
                  id="btn-register-empty-expert"
                  onClick={onOpenRegister}
                  className="bg-[#5A6B4E] hover:bg-[#4A5940] text-white px-6 py-2.5 rounded-full text-xs font-bold shadow-md shadow-[#5a6b4e26] transition active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Daftar Jadi Mitra Expert</span>
                </button>
              )}
              {onLoadDemoData && (
                <button
                  id="btn-load-demo-experts"
                  onClick={onLoadDemoData}
                  className="bg-[#F4F3ED] hover:bg-[#EAE8DF] text-[#2C2C24] px-5 py-2.5 rounded-full text-xs font-semibold border border-[#E8E6DF] transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#5A6B4E]" />
                  <span>Muat Contoh Data Expert (Demo)</span>
                </button>
              )}
            </div>
          </div>
        ) : filteredFreelancers.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center bg-[#FAF9F5] rounded-2xl border border-dashed border-[#E8E6DF] my-auto">
            <div className="w-12 h-12 rounded-full bg-[#E0E2D9] flex items-center justify-center text-[#5A6B4E] mb-2">
              <Search className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-semibold text-[#2C2C24]">Tidak ada expert yang cocok</h4>
            <p className="text-xs text-[#8A8A70] max-w-sm mt-1">
              Coba ganti filter software atau kata kunci pencarian Anda untuk menemukan konsultan lainnya.
            </p>
            <button
              onClick={() => {
                setActiveTool('Semua');
                setSearchQuery('');
              }}
              className="mt-3 text-xs text-[#5A6B4E] font-semibold hover:underline cursor-pointer"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          filteredFreelancers.map((talent) => {
            const avatarTheme = getAvatarTheme(talent.name);
            const initials = getInitials(talent.name);

            return (
              <div
                key={talent.id}
                className="flex flex-col sm:flex-row justify-between sm:items-center p-5 sm:p-6 rounded-2xl border border-[#F0F2ED] hover:bg-[#F9F8F6] hover:border-[#E8E6DF] transition bg-white gap-4 shadow-xs"
              >
                <div className="flex items-start sm:items-center gap-4 sm:gap-5 flex-1">
                  {/* Round Natural Tones Avatar */}
                  <div
                    className={`w-13 sm:w-14 h-13 sm:h-14 rounded-full ${avatarTheme.bg} ${avatarTheme.text} border-2 border-white shadow-sm flex items-center justify-center font-bold text-base sm:text-lg shrink-0`}
                  >
                    {initials}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="font-bold text-base sm:text-lg text-[#2C2C24] leading-tight font-serif">
                        {talent.name}, {talent.degree}
                      </h3>
                      {talent.verified && (
                        <span
                          className="inline-flex items-center gap-0.5 text-[10px] font-semibold bg-[#F0F2ED] text-[#5A6B4E] px-2 py-0.5 rounded-full border border-[#E8E6DF]"
                          title="Identitas & Kualifikasi Statistika Terverifikasi"
                        >
                          <CheckCircle2 className="w-3 h-3 text-[#5A6B4E]" />
                          Verified
                        </span>
                      )}
                      {talent.online && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-[#5A6B4E] font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Aktif Sekarang
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-[#8A8A70] mb-2 font-medium">
                      Spesialis: <span className="text-[#2C2C24] font-normal">{talent.specialties.join(', ')}</span>
                    </p>

                    {/* Badges: Rating, Completed, Turnaround */}
                    <div className="flex items-center gap-2 flex-wrap mb-2.5">
                      <span className="flex items-center gap-1 text-xs bg-[#F0F2ED] text-[#5A6B4E] px-2.5 py-1 rounded-full font-bold">
                        ★ {talent.rating.toFixed(1)}
                        <span className="text-[#8A8A70] font-normal text-[11px]">({talent.reviewCount})</span>
                      </span>

                      <span className="text-xs text-[#A5A58D] font-medium inline-flex items-center gap-1">
                        <Briefcase className="w-3 h-3 text-[#8A8A70]" />
                        {talent.completedProjects} Proyek Selesai
                      </span>

                      <span className="text-xs text-[#A5A58D] font-medium inline-flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#8A8A70]" />
                        {talent.turnaroundTime}
                      </span>
                    </div>

                    {/* Tool Pills */}
                    <div className="flex items-center gap-1 flex-wrap">
                      <span className="text-[11px] text-[#8A8A70] mr-0.5">Software:</span>
                      {talent.tools.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-semibold bg-[#F0F2ED] text-[#5A6B4E] px-2.5 py-0.5 rounded-full border border-[#E8E6DF]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Price & Action Button */}
                <div className="sm:text-right border-t sm:border-t-0 border-[#F0F2ED] pt-3 sm:pt-0 flex sm:flex-col justify-between sm:justify-center items-center sm:items-end gap-2 shrink-0">
                  <div>
                    <p className="text-lg font-bold text-[#5A6B4E] mb-0 sm:mb-2">
                      Rp {(talent.pricePerProject / 1000).toLocaleString('id-ID')}k{' '}
                      <span className="text-xs font-normal text-[#8A8A70]">/ Proyek</span>
                    </p>
                    <p className="text-[10px] text-[#5A6B4E] font-medium hidden sm:block">
                      ✓ Garansi revisi & bimbingan
                    </p>
                  </div>

                  <button
                    id={`btn-hire-${talent.id}`}
                    onClick={() => onHire(talent)}
                    className="bg-[#5A6B4E] hover:bg-[#4a5840] text-white px-6 py-2.5 rounded-full text-xs font-bold hover:opacity-90 shadow-md shadow-[#5a6b4e26] transition active:scale-95 flex items-center gap-1.5"
                  >
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    <span>Hire Talent</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Trust Banner at bottom */}
      <div className="mt-5 pt-3.5 border-t border-[#F0F2ED] flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#8A8A70]">
        <span className="flex items-center gap-1 text-[#2C2C24] font-medium">
          🔒 Pembayaran aman & data penelitian terjamin rahasia
        </span>
        <span className="text-[#5A6B4E] font-medium">
          Butuh custom metode khusus? Tanyakan pada AI Consultant terlebih dahulu.
        </span>
      </div>
    </div>
  );
};
