const resultArtist = document.getElementById("result-artist");
const playlistContainer = document.getElementById("result-playlists");
const searchInput = document.getElementById("search-input");

function requestApi(searchTerm) {
  fetch(`http://localhost:5000/artists${searchTerm}`)
    .then((response) => response.json())
    .then((results) => displayResults(results));
}

function displayResults(results) {
  hidePlaylists();
  resultArtist.innerHTML = "";

  results.forEach((element) => {
    const artistDiv = document.createElement("div");
    artistDiv.classList.add("artist");

    const artistImage = document.createElement("img");
    artistImage.src = element.urlImg;
    artistImage.alt = element.name;

    const artistName = document.createElement("p");
    artistName.innerText = element.name;

    artistDiv.appendChild(artistImage);
    artistDiv.appendChild(artistName);
    resultArtist.appendChild(artistDiv);
  });

  if (results.length > 0) {
    resultArtist.classList.remove("hidden");
  } else {
    resultArtist.classList.add("hidden");
    playlistContainer.classList.remove("hidden");
  }
}

function hidePlaylists() {
  playlistContainer.classList.add("hidden");
}

searchInput.addEventListener("input", function () {
  const searchTerm = searchInput.value.toLowerCase();
  if (searchTerm === "") {
    resultArtist.classList.add("hidden");
    playlistContainer.classList.remove("hidden");
    return;
  }
  requestApi(searchTerm);
});
