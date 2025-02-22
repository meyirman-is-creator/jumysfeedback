"use client";
import React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Divider,
} from "@mui/material";
import { mockCompanies } from "@/features/company/mockData";
import styles from "./CompanyOverviewPage.module.scss";

// Функция: ищем компании по массиву id
function getCompaniesByIds(ids: string[]) {
  return mockCompanies.filter((c) => ids.includes(c.id));
}

export default function CompanyOverviewPage() {
  const params = useParams();
  const router = useRouter();
  const companyId = typeof params.companyId === "string" ? params.companyId : "";
  const company = mockCompanies.find((item) => item.id === companyId);

  if (!company) {
    return (
      <Container maxWidth="md" className={styles.companyOverview}>
        <Typography variant="h4">Компания не найдена</Typography>
      </Container>
    );
  }

  const singleReview = company.reviews[0];
  const singleBenefit = company.benefits[0];
  const singleInterview = company.interviews[0];
  const singleSalary = company.salaries[0];

  const handleSeeAllReviews = () => router.push(`/companies/${companyId}/reviews`);
  const handleSeeAllBenefits = () => router.push(`/companies/${companyId}/benefits`);
  const handleSeeAllInterviews = () => router.push(`/companies/${companyId}/interviews`);
  const handleSeeAllSalaries = () => router.push(`/companies/${companyId}/salaries`);

  // Предположим, company.recommended и company.topCompanies — это массив
  // вида [{ id: "...", name: "...", ... }] или просто массив id-строк.
  // Если у вас в mockData хранятся id-объекты, то нужно чуть иначе.
  // Если там уже полные объекты, можно напрямую использовать company.recommended.
  // Но здесь показываю логику, если это массив ID:
  const recommendedIds = company.recommended.map((r) => r.id); // извлекаем id
  const topIds = company.topCompanies.map((t) => t.id);        // извлекаем id

  const recommendedCompanies = getCompaniesByIds(recommendedIds);
  const topCompanies = getCompaniesByIds(topIds);

  return (
    <Container maxWidth="md" className={styles.companyOverview}>
      <Box className={styles.companyOverview__tabPanel}>
        <Typography variant="body1">Основана: {company.overallInfo.founded}</Typography>
        <Typography variant="body1">Выручка: {company.overallInfo.revenue}</Typography>
        <Typography variant="body1">Миссия: {company.overallInfo.mission}</Typography>
        <Typography variant="body1">
          Конкуренты: {company.overallInfo.competitors.join(", ")}
        </Typography>
      </Box>

      <Box className={styles.companyOverview__overallSections}>
        <Box className={styles.companyOverview__section}>
          <Typography variant="h6">Один из отзывов</Typography>
          {singleReview ? (
            <Box className={styles.companyOverview__itemBox}>
              <Typography variant="subtitle1" className={styles.companyOverview__itemTitle}>
                {singleReview.title}
              </Typography>
              <Typography variant="body2" className={styles.companyOverview__itemSub}>
                Рейтинг: {singleReview.rating} — Автор: {singleReview.author}
              </Typography>
              <Typography variant="body2" className={styles.companyOverview__itemBody}>
                {singleReview.body}
              </Typography>
            </Box>
          ) : (
            <Typography variant="body2">Пока нет отзывов</Typography>
          )}
          {company.reviews.length > 0 && (
            <Button className={styles.companyOverview__linkButton} onClick={handleSeeAllReviews}>
              Посмотреть все {company.reviews.length}
            </Button>
          )}
        </Box>

        <Divider />

        <Box className={styles.companyOverview__section}>
          <Typography variant="h6">Один из бенефитов</Typography>
          {singleBenefit ? (
            <Box className={styles.companyOverview__itemBox}>
              <Typography variant="subtitle1" className={styles.companyOverview__itemTitle}>
                {singleBenefit.title}
              </Typography>
              <Typography variant="body2" className={styles.companyOverview__itemBody}>
                {singleBenefit.description}
              </Typography>
            </Box>
          ) : (
            <Typography variant="body2">Пока нет бенефитов</Typography>
          )}
          {company.benefits.length > 0 && (
            <Button className={styles.companyOverview__linkButton} onClick={handleSeeAllBenefits}>
              Посмотреть все {company.benefits.length}
            </Button>
          )}
        </Box>

        <Divider />

        <Box className={styles.companyOverview__section}>
          <Typography variant="h6">Одна из зарплат</Typography>
          {singleSalary ? (
            <Box className={styles.companyOverview__itemBox}>
              <Typography variant="subtitle1" className={styles.companyOverview__itemTitle}>
                {singleSalary.position}
              </Typography>
              <Typography variant="body2" className={styles.companyOverview__itemBody}>
                {singleSalary.amount}
              </Typography>
            </Box>
          ) : (
            <Typography variant="body2">Пока нет данных о зарплатах</Typography>
          )}
          {company.salaries.length > 0 && (
            <Button className={styles.companyOverview__linkButton} onClick={handleSeeAllSalaries}>
              Посмотреть все {company.salaries.length}
            </Button>
          )}
        </Box>

        <Divider />

        <Box className={styles.companyOverview__section}>
          <Typography variant="h6">Одно из собеседований</Typography>
          {singleInterview ? (
            <Box className={styles.companyOverview__itemBox}>
              <Typography variant="subtitle1" className={styles.companyOverview__itemTitle}>
                {singleInterview.position}
              </Typography>
              <Typography variant="body2" className={styles.companyOverview__itemSub}>
                Сложность: {singleInterview.difficulty} — Опыт: {singleInterview.experience}
              </Typography>
              <Typography variant="body2" className={styles.companyOverview__itemBody}>
                {singleInterview.details}
              </Typography>
            </Box>
          ) : (
            <Typography variant="body2">Пока нет собеседований</Typography>
          )}
          {company.interviews.length > 0 && (
            <Button className={styles.companyOverview__linkButton} onClick={handleSeeAllInterviews}>
              Посмотреть все {company.interviews.length}
            </Button>
          )}
        </Box>
      </Box>

      <Box className={styles.companyOverview__addContentSection}>
        <Typography variant="h6" className={styles.companyOverview__addContentTitle}>
          Добавить контент
        </Typography>
        <Box className={styles.companyOverview__addContentButtons}>
          <Button variant="outlined" className={styles.companyOverview__outlinedBtn}>
            Отзыв
          </Button>
          <Button variant="outlined" className={styles.companyOverview__outlinedBtn}>
            Собеседование
          </Button>
          <Button variant="outlined" className={styles.companyOverview__outlinedBtn}>
            Бенефит
          </Button>
        </Box>
      </Box>

      <Box className={styles.companyOverview__section}>
        <Typography variant="h6">Также рекомендуем</Typography>
        <Grid container spacing={2}>
          {recommendedCompanies.map((rec) => (
            <Grid item xs={12} key={rec.id}>
              <Link href={`/companies/${rec.id}`}>
                <Box className={styles.companyOverview__recommendation}>
                  <img src={rec.logoUrl} alt={rec.name} />
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {rec.name} {rec.rating}★
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#666" }}>
                      {rec.reviews?.length ?? 0} Reviews
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#d2691e", fontWeight: 500 }}>
                      Compare &rarr;
                    </Typography>
                  </Box>
                </Box>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ margin: "2rem 0" }} />

      <Box className={styles.companyOverview__section}>
        <Typography variant="h6">Топ компании</Typography>
        <Grid container spacing={2}>
          {topCompanies.map((tc) => (
            <Grid item xs={12} key={tc.id}>
              <Link href={`/companies/${tc.id}`}>
                <Box className={styles.companyOverview__topCompany}>
                  <img
                    src={tc.logoUrl}
                    alt={tc.name}
                    style={{
                      width: 40,
                      height: 40,
                      marginRight: 8,
                      objectFit: "contain",
                    }}
                  />
                  <Box>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 600, color: "#a20000" }}
                    >
                      {tc.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#666" }}>
                      Compensation &amp; Benefits
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#a20000", fontWeight: 500 }}
                    >
                      {tc.rating}★
                    </Typography>
                  </Box>
                </Box>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
