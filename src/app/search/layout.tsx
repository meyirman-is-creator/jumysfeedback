"use client";
import { ReactNode } from "react";
import { useSelectedLayoutSegments } from "next/navigation";
import Link from "next/link";
import { Tabs, Tab, Box, Container } from "@mui/material";
import styles from "./layout.module.scss";

type SearchLayoutProps = { children: ReactNode };

export default function SearchLayout({ children }: SearchLayoutProps) {
  const segments = useSelectedLayoutSegments();
  const currentSegment = segments[0] || "salaries";

  return (
    <Container maxWidth="lg" className={styles.wrapper}>
      <Tabs
        value={currentSegment}
        textColor="inherit"
        TabIndicatorProps={{ style: { backgroundColor: "#a20000" } }}
        sx={{
          borderBottom: "1px solid #a20000",
          "& .MuiTab-root.Mui-selected": {
            color: "#a20000",
          },
          "& .MuiTab-root": {
            textTransform: "none",
            "&:hover": {
              color: "#a20000",
            },
          },
        }}
      >
        <Tab
          label="Salaries"
          value="salaries"
          component={Link}
          href="/search/salaries"
        />
        <Tab
          label="Interviews"
          value="interviews"
          component={Link}
          href="/search/interviews"
        />
      </Tabs>

      <Box className={styles.content}>{children}</Box>
    </Container>
  );
}
