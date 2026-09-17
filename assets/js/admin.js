/**
 * PropVantage Property Management - Admin Dashboard UI Interactivity (admin.js)
 */

document.addEventListener('DOMContentLoaded', () => {
  initAdminThemeAndRTL();
  initAdminSidebar();
  initAdminGlobalSearch();
  initAdminExportButton();
  initDashboardKPIs();
  initAdminCharts();
  initAdminTableFilters();
  initModalActions();
});

/* Theme & RTL Management */
function initAdminThemeAndRTL() {
  // Theme Setup
  const savedTheme = localStorage.getItem('propvantage_theme') || localStorage.getItem('theme') || 'light';
  applyAdminTheme(savedTheme, false);

  document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-bs-theme') || 'light';
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      applyAdminTheme(nextTheme, true);
    });
  });

  // RTL Setup
  const savedDir = localStorage.getItem('propvantage_dir') || localStorage.getItem('dir') || 'ltr';
  applyAdminDirection(savedDir);

  document.querySelectorAll('.rtl-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
      const nextDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
      applyAdminDirection(nextDir);
    });
  });
}

function applyAdminTheme(theme, save = false) {
  document.documentElement.setAttribute('data-bs-theme', theme);
  if (theme === 'dark') {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
  if (save) {
    localStorage.setItem('propvantage_theme', theme);
    localStorage.setItem('theme', theme);
  }
  // Re-render charts with updated theme colors if present
  if (window.adminRevenueChart || window.adminOccupancyChart) {
    updateChartsTheme(theme);
  }
}

function applyAdminDirection(dir) {
  document.documentElement.setAttribute('dir', dir);
  localStorage.setItem('propvantage_dir', dir);
  localStorage.setItem('dir', dir);

  const rtlSheet = document.getElementById('rtl-stylesheet');
  if (rtlSheet) {
    rtlSheet.disabled = (dir !== 'rtl');
  }

  // Update RTL toggle button text
  document.querySelectorAll('.rtl-toggle-btn').forEach(btn => {
    if (dir === 'rtl') {
      btn.innerHTML = `<span class="small fw-bold">LTR</span>`;
      btn.setAttribute('title', 'Switch to LTR (Left to Right)');
      btn.setAttribute('aria-label', 'Switch to LTR');
    } else {
      btn.innerHTML = `<span class="small fw-bold">RTL</span>`;
      btn.setAttribute('title', 'Switch to RTL (Right to Left)');
      btn.setAttribute('aria-label', 'Switch to RTL');
    }
  });
}

/* Sidebar Toggle for Mobile */
function initAdminSidebar() {
  const toggleBtn = document.getElementById('adminSidebarToggle');
  const sidebar = document.querySelector('.admin-sidebar');
  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('show');
    });

    // Close on outside click on mobile
    document.addEventListener('click', (e) => {
      if (window.innerWidth < 992 && sidebar.classList.contains('show')) {
        if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
          sidebar.classList.remove('show');
        }
      }
    });
  }
}

/* Global Dynamic Search in Header */
function initAdminGlobalSearch() {
  const searchInput = document.getElementById('adminGlobalSearchInput');
  const searchWrap = document.querySelector('.admin-search-wrap');
  if (!searchInput || !searchWrap) return;

  let dropdown = document.getElementById('adminSearchDropdown');
  if (!dropdown) {
    dropdown = document.createElement('div');
    dropdown.id = 'adminSearchDropdown';
    dropdown.className = 'admin-search-dropdown';
    searchWrap.appendChild(dropdown);
  }

  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.trim();
    if (q.length === 0) {
      dropdown.style.display = 'none';
      return;
    }

    if (window.PropVantage && window.PropVantage.search) {
      const results = window.PropVantage.search(q);
      if (results.length === 0) {
        dropdown.innerHTML = `<div class="p-3 text-center text-muted small"><i class="bi bi-search me-1"></i> No matching records found for "${q}"</div>`;
      } else {
        dropdown.innerHTML = results.slice(0, 8).map(res => `
          <a href="${res.url}" class="admin-search-result-item">
            <div class="rounded-circle bg-light d-flex align-items-center justify-content-center p-2 text-success">
              <i class="bi ${res.icon}"></i>
            </div>
            <div class="flex-grow-1 overflow-hidden">
              <div class="d-flex align-items-center justify-content-between">
                <strong class="small text-truncate text-main">${res.title}</strong>
                <span class="badge bg-secondary-subtle text-secondary small">${res.type}</span>
              </div>
              <div class="small text-muted text-truncate">${res.subtitle}</div>
            </div>
          </a>
        `).join('');
      }
      dropdown.style.display = 'block';
    }
  });

  // Hide on click outside
  document.addEventListener('click', (e) => {
    if (!searchWrap.contains(e.target)) {
      dropdown.style.display = 'none';
    }
  });
}

