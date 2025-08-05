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
  product: {
    loading: string;
    error: string;
    notFound: string;
    outOfStock: string;
    inStock: string;
    off: string;
    offAmount: string;
    reviews: string;
    noReviews: string;
    outOf: string;
    addToCart: string;
    buyNow: string;
    quantity: string;
    freeShipping: string;
    ordersOver: string;
    yearWarranty: string;
    fullCoverage: string;
    dayReturns: string;
    noQuestionsAsked: string;
    relatedProducts: string;
    specifications: string;
    customerReviews: string;
    ratingOverview: string;
    basedOn: string;
    reviewsCount: string;
    highestRating: string;
    lowestRating: string;
    showAllReviews: string;
    showLessReviews: string;
    writeReview: string;
    hideReviewForm: string;
    writeFirstReview: string;
    noReviewsYet: string;
    beFirstToShare: string;
    shareExperience: string;
    helpOthersDiscover: string;
    yourRating: string;
    yourReview: string;
    submitReview: string;
    cancel: string;
    submitting: string;
    writingTips: string;
    beSpecific: string;
    mentionQuality: string;
    reviewWillHelp: string;
    poor: string;
    fair: string;
    good: string;
    veryGood: string;
    excellent: string;
    verifiedPurchase: string;
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
    product: {
      loading: "جاري تحميل منتجك الرومانسي...",
      error: "عذراً! حدث خطأ ما",
      notFound: "المنتج غير موجود",
      outOfStock: "نفذت الكمية",
      inStock: "متوفر",
      off: "خصم",
      offAmount: "خصم ${amount}",
      reviews: "تقييمات",
      noReviews: "لا توجد تقييمات",
      outOf: "من أصل",
      addToCart: "أضف إلى السلة",
      buyNow: "اشتري الآن",
      quantity: "الكمية",
      freeShipping: "شحن مجاني",
      ordersOver: "للطلبات أكثر من",
      yearWarranty: "ضمان سنتين",
      fullCoverage: "تغطية كاملة",
      dayReturns: "إرجاع خلال 30 يوم",
      noQuestionsAsked: "بدون أسئلة",
      relatedProducts: "منتجات مشابهة",
      specifications: "المواصفات",
      customerReviews: "تقييمات العملاء",
      ratingOverview: "نظرة عامة على التقييم",
      basedOn: "بناءً على",
      reviewsCount: "تقييم",
      highestRating: "أعلى تقييم",
      lowestRating: "أقل تقييم",
      showAllReviews: "عرض جميع التقييمات",
      showLessReviews: "عرض تقييمات أقل",
      writeReview: "اكتب تقييم",
      hideReviewForm: "إخفاء نموذج التقييم",
      writeFirstReview: "اكتب أول تقييم",
      noReviewsYet: "لا توجد تقييمات بعد",
      beFirstToShare: "كن أول من يشارك تجربته مع هذا المنتج!",
      shareExperience: "شارك تجربتك",
      helpOthersDiscover: "ساعد الآخرين في اكتشاف هذا المنتج المذهل من خلال مشاركة أفكارك",
      yourRating: "تقييمك",
      yourReview: "تقييمك",
      submitReview: "إرسال التقييم",
      cancel: "إلغاء",
      submitting: "جاري الإرسال...",
      writingTips: "نصائح للكتابة",
      beSpecific: "كن محدداً حول ما أعجبك أو لم يعجبك",
      mentionQuality: "اذكر الجودة والقيمة والتجربة العامة",
      reviewWillHelp: "تقييمك سيساعد العملاء الآخرين في اتخاذ القرارات",
      poor: "ضعيف",
      fair: "مقبول",
      good: "جيد",
      veryGood: "جيد جداً",
      excellent: "ممتاز",
      verifiedPurchase: "مشتري موثق",
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
    product: {
      loading: "Loading your romantic find...",
      error: "Oops! Something went wrong",
      notFound: "Product not found",
      outOfStock: "Out of Stock",
      inStock: "In Stock",
      off: "OFF",
      offAmount: "OFF ${amount}",
      reviews: "reviews",
      noReviews: "No reviews",
      outOf: "out of",
      addToCart: "Add to Cart",
      buyNow: "Buy Now",
      quantity: "Quantity",
      freeShipping: "Free Shipping",
      ordersOver: "Orders over",
      yearWarranty: "2 Year Warranty",
      fullCoverage: "Full coverage",
      dayReturns: "30 Day Returns",
      noQuestionsAsked: "No questions asked",
      relatedProducts: "Related Products",
      specifications: "Specifications",
      customerReviews: "Customer Reviews",
      ratingOverview: "Rating Overview",
      basedOn: "Based on",
      reviewsCount: "reviews",
      highestRating: "Highest Rating",
      lowestRating: "Lowest Rating",
      showAllReviews: "Show All Reviews",
      showLessReviews: "Show Less Reviews",
      writeReview: "Write a Review",
      hideReviewForm: "Hide Review Form",
      writeFirstReview: "Write the First Review",
      noReviewsYet: "No reviews yet",
      beFirstToShare: "Be the first to share your experience with this product!",
      shareExperience: "Share Your Experience",
      helpOthersDiscover: "Help others discover this amazing product by sharing your thoughts",
      yourRating: "Your Rating",
      yourReview: "Your Review",
      submitReview: "Submit Review",
      cancel: "Cancel",
      submitting: "Submitting...",
      writingTips: "Writing Tips",
      beSpecific: "Be specific about what you liked or didn't like",
      mentionQuality: "Mention quality, value, and overall experience",
      reviewWillHelp: "Your review will help other customers make decisions",
      poor: "Poor",
      fair: "Fair",
      good: "Good",
      veryGood: "Very Good",
      excellent: "Excellent",
      verifiedPurchase: "Verified Purchase",
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
