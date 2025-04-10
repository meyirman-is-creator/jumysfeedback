"use client";
import React, { useState } from "react";
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
import { ResponsivePie } from "@nivo/pie";
import { Search, DollarSign, TrendingUp, Briefcase } from "lucide-react";
import { mockCompanies } from "@/features/company/mockData";
import styles from "./CompanySalariesPage.module.scss";

const CompanySalariesPage = () => {
  const { companyId } = useParams() as { companyId: string };
  const company = mockCompanies.find((c) => c.id === companyId);

  const [experienceFilter, setExperienceFilter] = useState("all");
  const [positionSearch, setPositionSearch] = useState("");
  const [sortOption, setSortOption] = useState("highest");
  const [page, setPage] = useState(1);
  const salariesPerPage = 5;

  if (!company) {
    return (
      <Box className={styles.notFound}>
        <Typography variant="h5">Компания не найдена</Typography>
      </Box>
    );
  }

  // Фильтруем зарплаты по опыту и поиску
  const filteredSalaries = company.salaries.filter((salary) => {
    const matchesExperience =
      experienceFilter === "all" ||
      (experienceFilter === "entry" &&
        salary.experienceLevel.toLowerCase().includes("entry")) ||
      (experienceFilter === "mid" &&
        salary.experienceLevel.toLowerCase().includes("mid")) ||
      (experienceFilter === "senior" &&
        salary.experienceLevel.toLowerCase().includes("senior"));

    const matchesSearch =
      positionSearch === "" ||
      salary.position.toLowerCase().includes(positionSearch.toLowerCase());

    return matchesExperience && matchesSearch;
  });

  // Сортируем зарплаты
  const sortedSalaries = [...filteredSalaries].sort((a, b) => {
    if (sortOption === "highest") {
      return b.median - a.median;
    } else if (sortOption === "lowest") {
      return a.median - b.median;
    }
    return 0;
  });

  // Пагинация
  const totalPages = Math.ceil(sortedSalaries.length / salariesPerPage);
  const currentSalaries = sortedSalaries.slice(
    (page - 1) * salariesPerPage,
    page * salariesPerPage
  );

  const handleChangePage = (pageNumber) => {
    setPage(pageNumber);
  };

  // Подготовка данных для визуализации
  const avgSalaryByLevel = {
    Entry: 0,
    Mid: 0,
    Senior: 0,
    counts: {
      Entry: 0,
      Mid: 0,
      Senior: 0,
    },
  };

  company.salaries.forEach((salary) => {
    if (salary.experienceLevel.toLowerCase().includes("entry")) {
      avgSalaryByLevel["Entry"] += salary.median;
      avgSalaryByLevel.counts["Entry"]++;
    } else if (salary.experienceLevel.toLowerCase().includes("senior")) {
      avgSalaryByLevel["Senior"] += salary.median;
      avgSalaryByLevel.counts["Senior"]++;
    } else {
      avgSalaryByLevel["Mid"] += salary.median;
      avgSalaryByLevel.counts["Mid"]++;
    }
  });

  // Вычисляем средние значения
  Object.keys(avgSalaryByLevel.counts).forEach((level) => {
    if (avgSalaryByLevel.counts[level] > 0) {
      avgSalaryByLevel[level] /= avgSalaryByLevel.counts[level];
    }
  });

  // Подготовка данных для графика зарплат по опыту
  const salaryByLevelData = [
    { level: "Начальный", value: avgSalaryByLevel["Entry"] },
    { level: "Средний", value: avgSalaryByLevel["Mid"] },
    { level: "Старший", value: avgSalaryByLevel["Senior"] },
  ];

  // Подготовка данных для графика топ позиций
  const topPositions = [...company.salaries]
    .sort((a, b) => b.median - a.median)
    .slice(0, 5)
    .map((salary) => ({
      position: salary.position,
      salary: salary.median,
    }));

  // Подготовка данных для распределения зарплат
  const salaryCounts = {};
  company.salaries.forEach((salary) => {
    // Округляем до ближайшей тысячи
    const roundedSalary = Math.round(salary.median / 1000) * 1000;
    salaryCounts[roundedSalary] = (salaryCounts[roundedSalary] || 0) + 1;
  });

  const salaryDistribution = Object.keys(salaryCounts)
    .map((salary) => ({
      x: `$${parseInt(salary).toLocaleString()}`,
      y: salaryCounts[salary],
    }))
    .sort(
      (a, b) =>
        parseInt(a.x.replace(/\D/g, "")) - parseInt(b.x.replace(/\D/g, ""))
    );

  return (
    <Box className={styles.companySalaries}>
      <Box className={styles.header}>
        <Typography variant="h4" className={styles.title}>
          Зарплаты в компании {company.name}
        </Typography>
        <Typography variant="body1" className={styles.subtitle}>
          Данные о {company.salaries.length} зарплатах в различных должностях
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
                <ResponsiveBar
                  data={salaryByLevelData}
                  keys={["value"]}
                  indexBy="level"
                  margin={{ top: 50, right: 30, bottom: 50, left: 80 }}
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
                    tickRotation: 0,
                    legend: "Уровень опыта",
                    legendPosition: "middle",
                    legendOffset: 32,
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Зарплата (USD)",
                    legendPosition: "middle",
                    legendOffset: -60,
                    format: (value) => `$${Math.round(value).toLocaleString()}`,
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
                  tooltip={({ data, value }) => (
                    <div className={styles.tooltip}>
                      <strong>{data.level}</strong>
                      <br />${Math.round(value).toLocaleString()}
                    </div>
                  )}
                />
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
                      $
                      {Math.round(
                        company.salaries.reduce((sum, s) => sum + s.median, 0) /
                          company.salaries.length
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
                      $
                      {Math.max(
                        ...company.salaries.map((s) => s.max)
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
                      {company.salaries.length}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card className={styles.infoCard}>
            <CardContent>
              <Typography variant="h6" className={styles.cardTitle}>
                Топ-5 высокооплачиваемых должностей
              </Typography>
              <Box className={styles.chartContainer}>
                <ResponsiveBar
                  data={topPositions}
                  keys={["salary"]}
                  indexBy="position"
                  margin={{ top: 50, right: 50, bottom: 70, left: 80 }}
                  padding={0.3}
                  layout="horizontal"
                  valueScale={{ type: "linear" }}
                  indexScale={{ type: "band", round: true }}
                  colors={["#336699"]}
                  borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Зарплата (USD)",
                    legendPosition: "middle",
                    legendOffset: 40,
                    format: (value) => `$${Math.round(value).toLocaleString()}`,
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
                      <br />${Math.round(value).toLocaleString()}
                    </div>
                  )}
                />
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
                <ResponsiveLine
                  data={[
                    {
                      id: "зарплаты",
                      color: "#800000",
                      data: salaryDistribution,
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
                    orient: "bottom",
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 45,
                    legend: "Уровень зарплаты",
                    legendOffset: 50,
                    legendPosition: "middle",
                  }}
                  axisLeft={{
                    orient: "left",
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
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box className={styles.salarySearch}>
        <Typography variant="h5" className={styles.sectionTitle}>
          Поиск по зарплатам
        </Typography>

        <Box className={styles.searchFilters}>
          <TextField
            placeholder="Поиск по должности..."
            value={positionSearch}
            onChange={(e) => setPositionSearch(e.target.value)}
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
              onValueChange={(value) => setExperienceFilter(value)}
            >
              <SelectTrigger className={styles.selectTrigger}>
                <SelectValue placeholder="Выберите уровень" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все уровни</SelectItem>
                <SelectItem value="entry">Начальный уровень</SelectItem>
                <SelectItem value="mid">Средний уровень</SelectItem>
                <SelectItem value="senior">Старший уровень</SelectItem>
              </SelectContent>
            </Select>
          </Box>

          <Box className={styles.filterGroup}>
            <Typography variant="body2" className={styles.filterLabel}>
              Сортировать по:
            </Typography>
            <Select
              value={sortOption}
              onValueChange={(value) => setSortOption(value)}
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
            Найдено {filteredSalaries.length} результатов
          </Typography>
        </Box>
      </Box>

      <Box className={styles.salariesList}>
        {currentSalaries.length > 0 ? (
          currentSalaries.map((salary, index) => (
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
                        ${salary.median.toLocaleString()}
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
                        ${salary.min.toLocaleString()} - $
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
                        ${salary.additionalPay.toLocaleString()}
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
                      ${salary.min.toLocaleString()}
                    </Typography>
                    <Typography variant="caption" className={styles.maxLabel}>
                      ${salary.max.toLocaleString()}
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
              key={i + 1}
              variant={page === i + 1 ? "default" : "outline"}
              size="sm"
              onClick={() => handleChangePage(i + 1)}
              className={styles.paginationBtn}
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
