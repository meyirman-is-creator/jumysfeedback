"use client";
import React from "react";
import Link from "next/link";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Pagination,
  FormControl,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Button,
  IconButton,
} from "@mui/material";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewListIcon from "@mui/icons-material/ViewList";
import { SelectChangeEvent } from "@mui/material/Select";
import { useRouter } from "next/navigation";
import { mockCompanies } from "@/features/company/mockData";
import styles from "./CompaniesPage.module.scss";

const CompaniesPage = () => {
  const router = useRouter();
  const [page, setPage] = React.useState(1);
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");
  const [location, setLocation] = React.useState("");
  const [industry, setIndustry] = React.useState("");

  const itemsPerPage = 9;
  const totalPages = Math.ceil(mockCompanies.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCompanies = mockCompanies.slice(startIndex, endIndex);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleSwitchToGrid = () => {
    setViewMode("grid");
  };

  const handleSwitchToList = () => {
    setViewMode("list");
  };

  const handleChangeLocation = (event: SelectChangeEvent<string>) => {
    setLocation(event.target.value);
  };

  const handleChangeIndustry = (event: SelectChangeEvent<string>) => {
    setIndustry(event.target.value);
  };

  return (
    <Container maxWidth="lg" className={styles.companiesPage}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} md={3}>
          <Box className={styles.companiesPage__filters}>
            <Typography
              variant="subtitle2"
              className={styles.companiesPage__results}
            >
              1–10 из 9,990 результатов
            </Typography>
            <Typography
              variant="h6"
              className={styles.companiesPage__filterTitle}
            >
              Фильтр компаний
            </Typography>

            <Box className={styles.companiesPage__filterItem}>
              <Typography variant="subtitle1">Локация</Typography>
              <FormControl fullWidth size="small">
                <Select
                  variant="outlined"
                  value={location}
                  onChange={handleChangeLocation}
                  displayEmpty
                >
                  <MenuItem value="">Выберите локацию</MenuItem>
                  <MenuItem value="Нью-Йорк, США">Нью-Йорк, США</MenuItem>
                  <MenuItem value="Москва, РФ">Москва, РФ</MenuItem>
                  <MenuItem value="Сан-Франциско, США">
                    Сан-Франциско, США
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box className={styles.companiesPage__filterItem}>
              <Typography variant="subtitle1">Отрасли</Typography>
              <FormControl fullWidth size="small">
                <Select
                  variant="outlined"
                  value={industry}
                  onChange={handleChangeIndustry}
                  displayEmpty
                >
                  <MenuItem value="">Выберите отрасль</MenuItem>
                  <MenuItem value="IT">IT</MenuItem>
                  <MenuItem value="Финансы">Финансы</MenuItem>
                  <MenuItem value="Образование">Образование</MenuItem>
                  <MenuItem value="Производство">Производство</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box className={styles.companiesPage__filterItem}>
              <Typography variant="subtitle1">Рейтинг компании</Typography>
              <Box>
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label="★★★★☆ и выше"
                />
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label="★★★☆☆ и выше"
                />
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label="★★☆☆☆ и выше"
                />
              </Box>
            </Box>

            <Box className={styles.companiesPage__filterItem}>
              <Typography variant="subtitle1">Размер компании</Typography>
              <RadioGroup defaultValue="any">
                <FormControlLabel
                  value="1-50"
                  control={<Radio size="small" />}
                  label="1 - 50"
                />
                <FormControlLabel
                  value="51-200"
                  control={<Radio size="small" />}
                  label="51 - 200"
                />
                <FormControlLabel
                  value="201-500"
                  control={<Radio size="small" />}
                  label="201 - 500"
                />
                <FormControlLabel
                  value="501-1000"
                  control={<Radio size="small" />}
                  label="501 - 1000"
                />
                <FormControlLabel
                  value="1001-5000"
                  control={<Radio size="small" />}
                  label="1001 - 5000"
                />
                <FormControlLabel
                  value="5001-10000"
                  control={<Radio size="small" />}
                  label="5001 - 10000"
                />
                <FormControlLabel
                  value="10000+"
                  control={<Radio size="small" />}
                  label="10000+"
                />
                <FormControlLabel
                  value="any"
                  control={<Radio size="small" />}
                  label="Любой размер"
                />
              </RadioGroup>
            </Box>

            <Box mt={2}>
              <Button variant="outlined" color="secondary" fullWidth>
                Очистить фильтры
              </Button>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} sm={8} md={9}>
          <Box className={styles.companiesPage__header}>
            <Typography variant="h4" className={styles.companiesPage__title}>
              Список компаний
            </Typography>
            <Box className={styles.companiesPage__viewButtons}>
              <IconButton
                color={viewMode === "grid" ? "secondary" : "default"}
                onClick={handleSwitchToGrid}
              >
                <ViewModuleIcon />
              </IconButton>
              <IconButton
                color={viewMode === "list" ? "secondary" : "default"}
                onClick={handleSwitchToList}
              >
                <ViewListIcon />
              </IconButton>
            </Box>
          </Box>

          <Grid
            container
            spacing={2}
            className={
              viewMode === "grid"
                ? styles.companiesPage__gridView
                : styles.companiesPage__listView
            }
          >
            {currentCompanies.map((company) => (
              <Grid
                item
                xs={12}
                sm={viewMode === "grid" ? 6 : 12}
                md={viewMode === "grid" ? 4 : 12}
                key={company.id}
              >
                <Card className={styles.companiesPage__card}>
                  <CardContent className={styles.companiesPage__cardContent}>
                    <Box className={styles.companiesPage__cardHeader}>
                      <img src={company.logoUrl} alt={company.name} />
                      <Box>
                        <Link href={`/companies/${company.id}`}>
                          <Typography
                            variant="h6"
                            className={styles.companiesPage__companyLink}
                          >
                            {company.name}
                          </Typography>
                        </Link>
                        <Typography variant="body2">
                          Рейтинг: {company.rating}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography
                      variant="body2"
                      className={styles.companiesPage__desc}
                    >
                      {company.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box className={styles.companiesPage__pagination}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handleChangePage}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CompaniesPage;
