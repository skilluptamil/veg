/**
 * FreshLeaf Market - Frontend Form Validations (validation.js)
 */

document.addEventListener('DOMContentLoaded', () => {
  initContactFormValidation();
  initAuthFormValidation();
  initDeliveryZipChecker();
  initNewsletterValidation();
});

/* Contact Form Validation */
function initContactFormValidation() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    const name = contactForm.querySelector('#contactName');
    const email = contactForm.querySelector('#contactEmail');
    const phone = contactForm.querySelector('#contactPhone');
    const subject = contactForm.querySelector('#contactSubject');
    const message = contactForm.querySelector('#contactMessage');

    // Reset errors
    contactForm.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));

    if (!name.value.trim()) {
      name.classList.add('is-invalid');
      isValid = false;
    }

    if (!validateEmail(email.value.trim())) {
      email.classList.add('is-invalid');
      isValid = false;
    }

    if (!phone.value.trim() || phone.value.trim().length < 8) {
      phone.classList.add('is-invalid');
      isValid = false;
    }

    if (!subject.value.trim()) {
      subject.classList.add('is-invalid');
      isValid = false;
    }

    if (!message.value.trim() || message.value.trim().length < 10) {
      message.classList.add('is-invalid');
      isValid = false;
    }

    if (isValid) {
      showToast('Thank you! Your message has been sent to our farm market team.', 'success');
      contactForm.reset();
    } else {
      showToast('Please correct the highlighted fields.', 'error');
    }
  });
}

/* Login & Register Validation */
function initAuthFormValidation() {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = loginForm.querySelector('#loginEmail');
      const password = loginForm.querySelector('#loginPassword');
      let isValid = true;

      loginForm.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));

      if (!validateEmail(email.value.trim())) {
        email.classList.add('is-invalid');
        isValid = false;
      }

      if (!password.value.trim() || password.value.length < 6) {
        password.classList.add('is-invalid');
        isValid = false;
      }

      if (isValid) {
        showToast('Login successful! Redirecting...', 'success');
        setTimeout(() => { window.location.href = 'index.html'; }, 1000);
      } else {
        showToast('Please provide valid credentials.', 'error');
      }
    });
  }

  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = registerForm.querySelector('#regName');
      const email = registerForm.querySelector('#regEmail');
      const phone = registerForm.querySelector('#regPhone');
      const password = registerForm.querySelector('#regPassword');
      const confirmPassword = registerForm.querySelector('#regConfirmPassword');
      const terms = registerForm.querySelector('#regTerms');
      let isValid = true;

      registerForm.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));

      if (!name.value.trim()) {
        name.classList.add('is-invalid');
        isValid = false;
      }

      if (!validateEmail(email.value.trim())) {
        email.classList.add('is-invalid');
        isValid = false;
      }

      if (!phone.value.trim()) {
        phone.classList.add('is-invalid');
        isValid = false;
      }

      if (!password.value || password.value.length < 6) {
        password.classList.add('is-invalid');
        isValid = false;
      }

      if (password.value !== confirmPassword.value) {
        confirmPassword.classList.add('is-invalid');
        isValid = false;
      }

      if (terms && !terms.checked) {
        terms.classList.add('is-invalid');
        isValid = false;
      }

      if (isValid) {
        showToast('Account created successfully! Welcome to FreshLeaf Market.', 'success');
        setTimeout(() => { window.location.href = 'login.html'; }, 1200);
      } else {
        showToast('Please check the form for errors.', 'error');
      }
    });
  }
}

