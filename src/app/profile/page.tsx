"use client"
import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import styles from './ProfilePage.module.scss';

const ProfilePage = () => {
  // Логика загрузки данных пользователя
  const user = { name: 'John Doe', email: 'john@example.com' };

  return (
    <Container maxWidth="md" className={styles['profile-page']}>
      <Typography variant="h4" className={styles['profile-page__title']}>
        My Profile
      </Typography>

      <Box className={styles['profile-page__info']}>
        <Typography variant="body1">
          Name: {user.name}
        </Typography>
        <Typography variant="body1">
          Email: {user.email}
        </Typography>
      </Box>
    </Container>
  );
};

export default ProfilePage;
