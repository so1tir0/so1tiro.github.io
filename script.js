/* =========================================================
   DŌ — скрипты сайта
   Три задачи: мобильное меню, фон шапки при скролле,
   плавное появление блоков при прокрутке
   ========================================================= */

// ---------- 1. Мобильное меню ----------
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

navToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Закрываем меню при клике на ссылку (удобно на мобильном)
nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ---------- 2. Шапка становится непрозрачной при скролле ----------
const header = document.getElementById('header');

function updateHeader() {
  if (window.scrollY > 40) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', updateHeader);
updateHeader();

// ---------- 3. Появление блоков при прокрутке ----------
// IntersectionObserver следит, когда элемент попадает во вьюпорт,
// и добавляет класс .in-view, который запускает CSS-переход
const revealElements = document.querySelectorAll('.reveal, .brush-underline');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((el) => observer.observe(el));

// Добавляем класс .reveal программно к секциям, где нужна анимация появления
document.querySelectorAll('.principle, .program-card, .trainer-card, .price-card').forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${(i % 4) * 0.08}s`;
  observer.observe(el);
});