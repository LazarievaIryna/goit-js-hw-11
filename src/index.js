import axios from "axios";
import PhotoApiService from "./fetchPhoto";

const refs = {
  searchForm: document.querySelector('.search-form'),
  photosContainer: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};
let page = 1
let limit = 40
let searchQuery = ''
//запрос на сервер
const BASE_URL = 'https://pixabay.com/api/';
const KEY = '29839947-203cd2765f14246beba1c6e54';

async function fetchPhoto(searchQuery, page) {
  const url = `${BASE_URL}?key=${KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`;
  const photoList = await axios.get(url).then(response => response.data);
  return photoList
}


//слушатель событий на форме
refs.searchForm.addEventListener('submit', onSearch)
refs.loadMoreBtn.addEventListener('click', onLoadMore)


function onSearch(evt) {
  evt.preventDefault();
  //значение инпута, идет в запрос на сервер
  searchQuery = evt.currentTarget.elements.searchQuery.value;
  refs.loadMoreBtn.classList.add('is-hidden');
 console.log(searchQuery)

  if (searchQuery === '') {
    return
  }
  
}

function onLoadMore() {
  

}