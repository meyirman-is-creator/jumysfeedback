"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { Typography, Box, Grid, Paper, Button, Tooltip } from "@mui/material";
import { Card, CardContent } from "@/components/ui/card";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveLine } from "@nivo/line";
import { ResponsivePie } from "@nivo/pie";
import { Info } from "lucide-react";
import styles from "./CompanyTaxesPage.module.scss";

const CompanyTaxesPage = () => {
  const router = useRouter();
  const { companyId } = useParams() as { companyId: string };

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
          source: "SEC EDGAR",
        },
        {
          year: 2025,
          amount: 371000000,
          formatted_amount: "$371.00 million",
          source: "SEC EDGAR",
        },
        {
          year: 2024,
          amount: 1252000000,
          formatted_amount: "$1.25 billion",
          source: "SEC EDGAR",
        },
        {
          year: 2024,
          amount: 351000000,
          formatted_amount: "$351.00 million",
          source: "SEC EDGAR",
        },
        {
          year: 2024,
          amount: 706000000,
          formatted_amount: "$706.00 million",
          source: "SEC EDGAR",
        },
      ],
      data_source: "SEC EDGAR",
      retrieved_at: "2025-03-30T17:53:29.266679",
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

  const taxEntries = defaultCompanyData.tax_data.yearly_taxes;
  const aggregatedTaxes = taxEntries.reduce((acc, tax) => {
    const year = tax.year;
    if (!acc[year]) acc[year] = 0;
    acc[year] += tax.amount;
    return acc;
  }, {});

  const taxBarData = Object.keys(aggregatedTaxes).map((year) => ({
    year,
    Налоги: aggregatedTaxes[year] / 1e6,
  }));

  const revenueData = defaultCompanyData.revenue_trend.map((item) => ({
    x: item.year.toString(),
    y: item.revenue / 1e9,
  }));

  const industryData = defaultCompanyData.industry_comparison.map(
    (company) => ({
      id: company.name,
      value: company.market_cap / 1e9,
      label: company.name,
      color: `hsl(${Math.random() * 360}, 70%, 50%)`,
    })
  );

  const taxEffectiveRateData = [
    { category: "Стандартная ставка", value: 21, color: "#888888" },
    { category: "Эффективная ставка", value: 15.2, color: "#800000" },
  ];

  const handleTaxDetailClick = () => {
    const taxSection = document.getElementById("tax-details");
    if (taxSection) {
      taxSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box className={styles.container}>
      <Typography variant="h4" gutterBottom>
        Налоговая статистика компании {defaultCompanyData.name}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card className={styles.card}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6">
                  Ежегодные налоговые отчисления (млн $)
                </Typography>
                <Tooltip title="Показывает динамику ежегодных налоговых отчислений компании в миллионах долларов">
                  <Info size={16} color="#800000" />
                </Tooltip>
              </Box>
              <Box className={styles.chartContainer}>
                <ResponsiveBar
                  data={taxBarData}
                  keys={["Налоги"]}
                  indexBy="year"
                  margin={{ top: 50, right: 30, bottom: 50, left: 80 }}
                  padding={0.3}
                  colors={{ scheme: "red_blue" }}
                  colorBy="indexValue"
                  borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Год",
                    legendPosition: "middle",
                    legendOffset: 32,
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Сумма (млн $)",
                    legendPosition: "middle",
                    legendOffset: -60,
                  }}
                  labelSkipWidth={12}
                  labelSkipHeight={12}
                  labelTextColor={{
                    from: "color",
                    modifiers: [["darker", 1.6]],
                  }}
                  animate={true}
                  motionStiffness={90}
                  motionDamping={15}
                />
              </Box>
              <Typography variant="body2" sx={{ mt: 2, color: "#666" }}>
                График демонстрирует динамику налоговых отчислений компании по
                годам. Показатели приведены в миллионах долларов США на основе
                финансовой отчетности.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card className={styles.card}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6">Выручка компании (млрд $)</Typography>
                <Tooltip title="Отображает изменение выручки компании по годам в миллиардах долларов">
                  <Info size={16} color="#800000" />
                </Tooltip>
              </Box>
              <Box className={styles.chartContainer}>
                <ResponsiveLine
                  data={[
                    {
                      id: "Выручка",
                      color: "#800000",
                      data: revenueData,
                    },
                  ]}
                  margin={{ top: 50, right: 30, bottom: 50, left: 60 }}
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
                    tickRotation: 0,
                    legend: "Год",
                    legendOffset: 36,
                    legendPosition: "middle",
                  }}
                  axisLeft={{
                    orient: "left",
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Выручка (млрд $)",
                    legendOffset: -50,
                    legendPosition: "middle",
                  }}
                  colors={{ scheme: "category10" }}
                  pointSize={10}
                  pointColor={{ theme: "background" }}
                  pointBorderWidth={2}
                  pointBorderColor={{ from: "serieColor" }}
                  pointLabelYOffset={-12}
                  useMesh={true}
                  enableArea={true}
                  areaOpacity={0.1}
                />
              </Box>
              <Typography variant="body2" sx={{ mt: 2, color: "#666" }}>
                Линейный график отображает динамику выручки компании по годам в
                миллиардах долларов. Обратите внимание на тренды роста или
                снижения, которые могут указывать на изменение положения
                компании на рынке.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card className={styles.card}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6">
                  Соотношение налогов к выручке
                </Typography>
                <Tooltip title="Показывает долю налоговых отчислений относительно общей выручки компании">
                  <Info size={16} color="#800000" />
                </Tooltip>
              </Box>
              <Typography variant="subtitle1" gutterBottom>
                Годовые налоги: {(aggregatedTaxes[2024] / 1e6).toFixed(2)} млн $
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Годовая выручка:{" "}
                {(defaultCompanyData.annual_revenue / 1e9).toFixed(2)} млрд $
              </Typography>
              <Typography
                variant="subtitle1"
                gutterBottom
                className={styles.taxRatio}
              >
                Доля налогов от выручки:{" "}
                {(
                  (aggregatedTaxes[2024] / defaultCompanyData.annual_revenue) *
                  100
                ).toFixed(2)}
                %
              </Typography>
              <Box className={styles.pieChartContainer}>
                <ResponsivePie
                  data={[
                    {
                      id: "Налоги",
                      label: "Налоги",
                      value: aggregatedTaxes[2024] / 1e6,
                      color: "#800000",
                    },
                    {
                      id: "Чистая прибыль",
                      label: "Чистая прибыль",
                      value:
                        (defaultCompanyData.annual_revenue -
                          aggregatedTaxes[2024]) /
                        1e6,
                      color: "#0088FE",
                    },
                  ]}
                  margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                  innerRadius={0.5}
                  padAngle={0.7}
                  cornerRadius={3}
                  colors={{ scheme: "paired" }}
                  borderWidth={1}
                  borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
                  enableRadialLabels={true}
                  radialLabelsSkipAngle={10}
                  radialLabelsTextXOffset={6}
                  radialLabelsTextColor="#333333"
                  radialLabelsLinkOffset={0}
                  radialLabelsLinkDiagonalLength={16}
                  radialLabelsLinkHorizontalLength={24}
                  radialLabelsLinkStrokeWidth={1}
                  radialLabelsLinkColor={{ from: "color" }}
                  slicesLabelsSkipAngle={10}
                  slicesLabelsTextColor="#333333"
                  animate={true}
                  motionStiffness={90}
                  motionDamping={15}
                  legends={[
                    {
                      anchor: "bottom",
                      direction: "row",
                      translateY: 56,
                      itemWidth: 100,
                      itemHeight: 18,
                      itemTextColor: "#999",
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
                />
              </Box>
              <Typography variant="body2" sx={{ mt: 2, color: "#666" }}>
                Диаграмма показывает долю налоговых отчислений в структуре
                выручки компании. Налоговая нагрузка является важным показателем
                эффективности финансового управления и может значительно влиять
                на итоговую прибыль.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card className={styles.card} id="tax-details">
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6">
                  Эффективная налоговая ставка
                </Typography>
                <Tooltip title="Сравнивает стандартную налоговую ставку с эффективной ставкой, которую фактически платит компания">
                  <Info size={16} color="#800000" />
                </Tooltip>
              </Box>
              <Box className={styles.chartContainer}>
                <ResponsiveBar
                  data={taxEffectiveRateData}
                  keys={["value"]}
                  indexBy="category"
                  margin={{ top: 50, right: 30, bottom: 50, left: 60 }}
                  padding={0.3}
                  colors={({ data }) => data.color}
                  borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Тип ставки",
                    legendPosition: "middle",
                    legendOffset: 32,
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Процент (%)",
                    legendPosition: "middle",
                    legendOffset: -40,
                  }}
                  labelSkipWidth={12}
                  labelSkipHeight={12}
                  labelTextColor="#fff"
                  animate={true}
                  motionStiffness={90}
                  motionDamping={15}
                />
              </Box>
              <Typography variant="body2" sx={{ mt: 2, color: "#666" }}>
                График демонстрирует разницу между стандартной налоговой ставкой
                (21%) и эффективной налоговой ставкой (15.2%), которую
                фактически платит компания. Эффективная ставка часто ниже из-за
                налоговых льгот, вычетов и международной структуры бизнеса.
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                sx={{ mt: 2, borderColor: "#800000", color: "#800000" }}
                onClick={() =>
                  router.push(`/companies/${companyId}/taxes/details`)
                }
              >
                Подробный налоговый анализ
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card className={styles.summaryCard}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Ключевые налоговые показатели
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                  <Box className={styles.metricBox}>
                    <Typography
                      variant="subtitle2"
                      className={styles.metricLabel}
                    >
                      Общая сумма налогов (2024)
                    </Typography>
                    <Typography variant="h5" className={styles.metricValue}>
                      {(aggregatedTaxes[2024] / 1e9).toFixed(2)} млрд $
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box className={styles.metricBox}>
                    <Typography
                      variant="subtitle2"
                      className={styles.metricLabel}
                    >
                      Эффективная налоговая ставка
                    </Typography>
                    <Typography variant="h5" className={styles.metricValue}>
                      {(
                        (aggregatedTaxes[2024] /
                          defaultCompanyData.annual_revenue) *
                        100
                      ).toFixed(1)}
                      %
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box className={styles.metricBox}>
                    <Typography
                      variant="subtitle2"
                      className={styles.metricLabel}
                    >
                      Налоги на сотрудника
                    </Typography>
                    <Typography variant="h5" className={styles.metricValue}>
                      ~25.4 тыс $
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box className={styles.metricBox}>
                    <Typography
                      variant="subtitle2"
                      className={styles.metricLabel}
                    >
                      Изменение к предыдущему году
                    </Typography>
                    <Typography variant="h5" className={styles.metricValue}>
                      +12.5%
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompanyTaxesPage;
