document.addEventListener("DOMContentLoaded", () => {
  // --- 공지사항 토글 ---
  const noticeBtn = document.getElementById("notice-btn");
  const noticeContent = document.querySelector(".notice-content");
  const arrow = document.querySelector(".arrow");

  noticeBtn.addEventListener("click", () => {
    const open = noticeContent.style.display === "block";
    noticeContent.style.display = open ? "none" : "block";
    arrow.style.transform = open ? "rotate(0deg)" : "rotate(180deg)";
  });

  // --- 슬라이드 ---
  const slides = document.querySelector(".slides");
  const slideCount = document.querySelectorAll(".slide").length;
  const dotsContainer = document.querySelector(".dots");
  const pauseBtn = document.getElementById("pause-btn");
  let currentIndex = 0;
  let isPlaying = true;
  let interval;

  // dot 생성
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
});
