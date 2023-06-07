const genres = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  // {
  //   id: 99,
  //   name: "Documentary",
  // },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  // {
  //   id: 27,
  //   name: "Horror",
  // },
  // {
  //   id: 10402,
  //   name: "Music",
  // },
  // {
  //   id: 9648,
  //   name: "Mystery",
  // },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  // {
  //   id: 10770,
  //   name: "TV Movie",
  // },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];

let selectedGenre = "";

const tagsE1 = document.getElementById("tags");

setGenre();
function setGenre() {
  tagsE1.innerHTML = "";
  genres.forEach((genre) => {
    const t = document.createElement("div");
    t.classList.add("tag");
    t.id = genre.id;
    t.innerText = genre.name;
    
    t.addEventListener("click", () => { //모든걸 remove tag. querySelectAll("tag")

      if (selectedGenre.length === 0) {
        selectedGenre = genre.id;
        t.classList.add("tag-highlight")
      } else {
        document.querySelector(".tag-highlight").classList.remove("tag-highlight")       
        selectedGenre = genre.id;
        t.classList.add("tag-highlight")
             
      }
      console.log(selectedGenre)
  });
    tagsE1.append(t);
  });

  tagsE1.addEventListener("click", async function () {
    
    const api = await fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYTk2ZGJlN2Y4M2EyOTlhNDNkYTY1OTU3Y2U3YzFkYyIsInN1YiI6IjY0NzBiYjAwNzI2ZmIxMDE0NGU2MjgwZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xX1FH_36KZ8QkDBdbs8u5Bl3YZt32lyDNMGaNLcVz5E",
      },
    });
    const { results } = await api.json();
      let selectedEL = results.filter((val) => val["genre_ids"].includes(selectedGenre));
      // if (results.filter((val) => val["genre_ids"].indexOf(selectedGenre[i])) !== 0) {
      showMovies(selectedEL)
    }
  );
}

showAll()
function showAll () {
  document.querySelector('#show-all').addEventListener("click", async () => {
    const api = await fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYTk2ZGJlN2Y4M2EyOTlhNDNkYTY1OTU3Y2U3YzFkYyIsInN1YiI6IjY0NzBiYjAwNzI2ZmIxMDE0NGU2MjgwZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xX1FH_36KZ8QkDBdbs8u5Bl3YZt32lyDNMGaNLcVz5E",
    },
  });

  const { results } = await api.json();

  deleteHighlight()
  
  showMovies(results)
  });
  }

  //브라우저에 list해주는 함수 shoMovies(data)
  function showMovies(data) {
    movieList.innerHTML = "";
    data.forEach((result) => {
      movieList.innerHTML += `<li class="movie-box" onclick="showMovieDetails(${result.id})">
                              <div class="image-box"><img src="https://image.tmdb.org/t/p/original/${result["poster_path"]}" class="card-image" /></div>
                              <div class="title-box">
                                <h5 class="card-title">${result.title}</h5>
                                <p class="card-star">⭐️ ${result["vote_average"]}</p>
                              </div>
                              <p class="card-text">${result.overview}</p>
                            </li>
                        `;
    });
  }