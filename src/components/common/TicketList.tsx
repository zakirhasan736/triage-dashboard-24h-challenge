import React from 'react';
import { Ticket } from '../../types/types';
import { TicketRow } from './TicketRow';

interface TicketListProps {
  tickets: Ticket[];
  onToggleStatus: (id: string) => void;
  onAssign: (id: string, agent: string) => void;
  onEdit: (ticket: Ticket) => void;
  onClearFilters: () => void;
}

export const TicketList: React.FC<TicketListProps> = ({ 
  tickets, onToggleStatus, onAssign, onEdit, onClearFilters 
}) => {
  if (tickets.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300 shadow-sm">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900">No tickets found</h3>
          <p className="text-gray-500 mt-1 mb-4">Try adjusting your search or filters to find what you're looking for.</p>
          <button 
              onClick={onClearFilters}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
              Clear all filters
          </button>
      </div>
    );
  }

  return (
    <section id="ticket-list" className="space-y-4">
        {tickets.map(ticket => (
            <TicketRow 
                key={ticket.id} 
                ticket={ticket} 
                onToggleStatus={onToggleStatus}
                onAssign={onAssign}
                onEdit={onEdit}
            />
        ))}
    </section>
  );
};
