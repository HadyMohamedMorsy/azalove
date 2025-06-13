import ImagePlaceholder from "@/components/placeholder/image-placeholder";
import { Calendar } from "lucide-react";
import React from "react";

interface BlogCardProps {
  title: string;
  shortDescription: string;
  createdAt: string;
  thumb?: string;
  onClick?: () => void;
}

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  shortDescription,
  createdAt,
  thumb,
  onClick,
}) => {
  const domain = process.env.MAIN_DOMAIN;

  return (
    <div
      className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
      onClick={onClick}
    >
      {thumb && (
        <div className="w-full h-48 overflow-hidden">
          {thumb ? (
            <img
              src={`${domain}${thumb}`}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <ImagePlaceholder />
          )}
        </div>
      )}

      <div className="p-4">
        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {shortDescription}
        </p>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="w-3 h-3" />
            <span>{createdAt}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
