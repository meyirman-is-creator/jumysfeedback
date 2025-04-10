// src/app/salaries/page.tsx
"use client";

import React, { useState, useMemo } from "react";
import { Container, Typography, Box } from "@mui/material";
import SalaryOverview from "./components/SalaryOverview";
import SalaryBreakdown from "./components/SalaryBreakdown";
import CareerTrajectory from "./components/CareerTrajectory";
import TopCompanies from "./components/TopCompanies";
import SalaryList from "./components/SalaryList";
import styles from "./Salaries.module.scss";
import { mockCompanies } from "@/features/company/mockData";

export default function SalariesPage() {
  const [position, setPosition] = useState("Программист");
  const [location, setLocation] = useState("Казахстан");

  // Фильтруем компании, чтобы получить только те, что в Казахстане
  const kazakhCompanies = useMemo(() => {
    return mockCompanies
      .filter((company) => company.location.toLowerCase().includes("казахстан"))
      .slice(0, 4); // Берем первые 4 компании для примера
  }, []);

  // Заполняем данными для визуализации
  const salaryData = {
    minSalary: 130000,
    maxSalary: 209000,
    medianSalary: 164000,
    basePay: {
      min: 97000,
      max: 147000,
    },
    additionalPay: {
      min: 33000,
      max: 62000,
    },
    totalEstimate: 163763,
    baseEstimate: 119238,
    additionalEstimate: 44525,
  };

  const trajectoryData = [
    {
      role: "Программист",
      salaryRange: "₸130K–₸209K/год",
      current: true,
    },
    {
      role: "Старший программист",
      salaryRange: "₸178K–₸260K/год",
      current: false,
    },
    {
      role: "Ведущий программист",
      salaryRange: "₸183K–₸267K/год",
      current: false,
    },
  ];

  // Создаем данные о топовых компаниях, используя доступные данные
  const topCompaniesData = kazakhCompanies.map((company) => ({
    name: company.name,
    logo: company.logoUrl,
    rating: company.rating,
    salaryRange: `₸${Math.round(Math.random() * 100 + 150)}K - ₸${Math.round(
      Math.random() * 100 + 250
    )}K/год`,
    openJobs: Math.round(Math.random() * 100),
  }));

  // Записи из примеров для визуализации
  const salaryEntries = [
    {
      id: 1,
      company: "Начинающий программист",
      logo: "https://cdn-icons-png.flaticon.com/512/6295/6295417.png",
      salary: "₸110K",
      verified: true,
    },
    {
      id: 2,
      company: "Главный программист",
      logo: "https://cdn-icons-png.flaticon.com/512/5954/5954315.png",
      salary: "₸199K",
      verified: true,
    },
    {
      id: 3,
      company: "Разработчик ПО",
      logo: "https://cdn-icons-png.flaticon.com/512/2721/2721287.png",
      salary: "₸136K",
      verified: false,
    },
    {
      id: 4,
      company: "Инженер по тестированию ПО (SDET)",
      logo: "https://cdn-icons-png.flaticon.com/512/1061/1061007.png",
      salary: "₸133K",
      verified: true,
    },
  ];

  return (
    <Container maxWidth="lg" className={styles.salariesContainer}>
      <Typography variant="h4" className={styles.pageTitle}>
        Зарплаты программистов
      </Typography>

      <SalaryOverview data={salaryData} position={position} />

      <SalaryBreakdown data={salaryData} />

      <CareerTrajectory data={trajectoryData} />

      <TopCompanies data={topCompaniesData} />

      <Box className={styles.relatedSection}>
        <Typography variant="h5" className={styles.sectionTitle}>
          Зарплаты для смежных должностей
        </Typography>
        <SalaryList data={salaryEntries} />
      </Box>
    </Container>
  );
}
