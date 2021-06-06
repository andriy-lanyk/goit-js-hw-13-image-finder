import debounce from 'lodash.debounce';
import { alert, notice, info, success, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import * as basicLightbox from 'basiclightbox';
import './sass/main.scss';
import apiObject from './apiService.js';
import createFormTpl from './tamplete/createForm.hbs';
import createPhotoListTpl from './tamplete/createPhotoList.hbs';
import createGalleryUlTpl from './tamplete/createGalleryUl.hbs';
import createButtonTpl from './tamplete/createButton.hbs';

document.body.insertAdjacentHTML('afterbegin', createButtonTpl());
document.body.insertAdjacentHTML('afterbegin', createGalleryUlTpl());
document.body.insertAdjacentHTML('afterbegin', createFormTpl());

const gallery = document.querySelector('.gallery');
// gallery.addEventListener('click', ShowBigImg);

const input = document.querySelector('[name="query"]');
input.addEventListener('input', debounce(getQuery, 500));

const button = document.querySelector('.button');
button.addEventListener('click', loadMorePhotos);

let query = '';
let pageNumber = 1;

console.log('query START: ', query);
console.log('pageNumber START: ', pageNumber);

function getQuery(e) {
  query = e.target.value.toLowerCase().trim();

  if (query === '') {
    gallery.innerHTML = '';
    pageNumber = 1;
    button.classList.add('hidden');
    return;
  }

  apiObject.getPhoto(query, pageNumber).then(({ hits }) => {
    console.log('query ADDPHOTO: ', query);
    console.log('pageNumber ADDPHOTO: ', pageNumber);
    gallery.innerHTML = createPhotoListTpl(hits);
    button.classList.remove('hidden');
    pageNumber += 1;
    successNotification();
    // hits.map(photo => {
    //   console.log('photo: ', photo.largeImageURL);
    // });
  });
}

function loadMorePhotos() {
  console.log('query BUTTON: ', query);
  console.log('pageNumber BUTTON: ', pageNumber);
  if (query) {
    apiObject.getPhoto(query, pageNumber).then(({ hits }) => {
      gallery.insertAdjacentHTML('beforeend', createPhotoListTpl(hits));
      pageNumber += 1;
      successNotification();
      let scrollToElement = gallery.children[gallery.children.length - 12];
      scrollToElement.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    });
  }
}

function successNotification() {
  success({
    text: 'Images have been uploaded successfully',
    maxTextHeight: null,
    delay: 2500,
  });
}

// function ShowBigImg(e) {
//   const target = e.target;
//   if (target.hasAttribute('src')) {
//     console.log(target);
//     const html = `<img src="https://pixabay.com/get/g435a2d4e32602e80724aabaefdb7572ea4944cd83101826142f9692dd7f68a46b7bd717ba6d54a3057d27ec472805745a2f50c00b62057241f3bf2552f8fa571_1280.jpg" width="800" height="600"`;

//     const instance = basicLightbox
//       .create(html, {
//         className: 'lightbox',
//       })
//       .show(() => console.log('lightbox now visible'));
//   }
// }
