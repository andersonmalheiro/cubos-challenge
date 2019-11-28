import React, { useState } from 'react';

import styles from './style.module.css';
import Header from 'components/header';
import MovieResult, { MovieSearchResult } from 'components/movie-result';
import search from 'api/search';

export default function Home() {
  const [movies, setMovies] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');

  async function loadData(event: any, value: string) {
    event.preventDefault();

    await search(value)
      .then(response => {
        if (response.data.hasOwnProperty('results')) {
          setMovies(response.data.results);
        }
      })
      .catch(error => {
        setMovies([]);
      });
  }

  const handleInputChange = (event: { target: any }) => {
    const target = event.target;
    const value = target.value;
    setSearchValue(value);
  };

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
            placeholder="Busque por nome, ano ou gênero..."
            onChange={e => handleInputChange(e)}
          />
        </form>
        <div className={styles.results}>
          {movies && movies.length ? (
            movies.map((item, key) => {
              const movie: MovieSearchResult = {
                overview: item.overview,
                poster_path: item.poster_path,
                release_date: item.release_date,
                title: item.title,
                vote_average: item.vote_average,
              };
              return <MovieResult key={key} data={movie} />;
            })
          ) : (
            <div className={styles.empty}>
              <p>Nenhum filme encontrado.</p>
              <p>Faça uma busca para ver resultados.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
