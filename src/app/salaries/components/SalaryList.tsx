import React from "react";
import { Box, Typography } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import styles from "./SalaryList.module.scss";

interface SalaryListItem {
  id: number;
  company: string;
  logo: string;
  salary: string;
  verified: boolean;
}

interface SalaryListProps {
  data: SalaryListItem[];
}

export default function SalaryList({ data }: SalaryListProps) {
  return (
    <Box className={styles.listContainer}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className={styles.tableHead}>Company</TableHead>
            <TableHead className={styles.tableHead}>Salary</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id} className={styles.tableRow}>
              <TableCell className={styles.companyCell}>
                <Box className={styles.companyInfo}>
                  <Box className={styles.companyLogo}>
                    <img
                      src={item.logo || "/placeholder.png"}
                      alt={item.company}
                    />
                  </Box>
                  <Box>
                    <Typography variant="body1" className={styles.companyName}>
                      {item.company}
                    </Typography>
                    {item.verified && (
                      <Badge variant="outline" className={styles.verifiedBadge}>
                        Verified
                      </Badge>
                    )}
                  </Box>
                </Box>
              </TableCell>
              <TableCell className={styles.salaryCell}>
                <Link
                  href={`/salaries/${item.id}`}
                  className={styles.salaryLink}
                >
                  {item.salary}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
