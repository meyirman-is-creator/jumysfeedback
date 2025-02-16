"use client"
import React from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import styles from './CreateSalaryPage.module.scss';

const CreateSalaryPage = () => {
  return (
    <Container maxWidth="md" className={styles['create-salary']}>
      <Typography variant="h4" className={styles['create-salary__title']}>
        Create Salary Review
      </Typography>

      <form
        className={styles['create-salary__form']}
        onSubmit={(e) => {
          e.preventDefault();
          // handle submit
        }}
      >
        <TextField
          label="Company ID"
          variant="outlined"
          required
          className={styles['create-salary__input']}
        />
        <TextField
          label="Position"
          variant="outlined"
          required
          className={styles['create-salary__input']}
        />
        <TextField
          label="Salary"
          variant="outlined"
          type="number"
          required
          className={styles['create-salary__input']}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit Salary
        </Button>
      </form>
    </Container>
  );
};

export default CreateSalaryPage;
