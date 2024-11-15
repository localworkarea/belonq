// Підключення функціоналу "Чертоги Фрілансера"
// import { transform } from "terser-webpack-plugin/types/minify.js";
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

import Lenis from 'lenis'

import SplitType from 'split-type'



 // == SPLIT TYPE =========================================================
 const splitTextLines = document.querySelectorAll('.split-lines');
 const splitTextWords = document.querySelectorAll('.split-words');
 const splitTextChars = document.querySelectorAll('.split-chars');
 const splitTextCharsSpan = document.querySelectorAll('.split-chars-span');
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


   if (splitTextCharsSpan.length > 0) {
    splitTextCharsSpan.forEach(elementSpan => {
        const splitInstance = new SplitType(elementSpan, { types: 'chars' });
        splitInstance.chars.forEach((char, index) => {
            const textContent = char.textContent.trim(); 
            char.innerHTML = `<span class="char-span">${textContent}</span>`;
            // char.style.setProperty('--index', index); // Устанавливаем CSS-переменную --index
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
 
//  let lastWidth = window.innerWidth;
//  const resizeObserver = new ResizeObserver(entries => {
//      requestAnimationFrame(() => {
//          entries.forEach(entry => {
//              const currentWidth = entry.contentRect.width;
//              // Запускаем initSplitType() только если изменилась ширина
//              if (currentWidth !== lastWidth) {
//                  initSplitType();
//                  lastWidth = currentWidth; // Обновляем lastWidth
//              }
//          });
//      });
//  });
//  // Наблюдаем за изменениями в элементе body
//  resizeObserver.observe(document.body);
 
 // =======================================================================

 

// === ПЛАВНАЯ ПРОКРУТКА ЧЕРЕЗ LENIS =============================
const lenis = new Lenis({
  smooth: true,          // Включает плавный скролл
  smoothTouch: true,     // Включает плавный скролл на мобильных устройствах
  lerp: 0.05,             // Определяет инерцию (чем ближе к 1, тем медленнее скролл)
  // direction: 'vertical', // Задаёт направление скролла: 'vertical' или 'horizontal'
  mouseMultiplier: 3,    // Чувствительность прокрутки мыши (увеличивайте, чтобы сделать скролл быстрее)
})
  
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time)=>{
  lenis.raf(time * 1000)
})
gsap.ticker.lagSmoothing(0)






window.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(ScrollToPlugin);

  // == GSAP ANIMATIONS ======================================================
  const logoHeader = document.querySelector('.header__logo');
  const logoImg = document.querySelector('.logo__ic');
  const heroSection = document.querySelector('.hero');
  
  const startHero = Array.from(document.querySelectorAll('.start-hero__item'));
  const heroFirst = document.querySelector('.hero__first');
  
  const heroSecond = document.querySelector('.hero__second'); 
  
  const heroTitle = document.querySelector('.title-hero');
  
  const heroRight = document.querySelector('.hero__right');
  const heroTitleA = document.querySelectorAll('.title-hero__a .char');
  const heroTitleB = document.querySelectorAll('.title-hero__b .char');
  const heroTitleC = document.querySelectorAll('.title-hero__c .char');
  const heroTitleD = document.querySelectorAll('.title-hero__d .char');

  const servicesSection = document.querySelector('.services');
  const servicesBody = document.querySelector('.services__body');
  const itemFirstTxt = document.querySelectorAll('.item-first__txt .word .word-span');
  const servicesItems = document.querySelectorAll('.services__item');
  const navLinks = document.querySelectorAll('.nav-first__link');

  
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

    ScrollTrigger.refresh();
  
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  
    // Создаём анимацию с актуальными размерами и положением
    gsap.to(logoImg, {
      scrollTrigger: {
        trigger: heroSection,
        start: "top top",
        end: "55% center",
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
  
    // == TITLE HERO ===================================================
    if (heroSecond) {
    const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSecond,
          start: "top center",
          end: "140% bottom",
          scrub: 1.2,
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

      tl.to(heroTitleA, {
        // y: "-100%",
        opacity: "0",
        stagger: 0.05, 
        // duration: 2,
        ease: "power2.out"
      })
      tl.to(heroTitleB, {
        // y: "-100%",
        opacity: "0",
        stagger: 0.05,
        // duration: 2,
        ease: "power2.out"
      }, "-=0.5")
      tl.to(heroTitleC, {
        // y: "-100%",
        opacity: "0",
        stagger: 0.05,
        // duration: 2,
        ease: "power2.out"
      }, "-=0.5")
      tl.to(heroTitleD, {
        // y: "-100%",
        opacity: "0",
        stagger: 0.05,
        // duration: 2,
        ease: "power2.out"
      }, "-=0.5")
  
  
      // == PANDA HERO =========
      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: heroSecond,
          start: "top center",
          end: "bottom bottom",
          scrub: 1.2,
          // markers: true,
        },
      });
      tl2.to(heroRight, {
        top: "0%",
        left: "0%",
        ease: "power2.out",
      });

    }
  
    // == SERVICES ======================================
    if (servicesSection) {
      gsap.to(itemFirstTxt, {
        y: "0%",
        opacity: 1,
        stagger: (index) => index * 0.05,
        scrollTrigger: {
          trigger: servicesSection,
          start: "top 60%",
          end: "80% bottom",
          scrub: 1,
          // markers: true,
        },
      });

      gsap.to(heroRight, {
        opacity: 0,
        scrollTrigger: {
          trigger: servicesSection,
          start: "top 20%",
          end: "bottom bottom",
          scrub: 1.2,
          // markers: true,
        },
      });

      navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
          event.preventDefault();
      
          const targetId = link.getAttribute('data-target');
          const targetElement = document.getElementById(targetId);
      
          if (targetElement) {
            // Определяем ширину контейнера и элемента
            const targetWidth = targetElement.offsetWidth;
            const containerWidth = servicesBody.offsetWidth;
      
            // Определяем горизонтальную позицию, чтобы правый край элемента совпал с правым краем экрана
            const offsetLeft = targetElement.offsetLeft;
            const targetX = offsetLeft + targetWidth - containerWidth;
      
            // Рассчитываем прогресс ScrollTrigger на основе текущего смещения
            const totalScrollableWidth = servicesBody.scrollWidth - servicesBody.offsetWidth;
            const scrollTriggerProgress = targetX / totalScrollableWidth;
      
            // Определяем необходимую вертикальную позицию документа
            const scrollTriggerInstance = ScrollTrigger.getById("servicesTrigger");
            const totalScrollableHeight = scrollTriggerInstance.end - scrollTriggerInstance.start;
            const targetScrollY = scrollTriggerInstance.start + scrollTriggerProgress * totalScrollableHeight;
      
            // Прокручиваем страницу вертикально
            gsap.to(window, {
              scrollTo: { y: targetScrollY },
              duration: 1,
              ease: "none",
            });
          }
        });
      });
      gsap.to(servicesBody, {
        x: () => -(servicesBody.scrollWidth - servicesBody.offsetWidth), // Прокрутить до конца вправо
         ease: "none",
        scrollTrigger: {
          id: "servicesTrigger",
          trigger: servicesSection,
          start: "top 10%",
          end: () => `+=${(servicesBody.scrollWidth - servicesBody.offsetWidth) / 3}`, // Анимация заканчивается в зависимости от ширины
          scrub: 0.5,
          pin: true,
          // markers: true,
        },
      });


    }
 
  
  }
  
  createAnimation();

  // window.addEventListener('orientationchange', () => {
  //   createAnimation();
  //   // location.reload();
  //   // ScrollTrigger.refresh();
  // });
  
  // let lastWindowWidth = window.innerWidth;
  // window.addEventListener('resize', () => {
  // const currentWindowWidth = window.innerWidth;
  
  // if (currentWindowWidth !== lastWindowWidth) {
  //     createAnimation();
  //     // location.reload();
  //     // ScrollTrigger.refresh();
  // }
  // lastWindowWidth = currentWindowWidth;
  // });

  
});  



window.addEventListener('orientationchange', () => {
  // createAnimation();
  location.reload();
  // ScrollTrigger.refresh();
});

let lastWindowWidth = window.innerWidth;
window.addEventListener('resize', () => {
const currentWindowWidth = window.innerWidth;

if (currentWindowWidth !== lastWindowWidth) {
    // createAnimation();
    location.reload();
    // ScrollTrigger.refresh();
}
lastWindowWidth = currentWindowWidth;
});
