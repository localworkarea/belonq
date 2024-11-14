// Підключення функціоналу "Чертоги Фрілансера"
// import { transform } from "terser-webpack-plugin/types/minify.js";
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";


import SplitType from 'split-type'
gsap.registerPlugin(ScrollTrigger);


  // == SPLIT TYPE =========================================================
   const splitTextLines = document.querySelectorAll('.split-lines');
   const splitTextWords = document.querySelectorAll('.split-words');
   const splitTextChars = document.querySelectorAll('.split-chars');
   const splitTextBoth = document.querySelectorAll('.split-both');
   const splitSetSpan = document.querySelectorAll('.split-words.set-span');
   
   function initSplitType() {
     // Если существуют элементы с классом .split-lines
     if (splitTextLines.length > 0) {
       splitTextLines.forEach(element => {
         new SplitType(element, { types: 'lines' });
       });
     }
   
     // Если существуют элементы с классом .split-words
     if (splitTextWords.length > 0) {
       splitTextWords.forEach(element => {
         new SplitType(element, { types: 'words' });
         // Проставляем индексы для всех слов
         const words = element.querySelectorAll('.word');
         words.forEach((word, index) => {
           word.style.setProperty('--index', index);
         });
       });
     }
   
     // Если существуют элементы с классом .split-chars
     if (splitTextChars.length > 0) {
       splitTextChars.forEach(element => {
         new SplitType(element, { types: 'chars' });
         const chars = element.querySelectorAll('.char');
         chars.forEach((char, index) => {
           char.style.setProperty('--index', index);
         });
       });
     }
   
     // Если существуют элементы с классом .split-both
     if (splitTextBoth.length > 0) {
       splitTextBoth.forEach(element => {
         new SplitType(element, { types: 'lines, words' });
         // Проставляем индексы для всех слов
         const words = element.querySelectorAll('.word');
         words.forEach((word, index) => {
           word.style.setProperty('--index', index);
         });
       });
     }
     // Добавляем <span> для каждого слова внутри .split-words.set-span
     if (splitSetSpan.length > 0) {
       splitSetSpan.forEach(splitSetSpan => {
         const words = splitSetSpan.querySelectorAll('.word');
         
         words.forEach(word => {
           const text = word.textContent.trim();
           word.innerHTML = `<span class="word-span">${text}</span>`;
         });
       });
     }
   }
   
  //  Инициализация SplitType при загрузке
   initSplitType();
   
   let lastWidth = window.innerWidth;
   const resizeObserver = new ResizeObserver(entries => {
       requestAnimationFrame(() => {
           entries.forEach(entry => {
               const currentWidth = entry.contentRect.width;
               // Запускаем initSplitType() только если изменилась ширина
               if (currentWidth !== lastWidth) {
                   initSplitType();
                   lastWidth = currentWidth; // Обновляем lastWidth
               }
           });
       });
   });
   // Наблюдаем за изменениями в элементе body
   resizeObserver.observe(document.body);
   
   // =======================================================================

// === ПЛАВНАЯ ПРОКРУТКА ЧЕРЕЗ LENIS =============================
const lenis = new Lenis({
  smooth: true,          // Включает плавный скролл
  smoothTouch: true,     // Включает плавный скролл на мобильных устройствах
  lerp: 0.05,             // Определяет инерцию (чем ближе к 1, тем медленнее скролл)
  // direction: 'vertical', // Задаёт направление скролла: 'vertical' или 'horizontal'
  mouseMultiplier: 3,    // Чувствительность прокрутки мыши (увеличивайте, чтобы сделать скролл быстрее)
})
  
// lenis.on('scroll', (e) => {
//   // console.log(e)
// })
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time)=>{
  lenis.raf(time * 1000)
})
gsap.ticker.lagSmoothing(0)
// // Listen for the scroll event and log the event data
// lenis.on('scroll', (e) => {
//   console.log(e);
// });

// // Use requestAnimationFrame to continuously update the scroll
// function raf(time) {
//   lenis.raf(time);
//   requestAnimationFrame(raf);
// }

