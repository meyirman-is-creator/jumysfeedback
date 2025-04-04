'use client';
import React from 'react';
import Chart from 'react-apexcharts';
import { Container, Typography } from '@mui/material';
import styles from './CompanyTaxesPage.module.scss';

const defaultCompanyData = {
  id: 15,
  name: "Adobe Inc.",
  is_public: true,
  stock_symbol: "ADBE",
  sec_cik: "0000796343",
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

const CompanyTaxesPage = () => {
  // Chart 1: Total Yearly Taxes (Bar Chart)
  const taxEntries = defaultCompanyData.tax_data.yearly_taxes;
  const aggregatedTaxes = taxEntries.reduce((acc, tax) => {
    const year = tax.year;
    if (!acc[year]) acc[year] = 0;
    acc[year] += tax.amount;
    return acc;
  }, {});
  const taxCategories = Object.keys(aggregatedTaxes).sort();
  const taxSeriesData = taxCategories.map(year => aggregatedTaxes[year]);

  const taxChartOptions = {
    chart: { id: 'tax-bar-chart' },
    xaxis: { categories: taxCategories, title: { text: 'Year' } },
    yaxis: {
      
      labels: { formatter: (value) => `$${(value / 1e6).toFixed(2)}M` }
    },
   
    tooltip: { y: { formatter: (value) => `$${(value / 1e6).toFixed(2)} million` } }
  };
  const taxSeries = [{ name: 'Total Tax', data: taxSeriesData }];

  // Chart 2: Average Revenue Trend (Line Chart)
  const revenueTrendEntries = defaultCompanyData.revenue_trend;
  const aggregatedRevenueTrend = revenueTrendEntries.reduce((acc, entry) => {
    const year = entry.year;
    if (!acc[year]) acc[year] = { sum: 0, count: 0 };
    acc[year].sum += entry.revenue;
    acc[year].count += 1;
    return acc;
  }, {});
  const revenueTrendCategories = Object.keys(aggregatedRevenueTrend).sort();
  const revenueTrendSeriesData = revenueTrendCategories.map(
    year => aggregatedRevenueTrend[year].sum / aggregatedRevenueTrend[year].count
  );
  const revenueChartOptions = {
    chart: { id: 'revenue-line-chart' },
    xaxis: { categories: revenueTrendCategories, title: { text: 'Year' } },
    yaxis: {
      
      labels: { formatter: (value) => `$${(value / 1e9).toFixed(2)}B` }
    },
    
    tooltip: { y: { formatter: (value) => `$${(value / 1e9).toFixed(2)} billion` } }
  };
  const revenueSeries = [{ name: 'Avg Revenue', data: revenueTrendSeriesData }];

  // Chart 3: Industry Comparison – Market Cap (Bar Chart)
  const industryComparison = defaultCompanyData.industry_comparison;
  const industryCategories = industryComparison.map(item => item.name);
  const industrySeriesData = industryComparison.map(item => item.market_cap / 1e9);
  const industryChartOptions = {
    chart: { id: 'industry-bar-chart' },
    xaxis: { categories: industryCategories, title: { text: 'Company' } },
    yaxis: {
      labels: { formatter: (value) => `${value.toFixed(2)}B` }
    },
    tooltip: { y: { formatter: (value) => `${value.toFixed(2)} billion USD` } }
  };
  const industrySeries = [{ name: 'Market Cap', data: industrySeriesData }];

  return (
    <Container maxWidth="md" className={styles.container}>

      <div className={styles.chartSection}>
        <Typography variant="h6" className={styles.chartTitle}>
            Total Tax Data
        </Typography>
        <Chart options={taxChartOptions} series={taxSeries} type="bar" height={350} />
      </div>

      <div className={styles.chartSection}>
      <Typography variant="h6" className={styles.chartTitle}>
            Total Tax Data
        </Typography>
        <Chart options={revenueChartOptions} series={revenueSeries} type="line" height={350} />
      </div>

      <div className={styles.chartSection}>
        <Typography variant="h6" className={styles.chartTitle}>
          Industry Comparison – Market Cap
        </Typography>
        <Chart options={industryChartOptions} series={industrySeries} type="bar" height={350} />
      </div>
    </Container>
  );
};

export default CompanyTaxesPage;
