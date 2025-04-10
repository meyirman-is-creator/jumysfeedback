"use client";

import React, { useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import SalaryOverview from "./components/SalaryOverview";
import SalaryBreakdown from "./components/SalaryBreakdown";
import CareerTrajectory from "./components/CareerTrajectory";
import TopCompanies from "./components/TopCompanies";
import SalaryList from "./components/SalaryList";
import styles from "./Salaries.module.scss";

export default function SalariesPage() {
  const [position, setPosition] = useState("Software Engineer");
  const [location, setLocation] = useState("United States");

  // Mock data (similar to the screenshots)
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
      role: "Software Engineer",
      salaryRange: "$130K–$209K/yr",
      current: true,
    },
    {
      role: "Senior Software Engineer",
      salaryRange: "$178K–$260K/yr",
      current: false,
    },
    {
      role: "Software Engineer IV",
      salaryRange: "$183K–$267K/yr",
      current: false,
    },
  ];

  const topCompaniesData = [
    {
      name: "Airbnb",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png",
      rating: 4.3,
      salaryRange: "$254K - $381K/yr",
      openJobs: 52,
    },
    {
      name: "LaunchPad Lab",
      logo: "https://assets-global.website-files.com/5c7d1e5cc56c27e0cbecaabc/65c4dcae04b409fc4af78d44_LaunchPad-Lab-logo.svg",
      rating: 4.8,
      salaryRange: "$235K - $354K/yr",
      openJobs: 0,
    },
    {
      name: "Nuro",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/03/Nuro_logo.svg",
      rating: 3.9,
      salaryRange: "$229K - $352K/yr",
      openJobs: 19,
    },
    {
      name: "Dropbox",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Dropbox_logo_2017.svg/2560px-Dropbox_logo_2017.svg.png",
      rating: 4.2,
      salaryRange: "$235K - $350K/yr",
      openJobs: 98,
    },
  ];

  // Entries from the screenshots
  const salaryEntries = [
    {
      id: 1,
      company: "Entry Level Software Engineer",
      logo: "https://cdn-icons-png.flaticon.com/512/6295/6295417.png",
      salary: "$110K",
      verified: true,
    },
    {
      id: 2,
      company: "Principal Software Engineer",
      logo: "https://cdn-icons-png.flaticon.com/512/5954/5954315.png",
      salary: "$199K",
      verified: true,
    },
    {
      id: 3,
      company: "Software Development Engineer",
      logo: "https://cdn-icons-png.flaticon.com/512/2721/2721287.png",
      salary: "$136K",
      verified: false,
    },
    {
      id: 4,
      company: "Software Development Engineer In Test (SDET)",
      logo: "https://cdn-icons-png.flaticon.com/512/1061/1061007.png",
      salary: "$133K",
      verified: true,
    },
  ];

  return (
    <Container maxWidth="lg" className={styles.salariesContainer}>
      <Typography variant="h4" className={styles.pageTitle}>
        Software Engineer Salaries
      </Typography>

      <SalaryOverview data={salaryData} position={position} />

      <SalaryBreakdown data={salaryData} />

      <CareerTrajectory data={trajectoryData} />

      <TopCompanies data={topCompaniesData} />

      <Box className={styles.relatedSection}>
        <Typography variant="h5" className={styles.sectionTitle}>
          Salaries for related job titles
        </Typography>
        <SalaryList data={salaryEntries} />
      </Box>
    </Container>
  );
}
