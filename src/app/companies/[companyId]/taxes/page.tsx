// src/app/companies/[companyId]/taxes/page.tsx
"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { Typography, Box, Grid, Paper, Tooltip } from "@mui/material";
import { Card, CardContent } from "@/components/ui/card";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveLine } from "@nivo/line";
import { ResponsivePie } from "@nivo/pie";
import { Info } from "lucide-react";
import { useCompanyDetails } from "@/hooks/useCompanyDetails";
import { Skeleton } from "@/components/ui/skeleton";
import styles from "./CompanyTaxesPage.module.scss";

const CompanyTaxesPage = () => {
  const { companyId } = useParams() as { companyId: string };
  const { taxes, loading, error, fetchTaxes } = useCompanyDetails();

  useEffect(() => {
    if (companyId) {
      fetchTaxes(companyId);
    }
  }, [companyId, fetchTaxes]);

  // Prepare data for charts if taxes data exists
  const getTaxBarData = () => {
    if (!taxes || !taxes.yearlyTaxes) return [];

    return taxes.yearlyTaxes.map((tax) => ({
      year: tax.year.toString(),
      Налоги: tax.amount / 1e9, // Convert to billions for readability
    }));
  };

  const getLatestYearTaxData = () => {
    if (!taxes || !taxes.yearlyTaxes || taxes.yearlyTaxes.length === 0)
      return null;

    // Sort by year descending and get the latest year data
    const sortedTaxes = [...taxes.yearlyTaxes].sort((a, b) => b.year - a.year);
    return sortedTaxes[0];
  };

  const calculateTaxGrowth = () => {
    if (!taxes || !taxes.yearlyTaxes || taxes.yearlyTaxes.length < 2)
      return null;

    // Sort by year
    const sortedTaxes = [...taxes.yearlyTaxes].sort((a, b) => a.year - b.year);
    const lastYearTax = sortedTaxes[sortedTaxes.length - 1].amount;
    const prevYearTax = sortedTaxes[sortedTaxes.length - 2].amount;

    const growthRate = ((lastYearTax - prevYearTax) / prevYearTax) * 100;
    return growthRate.toFixed(1);
  };

  const latestYearTax = getLatestYearTaxData();
  const taxGrowth = calculateTaxGrowth();
  const taxBarData = getTaxBarData();

  if (error.taxes) {
    return (
      <Box className={styles.container}>
        <Typography variant="h4" gutterBottom color="error">
          Ошибка при загрузке данных о налогах
        </Typography>
        <Typography>{error.taxes}</Typography>
      </Box>
    );
  }

  return (
    <Box className={styles.container}>
      <Typography variant="h4" gutterBottom>
        {loading.taxes ? (
          <Skeleton className="h-10 w-96" />
        ) : (
          `Налоговая статистика компании ${taxes?.companyName || ""}`
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
                <Typography variant="h6">
                  Ежегодные налоговые отчисления (млрд ₸)
                </Typography>
                <Tooltip title="Показывает динамику ежегодных налоговых отчислений компании в миллиардах тенге">
                  <Info size={16} color="#800000" />
                </Tooltip>
              </Box>

              {loading.taxes ? (
                <Skeleton className="h-80 w-full" />
              ) : taxes ? (
                <Box className={styles.chartContainer}>
                  <ResponsiveBar
                    data={taxBarData}
                    keys={["Налоги"]}
                    indexBy="year"
                    margin={{ top: 50, right: 30, bottom: 50, left: 80 }}
                    padding={0.3}
                    colors={{ scheme: "red_blue" }}
                    colorBy="indexValue"
                    borderColor={{
                      from: "color",
                      modifiers: [["darker", 1.6]],
                    }}
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
                      legend: "Сумма (млрд ₸)",
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
              ) : null}

              <Typography variant="body2" sx={{ mt: 2, color: "#666" }}>
                График демонстрирует динамику налоговых отчислений компании по
                годам. Показатели приведены в миллиардах тенге на основе
                официальной финансовой отчетности.
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
                <Typography variant="h6">Налоговые показатели</Typography>
                <Tooltip title="Ключевые налоговые показатели компании">
                  <Info size={16} color="#800000" />
                </Tooltip>
              </Box>

              {loading.taxes ? (
                <>
                  <Skeleton className="h-12 w-full mb-4" />
                  <Skeleton className="h-12 w-full mb-4" />
                  <Skeleton className="h-12 w-full" />
                </>
              ) : taxes ? (
                <>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Paper elevation={1} className="p-4">
                        <Typography variant="subtitle2" color="textSecondary">
                          Последние отчисления ({latestYearTax?.year})
                        </Typography>
                        <Typography
                          variant="h5"
                          className="font-bold text-[#800000]"
                        >
                          {latestYearTax?.formattedAmount}
                        </Typography>
                        {taxGrowth && (
                          <Typography
                            variant="body2"
                            className={`font-medium ${
                              parseFloat(taxGrowth) >= 0
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {parseFloat(taxGrowth) >= 0 ? "+" : ""}
                            {taxGrowth}% к предыдущему году
                          </Typography>
                        )}
                      </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Paper elevation={1} className="p-4">
                        <Typography variant="subtitle2" color="textSecondary">
                          Статус плательщика НДС
                        </Typography>
                        <Typography variant="h6">
                          {taxes.vatPayer
                            ? "Плательщик НДС"
                            : "Не является плательщиком НДС"}
                        </Typography>
                      </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Paper elevation={1} className="p-4">
                        <Typography variant="subtitle2" color="textSecondary">
                          Юридический статус
                        </Typography>
                        <Typography variant="h6">
                          {taxes.companyType} "{taxes.companyStatus}"
                        </Typography>
                      </Paper>
                    </Grid>

                    <Grid item xs={12}>
                      <Paper elevation={1} className="p-4">
                        <Typography variant="subtitle2" color="textSecondary">
                          Основной вид деятельности
                        </Typography>
                        <Typography variant="body1">
                          {taxes.businessActivity} (код{" "}
                          {taxes.businessActivityCode})
                        </Typography>
                      </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Paper elevation={1} className="p-4">
                        <Typography variant="subtitle2" color="textSecondary">
                          Размер компании
                        </Typography>
                        <Typography variant="body1">
                          {taxes.companySize}
                        </Typography>
                      </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Paper elevation={1} className="p-4">
                        <Typography variant="subtitle2" color="textSecondary">
                          Количество лицензий
                        </Typography>
                        <Typography variant="body1">
                          {taxes.licenseCount}
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </>
              ) : null}

              <Typography variant="body2" sx={{ mt: 2, color: "#666" }}>
                Данные представлены на основе официальной отчетности,
                предоставляемой государственными органами. Последнее обновление:{" "}
                {taxes?.lastUpdateDate || "н/д"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {!loading.taxes && taxes && (
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
                  <Typography variant="h6">
                    Дополнительная информация
                  </Typography>
                  <Tooltip title="Информация о регистрации и участии компании">
                    <Info size={16} color="#800000" />
                  </Tooltip>
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Paper elevation={1} className="p-4">
                      <Typography variant="subtitle2" color="textSecondary">
                        Дата регистрации
                      </Typography>
                      <Typography variant="body1">
                        {taxes.registrationDate}
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Paper elevation={1} className="p-4">
                      <Typography variant="subtitle2" color="textSecondary">
                        Участие в других компаниях
                      </Typography>
                      <Typography variant="body1">
                        {taxes.participationsInOtherCompanies > 0
                          ? `${taxes.participationsInOtherCompanies} компаний`
                          : "Не участвует"}
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Paper elevation={1} className="p-4">
                      <Typography variant="subtitle2" color="textSecondary">
                        Участие в гос. закупках
                      </Typography>
                      <Typography variant="body1">
                        {taxes.governmentProcurementParticipant
                          ? "Участвует"
                          : "Не участвует"}
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      className="italic"
                    >
                      Источник данных: {taxes.dataSource}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default CompanyTaxesPage;
