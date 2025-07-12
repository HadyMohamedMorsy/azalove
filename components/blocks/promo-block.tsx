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
  title = "احصل على المزيد",
  discountText = "تخفيضات -25%",
  description = "عند الطلب بقيمة 500 جنيه مصري أو أكثر",
  buttonText = "تسوق الان",
  buttonLink = "#",
}: PromoBlockProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="image-wrapper">
        <Image
          src={imageSrc}
          className="object-contain"
          alt={title}
          width={345}
          height={282}
        />
      </div>
      <div className="content">
        <div className="flex flex-col gap-2">
          <span className="font-web text-lg md:text-xl lg:text-2xl">{title}</span>
          <span className="text-sm md:text-base lg:text-lg text-amaranth-600 font-semibold">
            {discountText}
          </span>
          <span className="text-sm md:text-base lg:text-lg text-muted-foreground font-semibold">
            {description}
          </span>

          <button className="btn text-white bg-gradient-to-r from-amaranth-500 to-amaranth-600 hover:from-amaranth-600 hover:to-amaranth-700 capitalize mt-4 w-[120px] transition-all duration-300 text-sm md:text-base lg:text-lg">
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromoBlock;
