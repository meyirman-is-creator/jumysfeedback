"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  MessageCircle,
  CheckCircle,
  XCircle,
  AlertCircle,
  Bot,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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
import { Separator } from "@/components/ui/separator";

// Mock data
const mockReviews = [
  {
    id: "1",
    companyName: "Kaspi.kz",
    position: "Full Stack",
    rating: 4.0,
    title: "Lorem ipsum Lorem ipsum",
    content: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
    date: "02/02/25",
    status: "Одобрено",
    hasComment: false,
    verified: true,
  },
  {
    id: "2",
    companyName: "Kaspi.kz",
    position: "Full Stack",
    rating: 3.0,
    title: "Lorem ipsum Lorem ipsum",
    content: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
    date: "02/02/25",
    status: "Новый",
    hasComment: false,
    verified: false,
  },
  {
    id: "3",
    companyName: "Kaspi.kz",
    position: "Full Stack",
    rating: 3.0,
    title: "Lorem ipsum Lorem ipsum",
    content: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
    date: "02/02/25",
    status: "Отказано",
    hasComment: true,
    verified: true,
  },
];

// For admin view
const allUserReviews = [
  ...mockReviews,
  {
    id: "4",
    companyName: "Google",
    position: "Software Engineer",
    rating: 4.5,
    title: "Great work environment",
    content: "Excellent benefits and culture",
    date: "02/02/25",
    status: "Новый",
    hasComment: false,
    verified: true,
    userName: "Jane Smith",
  },
  {
    id: "5",
    companyName: "Microsoft",
    position: "DevOps Engineer",
    rating: 3.5,
    title: "Good but challenging",
    content: "High expectations but good compensation",
    date: "01/02/25",
    status: "Новый",
    hasComment: false,
    verified: false,
    userName: "Alex Johnson",
  },
];

