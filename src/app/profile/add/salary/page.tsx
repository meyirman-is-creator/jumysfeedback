"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  ChevronLeft,
  ChevronRight,
  Save,
  X,
  Building,
  Briefcase,
  DollarSign,
  Users,
  MapPin,
  FileUp,
} from "lucide-react";

export default function AddSalaryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEditing = searchParams.has("id");

  // State for stepper
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    "Компания и должность",
    "Информация о зарплате",
    "Дополнительно",
    "Подтверждение",
  ];

  // Form state
  const [formData, setFormData] = useState({
    companyName: "",
    position: "",
    department: "",
    employmentStatus: "current", // 'current' or 'former'
    employmentType: "full-time", // 'full-time', 'part-time', 'contract', etc.
    employmentContract: null as File | null, // To store the uploaded file
    salary: "",
    currency: "USD",
    payPeriod: "monthly", // 'monthly', 'yearly'
    bonuses: "",
    stockOptions: "",
    experience: "1-3", // '0-1', '1-3', '3-5', '5-10', '10+'
    location: "",
    anonymous: true,
    confirmTruthful: false,
  });

  // Form validation
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
      case 1:
        if (!formData.salary.trim()) {
          newErrors.salary = "Укажите размер базовой зарплаты";
        } else if (isNaN(Number(formData.salary))) {
          newErrors.salary = "Зарплата должна быть числом";
        }
        if (!formData.currency.trim()) {
          newErrors.currency = "Укажите валюту";
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

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
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
      router.push("/profile/salaries");
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
            {isEditing
              ? "Редактирование данных о зарплате"
              : "Добавление данных о зарплате"}
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
            {/* Stepper */}
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
                    <Label htmlFor="department">Отдел/Департамент</Label>
                    <div className="relative">
                      <Users
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        size={16}
                      />
                      <Input
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        className="pl-10"
                        placeholder="Название отдела"
                      />
                    </div>
                    <p className="text-gray-500 text-sm">Необязательно</p>
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
                      Загрузите документ, подтверждающий вашу зарплату и
                      трудоустройство. Это поможет верифицировать ваши данные.
                    </p>
                  </div>
                </div>
              )}

              {activeStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-[#800000] mb-4">
                    Данные о зарплате
                  </h2>

                  <div className="space-y-2">
                    <Label>Базовая зарплата *</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-1 relative">
                        <DollarSign
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                          size={16}
                        />
                        <Input
                          name="salary"
                          type="number"
                          value={formData.salary}
                          onChange={handleChange}
                          className={`pl-10 ${
                            errors.salary ? "border-red-500" : ""
                          }`}
                          placeholder="Сумма"
                        />
                      </div>

                      <div className="sm:col-span-1">
                        <select
                          name="currency"
                          value={formData.currency}
                          onChange={handleChange}
                          className={`w-full rounded-md border ${
                            errors.currency ? "border-red-500" : "border-input"
                          } bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}
                        >
                          <option value="USD">USD</option>
                          <option value="EUR">EUR</option>
                          <option value="KZT">KZT</option>
                          <option value="RUB">RUB</option>
                        </select>
                      </div>

                      <div className="sm:col-span-1">
                        <select
                          name="payPeriod"
                          value={formData.payPeriod}
                          onChange={handleChange}
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                          <option value="monthly">в месяц</option>
                          <option value="yearly">в год</option>
                        </select>
                      </div>
                    </div>
                    {errors.salary && (
                      <p className="text-red-500 text-sm">{errors.salary}</p>
                    )}
                    {errors.currency && (
                      <p className="text-red-500 text-sm">{errors.currency}</p>
                    )}
                  </div>

                  <Separator className="my-4 bg-[#800000]/10" />

                  <h3 className="text-lg font-medium text-[#800000]">
                    Дополнительные выплаты
                  </h3>

                  <div className="space-y-2">
                    <Label htmlFor="bonuses">Бонусы и премии</Label>
                    <Input
                      id="bonuses"
                      name="bonuses"
                      value={formData.bonuses}
                      onChange={handleChange}
                      placeholder="Например: годовой бонус 15% от зарплаты"
                    />
                    <p className="text-gray-500 text-sm">Необязательно</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stockOptions">Опционы и акции</Label>
                    <Input
                      id="stockOptions"
                      name="stockOptions"
                      value={formData.stockOptions}
                      onChange={handleChange}
                      placeholder="Например: 100 RSU в год"
                    />
                    <p className="text-gray-500 text-sm">Необязательно</p>
                  </div>
                </div>
              )}

              {activeStep === 2 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-[#800000] mb-4">
                    Дополнительная информация
                  </h2>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Опыт работы</Label>
                    <select
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="0-1">Менее 1 года</option>
                      <option value="1-3">1-3 года</option>
                      <option value="3-5">3-5 лет</option>
                      <option value="5-10">5-10 лет</option>
                      <option value="10+">Более 10 лет</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Местоположение</Label>
                    <div className="relative">
                      <MapPin
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        size={16}
                      />
                      <Input
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="pl-10"
                        placeholder="Например: Алматы, Казахстан"
                      />
                    </div>
                    <p className="text-gray-500 text-sm">
                      Город и страна, где вы работаете
                    </p>
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

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <h4 className="text-lg font-medium mb-1">
                            {formData.position}
                          </h4>
                          <p className="text-[#800000] font-medium">
                            {formData.companyName}
                          </p>
                          {formData.employmentContract && (
                            <p className="text-green-600 text-sm flex items-center gap-1 mt-1">
                              <span className="w-2 h-2 inline-block bg-green-600 rounded-full"></span>
                              Верифицировано трудовым договором
                            </p>
                          )}
                        </div>

                        <div>
                          <p className="text-xl font-bold text-[#800000]">
                            {formData.currency === "USD"
                              ? "$"
                              : formData.currency === "EUR"
                              ? "€"
                              : formData.currency === "KZT"
                              ? "₸"
                              : ""}
                            {formData.salary}{" "}
                            {formData.payPeriod === "monthly"
                              ? "в месяц"
                              : "в год"}
                          </p>
                        </div>

                        <div>
                          <p className="text-gray-600 font-medium">
                            Опыт работы:
                          </p>
                          <p>
                            {
                              {
                                "0-1": "Менее 1 года",
                                "1-3": "1-3 года",
                                "3-5": "3-5 лет",
                                "5-10": "5-10 лет",
                                "10+": "Более 10 лет",
                              }[formData.experience]
                            }
                          </p>
                        </div>

                        {formData.location && (
                          <div>
                            <p className="text-gray-600 font-medium">
                              Местоположение:
                            </p>
                            <p>{formData.location}</p>
                          </div>
                        )}

                        {formData.bonuses && (
                          <div>
                            <p className="text-gray-600 font-medium">Бонусы:</p>
                            <p>{formData.bonuses}</p>
                          </div>
                        )}

                        {formData.stockOptions && (
                          <div>
                            <p className="text-gray-600 font-medium">
                              Опционы и акции:
                            </p>
                            <p>{formData.stockOptions}</p>
                          </div>
                        )}

                        <div>
                          <p className="text-gray-600 font-medium">Статус:</p>
                          <p>
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
                        </div>
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
                      <Label htmlFor="anonymous">
                        Оставить информацию анонимно
                      </Label>
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
                        Я подтверждаю, что эта информация основана на моем
                        личном опыте работы, и данные достоверны
                      </Label>
                    </div>
                    {errors.confirmTruthful && (
                      <p className="text-red-500 text-sm">
                        {errors.confirmTruthful}
                      </p>
                    )}
                  </div>

                  <div className="p-4 bg-[#800000]/5 rounded-lg">
                    <p className="text-gray-600 text-sm">
                      Ваша информация будет использована только в обобщенном
                      виде. Мы не раскрываем личные данные пользователей.
                    </p>
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
                    {isEditing ? "Сохранить изменения" : "Отправить данные"}
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
