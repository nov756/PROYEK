import React, { useState } from 'react';
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  ReferenceLine,
  Cell,
} from 'recharts';
import {
  LineChart,
  CheckCircle2,
  FileSpreadsheet,
  Layers,
  BookOpen,
  ArrowUpRight,
  TrendingUp,
  Award,
  Sparkles,
  Info,
  Check,
  Copy,
} from 'lucide-react';

interface InteractivePortfolioProps {
  onSelectServiceOrder?: (serviceName: string) => void;
}

// Dummy regression dataset: Skor Kuesioner (X) vs Kinerja (Y)
const REGRESSION_POINTS = [
  { x: 52, y: 55, name: 'Resp 1' },
  { x: 58, y: 62, name: 'Resp 2' },
  { x: 63, y: 60, name: 'Resp 3' },
  { x: 67, y: 71, name: 'Resp 4' },
  { x: 70, y: 68, name: 'Resp 5' },
  { x: 74, y: 77, name: 'Resp 6' },
  { x: 78, y: 82, name: 'Resp 7' },
  { x: 80, y: 79, name: 'Resp 8' },
  { x: 83, y: 86, name: 'Resp 9' },
  { x: 85, y: 84, name: 'Resp 10' },
  { x: 88, y: 91, name: 'Resp 11' },
  { x: 92, y: 95, name: 'Resp 12' },
  { x: 95, y: 94, name: 'Resp 13' },
  { x: 98, y: 99, name: 'Resp 14' },
  { x: 65, y: 67, name: 'Resp 15' },
  { x: 72, y: 75, name: 'Resp 16' },
  { x: 86, y: 89, name: 'Resp 17' },
  { x: 60, y: 64, name: 'Resp 18' },
  { x: 77, y: 76, name: 'Resp 19' },
  { x: 90, y: 92, name: 'Resp 20' },
];

// PLS Indicator Loadings
const PLS_INDICATORS = [
  { indicator: 'X1.1 (Disiplin)', loading: 0.884, valid: true },
  { indicator: 'X1.2 (Punctual)', loading: 0.842, valid: true },
  { indicator: 'X1.3 (Kepatuhan)', loading: 0.795, valid: true },
  { indicator: 'X2.1 (Insentif)', loading: 0.862, valid: true },
  { indicator: 'X2.2 (Support)', loading: 0.817, valid: true },
  { indicator: 'X2.3 (Jenjang)', loading: 0.871, valid: true },
  { indicator: 'Y1.1 (Output)', loading: 0.902, valid: true },
  { indicator: 'Y1.2 (Ketepatan)', loading: 0.856, valid: true },
  { indicator: 'Y1.3 (Efisiensi)', loading: 0.838, valid: true },
];

