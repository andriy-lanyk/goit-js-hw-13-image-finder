import './sass/main.scss';
import apiObject from './apiService.js';

apiObject.getPhoto().then(res => {
  console.log('res: ', res);
});
