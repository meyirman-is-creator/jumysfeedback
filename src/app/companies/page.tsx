"use client"
import React from "react"
import Link from "next/link"
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
  Divider,
  useTheme,
} from "@mui/material"
import ViewModuleIcon from "@mui/icons-material/ViewModule"
import ViewListIcon from "@mui/icons-material/ViewList"
import FilterAltIcon from "@mui/icons-material/FilterAlt"
import StarIcon from "@mui/icons-material/Star"
import StarBorderIcon from "@mui/icons-material/StarBorder"
import type { SelectChangeEvent } from "@mui/material/Select"
import { useRouter } from "next/navigation"
import { mockCompanies } from "@/features/company/mockData"
import styles from "./CompaniesPage.module.scss"

const CompaniesPage = () => {
  const theme = useTheme()
  const router = useRouter()
  const [page, setPage] = React.useState(1)
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid")
  const [location, setLocation] = React.useState("")
  const [industry, setIndustry] = React.useState("")

  const itemsPerPage = 15
  const totalPages = Math.ceil(mockCompanies.length / itemsPerPage)
  const startIndex = (page - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentCompanies = mockCompanies.slice(startIndex, endIndex)

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const handleSwitchToGrid = () => {
    setViewMode("grid")
  }

  const handleSwitchToList = () => {
    setViewMode("list")
  }

  const handleChangeLocation = (event: SelectChangeEvent<string>) => {
    setLocation(event.target.value)
  }

  const handleChangeIndustry = (event: SelectChangeEvent<string>) => {
    setIndustry(event.target.value)
  }

  // Function to render star rating
  const renderRating = (rating: number) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <StarIcon
            key={i}
            sx={{
              fontSize: "1rem",
              color: theme.palette.warning.main,
            }}
          />,
        )
      } else {
        stars.push(
          <StarBorderIcon
            key={i}
            sx={{
              fontSize: "1rem",
              color: theme.palette.warning.main,
            }}
          />,
        )
      }
    }
    return stars
  }

  return (
    <Container maxWidth="lg" className={styles.companiesPage}>
      <Grid container spacing={3}>
        {/* Enhanced Filter Section */}
        <Grid item xs={12} sm={4} md={3}>
          <Box
            className={styles.companiesPage__filters}
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: "16px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
              padding: "1.5rem",
              position: "sticky",
              top: "20px",
            }}
          >
            <Typography
              variant="subtitle2"
              className={styles.companiesPage__results}
              sx={{
                color: theme.palette.text.secondary,
                fontWeight: 500,
              }}
            >
              1–10 из 9,990 результатов
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <FilterAltIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
              <Typography
                variant="h6"
                className={styles.companiesPage__filterTitle}
                sx={{
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                }}
              >
                Фильтр компаний
              </Typography>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Box className={styles.companiesPage__filterItem}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  mb: 1,
                  fontSize: "0.95rem",
                }}
              >
                Локация
              </Typography>
              <FormControl fullWidth size="small">
                <Select
                  className={styles.companiesPage__inputField}
                  variant="outlined"
                  value={location}
                  onChange={handleChangeLocation}
                  displayEmpty
                  sx={{
                    borderRadius: "8px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.divider,
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.primary.light,
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.primary.main,
                    },
                  }}
                >
                  <MenuItem value="">Выберите локацию</MenuItem>
                  <MenuItem value="Нью-Йорк, США">Нью-Йорк, США</MenuItem>
                  <MenuItem value="Москва, РФ">Москва, РФ</MenuItem>
                  <MenuItem value="Сан-Франциско, США">Сан-Франциско, США</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box className={styles.companiesPage__filterItem}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  mb: 1,
                  fontSize: "0.95rem",
                }}
              >
                Отрасли
              </Typography>
              <FormControl fullWidth size="small">
                <Select
                  variant="outlined"
                  value={industry}
                  onChange={handleChangeIndustry}
                  displayEmpty
                  sx={{
                    borderRadius: "8px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.divider,
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.primary.light,
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.primary.main,
                    },
                  }}
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
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  mb: 1,
                  fontSize: "0.95rem",
                }}
              >
                Рейтинг компании
              </Typography>
              <Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      sx={{
                        color: theme.palette.primary.light,
                        "&.Mui-checked": {
                          color: theme.palette.primary.main,
                        },
                      }}
                    />
                  }
                  label={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {renderRating(4)} <Typography sx={{ ml: 0.5 }}>и выше</Typography>
                    </Box>
                  }
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      sx={{
                        color: theme.palette.primary.light,
                        "&.Mui-checked": {
                          color: theme.palette.primary.main,
                        },
                      }}
                    />
                  }
                  label={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {renderRating(3)} <Typography sx={{ ml: 0.5 }}>и выше</Typography>
                    </Box>
                  }
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      sx={{
                        color: theme.palette.primary.light,
                        "&.Mui-checked": {
                          color: theme.palette.primary.main,
                        },
                      }}
                    />
                  }
                  label={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {renderRating(2)} <Typography sx={{ ml: 0.5 }}>и выше</Typography>
                    </Box>
                  }
                />
              </Box>
            </Box>

            <Box className={styles.companiesPage__filterItem}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  mb: 1,
                  fontSize: "0.95rem",
                }}
              >
                Размер компании
              </Typography>
              <RadioGroup defaultValue="any">
                <FormControlLabel
                  value="1-50"
                  control={
                    <Radio
                      size="small"
                      sx={{
                        color: theme.palette.primary.light,
                        "&.Mui-checked": {
                          color: theme.palette.primary.main,
                        },
                      }}
                    />
                  }
                  label="1 - 50"
                />
                <FormControlLabel
                  value="51-200"
                  control={
                    <Radio
                      size="small"
                      sx={{
                        color: theme.palette.primary.light,
                        "&.Mui-checked": {
                          color: theme.palette.primary.main,
                        },
                      }}
                    />
                  }
                  label="51 - 200"
                />
                <FormControlLabel
                  value="201-500"
                  control={
                    <Radio
                      size="small"
                      sx={{
                        color: theme.palette.primary.light,
                        "&.Mui-checked": {
                          color: theme.palette.primary.main,
                        },
                      }}
                    />
                  }
                  label="201 - 500"
                />
                <FormControlLabel
                  value="501-1000"
                  control={
                    <Radio
                      size="small"
                      sx={{
                        color: theme.palette.primary.light,
                        "&.Mui-checked": {
                          color: theme.palette.primary.main,
                        },
                      }}
                    />
                  }
                  label="501 - 1000"
                />
                <FormControlLabel
                  value="1001-5000"
                  control={
                    <Radio
                      size="small"
                      sx={{
                        color: theme.palette.primary.light,
                        "&.Mui-checked": {
                          color: theme.palette.primary.main,
                        },
                      }}
                    />
                  }
                  label="1001 - 5000"
                />
                <FormControlLabel
                  value="5001-10000"
                  control={
                    <Radio
                      size="small"
                      sx={{
                        color: theme.palette.primary.light,
                        "&.Mui-checked": {
                          color: theme.palette.primary.main,
                        },
                      }}
                    />
                  }
                  label="5001 - 10000"
                />
                <FormControlLabel
                  value="10000+"
                  control={
                    <Radio
                      size="small"
                      sx={{
                        color: theme.palette.primary.light,
                        "&.Mui-checked": {
                          color: theme.palette.primary.main,
                        },
                      }}
                    />
                  }
                  label="10000+"
                />
                <FormControlLabel
                  value="any"
                  control={
                    <Radio
                      size="small"
                      sx={{
                        color: theme.palette.primary.light,
                        "&.Mui-checked": {
                          color: theme.palette.primary.main,
                        },
                      }}
                    />
                  }
                  label="Любой размер"
                />
              </RadioGroup>
            </Box>

            <Box mt={2}>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                sx={{
                  borderRadius: "8px",
                  textTransform: "none",
                  fontWeight: 600,
                  py: 1,
                  borderWidth: "1.5px",
                  "&:hover": {
                    borderWidth: "1.5px",
                  },
                }}
              >
                Очистить фильтры
              </Button>
            </Box>
          </Box>
        </Grid>

        {/* Card Section */}
        <Grid item xs={12} sm={8} md={9}>
          <Box className={styles.companiesPage__header}>
            <Typography variant="h4" className={styles.companiesPage__title}>
              Список компаний
            </Typography>
            <Box className={styles.companiesPage__viewButtons}>
              <IconButton color={viewMode === "grid" ? "secondary" : "default"} onClick={handleSwitchToGrid}>
                <ViewModuleIcon />
              </IconButton>
              <IconButton color={viewMode === "list" ? "secondary" : "default"} onClick={handleSwitchToList}>
                <ViewListIcon />
              </IconButton>
            </Box>
          </Box>

          <Grid
            container
            spacing={2}
            className={viewMode === "grid" ? styles.companiesPage__gridView : styles.companiesPage__listView}
          >
            {currentCompanies.map((company) => (
              <Grid item xs={12} sm={viewMode === "grid" ? 6 : 12} md={viewMode === "grid" ? 4 : 12} key={company.id}>
                <Card className={styles.companiesPage__card} sx={{borderRadius: "10px"}}>
                  <CardContent className={styles.companiesPage__cardContent}>
                    <Box className={styles.companiesPage__cardHeader}>
                      <img src={company.logoUrl || "/placeholder.svg"} alt={company.name} />
                      <Box>
                        <Link href={`/companies/${company.id}`}>
                          <Typography variant="h6" className={styles.companiesPage__companyLink}>
                            {company.name}
                          </Typography>
                        </Link>
                        <Typography variant="body2">Рейтинг: {company.rating}</Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" className={styles.companiesPage__desc}>
                      {company.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          <Box className={styles.companiesPage__pagination}>
            <Pagination count={totalPages} page={page} onChange={handleChangePage}/>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default CompaniesPage

