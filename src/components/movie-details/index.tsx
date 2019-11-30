import React from 'react';
import styles from './style.module.css';
import genres from 'genres';

export interface Movie {
  backdrop_path: string;
  budget: number;
  genres: any[];
  id: number;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  revenue: number;
  runtime: number;
  status: string;
  title: string;
  video: boolean;
  vote_average: number;
  original_language: string;
}

export default function MovieDetail(props: { movie: Movie }) {
  const { movie } = props;

  const timeConvert = (n: number) => {
    const num = n;
    const hours = num / 60;
    const rhours = Math.floor(hours);
    const minutes = (hours - rhours) * 60;
    const rminutes = Math.round(minutes);
    return rhours + 'H' + rminutes + 'min';
  };

  const formatter = Intl.NumberFormat('us', {
    currency: 'USD',
    style: 'currency',
  });

  return (
    <div className={styles.container}>
      <img
        src={`https://image.tmdb.org/t/p/w300/${movie.backdrop_path}`}
        alt=""
        className={styles.backcover}
      />
      <img
        src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
        alt=""
        className={styles.mobile_cover}
      />
      <div className={styles.header}>
        <h1 className={styles.title}>{movie.title}</h1>
        <span className={styles.date}>{movie.release_date}</span>
      </div>
      <div className={styles.main_details}>
        <div className={styles.details}>
          <div className={styles.section}>
            <h2 className={styles.section_title}>Sinopse</h2>
            <p>{movie.overview}</p>
          </div>
          <div className={styles.section}>
            <h2 className={styles.section_title}>Informações</h2>
            <div className={styles.informations}>
              <div className={styles.metadata}>
                <h3 className={styles.metadata_title}>Situação</h3>
                <span className={styles.metadata_value}>{movie.status}</span>
              </div>
              <div className={styles.metadata}>
                <h3 className={styles.metadata_title}>Idioma</h3>
                <span className={styles.metadata_value}>
                  {movie.original_language}
                </span>
              </div>
              <div className={styles.metadata}>
                <h3 className={styles.metadata_title}>Duração</h3>
                <span className={styles.metadata_value}>
                  {timeConvert(movie.runtime)}
                </span>
              </div>
              <div className={styles.metadata}>
                <h3 className={styles.metadata_title}>Receita</h3>
                <span className={styles.metadata_value}>
                  {formatter.format(movie.revenue)}
                </span>
              </div>
              <div className={styles.metadata}>
                <h3 className={styles.metadata_title}>Lucro</h3>
                <span className={styles.metadata_value}>
                  {formatter.format(movie.revenue - movie.budget)}
                </span>
              </div>
            </div>
            <div className={styles.tags}>
              {movie.genres &&
                movie.genres.map((genre, key) => {
                  return (
                    <div key={key} className={styles.tag}>
                      {genre.name}
                    </div>
                  );
                })}
            </div>
          </div>
          <div className={styles.percentual}>{movie.vote_average * 10}%</div>
        </div>
        <div className={styles.cover}>
          <img
            src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
