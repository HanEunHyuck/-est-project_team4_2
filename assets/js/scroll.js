// 최상단 이동
export const scrollToTop = () => {
  const topButton = document.querySelector(".top-button");

  if (!topButton) return;

  topButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
};
