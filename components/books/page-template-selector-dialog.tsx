"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { API_ENDPOINTS_FROM_NEXT } from "@/config/api";
import { useSavedCouples } from "@/hooks/use-saved-couples";
import { filterSvgByCharacters } from "@/utils/character-color-utils";
import { Loader2, Plus } from "lucide-react";
import { useEffect, useState } from "react";

// Helper function to convert API data to PageTemplate format
const convertApiDataToPageTemplate = (
  item: any,
  characterSelection?: any[]
): PageTemplate => {
  // Clean up title - remove "test" and use proper title
  const cleanTitle = item.title === "test" ? "صفحة محتوى" : item.title;

  // Filter SVG based on character selection if provided
  let filteredSvg = item.svg;
  if (characterSelection && characterSelection.length > 0) {
    filteredSvg = filterSvgByCharacters(item.svg, characterSelection);
  }

  return {
    id: item.id,
    title: cleanTitle,
    subtitle: "صفحة محتوى",
    description: "صفحة محتوى قابلة للتخصيص",
    imageUrl: `data:image/svg+xml;base64,${btoa(filteredSvg)}`, // Convert filtered SVG to data URL
    type: "mixed" as const,
    price: Number(item.price) || 0,
  };
};

interface PageTemplate {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  type: "text" | "image" | "mixed";
  price?: number;
}

interface PageTemplateSelectorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: PageTemplate) => void;
  usedTemplateIds: string[]; // Add this to track used templates
}

// Pagination interface
interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export default function PageTemplateSelectorDialog({
  isOpen,
  onClose,
  onSelectTemplate,
  usedTemplateIds,
}: PageTemplateSelectorDialogProps) {
  const [templates, setTemplates] = useState<PageTemplate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    limit: 20,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const { savedCouples } = useSavedCouples();

  // Fetch page templates when dialog opens
  useEffect(() => {
    if (isOpen) {
      fetchPageTemplates();
    }
  }, [isOpen]);

  const fetchPageTemplates = async (page: number = 1) => {
    try {
      setLoading(true);
      setError(null);

      const latestCouple = savedCouples[savedCouples.length - 1];
      if (
        !latestCouple?.characterSelection ||
        !latestCouple?.answers?.selectedAnswers
      ) {
        setError("لا توجد بيانات شخصية محفوظة");
        return;
      }

      const response = await fetch(API_ENDPOINTS_FROM_NEXT.BOOKS_PAGES, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: latestCouple.answers.selectedAnswers,
          characterSelection: latestCouple.characterSelection,
          page: page,
          limit: pagination.limit,
        }),
      });

      if (!response.ok) {
        throw new Error("فشل في جلب قوالب الصفحات");
      }

      const data = await response.json();
      if (data.statusCode === 201) {
        // Convert API data to PageTemplate format using the helper function
        const convertedTemplates: PageTemplate[] = data.data.data.map(
          (item: any) =>
            convertApiDataToPageTemplate(item, latestCouple.characterSelection)
        );
        setTemplates(convertedTemplates);

        // Update pagination info
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
      } else {
        setError("لا توجد قوالب صفحات متاحة");
      }
    } catch (error) {
      console.error("Error fetching page templates:", error);
      setError("حدث خطأ في جلب قوالب الصفحات");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = async (page: number) => {
    if (page < 1 || page > pagination.totalPages) return;
    await fetchPageTemplates(page);
  };

  const handleRetry = () => {
    fetchPageTemplates(1);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        preventOutsideClose
        className="sm:max-w-6xl w-[95vw] max-h-[95vh] overflow-y-auto bg-gradient-to-br from-cream-50 to-azalove-50 border-2 border-azalove-200 shadow-2xl"
      >
        <DialogHeader className=" bg-amaranth-900 text-white rounded-t-lg -m-6 mb-6 p-6">
          <DialogTitle className="flex items-center gap-2 text-white">
            <Plus className="w-5 h-5 text-azalove-300" />
            اختر قالب صفحة
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center">
            <p className="text-royal-700 text-lg mb-2">اختر قالب صفحة لكتابك</p>
            <p className="text-royal-600 text-sm">
              كل قالب يقدم تخطيطاً مختلفاً لمحتواك
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-royal-600" />
              <span className="mr-2 text-royal-600">
                جاري تحميل قوالب الصفحات...
              </span>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 text-lg mb-4">{error}</p>
              <Button onClick={handleRetry} variant="outline">
                إعادة المحاولة
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {templates.map((template) => {
                const isUsed = usedTemplateIds.includes(template.id);

                return (
                  <div
                    key={template.id}
                    className={`group relative bg-white rounded-lg shadow-sm transition-all duration-300 border-2 ${
                      isUsed
                        ? "border-gray-300 opacity-50 cursor-not-allowed"
                        : "hover:shadow-lg cursor-pointer transform hover:scale-105 border-azalove-100 hover:border-azalove-300"
                    }`}
                    onClick={() => !isUsed && onSelectTemplate(template)}
                  >
                    <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden relative">
                      <div
                        className="w-full h-full transition-transform duration-300 group-hover:scale-110"
                        dangerouslySetInnerHTML={{
                          __html: atob(template.imageUrl.split(",")[1]),
                        }}
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
                      <div className="absolute inset-0 bg-royal-500/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="text-center text-white">
                          <Plus className="w-8 h-8 mx-auto mb-2" />
                          <p className="text-sm font-medium">اختر هذا القالب</p>
                        </div>
                      </div>

                      {/* Type Badge */}
                      <div className="absolute top-2 left-2 bg-royal-500 text-white text-xs px-2 py-1 rounded-full">
                        {template.type}
                      </div>

                      {/* Used Badge */}
                      {isUsed && (
                        <div className="absolute top-2 right-2 bg-gray-500 text-white text-xs px-2 py-1 rounded-full">
                          مستخدم
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
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && !loading && (
            <div className="flex justify-center items-center mt-8 space-x-2">
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
          {pagination.totalCount > 0 && !loading && (
            <div className="text-center mt-4 text-royal-600">
              <p className="text-sm">
                عرض {(pagination.currentPage - 1) * pagination.limit + 1} -{" "}
                {Math.min(
                  pagination.currentPage * pagination.limit,
                  pagination.totalCount
                )}{" "}
                من {pagination.totalCount} قالب
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-center pt-4">
            <Button
              onClick={onClose}
              variant="outline"
              className="border-azalove-300 text-azalove-700 hover:bg-azalove-50"
            >
              إلغاء
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
