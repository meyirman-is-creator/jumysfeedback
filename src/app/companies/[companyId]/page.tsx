"use client";
import React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Typography, Box, Button, Grid, Divider } from "@mui/material";
import { Card, CardContent } from "@/components/ui/card";
import { mockCompanies } from "@/features/company/mockData";
import styles from "./CompanyOverviewPage.module.scss";

// Функция: ищем компании по массиву id
function getCompaniesByIds(ids: string[]) {
  return mockCompanies.filter((c) => ids.includes(c.id));
}

export default function CompanyOverviewPage() {
  const params = useParams();
  const router = useRouter();
  const companyId =
    typeof params.companyId === "string" ? params.companyId : "";
  const company = mockCompanies.find((item) => item.id === companyId);

  if (!company) {
    return (
      <Box className={styles.companyOverview}>
        <Typography variant="h4">Компания не найдена</Typography>
      </Box>
    );
  }

  const singleReview = company.reviews[0];
  const singleSalary = company.salaries[0];

  const handleSeeAllReviews = () =>
    router.push(`/companies/${companyId}/reviews`);
  const handleSeeAllSalaries = () =>
    router.push(`/companies/${companyId}/salaries`);

  // Предположим, company.recommended и company.topCompanies — это массив
  // вида [{ id: "...", name: "...", ... }] или просто массив id-строк.
  // Если у вас в mockData хранятся id-объекты, то нужно чуть иначе.
  // Если там уже полные объекты, можно напрямую использовать company.recommended.
  // Но здесь показываю логику, если это массив ID:
  const recommendedIds = company.recommended.map((r) => r.id); // извлекаем id
  const topIds = company.topCompanies.map((t) => t.id); // извлекаем id

  const recommendedCompanies = getCompaniesByIds(recommendedIds);
  const topCompanies = getCompaniesByIds(topIds);

  return (
    <Box className={styles.companyOverview}>
      <Card className={styles.overviewCard}>
        <CardContent>
          <Typography variant="h6" className={styles.sectionHeading}>
            Основная информация
          </Typography>
          <Grid container spacing={2} className={styles.infoGrid}>
            <Grid item xs={12} sm={6} md={3}>
              <Box className={styles.infoItem}>
                <Typography variant="body2" className={styles.infoLabel}>
                  Основана
                </Typography>
                <Typography variant="body1" className={styles.infoValue}>
                  {company.overallInfo.founded}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box className={styles.infoItem}>
                <Typography variant="body2" className={styles.infoLabel}>
                  Выручка
                </Typography>
                <Typography variant="body1" className={styles.infoValue}>
                  {company.overallInfo.revenue}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box className={styles.infoItem}>
                <Typography variant="body2" className={styles.infoLabel}>
                  Индустрия
                </Typography>
                <Typography variant="body1" className={styles.infoValue}>
                  {company.industries.join(", ")}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box className={styles.infoItem}>
                <Typography variant="body2" className={styles.infoLabel}>
                  Размер
                </Typography>
                <Typography variant="body1" className={styles.infoValue}>
                  {company.size}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Box className={styles.missionSection}>
            <Typography variant="body2" className={styles.infoLabel}>
              Миссия компании
            </Typography>
            <Typography variant="body1" className={styles.missionText}>
              {company.overallInfo.mission}
            </Typography>
          </Box>

          <Box className={styles.competitorsSection}>
            <Typography variant="body2" className={styles.infoLabel}>
              Конкуренты
            </Typography>
            <Box className={styles.competitorsList}>
              {company.overallInfo.competitors.map((competitor, index) => (
                <span key={index} className={styles.competitorItem}>
                  {competitor}
                </span>
              ))}
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Grid container spacing={3} className={styles.contentGrid}>
        <Grid item xs={12} md={7}>
          <Card className={styles.reviewCard}>
            <CardContent>
              <Typography variant="h6" className={styles.sectionHeading}>
                Отзывы сотрудников
              </Typography>
              {singleReview ? (
                <Box className={styles.reviewItem}>
                  <Box className={styles.reviewHeader}>
                    <Typography
                      variant="subtitle1"
                      className={styles.reviewTitle}
                    >
                      {singleReview.title}
                    </Typography>
                    <Box className={styles.reviewRating}>
                      <span className={styles.ratingValue}>
                        {singleReview.rating}
                      </span>
                      <span className={styles.ratingStars}>
                        {"★".repeat(Math.floor(singleReview.rating))}
                      </span>
                    </Box>
                  </Box>
                  <Typography variant="body2" className={styles.reviewAuthor}>
                    Автор: {singleReview.author}
                  </Typography>
                  <Typography variant="body1" className={styles.reviewBody}>
                    {singleReview.body}
                  </Typography>
                  <Button
                    className={styles.viewAllButton}
                    onClick={handleSeeAllReviews}
                  >
                    Смотреть все отзывы ({company.reviews.length})
                  </Button>
                </Box>
              ) : (
                <Typography variant="body1">
                  У этой компании пока нет отзывов
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={5}>
          <Card className={styles.salaryCard}>
            <CardContent>
              <Typography variant="h6" className={styles.sectionHeading}>
                Зарплаты
              </Typography>
              {singleSalary ? (
                <Box className={styles.salaryItem}>
                  <Typography
                    variant="subtitle1"
                    className={styles.salaryPosition}
                  >
                    {singleSalary.position}
                  </Typography>
                  <Typography variant="h5" className={styles.salaryAmount}>
                    {singleSalary.amount}
                  </Typography>
                  <Typography variant="body2" className={styles.salaryRange}>
                    Диапазон: {singleSalary.min}-{singleSalary.max}{" "}
                    {singleSalary.currency}
                  </Typography>
                  <Typography variant="body2" className={styles.salaryLevel}>
                    Уровень: {singleSalary.experienceLevel}
                  </Typography>
                  <Button
                    className={styles.viewAllButton}
                    onClick={handleSeeAllSalaries}
                  >
                    Смотреть все зарплаты ({company.salaries.length})
                  </Button>
                </Box>
              ) : (
                <Typography variant="body1">
                  У этой компании пока нет данных о зарплатах
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card className={styles.recommendedCard}>
        <CardContent>
          <Typography variant="h6" className={styles.sectionHeading}>
            Рекомендуемые компании
          </Typography>
          <Grid container spacing={2}>
            {recommendedCompanies.map((rec) => (
              <Grid item xs={12} sm={6} md={4} key={rec.id}>
                <Link
                  href={`/companies/${rec.id}`}
                  className={styles.companyLink}
                >
                  <Box className={styles.recommendedCompany}>
                    <img
                      src={rec.logoUrl}
                      alt={rec.name}
                      className={styles.companyLogo}
                    />
                    <Box className={styles.companyInfo}>
                      <Typography
                        variant="subtitle1"
                        className={styles.companyName}
                      >
                        {rec.name}
                      </Typography>
                      <Box className={styles.companyRating}>
                        <span className={styles.ratingValue}>{rec.rating}</span>
                        <span className={styles.ratingStars}>
                          {"★".repeat(Math.floor(rec.rating))}
                        </span>
                      </Box>
                      <Typography
                        variant="body2"
                        className={styles.compareLink}
                      >
                        Сравнить →
                      </Typography>
                    </Box>
                  </Box>
                </Link>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      <Card className={styles.topCompaniesCard}>
        <CardContent>
          <Typography variant="h6" className={styles.sectionHeading}>
            Топ компании в отрасли
          </Typography>
          <Grid container spacing={2}>
            {topCompanies.map((tc) => (
              <Grid item xs={12} sm={6} key={tc.id}>
                <Link
                  href={`/companies/${tc.id}`}
                  className={styles.companyLink}
                >
                  <Box className={styles.topCompany}>
                    <img
                      src={tc.logoUrl || "/placeholder.svg"}
                      alt={tc.name}
                      className={styles.companyLogo}
                    />
                    <Box className={styles.companyInfo}>
                      <Typography
                        variant="subtitle1"
                        className={styles.companyName}
                      >
                        {tc.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        className={styles.companyFeature}
                      >
                        Компенсации и льготы
                      </Typography>
                      <Box className={styles.companyRating}>
                        <span className={styles.ratingValue}>{tc.rating}</span>
                        <span className={styles.ratingStars}>
                          {"★".repeat(Math.floor(tc.rating))}
                        </span>
                      </Box>
                    </Box>
                  </Box>
                </Link>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
