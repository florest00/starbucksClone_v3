document.addEventListener("DOMContentLoaded", () => {
  const animatedSections = document.querySelectorAll(".animate-on-scroll");
  const gnbItems = document.querySelectorAll(".gnb > ul > li");
  const lnbWrap = document.querySelector(".lnb-wrap");
  const lnbs = document.querySelectorAll(".lnb");
  let closeTimeout = null;
  let activeMenu = null;

  /* ======== 스크롤 감지 섹션별 애니메이션 재실행 ======== */
  // IntersectionObserver (교차로 관찰자)

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        if (entry.isIntersecting) {
          el.classList.remove("active");
          void el.offsetWidth;
          el.classList.add("active");
        } else {
          el.classList.remove("active");
        }
      });
    },
    {
      // threshold: 0.3,
    }
  );

  animatedSections.forEach((sec) => observer.observe(sec));

  /* ======== header ======== */

  gnbItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      const target = item.dataset.menu;

      if (closeTimeout) {
        clearTimeout(closeTimeout);
        closeTimeout = null;
      }

      if (activeMenu !== target) {
        lnbs.forEach((lnb) => {
          lnb.classList.remove("active");
        });

        const currentLnb = document.querySelector(
          `.lnb[data-menu="${target}"]`
        );
        if (currentLnb) currentLnb.classList.add("active");

        lnbWrap.classList.add("active");
        activeMenu = target;
      }
    });

    item.addEventListener("mouseleave", (e) => {
      const to = e.relatedTarget;

      if (to && (to.closest(".gnb > ul > li") || to.closest(".lnb-wrap")))
        return;

      closeTimeout = setTimeout(() => {
        lnbWrap.classList.remove("active");
        lnbs.forEach((lnb) => lnb.classList.remove("active"));
        activeMenu = null;
      }, 300);
    });
  });

  lnbWrap.addEventListener("mouseleave", () => {
    closeTimeout = setTimeout(() => {
      lnbWrap.classList.remove("active");
      lnbs.forEach((lnb) => lnb.classList.remove("active"));
      activeMenu = null;
    }, 300);
  });

  lnbWrap.addEventListener("mouseenter", () => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      closeTimeout = null;
    }
  });

  // ======== 공지사항 swiper ======== //

  const swiper = new Swiper(".notice-list-swiper", {
    direction: "vertical",
    loop: true,
    slidesPerView: "auto",
    longSwipes: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  });

  // ================== 프로모션 slider =================== //
  const ul = document.querySelector(".promotion-slides");
  const slides = document.querySelectorAll(".promotion-slide");
  const slideWidth2 = slides[0].offsetWidth + 849;
  const dots = document.querySelectorAll(".dot");

  let isMoving = false;
  let autoplay2 = true;
  let intervalId2 = null;

  const observer2 = new MutationObserver(() => {
    slides.forEach((slide, index) => {
      if (slide.classList.contains("active")) {
        dots.forEach((dot) => dot.classList.remove("active"));

        const dotIndex = index % dots.length;

        dots[dotIndex].classList.add("active");
      }
    });
  });

  slides.forEach((slide) => {
    observer2.observe(slide, { attributes: true, attributeFilter: ["class"] });
  });

  function nextSlide() {
    if (isMoving) return;
    isMoving = true;

    ul.style.transition = "transform 1s ease";
    ul.style.transform = `translateX(-${slideWidth2}px)`;

    ul.addEventListener("transitionend", function handler() {
      ul.style.transition = "none";
      ul.style.transform = "translateX(0)";

      ul.appendChild(ul.firstElementChild);

      isMoving = false;
      ul.removeEventListener("transitionend", handler);
      updateActive();
    });
  }

  function prevSlide() {
    if (isMoving) return;
    isMoving = true;

    ul.style.transition = "none";
    ul.insertBefore(ul.lastElementChild, ul.firstElementChild);

    ul.style.transform = `translateX(-${slideWidth2}px)`;

    requestAnimationFrame(() => {
      ul.style.transition = "transform 0.5s ease";
      ul.style.transform = "translateX(0)";
    });

    ul.addEventListener("transitionend", function handler() {
      isMoving = false;
      ul.removeEventListener("transitionend", handler);
      updateActive();
    });
  }

  function updateActive() {
    const all = document.querySelectorAll(".promotion-slide");
    all.forEach((slide) => slide.classList.remove("active"));
    all[1].classList.add("active"); // 가운데 슬라이드 활성화
  }

  document.querySelector(".nextBtn").addEventListener("click", (e) => {
    e.preventDefault();
    nextSlide();
  });
  document.querySelector(".prevBtn").addEventListener("click", () => {
    e.preventDefault();
    prevSlide();
  });

  function startAutoSlide() {
    if (!intervalId2) {
      intervalId2 = setInterval(nextSlide, 3000);
    }
  }

  function stopAutoSlide() {
    clearInterval(intervalId2);
    intervalId2 = null;
  }

  // stop/start 버튼 토글
  const stopBtn = document.querySelector(".controller > a");

  stopBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (autoplay2) {
      stopAutoSlide();
      stopBtn.classList.remove("stop");
      stopBtn.classList.add("start");
    } else {
      startAutoSlide();
      stopBtn.classList.remove("start");
      stopBtn.classList.add("stop");
    }
    autoplay2 = !autoplay2;
  });

  startAutoSlide();

  /*=============== 프로모션 토글 ===============*/

  const promoBtn = document.querySelector(".notice-right > a");
  const promoIcon = promoBtn.querySelector("span");
  const promotion = document.querySelector(".promotion");

  promoBtn.addEventListener("click", (e) => {
    e.preventDefault();

    promoIcon.classList.toggle("active");
    promotion.classList.toggle("active");
  });

  /* =============== 모바일 헤더 =================== */
  const mobGnbMenus = document.querySelector(".mob-gnb-menus");
  const mobGnb = document.querySelector(".header-mob-gnb");
  const mobDim = document.querySelector(".header-mob-dim");
  const hamburger = document.querySelector(
    ".header-mob-right ul li.header-mob04 a"
  );
  const btnClose = document.querySelector(".btn-gnb-close");

  hamburger.addEventListener("click", (e) => {
    e.preventDefault();

    mobGnb.classList.add("active");
    mobDim.classList.add("active");
    mobGnbMenus.classList.add("active");
  });

  btnClose.addEventListener("click", (e) => {
    e.preventDefault();

    mobGnb.classList.remove("active");
    mobDim.classList.remove("active");

    setTimeout(() => {
      btnClose.classList.remove("active");
    }, 600);
  });

  mobDim.addEventListener("click", (e) => {
    e.preventDefault();
    mobGnb.classList.remove("active");
    mobDim.classList.remove("active");
  });

  const toggles = document.querySelectorAll(".mob-gnb-ttl1, .mob-gnb-ttl2");

  toggles.forEach((item) => {
    const arrow = item.querySelector(".mob-gnb-arrow-down");

    item.addEventListener("click", (e) => {
      e.preventDefault();

      arrow.classList.toggle("active");
      let nextEl = item.nextElementSibling;

      while (
        nextEl &&
        !nextEl.classList.contains("mob-gnb-ttl1") &&
        !nextEl.classList.contains("mob-gnb-ttl2")
      ) {
        nextEl.classList.toggle("active");
        nextEl = nextEl.nextElementSibling;
      }
    });
  });

  /* ============= footer mob slider =========== */
  // mob
  const isMobile = window.matchMedia("(max-width: 920px)");
  let sliderInitialized = false;

  let autoSlide = null;
  let isPaused = false;

  let footerSlide;
  let slideItems;
  let currSlide;
  let maxSlide;
  let slideWidth;
  let pauseButton;

  let startElem, endElem;

  function initSlider() {
    if (sliderInitialized) return;
    sliderInitialized = true;

    footerSlide = document.querySelector(".footer-slide");
    const controlWrap = document.querySelector(".footer-slider-controls");
    if (!footerSlide || !controlWrap) return;

    slideWidth = footerSlide.clientWidth;
    slideItems = document.querySelectorAll(".footer-slide-item");
    currSlide = 1;
    maxSlide = slideItems.length;

    // 기존 복제 슬라이드 제거
    startElem?.remove();
    endElem?.remove();

    // 복제 슬라이드 생성
    startElem = document.createElement("div");
    endElem = document.createElement("div");

    const lastSlide = slideItems[slideItems.length - 1];
    lastSlide.classList.forEach((c) => endElem.classList.add(c));
    endElem.innerHTML = lastSlide.innerHTML;

    slideItems[0].before(endElem);
    slideItems[slideItems.length - 1].after(startElem);

    // slideItems 재선택
    slideItems = document.querySelectorAll(".footer-slide-item");

    let offset = slideWidth * currSlide;
    slideItems.forEach((i) => (i.style.left = `${-offset}px`));

    /** ---------------- 이동 함수 ---------------- */
    function nextMove() {
      resetAutoSlide();
      currSlide++;

      if (currSlide <= maxSlide) {
        offset = slideWidth * currSlide;
        slideItems.forEach((i) => (i.style.left = `${-offset}px`));
      } else {
        currSlide = 0;
        offset = slideWidth * currSlide;

        slideItems.forEach((i) => {
          i.style.transition = "0s";
          i.style.left = `${-offset}px`;
        });

        setTimeout(() => {
          currSlide++;
          offset = slideWidth * currSlide;
          slideItems.forEach((i) => {
            i.style.transition = "0.15s";
            i.style.left = `${-offset}px`;
          });
        }, 0);
      }
    }

    function prevMove() {
      resetAutoSlide();
      currSlide--;

      if (currSlide > 0) {
        offset = slideWidth * currSlide;
        slideItems.forEach((i) => (i.style.left = `${-offset}px`));
      } else {
        currSlide = maxSlide + 1;
        offset = slideWidth * currSlide;

        slideItems.forEach((i) => {
          i.style.transition = "0s";
          i.style.left = `${-offset}px`;
        });

        setTimeout(() => {
          currSlide--;
          offset = slideWidth * currSlide;
          slideItems.forEach((i) => {
            i.style.transition = "0.15s";
            i.style.left = `${-offset}px`;
          });
        }, 0);
      }
    }

    /** ---------------- 자동 슬라이드 ---------------- */
    function resetAutoSlide() {
      if (isPaused) return;
      clearInterval(autoSlide);
      autoSlide = setInterval(nextMove, 3000);
    }

    autoSlide = setInterval(nextMove, 3000);

    /** ---------------- 일시정지 버튼 ---------------- */
    controlWrap.innerHTML = `<button class="pause-btn">⏸</button>`;
    pauseButton = document.querySelector(".pause-btn");

    pauseButton.addEventListener("click", () => {
      if (!isPaused) {
        clearInterval(autoSlide);
        pauseButton.innerHTML = "▶";
        isPaused = true;
      } else {
        autoSlide = setInterval(nextMove, 3000);
        pauseButton.innerHTML = "⏸";
        isPaused = false;
      }
    });

    /** ---------------- 스와이프 / 터치 ---------------- */
    let startPoint = 0;
    let endPoint = 0;

    footerSlide.addEventListener("touchstart", (e) => {
      startPoint = e.touches[0].pageX;
    });

    footerSlide.addEventListener("touchend", (e) => {
      endPoint = e.changedTouches[0].pageX;
      if (startPoint < endPoint) prevMove();
      else if (startPoint > endPoint) nextMove();
    });

    /** ---------------- 반응형 ---------------- */
    window.addEventListener("resize", () => {
      slideWidth = footerSlide.clientWidth;
    });
  }

  // PC
  /** ---------------- 슬라이더 제거 ---------------- */
  function destroySlider() {
    if (!sliderInitialized) return;
    sliderInitialized = false;

    clearInterval(autoSlide);

    slideItems?.forEach((i) => (i.style = ""));

    // 복제 슬라이드 제거
    startElem?.remove();
    endElem?.remove();

    // 일시정지 버튼 제거
    pauseButton?.remove();
  }

  /** ---------------- 초기 실행 ---------------- */
  if (isMobile.matches) initSlider();
  else destroySlider();

  /** ---------------- 화면 크기 변경 시 ---------------- */
  isMobile.addEventListener("change", (e) => {
    if (e.matches) initSlider();
    else destroySlider();
  });

  /* ============= footer mob arcodian =========== */
  const footerMenu = document.querySelectorAll(".footer-menu-ttl");

  footerMenu.forEach((menu) => {
    menu.addEventListener("click", (e) => {
      e.preventDefault();

      const arrow = menu.querySelector(".footer-arrow-down");

      const submenu = menu.parentElement.querySelectorAll(
        ".footer-menu-item, .footer-2depth-ttl"
      );

      menu.classList.toggle("active");
      arrow.classList.toggle("rotate");

      submenu.forEach((item) => {
        item.classList.toggle("active");
      });
    });
  });
});
