import React from 'react';
import { Button, TextField, Typography, Container, Box } from '@mui/material';
import styles from './RegisterPage.module.scss';

const RegisterPage = () => {
  return (
    <Container maxWidth="sm" className={styles['register-page']}>
      <Typography variant="h4" className={styles['register-page__title']}>
        Register
      </Typography>

      <Box
        component="form"
        className={styles['register-page__form']}
        
      >
        <TextField
          label="Name"
          variant="outlined"
          className={styles['register-page__input']}
          fullWidth
          required
        />
        <TextField
          label="Email"
          variant="outlined"
          className={styles['register-page__input']}
          fullWidth
          required
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          className={styles['register-page__input']}
          fullWidth
          required
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={styles['register-page__submit']}
        >
          Sign Up
        </Button>
      </Box>
    </Container>
  );
};

export default RegisterPage;
