// src/app/profile/add/review/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
  Checkbox,
  Rating,
  Stepper,
  Step,
  StepLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  Divider,
} from "@mui/material";
import { ChevronLeft, ChevronRight, Save, X } from "lucide-react";
import styles from "./AddReviewPage.module.scss";
import './AddReviewPage.scss'
export default function AddReviewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEditing = searchParams.has("id");

  // State for stepper
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    "Компания и должность",
    "Ваш опыт",
    "Детали отзыва",
    "Подтверждение",
  ];

  // Form state
  const [formData, setFormData] = useState({
    companyName: "",
    position: "",
    employmentStatus: "current", // 'current' or 'former'
    employmentType: "full-time", // 'full-time', 'part-time', 'contract', etc.
    overallRating: 3,
    careerOpportunities: 3,
    workLifeBalance: 3,
    compensation: 3,
    jobSecurity: 3,
    management: 3,
    title: "",
    pros: "",
    cons: "",
    advice: "",
    recommendToFriend: "yes",
    anonymous: true,
    confirmTruthful: false,
  });

  // Form validation
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 0:
        if (!formData.companyName.trim()) {
          newErrors.companyName = "Укажите название компании";
        }
        if (!formData.position.trim()) {
          newErrors.position = "Укажите должность";
        }
        break;
      case 2:
        if (!formData.title.trim()) {
          newErrors.title = "Добавьте заголовок отзыва";
        }
        if (!formData.pros.trim()) {
          newErrors.pros = "Укажите хотя бы один плюс работы";
        }
        if (!formData.cons.trim()) {
          newErrors.cons = "Укажите хотя бы один минус работы";
        }
        break;
      case 3:
        if (!formData.confirmTruthful) {
          newErrors.confirmTruthful =
            "Необходимо подтвердить достоверность информации";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prev) => ({ ...prev, [name]: value }));

      // Clear error when field is changed
      if (errors[name]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));

    // Clear error when field is changed
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleRatingChange = (name: string, value: number | null) => {
    setFormData((prev) => ({ ...prev, [name]: value || 0 }));
  };

  const handleSubmit = () => {
    if (validateStep(activeStep)) {
      // Handle submission logic here
      console.log("Form submitted:", formData);
      router.push("/reviews");
    }
  };

  const handleCancel = () => {
    router.back();
  };

  // Render steps
  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box className={styles.stepContent}>
            <Typography variant="h6" className={styles.stepTitle}>
              Информация о компании и должности
            </Typography>

            <FormControl fullWidth className={styles.formField}>
              <InputLabel id="company-label">Компания *</InputLabel>
              <Select
                labelId="company-label"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                label="Компания *"
                error={!!errors.companyName}
              >
                <MenuItem value="Kaspi.kz">Kaspi.kz</MenuItem>
                <MenuItem value="Google">Google</MenuItem>
                <MenuItem value="Microsoft">Microsoft</MenuItem>
                <MenuItem value="Amazon">Amazon</MenuItem>
              </Select>
              {errors.companyName && (
                <FormHelperText error>{errors.companyName}</FormHelperText>
              )}
            </FormControl>

            <TextField
              label="Должность *"
              name="position"
              value={formData.position}
              onChange={handleChange}
              fullWidth
              className={styles.formField}
              error={!!errors.position}
              helperText={errors.position}
            />

            <FormControl component="fieldset" className={styles.formField}>
              <Typography variant="subtitle2" className={styles.fieldLabel}>
                Статус работы *
              </Typography>
              <RadioGroup
                name="employmentStatus"
                value={formData.employmentStatus}
                onChange={handleChange}
                row
              >
                <FormControlLabel
                  value="current"
                  control={<Radio />}
                  label="Текущий сотрудник"
                />
                <FormControlLabel
                  value="former"
                  control={<Radio />}
                  label="Бывший сотрудник"
                />
              </RadioGroup>
            </FormControl>

            <FormControl fullWidth className={styles.formField}>
              <InputLabel id="employment-type-label">Тип занятости</InputLabel>
              <Select
                labelId="employment-type-label"
                name="employmentType"
                value={formData.employmentType}
                onChange={handleChange}
                label="Тип занятости"
              >
                <MenuItem value="full-time">Полная занятость</MenuItem>
                <MenuItem value="part-time">Частичная занятость</MenuItem>
                <MenuItem value="contract">Контракт</MenuItem>
                <MenuItem value="internship">Стажировка</MenuItem>
                <MenuItem value="freelance">Фриланс</MenuItem>
              </Select>
            </FormControl>
          </Box>
        );
      case 1:
        return (
          <Box className={styles.stepContent}>
            <Typography variant="h6" className={styles.stepTitle}>
              Оцените свой опыт работы
            </Typography>

            <Box className={styles.ratingField}>
              <Typography variant="subtitle2" className={styles.ratingLabel}>
                Общая оценка *
              </Typography>
              <Rating
                name="overallRating"
                value={formData.overallRating}
                onChange={(event, newValue) =>
                  handleRatingChange("overallRating", newValue)
                }
                size="large"
                className={styles.ratingStars}
              />
            </Box>

            <Divider className={styles.divider} />

            <Typography variant="subtitle1" className={styles.sectionTitle}>
              Оцените по категориям
            </Typography>

            <Box className={styles.ratingField}>
              <Typography variant="subtitle2" className={styles.ratingLabel}>
                Карьерные возможности
              </Typography>
              <Rating
                name="careerOpportunities"
                value={formData.careerOpportunities}
                onChange={(event, newValue) =>
                  handleRatingChange("careerOpportunities", newValue)
                }
                size="medium"
                className={styles.ratingStars}
              />
            </Box>

            <Box className={styles.ratingField}>
              <Typography variant="subtitle2" className={styles.ratingLabel}>
                Баланс работы и личной жизни
              </Typography>
              <Rating
                name="workLifeBalance"
                value={formData.workLifeBalance}
                onChange={(event, newValue) =>
                  handleRatingChange("workLifeBalance", newValue)
                }
                size="medium"
                className={styles.ratingStars}
              />
            </Box>

            <Box className={styles.ratingField}>
              <Typography variant="subtitle2" className={styles.ratingLabel}>
                Компенсация и льготы
              </Typography>
              <Rating
                name="compensation"
                value={formData.compensation}
                onChange={(event, newValue) =>
                  handleRatingChange("compensation", newValue)
                }
                size="medium"
                className={styles.ratingStars}
              />
            </Box>

            <Box className={styles.ratingField}>
              <Typography variant="subtitle2" className={styles.ratingLabel}>
                Стабильность работы
              </Typography>
              <Rating
                name="jobSecurity"
                value={formData.jobSecurity}
                onChange={(event, newValue) =>
                  handleRatingChange("jobSecurity", newValue)
                }
                size="medium"
                className={styles.ratingStars}
              />
            </Box>

            <Box className={styles.ratingField}>
              <Typography variant="subtitle2" className={styles.ratingLabel}>
                Качество управления
              </Typography>
              <Rating
                name="management"
                value={formData.management}
                onChange={(event, newValue) =>
                  handleRatingChange("management", newValue)
                }
                size="medium"
                className={styles.ratingStars}
              />
            </Box>
          </Box>
        );
      case 2:
        return (
          <Box className={styles.stepContent}>
            <Typography variant="h6" className={styles.stepTitle}>
              Подробности вашего отзыва
            </Typography>

            <TextField
              label="Заголовок отзыва *"
              name="title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
              className={styles.formField}
              error={!!errors.title}
              helperText={errors.title}
              placeholder="Кратко опишите ваш опыт работы в компании"
            />

            <TextField
              label="Плюсы *"
              name="pros"
              value={formData.pros}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              className={styles.formField}
              error={!!errors.pros}
              helperText={errors.pros || "Что вам нравилось в компании?"}
            />

            <TextField
              label="Минусы *"
              name="cons"
              value={formData.cons}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              className={styles.formField}
              error={!!errors.cons}
              helperText={errors.cons || "Что можно было бы улучшить?"}
            />

            <TextField
              label="Советы руководству"
              name="advice"
              value={formData.advice}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
              className={styles.formField}
              helperText="Необязательно"
            />

            <FormControl component="fieldset" className={styles.formField}>
              <Typography variant="subtitle2" className={styles.fieldLabel}>
                Рекомендуете ли вы эту компанию?
              </Typography>
              <RadioGroup
                name="recommendToFriend"
                value={formData.recommendToFriend}
                onChange={handleChange}
                row
              >
                <FormControlLabel value="yes" control={<Radio />} label="Да" />
                <FormControlLabel value="no" control={<Radio />} label="Нет" />
              </RadioGroup>
            </FormControl>
          </Box>
        );
      case 3:
        return (
          <Box className={styles.stepContent}>
            <Typography variant="h6" className={styles.stepTitle}>
              Подтверждение и отправка
            </Typography>

            <Paper className={styles.reviewSummary}>
              <Typography variant="subtitle1" className={styles.summaryTitle}>
                Предварительный просмотр
              </Typography>

              <Box className={styles.summaryContent}>
                <Box className={styles.summaryHeader}>
                  <Typography variant="h6">{formData.title}</Typography>
                  <Box className={styles.summaryRating}>
                    <Rating
                      value={formData.overallRating}
                      readOnly
                      size="small"
                    />
                    <Typography variant="body2">
                      {formData.overallRating} / 5
                    </Typography>
                  </Box>
                </Box>

                <Box className={styles.summaryDetails}>
                  <Typography variant="body2" className={styles.summaryCompany}>
                    {formData.companyName} | {formData.position}
                  </Typography>
                  <Typography variant="body2" className={styles.summaryStatus}>
                    {formData.employmentStatus === "current"
                      ? "Текущий сотрудник"
                      : "Бывший сотрудник"}{" "}
                    |{" "}
                    {
                      {
                        "full-time": "Полная занятость",
                        "part-time": "Частичная занятость",
                        contract: "Контракт",
                        internship: "Стажировка",
                        freelance: "Фриланс",
                      }[formData.employmentType]
                    }
                  </Typography>
                </Box>

                <Box className={styles.summarySection}>
                  <Typography
                    variant="subtitle2"
                    className={styles.sectionTitle}
                  >
                    Плюсы
                  </Typography>
                  <Typography variant="body2">{formData.pros}</Typography>
                </Box>

                <Box className={styles.summarySection}>
                  <Typography
                    variant="subtitle2"
                    className={styles.sectionTitle}
                  >
                    Минусы
                  </Typography>
                  <Typography variant="body2">{formData.cons}</Typography>
                </Box>

                {formData.advice && (
                  <Box className={styles.summarySection}>
                    <Typography
                      variant="subtitle2"
                      className={styles.sectionTitle}
                    >
                      Советы руководству
                    </Typography>
                    <Typography variant="body2">{formData.advice}</Typography>
                  </Box>
                )}
              </Box>
            </Paper>

            <Box className={styles.confirmationOptions}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="anonymous"
                    checked={formData.anonymous}
                    onChange={handleCheckboxChange}
                  />
                }
                label="Оставить отзыв анонимно"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="confirmTruthful"
                    checked={formData.confirmTruthful}
                    onChange={handleCheckboxChange}
                    required
                  />
                }
                label="Я подтверждаю, что этот отзыв основан на моем личном опыте работы, и информация в нем достоверна"
              />
              {errors.confirmTruthful && (
                <FormHelperText error>{errors.confirmTruthful}</FormHelperText>
              )}
            </Box>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.addReviewPage}>
      <Box className={styles.header}>
        <Typography variant="h4" className={styles.title}>
          {isEditing ? "Редактирование отзыва" : "Добавление отзыва"}
        </Typography>
        <Typography variant="body1" className={styles.subtitle}>
          Ваш отзыв поможет другим соискателям принять осознанное решение о
          трудоустройстве
        </Typography>
      </Box>

      <Paper className={styles.formContainer}>
        <Stepper activeStep={activeStep} className={styles.stepper}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box className={styles.formContent}>
          {renderStepContent(activeStep)}
        </Box>

        <Box className={styles.formActions}>
          <Button
            onClick={handleCancel}
            className={styles.cancelButton}
            startIcon={<X size={18} />}
          >
            Отмена
          </Button>

          <Box className={styles.navigationButtons}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={styles.backButton}
              startIcon={<ChevronLeft size={18} />}
            >
              Назад
            </Button>

            {activeStep === steps.length - 1 ? (
              <Button
                onClick={handleSubmit}
                className={styles.submitButton}
                startIcon={<Save size={18} />}
              >
                {isEditing ? "Сохранить изменения" : "Отправить отзыв"}
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                className={styles.nextButton}
                endIcon={<ChevronRight size={18} />}
              >
                Далее
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </div>
  );
}
