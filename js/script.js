document.addEventListener("DOMContentLoaded", () => {
  const gnbItems = document.querySelectorAll(".gnb > ul > li");
  const lnbWrap = document.querySelector(".lnb-wrap");
  const lnbs = document.querySelectorAll(".lnb");

  let closeTimeout = null; // 닫힘 타이머
  let activeMenu = null; // 현재 열려있는 메뉴

  gnbItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      const target = item.dataset.menu;

      // 닫힘 예약이 걸려있으면 취소 (빠르게 옮길 때 닫히지 않게)
      if (closeTimeout) {
        clearTimeout(closeTimeout);
        closeTimeout = null;
      }

      // 이미 다른 메뉴가 열려있다면 애니메이션이 자연스럽게 이어지게
      if (activeMenu !== target) {
        // 다른 LNB 닫고
        lnbs.forEach((lnb) => {
          lnb.classList.remove("active");
        });

        // 현재 LNB만 열기
        const currentLnb = document.querySelector(
          `.lnb[data-menu="${target}"]`
        );
        if (currentLnb) currentLnb.classList.add("active");

        // 전체 래퍼 열기
        lnbWrap.classList.add("active");
        activeMenu = target;
      }
    });

    item.addEventListener("mouseleave", (e) => {
      const to = e.relatedTarget;

      // 이동한 곳이 다른 gnb li나 lnb 내부라면 닫지 않음
      if (to && (to.closest(".gnb > ul > li") || to.closest(".lnb-wrap")))
        return;

      // 닫힘 예약 (스타벅스처럼 약간의 지연 후 닫힘)
      closeTimeout = setTimeout(() => {
        lnbWrap.classList.remove("active");
        lnbs.forEach((lnb) => lnb.classList.remove("active"));
        activeMenu = null;
      }, 300); // ← 이 delay가 스타벅스의 “자연스러움 포인트”
    });
  });

  // LNB 영역 벗어날 때도 동일한 닫힘 타이밍 적용
  lnbWrap.addEventListener("mouseleave", () => {
    closeTimeout = setTimeout(() => {
      lnbWrap.classList.remove("active");
      lnbs.forEach((lnb) => lnb.classList.remove("active"));
      activeMenu = null;
    }, 300);
  });

  // 다시 lnbWrap에 마우스가 들어오면 닫힘 취소
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

  // 끄앙 자바스크립트 어렵다 잘하고 싶다 ㅠㅠ
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
