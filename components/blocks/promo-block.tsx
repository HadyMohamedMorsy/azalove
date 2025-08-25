"use client";
import { useTranslation } from "@/hooks/use-translation";
import Image from "next/image";

interface PromoBlockProps {
  imageSrc?: string;
  title?: string;
  discountText?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
}

const PromoBlock = ({
  imageSrc = "/media/offer.png",
  title,
  discountText,
  description,
  buttonText,
  buttonLink = "#",
}: PromoBlockProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="image-wrapper">
        <Image
          src={imageSrc}
          className="object-contain"
          alt={title || t("promoBlock.defaultTitle")}
          width={345}
          height={282}
        />
      </div>
      <div className="content">
        <div className="flex flex-col gap-2">
          <span className="font-web text-lg md:text-xl lg:text-2xl">
            {title || t("promoBlock.defaultTitle")}
          </span>
          <span className="text-sm md:text-base lg:text-lg text-amaranth-600 font-semibold">
            {discountText || t("promoBlock.defaultDiscountText")}
          </span>
          <span className="text-sm md:text-base lg:text-lg text-muted-foreground font-semibold">
            {description || t("promoBlock.defaultDescription")}
          </span>

          <button className="btn text-white bg-gradient-to-r from-amaranth-500 to-amaranth-600 hover:from-amaranth-600 hover:to-amaranth-700 capitalize mt-4 w-[120px] transition-all duration-300 text-sm md:text-base lg:text-lg">
            {buttonText || t("promoBlock.defaultButtonText")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromoBlock;
