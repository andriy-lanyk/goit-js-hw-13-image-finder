const API_KEY = '21457402-b4837d779b51461007fdd5443';
const URL = `https://pixabay.com/api/`;

export default {
  getPhoto: function () {
    return fetch(
      `${URL}?image_type=photo&orientation=horizontal&q=${'cat'}&page=${1}&per_page=12&key=${API_KEY}`,
    ).then(res => {
      return res.json();
    });
  },
};
