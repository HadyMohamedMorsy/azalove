import { Button } from "@/components/ui/button";
import { Book, Heart } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-amaranth-50 via-amaranth-100 to-royal-50">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-4 h-4 bg-amaranth-300/40 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-amaranth-400/30 rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-royal-300/30 rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-20 right-10 w-5 h-5 bg-amaranth-300/40 rounded-full animate-pulse delay-500"></div>
        <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-amaranth-200/20 rounded-full animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Animated icons */}
        <div className="flex justify-center items-center gap-4 mb-6 md:mb-8 animate-fade-in">
          <div className="p-3 md:p-4 bg-amaranth-100 rounded-full animate-scale-in">
            <Book className="w-6 h-6 md:w-8 md:h-8 text-amaranth-600" />
          </div>
          <Heart className="w-5 h-5 md:w-6 md:h-6 text-amaranth-500 animate-pulse" />
          <div className="p-3 md:p-4 bg-amaranth-200 rounded-full animate-scale-in delay-200">
            <Heart className="w-6 h-6 md:w-8 md:h-8 text-amaranth-700" />
          </div>
        </div>

        {/* Main heading with animation */}
        <h1
          className="text-2xl md:text-3xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6 animate-fade-in delay-300"
          dir="rtl"
        >
          <span className="bg-gradient-to-r from-amaranth-600 via-amaranth-700 to-royal-600 bg-clip-text text-transparent">
            أزالوف
          </span>
          <br />
        </h1>

        {/* Subtitle */}
        <p
          className="text-sm md:text-base lg:text-xl text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto animate-fade-in delay-500"
          dir="rtl"
        >
          اكتشف قصص حب ساحرة ستأسر قلبك وتشعل خيالك
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center animate-fade-in delay-700">
          <Button
            size="lg"
            className="bg-gradient-to-r from-amaranth-600 to-amaranth-700 hover:from-amaranth-700 hover:to-amaranth-800 text-white px-6 md:px-8 py-2 md:py-3 text-sm md:text-base rounded-full transition-all duration-300 hover:scale-105"
          >
            استكشف كتب الرومانسية
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-amaranth-300 text-amaranth-600 hover:bg-amaranth-50 px-6 md:px-8 py-2 md:py-3 text-sm md:text-base rounded-full transition-all duration-300 hover:scale-105"
          >
            تصفح المجموعات
          </Button>
        </div>

        {/* Floating book elements */}
        <div className="absolute top-1/4 left-1/4 animate-bounce delay-1000">
          <div className="w-12 h-16 md:w-16 md:h-20 bg-gradient-to-br from-amaranth-200 to-amaranth-400 rounded-md shadow-lg transform rotate-12 opacity-30"></div>
        </div>
        <div className="absolute top-1/3 right-1/4 animate-bounce delay-1500">
          <div className="w-10 h-14 md:w-12 md:h-16 bg-gradient-to-br from-amaranth-300 to-royal-400 rounded-md shadow-lg transform -rotate-12 opacity-30"></div>
        </div>
        <div className="absolute bottom-1/4 right-1/3 animate-bounce delay-2000">
          <div className="w-11 h-15 md:w-14 md:h-18 bg-gradient-to-br from-royal-300 to-amaranth-400 rounded-md shadow-lg transform rotate-6 opacity-30"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
