'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@mui/material';
import styles from './CompanyTaxesPage.module.scss';

interface CompanyData {
  id: number;
  name: string;
  is_public: boolean;
  industry: string;
  tax_data: {
    company_name: string;
    cik?: string;
    yearly_taxes: Array<{
      year: number | string;
      amount: number;
      formatted_amount: string;
      source: string;
    }>;
    data_source: string;
    retrieved_at: string;
  };
  annual_revenue: number;
  annual_revenue_formatted: string;
  revenue_trend: Array<{
    year: number;
    revenue: number;
    revenue_formatted: string;
  }>;
  key_metrics: {
    market_cap: number;
    market_cap_formatted: string;
    pe_ratio: number;
    dividend_yield: number | null;
    fifty_two_week_high: number;
    fifty_two_week_low: number;
  };
  industry_comparison: Array<{
    id: number;
    name: string;
    stock_symbol: string;
    market_cap: number;
    market_cap_formatted: string;
    pe_ratio: number;
    dividend_yield: number;
  }>;
}

// Default mock data (using your provided Adobe Inc. JSON)
const defaultCompanyData: CompanyData = {
  id: 15,
  name: "Company",
  is_public: true,

  industry: "Технологии",
  tax_data: {
    company_name: "ADOBE INC.",
    cik: "0000796343",
    yearly_taxes: [
      {
        year: 2025,
        amount: 348000000,
        formatted_amount: "$348.00 million",
        source: "SEC EDGAR"
      },
      {
        year: 2025,
        amount: 371000000,
        formatted_amount: "$371.00 million",
        source: "SEC EDGAR"
      },
      {
        year: 2024,
        amount: 1252000000,
        formatted_amount: "$1.25 billion",
        source: "SEC EDGAR"
      },
      {
        year: 2024,
        amount: 351000000,
        formatted_amount: "$351.00 million",
        source: "SEC EDGAR"
      },
      {
        year: 2024,
        amount: 706000000,
        formatted_amount: "$706.00 million",
        source: "SEC EDGAR"
      }
    ],
    data_source: "SEC EDGAR",
    retrieved_at: "2025-03-30T17:53:29.266679"
  },
  annual_revenue: 9284640000,
  annual_revenue_formatted: "$9.28 billion",
  revenue_trend: [
    {
      year: 2025,
      revenue: 9284640000,
      revenue_formatted: "$9.28 billion"
    },
    {
      year: 2025,
      revenue: 9898280000,
      revenue_formatted: "$9.90 billion"
    },
    {
      year: 2024,
      revenue: 33403360000,
      revenue_formatted: "$33.40 billion"
    },
    {
      year: 2024,
      revenue: 9364680000,
      revenue_formatted: "$9.36 billion"
    },
    {
      year: 2024,
      revenue: 18836080000,
      revenue_formatted: "$18.84 billion"
    }
  ],
  key_metrics: {
    market_cap: 156521955328,
    market_cap_formatted: "156.5B",
    pe_ratio: 24.272968,
    dividend_yield: null,
    fifty_two_week_high: 587.75,
    fifty_two_week_low: 366.29
  },
  industry_comparison: [
    {
      id: 3,
      name: "Apple Inc.",
      stock_symbol: "AAPL",
      market_cap: 3052340510720,
      market_cap_formatted: "3052.3B",
      pe_ratio: 32.25238,
      dividend_yield: 0.49
    },
    {
      id: 4,
      name: "Microsoft Corporation",
      stock_symbol: "MSFT",
      market_cap: 2773692186624,
      market_cap_formatted: "2773.7B",
      pe_ratio: 30.041061,
      dividend_yield: 0.89
    },
    {
      id: 6,
      name: "Alphabet Inc. (Google)",
      stock_symbol: "GOOGL",
      market_cap: 1847782014976,
      market_cap_formatted: "1847.8B",
      pe_ratio: 18.769615,
      dividend_yield: 0.53
    },
    {
      id: 7,
      name: "Meta Platforms, Inc.",
      stock_symbol: "META",
      market_cap: 1346944237568,
      market_cap_formatted: "1346.9B",
      pe_ratio: 22.27147,
      dividend_yield: 0.4
    },
    {
      id: 16,
      name: "Salesforce, Inc.",
      stock_symbol: "CRM",
      market_cap: 245276033024,
      market_cap_formatted: "245.3B",
      pe_ratio: 40.1305,
      dividend_yield: 0.65
    }
  ]
};

