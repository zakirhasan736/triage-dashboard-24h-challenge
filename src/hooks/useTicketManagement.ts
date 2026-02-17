import { useState, useMemo, useCallback } from 'react';
import { Ticket, Category, Priority, TicketStatus } from '../types/types';
import { MOCK_TICKETS } from '../constants';
import { analyzeTicketWithGemini } from '../services/geminiService';
import { useToast } from '../components/common/Toast';

export const useTicketManagement = () => {
  const [tickets, setTickets] = useState<Ticket[]>(MOCK_TICKETS);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [filterPriority, setFilterPriority] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<TicketStatus | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'Default' | 'ConfidenceDesc' | 'ConfidenceAsc'>('Default');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const { addToast } = useToast();

  // --- Actions ---

  const handleToggleStatus = useCallback((id: string) => {
    let newStatus: TicketStatus;
    setTickets(prev => prev.map(t => {
      if (t.id === id) {
        newStatus = t.status === TicketStatus.OPEN ? TicketStatus.RESOLVED : TicketStatus.OPEN;
        addToast(`Ticket ${t.id} marked as ${newStatus}`, newStatus === TicketStatus.RESOLVED ? 'success' : 'info');
        return { ...t, status: newStatus };
      }
      return t;
    }));
  }, [addToast]);

  const handleAssignTicket = useCallback((id: string, agent: string) => {
    setTickets(prev => prev.map(t => 
      t.id === id 
        ? { ...t, assignedTo: agent || undefined } 
        : t
    ));
    if (agent) {
      addToast(`Assigned ${id} to ${agent}`, 'success');
    } else {
      addToast(`Unassigned ${id}`, 'info');
    }
  }, [addToast]);

  const handleUpdateTicket = useCallback((updatedTicket: Ticket) => {
    setTickets(prev => prev.map(t => t.id === updatedTicket.id ? updatedTicket : t));
    addToast('Ticket details updated successfully', 'success');
  }, [addToast]);

  const handleNewTicket = useCallback(async (
    message: string, 
    customerName: string, 
    assignedTo: string,
    manualPriority: Priority | 'Auto',
    manualCategory: Category | 'Auto',
    manualStatus: TicketStatus
  ) => {
    setIsAnalyzing(true);
    try {
      let analysisResult = {
        category: Category.GENERAL,
        priority: Priority.LOW,
        confidence: 0
      };

      if (manualCategory === 'Auto' || manualPriority === 'Auto') {
        analysisResult = await analyzeTicketWithGemini(message);
      }
      
      const newTicket: Ticket = {
        id: `T-${1000 + tickets.length + 1}`,
        customerName: customerName,
        message,
        timestamp: new Date().toISOString(),
        category: manualCategory !== 'Auto' ? manualCategory : analysisResult.category,
        priority: manualPriority !== 'Auto' ? manualPriority : analysisResult.priority,
        status: manualStatus,
        aiConfidence: (manualCategory !== 'Auto' && manualPriority !== 'Auto') ? 1.0 : analysisResult.confidence,
        assignedTo: assignedTo || undefined
      };

      setTickets(prev => [newTicket, ...prev]);
      
      const isAuto = manualCategory === 'Auto' || manualPriority === 'Auto';
      addToast(
        `New ticket created! ${isAuto ? `AI detected: ${newTicket.category}` : ''}`, 
        'success'
      );
      return true; // Success

    } catch (e) {
      console.error(e);
      addToast("Failed to process ticket", 'error');
      return false; // Failure
    } finally {
      setIsAnalyzing(false);
    }
  }, [tickets.length, addToast]);

  const handleClearFilters = useCallback(() => {
    setFilterCategory('All');
    setFilterPriority('All');
    setFilterStatus('All');
    setSearchQuery('');
  }, []);

  // --- Computed Data ---

  const filteredTickets = useMemo(() => {
    return tickets.filter(t => {
      const matchCat = filterCategory === 'All' || t.category === filterCategory;
      const matchPrio = filterPriority === 'All' || t.priority === filterPriority;
      const matchStatus = filterStatus === 'All' || t.status === filterStatus;
      
      const query = searchQuery.toLowerCase().trim();
      const matchSearch = !query || 
        t.message.toLowerCase().includes(query) || 
        t.customerName.toLowerCase().includes(query) ||
        t.id.toLowerCase().includes(query);

      return matchCat && matchPrio && matchStatus && matchSearch;
    });
  }, [tickets, filterCategory, filterPriority, filterStatus, searchQuery]);

  const sortedTickets = useMemo(() => {
    return [...filteredTickets].sort((a, b) => {
        if (sortBy === 'ConfidenceDesc') {
          return (b.aiConfidence || 0) - (a.aiConfidence || 0);
        }
        if (sortBy === 'ConfidenceAsc') {
          return (a.aiConfidence || 0) - (b.aiConfidence || 0);
        }

        // Default Sort: Status (Open First) -> Priority (High to Low) -> Date (Newest)
        if (a.status !== b.status) {
            return a.status === TicketStatus.OPEN ? -1 : 1;
        }
        
        const pOrder = { [Priority.HIGH]: 0, [Priority.MEDIUM]: 1, [Priority.LOW]: 2 };
        if (pOrder[a.priority] !== pOrder[b.priority]) {
            return pOrder[a.priority] - pOrder[b.priority];
        }
        
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });
  }, [filteredTickets, sortBy]);

  const stats = useMemo(() => {
    const total = tickets.length;
    const open = tickets.filter(t => t.status === TicketStatus.OPEN).length;
    const resolved = tickets.filter(t => t.status === TicketStatus.RESOLVED).length;
    const highPriorityOpen = tickets.filter(t => t.priority === Priority.HIGH && t.status === TicketStatus.OPEN).length;
    
    const catData = Object.values(Category).map(cat => ({
      name: cat,
      count: tickets.filter(t => t.category === cat).length
    }));

    const prioData = Object.values(Priority).map(p => ({
      name: p,
      count: tickets.filter(t => t.priority === p).length
    }));

    return { total, open, resolved, highPriorityOpen, catData, prioData };
  }, [tickets]);

  return {
    // State
    tickets,
    isAnalyzing,
    // Filters & Sort
    filterCategory, setFilterCategory,
    filterPriority, setFilterPriority,
    filterStatus, setFilterStatus,
    searchQuery, setSearchQuery,
    sortBy, setSortBy,
    // Data
    sortedTickets,
    stats,
    // Actions
    handleToggleStatus,
    handleAssignTicket,
    handleUpdateTicket,
    handleNewTicket,
    handleClearFilters
  };
};
