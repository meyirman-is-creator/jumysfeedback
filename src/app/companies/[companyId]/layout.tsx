"use client";
import React from "react";
import Link from "next/link";
import {
  useParams,
  useSelectedLayoutSegments,
  useRouter,
} from "next/navigation";
import { Button } from "@/components/ui/button";
import { mockCompanies } from "@/features/company/mockData";
import { cn } from "@/lib/utils";

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const params = useParams();
  const segments = useSelectedLayoutSegments();
  const companyId =
    typeof params.companyId === "string" ? params.companyId : "";
  const company = mockCompanies.find((c) => c.id === companyId);

  if (!company) {
    return (
      <div className="max-w-7xl mx-auto p-4 mt-12 text-center">
        <h4 className="text-2xl font-semibold">Компания не найдена</h4>
      </div>
    );
  }

  const handleAddReview = () => {
    router.push("/profile/add");
  };

  const tabs = [
    { label: "Обзор", path: "" },
    { label: "Отзывы", path: "reviews" },
    { label: "Зарплаты", path: "salaries" },
    { label: "Налоги", path: "taxes" },
    { label: "Акции", path: "stockes" },
  ];

  const isActiveTab = (tabPath: string) => {
    return (!tabPath && !segments[0]) || segments[0] === tabPath;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {company.bannerImg && (
        <div className="w-full overflow-hidden mb-5">
          <img
            src={company.bannerImg}
            alt={`${company.name} баннер`}
            className="w-full h-auto object-cover max-h-64 block"
          />
        </div>
      )}

      <div className="mt-5 flex items-center mb-6 border-b border-gray-200 pb-4 md:flex-row flex-col md:items-center items-start gap-4">
        <div className="mr-4 md:mr-4 md:mb-0">
          <img
            src={company.logoUrl}
            alt={company.name}
            className="w-32 h-auto object-contain rounded-xl md:w-32 w-24"
          />
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <h4 className="text-[#800000] font-semibold m-0 text-2xl md:text-2xl text-xl">
            {company.name}
          </h4>
          <p className="text-gray-700 font-medium text-base">
            Рейтинг: {company.rating}
          </p>
          <p className="text-[black] font-medium text-sm">{company.location}</p>
        </div>
        <div className="md:w-auto w-full flex">
          <Button
            className="bg-[#800000] text-white px-4 py-2 font-medium hover:bg-[#660000] w-full"
            onClick={handleAddReview}
          >
            Добавить отзыв
          </Button>
        </div>
      </div>

      <div className="flex gap-6 mb-6 border-b border-gray-200 overflow-x-auto md:gap-6 gap-4">
        {tabs.map((tab) => (
          <Link
            key={tab.label}
            href={`/companies/${companyId}/${tab.path}`}
            className={cn(
              "inline-block no-underline text-gray-700 font-medium pb-3 border-b-2 border-transparent transition-colors whitespace-nowrap",
              isActiveTab(tab.path) && "text-[#800000] border-b-[#800000]"
            )}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      <div>{children}</div>
    </div>
  );
}
