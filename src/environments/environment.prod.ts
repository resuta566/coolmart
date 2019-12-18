export const environment = {
  production: true,
  _apiUrl: 'http://coolmart.herokuapp.com',
<<<<<<< HEAD
=======

  _addressApi: 'http://allcooldata.herokuapp.com',


  get addressApiUrl() {
    return this._addressApi;
  },
>>>>>>> development

  get apiUrl() {
    return this._apiUrl;
  }
};
