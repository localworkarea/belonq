// Підключення функціоналу "Чертоги Фрілансера"
// import { transform } from "terser-webpack-plugin/types/minify.js";
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

import Lenis from 'lenis'
import SplitType from 'split-type'

 
// == LENIS =================================================
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

// ========================================================

window.addEventListener('DOMContentLoaded', () => {
  
  function updateHeroHeight() {
    const panda = document.querySelector('.hero__panda');
    const hero = document.querySelector('.hero');
  
    if (panda && hero) {
      const pandaHeight = panda.offsetHeight;
      hero.style.setProperty('--img-height', `${pandaHeight}px`);
    }
  }
  
  updateHeroHeight();


  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(ScrollToPlugin);


  // == SplitType ======================================
  function initSplitType() {
    const splitElements = [
      { selector: '.split-lines', options: { types: 'lines' } },
      { selector: '.split-words', options: { types: 'words' }, applyIndex: true },
      { selector: '.split-chars', options: { types: 'chars' }, applyIndex: true },
      { selector: '.split-chars-span', options: { types: 'chars' }, wrapSpan: true },
      { selector: '.split-both', options: { types: 'lines, words' }, applyIndex: true },
      { selector: '.split-words.set-span', wrapWords: true }
    ];

    splitElements.forEach(({ selector, options, applyIndex, wrapSpan, wrapWords }) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        const splitInstance = new SplitType(element, options);

        if (applyIndex) {
          const items = element.querySelectorAll(options.types.includes('words') ? '.word' : '.char');
          items.forEach((item, index) => item.style.setProperty('--index', index));
        }

        if (wrapSpan) {
          splitInstance.chars.forEach(char => {
            char.innerHTML = `<span class="char-span">${char.textContent.trim()}</span>`;
          });
        }

        if (wrapWords) {
          const words = element.querySelectorAll('.word');
          // words.forEach(word => {
          //   word.innerHTML = `<span class="word-span">${word.textContent.trim()}</span>`;
          // });
          words.forEach((word, index) => {
            word.innerHTML = `<span class="word-span" style="--index: ${index}">${word.textContent.trim()}</span>`;
          });
        }
      });
    });
  }

  initSplitType();
  // =============================================
  
  ScrollTrigger.refresh();
  
  let lastWidth = window.innerWidth;
  window.addEventListener('resize', () => {
    const currentWidth = window.innerWidth;
    if (currentWidth !== lastWidth) {
        updateHeroHeight();
        initSplitType();
        createAnimation();
        ScrollTrigger.refresh();
      lastWidth = currentWidth;
    }
  });



  // == GSAP ANIMATIONS ======================================================
  const logoHeader = document.querySelector('.header__logo');
  const logoImg = document.querySelector('.logo__ic');
  const heroSection = document.querySelector('.hero');

  
  const heroSecond = document.querySelector('.hero__second'); 
  const heroRight = document.querySelector('.hero__right');
  const decorLinesClip = document.querySelector('.lines'); 
  const heroTitle = document.querySelector('.title-hero');
  const countHero = document.querySelector('.hero__count');
  
  

  const servicesSection = document.querySelector('.services');
  const servicesBody = document.querySelector('.services__body');
  const servicesItems = document.querySelectorAll('.services__item');
  const itemFirstTxts = document.querySelector('.item-first__txts');
  const navFirstItem = document.querySelectorAll('.nav-first__item');
  const navLinks = document.querySelectorAll('.nav-first__link');
  const navTitle = document.querySelectorAll('.nav-first__title span');

  const itemServices = document.querySelectorAll('.services__item .item-services');

  // PARTNERS ---
  const partnersSection = document.querySelector('.partners');
  const partnersContainer = document.querySelector('.partners__container');
  const partnersTitle = document.querySelector('.partners__title');
  const partnersLists = document.querySelector('.partners__lists');
  const partnersListItems = document.querySelectorAll('.partners__list');
  const advisers = document.querySelector('.advisers');
  const advisersBlock = document.querySelector('.advisers__block');

  // PORTFOLIO ---
  const portfolioSection = document.querySelector('.portfolio');
  const portfolioContainer = document.querySelector('.portfolio__container');


  
  function createAnimation() {



    // === LOGO IMAGE =================================================
    // // 1. устанавливаем начальные значения
    // gsap.set(logoImg, {
    //   top: "50%",
    //   left: "50px",
    //   width: "47%",
    //   // transform: "translate(0%, -50%)"
    // });
    
    // const scrollPosY = window.pageYOffset;
    // window.scrollTo(0, 0);
  
    // function getOffset(el) {
    //   const rect = el.getBoundingClientRect();
    //   return {
    //     top: rect.top + window.pageYOffset,
    //     left: rect.left + window.pageXOffset,
    //     width: rect.width,
    //     height: rect.height
    //   };
    // }
  
    // const logoHeaderPosition = getOffset(logoHeader);
    // window.scrollTo(0, scrollPosY);

    // ScrollTrigger.refresh();
  
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

  
    // // Создаём анимацию с актуальными размерами и положением
    // gsap.to(logoImg, {
    //   scrollTrigger: {
    //     trigger: heroSection,
    //     start: "top top",
    //     end: "55% center",
    //     scrub: 1,
    //     onUpdate: (self) => {
    //       let progress = self.progress; 
    //       if (progress > 0.9) {
    //         logoImg.classList.add('_anim-end');
    //       } else {
    //         logoImg.classList.remove('_anim-end');
    //       }
    //     },
    //   },
    //   width: logoHeaderPosition.width, 
    //   left: logoHeaderPosition.left,
    //   top: logoHeaderPosition.top + logoHeaderPosition.height / 2,
    //   ease: "none",
    // });
    // ---------------------------------------------
  
    // // == START HERO (counter) ===================================================
    // if (startHero.length) {
    //   const tl = gsap.timeline({
    //     scrollTrigger: {
    //       trigger: heroFirst,
    //       start: "top top",
    //       end: "bottom 20%",
    //       scrub: 1,
    //     },
    //   });
      
    //   startHero.forEach((el, index) => {
    //     tl.to(el, {
    //       top: "-100%",
    //       opacity: 0,
    //       duration: 1 / (3 - index), // Уменьшаем длительность для более быстрого элемента
    //     }, 0); // Все анимации стартуют одновременно
    //   });
      
    // }


    gsap.set([navTitle, navFirstItem], { clearProps: "all" }); // для очищения стилей gsap при повороте для элементов, которым не нужно больше


    let mm = gsap.matchMedia();

    mm.add({
      portrait: "(orientation: portrait)",
      landscape: "(orientation: landscape)",
      landscapeMax1366: `(max-width: 85.436em) and (orientation: landscape)`, // 1366.98 and landscape
      maxWidth488: "(max-width: 30.061em)"
    }, (context) => {
    
      let { portrait, landscape, landscapeMax1366, maxWidth488 } = context.conditions;

   
      //-----------------------------------------------------
      // == LANDSCAPE =======================================
      if (landscape) {

        const itemFirstTxt = document.querySelectorAll('.item-first__txt .word .word-span');
        if (itemFirstTxt) {
          gsap.to(itemFirstTxt, {
            y: "0%",
            opacity: 1,
            stagger: (index) => index * 0.05,
            scrollTrigger: {
              trigger: servicesSection,
              start: "top bottom",
              end: "80% bottom",
              scrub: 1,
              // markers: true,
            },
          });
        }

        if (navFirstItem) {
          // const navTitle = document.querySelector('.nav-first__title span');
          gsap.to(navTitle, {
            y: 0,
            scrollTrigger: {
              trigger: servicesSection,
              start: "top 60%",
              end: "top center",
              scrub: 1,
            },
          });
      
          // gsap.to(navFirstItem, {
          //   opacity: 1,
          //   stagger: (index) => index * 0.05,
          //   scrollTrigger: {
          //     trigger: servicesSection,
          //     start: "top 80%",
          //     end: "bottom bottom",
          //     scrub: 1,
          //   },
          // });

          gsap.fromTo(
            navFirstItem,
            { opacity: 0 },
            {
              opacity: 1,
              stagger: (index) => index * 0.05,
              scrollTrigger: {
                trigger: servicesSection,
                start: "top 80%",
                end: "bottom bottom",
                scrub: 1,
              },
            }
          );
          
          
        }

      } // == end landscapre =================================

      //-----------------------------------------------------
      // == PORTRAIT =======================================
      if (portrait) {

        if (itemFirstTxts) {
          gsap.to(itemFirstTxts, {
            opacity: 0,
            left: "-20%",
            scrollTrigger: {
              trigger: heroSection,
              start: "top top",
              end: "bottom 40%",
              scrub: 1,
              // markers:true,
            },
          });
        }
    
      } // == end portrait =================================


      //-----------------------------------------------------
      // == LANDSCAPE MAX-WIDTH 1366px =======================================
      if (landscapeMax1366) {

      }

       //-----------------------------------------------------
      // == MAX-WIDTH 480px =======================================
      if (maxWidth488) {

      }
    
    }); // end match media ----------------------------------------
    // ===================================================================================================

        
    // == TITLE HERO ===================================================
    if (heroTitle) {
      const heroTitleAline = document.querySelectorAll('.title-hero .split-chars');
      const heroTitleA = document.querySelectorAll('.title-hero__a .char');
      const heroTitleB = document.querySelectorAll('.title-hero__b .char');
      const heroTitleC = document.querySelectorAll('.title-hero__c .char');
      const heroTitleD = document.querySelectorAll('.title-hero__d .char');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSection,
          start: "top top",
          // end: "200% bottom",
          end: "+=2000",
          scrub: 1,
          // markers: true,
        }
      });
      
      // tl.to(heroTitleA, {
      //   y: "0%",
      //   stagger: 0.08, 
      //   // duration: 2,
      //   ease: "power2.out"
      // }, "-=0.5")
      // tl.to(heroTitleB, {
      //   y: "0%",
      //   stagger: 0.08,
      //   // duration: 2,
      //   ease: "power2.out"
      // }, "-=0.5")
      // tl.to(heroTitleC, {
      //   y: "0%",
      //   stagger: 0.08,
      //   // duration: 2,
      //   ease: "power2.out"
      // }, "-=0.5")
      // tl.to(heroTitleD, {
      //   y: "0%",
      //   stagger: 0.08,
      //   // duration: 2,
      //   ease: "power2.out"
      // }, "-=0.5")
      tl.to(heroTitleAline, {
        y: "-100%",
        x: "-100%",
        stagger: 0.02, 
        // duration: 2,
        ease: "power2.out"
      }),
      tl.to(heroTitleA, {
        // y: "-100%",
        opacity: "0",
        stagger: 0.01, 
        duration: 0.1,
        ease: "power2.out"
      }, "<"),
      tl.to(heroTitleB, {
        // y: "-100%",
        opacity: "0",
        stagger: 0.01,
        duration: 0.1,
        ease: "power2.out"
      }, "<"),
      tl.to(heroTitleC, {
        // y: "-100%",
        opacity: "0",
        stagger: 0.01,
        duration: 0.1,
        ease: "power2.out"
      }, "<"),
      tl.to(heroTitleD, {
        // y: "-100%",
        opacity: "0",
        stagger: 0.01,
        duration: 0.15,
        ease: "power2.out"
      }, "<")
    }

    // == PANDA OPACITY 0, LINES AND COUNTER ==============
    if (heroRight) {

      gsap.to(heroRight, {
       opacity: 0,
       x: "20%",
       y: "-20%",
       scrollTrigger: {
         trigger: heroSection,
         start: "top top",
         end: "+=1000",
         scrub: 1.2,
         // markers: true,
       },
     });

     // ==  =====================
      const tl4 = gsap.timeline({
        scrollTrigger: {
          trigger: heroSection,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          // markers: true,
        }
      });
      tl4.to(decorLinesClip , {
        left: 0,
      });
      tl4.to(countHero , {
        right: "-20%",
      }, "<");

    }


  
    // == SERVICES ======================================
    if (servicesSection) {

      // == NAVIGATION, SCROLL TO EL
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

              // Сразу скроллим Lenis к нужной позиции
            lenis.scrollTo(targetScrollY, {
              immediate: true, // Перемещение без анимации
            });
              
            // Прокручиваем страницу вертикально
            gsap.to(window, {
              scrollTo: { y: targetScrollY, autoKill: false },
              // duration: 2,
              // ease: "none",
              // ease: "power2.in",

              onStart: () => {
                // Синхронизируем Lenis с GSAP
                lenis.stop();
              },
              onComplete: () => {
                // Перезапускаем Lenis после анимации
                lenis.start();
              },
            });
          }
        });
      });

      // === MOVE HORIZONTAL SCROLL ===============
       let scrollTween = gsap.to(servicesBody, {
        x: () => -(servicesBody.scrollWidth - servicesBody.offsetWidth),
        ease: "none",
        scrollTrigger: {
          id: "servicesTrigger",
          trigger: servicesSection,
          start: "center 45%",
          end: () => `+=${(servicesBody.scrollWidth - servicesBody.offsetWidth) / 1.5}`,
          scrub: 0.5,
          pin: true,
        },
      });

      servicesItems.forEach((servicesItem, index) => {
        const target = itemServices[index];
        if (target) {
          gsap.to(target, {
            keyframes: [
              { scale: 1, ease: "power2.out", duration: 2 },    
              { scale: 0.5, ease: "power2.inOut", duration: 2 } 
              // { height: "100%", ease: "power2.out", duration: 2 },    
              // { height: "40%", ease: "power2.inOut", duration: 2 } 
            ],
            scrollTrigger: {
              trigger: servicesItem,
              containerAnimation: scrollTween,
              start: "50% bottom",
              end: "150% -100%",
              scrub: 0.5,
              id: `item-services-${index}`,
            }
          });
        }
      });

      gsap.to(servicesBody, {
        left: "-60%",
        ease: "none",
        scrollTrigger: {
          trigger: servicesSection,
          start: () => ScrollTrigger.getById("servicesTrigger").end,
          end: () => ScrollTrigger.getById("servicesTrigger").end + 1000, 
          scrub: 1,
        },
      });
    
    } // ---


    // == PARTNERS ======================================
    if (partnersSection) {
   
      gsap.timeline({
        scrollTrigger: {
          trigger: partnersSection,
          start: "10% bottom",
          end: "bottom center",
          scrub: 0.5,
          // markers: true,
        },
      })
      .to(partnersTitle, {
        backgroundSize: "100% 100%",
      })
      .to(partnersTitle, {
        backgroundSize: "100% 0%",
        left: "-20%",
        top: "-20%",
      });


     gsap.timeline({
        scrollTrigger: {
          trigger: partnersSection,
          start: "top bottom",
          end: "200% bottom",
          scrub: 1,
          // markers: true,
        }
      })
      .to(partnersContainer, {
        left: "0%",
        ease: "none",
      })
      .to(partnersContainer, {
        left: "-50%",
        ease: "none",
      });

      gsap.to(partnersLists, {
        top: 0,

        scrollTrigger: {
          trigger: partnersSection,
          start: "top bottom",
          end: "top top",
          scrub: 1,
        },
      });

      gsap.to(partnersListItems, {
        keyframes: [
          { 
            top: 0,
           },    
          { 
            top: "-10%",
            duration: 1,
          } 
        ],
        scrollTrigger: {
          trigger: partnersSection,
          start: "top bottom",
          end: "center center",
          scrub: 1.2,
          // markers: true,
        },
      });

      gsap.to(advisers, {
        y: 0,
        left: 0,
        scrollTrigger: {
          trigger: partnersSection,
          start: "center center",
          end: "bottom 60%",
          scrub: 1,
        },
      });

      gsap.to(advisersBlock, {
        top: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: advisers,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 1,
        },
      });

     




    } // ----

    // == PORTFOLIO ======================================
    if (portfolioSection) {
      gsap.to(portfolioContainer, {
        left: "0%",
        ease: "none",
        scrollTrigger: {
          trigger: portfolioSection,
          start: "top bottom",
          end: "top top",
          scrub: 1,
          // markers: true,
        },
      });
    }



  }
  
  createAnimation();

  
});  


  // // == button scroll-bar ==============
  // document.addEventListener('DOMContentLoaded', () => {
  //   const scrollBtn = document.querySelector('.scroll-btn');
  //   let isDragging = false;
  //   let startY = 0;
  //   let startScrollTop = 0;
  
  //   const onMouseMove = (e) => {
  //     if (!isDragging) return;
  //     const deltaY = e.clientY - startY;
  //     const scrollAmount = deltaY * 2; // Коэффициент увеличения прокрутки
  
  //     // Меняем направление движения, если оно изменилось
  //     if (deltaY > 0) {
  //       if (!scrollBtn.classList.contains('_move-dwn')) {
  //         scrollBtn.classList.add('_move-dwn');
  //         scrollBtn.classList.remove('_move-up');
  //       }
  //     } else {
  //       if (!scrollBtn.classList.contains('_move-up')) {
  //         scrollBtn.classList.add('_move-up');
  //         scrollBtn.classList.remove('_move-dwn');
  //       }
  //     }
  
  //     document.documentElement.scrollTop = startScrollTop + scrollAmount;
  //     scrollBtn.classList.add('_move');
  //   };
  
  //   const onMouseUp = () => {
  //     isDragging = false;
  //     document.removeEventListener('mousemove', onMouseMove);
  //     document.removeEventListener('mouseup', onMouseUp);
  
  //     // Удаляем класс _move, но сохраняем направление
  //     scrollBtn.classList.remove('_dwn', '_move');
  //   };
  
  //   const onMouseDown = (e) => {
  //     isDragging = true;
  //     startY = e.clientY;
  //     startScrollTop = document.documentElement.scrollTop;
  //     document.addEventListener('mousemove', onMouseMove);
  //     document.addEventListener('mouseup', onMouseUp);
  
  //     // Добавляем класс при нажатии
  //     scrollBtn.classList.add('_dwn');
  //   };
  
  //   scrollBtn.addEventListener('mousedown', onMouseDown);
  
  //   // Для touch-событий на мобильных устройствах
  //   const onTouchMove = (e) => {
  //     if (!isDragging) return;
  //     const touchY = e.touches[0].clientY;
  //     const deltaY = touchY - startY;
  //     const scrollAmount = deltaY * 2;
  
  //     // Меняем направление движения, если оно изменилось
  //     if (deltaY > 0) {
  //       if (!scrollBtn.classList.contains('_move-dwn')) {
  //         scrollBtn.classList.add('_move-dwn');
  //         scrollBtn.classList.remove('_move-up');
  //       }
  //     } else {
  //       if (!scrollBtn.classList.contains('_move-up')) {
  //         scrollBtn.classList.add('_move-up');
  //         scrollBtn.classList.remove('_move-dwn');
  //       }
  //     }
  
  //     document.documentElement.scrollTop = startScrollTop + scrollAmount;
  //     scrollBtn.classList.add('_move');
  //   };
  
  //   const onTouchEnd = () => {
  //     isDragging = false;
  //     document.removeEventListener('touchmove', onTouchMove);
  //     document.removeEventListener('touchend', onTouchEnd);
  
  //     // Удаляем класс _move, но сохраняем направление
  //     scrollBtn.classList.remove('_dwn', '_move');
  //   };
  
  //   const onTouchStart = (e) => {
  //     isDragging = true;
  //     startY = e.touches[0].clientY;
  //     startScrollTop = document.documentElement.scrollTop;
  //     document.addEventListener('touchmove', onTouchMove);
  //     document.addEventListener('touchend', onTouchEnd);
  
  //     // Добавляем класс при нажатии
  //     scrollBtn.classList.add('_dwn');
  //   };
  
  //   scrollBtn.addEventListener('touchstart', onTouchStart);
  // });
  



