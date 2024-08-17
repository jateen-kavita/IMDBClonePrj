const APIKey = "1e318c13";
// Main Function Getting API & Making is usable
const Movies = async (movieName) => {
  const APIURL = ` http://www.omdbapi.com/?i=tt3896198&apikey=${APIKey}&t=${movieName}`;
  const fetchingAPI = await fetch(APIURL);
  const MovieAPI = await fetchingAPI.json();
  return MovieAPI;
};
document.addEventListener("DOMContentLoaded", async () => {
  const resultContainer = document.querySelector(".resultContainer");

  // Retrieve the stored movie title from localStorage
  const movieTitle = localStorage.getItem("selectedMovie");

  if (movieTitle) {
    try {
      // Fetch movie details using the title
      const movieAPI = await Movies(movieTitle);

      // Create the movie details container
      const movieContainer = document.createElement("div");
      movieContainer.classList.add("movieDetailsContainer");
      movieContainer.innerHTML = `
        <div class="img-container">
          <img src="${movieAPI.Poster}" alt="${movieAPI.Title}" title="${movieAPI.Title}" />
        </div>
        <div class="movie-Details">
          <h2><span>Title: </span>${movieAPI.Title}</h2>
          <p><span>Plot: </span>${movieAPI.Plot}</p>
          <p><span>Genre:</span> ${movieAPI.Genre}</p>
          <p><span>Release:</span> ${movieAPI.Year}</p>
          <div class="btn">
           <a href="https://www.imdb.com/" target="_blank"><button>Watch Now</button></a>
          <a href="../Index.html"><button id="goback">Go Back</button></a>
          </div>
         
        </div>
      `;

      // Append the movie container to the result container
      resultContainer.appendChild(movieContainer);

    } catch (error) {
      console.error("Error fetching movie details:", error);
      resultContainer.innerHTML = `<p>Failed to load movie details. Please try again.</p>`;
    }
  } else {
    resultContainer.innerHTML = `<p>No movie selected. Please go back and select a movie.</p>`;
  }
});

