/**
 * FreshLeaf Market - Pricing & Filter Helpers (filters.js)
 */

document.addEventListener('DOMContentLoaded', () => {
  initPricingToggle();
});

function initPricingToggle() {
  const billingToggle = document.getElementById('pricingBillingToggle');
  if (!billingToggle) return;

  const starterPrice = document.getElementById('starterPrice');
  const familyPrice = document.getElementById('familyPrice');
  const organicPrice = document.getElementById('organicPrice');

  billingToggle.addEventListener('change', () => {
    const isMonthly = billingToggle.checked;
    const period = isMonthly ? '/ month' : '/ week';
    if (starterPrice) starterPrice.innerHTML = `${isMonthly ? '₹1,599' : '₹449'} <span class="billing-period-label">${period}</span>`;
    if (familyPrice) familyPrice.innerHTML = `${isMonthly ? '₹3,199' : '₹899'} <span class="billing-period-label">${period}</span>`;
    if (organicPrice) organicPrice.innerHTML = `${isMonthly ? '₹4,999' : '₹1,399'} <span class="billing-period-label">${period}</span>`;
  });
}