export const InteractivePortfolio: React.FC<InteractivePortfolioProps> = ({
  onSelectServiceOrder,
}) => {
  const [activeTab, setActiveTab] = useState<'regresi' | 'sem' | 'bab4'>('regresi');
  const [copied, setCopied] = useState(false);

  const handleCopyReport = () => {
    const text = `Tabel 4.12 Hasil Uji Regresi Linier Berganda
Berdasarkan hasil pengujian SPSS versi 26, diperoleh nilai F-hitung sebesar 58.42 dengan nilai signifikansi p = 0.000 (p < 0.05). Hal ini membuktikan bahwa variabel Disiplin Kerja (X1) dan Motivasi (X2) secara simultan berpengaruh signifikan terhadap Kinerja Karyawan (Y). Nilai Koefisien Determinasi (R-Square) sebesar 0.709 mengindikasikan bahwa 70.9% variasi kinerja dapat dijelaskan oleh kedua variabel independen, sedangkan sisanya 29.1% dipengaruhi oleh faktor lain di luar model penelitian.`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Portfolio Showcase Header Banner */}
      <div className="bg-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 border border-[#E8E6DF] shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#5A6B4E]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4F3ED] border border-[#E8E6DF] text-[#5A6B4E] text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Demo Portfolio & Standar Laporan</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2C2C24] font-serif leading-tight">
              Showcase Interaktif Output Olah Data
            </h2>
            <p className="text-sm text-[#8A8A70] mt-2 leading-relaxed">
              Lihat simulasi visual grafik, statistik uji (R², F-hitung, t-value, p-value), serta draf interpretasi ilmiah Bab 4 yang akan Anda peroleh saat memesan jasa di DataStat.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex flex-wrap sm:flex-nowrap bg-[#F4F3ED] p-1.5 rounded-2xl border border-[#E8E6DF] gap-1 shrink-0">
            <button
              onClick={() => setActiveTab('regresi')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                activeTab === 'regresi'
                  ? 'bg-white text-[#2C2C24] shadow-xs border border-[#E8E6DF]'
                  : 'text-[#8A8A70] hover:text-[#2C2C24]'
              }`}
            >
              <TrendingUp className="w-4 h-4 text-[#5A6B4E]" />
              <span>1. Regresi & Hipotesis</span>
            </button>
            <button
              onClick={() => setActiveTab('sem')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                activeTab === 'sem'
                  ? 'bg-white text-[#2C2C24] shadow-xs border border-[#E8E6DF]'
                  : 'text-[#8A8A70] hover:text-[#2C2C24]'
              }`}
            >
              <Layers className="w-4 h-4 text-[#5A6B4E]" />
              <span>2. SEM / SmartPLS</span>
            </button>
            <button
              onClick={() => setActiveTab('bab4')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                activeTab === 'bab4'
                  ? 'bg-white text-[#2C2C24] shadow-xs border border-[#E8E6DF]'
                  : 'text-[#8A8A70] hover:text-[#2C2C24]'
              }`}
            >
              <BookOpen className="w-4 h-4 text-[#5A6B4E]" />
              <span>3. Format Draft Bab 4</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tab 1: Regresi Linier Berganda */}
      {activeTab === 'regresi' && (
        <div className="space-y-6">
          {/* Top Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-[#E8E6DF] shadow-xs">
              <span className="text-xs font-medium text-[#8A8A70]">Koefisien R (Korelasi)</span>
              <div className="text-2xl font-bold text-[#2C2C24] font-serif mt-1">0.842</div>
              <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold mt-1 inline-block">
                Hubungan Sangat Kuat
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E8E6DF] shadow-xs">
              <span className="text-xs font-medium text-[#8A8A70]">R-Square (R²)</span>
              <div className="text-2xl font-bold text-[#5A6B4E] font-serif mt-1">0.709</div>
              <span className="text-[11px] text-[#5A6B4E] bg-[#F4F3ED] px-2 py-0.5 rounded-md font-semibold mt-1 inline-block">
                70.9% Variasi Terjelaskan
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E8E6DF] shadow-xs">
              <span className="text-xs font-medium text-[#8A8A70]">Uji F Simultan</span>
              <div className="text-2xl font-bold text-[#2C2C24] font-serif mt-1">58.42</div>
              <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold mt-1 inline-block">
                Sig. p = 0.000 (Signifikan)
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E8E6DF] shadow-xs">
              <span className="text-xs font-medium text-[#8A8A70]">Status Asumsi Klasik</span>
              <div className="text-2xl font-bold text-emerald-700 font-serif mt-1">Lolos 100%</div>
              <span className="text-[11px] text-[#8A8A70] mt-1 inline-block">
                Norm, Multi, Hetero, Auto
              </span>
            </div>
          </div>

          {/* Interactive Chart & Classical Assumption Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Chart Area */}
            <div className="lg:col-span-8 bg-white p-6 rounded-[28px] border border-[#E8E6DF] shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E8E6DF] gap-2 mb-4">
                <div>
                  <h3 className="text-lg font-bold text-[#2C2C24] font-serif">
                    Scatter Plot & Garis Estimasi Regresi
                  </h3>
                  <p className="text-xs text-[#8A8A70]">
                    Hubungan Skor Total Kuesioner (X) terhadap Kinerja Karyawan (Y) (N = 100 sampel)
                  </p>
                </div>
                <div className="text-xs font-bold text-[#5A6B4E] bg-[#F4F3ED] px-3 py-1 rounded-full border border-[#E8E6DF] self-start sm:self-auto">
                  Persamaan: Y = 12.45 + 0.86X
                </div>
              </div>

              <div className="h-72 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F0F2ED" />
                    <XAxis
                      type="number"
                      dataKey="x"
                      name="Skor Variabel Bebas (X)"
                      domain={[45, 105]}
                      stroke="#8A8A70"
                      fontSize={11}
                      tickLine={false}
                    />
                    <YAxis
                      type="number"
                      dataKey="y"
                      name="Kinerja (Y)"
                      domain={[50, 105]}
                      stroke="#8A8A70"
                      fontSize={11}
                      tickLine={false}
                    />
                    <Tooltip
                      cursor={{ strokeDasharray: '3 3' }}
                      contentStyle={{
                        backgroundColor: '#FFFFFF',
                        borderColor: '#E8E6DF',
                        borderRadius: '12px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                        fontSize: '12px',
                      }}
                    />
                    <ReferenceLine
                      segment={[{ x: 50, y: 55.45 }, { x: 100, y: 98.45 }]}
                      stroke="#5A6B4E"
                      strokeWidth={2.5}
                      strokeDasharray="4 4"
                      label={{ value: 'Garis Regresi (Fitted)', fill: '#5A6B4E', fontSize: 11, position: 'top' }}
                    />
                    <Scatter
                      name="Responden Riset"
                      data={REGRESSION_POINTS}
                      fill="#5A6B4E"
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-3 pt-3 border-t border-[#F0F2ED] flex items-center justify-between text-xs text-[#8A8A70]">
                <span>Titik hijau: Nilai riil kuesioner responden</span>
                <span className="font-medium text-[#2C2C24]">Residual Standar: Tersebar Acak (Homoskedastik)</span>
              </div>
            </div>

            {/* Classical Assumption Diagnostics */}
            <div className="lg:col-span-4 bg-white p-6 rounded-[28px] border border-[#E8E6DF] shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-[#2C2C24] font-serif mb-1">
                  Uji Asumsi Klasik (SPSS)
                </h3>
                <p className="text-xs text-[#8A8A70] mb-4">
                  Syarat mutlak agar persamaan regresi linier bersifat BLUE (Best Linear Unbiased Estimator):
                </p>

                <div className="space-y-3">
                  <div className="p-3 bg-[#FAF9F5] rounded-xl border border-[#E8E6DF] text-xs">
                    <div className="flex items-center justify-between font-bold text-[#2C2C24]">
                      <span>1. Uji Normalitas</span>
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Lolos
                      </span>
                    </div>
                    <p className="text-[11px] text-[#8A8A70] mt-1">
                      Kolmogorov-Smirnov Asymp. Sig: <strong className="text-[#2C2C24]">0.200 &gt; 0.05</strong> (Residual Normal).
                    </p>
                  </div>

                  <div className="p-3 bg-[#FAF9F5] rounded-xl border border-[#E8E6DF] text-xs">
                    <div className="flex items-center justify-between font-bold text-[#2C2C24]">
                      <span>2. Multikolinearitas</span>
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Lolos
                      </span>
                    </div>
                    <p className="text-[11px] text-[#8A8A70] mt-1">
                      Tolerance = 0.704 (&gt; 0.10) & VIF = <strong className="text-[#2C2C24]">1.42 (&lt; 10)</strong> (Tidak ada multikol).
                    </p>
                  </div>

                  <div className="p-3 bg-[#FAF9F5] rounded-xl border border-[#E8E6DF] text-xs">
                    <div className="flex items-center justify-between font-bold text-[#2C2C24]">
                      <span>3. Heteroskedastisitas</span>
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Lolos
                      </span>
                    </div>
                    <p className="text-[11px] text-[#8A8A70] mt-1">
                      Uji Glejser Sig: <strong className="text-[#2C2C24]">0.384 &gt; 0.05</strong> (Tidak terjadi heteroskedastisitas).
                    </p>
                  </div>

                  <div className="p-3 bg-[#FAF9F5] rounded-xl border border-[#E8E6DF] text-xs">
                    <div className="flex items-center justify-between font-bold text-[#2C2C24]">
                      <span>4. Autokorelasi</span>
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Lolos
                      </span>
                    </div>
                    <p className="text-[11px] text-[#8A8A70] mt-1">
                      Durbin-Watson = <strong className="text-[#2C2C24]">1.892</strong> (Bebas autokorelasi, du &lt; DW &lt; 4-du).
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[#F0F2ED]">
                <button
                  onClick={() => onSelectServiceOrder?.('Analisis Regresi & Uji Hipotesis')}
                  className="w-full bg-[#5A6B4E] hover:bg-[#4a5840] text-white py-2.5 rounded-full text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm shadow-[#5a6b4e26]"
                >
                  <span>Pesan Paket Regresi Lengkap</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Coefficients Table Demo */}
          <div className="bg-white rounded-[28px] border border-[#E8E6DF] p-6 shadow-xs overflow-x-auto">
            <h4 className="text-base font-bold text-[#2C2C24] font-serif mb-3">
              Tabel Output Koefisien Regresi & Uji Parsial (Uji t)
            </h4>
            <table className="w-full text-left text-xs border-collapse min-w-[550px]">
              <thead>
                <tr className="border-b border-[#E8E6DF] bg-[#FAF9F5] text-[#2C2C24]">
                  <th className="py-2.5 px-3 font-bold">Model / Variabel</th>
                  <th className="py-2.5 px-3 font-bold">Unstandardized B</th>
                  <th className="py-2.5 px-3 font-bold">Std. Error</th>
                  <th className="py-2.5 px-3 font-bold">Standardized Beta</th>
                  <th className="py-2.5 px-3 font-bold">t-hitung</th>
                  <th className="py-2.5 px-3 font-bold">Sig. (p-value)</th>
                  <th className="py-2.5 px-3 font-bold">Keputusan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0F2ED] text-[#2C2C24]">
                <tr>
                  <td className="py-2.5 px-3 font-semibold">(Constant)</td>
                  <td className="py-2.5 px-3">12.450</td>
                  <td className="py-2.5 px-3">3.810</td>
                  <td className="py-2.5 px-3">-</td>
                  <td className="py-2.5 px-3">3.268</td>
                  <td className="py-2.5 px-3">0.002</td>
                  <td className="py-2.5 px-3 font-semibold text-emerald-700">Signifikan</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold">Disiplin Kerja (X1)</td>
                  <td className="py-2.5 px-3">0.428</td>
                  <td className="py-2.5 px-3">0.082</td>
                  <td className="py-2.5 px-3 font-bold text-[#5A6B4E]">0.461</td>
                  <td className="py-2.5 px-3">5.220</td>
                  <td className="py-2.5 px-3 font-bold text-emerald-700">0.000</td>
                  <td className="py-2.5 px-3">
                    <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold">
                      H1 Diterima
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold">Motivasi Kerja (X2)</td>
                  <td className="py-2.5 px-3">0.385</td>
                  <td className="py-2.5 px-3">0.083</td>
                  <td className="py-2.5 px-3 font-bold text-[#5A6B4E]">0.412</td>
                  <td className="py-2.5 px-3">4.638</td>
                  <td className="py-2.5 px-3 font-bold text-emerald-700">0.000</td>
                  <td className="py-2.5 px-3">
                    <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold">
                      H2 Diterima
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Structural Equation Modeling (SmartPLS) */}
      {activeTab === 'sem' && (
        <div className="space-y-6">
          {/* SEM Header Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-[#E8E6DF] shadow-xs">
              <span className="text-xs font-medium text-[#8A8A70]">Outer Model (Convergent Validity)</span>
              <div className="text-xl font-bold text-[#2C2C24] font-serif mt-1">Outer Loadings &gt; 0.708</div>
              <p className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold mt-1 inline-block">
                Semua Indikator Valid Sempurna
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E8E6DF] shadow-xs">
              <span className="text-xs font-medium text-[#8A8A70]">Composite Reliability (CR)</span>
              <div className="text-xl font-bold text-[#5A6B4E] font-serif mt-1">CR: 0.892 - 0.925</div>
              <p className="text-[11px] text-[#5A6B4E] bg-[#F4F3ED] px-2 py-0.5 rounded font-semibold mt-1 inline-block">
                Threshold &gt; 0.70 Terpenuhi
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E8E6DF] shadow-xs">
              <span className="text-xs font-medium text-[#8A8A70]">Average Variance Extracted (AVE)</span>
              <div className="text-xl font-bold text-[#2C2C24] font-serif mt-1">AVE: 0.684 - 0.761</div>
              <p className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold mt-1 inline-block">
                Threshold &gt; 0.50 Terpenuhi
              </p>
            </div>
          </div>

          {/* Bar Chart: Outer Loadings */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-white p-6 rounded-[28px] border border-[#E8E6DF] shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8E6DF] mb-4">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#2C2C24] font-serif">
                    Evaluasi Outer Loadings per Indikator
                  </h3>
                  <p className="text-xs text-[#8A8A70]">
                    Nilai outer loading mencerminkan korelasi butir instrumen terhadap variabel laten
                  </p>
                </div>
                <div className="text-xs font-bold text-[#5A6B4E] bg-[#F4F3ED] px-2.5 py-1 rounded-full border border-[#E8E6DF]">
                  Batas Min: 0.70
                </div>
              </div>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={PLS_INDICATORS} margin={{ top: 10, right: 10, bottom: 30, left: -10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F0F2ED" vertical={false} />
                    <XAxis
                      dataKey="indicator"
                      stroke="#8A8A70"
                      fontSize={10}
                      angle={-30}
                      textAnchor="end"
                      tickLine={false}
                    />
                    <YAxis
                      domain={[0.6, 1.0]}
                      stroke="#8A8A70"
                      fontSize={11}
                      tickLine={false}
                    />
                    <Tooltip
                      formatter={(val: any) => [`${val}`, 'Outer Loading']}
                      contentStyle={{
                        backgroundColor: '#FFFFFF',
                        borderColor: '#E8E6DF',
                        borderRadius: '12px',
                        fontSize: '12px',
                      }}
                    />
                    <ReferenceLine
                      y={0.70}
                      stroke="#DC2626"
                      strokeDasharray="4 4"
                      label={{ value: 'Ambang Batas 0.70', fill: '#DC2626', fontSize: 10, position: 'insideTopRight' }}
                    />
                    <Bar dataKey="loading" radius={[6, 6, 0, 0]}>
                      {PLS_INDICATORS.map((_, index) => (
                        <Cell key={`cell-${index}`} fill="#5A6B4E" />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Path Coefficients & Hypotheses */}
            <div className="lg:col-span-5 bg-white p-6 rounded-[28px] border border-[#E8E6DF] shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-[#2C2C24] font-serif mb-1">
                  Pengujian Hipotesis (Inner Model)
                </h3>
                <p className="text-xs text-[#8A8A70] mb-3">
                  Hasil Uji Bootstrapping SmartPLS 4 (5.000 Subsample, two-tailed sig 5%):
                </p>

                <div className="space-y-2.5">
                  <div className="p-3 bg-[#FAF9F5] rounded-xl border border-[#E8E6DF] text-xs">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-[#2C2C24]">H1: Disiplin (X1) &rarr; Kinerja (Y)</span>
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded">
                        Diterima
                      </span>
                    </div>
                    <p className="text-[11px] text-[#8A8A70]">
                      Path Coeff (&beta;): <strong className="text-[#2C2C24]">0.421</strong> | T-stat: <strong className="text-[#2C2C24]">4.821 &gt; 1.96</strong> | p-value: <strong className="text-emerald-700">0.000</strong>
                    </p>
                  </div>

                  <div className="p-3 bg-[#FAF9F5] rounded-xl border border-[#E8E6DF] text-xs">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-[#2C2C24]">H2: Motivasi (X2) &rarr; Kinerja (Y)</span>
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded">
                        Diterima
                      </span>
                    </div>
                    <p className="text-[11px] text-[#8A8A70]">
                      Path Coeff (&beta;): <strong className="text-[#2C2C24]">0.354</strong> | T-stat: <strong className="text-[#2C2C24]">3.914 &gt; 1.96</strong> | p-value: <strong className="text-emerald-700">0.001</strong>
                    </p>
                  </div>

                  <div className="p-3 bg-[#FAF9F5] rounded-xl border border-[#E8E6DF] text-xs">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-[#2C2C24]">H3 (Mediasi): X1 &rarr; M &rarr; Y</span>
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded">
                        Diterima
                      </span>
                    </div>
                    <p className="text-[11px] text-[#8A8A70]">
                      Specific Indirect: <strong className="text-[#2C2C24]">0.185</strong> | T-stat: <strong className="text-[#2C2C24]">2.451</strong> | p-value: <strong className="text-emerald-700">0.015</strong> (Mediasi Parsial)
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[#F0F2ED]">
                <button
                  onClick={() => onSelectServiceOrder?.('Structural Equation Modeling (SEM)')}
                  className="w-full bg-[#5A6B4E] hover:bg-[#4a5840] text-white py-2.5 rounded-full text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>Pesan Analisis SmartPLS / AMOS</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Format Draf Bab 4 Skripsi */}
      {activeTab === 'bab4' && (
        <div className="bg-white rounded-[28px] sm:rounded-[32px] border border-[#E8E6DF] p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E8E6DF] gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[#5A6B4E] bg-[#F4F3ED] px-2.5 py-0.5 rounded-full mb-1">
                <BookOpen className="w-3 h-3" />
                <span>Format Akademis Standar Dikti / Kampus</span>
              </div>
              <h3 className="text-xl font-bold text-[#2C2C24] font-serif">
                Draf Interpretasi Hasil Penelitian (Bab 4)
              </h3>
              <p className="text-xs text-[#8A8A70]">
                Contoh gaya penulisan ilmiah yang disertakan dalam paket olah data lengkap DataStat.
              </p>
            </div>

            <button
              onClick={handleCopyReport}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#F4F3ED] hover:bg-[#EAE8DF] text-[#2C2C24] border border-[#E8E6DF] rounded-full text-xs font-bold transition self-start sm:self-auto"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-[#5A6B4E]" />}
              <span>{copied ? 'Tersalin ke Clipboard!' : 'Salin Contoh Teks'}</span>
            </button>
          </div>

          <div className="prose max-w-none text-xs sm:text-sm text-[#2C2C24] leading-relaxed space-y-4 bg-[#FAF9F5] p-6 rounded-2xl border border-[#E8E6DF]">
            <h4 className="text-sm sm:text-base font-bold text-[#2C2C24] font-serif">
              4.3 Pembahasan Hasil Uji Regresi Linier Berganda
            </h4>

            <p>
              Berdasarkan hasil estimasi model regresi yang disajikan pada Tabel 4.12, diperoleh persamaan regresi linier berganda sebagai berikut:
            </p>

            <div className="bg-white p-3 rounded-xl border border-[#E8E6DF] font-mono text-center text-xs font-bold text-[#5A6B4E]">
              Y = 12.450 + 0.428 X₁ + 0.385 X₂ + e
            </div>

            <p>
              Dari formulasi persamaan tersebut, dapat diuraikan interpretasi empiris sebagai berikut:
            </p>

            <ol className="list-decimal pl-5 space-y-2">
              <li>
                <strong>Nilai Konstanta (&alpha;) sebesar 12.450</strong> mengindikasikan bahwa apabila variabel Disiplin Kerja (X₁) dan Motivasi Kerja (X₂) diasumsikan bernilai konstan atau nol, maka tingkat Kinerja Karyawan (Y) tetap diprediksi sebesar 12.450 satuan nilai.
              </li>
              <li>
                <strong>Koefisien Regresi Disiplin Kerja (&beta;₁ = 0.428) bernilai positif</strong> dengan nilai t-hitung sebesar 5.220 (&gt; t-tabel 1.984) dan signifikansi 0.000 (&lt; 0.05). Hal ini membuktikan bahwa hipotesis pertama (H₁) diterima secara statistik. Setiap kenaikan satu satuan skor disiplin kerja akan meningkatkan kinerja karyawan sebesar 0.428 satuan.
              </li>
              <li>
                <strong>Koefisien Regresi Motivasi Kerja (&beta;₂ = 0.385) bernilai positif</strong> dengan nilai t-hitung sebesar 4.638 (&gt; t-tabel 1.984) dan signifikansi 0.000 (&lt; 0.05). Dengan demikian, hipotesis kedua (H₂) terbukti secara signifikan.
              </li>
            </ol>

            <div className="p-4 bg-white rounded-xl border border-[#E8E6DF] flex items-start gap-3 mt-4">
              <Info className="w-5 h-5 text-[#5A6B4E] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-[#2C2C24]">Jaminan Kualitas Akademik DataStat</p>
                <p className="text-[11px] text-[#8A8A70] mt-0.5">
                  Setiap hasil olah data dikerjakan langsung oleh freelancer lulusan Statistika/Matematika terverifikasi lengkap dengan penjelasan argumentatif yang dapat Anda pelajari sebelum sidang proposal/skripsi.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
