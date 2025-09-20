import { Button } from "@/components/ui/button";
import { Book, Heart } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cream-100">
      {/* Simple background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-4 h-4 bg-amaranth-300/20 rounded-full"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-amaranth-400/15 rounded-full"></div>
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-royal-300/15 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-5 h-5 bg-amaranth-300/20 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-amaranth-200/10 rounded-full"></div>
      </div>

      {/* Floating Hearts */}
      <div className="absolute inset-0 pointer-events-none z-5">
        <div className="absolute top-1/4 left-1/6 opacity-30 animate-float-slow delay-2000">
          <Heart className="w-4 h-4 md:w-6 md:h-6 text-amaranth-400 fill-current" />
        </div>
        <div className="absolute top-1/3 right-1/4 opacity-25 animate-float-medium delay-2200">
          <Heart className="w-3 h-3 md:w-5 md:h-5 text-amaranth-500 fill-current" />
        </div>
        <div className="absolute bottom-1/4 left-1/3 opacity-35 animate-float-fast delay-1800">
          <Heart className="w-5 h-5 md:w-7 md:h-7 text-amaranth-300 fill-current" />
        </div>
        <div className="absolute top-3/5 right-1/6 opacity-20 animate-float-slow delay-2400">
          <Heart className="w-3 h-3 md:w-4 md:h-4 text-royal-400 fill-current" />
        </div>
        <div className="absolute bottom-1/6 right-1/3 opacity-28 animate-float-medium delay-2600">
          <Heart className="w-4 h-4 md:w-6 md:h-6 text-amaranth-600 fill-current" />
        </div>
        <div className="absolute top-2/5 left-1/5 opacity-15 animate-float-fast delay-2800">
          <Heart className="w-2 h-2 md:w-3 md:h-3 text-amaranth-400 fill-current" />
        </div>

        {/* MORE HEARTS - Additional Layer */}
        <div className="absolute top-1/8 left-1/4 opacity-22 animate-float-medium delay-3000">
          <Heart className="w-3 h-3 md:w-5 md:h-5 text-amaranth-500 fill-current" />
        </div>
        <div className="absolute top-1/6 right-1/5 opacity-18 animate-float-fast delay-3200">
          <Heart className="w-2 h-2 md:w-4 md:h-4 text-royal-500 fill-current" />
        </div>
        <div className="absolute bottom-1/8 left-1/5 opacity-25 animate-float-slow delay-3400">
          <Heart className="w-4 h-4 md:w-6 md:h-6 text-amaranth-400 fill-current" />
        </div>
        <div className="absolute bottom-1/5 right-1/4 opacity-20 animate-float-medium delay-3600">
          <Heart className="w-3 h-3 md:w-5 md:h-5 text-amaranth-600 fill-current" />
        </div>

        {/* MICRO HEARTS - Scattered throughout */}
        <div className="absolute top-1/7 left-1/2 opacity-15 animate-float-fast delay-3800">
          <Heart className="w-2 h-2 md:w-3 md:h-3 text-amaranth-300 fill-current" />
        </div>
        <div className="absolute top-2/7 right-1/2 opacity-18 animate-float-slow delay-4000">
          <Heart className="w-2 h-2 md:w-3 md:h-3 text-royal-400 fill-current" />
        </div>
        <div className="absolute bottom-2/7 left-1/2 opacity-16 animate-float-medium delay-4200">
          <Heart className="w-2 h-2 md:w-3 md:h-3 text-amaranth-500 fill-current" />
        </div>
        <div className="absolute bottom-1/7 right-1/2 opacity-20 animate-float-fast delay-4400">
          <Heart className="w-2 h-2 md:w-3 md:h-3 text-amaranth-400 fill-current" />
        </div>

        {/* CORNER HEARTS */}
        <div className="absolute top-3 left-3 opacity-12 animate-float-slow delay-4600">
          <Heart className="w-2 h-2 md:w-3 md:h-3 text-amaranth-600 fill-current" />
        </div>
        <div className="absolute top-3 right-3 opacity-14 animate-float-medium delay-4800">
          <Heart className="w-2 h-2 md:w-3 md:h-3 text-royal-500 fill-current" />
        </div>
        <div className="absolute bottom-3 left-3 opacity-16 animate-float-fast delay-5000">
          <Heart className="w-2 h-2 md:w-3 md:h-3 text-amaranth-500 fill-current" />
        </div>
        <div className="absolute bottom-3 right-3 opacity-18 animate-float-slow delay-5200">
          <Heart className="w-2 h-2 md:w-3 md:h-3 text-amaranth-400 fill-current" />
        </div>

        {/* EDGE HEARTS - Along the sides */}
        <div className="absolute top-1/2 left-1 opacity-10 animate-float-medium delay-5400">
          <Heart className="w-2 h-2 md:w-3 md:h-3 text-amaranth-300 fill-current" />
        </div>
        <div className="absolute top-1/2 right-1 opacity-12 animate-float-fast delay-5600">
          <Heart className="w-2 h-2 md:w-3 md:h-3 text-royal-400 fill-current" />
        </div>
        <div className="absolute top-1 left-1/2 opacity-11 animate-float-slow delay-5800">
          <Heart className="w-2 h-2 md:w-3 md:h-3 text-amaranth-500 fill-current" />
        </div>
        <div className="absolute bottom-1 left-1/2 opacity-13 animate-float-medium delay-6000">
          <Heart className="w-2 h-2 md:w-3 md:h-3 text-amaranth-600 fill-current" />
        </div>

        {/* INNER RING HEARTS - Closer to content */}
        <div className="absolute top-1/3 left-1/3 opacity-8 animate-float-fast delay-6200">
          <Heart className="w-2 h-2 md:w-3 md:h-3 text-amaranth-400 fill-current" />
        </div>
        <div className="absolute top-1/3 right-1/3 opacity-9 animate-float-slow delay-6400">
          <Heart className="w-2 h-2 md:w-3 md:h-3 text-royal-500 fill-current" />
        </div>
        <div className="absolute bottom-1/3 left-1/3 opacity-7 animate-float-medium delay-6600">
          <Heart className="w-2 h-2 md:w-3 md:h-3 text-amaranth-300 fill-current" />
        </div>
        <div className="absolute bottom-1/3 right-1/3 opacity-10 animate-float-fast delay-6800">
          <Heart className="w-2 h-2 md:w-3 md:h-3 text-amaranth-500 fill-current" />
        </div>

        {/* ADDITIONAL SCATTERED HEARTS */}
        <div className="absolute top-3/8 left-1/8 opacity-14 animate-float-slow delay-7000">
          <Heart className="w-2 h-2 md:w-3 md:h-3 text-amaranth-600 fill-current" />
        </div>
        <div className="absolute top-5/8 right-1/8 opacity-12 animate-float-medium delay-7200">
          <Heart className="w-2 h-2 md:w-3 md:h-3 text-royal-400 fill-current" />
        </div>
        <div className="absolute bottom-3/8 left-1/8 opacity-16 animate-float-fast delay-7400">
          <Heart className="w-2 h-2 md:w-3 md:h-3 text-amaranth-400 fill-current" />
        </div>
        <div className="absolute bottom-5/8 right-1/8 opacity-13 animate-float-slow delay-7600">
          <Heart className="w-2 h-2 md:w-3 md:h-3 text-amaranth-500 fill-current" />
        </div>

        {/* FINAL LAYER - Micro hearts filling remaining spaces */}
        <div className="absolute top-1/5 left-3/7 opacity-8 animate-float-medium delay-7800">
          <Heart className="w-1 h-1 md:w-2 md:h-2 text-amaranth-300 fill-current" />
        </div>
        <div className="absolute top-4/5 right-3/7 opacity-9 animate-float-fast delay-8000">
          <Heart className="w-1 h-1 md:w-2 md:h-2 text-royal-500 fill-current" />
        </div>
        <div className="absolute top-2/3 left-4/7 opacity-7 animate-float-slow delay-8200">
          <Heart className="w-1 h-1 md:w-2 md:h-2 text-amaranth-400 fill-current" />
        </div>
        <div className="absolute top-1/3 right-4/7 opacity-10 animate-float-medium delay-8400">
          <Heart className="w-1 h-1 md:w-2 md:h-2 text-amaranth-600 fill-current" />
        </div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Icons */}
        <div className="flex justify-center items-center gap-4 mb-6 md:mb-8">
          <div className="p-3 md:p-4 bg-cream-100 rounded-full">
            <Book className="w-6 h-6 md:w-8 md:h-8 text-amaranth-600" />
          </div>
          <Heart className="w-5 h-5 md:w-6 md:h-6 text-amaranth-500" />
          <div className="p-3 md:p-4 bg-amaranth-200 rounded-full">
            <Heart className="w-6 h-6 md:w-8 md:h-8 text-amaranth-700" />
          </div>
        </div>

        {/* Main heading */}
        <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6">
          <span className=" bg-amaranth-900 bg-clip-text text-transparent">
            أزلــوڤ
          </span>
          <br />
        </h1>

        {/* Subtitle */}
        <p
          className="text-sm md:text-base lg:text-xl text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto"
          dir="rtl"
        >
          اكتشف قصص حب ساحرة ستأسر قلبك وتشعل خيالك
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
          <Button
            size="lg"
            className=" bg-amaranth-900 hover:bg-royal-900 text-white px-6 md:px-8 py-2 md:py-3 text-sm md:text-base rounded-full"
          >
            استكشف كتب الرومانسية
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
