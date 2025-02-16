"use client"
import React from 'react';
import { useParams } from 'next/navigation';
import { Container, Typography, List, ListItem } from '@mui/material';
import styles from './CompanyReviewsPage.module.scss';

const CompanyReviewsPage = () => {
  const { companyId } = useParams() as { companyId: string };
  // Пример статических отзывов
  const reviews = [
    { id: 1, text: 'Great place to work!' },
    { id: 2, text: 'Good benefits and culture.' },
  ];

  return (
    <Container maxWidth="md" className={styles['company-reviews']}>
      <Typography variant="h4" className={styles['company-reviews__title']}>
        Reviews for Company {companyId}
      </Typography>

      <List className={styles['company-reviews__list']}>
        {reviews.map((review) => (
          <ListItem key={review.id} className={styles['company-reviews__list-item']}>
            {review.text}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default CompanyReviewsPage;
