import React, { useState } from 'react';
import { X, CheckCircle, Sparkles, Plus, Award, Laptop } from 'lucide-react';
import { Freelancer } from '../types';

interface RegisterFreelancerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (newFreelancer: Freelancer) => void;
}

const AVAILABLE_TOOLS = ['SPSS', 'SmartPLS', 'R', 'Python', 'EViews', 'Stata', 'Jamovi', 'NVivo', 'AMOS', 'LISREL'];

export const RegisterFreelancerModal: React.FC<RegisterFreelancerModalProps> = ({
  isOpen,
  onClose,
  onRegister,
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [degree, setDegree] = useState('S.Si.');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [selectedTools, setSelectedTools] = useState<string[]>(['SPSS', 'SmartPLS']);
  const [specialtiesText, setSpecialtiesText] = useState('Regresi Linier Berganda, Uji Asumsi Klasik, SEM-PLS');
  const [pricePerProject, setPricePerProject] = useState(250000);
  const [bio, setBio] = useState('');
  const [turnaroundTime, setTurnaroundTime] = useState('1 - 2 Hari');

  const toggleTool = (tool: string) => {
    setSelectedTools((prev) =>
      prev.includes(tool) ? prev.filter((t) => t !== tool) : [...prev, tool]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || selectedTools.length === 0) return;

    const specialties = specialtiesText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const newFreelancer: Freelancer = {
      id: 'talent-' + Date.now(),
      name: name.trim(),
      degree: degree.trim() || 'S.Si.',
      specialties: specialties.length > 0 ? specialties : ['Analisis Statistik & Olah Data Skripsi'],
      tools: selectedTools,
      rating: 5.0,
      reviewCount: 1,
      completedProjects: 0,
      pricePerProject: Number(pricePerProject) || 200000,
      priceDisplay: `Rp ${Number(pricePerProject).toLocaleString('id-ID')} / Proyek`,
      bio: bio.trim() || 'Konsultan statistika bersertifikasi siap membantu penyusunan dan interpretasi hasil penelitian.',
      turnaroundTime,
      verified: true,
      online: true,
    };

    onRegister(newFreelancer);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C2C24]/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-[28px] sm:rounded-[32px] shadow-2xl border border-[#E8E6DF] w-full max-w-xl my-8 overflow-hidden">
        {/* Header */}
        <div className="bg-[#5A6B4E] text-white p-5 sm:p-6 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest bg-white/15 text-[#F0F2ED] px-2.5 py-0.5 rounded-full border border-white/20 font-sans mb-1.5 w-fit">
              <Award className="w-3.5 h-3.5 text-[#ECE7D6]" />
              <span>Gabung Mitra DataStat</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-serif">Daftar Jadi Freelancer Expert</h3>
            <p className="text-xs text-[#F0F2ED] mt-1">
              Bantu mahasiswa & akademisi menyelesaikan olah data dengan honor per proyek yang kompetitif.
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
          {/* Name & Degree */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-[#2C2C24] mb-1">
                Nama Lengkap *
              </label>
              <input
                type="text"
                required
                placeholder="cth. Faisal Rahman"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-[#E8E6DF] bg-[#F9F8F6] rounded-xl p-2.5 text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-[#5A6B4E]/30 focus:border-[#5A6B4E] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#2C2C24] mb-1">
                Gelar Akademik *
              </label>
              <input
                type="text"
                required
                placeholder="cth. S.Si., M.Stat."
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                className="w-full border border-[#E8E6DF] bg-[#F9F8F6] rounded-xl p-2.5 text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-[#5A6B4E]/30 focus:border-[#5A6B4E] focus:outline-none"
              />
            </div>
          </div>

          {/* Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#2C2C24] mb-1">
                Nomor WhatsApp Aktif *
              </label>
              <input
                type="tel"
                required
                placeholder="08xxxxxxxxxx"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full border border-[#E8E6DF] bg-[#F9F8F6] rounded-xl p-2.5 text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-[#5A6B4E]/30 focus:border-[#5A6B4E] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#2C2C24] mb-1">
                Email Aktif *
              </label>
              <input
                type="email"
                required
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-[#E8E6DF] bg-[#F9F8F6] rounded-xl p-2.5 text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-[#5A6B4E]/30 focus:border-[#5A6B4E] focus:outline-none"
              />
            </div>
          </div>

          {/* Software selection */}
          <div>
            <label className="block text-xs font-semibold text-[#2C2C24] mb-1.5">
              Software / Tools yang Anda Kuasai * (Pilih minimal 1)
            </label>
            <div className="flex flex-wrap gap-1.5">
              {AVAILABLE_TOOLS.map((tool) => {
                const isSelected = selectedTools.includes(tool);
                return (
                  <button
                    type="button"
                    key={tool}
                    onClick={() => toggleTool(tool)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition flex items-center gap-1 border ${
                      isSelected
                        ? 'bg-[#5A6B4E] text-white border-[#5A6B4E] shadow-xs'
                        : 'bg-[#F9F8F6] text-[#2C2C24] border-[#E8E6DF] hover:bg-[#F0F2ED]'
                    }`}
                  >
                    {isSelected && <CheckCircle className="w-3 h-3" />}
                    <span>{tool}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Specialties */}
          <div>
            <label className="block text-xs font-semibold text-[#2C2C24] mb-1">
              Spesialisasi Metodologi (Pisahkan dengan koma)
            </label>
            <input
              type="text"
              placeholder="cth. Regresi Linier, Uji Asumsi Klasik, SmartPLS SEM, ANOVA"
              value={specialtiesText}
              onChange={(e) => setSpecialtiesText(e.target.value)}
              className="w-full border border-[#E8E6DF] bg-[#F9F8F6] rounded-xl p-2.5 text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-[#5A6B4E]/30 focus:border-[#5A6B4E] focus:outline-none"
            />
          </div>

          {/* Price & Turnaround */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#2C2C24] mb-1">
                Tarif Dasar per Proyek (Rp) *
              </label>
              <input
                type="number"
                min="50000"
                step="25000"
                required
                value={pricePerProject}
                onChange={(e) => setPricePerProject(Number(e.target.value))}
                className="w-full border border-[#E8E6DF] bg-[#F9F8F6] rounded-xl p-2.5 text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-[#5A6B4E]/30 focus:border-[#5A6B4E] focus:outline-none font-bold text-[#5A6B4E]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#2C2C24] mb-1">
                Estimasi Waktu Pengerjaan
              </label>
              <select
                value={turnaroundTime}
                onChange={(e) => setTurnaroundTime(e.target.value)}
                className="w-full border border-[#E8E6DF] bg-[#F9F8F6] rounded-xl p-2.5 text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-[#5A6B4E]/30 focus:border-[#5A6B4E] focus:outline-none cursor-pointer"
              >
                <option value="1 - 2 Hari">1 - 2 Hari (Express)</option>
                <option value="2 - 3 Hari">2 - 3 Hari (Standar)</option>
                <option value="3 - 5 Hari">3 - 5 Hari (Kompleks)</option>
              </select>
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-xs font-semibold text-[#2C2C24] mb-1">
              Bio Singkat & Pengalaman Riset
            </label>
            <textarea
              rows={2}
              placeholder="Alumni Statistika dengan pengalaman olah data skripsi & tesis rumpun..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full border border-[#E8E6DF] bg-[#F9F8F6] rounded-xl p-2.5 text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-[#5A6B4E]/30 focus:border-[#5A6B4E] focus:outline-none"
            />
          </div>

          {/* Footer Submit */}
          <div className="pt-3 border-t border-[#F0F2ED] flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full text-xs font-semibold text-[#8A8A70] hover:text-[#2C2C24] hover:bg-[#F4F3ED] transition"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-[#5A6B4E] hover:bg-[#4a5840] text-white px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition shadow-md shadow-[#5a6b4e33] active:scale-98 flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-[#ECE7D6]" />
              <span>Daftar & Terbitkan Profil</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