const CompanyTaxesPage: React.FC<{ companyData?: CompanyData }> = ({
  companyData = defaultCompanyData,
}) => {
  // Optionally extract companyId from the URL (if using dynamic routes)
  const { companyId } = useParams() as { companyId: string };

  return (
    <Container maxWidth="md" className={styles.container}>
      {/* Company Basic Information */}
      <Typography variant="h4" className={styles.title}>
        {companyData.name} Taxes 
      </Typography>
     

      {/* Tax Data Section */}
      <Paper className={styles.section}>
        <Typography variant="h5" className={styles.sectionTitle}>
          Tax Data
        </Typography>
        <Typography variant="body2" className={styles.note}>
          Data Source: {companyData.tax_data.data_source} | Retrieved at:{" "}
          {new Date(companyData.tax_data.retrieved_at).toLocaleString()}
        </Typography>
        <Table className={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell>Year</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Source</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companyData.tax_data.yearly_taxes.map((tax, idx) => (
              <TableRow key={idx}>
                <TableCell>{tax.year}</TableCell>
                <TableCell>{tax.formatted_amount}</TableCell>
                <TableCell>{tax.source}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Annual Revenue Section */}
      <Paper className={styles.section}>
        <Typography variant="h5" className={styles.sectionTitle}>
          Annual Revenue
        </Typography>
        <Typography variant="h6" className={styles.revenue}>
          {companyData.annual_revenue_formatted}
        </Typography>
      </Paper>

      {/* Revenue Trend Section */}
      <Paper className={styles.section}>
        <Typography variant="h5" className={styles.sectionTitle}>
          Revenue Trend
        </Typography>
        <Table className={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell>Year</TableCell>
              <TableCell>Revenue</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companyData.revenue_trend.map((trend, idx) => (
              <TableRow key={idx}>
                <TableCell>{trend.year}</TableCell>
                <TableCell>{trend.revenue_formatted}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Key Metrics Section */}
      <Paper className={styles.section}>
        <Typography variant="h5" className={styles.sectionTitle}>
          Key Metrics
        </Typography>
        <Table className={styles.infoTable}>
          <TableBody>
            <TableRow>
              <TableCell>Market Cap</TableCell>
              <TableCell>{companyData.key_metrics.market_cap_formatted}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>P/E Ratio</TableCell>
              <TableCell>{companyData.key_metrics.pe_ratio}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Dividend Yield</TableCell>
              <TableCell>{companyData.key_metrics.dividend_yield !== null ? companyData.key_metrics.dividend_yield : 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>52 Week High</TableCell>
              <TableCell>{companyData.key_metrics.fifty_two_week_high}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>52 Week Low</TableCell>
              <TableCell>{companyData.key_metrics.fifty_two_week_low}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>

      {/* Industry Comparison Section */}
      <Paper className={styles.section}>
        <Typography variant="h5" className={styles.sectionTitle}>
          Industry Comparison
        </Typography>
        <Table className={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Stock Symbol</TableCell>
              <TableCell>Market Cap</TableCell>
              <TableCell>P/E Ratio</TableCell>
              <TableCell>Dividend Yield</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companyData.industry_comparison.map((comp, idx) => (
              <TableRow key={idx}>
                <TableCell>{comp.name}</TableCell>
                <TableCell>{comp.stock_symbol}</TableCell>
                <TableCell>{comp.market_cap_formatted}</TableCell>
                <TableCell>{comp.pe_ratio}</TableCell>
                <TableCell>{comp.dividend_yield}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default CompanyTaxesPage;
