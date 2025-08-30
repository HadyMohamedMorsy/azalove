export interface Book {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  price: number;
  description: string;
}

export interface UserAnswers {
  // This interface is kept for backward compatibility
  // The actual quiz answers are now stored in the SaveAnswers format
  // You can implement custom filtering logic based on your quiz questions later
  [key: string]: string;
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

export const COVER_TEMPLATES = [
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

export const PAPER_OPTIONS = [
  { id: "standard", label: "ورق عادي (Standard)", price: 0 },
  { id: "premium", label: "ورق فاخر (Premium)", price: 10 },
  { id: "deluxe", label: "ورق ديلوكس (Deluxe)", price: 20 },
];

export const PAGE_TEMPLATES = [
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

export const getBooksByAnswers = (answers: UserAnswers): Book[] => {
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

  // For now, return all books since we're using the new quiz system
  // You can implement custom filtering logic based on your quiz questions later
  return allBooks;
};
