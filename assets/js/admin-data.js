/**
 * PropVantage Property Management - Centralized State & Data Engine (admin-data.js)
 * Persistent single source of truth across all admin dashboard pages.
 */

const PROPVANTAGE_STORAGE_KEY = 'propvantage_dashboard_state_v1';

// Initial Realistic Seed Data
const SEED_PROPVANTAGE_DATA = {
  properties: [
    {
      id: "prop-1",
      name: "Oakridge Manor & Heights",
      address: "442 Highland Ave, Suite 100",
      totalUnits: 48,
      occupiedUnits: 46,
      vacantUnits: 2,
      monthlyRent: 88800,
      occupancyRate: 95.8,
      status: "Active",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80",
      capRate: 6.8,
      type: "Multi-Family Luxury",
      yearBuilt: 2019
    },
    {
      id: "prop-2",
      name: "Sunset Boulevard Lofts",
      address: "1280 Sunset Blvd, West Wing",
      totalUnits: 32,
      occupiedUnits: 30,
      vacantUnits: 2,
      monthlyRent: 63000,
      occupancyRate: 93.75,
      status: "Active",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80",
      capRate: 7.2,
      type: "Urban Loft",
      yearBuilt: 2021
    },
    {
      id: "prop-3",
      name: "Greenfield Park Residences",
      address: "850 Greenfield Way, Block B",
      totalUnits: 60,
      occupiedUnits: 58,
      vacantUnits: 2,
      monthlyRent: 101500,
      occupancyRate: 96.6,
      status: "Active",
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80",
      capRate: 6.5,
      type: "Garden Apartments",
      yearBuilt: 2018
    },
    {
      id: "prop-4",
      name: "Highland Tower Executive",
      address: "310 Skyline Drive, Tower 1",
      totalUnits: 40,
      occupiedUnits: 37,
      vacantUnits: 3,
      monthlyRent: 96200,
      occupancyRate: 92.5,
      status: "Active",
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=600&q=80",
      capRate: 7.0,
      type: "High-Rise Condos",
      yearBuilt: 2022
    },
    {
      id: "prop-5",
      name: "Marina Bay Waterfront",
      address: "720 Harbor View Road",
      totalUnits: 24,
      occupiedUnits: 24,
      vacantUnits: 0,
      monthlyRent: 58800,
      occupancyRate: 100.0,
      status: "Active",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80",
      capRate: 7.5,
      type: "Waterfront Townhomes",
      yearBuilt: 2020
    },
    {
      id: "prop-6",
      name: "Beacon Hill Estates",
      address: "190 Beacon Hill Circle",
      totalUnits: 16,
      occupiedUnits: 15,
      vacantUnits: 1,
      monthlyRent: 42000,
      occupancyRate: 93.75,
      status: "Active",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
      capRate: 6.9,
      type: "Luxury Villas",
      yearBuilt: 2017
    },
    {
      id: "prop-7",
      name: "Emerald Gardens Plaza",
      address: "550 Emerald Way, North Wing",
      totalUnits: 36,
      occupiedUnits: 33,
      vacantUnits: 3,
      monthlyRent: 54450,
      occupancyRate: 91.6,
      status: "Under Maintenance",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80",
      capRate: 6.4,
      type: "Mid-Rise Complex",
      yearBuilt: 2016
    },
    {
      id: "prop-8",
      name: "Cedar Point Residences",
      address: "920 Cedar Ridge Lane",
      totalUnits: 28,
      occupiedUnits: 26,
      vacantUnits: 2,
      monthlyRent: 49400,
      occupancyRate: 92.8,
      status: "Active",
      image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=600&q=80",
      capRate: 7.1,
      type: "Townhomes",
      yearBuilt: 2023
    }
  ],
  payments: [
    {
      id: "pay-1",
      tenantName: "Ananya Sharma",
      propertyName: "Oakridge Manor & Heights",
      unit: "A-304",
      amount: 1850,
      dueDate: "2026-09-01",
      paymentDate: "2026-09-01",
      status: "Paid",
      method: "ACH Direct Deposit",
      history: ["Aug: Paid on time", "Jul: Paid on time"]
    },
    {
      id: "pay-2",
      tenantName: "Dr. Rajesh Verma",
      propertyName: "Sunset Boulevard Lofts",
      unit: "B-102",
      amount: 2100,
      dueDate: "2026-09-01",
      paymentDate: "2026-09-02",
      status: "Paid",
      method: "Credit Card",
      history: ["Aug: Paid on time", "Jul: Paid on time"]
    },
    {
      id: "pay-3",
      tenantName: "Chef Karan Kapoor",
      propertyName: "Highland Tower Executive",
      unit: "T1-802",
      amount: 2600,
      dueDate: "2026-09-05",
      paymentDate: "-",
      status: "Pending",
      method: "Bank Transfer",
      history: ["Aug: Paid on time", "Jul: Paid on time"]
    },
    {
      id: "pay-4",
      tenantName: "Sneha Patel",
      propertyName: "Greenfield Park Residences",
      unit: "G-205",
      amount: 1750,
      dueDate: "2026-09-01",
      paymentDate: "2026-09-01",
      status: "Paid",
      method: "ACH Direct Deposit",
      history: ["Aug: Paid on time", "Jul: Paid on time"]
    },
    {
      id: "pay-5",
      tenantName: "Vikram Malhotra",
      propertyName: "Marina Bay Waterfront",
      unit: "MB-12",
      amount: 2450,
      dueDate: "2026-09-01",
      paymentDate: "-",
      status: "Pending",
      method: "Credit Card",
      history: ["Aug: Paid on time", "Jul: Paid on time"]
    },
    {
      id: "pay-6",
      tenantName: "Pooja Hegde",
      propertyName: "Cedar Point Residences",
      unit: "CP-4B",
      amount: 1900,
      dueDate: "2026-08-28",
      paymentDate: "-",
      status: "Overdue",
      method: "Auto-Pay",
      history: ["Aug: 5 days late", "Jul: Paid on time"]
    },
    {
      id: "pay-7",
      tenantName: "Amitabh Sen",
      propertyName: "Beacon Hill Estates",
      unit: "BH-08",
      amount: 2800,
      dueDate: "2026-09-01",
      paymentDate: "2026-09-03",
      status: "Paid",
      method: "Wire Transfer",
      history: ["Aug: Paid on time", "Jul: Paid on time"]
    },
    {
      id: "pay-8",
      tenantName: "Rhea Chakraborty",
      propertyName: "Emerald Gardens Plaza",
      unit: "EG-114",
      amount: 1650,
      dueDate: "2026-08-25",
      paymentDate: "-",
      status: "Overdue",
      method: "Online Portal",
      history: ["Aug: Late Notice Sent", "Jul: Paid on time"]
    },
    {
      id: "pay-9",
      tenantName: "Siddharth Roy",
      propertyName: "Oakridge Manor & Heights",
      unit: "A-108",
      amount: 1750,
      dueDate: "2026-09-05",
      paymentDate: "-",
      status: "Pending",
      method: "ACH Direct",
      history: ["Aug: Paid on time", "Jul: Paid on time"]
    },
    {
      id: "pay-10",
      tenantName: "Neha Deshmukh",
      propertyName: "Sunset Boulevard Lofts",
      unit: "B-401",
      amount: 2050,
      dueDate: "2026-09-01",
      paymentDate: "2026-09-01",
      status: "Paid",
      method: "Direct Debit",
      history: ["Aug: Paid on time", "Jul: Paid on time"]
    }
  ],
  maintenance: [
    {
      id: "maint-1",
      ticketNumber: "#TCK-4081",
      propertyName: "Oakridge Manor & Heights",
      unit: "A-304",
      issue: "HVAC Compressor Cooling Irregularity",
      tenantName: "Ananya Sharma",
      priority: "High",
      status: "In Progress",
      assignedTech: "Apex Climate Systems (David R.)",
      createdAt: "2026-09-06",
      updatedAt: "2026-09-07",
      description: "AC unit cooling slower than normal during peak afternoon temperatures.",
      cost: "$240"
    },
    {
      id: "maint-2",
      ticketNumber: "#TCK-4082",
      propertyName: "Sunset Boulevard Lofts",
      unit: "B-102",
      issue: "Water Heater Pressure Valve Replacement",
      tenantName: "Dr. Rajesh Verma",
      priority: "Urgent",
      status: "Dispatched",
      assignedTech: "ProPlumb Solutions (Mike T.)",
      createdAt: "2026-09-07",
      updatedAt: "2026-09-08",
      description: "Minor water seepage observed near the expansion tank safety valve.",
      cost: "$185"
    },
    {
      id: "maint-3",
      ticketNumber: "#TCK-4083",
      propertyName: "Greenfield Park Residences",
      unit: "G-205",
      issue: "Smart Keypad Lock Battery Replacement",
      tenantName: "Sneha Patel",
      priority: "Low",
      status: "Completed",
      assignedTech: "In-House Facility Staff",
      createdAt: "2026-09-04",
      updatedAt: "2026-09-05",
      description: "Keyless entry battery low warning on main door panel.",
      cost: "$35"
    },
    {
      id: "maint-4",
      ticketNumber: "#TCK-4084",
      propertyName: "Highland Tower Executive",
      unit: "T1-802",
      issue: "Kitchen Sink Garbage Disposal Jam",
      tenantName: "Chef Karan Kapoor",
      priority: "Medium",
      status: "New",
      assignedTech: "Unassigned",
      createdAt: "2026-09-08",
      updatedAt: "2026-09-08",
      description: "Disposal unit motor humming but blades not spinning.",
      cost: "$95"
    },
    {
      id: "maint-5",
      ticketNumber: "#TCK-4085",
      propertyName: "Marina Bay Waterfront",
      unit: "MB-12",
      issue: "Balcony Sliding Door Track Alignment",
      tenantName: "Vikram Malhotra",
      priority: "Low",
      status: "New",
      assignedTech: "Unassigned",
      createdAt: "2026-09-07",
      updatedAt: "2026-09-07",
      description: "Sliding patio door sticking on lower track guide.",
      cost: "$60"
    },
    {
      id: "maint-6",
      ticketNumber: "#TCK-4086",
      propertyName: "Cedar Point Residences",
      unit: "CP-4B",
      issue: "Dishwasher Drainage Pump Diagnostic",
      tenantName: "Pooja Hegde",
      priority: "Medium",
      status: "In Progress",
      assignedTech: "Swift Appliance Service",
      createdAt: "2026-09-05",
      updatedAt: "2026-09-06",
      description: "Error code E24 showing at cycle conclusion.",
      cost: "$120"
    },
    {
      id: "maint-7",
      ticketNumber: "#TCK-4087",
      propertyName: "Emerald Gardens Plaza",
      unit: "EG-114",
      issue: "Hallway Light Fixture Ballast Hum",
      tenantName: "Rhea Chakraborty",
      priority: "Low",
      status: "Completed",
      assignedTech: "In-House Facility Staff",
      createdAt: "2026-09-02",
      updatedAt: "2026-09-03",
      description: "Replaced buzzing LED driver in entryway ceiling fixture.",
      cost: "$45"
    },
    {
      id: "maint-8",
      ticketNumber: "#TCK-4088",
      propertyName: "Beacon Hill Estates",
      unit: "BH-08",
      issue: "Lawn Sprinkler Zone 3 Valve Leaking",
      tenantName: "Amitabh Sen",
      priority: "Medium",
      status: "Dispatched",
      assignedTech: "GreenCare Landscaping",
      createdAt: "2026-09-06",
      updatedAt: "2026-09-07",
      description: "Solenoid valve weeping after morning scheduled cycle.",
      cost: "$110"
    }
  ],
  renewals: [
    {
      id: "lease-1",
      tenantName: "Ananya Sharma",
      propertyName: "Oakridge Manor & Heights",
      unit: "A-304",
      currentRent: 1850,
      proposedRent: 1950,
      startDate: "2025-10-15",
      expiryDate: "2026-10-14",
      daysRemaining: 36,
      status: "Pending",
      action: "Send Offer"
    },
    {
      id: "lease-2",
      tenantName: "Dr. Rajesh Verma",
      propertyName: "Sunset Boulevard Lofts",
      unit: "B-102",
      currentRent: 2100,
      proposedRent: 2200,
      startDate: "2025-11-01",
      expiryDate: "2026-10-31",
      daysRemaining: 53,
      status: "Offered",
      action: "Awaiting Tenant"
    },
    {
      id: "lease-3",
      tenantName: "Chef Karan Kapoor",
      propertyName: "Highland Tower Executive",
      unit: "T1-802",
      currentRent: 2600,
      proposedRent: 2750,
      startDate: "2025-11-15",
      expiryDate: "2026-11-14",
      daysRemaining: 67,
      status: "Pending",
      action: "Send Offer"
    },
    {
      id: "lease-4",
      tenantName: "Sneha Patel",
      propertyName: "Greenfield Park Residences",
      unit: "G-205",
      currentRent: 1750,
      proposedRent: 1820,
      startDate: "2025-10-01",
      expiryDate: "2026-09-30",
      daysRemaining: 22,
      status: "Renewed",
      action: "Completed"
    },
    {
      id: "lease-5",
      tenantName: "Vikram Malhotra",
      propertyName: "Marina Bay Waterfront",
      unit: "MB-12",
      currentRent: 2450,
      proposedRent: 2600,
      startDate: "2025-12-01",
      expiryDate: "2026-11-30",
      daysRemaining: 83,
      status: "Pending",
      action: "Send Offer"
    },
    {
      id: "lease-6",
      tenantName: "Pooja Hegde",
      propertyName: "Cedar Point Residences",
      unit: "CP-4B",
      currentRent: 1900,
      proposedRent: 2000,
      startDate: "2025-10-20",
      expiryDate: "2026-10-19",
      daysRemaining: 41,
      status: "Offered",
      action: "Awaiting Tenant"
    },
    {
      id: "lease-7",
      tenantName: "Amitabh Sen",
      propertyName: "Beacon Hill Estates",
      unit: "BH-08",
      currentRent: 2800,
      proposedRent: 2950,
      startDate: "2025-12-15",
      expiryDate: "2026-12-14",
      daysRemaining: 97,
      status: "Pending",
      action: "Send Offer"
    }
  ],
  messages: [
    {
      id: "msg-1",
      sender: "Ananya Sharma",
      senderType: "Tenant",
      propertyName: "Oakridge Manor & Heights",
      unit: "A-304",
      subject: "Lease Extension & Assigned Parking Inquiry",
      body: "Hello PropVantage management, I received the upcoming renewal notice and would like to confirm if we can add a second covered parking spot to our lease agreement.",
      date: "Today, 10:24 AM",
      isRead: false,
      isArchived: false
    },
    {
      id: "msg-2",
      sender: "Dr. Rajesh Verma",
      senderType: "Tenant",
      propertyName: "Sunset Boulevard Lofts",
      unit: "B-102",
      subject: "Water Heater Service Window Confirmation",
      body: "Thank you for dispatching Mike from ProPlumb. Just confirming he will arrive between 2:00 PM and 4:00 PM today as discussed.",
      date: "Today, 8:45 AM",
      isRead: false,
      isArchived: false
    },
    {
      id: "msg-3",
      sender: "Apex Climate Systems",
      senderType: "Vendor",
      propertyName: "Oakridge Manor & Heights",
      unit: "A-304",
      subject: "HVAC Inspection Report & Part Estimate",
      body: "Attached is the diagnostic summary for unit A-304. Capacitor replacement required, cost estimated at $240.",
      date: "Yesterday",
      isRead: false,
      isArchived: false
    },
    {
      id: "msg-4",
      sender: "Sneha Patel",
      senderType: "Tenant",
      propertyName: "Greenfield Park Residences",
      unit: "G-205",
      subject: "Signed Lease Agreement Uploaded",
      body: "I have digitally signed the 12-month lease renewal via the portal. Looking forward to another year!",
      date: "Sep 5, 2026",
      isRead: true,
      isArchived: false
    },
    {
      id: "msg-5",
      sender: "Vikram Malhotra",
      senderType: "Tenant",
      propertyName: "Marina Bay Waterfront",
      unit: "MB-12",
      subject: "Guest Parking Pass Request for Weekend",
      body: "Hi team, I have family visiting this Saturday and Sunday. Can you issue a temporary 48-hour guest parking permit?",
      date: "Sep 4, 2026",
      isRead: true,
      isArchived: false
    },
    {
      id: "msg-6",
      sender: "ProPlumb Solutions",
      senderType: "Vendor",
      propertyName: "General Portfolio",
      unit: "-",
      subject: "Annual Backflow Prevention Certification Complete",
      body: "All annual municipal backflow checks for Oakridge and Sunset complexes have passed inspection successfully.",
      date: "Sep 2, 2026",
      isRead: true,
      isArchived: true
    }
  ]
};

