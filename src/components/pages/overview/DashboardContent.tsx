'use client';

import  { useState } from 'react';
import { Ticket } from '@/types/types';
import { SimulateTicketModal } from '@/components/SimulateTicketModal';
import { EditTicketModal } from '@/components/EditTicketModal';
import { ToastProvider } from '@/components/common/Toast';
import { Tour } from '@/components/Tour';
import { Header } from '@/components/common/Header';
import { Sidebar } from '@/components/common/Sidebar';
import { TeamView } from '@/components/pages/teamview/TeamView';
import { DashboardView } from '@/components/pages/overview/DashboardView';
import { AllTicketsView } from '@/components/pages/allticketview/AllTicketsView';
import { useTicketManagement } from '@/hooks/useTicketManagement';

const DashboardContent = () => {
  const [currentView, setCurrentView] = useState<
    'dashboard' | 'tickets' | 'team'
  >('dashboard');

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tourStartRequest, setTourStartRequest] = useState(0);
  const [isSimulateModalOpen, setIsSimulateModalOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);

  const ticketManagement = useTicketManagement();

  const handleSimulateSubmit = async (
    ...args: Parameters<typeof ticketManagement.handleNewTicket>
  ) => {
    const success = await ticketManagement.handleNewTicket(...args);
    if (success) {
      setIsSimulateModalOpen(false);
    }
  };

  const getPageTitle = () => {
    switch (currentView) {
      case 'dashboard':
        return 'Dashboard';
      case 'tickets':
        return 'All Tickets';
      case 'team':
        return 'Support Team';
    }
  };

  return (
    <ToastProvider>
      <div className="h-screen w-screen bg-slate-50 flex overflow-hidden font-sans text-slate-900">
        <Sidebar
          currentView={currentView}
          onChangeView={setCurrentView}
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />

        <div className="flex-1 flex flex-col h-full w-full min-w-0 relative">
          <Tour startRequest={tourStartRequest} />

          <div
            id="toast-container-anchor"
            className="fixed bottom-10 right-10 w-10 h-10 pointer-events-none"
          />

          <div className="flex-none z-10">
            <Header
              title={getPageTitle()}
              onOpenSidebar={() => setMobileMenuOpen(true)}
              onResetTour={() => setTourStartRequest(Date.now())}
            />
          </div>

          <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
            <div className="max-w-7xl mx-auto pb-10">
              {currentView === 'dashboard' && (
                <DashboardView
                  data={ticketManagement}
                  onSimulateClick={() => setIsSimulateModalOpen(true)}
                  onEditTicket={setEditingTicket}
                />
              )}

              {currentView === 'tickets' && (
                <AllTicketsView
                  data={ticketManagement}
                  onSimulateClick={() => setIsSimulateModalOpen(true)}
                  onEditTicket={setEditingTicket}
                />
              )}

              {currentView === 'team' && (
                <TeamView tickets={ticketManagement.tickets} />
              )}
            </div>
          </main>
        </div>

        <SimulateTicketModal
          isOpen={isSimulateModalOpen}
          onClose={() => setIsSimulateModalOpen(false)}
          onSubmit={handleSimulateSubmit}
          isAnalyzing={ticketManagement.isAnalyzing}
        />

        <EditTicketModal
          isOpen={!!editingTicket}
          ticket={editingTicket}
          onClose={() => setEditingTicket(null)}
          onSave={ticketManagement.handleUpdateTicket}
        />
      </div>
    </ToastProvider>
  );
};

export default DashboardContent;
