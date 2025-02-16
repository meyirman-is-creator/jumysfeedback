"use client"
import React from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import styles from './ProfileAccountSettingsPage.module.scss';

const AccountSettingsPage = () => {
  return (
    <Container maxWidth="sm" className={styles['account-settings']}>
      <Typography variant="h4" className={styles['account-settings__title']}>
        Account Settings
      </Typography>

      <form
        className={styles['account-settings__form']}
        onSubmit={(e) => {
          e.preventDefault();
          // handle update settings
        }}
      >
        <TextField
          label="Name"
          variant="outlined"
          required
          className={styles['account-settings__input']}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          required
          className={styles['account-settings__input']}
        />
        <Button variant="contained" color="primary" type="submit">
          Update
        </Button>
      </form>
    </Container>
  );
};

export default AccountSettingsPage;
