'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import { Container, Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import styles from './CompanySalariesPage.module.scss';

const CompanySalariesPage = () => {
  const { companyId } = useParams() as { companyId: string };
  const salaries = [
    { position: 'Software Engineer', amount: 5000 },
    { position: 'QA Engineer', amount: 4000 },
  ];

  return (
    <Container maxWidth="md" className={styles['company-salaries']}>
      <Typography variant="h4" className={styles['company-salaries__title']}>
        Salaries at Company {companyId}
      </Typography>

      <Table className={styles['company-salaries__table']}>
        <TableHead>
          <TableRow>
            <TableCell>Position</TableCell>
            <TableCell>Amount (USD)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {salaries.map((item, idx) => (
            <TableRow key={idx}>
              <TableCell>{item.position}</TableCell>
              <TableCell>{item.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default CompanySalariesPage;
