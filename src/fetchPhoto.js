import axios from "axios";



const BASE_URL = 'https://pixabay.com/api/';
const KEY = '29839947-203cd2765f14246beba1c6e54';

export const fetchPhoto = (searchQuery, page, perPage) => {
  const url = `${BASE_URL}?key=${KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;
  return axios.get(url);
  
}
