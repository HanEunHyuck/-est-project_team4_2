

export function handleClickSearch() {
    const selectedYear = document.querySelector('.dropdown1 .selected button').textContent.trim();
    const selectedContent = document.querySelector('.dropdown2 .selected button').textContent.trim();
    const titleInput = document.querySelector('#title');
    const title = titleInput.value.trim();
    
    if (!title) {
        alert('검색어를 입력해주세요!');
        return;
    }

    const year = selectedYear === '모든 년도' ? '' : selectedYear;
    
    const queryParams = new URLSearchParams({
        title: title,
        year: year,
        content: selectedContent,
    });

    console.log('쿼리 파라미터:', queryParams.toString());

    // 결과 페이지로 이동
    return window.location.href = `sub/searchResult.html?${queryParams.toString()}`;
}

