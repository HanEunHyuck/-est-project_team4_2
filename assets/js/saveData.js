// 상태 저장
// 상태를 로컬 저장소에 저장
export function saveState(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// 로컬 저장소에서 값 가져오기
export function loadState(key) {
  const savedState = localStorage.getItem(key);
  return savedState ? JSON.parse(savedState) : null;
}
