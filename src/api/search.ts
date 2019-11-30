import httpClient from 'http-utils';

export function search(name: string, page?: number) {
  const params = {
    query: name,
    include_adult: true,
    page,
  };

  return httpClient()
    .get('search/movie', { params })
    .then(response => response)
    .catch(error => {
      throw error;
    });
}

export function searchByGenre(genreId: number, page?: number) {
  const params = {
    with_genres: genreId,
    include_adult: true,
    page,
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