/* Export Monthly Report Button Handler */
function initAdminExportButton() {
  document.querySelectorAll('.btn-export-monthly-report').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (window.PropVantage && window.PropVantage.exportReport) {
        window.PropVantage.exportReport();
      }
    });
  });
}

/* Populate Dashboard KPI Values */
function initDashboardKPIs() {
  if (!window.PropVantage || !window.PropVantage.getStats) return;
  const stats = window.PropVantage.getStats();

  const totalPropEl = document.getElementById('statTotalProperties');
  if (totalPropEl) totalPropEl.textContent = stats.totalProperties;

  const occupiedUnitsEl = document.getElementById('statOccupiedUnits');
  if (occupiedUnitsEl) occupiedUnitsEl.textContent = `${stats.occupiedUnits} / ${stats.totalUnits}`;

  const grossRentEl = document.getElementById('statGrossRent');
  if (grossRentEl) grossRentEl.textContent = `$${stats.grossRent.toLocaleString()}`;

  const netIncomeEl = document.getElementById('statNetIncome');
  if (netIncomeEl) netIncomeEl.textContent = `$${stats.netIncome.toLocaleString()}`;

  const pendingPaymentsEl = document.getElementById('statPendingPayments');
  if (pendingPaymentsEl) pendingPaymentsEl.textContent = stats.pendingPaymentsCount;

  const maintenanceTicketsEl = document.getElementById('statMaintenanceTickets');
  if (maintenanceTicketsEl) maintenanceTicketsEl.textContent = stats.activeTicketsCount;

  const upcomingLeasesEl = document.getElementById('statUpcomingLeases');
  if (upcomingLeasesEl) upcomingLeasesEl.textContent = stats.upcomingLeasesCount;

  const capRateEl = document.getElementById('statCapRate');
  if (capRateEl) capRateEl.textContent = `${stats.capRate}%`;
}

/* Charts with Chart.js */
function initAdminCharts() {
  const revenueCanvas = document.getElementById('adminRevenueChart');
  const isDark = document.documentElement.getAttribute('data-bs-theme') === 'dark';
  const textColor = isDark ? '#94a3b8' : '#64748b';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)';

  if (revenueCanvas && typeof Chart !== 'undefined') {
    window.adminRevenueChart = new Chart(revenueCanvas, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        datasets: [
          {
            label: 'Gross Rental Income ($)',
            data: [480000, 492000, 505000, 510000, 518000, 520000, 522000, 523000, 523000],
            borderColor: '#15803d',
            backgroundColor: 'rgba(21, 128, 61, 0.08)',
            tension: 0.35,
            fill: true,
            borderWidth: 3
          },
          {
            label: 'Net Operating Income ($)',
            data: [365000, 372000, 381000, 386000, 390000, 391500, 393000, 394000, 394500],
            borderColor: '#0284c7',
            backgroundColor: 'transparent',
            tension: 0.35,
            fill: false,
            borderWidth: 2,
            borderDash: [4, 4]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: { color: textColor, font: { family: 'Inter', size: 12 } }
          }
        },
        scales: {
          x: {
            grid: { color: gridColor },
            ticks: { color: textColor, font: { family: 'Inter' } }
          },
          y: {
            beginAtZero: false,
            grid: { color: gridColor },
            ticks: {
              color: textColor,
              font: { family: 'Inter' },
              callback: value => '$' + (value / 1000) + 'k'
            }
          }
        }
      }
    });
  }

  // Occupancy / Portfolio Category Doughnut Chart
  const occCanvas = document.getElementById('adminOccupancyChart');
  if (occCanvas && typeof Chart !== 'undefined') {
    window.adminOccupancyChart = new Chart(occCanvas, {
      type: 'doughnut',
      data: {
        labels: ['Occupied (95.1%)', 'Pending Move-in (2.4%)', 'Vacant/Turn (2.5%)'],
        datasets: [{
          data: [269, 7, 8],
          backgroundColor: ['#15803d', '#0284c7', '#f59e0b'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: textColor, font: { family: 'Inter', size: 11 } }
          }
        },
        cutout: '72%'
      }
    });
  }
}

