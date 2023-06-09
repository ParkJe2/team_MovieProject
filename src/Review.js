const nickname = document.querySelector(".nickname");
const password = document.querySelector(".password");
const reviewText = document.querySelector(".review-text");
const reviewBtn = document.querySelector(".review-btn");
const reviewList = document.querySelector(".review-list");
const reviewForm = document.querySelector(".review-form");
const reviewWriteBtn = document.querySelector(".review-write-btn");
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");
// uuid 사용 선언 (로컬스토리지 고유 id 생성 위해)
const uuId = window.crypto.randomUUID();

// (2) reviewCollection 변수는 로컬스토리지 배열형식으로 가져옴. 로컬스토리지가 비어있으면 빈 배열 할당 [] 
 const reviewCollection = localStorage.getItem('review') ? JSON.parse(localStorage.getItem('review')) : []


// (5) 등록버튼 클릭시 validation 거친 후 addCollection실행
reviewBtn.addEventListener("click", () => {
  if (!nickname.value) return alert("닉네임을 입력해주세요");
  if (!password.value) return alert("비밀번호를 입력해주세요");
  if (!reviewText.value) return alert("내용을 입력해주세요");

let addReviewData = new addReview();
  addCollection(addReviewData)
  // localStorage.setItem("review", JSON.stringify(new addReview()));
  // 로컬스토리지는 문자열만 받기 때문에 객체로 변환(=JSON.stringify)

  alert("저장 완료");
  window.location.reload();

  // console.log(new addReview());
});
//+++++++++++++++++++++++동준+++++++++++++++++++++++++++++++++++++++++++++++++++++++//
<<<<<<< HEAD
// (3) addReview객체를 로컬스토리지에 push하는 함수. addReviewData는 new addReview를 담은 변수
function addCollection(addReviewData) {
  reviewCollection.push(addReviewData)
  localStorage.setItem('review', JSON.stringify(reviewCollection))
}

// (1) 리뷰 댓글 객체로 데이터화
class addReview {
  constructor() {
    this.movieId = new URLSearchParams(location.search).get("id");
    // 현재 페이지의 url에 있는 파라미터 값(id) 가져오기
    this.nickname = nickname.value;
    this.password = password.value;
    this.reviewText = reviewText.value;
    this.date = new Date().toLocaleString("ko-KR");
    this.reviewId = uuId
    // 현재 날짜 및 시간을 한국 기준으로 가져오기
  }
} // class 객체 생성하여 가져가서 쓰기
// class 실행 시 앞에 new를 붙여줘야 함

// (4) 로컬스토리지 데이터 브라우저에 보여주기

 function displayReviews() {
  const sortedReviews = reviewCollection.sort((a,b) => new Date(b.date) - new Date(a.date))
  //console.log("reviewCollection는", reviewCollection)
  sortedReviews.forEach((data) => {
    if (data.movieId === movieId) {
      reviewList.innerHTML = `<div class="list-box">
                                <div class="input-controller">
                                <textarea disabled class="list-text" >${data.reviewText}</textarea>
                                </div>
                                <h5 class="list-title">- ${data.nickname}</h5>
                                <p class="list-time">작성시간 : ${data.date}</p>
                                <div class="delete-update-container">
                                  <i class='fa-solid fa-trash-can deleteBtn' id="${data.reviewId}"></i>
                                  <i class='fa-solid fa-pen-to-square editBtn' id="${data.reviewId}"></i>
                                <div class="update-controller">
                                  <button class='saveBtn updateBtn' id="${data.reviewId}">Save</button>
                                  <button class='cancelBtn updateBtn'>Cancel</button>
                                </div>
                                </div>
                                </div>` + reviewList.innerHTML;
  }
});
activateDeleteReview()
activateEditReview()
activateSaveReview()
activateCancelReview()
}

