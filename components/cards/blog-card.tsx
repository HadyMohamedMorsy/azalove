"use client";
import { Blog } from "@/types/blogs";

interface BlogCardProps {
  blog: Blog;
  variant?: "default" | "featured";
  viewMode?: "list" | "grid";
}

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Eye, Heart, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ImagePlaceholder from "../placeholder/image-placeholder";

const BlogCard = ({
  blog,
  variant = "default",
  viewMode = "grid",
}: BlogCardProps) => {
  const router = useRouter();
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
    router.push(`/blog/${slug}`);
  };

  return (
    <article
      className={`group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm border border-romantic-100/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
        isFeatured ? "lg:col-span-2 lg:row-span-2" : ""
      } ${viewMode === "list" ? "flex" : ""}`}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-romantic-50/30 to-blush-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Image Container */}
      <div
        className={`relative overflow-hidden ${
          isFeatured
            ? "h-80"
            : viewMode === "list"
              ? "w-64 h-48 flex-shrink-0"
              : "h-48"
        }`}
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
            {categories[0]?.name || "غير مصنف"}
          </Badge>
        </div>

        {/* Featured Badge */}
        {isFeatured && (
          <div className="absolute top-4 right-4">
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-romantic-500/90 text-white backdrop-blur-sm">
              <Heart className="w-3 h-3 fill-current" />
              <span className="text-xs font-medium">مميز</span>
            </div>
          </div>
        )}

        {/* Gradient Overlay on Image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div
        className={`relative ${viewMode === "list" ? "flex-1 flex flex-col justify-between" : ""} ${isFeatured ? "p-8" : "p-6"}`}
      >
        <div>
          <h2
            className={`font-playfair font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-romantic-700 transition-colors duration-300 ${
              isFeatured ? "text-2xl mb-4" : "text-xl"
            }`}
          >
            <Link href={`/blog/${slug}`}>{title}</Link>
          </h2>

          <p
            className={`text-gray-600 mb-4 line-clamp-3 leading-relaxed ${
              isFeatured ? "text-base mb-6" : "text-sm"
            }`}
          >
            {excerpt}
          </p>
        </div>

        {/* Author and Meta Info */}
        <div
          className={`flex items-center justify-between text-sm text-gray-500 ${viewMode === "list" ? "mt-auto" : ""}`}
        >
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
            <span>{views} مشاهدة</span>
          </div>
        </div>

        {/* Read More Button */}
        <div className="mt-6">
          <Button
            onClick={handleReadMore}
            className="bg-amaranth-900 text-white rounded-full px-4 transition-all duration-300 hover:scale-105"
          >
            <span className="relative z-10">اقرأ المزيد</span>
            <Heart className="w-4 h-4 mr-2 transition-transform duration-300 group-hover/btn:scale-110 fill-current" />

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
