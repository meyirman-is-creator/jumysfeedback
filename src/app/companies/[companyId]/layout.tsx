"use client";
import React from "react";
import Link from "next/link";
import {
  useParams,
  useSelectedLayoutSegments,
  useRouter,
} from "next/navigation";
import { Container, Typography, Box, Button } from "@mui/material";
import { mockCompanies } from "@/features/company/mockData";
import styles from "./layout.module.scss";

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const params = useParams();
  const segments = useSelectedLayoutSegments();
  const companyId =
    typeof params.companyId === "string" ? params.companyId : "";
  const company = mockCompanies.find((c) => c.id === companyId);

  if (!company) {
    return (
      <Container maxWidth="md" className={styles.notFound}>
        <Typography variant="h4">Компания не найдена</Typography>
      </Container>
    );
  }

  const handleAddReview = () => {
    router.push("/create/review");
  };

  const tabs = [
    { label: "Overview", path: "" },
    { label: "Reviews", path: "reviews" },
    { label: "Salaries", path: "salaries" },
    { label: "Interviews", path: "interviews" },
    { label: "Benefits", path: "benefits" },
  ];

  const isActiveTab = (tabPath: string) => {
    return (!tabPath && !segments[0]) || segments[0] === tabPath;
  };

  return (
    <Container maxWidth="md" className={styles.companyLayout}>
      {company.bannerImg && (
        <Box className={styles.companyLayout__banner}>
          <img src={company.bannerImg} alt={`${company.name} banner`} />
        </Box>
      )}

      <Box className={styles.companyLayout__header}>
        <Box className={styles.companyLayout__logo}>
          <img src={company.logoUrl} alt={company.name} />
        </Box>
        <Box className={styles.companyLayout__info}>
          <Typography variant="h4" className={styles.companyLayout__title}>
            {company.name}
          </Typography>
          <Typography
            variant="subtitle1"
            className={styles.companyLayout__rating}
          >
            Рейтинг: {company.rating}
          </Typography>
          <Typography
            variant="subtitle2"
            className={styles.companyLayout__location}
          >
            {company.location}
          </Typography>
        </Box>
        <Box className={styles.companyLayout__actions}>
          <Button
            variant="contained"
            className={styles.companyLayout__addReviewBtn}
            onClick={handleAddReview}
          >
            Добавить отзыв
          </Button>
        </Box>
      </Box>

      <Box className={styles.companyLayout__tabsNav}>
        {tabs.map((tab) => {
          const activeClass = isActiveTab(tab.path) ? styles.activeTab : "";
          return (
            <Link
              key={tab.label}
              href={`/companies/${companyId}/${tab.path}`}
              className={`${styles.companyLayout__tabBtn} ${activeClass}`}
            >
              {tab.label}
            </Link>
          );
        })}
      </Box>

      <Box>{children}</Box>
    </Container>
  );
}
