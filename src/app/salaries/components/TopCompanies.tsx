import React from "react";
import { Box, Typography } from "@mui/material";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import styles from "./TopCompanies.module.scss";

interface CompanyData {
  name: string;
  logo: string;
  rating: number;
  salaryRange: string;
  openJobs: number;
}

interface TopCompaniesProps {
  data: CompanyData[];
}

export default function TopCompanies({ data }: TopCompaniesProps) {
  return (
    <Box className={styles.topCompaniesContainer}>
      <Typography variant="h5" className={styles.sectionTitle}>
        Top paying companies for a Software Engineer in United States
      </Typography>

      <Typography variant="body2" className={styles.sectionSubtitle}>
        Below is the total pay for the top 10 highest paying companies for a
        Software Engineer in United States. Employers include Airbnb, LaunchPad
        Lab and Nuro.
      </Typography>

      <Box className={styles.companiesGrid}>
        {data.map((company, index) => (
          <Card key={index} className={styles.companyCard}>
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
                  Software Engineer
                </Typography>

                <Typography variant="body2" className={styles.location}>
                  United States
                </Typography>

                {company.openJobs > 0 && (
                  <Typography variant="body2" className={styles.openJobs}>
                    {company.openJobs} open jobs
                  </Typography>
                )}

                {company.openJobs === 0 && (
                  <Button variant="outline" className={styles.createAlertBtn}>
                    Create Job Alert
                  </Button>
                )}
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
