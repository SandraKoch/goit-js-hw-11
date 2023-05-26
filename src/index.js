import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';

const searchFormEl = document.querySelector('#search-form');
const inputEl = document.querySelector('[name="searchQuery"]');
const imagesContainerEl = document.querySelector('.images-container');

function handleResults(results) {
  imagesContainerEl.innerHTML = '';
  if (results === []) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  console.log('displayImg');
  //   displayImages(results);
}

function displayImages(results) {
  for (result of results) {
  }
}
async function searchImages(query) {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=36788203-2c78e2a924ca1cc7e222b7ed9&image_type=photo&orientation=horizontal&q=${query}&safesearch=true&per_page=20&page=1`
    );
    console.log(response);
    const imagesArray = response.data.hits;
    console.log(imagesArray);
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
  const foundImages = await searchImages(inputEl.value);
  console.log('foundImages', foundImages);
  handleResults(foundImages);
  //   displayImages();
});
