const APIKey = "1e318c13";
// Main Function Getting API & Making is usable
const Movies = async (movieName) => {
  const APIURL = ` https://www.omdbapi.com/?i=tt3896198&apikey=${APIKey}&t=${movieName}`;
  const fetchingAPI = await fetch(APIURL);
  const MovieAPI = await fetchingAPI.json();
  return MovieAPI;
};

// Function to handle the search

// Search Funtion

const searchInputBar = document.querySelector(".searchBox");
const searchOutput = document.querySelector(".searchResults");
const SearchBtn = document.getElementById("searchBtn");

// Search Function
const searchFunction = () => {
  searchInputBar.addEventListener("input", async () => {
    const searchInput = searchInputBar.value;
    await handleSearch(searchInput);
  });

  // Trigger search when the search button is clicked
  SearchBtn.addEventListener("click", async () => {
    const searchInput = searchInputBar.value;
    if (searchInput !== "") {
      await handleSearch(searchInput);

      // Store the selected movie title in localStorage
      const searchMovies = await Movies(searchInput);
      localStorage.setItem("selectedMovie", searchMovies.Title);

      // Redirect to result.html
      window.location.href = "./results/result.html";
    }
  });

  // Handle the search process
  const handleSearch = async (searchInput) => {
    const searchMovies = await Movies(searchInput);
  
    const searchedResults = document.createElement("div");
    searchOutput.innerHTML = "";
  
    if (searchInput !== "") {
      searchedResults.innerHTML = "";
      searchedResults.classList.add("inputedsearchResults" ,"glassmorphism-effect");
      searchedResults.innerHTML = `
        <div class="searchImg">
          <a href="./Results/result.html" class="movieLink" data-movie="${searchMovies.Title}">
            <img src="${searchMovies.Poster}" alt="${searchMovies.Title}" title="${searchMovies.Title}">
          </a>
        </div>
        <div class="movie-Details">
          <ul>
            <li><a href="./Results/result.html" class="movieLink" data-movie="${searchMovies.Title}">
            <span>Title:</span> ${searchMovies.Title}</a></li>
            <li><span>Genre:</span> ${searchMovies.Genre}</li>
            <li><span>Cast:</span> ${searchMovies.Actors}</li>
            <li><span>Year:</span> ${searchMovies.Year}</li>
          </ul>
          <button class="addToFavBtn">Add to Favorites</button>
        </div>
      `;
  
      // Add click event listener to save the movie title
      searchedResults.querySelectorAll(".movieLink").forEach((link) => {
        link.addEventListener("click", (e) => {
          const movieTitle = e.currentTarget.getAttribute("data-movie");
          localStorage.setItem("selectedMovie", movieTitle); // Store the movie title
        });
      });
  
      // Add event listener to the "Add to Favorites" button
      const addToFavBtn = searchedResults.querySelector(".addToFavBtn");
      addToFavBtn.addEventListener("click", () => {
        const isAlreadyFavorite = FavourateMovies.some(
          (movie) => movie.title === searchMovies.Title
        );
  
        if (isAlreadyFavorite) {
          alert("This movie is already in your favorites!");
        } else {
          const newFavoriteMovie = {
            title: searchMovies.Title,
            poster: searchMovies.Poster,
            plot: searchMovies.Plot,
            genre: searchMovies.Genre,
            imdb: searchMovies.imdbRating,
          };
          addMovieToFavorites(newFavoriteMovie);
        }
      });
    } else {
      console.log("Not found");
    }
    searchOutput.appendChild(searchedResults);
  };
};  

// Call the search function
searchFunction();

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






// Latest Movies function



// Common array to store all favorite movies
let FavourateMovies = [];

// Load favorite movies from localStorage on page load
document.addEventListener("DOMContentLoaded", () => {
  const storedMovies = localStorage.getItem("favouriteMovies");
  if (storedMovies) {
    FavourateMovies = JSON.parse(storedMovies);
    renderFavoriteMovies(); // Render all favorite movies on page load
  }
});

// Function to update localStorage and re-render the favorites
function addMovieToFavorites(newFavoriteMovie) {
  FavourateMovies.push(newFavoriteMovie);

  // Save to localStorage
  localStorage.setItem("favouriteMovies", JSON.stringify(FavourateMovies));

  // Re-render the favorite movies list
  renderFavoriteMovies();
}

// Common function to render the favorites list
function renderFavoriteMovies() {
  const favouratewrapper = document.querySelector(".fav-container");
  favouratewrapper.innerHTML = "";

  FavourateMovies.forEach((movie, index) => {
    const favMovies = document.createElement("div");
    favMovies.classList.add("fav-films");
    favMovies.innerHTML = `
      <div class="favourateMovieContainer glassmorphism-effect">
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
      FavourateMovies.splice(index, 1);

      // Update localStorage
      localStorage.setItem("favouriteMovies", JSON.stringify(FavourateMovies));

      // Re-render the favorite movies list
      renderFavoriteMovies();
    });
  });
}

// Function to handle movie elements (latest release, webshow, popular)
function handleMovieElement(movieData, container) {
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

  container.appendChild(movieElement);

  const favIcon = movieElement.querySelector(".fav-icon");

  movieElement.addEventListener("mouseenter", () => {
    favIcon.style.color = "red";
    favIcon.style.display = "block";
  });

  movieElement.addEventListener("mouseleave", () => {
    favIcon.style.color = "transparent";
  });

  favIcon.addEventListener("click", () => {
    const isAlreadyFavorite = FavourateMovies.some(
      (movie) => movie.title === movieData.Title
    );

    if (isAlreadyFavorite) {
      alert("This movie is already in your favorites!");
    } else {
      const newFavoriteMovie = {
        title: movieData.Title,
        poster: movieData.Poster,
        plot: movieData.Plot,
        genre: movieData.Genre,
        imdb: movieData.imdbRating,
      };

      addMovieToFavorites(newFavoriteMovie); // Add to favorites using the common function
    }
  });
}

// Latest Release Section
const movieContainer = document.querySelector(".latest-release-container");

async function film(movieName) {
  const movieData = await Movies(movieName);
  handleMovieElement(movieData, movieContainer);
}

// Webshow Section
const webshowContainer = document.querySelector(".webshow-container");

async function webshow(movieName) {
  const movieData = await Movies(movieName);
  handleMovieElement(movieData, webshowContainer);
}

// Most Popular Section
const popularSection = document.querySelector(".most-popular-container");

async function popularFilms(movieName) {
  const movieData = await Movies(movieName);
  handleMovieElement(movieData, popularSection);
}

// Example of populating movies for different sections
// const movieArr = ["Inception", "Avatar", "Titanic"]; // Replace with actual movie names
movieArr.forEach((movie) => film(movie));

// const webshowArr = ["Breaking Bad", "Game of Thrones"]; // Replace with actual show names
webshowArr.forEach((show) => webshow(show));

// const popularMovies = ["The Dark Knight", "Interstellar"]; // Replace with actual movie names
popularMovies.forEach((movie) => popularFilms(movie));


// Function to scroll to the top of the page


// Get the "Back to Top" button element
const backToTopBtn = document.querySelector('.backtotopbtn');

// Show or hide the button depending on the scroll position
function handleScroll() {
    if (window.scrollY > 400) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');

    }
}

// Scroll smoothly to the top when the button is clicked
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// Attach event listeners
window.addEventListener('scroll', handleScroll);
backToTopBtn.addEventListener('click', scrollToTop);

