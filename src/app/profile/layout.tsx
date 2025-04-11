// src/profile/layout.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Container } from "@/components/ui/container";
import {
  User,
  FileText,
  DollarSign,
  PlusCircle,
  LogOut,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = true;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    {
      label: "Мой профиль",
      href: "/profile",
      icon: <User size={20} />,
      active: pathname === "/profile",
    },
    {
      label: "Мои отзывы",
      href: "/profile/reviews",
      icon: <FileText size={20} />,
      active: pathname === "/profile/reviews",
    },
    {
      label: "Мои зарплаты",
      href: "/profile/salaries",
      icon: <DollarSign size={20} />,
      active: pathname === "/profile/salaries",
    },
    {
      label: "Добавить контент",
      href: "/profile/add",
      icon: <PlusCircle size={20} />,
      active: pathname === "/profile/add",
    },
  ];

  const renderMenuItems = () => (
    <nav className="space-y-1 mt-4">
      {menuItems.map((item) => (
        <Link key={item.href} href={item.href} className="block">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start text-left font-normal mb-1",
              item.active
                ? "bg-[#800000]/10 text-[#800000] font-medium"
                : "text-slate-600 hover:bg-[#800000]/5 hover:text-[#800000]"
            )}
          >
            <span className="mr-2 text-[#800000]">{item.icon}</span>
            {item.label}
          </Button>
        </Link>
      ))}

      <Separator className="my-4 bg-[#800000]/10" />

      <Link href="/auth/logout" className="block">
        <Button
          variant="ghost"
          className="w-full justify-start text-left font-normal text-slate-600 hover:bg-[#800000]/5 hover:text-[#800000]"
        >
          <LogOut size={20} className="mr-2 text-[#800000]" />
          Выйти
        </Button>
      </Link>
    </nav>
  );

  return (
    <Container className="py-6">
      <div className="lg:grid lg:grid-cols-[280px_1fr] gap-8">
        {/* Mobile menu toggle button */}
        <div className="lg:hidden flex justify-between items-center mb-6">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="h-10 w-10">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Открыть меню</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[280px] bg-white sm:max-w-none"
            >
              <div className="flex flex-col items-center py-4">
                <Avatar className="h-16 w-16 mb-2">
                  <AvatarImage
                    src="/images/avatar-placeholder.jpg"
                    alt="аватар"
                  />
                  <AvatarFallback>ИИ</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="font-medium text-slate-900">Иван Иванов</h3>
                  <p className="text-sm text-[#800000] font-medium">
                    {isAdmin ? "Администратор" : "Пользователь"}
                  </p>
                </div>
              </div>
              <Separator className="bg-[#800000]/10" />
              {renderMenuItems()}
            </SheetContent>
          </Sheet>
          <h1 className="text-xl font-bold text-slate-900">Личный кабинет</h1>
        </div>

        {/* Desktop sidebar */}
        <aside className="hidden lg:block">
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
            <div className="flex flex-col items-center p-6">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage
                  src="/images/avatar-placeholder.jpg"
                  alt="аватар"
                />
                <AvatarFallback>ИИ</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h3 className="text-xl font-medium text-slate-900">
                  Иван Иванов
                </h3>
                <p className="text-sm text-[#800000] font-medium">
                  {isAdmin ? "Администратор" : "Пользователь"}
                </p>
              </div>
            </div>
            <Separator className="bg-[#800000]/10" />
            <div className="p-4">{renderMenuItems()}</div>
          </div>
        </aside>

        {/* Main content */}
        <main className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
          {children}
        </main>
      </div>
    </Container>
  );
}
