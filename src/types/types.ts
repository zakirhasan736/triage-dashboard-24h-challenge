
export enum Category {
  BUG = 'Bug',
  BILLING = 'Billing',
  FEATURE_REQUEST = 'Feature Request',
  GENERAL = 'General',
}

export enum Priority {
  HIGH = 'High',
  MEDIUM = 'Medium',
  LOW = 'Low',
}

export enum TicketStatus {
  OPEN = 'Open',
  RESOLVED = 'Resolved',
}

export interface Ticket {
  id: string;
  customerName: string;
  message: string;
  timestamp: string; // ISO string
  category: Category;
  priority: Priority;
  status: TicketStatus;
  aiConfidence?: number; // Optional metric for AI analysis
  assignedTo?: string; // Name of the support agent assigned
}

export interface Stats {
  total: number;
  open: number;
  resolved: number;
  highPriorityOpen: number;
  catData: { name: string; count: number }[];
  prioData: { name: string; count: number }[];
}

// Shared Interface for the Logic Hook
export interface TicketManagement {
    tickets: Ticket[];
    isAnalyzing: boolean;
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
    sortedTickets: Ticket[];
    stats: Stats;
    handleToggleStatus: (id: string) => void;
    handleAssignTicket: (id: string, agent: string) => void;
    handleUpdateTicket: (t: Ticket) => void;
    handleNewTicket: (
        message: string, 
        customerName: string, 
        assignedTo: string,
        priority: Priority | 'Auto',
        category: Category | 'Auto',
        status: TicketStatus
    ) => Promise<boolean>;
    handleClearFilters: () => void;
}
