// 포스터롤 고화질로 가져오는 함수

// (단, 고화질이 존재하지 않는다면 저화질을 가져온다)
// ▼ ▼ ▼ ▼ ▼
// (1) sx300를 sx1080으로 대체(replace)한 링크 생성
// (2) 해당 링크가 존재하는지 확인(유효성검사......)
// (3) 존재한다면 대체하고, 아닐 경우 기존 url을 리턴
// + 전체검색에선 포스터가 없을 경우 대체이미지 조건 추가해야 함
export const getPosterUrl = async (posterUrl) => {
  // SX1080 버전 URL을 생성함
  const hdPosterUrl = posterUrl.replace("SX300", "SX1080");

  try {
    // SX1080 버전 URL 유효성 검사
    // 콘솔창에 404 에러가 뜨는 것 같음......
    const response = await fetch(hdPosterUrl); 

    // SX1080 URL 있음!
    if (response.ok) {
      return hdPosterUrl; 
    }
  } catch (err) {
    console.error(err); // URL 에러
  }

  // SX1080 URL이 없으면 기존 SX300 URL 리턴
  return posterUrl;
};


// 개봉연도(Year)와 개봉일(Released)의 연도가 불일치하는 경우가 있음 
// (개봉연도는 제작국가, 개봉일은 API제작국가 기준인 듯함...)
// → Released 기준으로 연도만 뽑아오기로 함
// → 이렇게 하면 Year에 하이픈 껴있는 데이터도 신경 안 써도 됨
// ▼ ▼ ▼ ▼ ▼ 
// Year 대신 Released에서 연도만 가져오는 함수 
export function releasedYear(released) {
  const date = new Date(released); // 날짜 형식으로 변환
  return date.getFullYear(); // 연도만 출력
};