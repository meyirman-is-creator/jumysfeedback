"use client"
import React from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import styles from './CreateInterviewPage.module.scss';

const CreateInterviewPage = () => {
  return (
    <Container maxWidth="md" className={styles['create-interview']}>
      <Typography variant="h4" className={styles['create-interview__title']}>
        Create Interview Q/A
      </Typography>

      <form
        className={styles['create-interview__form']}
        onSubmit={(e) => {
          e.preventDefault();
          // handle submit
        }}
      >
        <TextField
          label="Company ID"
          variant="outlined"
          required
          className={styles['create-interview__input']}
        />
        <TextField
          label="Question"
          variant="outlined"
          required
          className={styles['create-interview__input']}
        />
        <TextField
          label="Answer"
          variant="outlined"
          multiline
          rows={4}
          required
          className={styles['create-interview__input']}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit Interview
        </Button>
      </form>
    </Container>
  );
};

export default CreateInterviewPage;
