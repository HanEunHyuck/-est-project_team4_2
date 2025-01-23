let movieData = [];

function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const title = params.get('title') || '';
    const year = params.get('year') || '';
    const content = params.get('content') || '';
    
    return { title, year, content };
}

export async function searchResult() {
    try {
        const res = await fetch("./../src/data/data.json");
        
        if (!res.ok) {
            throw new Error(res.status);
        }
        
        const data = await res.json();
        movieData = data; // 전체 데이터를 전역 변수에 저장
        
        const queryParams = getQueryParams(); // 쿼리스트링 값 가져오기
        const filteredMovies = filterMovies(data, queryParams); // 필터링된 데이터 가져오기
        console.log(filteredMovies);
        
        if (filteredMovies.length === 0) {
            displayNoResults();
        } else {
            sortMoviesByPopularity(filteredMovies); // 정렬
            displayMovies(filteredMovies); // 화면에 표시
        }
    } catch (err) {
        console.error('데이터 로드 실패:', err);
    }
}

// 쿼리스트링 값으로 데이터 필터링
function filterMovies(data, { title, year, content }) {
    return data.filter((movie) => {
        // 각 조건이 존재할 경우 비교 수행
        const matchesTitle = title ? movie.title.includes(title) : true;
        const matchesYear = year ? movie.year === Number(year) : true;
    
        // 모든 조건이 만족될 경우 true 반환
        return matchesTitle && matchesYear;
      });
  }


// 영화 목록 표시
function displayMovies(movies) {
    const movieList = document.getElementById('movie-list');
    movieList.innerHTML = ''; // 기존 목록 초기화

    movies.forEach(movie => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <img class="movie-poster" src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/100x150?text=No+Image'}" alt="${movie.Title} 포스터">
            <div>
                <h3>${movie.Title}</h3>
                <p><strong>년도:</strong> ${movie.Year}</p>
                <p><strong>타입:</strong> ${movie.Type}</p>
                <p><strong>평점:</strong> ${movie.Ratings[0] ? movie.Ratings[0].Value : 'N/A'}</p>
                <a href="https://www.imdb.com/title/${movie.imdbID}" target="_blank">IMDB 링크</a>
            </div>
        `;
        movieList.appendChild(listItem);
    });
}

// 결과 없음 메시지 표시
function displayNoResults() {
    const movieList = document.getElementById('movie-list');
    movieList.innerHTML = '<p>검색 결과가 없습니다.</p>';
}
const queryParams = {
    title: "Transformers",
    year: "2023",
    content: "movie"
};
// 페이지 로드 시 실행
window.onload = function () {
    const filteredMovies = filterMovies(movieData, queryParams);
    searchResult(); // 데이터를 불러오고 필터링하여 표시
};
