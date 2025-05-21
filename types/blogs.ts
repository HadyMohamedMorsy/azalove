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
}
