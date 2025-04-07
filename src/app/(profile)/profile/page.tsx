// src/app/profile/page.tsx
"use client";

import React from "react";
import {
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  Divider,
  Chip,
} from "@mui/material";
import { Edit, Share, ArrowRight } from "lucide-react";
import styles from "./ProfilePage.module.scss";

export default function ProfilePage() {
  const user = {
    name: "John Doe",
    jobTitle: "Software Engineer",
    location: "Алматы, Казахстан",
    email: "john.doe@example.com",
    phone: "+7 (777) 123-4567",
    joinDate: "Май 2022",
    company: "Kaspi.kz",
    reviewCount: 12,
    salaryCount: 5,
    interviewCount: 3,
  };

  return (
    <div className={styles.profilePage}>
      <Box className={styles.header}>
        <Typography variant="h4" className={styles.title}>
          Мой профиль
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Edit size={18} />}
          className={styles.editButton}
        >
          Редактировать
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper className={styles.infoCard}>
            <Typography variant="h6" className={styles.cardTitle}>
              Основная информация
            </Typography>
            <Divider className={styles.divider} />

            <Grid container spacing={2} className={styles.infoGrid}>
              <Grid item xs={4}>
                <Typography variant="body2" className={styles.infoLabel}>
                  ФИО
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body1" className={styles.infoValue}>
                  {user.name}
                </Typography>
              </Grid>

              <Grid item xs={4}>
                <Typography variant="body2" className={styles.infoLabel}>
                  Должность
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body1" className={styles.infoValue}>
                  {user.jobTitle}
                </Typography>
              </Grid>

              <Grid item xs={4}>
                <Typography variant="body2" className={styles.infoLabel}>
                  Компания
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body1" className={styles.infoValue}>
                  {user.company}
                </Typography>
              </Grid>

              <Grid item xs={4}>
                <Typography variant="body2" className={styles.infoLabel}>
                  Локация
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body1" className={styles.infoValue}>
                  {user.location}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper className={styles.infoCard}>
            <Typography variant="h6" className={styles.cardTitle}>
              Контактная информация
            </Typography>
            <Divider className={styles.divider} />

            <Grid container spacing={2} className={styles.infoGrid}>
              <Grid item xs={4}>
                <Typography variant="body2" className={styles.infoLabel}>
                  Email
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body1" className={styles.infoValue}>
                  {user.email}
                </Typography>
              </Grid>

              <Grid item xs={4}>
                <Typography variant="body2" className={styles.infoLabel}>
                  Телефон
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body1" className={styles.infoValue}>
                  {user.phone}
                </Typography>
              </Grid>

              <Grid item xs={4}>
                <Typography variant="body2" className={styles.infoLabel}>
                  С нами с
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body1" className={styles.infoValue}>
                  {user.joinDate}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper className={styles.statsCard}>
            <Typography variant="h6" className={styles.cardTitle}>
              Ваш вклад в сообщество
            </Typography>
            <Divider className={styles.divider} />

            <Grid container spacing={3} className={styles.statsGrid}>
              <Grid item xs={12} sm={4}>
                <Box className={styles.statItem}>
                  <Typography variant="h4" className={styles.statNumber}>
                    {user.reviewCount}
                  </Typography>
                  <Typography variant="body2" className={styles.statLabel}>
                    Отзывов о компаниях
                  </Typography>
                  <Button
                    endIcon={<ArrowRight size={16} />}
                    className={styles.viewButton}
                    href="/reviews"
                  >
                    Просмотреть
                  </Button>
                </Box>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Box className={styles.statItem}>
                  <Typography variant="h4" className={styles.statNumber}>
                    {user.salaryCount}
                  </Typography>
                  <Typography variant="body2" className={styles.statLabel}>
                    Записей о зарплатах
                  </Typography>
                  <Button
                    endIcon={<ArrowRight size={16} />}
                    className={styles.viewButton}
                    href="/salaries"
                  >
                    Просмотреть
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
