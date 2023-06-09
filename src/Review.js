const nickname = document.querySelector(".nickname");
const password = document.querySelector(".password");
const reviewText = document.querySelector(".review-text");
const reviewBtn = document.querySelector(".review-btn");
const reviewList = document.querySelector(".review-list");
const reviewForm = document.querySelector(".review-form");
const reviewWriteBtn = document.querySelector(".review-write-btn");
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

reviewBtn.addEventListener("click", () => {
  if (!nickname.value) return alert("닉네임을 입력해주세요");
  if (!password.value) return alert("비밀번호를 입력해주세요");
  if (!reviewText.value) return alert("내용을 입력해주세요");
  // uuid 사용 선언 (로컬스토리지 키값 고유 id 생성 위해)
  const uuid = self.crypto.randomUUID();
  // 닉네임값 + 랜덤키 생성
  // const reviewId = nickname.value + Math.random().toString().sub(2, 8);

  // localStorage.setItem(reviewId, JSON.stringify(new addReview()));
  localStorage.setItem(uuid, JSON.stringify(new addReview()));
  // 로컬스토리지는 문자열만 받기 때문에 객체로 변환(=JSON.stringfy)

  alert("저장 완료");
  window.location.reload();

  // console.log(new addReview());
});

// console.log(Object.keys(localStorage).map((l) => ({ ...JSON.parse(localStorage.getItem(l)), key: l })));
// 로컬스토리 안에 저장된 리스트값 가져오기 / Object.keys(localStorage)
// 배열은 forEach로 돌릴 수 없기에 새 객체로 반환하는 map 사용 / .map()
// 한국 현재 시간 기준으로 정렬 / sort()

Object.keys(localStorage)
  .map((l) => ({ ...JSON.parse(localStorage.getItem(l)), key: l }))
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .forEach((data) => {
    if (data.movieId === movieId) {
      reviewList.innerHTML += `<div class="list-box">
    <p class="list-text">${data.reviewText}</p>
    <h5 class="list-title">⎯ ${data.nickname}</h5>
    <p class="list-time">작성시간 : ${new Date(data.date).toLocaleString("ko-KR")}</p>
    </div>`;
    }
  });

window.addEventListener("load", () => {
  reviewForm.style.display = "none";
}); // 페이지가 열였을 때 리뷰 폼 숨기기

reviewWriteBtn.addEventListener("click", (event) => {
  event.preventDefault();
  // review-write-btn 버튼 클릭 시 새로고침 막기
  reviewForm.style.display = "block";
  reviewWriteBtn.style.display = "none";
}); // 리뷰 작성 버튼 클릭 시 리뷰 폼이 보이고, 리뷰 작성 버튼은 숨기기

password.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    reviewBtn.click();
  }
});
// password에서 Enter키 클릭 시 reviewBtn 클릭 동작 이벤트
// 엔터키(key code 13)가 입력되었을 경우 reviewBtn 클릭 실행

class addReview {
  constructor() {
    this.movieId = new URLSearchParams(location.search).get("id");
    // 현재 페이지의 url에 있는 파라미터 값(id) 가져오기
    this.nickname = nickname.value;
    this.password = password.value;
    this.reviewText = reviewText.value;
    this.date = new Date();
    // 현재 날짜 및 시간을 한국 기준으로 가져오기
  }
} // class 객체 생성하여 가져가서 쓰기
// class 실행 시 앞에 new를 붙여줘야 함
