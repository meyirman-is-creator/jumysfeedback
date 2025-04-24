"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import {
  fetchSalaryStatistics,
  selectSalaryStatistics,
  selectSalaryStatisticsLoading,
  selectSalaryStatisticsError,
} from "@/features/salaryStatistics/salaryStatisticsSlice";
import SalaryBreakdown from "./components/SalaryBreakdown";
import CareerTrajectory from "./components/CareerTrajectory";
import SalaryList from "./components/SalaryList";
import { Search, Loader2 } from "lucide-react";
import searchAPI from "@/services/searchAPI";
import styles from "./Salaries.module.scss";
import { useToast } from "@/components/ui/use-toast";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
  const { toast } = useToast();

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
      toast({
        title: "Выберите должность и локацию",
        description:
          "Для просмотра информации о зарплатах необходимо выбрать должность и локацию",
        variant: "destructive",
      });
      router.push("/?tab=2");
    } else {
      dispatch(fetchSalaryStatistics({ jobId, locationId }));
    }
  }, [jobId, locationId, router, dispatch, toast]);

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
      <div className="w-full min-h-[50vh] flex items-center justify-center py-12">
        <div className="flex flex-col items-center">
          <Loader2 className="h-12 w-12 animate-spin text-[#800000] mb-4" />
          <p className="text-xl font-medium">Загрузка данных о зарплатах...</p>
        </div>
      </div>
    );
  }

  // If error, show error message
  if (error) {
    return (
      <Container className={styles.salariesContainer}>
        <div className="py-8 text-center">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">
            Произошла ошибка при загрузке данных
          </h2>
          <p className="mb-8">
            Пожалуйста, попробуйте еще раз или выполните новый поиск
          </p>

          <div className="max-w-xl mx-auto">
            <div className="flex flex-col md:flex-row gap-3 mb-6">
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
                className="h-10 w-full md:w-auto bg-[#800000] hover:bg-[#660000]"
                disabled={!selectedJob || !selectedLocation}
              >
                <Search className="h-4 w-4 mr-2" />
                Поиск
              </Button>
            </div>
          </div>
        </div>
      </Container>
    );
  }

  // Get data from salaryStats response data
  const actualData = salaryStats.data || salaryStats;

  // Create data structures for components based on API response
  const salaryData: SalaryData = {
    minSalary: actualData.minSalary,
    maxSalary: actualData.maxSalary,
    medianSalary: actualData.medianSalary,
    totalEstimate: actualData.averageSalary,
    baseEstimate: actualData.averageSalary * 0.7, // Approximate
    additionalEstimate: actualData.averageSalary * 0.3, // Approximate
    basePay: {
      min: actualData.minSalary * 0.7,
      max: actualData.maxSalary * 0.7,
    },
    additionalPay: {
      min: actualData.minSalary * 0.3,
      max: actualData.maxSalary * 0.3,
    },
  };

  // Extract experience levels and create trajectory data
  const experienceLevels = Object.keys(
    actualData.salaryByExperienceLevel || {}
  );

  // Create trajectoryData only if there are experience levels
  const trajectoryData =
    experienceLevels.length > 0
      ? experienceLevels.map((level, index) => {
          const salary = actualData.salaryByExperienceLevel[level];
          const isCurrentLevel =
            index === Math.floor(experienceLevels.length / 2);

          return {
            role: level,
            salaryRange: `${formatCurrency(salary * 0.9)} - ${formatCurrency(
              salary * 1.1
            )}/год`,
            current: isCurrentLevel,
          };
        })
      : [];

  // Format salaries data for listing
  const salaryEntries =
    actualData.salaries?.map((salary) => ({
      id: salary.id,
      companyId: salary.companyId,
      companyName: salary.companyName,
      companyLogoUrl:
        salary.companyLogoUrl ||
        `https://cdn-icons-png.flaticon.com/512/5954/5954315.png`,
      salary: formatCurrency(salary.salary),
      verified: salary.hasVerification,
    })) || [];

  function formatCurrency(amount: number) {
    const formatter = new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: actualData.currency || "KZT",
      maximumFractionDigits: 0,
    });
    return formatter.format(amount);
  }

  return (
    <Container className={styles.salariesContainer}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 md:mb-0">
          Зарплаты {actualData.jobTitle}
        </h1>

        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
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
            <Search className="h-4 w-4 mr-2 md:mr-0" />
            <span className="md:hidden">Поиск</span>
          </Button>
        </div>
      </div>

      <SalaryBreakdown data={salaryData} />

      {trajectoryData.length > 0 && <CareerTrajectory data={trajectoryData} />}

      {salaryEntries.length > 0 && (
        <div className={styles.relatedSection}>
          <h2 className="text-xl font-semibold text-[#800000] mb-4">
            Зарплаты для смежных должностей
          </h2>
          <SalaryList data={salaryEntries} />
        </div>
      )}
    </Container>
  );
}
