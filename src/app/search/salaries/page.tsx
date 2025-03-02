"use client";

import { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  Pagination,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "next/link";
import styles from "./Salaries.module.scss";
import { mockCompanies } from "@/features/company/mockData";
import { ISalary } from "@/types";

const EXPERIENCE_OPTIONS = [
  "All years of experience",
  "0-1 year",
  "1-3 years",
  "4-6 years",
  "7-9 years",
  "10-14 years",
  "15+ years",
];

const INDUSTRIES = [
  "All industries",
  "Технологии",
  "Облачные решения",
  "Интернет",
  "Реклама",
  "Аудит",
  "Консалтинг",
  "Геймдев",
];

const TOP_INDUSTRIES = [
  { name: "Financial Services", salary: 111262 },
  { name: "Information Technology", salary: 101585 },
  { name: "Real Estate", salary: 100756 },
  { name: "Telecommunications", salary: 97437 },
  { name: "Energy, Mining & Utilities", salary: 96592 },
];

const INDUSTRY_COMPANIES_MAP: Record<
  string,
  { name: string; range: string }[]
> = {
  "Financial Services": [
    { name: "Kaspi.kz", range: "$600-1200" },
    { name: "Ally Bank", range: "$700-1400" },
    { name: "Goldman Sachs", range: "$1500-2500" },
  ],
  "Information Technology": [
    { name: "BI Group", range: "$500-2000" },
    { name: "Amazon AWS", range: "$2000-3500" },
    { name: "Cisco", range: "$1800-3200" },
  ],
  "Real Estate": [
    { name: "Zillow", range: "$800-1800" },
    { name: "Cushman & Wakefield", range: "$1200-2400" },
  ],
  Telecommunications: [
    { name: "Kaspi.kz", range: "$600-1200" },
    { name: "BI Group", range: "$500-2000" },
    { name: "TCO", range: "$2000-3000" },
  ],
  "Energy, Mining & Utilities": [
    { name: "ExxonMobil", range: "$1400-2600" },
    { name: "Shell", range: "$1600-3000" },
  ],
};

export default function SalariesPage() {
  const [experience, setExperience] = useState(EXPERIENCE_OPTIONS[0]);
  const [industry, setIndustry] = useState(INDUSTRIES[0]);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const allSalaries: ISalary[] = useMemo(() => {
    let arr: ISalary[] = [];
    mockCompanies.forEach((company) => {
      arr = arr.concat(company.salaries);
    });
    return arr;
  }, []);

  const findCompanyIdBySalary = (sal: ISalary): string | undefined => {
    const found = mockCompanies.find((c) =>
      c.salaries.some((s) => s.id === sal.id)
    );
    return found?.id;
  };

  const filteredSalaries = useMemo(() => {
    return allSalaries.filter((sal) => {
      let passExp = true;
      let passInd = true;
      if (experience !== "All years of experience") {
        if (experience === "0-1 year") {
          passExp =
            sal.experienceLevel.toLowerCase().includes("intern") ||
            sal.experienceLevel.toLowerCase().includes("entry");
        } else if (experience === "1-3 years") {
          passExp =
            sal.experienceLevel.toLowerCase().includes("mid") ||
            sal.experienceLevel.toLowerCase().includes("entry-mid");
        }
      }
      if (industry !== "All industries") {
        passInd = true;
      }
      return passExp && passInd;
    });
  }, [allSalaries, experience, industry]);

  const globalMin = useMemo(() => {
    if (!filteredSalaries.length) return 0;
    return Math.min(...filteredSalaries.map((s) => s.min));
  }, [filteredSalaries]);

  const globalMax = useMemo(() => {
    if (!filteredSalaries.length) return 0;
    return Math.max(...filteredSalaries.map((s) => s.max));
  }, [filteredSalaries]);

  const totalPages = Math.ceil(filteredSalaries.length / itemsPerPage);
  const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSalaries = filteredSalaries.slice(startIndex, endIndex);

  const handleSelectIndustry = (industryName: string) => {
    setSelectedIndustry(industryName);
  };

  const companiesForSelectedIndustry =
    selectedIndustry && INDUSTRY_COMPANIES_MAP[selectedIndustry]
      ? INDUSTRY_COMPANIES_MAP[selectedIndustry]
      : null;

  return (
    <Box className={styles.container}>
      <Typography
        variant="h5"
        mb={2}
        sx={{ borderBottom: "1px solid #ddd", pb: 1 }}
      >
        How much does a <strong>Data Analyst</strong> make?
      </Typography>
      <Box className={styles.filtersRow}>
        <FormControl size="small" sx={{ width: 200 }}>
          <InputLabel>Experience</InputLabel>
          <Select
            label="Experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value as string)}
          >
            {EXPERIENCE_OPTIONS.map((exp) => (
              <MenuItem key={exp} value={exp}>
                {exp}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ width: 200 }}>
          <InputLabel>Industries</InputLabel>
          <Select
            label="Industries"
            value={industry}
            onChange={(e) => setIndustry(e.target.value as string)}
          >
            {INDUSTRIES.map((ind) => (
              <MenuItem key={ind} value={ind}>
                {ind}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Typography variant="h4" mt={3} mb={1}>
        {filteredSalaries.length > 0 ? (
          <>
            ${globalMin}K - ${globalMax}K <small>/yr</small>
          </>
        ) : (
          "No data"
        )}
      </Typography>
      <Typography variant="body2" mb={2} sx={{ fontWeight: 500 }}>
        Median total pay
      </Typography>
      <Typography variant="body2" color="text.secondary">
        The estimated total pay for a Data Analyst is a demonstration here...
        Additional pay could include bonus, commission, tips, and profit
        sharing.
      </Typography>
      <Accordion sx={{ mt: 3, border: "1px solid #ddd", borderRadius: "8px" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ fontWeight: 600 }}>
            How was this calculated?
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: "#fafafa" }}>
          <Typography variant="body2" color="text.secondary">
            We took all the salaries from mock data, filtered them by your
            criteria, and computed min & max. Additional pay could include
            bonuses, tips, etc.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
        <Box sx={{ flex: 1, border: "1px solid #eee", borderRadius: 2, p: 2 }}>
          <Typography
            variant="h6"
            mb={1}
            sx={{ borderBottom: "1px solid #ddd", pb: 1 }}
          >
            Top paying industries
          </Typography>
          <Typography variant="body2" mb={2}>
            The top 5 paying industries for a Data Analyst in{" "}
            <strong>United States</strong> ...
          </Typography>
          {TOP_INDUSTRIES.map((item) => (
            <Box
              key={item.name}
              sx={{
                borderBottom: "1px solid #ddd",
                py: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                "&:hover": { backgroundColor: "#f9f9f9" },
              }}
              onClick={() => handleSelectIndustry(item.name)}
            >
              <Typography
                fontWeight="bold"
                color={selectedIndustry === item.name ? "#a20000" : "inherit"}
              >
                {item.name}
              </Typography>
              <Typography variant="body2">
                ${item.salary.toLocaleString()}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            flex: 2,
            border: "1px solid #eee",
            borderRadius: 2,
            p: 2,
            minWidth: "300px",
          }}
        >
          <Typography
            variant="h6"
            mb={1}
            sx={{ borderBottom: "1px solid #ddd", pb: 1 }}
          >
            {selectedIndustry
              ? `Salary range of companies in "${selectedIndustry}"`
              : "Select an industry"}
          </Typography>
          {selectedIndustry && companiesForSelectedIndustry ? (
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              {companiesForSelectedIndustry.map((co) => (
                <Card
                  key={co.name}
                  sx={{
                    width: 120,
                    height: 80,
                    border: "1px solid #ddd",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    "&:hover": { boxShadow: "0 4px 10px rgba(0,0,0,0.1)" },
                  }}
                >
                  <Typography fontWeight="bold" sx={{ color: "#a20000" }}>
                    {co.name}
                  </Typography>
                  <Typography variant="body2">{co.range}</Typography>
                </Card>
              ))}
            </Box>
          ) : (
            <Typography variant="body2" color="text.secondary">
              Please select an industry on the left to see details.
            </Typography>
          )}
        </Box>
      </Box>
      <Box mt={4}>
        <Typography
          variant="h6"
          mb={1}
          sx={{ borderBottom: "1px solid #ddd", pb: 1 }}
        >
          Detailed Salaries List ({filteredSalaries.length} results)
        </Typography>
        <Box className={styles.salaryList}>
          {currentSalaries.map((sal, index) => {
            const companyId = findCompanyIdBySalary(sal);
            return (
              <Link
                key={sal.id + index}
                href={
                  companyId
                    ? `/companies/${companyId}/salaries`
                    : "/companies/unknown/salaries"
                }
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Card className={styles.salaryCard}>
                  <CardContent sx={{ borderBottom: "1px solid #ddd" }}>
                    <Typography variant="subtitle1" sx={{ color: "#a20000" }}>
                      {sal.position}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      Amount: {sal.amount} ({sal.currency})
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Range: {sal.min}-{sal.max}, median {sal.median}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Additional pay: {sal.additionalPay}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Level: {sal.experienceLevel}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
          {currentSalaries.length === 0 && (
            <Typography variant="body2" color="text.secondary" mt={2}>
              No salaries match your filters.
            </Typography>
          )}
        </Box>
        <Box mt={3} display="flex" justifyContent="center">
          <Pagination
            page={page}
            count={totalPages}
            onChange={handleChangePage}
            color="primary"
          />
        </Box>
      </Box>
    </Box>
  );
}
