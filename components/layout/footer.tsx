import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Heart, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer
      className="bg-gradient-to-br from-amaranth-50 via-amaranth-100 to-royal-50 text-foreground py-12 md:py-16"
      dir="rtl"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 md:mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-6 h-6 md:w-8 md:h-8 text-amaranth-600" />
              <h3 className="text-xl md:text-2xl font-bold text-amaranth-800">
                أزالوف
              </h3>
            </div>
            <p className="text-amaranth-600 text-sm md:text-base lg:text-lg mb-6 md:mb-8 italic">
              "حيث تتحول كل صفحة إلى قصة حب"
            </p>

            {/* Quick Links */}
            <div className="flex flex-wrap justify-start gap-4 md:gap-6 mb-6 md:mb-8 text-xs md:text-sm">
              <a
                href="/"
                className="text-amaranth-600 hover:text-amaranth-800 transition-colors"
              >
                الرئيسية
              </a>
              <a
                href="/shop"
                className="text-amaranth-600 hover:text-amaranth-800 transition-colors"
              >
                المتجر
              </a>
              <a
                href="/categories"
                className="text-amaranth-600 hover:text-amaranth-800 transition-colors"
              >
                التصنيفات
              </a>
              <a
                href="/blogs"
                className="text-amaranth-600 hover:text-amaranth-800 transition-colors"
              >
                المدونة
              </a>
              <a
                href="/contact-us"
                className="text-amaranth-600 hover:text-amaranth-800 transition-colors"
              >
                اتصل بنا
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-amaranth-800 mb-3 md:mb-4 text-sm md:text-base">
              ابقَ على تواصل
            </h4>
            <p className="text-amaranth-600 text-xs md:text-sm mb-3 md:mb-4">
              اشترك في نشرتنا الإخبارية للحصول على أحدث إصدارات كتب الرومانسية
              والعروض الحصرية.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="بريدك الإلكتروني"
                className="flex-1 text-xs md:text-sm"
              />
              <Button
                size="sm"
                className="bg-amaranth-600 hover:bg-amaranth-700 text-xs md:text-sm"
              >
                اشترك
              </Button>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold text-amaranth-800 mb-3 md:mb-4 text-sm md:text-base">
              تابعنا
            </h4>
            <div className="flex gap-3 md:gap-4">
              <a
                href="#"
                className="p-2 bg-amaranth-200 rounded-full hover:bg-amaranth-300 transition-colors"
              >
                <Instagram className="w-4 h-4 md:w-5 md:h-5 text-amaranth-700" />
              </a>
              <a
                href="#"
                className="p-2 bg-amaranth-200 rounded-full hover:bg-amaranth-300 transition-colors"
              >
                <Twitter className="w-4 h-4 md:w-5 md:h-5 text-amaranth-700" />
              </a>
              <a
                href="#"
                className="p-2 bg-amaranth-200 rounded-full hover:bg-amaranth-300 transition-colors"
              >
                <Facebook className="w-4 h-4 md:w-5 md:h-5 text-amaranth-700" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-amaranth-200 pt-6 md:pt-8 text-center">
          <p className="text-amaranth-500 text-xs md:text-sm">
            © {new Date().getFullYear()} أزالوف. جميع الحقوق محفوظة. صُنع بـ 💕
            لعشاق الرومانسية.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
