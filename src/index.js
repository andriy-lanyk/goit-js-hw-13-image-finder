import debounce from 'lodash.debounce';
import * as basicLightbox from 'basiclightbox';
import './sass/main.scss';
import apiObject from './apiService.js';
import createFormTpl from './tamplete/createForm.hbs';
import createPhotoListTpl from './tamplete/createPhotoList.hbs';
import createGalleryUlTpl from './tamplete/createGalleryUl.hbs';

document.body.insertAdjacentHTML('afterbegin', createGalleryUlTpl());
document.body.insertAdjacentHTML('afterbegin', createFormTpl());

const gallery = document.querySelector('.gallery');
gallery.addEventListener('click', ShowBigImg);

const input = document.querySelector('[name="query"]');
input.addEventListener('input', debounce(getQuery, 500));

function getQuery(e) {
  let query = e.target.value.toLowerCase().trim();

  apiObject.getPhoto(query).then(({ hits }) => {
    gallery.innerHTML = createPhotoListTpl(hits);
    hits.map(photo => {
      console.log('photo: ', photo.largeImageURL);
    });
  });
}

function createButtonLoadMore() {}

function ShowBigImg(e) {
  const target = e.target;
  if (target.hasAttribute('src')) {
    console.log(target);
    const html = `<img src="https://pixabay.com/get/g435a2d4e32602e80724aabaefdb7572ea4944cd83101826142f9692dd7f68a46b7bd717ba6d54a3057d27ec472805745a2f50c00b62057241f3bf2552f8fa571_1280.jpg" width="800" height="600"`;

    const instance = basicLightbox
      .create(html, {
        className: 'lightbox',
      })
      .show(() => console.log('lightbox now visible'));
  }
}
