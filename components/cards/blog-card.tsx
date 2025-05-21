// components/Header.jsx
import { Blog } from "@/types/blogs";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  blog: Blog;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  return (
    <div className="px-[2.5rem] py-[2rem]">
      <Image
        src={blog.thumb || "/media/image-blog.jpg"}
        className="object-contain"
        alt={blog.title}
        width={445}
        height={300}
      />
      <div className="pt-2">
        <span className="text-[#f75454] text-xs uppercase">
          {blog.categories[0]?.name || "غير مصنف"}
        </span>
        <h3 className="text-2xl font-web font-bold mb-3">
          <Link href={`/blog/${blog.slug}`} className="hover:text-blue-500">
            {blog.title}
          </Link>
        </h3>
        <p className="text-gray-600">
          {blog.shortDescription || blog.description || ""}
        </p>
        <div className="mt-3 flex items-center text-gray-400 gap-3">
          <FontAwesomeIcon icon={faClock} size="xs" />
          <span>{new Date(blog.startDate).toLocaleDateString("ar-SA")}</span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
