"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Typography, Box, Grid, Avatar, Rating } from "@mui/material";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react";
import { useCompanyDetails } from "@/hooks/useCompanyDetails";
import { Skeleton } from "@/components/ui/skeleton";
import styles from "./CompanyReviewsPage.module.scss";

const CompanyReviewsPage = () => {
  const { companyId } = useParams() as { companyId: string };

  // State for filters and pagination
  const [sortOption, setSortOption] = useState<"newest" | "highest" | "lowest">(
    "newest"
  );
  const [ratingFilter, setRatingFilter] = useState("all");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  // Get company reviews from our hook
  const { fetchReviews, loading, error } = useCompanyDetails();

  // Use our hook to get cached data
  const { getReviews } = useCompanyDetails();

  // Fetch reviews on mount and when filters change
  useEffect(() => {
    if (companyId) {
      fetchReviews({
        companyId,
        ratingFilter,
        sort: sortOption,
        page,
        pageSize,
      });
    }
  }, [companyId, ratingFilter, sortOption, page, pageSize, fetchReviews]);

  // Get the cached data for current filters
  const reviewData = getReviews({
    companyId,
    ratingFilter,
    sort: sortOption,
    page,
    pageSize,
  });

  // Handle filter changes
  const handleRatingFilterChange = (value: string) => {
    setRatingFilter(value);
    setPage(0); // Reset to first page when filter changes
  };

  const handleSortChange = (value: "newest" | "highest" | "lowest") => {
    setSortOption(value);
    setPage(0); // Reset to first page when sort changes
  };

  const handleChangePage = (pageNumber: number) => {
    setPage(pageNumber);
  };

  // Filter reviews to current page
  const currentReviews = reviewData ? reviewData.reviews : [];

  // Calculate total pages
  const totalPages = reviewData ? reviewData.totalPages : 0;

  if (error.reviews) {
    return (
      <Box className={styles.notFound}>
        <Typography variant="h5">Ошибка при загрузке отзывов</Typography>
        <Typography>{error.reviews}</Typography>
      </Box>
    );
  }

  return (
    <Box className={styles.companyReviews}>
      {loading.reviews ? (
        <Box className={styles.header}>
          <Skeleton className="h-10 w-80 mb-4" />
          <Box className={styles.stats}>
            <Box className={styles.ratingOverview}>
              <Skeleton className="h-12 w-12 mb-2" />
              <Skeleton className="h-6 w-36 mb-2" />
              <Skeleton className="h-4 w-24" />
            </Box>

            <Box className={styles.ratingDistribution} sx={{ flexGrow: 1 }}>
              {[1, 2, 3, 4, 5].map((rating) => (
                <Box key={rating} className={styles.ratingBar}>
                  <Typography variant="body2" className={styles.ratingLabel}>
                    {rating} ★
                  </Typography>
                  <Box className={styles.progressBar}>
                    <Skeleton className="h-full w-full" />
                  </Box>
                  <Typography variant="body2" className={styles.ratingCount}>
                    0
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      ) : reviewData ? (
        <Box className={styles.header}>
          <Typography variant="h4" className={styles.title}>
            Отзывы о компании {reviewData.companyName}
          </Typography>
          <Box className={styles.stats}>
            <Box className={styles.ratingOverview}>
              <Typography variant="h3" className={styles.ratingValue}>
                {reviewData.averageRating.toFixed(1)}
              </Typography>
              <Rating
                value={reviewData.averageRating}
                precision={0.1}
                readOnly
                className={styles.ratingStars}
              />
              <Typography variant="body2" className={styles.ratingCount}>
                На основе {reviewData.totalReviews} отзывов
              </Typography>
            </Box>

            <Box className={styles.ratingDistribution}>
              {[5, 4, 3, 2, 1].map((rating) => {
                const count =
                  reviewData.ratingDistribution[rating.toString()] || 0;
                const percentage =
                  reviewData.totalReviews > 0
                    ? (count / reviewData.totalReviews) * 100
                    : 0;

                return (
                  <Box key={rating} className={styles.ratingBar}>
                    <Typography variant="body2" className={styles.ratingLabel}>
                      {rating} ★
                    </Typography>
                    <Box className={styles.progressBar}>
                      <Box
                        className={styles.progressFill}
                        style={{ width: `${percentage}%` }}
                      />
                    </Box>
                    <Typography variant="body2" className={styles.ratingCount}>
                      {count}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
      ) : null}

      <Box className={styles.filters}>
        <Box className={styles.filterItem}>
          <Typography variant="body2" className={styles.filterLabel}>
            Сортировать по:
          </Typography>
          <Select
            value={sortOption}
            onValueChange={(value: "newest" | "highest" | "lowest") =>
              handleSortChange(value)
            }
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
            onValueChange={(value) => handleRatingFilterChange(value)}
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
        {loading.reviews ? (
          // Skeleton loading state
          Array(3)
            .fill(0)
            .map((_, index) => (
              <Card key={index} className={styles.reviewCard}>
                <CardContent>
                  <Box className={styles.reviewHeader}>
                    <Box className={styles.reviewAuthor}>
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <Box>
                        <Skeleton className="h-5 w-32 mb-1" />
                        <Skeleton className="h-4 w-24" />
                      </Box>
                    </Box>
                    <Skeleton className="h-5 w-28" />
                  </Box>
                  <Skeleton className="h-6 w-64 my-2" />
                  <Skeleton className="h-4 w-full my-1" />
                  <Skeleton className="h-4 w-full my-1" />
                  <Skeleton className="h-4 w-3/4 my-1" />
                  <Box className={styles.reviewActions} sx={{ mt: 2 }}>
                    <Skeleton className="h-4 w-36" />
                    <Skeleton className="h-4 w-32" />
                  </Box>
                </CardContent>
              </Card>
            ))
        ) : currentReviews.length > 0 ? (
          currentReviews.map((review, index) => (
            <Card key={index} className={styles.reviewCard}>
              <CardContent className={styles.reviewContent}>
                <Box className={styles.reviewHeader}>
                  <Box className={styles.reviewAuthor}>
                    <Avatar className={styles.avatar}>
                      {review.author ? review.author.charAt(0) : "A"}
                    </Avatar>
                    <Box>
                      <Typography
                        variant="subtitle1"
                        className={styles.authorName}
                      >
                        {review.author || "Аноним"}
                      </Typography>
                      <Typography variant="body2" className={styles.reviewDate}>
                        {review.date}
                      </Typography>
                    </Box>
                  </Box>
                  <Box className={styles.reviewRating}>
                    <Rating value={review.rating} readOnly size="small" />
                    <Typography variant="body2" className={styles.ratingText}>
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

                {review.pros && (
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Плюсы:</strong> {review.pros}
                  </Typography>
                )}

                {review.cons && (
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Минусы:</strong> {review.cons}
                  </Typography>
                )}

                {review.advice && (
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    <strong>Совет руководству:</strong> {review.advice}
                  </Typography>
                )}

                <Box className={styles.reviewActions}>
                  <Box className={styles.helpfulAction}>
                    <Box className={styles.actionButton}>
                      <ThumbsUp size={18} />
                      <Typography variant="body2">
                        {review.helpfulCount} Полезно
                      </Typography>
                    </Box>
                    <Box className={styles.actionButton}>
                      <ThumbsDown size={18} />
                      <Typography variant="body2">
                        {review.notHelpfulCount} Не полезно
                      </Typography>
                    </Box>
                  </Box>

                  <Box className={styles.commentAction}>
                    <MessageSquare size={18} />
                    <Typography variant="body2">
                      {review.commentsCount} Комментарии
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
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i}
              variant={page === i ? "default" : "outline"}
              size="sm"
              onClick={() => handleChangePage(i)}
              className={styles.paginationBtn}
              data-state={page === i ? "on" : "off"}
            >
              {i + 1}
            </Button>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default CompanyReviewsPage;
