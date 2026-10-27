/**
 * Sales Page Script - E-book "10 Ideias de Decoração para Halloween"
 * High-conversion features: Dynamic countdown, interactive accordions, mobile drawer, realistic social proof toast, sticky bar
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Initialize AOS (Animate on Scroll)
  if (window.AOS) {
    window.AOS.init({
      duration: 750,
      once: true,
      offset: 50,
      easing: 'ease-out-cubic'
    });
  }

  // 3. Countdown Timer (Dynamic urgency logic)
  initCountdown();

  // 4. Accordion Logic (10 Ideas & FAQ)
  initAccordions();

  // 5. Mobile Navigation
  initMobileNav();

  // 6. Sticky CTA Bar on Mobile
  initStickyCTA();

  // 7. Live Social Proof Toast Notifications
  initSocialProofToast();

  // 8. E-book Preview / Sample Modal
  initPreviewModal();
});

/* =========================================================================
   1. COUNTDOWN TIMER
   ========================================================================= */
function initCountdown() {
  const hoursEl = document.getElementById('cd-hours');
  const minutesEl = document.getElementById('cd-minutes');
  const secondsEl = document.getElementById('cd-seconds');

  if (!hoursEl || !minutesEl || !secondsEl) return;

  const STORAGE_KEY = 'halloween_ebook_deadline_v1';
  let deadline = localStorage.getItem(STORAGE_KEY);

  const now = new Date().getTime();
  if (!deadline || parseInt(deadline) <= now) {
    deadline = now + (11 * 60 * 60 * 1000) + (35 * 60 * 1000);
    localStorage.setItem(STORAGE_KEY, deadline.toString());
  } else {
    deadline = parseInt(deadline);
  }

  function update() {
    const currentTime = new Date().getTime();
    const diff = deadline - currentTime;

    if (diff <= 0) {
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }

    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

/* =========================================================================
   2. ACCORDIONS (10 Ideias do E-book & FAQ)
   ========================================================================= */
function initAccordions() {
  const accordionButtons = document.querySelectorAll('.accordion-btn');

  accordionButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const parent = btn.parentElement;
      const content = parent.querySelector('.accordion-content');
      const icon = btn.querySelector('.accordion-icon');
      const isOpen = content.classList.contains('active');

      const group = parent.closest('.accordion-group');
      if (group) {
        group.querySelectorAll('.accordion-content').forEach((otherContent) => {
          if (otherContent !== content) {
            otherContent.classList.remove('active');
            otherContent.style.maxHeight = null;
            const otherBtn = otherContent.parentElement.querySelector('.accordion-btn');
            if (otherBtn) {
              const otherIcon = otherBtn.querySelector('.accordion-icon');
              if (otherIcon) otherIcon.classList.remove('active');
            }
          }
        });
      }

      if (isOpen) {
        content.classList.remove('active');
        content.style.maxHeight = null;
        if (icon) icon.classList.remove('active');
      } else {
        content.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
        if (icon) icon.classList.add('active');
      }
    });
  });
}

/* =========================================================================
   3. MOBILE NAVIGATION DRAWER
   ========================================================================= */
function initMobileNav() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeBtn = document.getElementById('mobile-menu-close');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (!menuBtn || !mobileMenu) return;

  function toggleMenu(open) {
    if (open) {
      mobileMenu.classList.remove('hidden');
      mobileMenu.classList.add('flex');
      document.body.style.overflow = 'hidden';
    } else {
      mobileMenu.classList.add('hidden');
      mobileMenu.classList.remove('flex');
      document.body.style.overflow = '';
    }
  }

  menuBtn.addEventListener('click', () => toggleMenu(true));
  if (closeBtn) closeBtn.addEventListener('click', () => toggleMenu(false));

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => toggleMenu(false));
  });
}

/* =========================================================================
   4. STICKY CTA BAR (Scroll past hero)
   ========================================================================= */
function initStickyCTA() {
  const stickyBar = document.getElementById('sticky-mobile-cta');
  if (!stickyBar) return;

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    const pricingSection = document.getElementById('oferta');
    const pricingTop = pricingSection ? pricingSection.offsetTop - 350 : 999999;

    if (scrollPos > 500 && scrollPos < pricingTop) {
      stickyBar.classList.remove('translate-y-full', 'opacity-0');
      stickyBar.classList.add('translate-y-0', 'opacity-100');
    } else {
      stickyBar.classList.add('translate-y-full', 'opacity-0');
      stickyBar.classList.remove('translate-y-0', 'opacity-100');
    }
  });
}

/* =========================================================================
   5. REALISTIC SOCIAL PROOF TOAST NOTIFICATIONS
   ========================================================================= */
function initSocialProofToast() {
  const toast = document.getElementById('social-toast');
  const toastName = document.getElementById('toast-name');
  const toastCity = document.getElementById('toast-city');
  const toastTime = document.getElementById('toast-time');
  const toastClose = document.getElementById('toast-close');

  if (!toast) return;

  const sampleBuyers = [
    { name: 'Camila Rocha', city: 'São Paulo - SP', time: 'garantiu o combo + brinde há 2 min' },
    { name: 'Thiago Nogueira', city: 'Belo Horizonte - MG', time: 'baixou os 2 e-books agora' },
    { name: 'Fernanda Meireles', city: 'Rio de Janeiro - RJ', time: 'comprou com o brinde há 5 min' },
    { name: 'Lucas Brandão', city: 'Curitiba - PR', time: 'baixou os e-books há 8 min' },
    { name: 'Patrícia Silveira', city: 'Porto Alegre - RS', time: 'garantiu o brinde agora' },
    { name: 'Mariana Duarte', city: 'Brasília - DF', time: 'baixou os 2 e-books agora' }
  ];

  let buyerIndex = 0;
  let isClosed = false;

  if (toastClose) {
    toastClose.addEventListener('click', () => {
      isClosed = true;
      toast.classList.add('translate-y-32', 'opacity-0');
    });
  }

  function showNextToast() {
    if (isClosed) return;

    const buyer = sampleBuyers[buyerIndex];
    buyerIndex = (buyerIndex + 1) % sampleBuyers.length;

    if (toastName) toastName.textContent = buyer.name;
    if (toastCity) toastCity.textContent = buyer.city;
    if (toastTime) toastTime.textContent = buyer.time;

    toast.classList.remove('translate-y-32', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
      if (!isClosed) {
        toast.classList.add('translate-y-32', 'opacity-0');
        toast.classList.remove('translate-y-0', 'opacity-100');
      }
    }, 4500);
  }

  setTimeout(() => {
    showNextToast();
    setInterval(showNextToast, 20000);
  }, 5000);
}

/* =========================================================================
   6. E-BOOK PREVIEW MODAL
   ========================================================================= */
function initPreviewModal() {
  const openBtns = document.querySelectorAll('.open-preview-modal');
  const modal = document.getElementById('preview-modal');
  const closeModalBtn = document.getElementById('close-preview-modal');

  if (!modal) return;

  openBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    });
  });

  function closeModal() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}
