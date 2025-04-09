"use client";

import React, { useState } from "react";
import {
  Typography,
  Box,
  Container,
  Paper,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
  CircularProgress,
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
  Cell,
} from "recharts";
import { useRouter } from "next/navigation";
import { useSearchSalaries, useSalaryStatistics } from "@/hooks/useSalaryData";
import { Plus, DollarSign, TrendingUp, AlertCircle, Search, Building, MapPin } from "lucide-react";
import styles from "./SalaryExplorerPage.module.scss";

// Опции для селекторов
const experienceLevelOptions = [
  { value: "all", label: "Все уровни" },
  { value: "intern", label: "Стажер" },
  { value: "junior", label: "Младший специалист" },
  { value: "middle", label: "Специалист" },
  { value: "senior", label: "Старший специалист" },
  { value: "executive", label: "Руководитель" },
];

const employmentTypeOptions = [
  { value: "all", label: "Все типы" },
  { value: "full-time", label: "Полная занятость" },
  { value: "part-time", label: "Частичная занятость" },
  { value: "contract", label: "Контракт" },
  { value: "internship", label: "Стажировка" },
  { value: "freelance", label: "Фриланс" },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a20000'];

const SalaryExplorerPage = () => {
  const theme = useTheme();
  const router = useRouter();
  
  // Состояния для фильтров и пагинации
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("all");
  const [employmentType, setEmploymentType] = useState("all");
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Параметры запроса для поиска зарплат
  // Параметры запроса для поиска зарплат
  const searchParams = React.useMemo(() => {
    const params: any = {};
    
    // Добавляем параметры только если они имеют значение
    if (jobTitle) {
      params.jobTitles = [jobTitle];
    }
    
    if (location) {
      params.locations = [location];
    }
    
    if (experienceLevel !== "all") {
      params.experienceLevels = [experienceLevel];
    }
    
    if (employmentType !== "all") {
      params.employmentTypes = [employmentType];
    }
    
    params.sortBy = "salary_high_to_low";
    params.skip = (page - 1) * itemsPerPage;
    params.limit = itemsPerPage;
    
    return params;
  }, [jobTitle, location, experienceLevel, employmentType, page, itemsPerPage]);

  // Получение данных поиска
  const { data: searchResults, isLoading, error } = useSearchSalaries(searchParams);
  
  // Получение статистики по зарплатам для текущих фильтров
  const { data: salaryStats } = useSalaryStatistics(
    jobTitle || undefined, 
    experienceLevel !== "all" ? experienceLevel : undefined,
    location || undefined
  );

  // Обработка поиска
  const handleSearch = () => {
    setPage(1); // Сбрасываем страницу при новом поиске
  };

  // Переход на страницу добавления зарплаты
  const handleAddSalary = () => {
    router.push("/add/salary");
  };

  // Обработка изменения страницы пагинации
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // Форматирование зарплаты
  const formatSalary = (salary: number, currency = "USD") => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(salary);
  };

  // Форматирование даты
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ru-RU", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Данные для графика по должностям (топ 10)
  const jobTitleChartData = React.useMemo(() => {
    if (!searchResults?.results || searchResults.results.length === 0) return [];
    
    // Группировка по должности и расчет средней зарплаты
    const jobTitleAggregation: Record<string, { count: number, total: number }> = {};
    
    searchResults.results.forEach(salary => {
      if (!jobTitleAggregation[salary.job_title]) {
        jobTitleAggregation[salary.job_title] = { count: 0, total: 0 };
      }
      
      jobTitleAggregation[salary.job_title].count += 1;
      jobTitleAggregation[salary.job_title].total += salary.salary_amount;
    });
    
    // Преобразование в массив и сортировка по средней зарплате
    return Object.entries(jobTitleAggregation)
      .map(([title, data]) => ({
        name: title,
        average: Math.round(data.total / data.count)
      }))
      .sort((a, b) => b.average - a.average)
      .slice(0, 10); // Только топ 10
  }, [searchResults]);

  // Данные для графика по уровню опыта
  const experienceLevelChartData = React.useMemo(() => {
    if (!searchResults?.results || searchResults.results.length === 0) return [];
    
    // Группировка по уровню опыта
    const expLevelAggregation: Record<string, { count: number, total: number }> = {};
    
    searchResults.results.forEach(salary => {
      if (!expLevelAggregation[salary.experience_level]) {
        expLevelAggregation[salary.experience_level] = { count: 0, total: 0 };
      }
      
      expLevelAggregation[salary.experience_level].count += 1;
      expLevelAggregation[salary.experience_level].total += salary.salary_amount;
    });
    
    // Преобразование в массив для графика
    return Object.entries(expLevelAggregation)
      .map(([level, data]) => ({
        name: level,
        value: data.count,
        average: Math.round(data.total / data.count)
      }));
  }, [searchResults]);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}>
        <CircularProgress size={60} sx={{ color: "#a20000" }} />
      </Box>
    );
  }

  

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
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
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Typography variant="h4" className={styles.title}>
          Исследование зарплат
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Plus size={16} />}
          onClick={handleAddSalary}
          sx={{
            backgroundColor: "#a20000",
            "&:hover": {
              backgroundColor: "#800000",
            },
          }}
        >
          Добавить зарплату
        </Button>
      </Box>

      {/* Секция поиска и фильтров */}
      <Paper className={styles.searchSection}>
        <Typography variant="h6" sx={{ p: 2, borderBottom: "1px solid #eee" }}>
          Найти информацию о зарплатах
        </Typography>
        <Box sx={{ p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Должность"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <Search size={18} color="#666" style={{ marginRight: 8 }} />
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Локация"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <MapPin size={18} color="#666" style={{ marginRight: 8 }} />
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth>
                <InputLabel id="experience-label">Опыт работы</InputLabel>
                <Select
                  labelId="experience-label"
                  value={experienceLevel}
                  label="Опыт работы"
                  onChange={(e) => setExperienceLevel(e.target.value)}
                >
                  {experienceLevelOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth>
                <InputLabel id="employment-type-label">Тип занятости</InputLabel>
                <Select
                  labelId="employment-type-label"
                  value={employmentType}
                  label="Тип занятости"
                  onChange={(e) => setEmploymentType(e.target.value)}
                >
                  {employmentTypeOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2} sx={{ display: "flex", alignItems: "center" }}>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#a20000",
                  "&:hover": {
                    backgroundColor: "#800000",
                  },
                }}
                onClick={handleSearch}
              >
                Поиск
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {/* Общая статистика */}
      {salaryStats && salaryStats.length > 0 && (
        <Grid container spacing={3} sx={{ mt: 3 }}>
          {salaryStats.map((stat) => (
            <Grid item xs={12} sm={6} md={4} key={stat.job_title || "all"}>
              <Paper elevation={1} sx={{ p: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold" color="#a20000" sx={{ mb: 1 }}>
                  {stat.job_title || "Все должности"}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Средняя зарплата:
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {formatSalary(stat.avg_salary, stat.currency)}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Минимальная:
                  </Typography>
                  <Typography variant="body1">
                    {formatSalary(stat.min_salary, stat.currency)}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Максимальная:
                  </Typography>
                  <Typography variant="body1">
                    {formatSalary(stat.max_salary, stat.currency)}
                  </Typography>
                </Box>
                <Typography variant="caption" display="block" color="text.secondary" align="right">
                  Основано на {stat.sample_size} отчетах
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Графики для визуализации данных */}
      {searchResults && searchResults.results.length > 0 && (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {/* График по должностям (топ 10) */}
          <Grid item xs={12} md={7}>
            <Paper className={styles.chartSection}>
              <Typography variant="h6" className={styles.sectionTitle}>
                Топ должности по уровню зарплаты
              </Typography>
              
              {jobTitleChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    data={jobTitleChartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 'dataMax']} tickFormatter={(value) => `$${value}`} />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      width={150}
                      tickFormatter={(value) => 
                        value.length > 15 ? `${value.substring(0, 15)}...` : value
                      }
                    />
                    <Tooltip 
                      formatter={(value) => formatSalary(Number(value))}
                      contentStyle={{ borderRadius: '8px' }}
                    />
                    <Bar 
                      dataKey="average" 
                      fill="#a20000" 
                      name="Средняя зарплата"
                      radius={[0, 4, 4, 0]}
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

          {/* График по уровню опыта */}
          <Grid item xs={12} md={5}>
            <Paper className={styles.chartSection}>
              <Typography variant="h6" className={styles.sectionTitle}>
                Распределение по опыту
              </Typography>
              
              {experienceLevelChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={experienceLevelChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {experienceLevelChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value, name, props) => {
                      if (name === 'value') return [`${value} отчетов`, 'Количество'];
                      return [formatSalary(Number(value)), 'Средняя зарплата'];
                    }} />
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
      )}

      {/* Таблица с результатами поиска */}
      <Paper sx={{ mt: 3, mb: 4 }}>
        <Typography variant="h6" sx={{ p: 2, borderBottom: "1px solid #eee" }}>
          Результаты поиска
          {searchResults && (
            <Chip 
              label={`${searchResults.total} найдено`} 
              size="small" 
              sx={{ ml: 2, backgroundColor: '#f5f5f5' }} 
            />
          )}
        </Typography>
        
        <TableContainer>
          <Table>
            <TableHead className={styles.tableHead}>
              <TableRow>
                <TableCell>Должность</TableCell>
                <TableCell>Компания</TableCell>
                <TableCell>Зарплата</TableCell>
                <TableCell>Опыт</TableCell>
                <TableCell>Тип занятости</TableCell>
                <TableCell>Локация</TableCell>
                <TableCell>Дата</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {searchResults && searchResults.results.length > 0 ? (
                searchResults.results.map((salary) => (
                  <TableRow key={salary.id} className={styles.tableRow}>
                    <TableCell>{salary.job_title}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Building size={16} style={{ marginRight: 8, color: '#666' }} />
                        {salary.company_name}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography fontWeight="bold" color="#a20000">
                        {formatSalary(salary.salary_amount, salary.currency)}
                      </Typography>
                    </TableCell>
                    <TableCell>{salary.experience_level}</TableCell>
                    <TableCell>{salary.employment_type}</TableCell>
                    <TableCell>{salary.location}</TableCell>
                    <TableCell>{formatDate(salary.created_at)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                    <Typography variant="body1">
                      {searchResults?.total === 0
                        ? "Нет данных, соответствующих вашему запросу"
                        : "Для просмотра данных выполните поиск"}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
        {searchResults && searchResults.total > itemsPerPage && (
          <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
            <Pagination
              count={Math.ceil(searchResults.total / itemsPerPage)}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        )}
      </Paper>

      {/* Секция добавления своей зарплаты */}
      <Paper sx={{ p: 3, mb: 4, bgcolor: "#fafafa", textAlign: "center" }}>
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
            backgroundColor: "#a20000",
            "&:hover": {
              backgroundColor: "#800000",
            },
          }}
        >
          Добавить свою зарплату
        </Button>
      </Paper>
    </Container>
  );
};

export default SalaryExplorerPage;