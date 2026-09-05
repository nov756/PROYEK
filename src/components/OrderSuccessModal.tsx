import React from 'react';
import { CheckCircle2, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';
import { Order } from '../types';

interface OrderSuccessModalProps {
  order: Order | null;
  onClose: () => void;
  onViewAllOrders: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  onClose,
  onViewAllOrders,
}) => {
  if (!order) return null;

  const handleWhatsappContact = () => {
    const text = encodeURIComponent(
      `Halo Kak ${order.freelancerName}, saya ${order.clientName} dari platform DataStat. Saya telah mengajukan pesanan olah data dengan nomor #${order.id} untuk penelitian: "${order.researchTitle}". Mohon konfirmasi pengerjaannya ya Kak. Terima kasih!`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C2C24]/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-[28px] sm:rounded-[32px] shadow-2xl border border-[#E8E6DF] w-full max-w-md my-8 overflow-hidden text-center p-6 sm:p-8">
        <div className="w-16 h-16 bg-[#F0F2ED] text-[#5A6B4E] rounded-full flex items-center justify-center mx-auto mb-3.5 shadow-xs">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-[#2C2C24] font-serif">Pesanan Berhasil Diajukan!</h3>
        <p className="text-xs text-[#8A8A70] mt-1">
          Nomor Pesanan: <span className="font-bold text-[#5A6B4E]">#{order.id}</span>
        </p>

        <div className="bg-[#F9F8F6] border border-[#E8E6DF] rounded-2xl p-4 text-left my-4 text-xs space-y-1.5 text-[#2C2C24]">
          <div className="flex justify-between">
            <span className="text-[#8A8A70]">Expert:</span>
            <span className="font-semibold text-[#2C2C24]">{order.freelancerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#8A8A70]">Software:</span>
            <span className="font-semibold text-[#2C2C24]">{order.software}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#8A8A70]">Estimasi Selesai:</span>
            <span className="font-semibold text-[#2C2C24]">{order.deadlineDays} Hari Kerja</span>
          </div>
          <div className="flex justify-between border-t border-[#E8E6DF] pt-2 mt-2">
            <span className="text-[#2C2C24] font-bold">Total Biaya:</span>
            <span className="font-bold text-[#5A6B4E] text-base">
              Rp {order.totalPrice.toLocaleString('id-ID')}
            </span>
          </div>
        </div>

        <p className="text-xs text-[#8A8A70] mb-5 leading-relaxed">
          Notifikasi telah dikirim ke expert. Anda dapat langsung terhubung melalui chat WhatsApp untuk mengirimkan file mentah atau mendiskusikan kuesioner.
        </p>

        <div className="space-y-2.5">
          <button
            onClick={handleWhatsappContact}
            className="w-full bg-[#5A6B4E] hover:bg-[#4a5840] text-white font-bold py-2.5 px-4 rounded-full text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-md shadow-[#5a6b4e33]"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat Langsung dengan Expert via WhatsApp</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onViewAllOrders();
            }}
            className="w-full bg-[#F0F2ED] hover:bg-[#E0E2D9] text-[#5A6B4E] font-semibold py-2.5 px-4 rounded-full text-xs flex items-center justify-center gap-1.5 transition"
          >
            <span>Lihat Daftar Pesanan Saya</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onClose}
            className="w-full text-[#8A8A70] hover:text-[#2C2C24] text-xs py-1.5 transition font-medium"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
