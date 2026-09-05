import React, { useState } from 'react';
import {
  ShieldCheck,
  Calculator,
  MessageSquare,
  FileText,
  UploadCloud,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Lock,
  ArrowRight,
  HelpCircle,
  Clock,
  Send,
} from 'lucide-react';
import { Freelancer, Order } from '../types';

interface ConsultationAndOrderSectionProps {
  freelancers: Freelancer[];
  onSubmitOrder: (order: Order) => void;
  onOpenOrdersModal: () => void;
  activeOrdersCount: number;
}

const KOMISI_ADMIN_PERCENT = 0.15;
const ADMIN_WHATSAPP = '6281818741970';

export const ConsultationAndOrderSection: React.FC<ConsultationAndOrderSectionProps> = ({
  freelancers,
  onSubmitOrder,
  onOpenOrdersModal,
  activeOrdersCount,
}) => {
  // Calculator state
  const [calcTalentName, setCalcTalentName] = useState(
    freelancers[0]?.name || 'Tim Ahli DataStat (Pencocokan Otomatis)'
  );
  const [calcPrice, setCalcPrice] = useState<number>(freelancers[0]?.pricePerProject || 200000);

  // Form submission state
  const [clientName, setClientName] = useState('');
  const [clientWhatsapp, setClientWhatsapp] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [university, setUniversity] = useState('');
  const [studyLevel, setStudyLevel] = useState('S1 (Skripsi)');
  const [researchTitle, setResearchTitle] = useState('');
  const [selectedSoftware, setSelectedSoftware] = useState('SPSS');
  const [selectedFreelancerId, setSelectedFreelancerId] = useState(
    freelancers[0]?.id || 'team-datastat'
  );
  const [notes, setNotes] = useState('');
  const [datasetFile, setDatasetFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeFormTab, setActiveFormTab] = useState<'web' | 'gform'>('web');

  // Calculations
  const komisiAdmin = calcPrice * KOMISI_ADMIN_PERCENT;
  const hakFreelancer = calcPrice - komisiAdmin;

  const handleQuickWhatsAppAdmin = (talent: string, amount: number) => {
    const waMsg = encodeURIComponent(
      `Halo Admin DataStat, saya mau order jasa olah data dari Freelancer: ${talent} dengan nominal Rp ${amount.toLocaleString('id-ID')}. Mohon info instruksi pembayaran rekening bersama (Rekber).`
    );
    window.open(`https://wa.me/${ADMIN_WHATSAPP}?text=${waMsg}`, '_blank');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const chosenFreelancer =
      freelancers.find((f) => f.id === selectedFreelancerId) ||
      freelancers[0] || {
        id: 'team-datastat',
        name: 'Tim Ahli DataStat (Matching Otomatis)',
        pricePerProject: 250000,
      };
    const orderPrice = chosenFreelancer?.pricePerProject || 250000;
    const adminFee = orderPrice * KOMISI_ADMIN_PERCENT;
    const netFreelancer = orderPrice - adminFee;

    const newOrder: Order = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      freelancerId: chosenFreelancer?.id || 'f-1',
      freelancerName: chosenFreelancer?.name || 'Expert DataStat',
      freelancerPrice: orderPrice,
      clientName,
      clientEmail,
      clientWhatsapp,
      researchTitle,
      researchField: `${studyLevel} - ${university || 'Umum'}`,
      software: selectedSoftware,
      notes: notes || 'Pengerjaan olah data dan interpretasi bab 4 skripsi.',
      deadlineDays: 3,
      hasDataset: Boolean(datasetFile),
      datasetName: datasetFile?.name,
      status: 'Menunggu Konfirmasi',
      createdAt: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      totalPrice: orderPrice,
      adminFee,
      freelancerNet: netFreelancer,
    };

    setTimeout(() => {
      onSubmitOrder(newOrder);
      setIsSubmitting(false);

      // Auto trigger WhatsApp Rekber
      handleQuickWhatsAppAdmin(newOrder.freelancerName, newOrder.totalPrice);
    }, 600);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Escrow Banner */}
      <div className="bg-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 border border-[#E8E6DF] shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#E8E6DF]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4F3ED] text-[#5A6B4E] text-xs font-bold uppercase tracking-wider mb-2 border border-[#E8E6DF]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Sistem Rekber Amanah &amp; Terpercaya</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2C2C24] font-serif">
              Konsultasi &amp; Order Jasa Olah Data
            </h2>
            <p className="text-xs sm:text-sm text-[#8A8A70] mt-1.5 max-w-2xl leading-relaxed">
              Dana Anda disimpan di Rekening Bersama (Rekber) DataStat dan baru diteruskan ke Freelancer setelah hasil analisis diverifikasi dan disetujui oleh Anda.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {activeOrdersCount > 0 && (
              <button
                onClick={onOpenOrdersModal}
                className="bg-[#F4F3ED] hover:bg-[#EAE8DF] text-[#2C2C24] px-4 py-2.5 rounded-full text-xs font-bold border border-[#E8E6DF] transition"
              >
                Cek Pesanan Aktif ({activeOrdersCount})
              </button>
            )}

            <button
              onClick={() => handleQuickWhatsAppAdmin(calcTalentName, calcPrice)}
              className="inline-flex items-center gap-2 bg-[#5A6B4E] hover:bg-[#4a5840] text-white px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold shadow-md shadow-[#5a6b4e33] transition active:scale-95"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Direct WhatsApp Admin (+6281818741970)</span>
            </button>
          </div>
        </div>

        {/* 4 Steps Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="p-4 bg-[#FAF9F5] rounded-2xl border border-[#E8E6DF] text-xs">
            <div className="w-7 h-7 rounded-full bg-[#5A6B4E] text-white flex items-center justify-center font-bold mb-2">
              1
            </div>
            <h4 className="font-bold text-[#2C2C24] mb-1">Pengajuan &amp; DP Rekber</h4>
            <p className="text-[#8A8A70] text-[11px] leading-relaxed">
              Klien mengisi formulir judul skripsi dan menyetor pembayaran aman ke rekening resmi DataStat.
            </p>
          </div>

          <div className="p-4 bg-[#FAF9F5] rounded-2xl border border-[#E8E6DF] text-xs">
            <div className="w-7 h-7 rounded-full bg-[#5A6B4E] text-white flex items-center justify-center font-bold mb-2">
              2
            </div>
            <h4 className="font-bold text-[#2C2C24] mb-1">Pengerjaan oleh Expert</h4>
            <p className="text-[#8A8A70] text-[11px] leading-relaxed">
              Freelancer data terverifikasi memproses syntax statistik, uji asumsi, dan interpretasi bab 4.
            </p>
          </div>

          <div className="p-4 bg-[#FAF9F5] rounded-2xl border border-[#E8E6DF] text-xs">
            <div className="w-7 h-7 rounded-full bg-[#5A6B4E] text-white flex items-center justify-center font-bold mb-2">
              3
            </div>
            <h4 className="font-bold text-[#2C2C24] mb-1">Pemeriksaan Hasil</h4>
            <p className="text-[#8A8A70] text-[11px] leading-relaxed">
              Klien mengecek file output (.spv, .sav, draf docx). Tersedia garansi revisi jika ada catatan pembimbing.
            </p>
          </div>

          <div className="p-4 bg-[#FAF9F5] rounded-2xl border border-[#E8E6DF] text-xs">
            <div className="w-7 h-7 rounded-full bg-[#5A6B4E] text-white flex items-center justify-center font-bold mb-2">
              4
            </div>
            <h4 className="font-bold text-[#2C2C24] mb-1">Pencairan Dana (85%)</h4>
            <p className="text-[#8A8A70] text-[11px] leading-relaxed">
              Setelah klien puas, hak freelancer (85%) dicairkan dan komisi platform (15%) dipotong otomatis.
            </p>
          </div>
        </div>
      </div>

      {/* Grid: Form Order (Left) & Commission Calculator (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form Order & Google Form Tab */}
        <div className="lg:col-span-7 bg-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 border border-[#E8E6DF] shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-[#E8E6DF] mb-6">
            <div>
              <h3 className="text-xl font-bold text-[#2C2C24] font-serif">
                Formulir Input Data Skripsi / Penelitian
              </h3>
              <p className="text-xs text-[#8A8A70]">
                Pilih metode input data yang paling nyaman bagi Anda
              </p>
            </div>

            {/* Toggle Web Form vs Google Form */}
            <div className="flex bg-[#F4F3ED] p-1 rounded-full border border-[#E8E6DF] text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveFormTab('web')}
                className={`px-3 py-1.5 rounded-full transition ${
                  activeFormTab === 'web'
                    ? 'bg-white text-[#2C2C24] shadow-2xs'
                    : 'text-[#8A8A70] hover:text-[#2C2C24]'
                }`}
              >
                Web Form
              </button>
              <button
                type="button"
                onClick={() => setActiveFormTab('gform')}
                className={`px-3 py-1.5 rounded-full transition ${
                  activeFormTab === 'gform'
                    ? 'bg-white text-[#2C2C24] shadow-2xs'
                    : 'text-[#8A8A70] hover:text-[#2C2C24]'
                }`}
              >
                Google Form
              </button>
            </div>
          </div>

          {activeFormTab === 'web' ? (
            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#2C2C24] mb-1">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nama mahasiswa / peneliti"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-[#F9F8F6] border border-[#E8E6DF] rounded-xl p-2.5 text-xs focus:bg-white focus:ring-2 focus:ring-[#5A6B4E]/30 focus:border-[#5A6B4E] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#2C2C24] mb-1">
                    Nomor WhatsApp Aktif *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="08xxxxxxxxxx"
                    value={clientWhatsapp}
                    onChange={(e) => setClientWhatsapp(e.target.value)}
                    className="w-full bg-[#F9F8F6] border border-[#E8E6DF] rounded-xl p-2.5 text-xs focus:bg-white focus:ring-2 focus:ring-[#5A6B4E]/30 focus:border-[#5A6B4E] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#2C2C24] mb-1">
                    Universitas / Institusi
                  </label>
                  <input
                    type="text"
                    placeholder="cth. Universitas Indonesia / Unair"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    className="w-full bg-[#F9F8F6] border border-[#E8E6DF] rounded-xl p-2.5 text-xs focus:bg-white focus:ring-2 focus:ring-[#5A6B4E]/30 focus:border-[#5A6B4E] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#2C2C24] mb-1">
                    Jenjang Studi
                  </label>
                  <select
                    value={studyLevel}
                    onChange={(e) => setStudyLevel(e.target.value)}
                    className="w-full bg-[#F9F8F6] border border-[#E8E6DF] rounded-xl p-2.5 text-xs focus:bg-white focus:ring-2 focus:ring-[#5A6B4E]/30 focus:border-[#5A6B4E] focus:outline-none"
                  >
                    <option value="S1 (Skripsi)">S1 (Skripsi)</option>
                    <option value="S2 (Tesis)">S2 (Tesis)</option>
                    <option value="S3 (Disertasi)">S3 (Disertasi)</option>
                    <option value="Riset Mandiri / Publikasi Jurnal">Riset Mandiri / Jurnal</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2C2C24] mb-1">
                  Judul Penelitian / Skripsi *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Pengaruh Brand Awareness dan Promosi Media Sosial terhadap Keputusan Pembelian..."
                  value={researchTitle}
                  onChange={(e) => setResearchTitle(e.target.value)}
                  className="w-full bg-[#F9F8F6] border border-[#E8E6DF] rounded-xl p-2.5 text-xs focus:bg-white focus:ring-2 focus:ring-[#5A6B4E]/30 focus:border-[#5A6B4E] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#2C2C24] mb-1">
                    Software yang Diinginkan
                  </label>
                  <select
                    value={selectedSoftware}
                    onChange={(e) => setSelectedSoftware(e.target.value)}
                    className="w-full bg-[#F9F8F6] border border-[#E8E6DF] rounded-xl p-2.5 text-xs focus:bg-white focus:ring-2 focus:ring-[#5A6B4E]/30 focus:border-[#5A6B4E] focus:outline-none"
                  >
                    <option value="SPSS">SPSS (Regresi, Validitas, Asumsi Klasik)</option>
                    <option value="SmartPLS">SmartPLS (SEM Laten, Bootstrapping)</option>
                    <option value="R / RStudio">R &amp; RStudio (Statistik Komputasi)</option>
                    <option value="AMOS">IBM SPSS AMOS (CB-SEM, CFA)</option>
                    <option value="EViews">EViews (Time Series, Panel Data)</option>
                    <option value="Python">Python (Data Science)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2C2C24] mb-1">
                    Pilih Freelancer Favorit
                  </label>
                  <select
                    value={selectedFreelancerId}
                    onChange={(e) => setSelectedFreelancerId(e.target.value)}
                    className="w-full bg-[#F9F8F6] border border-[#E8E6DF] rounded-xl p-2.5 text-xs focus:bg-white focus:ring-2 focus:ring-[#5A6B4E]/30 focus:border-[#5A6B4E] focus:outline-none"
                  >
                    {freelancers.length === 0 ? (
                      <option value="team-datastat">
                        Tim Ahli Internal DataStat (Pencocokan Otomatis)
                      </option>
                    ) : (
                      freelancers.map((f) => (
                        <option key={f.id} value={f.id}>
                          {f.name} ({f.degree}) - Rp {f.pricePerProject.toLocaleString('id-ID')}
                        </option>
                      ))
                    )}
                  </select>
                </div>
              </div>

              {/* Upload raw data indicator */}
              <div>
                <label className="block text-xs font-semibold text-[#2C2C24] mb-1">
                  Upload Data Mentah / Kuesioner (Opsional)
                </label>
                <div className="border border-dashed border-[#E8E6DF] bg-[#FAF9F5] p-3.5 rounded-xl text-center flex flex-col items-center justify-center">
                  <UploadCloud className="w-6 h-6 text-[#5A6B4E] mb-1" />
                  <p className="text-xs text-[#2C2C24] font-medium">
                    {datasetFile ? datasetFile.name : 'Pilih file excel (.xlsx, .csv) atau kuesioner'}
                  </p>
                  <p className="text-[10px] text-[#8A8A70] mt-0.5">
                    Data dapat juga dikirimkan langsung via WhatsApp saat terhubung dengan admin/expert.
                  </p>
                  <input
                    type="file"
                    accept=".csv,.xlsx,.xls,.sav"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setDatasetFile(e.target.files[0]);
                      }
                    }}
                    className="mt-2 text-[11px] text-[#8A8A70] file:mr-2 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#F4F3ED] file:text-[#5A6B4E] hover:file:bg-[#EAE8DF] cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2C2C24] mb-1">
                  Catatan Khusus / Permintaan Dosen Pembimbing
                </label>
                <textarea
                  rows={2}
                  placeholder="Misal: Harap sertakan uji regresi mediasi dan interpretasi uji F..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#F9F8F6] border border-[#E8E6DF] rounded-xl p-2.5 text-xs focus:bg-white focus:ring-2 focus:ring-[#5A6B4E]/30 focus:border-[#5A6B4E] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#5A6B4E] hover:bg-[#4a5840] text-white py-3 rounded-full text-xs sm:text-sm font-bold shadow-md shadow-[#5a6b4e33] transition flex items-center justify-center gap-2 active:scale-98"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Memproses Pengajuan...' : 'Ajukan Pesanan ke Rekber DataStat'}</span>
              </button>
            </form>
          ) : (
            /* Google Form tab representation */
            <div className="space-y-4 py-4">
              <div className="p-5 bg-[#FAF9F5] rounded-2xl border border-[#E8E6DF] text-center space-y-3">
                <FileText className="w-10 h-10 text-[#5A6B4E] mx-auto" />
                <h4 className="text-base font-bold text-[#2C2C24] font-serif">
                  Google Form Pengajuan Data Penelitian
                </h4>
                <p className="text-xs text-[#8A8A70] max-w-md mx-auto leading-relaxed">
                  Bagi Anda yang terbiasa menggunakan Google Forms untuk melampirkan file kuesioner Google Drive atau dokumen skripsi yang besar, Anda dapat langsung mengisi form Google berikut:
                </p>
                <a
                  href="https://forms.gle/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-[#5A6B4E] text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-xs hover:bg-[#4a5840] transition"
                >
                  <span>Buka Google Form DataStat</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="p-4 bg-[#F9F8F6] rounded-xl border border-[#E8E6DF] text-xs text-[#8A8A70]">
                <strong className="text-[#2C2C24] block mb-1">Catatan Pengisian Google Form:</strong>
                Setelah men-submit Google Form, simpan ID tanggapan Anda dan hubungi WhatsApp Admin di <strong>+6281818741970</strong> untuk konfirmasi pencocokan dengan freelancer.
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Simulasi Transaksi & Komisi Web 15% */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 border border-[#E8E6DF] shadow-xs">
            <div className="flex items-center gap-2 pb-3 border-b border-[#E8E6DF] mb-4">
              <Calculator className="w-5 h-5 text-[#5A6B4E]" />
              <h3 className="text-lg font-bold text-[#2C2C24] font-serif">
                Simulasi Transaksi &amp; Komisi Web (15%)
              </h3>
            </div>

            <p className="text-xs text-[#8A8A70] mb-4 leading-relaxed">
              Transparansi pembagian pendapatan antara klien, freelancer, dan platform DataStat:
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#2C2C24] mb-1">
                  Nama Freelancer Pilihan
                </label>
                <select
                  value={calcTalentName}
                  onChange={(e) => {
                    const name = e.target.value;
                    setCalcTalentName(name);
                    const matched = freelancers.find((f) => f.name === name);
                    if (matched) setCalcPrice(matched.pricePerProject);
                  }}
                  className="w-full bg-[#F9F8F6] border border-[#E8E6DF] rounded-xl p-2.5 text-xs focus:bg-white focus:ring-2 focus:ring-[#5A6B4E]/30 focus:border-[#5A6B4E] focus:outline-none"
                >
                  {freelancers.length === 0 ? (
                    <option value="Tim Ahli DataStat (Pencocokan Otomatis)">
                      Tim Ahli DataStat (Pencocokan Otomatis)
                    </option>
                  ) : (
                    freelancers.map((f) => (
                      <option key={f.id} value={f.name}>
                        {f.name} ({f.degree})
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2C2C24] mb-1">
                  Estimasi Biaya Proyek (Rp)
                </label>
                <input
                  type="number"
                  min="50000"
                  step="25000"
                  value={calcPrice}
                  onChange={(e) => setCalcPrice(Number(e.target.value) || 0)}
                  className="w-full bg-[#F9F8F6] border border-[#E8E6DF] rounded-xl p-2.5 text-xs font-bold text-[#5A6B4E] focus:bg-white focus:ring-2 focus:ring-[#5A6B4E]/30 focus:border-[#5A6B4E] focus:outline-none"
                />
              </div>

              {/* Breakdown Card */}
              <div className="bg-[#FAF9F5] p-4 rounded-2xl border border-[#E8E6DF] space-y-2.5 text-xs">
                <div className="flex justify-between items-center text-[#2C2C24]">
                  <span>Total Biaya Klien:</span>
                  <span className="font-bold text-sm">Rp {calcPrice.toLocaleString('id-ID')}</span>
                </div>

                <div className="flex justify-between items-center text-[#8A8A70] border-t border-[#E8E6DF] pt-2">
                  <span className="flex items-center gap-1">
                    <span>Potongan Admin Platform (15%):</span>
                    <HelpCircle className="w-3 h-3" />
                  </span>
                  <span className="font-semibold text-amber-900">
                    - Rp {komisiAdmin.toLocaleString('id-ID')}
                  </span>
                </div>

                <div className="flex justify-between items-center text-emerald-800 border-t border-[#E8E6DF] pt-2">
                  <span className="font-bold">Pendapatan Net Freelancer (85%):</span>
                  <span className="font-extrabold text-sm">
                    Rp {hakFreelancer.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleQuickWhatsAppAdmin(calcTalentName, calcPrice)}
                className="w-full bg-[#5A6B4E] hover:bg-[#4a5840] text-white py-3 rounded-full text-xs font-bold transition flex items-center justify-center gap-2 shadow-md shadow-[#5a6b4e33]"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Lanjutkan ke WhatsApp Admin Rekber</span>
              </button>

              <div className="flex items-start gap-2 p-3 bg-[#F4F3ED] rounded-xl text-[11px] text-[#5A6B4E]">
                <Lock className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  Admin web memegang dana secara aman. Freelancer hanya menerima Rp {hakFreelancer.toLocaleString('id-ID')} setelah Anda menyatakan hasil analisis tuntas &amp; sesuai.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
