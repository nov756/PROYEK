import React, { useState } from 'react';
import { X, Check, ShieldCheck, FileText, Upload, Clock, MessageSquare, AlertCircle, Sparkles } from 'lucide-react';
import { Freelancer, Order } from '../types';

interface HireModalProps {
  freelancer: Freelancer | null;
  onClose: () => void;
  onSubmitOrder: (order: Order) => void;
}

export const HireModal: React.FC<HireModalProps> = ({ freelancer, onClose, onSubmitOrder }) => {
  if (!freelancer) return null;

  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientWhatsapp, setClientWhatsapp] = useState('');
  const [researchTitle, setResearchTitle] = useState('');
  const [researchField, setResearchField] = useState('Manajemen & Bisnis');
  const [software, setSoftware] = useState(freelancer.tools[0] || 'SPSS');
  const [notes, setNotes] = useState('');
  const [deadlineDays, setDeadlineDays] = useState(2);
  const [packageType, setPackageType] = useState<'standard' | 'full'>('full');
  const [datasetLink, setDatasetLink] = useState('');
  const [mockFileName, setMockFileName] = useState<string | null>(null);

  // Calculate pricing based on package
  const basePrice = freelancer.pricePerProject;
  const packageAddon = packageType === 'full' ? 50000 : 0; // Full includes Bab 4 interpretation & live consultation
  const totalPrice = basePrice + packageAddon;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !researchTitle.trim() || !clientWhatsapp.trim()) {
      return;
    }

    const newOrder: Order = {
      id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
      freelancerId: freelancer.id,
      freelancerName: `${freelancer.name}, ${freelancer.degree}`,
      freelancerPrice: basePrice,
      clientName,
      clientEmail: clientEmail || 'klien@example.com',
      clientWhatsapp,
      researchTitle,
      researchField,
      software,
      notes: notes || 'Pengerjaan sesuai metodologi & interpretasi baku.',
      deadlineDays,
      hasDataset: Boolean(datasetLink || mockFileName),
      datasetName: mockFileName || (datasetLink ? 'Link Google Drive / Cloud' : 'Menyusul via Chat'),
      status: 'Menunggu Konfirmasi',
      createdAt: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      totalPrice,
    };

    onSubmitOrder(newOrder);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMockFileName(file.name);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C2C24]/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-[28px] sm:rounded-[32px] shadow-2xl border border-[#E8E6DF] w-full max-w-2xl my-8 overflow-hidden">
        {/* Header */}
        <div className="bg-[#5A6B4E] text-white p-5 sm:p-6 flex items-start justify-between">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-widest bg-white/15 text-[#F0F2ED] px-2.5 py-0.5 rounded-full border border-white/20 font-sans">
              Formulir Pengajuan Proyek
            </span>
            <h3 className="text-xl sm:text-2xl font-bold mt-1.5 text-white font-serif">
              Hire {freelancer.name}, {freelancer.degree}
            </h3>
            <p className="text-xs text-[#F0F2ED] mt-1">
              Spesialis: {freelancer.specialties.slice(0, 3).join(', ')} • Rating {freelancer.rating} ★
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 max-h-[80vh] overflow-y-auto text-[#2C2C24]">
          {/* Client Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#2C2C24] mb-1">
                Nama Lengkap Anda *
              </label>
              <input
                type="text"
                required
                placeholder="cth. Arya Pratama"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full border border-[#E8E6DF] bg-[#F9F8F6] rounded-xl p-2.5 text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-[#5A6B4E]/30 focus:border-[#5A6B4E] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#2C2C24] mb-1">
                Nomor WhatsApp (Aktif) *
              </label>
              <input
                type="tel"
                required
                placeholder="cth. 081234567890"
                value={clientWhatsapp}
                onChange={(e) => setClientWhatsapp(e.target.value)}
                className="w-full border border-[#E8E6DF] bg-[#F9F8F6] rounded-xl p-2.5 text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-[#5A6B4E]/30 focus:border-[#5A6B4E] focus:outline-none"
              />
            </div>
          </div>

          {/* Research Title */}
          <div>
            <label className="block text-xs font-semibold text-[#2C2C24] mb-1">
              Judul Penelitian / Skripsi / Topik *
            </label>
            <input
              type="text"
              required
              placeholder="cth. Pengaruh Digital Marketing & Brand Trust terhadap Keputusan Pembelian dengan Kepuasan Pelanggan sebagai Intervening"
              value={researchTitle}
              onChange={(e) => setResearchTitle(e.target.value)}
              className="w-full border border-[#E8E6DF] bg-[#F9F8F6] rounded-xl p-2.5 text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-[#5A6B4E]/30 focus:border-[#5A6B4E] focus:outline-none"
            />
          </div>

          {/* Field & Software */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#2C2C24] mb-1">
                Bidang / Rumpun Ilmu
              </label>
              <select
                value={researchField}
                onChange={(e) => setResearchField(e.target.value)}
                className="w-full border border-[#E8E6DF] bg-[#F9F8F6] rounded-xl p-2.5 text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-[#5A6B4E]/30 focus:border-[#5A6B4E] focus:outline-none cursor-pointer"
              >
                <option value="Manajemen & Bisnis">Manajemen & Bisnis / Akuntansi</option>
                <option value="Kesehatan & Kedokteran">Kesehatan Masyarakat & Kedokteran</option>
                <option value="Psikologi & Sosial">Psikologi & Ilmu Sosial / Komunikasi</option>
                <option value="Pendidikan">Pendidikan & Pengajaran</option>
                <option value="Sains & Keteknikan">Sains, Pertanian & Teknik</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#2C2C24] mb-1">
                Software yang Diinginkan
              </label>
              <select
                value={software}
                onChange={(e) => setSoftware(e.target.value)}
                className="w-full border border-[#E8E6DF] bg-[#F9F8F6] rounded-xl p-2.5 text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-[#5A6B4E]/30 focus:border-[#5A6B4E] focus:outline-none cursor-pointer"
              >
                {freelancer.tools.map((tool) => (
                  <option key={tool} value={tool}>
                    {tool}
                  </option>
                ))}
                <option value="Rekomendasikan oleh Expert">Rekomendasikan oleh Expert</option>
              </select>
            </div>
          </div>

          {/* Package Selection */}
          <div>
            <label className="block text-xs font-semibold text-[#2C2C24] mb-1.5">
              Pilih Paket Pengerjaan
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                onClick={() => setPackageType('standard')}
                className={`p-3.5 rounded-2xl border-2 cursor-pointer transition ${
                  packageType === 'standard'
                    ? 'border-[#5A6B4E] bg-[#F4F3ED]'
                    : 'border-[#E8E6DF] hover:border-[#8A8A70] bg-white'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-[#2C2C24]">Paket Olah Data Basic</span>
                  <span className="text-xs font-bold text-[#5A6B4E]">
                    Rp {basePrice.toLocaleString('id-ID')}
                  </span>
                </div>
                <p className="text-[11px] text-[#8A8A70]">
                  Pembersihan data, running uji lengkap, file output software (.spv/.rdata), dan ringkasan tabel hasil.
                </p>
              </div>

              <div
                onClick={() => setPackageType('full')}
                className={`p-3.5 rounded-2xl border-2 cursor-pointer transition relative ${
                  packageType === 'full'
                    ? 'border-[#5A6B4E] bg-[#F4F3ED]'
                    : 'border-[#E8E6DF] hover:border-[#8A8A70] bg-white'
                }`}
              >
                <span className="absolute -top-2.5 right-3 bg-[#5A6B4E] text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                  POPULER
                </span>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-[#2C2C24]">Paket Komplit Bab 4 + Revisi</span>
                  <span className="text-xs font-bold text-[#5A6B4E]">
                    Rp {(basePrice + 50000).toLocaleString('id-ID')}
                  </span>
                </div>
                <p className="text-[11px] text-[#8A8A70]">
                  Paket basic + draf narasi interpretasi Bab 4 lengkap + garansi revisi dosen pembimbing sampai sidang!
                </p>
              </div>
            </div>
          </div>

          {/* Notes / Special Instructions */}
          <div>
            <label className="block text-xs font-semibold text-[#2C2C24] mb-1">
              Keluhan / Kendala yang Ingin Diselesaikan
            </label>
            <textarea
              rows={2}
              placeholder="Contoh: Tolong cek apakah data saya normal, jika tidak normal mohon dibantu solusinya. Saya menggunakan 4 variabel dengan 1 variabel mediasi."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full border border-[#E8E6DF] bg-[#F9F8F6] rounded-xl p-2.5 text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-[#5A6B4E]/30 focus:border-[#5A6B4E] focus:outline-none"
            />
          </div>

          {/* Dataset upload / link */}
          <div>
            <label className="block text-xs font-semibold text-[#2C2C24] mb-1">
              Data Mentah / Kuesioner (Opsional)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <label className="border border-dashed border-[#E8E6DF] hover:border-[#5A6B4E] rounded-xl p-2.5 flex items-center justify-center gap-2 cursor-pointer bg-[#F9F8F6] hover:bg-[#F4F3ED] transition text-xs text-[#8A8A70]">
                <Upload className="w-4 h-4 text-[#5A6B4E]" />
                <span className="truncate">
                  {mockFileName ? mockFileName : 'Upload File (Excel/CSV/SPSS)'}
                </span>
                <input
                  type="file"
                  accept=".csv,.xlsx,.xls,.sav"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              <input
                type="url"
                placeholder="Atau tempel link Google Drive kuesioner"
                value={datasetLink}
                onChange={(e) => setDatasetLink(e.target.value)}
                className="border border-[#E8E6DF] bg-[#F9F8F6] rounded-xl px-2.5 py-2 text-xs text-[#2C2C24] focus:bg-white focus:ring-2 focus:ring-[#5A6B4E]/30 focus:border-[#5A6B4E] focus:outline-none"
              />
            </div>
            <p className="text-[10px] text-[#A5A58D] mt-1">
              *Data dapat dikirimkan menyusul secara langsung melalui konsultasi WhatsApp dengan expert.
            </p>
          </div>

          {/* Guarantee Badges & Escrow 15% */}
          <div className="bg-[#F0F2ED] border border-[#E8E6DF] rounded-2xl p-3.5 space-y-2">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-[#5A6B4E] shrink-0" />
              <div className="text-xs text-[#2C2C24] leading-snug">
                <span className="font-bold text-[#5A6B4E]">Sistem Rekening Bersama (Rekber 15%):</span> Pembayaran Anda aman ditampung oleh web DataStat sampai Anda menerima &amp; menyetujui output olah data.
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between text-[11px] pt-1.5 border-t border-[#E8E6DF]/60 text-[#8A8A70]">
              <span>Hak Bersih Freelancer (85%): <strong className="text-[#2C2C24]">Rp {(totalPrice * 0.85).toLocaleString('id-ID')}</strong></span>
              <span>Biaya Penampungan Rekber (15%): <strong className="text-[#5A6B4E]">Rp {(totalPrice * 0.15).toLocaleString('id-ID')}</strong></span>
            </div>
          </div>

          {/* Price Summary & Submit */}
          <div className="pt-3 border-t border-[#F0F2ED] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <p className="text-[11px] text-[#8A8A70]">Total Pembayaran Klien</p>
              <p className="text-xl font-bold text-[#5A6B4E] font-serif">
                Rp {totalPrice.toLocaleString('id-ID')}
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-full text-xs font-semibold text-[#8A8A70] hover:text-[#2C2C24] hover:bg-[#F4F3ED] transition"
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex-1 sm:flex-none bg-[#5A6B4E] hover:bg-[#4a5840] text-white px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition shadow-md shadow-[#5a6b4e33] active:scale-98 flex items-center justify-center gap-1.5"
              >
                <span>Ajukan & Pesan Sekarang</span>
                <Check className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
