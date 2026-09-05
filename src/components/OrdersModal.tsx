import React from 'react';
import { X, ClipboardCheck, Clock, MessageSquare, CheckCircle2, FileText, AlertCircle } from 'lucide-react';
import { Order } from '../types';

interface OrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
}

export const OrdersModal: React.FC<OrdersModalProps> = ({ isOpen, onClose, orders }) => {
  if (!isOpen) return null;

  const handleWhatsappContact = (order: Order) => {
    const text = encodeURIComponent(
      `Halo Kak ${order.freelancerName}, saya ${order.clientName} dari platform DataStat. Saya telah mengajukan pesanan olah data dengan nomor #${order.id} untuk penelitian: "${order.researchTitle}". Mohon konfirmasi pengerjaannya ya Kak. Terima kasih!`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C2C24]/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-[28px] sm:rounded-[32px] shadow-2xl border border-[#E8E6DF] w-full max-w-2xl my-8 overflow-hidden">
        {/* Header */}
        <div className="bg-[#5A6B4E] text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center border border-white/20">
              <ClipboardCheck className="w-5 h-5 text-[#F0F2ED]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-serif">Pesanan Olah Data Saya</h3>
              <p className="text-xs text-[#F0F2ED]">
                Pantau progres pengerjaan analisis data skripsi & komunikasi dengan expert
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 max-h-[75vh] overflow-y-auto space-y-4 text-[#2C2C24]">
          {orders.length === 0 ? (
            <div className="text-center py-12 bg-[#FAF9F5] rounded-2xl border border-dashed border-[#E8E6DF]">
              <FileText className="w-12 h-12 text-[#A5A58D] mx-auto mb-2" />
              <p className="text-sm font-semibold text-[#2C2C24]">Belum ada pesanan aktif</p>
              <p className="text-xs text-[#8A8A70] mt-1 max-w-sm mx-auto">
                Silakan pilih freelancer data di direktori dan klik "Hire Talent" untuk mengajukan pesanan.
              </p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="border border-[#F0F2ED] rounded-2xl p-4 sm:p-5 hover:border-[#E8E6DF] transition bg-[#F9F8F6] shadow-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E8E6DF] mb-3">
                  <div>
                    <span className="text-[11px] font-bold text-[#5A6B4E] bg-[#F0F2ED] px-2.5 py-0.5 rounded-full border border-[#E8E6DF]">
                      ID: #{order.id}
                    </span>
                    <span className="text-xs text-[#8A8A70] ml-2 font-medium">{order.createdAt}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-semibold bg-[#F0F2ED] text-[#5A6B4E] border border-[#E8E6DF] px-2.5 py-0.5 rounded-full">
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 mb-3">
                  <h4 className="text-sm sm:text-base font-bold text-[#2C2C24] font-serif line-clamp-2">
                    {order.researchTitle}
                  </h4>
                  <p className="text-xs text-[#8A8A70]">
                    <span className="font-semibold text-[#2C2C24]">Expert:</span> {order.freelancerName} •{' '}
                    <span className="font-semibold text-[#2C2C24]">Software:</span> {order.software}
                  </p>
                  <p className="text-xs text-[#8A8A70]">
                    <span className="font-semibold text-[#2C2C24]">Catatan:</span> {order.notes}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[#E8E6DF] text-xs">
                  <div>
                    <span className="text-[#8A8A70]">Total Biaya: </span>
                    <span className="font-bold text-[#5A6B4E] text-base">
                      Rp {order.totalPrice.toLocaleString('id-ID')}
                    </span>
                  </div>

                  <button
                    onClick={() => handleWhatsappContact(order)}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#5A6B4E] hover:bg-[#4a5840] text-white rounded-full font-bold text-xs transition shadow-sm shadow-[#5a6b4e26] active:scale-95"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Hubungi Expert via WhatsApp</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FAF9F5] border-t border-[#E8E6DF] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-white hover:bg-[#F4F3ED] text-[#2C2C24] border border-[#E8E6DF] rounded-full text-xs font-semibold transition"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
