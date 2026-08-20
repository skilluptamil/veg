/**
 * FreshLeaf Market - Core JavaScript (main.js)
 * Handles Global Navigation, Theme (Dark/Light), RTL, Cart Offcanvas, Wishlist, Quick View, and Toast
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRTL();
  initStickyHeader();
  initBackToTop();
  initSearchPopup();
  initCartAndWishlist();
  initDealCountdowns();
});

/* --------------------------------------------------------------------------
   1. Theme Management (Dark / Light Mode)
   -------------------------------------------------------------------------- */
function initTheme() {
  const savedTheme = localStorage.getItem('freshleaf_theme') || 'light';
  applyTheme(savedTheme);

  const themeToggles = document.querySelectorAll('.theme-toggle-btn');
  themeToggles.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const currentTheme = document.documentElement.getAttribute('data-bs-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('freshleaf_theme', newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`, 'info');
    });
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-bs-theme', theme);
  if (theme === 'dark') {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }

  // Update theme icons if present
  document.querySelectorAll('.theme-toggle-btn i').forEach(icon => {
    if (theme === 'dark') {
      icon.className = 'bi bi-sun-fill text-warning';
    } else {
      icon.className = 'bi bi-moon-stars-fill';
    }
  });

  // Switch logo if present
  const logos = document.querySelectorAll('.header-brand img, .admin-brand img');
  logos.forEach(logo => {
    if (theme === 'dark') {
      logo.src = logo.src.replace('logo.svg', 'logo-dark.svg');
    } else {
      logo.src = logo.src.replace('logo-dark.svg', 'logo.svg');
    }
  });
}

/* --------------------------------------------------------------------------
   2. RTL Management (Right-to-Left)
   -------------------------------------------------------------------------- */
function initRTL() {
  const savedDir = localStorage.getItem('freshleaf_direction') || 'ltr';
  applyDirection(savedDir);

  const rtlToggles = document.querySelectorAll('.rtl-toggle-btn');
  rtlToggles.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
      const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
      applyDirection(newDir);
      localStorage.setItem('freshleaf_direction', newDir);
      showToast(`Direction changed to ${newDir.toUpperCase()}`, 'info');
    });
  });
}

function applyDirection(dir) {
  document.documentElement.setAttribute('dir', dir);
  const rtlLink = document.getElementById('rtl-stylesheet');
  if (rtlLink) {
    rtlLink.disabled = (dir !== 'rtl');
  }
}

/* --------------------------------------------------------------------------
   3. Sticky Header
   -------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const updateStickyState = () => {
    if (window.scrollY > 20) {
      header.classList.add('is-sticky');
    } else {
      header.classList.remove('is-sticky');
    }
  };

  window.addEventListener('scroll', updateStickyState, { passive: true });
  updateStickyState();
}

/* --------------------------------------------------------------------------
   4. Back To Top
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --------------------------------------------------------------------------
   5. Search Popup
   -------------------------------------------------------------------------- */
function initSearchPopup() {
  const searchBtn = document.querySelector('.search-toggle-btn');
  const searchPopup = document.querySelector('.search-popup');
  if (!searchBtn || !searchPopup) return;

  searchBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    searchPopup.classList.toggle('show');
    const input = searchPopup.querySelector('input');
    if (input && searchPopup.classList.contains('show')) {
      input.focus();
    }
  });

  document.addEventListener('click', (e) => {
    if (!searchPopup.contains(e.target) && !searchBtn.contains(e.target)) {
      searchPopup.classList.remove('show');
    }
  });
}

/* --------------------------------------------------------------------------
   6. Shopping Cart & Wishlist State
   -------------------------------------------------------------------------- */
