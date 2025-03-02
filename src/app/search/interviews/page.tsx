"use client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Typography,
  TextField,
  Card,
  CardContent,
  Box,
  Paper,
  Pagination,
} from "@mui/material";
import styles from "./Interviews.module.scss";
import { mockCompanies } from "@/features/company/mockData";
import { IInterview } from "@/types";

/** Интерфейс, чтобы добавить companyId к интервью */
interface IInterviewWithCompany extends IInterview {
  companyId: string;
}

export default function InterviewsPage() {
  const router = useRouter();

  /** Поисковый запрос для фильтрации */
  const [searchTerm, setSearchTerm] = useState("");

  /** Текущая страница пагинации */
  const [page, setPage] = useState(1);

  /** Кол-во карточек на одной странице */
  const itemsPerPage = 6;

  /**
   * Собираем все интервью со всех компаний,
   * добавляя к каждому объекту interview => { ...interview, companyId }
   */
  const allInterviews: IInterviewWithCompany[] = useMemo(() => {
    const arr: IInterviewWithCompany[] = [];
    mockCompanies.forEach((company) => {
      company.interviews.forEach((interview) => {
        arr.push({ ...interview, companyId: company.id });
      });
    });
    return arr;
  }, []);

  /** Фильтрация по названию позиции */
  const filteredInterviews = useMemo(() => {
    if (!searchTerm.trim()) return allInterviews;
    return allInterviews.filter((item) =>
      item.position.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allInterviews, searchTerm]);

  /** Подсчитываем общее кол-во страниц */
  const totalPages = Math.ceil(filteredInterviews.length / itemsPerPage);

  /** Индексы для slice() */
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  /** Текущие интервью на данной странице */
  const currentInterviews = filteredInterviews.slice(startIndex, endIndex);

  /** Обработчик смены страницы пагинации */
  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  /** Переход при клике на карточку */
  const handleCardClick = (companyId: string) => {
    router.push(`/companies/${companyId}/interviews`);
  };

  return (
    <Container maxWidth="lg" className={styles.container}>
      <Box className={styles.header}>
        <Typography variant="h4" gutterBottom>
          Data Analyst Interview Questions
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          maxWidth="md"
          margin="auto"
        >
          In a data analyst interview, employers ask questions that help
          ascertain your level of technical skills, including familiarity with
          data analysis software, data analysis terminology, and statistical
          methods.
        </Typography>
      </Box>

      <Paper className={styles.topCard} elevation={2}>
        <CardContent>
          <Typography variant="h6" mb={2}>
            Top Data Analyst Interview Questions & How to Answer
          </Typography>
          <Box mb={2}>
            <Typography fontWeight="bold" gutterBottom>
              Question #1: What data analysis software have you worked with?
            </Typography>
            <Typography variant="body2">
              How to answer: Data analysts use software to perform many of their
              job duties...
            </Typography>
          </Box>

          <Box mb={2}>
            <Typography fontWeight="bold" gutterBottom>
              Question #2: Which statistical methods are most beneficial for
              data analysis?
            </Typography>
            <Typography variant="body2">
              How to answer: With this question, interviewers are testing your
              understanding of data analysis methods...
            </Typography>
          </Box>

          <Box>
            <Typography fontWeight="bold" gutterBottom>
              Question #3: Explain how you would estimate the pairs of rain
              boots sold in Seattle in May?
            </Typography>
            <Typography variant="body2">
              How to answer: Guesstimate questions are often used in data
              analyst interviews...
            </Typography>
          </Box>
        </CardContent>
      </Paper>

      <Box className={styles.filterRow}>
        <Typography variant="subtitle1" fontWeight="bold">
          {filteredInterviews.length.toLocaleString()} data analyst interview
          questions shared by candidates
        </Typography>
        <TextField
          size="small"
          label="Filter by Position"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

      <Box className={styles.listContainer}>
        {currentInterviews.map((interview, idx) => (
          <Card
            key={`${interview.position}-${idx}`}
            className={styles.interviewCard}
            style={{ cursor: "pointer" }}
            onClick={() => handleCardClick(interview.companyId)}
          >
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold">
                {interview.position}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Experience: {interview.experience}, Difficulty:{" "}
                {interview.difficulty}
              </Typography>
              <Typography variant="body2" mt={1} mb={1}>
                {interview.details}
              </Typography>
              <Typography
                variant="caption"
                display="block"
                color="text.secondary"
              >
                Date: {interview.date} | Location: {interview.location}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {filteredInterviews.length > itemsPerPage && (
        <Box mt={4} display="flex" justifyContent="center">
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </Container>
  );
}
