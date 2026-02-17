import React from 'react';
import { TicketManagement } from '../../../types/types';
import { StatsCard } from '../../common/StatsCard';
import { ChartsSection } from '../../ChartsSection';
import { FilterToolbar } from '../../common/FilterToolbar';
import { TicketList } from '../../common/TicketList';
import { AlertIcon, CheckCircleIcon, InboxIcon } from '@/icons';


interface DashboardViewProps {
    data: TicketManagement;
    onSimulateClick: () => void;
    onEditTicket: (t: any) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ data, onSimulateClick, onEditTicket }) => {
    const { stats, sortedTickets } = data;

    // Determine if filters are active to decide if we show full list or sliced list
    const filtersActive = data.filterCategory !== 'All' || data.filterPriority !== 'All' || data.filterStatus !== 'All' || data.searchQuery !== '';

    return (
        <div className="animate-in fade-in duration-300 space-y-8">
            {/* KPI Cards */}
            <section id="stats-section" className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                <StatsCard 
                    title="Open Tickets" 
                    value={stats.open} 
                    icon={<InboxIcon />} 
                    colorClass="bg-blue-600 text-blue-600"
                />
                <StatsCard 
                    title="Resolved" 
                    value={stats.resolved} 
                    icon={<CheckCircleIcon />} 
                    colorClass="bg-green-600 text-green-600"
                />
                <StatsCard 
                    title="High Priority" 
                    value={stats.highPriorityOpen} 
                    icon={<AlertIcon />} 
                    colorClass="bg-red-600 text-red-600"
                />
            </section>

            {/* Analytics */}
            <ChartsSection stats={stats} />

            {/* Interactive Ticket List */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">Recent Tickets</h2>
                        <p className="text-sm text-gray-500">
                            {filtersActive 
                                ? `Showing filtered results (${sortedTickets.length})` 
                                : "Latest incoming support requests"}
                        </p>
                    </div>
                </div>

                {/* Reusing Filter Toolbar Here */}
                <div className="mb-4">
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
                        // removed hideCreateButton={true} to show the button
                    />
                </div>

                <TicketList 
                    // If no filters active, show top 5. If filters active, show all matching.
                    tickets={filtersActive ? sortedTickets : sortedTickets.slice(0, 5)}
                    onToggleStatus={data.handleToggleStatus}
                    onAssign={data.handleAssignTicket}
                    onEdit={onEditTicket}
                    onClearFilters={data.handleClearFilters}
                />
            </section>
        </div>
    );
};