import React from 'react';
import { useParams } from 'next/navigation';
import { Container, Typography, List, ListItem } from '@mui/material';
import styles from './CompanyBenefitsPage.module.scss';

const CompanyBenefitsPage = () => {
  const { companyId } = useParams() as { companyId: string };
  const benefits = ['Health Insurance', 'Flexible Schedule', 'Gym Membership'];

  return (
    <Container maxWidth="md" className={styles['company-benefits']}>
      <Typography variant="h4" className={styles['company-benefits__title']}>
        Benefits at Company {companyId}
      </Typography>

      <List className={styles['company-benefits__list']}>
        {benefits.map((benefit, idx) => (
          <ListItem key={idx}>{benefit}</ListItem>
        ))}
      </List>
    </Container>
  );
};

export default CompanyBenefitsPage;