// State Accessors
function getPropVantageState() {
  try {
    const saved = localStorage.getItem(PROPVANTAGE_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.warn('Error reading PropVantage state from localStorage', e);
  }
  // Initialize seed data
  savePropVantageState(SEED_PROPVANTAGE_DATA);
  return SEED_PROPVANTAGE_DATA;
}

function savePropVantageState(state) {
  try {
    localStorage.setItem(PROPVANTAGE_STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Error saving PropVantage state to localStorage', e);
  }
  updateSidebarBadges();
}

// Calculate Centralized Dashboard Statistics
function getDashboardStats() {
  const state = getPropVantageState();
  const totalProps = state.properties.length;
  const totalUnits = state.properties.reduce((acc, p) => acc + (p.totalUnits || 0), 0);
  const occupiedUnits = state.properties.reduce((acc, p) => acc + (p.occupiedUnits || 0), 0);
  const grossRent = state.properties.reduce((acc, p) => acc + (p.monthlyRent || 0), 0);
  
  // Expenses calculated realistically at ~25% of gross rent + active maintenance
  const operatingExpenses = Math.round(grossRent * 0.245);
  const netIncome = grossRent - operatingExpenses;
  
  const pendingPayments = state.payments.filter(p => p.status === 'Pending' || p.status === 'Overdue');
  const pendingPaymentsCount = pendingPayments.length;
  
  const activeTickets = state.maintenance.filter(m => m.status !== 'Completed');
  const activeTicketsCount = activeTickets.length;
  
  const upcomingLeases = state.renewals.filter(r => r.daysRemaining <= 60 && r.status !== 'Renewed');
  const upcomingLeasesCount = upcomingLeases.length;
  
  // Weighted Cap Rate
  const totalCapVal = state.properties.reduce((acc, p) => acc + (p.capRate * p.totalUnits), 0);
  const avgCapRate = totalUnits > 0 ? (totalCapVal / totalUnits).toFixed(2) : '6.95';

  return {
    totalProperties: totalProps,
    totalUnits: totalUnits,
    occupiedUnits: occupiedUnits,
    vacantUnits: totalUnits - occupiedUnits,
    occupancyPercent: totalUnits > 0 ? ((occupiedUnits / totalUnits) * 100).toFixed(1) : '95.1',
    grossRent: grossRent,
    netIncome: netIncome,
    operatingExpenses: operatingExpenses,
    pendingPaymentsCount: pendingPaymentsCount,
    activeTicketsCount: activeTicketsCount,
    upcomingLeasesCount: upcomingLeasesCount,
    capRate: avgCapRate
  };
}

// Update Dynamic Badges across Navigation
function updateSidebarBadges() {
  const state = getPropVantageState();
  const unreadMessages = state.messages.filter(m => !m.isRead && !m.isArchived).length;
  const activeTickets = state.maintenance.filter(m => m.status !== 'Completed').length;
  const pendingPayments = state.payments.filter(m => m.status === 'Pending' || m.status === 'Overdue').length;
  const upcomingLeases = state.renewals.filter(r => r.daysRemaining <= 60 && r.status !== 'Renewed').length;
  const totalProps = state.properties.length;

  // Update DOM badges if present
  document.querySelectorAll('.badge-prop-count').forEach(el => el.textContent = totalProps);
  document.querySelectorAll('.badge-messages-count').forEach(el => el.textContent = unreadMessages);
  document.querySelectorAll('.badge-maint-count').forEach(el => el.textContent = activeTickets);
  document.querySelectorAll('.badge-payments-count').forEach(el => el.textContent = `${pendingPayments} Pending`);
  document.querySelectorAll('.badge-renewals-count').forEach(el => el.textContent = `${upcomingLeases} Due`);
}

// Global Search Functionality across all entities
function performGlobalSearch(query) {
  if (!query || query.trim().length === 0) return [];
  const q = query.toLowerCase().trim();
  const state = getPropVantageState();
  const results = [];

  // 1. Properties
  state.properties.forEach(p => {
    if (p.name.toLowerCase().includes(q) || p.address.toLowerCase().includes(q) || p.type.toLowerCase().includes(q)) {
      results.push({
        type: 'Property',
        icon: 'bi-buildings',
        title: p.name,
        subtitle: `${p.totalUnits} Units · ${p.address}`,
        url: `properties.html?id=${p.id}`,
        raw: p
      });
    }
  });

  // 2. Rent Payments & Tenants
  state.payments.forEach(p => {
    if (p.tenantName.toLowerCase().includes(q) || p.propertyName.toLowerCase().includes(q) || p.unit.toLowerCase().includes(q)) {
      results.push({
        type: 'Payment',
        icon: 'bi-credit-card-2-front',
        title: `${p.tenantName} (${p.unit})`,
        subtitle: `$${p.amount} · ${p.status} · ${p.propertyName}`,
        url: `payments.html?search=${encodeURIComponent(p.tenantName)}`,
        raw: p
      });
    }
  });

  // 3. Maintenance Tickets
  state.maintenance.forEach(m => {
    if (m.ticketNumber.toLowerCase().includes(q) || m.issue.toLowerCase().includes(q) || m.propertyName.toLowerCase().includes(q) || m.tenantName.toLowerCase().includes(q)) {
      results.push({
        type: 'Maintenance',
        icon: 'bi-tools',
        title: `${m.ticketNumber}: ${m.issue}`,
        subtitle: `${m.priority} Priority · ${m.status} · Unit ${m.unit}`,
        url: `maintenance.html?id=${m.id}`,
        raw: m
      });
    }
  });

  // 4. Lease Records
  state.renewals.forEach(l => {
    if (l.tenantName.toLowerCase().includes(q) || l.propertyName.toLowerCase().includes(q) || l.unit.toLowerCase().includes(q)) {
      results.push({
        type: 'Lease Renewal',
        icon: 'bi-file-earmark-text',
        title: `${l.tenantName} - Expiring in ${l.daysRemaining}d`,
        subtitle: `Current: $${l.currentRent} · Proposed: $${l.proposedRent} · ${l.propertyName}`,
        url: `renewals.html?search=${encodeURIComponent(l.tenantName)}`,
        raw: l
      });
    }
  });

  // 5. Messages
  state.messages.forEach(msg => {
    if (msg.sender.toLowerCase().includes(q) || msg.subject.toLowerCase().includes(q) || msg.body.toLowerCase().includes(q)) {
      results.push({
        type: 'Message',
        icon: 'bi-chat-left-text',
        title: `${msg.sender}: ${msg.subject}`,
        subtitle: `${msg.date} · ${msg.propertyName}`,
        url: `messages.html?id=${msg.id}`,
        raw: msg
      });
    }
  });

  return results;
}

// Export Monthly Report Generation
function exportMonthlyReport() {
  const stats = getDashboardStats();
  const state = getPropVantageState();
  
  const reportDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  
  let csvContent = `PropVantage Monthly Property Management Report - ${reportDate}\n\n`;
  csvContent += `EXECUTIVE FINANCIAL SUMMARY\n`;
  csvContent += `Total Properties,${stats.totalProperties}\n`;
  csvContent += `Total Portfolio Units,${stats.totalUnits}\n`;
  csvContent += `Occupied Units,${stats.occupiedUnits} (${stats.occupancyPercent}%)\n`;
  csvContent += `Gross Monthly Rent,$${stats.grossRent.toLocaleString()}\n`;
  csvContent += `Monthly Operating Expenses,$${stats.operatingExpenses.toLocaleString()}\n`;
  csvContent += `Monthly Net Income,$${stats.netIncome.toLocaleString()}\n`;
  csvContent += `Portfolio Average Cap Rate,${stats.capRate}%\n`;
  csvContent += `Pending Payments Count,${stats.pendingPaymentsCount}\n`;
  csvContent += `Active Maintenance Tickets,${stats.activeTicketsCount}\n\n`;

  csvContent += `PROPERTY BREAKDOWN\n`;
  csvContent += `Property Name,Address,Total Units,Occupied,Monthly Rent,Cap Rate,Status\n`;
  state.properties.forEach(p => {
    csvContent += `"${p.name}","${p.address}",${p.totalUnits},${p.occupiedUnits},$${p.monthlyRent},${p.capRate}%,${p.status}\n`;
  });

  csvContent += `\nRENT PAYMENTS STATUS\n`;
  csvContent += `Tenant Name,Property,Unit,Amount,Due Date,Status,Payment Method\n`;
  state.payments.forEach(p => {
    csvContent += `"${p.tenantName}","${p.propertyName}","${p.unit}",$${p.amount},"${p.dueDate}",${p.status},"${p.method}"\n`;
  });

  csvContent += `\nACTIVE MAINTENANCE REQUESTS\n`;
  csvContent += `Ticket,Property,Unit,Issue,Tenant,Priority,Status,Technician\n`;
  state.maintenance.forEach(m => {
    csvContent += `"${m.ticketNumber}","${m.propertyName}","${m.unit}","${m.issue}","${m.tenantName}",${m.priority},${m.status},"${m.assignedTech}"\n`;
  });

  // Trigger Download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', url);
  downloadAnchor.setAttribute('download', `PropVantage_Monthly_Report_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  document.body.removeChild(downloadAnchor);

  showAdminToast('Monthly Financial Report successfully generated & downloaded!', 'success');
}

// Unobtrusive Toast Helper
function showAdminToast(message, type = 'info') {
  let container = document.getElementById('adminToastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'adminToastContainer';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `admin-toast ${type}`;
  const iconClass = type === 'success' ? 'bi-check-circle-fill text-success' : type === 'warning' ? 'bi-exclamation-triangle-fill text-warning' : 'bi-info-circle-fill text-info';
  
  toast.innerHTML = `<i class="bi ${iconClass} fs-5"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Make Available Globally
window.PropVantage = {
  getState: getPropVantageState,
  saveState: savePropVantageState,
  getStats: getDashboardStats,
  updateBadges: updateSidebarBadges,
  search: performGlobalSearch,
  exportReport: exportMonthlyReport,
  showToast: showAdminToast
};

// Initial badge update on load
document.addEventListener('DOMContentLoaded', () => {
  updateSidebarBadges();
});
