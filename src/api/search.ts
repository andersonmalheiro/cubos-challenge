import httpClient from 'http-utils';

export function search(value: string) {
  const params = {
    language: 'en-US',
    query: value,
    include_adult: false,
  };

  return httpClient()
    .get('search/movie', { params })
    .then(response => response)
    .catch(error => {
      throw error;
    });
}

export function searchByGenre(genreId: number) {
  const params = {
    language: 'en-US',
    with_genres: genreId,
    include_adult: true,
  };

  return httpClient()
    .get('discover/movie', { params })
    .then(response => response)
    .catch(error => {
      throw error;
    });
}

export function getGenres() {
  const params = {
    language: 'en-US',
  };

  return httpClient()
    .get('genre/movie/list', { params })
    .then(response => response)
    .catch(error => {
      throw error;
    });
}
