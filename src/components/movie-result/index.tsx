import React from 'react';
import styles from './style.module.css';

export interface MovieSearchResult {
  title: string;
  poster_path: string;
  release_date: string;
  overview: string;
  vote_average: number;
}

export default function MovieResult(props: { data: MovieSearchResult }) {
  const { data } = props;
  return (
    <div className={styles.container}>
      <div className={styles.movie_img}>
        <img
          src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${data.poster_path}`}
          alt="cover"
        />
      </div>
      <div className={styles.movie_details}>
        <div className={styles.details_header}>
          <h1>{data.title}</h1>
        </div>
        <div className={styles.percentual}>
          <div>{data.vote_average * 10}%</div>
        </div>
        <div className={styles.details_main}>
          <span className={styles.date}>{data.release_date}</span>
          <p className={styles.sinopse}>{data.overview}</p>
          <div className={styles.tags}>
            <div className={styles.tag}>Ação</div>
          </div>
        </div>
      </div>
    </div>
  );
}
