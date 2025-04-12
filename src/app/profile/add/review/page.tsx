"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Rating } from "@/components/ui/rating";
import { Separator } from "@/components/ui/separator";
import {
  ChevronLeft,
  ChevronRight,
  Save,
  X,
  Building,
  Briefcase,
  Star,
  FileUp,
} from "lucide-react";

export default function AddReviewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEditing = searchParams.has("id");

  // State for stepper
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    "Компания и должность",
    "Ваш опыт",
    "Детали отзыва",
    "Подтверждение",
  ];

  // Form state
  const [formData, setFormData] = useState({
    companyName: "",
    position: "",
    employmentStatus: "current", // 'current' or 'former'
    employmentType: "full-time", // 'full-time', 'part-time', 'contract', etc.
    employmentContract: null, // To store the uploaded file
    overallRating: 3,
    careerOpportunities: 3,
    workLifeBalance: 3,
    compensation: 3,
    jobSecurity: 3,
    management: 3,
    title: "",
    pros: "",
    cons: "",
    advice: "",
    recommendToFriend: "yes",
    anonymous: true,
    confirmTruthful: false,
  });

  // Form errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 0:
        if (!formData.companyName.trim()) {
          newErrors.companyName = "Укажите название компании";
        }
        if (!formData.position.trim()) {
          newErrors.position = "Укажите должность";
        }
        break;
      case 2:
        if (!formData.title.trim()) {
          newErrors.title = "Добавьте заголовок отзыва";
        }
        if (!formData.pros.trim()) {
          newErrors.pros = "Укажите хотя бы один плюс работы";
        }
        if (!formData.cons.trim()) {
          newErrors.cons = "Укажите хотя бы один минус работы";
        }
        break;
      case 3:
        if (!formData.confirmTruthful) {
          newErrors.confirmTruthful =
            "Необходимо подтвердить достоверность информации";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
      | { target: { name?: string; value: unknown } }
  ) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prev) => ({ ...prev, [name]: value }));

      if (errors[name]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    }
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));

    // Clear error when field is changed
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleRatingChange = (name: string, value: number) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        employmentContract: e.target.files ? e.target.files[0] : null,
      }));
    }
  };

  const handleSubmit = () => {
    if (validateStep(activeStep)) {
      // Handle submission logic here
      console.log("Form submitted:", formData);
      router.push("/profile/reviews");
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <Container className="py-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditing ? "Редактирование отзыва" : "Добавление отзыва"}
          </h1>

          {/* Mobile Cancel Button */}
          <Button
            variant="outline"
            onClick={handleCancel}
            className="md:hidden flex items-center text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <X size={18} className="mr-1" />
            Отмена
          </Button>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            {/* Stepper - Mobile uses numbers, desktop uses text */}
            <div className="mb-6">
              <div className="flex justify-between w-full mb-2">
                {steps.map((label, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center text-xs md:text-sm w-full ${
                      activeStep >= index
                        ? "text-[#800000] font-medium"
                        : "text-gray-400"
                    }`}
                  >
                    <div
                      className={`
                      h-2 w-full ${
                        index === 0
                          ? "ml-auto w-1/2"
                          : index === steps.length - 1
                          ? "mr-auto w-1/2"
                          : ""
                      }
                      ${activeStep >= index ? "bg-[#800000]" : "bg-gray-200"}
                    `}
                    ></div>
                    <div className="mt-2 text-center flex flex-col items-center">
                      {/* Mobile - show numbers */}
                      <span className="md:hidden text-lg font-semibold flex items-center justify-center w-7 h-7 rounded-full border border-current">
                        {index + 1}
                      </span>
                      {/* Desktop - show text */}
                      <span className="hidden md:block">{label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step content */}
            <div className="min-h-[350px] mb-6">
              {activeStep === 0 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-[#800000] mb-4">
                    Информация о компании и должности
                  </h2>

                  <div className="space-y-2">
                    <Label htmlFor="companyName">Компания *</Label>
                    <div className="relative">
                      <Building
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        size={16}
                      />
                      <Input
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        className={`pl-10 ${
                          errors.companyName ? "border-red-500" : ""
                        }`}
                        placeholder="Название компании"
                      />
                    </div>
                    {errors.companyName && (
                      <p className="text-red-500 text-sm">
                        {errors.companyName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="position">Должность *</Label>
                    <div className="relative">
                      <Briefcase
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        size={16}
                      />
                      <Input
                        id="position"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        className={`pl-10 ${
                          errors.position ? "border-red-500" : ""
                        }`}
                        placeholder="Ваша должность в компании"
                      />
                    </div>
                    {errors.position && (
                      <p className="text-red-500 text-sm">{errors.position}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="employmentStatus">Статус работы *</Label>
                    <RadioGroup
                      id="employmentStatus"
                      name="employmentStatus"
                      value={formData.employmentStatus}
                      onValueChange={(value) =>
                        handleChange({
                          target: { name: "employmentStatus", value },
                        })
                      }
                      className="flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="current" id="current" />
                        <Label htmlFor="current">Текущий сотрудник</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="former" id="former" />
                        <Label htmlFor="former">Бывший сотрудник</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="employmentType">Тип занятости</Label>
                    <select
                      id="employmentType"
                      name="employmentType"
                      value={formData.employmentType}
                      onChange={(e) => handleChange(e)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="full-time">Полная занятость</option>
                      <option value="part-time">Частичная занятость</option>
                      <option value="contract">Контракт</option>
                      <option value="internship">Стажировка</option>
                      <option value="freelance">Фриланс</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="employmentContract"
                      className="flex items-center"
                    >
                      Трудовой договор{" "}
                      <span className="text-gray-400 text-sm ml-2">
                        (необязательно)
                      </span>
                    </Label>
                    <div className="relative">
                      <Label
                        htmlFor="employmentContract"
                        className="flex items-center justify-center gap-2 border border-dashed border-gray-300 rounded-md p-4 cursor-pointer hover:bg-gray-50"
                      >
                        <FileUp size={20} className="text-[#800000]" />
                        <span>
                          {formData.employmentContract
                            ? formData.employmentContract.name
                            : "Загрузить трудовой договор"}
                        </span>
                      </Label>
                      <Input
                        id="employmentContract"
                        name="employmentContract"
                        type="file"
                        onChange={handleFileChange}
                        className="sr-only"
                        accept=".pdf,.doc,.docx"
                      />
                    </div>
                    <p className="text-gray-500 text-sm">
                      Загрузите документ, подтверждающий ваше трудоустройство.
                      Это поможет верифицировать ваш отзыв.
                    </p>
                  </div>
                </div>
              )}

              {activeStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-[#800000] mb-4">
                    Оцените свой опыт работы
                  </h2>

                  <div className="space-y-2">
                    <Label>Общая оценка *</Label>
                    <div className="flex items-center gap-2">
                      <Rating
                        value={formData.overallRating}
                        onValueChange={(value) =>
                          handleRatingChange("overallRating", value)
                        }
                        icon={
                          <Star className="fill-[#f5b400] stroke-[#f5b400]" />
                        }
                        emptyIcon={
                          <Star className="fill-gray-200 stroke-gray-200" />
                        }
                        className="text-2xl"
                      />
                      <span className="text-gray-600">
                        {formData.overallRating} / 5
                      </span>
                    </div>
                  </div>

                  <Separator className="my-4 bg-[#800000]/10" />

                  <h3 className="text-lg font-medium text-[#800000]">
                    Оцените по категориям
                  </h3>

                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <Label className="min-w-[180px]">
                        Карьерные возможности
                      </Label>
                      <Rating
                        value={formData.careerOpportunities}
                        onValueChange={(value) =>
                          handleRatingChange("careerOpportunities", value)
                        }
                        className="text-xl"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <Label className="min-w-[180px]">
                        Баланс работы и личной жизни
                      </Label>
                      <Rating
                        value={formData.workLifeBalance}
                        onValueChange={(value) =>
                          handleRatingChange("workLifeBalance", value)
                        }
                        className="text-xl"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <Label className="min-w-[180px]">
                        Компенсация и льготы
                      </Label>
                      <Rating
                        value={formData.compensation}
                        onValueChange={(value) =>
                          handleRatingChange("compensation", value)
                        }
                        className="text-xl"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <Label className="min-w-[180px]">
                        Стабильность работы
                      </Label>
                      <Rating
                        value={formData.jobSecurity}
                        onValueChange={(value) =>
                          handleRatingChange("jobSecurity", value)
                        }
                        className="text-xl"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <Label className="min-w-[180px]">
                        Качество управления
                      </Label>
                      <Rating
                        value={formData.management}
                        onValueChange={(value) =>
                          handleRatingChange("management", value)
                        }
                        className="text-xl"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeStep === 2 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-[#800000] mb-4">
                    Подробности вашего отзыва
                  </h2>

                  <div className="space-y-2">
                    <Label htmlFor="title">Заголовок отзыва *</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className={errors.title ? "border-red-500" : ""}
                      placeholder="Кратко опишите ваш опыт работы в компании"
                    />
                    {errors.title && (
                      <p className="text-red-500 text-sm">{errors.title}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pros">Плюсы *</Label>
                    <Textarea
                      id="pros"
                      name="pros"
                      value={formData.pros}
                      onChange={handleChange}
                      className={`min-h-[100px] ${
                        errors.pros ? "border-red-500" : ""
                      }`}
                      placeholder="Что вам нравилось в компании?"
                    />
                    {errors.pros && (
                      <p className="text-red-500 text-sm">{errors.pros}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cons">Минусы *</Label>
                    <Textarea
                      id="cons"
                      name="cons"
                      value={formData.cons}
                      onChange={handleChange}
                      className={`min-h-[100px] ${
                        errors.cons ? "border-red-500" : ""
                      }`}
                      placeholder="Что можно было бы улучшить?"
                    />
                    {errors.cons && (
                      <p className="text-red-500 text-sm">{errors.cons}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="advice">Советы руководству</Label>
                    <Textarea
                      id="advice"
                      name="advice"
                      value={formData.advice}
                      onChange={handleChange}
                      className="min-h-[80px]"
                      placeholder="Что бы вы посоветовали руководству компании?"
                    />
                    <p className="text-gray-500 text-sm">Необязательно</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Рекомендуете ли вы эту компанию?</Label>
                    <RadioGroup
                      name="recommendToFriend"
                      value={formData.recommendToFriend}
                      onValueChange={(value) =>
                        handleChange({
                          target: { name: "recommendToFriend", value },
                        })
                      }
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="recommend-yes" />
                        <Label htmlFor="recommend-yes">Да</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="recommend-no" />
                        <Label htmlFor="recommend-no">Нет</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              )}

              {activeStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-[#800000] mb-4">
                    Подтверждение и отправка
                  </h2>

                  <Card className="border border-[#800000]/10">
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg text-[#800000] mb-2 pb-2 border-b border-[#800000]/10">
                        Предварительный просмотр
                      </h3>

                      <div className="space-y-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                          <h4 className="text-xl font-medium">
                            {formData.title}
                          </h4>
                          <div className="flex items-center">
                            <Rating
                              value={formData.overallRating}
                              readOnly
                              className="text-lg"
                            />
                            <span className="ml-2 text-sm font-medium">
                              {formData.overallRating} / 5
                            </span>
                          </div>
                        </div>

                        <div>
                          <p className="text-[#800000] font-medium">
                            {formData.companyName} | {formData.position}
                          </p>
                          <p className="text-gray-500 text-sm">
                            {formData.employmentStatus === "current"
                              ? "Текущий сотрудник"
                              : "Бывший сотрудник"}{" "}
                            |{" "}
                            {
                              {
                                "full-time": "Полная занятость",
                                "part-time": "Частичная занятость",
                                contract: "Контракт",
                                internship: "Стажировка",
                                freelance: "Фриланс",
                              }[formData.employmentType]
                            }
                          </p>
                          {formData.employmentContract && (
                            <p className="text-green-600 text-sm flex items-center gap-1 mt-1">
                              <span className="w-2 h-2 inline-block bg-green-600 rounded-full"></span>
                              Верифицирован трудовым договором
                            </p>
                          )}
                        </div>

                        <div>
                          <h5 className="font-medium">Плюсы</h5>
                          <p className="text-gray-700">{formData.pros}</p>
                        </div>

                        <div>
                          <h5 className="font-medium">Минусы</h5>
                          <p className="text-gray-700">{formData.cons}</p>
                        </div>

                        {formData.advice && (
                          <div>
                            <h5 className="font-medium">Советы руководству</h5>
                            <p className="text-gray-700">{formData.advice}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="anonymous"
                        checked={formData.anonymous}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange("anonymous", checked as boolean)
                        }
                      />
                      <Label htmlFor="anonymous">Оставить отзыв анонимно</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="confirmTruthful"
                        checked={formData.confirmTruthful}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange(
                            "confirmTruthful",
                            checked as boolean
                          )
                        }
                      />
                      <Label htmlFor="confirmTruthful">
                        Я подтверждаю, что этот отзыв основан на моем личном
                        опыте работы, и информация в нем достоверна
                      </Label>
                    </div>
                    {errors.confirmTruthful && (
                      <p className="text-red-500 text-sm">
                        {errors.confirmTruthful}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-between pt-4 border-t border-[#800000]/10">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 hidden md:flex"
              >
                <X size={18} className="mr-2" />
                Отмена
              </Button>

              <div className="flex gap-3 w-full md:w-auto justify-end">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                  className="text-gray-600"
                >
                  <ChevronLeft size={18} className="mr-1" />
                  Назад
                </Button>

                {activeStep === steps.length - 1 ? (
                  <Button
                    onClick={handleSubmit}
                    className="bg-[#2e7d32] hover:bg-[#1b5e20]"
                  >
                    <Save size={18} className="mr-2" />
                    {isEditing ? "Сохранить изменения" : "Отправить отзыв"}
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    className="bg-[#800000] hover:bg-[#660000]"
                  >
                    Далее
                    <ChevronRight size={18} className="ml-1" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
