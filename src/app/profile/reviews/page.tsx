// src/app/profile/reviews/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Typography,
  Box,
  Tabs,
  Tab,
  Paper,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  MessageCircle,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import styles from "./ReviewsPage.module.scss";

// Mock data
const mockReviews = [
  {
    id: "1",
    companyName: "Kaspi.kz",
    position: "Full Stack",
    rating: 4.0,
    title: "Lorem ipsum Lorem ipsum",
    content: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
    date: "02/02/25",
    status: "Одобрено",
    hasComment: false,
    verified: true,
  },
  {
    id: "2",
    companyName: "Kaspi.kz",
    position: "Full Stack",
    rating: 3.0,
    title: "Lorem ipsum Lorem ipsum",
    content: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
    date: "02/02/25",
    status: "Новый",
    hasComment: false,
    verified: false,
  },
  {
    id: "3",
    companyName: "Kaspi.kz",
    position: "Full Stack",
    rating: 3.0,
    title: "Lorem ipsum Lorem ipsum",
    content: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
    date: "02/02/25",
    status: "Отказано",
    hasComment: true,
    verified: true,
  },
];

// For admin view
const allUserReviews = [
  ...mockReviews,
  {
    id: "4",
    companyName: "Google",
    position: "Software Engineer",
    rating: 4.5,
    title: "Great work environment",
    content: "Excellent benefits and culture",
    date: "02/02/25",
    status: "Новый",
    hasComment: false,
    verified: true,
    userName: "Jane Smith",
  },
  {
    id: "5",
    companyName: "Microsoft",
    position: "DevOps Engineer",
    rating: 3.5,
    title: "Good but challenging",
    content: "High expectations but good compensation",
    date: "01/02/25",
    status: "Новый",
    hasComment: false,
    verified: false,
    userName: "Alex Johnson",
  },
];

