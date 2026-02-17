import React from 'react';
import { Category, Priority, TicketStatus } from '../../types/types';

interface FilterToolbarProps {
  filterCategory: string;
  setFilterCategory: (val: string) => void;
  filterPriority: string;
  setFilterPriority: (val: string) => void;
  filterStatus: TicketStatus | 'All';
  setFilterStatus: (val: TicketStatus | 'All') => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  sortBy: 'Default' | 'ConfidenceDesc' | 'ConfidenceAsc';
  setSortBy: (val: 'Default' | 'ConfidenceDesc' | 'ConfidenceAsc') => void;
  onSimulateClick: () => void;
  hideCreateButton?: boolean;
}

const SortIcon = () => <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" /></svg>;
const SearchIcon = () => <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;

export const FilterToolbar: React.FC<FilterToolbarProps> = ({
  filterCategory, setFilterCategory,
  filterPriority, setFilterPriority,
  filterStatus, setFilterStatus,
  searchQuery, setSearchQuery,
  sortBy, setSortBy,
  onSimulateClick,
  hideCreateButton = false
}) => {
  return (
    <section className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6 bg-transparent">
        <div id="toolbar-filters" className="flex flex-col sm:flex-row flex-wrap items-center gap-3 w-full lg:w-auto">
            
            {/* Search Input */}
            <div className="relative w-full sm:w-auto sm:min-w-[240px]">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon />
                </div>
                <input
                    id="search-input"
                    type="text"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2 shadow-sm"
                    placeholder="Search tickets..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search tickets"
                />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                <select 
                    id="filter-category"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2 shadow-sm cursor-pointer"
                >
                    <option value="All">Category: All</option>
                    {Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}
                </select>

                <select 
                    id="filter-priority"
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2 shadow-sm cursor-pointer"
                >
                    <option value="All">Priority: All</option>
                    {Object.values(Priority).map(p => <option key={p} value={p}>{p}</option>)}
                </select>

                <select 
                    id="filter-status"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as TicketStatus | 'All')}
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2 shadow-sm cursor-pointer"
                >
                    <option value="All">Status: All</option>
                    {Object.values(TicketStatus).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
            </div>
        </div>

        <div className="flex items-center gap-3 w-full lg:w-auto mt-2 lg:mt-0">
             {/* Sort */}
             <div className="flex items-center gap-2 flex-grow lg:flex-grow-0">
                 <div className="hidden xl:block text-gray-400">
                    <SortIcon />
                 </div>
                 <select 
                    id="sort-by"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-transparent border-none text-gray-600 text-sm font-medium focus:ring-0 cursor-pointer hover:text-gray-900"
                >
                    <option value="Default">Sort: Default</option>
                    <option value="ConfidenceDesc">Confidence: High to Low</option>
                    <option value="ConfidenceAsc">Confidence: Low to High</option>
                </select>
            </div>

            {!hideCreateButton && (
                <button 
                    id="btn-simulate"
                    onClick={onSimulateClick}
                    className="flex-shrink-0 flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-md shadow-sm transition-all active:scale-95"
                >
                    Create Ticket
                </button>
            )}
        </div>
    </section>
  );
};