//   import * as THREE from 'three';
//   import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
//   import WebGL from 'three/addons/capabilities/WebGL.js';

//   if (!WebGL.isWebGL2Available()) {
//     document.body.appendChild(WebGL.getWebGL2ErrorMessage());
//     throw new Error('WebGL2 поддержка отсутствует.');
// }

// const canvas = document.querySelector('.elements-3d');
// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// const renderer = new THREE.WebGLRenderer({ canvas });
// renderer.setSize(window.innerWidth, window.innerHeight);

// const light = new THREE.DirectionalLight(0xffffff, 1);
// light.position.set(1, 20, 10.5);
// scene.add(light);

// let model; // Переменная для хранения модели

// const loader = new GLTFLoader();
// loader.load('./files/Chell41.glb', (gltf) => {
//     model = gltf.scene;
//     scene.add(model);
//     model.position.set(0, 0, 0); // Начальная позиция модели
// });

// camera.position.z = 3;

// // Переменные для вращения с помощью мыши
// let isDragging = false;
// let previousMousePosition = { x: 0, y: 0 };

// canvas.addEventListener('mousedown', (event) => {
//     isDragging = true;
//     previousMousePosition = { x: event.clientX, y: event.clientY };
// });

// canvas.addEventListener('mouseup', () => {
//     isDragging = false;
// });

