/**
 * FreshLeaf Market - Admin Dashboard Interactions & Charts (admin.js)
 */

document.addEventListener('DOMContentLoaded', () => {
  initAdminSidebar();
  initAdminCharts();
  initAdminTableFilters();
});

/* Sidebar Toggle */
function initAdminSidebar() {
  const toggleBtn = document.getElementById('adminSidebarToggle');
  const sidebar = document.querySelector('.admin-sidebar');
  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('show');
    });
  }
}

/* Charts with Chart.js */
function initAdminCharts() {
  // Sales Trend Line Chart
  const salesCanvas = document.getElementById('adminSalesChart');
  if (salesCanvas && typeof Chart !== 'undefined') {
    new Chart(salesCanvas, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'This Week (₹)',
            data: [18500, 24200, 21000, 29800, 34500, 48200, 52100],
            borderColor: '#15803d',
            backgroundColor: 'rgba(21, 128, 61, 0.1)',
            tension: 0.4,
            fill: true,
            borderWidth: 3
          },
          {
            label: 'Last Week (₹)',
            data: [15000, 19500, 18200, 22000, 28000, 39000, 42500],
            borderColor: '#94a3b8',
            borderDash: [5, 5],
            tension: 0.4,
            fill: false,
            borderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { callback: value => '₹' + value.toLocaleString() }
          }
        }
      }
    });
  }

  // Category Doughnut Chart
  const catCanvas = document.getElementById('adminCategoryChart');
  if (catCanvas && typeof Chart !== 'undefined') {
    new Chart(catCanvas, {
      type: 'doughnut',
      data: {
        labels: ['Vegetables', 'Fruits', 'Leafy Greens', 'Combos', 'Herbs'],
        datasets: [{
          data: [42, 28, 14, 11, 5],
          backgroundColor: ['#15803d', '#f59e0b', '#22c55e', '#ea580c', '#0ea5e9'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' }
        }
      }
    });
  }
}

/* Admin Table Filters & Status Changer */
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

  // Quick Status Selectors in table
  document.querySelectorAll('.order-status-select').forEach(select => {
    select.addEventListener('change', (e) => {
      const newStatus = e.target.value;
      showToast(`Order status updated to "${newStatus}"`, 'success');
    });
  });
}
