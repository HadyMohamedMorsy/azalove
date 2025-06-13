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
          <span className="font-web lg:text-[2rem] text-xl">{title}</span>
          <span className="lg:text-[2.5rem] text-2xl text-[#f75454] font-semibold">
            {discountText}
          </span>
          <span className="lg:text-[1rem] text-xl text-gray-500 font-semibold">
            {description}
          </span>

          <button className="btn text-white bg-[#fa5e5d] capitalize mt-4 w-[120px]">
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromoBlock;
