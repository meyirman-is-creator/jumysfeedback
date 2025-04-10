"use client";
import React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { mockCompanies } from "@/features/company/mockData";

function getCompaniesByIds(ids: string[]) {
  return mockCompanies.filter((c) => ids.includes(c.id));
}

export default function CompanyOverviewPage() {
  const params = useParams();
  const router = useRouter();
  const companyId =
    typeof params.companyId === "string" ? params.companyId : "";
  const company = mockCompanies.find((item) => item.id === companyId);

  if (!company) {
    return (
      <div className="mt-4 mb-8">
        <h4 className="text-2xl font-semibold">Компания не найдена</h4>
      </div>
    );
  }

  const singleReview = company.reviews[0];
  const singleSalary = company.salaries[0];

  const handleSeeAllReviews = () =>
    router.push(`/companies/${companyId}/reviews`);
  const handleSeeAllSalaries = () =>
    router.push(`/companies/${companyId}/salaries`);

  const recommendedIds = company.recommended.map((r) => r.id);
  const topIds = company.topCompanies.map((t) => t.id);

  const recommendedCompanies = getCompaniesByIds(recommendedIds);
  const topCompanies = getCompaniesByIds(topIds);

  return (
    <div className="mt-4 mb-8">
      <Card className="mb-6 shadow-sm">
        <CardContent className="pt-6">
          <h6 className="text-[#800000] font-semibold mb-4 pb-2 border-b border-[rgba(128,0,0,0.1)]">
            Основная информация
          </h6>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="flex flex-col">
              <p className="text-gray-500 text-sm mb-1">Основана</p>
              <p className="text-gray-800 font-medium">
                {company.overallInfo.founded}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-gray-500 text-sm mb-1">Выручка</p>
              <p className="text-gray-800 font-medium">
                {company.overallInfo.revenue}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-gray-500 text-sm mb-1">Индустрия</p>
              <p className="text-gray-800 font-medium">
                {company.industries.join(", ")}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-gray-500 text-sm mb-1">Размер</p>
              <p className="text-gray-800 font-medium">{company.size}</p>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-gray-500 text-sm mb-1">Миссия компании</p>
            <p className="text-gray-700 italic leading-relaxed">
              {company.overallInfo.mission}
            </p>
          </div>

          <div className="mt-4">
            <p className="text-gray-500 text-sm mb-1">Конкуренты</p>
            <div className="flex flex-wrap gap-2">
              {company.overallInfo.competitors.map((competitor, index) => (
                <span
                  key={index}
                  className="bg-[rgba(128,0,0,0.05)] px-3 py-1 rounded-full text-sm text-[#800000]"
                >
                  {competitor}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
        <div className="md:col-span-7">
          <Card className="h-full shadow-sm">
            <CardContent className="pt-6">
              <h6 className="text-[#800000] font-semibold mb-4 pb-2 border-b border-[rgba(128,0,0,0.1)]">
                Отзывы сотрудников
              </h6>
              {singleReview ? (
                <div className="py-2">
                  <div className="flex justify-between items-center mb-2 flex-col sm:flex-row sm:items-center gap-2">
                    <h6 className="font-semibold text-gray-800">
                      {singleReview.title}
                    </h6>
                    <div>
                      <span className="font-semibold mr-1">
                        {singleReview.rating}
                      </span>
                      <span className="text-[#f5b400] tracking-tighter">
                        {"★".repeat(Math.floor(singleReview.rating))}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-500 mb-2 text-sm">
                    Автор: {singleReview.author}
                  </p>
                  <p className="text-gray-800 mb-4 leading-relaxed">
                    {singleReview.body}
                  </p>
                  <Button
                    variant="ghost"
                    className="text-[#800000] p-0 font-medium hover:bg-transparent hover:underline"
                    onClick={handleSeeAllReviews}
                  >
                    Смотреть все отзывы ({company.reviews.length})
                  </Button>
                </div>
              ) : (
                <p>У этой компании пока нет отзывов</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-5">
          <Card className="h-full shadow-sm">
            <CardContent className="pt-6">
              <h6 className="text-[#800000] font-semibold mb-4 pb-2 border-b border-[rgba(128,0,0,0.1)]">
                Зарплаты
              </h6>
              {singleSalary ? (
                <div className="py-2">
                  <h6 className="font-semibold text-gray-800">
                    {singleSalary.position}
                  </h6>
                  <p className="text-[#800000] font-semibold text-xl my-2">
                    {singleSalary.amount}
                  </p>
                  <p className="text-gray-500 mb-2 text-sm">
                    Диапазон: {singleSalary.min}-{singleSalary.max}{" "}
                    {singleSalary.currency}
                  </p>
                  <p className="text-gray-500 mb-2 text-sm">
                    Уровень: {singleSalary.experienceLevel}
                  </p>
                  <Button
                    variant="ghost"
                    className="text-[#800000] p-0 font-medium hover:bg-transparent hover:underline mt-2"
                    onClick={handleSeeAllSalaries}
                  >
                    Смотреть все зарплаты ({company.salaries.length})
                  </Button>
                </div>
              ) : (
                <p>У этой компании пока нет данных о зарплатах</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="mb-6 shadow-sm">
        <CardContent className="pt-6">
          <h6 className="text-[#800000] font-semibold mb-4 pb-2 border-b border-[rgba(128,0,0,0.1)]">
            Рекомендуемые компании
          </h6>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {recommendedCompanies.map((rec) => (
              <Link
                href={`/companies/${rec.id}`}
                className="no-underline text-inherit block"
                key={rec.id}
              >
                <div className="flex items-center p-3 border border-gray-200 rounded-lg transition-all hover:border-[#800000] hover:shadow-md sm:flex-row flex-col sm:text-left text-center">
                  <img
                    src={rec.logoUrl}
                    alt={rec.name}
                    className="w-12 h-12 object-contain mr-4 rounded-lg border border-gray-200 p-1 sm:mr-4 sm:mb-0 mb-2"
                  />
                  <div className="flex-1">
                    <h6 className="font-semibold text-gray-800 mb-1">
                      {rec.name}
                    </h6>
                    <div className="flex items-center sm:justify-start justify-center">
                      <span className="font-semibold mr-1">{rec.rating}</span>
                      <span className="text-[#f5b400] tracking-tighter">
                        {"★".repeat(Math.floor(rec.rating))}
                      </span>
                    </div>
                    <p className="text-[#800000] font-medium mt-1">
                      Сравнить →
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardContent className="pt-6">
          <h6 className="text-[#800000] font-semibold mb-4 pb-2 border-b border-[rgba(128,0,0,0.1)]">
            Топ компании в отрасли
          </h6>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {topCompanies.map((tc) => (
              <Link
                href={`/companies/${tc.id}`}
                className="no-underline text-inherit block"
                key={tc.id}
              >
                <div className="flex items-center p-3 border border-gray-200 rounded-lg transition-all hover:border-[#800000] hover:shadow-md sm:flex-row flex-col sm:text-left text-center">
                  <img
                    src={tc.logoUrl || "/placeholder.svg"}
                    alt={tc.name}
                    className="w-12 h-12 object-contain mr-4 rounded-lg border border-gray-200 p-1 sm:mr-4 sm:mb-0 mb-2"
                  />
                  <div className="flex-1">
                    <h6 className="font-semibold text-gray-800 mb-1">
                      {tc.name}
                    </h6>
                    <p className="text-gray-500 text-sm mb-1">
                      Компенсации и льготы
                    </p>
                    <div className="flex items-center sm:justify-start justify-center">
                      <span className="font-semibold mr-1">{tc.rating}</span>
                      <span className="text-[#f5b400] tracking-tighter">
                        {"★".repeat(Math.floor(tc.rating))}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
