import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './style.module.css';
import Header from 'components/header';
import MovieDetail from 'components/movie-details';
import { DetailState, getDetail, getVideos } from 'store/reducers/detail';
import { AppState } from 'store/reducers';

export default function DetailsPage(props: { match: any }) {
  const { match } = props;
  const dispatch = useDispatch();
  const detailState: DetailState = useSelector(
    (state: AppState) => state.detail,
  );

  useEffect(() => {
    dispatch(getDetail(match.params.id));
    dispatch(getVideos(match.params.id));
  }, []);

  document.title = `Details - ${detailState.movie.title}`;

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.main}>
        <MovieDetail movie={detailState.movie} />
      </div>
      <div className={styles.trailers_container}>
        {detailState.trailers.length &&
          detailState.trailers.map((trailer: any, key) => {
            return (
              <iframe
                key={key}
                width="100%"
                height="400px"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            );
          })}
      </div>
    </div>
  );
}
