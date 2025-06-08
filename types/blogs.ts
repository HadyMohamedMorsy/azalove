import { Category } from "./category";

export interface Blog {
  id: number;
  order: number;
  video: string | null;
  views: number;
  isFeatured: boolean;
  isPublished: boolean;
  startDate: string;
  endDate: string | null;
  title: string;
  subTitle: string;
  postType: string;
  slug: string;
  description: string | null;
  shortDescription: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  featuredImages: string[] | null;
  thumb: string | null;
  mediaType: string | null;
  categories: Category[];
  createdAt: string;
  createdBy: {
    id: number;
    firstName: string;
    lastName: string;
  };
}

export interface ShowBlog {
  title: string;
  description: string;
  createdAt: string;
  createdBy: { firstName: string; lastName: string };
  startDate: string;
  endDate: string;
  featuredImage: string;
  categories: Category[];
  mediaType: string;
  featuredImages: string[];
  thumb: string;
  views: number;
  isFeatured: boolean;
  isPublished: boolean;
  slug: string;
}

export interface RelatedBlogs {
  title: string;
  shortDescription: string;
  createdAt: string;
  thumb?: string;
}
