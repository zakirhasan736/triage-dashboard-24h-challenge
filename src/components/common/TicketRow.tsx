import React, { useState, useRef, useEffect } from 'react';
import { Ticket, Category, Priority, TicketStatus } from '../../types/types';
import { SUPPORT_AGENTS } from '../../constants';

interface TicketRowProps {
  ticket: Ticket;
  onToggleStatus: (id: string) => void;
  onAssign: (id: string, agent: string) => void;
  onEdit: (ticket: Ticket) => void;
}

const getCategoryStyles = (category: Category) => {
  switch (category) {
    case Category.BUG: return 'bg-rose-50 text-rose-700 ring-rose-200';
    case Category.BILLING: return 'bg-amber-50 text-amber-700 ring-amber-200';
    case Category.FEATURE_REQUEST: return 'bg-purple-50 text-purple-700 ring-purple-200';
    case Category.GENERAL: return 'bg-slate-50 text-slate-600 ring-slate-200';
    default: return 'bg-gray-50 text-gray-600 ring-gray-200';
  }
};

const getPriorityColor = (priority: Priority) => {
  switch (priority) {
    case Priority.HIGH: return 'text-red-600';
    case Priority.MEDIUM: return 'text-orange-500';
    case Priority.LOW: return 'text-blue-500';
    default: return 'text-gray-500';
  }
};

