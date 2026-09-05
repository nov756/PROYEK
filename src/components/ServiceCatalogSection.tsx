import React, { useState } from 'react';
import {
  Sparkles,
  Database,
  Calculator,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Search,
  SlidersHorizontal,
  FileCheck,
  Zap,
} from 'lucide-react';
import { SERVICE_PACKAGES } from '../data/servicePackages';
import { ServicePackage } from '../types';

interface ServiceCatalogSectionProps {
  onSelectPackageForOrder: (pkg: ServicePackage) => void;
  onNavigateToPortfolio: () => void;
  onNavigateToAI: () => void;
}

// Mastered Software Statistics
const SOFTWARE_STATS = [
  {
    name: 'SPSS Statistics',
    category: 'Parametrik & Non-Parametrik',
    accuracy: '100%',
    projects: '520+ Proyek',
    description: 'Uji hipotesis t-test, ANOVA, regresi linier, regresi logistik, validitas instrumen.',
  },
  {
    name: 'SmartPLS (3 & 4)',
    category: 'PLS-SEM Laten',
    accuracy: '99.8%',
    projects: '410+ Proyek',
    description: 'Outer/inner model, mediasi, moderasi, bootstrapping 5000 subsample.',
  },
  {
    name: 'R & RStudio',
    category: 'Komputasi & Visualisasi',
    accuracy: '100%',
    projects: '280+ Proyek',
    description: 'Analisis data kompleks, ggplot2 kustom, survival analysis, bio-statistika.',
  },
  {
    name: 'Python (Pandas / SciPy)',
    category: 'Data Science & Big Data',
    accuracy: '99.9%',
    projects: '190+ Proyek',
    description: 'Cleaning data skala besar, visualisasi interaktif, NLP teks skripsi.',
  },
  {
    name: 'IBM SPSS AMOS',
    category: 'CB-SEM Kovarians',
    accuracy: '99.5%',
    projects: '230+ Proyek',
    description: 'Goodness-of-fit indices (RMSEA, CFI, GFI), Confirmatory Factor Analysis (CFA).',
  },
  {
    name: 'EViews & Stata',
    category: 'Ekonometrika & Panel',
    accuracy: '100%',
    projects: '260+ Proyek',
    description: 'Data panel Fixed/Random effect, uji Hausman, ARIMA time series, VECM.',
  },
];

