// components/Header.jsx
import { Blog } from "@/types/blogs";

interface BlogCardProps {
  blog: Blog;
}

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Eye, User } from "lucide-react";

const BlogCard = ({ blog }: BlogCardProps) => {
  const { toast } = useToast();
  const {
    id,
    title,
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

  const handleReadMore = () => {
    toast({
      title: "Opening blog post",
      description: `Reading "${title}"...`,
    });
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Blog Image */}
      <div className="relative aspect-video overflow-hidden bg-gray-100">
        <img
          src={`${domain}${image}`}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <Badge
            variant="secondary"
            className="bg-background/90 backdrop-blur-sm"
          >
            {categories[0]?.name || "Uncategorized"}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-3">
        {/* Meta Information */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>
              {createdBy?.firstName} {createdBy?.lastName}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{new Date(publishDate).toLocaleDateString("ar-SA")}</span>
          </div>
        </div>

        {/* Blog Title */}
        <h3 className="font-bold text-lg line-clamp-2 leading-tight group-hover:text-primary transition-colors">
          {title}
        </h3>
      </CardHeader>

      <CardContent className="pt-0 space-y-4">
        {/* Excerpt */}
        <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
          {excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Eye className="w-4 h-4" />
            <span>{views} views</span>
          </div>

          <Button onClick={handleReadMore} variant="outline" size="sm">
            Read More
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
