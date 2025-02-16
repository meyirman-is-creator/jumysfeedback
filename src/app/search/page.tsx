"use client"
import React from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import styles from './SearchPage.module.scss';

const SearchPage = () => {
  return (
    <Container maxWidth="md" className={styles['search-page']}>
      <Typography variant="h4" className={styles['search-page__title']}>
        Search
      </Typography>

      <div className={styles['search-page__controls']}>
        <TextField
          label="Keyword"
          variant="outlined"
          className={styles['search-page__input']}
        />
        <Button
          variant="contained"
          color="primary"
          className={styles['search-page__button']}
        >
          Search
        </Button>
      </div>

      {/* Результаты поиска */}
      <div className={styles['search-page__results']}>
        <Typography variant="body1">No results yet...</Typography>
      </div>
    </Container>
  );
};

export default SearchPage;
