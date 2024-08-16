const APIKey = "1e318c13";
// Main Function Getting API & Making is usable
const Movies = async (movieName) => {
  const APIURL = ` http://www.omdbapi.com/?i=tt3896198&apikey=${APIKey}&t=${movieName}`;
  const fetchingAPI = await fetch(APIURL);
  const MovieAPI = await fetchingAPI.json();
  return MovieAPI;
};

let carouselArr = [
  "Premalu",
  "Godzilla x Kong: The New Empire",
  "Guntur Kaaram",
  "Teri Baaton Mein Aisa Uljha Jiya",
  "Fighter",
  "Bad Boys: Ride or Die",
  "Kung Fu Panda 4",
  "Munjya",
  "Aavesham",
  "crew",
];
let movieArr = [
  "Shaitaan",
  "Phir Aayi Hasseen Dillruba",
  "Stree 2",
  "Deadpool Wolverine",
  "12th Fail",
  "Jailer",
  "joker",
];
let webshowArr = [
  "Panchayat",
  "Mirzapur",
  "Kota Factory",
  "aashram",
  "Scam 1992: The Harshad Mehta Story",
  "Farzi",
  "FRIENDS",
];

let popularMovies = [
  "Salaar",
  "Kalki 2898 AD",
  "Brahmāstra: Part One – Shiva",
  "kabir Singh",
  "Rocky Aur Rani Kii Prem Kahaani",
  "Zindagi Na Milegi Dobara",
  "Tu Jhoothi Main Makkaar",
  "Ae Dil Hai Mushkil",
  "Bajirao Mastani",
  "Raanjhanaa",
  "Adipurush",
  "Saaho",
  "Rockstar",
  "animal",
];

// Latest Movies function
const movieContainer = document.querySelector(".latest-release-container");
let FavourateMovies = []; // Initialize as an empty array

// Load favorite movies from localStorage on page load
document.addEventListener("DOMContentLoaded", () => {
  const storedMovies = localStorage.getItem("favouriteMovies");
  if (storedMovies) {
    FavourateMovies = JSON.parse(storedMovies); // Populate the array with stored data
    renderFavoriteMovies(); // Render the favorite movies on page load
  }
});

const film = async (movieName) => {
  const movieData = await Movies(movieName);

  const movieElement = document.createElement("div");
  movieElement.classList.add("movie");
  movieElement.innerHTML = `
    <a href="https://www.imdb.com/" target="_blank">
      <img src="${movieData.Poster}" alt="${movieData.Title}" title="${movieData.Title}">
    </a>
    <div class="fav-icon">
      <i class="fa-solid fa-heart heartIcon"></i>
    </div>
  `;

  movieContainer.appendChild(movieElement);

  const favIcon = movieElement.querySelector(".fav-icon");

  movieElement.addEventListener("mouseenter", () => {
    favIcon.style.color = "red";
    favIcon.style.display = "block";
  });

  movieElement.addEventListener("mouseleave", () => {
    favIcon.style.color = "transparent";
  });

  favIcon.addEventListener("click", () => {
    const newFavoriteMovie = {
      title: movieData.Title,
      poster: movieData.Poster,
      plot: movieData.Plot,
      genre: movieData.Genre,
      imdb: movieData.imdbRating,
    };

    FavourateMovies.push(newFavoriteMovie);

    // Save to localStorage
    localStorage.setItem("favouriteMovies", JSON.stringify(FavourateMovies));

    // Immediately re-render the favorite movies list after adding the new movie
    renderFavoriteMovies();
  });
};

