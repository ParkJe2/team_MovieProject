sortByTitle();

function sortByTitle() {
  document.querySelector("#sort-title").addEventListener("click", async () => {
    const api = await fetch("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1", {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYTk2ZGJlN2Y4M2EyOTlhNDNkYTY1OTU3Y2U3YzFkYyIsInN1YiI6IjY0NzBiYjAwNzI2ZmIxMDE0NGU2MjgwZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xX1FH_36KZ8QkDBdbs8u5Bl3YZt32lyDNMGaNLcVz5E",
      },
    });
    const { results } = await api.json();

    deleteHighlight();

    let movieByTitle = results.sort((a, b) => {
      if (a.title > b.title) return 1;
      if (a.title < b.title) return -1;
      return 0;
    });

    showMovies(movieByTitle);
  });
}

sortById();
function sortById() {
  document.querySelector("#sort-id").addEventListener("click", async () => {
    const api = await fetch("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1", {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYTk2ZGJlN2Y4M2EyOTlhNDNkYTY1OTU3Y2U3YzFkYyIsInN1YiI6IjY0NzBiYjAwNzI2ZmIxMDE0NGU2MjgwZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xX1FH_36KZ8QkDBdbs8u5Bl3YZt32lyDNMGaNLcVz5E",
      },
    });
    const { results } = await api.json();

    deleteHighlight();

    let movieById = results.sort((a, b) => {
      if (a.id > b.id) return 1;
      if (a.id < b.id) return -1;
      return 0;
    });

    showMovies(movieById);
  });
}

function deleteHighlight() {
  if (document.querySelector(".tag-highlight") === null) {
  } else {
    document.querySelector(".tag-highlight").classList.remove("tag-highlight");
    selectedGenre = "";
  }
}
