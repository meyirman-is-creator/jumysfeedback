import React from 'react';
import { useParams } from 'next/navigation';
import { Container, Typography, List, ListItem } from '@mui/material';
import styles from './CompanyInterviewsPage.module.scss';

const CompanyInterviewsPage = () => {
  const { companyId } = useParams() as { companyId: string };
  const interviews = [
    { question: 'What is your biggest strength?', answer: '...' },
    { question: 'Tell us about your experience with React.', answer: '...' },
  ];

  return (
    <Container maxWidth="md" className={styles['company-interviews']}>
      <Typography variant="h4" className={styles['company-interviews__title']}>
        Interviews at Company {companyId}
      </Typography>

      <List className={styles['company-interviews__list']}>
        {interviews.map((interview, idx) => (
          <ListItem key={idx}>
            <Typography variant="subtitle1">Q: {interview.question}</Typography>
            <Typography variant="body2">A: {interview.answer}</Typography>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default CompanyInterviewsPage;
