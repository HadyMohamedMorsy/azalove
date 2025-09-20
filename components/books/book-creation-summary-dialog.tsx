"use client";

import CouplePreview from "@/components/avatars/couple-preview";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGeneralSettings } from "@/contexts/general-settings-context";
import { useCreateCustomOrder } from "@/hooks/use-create-custom-order";
import { useCurrency } from "@/hooks/use-currency";
import { PaperType, usePaperTypes } from "@/hooks/use-paper-types";
import { PaymentMethod, usePaymentMethods } from "@/hooks/use-payment-methods";
import { SavedCouple } from "@/hooks/use-saved-couples";
import { CouponService } from "@/lib/coupon-service";
import { AppliedCoupon, ValidateCouponDto } from "@/types";
import { blobToFile, svgToImage } from "@/utils/svg-to-image";
import {
  CheckCircle,
  CreditCard,
  DollarSign,
  Heart,
  Tag,
  X,
} from "lucide-react";
import { useState } from "react";
import { Book, BookPage } from "./data/books-data";
import PagePreview from "./page-preview";

interface BookCreationSummaryDialogProps {
  isOpen: boolean;
  selectedCover: Book | null;
  pages: BookPage[];
  selectedPaper: PaperType | null;
  couple: SavedCouple | null;
  onClose: () => void;
  onCreateBook: () => void;
  onPaperChange?: (paper: PaperType) => void;
}

