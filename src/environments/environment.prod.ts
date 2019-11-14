export const environment = {
  production: true,
  _apiUrl: 'http://coolmart.herokuapp.com',

  get apiUrl() {
    return this._apiUrl;
  }
};
