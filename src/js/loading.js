const loadingEl = document.querySelector(".loading");

export function loading() {
  let num = 0;

  setTimeout(function () {
    const loadingEffect = setInterval(function () {
      if (num < 100) {
        num++;
      } else {
        clearInterval(loadingEffect);
        loadingEl.classList.add("hidden");
      }
      loadingEl.style.opacity = `${scale(num, 0, 100, 1, 0)}`;
    }, 10);
  }, 800);
}
const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};
