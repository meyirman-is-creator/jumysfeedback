// src/app/companies/[companyId]/stocks/page.tsx
"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { Typography, Box, Grid, Tooltip as MuiTooltip } from "@mui/material";
import { Card, CardContent } from "@/components/ui/card";
import { ResponsiveLine } from "@nivo/line";
import { Info } from "lucide-react";
import { useCompanyDetails } from "@/hooks/useCompanyDetails";
import { Skeleton } from "@/components/ui/skeleton";
import styles from "./CompanyStockes.module.scss";

const CompanyStocksPage = () => {
  const { companyId } = useParams() as { companyId: string };
  const { stocks, loading, error, fetchStocks } = useCompanyDetails();

  useEffect(() => {
    if (companyId) {
      fetchStocks(companyId);
    }
  }, [companyId, fetchStocks]);

  const prepareHistoricalData = () => {
    if (!stocks || !stocks.historicalData) return [];

    return [
      {
        id: "Цена закрытия",
        color: "#800000",
        data: stocks.historicalData.map((item) => ({
          x: item.date,
          y: item.close,
        })),
      },
    ];
  };

  const prepareTradingVolumeData = () => {
    if (!stocks || !stocks.historicalData) return [];

    return [
      {
        id: "Объем торгов",
        color: "#336699",
        data: stocks.historicalData.map((item) => ({
          x: item.date,
          y: item.volume / 1000, // Convert to thousands for readability
        })),
      },
    ];
  };

  const historicalData = prepareHistoricalData();
  const volumeData = prepareTradingVolumeData();

  if (error.stocks) {
    return (
      <Box className={styles.container}>
        <Typography variant="h4" gutterBottom color="error">
          Ошибка при загрузке данных об акциях
        </Typography>
        <Typography>{error.stocks}</Typography>
      </Box>
    );
  }

  return (
    <Box className={styles.container}>
      <Typography variant="h4" className={styles.title}>
        {loading.stocks ? (
          <Skeleton className="h-10 w-96" />
        ) : (
          `Данные акций компании ${stocks?.companyName || ""}`
        )}
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
                <Typography variant="h6" className={styles.cardTitle}>
                  Динамика цены акций
                </Typography>
                <MuiTooltip title="Отображает изменение стоимости акций компании">
                  <Info size={16} color="#800000" />
                </MuiTooltip>
              </Box>

              {loading.stocks ? (
                <Skeleton className="h-80 w-full" />
              ) : stocks ? (
                <Box className={styles.chartContainer}>
                  <ResponsiveLine
                    data={historicalData}
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
                      legend: `Цена (${stocks.currency})`,
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
                        Цена: {point.data.yFormatted} {stocks.currency}
                      </div>
                    )}
                  />
                </Box>
              ) : null}

              <Typography variant="body2" sx={{ mt: 2, color: "#666" }}>
                График отображает динамику цены акций компании. Исторические
                данные помогают определить тренды и оценить потенциальные
                инвестиционные возможности.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card className={styles.keyMetricsCard}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6" className={styles.cardTitle}>
                  Ключевые показатели
                </Typography>
                <MuiTooltip title="Основные финансовые метрики, характеризующие текущее состояние акций компании">
                  <Info size={16} color="#800000" />
                </MuiTooltip>
              </Box>

              {loading.stocks ? (
                <Box className={styles.metricsGrid}>
                  {[...Array(6)].map((_, i) => (
                    <Skeleton key={i} className="h-20 w-full" />
                  ))}
                </Box>
              ) : stocks ? (
                <Box className={styles.metricsGrid}>
                  <Box className={styles.metric}>
                    <Typography
                      variant="subtitle2"
                      className={styles.metricLabel}
                    >
                      Текущая цена
                    </Typography>
                    <Typography variant="h5" className={styles.metricValue}>
                      {stocks.formattedPrice}
                    </Typography>
                    <Typography
                      variant="body2"
                      className={styles.metricChange}
                      style={{
                        color: stocks.priceChange < 0 ? "#e53935" : "#43a047",
                      }}
                    >
                      {stocks.priceChange > 0 ? "+" : ""}
                      {stocks.priceChange.toFixed(2)} (
                      {stocks.priceChangePercent.toFixed(2)}%)
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
                      {stocks.formattedMarketCap}
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
                      {stocks.peRatio.toFixed(2)}
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
                      {stocks.fiftyTwoWeekHigh.toLocaleString()}{" "}
                      {stocks.currency}
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
                      {stocks.fiftyTwoWeekLow.toLocaleString()}{" "}
                      {stocks.currency}
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
                      {stocks.dividendYield
                        ? `${stocks.dividendYield}%`
                        : "Н/Д"}
                    </Typography>
                  </Box>
                </Box>
              ) : null}

              <Typography variant="body2" sx={{ mt: 2, color: "#666" }}>
                Ключевые показатели дают общее представление о финансовом
                здоровье компании и оценке ее акций рынком. P/E коэффициент
                указывает на то, сколько инвесторы готовы платить за единицу
                прибыли компании.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {!loading.stocks && stocks && (
          <Grid item xs={12}>
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
                  <Typography variant="h6" className={styles.cardTitle}>
                    Объем торгов
                  </Typography>
                  <MuiTooltip title="Отображает объем торгов акциями компании в тысячах">
                    <Info size={16} color="#800000" />
                  </MuiTooltip>
                </Box>

                <Box className={styles.chartContainer}>
                  <ResponsiveLine
                    data={volumeData}
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
                      legend: "Объем (тыс.)",
                      legendOffset: -50,
                      legendPosition: "middle",
                    }}
                    colors={["#336699"]}
                    pointSize={6}
                    pointColor={{ theme: "background" }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: "serieColor" }}
                    pointLabelYOffset={-12}
                    useMesh={true}
                    tooltip={({ point }) => (
                      <div className={styles.tooltip}>
                        <strong>{point.data.xFormatted}</strong>
                        <br />
                        Объем: {point.data.yFormatted}K акций
                      </div>
                    )}
                  />
                </Box>

                <Typography variant="body2" sx={{ mt: 2, color: "#666" }}>
                  График показывает объем торгов акциями компании. Высокие
                  объемы торгов часто указывают на повышенный интерес инвесторов
                  и могут сопровождать значительные изменения в цене акций.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}

        {!loading.stocks && stocks && (
          <Grid item xs={12}>
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
                  <Typography variant="h6" className={styles.cardTitle}>
                    Детали торгов за сегодня
                  </Typography>
                  <MuiTooltip title="Подробная информация о торгах за текущий день">
                    <Info size={16} color="#800000" />
                  </MuiTooltip>
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Box className={styles.metric}>
                      <Typography
                        variant="subtitle2"
                        className={styles.metricLabel}
                      >
                        Цена открытия
                      </Typography>
                      <Typography variant="h6" className={styles.metricValue}>
                        {stocks.open.toLocaleString()} {stocks.currency}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <Box className={styles.metric}>
                      <Typography
                        variant="subtitle2"
                        className={styles.metricLabel}
                      >
                        Максимум дня
                      </Typography>
                      <Typography variant="h6" className={styles.metricValue}>
                        {stocks.dayHigh.toLocaleString()} {stocks.currency}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <Box className={styles.metric}>
                      <Typography
                        variant="subtitle2"
                        className={styles.metricLabel}
                      >
                        Минимум дня
                      </Typography>
                      <Typography variant="h6" className={styles.metricValue}>
                        {stocks.dayLow.toLocaleString()} {stocks.currency}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <Box className={styles.metric}>
                      <Typography
                        variant="subtitle2"
                        className={styles.metricLabel}
                      >
                        Объем торгов сегодня
                      </Typography>
                      <Typography variant="h6" className={styles.metricValue}>
                        {stocks.volume.toLocaleString()}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    mt: 2,
                    color: "#666",
                    textAlign: "right",
                  }}
                >
                  Данные обновлены:{" "}
                  {new Date(stocks.timestamp).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default CompanyStocksPage;
