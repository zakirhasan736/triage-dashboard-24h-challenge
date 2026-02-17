import React from 'react';
import { SUPPORT_AGENTS } from '@/constants';
import { Ticket, TicketStatus } from '@/types/types';

interface TeamViewProps {
  tickets: Ticket[];
}

const getAvatarUrl = (name: string) => 
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&size=128`;

export const TeamView: React.FC<TeamViewProps> = ({ tickets }) => {
  
  const getAgentStats = (agent: string) => {
    const agentTickets = tickets.filter(t => t.assignedTo === agent);
    const active = agentTickets.filter(t => t.status === TicketStatus.OPEN).length;
    const resolved = agentTickets.filter(t => t.status === TicketStatus.RESOLVED).length;
    return { active, resolved };
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in duration-300">
      {SUPPORT_AGENTS.map((agent) => {
        const stats = getAgentStats(agent);
        return (
            <div key={agent} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-24 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                <div className="px-6 pb-6">
                    <div className="relative -mt-12 mb-4">
                         <img 
                            src={getAvatarUrl(agent)} 
                            alt={agent} 
                            className="w-24 h-24 rounded-full border-4 border-white bg-white shadow-sm"
                        />
                         <div className={`absolute bottom-1 right-[calc(100%-6rem)] w-5 h-5 rounded-full border-2 border-white ${stats.active > 5 ? 'bg-amber-500' : 'bg-green-500'}`} title={stats.active > 5 ? 'Busy' : 'Available'}></div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{agent}</h3>
                    <p className="text-sm text-gray-500 mb-4">Customer Support Specialist</p>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                        <div className="text-center">
                            <span className="block text-2xl font-bold text-gray-900">{stats.active}</span>
                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Active</span>
                        </div>
                        <div className="text-center border-l border-gray-100">
                            <span className="block text-2xl font-bold text-gray-900">{stats.resolved}</span>
                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Resolved</span>
                        </div>
                    </div>
                    
                    <button className="w-full mt-6 py-2 px-4 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-medium rounded-lg border border-gray-200 transition-colors">
                        View Profile
                    </button>
                </div>
            </div>
        );
      })}
      
      {/* Hiring Card */}
      <div className="bg-gray-50 rounded-xl border border-dashed border-gray-300 flex flex-col items-center justify-center p-6 min-h-[300px] text-center hover:bg-gray-100 transition-colors cursor-pointer group">
          <div className="w-16 h-16 rounded-full bg-white border border-gray-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
             <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Hire New Agent</h3>
          <p className="text-sm text-gray-500 mt-2">Add a new member to your support team.</p>
      </div>
    </div>
  );
};