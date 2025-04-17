// src/app/profile/reviews/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
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
import { Separator } from "@/components/ui/separator";
import {
  fetchUserReviews,
  fetchAllReviews,
  deleteReview,
  updateReviewStatus,
} from "@/features/review/reviewSlice";
import { RootState, AppDispatch } from "@/store";
import { useAuth } from "@/hooks/useAuth";

export default function ReviewsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth();

  // Determine if user is admin
  const isAdmin = user?.role === "ROLE_ADMIN";

  const [currentTab, setCurrentTab] = useState("Все");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);
  const [aiDialogOpen, setAiDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<any>(null);
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [adminComment, setAdminComment] = useState("");

  // Get reviews from the store
  const {
    userReviews,
    allReviews,
    isLoading,
    error,
    userReviewsLoaded,
    allReviewsLoaded,
  } = useSelector((state: RootState) => state.review);

  // Fetch reviews on component mount
  useEffect(() => {
    if (isAdmin) {
      if (!allReviewsLoaded) {
        dispatch(fetchAllReviews(undefined));
      }
    } else {
      if (!userReviewsLoaded) {
        dispatch(fetchUserReviews());
      }
    }
  }, [dispatch, isAdmin, allReviewsLoaded, userReviewsLoaded]);

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

  const confirmDelete = async () => {
    if (selectedReviewId) {
      try {
        await dispatch(deleteReview(selectedReviewId)).unwrap();
        toast({
          title: "Отзыв удален",
          description: "Отзыв был успешно удален",
        });
      } catch (error) {
        toast({
          title: "Ошибка",
          description: "Не удалось удалить отзыв",
          variant: "destructive",
        });
      }
    }
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

  const confirmApprove = async () => {
    if (selectedReviewId) {
      try {
        const data = {
          status: "APPROVED",
          adminComment:
            adminComment.trim() || "Отзыв соответствует правилам сервиса",
        };

        await dispatch(
          updateReviewStatus({ reviewId: selectedReviewId, data })
        ).unwrap();

        toast({
          title: "Отзыв одобрен",
          description: "Отзыв был успешно одобрен",
        });
      } catch (error) {
        toast({
          title: "Ошибка",
          description: "Не удалось одобрить отзыв",
          variant: "destructive",
        });
      }
    }
    setApproveDialogOpen(false);
    setSelectedReviewId(null);
    setAdminComment("");
  };

  const confirmReject = async () => {
    if (!adminComment.trim() && isAdmin) {
      toast({
        title: "Требуется комментарий",
        description: "Пожалуйста, укажите причину отклонения отзыва",
        variant: "destructive",
      });
      return;
    }

    if (selectedReviewId) {
      try {
        const data = {
          status: "REJECTED",
          adminComment: adminComment,
        };

        await dispatch(
          updateReviewStatus({ reviewId: selectedReviewId, data })
        ).unwrap();

        toast({
          title: "Отзыв отклонен",
          description: "Отзыв был отклонен",
        });
      } catch (error) {
        toast({
          title: "Ошибка",
          description: "Не удалось отклонить отзыв",
          variant: "destructive",
        });
      }
    }
    setRejectDialogOpen(false);
    setSelectedReviewId(null);
    setAdminComment("");
  };
  const handleModerate = (reviewId: string, action: "approve" | "reject") => {
    if (action === "approve") {
      handleApproveClick(reviewId);
    } else if (action === "reject") {
      const review = (isAdmin ? allReviews : userReviews).find(
        (r) => r.id.toString() === reviewId
      );
      if (review) {
        setSelectedReview(review);
        setSelectedReviewId(reviewId); // Add this line
        setRejectDialogOpen(true);
      }
    }
  };

  // Filter reviews based on selected status tab and user role
  const getFilteredReviews = () => {
    const reviews = isAdmin ? allReviews : userReviews;

    if (currentTab === "Все") return reviews;

    const statusMap: Record<string, string> = {
      Новые: "Новый",
      Одобренные: "Одобрено",
      Отклоненные: "Отказано",
    };

    return reviews.filter((review) => review.status === statusMap[currentTab]);
  };

  const getStatusBadgeVariant = (status: string) => {
    if (status === "Одобрено") return "primary";
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

  // Check if a review can be edited (only PENDING or REJECTED reviews)
  const canEdit = (review: any) => {
    return review.status === "Новый" || review.status === "Отказано";
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

      <Tabs defaultValue="Все" onValueChange={setCurrentTab} className="w-full">
        <TabsList className="bg-gray-100 p-1 rounded-lg mb-6 w-full grid grid-cols-4 ">
          {statusTabs.map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="data-[state=active]:bg-white data-[state=active]:text-[#800000] data-[state=active]:shadow-sm py-2 font-medium"
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>

        {statusTabs.map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-0">
            <Card>
              <CardContent className="p-0">
                {isLoading ? (
                  <div className="flex justify-center items-center p-8">
                    <p>Загрузка отзывов...</p>
                  </div>
                ) : error ? (
                  <div className="flex justify-center items-center p-8 text-red-500">
                    <p>Ошибка загрузки: {error}</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-[#800000] font-semibold">
                            Компания
                          </TableHead>
                          <TableHead className="text-[#800000] font-semibold hidden md:table-cell">
                            Должность
                          </TableHead>
                          <TableHead className="text-[#800000] font-semibold">
                            Рейтинг
                          </TableHead>
                          <TableHead className="text-[#800000] font-semibold hidden sm:table-cell">
                            Заголовок
                          </TableHead>
                          <TableHead className="text-[#800000] font-semibold hidden lg:table-cell">
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
                        {getFilteredReviews().map((review) => (
                          <TableRow
                            key={review.id}
                            className="hover:bg-gray-50"
                          >
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <span>{review.companyName}</span>
                                {review.hasVerification && (
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
                                <span className="font-semibold">
                                  {review.rating}
                                </span>
                                <span className="hidden sm:flex">
                                  {renderStarRating(review.rating)}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <p className="truncate max-w-[150px]">
                                {review.title}
                              </p>
                            </TableCell>
                            <TableCell className="hidden lg:table-cell">
                              {review.date}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Badge
                                  variant={getStatusBadgeVariant(review.status)}
                                >
                                  {review.status}
                                </Badge>
                                {review.hasAdminComment && (
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
                                        onClick={() =>
                                          handleViewDetails(review)
                                        }
                                      >
                                        <Eye className="w-4 h-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Просмотреть</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>

                                {!isAdmin && canEdit(review) && (
                                  <>
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() =>
                                              handleEditReview(
                                                review.id.toString()
                                              )
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
                                  </>
                                )}

                                {!isAdmin && (
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          onClick={() =>
                                            handleDeleteReview(
                                              review.id.toString()
                                            )
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
                                              handleModerate(
                                                review.id.toString(),
                                                "approve"
                                              )
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
                                              handleModerate(
                                                review.id.toString(),
                                                "reject"
                                              )
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
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

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

      {/* Approve dialog */}
      <Dialog open={approveDialogOpen} onOpenChange={setApproveDialogOpen}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle>Подтверждение одобрения</DialogTitle>
            <DialogDescription>
              Вы уверены, что хотите одобрить этот отзыв?
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            <label
              htmlFor="admin-comment"
              className="block text-gray-600 font-medium mb-2"
            >
              Комментарий администратора (необязательно):
            </label>
            <Textarea
              id="admin-comment"
              placeholder="Введите комментарий..."
              value={adminComment}
              onChange={(e) => setAdminComment(e.target.value)}
              rows={3}
            />
          </div>

          <DialogFooter className="mt-6">
            <Button
              variant="outline"
              onClick={() => setApproveDialogOpen(false)}
            >
              Отмена
            </Button>
            <Button
              onClick={confirmApprove}
              className="bg-green-600 hover:bg-green-700"
            >
              Одобрить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject dialog */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle>Подтверждение отклонения</DialogTitle>
            <DialogDescription>
              Вы уверены, что хотите отклонить этот отзыв?
            </DialogDescription>
          </DialogHeader>

          {selectedReview && selectedReview.aiAnalysis && (
            <div className="mt-4 bg-blue-50 border border-blue-100 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Bot className="w-5 h-5 text-blue-600" />
                <h4 className="font-medium text-gray-800">Анализ ИИ:</h4>
              </div>
              <p className="text-gray-700 text-sm">
                {selectedReview.aiAnalysis}
              </p>
            </div>
          )}

          <div className="mt-4">
            <label
              htmlFor="admin-comment"
              className="block text-gray-600 font-medium mb-2"
            >
              Комментарий администратора:{" "}
              <span className="text-red-500">*</span>
            </label>
            <Textarea
              id="admin-comment"
              placeholder="Введите причину отклонения отзыва..."
              value={adminComment}
              onChange={(e) => setAdminComment(e.target.value)}
              rows={3}
              className={!adminComment.trim() ? "border-red-300" : ""}
            />
            {!adminComment.trim() && (
              <p className="text-red-500 text-sm mt-1">
                Пожалуйста, укажите причину отклонения отзыва
              </p>
            )}
          </div>

          <DialogFooter className="mt-6">
            <Button
              variant="outline"
              onClick={() => setRejectDialogOpen(false)}
            >
              Отмена
            </Button>
            <Button
              onClick={confirmReject}
              className="bg-red-600 hover:bg-red-700"
              disabled={!adminComment.trim()}
            >
              Отклонить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Review details dialog */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        {selectedReview && (
          <DialogContent className="sm:max-w-md md:max-w-xl bg-white max-h-[80vh] overflow-y-auto">
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
                <div>
                  <h5 className="font-medium mb-1">Основной отзыв</h5>
                  <p className="text-gray-800 leading-relaxed">
                    {selectedReview.body}
                  </p>
                </div>

                {selectedReview.pros && (
                  <div>
                    <h5 className="font-medium mb-1">Плюсы</h5>
                    <p className="text-gray-800">{selectedReview.pros}</p>
                  </div>
                )}

                {selectedReview.cons && (
                  <div>
                    <h5 className="font-medium mb-1">Минусы</h5>
                    <p className="text-gray-800">{selectedReview.cons}</p>
                  </div>
                )}

                {selectedReview.advice && (
                  <div>
                    <h5 className="font-medium mb-1">Советы руководству</h5>
                    <p className="text-gray-800">{selectedReview.advice}</p>
                  </div>
                )}

                <Separator className="my-4" />

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <h5 className="font-medium mb-1">Карьерный рост</h5>
                    <div className="flex items-center">
                      <span className="mr-2">
                        {selectedReview.careerOpportunities}
                      </span>
                      {renderStarRating(selectedReview.careerOpportunities)}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium mb-1">Баланс работы/жизни</h5>
                    <div className="flex items-center">
                      <span className="mr-2">
                        {selectedReview.workLifeBalance}
                      </span>
                      {renderStarRating(selectedReview.workLifeBalance)}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium mb-1">Компенсация</h5>
                    <div className="flex items-center">
                      <span className="mr-2">
                        {selectedReview.compensation}
                      </span>
                      {renderStarRating(selectedReview.compensation)}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium mb-1">Безопасность работы</h5>
                    <div className="flex items-center">
                      <span className="mr-2">{selectedReview.jobSecurity}</span>
                      {renderStarRating(selectedReview.jobSecurity)}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium mb-1">Управление</h5>
                    <div className="flex items-center">
                      <span className="mr-2">{selectedReview.management}</span>
                      {renderStarRating(selectedReview.management)}
                    </div>
                  </div>
                </div>

                {selectedReview.hasAdminComment &&
                  selectedReview.adminComment && (
                    <div className="bg-red-50 border-l-4 border-red-500 pl-4 py-3 pr-3 mt-4">
                      <h4 className="text-red-600 font-medium mb-1">
                        Комментарий модератора:
                      </h4>
                      <p className="text-gray-800">
                        {selectedReview.adminComment}
                      </p>
                    </div>
                  )}

                {isAdmin && selectedReview.aiAnalysis && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Bot className="w-5 h-5 text-blue-600" />
                      <h4 className="font-medium text-gray-800">
                        Обратная связь от ИИ:
                      </h4>
                    </div>
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                      <p className="text-gray-700 text-sm">
                        {selectedReview.aiAnalysis}
                      </p>
                    </div>
                  </div>
                )}

                {isAdmin && selectedReview.status === "Новый" && (
                  <div className="mt-4">
                    <label
                      htmlFor="admin-comment-details"
                      className="block text-gray-600 font-medium mb-2"
                    >
                      Комментарий администратора:
                    </label>
                    <Textarea
                      id="admin-comment-details"
                      placeholder="Введите комментарий..."
                      value={adminComment}
                      onChange={(e) => setAdminComment(e.target.value)}
                      rows={3}
                    />
                  </div>
                )}
              </div>
            </div>

            <DialogFooter className="mt-6">
              {!isAdmin && canEdit(selectedReview) && (
                <Button
                  onClick={() => {
                    setDetailsDialogOpen(false);
                    handleEditReview(selectedReview.id.toString());
                  }}
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
                      handleApproveClick(selectedReview.id.toString());
                    }}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Одобрить
                  </Button>
                  <Button
                    onClick={() => {
                      setDetailsDialogOpen(false);
                      handleRejectClick(selectedReview.id.toString());
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
