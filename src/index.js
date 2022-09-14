import axios from "axios";
import { fetchPhoto } from "./fetchPhoto";

const refs = {
  searchForm: document.querySelector('.search-form'),
  photosContainer: document.querySelector('.gallery'),
};
//слушатель событий на форме
refs.searchForm.addEventListener('submit', onSearch)

function onSearch(evt) {
    evt.preventDefault()
    const form = evt.currentTarget.elements.searchQuery.value
    console.log(form)
}