import { loadState } from "./saveData.js";
import { movieDetail } from "./movieDetail.js";
import { loading } from "./loading.js";
import { scrollToTop } from "./scroll.js";

let updatedId = loadState("updatedId");

loading();
scrollToTop();
movieDetail(updatedId);