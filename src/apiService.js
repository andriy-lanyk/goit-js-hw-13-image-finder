const API_KEY = '21457402-b4837d779b51461007fdd5443';
const URL = `https://pixabay.com/api/`;

export default {
  getImages: function (query, pageNumber) {
    return fetch(
      `${URL}?image_type=photo&orientation=horizontal&q=${query}&page=${pageNumber}&per_page=12&key=${API_KEY}`,
    ).then(res => {
      return res.json();
    });
  },
};
