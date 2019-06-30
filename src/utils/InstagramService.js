import { loadJSONP } from './loadJSONP';

export const InstagramService = {
  // This really shouldn't be stored here, but it's sandboxed and anybody can't really do much with it.
  accessToken: '202391883.a7b08ff.11f9b6af5d5143afadbdb696cb2549c4',
  apiUrl: 'https://api.instagram.com/v1',
  makeRequest(path) {
    return loadJSONP(
      `${this.apiUrl}${path}?access_token=${this.accessToken}`
    ).then(function(res) {
      if (res.meta.code >= 200 && res.meta.code < 400) {
        return res.data;
      }

      return Promise.reject(res.meta);
    });
  },
  getMedia() {
    return this.makeRequest('/users/self/media/recent');
  }
};
