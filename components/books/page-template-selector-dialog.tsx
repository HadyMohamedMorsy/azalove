"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

interface PageTemplate {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  type: "text" | "image" | "mixed";
}

interface PageTemplateSelectorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: PageTemplate) => void;
  usedTemplateIds: string[]; // Add this to track used templates
}

// Sample page templates - you can expand this
const PAGE_TEMPLATES: PageTemplate[] = [
  {
    id: "text-page-1",
    title: "صفحة نص بسيطة",
    subtitle: "تخطيط نص نظيف",
    description: "مثالية للقصص والسرد",
    imageUrl: "/media/10-150x200.jpg",
    type: "text",
  },
  {
    id: "image-page-1",
    title: "صفحة تركز على الصورة",
    subtitle: "صورة مع تعليق",
    description: "رائعة لقصص الصور والذكريات",
    imageUrl: "/media/22-200x327.jpg",
    type: "image",
  },
  {
    id: "mixed-page-1",
    title: "صفحة محتوى مختلط",
    subtitle: "مزيج من النص والصورة",
    description: "تخطيط متعدد الاستخدامات لأي محتوى",
    imageUrl: "/media/contact.jpg",
    type: "mixed",
  },
  {
    id: "text-page-2",
    title: "صفحة اقتباس",
    subtitle: "نمط اقتباس مميز",
    description: "مثالية للاقتباسات والعبارات الهادفة",
    imageUrl: "/media/cover-bog.jpg",
    type: "text",
  },
  {
    id: "image-page-2",
    title: "صفحة معرض",
    subtitle: "تخطيط صور متعددة",
    description: "عرض صور متعددة أو ذكريات",
    imageUrl: "/media/image-blog.jpg",
    type: "image",
  },
  {
    id: "mixed-page-2",
    title: "صفحة قصة",
    subtitle: "سرد مع رسوم توضيحية",
    description: "احكي قصتك مع العناصر البصرية",
    imageUrl: "/media/section-hero.jpg",
    type: "mixed",
  },
];

export default function PageTemplateSelectorDialog({
  isOpen,
  onClose,
  onSelectTemplate,
  usedTemplateIds,
}: PageTemplateSelectorDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        preventOutsideClose
        className="sm:max-w-6xl w-[95vw] max-h-[95vh] overflow-y-auto bg-gradient-to-br from-cream-50 to-azalove-50 border-2 border-azalove-200 shadow-2xl"
      >
        <DialogHeader className="bg-gradient-to-r from-royal-600 to-amaranth-600 text-white rounded-t-lg -m-6 mb-6 p-6">
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

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {PAGE_TEMPLATES.map((template) => {
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
                    <div className="absolute inset-0 bg-azalove-500/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-center text-white">
                        <Plus className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm font-medium">اختر هذا القالب</p>
                      </div>
                    </div>

                    {/* Type Badge */}
                    <div className="absolute top-2 left-2 bg-azalove-500 text-white text-xs px-2 py-1 rounded-full">
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
