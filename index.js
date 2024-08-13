const APIKey = "1e318c13";
// Main Function Getting API & Making is usable
const Movies = async (movieName) => {
  const APIURL = ` http://www.omdbapi.com/?i=tt3896198&apikey=${APIKey}&t=${movieName}`;
  const fetchingAPI = await fetch(APIURL);
  const MovieAPI = await fetchingAPI.json();
  return MovieAPI;
};

let movieArr = [
  "Shaitaan",
  "Godzilla x Kong: The New Empire",
  "Guntur Kaaram",
  "Teri Baaton Mein Aisa Uljha Jiya",
  "Fighter",
  "Bad Boys: Ride or Die",
  "Kung Fu Panda 4",
];

let popularMovies = [
  "Salaar",
  "Kalki 2898 AD",
  "Brahmāstra: Part One – Shiva",
  "Shaitaan",
  "Rocky Aur Rani Kii Prem Kahaani",
  "Zindagi Na Milegi Dobara",
  "Tu Jhoothi Main Makkaar",
  "Ae Dil Hai Mushkil",
  "Bajirao Mastani",
  "Raanjhanaa",
  "Adipurush",
  "Saaho",
];

let FavourateMovies = [];

// Latest Movies function
const movieContainer = document.querySelector(".latest-release-container");

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

  const favouratewrapper = document.querySelector(".fav-container");
  favIcon.addEventListener("click", () => {
    FavourateMovies.push({
      title: movieData.Title,
      poster: movieData.Poster,
      plot: movieData.Plot,
      genre: movieData.Genre,
      imdb: movieData.imdbRating,
    });

    favouratewrapper.innerHTML = "";
    FavourateMovies.forEach((movie) => {
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
          </div>
          
          `;

         

      favouratewrapper.appendChild(favMovies);
    });

    // Assuming this code is inside the block where movies are rendered
const trashcans = document.querySelectorAll('.trashcan');

// Attach event listeners to all trashcan icons
trashcans.forEach((trashcan, index) => {
  trashcan.addEventListener('click', () => {
    // Remove the specific movie from the array using splice
    FavourateMovies.splice(index, 1);

    // Clear the container
    const favouratewrapper = document.querySelector(".fav-container");
    favouratewrapper.innerHTML = "";

    // Re-render the updated list of favorite movies
    FavourateMovies.forEach((movie) => {
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

      // Re-attach the trashcan event listeners after re-rendering
      const newTrashcans = document.querySelectorAll('.trashcan');
      newTrashcans.forEach((newTrashcan, newIndex) => {
        newTrashcan.addEventListener('click', () => {
          FavourateMovies.splice(newIndex, 1);
          newTrashcan.closest('.fav-films').remove();  // Remove the movie element from the DOM
        });
      });
    });
  });
});

  });
};

const movieDisplay = movieArr.map((movie) => {
  return film(movie);
});

// Most Popular Section

const popularSection = document.querySelector(".most-popular-container");

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
    </div>
    `;
  popularSection.appendChild(movieContainer);

  const favIcon = movieContainer.querySelector(".fav-icon");
  movieContainer.addEventListener("mouseenter", () => {
    favIcon.style.color = "red";
    favIcon.style.display = "block";
  });

  movieContainer.addEventListener("mouseleave", () => {
    const favIcon = movieContainer.querySelector(".fav-icon");
    favIcon.style.color = "transparent";
  });

  const favouratewrapper = document.querySelector(".fav-container");
  movieContainer.addEventListener("click", () => {
    FavourateMovies.push({
      title: movieData.Title,
      poster: movieData.Poster,
      plot: movieData.Plot,
      genre: movieData.Genre,
      imdb: movieData.imdbRating,
    });

    favouratewrapper.innerHTML = "";
    FavourateMovies.forEach((movie) => {
      const favMovies = document.createElement("div");
      favMovies.classList.add("fav-films");
      favMovies.innerHTML = `
      <div class="favourateMovieContainer">
            <div class="image-container">
              <img src="${movie.poster}" alt="${movie.title}"  title="${movie.title}"/>
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
      
    })
   // Assuming this code is inside the block where movies are rendered
const trashcans = document.querySelectorAll('.trashcan');

// Attach event listeners to all trashcan icons
trashcans.forEach((trashcan, index) => {
  trashcan.addEventListener('click', () => {
    // Remove the specific movie from the array using splice
    FavourateMovies.splice(index, 1);

    // Clear the container
    const favouratewrapper = document.querySelector(".fav-container");
    favouratewrapper.innerHTML = "";

    // Re-render the updated list of favorite movies
    FavourateMovies.forEach((movie) => {
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

      // Re-attach the trashcan event listeners after re-rendering
      const newTrashcans = document.querySelectorAll('.trashcan');
      newTrashcans.forEach((newTrashcan, newIndex) => {
        newTrashcan.addEventListener('click', () => {
          FavourateMovies.splice(newIndex, 1);
          newTrashcan.closest('.fav-films').remove();  // Remove the movie element from the DOM
        });
      });
    });
  });
});

    
  });
};

popularMovies.map((movie) => {
  return popularFilms(movie);
});



// Search Function


const carousel = document.querySelector(".carousel");
let currentMovieIndex = 0;

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


  carousel.innerHTML = '';
  carousel.appendChild(carouselElement);

  // Add event listeners for navigation buttons
  const leftArrow = carouselElement.querySelector('.leftarrow');
  const rightArrow = carouselElement.querySelector('.rightarrow');

  leftArrow.addEventListener('click', showPreviousMovie);
  rightArrow.addEventListener('click', showNextMovie);
};

const showNextMovie = () => {
  currentMovieIndex = (currentMovieIndex + 1) % movieArr.length;
  carouselMovieShow(movieArr[currentMovieIndex]);
};

const showPreviousMovie = () => {
  currentMovieIndex = (currentMovieIndex - 1 + movieArr.length) % movieArr.length;
  carouselMovieShow(movieArr[currentMovieIndex]);
};


carouselMovieShow(movieArr[currentMovieIndex])



const searchInput = document.querySelector(".searchBox");
const searchButton = document.querySelector(".searchBtn button");

// Function to handle the search

const handleSearch = async () => {
  const movieName = searchInput.value.trim(); // Get the input value and trim whitespace
  if (movieName) { // Check if input is not empty
    try {
      // Fetch movie data and display in the carousel
      searchInput.innerHTML="";
      await carouselMovieShow(movieName);
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  } else {
    alert("Please enter a movie name.");
  }
};

// Event listener for the search button
searchButton.addEventListener("click", handleSearch);

// Optionally, allow search on pressing 'Enter' key
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleSearch();
  }
});