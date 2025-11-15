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

  // ================== 프로모션 swiper =================== //
  const promotionSwiper = new Swiper(".promotion-swiper", {
    loop: true,
    loopedSlides: 2,
    autoHeight: true,
    slidesPerView: "auto",
    spaceBetween: 20,
    centeredSlides: true,
    loopAdditionalSlides: 2,
    autoplay: {
      delay: 2500,
      pauseOnMouseEnter: true,
      disableOnInteraction: false,
    },
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
});
