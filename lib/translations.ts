export type Locale = "ar" | "en";

export interface Translations {
  cart: {
    emptyTitle: string;
    emptyDescription: string;
    readyToLove: string;
    loveCollection: string;
    items: string;
    cartTitle: string;
    cartDescription: string;
    summaryTitle: string;
    subtotal: string;
    shipping: string;
    tax: string;
    total: string;
    free: string;
    almostThere: string;
    addMoreForFreeShipping: string;
    continueLoveStory: string;
    checkoutTitle: string;
    checkoutDescription: string;
    viewLoveCollection: string;
    reviewAndCherish: string;
    specialOffer: string;
  };
  orderHistory: {
    title: string;
    description: string;
    orderId: string;
    orderDate: string;
    items: string;
    item: string;
    viewDetails: string;
    status: {
      delivered: string;
      shipped: string;
      processing: string;
      cancelled: string;
    };
    orderDetails: {
      title: string;
      description: string;
      orderInformation: string;
      shippingAddress: string;
      orderItems: string;
      orderSummary: string;
      payment: string;
      trackingNumber: string;
      estimatedDelivery: string;
      contactSupport: string;
      reorder: string;
      quantity: string;
      each: string;
    };
  };
  character: {
    createCouple: string;
    saveCouple: string;
    currentlyEditing: string;
    character1: string;
    character2: string;
    saveDialog: {
      title: string;
      description: string;
      coupleName: string;
      coupleNamePlaceholder: string;
      questions: {
        howMet: string;
        howMetPlaceholder: string;
        firstDate: string;
        firstDatePlaceholder: string;
        favoriteMemory: string;
        favoriteMemoryPlaceholder: string;
        futurePlans: string;
        futurePlansPlaceholder: string;
      };
      save: string;
      cancel: string;
    };
  };
  common: {
    loading: string;
    error: string;
    notFound: string;
    backToHome: string;
  };
}

