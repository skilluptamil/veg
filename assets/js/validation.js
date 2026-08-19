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

    // Simulate coverage check
    resultBox.style.display = 'block';
    if (zip.startsWith('4') || zip.startsWith('5') || zip.startsWith('1') || zip.startsWith('6') || zip.length === 6) {
      resultBox.className = 'alert alert-success mt-4 d-flex align-items-center gap-3';
      resultBox.innerHTML = `
        <i class="bi bi-geo-alt-fill fs-3 text-success"></i>
        <div>
          <h6 class="fw-bold mb-1">Great news! We deliver to Postal Code: ${zip}</h6>
          <p class="small mb-0">⚡ <strong>2-Hour Express Delivery</strong> and <strong>Morning 6:00 AM Fresh Harvest Slot</strong> available for your address.</p>
        </div>
      `;
      showToast(`We deliver to ${zip}!`, 'success');
    } else {
      resultBox.className = 'alert alert-warning mt-4 d-flex align-items-center gap-3';
      resultBox.innerHTML = `
        <i class="bi bi-exclamation-triangle-fill fs-3 text-warning"></i>
        <div>
          <h6 class="fw-bold mb-1">Standard Next-Day Delivery Available</h6>
          <p class="small mb-0">We deliver to ${zip} via our refrigerated morning shuttle. Order before 9:00 PM for next-day 7:00 AM delivery.</p>
        </div>
      `;
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
