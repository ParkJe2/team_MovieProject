/* 
============================ .html ============================
1. 스타일시트 적용
<link rel="stylesheet" href="style/button.css" />
<link rel="stylesheet" href="style/reset.css" />

2. 버튼 뼈대
<div class="button">
<a href="/"><img class="logo" src="style/assets/icon.png" alt="" /></a>
<a href="/" class="title">Movies Project</a>
</div>
*/

/* 
============================ button.css ============================
@charset "UTF-8";
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;900&display=swap");

1. 웹 문서에서 공통으로 사용될 속성을 미리 변수에 선언
:root {
  --primary-color: #000;
  --primary-sub-color: #f2cd5c;
  --body-bg-color: #000;
  --radius-25: 25px;
  --radius-15: 15px;
}

2. 전체선택자를 이용해 아웃라인을 없애고 요소의 너비와 높이를 균일하게 유지, 폰트 적용
* {
  outline: none;
  box-sizing: border-box;
  font-family: "Noto Sans KR", sans-serif;
}

3. 배너를 상단에 고정, 자식 요소들 자신이 가진 컨텐츠의 크기만큼만 넓이를 가짐
.button {
  position: fixed;
  top: 0;
  width: 100%;
  height: 80px;
  z-index: 999;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  background-color: var(--primary-sub-color);
}

4. 폰트 설정
.title {
  color: var(--primary-color);
  cursor: pointer;
  font-weight: 600;
  font-size: 35px;
  text-decoration: none;
  text-align: center;
}

5. 폰트 hover 했을 때
.title:hover {
  cursor: pointer;
  color: var(--primary-color);
  cursor: pointer;
  font-size: 38px;
  font-weight: 900;
}

6. 로고 설정
.logo {
  width: 60px;
  padding-right: 10px;
}
*/