export const translations: Record<Locale, Translations> = {
  ar: {
    cart: {
      emptyTitle: "عربة الحب الخاصة بك فارغة",
      emptyDescription:
        "ابدأ رحلتك الرومانسية بإضافة بعض العناصر الجميلة إلى مجموعتك",
      readyToLove: "مستعد للوقوع في الحب؟",
      loveCollection: "مجموعة الحب الخاصة بك",
      items: "عنصر",
      cartTitle: "عربة الحب الخاصة بك",
      cartDescription:
        "كل عنصر في عربتك هو جزء من قصة حبك. دعنا نجعلها مثالية معاً.",
      summaryTitle: "ملخص الحب",
      subtotal: "المجموع الفرعي",
      shipping: "الشحن",
      tax: "الضريبة",
      total: "المجموع",
      free: "مجاني",
      almostThere: "اقتربت من الهدف!",
      addMoreForFreeShipping: "أضف ${amount} أكثر للحصول على شحن مجاني",
      continueLoveStory: "استمر في قصة حبك",
      checkoutTitle: "💕 المتابعة للدفع",
      checkoutDescription: "قصة حبك تستمر مع الدفع الآمن...",
      viewLoveCollection: "عرض مجموعة الحب",
      reviewAndCherish: "راجع واحتفظ بالعناصر المختارة",
      specialOffer: "عرض خاص",
    },
    orderHistory: {
      title: "تاريخ الطلبات الرومانسية",
      description: "تتبع طلباتك الأخيرة واحتفظ بذكريات حبك الجميلة",
      orderId: "رقم الطلب",
      orderDate: "تاريخ الطلب",
      items: "عناصر",
      item: "عنصر",
      viewDetails: "عرض التفاصيل",
      status: {
        delivered: "تم التوصيل",
        shipped: "تم الشحن",
        processing: "قيد المعالجة",
        cancelled: "ملغي",
      },
      orderDetails: {
        title: "تفاصيل الطلب",
        description: "معلومات مفصلة عن طلبك",
        orderInformation: "معلومات الطلب",
        shippingAddress: "عنوان الشحن",
        orderItems: "عناصر الطلب",
        orderSummary: "ملخص الطلب",
        payment: "طريقة الدفع",
        trackingNumber: "رقم التتبع",
        estimatedDelivery: "التاريخ المتوقع للتوصيل",
        contactSupport: "تواصل مع الدعم",
        reorder: "إعادة الطلب",
        quantity: "الكمية",
        each: "لكل قطعة",
      },
    },
    character: {
      createCouple: "أنشئ زوجك",
      saveCouple: "احفظ الزوج",
      currentlyEditing: "تحرير حالياً:",
      character1: "الشخصية الأولى",
      character2: "الشخصية الثانية",
      saveDialog: {
        title: "احفظ زوجك",
        description: "أضف اسم للزوج وأجب على بعض الأسئلة لحفظ قصتك الرومانسية",
        coupleName: "اسم الزوج",
        coupleNamePlaceholder: "أدخل اسم الزوج...",
        questions: {
          howMet: "كيف التقيتما؟",
          howMetPlaceholder: "أخبرنا قصة لقائكما...",
          firstDate: "موعدكما الأول",
          firstDatePlaceholder: "صف موعدكما الأول...",
          favoriteMemory: "ذكرياتكما المفضلة",
          favoriteMemoryPlaceholder: "شاركنا ذكرياتكما الجميلة...",
          futurePlans: "خططكما المستقبلية",
          futurePlansPlaceholder: "ما هي أحلامكما معاً؟",
        },
        save: "احفظ",
        cancel: "إلغاء",
      },
    },
    common: {
      loading: "جاري التحميل...",
      error: "حدث خطأ",
      notFound: "غير موجود",
      backToHome: "العودة للرئيسية",
    },
  },
  en: {
    cart: {
      emptyTitle: "Your love cart is empty",
      emptyDescription:
        "Start your romantic journey by adding some beautiful items to your collection",
      readyToLove: "Ready to fall in love?",
      loveCollection: "Your Love Collection",
      items: "items",
      cartTitle: "Your Love Cart",
      cartDescription:
        "Every item in your cart is part of your love story. Let's make it perfect together.",
      summaryTitle: "Love Summary",
      subtotal: "Subtotal",
      shipping: "Shipping",
      tax: "Tax",
      total: "Total",
      free: "Free",
      almostThere: "Almost there!",
      addMoreForFreeShipping: "Add ${amount} more for free shipping",
      continueLoveStory: "Continue Your Love Story",
      checkoutTitle: "💕 Proceeding to checkout",
      checkoutDescription: "Your love story continues with secure payment...",
      viewLoveCollection: "View Love Collection",
      reviewAndCherish: "Review and cherish your selected items",
      specialOffer: "Special Offer",
    },
    orderHistory: {
      title: "Your Romantic Order History",
      description:
        "Track your recent orders and cherish your beautiful love memories",
      orderId: "Order ID",
      orderDate: "Order Date",
      items: "items",
      item: "item",
      viewDetails: "View Details",
      status: {
        delivered: "Delivered",
        shipped: "Shipped",
        processing: "Processing",
        cancelled: "Cancelled",
      },
      orderDetails: {
        title: "Order Details",
        description: "Detailed information about your order",
        orderInformation: "Order Information",
        shippingAddress: "Shipping Address",
        orderItems: "Order Items",
        orderSummary: "Order Summary",
        payment: "Payment Method",
        trackingNumber: "Tracking Number",
        estimatedDelivery: "Estimated Delivery",
        contactSupport: "Contact Support",
        reorder: "Reorder",
        quantity: "Quantity",
        each: "each",
      },
    },
    character: {
      createCouple: "Create Your Couple",
      saveCouple: "Save Couple",
      currentlyEditing: "Currently editing:",
      character1: "Character 1",
      character2: "Character 2",
      saveDialog: {
        title: "Save Your Couple",
        description:
          "Add a name for your couple and answer some questions to save your romantic story",
        coupleName: "Couple Name",
        coupleNamePlaceholder: "Enter couple name...",
        questions: {
          howMet: "How did you meet?",
          howMetPlaceholder: "Tell us your meeting story...",
          firstDate: "Your first date",
          firstDatePlaceholder: "Describe your first date...",
          favoriteMemory: "Your favorite memories",
          favoriteMemoryPlaceholder: "Share your beautiful memories...",
          futurePlans: "Your future plans",
          futurePlansPlaceholder: "What are your dreams together?",
        },
        save: "Save",
        cancel: "Cancel",
      },
    },
    common: {
      loading: "Loading...",
      error: "An error occurred",
      notFound: "Not found",
      backToHome: "Back to home",
    },
  },
};

export function getTranslation(locale: Locale, key: string): string {
  const keys = key.split(".");
  let value: any = translations[locale];

  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = value[k];
    } else {
      return key; // Return the key if translation not found
    }
  }

  return typeof value === "string" ? value : key;
}
