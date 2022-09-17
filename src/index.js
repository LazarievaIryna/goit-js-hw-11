import { fetchPhoto } from './fetchPhoto';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  searchForm: document.querySelector('.search-form'),
  photosContainer: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};
let page = 1;
const PER_PAGE = 40;
let searchQuery = '';
let lightbox = new SimpleLightbox('.photo-card a');

const onSearch = async evt => {
  evt.preventDefault();

  refs.loadMoreBtn.classList.add('is-hidden');
  searchQuery = evt.currentTarget.elements.searchQuery.value;
  console.log(searchQuery);
  refs.photosContainer.innerHTML = '';

  if (searchQuery === '') {
    return;
  }

  try {
    const { data } = await fetchPhoto(searchQuery, page, PER_PAGE);
    console.log(data.totalHits);
    page = 1;

    if (data.totalHits === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    renderPhoto(data.hits);

    lightbox.refresh();
    refs.loadMoreBtn.classList.remove('is-hidden');
  } catch (error) {
    console.log(error);
  }
};

function renderPhoto(photos) {
  const markup = photos
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
        <a class="gallery-link" href="${largeImageURL}">
  <img src="${webformatURL}"  alt="${tags}" loading="lazy" class="gallery-photo"/></a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${likes}
    </p>
    <p class="info-item">
      <b>Views</b>${views}
    </p>
    <p class="info-item">
      <b>Comments</b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${downloads}
    </p>
  </div>
</div>`;
      }
    )
    .join('');
  refs.photosContainer.insertAdjacentHTML('beforeend', markup);
}

const onLoadMore = async () => {
  try {
    const { data } = await fetchPhoto(searchQuery, page, PER_PAGE);
    const countPage = data.totalHits / PER_PAGE;
    console.log(countPage);
    if (page >= countPage) {
      Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
      refs.loadMoreBtn.classList.add('is-hidden');
      return;
    }
    renderPhoto(data.hits);
    lightbox.refresh();
    page += 1;
    console.log(page);
  } catch (error) {
    console.log(error);
  }
};

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
