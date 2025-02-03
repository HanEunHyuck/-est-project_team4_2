// 포스터롤 고화질로 가져오는 함수
// (단, 고화질이 존재하지 않는다면 저화질을 가져옴)
export const getPosterUrl = async (posterUrl) => {
  // SX1080 버전 URL을 생성함
  const hdPosterUrl = posterUrl.replace("SX300", "SX1080");

  try {
    // SX1080 버전 URL 유효성 검사
    const response = await fetch(hdPosterUrl); 

    // SX1080 URL 있는 경우
    if (response.ok) {
      return hdPosterUrl; 
    }
  } catch (err) {
    console.error(err); // URL 에러
  }

  // SX1080 URL이 없으면 기존 SX300 URL 리턴
  return posterUrl;
};



// Released에서 연도만 가져오는 함수 
export function releasedYear(released) {
  const date = new Date(released); // 날짜 형식으로 변환
  return date.getFullYear(); // 연도만 출력
};