"use client";

import React from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./Main.module.scss";

export default function Home() {
  const [tabValue, setTabValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <div className={styles.mainBackground}>
      <Container maxWidth="md" className={styles.heroContainer}>
        <Typography variant="h4" className={styles.title}>
          Are you paid fairly? Find out.
        </Typography>
        <Typography variant="subtitle1" className={styles.subtitle}>
          Know your worth and calculate your salary
        </Typography>

        <Tabs
          value={tabValue}
          onChange={handleChange}
          textColor="inherit"
          indicatorColor="secondary"
          centered
          className={styles.customTabs}
        >
          <Tab label="Companies" />
          <Tab label="Salaries" />
          <Tab label="Interviews" />
        </Tabs>

        <Box className={styles.searchBox}>
          <TextField
            variant="outlined"
            placeholder={
              tabValue === 0
                ? "Company Name"
                : tabValue === 1
                ? "Job Title"
                : "Job Title or Company"
            }
            className={styles.textField}
          />
          <TextField
            variant="outlined"
            placeholder="Location"
            className={styles.textField}
          />
          <Button variant="contained" className={styles.searchButton}>
            <SearchIcon />
          </Button>
        </Box>
      </Container>
    </div>
  );
}
