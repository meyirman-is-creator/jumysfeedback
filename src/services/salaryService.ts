// src/services/salaryService.ts
import apiClient from './apiClient';
import { 
  SalaryData, 
  SalaryStatistics, 
  SalaryComparison, 
  CreateSalaryDTO, 
  UpdateSalaryDTO 
} from '@/types/salary';

export const salaryService = {
  // Получение зарплат для компании
  getCompanySalaries: async (companyId: string | number): Promise<SalaryData[]> => {
    const response = await apiClient.get(`/salaries/company/${companyId}`);
    return response.data;
  },
  
  // Получение статистики по зарплатам
  getSalaryStatistics: async (
    jobTitle?: string,
    experienceLevel?: string,
    location?: string
  ): Promise<SalaryStatistics[]> => {
    let url = '/salaries/statistics?';
    
    if (jobTitle && jobTitle !== 'all') {
      url += `job_title=${encodeURIComponent(jobTitle)}&`;
    }
    
    if (experienceLevel && experienceLevel !== 'all') {
      url += `experience_level=${encodeURIComponent(experienceLevel)}&`;
    }
    
    if (location) {
      url += `location=${encodeURIComponent(location)}&`;
    }
    
    const response = await apiClient.get(url);
    return response.data;
  },
  
  // Получение сравнительного анализа зарплат
  getSalaryComparison: async (
    jobTitle: string,
    companyId: string | number,
    location?: string,
    experienceLevel?: string,
    employmentType?: string,
    currency: string = 'USD'
  ): Promise<SalaryComparison> => {
    let url = `/salaries/analytics/compare?job_title=${encodeURIComponent(jobTitle)}&company_id=${companyId}`;
    
    if (location) {
      url += `&location=${encodeURIComponent(location)}`;
    }
    
    if (experienceLevel && experienceLevel !== 'all') {
      url += `&experience_level=${encodeURIComponent(experienceLevel)}`;
    }
    
    if (employmentType && employmentType !== 'all') {
      url += `&employment_type=${encodeURIComponent(employmentType)}`;
    }
    
    if (currency) {
      url += `&currency=${encodeURIComponent(currency)}`;
    }
    
    const response = await apiClient.get(url);
    return response.data;
  },
  
  // Расширенный поиск по зарплатам
  searchSalaries: async (params: {
    jobTitles?: string[];
    companyIds?: (string | number)[];
    industries?: string[];
    locations?: string[];
    experienceLevels?: string[];
    employmentTypes?: string[];
    currency?: string;
    sortBy?: 'recency' | 'salary_high_to_low' | 'salary_low_to_high';
    skip?: number;
    limit?: number;
  }) => {
    try {
      // Формируем строку запроса только из существующих параметров
      const queryParams: string[] = [];
      
      if (params.jobTitles && params.jobTitles.length > 0) {
        queryParams.push(`job_titles=${params.jobTitles.map(encodeURIComponent).join(',')}`);
      }
      
      if (params.companyIds && params.companyIds.length > 0) {
        queryParams.push(`company_ids=${params.companyIds.join(',')}`);
      }
      
      if (params.industries && params.industries.length > 0) {
        queryParams.push(`industries=${params.industries.map(encodeURIComponent).join(',')}`);
      }
      
      if (params.locations && params.locations.length > 0) {
        queryParams.push(`locations=${params.locations.map(encodeURIComponent).join(',')}`);
      }
      
      if (params.experienceLevels && params.experienceLevels.length > 0) {
        queryParams.push(`experience_levels=${params.experienceLevels.join(',')}`);
      }
      
      if (params.employmentTypes && params.employmentTypes.length > 0) {
        queryParams.push(`employment_types=${params.employmentTypes.join(',')}`);
      }
      
      if (params.currency) {
        queryParams.push(`currency=${encodeURIComponent(params.currency)}`);
      }
      
      if (params.sortBy) {
        queryParams.push(`sort_by=${encodeURIComponent(params.sortBy)}`);
      }
      
      // Добавляем параметры пагинации только если они определены
      if (params.skip !== undefined) {
        queryParams.push(`skip=${params.skip}`);
      }
      
      if (params.limit !== undefined) {
        queryParams.push(`limit=${params.limit}`);
      }
      
      const url = queryParams.length > 0 
        ? `/salaries/search?${queryParams.join('&')}` 
        : '/salaries/search';
      
      const response = await apiClient.get(url);
      return response.data;
    } catch (error) {
      console.error('Error searching salaries:', error);
      // Возвращаем пустой результат в случае ошибки
      return {
        results: [],
        total: 0,
        filters_applied: params,
        sort_by: params.sortBy || "recency",
        skip: params.skip || 0,
        limit: params.limit || 10
      };
    }
  },
  
  // Получение зарплат текущего пользователя
  getUserSalaries: async () => {
    const response = await apiClient.get('/salaries/user/me');
    return response.data;
  },
  
  // Создание записи о зарплате
  createSalary: async (salaryData: CreateSalaryDTO) => {
    const response = await apiClient.post('/salaries', salaryData);
    return response.data;
  },
  
  // Обновление записи о зарплате
  updateSalary: async (salaryId: string | number, salaryData: UpdateSalaryDTO) => {
    const response = await apiClient.put(`/salaries/${salaryId}`, salaryData);
    return response.data;
  },
  
  // Удаление записи о зарплате (только для администраторов)
  deleteSalary: async (salaryId: string | number) => {
    const response = await apiClient.delete(`/admin/salaries/${salaryId}`);
    return response.data;
  }
};

export default salaryService;