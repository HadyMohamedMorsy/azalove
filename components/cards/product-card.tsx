import Image from "next/image";

const ProductCard = ({ srcImage = "/media/example-product.jpg" }) => {
  return (
    <>
      <div className="product-box  md:p-[1.5rem] p-[1rem] flex flex-col items-center justify-center border-b border-r border-[#eae8e4] relative">
        <Image
          src={srcImage}
          className="object-contain"
          alt="logo"
          width={120}
          height={200}
        />
        <div className="content bg-white pt-2">
          <span className="text-[#f75454] text-xs uppercase">غلاف فني</span>
          <h2 className="font-web product__name  mb-1 line-clamp-2">
            <a href="#" className="hover:text-blue-500">
              الإيمان المكسور: داخل كلمة الإيمان…
            </a>
          </h2>
          <p className="author__name text-gray-700 text-xs">دكتور حسن</p>
          <span className="text-base font-semibold mt-3 inline-flex">
            <span>
              <bdi>
                <span>جنيه</span>
                29.59
              </bdi>
            </span>
            –
            <span>
              <bdi>
                <span>جنيه</span>
                59.95
              </bdi>
            </span>
          </span>
          <div className="absolute opacity-0 right-0 left-0 bottom-0">
            <div className="flex items-center justify-between">
              <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                Button
              </button>
              <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                Button
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
