import React from "react";
import { Box, Typography } from "@mui/material";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import styles from "./SalaryOverview.module.scss";

interface SalaryOverviewProps {
  data: {
    minSalary: number;
    maxSalary: number;
    medianSalary: number;
    totalEstimate: number;
    baseEstimate: number;
    additionalEstimate: number;
  };
  position: string;
}

export default function SalaryOverview({
  data,
  position,
}: SalaryOverviewProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ru-KZ", {
      style: "currency",
      currency: "KZT",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Function to convert number to K format
  const formatK = (amount: number) => {
    return Math.round(amount / 1000) + "K";
  };

  // Calculate the progress value between 0-100 based on salary range
  const calculateProgress = (amount: number) => {
    const range = data.maxSalary - data.minSalary;
    const position = amount - data.minSalary;
    return (position / range) * 100;
  };

  return (
    <Card className={styles.overviewCard}>
      <CardContent className={styles.cardContent}>
        <Typography variant="h5" className={styles.question}>
          Сколько зарабатывает {position}?
        </Typography>

        <Box className={styles.salaryRange}>
          <Typography variant="h3" className={styles.rangeText}>
            {formatK(data.minSalary)} - {formatK(data.maxSalary)}{" "}
            <span className={styles.periodText}>/год</span>
          </Typography>
        </Box>

        <Box className={styles.medianContainer}>
          <Typography variant="body1" className={styles.medianLabel}>
            {formatCurrency(data.medianSalary)}/год
          </Typography>
          <Typography variant="body2" className={styles.medianSubtext}>
            Средняя общая оплата
          </Typography>
        </Box>

        <Box className={styles.progressContainer}>
          <Progress
            value={calculateProgress(data.medianSalary)}
            className={styles.progressBar}
          />
        </Box>

        <Box className={styles.estimateContainer}>
          <Typography variant="body2" className={styles.estimateText}>
            Предполагаемая общая оплата для {position}а составляет{" "}
            {formatCurrency(data.totalEstimate)} в год, при средней зарплате{" "}
            {formatCurrency(data.baseEstimate)} в год. Эти цифры представляют
            медиану, которая является серединой диапазонов из нашей модели
            оценки общей оплаты и основана на данных о зарплатах, собранных от
            наших пользователей. Предполагаемая дополнительная оплата составляет{" "}
            {formatCurrency(data.additionalEstimate)} в год. Дополнительная оплата
            может включать денежные бонусы, комиссии, чаевые и участие в
            прибыли.
          </Typography>
        </Box>

        <Box className={styles.accuracyContainer}>
          <Typography variant="subtitle2" className={styles.accuracyLabel}>
            Насколько точен этот диапазон зарплат {formatK(data.minSalary)}-
            {formatK(data.maxSalary)}/год?
          </Typography>
          <Box className={styles.accuracyButtonGroup}>
            <button className={styles.accuracyButton}>Низкий</button>
            <button
              className={`${styles.accuracyButton} ${styles.accuracyButtonActive}`}
            >
              Точный
            </button>
            <button className={styles.accuracyButton}>Высокий</button>
          </Box>
          <Typography variant="caption" className={styles.accuracyHelpText}>
            Ваш отзыв помогает нам со временем улучшать наши оценки зарплат.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}