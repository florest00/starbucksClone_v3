document.addEventListener("DOMContentLoaded", () => {
  const animatedItems = document.querySelectorAll(".animate-on-scroll");
  const gnbItems = document.querySelectorAll(".gnb > ul > li");
  const lnbWrap = document.querySelector(".lnb-wrap");
  const lnbs = document.querySelectorAll(".lnb");
  let closeTimeout = null;
  let activeMenu = null;

  if ("IntersectionObserver" in window) {
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
        root: null,
        rootMargin: "0px 0px -20% 0px",
        threshold: 0,
      }
    );

    animatedItems.forEach((it) => observer.observe(it));
  } else {
    const check = () => {
      const vh = window.innerHeight;
      animatedItems.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const inView = rect.top < vh * 0.85 && rect.bottom > vh * 0.1;
        if (inView) {
          el.classList.remove("active");
          void el.offsetWidth;
          el.classList.add("active");
        } else {
          el.classList.remove("active");
        }
      });
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
  }

  // / 스크롤 감지 애니메이션

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

  // ================== 프로모션 swiper =================== //
  const promotionSwiper = new Swiper(".promotion-swiper", {
    loop: true,
    autoHeight: true,
    slidePerView: 2,
    spaceBetween: 10,
    centeredSlides: true,
    // autoplay: {
    //   delay: 2500,
    //   pauseOnMouseEnter: true,
    //   disableOnInteraction: false,
    // },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
  /*=============== 프로모션 토글 ===============*/
  const promoBtn = document.querySelector(".notice-right > a");
  const promoIcon = promoBtn.querySelector("span");
  const promotion = document.querySelector(".promotion");

  promoBtn.addEventListener("click", (e) => {
    e.preventDefault();

    // 토글 상태 전환
    promoIcon.classList.toggle("active");
    promotion.classList.toggle("active");
  });

  // ======== promotion slider ======== //
  // const slidesContainer = document.querySelector(".slides");
  // let slides = document.querySelectorAll(".slide");
  // let currentIndex = 0;

  // // 무한 루프를 위해 슬라이드 복제
  // slides.forEach((slide) => slidesContainer.appendChild(slide.cloneNode(true)));
  // slides = document.querySelectorAll(".slide"); // 복제 후 다시 선택

  // function updateSlides() {
  //   slides.forEach((slide, i) => {
  //     slide.classList.remove("active");
  //   });

  //   // 중앙 슬라이드
  //   const centerIndex = currentIndex % slides.length;
  //   slides[centerIndex].classList.add("active");

  //   // transform: slides 이동
  //   const slideWidth = slides[0].offsetWidth + 20; // margin 포함
  //   const centerOffset = (slidesContainer.offsetWidth - slideWidth) / 2;
  //   const translateX = -(currentIndex * slideWidth - centerOffset);
  //   slidesContainer.style.transform = `translateX(${translateX}px)`;
  // }

  // function nextSlide() {
  //   currentIndex++;
  //   updateSlides();
  // }

  // // 자동 재생
  // setInterval(nextSlide, 3000);

  // // 초기 실행
  // updateSlides();

  //==================== old slide

  // const slides = document.querySelector(".slides");
  // const slideCount = document.querySelectorAll(".slide").length;
  // const dotsContainer = document.querySelector(".dots");
  // const pauseBtn = document.getElementById("pause-btn");
  // let currentIndex = 0;
  // let isPlaying = true;
  // let interval;

  // for (let i = 0; i < slideCount; i++) {
  //   const dot = document.createElement("button");
  //   if (i === 0) dot.classList.add("active");
  //   dot.addEventListener("click", () => goToSlide(i));
  //   dotsContainer.appendChild(dot);
  // }
  // const dots = document.querySelectorAll(".dots button");

  // function goToSlide(index) {
  //   currentIndex = index;

  //   const slideWidth = document.querySelector(".slide").offsetWidth + 20; // margin 포함
  //   const centerOffset = (slides.offsetWidth - slideWidth) / 2; // 중앙 위치 계산
  //   const translateX = -(index * slideWidth - centerOffset);

  //   slides.style.transform = `translateX(${translateX}px)`;

  //   // dot 상태 갱신
  //   dots.forEach((dot, i) => dot.classList.toggle("active", i === index));

  //   // 중앙 슬라이드 강조
  //   document.querySelectorAll(".slide").forEach((slide, i) => {
  //     slide.classList.toggle("active", i === index);
  //   });
  // }

  // function startAutoSlide() {
  //   interval = setInterval(() => {
  //     currentIndex = (currentIndex + 1) % slideCount;
  //     goToSlide(currentIndex);
  //   }, 3000);
  // }

  // function stopAutoSlide() {
  //   clearInterval(interval);
  // }

  // pauseBtn.addEventListener("click", () => {
  //   isPlaying = !isPlaying;
  //   pauseBtn.textContent = isPlaying ? "⏸" : "▶";
  //   isPlaying ? startAutoSlide() : stopAutoSlide();
  // });

  // startAutoSlide();
});
