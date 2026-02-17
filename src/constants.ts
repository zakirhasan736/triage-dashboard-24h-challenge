import { Ticket, Category, Priority, TicketStatus } from './types/types';

export const SUPPORT_AGENTS = [
  "Agent Smith",
  "Agent Scully",
  "Agent Mulder",
  "Agent Cooper",
  "Agent Starling"
];

export const MOCK_TICKETS: Ticket[] = [
  {
    id: 'T-1001',
    customerName: 'Alice Johnson',
    message: 'My invoice is wrong for last month – I was charged twice.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    category: Category.BILLING,
    priority: Priority.HIGH,
    status: TicketStatus.OPEN,
    assignedTo: 'Agent Smith'
  },
  {
    id: 'T-1002',
    customerName: 'Bob Smith',
    message: 'The app keeps crashing when I try to upload a file.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    category: Category.BUG,
    priority: Priority.HIGH,
    status: TicketStatus.OPEN,
    assignedTo: 'Agent Scully'
  },
  {
    id: 'T-1003',
    customerName: 'Charlie Davis',
    message: 'Can you add support for dark mode in the next release?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    category: Category.FEATURE_REQUEST,
    priority: Priority.LOW,
    status: TicketStatus.OPEN,
  },
  {
    id: 'T-1004',
    customerName: 'Dana Lee',
    message: 'I forgot my password and the reset link is not working.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    category: Category.BUG,
    priority: Priority.MEDIUM,
    status: TicketStatus.OPEN,
    assignedTo: 'Agent Mulder'
  },
  {
    id: 'T-1005',
    customerName: 'Evan Wright',
    message: 'How do I change my profile picture?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    category: Category.GENERAL,
    priority: Priority.LOW,
    status: TicketStatus.RESOLVED,
    assignedTo: 'Agent Cooper'
  },
  {
    id: 'T-1006',
    customerName: 'Fiona Gallagher',
    message: 'I need to upgrade my plan to Enterprise. Who do I talk to?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    category: Category.BILLING,
    priority: Priority.MEDIUM,
    status: TicketStatus.OPEN,
  },
  {
    id: 'T-1007',
    customerName: 'George Miller',
    message: 'Error 500 when accessing the dashboard api.',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    category: Category.BUG,
    priority: Priority.HIGH,
    status: TicketStatus.OPEN,
    assignedTo: 'Agent Smith'
  },
  {
    id: 'T-1008',
    customerName: 'Hannah Abbott',
    message: 'Is there an integration with Slack available?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    category: Category.FEATURE_REQUEST,
    priority: Priority.LOW,
    status: TicketStatus.OPEN,
  },
  {
    id: 'T-1009',
    customerName: 'Ian Malcolm',
    message: 'The export to PDF function is cutting off the last column.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    category: Category.BUG,
    priority: Priority.MEDIUM,
    status: TicketStatus.OPEN,
    assignedTo: 'Agent Starling'
  },
  {
    id: 'T-1010',
    customerName: 'Jane Doe',
    message: 'Where can I find the privacy policy?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    category: Category.GENERAL,
    priority: Priority.LOW,
    status: TicketStatus.RESOLVED,
  },
  {
    id: 'T-1011',
    customerName: 'Kevin Hart',
    message: 'Cancel my subscription immediately.',
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    category: Category.BILLING,
    priority: Priority.HIGH,
    status: TicketStatus.OPEN,
    assignedTo: 'Agent Scully'
  },
  {
    id: 'T-1012',
    customerName: 'Laura Palmer',
    message: 'The mobile view is distorted on iPhone 13.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
    category: Category.BUG,
    priority: Priority.MEDIUM,
    status: TicketStatus.OPEN,
  },
  {
    id: 'T-1013',
    customerName: 'Mike Ross',
    message: 'Can we pay via wire transfer instead of credit card?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
    category: Category.BILLING,
    priority: Priority.MEDIUM,
    status: TicketStatus.OPEN,
  },
  {
    id: 'T-1014',
    customerName: 'Natalie Portman',
    message: 'Suggestion: It would be great to have multi-user support.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(),
    category: Category.FEATURE_REQUEST,
    priority: Priority.LOW,
    status: TicketStatus.OPEN,
  },
  {
    id: 'T-1015',
    customerName: 'Oscar Isaac',
    message: 'Nothing happens when I click the "Save" button.',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    category: Category.BUG,
    priority: Priority.HIGH,
    status: TicketStatus.OPEN,
    assignedTo: 'Agent Mulder'
  },
  {
    id: 'T-1016',
    customerName: 'Paul Atreides',
    message: 'I was charged for the annual plan but I selected monthly.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(),
    category: Category.BILLING,
    priority: Priority.HIGH,
    status: TicketStatus.OPEN,
  },
  {
    id: 'T-1017',
    customerName: 'Quentin Tarantino',
    message: 'Just wanted to say the new update is fantastic!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString(),
    category: Category.GENERAL,
    priority: Priority.LOW,
    status: TicketStatus.RESOLVED,
  },
  {
    id: 'T-1018',
    customerName: 'Rachel Green',
    message: 'The login page loads very slowly.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    category: Category.BUG,
    priority: Priority.MEDIUM,
    status: TicketStatus.OPEN,
  },
];

export const MOCK_NEW_MESSAGES = [
  "I'm getting a 404 error on the settings page.",
  "Please send me my receipts for 2023.",
  "Can you integrate with Zapier?",
  "The font size is too small on the dashboard.",
  "My account is locked out.",
  "I found a typo on the home page.",
  "Is the service down? I can't connect.",
  "How do I delete my account?"
];

export const MOCK_CUSTOMER_NAMES = [
  "Sarah Connor", "John Wick", "Ellen Ripley", "Marty McFly",
  "Tony Stark", "Bruce Wayne", "Clark Kent", "Diana Prince",
  "Peter Parker", "Wanda Maximoff", "Jean-Luc Picard", "James T. Kirk"
];