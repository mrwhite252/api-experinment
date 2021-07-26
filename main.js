const auth = "563492ad6f9170000100000100df92ff874740b5a7720cb1596c3b7d";

const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");

const more = document.querySelector(".more");
let page = 1;
let fetchLink;
let currentSearch;

let serachValue;

// event listeners

searchInput.addEventListener("input", updateInput);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  currentSearch = serachValue;
  searchPhotos(serachValue);
});

more.addEventListener("click", loadMore);

function updateInput(e) {
  serachValue = e.target.value;
}

async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    Method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });

  const data = await dataFetch.json();
  return data;
}

function generatePictures(data) {
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `
    <div class="gallery-info">        
    <p>${photo.photographer}</p>
    <a href=${photo.src.original} target="_blank"> Download </a>
    </div>
    <img src=${photo.src.large}>
    `;
    gallery.appendChild(galleryImg);
  });
}

async function curatedPhotos() {
  fetchLink = " https://api.pexels.com/v1/curated/?page=1&per_page=15";
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

async function searchPhotos(query) {
  clear();
  fetchLink = `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`;
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

function clear() {
  gallery.innerHTML = "";
  searchInput.vaule = "";
}

async function loadMore() {
  page++;

  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated/?page=${page}&per_page=15`;
  }

  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

curatedPhotos();
