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
    return Math.round(amount / 1000) + "K";
  };

  return (
    <Card className={styles.breakdownCard}>
      <CardContent className={styles.cardContent}>
        <Typography variant="h6" className={styles.title}>
          Pay breakdown
        </Typography>

        <Separator className={styles.separator} />

        <Box className={styles.breakdownItem}>
          <Box className={styles.breakdownHeader}>
            <Typography variant="subtitle1" className={styles.breakdownLabel}>
              Base pay
            </Typography>
            <Typography variant="body1" className={styles.breakdownRange}>
              ${formatK(data.basePay.min)} - ${formatK(data.basePay.max)}/yr
            </Typography>
          </Box>
          <Box className={styles.rangeBar}>
            <Box className={styles.rangeInner}></Box>
          </Box>
        </Box>

        <Box className={styles.breakdownItem}>
          <Box className={styles.breakdownHeader}>
            <Typography variant="subtitle1" className={styles.breakdownLabel}>
              Additional pay
            </Typography>
            <Typography variant="body1" className={styles.breakdownRange}>
              ${formatK(data.additionalPay.min)} - $
              {formatK(data.additionalPay.max)}/yr
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
            Additional pay could include cash bonus, commission, tips, and
            profit sharing.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
