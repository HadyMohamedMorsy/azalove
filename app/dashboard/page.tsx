"use client";
import AddressBook from "@/components/dashbored/address";
import CartItems from "@/components/dashbored/cart-items";
import Favorites from "@/components/dashbored/favorites";
import OrderHistory from "@/components/dashbored/order-history";
import ProfileSettings from "@/components/dashbored/profile-settings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Heart,
  MapPin,
  Package,
  Settings,
  ShoppingCart,
  User,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (
      tab &&
      ["profile", "orders", "favorites", "cart", "addresses"].includes(tab)
    ) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amaranth-50 to-amaranth-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-amaranth-500 to-amaranth-600 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                لوحة التحكم
              </h1>
              <p className="text-muted-foreground">إدارة حسابك وتفضيلاتك</p>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-2">
            <TabsList className="grid w-full grid-cols-5 h-16 bg-transparent gap-2">
              <TabsTrigger
                value="profile"
                className="flex items-center gap-3 h-12 px-4 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-amaranth-600 text-gray-600 hover:text-amaranth-500 transition-all duration-200"
              >
                <Settings className="w-5 h-5" />
                <span className="hidden sm:inline font-medium">
                  الملف الشخصي
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="orders"
                className="flex items-center gap-3 h-12 px-4 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-amaranth-600 text-gray-600 hover:text-amaranth-500 transition-all duration-200"
              >
                <Package className="w-5 h-5" />
                <span className="hidden sm:inline font-medium">الطلبات</span>
              </TabsTrigger>
              <TabsTrigger
                value="favorites"
                className="flex items-center gap-3 h-12 px-4 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-amaranth-600 text-gray-600 hover:text-amaranth-500 transition-all duration-200"
              >
                <Heart className="w-5 h-5" />
                <span className="hidden sm:inline font-medium">المفضلة</span>
              </TabsTrigger>
              <TabsTrigger
                value="cart"
                className="flex items-center gap-3 h-12 px-4 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-amaranth-600 text-gray-600 hover:text-amaranth-500 transition-all duration-200"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="hidden sm:inline font-medium">السلة</span>
              </TabsTrigger>
              <TabsTrigger
                value="addresses"
                className="flex items-center gap-3 h-12 px-4 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-amaranth-600 text-gray-600 hover:text-amaranth-500 transition-all duration-200"
              >
                <MapPin className="w-5 h-5" />
                <span className="hidden sm:inline font-medium">العناوين</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="profile" className="space-y-6">
            <ProfileSettings />
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <OrderHistory />
          </TabsContent>

          <TabsContent value="favorites" className="space-y-6">
            <Favorites />
          </TabsContent>

          <TabsContent value="cart" className="space-y-6">
            <CartItems />
          </TabsContent>

          <TabsContent value="addresses" className="space-y-6">
            <AddressBook />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
