// src/profile/add/page.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Typography, Box } from "@mui/material";
import { Container } from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, DollarSign } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AddPage() {
  const router = useRouter();

  const contentTypes = [
    {
      id: "review",
      title: "Отзыв о компании",
      icon: <FileText size={40} className="text-[#800000]" />,
      description:
        "Добавьте отзыв о работе в компании, оцените условия и менеджмент",
      path: "/profile/add/review",
    },
    {
      id: "salary",
      title: "Зарплата",
      icon: <DollarSign size={40} className="text-[#800000]" />,
      description:
        "Поделитесь информацией о зарплате для помощи другим в переговорах",
      path: "/profile/add/salary",
    },
  ];

  const handleSelectContentType = (path: string) => {
    router.push(path);
  };

  return (
    <Container className="py-6">
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Добавить контент
          </h2>
          <p className="text-gray-600">
            Поделитесь своим опытом работы и получите доступ к миллионам
            отзывов, данных о зарплатах и другой полезной информации
          </p>
        </div>

        <Tabs defaultValue="review" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6">
            <TabsTrigger value="review">Отзыв</TabsTrigger>
            <TabsTrigger value="salary">Зарплата</TabsTrigger>
          </TabsList>

          <TabsContent value="review">
            <Card
              className="cursor-pointer transition-all hover:shadow-md border-[#800000]/10 hover:border-[#800000]"
              onClick={() => handleSelectContentType("/profile/add/review")}
            >
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="h-16 w-16 rounded-full bg-[#800000]/10 flex items-center justify-center mb-4">
                  <FileText size={30} className="text-[#800000]" />
                </div>
                <h3 className="text-xl font-semibold text-[#800000] mb-2">
                  Отзыв о компании
                </h3>
                <p className="text-gray-600 mb-4">
                  Добавьте отзыв о работе в компании, оцените условия труда,
                  корпоративную культуру и управление
                </p>
                <Button className="bg-[#800000] hover:bg-[#660000]">
                  Добавить отзыв
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="salary">
            <Card
              className="cursor-pointer transition-all hover:shadow-md border-[#800000]/10 hover:border-[#800000]"
              onClick={() => handleSelectContentType("/profile/add/salary")}
            >
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="h-16 w-16 rounded-full bg-[#800000]/10 flex items-center justify-center mb-4">
                  <DollarSign size={30} className="text-[#800000]" />
                </div>
                <h3 className="text-xl font-semibold text-[#800000] mb-2">
                  Информация о зарплате
                </h3>
                <p className="text-gray-600 mb-4">
                  Поделитесь данными о вашей зарплате анонимно, чтобы помочь
                  другим специалистам в переговорах о вознаграждении
                </p>
                <Button className="bg-[#800000] hover:bg-[#660000]">
                  Добавить зарплату
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Container>
  );
}
