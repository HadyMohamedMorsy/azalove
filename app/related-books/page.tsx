"use client";

import BookCard from "@/components/books/book-card";
import BookCreationSummaryDialog from "@/components/books/book-creation-summary-dialog";
import BookCreatorDialog from "@/components/books/book-creator-dialog";
import CoverManagerDialog from "@/components/books/cover-manager-dialog";
import {
  Book,
  BookPage,
  COVER_TEMPLATES,
  defaultTextStyle,
  getBooksByAnswers,
  PAPER_OPTIONS,
  UserAnswers,
  UserCustomCover,
} from "@/components/books/data/books-data";
import PageTemplateSelectorDialog from "@/components/books/page-template-selector-dialog";
import SavedCoupleDisplay from "@/components/books/saved-couple-display";
import UserPreferencesDisplay from "@/components/books/user-preferences-display";
import { SavedCouple, useSavedCouples } from "@/hooks/use-saved-couples";
import { useTranslation } from "@/hooks/use-translation";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface BookCoverEditor {
  isOpen: boolean;
  selectedBook: Book | null;
  customTitle: string;
  customSubtitle: string;
  customDescription: string;
  titleStyle: any;
  subtitleStyle: any;
  descriptionStyle: any;
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

interface BookCreator {
  isOpen: boolean;
  pages: BookPage[];
  currentPage: number;
  isPreviewMode: boolean;
}

interface BookCreationSummary {
  isOpen: boolean;
  selectedCover: Book | null;
  pages: BookPage[];
  selectedPaper: { id: string; label: string; price: number };
  couple: SavedCouple | null;
}

interface PageTemplateSelector {
  isOpen: boolean;
}

export default function RelatedBooksPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { savedCouples } = useSavedCouples();
  const { t } = useTranslation();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
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

  const [bookCreationSummary, setBookCreationSummary] =
    useState<BookCreationSummary>({
      isOpen: false,
      selectedCover: null,
      pages: [],
      selectedPaper: PAPER_OPTIONS[0],
      couple: null,
    });

  const [pageTemplateSelector, setPageTemplateSelector] =
    useState<PageTemplateSelector>({
      isOpen: false,
    });

  const [selectedPaper, setSelectedPaper] = useState(PAPER_OPTIONS[0]);

  // Get the most recently saved couple
  const latestCouple =
    savedCouples.length > 0 ? savedCouples[savedCouples.length - 1] : null;

  // Get answers from URL parameters or from saved couple
  const getAnswers = (): UserAnswers => {
    // First try to get from URL parameters
    const urlAnswers = searchParams.get("answers");
    const urlCoupleName = searchParams.get("coupleName");

    if (urlAnswers && urlCoupleName) {
      try {
        const parsedAnswers = JSON.parse(urlAnswers);
        // Store the quiz answers for potential future use
        // You can implement custom filtering logic based on these answers later
        return {
          quizAnswers: JSON.stringify(parsedAnswers),
          coupleName: urlCoupleName,
        };
      } catch (error) {
        console.error("Error parsing answers from URL:", error);
      }
    }

    // If not in URL, get from saved couple
    if (latestCouple?.answers?.selectedAnswers) {
      return {
        quizAnswers: JSON.stringify(latestCouple.answers.selectedAnswers),
        coupleName: latestCouple.name,
      };
    }

    // Default values
    return {
      quizAnswers: "",
      coupleName: "",
    };
  };

  const userAnswers = getAnswers();

  useEffect(() => {
    // Simulate fetching books based on answers
    setTimeout(() => {
      const filteredBooks = getBooksByAnswers(userAnswers);
      setBooks(filteredBooks);
      setLoading(false);
    }, 1000);
  }, [userAnswers]);

  const handleBookSelect = (book: Book) => {
    setCoverManager((prev) => ({
      ...prev,
      isOpen: true,
      selectedCover: book,
      isAddingNewCover: false,
      currentEditingCover: null,
    }));
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

  // Cover manager handlers
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

    // Open page template selector
    setPageTemplateSelector({ isOpen: true });

    // Close cover manager
    setCoverManager((prev) => ({
      ...prev,
      isOpen: false,
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
    resetAllState();
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
    resetAllState();
  };

  // Book creator handlers
  const handleAddPage = () => {
    // Close book creator and open page template selector
    setBookCreator((prev) => ({ ...prev, isOpen: false }));
    setPageTemplateSelector({ isOpen: true });
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

  const handleCreateBook = () => {
    setBookCreationSummary({
      isOpen: true,
      selectedCover: coverManager.selectedCover,
      pages: bookCreator.pages,
      // Add selectedPaper and latestCouple
      selectedPaper,
      couple: latestCouple,
    });
  };

  const handleCloseBookCreationSummary = () => {
    resetAllState();
  };

  const handlePaperChange = (paper: {
    id: string;
    label: string;
    price: number;
  }) => {
    setSelectedPaper(paper);
    setBookCreationSummary((prev) => ({
      ...prev,
      selectedPaper: paper,
    }));
  };

  const handleFinalCreateBook = () => {
    // Reset all state and navigate to home
    resetAllState();
    router.push("/");
  };

  const handleSelectPageTemplate = (template: any) => {
    // Check if we're starting a new book or adding to existing
    const isNewBook = bookCreator.pages.length === 0;

    if (isNewBook) {
      // Create a cover page from the selected cover
      const coverPage: BookPage = {
        id: "cover-1",
        type: "cover",
        title: coverManager.selectedCover?.title || "",
        subtitle: coverManager.selectedCover?.subtitle || "",
        description: coverManager.selectedCover?.description || "",
        imageUrl: coverManager.selectedCover?.imageUrl || "",
        titleStyle: { ...defaultTextStyle, fontSize: 28 },
        subtitleStyle: { ...defaultTextStyle, fontSize: 18 },
        descriptionStyle: { ...defaultTextStyle, fontSize: 14 },
        order: 1,
      };

      // Create a content page from the selected template
      const contentPage: BookPage = {
        id: `page-${Date.now()}`,
        type: "page",
        title: template.title,
        subtitle: template.subtitle,
        description: template.description,
        imageUrl: template.imageUrl,
        titleStyle: { ...defaultTextStyle, fontSize: 24 },
        subtitleStyle: { ...defaultTextStyle, fontSize: 16 },
        descriptionStyle: { ...defaultTextStyle, fontSize: 12 },
        order: 2,
      };

      // Open book creator with both cover and content page
      setBookCreator({
        isOpen: true,
        pages: [coverPage, contentPage],
        currentPage: 1, // Start on the content page
        isPreviewMode: false,
      });
    } else {
      // Add new page to existing book
      const newPage: BookPage = {
        id: `page-${Date.now()}`,
        type: "page",
        title: template.title,
        subtitle: template.subtitle,
        description: template.description,
        imageUrl: template.imageUrl,
        titleStyle: { ...defaultTextStyle, fontSize: 24 },
        subtitleStyle: { ...defaultTextStyle, fontSize: 16 },
        descriptionStyle: { ...defaultTextStyle, fontSize: 12 },
        order: bookCreator.pages.length + 1,
      };

      setBookCreator((prev) => ({
        ...prev,
        isOpen: true,
        pages: [...prev.pages, newPage],
        currentPage: prev.pages.length,
      }));
    }

    // Close page template selector
    setPageTemplateSelector({ isOpen: false });
  };

  // Get used template IDs from current pages
  const getUsedTemplateIds = (): string[] => {
    return bookCreator.pages
      .filter((page) => page.type === "page")
      .map((page) => {
        // Extract template ID from page title or create a mapping
        const templateMapping: { [key: string]: string } = {
          "صفحة نص بسيطة": "text-page-1",
          "صفحة تركز على الصورة": "image-page-1",
          "صفحة محتوى مختلط": "mixed-page-1",
          "صفحة اقتباس": "text-page-2",
          "صفحة معرض": "image-page-2",
          "صفحة قصة": "mixed-page-2",
        };
        return templateMapping[page.title] || page.id;
      });
  };

  // Function to reset all state completely
  const resetAllState = () => {
    setBooks([]);
    setSelectedPaper(PAPER_OPTIONS[0]);

    setBookCreator({
      isOpen: false,
      pages: [],
      currentPage: 0,
      isPreviewMode: false,
    });

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

    setBookCreationSummary({
      isOpen: false,
      selectedCover: null,
      pages: [],
      selectedPaper: PAPER_OPTIONS[0],
      couple: null,
    });

    setPageTemplateSelector({ isOpen: false });
  };

  const handleClosePageTemplateSelector = () => {
    resetAllState();
  };

  const handleReorderPages = (newOrder: BookPage[]) => {
    setBookCreator((prev) => ({
      ...prev,
      pages: newOrder,
    }));
  };

  const handleDeletePage = (pageIndex: number) => {
    const pageToDelete = bookCreator.pages[pageIndex];

    // Don't allow deleting cover page
    if (pageToDelete.type === "cover") return;

    // Don't allow deleting if only cover remains
    if (bookCreator.pages.length <= 1) return;

    const newPages = bookCreator.pages.filter(
      (_, index) => index !== pageIndex
    );

    // Update order numbers
    const updatedPages = newPages.map((page, index) => ({
      ...page,
      order: index + 1,
    }));

    setBookCreator((prev) => ({
      ...prev,
      pages: updatedPages,
      currentPage: Math.min(prev.currentPage, updatedPages.length - 1),
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 to-azalove-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-azalove-500 mx-auto mb-4"></div>
          <p className="text-royal-700">{t("relatedBooks.loading")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-azalove-50">
      <div className="container mx-auto px-4 py-8">
        {/* Saved Couple Display */}
        {latestCouple && <SavedCoupleDisplay couple={latestCouple} />}

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-royal-900 mb-4">
            {t("relatedBooks.title")}
          </h1>
          <UserPreferencesDisplay userAnswers={userAnswers} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onBookSelect={handleBookSelect}
            />
          ))}
        </div>

        {books.length === 0 && (
          <div className="text-center py-12">
            <p className="text-royal-700 text-lg">
              {t("relatedBooks.noBooksFound")}
            </p>
          </div>
        )}
      </div>

      {/* Cover Manager Dialog */}
      <CoverManagerDialog
        coverManager={coverManager}
        onClose={handleCloseCoverManager}
        onAddNewCover={handleAddNewCover}
        onEditCustomCover={handleEditCustomCover}
        onDeleteCustomCover={handleDeleteCustomCover}
        onUpdateCustomCover={handleUpdateCustomCover}
        onConfirmDeleteCover={confirmDeleteCover}
        onCancelDeleteCover={cancelDeleteCover}
        onSelectCoverTemplate={handleSelectCoverTemplate}
        onCloseCoverTemplateSelector={handleCloseCoverTemplateSelector}
        coverTemplates={COVER_TEMPLATES}
      />

      {/* Book Creator Dialog */}
      <BookCreatorDialog
        bookCreator={bookCreator}
        onClose={resetAllState}
        onAddPage={handleAddPage}
        onEditPage={handleEditPage}
        onUpdatePage={handleUpdatePage}
        onTogglePreview={handleTogglePreview}
        onCreateBook={handleCreateBook}
        onReorderPages={handleReorderPages}
        onDeletePage={handleDeletePage}
      />

      {/* Book Creation Summary Dialog */}
      <BookCreationSummaryDialog
        isOpen={bookCreationSummary.isOpen}
        selectedCover={bookCreationSummary.selectedCover}
        pages={bookCreationSummary.pages}
        selectedPaper={bookCreationSummary.selectedPaper}
        couple={bookCreationSummary.couple}
        onClose={handleCloseBookCreationSummary}
        onCreateBook={handleFinalCreateBook}
        onPaperChange={handlePaperChange}
      />

      {/* Page Template Selector Dialog */}
      <PageTemplateSelectorDialog
        isOpen={pageTemplateSelector.isOpen}
        onClose={handleClosePageTemplateSelector}
        onSelectTemplate={handleSelectPageTemplate}
        usedTemplateIds={getUsedTemplateIds()}
      />
    </div>
  );
}
