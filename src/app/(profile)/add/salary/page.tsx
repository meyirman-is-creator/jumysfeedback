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
  Stepper,
  Step,
  StepLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  InputAdornment,
  Divider,
} from "@mui/material";
import { ChevronLeft, ChevronRight, Save, X } from "lucide-react";
import { SelectChangeEvent } from "@mui/material/Select";
import styles from "./AddSalaryPage.module.scss";
import "./AddSalaryPage.scss";

interface SalaryFormData {
  companyName: string;
  position: string;
  department: string;
  employmentStatus: "current" | "former";
  employmentType: "full-time" | "part-time" | "contract" | "internship" | "freelance";
  salary: string;
  currency: "USD" | "EUR" | "KZT" | "RUB";
  payPeriod: "monthly" | "yearly";
  bonuses: string;
  stockOptions: string;
  experience: "0-1" | "1-3" | "3-5" | "5-10" | "10+";
  location: string;
  anonymous: boolean;
  confirmTruthful: boolean;
}

export default function AddSalaryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEditing = searchParams.has("id");

  // State для stepper'а
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    "Компания и должность",
    "Информация о зарплате",
    "Дополнительно",
    "Подтверждение",
  ];

  // Состояние формы
  const [formData, setFormData] = useState<SalaryFormData>({
    companyName: "",
    position: "",
    department: "",
    employmentStatus: "current", // 'current' или 'former'
    employmentType: "full-time", // 'full-time', 'part-time', 'contract', 'internship', 'freelance'
    salary: "",
    currency: "USD",
    payPeriod: "monthly", // 'monthly' или 'yearly'
    bonuses: "",
    stockOptions: "",
    experience: "1-3", // '0-1', '1-3', '3-5', '5-10', '10+'
    location: "",
    anonymous: true,
    confirmTruthful: false,
  });

  // Состояние ошибок формы
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
      case 1:
        if (!formData.salary.trim()) {
          newErrors.salary = "Укажите размер базовой зарплаты";
        } else if (isNaN(Number(formData.salary))) {
          newErrors.salary = "Зарплата должна быть числом";
        }
        if (!formData.currency.trim()) {
          newErrors.currency = "Укажите валюту";
        }
        break;
      case 3:
        if (!formData.confirmTruthful) {
          newErrors.confirmTruthful = "Необходимо подтвердить достоверность информации";
        }
        break;
      default:
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

  // Универсальный обработчик для текстовых полей и Select
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prev) => ({ ...prev, [name]: value }));
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
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = () => {
    if (validateStep(activeStep)) {
      // Логика отправки данных
      console.log("Form submitted:", formData);
      router.push("/salaries");
    }
  };

  const handleCancel = () => {
    router.back();
  };

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

            <TextField
              label="Отдел/Департамент"
              name="department"
              value={formData.department}
              onChange={handleChange}
              fullWidth
              className={styles.formField}
              helperText="Необязательно"
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
              Данные о зарплате
            </Typography>

            <Box className={styles.salaryGroup}>
              <TextField
                label="Базовая зарплата *"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className={styles.salaryField}
                error={!!errors.salary}
                helperText={errors.salary}
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {formData.currency === "USD"
                        ? "$"
                        : formData.currency === "EUR"
                        ? "€"
                        : formData.currency === "KZT"
                        ? "₸"
                        : formData.currency === "RUB"
                        ? "₽"
                        : ""}
                    </InputAdornment>
                  ),
                }}
              />

              <FormControl className={styles.currencyField}>
                <InputLabel id="currency-label">Валюта *</InputLabel>
                <Select
                  labelId="currency-label"
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  label="Валюта *"
                  error={!!errors.currency}
                >
                  <MenuItem value="USD">USD</MenuItem>
                  <MenuItem value="EUR">EUR</MenuItem>
                  <MenuItem value="KZT">KZT</MenuItem>
                  <MenuItem value="RUB">RUB</MenuItem>
                </Select>
                {errors.currency && (
                  <FormHelperText error>{errors.currency}</FormHelperText>
                )}
              </FormControl>

              <FormControl className={styles.periodField}>
                <InputLabel id="period-label">Период</InputLabel>
                <Select
                  labelId="period-label"
                  name="payPeriod"
                  value={formData.payPeriod}
                  onChange={handleChange}
                  label="Период"
                >
                  <MenuItem value="monthly">в месяц</MenuItem>
                  <MenuItem value="yearly">в год</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Divider className={styles.divider} />

            <Typography variant="subtitle1" className={styles.sectionTitle}>
              Дополнительные выплаты
            </Typography>

            <TextField
              label="Бонусы и премии"
              name="bonuses"
              value={formData.bonuses}
              onChange={handleChange}
              fullWidth
              className={styles.formField}
              placeholder="Например: годовой бонус 15% от зарплаты"
              helperText="Необязательно"
            />

            <TextField
              label="Опционы и акции"
              name="stockOptions"
              value={formData.stockOptions}
              onChange={handleChange}
              fullWidth
              className={styles.formField}
              placeholder="Например: 100 RSU в год"
              helperText="Необязательно"
            />
          </Box>
        );
      case 2:
        return (
          <Box className={styles.stepContent}>
            <Typography variant="h6" className={styles.stepTitle}>
              Дополнительная информация
            </Typography>

            <FormControl fullWidth className={styles.formField}>
              <InputLabel id="experience-label">Опыт работы</InputLabel>
              <Select
                labelId="experience-label"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                label="Опыт работы"
              >
                <MenuItem value="0-1">Менее 1 года</MenuItem>
                <MenuItem value="1-3">1-3 года</MenuItem>
                <MenuItem value="3-5">3-5 лет</MenuItem>
                <MenuItem value="5-10">5-10 лет</MenuItem>
                <MenuItem value="10+">Более 10 лет</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Местоположение"
              name="location"
              value={formData.location}
              onChange={handleChange}
              fullWidth
              className={styles.formField}
              placeholder="Например: Алматы, Казахстан"
              helperText="Город и страна, где вы работаете"
            />
          </Box>
        );
      case 3:
        return (
          <Box className={styles.stepContent}>
            <Typography variant="h6" className={styles.stepTitle}>
              Подтверждение и отправка
            </Typography>

            <Paper className={styles.salarySummary}>
              <Typography variant="subtitle1" className={styles.summaryTitle}>
                Предварительный просмотр
              </Typography>

              <Box className={styles.summaryContent}>
                <Box className={styles.summaryHeader}>
                  <Typography variant="h6">{formData.position}</Typography>
                  <Typography variant="subtitle1" className={styles.summaryCompany}>
                    {formData.companyName}
                  </Typography>
                </Box>

                <Divider className={styles.summaryDivider} />

                <Box className={styles.summaryGrid}>
                  <Box className={styles.summaryItem}>
                    <Typography variant="body2" className={styles.summaryLabel}>
                      Базовая зарплата:
                    </Typography>
                    <Typography variant="body1" className={styles.summaryValue}>
                      {formData.currency === "USD"
                        ? "$"
                        : formData.currency === "EUR"
                        ? "€"
                        : formData.currency === "KZT"
                        ? "₸"
                        : formData.currency === "RUB"
                        ? "₽"
                        : ""}
                      {formData.salary}{" "}
                      {formData.payPeriod === "monthly" ? "в месяц" : "в год"}
                    </Typography>
                  </Box>

                  {formData.bonuses && (
                    <Box className={styles.summaryItem}>
                      <Typography variant="body2" className={styles.summaryLabel}>
                        Бонусы:
                      </Typography>
                      <Typography variant="body1" className={styles.summaryValue}>
                        {formData.bonuses}
                      </Typography>
                    </Box>
                  )}

                  {formData.stockOptions && (
                    <Box className={styles.summaryItem}>
                      <Typography variant="body2" className={styles.summaryLabel}>
                        Опционы и акции:
                      </Typography>
                      <Typography variant="body1" className={styles.summaryValue}>
                        {formData.stockOptions}
                      </Typography>
                    </Box>
                  )}

                  <Box className={styles.summaryItem}>
                    <Typography variant="body2" className={styles.summaryLabel}>
                      Опыт работы:
                    </Typography>
                    <Typography variant="body1" className={styles.summaryValue}>
                      {{
                        "0-1": "Менее 1 года",
                        "1-3": "1-3 года",
                        "3-5": "3-5 лет",
                        "5-10": "5-10 лет",
                        "10+": "Более 10 лет",
                      }[formData.experience]}
                    </Typography>
                  </Box>

                  {formData.location && (
                    <Box className={styles.summaryItem}>
                      <Typography variant="body2" className={styles.summaryLabel}>
                        Местоположение:
                      </Typography>
                      <Typography variant="body1" className={styles.summaryValue}>
                        {formData.location}
                      </Typography>
                    </Box>
                  )}

                  <Box className={styles.summaryItem}>
                    <Typography variant="body2" className={styles.summaryLabel}>
                      Статус:
                    </Typography>
                    <Typography variant="body1" className={styles.summaryValue}>
                      {formData.employmentStatus === "current"
                        ? "Текущий сотрудник"
                        : "Бывший сотрудник"}{" "}
                      |{" "}
                      {{
                        "full-time": "Полная занятость",
                        "part-time": "Частичная занятость",
                        contract: "Контракт",
                        internship: "Стажировка",
                        freelance: "Фриланс",
                      }[formData.employmentType]}
                    </Typography>
                  </Box>
                </Box>
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
                label="Оставить информацию анонимно"
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
                label="Я подтверждаю, что эта информация основана на моем личном опыте работы, и данные достоверны"
              />
              {errors.confirmTruthful && (
                <FormHelperText error>{errors.confirmTruthful}</FormHelperText>
              )}
            </Box>

            <Box className={styles.privacyNote}>
              <Typography variant="body2" color="textSecondary">
                Ваша информация будет использована только в обобщенном виде. Мы не раскрываем личные данные пользователей.
              </Typography>
            </Box>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.addSalaryPage}>
      <Box className={styles.header}>
        <Typography variant="h4" className={styles.title}>
          {isEditing ? "Редактирование данных о зарплате" : "Добавление данных о зарплате"}
        </Typography>
        <Typography variant="body1" className={styles.subtitle}>
          Ваша информация поможет другим специалистам в переговорах о зарплате и оценке рыночной стоимости
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

        <Box className={styles.formContent}>{renderStepContent(activeStep)}</Box>

        <Box className={styles.formActions}>
          <Button onClick={handleCancel} className={styles.cancelButton} startIcon={<X size={18} />}>
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
              <Button onClick={handleSubmit} className={styles.submitButton} startIcon={<Save size={18} />}>
                {isEditing ? "Сохранить изменения" : "Отправить данные"}
              </Button>
            ) : (
              <Button onClick={handleNext} className={styles.nextButton} endIcon={<ChevronRight size={18} />}>
                Далее
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </div>
  );
}
