// components/Header.jsx
import { Blog } from "@/types/blogs";

interface BlogCardProps {
  blog: Blog;
  variant?: "default" | "featured";
}

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Eye, Heart, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ImagePlaceholder from "../placeholder/image-placeholder";

const BlogCard = ({ blog, variant = "default" }: BlogCardProps) => {
  const { toast } = useToast();
  const {
    id,
    title,
    slug,
    shortDescription: excerpt,
    subTitle: author,
    createdAt: publishDate,
    postType: readTime,
    categories,
    thumb: image,
    createdBy,
    views,
  } = blog;
  const domain = process.env.MAIN_DOMAIN;
  const isFeatured = variant === "featured";

  const handleReadMore = () => {
    toast({
      title: "Opening blog post",
      description: `Reading "${title}"...`,
    });
  };

  return (
    <article
      className={`group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm border border-romantic-100/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${isFeatured ? "lg:col-span-2 lg:row-span-2" : ""}`}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-romantic-50/30 to-blush-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Image Container */}
      <div
        className={`relative overflow-hidden ${isFeatured ? "h-80" : "h-48"}`}
      >
        {image ? (
          <Image
            src={`${domain}${image}`}
            alt={title}
            width={1000}
            height={1000}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <ImagePlaceholder />
        )}

        {/* Shimmer Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <Badge
            variant="secondary"
            className="bg-white/90 text-romantic-700 backdrop-blur-sm border border-romantic-200/50"
          >
            {categories[0]?.name || "Uncategorized"}
          </Badge>
        </div>

        {/* Featured Badge */}
        {isFeatured && (
          <div className="absolute top-4 right-4">
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-romantic-500/90 text-white backdrop-blur-sm">
              <Heart className="w-3 h-3 fill-current" />
              <span className="text-xs font-medium">Featured</span>
            </div>
          </div>
        )}

        {/* Gradient Overlay on Image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className={`relative p-6 ${isFeatured ? "p-8" : ""}`}>
        <h2
          className={`font-playfair font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-romantic-700 transition-colors duration-300 ${isFeatured ? "text-2xl mb-4" : "text-xl"}`}
        >
          <Link href={`/blog/${slug}`}>{title}</Link>
        </h2>

        <p
          className={`text-gray-600 mb-4 line-clamp-3 leading-relaxed ${isFeatured ? "text-base mb-6" : "text-sm"}`}
        >
          {excerpt}
        </p>

        {/* Author and Meta Info */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <User className="w-4 h-4" />
              <span className="font-medium">
                {createdBy?.firstName} {createdBy?.lastName}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(publishDate).toLocaleDateString("ar-SA")}</span>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <Eye className="w-4 h-4" />
            <span>{views} views</span>
          </div>
        </div>

        {/* Read More Button */}
        <div className="mt-6">
          <Button
            onClick={handleReadMore}
            className="group/btn relative inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-romantic-500 to-romantic-600 text-white rounded-full font-medium transition-all duration-300 hover:from-romantic-600 hover:to-romantic-700 hover:shadow-lg hover:shadow-romantic-500/25 focus:outline-none focus:ring-2 focus:ring-romantic-500/50 focus:ring-offset-2"
          >
            <span className="relative z-10">Read More</span>
            <Heart className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/btn:scale-110 fill-current" />

            {/* Button Shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-500 rounded-full" />
          </Button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-romantic-200/30 to-blush-200/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute -bottom-10 -left-10 w-16 h-16 bg-gradient-to-br from-blush-200/30 to-romantic-200/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </article>
  );
};

export default BlogCard;
