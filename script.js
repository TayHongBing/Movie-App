const movieTitleInput = document.getElementById("movieTitle");
const movieInfo = document.getElementById("movieInfo");

async function fetchMovieInfo(movieTitle) {
  const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apikey=258a2345`);
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error("Error fetching movie info data.");
  }
}

function formatInfoData(movieInfo) {
  const formattedData = `
    <div>
      <h2>${movieInfo.Title} (${movieInfo.Year})<h2>
    </div>
    <div>
      <img src=${movieInfo.Poster} alt="" height="270px">
    </div>
    <div>
      <h3>Director: ${movieInfo.Director}</h3>
    </div>
    <div>
      <h3>Rating: ${movieInfo.imdbRating}/10</h3>
    </div>
    `;
  return formattedData;
}

function displayMovieInfo(movieTitle) {
  movieInfo.innerHTML = "Loading...";
  fetchMovieInfo(movieTitle)
  .then((movieData) => {
    const formattedMovieData = formatInfoData(movieData);
    movieInfo.innerHTML = formattedMovieData;
  })
  .catch((error) => {
    console.log("Error:", error);
  });
}

function getMovie() {
  const movieTitle = movieTitleInput.value;
  displayMovieInfo(movieTitle);
}