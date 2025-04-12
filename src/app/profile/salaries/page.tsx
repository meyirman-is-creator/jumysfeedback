"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  FileText,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Mock data
const mockSalaries = [
  {
    id: "1",
    companyName: "Kaspi.kz",
    position: "Full Stack",
    amount: "5000 USD/мес",
    currency: "USD",
    experience: "Mid-Senior",
    date: "02/02/25",
    status: "Одобрено",
    verified: true,
    hasContract: true,
  },
  {
    id: "2",
    companyName: "Kaspi.kz",
    position: "Data Scientist",
    amount: "4500 USD/мес",
    currency: "USD",
    experience: "Mid",
    date: "02/02/25",
    status: "Новый",
    verified: false,
    hasContract: true,
  },
  {
    id: "3",
    companyName: "Kaspi.kz",
    position: "QA Engineer",
    amount: "3800 USD/мес",
    currency: "USD",
    experience: "Entry-Mid",
    date: "02/02/25",
    status: "Отказано",
    verified: true,
    hasContract: false,
  },
];

// For admin view
const allUserSalaries = [
  ...mockSalaries,
  {
    id: "4",
    companyName: "Google",
    position: "Software Engineer",
    amount: "6000 USD/мес",
    currency: "USD",
    experience: "Mid-Senior",
    date: "02/02/25",
    status: "Новый",
    verified: true,
    userName: "Jane Smith",
    hasContract: true,
  },
  {
    id: "5",
    companyName: "Microsoft",
    position: "DevOps Engineer",
    amount: "5500 USD/мес",
    currency: "USD",
    experience: "Mid",
    date: "01/02/25",
    status: "Новый",
    verified: false,
    userName: "Alex Johnson",
    hasContract: false,
  },
];

