/**
* Template Name: SnapFolio
* Template URL: https://bootstrapmade.com/snapfolio-bootstrap-portfolio-template/
* Updated: Jul 21 2025 with Bootstrap v5.3.7
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

const CONTACT_INFO = {
  email: 'miguel.zsaffioti@gmail.com',
  location: 'São Carlos, SP',
  linkedinUser: 'miguel-zsaffioti',
  linkedinUrl: 'https://www.linkedin.com/in/miguel-zsaffioti/',
  githubUser: 'miguel-zsaffioti',
  githubUrl: 'https://github.com/miguel-zsaffioti'
};


function populateContactInfo() {
  document.querySelectorAll('[data-contact]').forEach((el) => {
    const key = el.getAttribute('data-contact');
    switch (key) {
      case 'email':
        el.textContent = CONTACT_INFO.email;
        break;
      case 'location':
        el.textContent = CONTACT_INFO.location;
        break;
      case 'linkedin-user':
        el.textContent = CONTACT_INFO.linkedinUser;
        break;
      case 'linkedin-url':
        el.textContent = CONTACT_INFO.linkedinUrl;
        break;
      case 'github-user':
        el.textContent = CONTACT_INFO.githubUser;
        break;
    }
    // Se o elemento for um link, também ajusta o href
    if (el.tagName === 'A') {
      if (key === 'linkedin-user' || key === 'linkedin-url') {
        el.href = CONTACT_INFO.linkedinUrl;
      } else if (key === 'github-user') {
        el.href = CONTACT_INFO.githubUrl;
      }
    }
  });
}
document.addEventListener('DOMContentLoaded', populateContactInfo);

const EMAILJS_CONFIG = {
  publicKey: 'jfDoTJB_4rB1lilMe',
  serviceId: 'service_5a377qr',
  templateId: 'template_umnn0nw'
};


function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form || typeof emailjs === 'undefined') return;

  emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });

  const loadingEl = form.querySelector('.loading');
  const errorEl = form.querySelector('.error-message');
  const sentEl = form.querySelector('.sent-message');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    loadingEl.style.display = 'block';
    errorEl.style.display = 'none';
    sentEl.style.display = 'none';

    emailjs.sendForm(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, form)
      .then(() => {
        loadingEl.style.display = 'none';
        sentEl.style.display = 'block';
        form.reset();
      })
      .catch((error) => {
        loadingEl.style.display = 'none';
        errorEl.textContent = 'Não foi possível enviar sua mensagem. Tente novamente mais tarde.';
        errorEl.style.display = 'block';
        console.error('EmailJS error:', error);
      });
  });
}
document.addEventListener('DOMContentLoaded', initContactForm);


function copyEmail(event) {
  if (event) event.preventDefault();
  const email = CONTACT_INFO.email;

  function showToast() {
    let toast = document.getElementById('email-copy-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'email-copy-toast';
      toast.textContent = 'E-mail copiado: ' + email;
      document.body.appendChild(toast);
    }
    toast.classList.add('show');
    clearTimeout(toast._hideTimeout);
    toast._hideTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(email).then(showToast).catch(() => {
      fallbackCopyEmail(email);
      showToast();
    });
  } else {
    fallbackCopyEmail(email);
    showToast();
  }
}

function fallbackCopyEmail(email) {
  const textarea = document.createElement('textarea');
  textarea.value = email;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  try {
    document.execCommand('copy');
  } catch (e) {
    console.error('Falha ao copiar e-mail:', e);
  }
  document.body.removeChild(textarea);
}
