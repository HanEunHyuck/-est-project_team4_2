import { dropdown } from "./dropdown.js";
import { loadMainSwiper } from "./mainSwiper.js";
import { setSwiper } from "./setSwiper.js";
import { searchEvent } from "./searchEvent.js";

 // 드롭다운
dropdown("dropdown1", "years");

// 스와이퍼
loadMainSwiper(); // 메인
setSwiper("rates"); // 평점순
setSwiper("latest"); // 최신개봉

// 검색
searchEvent();