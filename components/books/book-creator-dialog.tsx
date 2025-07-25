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
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Edit3,
  Eye,
  Grid3X3,
  GripVertical,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { BookPage, TextStyle } from "./data/books-data";
import PagePreview from "./page-preview";
import TextStyleControls from "./text-style-controls";

interface BookCreator {
  isOpen: boolean;
  pages: BookPage[];
  currentPage: number;
  isPreviewMode: boolean;
}

interface BookCreatorDialogProps {
  bookCreator: BookCreator;
  onClose: () => void;
  onAddPage: () => void;
  onEditPage: (pageIndex: number) => void;
  onUpdatePage: (pageIndex: number, updates: Partial<BookPage>) => void;
  onTogglePreview: () => void;
  onCreateBook: () => void;
  onReorderPages: (newOrder: BookPage[]) => void;
  onDeletePage: (pageIndex: number) => void;
}

export default function BookCreatorDialog({
  bookCreator,
  onClose,
  onAddPage,
  onEditPage,
  onUpdatePage,
  onTogglePreview,
  onCreateBook,
  onReorderPages,
  onDeletePage,
}: BookCreatorDialogProps) {
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

    onUpdatePage(bookCreator.currentPage, updatedPage);
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData("text/plain"));

    // Don't allow reordering if dragging cover or dropping on cover
    const coverIndex = bookCreator.pages.findIndex(
      (page) => page.type === "cover"
    );
    if (dragIndex === coverIndex || dropIndex === coverIndex) return;

    // Don't allow reordering cover
    if (bookCreator.pages[dragIndex].type === "cover") return;

    const newPages = [...bookCreator.pages];
    const draggedPage = newPages[dragIndex];

    // Remove the dragged page
    newPages.splice(dragIndex, 1);

    // Insert at new position
    newPages.splice(dropIndex, 0, draggedPage);

    // Update order numbers
    const updatedPages = newPages.map((page, index) => ({
      ...page,
      order: index + 1,
    }));

    onReorderPages(updatedPages);
  };

  return (
    <Dialog open={bookCreator.isOpen} onOpenChange={onClose}>
      <DialogContent
        preventOutsideClose
        className="sm:max-w-7xl w-[95vw] max-h-[95vh] overflow-y-auto bg-gradient-to-br from-cream-50 to-azalove-50 border-2 border-azalove-200 shadow-2xl"
      >
        <DialogHeader className="bg-gradient-to-r from-royal-600 to-amaranth-600 text-white rounded-t-lg -m-6 mb-6 p-6">
          <DialogTitle className="flex items-center gap-2 text-white">
            <Edit3 className="w-5 h-5 text-azalove-300" />
            إنشاء كتابك
          </DialogTitle>
        </DialogHeader>

        {bookCreator.isPreviewMode ? (
          // Preview Mode
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-royal-800">
                معاينة الكتاب
              </h3>
              <Button
                onClick={onTogglePreview}
                variant="outline"
                className="border-azalove-300 text-azalove-700 hover:bg-azalove-50"
              >
                <Grid3X3 className="w-4 h-4 mr-2" />
                وضع التحرير
              </Button>
            </div>

            <div className="bg-white p-4 rounded-lg border border-azalove-200">
              <p className="text-sm text-royal-600 mb-4">
                💡 <strong>نصيحة:</strong> اسحب وأفلت الصفحات لإعادة ترتيبها (لا
                يمكن نقل الغلاف)
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {bookCreator.pages.map((page, index) => (
                <div
                  key={page.id}
                  className="space-y-2"
                  draggable={page.type !== "cover"}
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                >
                  <div className="text-center text-sm text-royal-700 font-medium flex items-center justify-center gap-2">
                    {page.type !== "cover" && (
                      <GripVertical className="w-4 h-4 text-azalove-500 cursor-grab" />
                    )}
                    {page.type === "cover" ? "الغلاف" : `الصفحة ${index}`}
                    {page.type !== "cover" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeletePage(index);
                        }}
                        className="ml-2 p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                        title="حذف الصفحة"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                  <div
                    className={`relative ${page.type !== "cover" ? "cursor-grab hover:shadow-lg transition-shadow" : ""}`}
                  >
                    <PagePreview page={page} />
                    {page.type !== "cover" && (
                      <div className="absolute inset-0 bg-azalove-500/10 opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                        <div className="bg-white/90 rounded-lg px-2 py-1 text-xs text-royal-700">
                          اسحب لإعادة الترتيب
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Edit Mode
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Page Preview - Sticky */}
            <div className="space-y-4 xl:sticky xl:top-6 xl:self-start">
              <h3 className="font-semibold text-lg text-royal-800">
                معاينة الصفحة
              </h3>
              {bookCreator.pages[bookCreator.currentPage] && (
                <PagePreview
                  page={bookCreator.pages[bookCreator.currentPage]}
                />
              )}
            </div>

            {/* Editor Controls */}
            <div className="xl:col-span-2 space-y-6">
              {/* Navigation */}
              <div className="flex justify-between items-center bg-white p-4 rounded-lg border border-azalove-200 shadow-sm">
                <Button
                  onClick={() =>
                    onEditPage(Math.max(0, bookCreator.currentPage - 1))
                  }
                  disabled={bookCreator.currentPage === 0}
                  variant="outline"
                  size="sm"
                  className="border-azalove-300 text-azalove-700 hover:bg-azalove-50"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  السابق
                </Button>

                <div className="text-center">
                  <p className="text-sm text-royal-700">
                    الصفحة {bookCreator.currentPage + 1} من{" "}
                    {bookCreator.pages.length}
                  </p>
                  <p className="text-xs text-royal-600">
                    {bookCreator.pages[bookCreator.currentPage]?.type ===
                    "cover"
                      ? "الغلاف"
                      : "الصفحة"}
                  </p>
                </div>

                <Button
                  onClick={() =>
                    onEditPage(
                      Math.min(
                        bookCreator.pages.length - 1,
                        bookCreator.currentPage + 1
                      )
                    )
                  }
                  disabled={
                    bookCreator.currentPage === bookCreator.pages.length - 1
                  }
                  variant="outline"
                  size="sm"
                  className="border-azalove-300 text-azalove-700 hover:bg-azalove-50"
                >
                  التالي
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

              {/* Page Content Editor */}
              <div className="space-y-4 bg-white p-4 rounded-lg border border-azalove-200 shadow-sm">
                <div>
                  <Label className="text-royal-700 font-medium">
                    عنوان الصفحة
                  </Label>
                  <Input
                    value={
                      bookCreator.pages[bookCreator.currentPage]?.title || ""
                    }
                    onChange={(e) =>
                      onUpdatePage(bookCreator.currentPage, {
                        title: e.target.value,
                      })
                    }
                    className="mt-1 border-azalove-200 focus:border-azalove-500 focus:ring-azalove-500"
                  />
                </div>

                <div>
                  <Label className="text-royal-700 font-medium">
                    العنوان الفرعي
                  </Label>
                  <Input
                    value={
                      bookCreator.pages[bookCreator.currentPage]?.subtitle || ""
                    }
                    onChange={(e) =>
                      onUpdatePage(bookCreator.currentPage, {
                        subtitle: e.target.value,
                      })
                    }
                    className="mt-1 border-azalove-200 focus:border-azalove-500 focus:ring-azalove-500"
                  />
                </div>

                <div>
                  <Label className="text-royal-700 font-medium">الوصف</Label>
                  <Textarea
                    value={
                      bookCreator.pages[bookCreator.currentPage]?.description ||
                      ""
                    }
                    onChange={(e) =>
                      onUpdatePage(bookCreator.currentPage, {
                        description: e.target.value,
                      })
                    }
                    className="mt-1 min-h-[100px] border-azalove-200 focus:border-azalove-500 focus:ring-azalove-500"
                  />
                </div>
              </div>

              {/* Text Style Controls - Sticky and Scrollable */}
              <div className="bg-white p-4 rounded-lg border border-azalove-200 shadow-sm max-h-[400px] overflow-y-auto">
                <h4 className="font-semibold text-royal-800 mb-4 sticky top-0 bg-white py-2 border-b border-azalove-200">
                  تنسيق النص
                </h4>
                <div className="space-y-4">
                  <TextStyleControls
                    textType="title"
                    label="العنوان"
                    style={
                      bookCreator.pages[bookCreator.currentPage]
                        ?.titleStyle || {
                        color: "#E6A238",
                        fontFamily: "Arial",
                        fontSize: 24,
                        textAlign: "center",
                      }
                    }
                    onStyleChange={(property, value) =>
                      updateTextStyle("title", property, value)
                    }
                  />
                  <TextStyleControls
                    textType="subtitle"
                    label="العنوان الفرعي"
                    style={
                      bookCreator.pages[bookCreator.currentPage]
                        ?.subtitleStyle || {
                        color: "#E6A238",
                        fontFamily: "Arial",
                        fontSize: 18,
                        textAlign: "center",
                      }
                    }
                    onStyleChange={(property, value) =>
                      updateTextStyle("subtitle", property, value)
                    }
                  />
                  <TextStyleControls
                    textType="description"
                    label="الوصف"
                    style={
                      bookCreator.pages[bookCreator.currentPage]
                        ?.descriptionStyle || {
                        color: "#E6A238",
                        fontFamily: "Arial",
                        fontSize: 14,
                        textAlign: "center",
                      }
                    }
                    onStyleChange={(property, value) =>
                      updateTextStyle("description", property, value)
                    }
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={onAddPage}
                  className="flex-1 bg-gradient-to-r from-amaranth-500 to-amaranth-600 hover:from-amaranth-600 hover:to-amaranth-700 text-white border-0 shadow-lg"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  إضافة صفحة
                </Button>
                <Button
                  onClick={onTogglePreview}
                  variant="outline"
                  className="flex-1 border-azalove-300 text-azalove-700 hover:bg-azalove-50"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  معاينة الكتاب
                </Button>
                <Button
                  onClick={onCreateBook}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white border-0 shadow-lg"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  إنشاء الكتاب
                </Button>
                <Button
                  onClick={onClose}
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
  );
}
