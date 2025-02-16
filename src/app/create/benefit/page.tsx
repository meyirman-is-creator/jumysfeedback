"use client";

import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "./CreateBenefitPage.module.scss";

export default function CreateBenefitPage() {
  // Локальное состояние для формы
  const [reviewType, setReviewType] = useState("benefits");
  const [employerName, setEmployerName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");

  // Обработчик отправки формы
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь логика отправки данных (Redux, React Query или fetch)
    console.log("Submit:", { reviewType, employerName, jobTitle, location });
  };

  return (
    <Container maxWidth="sm" className={styles["create-benefit"]}>
      {/* Заголовок и описание */}
      <Typography variant="h5" className={styles["create-benefit__title"]}>
        Post one of the following to get unlimited access:
      </Typography>
      <Typography
        variant="body1"
        className={styles["create-benefit__subtitle"]}
      >
        Glassdoor has millions of salaries and company reviews shared by real
        employees. It only takes a minute to get unlimited access to all our
        content for 12 months.
      </Typography>

      {/* Форма выбора типа ревью + поля */}
      <FormControl
        component="form"
        onSubmit={handleSubmit}
        className={styles["create-benefit__form"]}
      >
        <FormLabel className={styles["create-benefit__label"]}>
          Please select a review type:
        </FormLabel>
        <RadioGroup
          value={reviewType}
          onChange={(e) => setReviewType(e.target.value)}
          className={styles["create-benefit__radio-group"]}
        >
          <FormControlLabel
            value="company-review"
            control={<Radio />}
            label="Company Review"
          />
          <FormControlLabel value="salary" control={<Radio />} label="Salary" />
          <FormControlLabel
            value="interview"
            control={<Radio />}
            label="Interview"
          />
          <FormControlLabel
            value="benefits"
            control={<Radio />}
            label="Benefits"
          />
        </RadioGroup>

        <TextField
          label="Employer Name"
          variant="outlined"
          fullWidth
          required
          margin="normal"
          value={employerName}
          onChange={(e) => setEmployerName(e.target.value)}
        />
        <TextField
          label="Job Title"
          variant="outlined"
          fullWidth
          required
          margin="normal"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
        <TextField
          label="Location"
          variant="outlined"
          fullWidth
          required
          margin="normal"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <Box textAlign="right" marginTop={2}>
          <Button variant="contained" color="primary" type="submit">
            Next
          </Button>
        </Box>
      </FormControl>

      {/* Common Questions (Accordion) */}
      <Box className={styles["create-benefit__common-questions"]}>
        <Typography variant="h6">Common Questions</Typography>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Why should I contribute?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              By contributing, you help others make informed decisions and gain
              unlimited access to more content.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>How will my review be anonymous?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Your personal data is never displayed publicly. We protect your
              identity to ensure complete anonymity.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  );
}
