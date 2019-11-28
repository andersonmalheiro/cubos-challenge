import httpClient from 'http-utils';

export default function search(value: string) {
  const params = {
    language: 'en-US',
    query: value,
    include_adult: false,
    api_key: '94a700b37cd881aa3d9da9fb8c46acdf',
  };

  return httpClient
    .get('search/movie', { params })
    .then(response => response)
    .catch(error => {
      throw error;
    });
}
