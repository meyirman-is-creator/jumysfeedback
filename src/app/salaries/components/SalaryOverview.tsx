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
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
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
          How much does a {position} make?
        </Typography>

        <Box className={styles.salaryRange}>
          <Typography variant="h3" className={styles.rangeText}>
            {formatK(data.minSalary)} - {formatK(data.maxSalary)}{" "}
            <span className={styles.periodText}>/yr</span>
          </Typography>
        </Box>

        <Box className={styles.medianContainer}>
          <Typography variant="body1" className={styles.medianLabel}>
            {formatCurrency(data.medianSalary)}/yr
          </Typography>
          <Typography variant="body2" className={styles.medianSubtext}>
            Median total pay
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
            The estimated total pay for a {position} is{" "}
            {formatCurrency(data.totalEstimate)} per year, with an average
            salary of {formatCurrency(data.baseEstimate)} per year. These
            numbers represent the median, which is the midpoint of the ranges
            from our proprietary Total Pay Estimate model and based on salaries
            collected from our users. The estimated additional pay is{" "}
            {formatCurrency(data.additionalEstimate)} per year. Additional pay
            could include cash bonus, commission, tips, and profit sharing.
          </Typography>
        </Box>

        <Box className={styles.accuracyContainer}>
          <Typography variant="subtitle2" className={styles.accuracyLabel}>
            How accurate is this pay range of {formatK(data.minSalary)}-
            {formatK(data.maxSalary)}/yr?
          </Typography>
          <Box className={styles.accuracyButtonGroup}>
            <button className={styles.accuracyButton}>Low</button>
            <button
              className={`${styles.accuracyButton} ${styles.accuracyButtonActive}`}
            >
              Accurate
            </button>
            <button className={styles.accuracyButton}>High</button>
          </Box>
          <Typography variant="caption" className={styles.accuracyHelpText}>
            Your input helps Glassdoor refine our pay estimates over time.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
