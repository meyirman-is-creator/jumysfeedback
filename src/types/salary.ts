// src/types/salary.ts
export interface SalaryData {
    id: string;
    company_id: number;
    company_name: string;
    job_title: string;
    salary_amount: number;
    currency: string;
    experience_level: string;
    employment_type: string;
    location: string;
    is_anonymous: boolean;
    created_at: string;
  }
  
  export interface SalaryStatistics {
    job_title: string;
    avg_salary: number;
    min_salary: number;
    max_salary: number;
    sample_size: number;
    currency: string;
  }
  
  export interface CompanyComparison {
    company_name: string;
    company_avg_salary: number;
    company_sample_size: number;
    industry_name: string;
    industry_avg_salary: number;
    industry_sample_size: number;
    percent_difference: number;
    is_above_industry_avg: boolean;
  }
  
  export interface LocationComparison {
    location_name: string;
    location_avg_salary: number;
    location_sample_size: number;
    national_avg_salary: number;
    national_sample_size: number;
    percent_difference: number;
    is_above_national_avg: boolean;
  }
  
  export interface SalaryComparison {
    job_title: string;
    currency: string;
    company_comparison: CompanyComparison;
    location_comparison: LocationComparison;
    filters: {
      company_id: number;
      location: string;
      experience_level: string;
      employment_type: string | null;
    }
  }
  
  export interface CreateSalaryDTO {
    company_id: number;
    job_title: string;
    salary_amount: number;
    currency: string;
    experience_level: string;
    employment_type: string;
    location: string;
    is_anonymous: boolean;
  }
  
  export interface UpdateSalaryDTO {
    job_title?: string;
    salary_amount?: number;
    currency?: string;
    experience_level?: string;
    employment_type?: string;
    location?: string;
    is_anonymous?: boolean;
  }