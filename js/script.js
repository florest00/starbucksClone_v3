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

  /* =============== 모바일 헤더 =================== */
  // .header-mob-right ul li.header-mob04 a (햄버거 메뉴 아이콘)를 누르면 gnb 가 열림
  // btn-gnb-close 룰 누르면 버튼이 회전하면서 gnb 가 닫힘
  const mobGnb = document.querySelector(".header-mob-gnb");
  const mobDim = document.querySelector(".header-mob-dim");
  const hamburger = document.querySelector(
    ".header-mob-right ul li.header-mob04 a"
  );
  const btnClose = document.querySelector(".btn-gnb-close");
  // const arrowDown = document.querySelector(".mob-gnb-arrow-down");
  // const gnbMenusLi = document.querySelector(".mob-gnb-menus ul li");

  hamburger.addEventListener("click", (e) => {
    e.preventDefault();

    // 토글
    mobGnb.classList.add("active");
    mobDim.classList.add("active");
  });

  btnClose.addEventListener("click", (e) => {
    e.preventDefault();

    //회전
    // btnClose.classList.add("active");
    // 토글
    mobGnb.classList.remove("active");
    mobDim.classList.remove("active");

    setTimeout(() => {
      btnClose.classList.remove("active");
    }, 600);
  });

  mobDim.addEventListener("click", (e) => {
    e.preventDefault();
    // 토글
    mobGnb.classList.remove("active");
    mobDim.classList.remove("active");
  });

  // gnbMenusLi.addEventListener("click", (e) => {
  //   e.preventDefault();
  //   arrowDown.classList.toggle("active");
  //   gnbMenusLi.classList.toggle("active");
  // });
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
});