function updateChartsTheme(theme) {
  const isDark = theme === 'dark';
  const textColor = isDark ? '#94a3b8' : '#64748b';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)';

  if (window.adminRevenueChart) {
    window.adminRevenueChart.options.plugins.legend.labels.color = textColor;
    window.adminRevenueChart.options.scales.x.grid.color = gridColor;
    window.adminRevenueChart.options.scales.x.ticks.color = textColor;
    window.adminRevenueChart.options.scales.y.grid.color = gridColor;
    window.adminRevenueChart.options.scales.y.ticks.color = textColor;
    window.adminRevenueChart.update();
  }

  if (window.adminOccupancyChart) {
    window.adminOccupancyChart.options.plugins.legend.labels.color = textColor;
    window.adminOccupancyChart.update();
  }
}

/* Quick Search Filters across Table Rows */
function initAdminTableFilters() {
  const searchInput = document.getElementById('adminTableSearch');
  const tableRows = document.querySelectorAll('.admin-table tbody tr');

  if (searchInput && tableRows.length > 0) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      tableRows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(q) ? '' : 'none';
      });
    });
  }

  // Quick Status Selectors in table rows
  document.querySelectorAll('.table-status-select').forEach(select => {
    select.addEventListener('change', (e) => {
      const newStatus = e.target.value;
      if (window.PropVantage && window.PropVantage.showToast) {
        window.PropVantage.showToast(`Status updated to "${newStatus}"`, 'success');
      }
    });
  });
}

/* Modal Helper Actions */
function initModalActions() {
  // Add Property Form Submission
  const addPropForm = document.getElementById('addPropertyForm');
  if (addPropForm) {
    addPropForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('propNameInput').value;
      const address = document.getElementById('propAddressInput').value;
      const units = parseInt(document.getElementById('propUnitsInput').value) || 10;
      const rent = parseInt(document.getElementById('propRentInput').value) || 20000;
      
      const state = window.PropVantage.getState();
      const newProp = {
        id: `prop-${Date.now()}`,
        name: name,
        address: address,
        totalUnits: units,
        occupiedUnits: Math.round(units * 0.95),
        vacantUnits: Math.round(units * 0.05),
        monthlyRent: rent,
        occupancyRate: 95.0,
        status: "Active",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80",
        capRate: 6.8,
        type: "Residential",
        yearBuilt: 2024
      };

      state.properties.unshift(newProp);
      window.PropVantage.saveState(state);
      window.PropVantage.showToast(`Property "${name}" added successfully!`, 'success');

      // Close modal
      const modalEl = document.getElementById('addPropertyModal');
      if (modalEl && typeof bootstrap !== 'undefined') {
        const modal = bootstrap.Modal.getInstance(modalEl);
        if (modal) modal.hide();
      }
      setTimeout(() => location.reload(), 600);
    });
  }

  // Add Maintenance Request Form Submission
  const addMaintForm = document.getElementById('addMaintenanceForm');
  if (addMaintForm) {
    addMaintForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const property = document.getElementById('maintPropertyInput').value;
      const unit = document.getElementById('maintUnitInput').value;
      const tenant = document.getElementById('maintTenantInput').value;
      const issue = document.getElementById('maintIssueInput').value;
      const priority = document.getElementById('maintPriorityInput').value;

      const state = window.PropVantage.getState();
      const newMaint = {
        id: `maint-${Date.now()}`,
        ticketNumber: `#TCK-${Math.floor(1000 + Math.random() * 9000)}`,
        propertyName: property,
        unit: unit,
        issue: issue,
        tenantName: tenant,
        priority: priority,
        status: "New",
        assignedTech: "Pending Assignment",
        createdAt: new Date().toISOString().slice(0, 10),
        updatedAt: new Date().toISOString().slice(0, 10),
        description: issue,
        cost: "Pending"
      };

      state.maintenance.unshift(newMaint);
      window.PropVantage.saveState(state);
      window.PropVantage.showToast(`Ticket ${newMaint.ticketNumber} created successfully!`, 'success');

      const modalEl = document.getElementById('addMaintenanceModal');
      if (modalEl && typeof bootstrap !== 'undefined') {
        const modal = bootstrap.Modal.getInstance(modalEl);
        if (modal) modal.hide();
      }
      setTimeout(() => location.reload(), 600);
    });
  }
}

