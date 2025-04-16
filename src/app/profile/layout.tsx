"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Container } from "@/components/ui/container";
import { User, FileText, DollarSign, PlusCircle, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logoutUser } = useAuth();

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, router]);

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
      active: pathname?.includes("/profile/add"),
    },
  ];

  const handleLogout = () => {
    logoutUser();
    router.push("/auth/login");
  };

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

      <Button
        variant="ghost"
        className="w-full justify-start text-left font-normal text-slate-600 hover:bg-[#800000]/5 hover:text-[#800000]"
        onClick={handleLogout}
      >
        <LogOut size={20} className="mr-2 text-[#800000]" />
        Выйти
      </Button>
    </nav>
  );

  if (!isAuthenticated) {
    return null; // Don't render until authenticated
  }

  return (
    <Container className="py-6">
      <div className="lg:grid lg:grid-cols-[280px_1fr] gap-8">
        {/* Desktop sidebar - Only shown when authenticated */}
        <aside className="hidden lg:block">
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
            <div className="flex flex-col items-center p-6">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage
                  src="/images/avatar-placeholder.jpg"
                  alt="аватар"
                />
                <AvatarFallback>
                  {user?.username ? user.username.substring(0, 2) : "ИИ"}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h3 className="text-xl font-medium text-slate-900">
                  {user?.username || "Неизвестно"}
                </h3>
                <p className="text-sm text-[#800000] font-medium">
                  {user?.role === "ROLE_ADMIN"
                    ? "Администратор"
                    : "Пользователь"}
                </p>
              </div>
            </div>
            <Separator className="bg-[#800000]/10" />
            <div className="p-4">{renderMenuItems()}</div>
          </div>
        </aside>

        {/* Main content */}
        <main className="overflow-auto bg-white rounded-lg border border-slate-200 shadow-sm p-6">
          {children}
        </main>
      </div>
    </Container>
  );
}
