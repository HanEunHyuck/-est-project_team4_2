import { dropdown } from "./dropdown.js";

// 검색 필터
// 년도 선택
const years = ["모든 년도", "2023", "2022", "2021", "2020", "직접 입력"];


// 검색 내용 선택
const content = ["제목", "내용"];

window.addEventListener("DOMContentLoaded", () => {
  dropdown("dropdown1", years);
  dropdown("dropdown2", content);
});

const getMovies = async  (title, year = '', page = 1) => {
  const s = `&s=${title}`
  const y = `&y=${year}`
  const p = `&page=${page}`
  try {
    const res = await fetch(`https://omdbapi.com/?apikey=8e5fae38&s=movie`);
    console.log(res);
    
    const json = await res.json();
    if (json.Response === 'True') {
      const { Search: movies, totalResults } = json
      return {
        movies,
        totalResults
      }
    }
    return json.Error
  } catch (error) {
    console.log(error)
  }
}

const result = async () => {
  const data = await getMovies('ironman');  
  console.log(data);
}

result();