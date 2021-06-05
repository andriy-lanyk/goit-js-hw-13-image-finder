import './sass/main.scss';
import apiObject from './apiService.js';
import createFormTpl from './tamplete/createForm.hbs';

document.body.insertAdjacentHTML('afterbegin', createFormTpl());

apiObject.getPhoto().then(res => {
  console.log('res: ', res);
});
