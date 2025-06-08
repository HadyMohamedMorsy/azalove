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
import { useState } from "react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                My Dashboard
              </h1>
              <p className="text-muted-foreground">
                Manage your account and preferences
              </p>
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
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-5">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">Orders</span>
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">Favorites</span>
            </TabsTrigger>
            <TabsTrigger value="cart" className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
            </TabsTrigger>
            <TabsTrigger value="addresses" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span className="hidden sm:inline">Addresses</span>
            </TabsTrigger>
          </TabsList>

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
