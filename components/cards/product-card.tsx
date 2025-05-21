import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  srcImage: string;
  name: string;
  author: string;
  price: number;
  category: string;
  slug: string;
}

const ProductCard = ({
  srcImage,
  name,
  author,
  price,
  category,
  slug,
}: ProductCardProps) => {
  return (
    <>
      <div className="product-box md:p-[1.5rem] p-[1rem] flex flex-col items-center justify-center border-b border-r border-[#eae8e4] relative">
        <Image
          src={srcImage}
          className="object-contain"
          alt={name}
          width={120}
          height={200}
        />
        <div className="content bg-white pt-2">
          <span className="text-[#f75454] text-xs uppercase">{category}</span>
          <h2 className="font-web product__name mb-1 line-clamp-2">
            <Link href={`/shop/${slug}`} className="hover:text-blue-500">
              {name}
            </Link>
          </h2>
          <p className="author__name text-gray-700 text-xs">{author}</p>
          <span className="text-base font-semibold mt-3 inline-flex">
            <span>
              <bdi>
                <span className="mx-2">جنيه</span>
                {price}
              </bdi>
            </span>
          </span>
          <div className="absolute opacity-0 right-0 left-0 bottom-0 hover:opacity-100 transition-opacity">
            <div className="flex items-center justify-between">
              <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                أضف إلى السلة
              </button>
              <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                أضف إلى المفضلة
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
