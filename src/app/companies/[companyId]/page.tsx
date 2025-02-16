import React from 'react';
import { useParams } from 'next/navigation';
import { Container, Typography, Tabs, Tab, Box } from '@mui/material';
import styles from './CompanyOverviewPage.module.scss';

const CompanyOverviewPage = () => {
  const params = useParams();
  const companyId = params.companyId; // Динамический ID

  // Логика загрузки данных о компании (React Query / fetch / Redux и т.д.)

  const [activeTab, setActiveTab] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth="md" className={styles['company-overview']}>
      <Typography variant="h4" className={styles['company-overview__title']}>
        Company {companyId}
      </Typography>

      <Tabs
        value={activeTab}
        onChange={handleChange}
        className={styles['company-overview__tabs']}
      >
        <Tab label="Overall" />
        <Tab label="Reviews" />
        <Tab label="Salaries" />
        <Tab label="Interviews" />
        <Tab label="Benefits" />
      </Tabs>

      <Box className={styles['company-overview__tab-panel']}>
        {activeTab === 0 && <Typography>Overall Info</Typography>}
        {activeTab === 1 && <Typography>Reviews Info</Typography>}
        {activeTab === 2 && <Typography>Salaries Info</Typography>}
        {activeTab === 3 && <Typography>Interviews Info</Typography>}
        {activeTab === 4 && <Typography>Benefits Info</Typography>}
      </Box>
    </Container>
  );
};

export default CompanyOverviewPage;
