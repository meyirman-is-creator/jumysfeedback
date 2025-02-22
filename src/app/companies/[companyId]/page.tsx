"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Container, Typography, Box, Button, Grid } from "@mui/material";
import { mockCompanies } from "@/features/company/mockData";
import styles from "./CompanyOverviewPage.module.scss";

const CompanyOverviewPage = () => {
  const params = useParams();
  const router = useRouter();
  const companyId = params.companyId;
  const company = mockCompanies.find((item) => item.id === companyId);

  if (!company) {
    return (
      <Container maxWidth="md" className={styles.companyOverview}>
        <Typography variant="h4">Компания не найдена</Typography>
      </Container>
    );
  }

  const handleAddReview = () => {
    router.push("/create/review");
  };
  const handleAddInterview = () => {
    router.push("/create/interview");
  };
  const handleAddBenefit = () => {
    router.push("/create/benefit");
  };
  const handleSeeAllReviews = () => {
    router.push(`/companies/${companyId}/reviews`);
  };
  const handleSeeAllInterviews = () => {
    router.push(`/companies/${companyId}/interviews`);
  };

  return (
    <Container maxWidth="md" className={styles.companyOverview}>
      <Box className={styles.companyOverview__header}>
        <Box className={styles.companyOverview__logo}>
          <img src={company.logoUrl} alt={company.name} />
        </Box>
        <Box className={styles.companyOverview__info}>
          <Typography variant="h4" className={styles.companyOverview__title}>
            {company.name}
          </Typography>
          <Typography variant="subtitle1">Рейтинг: {company.rating}</Typography>
          <Typography variant="subtitle2">{company.location}</Typography>
          <Button variant="contained" onClick={handleAddReview}>
            Добавить отзыв
          </Button>
        </Box>
      </Box>

      <Box className={styles.companyOverview__tabs}>
        <Typography variant="h5">Обзор</Typography>
      </Box>
      <Box className={styles.companyOverview__tabPanel}>
        <Typography variant="body1">
          Основана: {company.overallInfo.founded}
        </Typography>
        <Typography variant="body1">
          Выручка: {company.overallInfo.revenue}
        </Typography>
        <Typography variant="body1">
          Миссия: {company.overallInfo.mission}
        </Typography>
        <Typography variant="body1">
          Конкуренты: {company.overallInfo.competitors.join(", ")}
        </Typography>
      </Box>

      <Box className={styles.companyOverview__section}>
        <Typography variant="h6">Обзор отзывов</Typography>
        <Typography variant="body2">
          Всего отзывов: {company.reviews.length}
        </Typography>
        <Button onClick={handleSeeAllReviews}>Посмотреть все отзывы</Button>
      </Box>

      <Box className={styles.companyOverview__section}>
        <Typography variant="h6">Обзор собеседований</Typography>
        <Typography variant="body2">
          Всего собеседований: {company.interviews.length}
        </Typography>
        <Button onClick={handleSeeAllInterviews}>
          Посмотреть все собеседования
        </Button>
      </Box>

      <Box className={styles.companyOverview__section}>
        <Typography variant="h6">Добавить контент</Typography>
        <Box display="flex" gap="1rem" mt={1}>
          <Button variant="outlined" onClick={handleAddReview}>
            Отзыв
          </Button>
          <Button variant="outlined" onClick={handleAddInterview}>
            Собеседование
          </Button>
          <Button variant="outlined" onClick={handleAddBenefit}>
            Бенефит
          </Button>
        </Box>
      </Box>

      <Box className={styles.companyOverview__section}>
        <Typography variant="h6">Рекомендуемые компании</Typography>
        <Grid container spacing={2}>
          {company.recommended.map((rec) => (
            <Grid item xs={12} sm={6} key={rec.id}>
              <Box className={styles.companyOverview__recommendation}>
                <img src={rec.logoUrl} alt={rec.name} />
                <Box>
                  <Typography variant="subtitle1">{rec.name}</Typography>
                  <Typography variant="body2">Рейтинг: {rec.rating}</Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box className={styles.companyOverview__section}>
        <Typography variant="h6">Топ компании</Typography>
        <Grid container spacing={2}>
          {company.topCompanies.map((tc) => (
            <Grid item xs={12} sm={6} key={tc.id}>
              <Box className={styles.companyOverview__topCompany}>
                <Typography variant="subtitle1">{tc.name}</Typography>
                <Typography variant="body2">Рейтинг: {tc.rating}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default CompanyOverviewPage;
