"use client";

import React from "react";
import Link from "next/link";
import {
  Box,
  Typography,
  Container,
  Grid,
  Tabs,
  Tab,
  TextField,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  ArrowRight,
  Building2,
  DollarSign,
  FileText,
  Star,
  TrendingUp,
} from "lucide-react";

export default function Home() {
  const [tabValue, setTabValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box component="main">
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #800000 0%, #a20000 100%)",
          py: { xs: 4, md: 6 },
          mb: 4,
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              textAlign: "center",
              color: "white",
              mb: 4,
            }}
          >
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "1.75rem", sm: "2.5rem", md: "3rem" },
                mb: 2,
              }}
            >
              Получаете ли вы справедливую оплату?
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 400,
                fontSize: { xs: "0.875rem", sm: "1rem", md: "1.25rem" },
                maxWidth: "800px",
                mx: "auto",
              }}
            >
              Узнайте свою стоимость на рынке труда и рассчитайте справедливую
              зарплату с помощью инструментов оценки
            </Typography>
          </Box>

          <Box
            sx={{
              bgcolor: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              borderRadius: 2,
              p: { xs: 2, md: 3 },
              maxWidth: "850px",
              mx: "auto",
            }}
          >
            <Tabs
              value={tabValue}
              onChange={handleChange}
              textColor="inherit"
              sx={{
                mb: 3,
                "& .MuiTab-root": {
                  color: "rgba(255, 255, 255, 0.7)",
                  fontWeight: 500,
                  fontSize: { xs: "0.875rem", md: "1rem" },
                },
                "& .Mui-selected": {
                  color: "white",
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: "white",
                },
              }}
              centered
              variant="fullWidth"
            >
              <Tab label="Компании" />
              <Tab label="Зарплаты" />
            </Tabs>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 2,
              }}
            >
              <TextField
                variant="outlined"
                placeholder={
                  tabValue === 0
                    ? "Название компании"
                    : tabValue === 1
                    ? "Должность"
                    : "Должность или компания"
                }
                sx={{
                  flex: 1,
                  bgcolor: "white",
                  borderRadius: 1,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 1,
                  },
                }}
                fullWidth
              />
              <TextField
                variant="outlined"
                placeholder="Местоположение"
                sx={{
                  flex: 1,
                  bgcolor: "white",
                  borderRadius: 1,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 1,
                  },
                }}
                fullWidth
              />
              <Button
                variant="contained"
                sx={{
                  height: { xs: 56, md: "auto" },
                  minWidth: { xs: "100%", md: 56 },
                  bgcolor: "#004085",
                  color: "white",
                  "&:hover": {
                    bgcolor: "#002752",
                  },
                }}
              >
                <SearchIcon />
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ my: 6 }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: 600,
            mb: 4,
            textAlign: "center",
            color: "#333",
            fontSize: { xs: "1.5rem", md: "2rem" },
          }}
        >
          Почему стоит использовать iWork
        </Typography>

        <Grid container spacing={4}>
          <FeatureItem
            icon={<Building2 size={36} color="#a20000" />}
            title="Достоверные отзывы компаний"
            description="Узнайте реальную информацию о работодателях от сотрудников, которые там работают или работали"
          />
          <FeatureItem
            icon={<DollarSign size={36} color="#a20000" />}
            title="Данные о зарплатах"
            description="Получите доступ к актуальным данным о зарплатах, основанных на информации от реальных сотрудников"
          />
          <FeatureItem
            icon={<FileText size={36} color="#a20000" />}
            title="Аналитика по компаниям"
            description="Детальная информация о компаниях, включая рейтинги, преимущества и финансовые показатели"
          />
          <FeatureItem
            icon={<TrendingUp size={36} color="#a20000" />}
            title="Карьерный рост"
            description="Инструменты и советы для развития карьеры и получения повышения в зарплате"
          />
        </Grid>
      </Container>

      {/* Top Companies Section */}
      <Box sx={{ bgcolor: "#f9f9f9", py: 6 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 600,
              mb: 3,
              color: "#333",
              fontSize: { xs: "1.5rem", md: "2rem" },
            }}
          >
            Лучшие компании 2025 года
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, maxWidth: "800px" }}>
            Ознакомьтесь с рейтингом лучших компаний для работы, основанным на
            отзывах миллионов сотрудников
          </Typography>

          <Grid container spacing={3}>
            <CompanyCard
              name="Google"
              rating={4.5}
              reviews={15240}
              logo="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png"
            />
            <CompanyCard
              name="Microsoft"
              rating={4.3}
              reviews={12458}
              logo="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png"
            />
            <CompanyCard
              name="Apple"
              rating={4.2}
              reviews={14782}
              logo="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png"
            />
            <CompanyCard
              name="Amazon"
              rating={3.9}
              reviews={18234}
              logo="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png"
            />
          </Grid>

          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Link href="/companies" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#800000",
                  "&:hover": { bgcolor: "#a20000" },
                  px: 4,
                  py: 1.5,
                }}
              >
                Посмотреть все компании
              </Button>
            </Link>
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{ bgcolor: "#800000", color: "white", py: 6, textAlign: "center" }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: "1.5rem", md: "2rem" },
            }}
          >
            Присоединяйтесь к сообществу iWork
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 4, maxWidth: "700px", mx: "auto", opacity: 0.9 }}
          >
            Поделитесь своим опытом работы и получите доступ к миллионам
            отзывов, зарплат и вопросов с собеседований
          </Typography>
          <Link href="/auth/register" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              sx={{
                bgcolor: "white",
                color: "#800000",
                "&:hover": { bgcolor: "#f0f0f0" },
                px: 4,
                py: 1.5,
                fontWeight: 600,
                fontSize: "1rem",
              }}
            >
              Зарегистрироваться бесплатно
            </Button>
          </Link>
        </Container>
      </Box>
    </Box>
  );
}

function SalaryLink({ title }) {
  return (
    <Link href="/salaries" style={{ textDecoration: "none" }}>
      <Typography
        sx={{
          color: "#444",
          "&:hover": {
            color: "#a20000",
            textDecoration: "underline",
          },
        }}
      >
        {title}
      </Typography>
    </Link>
  );
}

function FeatureItem({ icon, title, description }) {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Box sx={{ mb: 2 }}>{icon}</Box>
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: "#333" }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </Box>
    </Grid>
  );
}

function CompanyCard({ name, rating, reviews, logo }) {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card
        sx={{
          p: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transition: "transform 0.2s, box-shadow 0.2s",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 2,
            height: 80,
            "& img": {
              maxHeight: "100%",
              objectFit: "contain",
            },
          }}
        >
          <img src={logo} alt={name} />
        </Box>
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, textAlign: "center", mb: 1 }}
        >
          {name}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 0.5,
            mb: 1,
          }}
        >
          <Typography
            variant="body2"
            sx={{ fontWeight: "bold", color: "#333" }}
          >
            {rating}
          </Typography>
          <Box sx={{ display: "flex", color: "#ffc107" }}>
            {Array(5)
              .fill(null)
              .map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={i < Math.floor(rating) ? "#ffc107" : "none"}
                  color="#ffc107"
                />
              ))}
          </Box>
        </Box>
        <Typography variant="body2" sx={{ color: "#666", textAlign: "center" }}>
          {reviews.toLocaleString()} отзывов
        </Typography>
      </Card>
    </Grid>
  );
}
