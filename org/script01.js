document.addEventListener("DOMContentLoaded", () => {
  // .header-web .gnb 호버했을 때 lnb-wrap 열리게
  const gnbItems = document.querySelectorAll(".gnb > ul > li");
  const lnbWrap = document.querySelector(".lnb-wrap");
  const lnbs = document.querySelectorAll(".lnb");

  gnbItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      const target = item.dataset.menu;

      lnbs.forEach((lnb) => {
        lnb.classList.remove("active");
        if (lnb.dataset.menu === target) {
          lnb.classList.add("active");
        }
      });

      lnbWrap.classList.add("active");
    });
  });

  lnbWrap.addEventListener("mouseleave", () => {
    lnbWrap.classList.remove("active");
  });
});
