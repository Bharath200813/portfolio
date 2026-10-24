/**
 * ==============================================================================
 * BHARATHKUMAR M — PERSONAL DEVELOPER PORTFOLIO SCRIPT
 * Futuristic Dark Aesthetic: Interactive Canvas Particles, Smooth Navigation,
 * Glassmorphism Hover Effects, Modals, Resume PDF Print & Wallet Simulator
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // ----------------------------------------------------------------------------
  // 1. DYNAMIC FOOTER COPYRIGHT YEAR
  // ----------------------------------------------------------------------------
  const currentYearEl = document.getElementById('currentYear');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  // ----------------------------------------------------------------------------
  // 2. LIGHTWEIGHT CYBERNETIC PARTICLES CANVAS
  // ----------------------------------------------------------------------------
  const canvas = document.getElementById('bgCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let particles = [];
    const particleCount = Math.min(Math.floor((width * height) / 18000), 65);

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.radius = Math.random() * 1.8 + 0.8;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(56, 189, 248, 0.45)';
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#00f2fe';
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function connectParticles() {
      const maxDistance = 120;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDistance) {
            const opacity = (1 - dist / maxDistance) * 0.18;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 242, 254, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }

    let animationFrameId;
    function animateParticles() {
      ctx.clearRect(0, 0, width, height);
      for (let p of particles) {
        p.update();
        p.draw();
      }
      connectParticles();
      animationFrameId = requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    });
  }

  // ----------------------------------------------------------------------------
  // 3. PROFILE PHOTO ERROR FALLBACK
  // ----------------------------------------------------------------------------
  const profilePhoto = document.getElementById('profilePhoto');
  const photoFallback = document.getElementById('photoFallback');

  if (profilePhoto && photoFallback) {
    profilePhoto.addEventListener('error', () => {
      profilePhoto.style.display = 'none';
      photoFallback.style.display = 'flex';
    });

    // Check if the image naturalWidth is 0 after rendering attempt
    if (!profilePhoto.complete || profilePhoto.naturalWidth === 0) {
      setTimeout(() => {
        if (profilePhoto.naturalWidth === 0) {
          profilePhoto.style.display = 'none';
          photoFallback.style.display = 'flex';
        }
      }, 400);
    }
  }

  // ----------------------------------------------------------------------------
  // 4. INTERACTIVE GLASS CARD MOUSE SPOTLIGHT EFFECT
  // ----------------------------------------------------------------------------
  const glassCards = document.querySelectorAll('.glass-card');
  glassCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // ----------------------------------------------------------------------------
  // 5. STICKY NAVBAR & ACTIVE SECTION SCROLL SPY
  // ----------------------------------------------------------------------------
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  function handleWindowScroll() {
    const scrollY = window.pageYOffset;

    // Header blur state
    if (header) {
      if (scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Scroll to Top visibility
    if (scrollTopBtn) {
      if (scrollY > 350) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }

    // Active Section Spy
    let currentId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    if (currentId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        }
      });
    }
  }

  window.addEventListener('scroll', handleWindowScroll, { passive: true });
  handleWindowScroll(); // Initial invocation

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const backToTopLink = document.getElementById('backToTopLink');
  if (backToTopLink) {
    backToTopLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ----------------------------------------------------------------------------
  // 6. MOBILE NAVIGATION DRAWER
  // ----------------------------------------------------------------------------
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  function toggleMobileMenu() {
    if (!navMenu || !navToggle) return;
    const isOpen = navMenu.classList.contains('open');
    if (isOpen) {
      navMenu.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    } else {
      navMenu.classList.add('open');
      navToggle.classList.add('open');
      navToggle.setAttribute('aria-expanded', 'true');
    }
  }

  function closeMobileMenu() {
    if (navMenu && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }

  if (navToggle) navToggle.addEventListener('click', toggleMobileMenu);

  navLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

  document.addEventListener('click', (e) => {
    if (navMenu && navMenu.classList.contains('open')) {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        closeMobileMenu();
      }
    }
  });

  // ----------------------------------------------------------------------------
  // 7. RESUME MODAL & PRINT/SAVE PDF EXPORT
  // ----------------------------------------------------------------------------
  const resumeModal = document.getElementById('resumeModal');
  const openResumeModalBtn = document.getElementById('openResumeModalBtn');
  const quickResumeBtn = document.getElementById('quickResumeBtn');
  const closeResumeModalBtn = document.getElementById('closeResumeModalBtn');
  const closeResumeBottomBtn = document.getElementById('closeResumeBottomBtn');
  const printResumeBtn = document.getElementById('printResumeBtn');

  function openResume() {
    if (!resumeModal) return;
    resumeModal.classList.add('active');
    resumeModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeResume() {
    if (!resumeModal) return;
    resumeModal.classList.remove('active');
    resumeModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (openResumeModalBtn) openResumeModalBtn.addEventListener('click', openResume);
  if (quickResumeBtn) quickResumeBtn.addEventListener('click', openResume);
  if (closeResumeModalBtn) closeResumeModalBtn.addEventListener('click', closeResume);
  if (closeResumeBottomBtn) closeResumeBottomBtn.addEventListener('click', closeResume);

  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      openResume();
      setTimeout(() => {
        window.print();
      }, 150);
    });
  }

  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) {
        closeResume();
      }
    });
  }

  // ----------------------------------------------------------------------------
  // 8. PROJECT MODAL & INTERACTIVE DIGITAL WALLET SIMULATOR
  // ----------------------------------------------------------------------------
  const projectModal = document.getElementById('projectModal');
  const openProjectModalBtn = document.getElementById('openProjectModalBtn');
  const projectDetailsQuickBtn = document.getElementById('projectDetailsQuickBtn');
  const closeProjectModalBtn = document.getElementById('closeProjectModalBtn');
  const closeProjectBottomBtn = document.getElementById('closeProjectBottomBtn');

  function openProject() {
    if (!projectModal) return;
    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProject() {
    if (!projectModal) return;
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (openProjectModalBtn) openProjectModalBtn.addEventListener('click', openProject);
  if (projectDetailsQuickBtn) projectDetailsQuickBtn.addEventListener('click', openProject);
  if (closeProjectModalBtn) closeProjectModalBtn.addEventListener('click', closeProject);
  if (closeProjectBottomBtn) closeProjectBottomBtn.addEventListener('click', closeProject);

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeProject();
      }
    });
  }

  // Keyboard accessibility: Escape closes open modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeResume();
      closeProject();
      closeMobileMenu();
    }
  });

  // Simulated Wallet Demo Logic
  let walletBalance = 2500.00;
  const demoBalanceEl = document.getElementById('demoBalance');
  const demoAmountInput = document.getElementById('demoAmountInput');
  const demoAddMoneyBtn = document.getElementById('demoAddMoneyBtn');
  const demoSpendMoneyBtn = document.getElementById('demoSpendMoneyBtn');
  const transactionLogBody = document.getElementById('transactionLogBody');

  function formatCurrency(val) {
    return val.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function getTimestamp() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today';
  }

  function recordLedgerItem(type, desc, amount, isCredit) {
    if (!transactionLogBody) return;
    const tr = document.createElement('tr');
    const badge = isCredit 
      ? `<span class="badge-credit"><i class="fa-solid fa-arrow-down"></i> Credit</span>`
      : `<span class="badge-debit"><i class="fa-solid fa-arrow-up"></i> Debit</span>`;

    const amountClass = isCredit ? 'text-credit' : 'text-debit';
    const amountSign = isCredit ? '+' : '-';

    tr.innerHTML = `
      <td>${badge}</td>
      <td>${desc}</td>
      <td>${getTimestamp()}</td>
      <td class="${amountClass} font-bold">${amountSign}₹${formatCurrency(amount)}</td>
      <td><span class="badge-done">Completed</span></td>
    `;

    transactionLogBody.insertBefore(tr, transactionLogBody.firstChild);
  }

  if (demoAddMoneyBtn && demoAmountInput && demoBalanceEl) {
    demoAddMoneyBtn.addEventListener('click', () => {
      const amount = parseFloat(demoAmountInput.value);
      if (isNaN(amount) || amount <= 0) {
        showToast('Please enter a valid positive amount to add.', 'danger');
        return;
      }
      walletBalance += amount;
      demoBalanceEl.textContent = formatCurrency(walletBalance);
      recordLedgerItem('Credit', 'Wallet Balance Top-up', amount, true);
      showToast(`Credited ₹${formatCurrency(amount)} to wallet!`, 'success');
      demoAmountInput.value = '';
    });
  }

  if (demoSpendMoneyBtn && demoAmountInput && demoBalanceEl) {
    demoSpendMoneyBtn.addEventListener('click', () => {
      const amount = parseFloat(demoAmountInput.value);
      if (isNaN(amount) || amount <= 0) {
        showToast('Please enter a valid positive amount to spend.', 'danger');
        return;
      }
      if (amount > walletBalance) {
        showToast('Insufficient wallet balance for this transaction!', 'danger');
        return;
      }
      walletBalance -= amount;
      demoBalanceEl.textContent = formatCurrency(walletBalance);
      recordLedgerItem('Debit', 'Simulated Payment / Transfer', amount, false);
      showToast(`Debited ₹${formatCurrency(amount)} from wallet.`, 'info');
      demoAmountInput.value = '';
    });
  }

  // ----------------------------------------------------------------------------
  // 9. CONTACT FORM CLIENT-SIDE VALIDATION & FEEDBACK
  // ----------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const userNameInput = document.getElementById('userName');
  const userEmailInput = document.getElementById('userEmail');
  const userMessageInput = document.getElementById('userMessage');
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');
  const formStatusBox = document.getElementById('formStatusBox');
  const resetFormBtn = document.getElementById('resetFormBtn');

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      if (!userNameInput.value.trim()) {
        userNameInput.classList.add('has-error');
        nameError.classList.add('visible');
        isValid = false;
      } else {
        userNameInput.classList.remove('has-error');
        nameError.classList.remove('visible');
      }

      if (!isValidEmail(userEmailInput.value.trim())) {
        userEmailInput.classList.add('has-error');
        emailError.classList.add('visible');
        isValid = false;
      } else {
        userEmailInput.classList.remove('has-error');
        emailError.classList.remove('visible');
      }

      if (userMessageInput.value.trim().length < 10) {
        userMessageInput.classList.add('has-error');
        messageError.classList.add('visible');
        isValid = false;
      } else {
        userMessageInput.classList.remove('has-error');
        messageError.classList.remove('visible');
      }

      if (isValid) {
        contactForm.style.display = 'none';
        if (formStatusBox) formStatusBox.style.display = 'flex';
        showToast('Message recorded successfully!', 'success');
      } else {
        showToast('Please correct the highlighted fields.', 'danger');
      }
    });

    if (resetFormBtn) {
      resetFormBtn.addEventListener('click', () => {
        contactForm.reset();
        contactForm.style.display = 'flex';
        if (formStatusBox) formStatusBox.style.display = 'none';
      });
    }

    [userNameInput, userEmailInput, userMessageInput].forEach(input => {
      if (input) {
        input.addEventListener('input', () => {
          input.classList.remove('has-error');
          const errorId = input.id.replace('user', '').toLowerCase() + 'Error';
          const errEl = document.getElementById(errorId);
          if (errEl) errEl.classList.remove('visible');
        });
      }
    });
  }

  // ----------------------------------------------------------------------------
  // 10. NOTIFICATION TOAST HUB
  // ----------------------------------------------------------------------------
  function showToast(message, type = 'info') {
    const hub = document.getElementById('toastContainer');
    if (!hub) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let icon = 'fa-circle-info';
    if (type === 'success') icon = 'fa-circle-check';
    if (type === 'danger') icon = 'fa-triangle-exclamation';

    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
    hub.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(12px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  }

});
