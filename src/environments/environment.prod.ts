export const environment = {
  production: true,
  _apiUrl: 'http://192.168.254.101/newgencool-backend/public',

  get apiUrl() {
    return this._apiUrl;
  }
};
