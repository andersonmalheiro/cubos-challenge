import React, { useState, useEffect } from 'react';

import { AppState } from 'store/reducers';
import { useSelector, useDispatch } from 'react-redux';
import { SearchState, searchByName } from 'store/reducers/search';

import styles from './style.module.css';
import Header from 'components/header';
import MovieResult, { MovieSearchResult } from 'components/movie-result';
import { searchByGenre, getGenres } from 'api/search';

import { FaSpinner } from 'react-icons/fa';

export default function Home() {
  const [movies, setMovies] = useState<any[]>([]);
  const [genres, setGenres] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');

  const searchState: SearchState = useSelector(
    (state: AppState) => state.search,
  );

  const dispatch = useDispatch();

  async function loadData(event: any, value: string) {
    event.preventDefault();
    dispatch(searchByName(value));
  }

  async function loadByGenre(event: any, genreId: number) {
    // event.preventDefault();

    await searchByGenre(genreId)
      .then(response => {
        if (response.data.hasOwnProperty('results')) {
          setMovies(response.data.results);
        }
      })
      .catch(error => {
        setMovies([]);
      });
  }

  async function getGenreList() {
    await getGenres()
      .then(response => {
        if (response.data.hasOwnProperty('genres')) {
          setGenres(response.data.genres);
        }
      })
      .catch(error => {
        setGenres([]);
      });
  }

  const handleInputChange = (event: { target: any }) => {
    const target = event.target;
    const value = target.value;
    setSearchValue(value);
  };

  const handleSelectChange = (event: { target: any }) => {
    const target = event.target;
    const value = target.value;
    if (value) {
      loadByGenre({}, value);
    }
  };

  useEffect(() => {
    getGenreList();
  }, []);

  document.title = 'Cubos Movie Search';

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.main}>
        <form
          onSubmit={e => loadData(e, searchValue)}
          style={{ display: 'flex' }}
        >
          <input
            type="text"
            required
            className={styles.search_input}
            placeholder="Busque por nome..."
            onChange={e => handleInputChange(e)}
          />

          <select
            name="genres"
            id="genres"
            className={styles.select_input}
            onChange={e => handleSelectChange(e)}
          >
            <option value="">Selecione um gênero</option>
            {genres.length &&
              genres.map((genre: { id: number; name: string }, key) => {
                return (
                  <option key={key} value={genre.id}>
                    {genre.name}
                  </option>
                );
              })}
          </select>
        </form>
        <div className={styles.results}>
          {searchState.movies &&
          searchState.movies.length &&
          !searchState.loading ? (
            searchState.movies.map((item, key) => {
              const movie: MovieSearchResult = {
                overview: item.overview,
                poster_path: item.poster_path,
                release_date: item.release_date,
                title: item.title,
                vote_average: item.vote_average,
              };
              return <MovieResult key={key} data={movie} />;
            })
          ) : searchState.loading ? (
            <div className={styles.center}>
              <FaSpinner className={styles.rotate} />
            </div>
          ) : (
            <div className={styles.center}>
              <p>Nenhum filme encontrado.</p>
              <p>Faça uma busca para ver resultados.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
