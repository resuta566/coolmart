export const environment = {
  production: true,
  _apiUrl: 'http://192.168.254.101/coolmart365-backend/public',
  // _apiUrl: 'http://localhost:8000',
  // _apiUrl: 'http://coolmart.herokuapp.com',

  _addressApi: 'http://192.168.254.101/allcool/public',
  // _addressApi: 'http://allcooldata.herokuapp.com',


  get addressApiUrl() {
    return this._addressApi;
  },

  get apiUrl() {
    return this._apiUrl;
  }
};
