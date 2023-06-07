// =======button.js=======
var TopMenu, TopMenuPosition; // 전역변수로 지정
TopMenu = document.getElementById("submenu_bar"); // 고정될 메뉴바 인식
TopMenuPosition = TopMenu.offsetTop; // 고정될 메뉴바의 처음 위치 인식
// 스크롤이 되면 실행될 함수
function submenu_bar_fixed() {
  // 스크롤되는 값과 고정될 메뉴바 위치를 비교해서 고정시킬 class 적용 또는 해제
  if (window.pageYOffset >= TopMenuPosition) {
    TopMenu.classList.add("sticky");
  } else {
    TopMenu.classList.remove("sticky");
  }
}
// 스크롤이 되면 실행될 함수 지정
document.addEventListener("scroll", submenu_bar_fixed);

// ======= .html=======
// <div class="main">
//  <a href="/"><img class="logo" src="style/assets/icon.png" alt="" /></a>
//  <a href="/" class="title">Movies Project</a>
// </div>
