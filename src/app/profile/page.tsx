"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Edit,
  ArrowRight,
  KeyRound,
  User,
  Briefcase,
  Building,
  MapPin,
  Mail,
  Phone,
  EyeOff,
  Eye,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function ProfilePage() {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { user } = useAuth();

  // Use user data from auth store, fallback to default values if not available
  const userData = {
    name: user?.fullName || "Неизвестно",
    jobTitle: user?.jobTitle || "Неизвестно",
    location: user?.location || "Неизвестно",
    email: user?.email || "Неизвестно",
    phone: user?.phone || "Неизвестно",
    joinDate: user?.withUsSince || "Неизвестно",
    company: user?.company || "Неизвестно",
    reviewCount: 12,
    salaryCount: 5,
  };

  const profileFormSchema = z.object({
    name: z.string().min(2, {
      message: "Имя должно содержать минимум 2 символа",
    }),
    jobTitle: z.string().min(2, {
      message: "Должность должна содержать минимум 2 символа",
    }),
    company: z.string(),
    location: z.string(),
    email: z.string().email({
      message: "Введите корректный email",
    }),
    phone: z.string(),
  });

  const passwordFormSchema = z
    .object({
      currentPassword: z.string().min(8, {
        message: "Пароль должен содержать минимум 8 символов",
      }),
      newPassword: z.string().min(8, {
        message: "Пароль должен содержать минимум 8 символов",
      }),
      confirmPassword: z.string().min(8, {
        message: "Пароль должен содержать минимум 8 символов",
      }),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: "Пароли не совпадают",
      path: ["confirmPassword"],
    });

  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: userData.name,
      jobTitle: userData.jobTitle,
      company: userData.company,
      location: userData.location,
      email: userData.email,
      phone: userData.phone,
    },
  });

  const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  function onProfileSubmit(values: z.infer<typeof profileFormSchema>) {
    console.log(values);
    setIsEditDialogOpen(false);
  }

  function onPasswordSubmit(values: z.infer<typeof passwordFormSchema>) {
    console.log(values);
    setIsPasswordDialogOpen(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Мой профиль</h1>
        <div className="flex flex-wrap gap-2">
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                Редактировать
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-white">
              <DialogHeader>
                <DialogTitle>Редактировать профиль</DialogTitle>
                <DialogDescription>
                  Внесите изменения в профиль и нажмите сохранить, когда
                  закончите.
                </DialogDescription>
              </DialogHeader>
              <Form {...profileForm}>
                <form
                  onSubmit={profileForm.handleSubmit(onProfileSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={profileForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ФИО</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User
                              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                              size={16}
                            />
                            <Input {...field} className="pl-10" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
                    name="jobTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Должность</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Briefcase
                              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                              size={16}
                            />
                            <Input {...field} className="pl-10" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Компания</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Building
                              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                              size={16}
                            />
                            <Input {...field} className="pl-10" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Локация</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <MapPin
                              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                              size={16}
                            />
                            <Input {...field} className="pl-10" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail
                              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                              size={16}
                            />
                            <Input {...field} className="pl-10" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Телефон</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone
                              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                              size={16}
                            />
                            <Input {...field} className="pl-10" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button type="submit">Сохранить</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>

          <Dialog
            open={isPasswordDialogOpen}
            onOpenChange={setIsPasswordDialogOpen}
          >
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <KeyRound className="h-4 w-4" />
                Сменить пароль
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-white">
              <DialogHeader>
                <DialogTitle>Сменить пароль</DialogTitle>
                <DialogDescription>
                  Введите текущий и новый пароль для смены.
                </DialogDescription>
              </DialogHeader>
              <Form {...passwordForm}>
                <form
                  onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={passwordForm.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Текущий пароль</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <KeyRound
                              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                              size={16}
                            />
                            <Input
                              type={showCurrentPassword ? "text" : "password"}
                              {...field}
                              className="pl-10 pr-10"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2"
                              onClick={() =>
                                setShowCurrentPassword(!showCurrentPassword)
                              }
                            >
                              {showCurrentPassword ? (
                                <EyeOff className="h-4 w-4 text-gray-500" />
                              ) : (
                                <Eye className="h-4 w-4 text-gray-500" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={passwordForm.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Новый пароль</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <KeyRound
                              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                              size={16}
                            />
                            <Input
                              type={showNewPassword ? "text" : "password"}
                              {...field}
                              className="pl-10 pr-10"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2"
                              onClick={() =>
                                setShowNewPassword(!showNewPassword)
                              }
                            >
                              {showNewPassword ? (
                                <EyeOff className="h-4 w-4 text-gray-500" />
                              ) : (
                                <Eye className="h-4 w-4 text-gray-500" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={passwordForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Подтвердите пароль</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <KeyRound
                              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                              size={16}
                            />
                            <Input
                              type={showConfirmPassword ? "text" : "password"}
                              {...field}
                              className="pl-10 pr-10"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="h-4 w-4 text-gray-500" />
                              ) : (
                                <Eye className="h-4 w-4 text-gray-500" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button type="submit">Сохранить</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-[#800000]">
              Основная информация
            </CardTitle>
            <Separator className="bg-[#800000]/10" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-3 items-center">
                <span className="text-sm font-medium text-slate-500">Пользователь</span>
                <span className="col-span-2 text-slate-900">
                  {userData.name}
                </span>
              </div>

              <div className="grid grid-cols-3 items-center">
                <span className="text-sm font-medium text-slate-500">
                  Должность
                </span>
                <span className="col-span-2 text-slate-900">
                  {userData.jobTitle}
                </span>
              </div>

              <div className="grid grid-cols-3 items-center">
                <span className="text-sm font-medium text-slate-500">
                  Компания
                </span>
                <span className="col-span-2 text-slate-900">
                  {userData.company}
                </span>
              </div>

              <div className="grid grid-cols-3 items-center">
                <span className="text-sm font-medium text-slate-500">
                  Локация
                </span>
                <span className="col-span-2 text-slate-900">
                  {userData.location}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-[#800000]">
              Контактная информация
            </CardTitle>
            <Separator className="bg-[#800000]/10" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-3 items-center">
                <span className="text-sm font-medium text-slate-500">
                  Email
                </span>
                <span className="col-span-2 text-slate-900">
                  {userData.email}
                </span>
              </div>

              <div className="grid grid-cols-3 items-center">
                <span className="text-sm font-medium text-slate-500">
                  Телефон
                </span>
                <span className="col-span-2 text-slate-900">
                  {userData.phone}
                </span>
              </div>

              <div className="grid grid-cols-3 items-center">
                <span className="text-sm font-medium text-slate-500">
                  С нами с
                </span>
                <span className="col-span-2 text-slate-900">
                  {userData.joinDate}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-[#800000]">
            Ваш вклад в сообщество
          </CardTitle>
          <Separator className="bg-[#800000]/10" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <div className="flex flex-col items-center justify-center p-4 bg-[#800000]/5 rounded-lg max-w-md w-full">
              <span className="text-3xl font-bold text-[#800000]">
                {userData.reviewCount}
              </span>
              <span className="text-sm text-slate-600 mt-1 mb-4 text-center">
                Отзывов о компаниях
              </span>
              <Button
                variant="link"
                className="text-[#800000] no-underline"
                size="sm"
                asChild
              >
                <a href="/profile/reviews" className="flex items-center">
                  Просмотреть
                  <ArrowRight className="h-4 w-4 ml-1" />
                </a>
              </Button>
            </div>

            <div className="flex flex-col items-center justify-center p-4 bg-[#800000]/5 rounded-lg max-w-md w-full">
              <span className="text-3xl font-bold text-[#800000]">
                {userData.salaryCount}
              </span>
              <span className="text-sm text-slate-600 mt-1 mb-4 text-center">
                Записей о зарплатах
              </span>
              <Button
                variant="link"
                className="text-[#800000] no-underline"
                size="sm"
                asChild
              >
                <a href="/profile/salaries" className="flex items-center">
                  Просмотреть
                  <ArrowRight className="h-4 w-4 ml-1" />
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
