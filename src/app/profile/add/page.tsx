// src/app/profile/add/page.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Typography, Box, Paper, Button, Grid } from "@mui/material";
import { FileText, DollarSign, MessageSquare, User } from "lucide-react";
import styles from "./AddPage.module.scss";

export default function AddPage() {
  const router = useRouter();

  const contentTypes = [
    {
      id: "review",
      title: "Company Review",
      icon: <FileText size={40} />,
      description:
        "Добавьте отзыв о работе в компании, оцените условия и менеджмент",
      path: "/add/review",
    },
    {
      id: "salary",
      title: "Salary",
      icon: <DollarSign size={40} />,
      description:
        "Поделитесь информацией о зарплате для помощи другим в переговорах",
      path: "/add/salary",
    },
  ];

  const handleSelectContentType = (path: string) => {
    router.push(path);
  };

  return (
    <div className={styles.addPage}>
      <Box className={styles.header}>
        <Typography variant="h4" className={styles.title}>
          Добавить контент
        </Typography>
        <Typography variant="body1" className={styles.subtitle}>
          Glassdoor has millions of salaries and company reviews shared by real
          employees. It only takes a minute to get unlimited access to all our
          content for 12 months.
        </Typography>
      </Box>

      <Paper className={styles.selectionCard}>
        <Typography variant="h6" className={styles.selectionTitle}>
          Please select a review type:
        </Typography>

        <Grid container spacing={3} className={styles.optionsGrid}>
          {contentTypes.map((type) => (
            <Grid item xs={12} sm={6} key={type.id}>
              <Box
                className={styles.optionCard}
                onClick={() => handleSelectContentType(type.path)}
              >
                <Box className={styles.iconContainer}>{type.icon}</Box>
                <Typography variant="h6" className={styles.optionTitle}>
                  {type.title}
                </Typography>
                <Typography
                  variant="body2"
                  className={styles.optionDescription}
                >
                  {type.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </div>
  );
}
