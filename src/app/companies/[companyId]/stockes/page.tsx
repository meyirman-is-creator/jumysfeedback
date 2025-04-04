'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import { 
  Container, 
  Typography, 
  Paper, 
  Table, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableCell 
} from '@mui/material';
import styles from './CompanyStockes.module.scss';

const CompanyStockesPage = () => {
  const { companyId } = useParams() as { companyId: string };

  // Default mock data (Adobe Inc. sample) with all fields except tax_data is omitted from display
  const defaultCompanyData = {
    id: 15,
    name: "Adobe Inc.",
    is_public: true,
    stock_symbol: "ADBE",
    sec_cik: "0000796343",
    industry: "Технологии",
    stock_data: {
      symbol: "ADBE",
      company_name: "Adobe Inc.",
      current_price: 367.25,
      previous_close: 385.78,
      open: 371.875,
      day_high: 376.01,
      day_low: 366.29,
      volume: 5317625,
      market_cap: 156521955328,
      pe_ratio: 24.272968,
      dividend_yield: null,
      fifty_two_week_high: 587.75,
      fifty_two_week_low: 366.29,
      timestamp: "2025-04-04T08:47:33.143819",
      currency: "USD",
      price_change: -18.53,
      price_change_percent: -4.8,
      formatted_price: "367.25 USD",
      formatted_market_cap: "156.5B"
    },
    historical_stock_data: {
      symbol: "ADBE",
      period: "1y",
      interval: "1mo",
      data: [
        {
          date: "2024-05-01",
          open: 461.12,
          high: 496.76,
          low: 433.97,
          close: 444.76,
          volume: 63592000
        },
        {
          date: "2024-06-01",
          open: 447.58,
          high: 558.48,
          low: 436.58,
          close: 555.54,
          volume: 92072100
        },
        {
          date: "2024-07-01",
          open: 551.37,
          high: 580.55,
          low: 527.59,
          close: 551.65,
          volume: 51420600
        },
        {
          date: "2024-08-01",
          open: 549.99,
          high: 578.4,
          low: 500,
          close: 574.41,
          volume: 41274200
        },
        {
          date: "2024-09-01",
          open: 576.3,
          high: 587.75,
          low: 506.49,
          close: 517.78,
          volume: 71622300
        },
        {
          date: "2024-10-01",
          open: 517.45,
          high: 519,
          low: 477.38,
          close: 478.08,
          volume: 61014000
        },
        {
          date: "2024-11-01",
          open: 475.41,
          high: 539.92,
          low: 475.05,
          close: 515.93,
          volume: 53600700
        },
        {
          date: "2024-12-01",
          open: 512.85,
          high: 557.9,
          low: 432.47,
          close: 444.68,
          volume: 105644000
        },
        {
          date: "2025-01-01",
          open: 447.76,
          high: 450.12,
          low: 403.75,
          close: 437.45,
          volume: 80063500
        },
        {
          date: "2025-02-01",
          open: 437.8,
          high: 465.7,
          low: 430.88,
          close: 438.56,
          volume: 55423600
        },
        {
          date: "2025-03-01",
          open: 440.65,
          high: 453.26,
          low: 374.5,
          close: 383.53,
          volume: 94251600
        },
        {
          date: "2025-04-01",
          open: 381.13,
          high: 388,
          low: 367.77,
          close: 371.76,
          volume: 9377858
        }
      ],
      timestamp: "2025-04-03T16:51:22.879983"
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

  return (
    <Container maxWidth="md" className={styles.container}>
      <Typography variant="h4" className={styles.title}>
        Stock data
      </Typography>

      {/* Company Information Section */}
      <Paper className={styles.section}>
        <Typography variant="h5" className={styles.sectionTitle}>
          Company Information
        </Typography>
        <Table className={styles.table}>
          <TableBody>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>{defaultCompanyData.id}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Industry</TableCell>
              <TableCell>{defaultCompanyData.industry}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Public</TableCell>
              <TableCell>{defaultCompanyData.is_public ? "Yes" : "No"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Stock Symbol</TableCell>
              <TableCell>{defaultCompanyData.stock_symbol}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>SEC CIK</TableCell>
              <TableCell>{defaultCompanyData.sec_cik}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>

      {/* Stock Data Section */}
      <Paper className={styles.section}>
        <Typography variant="h5" className={styles.sectionTitle}>
          Stock Data
        </Typography>
        <Table className={styles.table}>
          <TableBody>
            <TableRow>
              <TableCell>Current Price</TableCell>
              <TableCell>
                {defaultCompanyData.stock_data.current_price} {defaultCompanyData.stock_data.currency}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Previous Close</TableCell>
              <TableCell>{defaultCompanyData.stock_data.previous_close}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Open</TableCell>
              <TableCell>{defaultCompanyData.stock_data.open}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Day High</TableCell>
              <TableCell>{defaultCompanyData.stock_data.day_high}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Day Low</TableCell>
              <TableCell>{defaultCompanyData.stock_data.day_low}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Volume</TableCell>
              <TableCell>{defaultCompanyData.stock_data.volume}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Market Cap</TableCell>
              <TableCell>{defaultCompanyData.stock_data.formatted_market_cap}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>P/E Ratio</TableCell>
              <TableCell>{defaultCompanyData.stock_data.pe_ratio}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Price Change</TableCell>
              <TableCell>{defaultCompanyData.stock_data.price_change}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Price Change %</TableCell>
              <TableCell>{defaultCompanyData.stock_data.price_change_percent}%</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>

      {/* Historical Stock Data Section */}
      <Paper className={styles.section}>
        <Typography variant="h5" className={styles.sectionTitle}>
          Historical Stock Data ({defaultCompanyData.historical_stock_data.period})
        </Typography>
        <Table className={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Open</TableCell>
              <TableCell>High</TableCell>
              <TableCell>Low</TableCell>
              <TableCell>Close</TableCell>
              <TableCell>Volume</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {defaultCompanyData.historical_stock_data.data.map((entry, idx) => (
              <TableRow key={idx}>
                <TableCell>{entry.date}</TableCell>
                <TableCell>{entry.open}</TableCell>
                <TableCell>{entry.high}</TableCell>
                <TableCell>{entry.low}</TableCell>
                <TableCell>{entry.close}</TableCell>
                <TableCell>{entry.volume}</TableCell>
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
          {defaultCompanyData.annual_revenue_formatted}
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
            {defaultCompanyData.revenue_trend.map((entry, idx) => (
              <TableRow key={idx}>
                <TableCell>{entry.year}</TableCell>
                <TableCell>{entry.revenue_formatted}</TableCell>
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
        <Table className={styles.table}>
          <TableBody>
            <TableRow>
              <TableCell>Market Cap</TableCell>
              <TableCell>{defaultCompanyData.key_metrics.market_cap_formatted}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>P/E Ratio</TableCell>
              <TableCell>{defaultCompanyData.key_metrics.pe_ratio}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Dividend Yield</TableCell>
              <TableCell>
                {defaultCompanyData.key_metrics.dividend_yield !== null ? defaultCompanyData.key_metrics.dividend_yield : 'N/A'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>52 Week High</TableCell>
              <TableCell>{defaultCompanyData.key_metrics.fifty_two_week_high}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>52 Week Low</TableCell>
              <TableCell>{defaultCompanyData.key_metrics.fifty_two_week_low}</TableCell>
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
            {defaultCompanyData.industry_comparison.map((comp, idx) => (
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

export default CompanyStockesPage;
