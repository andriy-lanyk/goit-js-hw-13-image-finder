import debounce from 'lodash.debounce';
import './sass/main.scss';
import apiObject from './apiService.js';
import createFormTpl from './tamplete/createForm.hbs';
import createPhotoListTpl from './tamplete/createPhotoList.hbs';
import createGalleryUlTpl from './tamplete/createGalleryUl.hbs';

document.body.insertAdjacentHTML('afterbegin', createGalleryUlTpl());
document.body.insertAdjacentHTML('afterbegin', createFormTpl());

const gallery = document.querySelector('.gallery');
const input = document.querySelector('[name="query"]');
const fragment = document.createDocumentFragment();

input.addEventListener('input', debounce(getQuery, 500));

function getQuery(e) {
  let query = e.target.value;

  apiObject.getPhoto(query).then(({ hits }) => {
    gallery.innerHTML = createPhotoListTpl(hits);
  });
}