const getAvatarUrl = (name: string) => 
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&size=64`;

const ConfidenceMeter: React.FC<{ score: number }> = ({ score }) => {
  const percentage = Math.round(score * 100);
  let colorClass = 'bg-rose-500';
  if (score >= 0.8) colorClass = 'bg-emerald-500';
  else if (score >= 0.5) colorClass = 'bg-amber-500';

  return (
    <div className="flex items-center gap-1.5 group/meter" title={`AI Confidence: ${percentage}%`}>
      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider group-hover/meter:text-gray-600 transition-colors">
        AI Score
      </span>
      <div className="h-2 w-16 bg-gray-100 rounded-full overflow-hidden border border-gray-100 relative">
        <div 
            className={`h-full rounded-full ${colorClass} transition-all duration-500 ease-out`} 
            style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-[10px] font-medium text-gray-500 w-6 text-right">{percentage}%</span>
    </div>
  );
};

export const TicketRow: React.FC<TicketRowProps> = ({ ticket, onToggleStatus, onAssign, onEdit }) => {
  const isResolved = ticket.status === TicketStatus.RESOLVED;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const confidence = ticket.aiConfidence !== undefined ? ticket.aiConfidence : 0;
  const isHighConfidence = confidence > 0.8;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div 
      onClick={() => onEdit(ticket)}
      className={`
        group relative transition-all duration-200 rounded-xl border flex flex-col sm:flex-row items-stretch
        ${isResolved 
            ? 'bg-gray-50 border-gray-100 opacity-75' 
            : 'bg-white hover:border-blue-300 hover:shadow-md cursor-pointer'
        }
        ${!isResolved && isHighConfidence ? 'border-indigo-200 shadow-[0_2px_10px_-2px_rgba(99,102,241,0.15)]' : 'border-gray-200'}
        ${isDropdownOpen ? 'z-30' : 'hover:z-20'}
      `}
    >
        {/* High Confidence Gradient Highlight */}
        {!isResolved && isHighConfidence && (
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-400 to-purple-500 rounded-l-xl" />
        )}
        
        {/* Normal Priority Stripe if not high confidence */}
        {!isResolved && !isHighConfidence && ticket.priority === Priority.HIGH && (
             <div className="absolute top-0 left-0 w-1 h-full bg-red-500 rounded-l-xl" />
        )}

        <div className="flex-1 p-4 sm:p-5 flex gap-4">
            
            {/* Avatar Section */}
            <div className="flex-shrink-0 hidden sm:block pt-1">
                <img 
                    src={getAvatarUrl(ticket.customerName)} 
                    alt={ticket.customerName}
                    className={`w-10 h-10 rounded-full border-2 ${isHighConfidence ? 'border-indigo-100' : 'border-gray-100'}`} 
                />
            </div>

            <div className="flex-1 min-w-0 flex flex-col justify-between">
                {/* Header Line */}
                <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-medium text-gray-400">#{ticket.id}</span>
                    <span className="text-xs text-gray-300">•</span>
                    <span className="text-sm font-semibold text-gray-900 truncate">{ticket.customerName}</span>
                    <span className="text-xs text-gray-400 ml-auto sm:ml-0 whitespace-nowrap">
                        {new Date(ticket.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                    
                    {/* AI Badge */}
                    {!isResolved && isHighConfidence && (
                        <div className="ml-2 inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-sm animate-pulse-slow">
                             <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2L14.4 7.2L20 9.6L14.4 12L12 17.2L9.6 12L4 9.6L9.6 7.2L12 2Z" fill="currentColor"/>
                             </svg>
                             AI MATCH
                        </div>
                    )}
                </div>

                {/* Message */}
                <h3 className={`text-base font-medium text-gray-800 leading-snug mb-3 line-clamp-2 ${isResolved && 'line-through text-gray-400'}`}>
                    {ticket.message}
                </h3>

                {/* Tags Line */}
                <div className="flex flex-wrap items-center gap-3">
                    {/* Category */}
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ring-1 ring-inset ${getCategoryStyles(ticket.category)}`}>
                        {ticket.category}
                    </span>

                    {/* Priority */}
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-gray-50 border border-gray-100">
                         <div className={`w-1.5 h-1.5 rounded-full ${ticket.priority === Priority.HIGH ? 'bg-red-500 animate-pulse' : ticket.priority === Priority.MEDIUM ? 'bg-orange-400' : 'bg-blue-400'}`} />
                         <span className={`text-xs font-medium ${getPriorityColor(ticket.priority)}`}>{ticket.priority}</span>
                    </div>

                    {/* Separator */}
                    <div className="hidden sm:block w-px h-4 bg-gray-200 mx-1"></div>

                    {/* Confidence Meter */}
                    {ticket.aiConfidence !== undefined && !isResolved && (
                        <ConfidenceMeter score={ticket.aiConfidence} />
                    )}
                </div>
            </div>
        </div>

        {/* Action Column */}
        <div className="flex sm:flex-col items-center justify-between sm:justify-center p-3 sm:p-4 bg-gray-50/50 sm:bg-transparent border-t sm:border-t-0 sm:border-l border-gray-100 gap-3 min-w-[140px] rounded-b-xl sm:rounded-b-none sm:rounded-r-xl">
            
             {/* Assignee Dropdown */}
             <div 
                className="relative" 
                onClick={(e) => e.stopPropagation()}
                ref={dropdownRef}
             >
                <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`
                        flex items-center justify-between gap-2 w-full sm:w-32 px-2 py-1.5 rounded-lg border transition-all text-xs font-medium
                        ${ticket.assignedTo 
                            ? 'bg-white border-gray-200 text-gray-900 shadow-sm hover:border-blue-300' 
                            : 'bg-white border-dashed border-gray-300 text-gray-500 hover:border-gray-400 hover:text-gray-700'}
                    `}
                >
                    <div className="flex items-center gap-2 overflow-hidden">
                        {ticket.assignedTo ? (
                            <>
                                <img src={getAvatarUrl(ticket.assignedTo)} className="w-5 h-5 rounded-full" alt="" />
                                <span className="truncate">{ticket.assignedTo.split(' ')[1]}</span>
                            </>
                        ) : (
                            <>
                                <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                </div>
                                <span>Assign</span>
                            </>
                        )}
                    </div>
                    <svg className="w-3 h-3 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                        <div className="py-1 max-h-56 overflow-y-auto">
                            <button 
                                onClick={() => { onAssign(ticket.id, ''); setIsDropdownOpen(false); }}
                                className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                            >
                                <div className="w-5 h-5 rounded-full border border-dashed border-gray-300 flex items-center justify-center">
                                    <span className="text-[10px] text-gray-400">x</span>
                                </div>
                                Unassigned
                            </button>
                            {SUPPORT_AGENTS.map(agent => (
                                <button
                                    key={agent}
                                    onClick={() => { onAssign(ticket.id, agent); setIsDropdownOpen(false); }}
                                    className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-blue-50 transition-colors ${ticket.assignedTo === agent ? 'bg-blue-50 text-blue-700' : 'text-gray-700'}`}
                                >
                                    <img src={getAvatarUrl(agent)} alt={agent} className="w-5 h-5 rounded-full" />
                                    <span className="truncate">{agent}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
             </div>

             {/* Resolve Button */}
             <button
                onClick={(e) => { e.stopPropagation(); onToggleStatus(ticket.id); }}
                className={`
                    w-full sm:w-32 px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center justify-center gap-1.5 transition-all
                    ${isResolved
                        ? 'bg-gray-100 text-gray-500 border-gray-200 hover:bg-gray-200'
                        : 'bg-white text-gray-700 border-gray-200 shadow-sm hover:border-green-300 hover:text-green-700 hover:bg-green-50'}
                `}
             >
                {isResolved ? (
                    <>
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                        <span>Re-open</span>
                    </>
                ) : (
                    <>
                         <svg className="w-3.5 h-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                         <span>Resolve</span>
                    </>
                )}
             </button>
        </div>
    </div>
  );
};