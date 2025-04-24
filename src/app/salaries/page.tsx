// src/app/salaries/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Container, Typography, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import {
  fetchSalaryStatistics,
  selectSalaryStatistics,
  selectSalaryStatisticsLoading,
  selectSalaryStatisticsError,
} from "@/features/salaryStatistics/salaryStatisticsSlice";
import SalaryOverview from "./components/SalaryOverview";
import SalaryBreakdown from "./components/SalaryBreakdown";
import CareerTrajectory from "./components/CareerTrajectory";
import TopCompanies from "./components/TopCompanies";
import SalaryList from "./components/SalaryList";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import searchAPI from "@/services/searchAPI";
import styles from "./Salaries.module.scss";

interface SalaryData {
  minSalary: number;
  maxSalary: number;
  medianSalary: number;
  totalEstimate: number;
  baseEstimate: number;
  additionalEstimate: number;
  basePay: {
    min: number;
    max: number;
  };
  additionalPay: {
    min: number;
    max: number;
  };
}

export default function SalariesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();

  const jobId = searchParams.get("jobId");
  const locationId = searchParams.get("locationId");

  const salaryStats = useSelector(
    jobId && locationId ? selectSalaryStatistics(jobId, locationId) : () => null
  );
  const isLoading = useSelector(selectSalaryStatisticsLoading);
  const error = useSelector(selectSalaryStatisticsError);

  // Search functionality
  const [jobSearch, setJobSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");

  const [jobResults, setJobResults] = useState([]);
  const [locationResults, setLocationResults] = useState([]);

  const [jobLoading, setJobLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);

  const [showJobResults, setShowJobResults] = useState(false);
  const [showLocationResults, setShowLocationResults] = useState(false);

  const [selectedJob, setSelectedJob] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{
    id: string;
    locationValue: string;
  } | null>(null);

  // If no jobId or locationId, redirect to home
  useEffect(() => {
    if (!jobId || !locationId) {
      router.push("/?tab=1");
    } else {
      dispatch(fetchSalaryStatistics({ jobId, locationId }));
    }
  }, [jobId, locationId, router, dispatch]);

  // Job search
  useEffect(() => {
    const searchJobs = async () => {
      if (jobSearch.trim().length < 2) {
        setJobResults([]);
        setShowJobResults(false);
        return;
      }

      setJobLoading(true);
      try {
        const response = await searchAPI.searchJobs(jobSearch);
        setJobResults(response.data || []);
        setShowJobResults(true);
      } catch (error) {
        console.error("Error searching jobs:", error);
        setJobResults([]);
      } finally {
        setJobLoading(false);
      }
    };

    const timeoutId = setTimeout(searchJobs, 300);
    return () => clearTimeout(timeoutId);
  }, [jobSearch]);

  // Location search
  useEffect(() => {
    const searchLocations = async () => {
      if (locationSearch.trim().length < 2) {
        setLocationResults([]);
        setShowLocationResults(false);
        return;
      }

      setLocationLoading(true);
      try {
        const response = await searchAPI.searchLocations(locationSearch);
        setLocationResults(response.data || []);
        setShowLocationResults(true);
      } catch (error) {
        console.error("Error searching locations:", error);
        setLocationResults([]);
      } finally {
        setLocationLoading(false);
      }
    };

    const timeoutId = setTimeout(searchLocations, 300);
    return () => clearTimeout(timeoutId);
  }, [locationSearch]);

  const handleJobSelect = (job) => {
    setSelectedJob(job);
    setJobSearch(job.title);
    setShowJobResults(false);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setLocationSearch(location.locationValue);
    setShowLocationResults(false);
  };

  const handleSearch = () => {
    if (selectedJob && selectedLocation) {
      router.push(
        `/salaries?jobId=${selectedJob.id}&locationId=${selectedLocation.id}`
      );
    }
  };

  // If loading or no data yet, show loading state
  if (isLoading || (!salaryStats && !error)) {
    return (
      <Container maxWidth="lg" className={styles.salariesContainer}>
        <Box className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-12 w-12 animate-spin text-[#800000] mb-4" />
          <Typography variant="h5">Загрузка данных о зарплатах...</Typography>
        </Box>
      </Container>
    );
  }

  // If error, show error message
  if (error) {
    return (
      <Container maxWidth="lg" className={styles.salariesContainer}>
        <Box className="py-8 text-center">
          <Typography variant="h5" color="error" className="mb-4">
            Произошла ошибка при загрузке данных
          </Typography>
          <Typography variant="body1">
            Пожалуйста, попробуйте еще раз или выполните новый поиск
          </Typography>

          <Box className="mt-8 max-w-xl mx-auto">
            <Box className="flex flex-col md:flex-row gap-3 mb-6">
              <div className="w-full relative">
                <Input
                  value={jobSearch}
                  onChange={(e) => setJobSearch(e.target.value)}
                  placeholder="Должность"
                  className="pl-10"
                />
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />

                {jobLoading && (
                  <div className="absolute top-1/2 right-3 transform -translate-y-1/2">
                    <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
                  </div>
                )}

                {showJobResults && jobResults.length > 0 && (
                  <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50 mt-1 max-h-60 overflow-y-auto">
                    {jobResults.map((job) => (
                      <div
                        key={job.id}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleJobSelect(job)}
                      >
                        {job.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="w-full relative">
                <Input
                  value={locationSearch}
                  onChange={(e) => setLocationSearch(e.target.value)}
                  placeholder="Местоположение"
                  className="pl-10"
                />
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />

                {locationLoading && (
                  <div className="absolute top-1/2 right-3 transform -translate-y-1/2">
                    <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
                  </div>
                )}

                {showLocationResults && locationResults.length > 0 && (
                  <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50 mt-1 max-h-60 overflow-y-auto">
                    {locationResults.map((location) => (
                      <div
                        key={location.id}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleLocationSelect(location)}
                      >
                        {location.locationValue}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Button
                onClick={handleSearch}
                className="h-10 md:w-auto bg-[#800000] hover:bg-[#660000]"
                disabled={!selectedJob || !selectedLocation}
              >
                <Search className="h-4 w-4" />
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    );
  }

  // Create data structures for components based on API response
  const salaryData: SalaryData = {
    minSalary: salaryStats.minSalary,
    maxSalary: salaryStats.maxSalary,
    medianSalary: salaryStats.medianSalary,
    totalEstimate: salaryStats.averageSalary,
    baseEstimate: salaryStats.averageSalary * 0.7, // Approximate
    additionalEstimate: salaryStats.averageSalary * 0.3, // Approximate
    basePay: {
      min: salaryStats.minSalary * 0.7,
      max: salaryStats.maxSalary * 0.7,
    },
    additionalPay: {
      min: salaryStats.minSalary * 0.3,
      max: salaryStats.maxSalary * 0.3,
    },
  };

  // Extract experience levels and create trajectory data
  const experienceLevels = Object.keys(
    salaryStats.salaryByExperienceLevel || {}
  );
  const trajectoryData = experienceLevels.map((level, index) => {
    const salary = salaryStats.salaryByExperienceLevel[level];
    const isCurrentLevel = index === Math.floor(experienceLevels.length / 2);

    return {
      role: level,
      salaryRange: `${formatCurrency(salary * 0.9)} - ${formatCurrency(
        salary * 1.1
      )}/год`,
      current: isCurrentLevel,
    };
  });

  // Format top companies data based on the employment type distribution
  const topCompaniesData = Object.entries(
    salaryStats.employmentTypeDistribution || {}
  )
    .slice(0, 4)
    .map(([companyType, count], index) => ({
      name: companyType,
      logo: `https://cdn-icons-png.flaticon.com/512/2721/${
        2721287 + index
      }.png`,
      rating: 4 + Math.random() * 0.5,
      salaryRange: `${formatCurrency(salaryStats.minSalary)} - ${formatCurrency(
        salaryStats.maxSalary
      )}/год`,
      openJobs: Math.round(Number(count)),
    }));

  // Format related jobs data based on experience level distribution
  const salaryEntries = Object.entries(
    salaryStats.experienceLevelDistribution || {}
  ).map(([level, count], index) => ({
    id: index + 1,
    company: `${level} ${salaryStats.jobTitle}`,
    logo: `https://cdn-icons-png.flaticon.com/512/5954/${5954315 + index}.png`,
    salary: formatCurrency(
      salaryStats.salaryByExperienceLevel[level] || salaryStats.medianSalary
    ),
    verified: Math.random() > 0.3,
  }));

  function formatCurrency(amount: number) {
    const formatter = new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: salaryStats.currency || "KZT",
      maximumFractionDigits: 0,
      notation: "compact",
      compactDisplay: "short",
    });
    return formatter.format(amount);
  }

  return (
    <Container maxWidth="lg" className={styles.salariesContainer}>
      <Box className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <Typography variant="h4" className={styles.pageTitle}>
          Зарплаты {salaryStats.jobTitle}
        </Typography>

        <Box className="flex flex-col md:flex-row gap-3 w-full md:w-auto mt-4 md:mt-0">
          <div className="w-full md:w-64 relative">
            <Input
              value={jobSearch}
              onChange={(e) => setJobSearch(e.target.value)}
              placeholder="Должность"
              className="pl-10"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />

            {jobLoading && (
              <div className="absolute top-1/2 right-3 transform -translate-y-1/2">
                <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
              </div>
            )}

            {showJobResults && jobResults.length > 0 && (
              <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50 mt-1 max-h-60 overflow-y-auto">
                {jobResults.map((job) => (
                  <div
                    key={job.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleJobSelect(job)}
                  >
                    {job.title}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="w-full md:w-64 relative">
            <Input
              value={locationSearch}
              onChange={(e) => setLocationSearch(e.target.value)}
              placeholder="Местоположение"
              className="pl-10"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />

            {locationLoading && (
              <div className="absolute top-1/2 right-3 transform -translate-y-1/2">
                <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
              </div>
            )}

            {showLocationResults && locationResults.length > 0 && (
              <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50 mt-1 max-h-60 overflow-y-auto">
                {locationResults.map((location) => (
                  <div
                    key={location.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleLocationSelect(location)}
                  >
                    {location.locationValue}
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button
            onClick={handleSearch}
            className="h-10 w-full md:w-auto bg-[#800000] hover:bg-[#660000]"
            disabled={!selectedJob || !selectedLocation}
          >
            <Search className="h-4 w-4" />
          </Button>
        </Box>
      </Box>

      <SalaryOverview data={salaryData} position={salaryStats.jobTitle} />

      <SalaryBreakdown data={salaryData} />

      {trajectoryData.length > 0 && <CareerTrajectory data={trajectoryData} />}

      {topCompaniesData.length > 0 && <TopCompanies data={topCompaniesData} />}

      <Box className={styles.relatedSection}>
        <Typography variant="h5" className={styles.sectionTitle}>
          Зарплаты для смежных должностей
        </Typography>
        <SalaryList data={salaryEntries} />
      </Box>
    </Container>
  );
}
