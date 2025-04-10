// src/app/salaries/components/TopCompanies.tsx
import React from "react";
import { Box, Typography } from "@mui/material";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import styles from "./TopCompanies.module.scss";

interface CompanyData {
  name: string;
  logo: string;
  rating: number;
  salaryRange: string;
  openJobs: number;
  id?: string; // Add id for linking to company details
}

interface TopCompaniesProps {
  data: CompanyData[];
}

export default function TopCompanies({ data }: TopCompaniesProps) {
  return (
    <Box className={styles.topCompaniesContainer}>
      <Typography variant="h5" className={styles.sectionTitle}>
        Лучшие компании по оплате для программистов в Казахстане
      </Typography>

      <Typography variant="body2" className={styles.sectionSubtitle}>
        Ниже приведены данные о зарплатах в топ компаниях для программистов в
        Казахстане. Работодатели включают ведущие технологические компании
        страны.
      </Typography>

      <Box className={styles.companiesGrid}>
        {data.map((company, index) => (
          <Link
            href={`/companies/${company.id || index}`}
            key={index}
            style={{ textDecoration: "none" }}
          >
            <Card className={styles.companyCard}>
              <CardContent className={styles.cardContent}>
                <Box className={styles.companyLogo}>
                  <img
                    src={company.logo || "/placeholder.png"}
                    alt={company.name}
                  />
                </Box>

                <Box className={styles.companyInfo}>
                  <Typography variant="h6" className={styles.companyName}>
                    {company.name}
                  </Typography>

                  <Box className={styles.ratingContainer}>
                    <Typography variant="body2" className={styles.rating}>
                      {company.rating}
                    </Typography>
                    <Box className={styles.stars}>
                      {"★".repeat(Math.floor(company.rating))}
                      {"☆".repeat(5 - Math.floor(company.rating))}
                    </Box>
                  </Box>

                  <Typography variant="body1" className={styles.salaryRange}>
                    {company.salaryRange}
                  </Typography>

                  <Typography variant="body2" className={styles.role}>
                    Программист
                  </Typography>

                  <Typography variant="body2" className={styles.location}>
                    Казахстан
                  </Typography>

                  {company.openJobs > 0 && (
                    <Typography variant="body2" className={styles.openJobs}>
                      {company.openJobs} открытых вакансий
                    </Typography>
                  )}

                  {company.openJobs === 0 && (
                    <Button variant="outline" className={styles.createAlertBtn}>
                      Создать оповещение
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Link>
        ))}
      </Box>
    </Box>
  );
}
