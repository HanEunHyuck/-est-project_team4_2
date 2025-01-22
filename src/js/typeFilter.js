// 데이터 골라내기 → "Type" : "series"
export async function loadSeries() {
  try {
    // JSON 데이터 가져오기
    const response = await fetch("../src/data/data.json");
    const data = await response.json();

    // "Type" : "series" 데이터 필터링
    const filterData = data.filter(item => item.Type === "series");

    // series 중 무작위 2개 선택
    const randomData = filterData.sort(function() {
        return Math.random() - 0.5;
    });
    // console.log("Randomly sorted data:", randomData);
    const selectedData = randomData.slice(0, 2);
    // console.log("Selected data:", selectedData); 

    // 데이터를 series-wrapper에 뿌려주기
    const seriesWrapper = document.querySelector(".series-wrapper");

    selectedData.forEach((item) => {
      const seriesEl = document.createElement("div");
      seriesEl.classList.add("series-item");
      // Poster 빈값이면 대체이미지 쓰기 (img.png 경로 바꿀 것)
      const posterSrc = item.Poster === "N/A" || !item.Poster ? "img.png" : item.Poster;
      seriesEl.innerHTML = `
          <img src="${posterSrc}" alt="${item.Title}">
      `;

      seriesWrapper.appendChild(seriesEl);
    });

  } catch (err) {
    console.error(err);
  }
}
