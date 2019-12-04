export const environment = {
  production: true,
  _apiUrl: 'http://coolmart.herokuapp.com',

  _addressApi: 'http://allcooldata.herokuapp.com',


  get addressApiUrl() {
    return this._addressApi;
  },

  get apiUrl() {
    return this._apiUrl;
  }
};