export default function SalariesPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [currentTab, setCurrentTab] = useState("Все");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedSalaryId, setSelectedSalaryId] = useState<string | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedSalary, setSelectedSalary] = useState<any>(null);
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [adminComment, setAdminComment] = useState("");

  // Role check (replace with actual auth logic)
  const isAdmin = false;

  const statusTabs = ["Все", "Новые", "Одобренные", "Отклоненные"];

  const handleAddSalary = () => {
    router.push("/profile/add/salary");
  };

  const handleEditSalary = (salaryId: string) => {
    router.push(`/profile/add/salary?id=${salaryId}`);
  };

  const handleDeleteSalary = (salaryId: string) => {
    setSelectedSalaryId(salaryId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    // Actual delete logic would go here
    toast({
      title: "Запись удалена",
      description: "Запись о зарплате была успешно удалена",
    });
    setDeleteDialogOpen(false);
    setSelectedSalaryId(null);
  };

  const handleViewDetails = (salary: any) => {
    setSelectedSalary(salary);
    setAdminComment(""); // Reset comment when opening details
    setDetailsDialogOpen(true);
  };

  const handleApproveClick = (salaryId: string) => {
    setSelectedSalaryId(salaryId);
    setApproveDialogOpen(true);
  };

  const handleRejectClick = (salaryId: string) => {
    setSelectedSalaryId(salaryId);
    setRejectDialogOpen(true);
  };

  const confirmApprove = () => {
    // Actual approve logic would go here
    toast({
      title: "Запись одобрена",
      description: "Запись о зарплате была успешно одобрена",
    });
    setApproveDialogOpen(false);
    setSelectedSalaryId(null);
  };

  const confirmReject = () => {
    // Actual reject logic would go here
    toast({
      title: "Запись отклонена",
      description: "Запись о зарплате была отклонена",
    });
    setRejectDialogOpen(false);
    setSelectedSalaryId(null);
  };

  // Filter salaries based on selected status tab and user role
  const getFilteredSalaries = () => {
    const salaries = isAdmin ? allUserSalaries : mockSalaries;

    if (currentTab === "Все") return salaries;

    const statusMap: Record<string, string> = {
      Новые: "Новый",
      Одобренные: "Одобрено",
      Отклоненные: "Отказано",
    };

    return salaries.filter((salary) => salary.status === statusMap[currentTab]);
  };

  const getStatusBadgeVariant = (status: string) => {
    if (status === "Одобрено") return "primary";
    if (status === "Отказано") return "destructive";
    return "secondary";
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">
          {isAdmin ? "Модерация зарплат" : "Мои зарплаты"}
        </h1>

        {!isAdmin && (
          <Button
            onClick={handleAddSalary}
            className="bg-[#800000] hover:bg-[#660000]"
          >
            <Plus className="w-4 h-4 mr-2" />
            Добавить зарплату
          </Button>
        )}
      </div>

      <Tabs defaultValue="Все" onValueChange={setCurrentTab} className="w-full">
        <TabsList className="bg-gray-100 p-1 rounded-lg mb-6 w-full grid grid-cols-4">
          {statusTabs.map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="data-[state=active]:bg-white data-[state=active]:text-[#800000] data-[state=active]:shadow-sm py-2 font-medium rounder-[5px]"
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>

        {statusTabs.map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-0">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-[#800000] font-semibold">
                          Компания
                        </TableHead>
                        <TableHead className="text-[#800000] font-semibold">
                          Должность
                        </TableHead>
                        <TableHead className="text-[#800000] font-semibold">
                          Зарплата
                        </TableHead>
                        <TableHead className="text-[#800000] font-semibold hidden sm:table-cell">
                          Опыт
                        </TableHead>
                        <TableHead className="text-[#800000] font-semibold hidden md:table-cell">
                          Дата
                        </TableHead>
                        <TableHead className="text-[#800000] font-semibold">
                          Статус
                        </TableHead>
                        <TableHead className="text-[#800000] font-semibold text-right">
                          Действия
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getFilteredSalaries().map((salary) => (
                        <TableRow key={salary.id} className="hover:bg-gray-50">
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span>{salary.companyName}</span>
                              {salary.verified && (
                                <Badge
                                  variant="outline"
                                  className="text-xs bg-blue-50 text-blue-600 border-blue-200"
                                >
                                  Verified
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>{salary.position}</TableCell>
                          <TableCell className="font-semibold text-[#800000]">
                            {salary.amount}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            {salary.experience}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {salary.date}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={getStatusBadgeVariant(salary.status)}
                            >
                              {salary.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => handleViewDetails(salary)}
                                    >
                                      <Eye className="w-4 h-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Просмотреть</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>

                              {!isAdmin && (
                                <>
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          onClick={() =>
                                            handleEditSalary(salary.id)
                                          }
                                        >
                                          <Edit2 className="w-4 h-4" />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Редактировать</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>

                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          onClick={() =>
                                            handleDeleteSalary(salary.id)
                                          }
                                        >
                                          <Trash2 className="w-4 h-4" />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Удалить</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </>
                              )}

                              {isAdmin && salary.status === "Новый" && (
                                <>
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          onClick={() =>
                                            handleApproveClick(salary.id)
                                          }
                                          className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                        >
                                          <CheckCircle className="w-4 h-4" />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Одобрить</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>

                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          onClick={() =>
                                            handleRejectClick(salary.id)
                                          }
                                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                        >
                                          <XCircle className="w-4 h-4" />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Отклонить</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Delete confirmation dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Удаление записи о зарплате</AlertDialogTitle>
            <AlertDialogDescription>
              Вы уверены, что хотите удалить эту запись о зарплате? Это действие
              нельзя будет отменить.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Approve confirmation dialog */}
      <AlertDialog open={approveDialogOpen} onOpenChange={setApproveDialogOpen}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Подтверждение одобрения</AlertDialogTitle>
            <AlertDialogDescription>
              Вы уверены, что хотите одобрить эту запись о зарплате?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmApprove}
              className="bg-green-600 hover:bg-green-700"
            >
              Одобрить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reject confirmation dialog */}
      <AlertDialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Подтверждение отклонения</AlertDialogTitle>
            <AlertDialogDescription>
              Вы уверены, что хотите отклонить эту запись о зарплате?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmReject}
              className="bg-red-600 hover:bg-red-700"
            >
              Отклонить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Salary details dialog */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        {selectedSalary && (
          <DialogContent className="sm:max-w-md bg-white">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold">
                Детали зарплаты
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="border-b pb-4">
                <h3 className="font-semibold text-[#800000]">
                  {selectedSalary.companyName}
                </h3>
                <p className="text-gray-600">{selectedSalary.position}</p>
              </div>

              <div className="space-y-3">
                <div className="flex">
                  <span className="w-32 text-gray-600 font-medium">
                    Зарплата:
                  </span>
                  <span className="font-medium">{selectedSalary.amount}</span>
                </div>

                <div className="flex">
                  <span className="w-32 text-gray-600 font-medium">Опыт:</span>
                  <span className="font-medium">
                    {selectedSalary.experience}
                  </span>
                </div>

                <div className="flex">
                  <span className="w-32 text-gray-600 font-medium">
                    Валюта:
                  </span>
                  <span className="font-medium">{selectedSalary.currency}</span>
                </div>

                <div className="flex items-center">
                  <span className="w-32 text-gray-600 font-medium">
                    Статус:
                  </span>
                  <Badge variant={getStatusBadgeVariant(selectedSalary.status)}>
                    {selectedSalary.status}
                  </Badge>
                </div>

                <div className="flex">
                  <span className="w-32 text-gray-600 font-medium">Дата:</span>
                  <span className="font-medium">{selectedSalary.date}</span>
                </div>

                {isAdmin && selectedSalary.hasContract && (
                  <div className="flex items-center mt-4 pt-4 border-t">
                    <span className="w-32 text-gray-600 font-medium">
                      Договор:
                    </span>
                    <Button variant="outline" className="gap-2">
                      <FileText className="w-4 h-4" />
                      Скачать договор
                    </Button>
                  </div>
                )}

                {isAdmin && (
                  <div className="mt-4 pt-4 border-t">
                    <label
                      htmlFor="admin-comment"
                      className="block text-gray-600 font-medium mb-2"
                    >
                      Комментарий администратора:
                    </label>
                    <Textarea
                      id="admin-comment"
                      placeholder="Введите комментарий..."
                      value={adminComment}
                      onChange={(e) => setAdminComment(e.target.value)}
                      rows={3}
                    />
                  </div>
                )}
              </div>
            </div>

            <DialogFooter className="mt-6 bg-white">
              {!isAdmin && selectedSalary.status !== "Одобрено" && (
                <Button
                  onClick={() => handleEditSalary(selectedSalary.id)}
                  className="mr-auto"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Редактировать
                </Button>
              )}

              {isAdmin && selectedSalary.status === "Новый" && (
                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      setDetailsDialogOpen(false);
                      handleApproveClick(selectedSalary.id);
                    }}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Одобрить
                  </Button>
                  <Button
                    onClick={() => {
                      setDetailsDialogOpen(false);
                      handleRejectClick(selectedSalary.id);
                    }}
                    variant="outline"
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Отклонить
                  </Button>
                </div>
              )}

              <Button
                variant="outline"
                onClick={() => setDetailsDialogOpen(false)}
              >
                Закрыть
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
