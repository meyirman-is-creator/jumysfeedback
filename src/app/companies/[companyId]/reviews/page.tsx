"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import {
  Typography,
  Box,
  Grid,
  Avatar,
  Rating,
  Pagination,
} from "@mui/material";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { mockCompanies } from "@/features/company/mockData";
import styles from "./CompanyReviewsPage.module.scss";

const CompanyReviewsPage = () => {
  const { companyId } = useParams() as { companyId: string };
  const company = mockCompanies.find((c) => c.id === companyId);

  const [sortOption, setSortOption] = useState("newest");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [page, setPage] = useState(1);
  const reviewsPerPage = 5;

  // Расширяем тестовые отзывы для примера
  const allReviews = company
    ? [...company.reviews, ...generateExtraReviews(company.name)]
    : [];

  // Применяем фильтрацию по рейтингу
  const filteredReviews = allReviews.filter((review) => {
    if (ratingFilter === "all") return true;
    const rating = parseInt(ratingFilter);
    return review.rating === rating;
  });

  // Применяем сортировку
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortOption === "highest") return b.rating - a.rating;
    if (sortOption === "lowest") return a.rating - b.rating;
    // По умолчанию - самые новые первыми (в данном случае произвольно)
    return Math.random() - 0.5;
  });

  // Пагинация
  const totalPages = Math.ceil(sortedReviews.length / reviewsPerPage);
  const currentReviews = sortedReviews.slice(
    (page - 1) * reviewsPerPage,
    page * reviewsPerPage
  );

  // Функция для генерации дополнительных отзывов
  function generateExtraReviews(companyName) {
    const extraReviews = [
      {
        title: "Отличное место для профессионального роста",
        body: "Работаю уже более 2 лет и очень доволен. Коллектив дружный, руководство адекватное. Много возможностей для обучения и карьерного роста. Рекомендую всем, кто ищет стабильную работу с хорошими перспективами.",
        rating: 5,
        author: "Старший разработчик",
        date: "15 марта 2025",
        helpfulCount: 24,
        notHelpfulCount: 2,
        comments: 5,
      },
      {
        title: "Непростые задачи, но интересные",
        body: "Работа непростая, иногда приходится задерживаться. Но проекты очень интересные, технологии самые современные. Большой плюс в том, что компания инвестирует в образование сотрудников. Минус - не всегда понятная коммуникация между отделами.",
        rating: 4,
        author: "Инженер",
        date: "5 февраля 2025",
        helpfulCount: 18,
        notHelpfulCount: 3,
        comments: 2,
      },
      {
        title: "Есть над чем работать",
        body: "Компания хорошая, но есть ряд проблем в организационной структуре. Часто меняются приоритеты, что усложняет планирование. Зарплата конкурентная, но нагрузка порой высокая. Баланс работы и личной жизни страдает.",
        rating: 3,
        author: "Менеджер проектов",
        date: "25 января 2025",
        helpfulCount: 14,
        notHelpfulCount: 5,
        comments: 7,
      },
      {
        title: "Разочарован условиями",
        body: "Обещали одно, на деле получилось другое. Много переработок, компенсация не соответствует затраченным усилиям. Корпоративная культура оставляет желать лучшего. Руководство не всегда прислушивается к сотрудникам.",
        rating: 2,
        author: "Бывший сотрудник",
        date: "10 декабря 2024",
        helpfulCount: 22,
        notHelpfulCount: 4,
        comments: 9,
      },
    ];

    return extraReviews;
  }

  return (
    <Box className={styles.companyReviews}>
      {company ? (
        <>
          <Box className={styles.header}>
            <Typography variant="h4" className={styles.title}>
              Отзывы о компании {company.name}
            </Typography>
            <Box className={styles.stats}>
              <Box className={styles.ratingOverview}>
                <Typography variant="h3" className={styles.ratingValue}>
                  {company.rating.toFixed(1)}
                </Typography>
                <Rating
                  value={company.rating}
                  precision={0.1}
                  readOnly
                  className={styles.ratingStars}
                />
                <Typography variant="body2" className={styles.ratingCount}>
                  На основе {allReviews.length} отзывов
                </Typography>
              </Box>

              <Box className={styles.ratingDistribution}>
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = allReviews.filter(
                    (review) => Math.round(review.rating) === rating
                  ).length;
                  const percentage = (count / allReviews.length) * 100;

                  return (
                    <Box key={rating} className={styles.ratingBar}>
                      <Typography
                        variant="body2"
                        className={styles.ratingLabel}
                      >
                        {rating} ★
                      </Typography>
                      <Box className={styles.progressBar}>
                        <Box
                          className={styles.progressFill}
                          style={{ width: `${percentage}%` }}
                        />
                      </Box>
                      <Typography
                        variant="body2"
                        className={styles.ratingCount}
                      >
                        {count}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>

          <Box className={styles.filters}>
            <Box className={styles.filterItem}>
              <Typography variant="body2" className={styles.filterLabel}>
                Сортировать по:
              </Typography>
              <Select
                value={sortOption}
                onValueChange={(value) => setSortOption(value)}
              >
                <SelectTrigger className={styles.selectTrigger}>
                  <SelectValue placeholder="Сортировать" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Самые новые</SelectItem>
                  <SelectItem value="highest">Самый высокий рейтинг</SelectItem>
                  <SelectItem value="lowest">Самый низкий рейтинг</SelectItem>
                </SelectContent>
              </Select>
            </Box>

            <Box className={styles.filterItem}>
              <Typography variant="body2" className={styles.filterLabel}>
                Фильтр по рейтингу:
              </Typography>
              <Select
                value={ratingFilter}
                onValueChange={(value) => setRatingFilter(value)}
              >
                <SelectTrigger className={styles.selectTrigger}>
                  <SelectValue placeholder="Все рейтинги" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все рейтинги</SelectItem>
                  <SelectItem value="5">5 звезд</SelectItem>
                  <SelectItem value="4">4 звезды</SelectItem>
                  <SelectItem value="3">3 звезды</SelectItem>
                  <SelectItem value="2">2 звезды</SelectItem>
                  <SelectItem value="1">1 звезда</SelectItem>
                </SelectContent>
              </Select>
            </Box>
          </Box>

          <Box className={styles.reviewsList}>
            {currentReviews.length > 0 ? (
              currentReviews.map((review, index) => (
                <Card key={index} className={styles.reviewCard}>
                  <CardContent className={styles.reviewContent}>
                    <Box className={styles.reviewHeader}>
                      <Box className={styles.reviewAuthor}>
                        <Avatar className={styles.avatar}>
                          {review.author.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography
                            variant="subtitle1"
                            className={styles.authorName}
                          >
                            {review.author}
                          </Typography>
                          <Typography
                            variant="body2"
                            className={styles.reviewDate}
                          >
                            {review.date || "1 марта 2025"}
                          </Typography>
                        </Box>
                      </Box>
                      <Box className={styles.reviewRating}>
                        <Rating value={review.rating} readOnly size="small" />
                        <Typography
                          variant="body2"
                          className={styles.ratingText}
                        >
                          {review.rating.toFixed(1)}
                        </Typography>
                      </Box>
                    </Box>

                    <Typography variant="h6" className={styles.reviewTitle}>
                      {review.title}
                    </Typography>

                    <Typography variant="body1" className={styles.reviewBody}>
                      {review.body}
                    </Typography>

                    <Box className={styles.reviewActions}>
                      <Box className={styles.helpfulAction}>
                        <Box className={styles.actionButton}>
                          <ThumbsUp size={18} />
                          <Typography variant="body2">
                            {review.helpfulCount || "0"} Полезно
                          </Typography>
                        </Box>
                        <Box className={styles.actionButton}>
                          <ThumbsDown size={18} />
                          <Typography variant="body2">
                            {review.notHelpfulCount || "0"} Не полезно
                          </Typography>
                        </Box>
                      </Box>

                      <Box className={styles.commentAction}>
                        <MessageSquare size={18} />
                        <Typography variant="body2">
                          {review.comments || "0"} Комментарии
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography variant="body1" className={styles.noReviews}>
                По заданным критериям отзывов не найдено.
              </Typography>
            )}
          </Box>

          {totalPages > 1 && (
            <Box className={styles.pagination}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(e, value) => setPage(value)}
                color="primary"
              />
            </Box>
          )}
        </>
      ) : (
        <Typography variant="h5" className={styles.notFound}>
          Компания не найдена
        </Typography>
      )}
    </Box>
  );
};

export default CompanyReviewsPage;
