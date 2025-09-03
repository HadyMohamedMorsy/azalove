"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/auth-context";
import {
  Heart,
  LogOut,
  MapPin,
  Package,
  Settings,
  ShoppingCart,
  User,
} from "lucide-react";
import Link from "next/link";

export function UserDropdown() {
  const { user, logout, redirectToLogin } = useAuth();

  if (!user) {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={() => redirectToLogin()}
        className="hover:bg-royal-50 transition-all duration-300 group"
      >
        <User className="w-7 h-7 text-royal-600 group-hover:text-royal-700 group-hover:scale-110 transition-all duration-300" />
      </Button>
    );
  }

  // Get display name: full name if available, otherwise fallback to name or email
  const getDisplayName = () => {
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    if (user.firstName) {
      return user.firstName;
    }
    if (user.lastName) {
      return user.lastName;
    }
    return user.name || user.email;
  };

  // Get welcome message
  const getWelcomeMessage = () => {
    const displayName = getDisplayName();
    if (user.firstName || user.lastName || user.name) {
      return `مرحباً، ${displayName}`;
    }
    return "مرحباً بك";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="hover:bg-royal-50 transition-all duration-300 group flex items-center gap-2 px-3 py-2"
        >
          <User className="w-5 h-5 text-royal-600 group-hover:text-royal-700 transition-all duration-300" />
          <span className="text-sm font-medium text-royal-700 group-hover:text-royal-800 transition-colors duration-300">
            {getWelcomeMessage()}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 shadow-lg rounded-xl"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="font-normal bg-royal-50 rounded-t-lg">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none text-royal-800">
              {getDisplayName()}
            </p>
            <p className="text-xs leading-none text-royal-600">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-royal-200" />
        <DropdownMenuItem
          asChild
          className="hover:bg-royal-50 transition-colors"
        >
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-royal-700"
          >
            <Settings className="w-4 h-4 text-royal-600" />
            إعدادات الملف الشخصي
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="hover:bg-royal-50 transition-colors"
        >
          <Link
            href="/dashboard?tab=orders"
            className="flex items-center gap-2 text-royal-700"
          >
            <Package className="w-4 h-4 text-royal-600" />
            سجل الطلبات
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="hover:bg-royal-50 transition-colors"
        >
          <Link
            href="/dashboard?tab=favorites"
            className="flex items-center gap-2 text-royal-700"
          >
            <Heart className="w-4 h-4 text-royal-600" />
            المفضلة
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="hover:bg-royal-50 transition-colors"
        >
          <Link
            href="/dashboard?tab=cart"
            className="flex items-center gap-2 text-royal-700"
          >
            <ShoppingCart className="w-4 h-4 text-royal-600" />
            عناصر السلة
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="hover:bg-royal-50 transition-colors"
        >
          <Link
            href="/dashboard?tab=addresses"
            className="flex items-center gap-2 text-royal-700"
          >
            <MapPin className="w-4 h-4 text-royal-600" />
            العناوين
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-royal-200" />
        <DropdownMenuItem
          onClick={logout}
          className="flex items-center gap-2 text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-4 h-4 text-red-500" />
          تسجيل الخروج
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
