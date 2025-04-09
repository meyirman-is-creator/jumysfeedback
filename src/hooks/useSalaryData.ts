// src/hooks/useSalaryData.ts
import { useQuery, useMutation, useQueryClient } from 'react-query';
import salaryService from '@/services/salaryService';
import { CreateSalaryDTO, UpdateSalaryDTO } from '@/types/salary';

// Хук для получения зарплат компании
export const useCompanySalaries = (companyId: string | number, enabled = true) => {
  return useQuery(
    ['companySalaries', companyId],
    () => salaryService.getCompanySalaries(companyId),
    {
      enabled: !!companyId && enabled,
      staleTime: 300000, // 5 минут
      retry: 2,
    }
  );
};

// Хук для получения статистики по зарплатам
export const useSalaryStatistics = (
    jobTitle?: string,
    experienceLevel?: string,
    location?: string,
    enabled = true
  ) => {
    return useQuery(
      ['salaryStatistics', jobTitle, experienceLevel, location],
      () => {
        try {
          return salaryService.getSalaryStatistics(jobTitle, experienceLevel, location);
        } catch (error) {
          console.error('Error fetching salary statistics:', error);
          return [];
        }
      },
      {
        enabled,
        staleTime: 300000, // 5 минут
        retry: 1
      }
    );
  };

// Хук для получения сравнительного анализа зарплат
export const useSalaryComparison = (
  jobTitle: string,
  companyId: string | number,
  location?: string,
  experienceLevel?: string,
  employmentType?: string,
  enabled = true
) => {
  return useQuery(
    ['salaryComparison', jobTitle, companyId, location, experienceLevel, employmentType],
    () => salaryService.getSalaryComparison(
      jobTitle,
      companyId,
      location,
      experienceLevel,
      employmentType
    ),
    {
      enabled: !!jobTitle && !!companyId && enabled && jobTitle !== 'all',
      staleTime: 300000, // 5 минут
    }
  );
};

// Хук для создания новой записи о зарплате
export const useCreateSalary = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    (salaryData: CreateSalaryDTO) => salaryService.createSalary(salaryData),
    {
      onSuccess: (data, variables) => {
        // Инвалидируем запросы после успешного создания
        queryClient.invalidateQueries(['companySalaries', variables.company_id]);
        queryClient.invalidateQueries('salaryStatistics');
        queryClient.invalidateQueries(['userSalaries']);
      },
    }
  );
};

// Хук для обновления записи о зарплате
export const useUpdateSalary = (salaryId: string | number) => {
  const queryClient = useQueryClient();
  
  return useMutation(
    (salaryData: UpdateSalaryDTO) => salaryService.updateSalary(salaryId, salaryData),
    {
      onSuccess: (data) => {
        // Инвалидируем запросы после успешного обновления
        queryClient.invalidateQueries(['companySalaries']);
        queryClient.invalidateQueries('salaryStatistics');
        queryClient.invalidateQueries(['userSalaries']);
        queryClient.invalidateQueries(['salary', salaryId]);
      },
    }
  );
};

// Хук для получения зарплат текущего пользователя
export const useUserSalaries = (enabled = true) => {
  return useQuery(
    ['userSalaries'],
    () => salaryService.getUserSalaries(),
    {
      enabled,
      staleTime: 300000, // 5 минут
    }
  );
};

// Хук для поиска зарплат
// Хук для поиска зарплат
export const useSearchSalaries = (
    params: Parameters<typeof salaryService.searchSalaries>[0],
    enabled = true
  ) => {
    return useQuery(
      ['searchSalaries', params],
      () => {
        // Проверка и фильтрация пустых массивов для предотвращения 422 ошибки
        const cleanParams = { ...params };
        
        // Убираем пустые массивы и undefined значения
        Object.keys(cleanParams).forEach(key => {
          const value = cleanParams[key as keyof typeof cleanParams];
          if (Array.isArray(value) && value.length === 0) {
            delete cleanParams[key as keyof typeof cleanParams];
          } else if (value === undefined) {
            delete cleanParams[key as keyof typeof cleanParams];
          }
        });
        
        return salaryService.searchSalaries(cleanParams);
      },
      {
        enabled,
        keepPreviousData: true,
        staleTime: 300000, // 5 минут
        retry: 1, // Повторяем запрос только 1 раз в случае ошибки
        onError: (error) => {
          console.error('Search salaries error:', error);
        }
      }
    );
  };