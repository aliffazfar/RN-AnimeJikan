import ky from 'ky';

const prefixUrl = 'https://api.jikan.moe/v4/anime/';

export const instance = ky.extend({
  prefixUrl,
  headers: {
    Accept: 'application/json',
  },
});
