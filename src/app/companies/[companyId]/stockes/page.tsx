'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import { Container, Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import styles from './CompanyStockes.module.scss';

const CompanyStockesPage = () => {
  const { companyId } = useParams() as { companyId: string };
  const taxes = [
    { position: 'Software Engineer', amount: 5000 },
    { position: 'QA Engineer', amount: 4000 },
  ];

  return (
    <Container maxWidth="md" className={styles['company-salaries']}>
      <Typography variant="h4" className={styles['company-salaries__title']}>
        Stockes at company {companyId}
      </Typography>

      <Table className={styles['company-salaries__table']}>
        <TableHead>
          <TableRow>
            <TableCell>Position</TableCell>
            <TableCell>Amount (USD)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {taxes.map((tax, idx) => (
            <TableRow key={idx}>
              <TableCell>{tax.position}</TableCell>
              <TableCell>{tax.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default CompanyStockesPage;