function renderFavoriteMovies() {
  const favouratewrapper = document.querySelector(".fav-container");
  favouratewrapper.innerHTML = ""; // Clear the container

  FavourateMovies.forEach((movie, index) => {
    const favMovies = document.createElement("div");
    favMovies.classList.add("fav-films");
    favMovies.innerHTML = `
      <div class="favourateMovieContainer">
        <div class="image-container">
          <img src="${movie.poster}" alt="${movie.title}" title="${movie.title}" />
        </div>
        <div class="movieDetails">
          <h4>${movie.title}</h4>
          <p><span>Storyline:</span> ${movie.plot}</p>
          <p><span>Movie Genre:&nbsp;</span> ${movie.genre} &nbsp; &nbsp; <span>IMDB Ratings: </span> ${movie.imdb}</p>
          <div class="watchtrash">
            <a href="https://www.imdb.com/" target="_blank"><button class="favCTABtn">Watch Now</button></a>
            <i class="fa-solid fa-trash-can trashcan"></i>
          </div>
        </div>
      </div>`;
    favouratewrapper.appendChild(favMovies);

    // Attach event listener to remove movie from favorites
    const trashcan = favMovies.querySelector(".trashcan");
    trashcan.addEventListener("click", () => {
      // Remove the movie from the array
      FavourateMovies.splice(index, 1);

      // Update localStorage
      localStorage.setItem("favouriteMovies", JSON.stringify(FavourateMovies));

      // Re-render the favorite movies list
      renderFavoriteMovies();
    });
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const storedMovies = localStorage.getItem("favouriteMovies");

  if (storedMovies) {
    FavourateMoviesArr = JSON.parse(storedMovies);
    renderFavoriteMovies();
  }
});

// This function can be used to populate the movies on load
const movieDisplay = movieArr.map((movie) => {
  return film(movie);
});


// Most Popular Section

const popularSection = document.querySelector(".most-popular-container");
let PopularFavourateMovies = []; // Initialize as an empty array

// Load favorite movies from localStorage on page load
document.addEventListener("DOMContentLoaded", () => {
  const storedMovies = localStorage.getItem("favouriteMovies");

  if (storedMovies) {
    PopularFavourateMovies = JSON.parse(storedMovies); // Populate the array with stored data
    renderFavoriteMovies(); // Render the favorite movies on page load
  }
});

const popularFilms = async (movieName) => {
  const movieData = await Movies(movieName);
  const movieContainer = document.createElement("div");
  movieContainer.classList.add("movie");
  movieContainer.classList.add("popularmoviesection");
  movieContainer.innerHTML = `
   <a href="https://www.imdb.com/" target="_blank">
      <img src="${movieData.Poster}" alt="${movieData.Title}" title="${movieData.Title}">
    </a>
      <div class="fav-icon" >
      <i class="fa-solid fa-heart heartIcon" ></i>
    </div>`;
  popularSection.appendChild(movieContainer);

  const favIcon = movieContainer.querySelector(".fav-icon");

  movieContainer.addEventListener("mouseenter", () => {
    favIcon.style.color = "red";
    favIcon.style.display = "block";
  });

  movieContainer.addEventListener("mouseleave", () => {
    favIcon.style.color = "transparent";
  });

  movieContainer.addEventListener("click", () => {
    const newFavoriteMovie = {
      title: movieData.Title,
      poster: movieData.Poster,
      plot: movieData.Plot,
      genre: movieData.Genre,
      imdb: movieData.imdbRating,
    };

    PopularFavourateMovies.push(newFavoriteMovie);

    // Save to localStorage
    localStorage.setItem(
      "favouriteMovies",
      JSON.stringify(PopularFavourateMovies)
    );

    renderFavoriteMovies(); // Render the updated list after adding the new movie
  });
};

function renderFavoriteMovies() {
  const favouratewrapper = document.querySelector(".fav-container");
  favouratewrapper.innerHTML = "";

  PopularFavourateMovies.forEach((movie, index) => {
    const favMovies = document.createElement("div");
    favMovies.classList.add("fav-films");
    favMovies.innerHTML = `
      <div class="favourateMovieContainer">
        <div class="image-container">
          <img src="${movie.poster}" alt="${movie.title}" title="${movie.title}" />
        </div>
        <div class="movieDetails">
          <h4>${movie.title}</h4>
          <p><span>Storyline:</span> ${movie.plot}</p>
          <p><span>Movie Genre:</span> ${movie.genre} &nbsp; &nbsp; <span>IMDB Ratings:</span> ${movie.imdb}</p>
          <div class="watchtrash">
            <a href="https://www.imdb.com/" target="_blank"><button class="favCTABtn">Watch Now</button></a>
            <i class="fa-solid fa-trash-can trashcan"></i>
          </div>
        </div>
      </div>`;
    favouratewrapper.appendChild(favMovies);

    // Attach event listener to remove movie from favorites
    const trashcan = favMovies.querySelector(".trashcan");
    trashcan.addEventListener("click", () => {
      // Remove the movie from the array
      PopularFavourateMovies.splice(index, 1);

      // Update localStorage
      localStorage.setItem(
        "favouriteMovies",
        JSON.stringify(PopularFavourateMovies)
      );

      // Re-render the favorite movies list
      renderFavoriteMovies();
    });
  });
}

// This function can be used to populate the popular films
popularMovies.map((movie) => {
  return popularFilms(movie);
});

// Carousel Function

const carousel = document.querySelector(".carousel");
let currentMovieIndex = 0;

// Function to fetch movie data and update the carousel
const carouselMovieShow = async (movieName) => {
  const carouselData = await Movies(movieName);
  const carouselElement = document.createElement("div");
  carouselElement.classList.add("carousel-data");
  carouselElement.innerHTML = `
    <div class="img-container">
      <img src="${carouselData.Poster}" alt="${carouselData.Title}" title="${carouselData.Title}">
    </div>
    <div class="movie-elements">
      <i class="fas fa-chevron-left leftarrow"></i>
      <h1 title="${carouselData.Title}">${carouselData.Title}</h1>
      <p title="${carouselData.Title}">${carouselData.Plot}</p>
      <div class="subData">
        <p title="${carouselData.Title}"><span>Duration:</span> ${carouselData.Runtime}</p>
        <p title="${carouselData.Title}"><span>Genre:</span> ${carouselData.Genre}</p>
        <p title="${carouselData.Title}"><span>IMDB Ratings:</span> ${carouselData.imdbRating}</p>
      </div>
      <a href="https://www.imdb.com/" target="_blank"><button class="cta-btn">Watch Now</button></a>
      <i class="fas fa-chevron-right rightarrow"></i>
    </div>
  `;

  carousel.innerHTML = "";
  carousel.appendChild(carouselElement);

  // Add event listeners for navigation buttons
  const leftArrow = carouselElement.querySelector(".leftarrow");
  const rightArrow = carouselElement.querySelector(".rightarrow");

  leftArrow.addEventListener("click", showPreviousMovie);
  rightArrow.addEventListener("click", showNextMovie);
};

// Function to show the next movie
const showNextMovie = () => {
  currentMovieIndex = (currentMovieIndex + 1) % carouselArr.length;
  carouselMovieShow(carouselArr[currentMovieIndex]);
};

// Function to show the previous movie
const showPreviousMovie = () => {
  currentMovieIndex =
    (currentMovieIndex - 1 + carouselArr.length) % carouselArr.length;
  carouselMovieShow(carouselArr[currentMovieIndex]);
};

// Start the carousel with the first movie
carouselMovieShow(carouselArr[currentMovieIndex]);

// Automatically change the movie every 10 seconds
const carouselInterval = setInterval(showNextMovie, 8000);

// Function to handle the search

// Search Funtion

const searchInputBar = document.querySelector(".searchBox");
const searchOutput = document.querySelector(".searchResults");
const SearchBtn = document.getElementById("searchBtn");

// Search Function
const searchFunction = () => {
  searchInputBar.addEventListener("input", async () => {
    const searchInput = searchInputBar.value;
    const searchMovies = await Movies(searchInput);

    const searchedResults = document.createElement("div");
    searchOutput.innerHTML = "";

    if (searchInput != "") {
      searchedResults.innerHTML = "";
      searchedResults.classList.add("inputedsearchResults");
      searchedResults.innerHTML = `
      <div class="searchImg">
        <a href="Demo/result.html" class="movieLink" data-movie="${searchMovies.Title}">
          <img src="${searchMovies.Poster}" alt="${searchMovies.Title}">
        </a>
        </div>
        <div class="movie-Details">
          <ul>
            <li><a href="Demo/result.html" class="movieLink" data-movie="${searchMovies.Title}">Title: ${searchMovies.Title}</a></li>
            <li>Genre: ${searchMovies.Genre}</li>
            <li>Cast: ${searchMovies.Actors}</li>
            <li>Year: ${searchMovies.Year}</li>
          </ul>

        </div>
      `;

      // Add click event listener to save the movie title
      searchedResults.querySelectorAll(".movieLink").forEach((link) => {
        link.addEventListener("click", (e) => {
          const movieTitle = e.currentTarget.getAttribute("data-movie");
          localStorage.setItem("selectedMovie", movieTitle); // Store the movie title
        });
      });
    } else {
      console.log("Not found");
    }
    searchOutput.appendChild(searchedResults);
  });
};

searchFunction();

// Webshow section

const webshowContainer = document.querySelector(".webshow-container");
let FavourateMoviesArr = []; // Initialize as an empty array

document.addEventListener("DOMContentLoaded", () => {
  const storedMovies = localStorage.getItem("favouriteMovies");

  if (storedMovies) {
    FavourateMoviesArr = JSON.parse(storedMovies);
    renderFavoriteMovies();
  }
});
const webshow = async (movieName) => {
  const movieData = await Movies(movieName);

  const movieElement = document.createElement("div");
  movieElement.classList.add("movie");
  movieElement.innerHTML = `
    <a href="https://www.imdb.com/" target="_blank">
      <img src="${movieData.Poster}" alt="${movieData.Title}" title="${movieData.Title}">
    </a>
    <div class="fav-icon">
      <i class="fa-solid fa-heart heartIcon"></i>
    </div>
  `;

  webshowContainer.appendChild(movieElement);

  const favIcon = movieElement.querySelector(".fav-icon");

  movieElement.addEventListener("mouseenter", () => {
    favIcon.style.color = "red";
    favIcon.style.display = "block";
  });

  movieElement.addEventListener("mouseleave", () => {
    favIcon.style.color = "transparent";
  });

  favIcon.addEventListener("click", () => {
    const newFavoriteMovie = {
      title: movieData.Title,
      poster: movieData.Poster,
      plot: movieData.Plot,
      genre: movieData.Genre,
      imdb: movieData.imdbRating,
    };

    FavourateMoviesArr.push(newFavoriteMovie);

    // Save to localStorage
    localStorage.setItem("favouriteMovies", JSON.stringify(FavourateMoviesArr));

    renderFavoriteMovies();
  });
};

function renderFavoriteMovies() {
  const favouratewrapper = document.querySelector(".fav-container");
  favouratewrapper.innerHTML = "";

  FavourateMoviesArr.forEach((movie, index) => {
    const favMovies = document.createElement("div");
    favMovies.classList.add("fav-films");
    favMovies.innerHTML = `
      <div class="favourateMovieContainer">
        <div class="image-container">
          <img src="${movie.poster}" alt="${movie.title}" title="${movie.title}" />
        </div>
        <div class="movieDetails">
          <h4>${movie.title}</h4>
          <p><span>Storyline:</span> ${movie.plot}</p>
          <p><span>Movie Genre:</span> ${movie.genre} &nbsp; &nbsp; <span>IMDB Ratings:</span> ${movie.imdb}</p>
          <div class="watchtrash">
            <a href="https://www.imdb.com/" target="_blank"><button class="favCTABtn">Watch Now</button></a>
            <i class="fa-solid fa-trash-can trashcan"></i>
          </div>
        </div>
      </div>`;
    favouratewrapper.appendChild(favMovies);

    // Attach event listener to remove movie from favorites
    const trashcan = favMovies.querySelector(".trashcan");
    trashcan.addEventListener("click", () => {
      // Remove the movie from the array
      FavourateMoviesArr.splice(index, 1);

      // Update localStorage
      localStorage.setItem(
        "favouriteMovies",
        JSON.stringify(FavourateMoviesArr)
      );

      // Re-render the favorite movies list
      renderFavoriteMovies();
    });
  });
}

// Load favorite movies from localStorage on page load


const webshowDisplay = webshowArr.map((movie) => {
  return webshow(movie);
});
