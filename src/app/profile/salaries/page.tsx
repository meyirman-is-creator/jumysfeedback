// src/app/profile/salaries/page.tsx
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
import { Plus, Edit2, Trash2, Eye, CheckCircle, XCircle } from "lucide-react";
import styles from "./SalariesPage.module.scss";

// Mock data
const mockSalaries = [
  {
    id: "1",
    companyName: "Kaspi.kz",
    position: "Full Stack",
    amount: "5000 USD/мес",
    currency: "USD",
    experience: "Mid-Senior",
    date: "02/02/25",
    status: "Одобрено",
    verified: true,
  },
  {
    id: "2",
    companyName: "Kaspi.kz",
    position: "Data Scientist",
    amount: "4500 USD/мес",
    currency: "USD",
    experience: "Mid",
    date: "02/02/25",
    status: "Новый",
    verified: false,
  },
  {
    id: "3",
    companyName: "Kaspi.kz",
    position: "QA Engineer",
    amount: "3800 USD/мес",
    currency: "USD",
    experience: "Entry-Mid",
    date: "02/02/25",
    status: "Отказано",
    verified: true,
  },
];

// For admin view
const allUserSalaries = [
  ...mockSalaries,
  {
    id: "4",
    companyName: "Google",
    position: "Software Engineer",
    amount: "6000 USD/мес",
    currency: "USD",
    experience: "Mid-Senior",
    date: "02/02/25",
    status: "Новый",
    verified: true,
    userName: "Jane Smith",
  },
  {
    id: "5",
    companyName: "Microsoft",
    position: "DevOps Engineer",
    amount: "5500 USD/мес",
    currency: "USD",
    experience: "Mid",
    date: "01/02/25",
    status: "Новый",
    verified: false,
    userName: "Alex Johnson",
  },
];