// requestAnimationFrame(raf);



// == GSAP ANIMATIONS ======================================================
const logoHeader = document.querySelector('.header__logo');
const logoImg = document.querySelector('.logo__ic');
const heroSection = document.querySelector('.hero');

const startHero = Array.from(document.querySelectorAll('.start-hero__item'));
const heroFirst = document.querySelector('.hero__first');

const heroSecond = document.querySelector('.hero__second'); 

const heroTitle = document.querySelector('.title-hero');
const heroTitleA = document.querySelectorAll('.title-hero__a span');
const heroTitleB = document.querySelectorAll('.title-hero__b span');
const heroTitleC = document.querySelectorAll('.title-hero__c span');
const heroTitleD = document.querySelectorAll('.title-hero__d span');


const heroRight = document.querySelector('.hero__right');




function createAnimation() {


  // === LOGO IMAGE =================================================
  // 1. устанавливаем начальные значения
  gsap.set(logoImg, {
    top: "50%",
    left: "50px",
    width: "47%",
    // transform: "translate(0%, -50%)"
  });
  
  const scrollPosY = window.pageYOffset;
  window.scrollTo(0, 0);

  function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      top: rect.top + window.pageYOffset,
      left: rect.left + window.pageXOffset,
      width: rect.width,
      height: rect.height
    };
  }

  const logoHeaderPosition = getOffset(logoHeader);
  window.scrollTo(0, scrollPosY);

  ScrollTrigger.getAll().forEach(trigger => trigger.kill());

  // Создаём анимацию с актуальными размерами и положением
  gsap.to(logoImg, {
    scrollTrigger: {
      trigger: heroSection,
      start: "top top",
      end: "60% center",
      scrub: 1,
      onUpdate: (self) => {
        let progress = self.progress; 
        if (progress > 0.9) {
          logoImg.classList.add('_anim-end');
        } else {
          logoImg.classList.remove('_anim-end');
        }
      },
    },
    width: logoHeaderPosition.width, 
    left: logoHeaderPosition.left,
    top: logoHeaderPosition.top + logoHeaderPosition.height / 2,
    ease: "none",
  });
  // ---------------------------------------------

  // == START HERO ===================================================
  if (startHero.length) {
    gsap.to(startHero, {
      top: "-100%",
      opacity: 0,
      stagger: (index) => index * 0.03,
      scrollTrigger: {
        trigger: heroFirst,
        start: "top top",
        end: "bottom 20%",
        scrub: 1.2,
        // markers: true,
      },
    });
  }

  if (heroSecond) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroSecond,
        start: "top center",
        end: "bottom bottom",
        scrub: 1,
        // markers: true,
      }
    });

    
    tl.to(heroTitleA, {
      y: "0%",
      stagger: 0.08, 
      // duration: 2,
      ease: "power2.out"
    }, "-=0.5")
    tl.to(heroTitleB, {
      y: "0%",
      stagger: 0.08,
      // duration: 2,
      ease: "power2.out"
    }, "-=0.5")
    tl.to(heroTitleC, {
      y: "0%",
      stagger: 0.08,
      // duration: 2,
      ease: "power2.out"
    }, "-=0.5")
    tl.to(heroTitleD, {
      y: "0%",
      stagger: 0.08,
      // duration: 2,
      ease: "power2.out"
    }, "-=0.5")


    gsap.to(heroRight, {
      top: "0%",
      left: "0%",
      ease: "power2.out",
      scrollTrigger: {
        trigger: heroSecond,
        start: "top center",
        end: "120% bottom",
        scrub: 1.2,
        // markers: true,
      },
    });
  }




}

createAnimation();


window.addEventListener('orientationchange', () => {
  createAnimation();
  ScrollTrigger.refresh();
});

let lastWindowWidth = window.innerWidth;
window.addEventListener('resize', () => {
  const currentWindowWidth = window.innerWidth;

  if (currentWindowWidth !== lastWindowWidth) {
    createAnimation();
    ScrollTrigger.refresh();
  }

  lastWindowWidth = currentWindowWidth;
});
