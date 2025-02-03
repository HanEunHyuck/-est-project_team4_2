import { saveState, loadState } from "./saveData.js";

// OMDb API 설정
const apiKey = "8e5fae38";
const baseUrl = "https://www.omdbapi.com/";

const searchResult = document.getElementById("search-results");

// API 요청 함수
export async function handleSearch(query, year) {
  if (!searchResult) return;

  try {
    // encodeURIComponent() : 특수문자를 포함한 URL 인코딩 함수
    // 사용자의 검색어를 받아서 인코딩 > API에서 검색된 결과를 받아옴
    let response;
    if (year === "All years" || year === undefined) {
      response = await fetch(`${baseUrl}?apikey=${apiKey}&s=${encodeURIComponent(query)}`);
    } else {
      response = await fetch(`${baseUrl}?apikey=${apiKey}&s=${encodeURIComponent(query)}&y=${year}`);
    }

    const data = await response.json();

    const resultCountEl = document.querySelector(".result-count");
    if (data.Response === "True" && data.Search) {
      // 검색 결과가 있으면
      // 검색 결과 수 출력
      resultCountEl.textContent = `${data.Search.length}`;

      // 데이터 결과 값 출력
      displayResults(data.Search, searchResult);
    } else {
      // 검색 결과가 없으면
      resultCountEl.textContent = "0";
      searchResult.innerHTML = `
      <p class="text-white">No Results<br/> Please Try Again</p>
      `;
    }
    
    // 검색 결과 수
    const inputValue = loadState("inputValue");
    const showInputValue = document.querySelector(".show-input-value");
    showInputValue.innerHTML = `"${inputValue}"`;

  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    searchResult.innerHTML = "<p >Error. Try Again</p>";
  }
}

// 검색 결과 표시 함수
function displayResults(results, searchResults) {
  searchResults.innerHTML = ""; // 기존 결과 초기화

  results.forEach((movie) => {
    const movieWrap = document.createElement("div");
    movieWrap.classList.add("search-result");
    const movieEl = document.createElement("a");
    movieEl.classList.add("group/item");
    movieEl.setAttribute("href", "./info.html");
    movieEl.addEventListener("click", () => {
      saveState("updatedId", movie.imdbID);
    });
    movieEl.innerHTML = `
          <div class="relative mb-5 overflow-hidden">
              <img src="${movie.Poster !== "N/A" ? movie.Poster : "./../assets/images/placeholder_img.png"}" 
                  alt="${movie.Title}" class="w-full aspect-[3/4] object-cover 
                      transition-transform duration-300 group-hover/item:scale-105">
          </div>
          <h3 class="text-2xl text-white mb-4 font-semibold truncate mr-2">${movie.Title}
          <span class="text-xl text-gray62">(${movie.Year})</span></h3>
          `;
    movieWrap.appendChild(movieEl);
    searchResults.appendChild(movieWrap);
  });
}
