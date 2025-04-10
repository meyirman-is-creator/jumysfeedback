import React from "react";
import { Box, Typography } from "@mui/material";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import styles from "./CareerTrajectory.module.scss";

interface TrajectoryItem {
  role: string;
  salaryRange: string;
  current: boolean;
}

interface CareerTrajectoryProps {
  data: TrajectoryItem[];
}

export default function CareerTrajectory({ data }: CareerTrajectoryProps) {
  return (
    <Box className={styles.trajectoryContainer}>
      <Typography variant="h5" className={styles.sectionTitle}>
        Total pay trajectory
      </Typography>

      <Box className={styles.trajectoryCards}>
        {data.map((item, index) => (
          <Card
            key={index}
            className={`${styles.trajectoryCard} ${
              item.current ? styles.currentCard : ""
            }`}
          >
            <CardContent className={styles.cardContent}>
              <Box className={styles.cardHeader}>
                {item.current && (
                  <Badge className={styles.currentBadge}>Current</Badge>
                )}
                <Typography variant="subtitle1" className={styles.roleTitle}>
                  {item.role}
                </Typography>
              </Box>
              <Typography variant="body1" className={styles.salary}>
                {item.salaryRange}
              </Typography>
            </CardContent>
            {index < data.length - 1 && <Box className={styles.arrow}>→</Box>}
          </Card>
        ))}
      </Box>
    </Box>
  );
}