export default function ReviewsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [currentTab, setCurrentTab] = useState("Все");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);
  const [aiDialogOpen, setAiDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<any>(null);
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [adminComment, setAdminComment] = useState("");

  // Role check (replace with actual auth logic)
  const isAdmin = false;

  const statusTabs = ["Все", "Новые", "Одобренные", "Отклоненные"];

  const handleAddReview = () => {
    router.push("/profile/add/review");
  };

  const handleEditReview = (reviewId: string) => {
    router.push(`/profile/add/review?id=${reviewId}`);
  };

  const handleDeleteReview = (reviewId: string) => {
    setSelectedReviewId(reviewId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    // Actual delete logic would go here
    toast({
      title: "Отзыв удален",
      description: "Отзыв был успешно удален",
    });
    setDeleteDialogOpen(false);
    setSelectedReviewId(null);
  };

  const handleViewDetails = (review: any) => {
    setSelectedReview(review);
    setAdminComment(""); // Reset comment when opening details
    setDetailsDialogOpen(true);
  };

  const handleApproveClick = (reviewId: string) => {
    setSelectedReviewId(reviewId);
    setApproveDialogOpen(true);
  };

  const handleRejectClick = (reviewId: string) => {
    setSelectedReviewId(reviewId);
    setRejectDialogOpen(true);
  };

  const confirmApprove = () => {
    // Actual approve logic would go here
    toast({
      title: "Отзыв одобрен",
      description: "Отзыв был успешно одобрен",
    });
    setApproveDialogOpen(false);
    setSelectedReviewId(null);
  };

  const confirmReject = () => {
    // Actual reject logic would go here
    toast({
      title: "Отзыв отклонен",
      description: "Отзыв был отклонен",
    });
    setRejectDialogOpen(false);
    setSelectedReviewId(null);
  };

  const handleModerate = (reviewId: string, action: "approve" | "reject") => {
    if (action === "approve") {
      handleApproveClick(reviewId);
    } else if (action === "reject") {
      const review = allUserReviews.find((r) => r.id === reviewId);
      if (review) {
        setSelectedReview(review);
        setAiDialogOpen(true);
      }
    }
  };

  // Filter reviews based on selected status tab and user role
  const getFilteredReviews = () => {
    const reviews = isAdmin ? allUserReviews : mockReviews;

    if (currentTab === "Все") return reviews;

    const statusMap: Record<string, string> = {
      Новые: "Новый",
      Одобренные: "Одобрено",
      Отклоненные: "Отказано",
    };

    return reviews.filter((review) => review.status === statusMap[currentTab]);
  };

  const getStatusBadgeVariant = (status: string) => {
    if (status === "Одобрено") return "success";
    if (status === "Отказано") return "destructive";
    return "secondary";
  };

  const renderStarRating = (rating: number) => {
    return (
      <div className="flex gap-0.5 text-yellow-500">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i}>{i < Math.floor(rating) ? "★" : "☆"}</span>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">
          {isAdmin ? "Модерация отзывов" : "Мои отзывы"}
        </h1>

        {!isAdmin && (
          <Button
            onClick={handleAddReview}
            className="bg-[#800000] hover:bg-[#660000]"
          >
            <Plus className="w-4 h-4 mr-2" />
            Добавить отзыв
          </Button>
        )}
      </div>

      <Tabs
        defaultValue="Все"
        value={currentTab}
        onValueChange={setCurrentTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-4 mb-4">
          {statusTabs.map((tab) => (
            <TabsTrigger key={tab} value={tab}>
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Компания</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Должность
                  </TableHead>
                  <TableHead>Рейтинг</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Заголовок
                  </TableHead>
                  <TableHead className="hidden lg:table-cell">Дата</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getFilteredReviews().map((review) => (
                  <TableRow key={review.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>{review.companyName}</span>
                        {review.verified && (
                          <Badge
                            variant="outline"
                            className="text-xs bg-blue-50 text-blue-600 border-blue-200"
                          >
                            Verified
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {review.position}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{review.rating}</span>
                        <span className="hidden sm:flex">
                          {renderStarRating(review.rating)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <p className="truncate max-w-[150px]">{review.title}</p>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {review.date}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Badge variant={getStatusBadgeVariant(review.status)}>
                          {review.status}
                        </Badge>
                        {review.hasComment && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <MessageCircle className="w-4 h-4 text-[#800000]" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Есть комментарий от модератора</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleViewDetails(review)}
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
                                    onClick={() => handleEditReview(review.id)}
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
                                      handleDeleteReview(review.id)
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

                        {isAdmin && review.status === "Новый" && (
                          <>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() =>
                                      handleModerate(review.id, "approve")
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
                                      handleModerate(review.id, "reject")
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

      {/* Delete confirmation dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Удаление отзыва</AlertDialogTitle>
            <AlertDialogDescription>
              Вы уверены, что хотите удалить этот отзыв? Это действие нельзя
              будет отменить.
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
              Вы уверены, что хотите одобрить этот отзыв?
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
              Вы уверены, что хотите отклонить этот отзыв?
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

      {/* AI moderation suggestion dialog */}
      <Dialog open={aiDialogOpen} onOpenChange={setAiDialogOpen}>
        <DialogContent className="sm:max-w-md md:max-w-xl lg:max-w-2xl bg-white">
          <DialogHeader className="bg-red-600 -mx-6 -mt-6 px-6 py-4 rounded-t-lg">
            <DialogTitle className="flex items-center gap-2 text-white">
              <AlertCircle className="w-5 h-5" />
              Обнаружена нежелательная лексика!
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-red-50 border border-red-100 rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-2">
                Оригинальный текст:
              </h4>
              <p>
                «Это место работы — полный бардак! Руководству наплевать на
                сотрудников, а нагрузка безумная».
              </p>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-2">
                Рекомендуемая правка:
              </h4>
              <p>
                «Это рабочее место крайне{" "}
                <span className="text-green-700 font-medium">
                  неорганизованно
                </span>
                . Руководство не заботится о благополучии сотрудников, а рабочая
                нагрузка безумная».
              </p>
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setAiDialogOpen(false)}>
              Отмена
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={() => {
                toast({
                  title: "Правка применена",
                  description: "Рекомендуемая правка была применена",
                });
                setAiDialogOpen(false);
              }}
            >
              Одобрить правку
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Review details dialog */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        {selectedReview && (
          <DialogContent className="sm:max-w-md md:max-w-xl bg-white">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold">
                {selectedReview.title}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b pb-4">
                <h3 className="font-semibold text-[#800000]">
                  {selectedReview.companyName}
                </h3>
                <p className="text-gray-600">{selectedReview.position}</p>
                <div className="flex items-center gap-2 ml-auto">
                  <span className="text-gray-700">Общая оценка:</span>
                  <span className="font-semibold text-[#800000]">
                    {selectedReview.rating} / 5
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-gray-800 leading-relaxed">
                  {selectedReview.content}
                </p>

                {selectedReview.hasComment && (
                  <div className="bg-red-50 border-l-4 border-red-500 pl-4 py-3 pr-3 mt-4">
                    <h4 className="text-red-600 font-medium mb-1">
                      Комментарий модератора:
                    </h4>
                    <p className="text-gray-800">
                      Пожалуйста, воздержитесь от использования резких
                      выражений. Отредактируйте отзыв для публикации.
                    </p>
                  </div>
                )}

                {isAdmin && (
                  <>
                    <Separator className="my-4" />

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Bot className="w-5 h-5 text-blue-600" />
                        <h4 className="font-medium text-gray-800">
                          Обратная связь от ИИ:
                        </h4>
                      </div>
                      <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                        <p className="text-gray-700 text-sm">
                          Отзыв содержит негативные высказывания, которые могут
                          быть восприняты как оскорбительные. Рекомендуется
                          смягчить формулировки.
                        </p>
                      </div>
                    </div>

                    <div className="mt-4">
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
                  </>
                )}
              </div>
            </div>

            <DialogFooter className="mt-6">
              {!isAdmin && selectedReview.status !== "Одобрено" && (
                <Button
                  onClick={() => handleEditReview(selectedReview.id)}
                  className="mr-auto"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Редактировать
                </Button>
              )}

              {isAdmin && selectedReview.status === "Новый" && (
                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      setDetailsDialogOpen(false);
                      handleApproveClick(selectedReview.id);
                    }}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Одобрить
                  </Button>
                  <Button
                    onClick={() => {
                      setDetailsDialogOpen(false);
                      handleRejectClick(selectedReview.id);
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