/*===============================수정삭제 함수=================================*/
//(6) 삭제 버튼
 function activateDeleteReview() {
  let deleteBtn = document.querySelectorAll(".deleteBtn")
  deleteBtn.forEach((toDelete) => {
    toDelete.addEventListener('click', () => { 
      const pw = prompt('비밀번호를 입력하세요')
      reviewCollection.forEach((reviewData) => {
        if (reviewData.reviewId === toDelete.id) {
          //indexOf로 위 if조건을 충족하는 reviewCollection의 인덱스넘버를 가져옴. 왜냐하면 각 댓글의 index와 로컬스토리지 상 index가 다르기 때문.
          let idx = reviewCollection.indexOf(reviewData)
          if (reviewData.password === pw) {
            if(!confirm("정말로 삭제하시겠습니까?")) {
              alert("삭제를 취소했습니다.")
            } else {
              alert("삭제하였습니다.")
              deleteReview(idx)
            }
          } else {
            alert("잘못된 비밀번호입니다.")
          }   
        }        
      })
    })
  })
}
//(6) 삭제 구현 함수
function deleteReview(idx) {
  reviewCollection.splice(idx, 1)
  localStorage.setItem('review', JSON.stringify(reviewCollection))
  window.location.reload()
}

//(7) 수정 버튼
 function activateEditReview() {
  const editBtn = document.querySelectorAll('.editBtn')
  const updateController = document.querySelectorAll('.update-controller')
  const inputs = document.querySelectorAll('.input-controller textarea')
  editBtn.forEach((toEdit, i) => {
    toEdit.addEventListener('click', () => {
      const pw = prompt('비밀번호를 입력하세요')
      reviewCollection.forEach((reviewData) => {
        if (reviewData.reviewId === toEdit.id) {
          if (reviewData.password === pw) {
      updateController[i].style.display = 'block'
      inputs[i].disabled = false;
    } else {
      alert("잘못된 비밀번호입니다.")
    }
    }})
  })
})}

//(8) 수정 저장
 function activateSaveReview() {
  const saveBtn = document.querySelectorAll('.saveBtn')
  
  
  saveBtn.forEach((toSave, i) => {
    toSave.addEventListener('click', () => {
      const inputs = document.querySelectorAll('.input-controller textarea')
      reviewCollection.forEach((saveData) => {
        if (saveData.reviewId === toSave.id) {
        let idx = reviewCollection.indexOf(saveData)
        console.log("인풋이 ", inputs)
        console.log("[idx] ", [idx])
        console.log("i ", i)
        console.log("인풋이[idx] ", inputs[idx])
        console.log("인풋이[i] ", inputs[i])
        updateReview(inputs[i].value, idx)
      }
      })      
    })
  })
}

//(9) 수정 실행 함수
function updateReview(text, idx) {
  reviewCollection[idx].reviewText = text
  localStorage.setItem('review', JSON.stringify(reviewCollection))
  //location.reload()
}

//(10) 취소 버튼
 function activateCancelReview() {
  const cancelBtn = document.querySelectorAll('.cancelBtn')
  const updateController= document.querySelectorAll('.update-controller')
  const inputs = document.querySelectorAll('.input-controller textarea')
  cancelBtn.forEach((toCancel, idx) => {
    toCancel.addEventListener('click', () => {
      updateController[idx].style.display = 'none'
      inputs[idx].disabled = true
      location.reload()
    })
  })
}
/*===============================수정삭제 함수=================================*/

window.addEventListener("load", () => {
  // 페이지가 열였을 때 리뷰 폼 숨기기
  reviewForm.style.display = "none";


  displayReviews();
});

//++++++++++++++++++++++++++++++제이님++++++++++++++++++++++++++++++++++++++++//
=======

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
>>>>>>> f32ef43d2a7e83f3d0b3d39c19c120dc5ad9a55e
//++++++++++++++++++++++++++++++제이님+++++++++++++++++++++++++++++++++++++++++//
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
