// 영화 상세 정보를 가져오는 함수
const getMovieDetails = async () => {
  const urlParameter = new URLSearchParams(window.location.search);
  const movieId = urlParameter.get('id');
  const apiKey = '082847f6a26a575e505ad1e6baf0258c';

  // 영화 상세 정보, 출연진 정보, 비디오 정보를 promise.all 병렬로 동시에 가져옴
  // 여러개의 비동기 작업을 처리하기 위해 사용
  const [movieDetails, credits, videos] = await Promise.all([ //promise.all완료될때까지 await 대기, 구조분해할당으로 movieDeails, credits, video 변수할당
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en&api_key=${apiKey}`).then(response => response.json()),
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`).then(response => response.json()),
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`).then(response => response.json())  //변환된 json데이터 획득
  ]);

  // 영화 감독 정보와 유튜브 영상 정보를 추출
  const director = credits.crew.find(member => member.job === 'Director'); //crew배열에서 Director 찾기
  const youtubeVideos = videos.results.filter(video => video.site === 'YouTube').slice(0, 3);//results배열에서 YouTube 필터링,3개만 가져오기

  detail({  // 위에서 긁어온 각 정보들을 detail함수로 전달
    title: movieDetails.title,
    poster_path: movieDetails.poster_path,
    vote_average: movieDetails.vote_average,
    overview: movieDetails.overview,
    release_date: movieDetails.release_date,
    runtime: movieDetails.runtime,
    genres: movieDetails.genres,
    director: director ? director.name : 'Unknown',
    youtubeVideos: youtubeVideos
    
  });
};

// 영화 상세 정보를 화면에 출력하는 함수
// 위에서 구조분해할당 사용하여 객체에서 필요한 속성들을 추출해온걸 매개변수로 넣어줌
const detail = ({ title, poster_path, vote_average, overview, release_date, runtime, genres, director, youtubeVideos }) => {
  const genre = genres[0]?.name || 'Unknown';  // (옵셔널 체이닝 연산자 사용) genres배열의 0번째 요소에 접근 || 해당요소 없을시 unknown 할당

  document.title = title;

  // 유튜브 영상 요소들을 생성
  // map() : 가져온 video 배열을 새로운 배열로 반환
  const youtubeVideoElements = youtubeVideos.map(video => `
    <iframe width="800" height="450" src="https://www.youtube.com/embed/${video.key}" frameborder="0" allowfullscreen></iframe>
  `).join('');

  // 영화 상세 정보를 화면에 출력
  main.innerHTML = `
    <div class="movie-detail-container">
      <div class="movie-poster">
        <img src="https://image.tmdb.org/t/p/w500/${poster_path}" />
      </div>
      <div class="movie-info">
        <div class="movie-title">${title}</div>
        <div class="movie-details">
          <div class="detail-item">
            <label>평점</label>
            <span>${vote_average.toFixed(1)}</span>
          </div>
          <div class="detail-item">
            <label>개봉일</label>
            <span>${release_date}</span>
          </div>
          <div class="detail-item">
            <label>상영 시간</label>
            <span>${runtime} 분</span>
          </div>
          <div class="detail-item">
            <label>장르</label>
            <span>${genre}</span>
          </div>
          <div class="detail-item">
            <label>감독</label>
            <span>${director}</span>
          </div>
        </div>
        <div class="movie-description">${overview}</div>
        </div>
        </div>
        <div class="youtube-videos">${youtubeVideoElements}</div>
  `;
};

// 영화 상세 정보를 가져오는 함수 호출
getMovieDetails();
