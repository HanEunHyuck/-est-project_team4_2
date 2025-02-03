// 헤더 이벤트
export function headerEvent() {
  window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    if (window.scrollY > 0) {
      header.classList.remove("bg-opacity-0");
    } else {
      header.classList.add("bg-opacity-0");
    }
  });
}