/* Delivery Zipcode Checker */
function initDeliveryZipChecker() {
  const form = document.getElementById('deliveryZipForm');
  const resultBox = document.getElementById('zipCheckResult');
  if (!form || !resultBox) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const zipInput = form.querySelector('#zipCodeInput');
    const zip = zipInput.value.trim();

    if (!zip || zip.length < 4) {
      zipInput.classList.add('is-invalid');
      showToast('Please enter a valid Postal / PIN code', 'error');
      return;
    }

    zipInput.classList.remove('is-invalid');

    resultBox.style.display = 'block';
    
    // Zone 1: Urban Core
    if (['411045', '411038', '411001', '411004', '411007', '411016', '411052', '411030', '411005'].includes(zip) || zip.startsWith('41100') || zip.startsWith('41104')) {
      resultBox.className = 'p-4 rounded-4 border border-success-subtle bg-success-subtle mt-4 text-start';
      resultBox.innerHTML = `
        <div class="d-flex align-items-start gap-3">
          <div class="p-3 bg-success text-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style="width: 48px; height: 48px;">
            <i class="bi bi-lightning-charge-fill fs-5"></i>
          </div>
          <div class="flex-grow-1">
            <div class="d-flex align-items-center gap-2 flex-wrap mb-1">
              <h5 class="fw-bold text-success-emphasis mb-0">PIN ${zip}: Zone 1 (Urban Core) Active</h5>
              <span class="badge bg-success text-white rounded-pill px-2.5 py-1 small">⚡ 2-Hour Express</span>
            </div>
            <p class="text-muted small mb-2">Excellent! Your area is within 15km of our Central Hub. Both lightning 2-hour express and 6:00 AM morning harvest slots are open.</p>
            <div class="row g-2 mb-3 small">
              <div class="col-sm-6"><i class="bi bi-check2-circle text-success me-1"></i> <strong>Next Slot:</strong> Today 6:00 AM – 8:00 AM</div>
              <div class="col-sm-6"><i class="bi bi-bag-check text-success me-1"></i> <strong>Free Delivery:</strong> Orders ₹400+ (else ₹35)</div>
            </div>
            <div class="d-flex gap-2 flex-wrap">
              <button type="button" class="btn btn-fresh btn-fresh-primary btn-fresh-sm" onclick="selectZoneAndShop('zone-1')">
                <i class="bi bi-cart-plus me-1"></i> Shop Express Produce
              </button>
              <button type="button" class="btn btn-fresh btn-fresh-outline btn-fresh-sm" onclick="openDeliveryFeatureModal('live-gps')">
                <i class="bi bi-geo-alt-fill me-1"></i> View Live GPS Fleet
              </button>
            </div>
          </div>
        </div>
      `;
      showToast(`Zone 1 Express Delivery available for ${zip}!`, 'success');
    } 
    // Zone 2: Suburban Belt
    else if (['411057', '411014', '411028', '411033', '411027', '411061', '411048', '411018'].includes(zip) || zip.startsWith('4110') || zip.startsWith('411')) {
      resultBox.className = 'p-4 rounded-4 border border-primary-subtle bg-primary-subtle mt-4 text-start';
      resultBox.innerHTML = `
        <div class="d-flex align-items-start gap-3">
          <div class="p-3 bg-primary text-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style="width: 48px; height: 48px;">
            <i class="bi bi-truck fs-5"></i>
          </div>
          <div class="flex-grow-1">
            <div class="d-flex align-items-center gap-2 flex-wrap mb-1">
              <h5 class="fw-bold text-primary-emphasis mb-0">PIN ${zip}: Zone 2 (Suburban Belt) Active</h5>
              <span class="badge bg-primary text-white rounded-pill px-2.5 py-1 small">❄️ Cold Van Shuttles</span>
            </div>
            <p class="text-muted small mb-2">Great news! We service your township with our temperature-controlled cold shuttle fleet every morning and evening.</p>
            <div class="row g-2 mb-3 small">
              <div class="col-sm-6"><i class="bi bi-check2-circle text-primary me-1"></i> <strong>Next Morning Shuttle:</strong> 6:30 AM – 9:00 AM</div>
              <div class="col-sm-6"><i class="bi bi-bag-check text-primary me-1"></i> <strong>Free Delivery:</strong> Orders ₹500+ (else ₹49)</div>
            </div>
            <div class="d-flex gap-2 flex-wrap">
              <button type="button" class="btn btn-fresh btn-fresh-primary btn-fresh-sm" onclick="selectZoneAndShop('zone-2')">
                <i class="bi bi-cart-plus me-1"></i> Book Morning Shuttle
              </button>
              <button type="button" class="btn btn-fresh btn-fresh-outline btn-fresh-sm" onclick="openDeliveryFeatureModal('cold-van')">
                <i class="bi bi-thermometer-snow me-1"></i> Cold Van Specs
              </button>
            </div>
          </div>
        </div>
      `;
      showToast(`Zone 2 Morning Shuttle available for ${zip}!`, 'success');
    }
    // Zone 3: Extended Ring / Scheduled
    else {
      resultBox.className = 'p-4 rounded-4 border border-warning-subtle bg-warning-subtle mt-4 text-start';
      resultBox.innerHTML = `
        <div class="d-flex align-items-start gap-3">
          <div class="p-3 bg-warning text-dark rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style="width: 48px; height: 48px;">
            <i class="bi bi-box-seam fs-5"></i>
          </div>
          <div class="flex-grow-1">
            <div class="d-flex align-items-center gap-2 flex-wrap mb-1">
              <h5 class="fw-bold text-dark mb-0">PIN ${zip}: Zone 3 (Extended Ring) Active</h5>
              <span class="badge bg-dark text-white rounded-pill px-2.5 py-1 small">📦 Eco-Insulated Baskets</span>
            </div>
            <p class="text-muted small mb-2">We service your community on scheduled days (Tue, Thu, Sat) with eco-insulated farm carton packaging.</p>
            <div class="row g-2 mb-3 small">
              <div class="col-sm-6"><i class="bi bi-calendar-check text-warning-emphasis me-1"></i> <strong>Delivery Days:</strong> Tue, Thu, Sat (7:00 AM – 11:00 AM)</div>
              <div class="col-sm-6"><i class="bi bi-bag-check text-warning-emphasis me-1"></i> <strong>Free Delivery:</strong> Orders ₹800+ (else ₹75)</div>
            </div>
            <div class="d-flex gap-2 flex-wrap">
              <a href="pricing.html" class="btn btn-fresh btn-fresh-primary btn-fresh-sm">
                <i class="bi bi-box2-heart me-1"></i> View Weekly Baskets
              </a>
              <button type="button" class="btn btn-fresh btn-fresh-outline btn-fresh-sm" onclick="openDeliveryFeatureModal('eco-carton')">
                <i class="bi bi-recycle me-1"></i> Eco Packaging & Returns
              </button>
            </div>
          </div>
        </div>
      `;
      showToast(`Zone 3 Scheduled Delivery available for ${zip}!`, 'info');
    }
  });
}

/* Newsletter Form */
function initNewsletterValidation() {
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      if (emailInput && validateEmail(emailInput.value.trim())) {
        showToast('Thank you for subscribing! Your 15% discount coupon has been emailed.', 'success');
        form.reset();
      } else {
        showToast('Please enter a valid email address.', 'error');
      }
    });
  });
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
