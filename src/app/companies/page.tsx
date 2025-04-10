"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import {
  Grid,
  List,
  Search,
  Star,
  X,
} from "lucide-react";
import { mockCompanies } from "@/features/company/mockData";
import styles from "./CompaniesPage.module.scss";

const CompaniesPage = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [location, setLocation] = useState("");
  const [industry, setIndustry] = useState("");
  const [page, setPage] = useState(1);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(mockCompanies.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCompanies = mockCompanies.slice(startIndex, endIndex);

  const handleChangePage = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const handleSwitchToGrid = () => {
    setViewMode("grid");
  };

  const handleSwitchToList = () => {
    setViewMode("list");
  };

  const handleLocationChange = (value: string) => {
    setLocation(value);
  };

  const handleIndustryChange = (value: string) => {
    setIndustry(value);
  };

  const addFilter = (filter: string) => {
    if (!selectedFilters.includes(filter)) {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  const removeFilter = (filter: string) => {
    setSelectedFilters(selectedFilters.filter((f) => f !== filter));
  };

  const clearAllFilters = () => {
    setSelectedFilters([]);
    setLocation("");
    setIndustry("");
  };

  const renderRating = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <Star
            key={i}
            className={styles.starFilled}
            size={16}
            fill="#f5b400"
            strokeWidth={0}
          />
        ) : (
          <Star
            key={i}
            className={styles.starEmpty}
            size={16}
            strokeWidth={1.5}
          />
        )
      );
    }
    return stars;
  };

  return (
    <div className={styles.companiesPage}>
      <Container>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Компании</h1>
          <p className={styles.pageDescription}>
            Ознакомьтесь с рейтингами компаний, отзывами и информацией о
            зарплатах, предоставленными сотрудниками
          </p>
        </div>

        {selectedFilters.length > 0 && (
          <div className={styles.activeFilters}>
            <div className={styles.filtersLabel}>Активные фильтры:</div>
            <div className={styles.filterTags}>
              {selectedFilters.map((filter) => (
                <div key={filter} className={styles.filterTag}>
                  {filter}
                  <button
                    className={styles.removeFilterBtn}
                    onClick={() => removeFilter(filter)}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className={styles.clearFiltersBtn}
            >
              Очистить все
            </Button>
          </div>
        )}

        <div className={styles.pageContent}>
          <div className={styles.filtersPanel}>
            <div className={styles.filterHeader}>
              <h2 className={styles.filterTitle}>Фильтры</h2>
              <Search className={styles.filterIcon} size={18} />
            </div>

            <Separator className={styles.filterDivider} />

            <div className={styles.filterSection}>
              <h3 className={styles.filterSectionTitle}>Локация</h3>
              <Select value={location} onValueChange={handleLocationChange}>
                <SelectTrigger className={styles.filterSelect}>
                  <SelectValue placeholder="Выберите локацию" />
                </SelectTrigger>
                <SelectContent className={styles.filterSelectContent}>
                  <SelectItem className={styles.filterSelectItem} value="all">Все локации</SelectItem>
                  <SelectItem className={styles.filterSelectItem} value="almaty">Алматы, Казахстан</SelectItem>
                  <SelectItem className={styles.filterSelectItem} value="astana">Астана, Казахстан</SelectItem>
                  <SelectItem className={styles.filterSelectItem} value="moscow">Москва, Россия</SelectItem>
                  <SelectItem className={styles.filterSelectItem} value="newyork">Нью-Йорк, США</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className={styles.filterSection}>
              <h3 className={styles.filterSectionTitle}>Отрасли</h3>
              <Select value={industry} onValueChange={handleIndustryChange}>
                <SelectTrigger className={styles.filterSelect}>
                  <SelectValue placeholder="Выберите отрасль" />
                </SelectTrigger>
                <SelectContent className={styles.filterSelectContent}>
                  <SelectItem className={styles.filterSelectItem} value="all">Все отрасли</SelectItem>
                  <SelectItem className={styles.filterSelectItem} value="it">IT и технологии</SelectItem>
                  <SelectItem className={styles.filterSelectItem} value="finance">Финансы</SelectItem>
                  <SelectItem className={styles.filterSelectItem} value="manufacturing">Производство</SelectItem>
                  <SelectItem className={styles.filterSelectItem} value="education">Образование</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className={styles.filterSection}>
              <h3 className={styles.filterSectionTitle}>Рейтинг компании</h3>
              <div className={styles.ratingFilter}>
                {[4, 3, 2].map((rating) => (
                  <div key={rating} className={styles.ratingOption}>
                    <Checkbox
                      id={`rating-${rating}`}
                      className={styles.ratingCheckbox}
                      onCheckedChange={(checked) => {
                        checked
                          ? addFilter(`${rating}★ и выше`)
                          : removeFilter(`${rating}★ и выше`);
                      }}
                    />
                    <Label
                      htmlFor={`rating-${rating}`}
                      className={styles.ratingLabel}
                    >
                      <span className={styles.ratingStars}>
                        {renderRating(rating)}
                      </span>
                      <span>и выше</span>
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.filterSection}>
              <h3 className={styles.filterSectionTitle}>Размер компании</h3>
              <RadioGroup defaultValue="any" className={styles.sizeFilter}>
                {[
                  { value: "1-50", label: "1 - 50" },
                  { value: "51-200", label: "51 - 200" },
                  { value: "201-500", label: "201 - 500" },
                  { value: "501-1000", label: "501 - 1000" },
                  { value: "1001-5000", label: "1001 - 5000" },
                  { value: "5001+", label: "5001+" },
                  { value: "any", label: "Любой размер" },
                ].map((size) => (
                  <div key={size.value} className={styles.sizeOption}>
                    <RadioGroupItem
                      value={size.value}
                      id={`size-${size.value}`}
                      className={styles.sizeRadio}
                      onClick={() => {
                        if (size.value !== "any") {
                          addFilter(`Размер: ${size.label}`);
                        } else {
                          removeFilter(
                            selectedFilters.find((f) =>
                              f.startsWith("Размер:")
                            ) || ""
                          );
                        }
                      }}
                    />
                    <Label htmlFor={`size-${size.value}`}>{size.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <Button
              variant="outline"
              className={styles.resetFiltersBtn}
              onClick={clearAllFilters}
            >
              Сбросить фильтры
            </Button>
          </div>

          <div className={styles.resultsPanel}>
            <div className={styles.resultsHeader}>
              <div className={styles.resultsCount}>
                <p>Найдено {mockCompanies.length} компаний</p>
              </div>
              <div className={styles.viewToggle}>
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={handleSwitchToGrid}
                  className={viewMode === "grid" ? styles.viewActive:styles.viewNoActive}
                >
                  <Grid size={18} />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={handleSwitchToList}
                  className={viewMode === "list" ? styles.viewActive:styles.viewNoActive}
                >
                  <List size={18} />
                </Button>
              </div>
            </div>

            <div
              className={`${styles.companyGrid} ${
                viewMode === "list" ? styles.listView : ""
              }`}
            >
              {currentCompanies.map((company) => (
                <Link
                  href={`/companies/${company.id}`}
                  key={company.id}
                  className={styles.companyCard}
                >
                  <Card className={styles.companyCardd}>
                    <CardContent className={styles.companyCardContent}>
                      <div className={styles.companyLogo}>
                        <img
                          src={company.logoUrl || "/placeholder.svg"}
                          alt={company.name}
                        />
                      </div>
                      <div className={styles.companyInfo}>
                        <h3 className={styles.companyName}>{company.name}</h3>
                        <div className={styles.companyRating}>
                          <span className={styles.ratingValue}>
                            {company.rating}
                          </span>
                          <div className={styles.ratingStars}>
                            {renderRating(company.rating)}
                          </div>
                        </div>
                        <p className={styles.companyLocation}>
                          {company.location}
                        </p>
                        <p className={styles.companyDescription}>
                          {company.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className={styles.pagination}>
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i + 1}
                  variant={page === i + 1 ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleChangePage(i + 1)}
                  className={styles.paginationBtn}
                >
                  {i + 1}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CompaniesPage;
