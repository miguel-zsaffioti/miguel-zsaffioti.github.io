

const I18N_SUPPORTED = ['pt', 'en'];
const I18N_DEFAULT = 'pt';
const I18N_STORAGE_KEY = 'site-lang';

let currentTranslations = {};

// IMPORTANTE: document.currentScript só é válido durante a execução síncrona
// deste arquivo, então o caminho base precisa ser capturado aqui em cima,
// e não dentro de uma função chamada depois (ex: em resposta a um clique).
const I18N_BASE_PATH = (function () {
  const scriptTag = document.currentScript || document.querySelector('script[src*="i18n.js"]');
  return (scriptTag && scriptTag.getAttribute('data-i18n-base')) || '';
})();

function detectInitialLanguage() {
  const saved = localStorage.getItem(I18N_STORAGE_KEY);
  if (saved && I18N_SUPPORTED.includes(saved)) return saved;

  const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
  if (browserLang.startsWith('pt')) return 'pt';
  if (I18N_SUPPORTED.includes(browserLang.slice(0, 2))) return browserLang.slice(0, 2);

  return I18N_DEFAULT;
}

async function loadLanguageFile(lang) {
  const response = await fetch(`${I18N_BASE_PATH}assets/lang/${lang}.json`);
  if (!response.ok) throw new Error(`Não foi possível carregar ${I18N_BASE_PATH}assets/lang/${lang}.json`);
  return response.json();
}

function applyTranslations(translations) {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (translations[key] !== undefined) {
      el.innerHTML = translations[key];
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[key] !== undefined) {
      el.setAttribute('placeholder', translations[key]);
    }
  });

  // Typed.js (frase animada do hero)
  const typedEl = document.querySelector('.typed');
  if (typedEl && translations.hero_typed_items) {
    typedEl.setAttribute('data-typed-items', translations.hero_typed_items);
    if (window.Typed && typedEl.typedInstance) {
      typedEl.typedInstance.destroy();
    }
    // Reinicializa o Typed.js com os novos itens, se a lib estiver disponível
    if (window.Typed) {
      typedEl.innerHTML = '';
      typedEl.typedInstance = new Typed('.typed', {
        strings: translations.hero_typed_items.split(',').map(s => s.trim()),
        loop: true,
        typeSpeed: 100,
        backSpeed: 20,
        backDelay: 2000
      });
    }
  }

  // Link de download do currículo
  const cvBtn = document.getElementById('download-cv-btn');
  if (cvBtn && translations.resume_file) {
    cvBtn.setAttribute('href', I18N_BASE_PATH + translations.resume_file);
    cvBtn.setAttribute('download', '');
  }
}

async function setLanguage(lang) {
  if (!I18N_SUPPORTED.includes(lang)) lang = I18N_DEFAULT;

  try {
    currentTranslations = await loadLanguageFile(lang);
  } catch (err) {
    console.error('Erro ao carregar traduções:', err);
    return;
  }

  applyTranslations(currentTranslations);

  document.documentElement.lang = lang;
  localStorage.setItem(I18N_STORAGE_KEY, lang);

  const btn = document.getElementById('lang-switch-btn');
  if (btn) {
    // O botão sempre mostra o idioma PARA o qual você vai mudar
    btn.textContent = lang === 'pt' ? 'EN' : 'PT';
  }
}

function initI18n() {
  const initialLang = detectInitialLanguage();
  setLanguage(initialLang);

  const btn = document.getElementById('lang-switch-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      const next = document.documentElement.lang === 'pt' ? 'en' : 'pt';
      setLanguage(next);
    });
  }
}

document.addEventListener('DOMContentLoaded', initI18n);
