"use client"
import React from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import styles from './CreateReviewPage.module.scss';

const CreateReviewPage = () => {
  return (
    <Container maxWidth="md" className={styles['create-review']}>
      <Typography variant="h4" className={styles['create-review__title']}>
        Create Review
      </Typography>

      <form
        className={styles['create-review__form']}
        onSubmit={(e) => {
          e.preventDefault();
          // handle submit
        }}
      >
        <TextField
          label="Company ID"
          variant="outlined"
          required
          className={styles['create-review__input']}
        />
        <TextField
          label="Review Text"
          variant="outlined"
          multiline
          rows={4}
          required
          className={styles['create-review__input']}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit Review
        </Button>
      </form>
    </Container>
  );
};

export default CreateReviewPage;
