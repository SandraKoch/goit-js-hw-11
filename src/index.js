import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
// const SimpleLightbox = window.SimpleLightbox;
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

const searchFormEl = document.querySelector('#search-form');
const inputEl = document.querySelector('[name="searchQuery"]');
const imagesContainerEl = document.querySelector('.gallery');
const loadMoreButtonEl = document.querySelector('.load-more');

function handleResults(results) {
  imagesContainerEl.innerHTML = '';
  if (results.length === 0) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  // console.log('displayImg');
  displayImages(results);
}

function displayImages(results) {
  results.forEach(result => {
    // console.log(result);

    const resultSrc = result.webformatURL;
    const resultLargeImg = result.largeImageURL;
    const resultAlt = result.tags;
    const resultLikes = result.likes;
    const resultViews = result.views;
    const resultComments = result.comments;
    const resultDownloads = result.downloads;

    const instance = document.createElement('div');
    instance.classList.add('photo-card');
    instance.insertAdjacentHTML(
      'beforeend',
      `<a href="${resultLargeImg}" class="gallery__link">
      <img src="${resultSrc}" alt="${resultAlt}" class="gallery__image" loading="lazy" />
      </a>
    <div class="info">
      <p class="info__item">
        <b>Likes</b>${resultLikes}
      </p>
      <p class="info__item">
        <b>Views</b>${resultViews}
      </p>
      <p class="info__item">
        <b>Comments</b>${resultComments}
      </p>
      <p class="info__item">
        <b>Downloads</b>${resultDownloads}
      </p>
    </div>`
    );
    imagesContainerEl.append(instance);
  });

  new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
  });
}

async function searchImages(query) {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=36788203-2c78e2a924ca1cc7e222b7ed9&image_type=photo&orientation=horizontal&q=${query}&safesearch=true&per_page=20&page=1`
    );
    // console.log('response', response);
    const imagesArray = response.data.hits;
    // console.log('imagesArray', imagesArray);
    const mappedArr = imagesArray.map(image => {
      return {
        webformatURL: image.webformatURL,
        largeImageURL: image.largeImageURL,
        tags: image.tags,
        likes: image.likes,
        views: image.views,
        comments: image.comments,
        downloads: image.downloads,
      };
    });
    return mappedArr;
  } catch (error) {
    console.log('Error in try ... catch', error.toString());
  }
}

searchFormEl.addEventListener('submit', async e => {
  e.preventDefault();
  const trimmedInputValue = inputEl.value.trim();
  const foundImages = await searchImages(trimmedInputValue);
  console.log('foundImages', foundImages);
  handleResults(foundImages);
});

// lightbox.on('show.simplelightbox', () => {
//   document.body.classList.add('show-lightbox');
// });
// lightbox.on('close.simplelightbox', () => {
//   document.body.classList.remove('show-lightbox');
// });

// loadMoreButtonEl.addEventListener('click');
