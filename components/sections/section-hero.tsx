import { Button } from "@/components/ui/button";
import { Book, Heart } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-4 h-4 bg-rose-300/30 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-pink-300/30 rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-purple-300/30 rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-20 right-10 w-5 h-5 bg-rose-300/30 rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 py-16 text-center relative z-10">
        {/* Animated icons */}
        <div className="flex justify-center items-center gap-4 mb-8 animate-fade-in">
          <div className="p-4 bg-rose-100 rounded-full animate-scale-in">
            <Book className="w-8 h-8 text-rose-600" />
          </div>
          <Heart className="w-6 h-6 text-pink-500 animate-pulse" />
          <div className="p-4 bg-pink-100 rounded-full animate-scale-in delay-200">
            <Heart className="w-8 h-8 text-pink-600" />
          </div>
        </div>

        {/* Main heading with animation */}
        <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 animate-fade-in delay-300">
          <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
            Romance
          </span>
          <br />
          <span className="text-foreground">Azalove</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in delay-500">
          Discover enchanting love stories that will capture your heart and
          ignite your imagination
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in delay-700">
          <Button
            size="lg"
            className="bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
          >
            Explore Romance Books
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-rose-300 text-rose-600 hover:bg-rose-50 px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
          >
            Browse Collections
          </Button>
        </div>

        {/* Floating book elements */}
        <div className="absolute top-1/4 left-1/4 animate-bounce delay-1000">
          <div className="w-16 h-20 bg-gradient-to-br from-rose-200 to-pink-300 rounded-md shadow-lg transform rotate-12 opacity-30"></div>
        </div>
        <div className="absolute top-1/3 right-1/4 animate-bounce delay-1500">
          <div className="w-12 h-16 bg-gradient-to-br from-pink-200 to-purple-300 rounded-md shadow-lg transform -rotate-12 opacity-30"></div>
        </div>
        <div className="absolute bottom-1/4 right-1/3 animate-bounce delay-2000">
          <div className="w-14 h-18 bg-gradient-to-br from-purple-200 to-rose-300 rounded-md shadow-lg transform rotate-6 opacity-30"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
