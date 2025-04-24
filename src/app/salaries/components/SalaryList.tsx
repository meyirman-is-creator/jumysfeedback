import React from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import styles from "./SalaryList.module.scss";

interface SalaryListItem {
  id: number;
  companyId: number;
  companyName: string;
  companyLogoUrl: string;
  salary: string;
  verified: boolean;
}

interface SalaryListProps {
  data: SalaryListItem[];
}

export default function SalaryList({ data }: SalaryListProps) {
  const router = useRouter();

  const handleRowClick = (companyId: number) => {
    router.push(`/companies/${companyId}/salaries`);
  };

  return (
    <div className={styles.listContainer}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className={styles.tableHead}>Компания</TableHead>
            <TableHead className={styles.tableHead}>Зарплата</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow
              key={item.id}
              className={`${styles.tableRow} cursor-pointer hover:bg-gray-50`}
              onClick={() => handleRowClick(item.companyId)}
            >
              <TableCell className={styles.companyCell}>
                <div className={styles.companyInfo}>
                  <div className={styles.companyLogo}>
                    <img
                      src={item.companyLogoUrl || "/placeholder.png"}
                      alt={item.companyName}
                    />
                  </div>
                  <div>
                    <p className={styles.companyName}>{item.companyName}</p>
                    {item.verified && (
                      <Badge
                        variant="outline"
                        className="bg-blue-50 text-blue-600 border-blue-200 text-xs flex items-center gap-1"
                      >
                        <CheckCircle className="h-3.5 w-3.5" />
                        <span>Проверено</span>
                      </Badge>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell className={styles.salaryCell}>
                <span className={styles.salaryText}>{item.salary}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