// canvas.addEventListener('mousemove', (event) => {
//     if (!isDragging || !model) return;

//     const deltaX = event.clientX - previousMousePosition.x;
//     const deltaY = event.clientY - previousMousePosition.y;

//     // Поворот модели на основе движения мыши
//     model.rotation.y += deltaX * 0.01; // Ось Y (лево/право)
//     model.rotation.x += deltaY * 0.01; // Ось X (вверх/вниз)

//     previousMousePosition = { x: event.clientX, y: event.clientY };
// });

// // Анимация сцены
// function animate() {
//     requestAnimationFrame(animate);
//     renderer.render(scene, camera);
// }
// animate();

// window.addEventListener('resize', () => {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
// });












  // import { GLTFLoader } from 'https://unpkg.com/three@0.126.0/examples/jsm/loaders/GLTFLoader.js';

// const sizes = {
//     width: window.innerWidth,
//     height: window.innerHeight
// };
// const canvas = document.querySelector('canvas.webgl');

// const scene = new THREE.Scene();

// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
// camera.position.set(4, 1, - 4);
// scene.add(camera);

// const controls = new THREE.OrbitControls(camera, canvas)
// controls.enableDamping = true;

// const renderer = new THREE.WebGLRenderer({
//   canvas: canvas,
//   alpha: true
// });
// renderer.setSize(sizes.width, sizes.height);
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// const ambientLight = new THREE.AmbientLight('#fff');
// scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight('#fff', 1);
// directionalLight.position.set(0.25, 3, -2.25);
// scene.add(directionalLight);

// const gltfLoader = new GLTFLoader();

// gltfLoader.load('https://raw.githubusercontent.com/charl0tee/codepen-assets/master/Strawberries.glb', (gltf) => {
//   gltf.scene.scale.set(5, 5, 5);

//   scene.add(gltf.scene);
// });

// window.addEventListener('resize', () => {
//     // Update sizes
//     sizes.width = window.innerWidth;
//     sizes.height = window.innerHeight;

//     // Update camera
//     camera.aspect = sizes.width / sizes.height;
//     camera.updateProjectionMatrix();

//     // Update renderer
//     renderer.setSize(sizes.width, sizes.height);
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// });

// const tick = () =>
// {
//     // Update controls
//     controls.update();
//     renderer.render(scene, camera);

//     window.requestAnimationFrame(tick);
// }

// tick();