"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  Typography,
  Box,
  Container,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  TextField,
  CircularProgress,
  Chip,
  useTheme,
} from "@mui/material";
import { 
  BarChart, 
  Bar, 
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { useQuery } from "react-query";
import { Plus, DollarSign, TrendingUp, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "@/services/apiClient";
import styles from "./CompanySalariesPage.module.scss";

// Типы данных
interface SalaryData {
  id: string;
  company_id: string;
  company_name: string;
  job_title: string;
  salary_amount: number;
  currency: string;
  experience_level: string;
  employment_type: string;
  location: string;
  created_at: string;
}

interface SalaryStatistics {
  job_title: string;
  avg_salary: number;
  min_salary: number;
  max_salary: number;
  sample_size: number;
  currency: string;
}

interface AggregatedSalaryData {
  job_title: string;
  count: number;
  average: number;
  min: number;
  max: number;
  experience_levels: {
    [key: string]: number;
  }
}

const experienceLevelOptions = [
  { value: "all", label: "Все уровни" },
  { value: "intern", label: "Стажер" },
  { value: "junior", label: "Младший специалист" },
  { value: "middle", label: "Специалист" },
  { value: "senior", label: "Старший специалист" },
  { value: "executive", label: "Руководитель" },
];

const CompanySalariesPage = () => {
  const theme = useTheme();
  const params = useParams();
  const router = useRouter();
  const companyId = typeof params.companyId === "string" ? params.companyId : "";

  // Состояния для фильтров
  const [jobTitleFilter, setJobTitleFilter] = useState("all");
  const [experienceFilter, setExperienceFilter] = useState("all");
  const [uniqueJobTitles, setUniqueJobTitles] = useState<string[]>([]);

  // Загрузка данных о зарплатах
  const { data: salaryData, isLoading, error } = useQuery(
    ["companySalaries", companyId],
    async () => {
      const response = await axios.get(`/salaries/company/${companyId}`);
      return response.data;
    },
    {
      enabled: !!companyId,
      staleTime: 300000, // 5 минут
    }
  );

  // Запрос статистики по зарплатам
  const { data: salaryStats } = useQuery(
    ["salaryStatistics", jobTitleFilter, experienceFilter],
    async () => {
      let url = "/salaries/statistics?";
      
      if (jobTitleFilter !== "all") {
        url += `job_title=${encodeURIComponent(jobTitleFilter)}&`;
      }
      
      if (experienceFilter !== "all") {
        url += `experience_level=${encodeURIComponent(experienceFilter)}&`;
      }
      
      const response = await axios.get(url);
      return response.data;
    },
    {
      enabled: !!companyId,
      staleTime: 300000, // 5 минут
    }
  );

  // Запрос сравнительного анализа зарплат
  const { data: salaryComparison } = useQuery(
    ["salaryComparison", jobTitleFilter],
    async () => {
      if (jobTitleFilter === "all") return null;
      
      const url = `/salaries/analytics/compare?job_title=${encodeURIComponent(jobTitleFilter)}&company_id=${companyId}`;
      const response = await axios.get(url);
      return response.data;
    },
    {
      enabled: jobTitleFilter !== "all" && !!companyId,
      staleTime: 300000, // 5 минут
    }
  );

  // Обработка данных для отображения
  const processedData = React.useMemo(() => {
    if (!salaryData || salaryData.length === 0) return {
      aggregatedData: [],
      chartData: [],
      pieData: []
    };

    // Первичная агрегация по должностям
    const jobTitleAggregation: Record<string, AggregatedSalaryData> = {};
    
    salaryData.forEach((salary: SalaryData) => {
      const { job_title, salary_amount, experience_level } = salary;
      
      // Применяем фильтры
      if (
        (experienceFilter !== "all" && experience_level !== experienceFilter) ||
        (jobTitleFilter !== "all" && job_title !== jobTitleFilter)
      ) {
        return;
      }
      
      if (!jobTitleAggregation[job_title]) {
        jobTitleAggregation[job_title] = {
          job_title,
          count: 0,
          average: 0,
          min: Infinity,
          max: 0,
          experience_levels: {}
        };
      }
      
      const aggregation = jobTitleAggregation[job_title];
      aggregation.count += 1;
      aggregation.average = (aggregation.average * (aggregation.count - 1) + salary_amount) / aggregation.count;
      aggregation.min = Math.min(aggregation.min, salary_amount);
      aggregation.max = Math.max(aggregation.max, salary_amount);
      
      // Агрегируем по уровню опыта
      if (!aggregation.experience_levels[experience_level]) {
        aggregation.experience_levels[experience_level] = 0;
      }
      aggregation.experience_levels[experience_level] += 1;
    });
    
    // Преобразуем объект в массив для отображения
    const aggregatedData = Object.values(jobTitleAggregation);
    
    // Данные для столбчатой диаграммы
    const chartData = aggregatedData.map(item => ({
      name: item.job_title,
      average: Math.round(item.average),
      min: item.min,
      max: item.max
    }));
    
    // Данные для круговой диаграммы по уровням опыта
    const experienceCounts: Record<string, number> = {};
    salaryData.forEach((salary: SalaryData) => {
      const { experience_level } = salary;
      if (jobTitleFilter !== "all" && salary.job_title !== jobTitleFilter) return;
      
      if (!experienceCounts[experience_level]) {
        experienceCounts[experience_level] = 0;
      }
      experienceCounts[experience_level] += 1;
    });
    
    const pieData = Object.entries(experienceCounts).map(([name, value]) => ({
      name,
      value
    }));
    
    // Обновление списка должностей для фильтра
    const jobTitles = Array.from(new Set(salaryData.map((salary: SalaryData) => salary.job_title)));
    setUniqueJobTitles(jobTitles);
    
    return {
      aggregatedData,
      chartData,
      pieData
    };
  }, [salaryData, jobTitleFilter, experienceFilter]);

  // Обработчики изменения фильтров
  const handleJobTitleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setJobTitleFilter(event.target.value as string);
  };

  const handleExperienceChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setExperienceFilter(event.target.value as string);
  };

  // Редирект на страницу добавления зарплаты
  const handleAddSalary = () => {
    router.push(`/add/salary?company=${companyId}`);
  };

  // Цвета для графиков
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a20000'];

  // Форматирование зарплаты
  const formatSalary = (salary: number) => {
    return new Intl.NumberFormat('ru-RU', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(salary);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
        <CircularProgress size={60} sx={{ color: '#a20000' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <AlertCircle size={50} color="#a20000" />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Не удалось загрузить данные о зарплатах
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Пожалуйста, попробуйте позже или обратитесь в поддержку
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" className={styles.container}>
      {/* Заголовок и кнопка добавления */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" className={styles.title}>
          Зарплаты в компании
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          startIcon={<Plus size={16} />}
          onClick={handleAddSalary}
          sx={{ 
            backgroundColor: '#a20000',
            '&:hover': {
              backgroundColor: '#800000',
            }
          }}
        >
          Добавить зарплату
        </Button>
      </Box>

      {/* Фильтры */}
      <Paper className={styles.filterSection}>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Фильтры
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="job-title-label">Должность</InputLabel>
                <Select
                  labelId="job-title-label"
                  id="job-title-select"
                  value={jobTitleFilter}
                  label="Должность"
                  onChange={handleJobTitleChange}
                >
                  <MenuItem value="all">Все должности</MenuItem>
                  {uniqueJobTitles.map((title) => (
                    <MenuItem key={title} value={title}>
                      {title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="experience-label">Опыт работы</InputLabel>
                <Select
                  labelId="experience-label"
                  id="experience-select"
                  value={experienceFilter}
                  label="Опыт работы"
                  onChange={handleExperienceChange}
                >
                  {experienceLevelOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {/* Общая статистика */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <Paper className={styles.statsSection}>
            <Typography variant="h6" className={styles.sectionTitle}>
              Общая статистика
            </Typography>

            {salaryStats && salaryStats.length > 0 ? (
              <Grid container spacing={3} sx={{ mt: 1 }}>
                {salaryStats.map((stat: SalaryStatistics) => (
                  <Grid item xs={12} md={4} key={stat.job_title}>
                    <Paper 
                      elevation={0} 
                      sx={{ 
                        p: 2, 
                        textAlign: 'center',
                        border: '1px solid #eee',
                        borderRadius: '8px',
                        backgroundColor: '#fafafa'
                      }}
                    >
                      <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
                        {stat.job_title || "Все должности"}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 1 }}>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Мин
                          </Typography>
                          <Typography variant="h6" color="#a20000">
                            {formatSalary(stat.min_salary)}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Средняя
                          </Typography>
                          <Typography variant="h6" color="#a20000" fontWeight="bold">
                            {formatSalary(stat.avg_salary)}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Макс
                          </Typography>
                          <Typography variant="h6" color="#a20000">
                            {formatSalary(stat.max_salary)}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="caption" display="block" color="text.secondary">
                        Основано на {stat.sample_size} {
                          stat.sample_size % 10 === 1 && stat.sample_size % 100 !== 11 ? 'отчете' : 
                          stat.sample_size % 10 >= 2 && stat.sample_size % 10 <= 4 && 
                          (stat.sample_size % 100 < 10 || stat.sample_size % 100 >= 20) ? 'отчетах' : 'отчетах'
                        }
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography variant="body1" sx={{ textAlign: 'center', py: 4 }}>
                Нет данных о зарплатах для выбранных фильтров
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Графики */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* Столбчатая диаграмма зарплат по должностям */}
        <Grid item xs={12} md={8}>
          <Paper className={styles.chartSection}>
            <Typography variant="h6" className={styles.sectionTitle}>
              Диапазоны зарплат по должностям
            </Typography>
            
            {processedData.chartData && processedData.chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={processedData.chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45} 
                    textAnchor="end" 
                    height={70}
                    interval={0}
                  />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => formatSalary(Number(value))}
                    contentStyle={{ borderRadius: '8px' }}
                  />
                  <Legend />
                  <Bar 
                    dataKey="min" 
                    fill="#0088FE" 
                    name="Минимальная" 
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    dataKey="average" 
                    fill="#a20000" 
                    name="Средняя"
                    radius={[4, 4, 0, 0]} 
                  />
                  <Bar 
                    dataKey="max" 
                    fill="#00C49F" 
                    name="Максимальная"
                    radius={[4, 4, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <Box sx={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="body1" color="text.secondary">
                  Недостаточно данных для отображения графика
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Круговая диаграмма распределения по опыту */}
        <Grid item xs={12} md={4}>
          <Paper className={styles.chartSection}>
            <Typography variant="h6" className={styles.sectionTitle}>
              Распределение по опыту
            </Typography>
            
            {processedData.pieData && processedData.pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={processedData.pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {processedData.pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} отчетов`, 'Количество']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <Box sx={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="body1" color="text.secondary">
                  Недостаточно данных для отображения графика
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Сравнение с рынком */}
      {salaryComparison && (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <Paper className={styles.comparisonSection}>
              <Typography variant="h6" className={styles.sectionTitle}>
                Сравнение с рынком
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Paper 
                    elevation={0}
                    sx={{ 
                      p: 2, 
                      border: '1px solid #eee',
                      borderRadius: '8px',
                      backgroundColor: '#fafafa'
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ mb: 2 }}>
                      Сравнение с отраслью
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          Компания:
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                          {salaryComparison.company_comparison.company_name}
                        </Typography>
                      </Box>
                      <Typography variant="h6" color="#a20000" fontWeight="bold">
                        {formatSalary(salaryComparison.company_comparison.company_avg_salary)}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          Средняя по отрасли:
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                          {salaryComparison.company_comparison.industry_name}
                        </Typography>
                      </Box>
                      <Typography variant="h6" fontWeight="bold">
                        {formatSalary(salaryComparison.company_comparison.industry_avg_salary)}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Chip 
                        label={`${salaryComparison.company_comparison.is_above_industry_avg ? '+' : ''}${salaryComparison.company_comparison.percent_difference.toFixed(1)}%`} 
                        color={salaryComparison.company_comparison.is_above_industry_avg ? "success" : "error"}
                        icon={salaryComparison.company_comparison.is_above_industry_avg ? <TrendingUp size={16} /> : <TrendingUp size={16} />}
                      />
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        {salaryComparison.company_comparison.is_above_industry_avg ? "выше" : "ниже"} среднего по отрасли
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Paper 
                    elevation={0}
                    sx={{ 
                      p: 2, 
                      border: '1px solid #eee',
                      borderRadius: '8px',
                      backgroundColor: '#fafafa'
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ mb: 2 }}>
                      Сравнение по локации
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          Локация:
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                          {salaryComparison.location_comparison.location_name}
                        </Typography>
                      </Box>
                      <Typography variant="h6" color="#a20000" fontWeight="bold">
                        {formatSalary(salaryComparison.location_comparison.location_avg_salary)}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          Средняя по стране:
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                          Национальная
                        </Typography>
                      </Box>
                      <Typography variant="h6" fontWeight="bold">
                        {formatSalary(salaryComparison.location_comparison.national_avg_salary)}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Chip 
                        label={`${salaryComparison.location_comparison.is_above_national_avg ? '+' : ''}${salaryComparison.location_comparison.percent_difference.toFixed(1)}%`}
                        color={salaryComparison.location_comparison.is_above_national_avg ? "success" : "error"}
                        icon={salaryComparison.location_comparison.is_above_national_avg ? <TrendingUp size={16} /> : <TrendingUp size={16} />}
                      />
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        {salaryComparison.location_comparison.is_above_national_avg ? "выше" : "ниже"} среднего по стране
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* Таблица с детальной информацией */}
      <Paper sx={{ mt: 3, mb: 4 }}>
        <Typography variant="h6" sx={{ p: 2, borderBottom: '1px solid #eee' }}>
          Детальная информация о зарплатах
        </Typography>
        
        <TableContainer>
          <Table>
            <TableHead className={styles.tableHead}>
              <TableRow>
                <TableCell>Должность</TableCell>
                <TableCell>Уровень опыта</TableCell>
                <TableCell>Зарплата</TableCell>
                <TableCell>Тип занятости</TableCell>
                <TableCell>Локация</TableCell>
                <TableCell>Дата добавления</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {salaryData && salaryData.length > 0 ? (
                salaryData
                  .filter((salary: SalaryData) => {
                    return (
                      (jobTitleFilter === "all" || salary.job_title === jobTitleFilter) &&
                      (experienceFilter === "all" || salary.experience_level === experienceFilter)
                    );
                  })
                  .map((salary: SalaryData) => (
                    <TableRow key={salary.id} className={styles.tableRow}>
                      <TableCell>{salary.job_title}</TableCell>
                      <TableCell>{salary.experience_level}</TableCell>
                      <TableCell>
                        <Typography fontWeight="bold" color="#a20000">
                          {formatSalary(salary.salary_amount)}
                        </Typography>
                      </TableCell>
                      <TableCell>{salary.employment_type}</TableCell>
                      <TableCell>{salary.location}</TableCell>
                      <TableCell>
                        {new Date(salary.created_at).toLocaleDateString("ru-RU", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                    <Typography variant="body1">
                      Нет данных о зарплатах для выбранных фильтров
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Секция добавления своей зарплаты */}
      <Paper sx={{ p: 3, mb: 4, bgcolor: '#fafafa', textAlign: 'center' }}>
        <DollarSign size={40} color="#a20000" style={{ marginBottom: 16 }} />
        <Typography variant="h6" sx={{ mb: 1 }}>
          Помогите сообществу - поделитесь информацией о своей зарплате
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Ваши данные помогут другим узнать свою рыночную стоимость и вести более эффективные переговоры с работодателями
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          startIcon={<Plus size={16} />}
          onClick={handleAddSalary}
          sx={{ 
            backgroundColor: '#a20000',
            '&:hover': {
              backgroundColor: '#800000',
            }
          }}
        >
          Добавить свою зарплату
        </Button>
      </Paper>
    </Container>
  );
};

export default CompanySalariesPage;