// components/Header.jsx
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

const BlogCard = () => {
  return (
    <div className="px-[2.5rem] py-[2rem]">
      <Image
        src="/media/image-blog.jpg"
        className="object-contain"
        alt="logo"
        width={445}
        height={300}
      />
      <div className="pt-2">
        <span className="text-[#f75454] text-xs uppercase">
          كتب الأطفال والعلوم والرياضيات
        </span>
        <h3 className="text-2xl font-web font-bold mb-3">
          نصائح آن بوغل الخمس لاستعادة حبك للقراءة
        </h3>
        <p className="text-gray-600">
          في عالم الإنترنت الخاص بنا، يتم توجيه الانتباه في اتجاهات مختلفة في
          وقت واحد أثناء قيامنا بمهام متعددة كل يوم.
        </p>
        <div className="mt-3 flex items-center text-gray-400 gap-3">
          <FontAwesomeIcon icon={faClock} size="xs" />
          <span> August 19, 2020 </span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
