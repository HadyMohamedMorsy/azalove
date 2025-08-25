import { Button } from "@/components/ui/button";
import { Book, Heart } from "lucide-react";
import Image from "next/image";

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

      {/* Romantic SVG Elements with Random Positioning */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Couple 1 - Top Left */}
        <div className="absolute top-16 left-8 md:top-20 md:left-16 opacity-20 animate-float-slow">
          <Image
            src="/media/svgs/Artboard 39.svg"
            alt="Romantic Couple"
            width={80}
            height={60}
            className="w-12 h-8 md:w-20 md:h-14 transform rotate-12 filter sepia hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Couple 2 - Top Right */}
        <div className="absolute top-24 right-12 md:top-32 md:right-20 opacity-25 animate-float-medium">
          <Image
            src="/media/svgs/Artboard 45.svg"
            alt="Romantic Couple"
            width={90}
            height={70}
            className="w-14 h-10 md:w-24 md:h-18 transform -rotate-6 filter sepia hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Couple 3 - Bottom Left */}
        <div className="absolute bottom-32 left-6 md:bottom-40 md:left-12 opacity-30 animate-float-fast">
          <Image
            src="/media/svgs/Artboard 46.svg"
            alt="Romantic Couple"
            width={70}
            height={50}
            className="w-10 h-7 md:w-16 md:h-12 transform rotate-3 filter sepia hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Couple 4 - Bottom Right */}
        <div className="absolute bottom-20 right-8 md:bottom-28 md:right-14 opacity-20 animate-float-slow delay-500">
          <Image
            src="/media/svgs/Artboard 49.svg"
            alt="Romantic Couple"
            width={85}
            height={65}
            className="w-12 h-9 md:w-20 md:h-15 transform -rotate-8 filter sepia hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Couple 5 - Center Left */}
        <div className="absolute top-1/2 left-4 md:left-8 opacity-15 animate-float-medium delay-700">
          <Image
            src="/media/svgs/Artboard 50.svg"
            alt="Romantic Couple"
            width={60}
            height={45}
            className="w-8 h-6 md:w-14 md:h-10 transform rotate-15 filter sepia hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Couple 6 - Center Right */}
        <div className="absolute top-2/3 right-6 md:right-10 opacity-25 animate-float-fast delay-300">
          <Image
            src="/media/svgs/Artboard 46.svg"
            alt="Romantic Couple"
            width={75}
            height={55}
            className="w-10 h-8 md:w-18 md:h-14 transform -rotate-12 filter sepia hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Additional Couple 7 - Top Center */}
        <div className="absolute top-12 left-1/2 transform -translate-x-1/2 opacity-18 animate-float-slow delay-900">
          <Image
            src="/media/svgs/Artboard 49.svg"
            alt="Romantic Couple"
            width={70}
            height={55}
            className="w-9 h-7 md:w-16 md:h-12 transform rotate-20 filter sepia hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Additional Couple 8 - Bottom Center */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-22 animate-float-medium delay-1100">
          <Image
            src="/media/svgs/Artboard 50.svg"
            alt="Romantic Couple"
            width={65}
            height={50}
            className="w-8 h-6 md:w-14 md:h-11 transform -rotate-18 filter sepia hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* MORE COUPLES - Layer 2 */}
        {/* Couple 9 - Far Top Left */}
        <div className="absolute top-4 left-2 md:top-8 md:left-4 opacity-12 animate-float-medium delay-1300">
          <Image
            src="/media/svgs/Artboard 39.svg"
            alt="Romantic Couple"
            width={55}
            height={40}
            className="w-7 h-5 md:w-12 md:h-9 transform rotate-25 filter sepia hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Couple 10 - Far Top Right */}
        <div className="absolute top-8 right-2 md:top-12 md:right-6 opacity-16 animate-float-fast delay-1500">
          <Image
            src="/media/svgs/Artboard 45.svg"
            alt="Romantic Couple"
            width={60}
            height={45}
            className="w-8 h-6 md:w-14 md:h-10 transform -rotate-22 filter sepia hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Couple 11 - Mid Left */}
        <div className="absolute top-1/3 left-2 md:left-6 opacity-18 animate-float-slow delay-1700">
          <Image
            src="/media/svgs/Artboard 46.svg"
            alt="Romantic Couple"
            width={58}
            height={42}
            className="w-7 h-5 md:w-13 md:h-9 transform rotate-8 filter sepia hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Couple 12 - Mid Right */}
        <div className="absolute top-1/3 right-2 md:right-4 opacity-20 animate-float-medium delay-1900">
          <Image
            src="/media/svgs/Artboard 49.svg"
            alt="Romantic Couple"
            width={62}
            height={47}
            className="w-8 h-6 md:w-14 md:h-11 transform -rotate-15 filter sepia hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Couple 13 - Lower Mid Left */}
        <div className="absolute bottom-1/3 left-1 md:left-3 opacity-14 animate-float-fast delay-2100">
          <Image
            src="/media/svgs/Artboard 50.svg"
            alt="Romantic Couple"
            width={52}
            height={38}
            className="w-6 h-5 md:w-11 md:h-8 transform rotate-35 filter sepia hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Couple 14 - Lower Mid Right */}
        <div className="absolute bottom-1/3 right-1 md:right-3 opacity-17 animate-float-slow delay-2300">
          <Image
            src="/media/svgs/Artboard 39.svg"
            alt="Romantic Couple"
            width={56}
            height={41}
            className="w-7 h-5 md:w-12 md:h-9 transform -rotate-28 filter sepia hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Couple 15 - Far Bottom Left */}
        <div className="absolute bottom-2 left-4 md:bottom-4 md:left-8 opacity-13 animate-float-medium delay-2500">
          <Image
            src="/media/svgs/Artboard 45.svg"
            alt="Romantic Couple"
            width={48}
            height={36}
            className="w-6 h-4 md:w-10 md:h-8 transform rotate-42 filter sepia hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Couple 16 - Far Bottom Right */}
        <div className="absolute bottom-4 right-4 md:bottom-6 md:right-8 opacity-15 animate-float-fast delay-2700">
          <Image
            src="/media/svgs/Artboard 46.svg"
            alt="Romantic Couple"
            width={50}
            height={37}
            className="w-6 h-5 md:w-11 md:h-8 transform -rotate-33 filter sepia hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* INNER LAYER - Between main content */}
        {/* Couple 17 - Top Quarter Left */}
        <div className="absolute top-1/4 left-1/8 opacity-10 animate-float-slow delay-2900">
          <Image
            src="/media/svgs/Artboard 49.svg"
            alt="Romantic Couple"
            width={44}
            height={32}
            className="w-5 h-4 md:w-9 md:h-7 transform rotate-55 filter sepia hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Couple 18 - Top Quarter Right */}
        <div className="absolute top-1/4 right-1/8 opacity-12 animate-float-medium delay-3100">
          <Image
            src="/media/svgs/Artboard 50.svg"
            alt="Romantic Couple"
            width={46}
            height={34}
            className="w-5 h-4 md:w-10 md:h-7 transform -rotate-41 filter sepia hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Couple 19 - Bottom Quarter Left */}
        <div className="absolute bottom-1/4 left-1/8 opacity-11 animate-float-fast delay-3300">
          <Image
            src="/media/svgs/Artboard 39.svg"
            alt="Romantic Couple"
            width={42}
            height={31}
            className="w-5 h-4 md:w-9 md:h-6 transform rotate-18 filter sepia hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Couple 20 - Bottom Quarter Right */}
        <div className="absolute bottom-1/4 right-1/8 opacity-13 animate-float-slow delay-3500">
          <Image
            src="/media/svgs/Artboard 45.svg"
            alt="Romantic Couple"
            width={43}
            height={32}
            className="w-5 h-4 md:w-9 md:h-7 transform -rotate-52 filter sepia hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Extra Small Scattered Elements */}
        <div className="absolute top-1/3 left-1/4 opacity-10 animate-float-slow delay-1000">
          <Image
            src="/media/svgs/Artboard 39.svg"
            alt="Romantic Couple"
            width={50}
            height={35}
            className="w-6 h-4 md:w-12 md:h-8 transform rotate-45 filter sepia"
          />
        </div>

        <div className="absolute top-3/4 left-1/3 opacity-15 animate-float-medium delay-1200">
          <Image
            src="/media/svgs/Artboard 45.svg"
            alt="Romantic Couple"
            width={55}
            height={40}
            className="w-7 h-5 md:w-14 md:h-10 transform -rotate-20 filter sepia"
          />
        </div>

        <div className="absolute top-1/4 right-1/3 opacity-12 animate-float-fast delay-800">
          <Image
            src="/media/svgs/Artboard 50.svg"
            alt="Romantic Couple"
            width={45}
            height={30}
            className="w-5 h-4 md:w-10 md:h-7 transform rotate-30 filter sepia"
          />
        </div>

        {/* More scattered micro elements */}
        <div className="absolute top-1/5 left-3/4 opacity-8 animate-float-fast delay-1400">
          <Image
            src="/media/svgs/Artboard 49.svg"
            alt="Romantic Couple"
            width={40}
            height={25}
            className="w-4 h-3 md:w-8 md:h-6 transform -rotate-35 filter sepia"
          />
        </div>

        <div className="absolute bottom-1/3 left-1/5 opacity-12 animate-float-slow delay-1600">
          <Image
            src="/media/svgs/Artboard 45.svg"
            alt="Romantic Couple"
            width={38}
            height={28}
            className="w-4 h-3 md:w-9 md:h-7 transform rotate-50 filter sepia"
          />
        </div>

        {/* ADDITIONAL MICRO ELEMENTS - Filling gaps */}
        <div className="absolute top-3/5 left-3/5 opacity-9 animate-float-medium delay-3700">
          <Image
            src="/media/svgs/Artboard 46.svg"
            alt="Romantic Couple"
            width={36}
            height={26}
            className="w-4 h-3 md:w-7 md:h-5 transform rotate-65 filter sepia"
          />
        </div>

        <div className="absolute top-2/5 right-3/5 opacity-11 animate-float-fast delay-3900">
          <Image
            src="/media/svgs/Artboard 49.svg"
            alt="Romantic Couple"
            width={38}
            height={27}
            className="w-4 h-3 md:w-8 md:h-6 transform -rotate-48 filter sepia"
          />
        </div>

        <div className="absolute bottom-2/5 left-2/5 opacity-8 animate-float-slow delay-4100">
          <Image
            src="/media/svgs/Artboard 50.svg"
            alt="Romantic Couple"
            width={34}
            height={24}
            className="w-3 h-3 md:w-7 md:h-5 transform rotate-72 filter sepia"
          />
        </div>

        <div className="absolute top-1/6 left-2/3 opacity-10 animate-float-medium delay-4300">
          <Image
            src="/media/svgs/Artboard 39.svg"
            alt="Romantic Couple"
            width={35}
            height={25}
            className="w-4 h-3 md:w-7 md:h-5 transform -rotate-38 filter sepia"
          />
        </div>

        <div className="absolute bottom-1/6 right-2/3 opacity-9 animate-float-fast delay-4500">
          <Image
            src="/media/svgs/Artboard 45.svg"
            alt="Romantic Couple"
            width={37}
            height={26}
            className="w-4 h-3 md:w-8 md:h-6 transform rotate-29 filter sepia"
          />
        </div>

        <div className="absolute top-4/5 left-3/4 opacity-7 animate-float-slow delay-4700">
          <Image
            src="/media/svgs/Artboard 46.svg"
            alt="Romantic Couple"
            width={33}
            height={23}
            className="w-3 h-2 md:w-6 md:h-5 transform -rotate-61 filter sepia"
          />
        </div>
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
