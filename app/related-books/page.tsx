"use client";

import BookCard from "@/components/books/book-card";
import BookCreationSummaryDialog from "@/components/books/book-creation-summary-dialog";
import BookCreatorDialog from "@/components/books/book-creator-dialog";
import CoverManagerDialog from "@/components/books/cover-manager-dialog";
import {
  Book,
  BookPage,
  convertDynamicBookToBook,
  defaultTextStyle,
  PAPER_OPTIONS,
  UserCustomCover,
} from "@/components/books/data/books-data";
import PageTemplateSelectorDialog from "@/components/books/page-template-selector-dialog";
import SavedCoupleDisplay from "@/components/books/saved-couple-display";
import { SavedCouple, useSavedCouples } from "@/hooks/use-saved-couples";
import { useTranslation } from "@/hooks/use-translation";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

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

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export default function RelatedBooksPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { savedCouples } = useSavedCouples();
  const { t } = useTranslation();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    limit: 10,
    hasNextPage: false,
    hasPrevPage: false,
  });
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

  const isFetchingRef = useRef(false);

  useEffect(() => {
    // Prevent multiple simultaneous requests
    if (isFetchingRef.current) {
      return;
    }

    let isMounted = true;

    const fetchBooks = async () => {
      try {
        isFetchingRef.current = true;
        setLoading(true);

        if (
          latestCouple?.characterSelection &&
          latestCouple?.answers?.selectedAnswers
        ) {
          const response = await fetch("/api/books/finder", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              answers: latestCouple.answers.selectedAnswers,
              characterSelection: latestCouple.characterSelection,
            }),
          });

          if (isMounted) {
            if (response.ok) {
              const data = await response.json();
              const dynamicBooks = data.data.data || [];
              const convertedBooks = dynamicBooks.map((dynamicBook: any) =>
                convertDynamicBookToBook(
                  dynamicBook,
                  latestCouple?.characterSelection
                )
              );
              setBooks(convertedBooks);
              console.log(data.data.pagination);
              // Handle pagination
              if (data.data.pagination) {
                setPagination({
                  currentPage: data.data.pagination.currentPage,
                  totalPages: data.data.pagination.totalPages,
                  totalCount: data.data.pagination.totalCount,
                  limit: data.data.pagination.limit,
                  hasNextPage: data.data.pagination.hasNextPage,
                  hasPrevPage: data.data.pagination.hasPrevPage,
                });
              }
            }
          }
        }
      } catch (error) {
      } finally {
        if (isMounted) {
          setLoading(false);
        }
        isFetchingRef.current = false;
      }
    };

    fetchBooks();

    // Cleanup function to prevent state updates if component unmounts
    return () => {
      isMounted = false;
    };
  }, [latestCouple]);

  const handleBookSelect = (book: Book) => {
    setCoverManager((prev) => ({
      ...prev,
      isOpen: true,
      selectedCover: book,
      isAddingNewCover: false,
      currentEditingCover: null,
    }));
  };

  // Pagination handlers
  const handlePageChange = async (page: number) => {
    if (page < 1 || page > pagination.totalPages) return;

    try {
      setLoading(true);

      if (
        latestCouple?.characterSelection &&
        latestCouple?.answers?.selectedAnswers
      ) {
        const response = await fetch("/api/books/finder", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            answers: latestCouple.answers.selectedAnswers,
            characterSelection: latestCouple.characterSelection,
            page: page,
            limit: pagination.limit,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const dynamicBooks = data.data.data || [];
          const convertedBooks = dynamicBooks.map((dynamicBook: any) =>
            convertDynamicBookToBook(
              dynamicBook,
              latestCouple?.characterSelection
            )
          );
          setBooks(convertedBooks);

          // Update pagination
          if (data.data.pagination) {
            setPagination({
              currentPage: data.data.pagination.currentPage,
              totalPages: data.data.pagination.totalPages,
              totalCount: data.data.pagination.totalCount,
              limit: data.data.pagination.limit,
              hasNextPage: data.data.pagination.hasNextPage,
              hasPrevPage: data.data.pagination.hasPrevPage,
            });
          }
        }
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
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
        price: coverManager.selectedCover?.price || 0,
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
        price: template.price || 0,
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
        price: template.price || 0,
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
    // Don't reset books - keep them for display
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

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 space-x-2">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={!pagination.hasPrevPage}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                pagination.hasPrevPage
                  ? "bg-azalove-500 text-white hover:bg-azalove-600"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              السابق
            </button>

            {/* Page Numbers */}
            <div className="flex space-x-1">
              {Array.from(
                { length: pagination.totalPages },
                (_, i) => i + 1
              ).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                    page === pagination.currentPage
                      ? "bg-royal-500 text-white"
                      : "bg-white text-royal-700 hover:bg-royal-50 border border-royal-200"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={!pagination.hasNextPage}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                pagination.hasNextPage
                  ? "bg-azalove-500 text-white hover:bg-azalove-600"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              التالي
            </button>
          </div>
        )}

        {/* Pagination Info */}
        {pagination.totalCount > 0 && (
          <div className="text-center mt-4 text-royal-600">
            <p className="text-sm">
              عرض {(pagination.currentPage - 1) * pagination.limit + 1} -{" "}
              {Math.min(
                pagination.currentPage * pagination.limit,
                pagination.totalCount
              )}{" "}
              من {pagination.totalCount} كتاب
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
        coverTemplates={[]}
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
