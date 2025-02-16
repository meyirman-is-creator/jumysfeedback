import React from 'react';
import { Container, Typography, Grid, Card, CardContent } from '@mui/material';
import styles from './CompaniesPage.module.scss';

const CompaniesPage = () => {
  // Пример статического массива компаний
  const companies = [
    { id: '1', name: 'Company A', description: 'Lorem ipsum dolor sit amet' },
    { id: '2', name: 'Company B', description: 'Consectetur adipiscing elit' },
  ];

  return (
    <Container maxWidth="lg" className={styles['companies-page']}>
      <Typography variant="h4" className={styles['companies-page__title']}>
        Companies
      </Typography>

      <Grid container spacing={2}>
        {companies.map((company) => (
          <Grid item xs={12} sm={6} md={4} key={company.id}>
            <Card className={styles['companies-page__card']}>
              <CardContent>
                <Typography variant="h6">
                  {company.name}
                </Typography>
                <Typography variant="body2">
                  {company.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CompaniesPage;
