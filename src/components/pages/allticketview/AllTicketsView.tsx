import React from 'react';
import { TicketManagement } from '@/types/types';
import { FilterToolbar } from '@common/FilterToolbar';
import { TicketList } from '@common/TicketList';

interface AllTicketsViewProps {
    data: TicketManagement;
    onSimulateClick: () => void;
    onEditTicket: (t: any) => void;
}

export const AllTicketsView: React.FC<AllTicketsViewProps> = ({ data, onSimulateClick, onEditTicket }) => {
    return (
        <div className="animate-in fade-in duration-300">
            <FilterToolbar 
                filterCategory={data.filterCategory}
                setFilterCategory={data.setFilterCategory}
                filterPriority={data.filterPriority}
                setFilterPriority={data.setFilterPriority}
                filterStatus={data.filterStatus}
                setFilterStatus={data.setFilterStatus}
                searchQuery={data.searchQuery}
                setSearchQuery={data.setSearchQuery}
                sortBy={data.sortBy}
                setSortBy={data.setSortBy}
                onSimulateClick={onSimulateClick}
            />

            <TicketList 
                tickets={data.sortedTickets}
                onToggleStatus={data.handleToggleStatus}
                onAssign={data.handleAssignTicket}
                onEdit={onEditTicket}
                onClearFilters={data.handleClearFilters}
            />
        </div>
    );
};