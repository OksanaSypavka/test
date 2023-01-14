import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import './css/styles.css';
// let gallery = new SimpleLightbox('.gallery a');
let page = 1;

//https://pixabay.com/api/?key=k&q=${keyWord}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}
const BASE_URL = 'https://pixabay.com/api';
const KEY = '32848504-113b5416049b5c8ff07c52596';

const formItem = document.querySelector('#search-form');
const inputItem = document.querySelector('input[name="searchQuery"]');
const galleryItem = document.querySelector('.gallery');
const btnMore = document.querySelector('.load-more');
const alertItem = document.querySelector('.text');

formItem.addEventListener('submit', onSubmit);
btnMore.addEventListener('click', onClick);

function onSubmit(event) {
  event.preventDefault();
}
function onClick() {}

const { height: cardHeight } = document
  .querySelector('.gallery')
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: 'smooth',
});

inputItem.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function createGallery(images) {
  const markup = images
    .map(image => {
      return `<div class="photo-card">
      <a href="${image.largeImageURL}">
      <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
      </a>
      <div class="info">
      <p class="info-item"><b>Likes</b>${image.likes}</p>
      <p class="info-item"><b>Views</b>${image.views}</p>
      <p class="info-item"><b>Comments</b>${image.comments}</p>
      <p class="info-item"><b>Downloads</b>${image.downloads}</p>
      </div>
      </div>`;
    })
    .join('');
  galleryItem.insertAdjacentHTML('beforeend', markup);
}

const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionsDelay: 250,
  scrollZoom: false,
  scrollZoomFactor: 0,
});

// function onInput() {
//   if (!inputItem.value.trim()) {
//     infoItem.innerHTML = "";
//     listItem.innerHTML = "";
//     return;
//   }
//   fetchCountries(inputItem.value.trim())
//     .then((countries) => {
//       if (countries.length === 1) {
//         createCountryInfo(countries);
//         listItem.innerHTML = "";
//       } else if (countries.length > 10) {
//         Notify.info(
//           "Too many matches found. Please enter a more specific name."
//         );
//         listItem.innerHTML = "";
//         infoItem.innerHTML = "";
//       } else if (countries.length >= 2 && countries.length <= 10) {
//         createCountryList(countries);
//         infoItem.innerHTML = "";
//       }
//     })
//     .catch((error) => {
//       Notify.failure("Oops, there is no country with that name");
//       infoItem.innerHTML = "";
//       listItem.innerHTML = "";
//     });
// }
