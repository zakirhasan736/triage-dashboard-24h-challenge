import React, { useState, useEffect } from 'react';
import { Ticket, Category, Priority, TicketStatus } from '@/types/types';
import { SUPPORT_AGENTS } from '@/constants';

interface EditTicketModalProps {
  ticket: Ticket | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedTicket: Ticket) => void;
}

const getAvatarUrl = (name: string) => 
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&size=64`;

export const EditTicketModal: React.FC<EditTicketModalProps> = ({ ticket, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState<Ticket | null>(null);

  useEffect(() => {
    setFormData(ticket);
  }, [ticket]);

  if (!isOpen || !formData) return null;

  const handleChange = (field: keyof Ticket, value: any) => {
    setFormData(prev => prev ? ({ ...prev, [field]: value }) : null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      onSave(formData);
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col max-h-[90vh] ring-1 ring-slate-900/5">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-white sticky top-0 z-10">
          <div className="flex items-center gap-3">
             <div className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm font-mono font-bold">
                 {formData.id}
             </div>
             <span className="text-gray-300">/</span>
             <h2 className="text-lg font-semibold text-gray-900">Ticket Details</h2>
          </div>
          <button 
                type="button" 
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
            >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
            
            {/* LEFT COLUMN: Main Content */}
            <div className="lg:col-span-8 p-8 border-r border-gray-200 space-y-8 bg-white">
                
                {/* Customer Info */}
                <div className="flex items-start gap-4">
                    <img 
                        src={getAvatarUrl(formData.customerName)} 
                        alt="Customer" 
                        className="w-10 h-10 rounded-full bg-gray-100"
                    />
                    <div>
                        <h3 className="text-base font-bold text-gray-900">{formData.customerName}</h3>
                        <p className="text-xs text-gray-500">Reported on {new Date(formData.timestamp).toLocaleString()}</p>
                    </div>
                </div>

                {/* Message */}
                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Description</label>
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-gray-900 text-base leading-relaxed whitespace-pre-wrap font-medium shadow-inner">
                        {formData.message}
                    </div>
                </div>

                {/* AI Insight */}
                {formData.aiConfidence !== undefined && (
                     <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-lg border border-blue-100 flex gap-4">
                         <div className="mt-1">
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-indigo-600">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                            </div>
                         </div>
                         <div>
                             <p className="text-sm font-bold text-gray-900 mb-1">AI Triage Analysis</p>
                             <p className="text-sm text-gray-600">
                                Categorized as <strong className="text-gray-900">{formData.category}</strong> with <strong className="text-gray-900">{(formData.aiConfidence * 100).toFixed(0)}%</strong> confidence.
                             </p>
                         </div>
                     </div>
                )}
            </div>

            {/* RIGHT COLUMN: Sidebar Properties */}
            <div className="lg:col-span-4 bg-gray-50 p-6 space-y-8">
                
                {/* Status Field */}
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Status</label>
                    <select
                        value={formData.status}
                        onChange={(e) => handleChange('status', e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm font-medium text-gray-900 py-2 px-3 bg-white"
                        style={{ color: '#111827' }} // Enforce black text
                    >
                         {Object.values(TicketStatus).map(s => <option key={s} value={s} className="text-gray-900">{s}</option>)}
                    </select>
                </div>

                {/* Priority Field */}
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Priority</label>
                    <select
                        value={formData.priority}
                        onChange={(e) => handleChange('priority', e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm font-medium text-gray-900 py-2 px-3 bg-white"
                        style={{ color: '#111827' }} // Enforce black text
                    >
                         {Object.values(Priority).map(p => <option key={p} value={p} className="text-gray-900">{p}</option>)}
                    </select>
                </div>

                 {/* Category Field */}
                 <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Category</label>
                    <select
                        value={formData.category}
                        onChange={(e) => handleChange('category', e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm font-medium text-gray-900 py-2 px-3 bg-white"
                        style={{ color: '#111827' }} // Enforce black text
                    >
                         {Object.values(Category).map(c => <option key={c} value={c} className="text-gray-900">{c}</option>)}
                    </select>
                </div>

                {/* Assignee Field */}
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Assignee</label>
                    <div className="flex items-center gap-2">
                        {formData.assignedTo ? (
                             <img src={getAvatarUrl(formData.assignedTo)} className="w-8 h-8 rounded-full border border-gray-200" alt="" />
                        ) : (
                            <div className="w-8 h-8 rounded-full bg-white border border-dashed border-gray-300 flex items-center justify-center">
                                <span className="text-gray-400 text-xs">?</span>
                            </div>
                        )}
                        <select
                            value={formData.assignedTo || ''}
                            onChange={(e) => handleChange('assignedTo', e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm font-medium text-gray-900 py-2 px-3 bg-white"
                            style={{ color: '#111827' }} // Enforce black text
                        >
                            <option value="" className="text-gray-500">Unassigned</option>
                            {SUPPORT_AGENTS.map(agent => (
                            <option key={agent} value={agent} className="text-gray-900">{agent}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="pt-8 mt-4 border-t border-gray-200">
                    <div className="text-xs text-gray-400 space-y-1">
                        <p>Ticket ID: <span className="font-mono text-gray-500">{formData.id}</span></p>
                        <p>Last Updated: <span className="text-gray-500">Just now</span></p>
                    </div>
                </div>

            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3 sticky bottom-0">
             <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save Changes
            </button>
        </div>
      </div>
    </div>
  );
};