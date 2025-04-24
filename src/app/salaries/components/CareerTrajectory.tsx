// src/app/salaries/components/CareerTrajectory.tsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
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
    <div className={styles.trajectoryContainer}>
      <h2 className={styles.sectionTitle}>Динамика зарплаты по карьере</h2>

      <div className={styles.trajectoryCards}>
        {data.map((item, index) => (
          <Card
            key={index}
            className={`${styles.trajectoryCard} ${
              item.current ? styles.currentCard : ""
            }`}
          >
            <CardContent className={styles.cardContent}>
              <div className={styles.cardHeader}>
                {item.current && (
                  <Badge className={styles.currentBadge}>Текущий</Badge>
                )}
                <p className={styles.roleTitle}>{item.role}</p>
              </div>
              <p className={styles.salary}>{item.salaryRange}</p>
            </CardContent>
            {index < data.length - 1 && (
              <div className={styles.arrow}>
                <ChevronRight className="h-5 w-5" />
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
