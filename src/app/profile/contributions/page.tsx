"use client"
import React from 'react';
import { Container, Typography, Tabs, Tab, Box } from '@mui/material';
import styles from './ProfileContributionsPage.module.scss';

const ProfileContributionsPage = () => {
  const [activeTab, setActiveTab] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth="md" className={styles['profile-contributions']}>
      <Typography variant="h4" className={styles['profile-contributions__title']}>
        My Contributions
      </Typography>

      <Tabs value={activeTab} onChange={handleChange}>
        <Tab label="Reviews" />
        <Tab label="Salary" />
        <Tab label="Interview Q/A" />
        <Tab label="Benefits" />
      </Tabs>

      <Box className={styles['profile-contributions__tab-panel']}>
        {activeTab === 0 && <Typography>My Reviews...</Typography>}
        {activeTab === 1 && <Typography>My Salary Info...</Typography>}
        {activeTab === 2 && <Typography>My Interview Q/A...</Typography>}
        {activeTab === 3 && <Typography>My Benefits Info...</Typography>}
      </Box>
    </Container>
  );
};

export default ProfileContributionsPage;
