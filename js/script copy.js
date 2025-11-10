document.addEventListener("DOMContentLoaded", () => {
  const gnbItems = document.querySelectorAll(".gnb > ul > li");
  const lnbWrap = document.querySelector("lnb-wrap");
  const lnbs = document.querySelectorAll(".lnb");

  gnbItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      const target = item.dataset.menu;
      console.log(target);

      lnbWrap.classList.add("active");

      lnbs.forEach((lnb) => {
        if (lnb.dataset.menu === target) {
          lnb.classList.add("active");
        } else {
          lnb.classList.remove("active");
        }
      });
    });
  });
  // const gnbItems = document.querySelectorAll(".gnb > ul > li");
  // const lnbWrap = document.querySelector(".lnb-wrap");
  // const lnbs = document.querySelectorAll(".lnb");

  // let closeTimeout = null; // 닫힘 타이머
  // let activeMenu = null; // 현재 열려있는 메뉴

  // gnbItems.forEach((item) => {
  //   item.addEventListener("mouseenter", () => {
  //     const target = item.dataset.menu;

  //     // 닫힘 예약이 걸려있으면 취소 (빠르게 옮길 때 닫히지 않게)
  //     if (closeTimeout) {
  //       clearTimeout(closeTimeout);
  //       closeTimeout = null;
  //     }

  //     // 이미 다른 메뉴가 열려있다면 애니메이션이 자연스럽게 이어지게
  //     if (activeMenu !== target) {
  //       // 다른 LNB 닫고
  //       lnbs.forEach((lnb) => {
  //         lnb.classList.remove("active");
  //       });

  //       // 현재 LNB만 열기
  //       const currentLnb = document.querySelector(
  //         `.lnb[data-menu="${target}"]`
  //       );
  //       if (currentLnb) currentLnb.classList.add("active");

  //       // 전체 래퍼 열기
  //       lnbWrap.classList.add("active");
  //       activeMenu = target;
  //     }
  //   });

  //   item.addEventListener("mouseleave", (e) => {
  //     const to = e.relatedTarget;

  //     // 이동한 곳이 다른 gnb li나 lnb 내부라면 닫지 않음
  //     if (to && (to.closest(".gnb > ul > li") || to.closest(".lnb-wrap")))
  //       return;

  //     // 닫힘 예약 (스타벅스처럼 약간의 지연 후 닫힘)
  //     closeTimeout = setTimeout(() => {
  //       lnbWrap.classList.remove("active");
  //       lnbs.forEach((lnb) => lnb.classList.remove("active"));
  //       activeMenu = null;
  //     }, 300); // ← 이 delay가 스타벅스의 “자연스러움 포인트”
  //   });
  // });

  // // LNB 영역 벗어날 때도 동일한 닫힘 타이밍 적용
  // lnbWrap.addEventListener("mouseleave", () => {
  //   closeTimeout = setTimeout(() => {
  //     lnbWrap.classList.remove("active");
  //     lnbs.forEach((lnb) => lnb.classList.remove("active"));
  //     activeMenu = null;
  //   }, 300);
  // });

  // // 다시 lnbWrap에 마우스가 들어오면 닫힘 취소
  // lnbWrap.addEventListener("mouseenter", () => {
  //   if (closeTimeout) {
  //     clearTimeout(closeTimeout);
  //     closeTimeout = null;
  //   }
  // });

  // swiper
  const slides = document.querySelector(".slides");
  const slideCount = document.querySelectorAll(".slide").length;
  const dotsContainer = document.querySelector(".dots");
  const pauseBtn = document.getElementById("pause-btn");
  let currentIndex = 0;
  let isPlaying = true;
  let interval;

  //dot 생성
  for (let i = 0; i < slideCount; i++) {
    const dot = document.createElement("button");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }
  const dots = document.querySelectorAll(".dots button");

  function goToSlide(index) {
    currentIndex = index;
    slides.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
  }

  function startAutoSlide() {
    interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % slideCount;
      goToSlide(currentIndex);
    }, 3000);
  }

  function stopAutoSlide() {
    clearInterval(interval);
  }

  pauseBtn.addEventListener("click", () => {
    isPlaying = !isPlaying;
    pauseBtn.textContent = isPlaying ? "⏸" : "▶";
    isPlaying ? startAutoSlide() : stopAutoSlide();
  });

  startAutoSlide();

  // 공지사항 swiper
  const noticeList = document.querySelector(".notice-list");
  const notices = document.querySelectorAll(".notice-list p");
  const noticeCount = notices.length;
  // let currentIndex = 0;
  // let interval;
  let noticeIndex = 0;
  let noticeInterval;

  // 첫 번째 문구가 보이도록 설정
  function showNotice(index) {
    const offset = -index * 24;
    noticeList.style.transform = `translateY(${offset}px)`;
  }

  //자동 슬라이드
  function startNoticeSlide() {
    noticeInterval = setInterval(() => {
      noticeIndex = (noticeIndex + 1) % noticeCount;
      showNotice(noticeIndex);
    }, 2500);
  }

  function stopNoticeSlide() {
    clearInterval(noticeInterval);
  }

  // hover 시 일시정지
  noticeList.addEventListener("mouseenter", stopNoticeSlide);
  noticeList.addEventListener("mouseleave", startNoticeSlide);

  //초기 실행
  startNoticeSlide();
});