export default function BookCreationSummaryDialog({
  isOpen,
  selectedCover,
  pages,
  selectedPaper,
  couple,
  onClose,
  onCreateBook,
  onPaperChange,
}: BookCreationSummaryDialogProps) {
  const { formatCurrency } = useCurrency();
  const { settings } = useGeneralSettings();
  const { paperTypes, loading: paperTypesLoading } = usePaperTypes();
  const {
    createCustomOrder,
    loading: isCreatingOrder,
    error: createOrderError,
  } = useCreateCustomOrder();

  // Payment methods state
  const {
    paymentMethods: paymentMethodsData,
    loading: paymentMethodsLoading,
    error: paymentMethodsError,
  } = usePaymentMethods();

  // Coupon state
  const [promoCode, setPromoCode] = useState("");
  const [promoError, setPromoError] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(
    null
  );
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod | null>(null);

  // Calculate prices - ensure all are numbers
  const coverPrice = Number(selectedCover?.price) || 0;
  const pagesPrice = pages
    .filter((page) => page.type === "page")
    .reduce((sum, page) => sum + (Number(page.price) || 0), 0);
  const paperPrice = Number(selectedPaper?.value) || 0;
  const subtotal = coverPrice + pagesPrice + paperPrice;

  // Calculate discount
  const discount = appliedCoupon
    ? appliedCoupon.type === "percentage"
      ? subtotal * (appliedCoupon.discount / 100)
      : appliedCoupon.discount
    : 0;

  const totalPrice = subtotal - discount;

  // Check if all required fields are selected
  const canCreateBook =
    selectedCover && selectedPaper && selectedPaymentMethod && pages.length > 0;

  const handlePaperChange = (paperId: string) => {
    const paper = paperTypes.find((p) => p.id === paperId);
    if (paper && onPaperChange) {
      onPaperChange(paper);
    }
  };

  // Coupon handling functions
  const handleApplyPromoCode = async () => {
    if (!promoCode.trim()) {
      setPromoError("يرجى إدخال كود الخصم");
      return;
    }

    setPromoError("");
    setIsValidating(true);

    try {
      // Prepare products data for backend validation
      const products = [
        ...(selectedCover
          ? [
              {
                id: parseInt(selectedCover.id),
                amount: 1,
                price: Number(selectedCover.price) || 0,
              },
            ]
          : []),
        ...pages
          .filter((p) => p.type === "page")
          .map((page) => ({
            id: parseInt(page.id),
            amount: 1,
            price: Number(page.price) || 0,
          })),
      ];

      const couponData: ValidateCouponDto = {
        code: promoCode.trim(),
        products,
      };

      const response = await CouponService.validateCoupon(couponData);

      if (response.data) {
        const appliedCouponData: AppliedCoupon = {
          code: promoCode.trim(),
          discount: response.data.discount,
          type: response.data.type,
          couponType: response.data.couponType,
          minOrderTotalPrice: response.data.minOrderTotalPrice,
          minOrderItemCount: response.data.minOrderItemCount,
        };

        // Check if coupon meets minimum requirements
        if (
          subtotal >= appliedCouponData.minOrderTotalPrice &&
          products.length >= appliedCouponData.minOrderItemCount
        ) {
          setAppliedCoupon(appliedCouponData);
          setPromoCode("");
        } else {
          setPromoError("لا يلبي الكوبون الحد الأدنى المطلوب");
        }
      }
    } catch (error: any) {
      setPromoError(error.message || "كود خصم غير صالح");
    } finally {
      setIsValidating(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setPromoError("");
  };

  // Create custom order function
  const handleCreateCustomOrder = async () => {
    if (
      !selectedCover ||
      !selectedPaper ||
      !selectedPaymentMethod ||
      pages.length === 0
    ) {
      return;
    }

    try {
      // Create SVG elements from page data URLs
      const svgElements: SVGElement[] = [];

      // Helper function to extract SVG from data URL
      const extractSvgFromDataUrl = (dataUrl: string): string | null => {
        if (dataUrl.startsWith("data:image/svg+xml;base64,")) {
          try {
            const base64Data = dataUrl.split(",")[1];
            return atob(base64Data);
          } catch (e) {
            console.error("Error decoding base64 SVG:", e);
            return null;
          }
        }
        return null;
      };

      // Helper function to create SVG element from string
      const createSvgElement = (svgString: string): SVGElement | null => {
        try {
          const parser = new DOMParser();
          const doc = parser.parseFromString(svgString, "image/svg+xml");
          const svgElement = doc.querySelector("svg") as SVGElement;

          if (svgElement) {
            // Ensure proper dimensions and viewBox
            const currentWidth = svgElement.getAttribute("width");
            const currentHeight = svgElement.getAttribute("height");
            const currentViewBox = svgElement.getAttribute("viewBox");

            // If no viewBox, create one from width/height or use default
            if (!currentViewBox) {
              const width = currentWidth ? parseFloat(currentWidth) : 800;
              const height = currentHeight ? parseFloat(currentHeight) : 600;
              svgElement.setAttribute("viewBox", `0 0 ${width} ${height}`);
            }

            // Ensure width and height are set
            if (!currentWidth) {
              svgElement.setAttribute("width", "800");
            }
            if (!currentHeight) {
              svgElement.setAttribute("height", "600");
            }

            // Set preserveAspectRatio to maintain aspect ratio
            svgElement.setAttribute("preserveAspectRatio", "xMidYMid meet");
          }

          return svgElement;
        } catch (e) {
          console.error("Error creating SVG element:", e);
          return null;
        }
      };

      // Add pages SVGs only (skip cover)
      pages.forEach((page, index) => {
        if (page.imageUrl) {
          const pageSvgString = extractSvgFromDataUrl(page.imageUrl);
          if (pageSvgString) {
            const pageSvg = createSvgElement(pageSvgString);
            if (pageSvg) {
              svgElements.push(pageSvg);
            }
          }
        }
      });

      if (svgElements.length === 0) {
        throw new Error(
          "No SVG data found in pages. Please make sure the book pages contain valid SVG data."
        );
      }

      // Convert SVGs to images
      const imageBlobs = await Promise.all(
        svgElements.map((svg, index) =>
          svgToImage(svg, { width: 800, height: 600 })
        )
      );

      // Convert blobs to files
      const imageFiles = imageBlobs.map((blob, index) =>
        blobToFile(blob, `book-${index + 1}.png`)
      );

      // Prepare order data
      const pageIds = pages.map((page) => page.id);

      const orderData = {
        couponId: appliedCoupon?.id,
        paperTypeId: selectedPaper.id,
        booksIds: pageIds,
        paymentMethodId: selectedPaymentMethod.id.toString(),
        images: imageFiles,
      };

      // Create custom order
      const result = await createCustomOrder(orderData);

      if (result.statusCode === 201) {
        // Success - close dialog and call onCreateBook
        onCreateBook();
      } else {
        throw new Error(result.error || "Failed to create custom order");
      }
    } catch (error) {
      console.error("Error creating custom order:", error);
      // Handle error - you might want to show a toast or error message
    }
  };

  const getPaymentIcon = (icon: string) => {
    switch (icon) {
      case "credit-card":
        return <CreditCard className="w-5 h-5" />;
      case "bank":
        return <DollarSign className="w-5 h-5" />;
      case "cash":
        return <DollarSign className="w-5 h-5" />;
      default:
        return <CreditCard className="w-5 h-5" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        preventOutsideClose
        className="sm:max-w-6xl w-[95vw] max-h-[95vh] overflow-y-auto bg-gradient-to-br from-cream-50 to-azalove-50 border-2 border-azalove-200 shadow-2xl"
      >
        <DialogHeader className="bg-amaranth-900 text-white rounded-t-lg -m-6 mb-6 p-6">
          <DialogTitle className="flex items-center gap-2 text-white">
            <CheckCircle className="w-5 h-5 text-green-200" />
            ملخص إنشاء الكتاب
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-8">
          {/* Summary Header */}
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-royal-800">كتابك جاهز!</h3>
            <p className="text-royal-600">
              راجع كتابك قبل إنشائه. يمكنك العودة لإجراء تغييرات.
            </p>
          </div>

          {/* Book Details & Pricing */}
          <div className="bg-white p-6 rounded-lg border border-azalove-200 shadow-sm">
            <h4 className="font-semibold text-lg text-royal-800 mb-4">
              تفاصيل الكتاب والأسعار
            </h4>

            {/* Book Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-royal-600 mb-1">إجمالي الصفحات:</p>
                <p className="font-medium text-royal-800">
                  {pages.length} صفحة
                </p>
              </div>
              <div>
                <p className="text-sm text-royal-600 mb-1">نوع الورق:</p>
                <select
                  className="border rounded px-3 py-2 w-full"
                  value={selectedPaper?.id}
                  onChange={(e) => handlePaperChange(e.target.value)}
                >
                  {paperTypes && paperTypes.length > 0 ? (
                    paperTypes.map((option, index) => (
                      <option key={index} value={option.id}>
                        {option.label} ({formatCurrency(option.value)})
                      </option>
                    ))
                  ) : (
                    <option value="">جاري التحميل...</option>
                  )}
                </select>
              </div>
            </div>

            {/* Pricing Breakdown */}
            <div className="space-y-3 border-t pt-4">
              <h5 className="font-semibold text-royal-800 mb-3">
                تفاصيل الأسعار:
              </h5>

              {selectedCover && (
                <div className="flex justify-between items-center py-2">
                  <span className="text-royal-700">
                    الغلاف ({selectedCover.title}):
                  </span>
                  <span className="font-medium">
                    {formatCurrency(coverPrice)}
                  </span>
                </div>
              )}

              {pagesPrice > 0 && (
                <div className="flex justify-between items-center py-2">
                  <span className="text-royal-700">
                    صفحات المحتوى (
                    {pages.filter((p) => p.type === "page").length} صفحة):
                  </span>
                  <span className="font-medium">
                    {formatCurrency(pagesPrice)}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center py-2">
                <span className="text-royal-700">
                  نوع الورق ({selectedPaper?.label}):
                </span>
                <span className="font-medium">
                  {formatCurrency(paperPrice)}
                </span>
              </div>

              <div className="border-t pt-3">
                <div className="flex justify-between items-center py-2">
                  <span className="text-royal-700 font-semibold">
                    المجموع الفرعي:
                  </span>
                  <span className="font-semibold">
                    {formatCurrency(subtotal)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white p-6 rounded-lg border border-azalove-200 shadow-sm">
            <h4 className="font-semibold text-lg text-royal-800 mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-azalove-600" />
              طرق الدفع
            </h4>
            {paymentMethodsLoading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-azalove-600"></div>
                <span className="mr-2 text-royal-600">
                  جاري تحميل طرق الدفع...
                </span>
              </div>
            ) : paymentMethodsError ? (
              <div className="text-center py-8">
                <p className="text-red-600">خطأ في تحميل طرق الدفع</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {paymentMethodsData?.map((method) => (
                  <div
                    key={method.id}
                    onClick={() => setSelectedPaymentMethod(method)}
                    className={`flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      selectedPaymentMethod?.id === method.id
                        ? "border-azalove-500 bg-azalove-50"
                        : "border-azalove-200 hover:border-azalove-400"
                    }`}
                  >
                    <div className="text-center">
                      <div className="mb-2 text-azalove-600">
                        {getPaymentIcon(method.icon)}
                      </div>
                      <span className="text-sm text-royal-700">
                        {method.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Coupon Code */}
          <div className="bg-white p-6 rounded-lg border border-azalove-200 shadow-sm">
            <h4 className="font-semibold text-lg text-royal-800 mb-4 flex items-center gap-2">
              <Tag className="w-5 h-5 text-azalove-600" />
              كود الخصم
            </h4>

            {appliedCoupon ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-green-800 font-medium">
                      كوبون "{appliedCoupon.code}" مطبق
                    </span>
                    <span className="text-green-600 text-sm">
                      (خصم{" "}
                      {appliedCoupon.type === "percentage"
                        ? `${appliedCoupon.discount}%`
                        : formatCurrency(appliedCoupon.discount)}
                      )
                    </span>
                  </div>
                  <button
                    onClick={handleRemoveCoupon}
                    className="text-red-600 hover:text-red-800 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="أدخل كود الخصم"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-azalove-500"
                    disabled={isValidating}
                  />
                  <button
                    onClick={handleApplyPromoCode}
                    disabled={isValidating || !promoCode.trim()}
                    className="px-6 py-2 bg-azalove-500 text-white rounded hover:bg-azalove-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isValidating ? "جاري التحقق..." : "تطبيق"}
                  </button>
                </div>
                {promoError && (
                  <p className="text-red-600 text-sm">{promoError}</p>
                )}
              </div>
            )}
          </div>

          {/* Total Price */}
          <div className="bg-amaranth-900 p-6 rounded-lg text-white">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-6 h-6" />
                  <span className="text-xl font-semibold">المجموع الفرعي:</span>
                </div>
                <span className="text-2xl font-semibold">
                  {formatCurrency(subtotal)}
                </span>
              </div>

              {discount > 0 && appliedCoupon && (
                <div className="flex justify-between items-center text-green-200">
                  <span className="text-lg">الخصم:</span>
                  <span className="text-xl font-semibold">
                    -{formatCurrency(discount)}
                  </span>
                </div>
              )}

              <div className="border-t border-white/20 pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">المجموع الكلي:</span>
                  <span className="text-4xl font-bold">
                    {formatCurrency(totalPrice)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Couple/Characters Preview */}
          {couple && (
            <div className="bg-white p-6 rounded-lg border border-azalove-200 shadow-sm">
              <h4 className="font-semibold text-lg text-royal-800 mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-amber-900" />
                الشخصيات المختارة
              </h4>
              <CouplePreview
                character1={couple?.character1 || []}
                character2={couple?.character2 || []}
                size={120}
              />
            </div>
          )}

          {/* Cover Preview */}
          {selectedCover && (
            <div className="space-y-4">
              <h4 className="font-semibold text-lg text-royal-800">
                الغلاف المختار
              </h4>
              <div className="flex justify-center">
                <div className="relative aspect-[3/4] w-48 bg-gray-100 rounded-lg overflow-hidden border-2 border-azalove-200 shadow-lg">
                  <img
                    src={selectedCover?.imageUrl || ""}
                    alt={selectedCover?.title || ""}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent">
                    <div className="absolute top-0 left-0 right-0 p-4 text-white">
                      <h2 className="font-bold mb-1 text-lg">
                        {selectedCover?.title || ""}
                      </h2>
                      <p className="opacity-90 text-sm">
                        {selectedCover?.subtitle || ""}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Pages Preview */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg text-royal-800">
              صفحات الكتاب ({pages.length - 1} صفحة محتوى)
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {pages.map((page, index) => (
                <div key={page.id} className="space-y-2">
                  <div className="text-center text-sm text-royal-700 font-medium">
                    {page.type === "cover" ? "الغلاف" : `الصفحة ${index}`}
                  </div>
                  <PagePreview page={page} />
                  {page.type !== "cover" && (
                    <div className="text-xs text-royal-600 text-center">
                      <p className="font-medium">{page.title}</p>
                      <p className="line-clamp-2">{page.subtitle}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-6">
            <Button
              onClick={handleCreateCustomOrder}
              disabled={!canCreateBook || isCreatingOrder}
              className={`flex-1 border-0 shadow-lg ${
                canCreateBook && !isCreatingOrder
                  ? "bg-amaranth-900 hover:bg-amaranth-900 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isCreatingOrder ? "جاري الإنشاء..." : "إنشاء الكتاب"}
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="border-azalove-300 text-azalove-700 hover:bg-azalove-50"
            >
              إلغاء
            </Button>
          </div>

          {/* Helper message when button is disabled */}
          {!canCreateBook && (
            <div className="text-center text-sm text-gray-500 mt-2">
              {!selectedCover && "يرجى اختيار غلاف للكتاب"}
              {!selectedPaper && " • يرجى اختيار نوع الورق"}
              {!selectedPaymentMethod && " • يرجى اختيار طريقة الدفع"}
              {pages.length === 0 && " • يرجى إضافة صفحات للكتاب"}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
