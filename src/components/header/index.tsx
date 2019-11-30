import React from 'react';
import styles from './style.module.css';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className={styles.header}>
      <Link to="/">
        <h1>Movies</h1>
      </Link>
    </div>
  );
}
