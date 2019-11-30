import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './style.module.css';
import isEmpty from 'lodash/isEmpty';
import Header from 'components/header';
import MovieResult, { MovieSearchResult } from 'components/movie-result';
import { AppState } from 'store/reducers';
import {
  SearchState,
  searchByName,
  getMoviesByGenre,
} from 'store/reducers/movies';
import {
  FaSpinner,
  FaChevronCircleLeft,
  FaChevronCircleRight,
} from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
import { getGenres } from 'api/search';

export default function Home() {
  const [genres, setGenres] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState<any>('');
  const [isGenre, setIsGenre] = useState<boolean>(false);

  const movieState: SearchState = useSelector(
    (state: AppState) => state.movies,
  );

  const dispatch = useDispatch();

  function loadData(event: any, value: string, page?: number) {
    if (!isEmpty(event)) {
      event.preventDefault();
    }
    dispatch(searchByName(value, page));
  }

  function loadByGenre(genreId: number, page?: number) {
    dispatch(getMoviesByGenre(genreId, page));
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
    setIsGenre(false);
  };

  const handleSelectChange = (event: { target: any }) => {
    const target = event.target;
    const value = target.value;
    setSearchValue(value);
    setIsGenre(true);
    if (value) {
      loadByGenre(value);
    }
  };

  const paginateList = (event: { selected: number }) => {
    if (isGenre) {
      loadByGenre(searchValue, event.selected + 1);
    } else {
      loadData({}, searchValue, event.selected + 1);
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
          {movieState.data && movieState.data.length && !movieState.loading ? (
            movieState.data.map((item, key) => {
              const movie: MovieSearchResult = {
                overview: item.overview,
                poster_path: item.poster_path,
                release_date: item.release_date,
                title: item.title,
                vote_average: item.vote_average,
              };
              return <MovieResult key={key} data={movie} />;
            })
          ) : movieState.loading ? (
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
        {movieState.data.length ? (
          <div className={styles.pagination_container}>
            <ReactPaginate
              previousLabel={<FaChevronCircleLeft />}
              nextClassName={styles.page}
              nextLinkClassName={styles.page_link}
              previousClassName={styles.page}
              previousLinkClassName={styles.page_link}
              nextLabel={<FaChevronCircleRight />}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={movieState.total_pages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={e => {
                paginateList(e);
              }}
              containerClassName={styles.pagination}
              pageClassName={styles.page}
              pageLinkClassName={styles.page_link}
              activeClassName={styles.active}
            />
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