export default function ReviewsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);
  const [aiDialogOpen, setAiDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<any>(null);

  // Role check (replace with actual auth logic)
  const isAdmin = true;

  const statusFilters = ["Все", "Новые", "Одобренные", "Отклоненные"];
  const [currentStatus, setCurrentStatus] = useState("Все");

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleAddReview = () => {
    router.push("/add/review");
  };

  const handleEditReview = (reviewId: string) => {
    router.push(`/add/review?id=${reviewId}`);
  };

  const handleDeleteReview = (reviewId: string) => {
    setSelectedReviewId(reviewId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    // Actual delete logic would go here
    setDeleteDialogOpen(false);
    setSelectedReviewId(null);
  };

  const handleViewDetails = (review: any) => {
    setSelectedReview(review);
    setDetailsDialogOpen(true);
  };

  const handleStatusChange = (status: string) => {
    setCurrentStatus(status);
  };

  const handleModerate = (reviewId: string, action: "approve" | "reject") => {
    // Moderation logic would go here
    console.log(`${action} review ${reviewId}`);

    if (action === "reject") {
      const review = allUserReviews.find((r) => r.id === reviewId);
      setSelectedReview(review);
      setAiDialogOpen(true);
    }
  };

  // Filter reviews based on selected status tab and user role
  const getFilteredReviews = () => {
    const reviews = isAdmin ? allUserReviews : mockReviews;

    if (currentStatus === "Все") return reviews;

    const statusMap: Record<string, string> = {
      Новые: "Новый",
      Одобренные: "Одобрено",
      Отклоненные: "Отказано",
    };

    return reviews.filter(
      (review) => review.status === statusMap[currentStatus]
    );
  };

  return (
    <div className={styles.reviewsPage}>
      <Box className={styles.header}>
        <Typography variant="h4" className={styles.title}>
          {isAdmin ? "Модерация отзывов" : "Мои отзывы"}
        </Typography>

        {!isAdmin && (
          <Button
            variant="contained"
            startIcon={<Plus size={18} />}
            className={styles.addButton}
            onClick={handleAddReview}
          >
            Добавить отзыв
          </Button>
        )}
      </Box>

      <Box className={styles.filters}>
        <Tabs
          value={statusFilters.indexOf(currentStatus)}
          onChange={(e, value) => handleStatusChange(statusFilters[value])}
          className={styles.tabs}
        >
          {statusFilters.map((status) => (
            <Tab key={status} label={status} className={styles.tab} />
          ))}
        </Tabs>
      </Box>

      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table>
          <TableHead className={styles.tableHead}>
            <TableRow>
              <TableCell>Компания</TableCell>
              <TableCell>Должность</TableCell>
              <TableCell>Рейтинг</TableCell>
              <TableCell>Заголовок</TableCell>
              <TableCell>Дата</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell align="right">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getFilteredReviews().map((review) => (
              <TableRow key={review.id} className={styles.tableRow}>
                <TableCell>
                  <Box className={styles.companyCell}>
                    <Typography variant="body2">
                      {review.companyName}
                    </Typography>
                    {review.verified && (
                      <Tooltip title="Верифицировано">
                        <Chip
                          label="Verified"
                          size="small"
                          className={styles.verifiedChip}
                        />
                      </Tooltip>
                    )}
                  </Box>
                </TableCell>
                <TableCell>{review.position}</TableCell>
                <TableCell>
                  <Box className={styles.ratingCell}>
                    <Typography className={styles.rating}>
                      {review.rating}
                    </Typography>
                    <Box className={styles.starRating}>
                      {/* Simple star rating visualization */}
                      {"★".repeat(Math.floor(review.rating))}
                      {"☆".repeat(5 - Math.floor(review.rating))}
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography className={styles.reviewTitle} noWrap>
                    {review.title}
                  </Typography>
                </TableCell>
                <TableCell>{review.date}</TableCell>
                <TableCell>
                  <Chip
                    label={review.status}
                    className={`${styles.statusChip} ${
                      review.status === "Одобрено"
                        ? styles.approvedChip
                        : review.status === "Отказано"
                        ? styles.rejectedChip
                        : styles.pendingChip
                    }`}
                  />
                  {review.hasComment && (
                    <Tooltip title="Есть комментарий от модератора">
                      <IconButton size="small" className={styles.commentIcon}>
                        <MessageCircle size={16} />
                      </IconButton>
                    </Tooltip>
                  )}
                </TableCell>
                <TableCell align="right">
                  <Box className={styles.actionButtons}>
                    <Tooltip title="Просмотреть">
                      <IconButton
                        size="small"
                        className={styles.actionButton}
                        onClick={() => handleViewDetails(review)}
                      >
                        <Eye size={18} />
                      </IconButton>
                    </Tooltip>

                    {!isAdmin && (
                      <>
                        <Tooltip title="Редактировать">
                          <IconButton
                            size="small"
                            className={styles.actionButton}
                            onClick={() => handleEditReview(review.id)}
                          >
                            <Edit2 size={18} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Удалить">
                          <IconButton
                            size="small"
                            className={styles.actionButton}
                            onClick={() => handleDeleteReview(review.id)}
                          >
                            <Trash2 size={18} />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}

                    {isAdmin && review.status === "Новый" && (
                      <>
                        <Tooltip title="Одобрить">
                          <IconButton
                            size="small"
                            className={`${styles.actionButton} ${styles.approveButton}`}
                            onClick={() => handleModerate(review.id, "approve")}
                          >
                            <CheckCircle size={18} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Отклонить">
                          <IconButton
                            size="small"
                            className={`${styles.actionButton} ${styles.rejectButton}`}
                            onClick={() => handleModerate(review.id, "reject")}
                          >
                            <XCircle size={18} />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete confirmation dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Удаление отзыва</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Вы уверены, что хотите удалить этот отзыв? Это действие нельзя будет
            отменить.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            className={styles.cancelButton}
          >
            Отмена
          </Button>
          <Button
            onClick={confirmDelete}
            className={styles.deleteButton}
            autoFocus
          >
            Удалить
          </Button>
        </DialogActions>
      </Dialog>

      {/* AI moderation suggestion dialog */}
      <Dialog
        open={aiDialogOpen}
        onClose={() => setAiDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle className={styles.aiDialogTitle}>
          <AlertCircle size={20} className={styles.aiIcon} />
          Обнаружена нежелательная лексика!
        </DialogTitle>
        <DialogContent>
          <Box className={styles.aiContent}>
            <Box className={styles.aiOriginal}>
              <Typography variant="body1">
                «Это место работы — полный бардак! Руководству наплевать на
                сотрудников, а нагрузка безумная».
              </Typography>
            </Box>
            <Box className={styles.aiSuggestion}>
              <Typography variant="body1" className={styles.aiSuggestionText}>
                «Это рабочее место крайне{" "}
                <span className={styles.highlight}>неорганизованно</span>.
                Руководство не заботится о благополучии сотрудников, а рабочая
                нагрузка безумная».
              </Typography>
            </Box>
          </Box>
          <Box className={styles.aiActions}>
            <Button
              className={styles.approveAiButton}
              onClick={() => setAiDialogOpen(false)}
            >
              Одобренно
            </Button>
            <Button
              className={styles.rejectAiButton}
              onClick={() => setAiDialogOpen(false)}
            >
              Отмена
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Review details dialog */}
      <Dialog
        open={detailsDialogOpen}
        onClose={() => setDetailsDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedReview && (
          <>
            <DialogTitle className={styles.detailsTitle}>
              {selectedReview.title}
            </DialogTitle>
            <DialogContent>
              <Box className={styles.detailsContent}>
                <Box className={styles.detailsHeader}>
                  <Typography
                    variant="subtitle1"
                    className={styles.detailsCompany}
                  >
                    {selectedReview.companyName}
                  </Typography>
                  <Typography
                    variant="body2"
                    className={styles.detailsPosition}
                  >
                    {selectedReview.position}
                  </Typography>
                  <Box className={styles.detailsRating}>
                    <Typography variant="body2">Общая оценка:</Typography>
                    <Typography variant="body1" className={styles.ratingValue}>
                      {selectedReview.rating} / 5
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="body1" className={styles.detailsText}>
                  {selectedReview.content}
                </Typography>

                {selectedReview.hasComment && (
                  <Box className={styles.moderatorComment}>
                    <Typography
                      variant="subtitle2"
                      className={styles.commentTitle}
                    >
                      Комментарий модератора:
                    </Typography>
                    <Typography variant="body2" className={styles.commentText}>
                      Пожалуйста, воздержитесь от использования резких
                      выражений. Отредактируйте отзыв для публикации.
                    </Typography>
                  </Box>
                )}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDetailsDialogOpen(false)}>
                Закрыть
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
}
