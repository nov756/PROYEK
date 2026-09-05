/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ServiceCatalogSection } from './components/ServiceCatalogSection';
import { InteractivePortfolio } from './components/InteractivePortfolio';
import { ConsultationAndOrderSection } from './components/ConsultationAndOrderSection';
import { AIConsultant } from './components/AIConsultant';
import { FreelancerDirectory } from './components/FreelancerDirectory';
import { HireModal } from './components/HireModal';
import { RegisterFreelancerModal } from './components/RegisterFreelancerModal';
import { OrdersModal } from './components/OrdersModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { Footer } from './components/Footer';
import { INITIAL_FREELANCERS, DEMO_SAMPLE_FREELANCERS } from './data/initialFreelancers';
import { Freelancer, Order, ActivePage, ServicePackage } from './types';

const FREELANCERS_STORAGE_KEY = 'datastat_freelancers_v2';
const ORDERS_STORAGE_KEY = 'datastat_orders_v1';
const KOMISI_ADMIN_PERCENT = 0.15; // 15% untuk Pemilik Web / Rekber

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('home');

  const [freelancers, setFreelancers] = useState<Freelancer[]>(() => {
    try {
      const saved = localStorage.getItem(FREELANCERS_STORAGE_KEY);
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore
    }
    return INITIAL_FREELANCERS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore
    }
    return [];
  });

  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [selectedFreelancerForHire, setSelectedFreelancerForHire] = useState<Freelancer | null>(null);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [successOrder, setSuccessOrder] = useState<Order | null>(null);
  const [toolFilter, setToolFilter] = useState('Semua');

  // Sync freelancers to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(FREELANCERS_STORAGE_KEY, JSON.stringify(freelancers));
    } catch {
      // ignore
    }
  }, [freelancers]);

  // Sync orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  // Expose openOrderModal as explicitly specified by user prompt
  useEffect(() => {
    (window as any).openOrderModal = (talentName: string, hargaProyek?: number) => {
      const price = hargaProyek || 200000;
      const komisiAdmin = price * KOMISI_ADMIN_PERCENT;
      const hakFreelancer = price - komisiAdmin;

      const konfirmasi = confirm(
        `Order Layanan dari: ${talentName}\n\n` +
        `• Total Biaya Klien: Rp ${price.toLocaleString('id-ID')}\n` +
        `• Potongan Admin (${KOMISI_ADMIN_PERCENT * 100}%): Rp ${komisiAdmin.toLocaleString('id-ID')}\n` +
        `• Pendapatan Net Freelancer: Rp ${hakFreelancer.toLocaleString('id-ID')}\n\n` +
        `Lanjutkan ke Sistem Pembayaran?`
      );

      if (konfirmasi) {
        // Arahkan ke WhatsApp Admin untuk penampungan dana (Rekber)
        const waMsg = encodeURIComponent(
          `Halo Admin, saya mau order jasa dari Freelancer: ${talentName} dengan nominal Rp ${price.toLocaleString('id-ID')}. Mohon info instruksi pembayaran.`
        );
        window.open(`https://wa.me/6281818741970?text=${waMsg}`, '_blank');
      }
    };

    return () => {
      delete (window as any).openOrderModal;
    };
  }, []);

  const handleHireClick = (freelancer: Freelancer) => {
    setSelectedFreelancerForHire(freelancer);
  };

  const handleSubmitOrder = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setSelectedFreelancerForHire(null);
    setSuccessOrder(newOrder);
  };

  const handleRegisterFreelancer = (newFreelancer: Freelancer) => {
    setFreelancers((prev) => [newFreelancer, ...prev]);
  };

  const handleSelectPackage = (pkg: ServicePackage) => {
    // Find matching freelancer or switch to order section
    const matching = freelancers.find((f) =>
      f.tools.some((t) => pkg.tools.includes(t))
    );
    if (matching) {
      setSelectedFreelancerForHire(matching);
    } else {
      setActivePage('order');
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6] font-sans text-[#2C2C24] flex flex-col selection:bg-[#5A6B4E] selection:text-white">
      {/* Top Navigation Bar with 3 sections */}
      <Header
        activePage={activePage}
        onSelectPage={(p) => setActivePage(p)}
        onOpenRegister={() => setIsRegisterOpen(true)}
        onOpenOrders={() => setIsOrdersOpen(true)}
        orders={orders}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto my-6 sm:my-8 px-4 sm:px-6">
        {/* Halaman 1: Beranda & Katalog Layanan */}
        {activePage === 'home' && (
          <div className="space-y-10 animate-fadeIn">
            {/* Hero Banner, Tools Statistics, & Looker Studio Table */}
            <ServiceCatalogSection
              onSelectPackageForOrder={handleSelectPackage}
              onNavigateToPortfolio={() => setActivePage('portfolio')}
              onNavigateToAI={() => {
                const el = document.getElementById('ai-consultant-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* AI Consultation (Left) & Talent Marketplace (Right) */}
            <div id="ai-consultant-section" className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 pt-4">
              {/* AI Consultant Left Column */}
              <div className="lg:col-span-4">
                <AIConsultant onSelectToolFilter={(t) => setToolFilter(t)} />
              </div>

              {/* Expert Freelancers Right Column */}
              <div className="lg:col-span-8">
                <FreelancerDirectory
                  freelancers={freelancers}
                  onHire={handleHireClick}
                  selectedToolFilter={toolFilter}
                  onSelectToolFilter={(t) => setToolFilter(t)}
                  onOpenRegister={() => setIsRegisterOpen(true)}
                  onLoadDemoData={() => setFreelancers(DEMO_SAMPLE_FREELANCERS)}
                  onClearData={() => setFreelancers([])}
                />
              </div>
            </div>
          </div>
        )}

        {/* Halaman 2: Portfolio Interaktif (Demo Analisis) */}
        {activePage === 'portfolio' && (
          <InteractivePortfolio
            onSelectServiceOrder={(serviceName) => {
              setActivePage('order');
            }}
          />
        )}

        {/* Halaman 3: Konsultasi & Order (Rekber 15%) */}
        {activePage === 'order' && (
          <ConsultationAndOrderSection
            freelancers={freelancers}
            onSubmitOrder={handleSubmitOrder}
            onOpenOrdersModal={() => setIsOrdersOpen(true)}
            activeOrdersCount={orders.length}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Hire Modal */}
      {selectedFreelancerForHire && (
        <HireModal
          freelancer={selectedFreelancerForHire}
          onClose={() => setSelectedFreelancerForHire(null)}
          onSubmitOrder={handleSubmitOrder}
        />
      )}

      {/* Register Freelancer Modal */}
      <RegisterFreelancerModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onRegister={handleRegisterFreelancer}
      />

      {/* Orders List Modal */}
      <OrdersModal
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
        orders={orders}
      />

      {/* Order Success Receipt Modal */}
      {successOrder && (
        <OrderSuccessModal
          order={successOrder}
          onClose={() => setSuccessOrder(null)}
          onViewAllOrders={() => {
            setSuccessOrder(null);
            setIsOrdersOpen(true);
          }}
        />
      )}
    </div>
  );
}

