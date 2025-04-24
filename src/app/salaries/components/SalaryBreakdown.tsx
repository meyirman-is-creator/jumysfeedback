// src/app/salaries/components/SalaryBreakdown.tsx
import React from "react";
import { Box, Typography } from "@mui/material";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import styles from "./SalaryBreakdown.module.scss";

interface SalaryBreakdownProps {
  data: {
    basePay: {
      min: number;
      max: number;
    };
    additionalPay: {
      min: number;
      max: number;
    };
  };
}

export default function SalaryBreakdown({ data }: SalaryBreakdownProps) {
  const formatK = (amount: number) => {
    return new Intl.NumberFormat("ru-RU", {
      maximumFractionDigits: 0,
      notation: "compact",
    }).format(amount);
  };

  return (
    <Card className={styles.breakdownCard}>
      <CardContent className={styles.cardContent}>
        <Typography variant="h6" className={styles.title}>
          Структура оплаты
        </Typography>

        <Separator className={styles.separator} />

        <Box className={styles.breakdownItem}>
          <Box className={styles.breakdownHeader}>
            <Typography variant="subtitle1" className={styles.breakdownLabel}>
              Базовая оплата
            </Typography>
            <Typography variant="body1" className={styles.breakdownRange}>
              {formatK(data.basePay.min)} - {formatK(data.basePay.max)} ₸/год
            </Typography>
          </Box>
          <Box className={styles.rangeBar}>
            <Box className={styles.rangeInner}></Box>
          </Box>
        </Box>

        <Box className={styles.breakdownItem}>
          <Box className={styles.breakdownHeader}>
            <Typography variant="subtitle1" className={styles.breakdownLabel}>
              Дополнительная оплата
            </Typography>
            <Typography variant="body1" className={styles.breakdownRange}>
              {formatK(data.additionalPay.min)} -{" "}
              {formatK(data.additionalPay.max)} ₸/год
            </Typography>
          </Box>
          <Box className={styles.rangeBar}>
            <Box
              className={styles.rangeInner}
              style={{
                width: `${(data.additionalPay.max / data.basePay.max) * 100}%`,
              }}
            ></Box>
          </Box>
        </Box>

        <Box className={styles.additionalInfo}>
          <Typography variant="body2" className={styles.additionalText}>
            Дополнительная оплата может включать бонусы, комиссии, чаевые и
            участие в прибыли.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
