import httpClient from 'http-utils';

export function getMovie(id: number) {
  return httpClient()
    .get(`movie/${id}`)
    .then(response => response)
    .catch(error => {
      throw error;
    });
}

export function getTrailers(id: number) {
  return httpClient()
    .get(`movie/${id}/videos`)
    .then(response => response)
    .catch(error => {
      throw error;
    });
}
