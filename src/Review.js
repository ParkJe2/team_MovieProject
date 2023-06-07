const reviewForm = document.querySelector(".review-form");
const nickname = document.querySelector(".nickname");
const password = document.querySelector(".password");
const reviewText = document.querySelector(".review-text");
const reviewBtn = document.querySelector(".review-btn");
const reviewList = document.querySelector(".review-list");
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

reviewBtn.addEventListener("click", () => {
  if (!nickname.value) return alert("닉네임을 입력해주세요");
  if (!password.value) return alert("비밀번호를 입력해주세요");
  if (!reviewText.value) return alert("내용을 입력해주세요");
  // uuid 사용 선언 (로컬스토리지 키값 고유 id 생성 위해)
  const uuid = self.crypto.randomUUID();

  localStorage.setItem(uuid, JSON.stringify(new addReview()));
  // 로컬스토리지는 문자열만 받기 때문에 객체로 변환(=JSON.stringfy)

  alert("저장 완료");
  window.location.reload();

  // console.log(new addReview());
});

class addReview {
  constructor() {
    this.movieId = new URLSearchParams(location.search).get("id");
    // 현재 페이지의 url에 있는 파라미터 값(id) 가져오기
    this.nickname = nickname.value;
    this.password = password.value;
    this.reviewText = reviewText.value;
    this.date = new Date().toLocaleString("ko-KR");
    // 현재 날짜 및 시간을 한국 기준으로 가져오기
  }
} // class 객체 생성하여 가져가서 쓰기
// class 실행 시 앞에 new를 붙여줘야 함

// console.log(JSON.parse(localStorage.getItem("83fbe2cf-85f2-4feb-8b28-0adc5c56ac36")));
// console.log(new URLSearchParams(location.search).get("id"));

const datas = Object.keys(localStorage);
// 로컬스토리지 안에 저장되어 있는 리스트 불러오기

datas.forEach((x) => {
  const data = JSON.parse(localStorage.getItem(x));

  if (data.movieId === movieId) {
    reviewList.innerHTML += `<div class="list-box">
    <h5 class="list-title">작성자 : ${data.nickname}</h5>
    <p class="list-text">작성 내용 : ${data.reviewText}</p>
    <p class="list-text">작성시간 : ${data.date}</p>
    </div>`;
  }
});
