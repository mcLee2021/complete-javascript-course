'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContents = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const sections = document.querySelectorAll('.section');
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);
btnsOpenModal.forEach(b => b.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
btnScrollTo.addEventListener('click', function (e) {
  e.preventDefault();
  section1.scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
tabContainer.addEventListener('click', function (e) {
  e.preventDefault();
  const clicked = e.target.closest('.operations__tab');
  //guard clause
  if (clicked === null) return;

  tabs.forEach(tab => {
    tab.classList.remove('operations__tab--active');
  });
  tabContents.forEach(content => {
    content.classList.remove('operations__content--active');
  });

  clicked.classList.add('operations__tab--active');
  // console.log(clicked.getAttribute('data-tab'));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
const handleHover = function (e) {
  const link = e.target;
  if (link.classList.contains('nav__link')) {
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('.nav__logo');
    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

const revealSection = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  sectionObserver.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.2,
});
sections.forEach(section => sectionObserver.observe(section));

const imgTargets = document.querySelectorAll('.features__img');
const loadImg = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  imgObserver.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  rootMargin: '200px',
  threshold: 1,
});
imgTargets.forEach(img => imgObserver.observe(img));

const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const slideLength = slides.length;
//0% 100% 200%
slides.forEach(
  (slide, i) => (slide.style.transform = `translateX(${100 * i}%)`)
);
//-100% 0% 100%
let curSlide = 0;
const moveSlide = function (curSlide) {
  slides.forEach(
    (slide, i) =>
      (slide.style.transform = `translateX(${
        100 * (i - (curSlide % slideLength))
      }%)`)
  );
};
const prevSlide = function () {
  curSlide--;
  if (curSlide < 0) {
    curSlide = slideLength - 1;
  }
  moveSlide(curSlide);
  activateDot(curSlide % slideLength);
};
const nextSlide = function () {
  curSlide++;
  moveSlide(curSlide);
  activateDot(curSlide % slideLength);
};
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function (e) {
  e.key === 'ArrowLeft' && prevSlide();
  e.key === 'ArrowRight' && nextSlide();
});
const dotContainer = document.querySelector('.dots');
const createDots = function () {
  slides.forEach((_, i) => {
    const html = `<button class='dots__dot' data-slide='${i}'></button>`;
    dotContainer.insertAdjacentHTML('beforeend', html);
  });
};
createDots();

const activateDot = function (curSlide) {
  const link = document.querySelector(`.dots__dot[data-slide='${curSlide}']`);
  console.log(link);
  const siblings = link.closest('.dots').querySelectorAll('.dots__dot');
  siblings.forEach(el => {
    if (el !== link) {
      el.classList.remove('dots__dot--active');
    }
  });
  link.classList.add('dots__dot--active');
};
dotContainer.addEventListener('click', function (e) {
  const link = e.target;
  if (link.classList.contains('dots__dot')) {
    const { slide } = link.dataset;
    moveSlide(slide);
    activateDot(slide);
  }
});
