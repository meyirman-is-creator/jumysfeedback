"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Typography, Box, Grid, TextField, Chip } from "@mui/material";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveLine } from "@nivo/line";
import { Search, DollarSign, TrendingUp, Briefcase } from "lucide-react";
import { useCompanyDetails } from "@/hooks/useCompanyDetails";
import { ExperienceFilter } from "@/features/companyDetails/types";
import { Skeleton } from "@/components/ui/skeleton";
import styles from "./CompanySalariesPage.module.scss";

const CompanySalariesPage = () => {
  const { companyId } = useParams() as { companyId: string };

  // State for UI filters and pagination
  const [experienceFilter, setExperienceFilter] =
    useState<ExperienceFilter>("all");
  const [positionSearch, setPositionSearch] = useState("");
  const [sortOption, setSortOption] = useState<"highest" | "lowest">("highest");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  // Get company details from our hook
  const { fetchSalaries, loading, error } = useCompanyDetails();

  // Use our hook to get cached data
  const { getSalaries } = useCompanyDetails();

  // Fetch salaries on mount and when filters change
  useEffect(() => {
    if (companyId) {
      fetchSalaries({
        companyId,
        experienceFilter,
        search: positionSearch,
        sort: sortOption,
        page,
        pageSize,
      });
    }
  }, [
    companyId,
    experienceFilter,
    positionSearch,
    sortOption,
    page,
    pageSize,
    fetchSalaries,
  ]);

  // Get the cached data for current filters
  const salaryData = getSalaries({
    companyId,
    experienceFilter,
    search: positionSearch,
    sort: sortOption,
    page,
    pageSize,
  });

  // Handle filter changes
  const handleExperienceFilterChange = (value: ExperienceFilter) => {
    setExperienceFilter(value);
    setPage(0); // Reset to first page when filter changes
  };

  const handlePositionSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPositionSearch(e.target.value);
    setPage(0); // Reset to first page when search changes
  };

  const handleSortChange = (value: "highest" | "lowest") => {
    setSortOption(value);
    setPage(0); // Reset to first page when sort changes
  };

  const handleChangePage = (pageNumber: number) => {
    setPage(pageNumber);
  };

  // Prepare data for visualizations if salary data exists
  const prepareAverageSalaryByLevelData = () => {
    if (!salaryData || !salaryData.statistics.averageSalaryByExperience)
      return [];

    const data = [];
    const averageByExp = salaryData.statistics.averageSalaryByExperience;

    if (averageByExp.entry) {
      data.push({ level: "Начальный", value: averageByExp.entry });
    }
    if (averageByExp.mid) {
      data.push({ level: "Средний", value: averageByExp.mid });
    }
    if (averageByExp.senior) {
      data.push({ level: "Старший", value: averageByExp.senior });
    }
    if (averageByExp.executive) {
      data.push({ level: "Руководитель", value: averageByExp.executive });
    }

    return data;
  };

  // Prepare top positions data
  const prepareTopPositionsData = () => {
    if (!salaryData || !salaryData.statistics.topSalaries) return [];

    return salaryData.statistics.topSalaries.map((salary) => ({
      position: salary.position,
      salary: salary.median,
    }));
  };

  // Prepare salary distribution data
  const prepareSalaryDistributionData = () => {
    if (!salaryData || !salaryData.statistics.salaryDistribution) return [];

    return salaryData.statistics.salaryDistribution.map((item) => ({
      x: `₸${Math.round(item.salaryRange).toLocaleString()}`,
      y: item.count,
    }));
  };

  // Calculate statistics
  const salaryByLevelData = prepareAverageSalaryByLevelData();
  const topPositionsData = prepareTopPositionsData();
  const salaryDistributionData = prepareSalaryDistributionData();

  // Filter salaries from current page for rendering
  const filteredSalaries = salaryData ? salaryData.salaries : [];

  // Calculate total pages
  const totalPages = salaryData ? salaryData.totalPages : 0;

  if (error.salaries) {
    return (
      <Box className={styles.notFound}>
        <Typography variant="h5">
          Ошибка при загрузке данных о зарплатах
        </Typography>
        <Typography>{error.salaries}</Typography>
      </Box>
    );
  }

  return (
    <Box className={styles.companySalaries}>
      <Box className={styles.header}>
        <Typography variant="h4" className={styles.title}>
          {loading.salaries ? (
            <Skeleton className="h-10 w-96" />
          ) : (
            `Зарплаты в компании ${salaryData?.companyName || ""}`
          )}
        </Typography>
        <Typography variant="body1" className={styles.subtitle}>
          {loading.salaries ? (
            <Skeleton className="h-4 w-64" />
          ) : (
            `Данные о ${
              salaryData?.totalSalaries || 0
            } зарплатах в различных должностях`
          )}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card className={styles.infoCard}>
            <CardContent>
              <Typography variant="h6" className={styles.cardTitle}>
                Средние зарплаты по уровню опыта
              </Typography>
              <Box className={styles.chartContainer}>
                {loading.salaries ? (
                  <Skeleton className="h-full w-full" />
                ) : salaryByLevelData.length > 0 ? (
                  <ResponsiveBar
                    data={salaryByLevelData}
                    keys={["value"]}
                    indexBy="level"
                    margin={{ top: 50, right: 30, bottom: 50, left: 80 }}
                    padding={0.3}
                    valueScale={{ type: "linear" }}
                    indexScale={{ type: "band", round: true }}
                    colors={["#800000"]}
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
                      legend: "Уровень опыта",
                      legendPosition: "middle",
                      legendOffset: 32,
                    }}
                    axisLeft={{
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      legend: "Зарплата (₸)",
                      legendPosition: "middle",
                      legendOffset: -60,
                      format: (value) =>
                        `₸${Math.round(value).toLocaleString()}`,
                    }}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    labelTextColor={{
                      from: "color",
                      modifiers: [["darker", 1.6]],
                    }}
                    animate={true}
                    tooltip={({ data, value }) => (
                      <div className={styles.tooltip}>
                        <strong>{data.level}</strong>
                        <br />₸{Math.round(value).toLocaleString()}
                      </div>
                    )}
                  />
                ) : (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                  >
                    <Typography>
                      Недостаточно данных для отображения графика
                    </Typography>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card className={styles.statsCard}>
            <CardContent>
              <Typography variant="h6" className={styles.cardTitle}>
                Ключевые показатели зарплат
              </Typography>
              {loading.salaries ? (
                <Box className={styles.statsGrid}>
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-20 w-full mb-4" />
                  ))}
                </Box>
              ) : salaryData ? (
                <Box className={styles.statsGrid}>
                  <Box className={styles.statItem}>
                    <Box className={styles.statIcon}>
                      <DollarSign size={20} />
                    </Box>
                    <Box className={styles.statContent}>
                      <Typography
                        variant="subtitle2"
                        className={styles.statLabel}
                      >
                        Средняя зарплата
                      </Typography>
                      <Typography variant="h6" className={styles.statValue}>
                        ₸
                        {Math.round(
                          salaryData.statistics.averageSalary
                        ).toLocaleString()}
                      </Typography>
                    </Box>
                  </Box>

                  <Box className={styles.statItem}>
                    <Box className={styles.statIcon}>
                      <TrendingUp size={20} />
                    </Box>
                    <Box className={styles.statContent}>
                      <Typography
                        variant="subtitle2"
                        className={styles.statLabel}
                      >
                        Высшая зарплата
                      </Typography>
                      <Typography variant="h6" className={styles.statValue}>
                        ₸
                        {Math.round(
                          salaryData.statistics.highestSalary
                        ).toLocaleString()}
                      </Typography>
                    </Box>
                  </Box>

                  <Box className={styles.statItem}>
                    <Box className={styles.statIcon}>
                      <Briefcase size={20} />
                    </Box>
                    <Box className={styles.statContent}>
                      <Typography
                        variant="subtitle2"
                        className={styles.statLabel}
                      >
                        Количество должностей
                      </Typography>
                      <Typography variant="h6" className={styles.statValue}>
                        {salaryData.statistics.totalPositions}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ) : null}
            </CardContent>
          </Card>
        </Grid>

        {!loading.salaries && salaryData && (
          <>
            <Grid item xs={12} md={6}>
              <Card className={styles.infoCard}>
                <CardContent>
                  <Typography variant="h6" className={styles.cardTitle}>
                    Топ-5 высокооплачиваемых должностей
                  </Typography>
                  <Box className={styles.chartContainer}>
                    {topPositionsData.length > 0 ? (
                      <ResponsiveBar
                        data={topPositionsData}
                        keys={["salary"]}
                        indexBy="position"
                        margin={{ top: 50, right: 50, bottom: 70, left: 80 }}
                        padding={0.3}
                        layout="horizontal"
                        valueScale={{ type: "linear" }}
                        indexScale={{ type: "band", round: true }}
                        colors={["#336699"]}
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
                          legend: "Зарплата (₸)",
                          legendPosition: "middle",
                          legendOffset: 40,
                          format: (value) =>
                            `₸${Math.round(value).toLocaleString()}`,
                        }}
                        axisLeft={{
                          tickSize: 5,
                          tickPadding: 5,
                          tickRotation: 0,
                          legendPosition: "middle",
                          legendOffset: -60,
                        }}
                        tooltip={({ data, value }) => (
                          <div className={styles.tooltip}>
                            <strong>{data.position}</strong>
                            <br />₸{Math.round(value).toLocaleString()}
                          </div>
                        )}
                      />
                    ) : (
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        height="100%"
                      >
                        <Typography>
                          Недостаточно данных для отображения графика
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card className={styles.infoCard}>
                <CardContent>
                  <Typography variant="h6" className={styles.cardTitle}>
                    Распределение зарплат
                  </Typography>
                  <Box className={styles.chartContainer}>
                    {salaryDistributionData.length > 0 ? (
                      <ResponsiveLine
                        data={[
                          {
                            id: "зарплаты",
                            color: "#800000",
                            data: salaryDistributionData,
                          },
                        ]}
                        margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
                        xScale={{ type: "point" }}
                        yScale={{
                          type: "linear",
                          min: 0,
                          max: "auto",
                          stacked: false,
                          reverse: false,
                        }}
                        curve="monotoneX"
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                          tickSize: 5,
                          tickPadding: 5,
                          tickRotation: 45,
                          legend: "Уровень зарплаты",
                          legendOffset: 50,
                          legendPosition: "middle",
                        }}
                        axisLeft={{
                          tickSize: 5,
                          tickPadding: 5,
                          tickRotation: 0,
                          legend: "Количество должностей",
                          legendOffset: -50,
                          legendPosition: "middle",
                        }}
                        colors={["#800000"]}
                        pointSize={10}
                        pointColor={{ theme: "background" }}
                        pointBorderWidth={2}
                        pointBorderColor={{ from: "serieColor" }}
                        pointLabelYOffset={-12}
                        areaBaselineValue={0}
                        enableArea={true}
                        areaOpacity={0.15}
                        useMesh={true}
                        enableSlices="x"
                      />
                    ) : (
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        height="100%"
                      >
                        <Typography>
                          Недостаточно данных для отображения графика
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </>
        )}
      </Grid>

      <Box className={styles.salarySearch}>
        <Typography variant="h5" className={styles.sectionTitle}>
          Поиск по зарплатам
        </Typography>

        <Box className={styles.searchFilters}>
          <TextField
            placeholder="Поиск по должности..."
            value={positionSearch}
            onChange={handlePositionSearchChange}
            variant="outlined"
            className={styles.searchInput}
            InputProps={{
              startAdornment: (
                <Search size={20} className={styles.searchIcon} />
              ),
            }}
          />

          <Box className={styles.filterGroup}>
            <Typography variant="body2" className={styles.filterLabel}>
              Фильтр по опыту:
            </Typography>
            <Select
              value={experienceFilter}
              onValueChange={(value: ExperienceFilter) =>
                handleExperienceFilterChange(value)
              }
            >
              <SelectTrigger className={styles.selectTrigger}>
                <SelectValue placeholder="Выберите уровень" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все уровни</SelectItem>
                <SelectItem value="entry">Начальный уровень</SelectItem>
                <SelectItem value="mid">Средний уровень</SelectItem>
                <SelectItem value="senior">Старший уровень</SelectItem>
                <SelectItem value="executive">Руководитель</SelectItem>
              </SelectContent>
            </Select>
          </Box>

          <Box className={styles.filterGroup}>
            <Typography variant="body2" className={styles.filterLabel}>
              Сортировать по:
            </Typography>
            <Select
              value={sortOption}
              onValueChange={(value: "highest" | "lowest") =>
                handleSortChange(value)
              }
            >
              <SelectTrigger className={styles.selectTrigger}>
                <SelectValue placeholder="Сортировка" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="highest">Наибольшая зарплата</SelectItem>
                <SelectItem value="lowest">Наименьшая зарплата</SelectItem>
              </SelectContent>
            </Select>
          </Box>
        </Box>

        <Box className={styles.resultsCount}>
          <Typography variant="body2">
            {loading.salaries ? (
              <Skeleton className="h-4 w-40" />
            ) : (
              `Найдено ${salaryData?.totalSalaries || 0} результатов`
            )}
          </Typography>
        </Box>
      </Box>

      <Box className={styles.salariesList}>
        {loading.salaries ? (
          Array(3)
            .fill(0)
            .map((_, index) => (
              <Card key={index} className={styles.salaryCard}>
                <CardContent>
                  <Skeleton className="h-6 w-64 mb-4" />
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <Skeleton className="h-16 w-full" />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Skeleton className="h-16 w-full" />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Skeleton className="h-16 w-full" />
                    </Grid>
                  </Grid>
                  <Skeleton className="h-8 w-full mt-4" />
                </CardContent>
              </Card>
            ))
        ) : filteredSalaries.length > 0 ? (
          filteredSalaries.map((salary, index) => (
            <Card key={index} className={styles.salaryCard}>
              <CardContent className={styles.salaryContent}>
                <Box className={styles.salaryHeader}>
                  <Typography variant="h6" className={styles.position}>
                    {salary.position}
                  </Typography>
                  <Chip
                    label={salary.experienceLevel}
                    className={`${styles.levelChip} ${
                      salary.experienceLevel.toLowerCase().includes("senior")
                        ? styles.seniorChip
                        : salary.experienceLevel.toLowerCase().includes("entry")
                        ? styles.entryChip
                        : styles.midChip
                    }`}
                  />
                </Box>

                <Grid container spacing={2} className={styles.salaryDetails}>
                  <Grid item xs={12} sm={4}>
                    <Box className={styles.detailItem}>
                      <Typography
                        variant="body2"
                        className={styles.detailLabel}
                      >
                        Средняя зарплата
                      </Typography>
                      <Typography variant="h6" className={styles.salaryValue}>
                        ₸{salary.median.toLocaleString()}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Box className={styles.detailItem}>
                      <Typography
                        variant="body2"
                        className={styles.detailLabel}
                      >
                        Диапазон
                      </Typography>
                      <Typography
                        variant="body1"
                        className={styles.salaryRange}
                      >
                        ₸{salary.min.toLocaleString()} - ₸
                        {salary.max.toLocaleString()}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Box className={styles.detailItem}>
                      <Typography
                        variant="body2"
                        className={styles.detailLabel}
                      >
                        Дополнительные выплаты
                      </Typography>
                      <Typography variant="body1" className={styles.bonusValue}>
                        ₸{salary.additionalPay.toLocaleString()}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Box className={styles.salaryProgress}>
                  <Box className={styles.progressBar}>
                    <Box
                      className={styles.progressFill}
                      style={{
                        width: `${
                          ((salary.median - salary.min) /
                            (salary.max - salary.min)) *
                          100
                        }%`,
                      }}
                    />
                    <Box
                      className={styles.progressMarker}
                      style={{
                        left: `${
                          ((salary.median - salary.min) /
                            (salary.max - salary.min)) *
                          100
                        }%`,
                      }}
                    />
                  </Box>
                  <Box className={styles.rangeLabels}>
                    <Typography variant="caption" className={styles.minLabel}>
                      ₸{salary.min.toLocaleString()}
                    </Typography>
                    <Typography variant="caption" className={styles.maxLabel}>
                      ₸{salary.max.toLocaleString()}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant="body1" className={styles.noResults}>
            По заданным критериям зарплат не найдено.
          </Typography>
        )}
      </Box>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i}
              variant={page === i ? "default" : "outline"}
              size="sm"
              onClick={() => handleChangePage(i)}
              className={styles.paginationBtn}
              data-state={page === i ? "on" : "off"}
            >
              {i + 1}
            </Button>
          ))}
        </div>
      )}
    </Box>
  );
};

export default CompanySalariesPage;