// Global Detail Modal Opener
window.openEntityDetailModal = function(type, id) {
  const state = window.PropVantage.getState();
  const modalEl = document.getElementById('entityDetailModal');
  const modalBody = document.getElementById('entityDetailModalBody');
  const modalTitle = document.getElementById('entityDetailModalTitle');
  if (!modalEl || !modalBody) return;

  if (type === 'property') {
    const p = state.properties.find(item => item.id === id) || state.properties[0];
    modalTitle.innerHTML = `<i class="bi bi-buildings text-success me-2"></i> ${p.name}`;
    modalBody.innerHTML = `
      <div class="row g-3">
        <div class="col-md-6">
          <img src="${p.image}" class="rounded-3 w-100 mb-2" style="height: 200px; object-fit: cover;">
          <h6 class="fw-bold mb-1">${p.name}</h6>
          <p class="small text-muted mb-2"><i class="bi bi-geo-alt-fill text-danger me-1"></i> ${p.address}</p>
          <span class="badge bg-success-subtle text-success">${p.type}</span>
          <span class="badge bg-secondary-subtle text-secondary ms-1">Built in ${p.yearBuilt}</span>
        </div>
        <div class="col-md-6">
          <div class="p-3 bg-light rounded-3 mb-2">
            <div class="d-flex justify-content-between mb-1">
              <span class="small text-muted">Total Units:</span>
              <strong class="small">${p.totalUnits}</strong>
            </div>
            <div class="d-flex justify-content-between mb-1">
              <span class="small text-muted">Occupancy Rate:</span>
              <strong class="small text-success">${p.occupancyRate}% (${p.occupiedUnits} Occupied)</strong>
            </div>
            <div class="d-flex justify-content-between mb-1">
              <span class="small text-muted">Vacant Units:</span>
              <strong class="small text-warning">${p.vacantUnits} Available</strong>
            </div>
            <div class="d-flex justify-content-between mb-1">
              <span class="small text-muted">Monthly Revenue:</span>
              <strong class="small text-success">$${p.monthlyRent.toLocaleString()}</strong>
            </div>
            <div class="d-flex justify-content-between">
              <span class="small text-muted">Cap Rate:</span>
              <strong class="small text-primary">${p.capRate}%</strong>
            </div>
          </div>
          <div class="d-flex gap-2 mt-3">
            <button class="btn btn-sm btn-primary w-100" onclick="PropVantage.showToast('Generating Property P&L statement...', 'info')"><i class="bi bi-file-earmark-pdf me-1"></i> Financial Statement</button>
            <button class="btn btn-sm btn-outline-secondary w-100" onclick="PropVantage.showToast('Opening Tenant Roster for ${p.name}', 'info')"><i class="bi bi-people me-1"></i> View Roster</button>
          </div>
        </div>
      </div>
    `;
  } else if (type === 'payment') {
    const pay = state.payments.find(item => item.id === id) || state.payments[0];
    modalTitle.innerHTML = `<i class="bi bi-credit-card-2-front text-success me-2"></i> Payment Receipt - ${pay.tenantName}`;
    modalBody.innerHTML = `
      <div class="p-3 bg-light rounded-3 mb-3">
        <div class="d-flex justify-content-between mb-2">
          <span class="text-muted">Tenant:</span>
          <strong>${pay.tenantName}</strong>
        </div>
        <div class="d-flex justify-content-between mb-2">
          <span class="text-muted">Property & Unit:</span>
          <strong>${pay.propertyName} · Unit ${pay.unit}</strong>
        </div>
        <div class="d-flex justify-content-between mb-2">
          <span class="text-muted">Amount Due:</span>
          <strong class="fs-5 text-success">$${pay.amount.toLocaleString()}</strong>
        </div>
        <div class="d-flex justify-content-between mb-2">
          <span class="text-muted">Due Date:</span>
          <span>${pay.dueDate}</span>
        </div>
        <div class="d-flex justify-content-between mb-2">
          <span class="text-muted">Status:</span>
          <span class="badge ${pay.status === 'Paid' ? 'bg-success' : pay.status === 'Pending' ? 'bg-warning text-dark' : 'bg-danger'}">${pay.status}</span>
        </div>
        <div class="d-flex justify-content-between">
          <span class="text-muted">Payment Method:</span>
          <span>${pay.method}</span>
        </div>
      </div>
      <div class="d-flex gap-2">
        <button class="btn btn-sm btn-success w-100" onclick="PropVantage.showToast('Receipt #REC-${pay.id} downloaded', 'success')"><i class="bi bi-download me-1"></i> Download PDF Receipt</button>
        <button class="btn btn-sm btn-outline-primary w-100" onclick="PropVantage.showToast('Reminder notification sent to ${pay.tenantName}', 'info')"><i class="bi bi-bell me-1"></i> Send Reminder</button>
      </div>
    `;
  } else if (type === 'maintenance') {
    const maint = state.maintenance.find(item => item.id === id) || state.maintenance[0];
    modalTitle.innerHTML = `<i class="bi bi-tools text-warning me-2"></i> Ticket ${maint.ticketNumber}`;
    modalBody.innerHTML = `
      <div class="p-3 bg-light rounded-3 mb-3">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <span class="badge ${maint.priority === 'Urgent' ? 'bg-danger' : maint.priority === 'High' ? 'bg-warning text-dark' : 'bg-info'}">${maint.priority} Priority</span>
          <span class="badge bg-primary">${maint.status}</span>
        </div>
        <h6 class="fw-bold mb-2">${maint.issue}</h6>
        <p class="small text-muted mb-3">${maint.description}</p>
        <div class="small border-top pt-2">
          <div><strong class="text-muted">Property:</strong> ${maint.propertyName} (Unit ${maint.unit})</div>
          <div><strong class="text-muted">Tenant:</strong> ${maint.tenantName}</div>
          <div><strong class="text-muted">Assigned Tech:</strong> ${maint.assignedTech}</div>
          <div><strong class="text-muted">Estimated Cost:</strong> ${maint.cost}</div>
          <div><strong class="text-muted">Created:</strong> ${maint.createdAt} · <strong class="text-muted">Updated:</strong> ${maint.updatedAt}</div>
        </div>
      </div>
      <div class="d-flex gap-2">
        <button class="btn btn-sm btn-success w-100" onclick="PropVantage.showToast('Technician dispatched to Unit ${maint.unit}', 'success')"><i class="bi bi-truck me-1"></i> Dispatch Tech</button>
        <button class="btn btn-sm btn-outline-secondary w-100" onclick="PropVantage.showToast('Status changed to Completed', 'info')"><i class="bi bi-check2-circle me-1"></i> Mark Complete</button>
      </div>
    `;
  } else if (type === 'lease') {
    const l = state.renewals.find(item => item.id === id) || state.renewals[0];
    modalTitle.innerHTML = `<i class="bi bi-file-earmark-text text-primary me-2"></i> Lease Renewal - ${l.tenantName}`;
    modalBody.innerHTML = `
      <div class="p-3 bg-light rounded-3 mb-3">
        <div class="d-flex justify-content-between mb-2">
          <span class="text-muted">Tenant:</span>
          <strong>${l.tenantName}</strong>
        </div>
        <div class="d-flex justify-content-between mb-2">
          <span class="text-muted">Property:</span>
          <strong>${l.propertyName} · Unit ${l.unit}</strong>
        </div>
        <div class="d-flex justify-content-between mb-2">
          <span class="text-muted">Current Rent:</span>
          <strong>$${l.currentRent}/mo</strong>
        </div>
        <div class="d-flex justify-content-between mb-2">
          <span class="text-muted">Proposed Rent:</span>
          <strong class="text-success">$${l.proposedRent}/mo</strong>
        </div>
        <div class="d-flex justify-content-between mb-2">
          <span class="text-muted">Lease Expiry:</span>
          <span class="text-danger fw-bold">${l.expiryDate} (${l.daysRemaining} days left)</span>
        </div>
        <div class="d-flex justify-content-between">
          <span class="text-muted">Status:</span>
          <span class="badge bg-info">${l.status}</span>
        </div>
      </div>
      <div class="d-flex gap-2">
        <button class="btn btn-sm btn-primary w-100" onclick="PropVantage.showToast('Official Renewal Offer emailed to ${l.tenantName}', 'success')"><i class="bi bi-send me-1"></i> Send Renewal Offer</button>
      </div>
    `;
  }

  if (typeof bootstrap !== 'undefined') {
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }
};
