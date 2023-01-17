import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import './css/styles.css';
// let gallery = new SimpleLightbox('.gallery a');
let page = 1;
let keyInput = '';
let totalPages = 0;

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
  keyInput = inputItem.value;
  galleryItem.innerHTML = '';
  alertItem.classList.add('hidden');

  if (!keyInput.trim()) {
    Notify.info('Oops! Please, enter smth to search.');
    btnMore.classList.add('hidden');
    return;
  }
  getImg(keyInput);
  event.currentTarget.reset();
}

function onClick() {
  getImg(keyInput);
}

async function getImg(keyWord) {
  try {
    const response = await axios.get(
      `${BASE_URL}/?key=${KEY}&q=${keyWord}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
    );
    if (!response.data.hits.length) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      btnMore.classList.add('hidden');
      alertItem.classList.add('hidden');
      return;
    }
    if (page === 1) {
      Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
    }
    btnMore.classList.remove('hidden');
    totalPages = Math.ceil(response.data.totalHits / 40);
    createGallery(response.data.hits);
    page += 1;
    if (page > totalPages) {
      return toogleAlertMarkup();
    }
  } catch (error) {
    console.log(error);
  }
}

if (page > 1) {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

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
function toogleAlertMarkup() {
  alertItem.classList.remove('hidden');
  btnMore.classList.add('hidden');
}
const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionsDelay: 250,
  scrollZoom: false,
  scrollZoomFactor: 0,
});

// return new Promise(resolve => setTimeout() => resolve(fruits), 500);