let cart = [
  { id: 'prod-1', name: 'Fresh Farm Tomatoes', price: 45, unit: '1 kg', qty: 2, image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=300&q=80' },
  { id: 'prod-2', name: 'Organic Baby Spinach', price: 30, unit: '1 Bunch', qty: 1, image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=300&q=80' },
  { id: 'prod-3', name: 'Sweet Alphonso Mangoes', price: 320, unit: '1 Dozen', qty: 1, image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=300&q=80' }
];

let wishlistItems = JSON.parse(localStorage.getItem('freshleaf_wishlist_items')) || [
  { id: 'prod-1', name: 'Naturally Ripened Vine Tomatoes', price: 45, oldPrice: 60, unit: '1 kg', category: 'Vegetables', origin: 'Anand Bio Farms, Nashik', inStock: true, image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=300&q=80' },
  { id: 'prod-3', name: 'Authentic Ratnagiri Alphonso', price: 650, oldPrice: 800, unit: '6 pcs', category: 'Fruits', origin: 'Heritage Orchards, Ratnagiri', inStock: true, image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=300&q=80' }
];

let wishlist = wishlistItems.map(item => item.id);

function initCartAndWishlist() {
  renderCart();
  updateWishlistBadges();
  renderWishlistPage();

  // Global Add To Cart Event Listener
  document.addEventListener('click', (e) => {
    const addBtn = e.target.closest('.btn-add-cart, .btn-add-to-cart');
    if (addBtn) {
      e.preventDefault();
      const id = addBtn.dataset.id || 'prod-' + Math.floor(Math.random() * 1000);
      const name = addBtn.dataset.name || 'Fresh Produce Item';
      const price = parseFloat(addBtn.dataset.price) || 50;
      const unit = addBtn.dataset.unit || '1 kg';
      const image = addBtn.dataset.image || 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=300&q=80';

      addToCart({ id, name, price, unit, image });
    }

    const wishBtn = e.target.closest('.btn-wishlist, .product-action-btn[data-action="wishlist"]');
    if (wishBtn) {
      e.preventDefault();
      const id = wishBtn.dataset.id || 'prod-custom';
      toggleWishlist(id, wishBtn);
    }

    const quickViewBtn = e.target.closest('.btn-quick-view, .product-action-btn[data-action="quickview"]');
    if (quickViewBtn) {
      e.preventDefault();
      openQuickView(quickViewBtn);
    }
  });
}

function addToCart(item) {
  const existing = cart.find(p => p.id === item.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }
  renderCart();
  showToast(`Added "${item.name}" to your basket! <a href="cart.html" class="text-success text-decoration-underline fw-bold ms-1">View Cart &rarr;</a>`, 'success');
}

function removeFromCart(id) {
  const item = cart.find(p => p.id === id);
  cart = cart.filter(p => p.id !== id);
  renderCart();
  if (item) {
    showToast(`Removed "${item.name}" from basket`, 'info');
  }
}

function updateCartQty(id, delta) {
  const item = cart.find(p => p.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(id);
  } else {
    renderCart();
  }
}

let appliedDiscountPercent = 0;

function clearCart() {
  if (confirm('Are you sure you want to clear all items from your basket?')) {
    cart = [];
    appliedDiscountPercent = 0;
    renderCart();
    showToast('Your basket has been cleared', 'info');
  }
}

function applyCoupon() {
  const input = document.getElementById('cartCouponInput');
  const feedback = document.getElementById('couponFeedback');
  if (!input) return;
  const code = input.value.trim().toUpperCase();

  if (code === 'FRESH10') {
    appliedDiscountPercent = 10;
    if (feedback) {
      feedback.style.display = 'block';
      feedback.className = 'small mt-1 text-success fw-semibold';
      feedback.textContent = '🎉 Coupon FRESH10 applied! 10% discount added.';
    }
    showToast('Coupon FRESH10 applied! (10% OFF)', 'success');
  } else if (code === 'ORGANIC20') {
    appliedDiscountPercent = 20;
    if (feedback) {
      feedback.style.display = 'block';
      feedback.className = 'small mt-1 text-success fw-semibold';
      feedback.textContent = '🎉 Coupon ORGANIC20 applied! 20% discount added.';
    }
    showToast('Coupon ORGANIC20 applied! (20% OFF)', 'success');
  } else {
    appliedDiscountPercent = 0;
    if (feedback) {
      feedback.style.display = 'block';
      feedback.className = 'small mt-1 text-danger fw-semibold';
      feedback.textContent = 'Invalid coupon code. Try FRESH10 or ORGANIC20';
    }
    showToast('Invalid coupon code', 'error');
  }
  renderCart();
}

function placeDirectOrder() {
  if (cart.length === 0) {
    showToast('Your basket is empty!', 'error');
    return;
  }
  showToast('Order Placed Successfully! Your farm harvest will arrive in 2 hours.', 'success');
}

function renderCart() {
  const cartList = document.getElementById('cartDrawerItems');
  const cartTableBody = document.getElementById('cartTableBody');
  const cartMainContainer = document.getElementById('cartMainContainer');
  const cartEmptyView = document.getElementById('cartEmptyView');
  const cartBadge = document.querySelectorAll('.cart-badge-count');
  const cartSubtotalEl = document.querySelectorAll('.cart-subtotal-val');
  const cartTotalAmountEl = document.querySelectorAll('.cart-total-amount');
  const freeShippingProgress = document.getElementById('freeShippingProgress');
  const freeShippingText = document.getElementById('freeShippingText');
  const cartFreeShippingBar = document.getElementById('cartFreeShippingBar');
  const cartFreeShippingText = document.getElementById('cartFreeShippingText');

  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

  cartBadge.forEach(b => b.textContent = totalItems);
  cartSubtotalEl.forEach(el => el.textContent = `₹${subtotal.toLocaleString('en-IN')}`);
  cartTotalAmountEl.forEach(el => el.textContent = `₹${subtotal.toLocaleString('en-IN')}`);

  // Free shipping progress (Threshold: ₹500)
  const threshold = 500;
  const isFreeDelivery = subtotal >= threshold;
  const deliveryCharge = (subtotal === 0 || isFreeDelivery) ? 0 : 40;
  const pct = Math.min(100, Math.round((subtotal / threshold) * 100));

  if (freeShippingProgress && freeShippingText) {
    freeShippingProgress.style.width = `${pct}%`;
    if (isFreeDelivery) {
      freeShippingText.innerHTML = `<i class="bi bi-check-circle-fill text-success"></i> You've unlocked <strong>FREE Same-Day Delivery!</strong>`;
    } else {
      const remaining = threshold - subtotal;
      freeShippingText.innerHTML = `Add <strong>₹${remaining}</strong> more for <strong>FREE Same-Day Delivery!</strong>`;
    }
  }

  if (cartFreeShippingBar && cartFreeShippingText) {
    cartFreeShippingBar.style.width = `${pct}%`;
    if (isFreeDelivery) {
      cartFreeShippingText.innerHTML = `<i class="bi bi-check-circle-fill text-success me-2 fs-5"></i> You've unlocked <strong>FREE Same-Day Delivery!</strong>`;
    } else {
      const remaining = threshold - subtotal;
      cartFreeShippingText.innerHTML = `<i class="bi bi-truck text-success me-2 fs-5"></i> Add <strong class="text-success">₹${remaining}</strong> more fresh produce to unlock <strong>FREE Same-Day Delivery!</strong>`;
    }
  }

  // Calculate discounts & Grand Total on cart.html
  const discountAmount = Math.round(subtotal * (appliedDiscountPercent / 100));
  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryCharge);

  const promoRow = document.getElementById('promoDiscountRow');
  const promoVal = document.getElementById('promoDiscountVal');
  const promoLabel = document.getElementById('promoCodeLabel');
  const deliveryChargeEl = document.getElementById('cartDeliveryCharge');
  const grandTotalEl = document.getElementById('cartGrandTotal');

  if (promoRow && promoVal) {
    if (appliedDiscountPercent > 0) {
      promoRow.style.setProperty('display', 'flex', 'important');
      promoVal.textContent = `-₹${discountAmount}`;
      if (promoLabel) promoLabel.textContent = appliedDiscountPercent === 10 ? 'FRESH10' : 'ORGANIC20';
    } else {
      promoRow.style.setProperty('display', 'none', 'important');
    }
  }

  if (deliveryChargeEl) {
    deliveryChargeEl.textContent = isFreeDelivery ? 'FREE' : `₹${deliveryCharge}`;
    if (isFreeDelivery) deliveryChargeEl.className = 'fw-bold text-success';
    else deliveryChargeEl.className = 'fw-bold';
  }

  if (grandTotalEl) {
    grandTotalEl.textContent = `₹${grandTotal.toLocaleString('en-IN')}`;
  }

  // Render Cart Page Table (cart.html)
  if (cartTableBody) {
    if (cart.length === 0) {
      if (cartMainContainer) cartMainContainer.style.display = 'none';
      if (cartEmptyView) cartEmptyView.style.display = 'block';
    } else {
      if (cartMainContainer) cartMainContainer.style.display = 'flex';
      if (cartEmptyView) cartEmptyView.style.display = 'none';

      cartTableBody.innerHTML = cart.map(item => `
        <tr>
          <td class="ps-4">
            <div class="d-flex align-items-center gap-3">
              <img src="${item.image}" alt="${item.name}" class="cart-item-img-table">
              <div>
                <h6 class="fw-bold mb-1">${item.name}</h6>
                <span class="badge bg-success-subtle text-success small rounded-pill px-2 py-0.5">Farm Direct</span>
                <span class="small text-muted ms-2">${item.unit}</span>
              </div>
            </div>
          </td>
          <td class="text-center fw-semibold">₹${item.price}</td>
          <td class="text-center">
            <div class="d-inline-flex align-items-center border rounded-pill px-2 py-1 bg-surface">
              <button class="btn btn-sm p-0 px-2 fw-bold text-secondary" onclick="updateCartQty('${item.id}', -1)">-</button>
              <span class="fw-bold px-2">${item.qty}</span>
              <button class="btn btn-sm p-0 px-2 fw-bold text-secondary" onclick="updateCartQty('${item.id}', 1)">+</button>
            </div>
          </td>
          <td class="text-end fw-bold text-success">₹${item.price * item.qty}</td>
          <td class="pe-4 text-end">
            <button class="btn btn-sm btn-outline-danger border-0 rounded-circle" onclick="removeFromCart('${item.id}')" title="Remove item">
              <i class="bi bi-trash3 fs-6"></i>
            </button>
          </td>
        </tr>
      `).join('');
    }
  }

  // Render Drawer if present
  if (cartList) {
    if (cart.length === 0) {
      cartList.innerHTML = `
        <div class="text-center py-5">
          <div class="mb-3 text-muted" style="font-size: 3rem;">
            <i class="bi bi-basket3"></i>
          </div>
          <h6 class="fw-bold">Your Produce Basket is Empty</h6>
          <p class="text-muted small">Explore our farm-fresh vegetables and fruits to fill it up.</p>
          <a href="products.html" class="btn btn-fresh btn-fresh-primary btn-fresh-sm mt-2">Start Shopping</a>
        </div>
      `;
      return;
    }

    cartList.innerHTML = cart.map(item => `
      <div class="cart-drawer-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-info">
          <h6 class="cart-item-title">${item.name}</h6>
          <div class="cart-item-price">₹${item.price} <span class="text-muted fw-normal small">/ ${item.unit}</span></div>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="updateCartQty('${item.id}', -1)">-</button>
            <input type="text" class="qty-input" value="${item.qty}" readonly>
            <button class="qty-btn" onclick="updateCartQty('${item.id}', 1)">+</button>
          </div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart('${item.id}')" title="Remove item">
          <i class="bi bi-trash3"></i>
        </button>
      </div>
    `).join('');
  }
}

function saveWishlistState() {
  localStorage.setItem('freshleaf_wishlist_items', JSON.stringify(wishlistItems));
  wishlist = wishlistItems.map(item => item.id);
  updateWishlistBadges();
  renderWishlistPage();
}

function toggleWishlist(id, btn) {
  const index = wishlistItems.findIndex(p => p.id === id);
  if (index > -1) {
    const item = wishlistItems[index];
    wishlistItems.splice(index, 1);
    if (btn) btn.classList.remove('active');
    saveWishlistState();
    showToast(`Removed "${item.name}" from wishlist`, 'info');
  } else {
    // If product details in button dataset, use them, otherwise fallback to defaults
    const name = btn ? (btn.dataset.name || 'Fresh Organic Produce') : 'Fresh Organic Produce';
    const price = btn ? (parseFloat(btn.dataset.price) || 50) : 50;
    const oldPrice = btn ? (parseFloat(btn.dataset.oldPrice) || '') : '';
    const unit = btn ? (btn.dataset.unit || '1 kg') : '1 kg';
    const image = btn ? (btn.dataset.image || 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=300&q=80') : 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=300&q=80';
    const category = btn ? (btn.dataset.category || 'Produce') : 'Produce';
    const origin = btn ? (btn.dataset.farmer || 'Certified Local Farm') : 'Certified Local Farm';

    wishlistItems.push({ id, name, price, oldPrice, unit, image, category, origin, inStock: true });
    if (btn) btn.classList.add('active');
    saveWishlistState();
    showToast(`Saved "${name}" to your wishlist! <a href="wishlist.html" class="text-success text-decoration-underline fw-bold ms-1">View Wishlist &rarr;</a>`, 'success');
  }
}

function removeFromWishlist(id) {
  const item = wishlistItems.find(p => p.id === id);
  wishlistItems = wishlistItems.filter(p => p.id !== id);
  saveWishlistState();
  if (item) {
    showToast(`Removed "${item.name}" from wishlist`, 'info');
  }
}

function moveWishlistToCart(id) {
  const item = wishlistItems.find(p => p.id === id);
  if (!item) return;
  addToCart({ id: item.id, name: item.name, price: item.price, unit: item.unit, image: item.image, category: item.category });
  removeFromWishlist(id);
}

function addAllWishlistToCart() {
  if (wishlistItems.length === 0) {
    showToast('Your wishlist is empty!', 'error');
    return;
  }
  wishlistItems.forEach(item => {
    addToCart({ id: item.id, name: item.name, price: item.price, unit: item.unit, image: item.image, category: item.category });
  });
  showToast('All wishlisted produce added to your basket!', 'success');
}

function clearWishlist() {
  if (wishlistItems.length === 0) return;
  if (confirm('Are you sure you want to clear your wishlist?')) {
    wishlistItems = [];
    saveWishlistState();
    showToast('Wishlist has been cleared', 'info');
  }
}

function renderWishlistPage() {
  const tableBody = document.getElementById('wishlistTableBody');
  const mainContainer = document.getElementById('wishlistMainContainer');
  const emptyView = document.getElementById('wishlistEmptyView');
  const actionBtns = document.getElementById('wishlistActionBtns');

  if (!tableBody) return;

  if (wishlistItems.length === 0) {
    if (mainContainer) mainContainer.style.display = 'none';
    if (emptyView) emptyView.style.display = 'block';
    if (actionBtns) actionBtns.style.display = 'none';
  } else {
    if (mainContainer) mainContainer.style.display = 'block';
    if (emptyView) emptyView.style.display = 'none';
    if (actionBtns) actionBtns.style.display = 'flex';

    tableBody.innerHTML = wishlistItems.map(item => `
      <tr>
        <td class="ps-4">
          <div class="d-flex align-items-center gap-3">
            <a href="product-details.html">
              <img src="${item.image}" alt="${item.name}" class="rounded-3 border shadow-sm" width="68" height="68" style="object-fit: cover;">
            </a>
            <div>
              <span class="badge bg-success-subtle text-success small rounded-pill px-2.5 py-1 mb-1">${item.category || 'Organic'}</span>
              <h6 class="fw-bold mb-1"><a href="product-details.html" class="text-decoration-none text-main">${item.name}</a></h6>
              <div class="small text-muted"><i class="bi bi-geo-alt-fill text-success me-1"></i>${item.origin || 'Certified Organic Farm'}</div>
            </div>
          </div>
        </td>
        <td class="text-center">
          <div class="fw-bold text-success fs-5">₹${item.price}</div>
          ${item.oldPrice ? `<div class="small text-muted text-decoration-line-through">₹${item.oldPrice}</div>` : ''}
          <div class="small text-muted">/ ${item.unit}</div>
        </td>
        <td class="text-center">
          <span class="badge bg-success text-white px-3 py-1.5 rounded-pill shadow-xs">
            <i class="bi bi-check-circle-fill me-1"></i> In Stock • Fresh
          </span>
          <div class="small text-muted mt-1">Harvested &lt; 6 hrs ago</div>
        </td>
        <td class="pe-4 text-end">
          <div class="d-inline-flex align-items-center gap-2">
            <button class="btn btn-fresh btn-fresh-primary btn-fresh-sm" onclick="moveWishlistToCart('${item.id}')">
              <i class="bi bi-basket2-fill me-1"></i> Move to Basket
            </button>
            <button class="btn btn-sm btn-outline-danger border-0 rounded-circle p-2" onclick="removeFromWishlist('${item.id}')" title="Remove from Wishlist">
              <i class="bi bi-trash3 fs-6"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  }
}

function updateWishlistBadges() {
  const wishBadges = document.querySelectorAll('.wishlist-badge-count');
  wishBadges.forEach(b => b.textContent = wishlistItems.length);
}

/* --------------------------------------------------------------------------
   7. Quick View Modal
   -------------------------------------------------------------------------- */
function openQuickView(btn) {
  const modalEl = document.getElementById('quickViewModal');
  if (!modalEl) return;

  const id = btn.dataset.id || 'prod-' + Date.now();
  const title = btn.dataset.name || 'Fresh Organic Produce';
  const price = parseFloat(btn.dataset.price) || 45;
  const oldPrice = btn.dataset.oldPrice || '';
  const unit = btn.dataset.unit || '1 kg';
  const image = btn.dataset.image || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80';
  const category = btn.dataset.category || 'Vegetables';
  const farmer = btn.dataset.farmer || 'Anand Bio Farms, Nashik';
  const rating = btn.dataset.rating || '4.9';

  const qvTitle = modalEl.querySelector('#qvTitle');
  const qvPrice = modalEl.querySelector('#qvPrice');
  const qvOldPrice = modalEl.querySelector('#qvOldPrice');
  const qvUnit = modalEl.querySelector('#qvUnit');
  const qvImage = modalEl.querySelector('#qvImage');
  const qvCategory = modalEl.querySelector('#qvCategory');
  const qvFarmer = modalEl.querySelector('#qvFarmer');
  const qvRating = modalEl.querySelector('#qvRating');
  const qvDetailsLink = modalEl.querySelector('#qvDetailsLink');

  if (qvTitle) qvTitle.textContent = title;
  if (qvPrice) qvPrice.textContent = `₹${price}`;
  if (qvOldPrice) qvOldPrice.textContent = oldPrice ? `₹${oldPrice}` : '';
  if (qvUnit) qvUnit.textContent = `/ ${unit}`;
  if (qvImage) {
    qvImage.src = image;
    qvImage.alt = title;
  }
  if (qvCategory) qvCategory.textContent = category;
  if (qvFarmer) qvFarmer.textContent = farmer;
  if (qvRating) qvRating.textContent = rating;
  if (qvDetailsLink) qvDetailsLink.href = `product-details.html?id=${id}`;

  const addBtn = modalEl.querySelector('#qvAddToCartBtn');
  if (addBtn) {
    addBtn.onclick = function() {
      addToCart({
        id: id,
        name: title,
        price: price,
        unit: unit,
        image: image,
        category: category
      });
      const bsModal = bootstrap.Modal.getInstance(modalEl);
      if (bsModal) {
        bsModal.hide();
      }
    };
  }

  const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
  modal.show();
}

/* --------------------------------------------------------------------------
   8. Countdown Timers
   -------------------------------------------------------------------------- */
function initDealCountdowns() {
  const countdownEls = document.querySelectorAll('.countdown-box, .countdown-wrap');
  if (countdownEls.length === 0) return;

  // Target: 7 days from now
  const now = new Date();
  const target = new Date(now.getTime() + (7 * 24 * 60 * 60 * 1000) + (14 * 60 * 60 * 1000));

  function update() {
    const current = new Date();
    const diff = target - current;

    if (diff <= 0) return;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    countdownEls.forEach(box => {
      const d = box.querySelector('.count-days');
      const h = box.querySelector('.count-hours');
      const m = box.querySelector('.count-minutes');
      const s = box.querySelector('.count-seconds');
      if (d) d.textContent = String(days).padStart(2, '0');
      if (h) h.textContent = String(hours).padStart(2, '0');
      if (m) m.textContent = String(minutes).padStart(2, '0');
      if (s) s.textContent = String(seconds).padStart(2, '0');
    });
  }

  update();
  setInterval(update, 1000);
}

/* --------------------------------------------------------------------------
   9. Global Toast Notification Helper
   -------------------------------------------------------------------------- */
function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container-custom');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container-custom';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `fresh-toast ${type === 'error' ? 'toast-error' : ''}`;
  
  let iconClass = 'bi-check-circle-fill text-success';
  if (type === 'error') iconClass = 'bi-exclamation-octagon-fill text-danger';
  if (type === 'info') iconClass = 'bi-info-circle-fill text-primary';

  toast.innerHTML = `
    <i class="bi ${iconClass} toast-icon"></i>
    <div class="toast-content flex-grow-1">
      <div class="small fw-semibold">${message}</div>
    </div>
    <button type="button" class="btn-close btn-close-sm" style="font-size: 0.65rem;" onclick="this.parentElement.remove()"></button>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

/* --------------------------------------------------------------------------
   9. Payment Methods Info Modal
   -------------------------------------------------------------------------- */
function showPaymentModal(method) {
  let modalEl = document.getElementById('paymentInfoModal');
  if (!modalEl) {
    const modalHtml = `
      <div class="modal fade" id="paymentInfoModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content rounded-4 border-0 shadow-lg bg-card">
            <div class="modal-header border-bottom pb-3">
              <h5 class="modal-title fw-bold text-main d-flex align-items-center gap-2" id="paymentModalTitle">
                <i class="bi bi-shield-check text-success fs-4"></i> Secure Payment Method
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body p-4" id="paymentModalBody">
              <!-- Content injected dynamically -->
            </div>
            <div class="modal-footer border-top pt-3 bg-surface rounded-bottom-4 d-flex justify-content-between align-items-center">
              <span class="small text-muted"><i class="bi bi-lock-fill text-success me-1"></i> 256-Bit SSL Encrypted & Verified</span>
              <button type="button" class="btn btn-fresh btn-fresh-primary btn-fresh-sm px-4" data-bs-dismiss="modal">Understood</button>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    modalEl = document.getElementById('paymentInfoModal');
  }

  const titleEl = document.getElementById('paymentModalTitle');
  const bodyEl = document.getElementById('paymentModalBody');

  const paymentData = {
    visa: {
      title: '<i class="fab fa-cc-visa text-primary fs-3 me-2"></i> Visa Card Payments',
      desc: 'We accept all <strong>Visa Credit, Debit & Prepaid cards</strong> issued in India and internationally.',
      points: [
        'Instant OTP authentication via RBI 3D-Secure 2.0',
        '0% extra surcharge or hidden transaction fees',
        'Eligible for instant 10% seasonal harvest discounts and card offers',
        'Protected by 256-bit bank-grade tokenization'
      ]
    },
    mastercard: {
      title: '<i class="fab fa-cc-mastercard text-danger fs-3 me-2"></i> Mastercard Payments',
      desc: 'Seamless payments via all <strong>Mastercard Credit & Debit cards</strong> with zero processing fees.',
      points: [
        'Secure Mastercard Identity Check verification',
        'One-click saved card checkout for returning subscribers',
        'Zero liability protection against fraudulent transactions',
        'Instant automated refund processing within 24 hours on cancellations'
      ]
    },
    upi: {
      title: '<i class="bi bi-qr-code-scan text-success fs-3 me-2"></i> UPI & Dynamic QR Code',
      desc: 'Pay instantly from your smartphone using <strong>Google Pay, PhonePe, Paytm, BHIM, or any banking UPI app</strong>.',
      points: [
        'Scan dynamic QR codes generated at checkout or on delivery',
        'Direct UPI ID intent approval on your mobile phone',
        'Zero waiting time and instantaneous payment confirmation',
        'Supports weekly harvest subscriptions via UPI AutoPay'
      ]
    },
    cod: {
      title: '<i class="bi bi-cash-stack text-success fs-3 me-2"></i> Cash on Delivery (COD)',
      desc: 'Inspect your crisp vegetables and orchard fruits first, then pay comfortably at your doorstep.',
      points: [
        'No advance payment required before morning harvest delivery',
        'Pay with cash or scan delivery partner\'s contactless QR code',
        'Exact change supported by our cold-chain delivery fleet',
        'Available on all orders across all active delivery zones'
      ]
    }
  };

  const selected = paymentData[method] || paymentData['visa'];
  titleEl.innerHTML = selected.title;
  bodyEl.innerHTML = `
    <p class="text-main mb-3">${selected.desc}</p>
    <div class="p-3 bg-surface rounded-3 border mb-3">
      <h6 class="fw-bold text-success mb-2 small text-uppercase"><i class="bi bi-patch-check-fill me-1"></i> Key Features:</h6>
      <ul class="list-unstyled mb-0 small">
        ${selected.points.map(p => `<li class="mb-1.5 d-flex align-items-start gap-2"><i class="bi bi-check2-circle text-success mt-0.5"></i> <span>${p}</span></li>`).join('')}
      </ul>
    </div>
    <div class="alert alert-success d-flex align-items-center gap-2 py-2 px-3 mb-0 small rounded-3">
      <i class="bi bi-shield-lock-fill fs-5 text-success"></i>
      <div>All transactions on FreshLeaf are 100% verified and protected by certified secure banking gateways.</div>
    </div>
  `;

  const bsModal = new bootstrap.Modal(modalEl);
  bsModal.show();
}

/* --------------------------------------------------------------------------
   8. Global Password Visibility Toggle
   -------------------------------------------------------------------------- */
function togglePasswordVisibility(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const isPass = input.type === 'password';
  input.type = isPass ? 'text' : 'password';
  const icon = btn.querySelector('i');
  if (icon) {
    icon.className = isPass ? 'bi bi-eye-slash' : 'bi bi-eye';
  }
}

