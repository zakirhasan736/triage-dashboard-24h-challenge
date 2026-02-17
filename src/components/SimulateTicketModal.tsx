import React, { useState, useEffect, useRef } from 'react';
import { MOCK_NEW_MESSAGES, MOCK_CUSTOMER_NAMES, SUPPORT_AGENTS } from '../constants';
import { Category, Priority, TicketStatus } from '@/types/types';

interface SimulateTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    message: string, 
    customerName: string, 
    assignedTo: string,
    priority: Priority | 'Auto',
    category: Category | 'Auto',
    status: TicketStatus
  ) => Promise<void>;
  isAnalyzing: boolean;
}

export const SimulateTicketModal: React.FC<SimulateTicketModalProps> = ({ isOpen, onClose, onSubmit, isAnalyzing }) => {
  const [customMessage, setCustomMessage] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  
  // Initial state is empty string to force user selection
  const [priority, setPriority] = useState<Priority | 'Auto' | ''>('');
  const [category, setCategory] = useState<Category | 'Auto' | ''>('');
  const [status, setStatus] = useState<TicketStatus>(TicketStatus.OPEN);

  // Validation state
  const [touched, setTouched] = useState({ category: false, priority: false, customerName: false, message: false });

  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen) {
        setCustomMessage('');
        setCustomerName('');
        setAssignedTo('');
        setPriority('');
        setCategory('');
        setStatus(TicketStatus.OPEN);
        setTouched({ category: false, priority: false, customerName: false, message: false });
        setTimeout(() => messageInputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleRandom = () => {
    const randomMsg = MOCK_NEW_MESSAGES[Math.floor(Math.random() * MOCK_NEW_MESSAGES.length)];
    const randomName = MOCK_CUSTOMER_NAMES[Math.floor(Math.random() * MOCK_CUSTOMER_NAMES.length)];
    const randomAgent = Math.random() > 0.5 ? SUPPORT_AGENTS[Math.floor(Math.random() * SUPPORT_AGENTS.length)] : '';
    
    // Pick specific Category and Priority instead of 'Auto'
    const categories = Object.values(Category);
    const priorities = Object.values(Priority);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const randomPriority = priorities[Math.floor(Math.random() * priorities.length)];

    setCustomMessage(randomMsg);
    setCustomerName(randomName);
    setAssignedTo(randomAgent);
    setPriority(randomPriority);
    setCategory(randomCategory);
    setStatus(TicketStatus.OPEN);
    
    // Reset touched since we filled valid data
    setTouched({ category: false, priority: false, customerName: false, message: false });
  };

  // Validation Logic
  const isCategoryValid = category !== '' && category !== 'Auto';
  const isPriorityValid = priority !== '' && priority !== 'Auto';
  const isNameValid = customerName.trim().length > 0;
  const isMessageValid = customMessage.trim().length > 0;

  const isValid = isMessageValid && isNameValid && isPriorityValid && isCategoryValid;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isValid) {
      await onSubmit(customMessage, customerName, assignedTo, priority as Priority, category as Category, status);
      // Reset form handled by useEffect on isOpen or manually here if needed
      onClose();
    } else {
        // Mark all as touched to show errors
        setTouched({ category: true, priority: true, customerName: true, message: true });
    }
  };

  const getInputClass = (isFieldValid: boolean, isFieldTouched: boolean) => `
    block w-full rounded-md shadow-sm text-sm font-medium text-gray-900 p-2.5 border bg-white transition-colors
    ${!isFieldValid && isFieldTouched 
        ? 'border-red-300 focus:border-red-500 focus:ring-red-500 bg-red-50' 
        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'}
  `;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] ring-1 ring-slate-900/5">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white">
          <h3 className="text-xl font-bold text-gray-900">New Ticket</h3>
          <button 
             onClick={onClose}
             className="text-gray-400 hover:text-gray-600 transition-colors"
          >
             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-0 overflow-y-auto">
          
          {/* Simulation Controls */}
          <div className="bg-slate-50 px-6 py-3 border-b border-gray-200 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wide text-gray-500">
                 Simulation Mode
              </span>
              <button
                type="button"
                onClick={handleRandom}
                disabled={isAnalyzing}
                className="text-sm text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 hover:underline transition-all"
              >
                 <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                 Generate Random Data
              </button>
          </div>

          <div className="p-8 space-y-6">
            
            <div className="grid grid-cols-2 gap-6">
                <div className="group">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                        Customer <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        className={getInputClass(isNameValid, touched.customerName)}
                        placeholder="e.g. John Doe"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        onBlur={() => setTouched(prev => ({...prev, customerName: true}))}
                        disabled={isAnalyzing}
                    />
                </div>
                <div className="group">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Assignee</label>
                    <select
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm font-medium text-gray-900 p-2.5 border bg-white"
                        style={{ color: '#111827' }} // Enforce black text
                        value={assignedTo}
                        onChange={(e) => setAssignedTo(e.target.value)}
                        disabled={isAnalyzing}
                    >
                        <option value="" className="text-gray-500">Unassigned</option>
                        {SUPPORT_AGENTS.map(agent => (
                        <option key={agent} value={agent} className="text-gray-900">{agent}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="group">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                    Issue Description <span className="text-red-500">*</span>
                </label>
                <textarea
                    ref={messageInputRef}
                    className={`${getInputClass(isMessageValid, touched.message)} h-32 resize-y`}
                    placeholder="Describe the issue..."
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    onBlur={() => setTouched(prev => ({...prev, message: true}))}
                    disabled={isAnalyzing}
                />
            </div>

            <div className="pt-6 border-t border-gray-100">
                <div className="grid grid-cols-3 gap-4">
                     <div className="group">
                         <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                             Category <span className="text-red-500">*</span>
                         </label>
                         <select
                            className={getInputClass(isCategoryValid, touched.category)}
                            style={{ color: '#111827' }}
                            value={category}
                            onChange={(e) => setCategory(e.target.value as Category)}
                            onBlur={() => setTouched(prev => ({...prev, category: true}))}
                            disabled={isAnalyzing}
                        >
                            <option value="" disabled>Select...</option>
                            {Object.values(Category).map(c => <option key={c} value={c} className="text-gray-900">{c}</option>)}
                        </select>
                        {!isCategoryValid && touched.category && (
                            <p className="mt-1 text-xs text-red-500">Required</p>
                        )}
                     </div>
                     <div className="group">
                         <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                             Priority <span className="text-red-500">*</span>
                         </label>
                         <select
                            className={getInputClass(isPriorityValid, touched.priority)}
                            style={{ color: '#111827' }}
                            value={priority}
                            onChange={(e) => setPriority(e.target.value as Priority)}
                            onBlur={() => setTouched(prev => ({...prev, priority: true}))}
                            disabled={isAnalyzing}
                        >
                            <option value="" disabled>Select...</option>
                            {Object.values(Priority).map(p => <option key={p} value={p} className="text-gray-900">{p}</option>)}
                        </select>
                        {!isPriorityValid && touched.priority && (
                            <p className="mt-1 text-xs text-red-500">Required</p>
                        )}
                     </div>
                     <div className="group">
                         <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Status</label>
                         <select
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm font-medium text-gray-900 p-2.5 border bg-white"
                            style={{ color: '#111827' }}
                            value={status}
                            onChange={(e) => setStatus(e.target.value as TicketStatus)}
                            disabled={isAnalyzing}
                        >
                            {Object.values(TicketStatus).map(s => <option key={s} value={s} className="text-gray-900">{s}</option>)}
                        </select>
                     </div>
                </div>
            </div>

          </div>
          
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
             <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={isAnalyzing}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isValid || isAnalyzing}
              className="px-6 py-2 text-sm font-medium text-white bg-slate-900 border border-transparent rounded-md shadow-sm hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 min-w-[120px] justify-center transition-colors"
            >
              {isAnalyzing ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing
                </>
              ) : (
                'Create Ticket'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};