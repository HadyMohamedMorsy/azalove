"use client";
import ProductCard from "@/components/cards/product-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFavorites } from "@/contexts/favorites-context";
import { Heart, Sparkles } from "lucide-react";

const Favorites = () => {
  const { favoriteItems, getTotalFavorites } = useFavorites();

  return (
    <div className="relative">
      {/* Romantic background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-azalove-50 via-cream-50 to-azalove-100 rounded-xl opacity-60"></div>

      {/* Floating decorative elements */}
      <div className="absolute top-4 right-4 animate-float-slow">
        <Sparkles className="w-6 h-6 text-azalove-400" />
      </div>
      <div className="absolute top-8 left-8 animate-float-medium">
        <Heart className="w-4 h-4 text-amaranth-400" />
      </div>
      <div className="absolute bottom-6 right-12 animate-float-fast">
        <Sparkles className="w-5 h-5 text-royal-400" />
      </div>

      <Card className="relative border-0 shadow-lg bg-gradient-to-br from-cream-50/80 via-white/90 to-azalove-50/80 backdrop-blur-sm">
        <CardHeader className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-azalove-100/20 to-amaranth-100/20 rounded-t-xl"></div>
          <div className="relative">
            <CardTitle className="flex items-center gap-3 text-royal-800">
              <div className="relative">
                <Heart className="w-6 h-6 text-amaranth-500 animate-pulse" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-azalove-400 rounded-full animate-ping"></div>
              </div>
              <span className="bg-gradient-to-r from-royal-700 to-amaranth-700 bg-clip-text text-transparent">
                المفضلة
              </span>
            </CardTitle>
            <CardDescription className="text-royal-600 mt-2">
              <span className="font-medium text-azalove-600">
                {getTotalFavorites()}
              </span>{" "}
              عنصر{getTotalFavorites() !== 1 ? "ات" : ""} ثمين
              {getTotalFavorites() !== 1 ? "ة" : ""} في قائمة أمنياتك الرومانسية
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="relative">
          {favoriteItems.length === 0 ? (
            <div className="text-center py-16 relative">
              {/* Empty state decorative elements */}
              <div className="absolute top-8 left-1/4 animate-float-slow">
                <Heart className="w-8 h-8 text-azalove-300" />
              </div>
              <div className="absolute top-12 right-1/4 animate-float-medium">
                <Sparkles className="w-6 h-6 text-amaranth-300" />
              </div>
              <div className="absolute bottom-8 left-1/3 animate-float-fast">
                <Heart className="w-6 h-6 text-royal-300" />
              </div>

              <div className="relative z-10">
                <div className="relative inline-block mb-6">
                  <Heart className="w-16 h-16 mx-auto text-amaranth-400 animate-pulse" />
                  <div className="absolute inset-0 bg-gradient-to-r from-azalove-200 to-amaranth-200 rounded-full blur-xl opacity-30 animate-pulse"></div>
                </div>
                <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-royal-700 to-amaranth-700 bg-clip-text text-transparent">
                  قائمة أمنياتك تنتظر الحب
                </h3>
                <p className="text-royal-600 max-w-md mx-auto">
                  ابدأ رحلتك الرومانسية بإضافة العناصر الجميلة إلى المفضلة. كل
                  عنصر تحبه يجلب المزيد من الفرح إلى مجموعتك!
                </p>
                <div className="mt-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-azalove-100 to-cream-100 rounded-full border border-azalove-200">
                    <Sparkles className="w-4 h-4 text-azalove-500" />
                    <span className="text-sm text-royal-700">
                      ابدأ الاستكشاف
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Romantic header for items */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-azalove-50 to-amaranth-50 rounded-full border border-azalove-200">
                  <Sparkles className="w-4 h-4 text-azalove-500" />
                  <span className="text-sm font-medium text-royal-700">
                    مجموعتك العزيزة
                  </span>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {favoriteItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="group relative transform transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    {/* Romantic card glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-azalove-100/20 to-amaranth-100/20 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>

                    <div className="relative">
                      <ProductCard
                        id={item.id}
                        srcImage={item.image}
                        name={item.name}
                        sku={{
                          id: 0,
                          sku: "",
                          price: item.price,
                          quantity: 1,
                          discount: 0,
                          discountType: "percentage",
                        }}
                        categories={[]}
                        slug={`product-${item.id}`}
                      />
                    </div>

                    {/* Floating heart indicator */}
                    <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Heart className="w-5 h-5 text-amaranth-500 fill-current" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Favorites;
