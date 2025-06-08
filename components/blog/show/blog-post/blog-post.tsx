import { ShowBlog } from "@/types/blogs";
import { Calendar, Clock, Tag, User } from "lucide-react";
import React from "react";

const BlogPost: React.FC<ShowBlog> = ({
  title,
  description,
  createdBy,
  createdAt,
  categories,
  thumb,
}) => {
  const domain = process.env.MAIN_DOMAIN;

  return (
    <article className="max-w-4xl mx-auto bg-card rounded-lg shadow-lg overflow-hidden">
      {thumb && (
        <div className="w-full h-64 md:h-96 overflow-hidden">
          <img
            src={`${domain}${thumb}`}
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
      )}

      <div className="p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>
              {createdBy.firstName} {createdBy.lastName}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{createdAt}</span>
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
          {title}
        </h1>

        <div className="prose prose-lg max-w-none text-foreground">
          {description.split("\n\n").map((paragraph, index) => (
            <p
              key={index}
              className="mb-6 leading-relaxed text-muted-foreground"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-border">
          <Tag className="w-4 h-4 text-muted-foreground mt-1" />
          {categories.map((category, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm hover:bg-accent transition-colors"
            >
              {category.name}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};

export default BlogPost;
