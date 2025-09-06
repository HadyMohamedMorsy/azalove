import { filterSvgByCharacters } from "@/utils/character-color-utils";

export interface Book {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  price: number;
  description: string;
}

// API Response interface for dynamic books
export interface DynamicBook {
  id: string;
  price: number;
  svg: string; // SVG content - will be used as imageUrl
  title: string;
  type: "PAGE" | "COVER"; // PAGE = Page template, COVER = Cover template
}

export interface UserAnswers {
  [key: string]: any;
  quizAnswers?: string;
  characterSelection?: Array<{
    character: string;
    colorsCode: string[];
    bodyType: string[];
    body: Array<{
      bodyType: string;
      label?: string;
      color?: string;
    }>;
  }>;
}

export interface TextStyle {
  color: string;
  fontFamily: string;
  fontSize: number;
  textAlign: "left" | "center" | "right";
}

export interface BookPage {
  id: string;
  type: "cover" | "page";
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl: string;
  titleStyle: TextStyle;
  subtitleStyle: TextStyle;
  descriptionStyle: TextStyle;
  order: number;
}

export interface UserCustomCover {
  id: string;
  baseBookId: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  titleStyle: TextStyle;
  subtitleStyle: TextStyle;
  descriptionStyle: TextStyle;
  isNewlyAdded: boolean;
}

export const FONT_FAMILIES = [
  { value: "Arial", label: "Arial" },
  { value: "Helvetica", label: "Helvetica" },
  { value: "Times New Roman", label: "Times New Roman" },
  { value: "Georgia", label: "Georgia" },
  { value: "Verdana", label: "Verdana" },
  { value: "Courier New", label: "Courier New" },
  { value: "Impact", label: "Impact" },
  { value: "Comic Sans MS", label: "Comic Sans MS" },
  { value: "Trebuchet MS", label: "Trebuchet MS" },
  { value: "Lucida Sans Unicode", label: "Lucida Sans Unicode" },
];

export const COLORS = [
  { value: "#FFF5E9", label: "Cream" },
  { value: "#E6A238", label: "Azalove Gold" },
  { value: "#3D2545", label: "Royal Purple" },
  { value: "#B22947", label: "Amaranth" },
  { value: "#FFFFFF", label: "White" },
  { value: "#000000", label: "Black" },
  { value: "#FDF2E3", label: "Light Cream" },
  { value: "#D18A1F", label: "Dark Gold" },
  { value: "#543C61", label: "Medium Purple" },
  { value: "#CD2F54", label: "Bright Amaranth" },
  { value: "#F6CA86", label: "Light Gold" },
  { value: "#664975", label: "Light Purple" },
];

export const defaultTextStyle: TextStyle = {
  color: "#E6A238", // Default to azalove gold
  fontFamily: "Arial",
  fontSize: 24,
  textAlign: "center",
};

// COVER_TEMPLATES removed - now using dynamic data from API

export const PAPER_OPTIONS = [
  { id: "standard", label: "ورق عادي (Standard)", price: 0 },
  { id: "premium", label: "ورق فاخر (Premium)", price: 10 },
  { id: "deluxe", label: "ورق ديلوكس (Deluxe)", price: 20 },
];

// PAGE_TEMPLATES removed - now using dynamic data from API

// Convert DynamicBook to Book for compatibility
export const convertDynamicBookToBook = (
  dynamicBook: DynamicBook,
  characterSelection?: any[]
): Book => {
  // Filter SVG based on character selection if provided
  let filteredSvg = dynamicBook.svg;
  if (characterSelection && characterSelection.length > 0) {
    filteredSvg = filterSvgByCharacters(dynamicBook.svg, characterSelection);
  }

  return {
    id: dynamicBook.id,
    title: dynamicBook.title,
    subtitle: getSubtitleByType(dynamicBook.type),
    imageUrl: `data:image/svg+xml;base64,${btoa(filteredSvg)}`, // Convert filtered SVG to data URL
    price: +dynamicBook.price,
    description: getDescriptionByType(dynamicBook.type),
  };
};

// Helper function to get subtitle based on book type
const getSubtitleByType = (type: "PAGE" | "PR" | "COVER"): string => {
  switch (type) {
    case "COVER":
      return "غلاف مخصص";
    case "PAGE":
      return "صفحة محتوى";
    default:
      return "";
  }
};

// Helper function to get description based on book type
const getDescriptionByType = (type: "PAGE" | "PR" | "COVER"): string => {
  switch (type) {
    case "COVER":
      return "غلاف مخصص لكتابك الرومانسي";
    case "PAGE":
      return "صفحة محتوى قابلة للتخصيص";
    default:
      return "";
  }
};
