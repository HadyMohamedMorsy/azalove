"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ArrowLeft,
  ArrowRight,
  Edit3,
  Eye,
  Grid3X3,
  Plus,
  Save,
  X,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Book {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  price: number;
  description: string;
}

interface UserAnswers {
  occasion: string;
  relationship: string;
  theme: string;
  style: string;
}

interface TextStyle {
  color: string;
  fontFamily: string;
  fontSize: number;
  textAlign: "left" | "center" | "right";
}

interface BookPage {
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

interface BookCoverEditor {
  isOpen: boolean;
  selectedBook: Book | null;
  customTitle: string;
  customSubtitle: string;
  customDescription: string;
  titleStyle: TextStyle;
  subtitleStyle: TextStyle;
  descriptionStyle: TextStyle;
}

interface UserCustomCover {
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

interface CoverManager {
  isOpen: boolean;
  selectedCover: Book | null;
  userCovers: UserCustomCover[];
  currentEditingCover: UserCustomCover | null;
  isAddingNewCover: boolean;
  showCoverTemplateSelector: boolean;
  deleteConfirmation: {
    isOpen: boolean;
    coverId: string | null;
    coverTitle: string;
  };
}

interface PageTemplateSelector {
  isOpen: boolean;
  onTemplateSelect: (template: any) => void;
}

interface BookCreator {
  isOpen: boolean;
  pages: BookPage[];
  currentPage: number;
  isPreviewMode: boolean;
}

const FONT_FAMILIES = [
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

// Updated colors to match website theme
const COLORS = [
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

const defaultTextStyle: TextStyle = {
  color: "#E6A238", // Default to azalove gold
  fontFamily: "Arial",
  fontSize: 24,
  textAlign: "center",
};

// Add more diverse cover templates with different images
const COVER_TEMPLATES = [
  {
    id: "romantic-sunset",
    title: "Love Under the Setting Sun",
    subtitle: "Our romantic journey together",
    description: "Every sunset reminds me of the warmth of your love",
    imageUrl: "/media/10-150x200.jpg",
  },
  {
    id: "adventure-mountains",
    title: "Our Mountain Adventures",
    subtitle: "Climbing life's peaks together",
    description: "With you, every challenge becomes an adventure worth taking",
    imageUrl: "/media/22-200x327.jpg",
  },
  {
    id: "cozy-home",
    title: "Home is Where You Are",
    subtitle: "Building our perfect sanctuary",
    description: "In your arms, I found my forever home",
    imageUrl: "/media/cover-bog.jpg",
  },
  {
    id: "ocean-love",
    title: "Deep as the Ocean",
    subtitle: "Our love knows no bounds",
    description: "My love for you runs as deep as the ocean's depths",
    imageUrl: "/media/contact.jpg",
  },
  {
    id: "starry-night",
    title: "Starry-Eyed Love",
    subtitle: "Counting stars and blessings",
    description: "Every star in the sky reminds me of the sparkle in your eyes",
    imageUrl: "/media/section-hero.jpg",
  },
  {
    id: "garden-romance",
    title: "Love Blooms Like Flowers",
    subtitle: "Growing together in love",
    description: "Our love grows stronger with each passing season",
    imageUrl: "/media/image-blog.jpg",
  },
  {
    id: "city-lights",
    title: "Bright Lights, Big Love",
    subtitle: "Our urban love story",
    description: "In this city of lights, you're the brightest star in my sky",
    imageUrl: "/media/10-150x200.jpg",
  },
  {
    id: "forest-walk",
    title: "Walking Through Life Together",
    subtitle: "Nature's path leads to love",
    description: "Every step we take together brings us closer to forever",
    imageUrl: "/media/22-200x327.jpg",
  },
  {
    id: "beach-memories",
    title: "Sandy Toes, Salty Kisses",
    subtitle: "Beachside romance",
    description:
      "Our love story is written in the sand and sealed with ocean waves",
    imageUrl: "/media/cover-bog.jpg",
  },
  {
    id: "winter-warmth",
    title: "Warm Hearts in Cold Weather",
    subtitle: "Cozy winter love",
    description: "Your love keeps me warm even on the coldest winter nights",
    imageUrl: "/media/contact.jpg",
  },
];

const PAGE_TEMPLATES = [
  {
    id: "travel",
    title: "Travel Adventures",
    subtitle: "Exploring the world together",
    description: "I love traveling and exploring the world with you",
    imageUrl: "/media/10-150x200.jpg",
  },
  {
    id: "romance",
    title: "Romantic Moments",
    subtitle: "Our special times",
    description: "Every moment with you feels like magic",
    imageUrl: "/media/22-200x327.jpg",
  },
  {
    id: "food",
    title: "Food Adventures",
    subtitle: "Culinary journeys together",
    description: "I love trying new foods and cooking with you",
    imageUrl: "/media/cover-bog.jpg",
  },
  {
    id: "music",
    title: "Musical Memories",
    subtitle: "Songs of our love",
    description: "Every song reminds me of you",
    imageUrl: "/media/contact.jpg",
  },
  {
    id: "nature",
    title: "Nature Walks",
    subtitle: "Exploring the great outdoors",
    description: "Walking hand in hand through nature's beauty",
    imageUrl: "/media/section-hero.jpg",
  },
  {
    id: "coffee",
    title: "Coffee Dates",
    subtitle: "Our morning rituals",
    description: "Every cup of coffee tastes better with you",
    imageUrl: "/media/image-blog.jpg",
  },
  {
    id: "movies",
    title: "Movie Nights",
    subtitle: "Cinema and cuddles",
    description: "Watching movies together is our favorite pastime",
    imageUrl: "/media/10-150x200.jpg",
  },
  {
    id: "dancing",
    title: "Dance Together",
    subtitle: "Moving to our own rhythm",
    description: "Dancing with you makes every day feel special",
    imageUrl: "/media/22-200x327.jpg",
  },
];

export default function RelatedBooksPage() {
  const searchParams = useSearchParams();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredBook, setHoveredBook] = useState<string | null>(null);
  const [coverEditor, setCoverEditor] = useState<BookCoverEditor>({
    isOpen: false,
    selectedBook: null,
    customTitle: "",
    customSubtitle: "",
    customDescription: "",
    titleStyle: { ...defaultTextStyle, fontSize: 28 },
    subtitleStyle: { ...defaultTextStyle, fontSize: 18 },
    descriptionStyle: { ...defaultTextStyle, fontSize: 14 },
  });
  const [bookCreator, setBookCreator] = useState<BookCreator>({
    isOpen: false,
    pages: [],
    currentPage: 0,
    isPreviewMode: false,
  });

  // New state for cover management
  const [coverManager, setCoverManager] = useState<CoverManager>({
    isOpen: false,
    selectedCover: null,
    userCovers: [],
    currentEditingCover: null,
    isAddingNewCover: false,
    showCoverTemplateSelector: false,
    deleteConfirmation: {
      isOpen: false,
      coverId: null,
      coverTitle: "",
    },
  });

  // State for page template selector
  const [pageTemplateSelector, setPageTemplateSelector] =
    useState<PageTemplateSelector>({
      isOpen: false,
      onTemplateSelect: () => {},
    });

  useEffect(() => {
    // Get answers from URL parameters
    const occasion = searchParams.get("occasion");
    const relationship = searchParams.get("relationship");
    const theme = searchParams.get("theme");
    const style = searchParams.get("style");

    const userAnswers: UserAnswers = {
      occasion: occasion || "",
      relationship: relationship || "",
      theme: theme || "",
      style: style || "",
    };

    // Simulate fetching books based on answers
    setTimeout(() => {
      const filteredBooks = getBooksByAnswers(userAnswers);
      setBooks(filteredBooks);
      setLoading(false);
    }, 1000);
  }, [searchParams]);

  const getBooksByAnswers = (answers: UserAnswers): Book[] => {
    // Mock data - in a real app, this would come from an API
    const allBooks: Book[] = [
      {
        id: "1",
        title: "Our Wild Little Love Story",
        subtitle: "The Adventures of ahmed & myar",
        imageUrl: "/media/example-product.jpg",
        price: 29.99,
        description: "A romantic adventure story for couples.",
      },
      {
        id: "2",
        title: "All the Reasons Why You're Out of This World!",
        subtitle: "Forever yours, ahmed",
        imageUrl: "/media/example-product.jpg",
        price: 24.99,
        description: "A sci-fi themed love story.",
      },
      {
        id: "3",
        title: "My Reasons Why You Mean The World To Me",
        subtitle: "A global love story",
        imageUrl: "/media/example-product.jpg",
        price: 19.99,
        description: "A world-themed romantic story.",
      },
      {
        id: "4",
        title: "My Reasons Why every time is like the first time",
        subtitle: "Travel adventures together",
        imageUrl: "/media/example-product.jpg",
        price: 34.99,
        description: "A travel-themed romantic adventure.",
      },
      {
        id: "5",
        title: "All My Reasons I Love You More Than Pizza",
        subtitle: "A foodie love story",
        imageUrl: "/media/example-product.jpg",
        price: 27.99,
        description: "A fun food-themed romantic story.",
      },
      {
        id: "6",
        title: "My Reasons Why love, ahmed",
        subtitle: "Tropical romance",
        imageUrl: "/media/example-product.jpg",
        price: 22.99,
        description: "A tropical vacation love story.",
      },
      {
        id: "7",
        title: "My Reasons Why love, ahmed",
        subtitle: "Night sky romance",
        imageUrl: "/media/example-product.jpg",
        price: 25.99,
        description: "A romantic night sky story.",
      },
      {
        id: "8",
        title: "A Valentine To Remember",
        subtitle: "My Reasons Why I Love myar",
        imageUrl: "/media/example-product.jpg",
        price: 28.99,
        description: "A special Valentine's Day story.",
      },
      {
        id: "9",
        title: "My Reasons Why love, ahmed",
        subtitle: "Musical romance",
        imageUrl: "/media/example-product.jpg",
        price: 23.99,
        description: "A musical-themed love story.",
      },
      {
        id: "10",
        title: "My Reasons Why love, ahmed",
        subtitle: "Street light romance",
        imageUrl: "/media/example-product.jpg",
        price: 26.99,
        description: "A romantic street light story.",
      },
      {
        id: "11",
        title: "My Reasons Why love, ahmed",
        subtitle: "Cloud love story",
        imageUrl: "/media/example-product.jpg",
        price: 21.99,
        description: "A dreamy cloud-themed romance.",
      },
    ];

    // Filter books based on answers
    return allBooks.filter((book) => {
      if (
        answers.occasion === "valentine" &&
        book.title.toLowerCase().includes("love")
      ) {
        return true;
      }
      if (
        answers.relationship === "family" &&
        book.title.toLowerCase().includes("family")
      ) {
        return true;
      }
      if (
        answers.relationship === "couple" &&
        book.title.toLowerCase().includes("love")
      ) {
        return true;
      }
      if (
        answers.theme === "romantic" &&
        book.title.toLowerCase().includes("romance")
      ) {
        return true;
      }
      if (
        answers.theme === "adventure" &&
        book.title.toLowerCase().includes("adventure")
      ) {
        return true;
      }
      if (
        answers.theme === "fantasy" &&
        book.title.toLowerCase().includes("fantasy")
      ) {
        return true;
      }
      return true; // Show all books for now
    });
  };

  const getOccasionLabel = (occasion: string) => {
    const labels: Record<string, string> = {
      valentine: "Valentine's Day",
      birthday: "Birthday",
      anniversary: "Anniversary",
      wedding: "Wedding",
      graduation: "Graduation",
      christmas: "Christmas",
      easter: "Easter",
      halloween: "Halloween",
    };
    return labels[occasion] || occasion;
  };

  const getRelationshipLabel = (relationship: string) => {
    const labels: Record<string, string> = {
      couple: "Couple",
      family: "Family",
      friends: "Friends",
      "parent-child": "Parent & Child",
      siblings: "Siblings",
    };
    return labels[relationship] || relationship;
  };

  const getThemeLabel = (theme: string) => {
    const labels: Record<string, string> = {
      romantic: "Romantic",
      adventure: "Adventure",
      fantasy: "Fantasy",
      "sci-fi": "Sci-Fi",
      nature: "Nature",
      urban: "Urban",
    };
    return labels[theme] || theme;
  };

  const handleBookSelect = (book: Book) => {
    // Open the cover editor with the selected book
    setCoverEditor({
      isOpen: true,
      selectedBook: book,
      customTitle: book.title,
      customSubtitle: book.subtitle,
      customDescription: book.description,
      titleStyle: { ...defaultTextStyle, fontSize: 28 },
      subtitleStyle: { ...defaultTextStyle, fontSize: 18 },
      descriptionStyle: { ...defaultTextStyle, fontSize: 14 },
    });
  };

  const handleSaveCover = () => {
    // Create a new book with the cover
    const coverPage: BookPage = {
      id: "cover-1",
      type: "cover",
      title: coverEditor.customTitle || coverEditor.selectedBook?.title || "",
      subtitle:
        coverEditor.customSubtitle || coverEditor.selectedBook?.subtitle || "",
      description:
        coverEditor.customDescription ||
        coverEditor.selectedBook?.description ||
        "",
      imageUrl: coverEditor.selectedBook?.imageUrl || "",
      titleStyle: coverEditor.titleStyle,
      subtitleStyle: coverEditor.subtitleStyle,
      descriptionStyle: coverEditor.descriptionStyle,
      order: 1,
    };

    setBookCreator({
      isOpen: true,
      pages: [coverPage],
      currentPage: 0,
      isPreviewMode: false,
    });

    setCoverEditor((prev) => ({ ...prev, isOpen: false }));
  };

  const handleCloseEditor = () => {
    setCoverEditor((prev) => ({ ...prev, isOpen: false }));
  };

  // New handlers for cover management
  const handleOpenCoverManager = (book: Book) => {
    setCoverManager((prev) => ({
      ...prev,
      isOpen: true,
      selectedCover: book,
      isAddingNewCover: false,
      currentEditingCover: null,
    }));
  };

  const handleAddNewCover = () => {
    if (!coverManager.selectedCover) return;

    // Show the cover template selector dialog
    setCoverManager((prev) => ({
      ...prev,
      showCoverTemplateSelector: true,
    }));
  };

  const handleDeleteCustomCover = (coverId: string) => {
    const coverToDelete = coverManager.userCovers.find(
      (cover) => cover.id === coverId
    );
    if (coverToDelete) {
      setCoverManager((prev) => ({
        ...prev,
        deleteConfirmation: {
          isOpen: true,
          coverId: coverId,
          coverTitle: coverToDelete.title,
        },
      }));
    }
  };

  const confirmDeleteCover = () => {
    if (coverManager.deleteConfirmation.coverId) {
      setCoverManager((prev) => ({
        ...prev,
        userCovers: prev.userCovers.filter(
          (cover) => cover.id !== prev.deleteConfirmation.coverId
        ),
        currentEditingCover:
          prev.currentEditingCover?.id === prev.deleteConfirmation.coverId
            ? null
            : prev.currentEditingCover,
        deleteConfirmation: {
          isOpen: false,
          coverId: null,
          coverTitle: "",
        },
      }));
    }
  };

  const cancelDeleteCover = () => {
    setCoverManager((prev) => ({
      ...prev,
      deleteConfirmation: {
        isOpen: false,
        coverId: null,
        coverTitle: "",
      },
    }));
  };

  const handleEditCustomCover = (cover: UserCustomCover) => {
    setCoverManager((prev) => ({
      ...prev,
      currentEditingCover: cover,
      isAddingNewCover: false,
    }));
  };

  const handleUpdateCustomCover = (
    coverId: string,
    updates: Partial<UserCustomCover>
  ) => {
    setCoverManager((prev) => ({
      ...prev,
      userCovers: prev.userCovers.map((cover) =>
        cover.id === coverId ? { ...cover, ...updates } : cover
      ),
      currentEditingCover:
        prev.currentEditingCover?.id === coverId
          ? { ...prev.currentEditingCover, ...updates }
          : prev.currentEditingCover,
    }));
  };

  const handleCloseCoverManager = () => {
    setCoverManager({
      isOpen: false,
      selectedCover: null,
      userCovers: [],
      currentEditingCover: null,
      isAddingNewCover: false,
      showCoverTemplateSelector: false,
      deleteConfirmation: {
        isOpen: false,
        coverId: null,
        coverTitle: "",
      },
    });
  };

  const handleSelectCoverTemplate = (template: any) => {
    if (!coverManager.selectedCover) return;

    const newCover: UserCustomCover = {
      id: `custom-${Date.now()}`,
      baseBookId: template.id,
      title: template.title,
      subtitle: template.subtitle,
      description: template.description,
      imageUrl: template.imageUrl,
      titleStyle: { ...defaultTextStyle, fontSize: 28 },
      subtitleStyle: { ...defaultTextStyle, fontSize: 18 },
      descriptionStyle: { ...defaultTextStyle, fontSize: 14 },
      isNewlyAdded: true,
    };

    setCoverManager((prev) => ({
      ...prev,
      userCovers: [...prev.userCovers, newCover],
      currentEditingCover: newCover,
      isAddingNewCover: true,
      showCoverTemplateSelector: false,
    }));
  };

  const handleCloseCoverTemplateSelector = () => {
    setCoverManager((prev) => ({
      ...prev,
      showCoverTemplateSelector: false,
    }));
  };

  const handleAddPage = () => {
    const newPage: BookPage = {
      id: `page-${Date.now()}`,
      type: "page",
      title: "New Page",
      subtitle: "Add your story here",
      description: "Customize this page with your own content",
      imageUrl: "/media/example-product.jpg",
      titleStyle: { ...defaultTextStyle, fontSize: 24 },
      subtitleStyle: { ...defaultTextStyle, fontSize: 16 },
      descriptionStyle: { ...defaultTextStyle, fontSize: 12 },
      order: bookCreator.pages.length + 1,
    };

    setBookCreator((prev) => ({
      ...prev,
      pages: [...prev.pages, newPage],
      currentPage: prev.pages.length,
    }));
  };

  const handleEditPage = (pageIndex: number) => {
    setBookCreator((prev) => ({
      ...prev,
      currentPage: pageIndex,
    }));
  };

  const handleUpdatePage = (pageIndex: number, updates: Partial<BookPage>) => {
    setBookCreator((prev) => ({
      ...prev,
      pages: prev.pages.map((page, index) =>
        index === pageIndex ? { ...page, ...updates } : page
      ),
    }));
  };

  const handleTogglePreview = () => {
    setBookCreator((prev) => ({
      ...prev,
      isPreviewMode: !prev.isPreviewMode,
    }));
  };

  const updateTextStyle = (
    textType: "title" | "subtitle" | "description",
    property: keyof TextStyle,
    value: any
  ) => {
    const currentPage = bookCreator.pages[bookCreator.currentPage];
    if (!currentPage) return;

    const updatedPage = {
      ...currentPage,
      [`${textType}Style`]: {
        ...currentPage[`${textType}Style`],
        [property]: value,
      },
    };

    handleUpdatePage(bookCreator.currentPage, updatedPage);
  };

  const renderTextStyleControlsForCustomCover = (
    textType: "title" | "subtitle" | "description",
    label: string
  ) => {
    if (!coverManager.currentEditingCover) return null;

    const style = coverManager.currentEditingCover[`${textType}Style`];

    const updateCustomCoverTextStyle = (
      textType: "title" | "subtitle" | "description",
      property: keyof TextStyle,
      value: any
    ) => {
      if (!coverManager.currentEditingCover) return;

      handleUpdateCustomCover(coverManager.currentEditingCover.id, {
        [`${textType}Style`]: {
          ...coverManager.currentEditingCover[`${textType}Style`],
          [property]: value,
        },
      });
    };

    return (
      <div className="space-y-4 p-4 border border-azalove-200 rounded-lg bg-gradient-to-br from-cream-50 to-azalove-50">
        <h4 className="font-semibold text-sm text-royal-800">{label} Style</h4>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-xs text-royal-700">Font Family</Label>
            <Select
              value={style.fontFamily}
              onValueChange={(value) =>
                updateCustomCoverTextStyle(textType, "fontFamily", value)
              }
            >
              <SelectTrigger className="h-8 text-xs border-azalove-200 focus:border-azalove-500 focus:ring-azalove-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-cream-50 border-azalove-200">
                {FONT_FAMILIES.map((font) => (
                  <SelectItem
                    key={font.value}
                    value={font.value}
                    className="hover:bg-azalove-100"
                  >
                    {font.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-xs text-royal-700">Font Size</Label>
            <Input
              type="number"
              value={style.fontSize}
              onChange={(e) =>
                updateCustomCoverTextStyle(
                  textType,
                  "fontSize",
                  parseInt(e.target.value)
                )
              }
              className="h-8 text-xs border-azalove-200 focus:border-azalove-500 focus:ring-azalove-500"
              min="8"
              max="72"
            />
          </div>
        </div>

        <div>
          <Label className="text-xs text-royal-700">Text Color</Label>
          <Select
            value={style.color}
            onValueChange={(value) =>
              updateCustomCoverTextStyle(textType, "color", value)
            }
          >
            <SelectTrigger className="h-8 text-xs border-azalove-200 focus:border-azalove-500 focus:ring-azalove-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-cream-50 border-azalove-200">
              {COLORS.map((color) => (
                <SelectItem
                  key={color.value}
                  value={color.value}
                  className="hover:bg-azalove-100"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded border border-azalove-200"
                      style={{ backgroundColor: color.value }}
                    />
                    {color.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-xs text-royal-700">Text Alignment</Label>
          <div className="flex gap-1 mt-1">
            <Button
              type="button"
              variant={style.textAlign === "left" ? "default" : "outline"}
              size="sm"
              onClick={() =>
                updateCustomCoverTextStyle(textType, "textAlign", "left")
              }
              className={`flex-1 h-8 ${
                style.textAlign === "left"
                  ? "bg-azalove-500 hover:bg-azalove-600 text-white border-azalove-500"
                  : "border-azalove-200 text-royal-700 hover:bg-azalove-50"
              }`}
            >
              <AlignLeft className="w-3 h-3" />
            </Button>
            <Button
              type="button"
              variant={style.textAlign === "center" ? "default" : "outline"}
              size="sm"
              onClick={() =>
                updateCustomCoverTextStyle(textType, "textAlign", "center")
              }
              className={`flex-1 h-8 ${
                style.textAlign === "center"
                  ? "bg-azalove-500 hover:bg-azalove-600 text-white border-azalove-500"
                  : "border-azalove-200 text-royal-700 hover:bg-azalove-50"
              }`}
            >
              <AlignCenter className="w-3 h-3" />
            </Button>
            <Button
              type="button"
              variant={style.textAlign === "right" ? "default" : "outline"}
              size="sm"
              onClick={() =>
                updateCustomCoverTextStyle(textType, "textAlign", "right")
              }
              className={`flex-1 h-8 ${
                style.textAlign === "right"
                  ? "bg-azalove-500 hover:bg-azalove-600 text-white border-azalove-500"
                  : "border-azalove-200 text-royal-700 hover:bg-azalove-50"
              }`}
            >
              <AlignRight className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderTextStyleControls = (
    textType: "title" | "subtitle" | "description",
    label: string
  ) => {
    const currentPage = bookCreator.pages[bookCreator.currentPage];
    if (!currentPage) return null;

    const style = currentPage[`${textType}Style`];

    return (
      <div className="space-y-4 p-4 border border-azalove-200 rounded-lg bg-gradient-to-br from-cream-50 to-azalove-50">
        <h4 className="font-semibold text-sm text-royal-800">{label} Style</h4>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-xs text-royal-700">Font Family</Label>
            <Select
              value={style.fontFamily}
              onValueChange={(value) =>
                updateTextStyle(textType, "fontFamily", value)
              }
            >
              <SelectTrigger className="h-8 text-xs border-azalove-200 focus:border-azalove-500 focus:ring-azalove-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-cream-50 border-azalove-200">
                {FONT_FAMILIES.map((font) => (
                  <SelectItem
                    key={font.value}
                    value={font.value}
                    className="hover:bg-azalove-100"
                  >
                    {font.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-xs text-royal-700">Font Size</Label>
            <Input
              type="number"
              value={style.fontSize}
              onChange={(e) =>
                updateTextStyle(textType, "fontSize", parseInt(e.target.value))
              }
              className="h-8 text-xs border-azalove-200 focus:border-azalove-500 focus:ring-azalove-500"
              min="8"
              max="72"
            />
          </div>
        </div>

        <div>
          <Label className="text-xs text-royal-700">Text Color</Label>
          <Select
            value={style.color}
            onValueChange={(value) => updateTextStyle(textType, "color", value)}
          >
            <SelectTrigger className="h-8 text-xs border-azalove-200 focus:border-azalove-500 focus:ring-azalove-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-cream-50 border-azalove-200">
              {COLORS.map((color) => (
                <SelectItem
                  key={color.value}
                  value={color.value}
                  className="hover:bg-azalove-100"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded border border-azalove-200"
                      style={{ backgroundColor: color.value }}
                    />
                    {color.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-xs text-royal-700">Text Alignment</Label>
          <div className="flex gap-1 mt-1">
            <Button
              type="button"
              variant={style.textAlign === "left" ? "default" : "outline"}
              size="sm"
              onClick={() => updateTextStyle(textType, "textAlign", "left")}
              className={`flex-1 h-8 ${
                style.textAlign === "left"
                  ? "bg-azalove-500 hover:bg-azalove-600 text-white border-azalove-500"
                  : "border-azalove-200 text-royal-700 hover:bg-azalove-50"
              }`}
            >
              <AlignLeft className="w-3 h-3" />
            </Button>
            <Button
              type="button"
              variant={style.textAlign === "center" ? "default" : "outline"}
              size="sm"
              onClick={() => updateTextStyle(textType, "textAlign", "center")}
              className={`flex-1 h-8 ${
                style.textAlign === "center"
                  ? "bg-azalove-500 hover:bg-azalove-600 text-white border-azalove-500"
                  : "border-azalove-200 text-royal-700 hover:bg-azalove-50"
              }`}
            >
              <AlignCenter className="w-3 h-3" />
            </Button>
            <Button
              type="button"
              variant={style.textAlign === "right" ? "default" : "outline"}
              size="sm"
              onClick={() => updateTextStyle(textType, "textAlign", "right")}
              className={`flex-1 h-8 ${
                style.textAlign === "right"
                  ? "bg-azalove-500 hover:bg-azalove-600 text-white border-azalove-500"
                  : "border-azalove-200 text-royal-700 hover:bg-azalove-50"
              }`}
            >
              <AlignRight className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderPagePreview = (page: BookPage) => {
    return (
      <div className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden border-2 border-azalove-200 shadow-lg">
        <img
          src={page.imageUrl}
          alt={page.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent">
          <div className="absolute top-0 left-0 right-0 p-6 text-white">
            <h2
              className="font-bold mb-2"
              style={{
                color: page.titleStyle.color,
                fontFamily: page.titleStyle.fontFamily,
                fontSize: `${page.titleStyle.fontSize}px`,
                textAlign: page.titleStyle.textAlign,
              }}
            >
              {page.title}
            </h2>
            {page.subtitle && (
              <p
                className="opacity-90 mb-2"
                style={{
                  color: page.subtitleStyle.color,
                  fontFamily: page.subtitleStyle.fontFamily,
                  fontSize: `${page.subtitleStyle.fontSize}px`,
                  textAlign: page.subtitleStyle.textAlign,
                }}
              >
                {page.subtitle}
              </p>
            )}
            {page.description && (
              <p
                className="opacity-75 line-clamp-2"
                style={{
                  color: page.descriptionStyle.color,
                  fontFamily: page.descriptionStyle.fontFamily,
                  fontSize: `${page.descriptionStyle.fontSize}px`,
                  textAlign: page.descriptionStyle.textAlign,
                }}
              >
                {page.description}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 to-azalove-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-azalove-500 mx-auto mb-4"></div>
          <p className="text-royal-700">Finding books for you...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-azalove-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-royal-900 mb-4">
            Books Related to Your Preferences
          </h1>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-azalove-100">
            <h2 className="text-lg font-semibold mb-4 text-royal-800">
              Your Selections:
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-amaranth-50 to-amaranth-100 p-3 rounded-lg border border-amaranth-200">
                <p className="text-sm text-amaranth-700">Occasion</p>
                <p className="font-semibold text-amaranth-800">
                  {getOccasionLabel(searchParams.get("occasion") || "")}
                </p>
              </div>
              <div className="bg-gradient-to-br from-azalove-50 to-azalove-100 p-3 rounded-lg border border-azalove-200">
                <p className="text-sm text-azalove-700">Relationship</p>
                <p className="font-semibold text-azalove-800">
                  {getRelationshipLabel(searchParams.get("relationship") || "")}
                </p>
              </div>
              <div className="bg-gradient-to-br from-royal-50 to-royal-100 p-3 rounded-lg border border-royal-200">
                <p className="text-sm text-royal-700">Theme</p>
                <p className="font-semibold text-royal-800">
                  {getThemeLabel(searchParams.get("theme") || "")}
                </p>
              </div>
              <div className="bg-gradient-to-br from-cream-100 to-cream-200 p-3 rounded-lg border border-cream-300">
                <p className="text-sm text-cream-800">Style</p>
                <p className="font-semibold text-cream-900">
                  {searchParams.get("style") || ""}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="group relative bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 border border-azalove-100 hover:border-azalove-300"
              onMouseEnter={() => setHoveredBook(book.id)}
              onMouseLeave={() => setHoveredBook(null)}
              onClick={() => handleOpenCoverManager(book)}
            >
              <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden relative">
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />

                {/* Hover Cover Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-royal-900/80 to-amaranth-900/80 flex items-center justify-center transition-opacity duration-300 ${
                    hoveredBook === book.id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="text-center text-white">
                    <div className="mb-2">
                      <Edit3 className="w-8 h-8 mx-auto mb-2 text-azalove-300" />
                    </div>
                    <p className="font-semibold text-lg">Customize Cover</p>
                    <p className="text-sm opacity-90">Click to edit text</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {books.length === 0 && (
          <div className="text-center py-12">
            <p className="text-royal-700 text-lg">
              No books found matching your preferences. Try adjusting your
              selections.
            </p>
          </div>
        )}
      </div>

      {/* Cover Manager Dialog */}
      <Dialog open={coverManager.isOpen} onOpenChange={handleCloseCoverManager}>
        <DialogContent className="sm:max-w-7xl w-[95vw] max-h-[95vh] overflow-y-auto bg-gradient-to-br from-cream-50 to-azalove-50 border-2 border-azalove-200 shadow-2xl">
          <DialogHeader className="bg-gradient-to-r from-royal-600 to-amaranth-600 text-white rounded-t-lg -m-6 mb-6 p-6">
            <DialogTitle className="flex items-center gap-2 text-white">
              <Edit3 className="w-5 h-5 text-azalove-300" />
              Cover Manager - {coverManager.selectedCover?.title}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Selected Cover Preview */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-royal-800">
                Selected Cover
              </h3>
              {coverManager.selectedCover && (
                <div className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden border-2 border-azalove-200 shadow-lg">
                  <img
                    src={coverManager.selectedCover.imageUrl}
                    alt={coverManager.selectedCover.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent">
                    <div className="absolute top-0 left-0 right-0 p-6 text-white">
                      <h2 className="font-bold mb-2 text-xl">
                        {coverManager.selectedCover.title}
                      </h2>
                      <p className="opacity-90 text-sm">
                        {coverManager.selectedCover.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Add New Cover Button */}
              {(() => {
                const usedCoverIds = coverManager.userCovers.map(
                  (cover) => cover.baseBookId
                );
                const availableTemplates = COVER_TEMPLATES.filter(
                  (template) => !usedCoverIds.includes(template.id)
                );
                const canAddMore = availableTemplates.length > 0;

                return (
                  <div className="space-y-2">
                    <Button
                      onClick={handleAddNewCover}
                      disabled={!canAddMore}
                      className={`w-full border-0 shadow-lg ${
                        canAddMore
                          ? "bg-gradient-to-r from-azalove-500 to-azalove-600 hover:from-azalove-600 hover:to-azalove-700 text-white"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      {canAddMore ? "Choose New Cover" : "All Covers Added"}
                    </Button>
                    {!canAddMore && (
                      <p className="text-xs text-gray-500 text-center">
                        You've added all available cover variations
                      </p>
                    )}
                  </div>
                );
              })()}
            </div>

            {/* User's Custom Covers */}
            <div className="xl:col-span-2 space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-royal-800">
                  Your Custom Covers
                </h3>

                {coverManager.userCovers.length === 0 ? (
                  <div className="text-center py-8 bg-white rounded-lg border border-azalove-200">
                    <p className="text-royal-600">
                      No custom covers yet. Click "Add New Cover" to create one!
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {coverManager.userCovers.map((cover) => (
                      <div
                        key={cover.id}
                        className="group relative bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 border border-azalove-100 hover:border-azalove-300"
                        onClick={() => handleEditCustomCover(cover)}
                      >
                        <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden relative">
                          <img
                            src={cover.imageUrl}
                            alt={cover.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent">
                            <div className="absolute top-0 left-0 right-0 p-4 text-white">
                              <h3
                                className="font-bold text-sm mb-1"
                                style={{
                                  color: cover.titleStyle.color,
                                  fontFamily: cover.titleStyle.fontFamily,
                                  fontSize: `${cover.titleStyle.fontSize}px`,
                                  textAlign: cover.titleStyle.textAlign,
                                }}
                              >
                                {cover.title}
                              </h3>
                              <p
                                className="opacity-90 text-xs"
                                style={{
                                  color: cover.subtitleStyle.color,
                                  fontFamily: cover.subtitleStyle.fontFamily,
                                  fontSize: `${cover.subtitleStyle.fontSize}px`,
                                  textAlign: cover.subtitleStyle.textAlign,
                                }}
                              >
                                {cover.subtitle}
                              </p>
                            </div>
                          </div>

                          {/* Edit Overlay */}
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="text-center text-white">
                              <Edit3 className="w-6 h-6 mx-auto mb-2" />
                              <p className="text-sm font-medium">Edit Cover</p>
                            </div>
                          </div>

                          {/* Delete Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteCustomCover(cover.id);
                            }}
                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            title="Delete cover"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>

                        {cover.isNewlyAdded && (
                          <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                            New
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Custom Cover Editor */}
              {coverManager.currentEditingCover && (
                <div className="space-y-6 bg-white p-6 rounded-lg border border-azalove-200 shadow-sm">
                  <h3 className="font-semibold text-lg text-royal-800">
                    {coverManager.isAddingNewCover
                      ? "Editing New Cover"
                      : "Edit Custom Cover"}
                  </h3>

                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {/* Cover Preview */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-royal-700">Preview</h4>
                      <div className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden border-2 border-azalove-200 shadow-lg">
                        <img
                          src={coverManager.currentEditingCover.imageUrl}
                          alt={coverManager.currentEditingCover.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent">
                          <div className="absolute top-0 left-0 right-0 p-6 text-white">
                            <h2
                              className="font-bold mb-2"
                              style={{
                                color:
                                  coverManager.currentEditingCover.titleStyle
                                    .color,
                                fontFamily:
                                  coverManager.currentEditingCover.titleStyle
                                    .fontFamily,
                                fontSize: `${coverManager.currentEditingCover.titleStyle.fontSize}px`,
                                textAlign:
                                  coverManager.currentEditingCover.titleStyle
                                    .textAlign,
                              }}
                            >
                              {coverManager.currentEditingCover.title}
                            </h2>
                            <p
                              className="opacity-90 mb-2"
                              style={{
                                color:
                                  coverManager.currentEditingCover.subtitleStyle
                                    .color,
                                fontFamily:
                                  coverManager.currentEditingCover.subtitleStyle
                                    .fontFamily,
                                fontSize: `${coverManager.currentEditingCover.subtitleStyle.fontSize}px`,
                                textAlign:
                                  coverManager.currentEditingCover.subtitleStyle
                                    .textAlign,
                              }}
                            >
                              {coverManager.currentEditingCover.subtitle}
                            </p>
                            {coverManager.currentEditingCover.description && (
                              <p
                                className="opacity-75 line-clamp-2"
                                style={{
                                  color:
                                    coverManager.currentEditingCover
                                      .descriptionStyle.color,
                                  fontFamily:
                                    coverManager.currentEditingCover
                                      .descriptionStyle.fontFamily,
                                  fontSize: `${coverManager.currentEditingCover.descriptionStyle.fontSize}px`,
                                  textAlign:
                                    coverManager.currentEditingCover
                                      .descriptionStyle.textAlign,
                                }}
                              >
                                {coverManager.currentEditingCover.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Editor Controls */}
                    <div className="space-y-4">
                      <div>
                        <Label
                          htmlFor="customTitle"
                          className="text-royal-700 font-medium"
                        >
                          Book Title
                        </Label>
                        <Input
                          id="customTitle"
                          value={coverManager.currentEditingCover.title}
                          onChange={(e) =>
                            handleUpdateCustomCover(
                              coverManager.currentEditingCover!.id,
                              {
                                title: e.target.value,
                              }
                            )
                          }
                          placeholder="Enter custom title..."
                          className="mt-1 border-azalove-200 focus:border-azalove-500 focus:ring-azalove-500"
                        />
                      </div>

                      <div>
                        <Label
                          htmlFor="customSubtitle"
                          className="text-royal-700 font-medium"
                        >
                          Subtitle
                        </Label>
                        <Input
                          id="customSubtitle"
                          value={coverManager.currentEditingCover.subtitle}
                          onChange={(e) =>
                            handleUpdateCustomCover(
                              coverManager.currentEditingCover!.id,
                              {
                                subtitle: e.target.value,
                              }
                            )
                          }
                          placeholder="Enter custom subtitle..."
                          className="mt-1 border-azalove-200 focus:border-azalove-500 focus:ring-azalove-500"
                        />
                      </div>

                      <div>
                        <Label
                          htmlFor="customDescription"
                          className="text-royal-700 font-medium"
                        >
                          Description
                        </Label>
                        <Textarea
                          id="customDescription"
                          value={coverManager.currentEditingCover.description}
                          onChange={(e) =>
                            handleUpdateCustomCover(
                              coverManager.currentEditingCover!.id,
                              {
                                description: e.target.value,
                              }
                            )
                          }
                          placeholder="Enter custom description..."
                          className="mt-1 min-h-[100px] border-azalove-200 focus:border-azalove-500 focus:ring-azalove-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Text Style Controls */}
                  <div className="space-y-4">
                    {renderTextStyleControlsForCustomCover("title", "Title")}
                    {renderTextStyleControlsForCustomCover(
                      "subtitle",
                      "Subtitle"
                    )}
                    {renderTextStyleControlsForCustomCover(
                      "description",
                      "Description"
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={() =>
                        setCoverManager((prev) => ({
                          ...prev,
                          currentEditingCover: null,
                        }))
                      }
                      className="flex-1 bg-gradient-to-r from-azalove-500 to-azalove-600 hover:from-azalove-600 hover:to-azalove-700 text-white border-0 shadow-lg"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Done Editing
                    </Button>
                    <Button
                      onClick={handleCloseCoverManager}
                      variant="ghost"
                      size="icon"
                      className="text-royal-600 hover:text-royal-800 hover:bg-royal-50"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Book Cover Editor Dialog */}
      <Dialog open={coverEditor.isOpen} onOpenChange={handleCloseEditor}>
        <DialogContent className="sm:max-w-6xl w-[95vw] max-h-[95vh] overflow-y-auto bg-gradient-to-br from-cream-50 to-azalove-50 border-2 border-azalove-200 shadow-2xl">
          <DialogHeader className="bg-gradient-to-r from-royal-600 to-amaranth-600 text-white rounded-t-lg -m-6 mb-6 p-6">
            <DialogTitle className="flex items-center gap-2 text-white">
              <Edit3 className="w-5 h-5 text-azalove-300" />
              Customize Book Cover
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Cover Preview */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-royal-800">
                Cover Preview
              </h3>
              <div className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden border-2 border-azalove-200 shadow-lg">
                {coverEditor.selectedBook && (
                  <>
                    <img
                      src={coverEditor.selectedBook.imageUrl}
                      alt={coverEditor.selectedBook.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Custom Text Overlay - Positioned at the top */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent">
                      <div className="absolute top-0 left-0 right-0 p-6 text-white">
                        <h2
                          className="font-bold mb-2"
                          style={{
                            color: coverEditor.titleStyle.color,
                            fontFamily: coverEditor.titleStyle.fontFamily,
                            fontSize: `${coverEditor.titleStyle.fontSize}px`,
                            textAlign: coverEditor.titleStyle.textAlign,
                          }}
                        >
                          {coverEditor.customTitle ||
                            coverEditor.selectedBook.title}
                        </h2>
                        <p
                          className="opacity-90 mb-2"
                          style={{
                            color: coverEditor.subtitleStyle.color,
                            fontFamily: coverEditor.subtitleStyle.fontFamily,
                            fontSize: `${coverEditor.subtitleStyle.fontSize}px`,
                            textAlign: coverEditor.subtitleStyle.textAlign,
                          }}
                        >
                          {coverEditor.customSubtitle ||
                            coverEditor.selectedBook.subtitle}
                        </p>
                        {coverEditor.customDescription && (
                          <p
                            className="opacity-75 line-clamp-2"
                            style={{
                              color: coverEditor.descriptionStyle.color,
                              fontFamily:
                                coverEditor.descriptionStyle.fontFamily,
                              fontSize: `${coverEditor.descriptionStyle.fontSize}px`,
                              textAlign: coverEditor.descriptionStyle.textAlign,
                            }}
                          >
                            {coverEditor.customDescription}
                          </p>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Editor Controls */}
            <div className="xl:col-span-2 space-y-6">
              <div className="space-y-4 bg-white p-4 rounded-lg border border-azalove-200 shadow-sm">
                <div>
                  <Label
                    htmlFor="customTitle"
                    className="text-royal-700 font-medium"
                  >
                    Book Title
                  </Label>
                  <Input
                    id="customTitle"
                    value={coverEditor.customTitle}
                    onChange={(e) =>
                      setCoverEditor((prev) => ({
                        ...prev,
                        customTitle: e.target.value,
                      }))
                    }
                    placeholder="Enter custom title..."
                    className="mt-1 border-azalove-200 focus:border-azalove-500 focus:ring-azalove-500"
                  />
                </div>

                <div>
                  <Label
                    htmlFor="customSubtitle"
                    className="text-royal-700 font-medium"
                  >
                    Subtitle
                  </Label>
                  <Input
                    id="customSubtitle"
                    value={coverEditor.customSubtitle}
                    onChange={(e) =>
                      setCoverEditor((prev) => ({
                        ...prev,
                        customSubtitle: e.target.value,
                      }))
                    }
                    placeholder="Enter custom subtitle..."
                    className="mt-1 border-azalove-200 focus:border-azalove-500 focus:ring-azalove-500"
                  />
                </div>

                <div>
                  <Label
                    htmlFor="customDescription"
                    className="text-royal-700 font-medium"
                  >
                    Description
                  </Label>
                  <Textarea
                    id="customDescription"
                    value={coverEditor.customDescription}
                    onChange={(e) =>
                      setCoverEditor((prev) => ({
                        ...prev,
                        customDescription: e.target.value,
                      }))
                    }
                    placeholder="Enter custom description..."
                    className="mt-1 min-h-[100px] border-azalove-200 focus:border-azalove-500 focus:ring-azalove-500"
                  />
                </div>
              </div>

              {/* Text Style Controls */}
              <div className="space-y-4">
                {renderTextStyleControls("title", "Title")}
                {renderTextStyleControls("subtitle", "Subtitle")}
                {renderTextStyleControls("description", "Description")}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleSaveCover}
                  className="flex-1 bg-gradient-to-r from-azalove-500 to-azalove-600 hover:from-azalove-600 hover:to-azalove-700 text-white border-0 shadow-lg"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Create Book
                </Button>
                <Button
                  onClick={handleCloseEditor}
                  variant="ghost"
                  size="icon"
                  className="text-royal-600 hover:text-royal-800 hover:bg-royal-50"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Book Creator Dialog */}
      <Dialog
        open={bookCreator.isOpen}
        onOpenChange={() =>
          setBookCreator((prev) => ({ ...prev, isOpen: false }))
        }
      >
        <DialogContent className="sm:max-w-7xl w-[95vw] max-h-[95vh] overflow-y-auto bg-gradient-to-br from-cream-50 to-azalove-50 border-2 border-azalove-200 shadow-2xl">
          <DialogHeader className="bg-gradient-to-r from-royal-600 to-amaranth-600 text-white rounded-t-lg -m-6 mb-6 p-6">
            <DialogTitle className="flex items-center gap-2 text-white">
              <Edit3 className="w-5 h-5 text-azalove-300" />
              Create Your Book
            </DialogTitle>
          </DialogHeader>

          {bookCreator.isPreviewMode ? (
            // Preview Mode
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-royal-800">
                  Book Preview
                </h3>
                <Button
                  onClick={handleTogglePreview}
                  variant="outline"
                  className="border-azalove-300 text-azalove-700 hover:bg-azalove-50"
                >
                  <Grid3X3 className="w-4 h-4 mr-2" />
                  Edit Mode
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {bookCreator.pages.map((page, index) => (
                  <div key={page.id} className="space-y-2">
                    <div className="text-center text-sm text-royal-700 font-medium">
                      {page.type === "cover" ? "Cover" : `Page ${index}`}
                    </div>
                    {renderPagePreview(page)}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Edit Mode
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Page Preview */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-royal-800">
                  Page Preview
                </h3>
                {bookCreator.pages[bookCreator.currentPage] &&
                  renderPagePreview(bookCreator.pages[bookCreator.currentPage])}
              </div>

              {/* Editor Controls */}
              <div className="xl:col-span-2 space-y-6">
                {/* Navigation */}
                <div className="flex justify-between items-center bg-white p-4 rounded-lg border border-azalove-200 shadow-sm">
                  <Button
                    onClick={() =>
                      setBookCreator((prev) => ({
                        ...prev,
                        currentPage: Math.max(0, prev.currentPage - 1),
                      }))
                    }
                    disabled={bookCreator.currentPage === 0}
                    variant="outline"
                    size="sm"
                    className="border-azalove-300 text-azalove-700 hover:bg-azalove-50"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>

                  <div className="text-center">
                    <p className="text-sm text-royal-700">
                      Page {bookCreator.currentPage + 1} of{" "}
                      {bookCreator.pages.length}
                    </p>
                    <p className="text-xs text-royal-600">
                      {bookCreator.pages[bookCreator.currentPage]?.type ===
                      "cover"
                        ? "Cover"
                        : "Page"}
                    </p>
                  </div>

                  <Button
                    onClick={() =>
                      setBookCreator((prev) => ({
                        ...prev,
                        currentPage: Math.min(
                          prev.pages.length - 1,
                          prev.currentPage + 1
                        ),
                      }))
                    }
                    disabled={
                      bookCreator.currentPage === bookCreator.pages.length - 1
                    }
                    variant="outline"
                    size="sm"
                    className="border-azalove-300 text-azalove-700 hover:bg-azalove-50"
                  >
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>

                {/* Page Content Editor */}
                <div className="space-y-4 bg-white p-4 rounded-lg border border-azalove-200 shadow-sm">
                  <div>
                    <Label className="text-royal-700 font-medium">
                      Page Title
                    </Label>
                    <Input
                      value={
                        bookCreator.pages[bookCreator.currentPage]?.title || ""
                      }
                      onChange={(e) =>
                        handleUpdatePage(bookCreator.currentPage, {
                          title: e.target.value,
                        })
                      }
                      className="mt-1 border-azalove-200 focus:border-azalove-500 focus:ring-azalove-500"
                    />
                  </div>

                  <div>
                    <Label className="text-royal-700 font-medium">
                      Subtitle
                    </Label>
                    <Input
                      value={
                        bookCreator.pages[bookCreator.currentPage]?.subtitle ||
                        ""
                      }
                      onChange={(e) =>
                        handleUpdatePage(bookCreator.currentPage, {
                          subtitle: e.target.value,
                        })
                      }
                      className="mt-1 border-azalove-200 focus:border-azalove-500 focus:ring-azalove-500"
                    />
                  </div>

                  <div>
                    <Label className="text-royal-700 font-medium">
                      Description
                    </Label>
                    <Textarea
                      value={
                        bookCreator.pages[bookCreator.currentPage]
                          ?.description || ""
                      }
                      onChange={(e) =>
                        handleUpdatePage(bookCreator.currentPage, {
                          description: e.target.value,
                        })
                      }
                      className="mt-1 min-h-[100px] border-azalove-200 focus:border-azalove-500 focus:ring-azalove-500"
                    />
                  </div>
                </div>

                {/* Text Style Controls */}
                <div className="space-y-4">
                  {renderTextStyleControls("title", "Title")}
                  {renderTextStyleControls("subtitle", "Subtitle")}
                  {renderTextStyleControls("description", "Description")}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleAddPage}
                    className="flex-1 bg-gradient-to-r from-amaranth-500 to-amaranth-600 hover:from-amaranth-600 hover:to-amaranth-700 text-white border-0 shadow-lg"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Page
                  </Button>
                  <Button
                    onClick={handleTogglePreview}
                    variant="outline"
                    className="flex-1 border-azalove-300 text-azalove-700 hover:bg-azalove-50"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview Book
                  </Button>
                  <Button
                    onClick={() =>
                      setBookCreator((prev) => ({ ...prev, isOpen: false }))
                    }
                    variant="ghost"
                    size="icon"
                    className="text-royal-600 hover:text-royal-800 hover:bg-royal-50"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={coverManager.deleteConfirmation.isOpen}
        onOpenChange={cancelDeleteCover}
      >
        <DialogContent className="sm:max-w-md bg-gradient-to-br from-cream-50 to-azalove-50 border-2 border-azalove-200 shadow-2xl">
          <DialogHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-t-lg -m-6 mb-6 p-6">
            <DialogTitle className="flex items-center gap-2 text-white">
              <X className="w-5 h-5 text-red-200" />
              Delete Cover
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <p className="text-royal-700">
              Are you sure you want to delete the cover "
              {coverManager.deleteConfirmation.coverTitle}"?
            </p>
            <p className="text-sm text-royal-600">
              This action cannot be undone.
            </p>

            <div className="flex gap-3 pt-4">
              <Button
                onClick={confirmDeleteCover}
                className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0 shadow-lg"
              >
                Delete Cover
              </Button>
              <Button
                onClick={cancelDeleteCover}
                variant="outline"
                className="flex-1 border-azalove-300 text-azalove-700 hover:bg-azalove-50"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Cover Template Selector Dialog */}
      <Dialog
        open={coverManager.showCoverTemplateSelector}
        onOpenChange={handleCloseCoverTemplateSelector}
      >
        <DialogContent className="sm:max-w-6xl w-[95vw] max-h-[95vh] overflow-y-auto bg-gradient-to-br from-cream-50 to-azalove-50 border-2 border-azalove-200 shadow-2xl">
          <DialogHeader className="bg-gradient-to-r from-royal-600 to-amaranth-600 text-white rounded-t-lg -m-6 mb-6 p-6">
            <DialogTitle className="flex items-center gap-2 text-white">
              <Plus className="w-5 h-5 text-azalove-300" />
              Choose a Cover Template
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="text-center">
              <p className="text-royal-700 text-lg mb-2">
                Select a different cover template for your book
              </p>
              <p className="text-royal-600 text-sm">
                Each template offers a unique style and theme for your story
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {COVER_TEMPLATES.map((template) => {
                const isUsed = coverManager.userCovers.some(
                  (cover) => cover.baseBookId === template.id
                );

                return (
                  <div
                    key={template.id}
                    className={`group relative bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 border-2 ${
                      isUsed
                        ? "border-gray-300 opacity-50 cursor-not-allowed"
                        : "border-azalove-100 hover:border-azalove-300"
                    }`}
                    onClick={() =>
                      !isUsed && handleSelectCoverTemplate(template)
                    }
                  >
                    <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden relative">
                      <img
                        src={template.imageUrl}
                        alt={template.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent">
                        <div className="absolute top-0 left-0 right-0 p-4 text-white">
                          <h3 className="font-bold text-sm mb-1">
                            {template.title}
                          </h3>
                          <p className="opacity-90 text-xs">
                            {template.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Selection Overlay */}
                      {!isUsed && (
                        <div className="absolute inset-0 bg-azalove-500/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="text-center text-white">
                            <Plus className="w-8 h-8 mx-auto mb-2" />
                            <p className="text-sm font-medium">
                              Select This Cover
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Used Badge */}
                      {isUsed && (
                        <div className="absolute top-2 right-2 bg-gray-500 text-white text-xs px-2 py-1 rounded-full">
                          Used
                        </div>
                      )}
                    </div>

                    <div className="p-3">
                      <h4 className="font-semibold text-sm text-royal-800 mb-1">
                        {template.title}
                      </h4>
                      <p className="text-xs text-royal-600 line-clamp-2">
                        {template.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center pt-4">
              <Button
                onClick={handleCloseCoverTemplateSelector}
                variant="outline"
                className="border-azalove-300 text-azalove-700 hover:bg-azalove-50"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
