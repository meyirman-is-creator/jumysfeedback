"use client";
import React from "react";
import { useParams } from "next/navigation";
import { Container, Typography, Box, Grid } from "@mui/material";
import { Card, CardContent } from "@/components/ui/card";
import { ResponsiveLine } from "@nivo/line";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";
import styles from "./CompanyStockes.module.scss";

const CompanyStockesPage = () => {
  const { companyId } = useParams() as { companyId: string };

  // Default mock data (Adobe Inc. sample)
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
      formatted_market_cap: "156.5B",
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
          volume: 63592000,
        },
        {
          date: "2024-06-01",
          open: 447.58,
          high: 558.48,
          low: 436.58,
          close: 555.54,
          volume: 92072100,
        },
        {
          date: "2024-07-01",
          open: 551.37,
          high: 580.55,
          low: 527.59,
          close: 551.65,
          volume: 51420600,
        },
        {
          date: "2024-08-01",
          open: 549.99,
          high: 578.4,
          low: 500,
          close: 574.41,
          volume: 41274200,
        },
        {
          date: "2024-09-01",
          open: 576.3,
          high: 587.75,
          low: 506.49,
          close: 517.78,
          volume: 71622300,
        },
        {
          date: "2024-10-01",
          open: 517.45,
          high: 519,
          low: 477.38,
          close: 478.08,
          volume: 61014000,
        },
        {
          date: "2024-11-01",
          open: 475.41,
          high: 539.92,
          low: 475.05,
          close: 515.93,
          volume: 53600700,
        },
        {
          date: "2024-12-01",
          open: 512.85,
          high: 557.9,
          low: 432.47,
          close: 444.68,
          volume: 105644000,
        },
        {
          date: "2025-01-01",
          open: 447.76,
          high: 450.12,
          low: 403.75,
          close: 437.45,
          volume: 80063500,
        },
        {
          date: "2025-02-01",
          open: 437.8,
          high: 465.7,
          low: 430.88,
          close: 438.56,
          volume: 55423600,
        },
        {
          date: "2025-03-01",
          open: 440.65,
          high: 453.26,
          low: 374.5,
          close: 383.53,
          volume: 94251600,
        },
        {
          date: "2025-04-01",
          open: 381.13,
          high: 388,
          low: 367.77,
          close: 371.76,
          volume: 9377858,
        },
      ],
      timestamp: "2025-04-03T16:51:22.879983",
    },
    annual_revenue: 9284640000,
    annual_revenue_formatted: "$9.28 billion",
    revenue_trend: [
      {
        year: 2025,
        revenue: 9284640000,
        revenue_formatted: "$9.28 billion",
      },
      {
        year: 2025,
        revenue: 9898280000,
        revenue_formatted: "$9.90 billion",
      },
      {
        year: 2024,
        revenue: 33403360000,
        revenue_formatted: "$33.40 billion",
      },
      {
        year: 2024,
        revenue: 9364680000,
        revenue_formatted: "$9.36 billion",
      },
      {
        year: 2024,
        revenue: 18836080000,
        revenue_formatted: "$18.84 billion",
      },
    ],
    key_metrics: {
      market_cap: 156521955328,
      market_cap_formatted: "156.5B",
      pe_ratio: 24.272968,
      dividend_yield: null,
      fifty_two_week_high: 587.75,
      fifty_two_week_low: 366.29,
    },
    industry_comparison: [
      {
        id: 3,
        name: "Apple Inc.",
        stock_symbol: "AAPL",
        market_cap: 3052340510720,
        market_cap_formatted: "3052.3B",
        pe_ratio: 32.25238,
        dividend_yield: 0.49,
      },
      {
        id: 4,
        name: "Microsoft Corporation",
        stock_symbol: "MSFT",
        market_cap: 2773692186624,
        market_cap_formatted: "2773.7B",
        pe_ratio: 30.041061,
        dividend_yield: 0.89,
      },
      {
        id: 6,
        name: "Alphabet Inc. (Google)",
        stock_symbol: "GOOGL",
        market_cap: 1847782014976,
        market_cap_formatted: "1847.8B",
        pe_ratio: 18.769615,
        dividend_yield: 0.53,
      },
      {
        id: 7,
        name: "Meta Platforms, Inc.",
        stock_symbol: "META",
        market_cap: 1346944237568,
        market_cap_formatted: "1346.9B",
        pe_ratio: 22.27147,
        dividend_yield: 0.4,
      },
      {
        id: 16,
        name: "Salesforce, Inc.",
        stock_symbol: "CRM",
        market_cap: 245276033024,
        market_cap_formatted: "245.3B",
        pe_ratio: 40.1305,
        dividend_yield: 0.65,
      },
    ],
  };

  // Подготовка данных для графика цен акций
  const stockPriceData = defaultCompanyData.historical_stock_data.data.map(
    (item) => ({
      x: item.date,
      y: item.close,
    })
  );

  // Подготовка данных для объема торгов
  const volumeData = defaultCompanyData.historical_stock_data.data.map(
    (item) => ({
      date: item.date,
      volume: item.volume / 1000000, // Конвертируем в миллионы
    })
  );

  // Подготовка данных для сравнения P/E с индустрией
  const peRatioData = defaultCompanyData.industry_comparison.map((company) => ({
    company: company.name,
    "P/E": company.pe_ratio,
  }));

  // Подготовка данных для структуры рыночной капитализации
  const marketCapTotal = defaultCompanyData.industry_comparison.reduce(
    (sum, company) => sum + company.market_cap,
    0
  );

  const marketCapPieData = defaultCompanyData.industry_comparison.map(
    (company) => ({
      id: company.name,
      label: company.name,
      value: (company.market_cap / marketCapTotal) * 100, // процент от общей капитализации
    })
  );

  // Подготовка данных для связи выручки и капитализации
  const revenueCapRatio = [];
  if (
    defaultCompanyData.industry_comparison &&
    defaultCompanyData.industry_comparison.length > 0
  ) {
    const adobeRevenue = defaultCompanyData.annual_revenue;
    const adobeMarketCap = defaultCompanyData.key_metrics.market_cap;

    revenueCapRatio.push({
      company: "Adobe",
      type: "Выручка",
      value: adobeRevenue / 1e9, // в миллиардах
    });

    revenueCapRatio.push({
      company: "Adobe",
      type: "Капитализация",
      value: adobeMarketCap / 1e9, // в миллиардах
    });

    // Добавляем приблизительные данные для конкурентов
    const competitors = ["Apple", "Microsoft", "Google"];
    const revenueEstimates = [380, 220, 300]; // приблизительные данные выручки в миллиардах

    for (let i = 0; i < competitors.length; i++) {
      const companyInfo = defaultCompanyData.industry_comparison.find((c) =>
        c.name.includes(competitors[i])
      );

      if (companyInfo) {
        revenueCapRatio.push({
          company: competitors[i],
          type: "Выручка",
          value: revenueEstimates[i],
        });

        revenueCapRatio.push({
          company: competitors[i],
          type: "Капитализация",
          value: companyInfo.market_cap / 1e9,
        });
      }
    }
  }

  return (
    <Box className={styles.container}>
      <Typography variant="h4" className={styles.title}>
        Данные акций компании {defaultCompanyData.name}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card className={styles.card}>
            <CardContent>
              <Typography variant="h6" className={styles.cardTitle}>
                Динамика цены акций за последний год
              </Typography>
              <Box className={styles.chartContainer}>
                <ResponsiveLine
                  data={[
                    {
                      id: "Цена акций",
                      color: "#800000",
                      data: stockPriceData,
                    },
                  ]}
                  margin={{ top: 40, right: 30, bottom: 50, left: 60 }}
                  xScale={{ type: "point" }}
                  yScale={{
                    type: "linear",
                    min: "auto",
                    max: "auto",
                    stacked: false,
                    reverse: false,
                  }}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    orient: "bottom",
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 45,
                    legend: "Дата",
                    legendOffset: 40,
                    legendPosition: "middle",
                  }}
                  axisLeft={{
                    orient: "left",
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Цена (USD)",
                    legendOffset: -50,
                    legendPosition: "middle",
                  }}
                  colors={["#800000"]}
                  pointSize={6}
                  pointColor={{ theme: "background" }}
                  pointBorderWidth={2}
                  pointBorderColor={{ from: "serieColor" }}
                  pointLabelYOffset={-12}
                  useMesh={true}
                  enableArea={true}
                  areaOpacity={0.1}
                  enableSlices="x"
                  enableGridX={false}
                  tooltip={({ point }) => (
                    <div className={styles.tooltip}>
                      <strong>{point.data.xFormatted}</strong>
                      <br />
                      Цена: ${point.data.yFormatted}
                    </div>
                  )}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card className={styles.card}>
            <CardContent>
              <Typography variant="h6" className={styles.cardTitle}>
                Объем торгов (млн)
              </Typography>
              <Box className={styles.chartContainer}>
                <ResponsiveBar
                  data={volumeData}
                  keys={["volume"]}
                  indexBy="date"
                  margin={{ top: 40, right: 30, bottom: 50, left: 60 }}
                  padding={0.3}
                  valueScale={{ type: "linear" }}
                  indexScale={{ type: "band", round: true }}
                  colors={["#336699"]}
                  borderColor="#336699"
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 45,
                    legend: "Дата",
                    legendPosition: "middle",
                    legendOffset: 40,
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Объем (млн)",
                    legendPosition: "middle",
                    legendOffset: -45,
                  }}
                  labelSkipWidth={12}
                  labelSkipHeight={12}
                  tooltip={({ value, indexValue }) => (
                    <div className={styles.tooltip}>
                      <strong>{indexValue}</strong>
                      <br />
                      Объем: {value.toFixed(1)} млн
                    </div>
                  )}
                  role="application"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card className={styles.keyMetricsCard}>
            <CardContent>
              <Typography variant="h6" className={styles.cardTitle}>
                Ключевые показатели
              </Typography>
              <Box className={styles.metricsGrid}>
                <Box className={styles.metric}>
                  <Typography
                    variant="subtitle2"
                    className={styles.metricLabel}
                  >
                    Текущая цена
                  </Typography>
                  <Typography variant="h5" className={styles.metricValue}>
                    ${defaultCompanyData.stock_data.current_price.toFixed(2)}
                  </Typography>
                  <Typography
                    variant="body2"
                    className={styles.metricChange}
                    style={{
                      color:
                        defaultCompanyData.stock_data.price_change < 0
                          ? "#e53935"
                          : "#43a047",
                    }}
                  >
                    {defaultCompanyData.stock_data.price_change > 0 ? "+" : ""}
                    {defaultCompanyData.stock_data.price_change.toFixed(2)} (
                    {defaultCompanyData.stock_data.price_change_percent}%)
                  </Typography>
                </Box>

                <Box className={styles.metric}>
                  <Typography
                    variant="subtitle2"
                    className={styles.metricLabel}
                  >
                    Рыночная капитализация
                  </Typography>
                  <Typography variant="h5" className={styles.metricValue}>
                    {defaultCompanyData.stock_data.formatted_market_cap}
                  </Typography>
                </Box>

                <Box className={styles.metric}>
                  <Typography
                    variant="subtitle2"
                    className={styles.metricLabel}
                  >
                    P/E коэффициент
                  </Typography>
                  <Typography variant="h5" className={styles.metricValue}>
                    {defaultCompanyData.stock_data.pe_ratio.toFixed(2)}
                  </Typography>
                </Box>

                <Box className={styles.metric}>
                  <Typography
                    variant="subtitle2"
                    className={styles.metricLabel}
                  >
                    52-недельный максимум
                  </Typography>
                  <Typography variant="h5" className={styles.metricValue}>
                    $
                    {defaultCompanyData.key_metrics.fifty_two_week_high.toFixed(
                      2
                    )}
                  </Typography>
                </Box>

                <Box className={styles.metric}>
                  <Typography
                    variant="subtitle2"
                    className={styles.metricLabel}
                  >
                    52-недельный минимум
                  </Typography>
                  <Typography variant="h5" className={styles.metricValue}>
                    $
                    {defaultCompanyData.key_metrics.fifty_two_week_low.toFixed(
                      2
                    )}
                  </Typography>
                </Box>

                <Box className={styles.metric}>
                  <Typography
                    variant="subtitle2"
                    className={styles.metricLabel}
                  >
                    Дивидендная доходность
                  </Typography>
                  <Typography variant="h5" className={styles.metricValue}>
                    {defaultCompanyData.key_metrics.dividend_yield
                      ? `${defaultCompanyData.key_metrics.dividend_yield}%`
                      : "Н/Д"}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card className={styles.card}>
            <CardContent>
              <Typography variant="h6" className={styles.cardTitle}>
                Сравнение P/E с конкурентами
              </Typography>
              <Box className={styles.chartContainer}>
                <ResponsiveBar
                  data={peRatioData}
                  keys={["P/E"]}
                  indexBy="company"
                  margin={{ top: 40, right: 30, bottom: 60, left: 60 }}
                  padding={0.3}
                  valueScale={{ type: "linear" }}
                  indexScale={{ type: "band", round: true }}
                  colors={["#800000"]}
                  borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 45,
                    legend: "Компания",
                    legendPosition: "middle",
                    legendOffset: 40,
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "P/E коэффициент",
                    legendPosition: "middle",
                    legendOffset: -50,
                  }}
                  labelSkipWidth={12}
                  labelSkipHeight={12}
                  labelTextColor={{
                    from: "color",
                    modifiers: [["darker", 1.6]],
                  }}
                  tooltip={({ value, indexValue }) => (
                    <div className={styles.tooltip}>
                      <strong>{indexValue}</strong>
                      <br />
                      P/E: {value.toFixed(2)}
                    </div>
                  )}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card className={styles.card}>
            <CardContent>
              <Typography variant="h6" className={styles.cardTitle}>
                Структура рыночной капитализации в индустрии
              </Typography>
              <Box className={styles.chartContainer}>
                <ResponsivePie
                  data={marketCapPieData}
                  margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                  innerRadius={0.5}
                  padAngle={0.7}
                  cornerRadius={3}
                  activeOuterRadiusOffset={8}
                  borderWidth={1}
                  borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
                  arcLinkLabelsSkipAngle={10}
                  arcLinkLabelsTextColor="#333333"
                  arcLinkLabelsThickness={2}
                  arcLinkLabelsColor={{ from: "color" }}
                  arcLabelsSkipAngle={10}
                  arcLabelsTextColor={{
                    from: "color",
                    modifiers: [["darker", 2]],
                  }}
                  colors={{ scheme: "category10" }}
                  legends={[
                    {
                      anchor: "bottom",
                      direction: "row",
                      justify: false,
                      translateX: 0,
                      translateY: 56,
                      itemsSpacing: 0,
                      itemWidth: 100,
                      itemHeight: 18,
                      itemTextColor: "#999",
                      itemDirection: "left-to-right",
                      itemOpacity: 1,
                      symbolSize: 18,
                      symbolShape: "circle",
                      effects: [
                        {
                          on: "hover",
                          style: {
                            itemTextColor: "#000",
                          },
                        },
                      ],
                    },
                  ]}
                  tooltip={({ datum }) => (
                    <div className={styles.tooltip}>
                      <strong>{datum.label}</strong>
                      <br />
                      Доля: {datum.value.toFixed(1)}%
                    </div>
                  )}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card className={styles.card}>
            <CardContent>
              <Typography variant="h6" className={styles.cardTitle}>
                Соотношение выручки и капитализации (млрд $)
              </Typography>
              <Box className={styles.chartContainer}>
                <ResponsiveBar
                  data={revenueCapRatio}
                  keys={["value"]}
                  indexBy="company"
                  groupMode="grouped"
                  margin={{ top: 40, right: 130, bottom: 50, left: 60 }}
                  padding={0.3}
                  valueScale={{ type: "linear" }}
                  indexScale={{ type: "band", round: true }}
                  colors={({ id, data }) =>
                    data.type === "Выручка" ? "#4DAF4A" : "#377EB8"
                  }
                  borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Компания",
                    legendPosition: "middle",
                    legendOffset: 32,
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Значение (млрд $)",
                    legendPosition: "middle",
                    legendOffset: -50,
                  }}
                  enableLabel={false}
                  legends={[
                    {
                      dataFrom: "keys",
                      anchor: "bottom-right",
                      direction: "column",
                      justify: false,
                      translateX: 120,
                      translateY: 0,
                      itemsSpacing: 2,
                      itemWidth: 100,
                      itemHeight: 20,
                      itemDirection: "left-to-right",
                      itemOpacity: 0.85,
                      symbolSize: 20,
                      effects: [
                        {
                          on: "hover",
                          style: {
                            itemOpacity: 1,
                          },
                        },
                      ],
                    },
                  ]}
                  tooltip={({ id, value, color, data }) => (
                    <div className={styles.tooltip} style={{ color: color }}>
                      <strong>{data.company}</strong>
                      <br />
                      {data.type}: {value.toFixed(1)} млрд $
                    </div>
                  )}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompanyStockesPage;
