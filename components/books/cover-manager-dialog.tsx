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
import { Edit3, Plus, X } from "lucide-react";
import TextStyleControls from "./text-style-controls";

interface TextStyle {
  color: string;
  fontFamily: string;
  fontSize: number;
  textAlign: "left" | "center" | "right";
}

interface Book {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  price: number;
  description: string;
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

interface CoverManagerDialogProps {
  coverManager: CoverManager;
  onClose: () => void;
  onAddNewCover: () => void;
  onEditCustomCover: (cover: UserCustomCover) => void;
  onDeleteCustomCover: (coverId: string) => void;
  onUpdateCustomCover: (
    coverId: string,
    updates: Partial<UserCustomCover>
  ) => void;
  onConfirmDeleteCover: () => void;
  onCancelDeleteCover: () => void;
  onSelectCoverTemplate: (template: any) => void;
  onCloseCoverTemplateSelector: () => void;
  coverTemplates: any[];
}

export default function CoverManagerDialog({
  coverManager,
  onClose,
  onAddNewCover,
  onEditCustomCover,
  onDeleteCustomCover,
  onUpdateCustomCover,
  onConfirmDeleteCover,
  onCancelDeleteCover,
  onSelectCoverTemplate,
  onCloseCoverTemplateSelector,
  coverTemplates,
}: CoverManagerDialogProps) {
  const handleUpdateCustomCoverTextStyle = (
    textType: "title" | "subtitle" | "description",
    property: keyof TextStyle,
    value: any
  ) => {
    if (!coverManager.currentEditingCover) return;

    onUpdateCustomCover(coverManager.currentEditingCover.id, {
      [`${textType}Style`]: {
        ...coverManager.currentEditingCover[`${textType}Style`],
        [property]: value,
      },
    });
  };

  return (
    <>
      {/* Main Cover Manager Dialog */}
      <Dialog open={coverManager.isOpen} onOpenChange={onClose}>
        <DialogContent
          preventOutsideClose
          className="sm:max-w-7xl w-[95vw] max-h-[95vh] overflow-y-auto bg-gradient-to-br from-cream-50 to-azalove-50 border-2 border-azalove-200 shadow-2xl"
        >
          <DialogHeader className="bg-gradient-to-r from-royal-600 to-amaranth-600 text-white rounded-t-lg -m-6 mb-6 p-6">
            <DialogTitle className="flex items-center gap-2 text-white">
              <Edit3 className="w-5 h-5 text-azalove-300" />
              مدير الغلاف - {coverManager.selectedCover?.title}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Selected Cover Preview */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-royal-800">
                الغلاف المختار
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

              {/* Add Page Button */}
              <div className="space-y-2">
                <Button
                  onClick={onAddNewCover}
                  className="w-full border-0 shadow-lg bg-gradient-to-r from-amaranth-500 to-amaranth-600 hover:from-amaranth-600 hover:to-amaranth-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  إضافة صفحة
                </Button>
                <p className="text-xs text-gray-500 text-center">
                  ابدأ بإنشاء محتوى كتابك
                </p>
              </div>
            </div>

            {/* User's Custom Covers */}
            <div className="xl:col-span-2 space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-royal-800">
                  أغلفتك المخصصة
                </h3>

                {coverManager.userCovers.length === 0 ? (
                  <div className="text-center py-8 bg-white rounded-lg border border-azalove-200">
                    <p className="text-royal-600">
                      لا توجد أغلفة مخصصة بعد. انقر على "إضافة صفحة" لإنشاء
                      واحدة!
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {coverManager.userCovers.map((cover) => (
                      <div
                        key={cover.id}
                        className="group relative bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 border border-azalove-100 hover:border-azalove-300"
                        onClick={() => onEditCustomCover(cover)}
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
                              <p className="text-sm font-medium">
                                تحرير الغلاف
                              </p>
                            </div>
                          </div>

                          {/* Delete Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteCustomCover(cover.id);
                            }}
                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            title="حذف الغلاف"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>

                        {cover.isNewlyAdded && (
                          <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                            جديد
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
                      ? "تحرير الغلاف الجديد"
                      : "تحرير الغلاف المخصص"}
                  </h3>

                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {/* Cover Preview */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-royal-700">المعاينة</h4>
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
                          عنوان الكتاب
                        </Label>
                        <Input
                          id="customTitle"
                          value={coverManager.currentEditingCover.title}
                          onChange={(e) =>
                            onUpdateCustomCover(
                              coverManager.currentEditingCover!.id,
                              {
                                title: e.target.value,
                              }
                            )
                          }
                          placeholder="أدخل العنوان المخصص..."
                          className="mt-1 border-azalove-200 focus:border-azalove-500 focus:ring-azalove-500"
                        />
                      </div>

                      <div>
                        <Label
                          htmlFor="customSubtitle"
                          className="text-royal-700 font-medium"
                        >
                          العنوان الفرعي
                        </Label>
                        <Input
                          id="customSubtitle"
                          value={coverManager.currentEditingCover.subtitle}
                          onChange={(e) =>
                            onUpdateCustomCover(
                              coverManager.currentEditingCover!.id,
                              {
                                subtitle: e.target.value,
                              }
                            )
                          }
                          placeholder="أدخل العنوان الفرعي المخصص..."
                          className="mt-1 border-azalove-200 focus:border-azalove-500 focus:ring-azalove-500"
                        />
                      </div>

                      <div>
                        <Label
                          htmlFor="customDescription"
                          className="text-royal-700 font-medium"
                        >
                          الوصف
                        </Label>
                        <Textarea
                          id="customDescription"
                          value={coverManager.currentEditingCover.description}
                          onChange={(e) =>
                            onUpdateCustomCover(
                              coverManager.currentEditingCover!.id,
                              {
                                description: e.target.value,
                              }
                            )
                          }
                          placeholder="أدخل الوصف المخصص..."
                          className="mt-1 min-h-[100px] border-azalove-200 focus:border-azalove-500 focus:ring-azalove-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Text Style Controls */}
                  <div className="space-y-4">
                    <TextStyleControls
                      textType="title"
                      label="العنوان"
                      style={coverManager.currentEditingCover.titleStyle}
                      onStyleChange={(property, value) =>
                        handleUpdateCustomCoverTextStyle(
                          "title",
                          property,
                          value
                        )
                      }
                    />
                    <TextStyleControls
                      textType="subtitle"
                      label="العنوان الفرعي"
                      style={coverManager.currentEditingCover.subtitleStyle}
                      onStyleChange={(property, value) =>
                        handleUpdateCustomCoverTextStyle(
                          "subtitle",
                          property,
                          value
                        )
                      }
                    />
                    <TextStyleControls
                      textType="description"
                      label="الوصف"
                      style={coverManager.currentEditingCover.descriptionStyle}
                      onStyleChange={(property, value) =>
                        handleUpdateCustomCoverTextStyle(
                          "description",
                          property,
                          value
                        )
                      }
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={() =>
                        onUpdateCustomCover(
                          coverManager.currentEditingCover!.id,
                          {}
                        )
                      }
                      className="flex-1 bg-gradient-to-r from-azalove-500 to-amaranth-600 hover:from-azalove-600 hover:to-azalove-700 text-white border-0 shadow-lg"
                    >
                      انتهى التحرير
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
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={coverManager.deleteConfirmation.isOpen}
        onOpenChange={onCancelDeleteCover}
      >
        <DialogContent
          preventOutsideClose
          className="sm:max-w-md bg-gradient-to-br from-cream-50 to-azalove-50 border-2 border-azalove-200 shadow-2xl"
        >
          <DialogHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-t-lg -m-6 mb-6 p-6">
            <DialogTitle className="flex items-center gap-2 text-white">
              <X className="w-5 h-5 text-red-200" />
              حذف الغلاف
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <p className="text-royal-700">
              هل أنت متأكد من حذف الغلاف "
              {coverManager.deleteConfirmation.coverTitle}"?
            </p>
            <p className="text-sm text-royal-600">
              هذا الإجراء لا يمكن التراجع عنه.
            </p>

            <div className="flex gap-3 pt-4">
              <Button
                onClick={onConfirmDeleteCover}
                className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0 shadow-lg"
              >
                حذف الغلاف
              </Button>
              <Button
                onClick={onCancelDeleteCover}
                variant="outline"
                className="flex-1 border-azalove-300 text-azalove-700 hover:bg-azalove-50"
              >
                إلغاء
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Cover Template Selector Dialog */}
      <Dialog
        open={coverManager.showCoverTemplateSelector}
        onOpenChange={onCloseCoverTemplateSelector}
      >
        <DialogContent
          preventOutsideClose
          className="sm:max-w-6xl w-[95vw] max-h-[95vh] overflow-y-auto bg-gradient-to-br from-cream-50 to-azalove-50 border-2 border-azalove-200 shadow-2xl"
        >
          <DialogHeader className="bg-gradient-to-r from-royal-600 to-amaranth-600 text-white rounded-t-lg -m-6 mb-6 p-6">
            <DialogTitle className="flex items-center gap-2 text-white">
              <Plus className="w-5 h-5 text-azalove-300" />
              اختر قالب غلاف
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="text-center">
              <p className="text-royal-700 text-lg mb-2">
                اختر قالب غلاف مختلف لكتابك
              </p>
              <p className="text-royal-600 text-sm">
                كل قالب يقدم نمطًا وأسلوبًا فريدًا لروايتك
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {coverTemplates.map((template) => {
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
                    onClick={() => !isUsed && onSelectCoverTemplate(template)}
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
                        <div className="absolute inset-0 bg-royal-500/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="text-center text-white">
                            <Plus className="w-8 h-8 mx-auto mb-2" />
                            <p className="text-sm font-medium">
                              اختر هذا الغلاف
                            </p>
                          </div>
                        </div>
                      )}

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
                onClick={onCloseCoverTemplateSelector}
                variant="outline"
                className="border-azalove-300 text-azalove-700 hover:bg-azalove-50"
              >
                إلغاء
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