export const ServiceCatalogSection: React.FC<ServiceCatalogSectionProps> = ({
  onSelectPackageForOrder,
  onNavigateToPortfolio,
  onNavigateToAI,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedToolFilter, setSelectedToolFilter] = useState('Semua');

  const toolFilters = ['Semua', 'SPSS', 'SmartPLS', 'R', 'AMOS', 'EViews'];

  const filteredPackages = SERVICE_PACKAGES.filter((pkg) => {
    const matchesSearch =
      pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.tools.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTool =
      selectedToolFilter === 'Semua' || pkg.tools.includes(selectedToolFilter);

    return matchesSearch && matchesTool;
  });

  return (
    <div className="space-y-8">
      {/* 1. Hero Banner as explicitly defined in prompt */}
      <div className="bg-[#5A6B4E] text-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-2xl pointer-events-none -mr-20 -mt-20" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-xs px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-[#F0F2ED] border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-[#ECE7D6]" />
            <span>Platform Olah Data Akademik Terpadu</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-serif leading-tight tracking-tight text-white">
            Jasa Olah Data &amp; Konsultasi Penelitian Akademis S1 / S2 / S3
          </h1>

          <p className="text-sm sm:text-base text-[#F0F2ED] leading-relaxed max-w-2xl font-normal">
            Solusi Cepat, Akurat, dan Terpercaya untuk Skripsi, Tesis, &amp; Disertasi{' '}
            <span className="font-semibold text-white">
              (SPSS | R | Python | SmartPLS | AMOS | EViews)
            </span>
            . Dilengkapi AI Konsultan metodologi serta sistem rekening bersama (Rekber) bergaransi.
          </p>

          <div className="pt-3 flex flex-wrap items-center gap-3">
            <button
              onClick={onNavigateToAI}
              className="inline-flex items-center gap-2 bg-white text-[#5A6B4E] hover:bg-[#F4F3ED] px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold shadow-md transition active:scale-95"
            >
              <Zap className="w-4 h-4 text-[#5A6B4E]" />
              <span>Tanya AI Consultant</span>
            </button>

            <button
              onClick={onNavigateToPortfolio}
              className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white border border-white/30 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition"
            >
              <FileCheck className="w-4 h-4 text-[#ECE7D6]" />
              <span>Lihat Demo Portfolio Olah Data</span>
            </button>
          </div>

          <div className="pt-4 border-t border-white/15 flex flex-wrap items-center gap-6 text-xs text-[#F0F2ED]">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#ECE7D6]" />
              <span>Garansi Revisi Dosen</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#ECE7D6]" />
              <span>Rekber Web Aman 15%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#ECE7D6]" />
              <span>Pengerjaan Express 1 - 3 Hari</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Daftar Layanan & Tools: Kartu statistik software */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 gap-2">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#5A6B4E] bg-[#F4F3ED] px-2.5 py-0.5 rounded-full w-fit mb-1 border border-[#E8E6DF]">
              Software Mastery
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#2C2C24] font-serif">
              Statistik Software &amp; Metodologi Dikuasai
            </h3>
            <p className="text-xs text-[#8A8A70]">
              Freelancer mitra kami telah menangani ribuan pengujian statistik dengan standar akurasi tinggi.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SOFTWARE_STATS.map((sw) => (
            <div
              key={sw.name}
              className="bg-white p-5 rounded-2xl border border-[#E8E6DF] hover:border-[#5A6B4E]/40 hover:shadow-md transition group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#2C2C24] group-hover:text-[#5A6B4E] transition font-serif">
                    {sw.name}
                  </h4>
                  <span className="text-[10px] text-[#8A8A70] font-medium block mt-0.5">
                    {sw.category}
                  </span>
                </div>
                <span className="text-xs font-bold text-[#5A6B4E] bg-[#F4F3ED] px-2.5 py-0.5 rounded-full border border-[#E8E6DF]">
                  {sw.projects}
                </span>
              </div>
              <p className="text-xs text-[#8A8A70] mt-3 leading-relaxed">
                {sw.description}
              </p>
              <div className="mt-4 pt-3 border-t border-[#F0F2ED] flex items-center justify-between text-[11px]">
                <span className="text-[#8A8A70]">Tingkat Akurasi Hasil:</span>
                <span className="font-bold text-emerald-700">{sw.accuracy}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Paket Harga: Tabel interaktif paket layanan (Looker Studio Table Component) */}
      <div className="bg-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 border border-[#E8E6DF] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#E8E6DF] gap-4">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#5A6B4E] bg-[#F4F3ED] px-2.5 py-0.5 rounded-full w-fit mb-1 border border-[#E8E6DF]">
              Katalog Transparan
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#2C2C24] font-serif">
              Tabel Interaktif Paket Olah Data
            </h3>
            <p className="text-xs text-[#8A8A70] mt-0.5">
              Pilih paket layanan statistik yang sesuai dengan kebutuhan bab 3 &amp; 4 penelitian Anda.
            </p>
          </div>

          {/* Search & Tool Pills */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 text-[#8A8A70] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari layanan / software..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-3 py-1.5 bg-[#F9F8F6] border border-[#E8E6DF] rounded-full text-xs text-[#2C2C24] focus:outline-none focus:ring-2 focus:ring-[#5A6B4E]/30 focus:border-[#5A6B4E] w-full sm:w-52"
              />
            </div>

            <div className="flex items-center gap-1 overflow-x-auto py-1">
              {toolFilters.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedToolFilter(t)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition whitespace-nowrap border ${
                    selectedToolFilter === t
                      ? 'bg-[#5A6B4E] text-white border-[#5A6B4E]'
                      : 'bg-[#F9F8F6] text-[#2C2C24] border-[#E8E6DF] hover:bg-[#F0F2ED]'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table representation inspired by Looker Studio */}
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left text-xs border-collapse min-w-[650px]">
            <thead>
              <tr className="border-b border-[#E8E6DF] bg-[#FAF9F5] text-[#2C2C24]">
                <th className="py-3 px-4 font-bold">Nama Layanan</th>
                <th className="py-3 px-3 font-bold">Tools / Software</th>
                <th className="py-3 px-4 font-bold">Deskripsi &amp; Deliverables</th>
                <th className="py-3 px-3 font-bold text-center">Estimasi Hari</th>
                <th className="py-3 px-3 font-bold text-right">Harga Mulai</th>
                <th className="py-3 px-4 font-bold text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F2ED] text-[#2C2C24]">
              {filteredPackages.map((pkg) => (
                <tr
                  key={pkg.id}
                  className="hover:bg-[#F9F8F6] transition group"
                >
                  <td className="py-4 px-4 font-bold text-sm text-[#2C2C24] font-serif align-top">
                    <div className="flex items-center gap-1.5">
                      <span>{pkg.name}</span>
                      {pkg.popular && (
                        <span className="text-[9px] font-sans font-bold bg-[#F4F3ED] text-[#5A6B4E] px-2 py-0.5 rounded-full border border-[#E8E6DF]">
                          Populer
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-3 align-top">
                    <span className="bg-white px-2.5 py-1 rounded-full border border-[#E8E6DF] font-semibold text-[#5A6B4E] inline-block shadow-2xs">
                      {pkg.tools}
                    </span>
                  </td>
                  <td className="py-4 px-4 align-top max-w-sm">
                    <p className="text-xs text-[#2C2C24] leading-relaxed mb-2">
                      {pkg.description}
                    </p>
                    <ul className="space-y-1 text-[11px] text-[#8A8A70]">
                      {pkg.deliverables.slice(0, 2).map((d, idx) => (
                        <li key={idx} className="flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-[#5A6B4E] shrink-0" />
                          <span className="truncate">{d}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="py-4 px-3 text-center align-top whitespace-nowrap">
                    <span className="bg-[#FAF9F5] text-[#2C2C24] border border-[#E8E6DF] px-2.5 py-1 rounded-full font-semibold text-xs inline-flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#8A8A70]" />
                      {pkg.turnaround}
                    </span>
                  </td>
                  <td className="py-4 px-3 text-right align-top whitespace-nowrap">
                    <div className="font-bold text-[#5A6B4E] text-sm sm:text-base font-serif">
                      Rp {pkg.startingPrice.toLocaleString('id-ID')}
                    </div>
                    <span className="text-[10px] text-[#8A8A70]">Tarif Dasar Proyek</span>
                  </td>
                  <td className="py-4 px-4 text-center align-top whitespace-nowrap">
                    <button
                      onClick={() => onSelectPackageForOrder(pkg)}
                      className="bg-[#5A6B4E] hover:bg-[#4a5840] text-white px-4 py-2 rounded-full font-bold text-xs transition shadow-sm shadow-[#5a6b4e26] active:scale-95 inline-flex items-center gap-1"
                    >
                      <span>Order Paket</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
