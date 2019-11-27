import React from 'react';

import styles from './style.module.css';
import Header from 'components/header';

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.main}>
        <input
          type="text"
          className={styles.search_input}
          placeholder="Busque por nome, ano ou gênero..."
        />
      </div>
    </div>
  );
}