export default function SalariesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedSalaryId, setSelectedSalaryId] = useState<string | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedSalary, setSelectedSalary] = useState<any>(null);

  // Role check (replace with actual auth logic)
  const isAdmin = true;

  const statusFilters = ["Все", "Новые", "Одобренные", "Отклоненные"];
  const [currentStatus, setCurrentStatus] = useState("Все");

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleAddSalary = () => {
    router.push("/add/salary");
  };

  const handleEditSalary = (salaryId: string) => {
    router.push(`/add/salary?id=${salaryId}`);
  };

  const handleDeleteSalary = (salaryId: string) => {
    setSelectedSalaryId(salaryId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    // Actual delete logic would go here
    setDeleteDialogOpen(false);
    setSelectedSalaryId(null);
  };

  const handleViewDetails = (salary: any) => {
    setSelectedSalary(salary);
    setDetailsDialogOpen(true);
  };

  const handleStatusChange = (status: string) => {
    setCurrentStatus(status);
  };

  const handleModerate = (salaryId: string, action: "approve" | "reject") => {
    // Moderation logic would go here
    console.log(`${action} salary ${salaryId}`);
  };

  // Filter salaries based on selected status tab and user role
  const getFilteredSalaries = () => {
    const salaries = isAdmin ? allUserSalaries : mockSalaries;

    if (currentStatus === "Все") return salaries;

    const statusMap: Record<string, string> = {
      Новые: "Новый",
      Одобренные: "Одобрено",
      Отклоненные: "Отказано",
    };

    return salaries.filter(
      (salary) => salary.status === statusMap[currentStatus]
    );
  };

  return (
    <div className={styles.salariesPage}>
      <Box className={styles.header}>
        <Typography variant="h4" className={styles.title}>
          {isAdmin ? "Модерация зарплат" : "Мои зарплаты"}
        </Typography>

        {!isAdmin && (
          <Button
            variant="contained"
            startIcon={<Plus size={18} />}
            className={styles.addButton}
            onClick={handleAddSalary}
          >
            Добавить зарплату
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
              <TableCell>Зарплата</TableCell>
              <TableCell>Опыт</TableCell>
              <TableCell>Дата</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell align="right">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getFilteredSalaries().map((salary) => (
              <TableRow key={salary.id} className={styles.tableRow}>
                <TableCell>
                  <Box className={styles.companyCell}>
                    <Typography variant="body2">
                      {salary.companyName}
                    </Typography>
                    {salary.verified && (
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
                <TableCell>{salary.position}</TableCell>
                <TableCell className={styles.amountCell}>
                  {salary.amount}
                </TableCell>
                <TableCell>{salary.experience}</TableCell>
                <TableCell>{salary.date}</TableCell>
                <TableCell>
                  <Chip
                    label={salary.status}
                    className={`${styles.statusChip} ${
                      salary.status === "Одобрено"
                        ? styles.approvedChip
                        : salary.status === "Отказано"
                        ? styles.rejectedChip
                        : styles.pendingChip
                    }`}
                  />
                </TableCell>
                <TableCell align="right">
                  <Box className={styles.actionButtons}>
                    <Tooltip title="Просмотреть">
                      <IconButton
                        size="small"
                        className={styles.actionButton}
                        onClick={() => handleViewDetails(salary)}
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
                            onClick={() => handleEditSalary(salary.id)}
                          >
                            <Edit2 size={18} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Удалить">
                          <IconButton
                            size="small"
                            className={styles.actionButton}
                            onClick={() => handleDeleteSalary(salary.id)}
                          >
                            <Trash2 size={18} />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}

                    {isAdmin && salary.status === "Новый" && (
                      <>
                        <Tooltip title="Одобрить">
                          <IconButton
                            size="small"
                            className={`${styles.actionButton} ${styles.approveButton}`}
                            onClick={() => handleModerate(salary.id, "approve")}
                          >
                            <CheckCircle size={18} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Отклонить">
                          <IconButton
                            size="small"
                            className={`${styles.actionButton} ${styles.rejectButton}`}
                            onClick={() => handleModerate(salary.id, "reject")}
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
        <DialogTitle>Удаление записи о зарплате</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Вы уверены, что хотите удалить эту запись о зарплате? Это действие
            нельзя будет отменить.
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

      {/* Salary details dialog */}
      <Dialog
        open={detailsDialogOpen}
        onClose={() => setDetailsDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        {selectedSalary && (
          <>
            <DialogTitle className={styles.detailsTitle}>
              Детали зарплаты
            </DialogTitle>
            <DialogContent>
              <Box className={styles.detailsContent}>
                <Box className={styles.detailsHeader}>
                  <Typography
                    variant="subtitle1"
                    className={styles.detailsCompany}
                  >
                    {selectedSalary.companyName}
                  </Typography>
                  <Typography
                    variant="body2"
                    className={styles.detailsPosition}
                  >
                    {selectedSalary.position}
                  </Typography>
                </Box>

                <Box className={styles.detailsInfo}>
                  <Box className={styles.infoItem}>
                    <Typography variant="body2" className={styles.infoLabel}>
                      Зарплата:
                    </Typography>
                    <Typography variant="body1" className={styles.infoValue}>
                      {selectedSalary.amount}
                    </Typography>
                  </Box>

                  <Box className={styles.infoItem}>
                    <Typography variant="body2" className={styles.infoLabel}>
                      Опыт:
                    </Typography>
                    <Typography variant="body1" className={styles.infoValue}>
                      {selectedSalary.experience}
                    </Typography>
                  </Box>

                  <Box className={styles.infoItem}>
                    <Typography variant="body2" className={styles.infoLabel}>
                      Валюта:
                    </Typography>
                    <Typography variant="body1" className={styles.infoValue}>
                      {selectedSalary.currency}
                    </Typography>
                  </Box>

                  <Box className={styles.infoItem}>
                    <Typography variant="body2" className={styles.infoLabel}>
                      Статус:
                    </Typography>
                    <Chip
                      label={selectedSalary.status}
                      size="small"
                      className={`${styles.statusChip} ${
                        selectedSalary.status === "Одобрено"
                          ? styles.approvedChip
                          : selectedSalary.status === "Отказано"
                          ? styles.rejectedChip
                          : styles.pendingChip
                      }`}
                    />
                  </Box>

                  <Box className={styles.infoItem}>
                    <Typography variant="body2" className={styles.infoLabel}>
                      Дата добавления:
                    </Typography>
                    <Typography variant="body1" className={styles.infoValue}>
                      {selectedSalary.date}
                    </Typography>
                  </Box>
                </Box>
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
