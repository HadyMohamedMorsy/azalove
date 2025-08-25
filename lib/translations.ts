export type Locale = "ar" | "en";

export interface Translations {
  auth: {
    login: {
      title: string;
      description: string;
      email: string;
      emailPlaceholder: string;
      password: string;
      passwordPlaceholder: string;
      rememberMe: string;
      forgotPassword: string;
      loginButton: string;
      loading: string;
      noAccount: string;
      createAccount: string;
    };
    register: {
      title: string;
      description: string;
      firstName: string;
      firstNamePlaceholder: string;
      lastName: string;
      lastNamePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      password: string;
      passwordPlaceholder: string;
      confirmPassword: string;
      confirmPasswordPlaceholder: string;
      agreeToTerms: string;
      registerButton: string;
      loading: string;
      haveAccount: string;
      signIn: string;
    };
    social: {
      orSignInWith: string;
      google: string;
      facebook: string;
    };
    messages: {
      loginSuccess: string;
      loginSuccessDescription: string;
      loginFailed: string;
      loginFailedDescription: string;
      registerSuccess: string;
      registerSuccessDescription: string;
      registerFailed: string;
      registerFailedDescription: string;
    };
  };
  invoice: {
    title: string;
    description: string;
    invoiceNumber: string;
    date: string;
    paymentMethod: string;
    amountDue: string;
    billTo: string;
    billFrom: string;
    items: string;
    quantity: string;
    price: string;
    totalAmount: string;
    subtotal: string;
    tax: string;
    total: string;
    thankYou: string;
    thankYouMessage: string;
    footer: {
      address: string;
      email: string;
      phone: string;
      website: string;
    };
  };
  blog: {
    relatedPosts: string;
    notFound: string;
    notFoundDescription: string;
    goBack: string;
    noProductsFound: string;
    noProductsDescription: string;
    author: string;
    publishedOn: string;
    categories: string;
    readMore: string;
    loading: string;
    error: string;
    errorDescription: string;
    home: string;
    blog: string;
    loadError: string;
    loadErrorDescription: string;
    reload: string;
    noBlogsFound: string;
    noBlogsDescription: string;
    noFilteredBlogs: string;
    noFilteredBlogsDescription: string;
    tryLater: string;
    contactUs: string;
    showingResults: string;
    noResults: string;
    of: string;
    results: string;
    categoryLoadError: string;
    categoryLoadErrorDescription: string;
    noCategoryBlogs: string;
    noCategoryBlogsDescription: string;
    categoryArticles: string;
  };
  categories: {
    latestCategories: string;
    errorLoadingCategories: string;
    noCategoriesFound: string;
    categories: string;
    category: string;
    viewCategory: string;
    exploreCategories: string;
    shopNow: string;
  };
  checkout: {
    title: string;
    subtitle: string;
    secureCheckout: string;
    steps: {
      shipping: string;
      shippingDescription: string;
      payment: string;
      paymentDescription: string;
      confirmation: string;
      confirmationDescription: string;
    };
    shipping: {
      title: string;
      subtitle: string;
      chooseShippingAddress: string;
      useNewAddress: string;
      shippingInfo: string;
      useSavedAddress: string;
      noSavedAddresses: string;
      noSavedAddressesDescription: string;
      addNewAddress: string;
      loadingAddresses: string;
      errorLoadingAddresses: string;
      email: string;
      firstName: string;
      lastName: string;
      address: string;
      city: string;
      postalCode: string;
      country: string;
      phoneNumber: string;
      default: string;
      back: string;
      continueToPayment: string;
      continueToPaymentButton: string;
    };
    payment: {
      title: string;
      subtitle: string;
      cardNumber: string;
      cardNumberPlaceholder: string;
      expiryDate: string;
      expiryDatePlaceholder: string;
      cvv: string;
      cvvPlaceholder: string;
      cardholderName: string;
      cardholderNamePlaceholder: string;
      billingAddress: string;
      sameAsShipping: string;
      differentBillingAddress: string;
      back: string;
      confirmPayment: string;
      processing: string;
      secureCardInformation: string;
    };
    confirmation: {
      title: string;
      subtitle: string;
      orderConfirmed: string;
      orderConfirmedDescription: string;
      orderNumber: string;
      estimatedDelivery: string;
      thankYou: string;
      thankYouMessage: string;
      continueShopping: string;
      viewOrder: string;
      orderDetails: string;
      orderDate: string;
      whatsNext: string;
      orderConfirmationEmailSent: string;
      orderProcessedWithin24Hours: string;
      trackingInfoSentViaEmail: string;
      downloadReceipt: string;
    };
  };
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
    faq: string;
  };
  products: {
    error: {
      title: string;
      description: string;
    };
    noProducts: {
      title: string;
      description: string;
    };
  };
  relatedBooks: {
    loading: string;
    title: string;
    noBooksFound: string;
  };
  returnRefund: {
    breadcrumb: {
      home: string;
      title: string;
    };
    title: string;
    lastUpdated: string;
    sections: {
      introduction: string;
      returnPeriod: {
        title: string;
        description: string;
        items: {
          paperBooks: string;
          illustratedBooks: string;
          bookSets: string;
          importedBooks: string;
          rareBooks: string;
        };
        note: string;
      };
      returnConditions: {
        title: string;
        description: string;
        items: string[];
      };
      nonReturnable: {
        title: string;
        description: string;
        items: string[];
      };
      returnProcess: {
        title: string;
        steps: {
          title: string;
          items: string[];
        };
        tips: {
          title: string;
          items: string[];
        };
      };
      returnCosts: {
        title: string;
        description: string;
        items: {
          freeReturn: string;
          returnFees: string;
          reducedFees: string;
          specialOffer: string;
        };
      };
      refunds: {
        title: string;
        methods: {
          title: string;
          items: string[];
        };
        timelines: {
          title: string;
          items: {
            creditCards: string;
            prepaidCards: string;
            digitalWallets: string;
            siteCredit: string;
            giftCards: string;
          };
        };
      };
      replacement: {
        title: string;
        description: string;
        items: string[];
        benefits: string;
      };
      specialCases: {
        title: string;
        defective: {
          title: string;
          items: string[];
        };
        wrongOrders: {
          title: string;
          items: string[];
        };
      };
      tracking: {
        title: string;
        description: string;
        items: string[];
      };
      giftReturns: {
        title: string;
        description: string;
        items: string[];
      };
      contact: {
        title: string;
        description: string;
        items: {
          email: string;
          whatsapp: string;
          liveChat: string;
          readingConsultations: string;
          bookClub: string;
        };
      };
    };
  };
  shippingDelivery: {
    breadcrumb: {
      home: string;
      title: string;
    };
    title: string;
    lastUpdated: string;
    sections: {
      introduction: string;
      deliveryAreas: {
        title: string;
        domestic: {
          title: string;
          items: {
            riyadh: string;
            jeddahMecca: string;
            dammamKhobar: string;
            medina: string;
            otherRegions: string;
            remoteAreas: string;
          };
        };
        international: {
          title: string;
          items: {
            gccCountries: string;
            arabCountries: string;
            worldwide: string;
          };
        };
      };
      shippingTimes: {
        title: string;
        processing: {
          title: string;
          items: {
            availableBooks: string;
            importedBooks: string;
            rareBooks: string;
            bookSets: string;
            customBooks: string;
          };
        };
        workingDays: {
          title: string;
          description: string;
        };
      };
      shippingCosts: {
        title: string;
        domestic: {
          title: string;
          items: {
            freeShipping: string;
            standardShipping: string;
            expressShipping: string;
            urgentShipping: string;
            bookClubMembers: string;
          };
        };
        international: {
          title: string;
          items: {
            gccCountries: string;
            arabCountries: string;
            worldwide: string;
            freeShipping: string;
          };
        };
      };
      shippingMethods: {
        title: string;
        partners: {
          title: string;
          items: {
            expressShipping: string;
            standardShipping: string;
            localShipping: string;
            internationalShipping: string;
          };
        };
        deliveryOptions: {
          title: string;
          items: {
            homeDelivery: string;
            officeDelivery: string;
            pickupPoints: string;
            personalPickup: string;
          };
        };
      };
      packaging: {
        title: string;
        description: string;
        items: string[];
      };
      tracking: {
        title: string;
        howToTrack: {
          title: string;
          steps: string[];
        };
        orderStatuses: {
          title: string;
          items: {
            processing: string;
            preparing: string;
            shipped: string;
            outForDelivery: string;
            delivered: string;
          };
        };
      };
      freeDelivery: {
        title: string;
        description: string;
        items: string[];
      };
      fastDelivery: {
        title: string;
        sameDay: {
          title: string;
          items: string[];
        };
        eveningDelivery: {
          title: string;
          items: string[];
        };
      };
      recipientUnavailable: {
        title: string;
        description: string;
        items: string[];
      };
      specialOrders: {
        title: string;
        rareBooks: {
          title: string;
          items: string[];
        };
        giftBooks: {
          title: string;
          items: string[];
        };
      };
      deliveryProblems: {
        title: string;
        delays: {
          title: string;
          items: string[];
        };
        damages: {
          title: string;
          items: string[];
        };
      };
      customerTips: {
        title: string;
        description: string;
        items: string[];
      };
      contact: {
        title: string;
        description: string;
        items: {
          email: string;
          whatsapp: string;
          customerService: string;
          emergency: string;
          tracking: string;
        };
      };
    };
  };
  promoBlock: {
    defaultTitle: string;
    defaultDescription: string;
    defaultDiscountText: string;
    defaultButtonText: string;
    defaultButtonLink: string;
    defaultImageSrc: string;
  };
  termsAndConditions: {
    breadcrumb: {
      home: string;
      title: string;
    };
    title: string;
    lastUpdated: string;
    sections: {
      introduction: string;
      definitions: {
        title: string;
        items: {
          website: string;
          user: string;
          services: string;
          content: string;
        };
      };
      websiteUsage: {
        title: string;
        description: string;
        prohibited: string[];
      };
      accounts: {
        title: string;
        description: string;
        requirements: string[];
      };
      orders: {
        title: string;
        description: string;
        items: string[];
      };
      shipping: {
        title: string;
        description: string;
        items: string[];
      };
      returns: {
        title: string;
        description: string;
        items: string[];
      };
      intellectualProperty: {
        title: string;
        description: string;
      };
      privacy: {
        title: string;
        description: string;
      };
      disclaimer: {
        title: string;
        description: string;
        items: string[];
      };
      governingLaw: {
        title: string;
        description: string;
      };
      modifications: {
        title: string;
        description: string;
      };
      contact: {
        title: string;
        description: string;
        items: {
          email: string;
          phone: string;
          address: string;
        };
      };
    };
  };
  termsConditions: {
    breadcrumb: {
      home: string;
      title: string;
    };
    title: string;
    lastUpdated: string;
    sections: {
      introduction: string;
      definitions: {
        title: string;
        description: string;
        items: {
          azalove: string;
          customer: string;
          website: string;
          products: string;
          order: string;
          services: string;
        };
      };
      acceptance: {
        title: string;
        description: string;
        items: string[];
      };
      productsServices: {
        title: string;
        productTypes: {
          title: string;
          items: string[];
        };
        additionalServices: {
          title: string;
          items: string[];
        };
      };
      pricingPayment: {
        title: string;
        pricing: {
          title: string;
          items: string[];
        };
        paymentMethods: {
          title: string;
          items: string[];
        };
      };
      ordersConfirmation: {
        title: string;
        orderProcess: {
          title: string;
          items: string[];
        };
        orderConfirmation: {
          title: string;
          items: string[];
        };
      };
      shippingDelivery: {
        title: string;
        description: string;
        items: string[];
      };
      returnsRefunds: {
        title: string;
        description: string;
        items: string[];
      };
      userAccounts: {
        title: string;
        accountCreation: {
          title: string;
          items: string[];
        };
        accountUsage: {
          title: string;
          items: string[];
        };
      };
      intellectualProperty: {
        title: string;
        websiteContent: {
          title: string;
          items: string[];
        };
        soldBooks: {
          title: string;
          items: string[];
        };
      };
      liabilityWarranties: {
        title: string;
        productWarranties: {
          title: string;
          items: string[];
        };
        liabilityLimits: {
          title: string;
          items: string[];
        };
      };
      privacyDataProtection: {
        title: string;
        description: string;
        items: string[];
      };
      usageRestrictions: {
        title: string;
        description: string;
        items: string[];
      };
      termsModifications: {
        title: string;
        description: string;
        items: string[];
      };
      agreementTermination: {
        title: string;
        byCustomer: {
          title: string;
          items: string[];
        };
        byCompany: {
          title: string;
          items: string[];
        };
      };
      disputeResolution: {
        title: string;
        amicable: {
          title: string;
          items: string[];
        };
        arbitration: {
          title: string;
          items: string[];
        };
      };
      governingLaw: {
        title: string;
        description: string;
        items: string[];
      };
      contactInfo: {
        title: string;
        description: string;
        companyInfo: {
          companyName: string;
          address: string;
          phone: string;
          email: string;
          customerService: string;
          commercialRecord: string;
          taxNumber: string;
        };
      };
      finalProvisions: {
        title: string;
        items: string[];
      };
      consentAcknowledgment: {
        title: string;
        description: string;
      };
    };
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
    home: string;
    shop: string;
  };
  shop: {
    no_products_match_filters: string;
    no_products_available: string;
    try_changing_filters: string;
    try_later_or_contact: string;
  };
  error: {
    loading_products: string;
  };
  contact: {
    title: string;
    subtitle: string;
    contactInfo: string;
    contactInfoDescription: string;
    breadcrumb: {
      home: string;
      contactUs: string;
    };
    form: {
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      phone: string;
      phonePlaceholder: string;
      subject: string;
      subjectPlaceholder: string;
      message: string;
      messagePlaceholder: string;
      submit: string;
      sending: string;
    };
    messages: {
      success: string;
      successDescription: string;
      error: string;
      errorDescription: string;
    };
  };
  cookiePolicy: {
    title: string;
    lastUpdated: string;
    breadcrumb: {
      home: string;
      cookiePolicy: string;
    };
    sections: {
      introduction: {
        title: string;
        content: string;
      };
      whatAreCookies: {
        title: string;
        content: string;
        benefits: string[];
      };
      cookieTypes: {
        title: string;
        essential: {
          title: string;
          description: string;
          items: string[];
        };
        performance: {
          title: string;
          description: string;
          items: string[];
        };
        functional: {
          title: string;
          description: string;
          items: string[];
        };
        marketing: {
          title: string;
          description: string;
          items: string[];
        };
      };
      thirdParty: {
        title: string;
        content: string;
        googleAnalytics: {
          title: string;
          items: string[];
        };
        socialMedia: {
          title: string;
          items: string[];
        };
        paymentServices: {
          title: string;
          items: string[];
        };
      };
      howWeUse: {
        title: string;
        shopping: {
          title: string;
          items: string[];
        };
        personalization: {
          title: string;
          items: string[];
        };
        analytics: {
          title: string;
          items: string[];
        };
      };
      management: {
        title: string;
        websiteSettings: {
          title: string;
          items: string[];
        };
        browserSettings: {
          title: string;
          items: string[];
        };
        impact: {
          title: string;
          items: string[];
        };
      };
      retention: {
        title: string;
        items: string[];
      };
      rights: {
        title: string;
        yourRights: {
          title: string;
          items: string[];
        };
        controlOptions: {
          title: string;
          items: string[];
        };
      };
      children: {
        title: string;
        content: string;
        items: string[];
      };
      updates: {
        title: string;
        content: string;
        items: string[];
      };
      compliance: {
        title: string;
        content: string;
        items: string[];
      };
      contact: {
        title: string;
        content: string;
        email: string;
        whatsapp: string;
        dpo: string;
        address: string;
        workingHours: string;
      };
    };
  };
  dashboard: {
    title: string;
    subtitle: string;
    tabs: {
      profile: string;
      orders: string;
      favorites: string;
      cart: string;
      addresses: string;
    };
  };
  maintenance: {
    loading: string;
    title: string;
    subtitle: string;
    messageCard: {
      title: string;
      defaultMessage: string;
    };
    status: {
      estimatedTime: {
        title: string;
        value: string;
      };
      maintenanceType: {
        title: string;
        value: string;
      };
      contact: {
        title: string;
        value: string;
      };
    };
    actions: {
      refreshPage: string;
      backToHome: string;
    };
    contactInfo: {
      title: string;
      email: string;
    };
  };
}

export const translations: Record<Locale, Translations> = {
  ar: {
    auth: {
      login: {
        title: "تسجيل الدخول",
        description: "قم بتسجيل الدخول للوصول إلى حسابك",
        email: "البريد الإلكتروني",
        emailPlaceholder: "أدخل بريدك الإلكتروني...",
        password: "كلمة المرور",
        passwordPlaceholder: "أدخل كلمة المرور...",
        rememberMe: "تذكرني",
        forgotPassword: "نسيت كلمة المرور؟",
        loginButton: "تسجيل الدخول",
        loading: "جاري التحميل...",
        noAccount: "ليس لديك حساب؟",
        createAccount: "أنشئ حسابًا جديدًا",
      },
      register: {
        title: "إنشاء حساب جديد",
        description: "أنشئ حسابًا جديدًا للوصول إلى جميع المميزات",
        firstName: "الاسم الأول",
        firstNamePlaceholder: "أدخل اسمك الأول...",
        lastName: "الاسم الأخير",
        lastNamePlaceholder: "أدخل اسمك الأخير...",
        email: "البريد الإلكتروني",
        emailPlaceholder: "أدخل بريدك الإلكتروني...",
        password: "كلمة المرور",
        passwordPlaceholder: "أدخل كلمة المرور...",
        confirmPassword: "تأكيد كلمة المرور",
        confirmPasswordPlaceholder: "أعد إدخال كلمة المرور...",
        agreeToTerms: "أوافق على الشروط والأحكام",
        registerButton: "إنشاء الحساب",
        loading: "جاري التحميل...",
        haveAccount: "لديك حساب؟",
        signIn: "تسجيل الدخول",
      },
      social: {
        orSignInWith: "أو تسجيل الدخول باستخدام",
        google: "Google",
        facebook: "Facebook",
      },
      messages: {
        loginSuccess: "تم تسجيل الدخول بنجاح!",
        loginSuccessDescription: "تم تسجيل الدخول بنجاح. أهلاً بك مرة أخرى!",
        loginFailed: "فشل تسجيل الدخول",
        loginFailedDescription: "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
        registerSuccess: "تم إنشاء الحساب بنجاح!",
        registerSuccessDescription: "تم إنشاء الحساب بنجاح. أهلاً بك!",
        registerFailed: "فشل إنشاء الحساب",
        registerFailedDescription:
          "البريد الإلكتروني مستخدم بالفعل أو كلمة المرور غير متطابقة.",
      },
    },
    invoice: {
      title: "فاتورة",
      description: "تفاصيل الفاتورة",
      invoiceNumber: "رقم الفاتورة",
      date: "تاريخ الفاتورة",
      paymentMethod: "طريقة الدفع",
      amountDue: "المبلغ المستحق",
      billTo: "المورد",
      billFrom: "العميل",
      items: "العناصر",
      quantity: "الكمية",
      price: "السعر",
      totalAmount: "المبلغ الإجمالي",
      subtotal: "المجموع الفرعي",
      tax: "الضريبة",
      total: "المجموع",
      thankYou: "شكراً لك",
      thankYouMessage: "نتمنى لك يوماً سعيداً مليء بالحب والسعادة.",
      footer: {
        address: "عنوان المورد",
        email: "البريد الإلكتروني للمورد",
        phone: "رقم الهاتف للمورد",
        website: "موقع المورد",
      },
    },
    blog: {
      relatedPosts: "مقالات مشابهة",
      notFound: "المقال غير موجود",
      notFoundDescription: "عذراً، لم نتمكن من العثور على المقال المطلوب.",
      goBack: "العودة للصفحة السابقة",
      noProductsFound: "لا توجد منتجات متاحة",
      noProductsDescription: "عذراً، لا يوجد منتجات متاحة حالياً.",
      author: "المؤلف",
      publishedOn: "نشر في",
      categories: "التصنيفات",
      readMore: "اقرأ المزيد",
      loading: "جاري التحميل...",
      error: "حدث خطأ",
      errorDescription: "حدث خطأ أثناء تحميل المنتجات.",
      home: "الرئيسية",
      blog: "المدونة",
      loadError: "حدث خطأ في تحميل المقالات",
      loadErrorDescription:
        "نعتذر، حدث خطأ أثناء تحميل المقالات. يرجى المحاولة مرة أخرى لاحقاً.",
      reload: "إعادة التحميل",
      noBlogsFound: "لا توجد مقالات متاحة حاليًا",
      noBlogsDescription: "جرب المراجعة لاحقًا أو اتصل بنا للمساعدة",
      noFilteredBlogs: "لا توجد مقالات تطابق الفلاتر المحددة",
      noFilteredBlogsDescription: "جرب تغيير الفلاتر أو المراجعة لاحقًا",
      tryLater: "جرب المراجعة لاحقًا",
      contactUs: "اتصل بنا للمساعدة",
      showingResults: "عرض",
      noResults: "لا توجد نتائج",
      of: "من",
      results: "نتيجة",
      categoryLoadError: "حدث خطأ في تحميل المقالات",
      categoryLoadErrorDescription:
        "نعتذر، حدث خطأ أثناء تحميل المقالات. يرجى المحاولة مرة أخرى لاحقاً.",
      noCategoryBlogs: "لا توجد مقالات متاحة حاليًا",
      noCategoryBlogsDescription: "جرب المراجعة لاحقًا أو اتصل بنا للمساعدة",
      categoryArticles: "مقالات تصنيف",
    },
    categories: {
      latestCategories: "أحدث التصنيفات",
      errorLoadingCategories: "حدث خطأ في تحميل التصنيفات",
      noCategoriesFound: "لا توجد تصنيفات متاحة حالياً",
      categories: "التصنيفات",
      category: "التصنيف",
      viewCategory: "عرض التصنيف",
      exploreCategories: "استكشف التصنيفات",
      shopNow: "اشتري الآن",
    },
    checkout: {
      title: "الدفع",
      subtitle: "الدفع الآمن",
      secureCheckout: "تأكيد الدفع",
      steps: {
        shipping: "الشحن",
        shippingDescription: "إختر طريقة الشحن وعنوان التوصيل",
        payment: "الدفع",
        paymentDescription: "إختر طريقة الدفع وتأكيد الطلب",
        confirmation: "التأكيد",
        confirmationDescription: "تأكد من إكمال بيانات الطلب والدفع",
      },
      shipping: {
        title: "عنوان الشحن",
        subtitle: "اختر عنوان الشحن المفضل أو أضف عنوانًا جديدًا",
        chooseShippingAddress: "اختر عنوان الشحن المفضل",
        useNewAddress: "أضف عنوانًا جديدًا",
        shippingInfo: "معلومات الشحن",
        useSavedAddress: "استخدم عنوانًا محفوظًا",
        noSavedAddresses: "لا توجد عناوين محفوظة",
        noSavedAddressesDescription:
          "أضف عنوانًا جديدًا لتستخدمه في المرة القادمة",
        addNewAddress: "أضف عنوانًا جديدًا",
        loadingAddresses: "جاري تحميل العناوين...",
        errorLoadingAddresses: "حدث خطأ في تحميل العناوين",
        email: "البريد الإلكتروني",
        firstName: "الاسم الأول",
        lastName: "الاسم الأخير",
        address: "العنوان",
        city: "المدينة",
        postalCode: "الرمز البريدي",
        country: "البلد",
        phoneNumber: "رقم الهاتف",
        default: "الافتراضي",
        back: "رجوع",
        continueToPayment: "المتابعة للدفع",
        continueToPaymentButton: "تأكيد الدفع",
      },
      payment: {
        title: "تفاصيل الدفع",
        subtitle: "إختر طريقة الدفع وتأكد الطلب",
        cardNumber: "رقم البطاقة",
        cardNumberPlaceholder: "أدخل رقم البطاقة...",
        expiryDate: "تاريخ الانتهاء",
        expiryDatePlaceholder: "أدخل تاريخ الانتهاء...",
        cvv: "رمز CVV",
        cvvPlaceholder: "أدخل رمز CVV...",
        cardholderName: "اسم صاحب البطاقة",
        cardholderNamePlaceholder: "أدخل اسم صاحب البطاقة...",
        billingAddress: "عنوان الفواتير",
        sameAsShipping: "نفس عنوان الشحن",
        differentBillingAddress: "عنوان فواتير مختلف",
        back: "رجوع",
        confirmPayment: "تأكيد الدفع",
        processing: "جاري المعالجة...",
        secureCardInformation: "تفاصيل البطاقة الآمنة",
      },
      confirmation: {
        title: "تأكيد الطلب",
        subtitle: "تأكد من إكمال بيانات الطلب والدفع",
        orderConfirmed: "تم تأكيد الطلب بنجاح!",
        orderConfirmedDescription: "تم تأكيد الطلب بنجاح. شكراً لك!",
        orderNumber: "رقم الطلب",
        estimatedDelivery: "التاريخ المتوقع للتوصيل",
        thankYou: "شكراً لك",
        thankYouMessage: "نتمنى لك يوماً سعيداً مليء بالحب والسعادة.",
        continueShopping: "استمر في التسوق",
        viewOrder: "عرض الطلب",
        orderDetails: "تفاصيل الطلب",
        orderDate: "تاريخ الطلب",
        whatsNext: "ما التالي؟",
        orderConfirmationEmailSent:
          "تم إرسال تأكيد الطلب إلى بريدك الإلكتروني.",
        orderProcessedWithin24Hours: "تم معالجة الطلب خلال 24 ساعة.",
        trackingInfoSentViaEmail:
          "تم إرسال معلومات التتبع إلى بريدك الإلكتروني.",
        downloadReceipt: "قم بتحميل إيصال الدفع",
      },
    },
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
      helpOthersDiscover:
        "ساعد الآخرين في اكتشاف هذا المنتج المذهل من خلال مشاركة أفكارك",
      yourRating: "تقييمك",
      yourReview: "تقييمك",
      submitReview: "إرسال التقييم",
      cancel: "حذف",
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
      faq: "الأسئلة الشائعة",
    },
    products: {
      error: {
        title: "خطأ في تحميل المنتجات",
        description:
          "واجهنا مشكلة أثناء تحميل المنتجات. يرجى إعادة تحديث الصفحة أو التواصل مع الدعم الفني إذا استمرت المشكلة.",
      },
      noProducts: {
        title: "لا توجد منتجات متاحة",
        description:
          "لا توجد منتجات في هذا القسم في الوقت الحالي. تحقق مرة أخرى لاحقاً أو استكشف الأقسام الأخرى لاكتشاف أجمل قصص الحب.",
      },
    },
    relatedBooks: {
      loading: "جاري البحث عن الكتب المناسبة لك...",
      title: "الكتب المتعلقة بتفضيلاتك",
      noBooksFound:
        "لم يتم العثور على كتب تطابق تفضيلاتك. جرب تعديل اختياراتك.",
    },
    returnRefund: {
      breadcrumb: {
        home: "الرئيسيه",
        title: "سياسة الإرجاع والاسترداد",
      },
      title: "سياسة الإرجاع والاسترداد",
      lastUpdated: "آخر تحديث",
      sections: {
        introduction:
          "نحن في أزالوف نسعى لإثراء مكتبتكم بأجمل قصص الحب والرومانسية. توضح سياسة الإرجاع والاسترداد هذه حقوقكم في إرجاع الكتب الرومانسية واسترداد الأموال. نحن ملتزمون بتقديم تجربة قراءة مميزة، ونوفر عملية إرجاع واسترداد سهلة وعادلة لجميع عملائنا من عشاق الأدب الرومانسي.",
        returnPeriod: {
          title: "فترة الإرجاع",
          description: "يحق لك إرجاع الكتب الرومانسية خلال الفترات التالية:",
          items: {
            paperBooks: "الكتب الورقية: 30 يوماً من تاريخ الاستلام",
            illustratedBooks:
              "الكتب المصورة والروايات المصورة: 21 يوماً من تاريخ الاستلام",
            bookSets: "مجموعات الكتب: 30 يوماً من تاريخ الاستلام",
            importedBooks: "الكتب المستوردة: 14 يوماً من تاريخ الاستلام",
            rareBooks: "الكتب النادرة والمحدودة: 7 أيام من تاريخ الاستلام",
          },
          note: "ملاحظة: يتم حساب فترة الإرجاع من تاريخ استلام الكتاب وليس من تاريخ الشراء.",
        },
        returnConditions: {
          title: "شروط الإرجاع",
          description:
            "لضمان قبول طلب إرجاع الكتب الرومانسية، يجب أن تتوفر الشروط التالية:",
          items: [
            "أن يكون الكتاب في حالته الأصلية بدون تلف",
            "عدم وجود تمزق أو كتابة على صفحات الكتاب",
            "احتفاظ بالغلاف الأصلي والعلامات المرجعية إن وجدت",
            "عدم ثني أو تجعد الصفحات",
            "تقديم إثبات الشراء (فاتورة أو رقم الطلب)",
            "الكتاب غير مقروء أو مقروء جزئياً فقط",
            'وجود الكتاب في حالة "جديد" أو "جيد جداً"',
          ],
        },
        nonReturnable: {
          title: "الكتب غير القابلة للإرجاع",
          description: "الكتب التالية غير قابلة للإرجاع لأسباب خاصة:",
          items: [
            "الكتب الرقمية المحملة (PDF، ePub)",
            "الكتب الموقعة من المؤلفين",
            "الكتب المخصصة بأسماء شخصية",
            "الكتب المتضررة بسبب سوء الاستخدام",
            "الكتب المشتراة في عروض التصفية النهائية",
            "الكتب التي تم قراءتها بالكامل",
            "الكتب التي مر عليها أكثر من فترة الإرجاع المحددة",
            "البطاقات الهدايا وقسائم الكتب",
          ],
        },
        returnProcess: {
          title: "عملية الإرجاع",
          steps: {
            title: "خطوات إرجاع الكتب:",
            items: [
              "قم بتسجيل الدخول إلى حسابك في أزالوف",
              'اذهب إلى قسم "مكتبتي" أو "طلباتي"',
              "اختر الكتاب المراد إرجاعه",
              'انقر على "طلب إرجاع الكتاب"',
              "املأ نموذج الإرجاع مع سبب الإرجاع",
              "التقط صورة للكتاب توضح حالته",
              "احزم الكتاب في مغلف واقي",
              "استخدم ملصق الإرجاع المجاني",
              "أرسل الكتاب عبر البريد أو شركة الشحن",
            ],
          },
          tips: {
            title: "نصائح لحماية الكتب:",
            items: [
              "استخدم مغلف فقاعي أو كرتون مقوى",
              "ضع الكتاب في كيس بلاستيكي لحمايته من الرطوبة",
              "تجنب الثني أو الضغط على الطرد",
              "ستتلقى رقم تتبع لطلب الإرجاع",
              "المعالجة تتم خلال 2-3 أيام عمل من الاستلام",
            ],
          },
        },
        returnCosts: {
          title: "تكاليف الإرجاع",
          description: "تكاليف شحن الكتب للإرجاع:",
          items: {
            freeReturn: "إرجاع مجاني: في حالة وجود عيب في الطباعة أو التجليد",
            returnFees: "رسوم الإرجاع: 15 ريال للكتب الفردية",
            reducedFees: "رسوم مخفضة: 25 ريال لمجموعات الكتب",
            specialOffer: "عرض خاص: إرجاع مجاني لأول 3 كتب لكل عميل جديد.",
          },
        },
        refunds: {
          title: "عمليات الاسترداد",
          methods: {
            title: "طرق الاسترداد:",
            items: [
              "الاسترداد إلى نفس طريقة الدفع الأصلية",
              "رصيد في موقع أزالوف للكتب الرومانسية",
              "بطاقة هدايا لشراء كتب جديدة",
              "التبرع بقيمة الكتاب لمكتبة عامة (اختياري)",
            ],
          },
          timelines: {
            title: "مواعيد الاسترداد:",
            items: {
              creditCards: "البطاقات الائتمانية: 3-7 أيام عمل",
              prepaidCards: "البطاقات مدفوعة مسبقاً: 2-5 أيام عمل",
              digitalWallets: "المحافظ الرقمية: 1-2 أيام عمل",
              siteCredit: "رصيد الموقع: فوري بعد فحص الكتاب",
              giftCards: "بطاقات الهدايا: فوري بعد المعالجة",
            },
          },
        },
        replacement: {
          title: "الاستبدال",
          description: "نوفر خدمة استبدال الكتب في الحالات التالية:",
          items: [
            "استبدال الكتاب التالف أو المعيب في الطباعة",
            "استبدال الكتاب بإصدار أحدث من نفس المؤلف",
            "استبدال الكتاب بجزء آخر من نفس السلسلة",
            "استبدال الكتاب بكتاب آخر من نفس فئة السعر",
            "استبدال الطبعة العادية بالطبعة المميزة (مع دفع الفرق)",
          ],
          benefits:
            "مميزات الاستبدال: شحن مجاني للكتاب البديل، واستشارة مجانية لاختيار كتب رومانسية تناسب ذوقك.",
        },
        specialCases: {
          title: "حالات خاصة",
          defective: {
            title: "الكتب المعيبة:",
            items: [
              "إرجاع فوري مع استرداد كامل",
              "شحن مجاني للكتاب البديل",
              "كتاب إضافي مجاني كاعتذار",
              "أولوية في الحصول على الإصدارات الجديدة",
            ],
          },
          wrongOrders: {
            title: "الطلبات الخاطئة:",
            items: [
              "إرجاع مجاني مع استرداد كامل",
              "إرسال الكتاب الصحيح مجاناً",
              "خصم 20% على الطلبة التالية",
              "انضمام مجاني لنادي القراء",
            ],
          },
        },
        tracking: {
          title: "تتبع الإرجاع",
          description: "يمكنك تتبع حالة إرجاع الكتب من خلال:",
          items: [
            'قسم "مكتبتي" في حسابك',
            'قسم "طلبات الإرجاع"',
            "الإشعارات عبر البريد الإلكتروني",
            "التنبيهات في التطبيق",
            "الدردشة المباشرة مع خدمة العملاء",
            "مراجعات الكتب وتقييمات العملاء",
          ],
        },
        giftReturns: {
          title: "إرجاع الكتب المُهداة",
          description: "للكتب الرومانسية المُهداة من موقعنا:",
          items: [
            "يمكن إرجاع الكتب المُهداة خلال 45 يوماً",
            "الاسترداد يتم كرصيد في موقع أزالوف",
            "يمكن استبدال الكتاب بكتاب آخر مجاناً",
            "يمكن للمُهدي طلب الاسترداد المالي",
            "بطاقة هدايا جديدة بنفس القيمة",
            "تغليف هدايا مجاني للكتاب البديل",
          ],
        },
        contact: {
          title: "التواصل معنا",
          description:
            "لأي استفسار حول إرجاع الكتب الرومانسية، يرجى التواصل معنا:",
          items: {
            email: "البريد الإلكتروني: books@azalove.com",
            whatsapp: "واتساب: +966 XX XXX XXXX",
            liveChat: "الدردشة المباشرة: متاحة من 9 صباحاً إلى 11 مساءً",
            readingConsultations: "استشارات القراءة: متاحة 24/7",
            bookClub: "نادي القراء: جلسات أسبوعية لمناقشة الكتب",
          },
        },
      },
    },
    shippingDelivery: {
      breadcrumb: {
        home: "الرئيسيه",
        title: "سياسة الشحن والتوصيل",
      },
      title: "سياسة الشحن والتوصيل",
      lastUpdated: "آخر تحديث",
      sections: {
        introduction:
          "نحن في أزالوف نسعى لإيصال أجمل قصص الحب والرومانسية إلى باب منزلكم بأسرع وقت ممكن وبأفضل جودة. توضح سياسة الشحن والتوصيل هذه جميع التفاصيل المتعلقة بتوصيل الكتب الرومانسية، من مواعيد الشحن إلى تكاليف التوصيل. نحن ملتزمون بحماية كتبكم أثناء النقل وضمان وصولها في حالة مثالية لتستمتعوا بقراءتها.",
        deliveryAreas: {
          title: "مناطق التوصيل",
          domestic: {
            title: "داخل المملكة العربية السعودية:",
            items: {
              riyadh: "الرياض: توصيل سريع خلال 24-48 ساعة",
              jeddahMecca: "جدة ومكة المكرمة: 2-3 أيام عمل",
              dammamKhobar: "الدمام والخبر: 2-3 أيام عمل",
              medina: "المدينة المنورة: 2-3 أيام عمل",
              otherRegions: "بقية المناطق: 3-5 أيام عمل",
              remoteAreas: "المناطق النائية: 5-7 أيام عمل",
            },
          },
          international: {
            title: "خارج المملكة:",
            items: {
              gccCountries: "دول الخليج: 5-7 أيام عمل",
              arabCountries: "الدول العربية: 7-14 يوم عمل",
              worldwide: "بقية العالم: 14-21 يوم عمل",
            },
          },
        },
        shippingTimes: {
          title: "أوقات الشحن",
          processing: {
            title: "أوقات المعالجة:",
            items: {
              availableBooks: "الكتب المتوفرة: 1-2 يوم عمل",
              importedBooks: "الكتب المستوردة: 3-5 أيام عمل",
              rareBooks: "الكتب النادرة: 5-10 أيام عمل",
              bookSets: "مجموعات الكتب: 2-3 أيام عمل",
              customBooks: "الكتب المخصصة: 7-14 يوم عمل",
            },
          },
          workingDays: {
            title: "أيام العمل:",
            description:
              "نقوم بمعالجة الطلبات من الأحد إلى الخميس، من الساعة 9 صباحاً إلى 6 مساءً. الطلبات المقدمة بعد الساعة 3 مساءً يوم الخميس ستتم معالجتها يوم الأحد التالي.",
          },
        },
        shippingCosts: {
          title: "تكاليف الشحن",
          domestic: {
            title: "داخل المملكة:",
            items: {
              freeShipping: "الشحن المجاني: للطلبات أكثر من 150 ريال",
              standardShipping: "الشحن العادي: 25 ريال (2-3 أيام)",
              expressShipping: "الشحن السريع: 35 ريال (24-48 ساعة)",
              urgentShipping: "الشحن المستعجل: 50 ريال (نفس اليوم في الرياض)",
              bookClubMembers: "أعضاء نادي القراء: شحن مجاني دائماً",
            },
          },
          international: {
            title: "خارج المملكة:",
            items: {
              gccCountries: "دول الخليج: 45 ريال",
              arabCountries: "الدول العربية: 65 ريال",
              worldwide: "بقية العالم: 85 ريال",
              freeShipping: "الشحن المجاني: للطلبات أكثر من 500 ريال",
            },
          },
        },
        shippingMethods: {
          title: "طرق الشحن",
          partners: {
            title: "شركاء الشحن:",
            items: {
              expressShipping: "الشحن السريع: شركة أرامكس",
              standardShipping: "الشحن العادي: البريد السعودي",
              localShipping: "الشحن المحلي: شركة سمسا",
              internationalShipping: "الشحن الدولي: شركة DHL",
            },
          },
          deliveryOptions: {
            title: "خيارات التوصيل:",
            items: {
              homeDelivery: "التوصيل للمنزل: إلى باب المنزل",
              officeDelivery: "التوصيل للمكتب: خلال ساعات العمل",
              pickupPoints: "نقاط الاستلام: من فروع شركات الشحن",
              personalPickup: "الاستلام الشخصي: من مقر الشركة (بموعد مسبق)",
            },
          },
        },
        packaging: {
          title: "التغليف والحماية",
          description: "نحرص على حماية كتبكم الرومانسية بأفضل طرق التغليف:",
          items: [
            "تغليف فقاعي مقاوم للصدمات",
            "صناديق كرتونية مقوية مخصصة للكتب",
            "حماية من الرطوبة والعوامل الجوية",
            'ملصقات "هش - يُرجى المحافظة عليه"',
            "فاصل حماية بين الكتب المتعددة",
            "تغليف هدايا مجاني للمناسبات الخاصة",
            "رسائل شخصية مع الكتب المُهداة",
          ],
        },
        tracking: {
          title: "تتبع الطلبات",
          howToTrack: {
            title: "كيفية تتبع طلبك:",
            steps: [
              "سجل الدخول إلى حسابك في أزالوف",
              'اذهب إلى قسم "طلباتي"',
              "انقر على رقم الطلب",
              "تابع حالة الشحن والتوصيل",
              "استلم إشعارات فورية عبر الرسائل النصية",
            ],
          },
          orderStatuses: {
            title: "حالات الطلب:",
            items: {
              processing: "قيد المعالجة: جاري تحضير الطلب",
              preparing: "جاري التحضير: يتم تجهيز الكتب للشحن",
              shipped: "تم الشحن: الطلب في الطريق إليكم",
              outForDelivery: "خارج للتوصيل: سيصل اليوم",
              delivered: "تم التوصيل: وصل بنجاح",
            },
          },
        },
        freeDelivery: {
          title: "عروض التوصيل المجاني",
          description: "استمتع بالتوصيل المجاني في الحالات التالية:",
          items: [
            "طلبات أكثر من 150 ريال داخل المملكة",
            "طلبات أكثر من 500 ريال خارج المملكة",
            "أعضاء نادي القراء المميزين",
            "الطلبات في شهر الحب (فبراير)",
            "عروض نهاية الأسبوع (الجمعة والسبت)",
            "الطلبات المتكررة (أكثر من 5 كتب شهرياً)",
            "العملاء الجدد (أول 3 طلبات)",
          ],
        },
        fastDelivery: {
          title: "التوصيل السريع",
          sameDay: {
            title: "خدمة التوصيل نفس اليوم:",
            items: [
              "متاحة في الرياض فقط",
              "للطلبات المقدمة قبل الساعة 12 ظهراً",
              "رسوم إضافية 50 ريال",
              "مجانية للطلبات أكثر من 300 ريال",
            ],
          },
          eveningDelivery: {
            title: "خدمة التوصيل في المساء:",
            items: [
              "توصيل من الساعة 6 مساءً حتى 10 مساءً",
              "مثالية للعاملين والطلاب",
              "رسوم إضافية 25 ريال",
              "يجب تحديد موعد مسبق",
            ],
          },
        },
        recipientUnavailable: {
          title: "عدم توفر المستلم",
          description: "في حالة عدم توفر المستلم أثناء التوصيل:",
          items: [
            "سيتم ترك بطاقة إشعار",
            "الاتصال بالرقم المسجل",
            "إعادة محاولة التوصيل مجاناً (مرة واحدة)",
            "حفظ الطلب في أقرب نقطة استلام",
            "إشعار عبر الرسائل النصية والبريد الإلكتروني",
            "مهلة 7 أيام للاستلام قبل الإرجاع",
          ],
        },
        specialOrders: {
          title: "الطلبات الخاصة",
          rareBooks: {
            title: "الكتب النادرة والمحدودة:",
            items: [
              "شحن مجاني ومؤمن بالكامل",
              "تغليف خاص مقاوم للصدمات",
              "تتبع مفصل مع إشعارات مستمرة",
              "توثيق بالصور قبل وبعد الشحن",
            ],
          },
          giftBooks: {
            title: "الكتب المُهداة:",
            items: [
              "تغليف هدايا أنيق مجاني",
              "رسائل شخصية مكتوبة بخط جميل",
              "توقيت توصيل مخصص حسب المناسبة",
              "إخفاء الأسعار من الفواتير",
            ],
          },
        },
        deliveryProblems: {
          title: "مشاكل التوصيل",
          delays: {
            title: "في حالة تأخير التوصيل:",
            items: [
              "إشعار فوري بسبب التأخير",
              "خصم 50% من رسوم الشحن",
              "كتاب إضافي مجاني كاعتذار",
              "أولوية في الطلبات التالية",
            ],
          },
          damages: {
            title: "في حالة تلف الكتب:",
            items: [
              "استبدال فوري مجاني",
              "تحمل كامل تكاليف الشحن",
              "تعويض مناسب حسب قيمة الكتاب",
              "تحسين طرق التغليف",
            ],
          },
        },
        customerTips: {
          title: "نصائح للعملاء",
          description: "لضمان تجربة توصيل مميزة:",
          items: [
            "تأكد من صحة عنوان التوصيل",
            "اترك رقم هاتف يمكن الوصول إليه",
            "حدد أفضل وقت للتوصيل",
            "اطلب التوصيل للمكتب إذا لم تكن في المنزل",
            "اشترك في نادي القراء للحصول على مزايا إضافية",
            "تابع حالة الطلب عبر التطبيق",
            "تواصل معنا فور استلام الطلب",
          ],
        },
        contact: {
          title: "التواصل معنا",
          description: "لأي استفسار حول الشحن والتوصيل، يرجى التواصل معنا:",
          items: {
            email: "البريد الإلكتروني: shipping@azalove.com",
            whatsapp: "واتساب: +966 XX XXX XXXX",
            customerService: "خدمة العملاء: متاحة من 9 صباحاً إلى 9 مساءً",
            emergency: "الطوارئ: متاحة 24/7 للطلبات المستعجلة",
            tracking: "تتبع الطلبات: متاح على الموقع والتطبيق",
          },
        },
      },
    },
    termsAndConditions: {
      breadcrumb: {
        home: "الرئيسيه",
        title: "الشروط والأحكام",
      },
      title: "الشروط والأحكام",
      lastUpdated: "آخر تحديث",
      sections: {
        introduction:
          "مرحباً بك في موقع أزالوف للتجارة الإلكترونية. هذه الشروط والأحكام تحكم استخدامك لموقعنا الإلكتروني والخدمات المقدمة من خلاله. باستخدام موقعنا، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي جزء من هذه الشروط، فيرجى عدم استخدام موقعنا.",
        definitions: {
          title: "التعريفات",
          items: {
            website: "الموقع: يشير إلى موقع أزالوف الإلكتروني",
            user: "المستخدم: أي شخص يستخدم الموقع أو يصل إليه",
            services: "الخدمات: جميع الخدمات المقدمة من خلال الموقع",
            content:
              "المحتوى: جميع النصوص والصور والمعلومات المعروضة على الموقع",
          },
        },
        websiteUsage: {
          title: "استخدام الموقع",
          description:
            "يُسمح لك باستخدام هذا الموقع للأغراض الشخصية والتجارية المشروعة فقط. يُحظر عليك:",
          prohibited: [
            "استخدام الموقع لأي غرض غير قانوني أو غير مصرح به",
            "نشر أو نقل أي محتوى ضار أو مؤذي",
            "انتهاك حقوق الملكية الفكرية لأي طرف ثالث",
            "محاولة الوصول غير المصرح به إلى أنظمة الموقع",
            "استخدام الموقع لإرسال رسائل غير مرغوب فيها",
          ],
        },
        accounts: {
          title: "الحسابات والتسجيل",
          description:
            "لاستخدام بعض خدمات الموقع، قد تحتاج إلى إنشاء حساب. عند إنشاء حساب، يجب عليك:",
          requirements: [
            "تقديم معلومات دقيقة وكاملة",
            "الحفاظ على سرية معلومات تسجيل الدخول",
            "إشعارنا فوراً بأي استخدام غير مصرح به لحسابك",
            "تحديث معلوماتك الشخصية عند الحاجة",
          ],
        },
        orders: {
          title: "الطلبات والمدفوعات",
          description: "عند تقديم طلب عبر موقعنا:",
          items: [
            "جميع الطلبات تخضع لتأكيد التوفر والقبول",
            "الأسعار المعروضة شاملة ضريبة القيمة المضافة",
            "نحتفظ بالحق في رفض أي طلب لأي سبب",
            "الدفع مطلوب قبل معالجة الطلب",
            "نقبل وسائل الدفع المختلفة المعروضة على الموقع",
          ],
        },
        shipping: {
          title: "الشحن والتسليم",
          description: "معلومات الشحن والتسليم:",
          items: [
            "نقوم بالشحن إلى العناوين المحددة في المملكة العربية السعودية",
            "أوقات التسليم تختلف حسب الموقع والمنتج",
            "رسوم الشحن تُحسب عند الدفع",
            "العميل مسؤول عن تقديم عنوان تسليم صحيح",
            "نحتفظ بالحق في تغيير شركات الشحن",
          ],
        },
        returns: {
          title: "الإرجاع والاستبدال",
          description: "سياسة الإرجاع والاستبدال:",
          items: [
            "يمكن إرجاع المنتجات خلال 14 يوم من تاريخ الاستلام",
            "يجب أن تكون المنتجات في حالتها الأصلية",
            "بعض المنتجات قد تكون غير قابلة للإرجاع",
            "رسوم الإرجاع قد تُطبق حسب الحالة",
            "المبالغ المستردة تُعاد خلال 5-7 أيام عمل",
          ],
        },
        intellectualProperty: {
          title: "الملكية الفكرية",
          description:
            "جميع المحتويات الموجودة على هذا الموقع، بما في ذلك النصوص والصور والشعارات والتصاميم، محمية بحقوق الطبع والنشر وحقوق الملكية الفكرية. لا يُسمح بنسخ أو توزيع أو تعديل أي محتوى دون إذن خطي مسبق.",
        },
        privacy: {
          title: "الخصوصية",
          description:
            "نحن نلتزم بحماية خصوصيتك. معلوماتك الشخصية تُستخدم فقط لتقديم خدماتنا وتحسين تجربتك. لا نشارك معلوماتك مع أطراف ثالثة إلا بموافقتك أو عند الضرورة القانونية. يُرجى مراجعة سياسة الخصوصية للمزيد من التفاصيل.",
        },
        disclaimer: {
          title: "إخلاء المسؤولية",
          description:
            'الموقع والخدمات المقدمة "كما هي" دون أي ضمانات. نحن لا نتحمل المسؤولية عن:',
          items: [
            "أي أضرار مباشرة أو غير مباشرة",
            "فقدان البيانات أو الأرباح",
            "انقطاع الخدمة أو الأخطاء التقنية",
            "محتوى الأطراف الثالثة",
            "استخدام المنتجات بطريقة غير صحيحة",
          ],
        },
        governingLaw: {
          title: "القانون المطبق",
          description:
            "تخضع هذه الشروط والأحكام لقوانين المملكة العربية السعودية. أي نزاع ينشأ عن استخدام هذا الموقع يخضع للاختصاص القضائي للمحاكم السعودية.",
        },
        modifications: {
          title: "التعديلات",
          description:
            "نحتفظ بالحق في تعديل هذه الشروط والأحكام في أي وقت. التعديلات تصبح سارية فور نشرها على الموقع. استمرار استخدامك للموقع بعد التعديلات يعني موافقتك على الشروط المحدثة.",
        },
        contact: {
          title: "التواصل",
          description:
            "إذا كان لديك أي أسئلة حول هذه الشروط والأحكام، يرجى التواصل معنا عبر:",
          items: {
            email: "البريد الإلكتروني: info@azalove.com",
            phone: "الهاتف: +966 XX XXX XXXX",
            address: "العنوان: المملكة العربية السعودية",
          },
        },
      },
    },
    termsConditions: {
      breadcrumb: {
        home: "الرئيسيه",
        title: "الشروط والأحكام",
      },
      title: "الشروط والأحكام",
      lastUpdated: "آخر تحديث",
      sections: {
        introduction:
          "مرحباً بكم في متجر أزالوف للكتب الرومانسية. هذه الشروط والأحكام تنظم استخدامكم لموقعنا الإلكتروني وشراء الكتب الرومانسية من متجرنا. من خلال استخدام موقعنا أو تقديم طلب شراء، فإنكم توافقون على الالتزام بهذه الشروط والأحكام. نحن ملتزمون بتقديم أفضل تجربة تسوق لعشاق الأدب الرومانسي مع ضمان حقوق جميع الأطراف.",
        definitions: {
          title: "التعريفات",
          description: "في هذه الشروط والأحكام، تعني المصطلحات التالية:",
          items: {
            azalove:
              '"أزالوف" أو "نحن" أو "الشركة": متجر أزالوف للكتب الرومانسية',
            customer:
              '"العميل" أو "أنتم": الشخص الذي يستخدم الموقع أو يشتري منتجاتنا',
            website: '"الموقع": الموقع الإلكتروني لأزالوف والتطبيق المحمول',
            products: '"المنتجات": الكتب الرومانسية والمنتجات ذات الصلة',
            order: '"الطلب": طلب شراء المنتجات من موقعنا',
            services: '"الخدمات": جميع الخدمات المقدمة من خلال الموقع',
          },
        },
        acceptance: {
          title: "قبول الشروط",
          description: "باستخدام موقعنا الإلكتروني، فإنكم توافقون على:",
          items: [
            "الالتزام بجميع الشروط والأحكام المذكورة",
            "تقديم معلومات صحيحة وحديثة",
            "استخدام الموقع لأغراض قانونية فقط",
            "احترام حقوق الملكية الفكرية",
            "عدم إساءة استخدام الخدمات المقدمة",
            "الامتثال للقوانين المحلية والدولية",
          ],
        },
        productsServices: {
          title: "المنتجات والخدمات",
          productTypes: {
            title: "أنواع المنتجات:",
            items: [
              "الكتب الرومانسية المطبوعة",
              "الكتب الرقمية (PDF، ePub)",
              "الكتب الصوتية الرومانسية",
              "مجموعات الكتب وسلاسل الروايات",
              "الكتب النادرة والطبعات المحدودة",
              "الكتب الموقعة من المؤلفين",
            ],
          },
          additionalServices: {
            title: "الخدمات الإضافية:",
            items: [
              "توصيات كتب مخصصة",
              "نادي القراء الرومانسي",
              "مراجعات وتقييمات الكتب",
              "تغليف الهدايا",
              "خدمة العملاء المتخصصة",
              "إشعارات الإصدارات الجديدة",
            ],
          },
        },
        pricingPayment: {
          title: "الأسعار والدفع",
          pricing: {
            title: "الأسعار:",
            items: [
              "جميع الأسعار مدرجة بالريال السعودي",
              "الأسعار تشمل ضريبة القيمة المضافة",
              "قد تتغير الأسعار دون إشعار مسبق",
              "السعر المطبق هو السعر وقت تأكيد الطلب",
              "رسوم الشحن منفصلة عن أسعار الكتب",
            ],
          },
          paymentMethods: {
            title: "طرق الدفع:",
            items: [
              "البطاقات الائتمانية (فيزا، ماستركارد)",
              "البطاقات مدفوعة مسبقاً",
              "المحافظ الرقمية (Apple Pay، PayPal)",
              "التحويل البنكي",
              "الدفع عند الاستلام (في المناطق المحددة)",
            ],
          },
        },
        ordersConfirmation: {
          title: "الطلبات والتأكيد",
          orderProcess: {
            title: "عملية الطلب:",
            items: [
              "اختيار الكتب وإضافتها لسلة التسوق",
              "مراجعة الطلب والكمية",
              "إدخال معلومات الشحن والفوترة",
              "اختيار طريقة الدفع",
              "تأكيد الطلب والدفع",
              "استلام رسالة تأكيد الطلب",
            ],
          },
          orderConfirmation: {
            title: "تأكيد الطلب:",
            items: [
              "سيتم إرسال تأكيد الطلب خلال 24 ساعة",
              "يمكن إلغاء الطلب قبل الشحن",
              "نحتفظ بحق رفض الطلبات المشبوهة",
              "في حالة عدم توفر الكتاب، سيتم إشعاركم فوراً",
            ],
          },
        },
        shippingDelivery: {
          title: "الشحن والتسليم",
          description:
            "يرجى مراجعة سياسة الشحن والتوصيل للحصول على تفاصيل كاملة حول:",
          items: [
            "مناطق التوصيل المتاحة",
            "أوقات التسليم المتوقعة",
            "تكاليف الشحن",
            "شروط التوصيل المجاني",
            "طرق التتبع والمراقبة",
          ],
        },
        returnsRefunds: {
          title: "الإرجاع والاسترداد",
          description:
            "يرجى مراجعة سياسة الإرجاع والاسترداد للحصول على معلومات تفصيلية حول:",
          items: [
            "فترات الإرجاع المسموحة",
            "شروط إرجاع الكتب",
            "عملية الاسترداد",
            "الكتب غير القابلة للإرجاع",
            "تكاليف الإرجاع",
          ],
        },
        userAccounts: {
          title: "حسابات المستخدمين",
          accountCreation: {
            title: "إنشاء الحساب:",
            items: [
              "يجب تقديم معلومات صحيحة ودقيقة",
              "يجب أن تكون 18 عاماً أو أكثر",
              "مسؤولية الحفاظ على سرية كلمة المرور",
              "إشعارنا فوراً في حالة الاستخدام غير المصرح به",
            ],
          },
          accountUsage: {
            title: "استخدام الحساب:",
            items: [
              "لا يمكن مشاركة الحساب مع الآخرين",
              "تحديث المعلومات عند الحاجة",
              "الامتثال لسياسات المتجر",
              "حق الشركة في إيقاف الحسابات المخالفة",
            ],
          },
        },
        intellectualProperty: {
          title: "حقوق الملكية الفكرية",
          websiteContent: {
            title: "محتوى الموقع:",
            items: [
              "جميع المحتويات محمية بحقوق الطبع والنشر",
              "لا يمكن نسخ أو إعادة نشر المحتوى دون إذن",
              "الصور والوصوف ملكية خاصة بالموقع",
              "المراجعات والتقييمات ملكية مشتركة",
            ],
          },
          soldBooks: {
            title: "الكتب المباعة:",
            items: [
              "حقوق الطبع والنشر تبقى للمؤلفين والناشرين",
              "الشراء لا يعطي حق إعادة البيع التجاري",
              "الكتب الرقمية للاستخدام الشخصي فقط",
              "منع النسخ أو التوزيع غير المشروع",
            ],
          },
        },
        liabilityWarranties: {
          title: "المسؤولية والضمانات",
          productWarranties: {
            title: "ضمانات المنتجات:",
            items: [
              "ضمان جودة الطباعة والتجليد",
              "ضمان سلامة الكتب عند الوصول",
              "ضمان صحة المعلومات الببليوغرافية",
              "ضمان توفر الكتب المعلنة",
            ],
          },
          liabilityLimits: {
            title: "حدود المسؤولية:",
            items: [
              "لا نضمن استمرارية الخدمة دون انقطاع",
              "لا نتحمل مسؤولية الأضرار غير المباشرة",
              "المسؤولية محدودة بقيمة الطلب",
              "لا نتحمل مسؤولية استخدام الكتب",
            ],
          },
        },
        privacyDataProtection: {
          title: "الخصوصية وحماية البيانات",
          description:
            "نحن ملتزمون بحماية خصوصيتكم وفقاً لسياسات الخصوصية التالية:",
          items: [
            "سياسة الخصوصية",
            "سياسة ملفات تعريف الارتباط",
            "الامتثال لقوانين حماية البيانات",
            "تشفير المعلومات الحساسة",
            "عدم بيع البيانات الشخصية",
          ],
        },
        usageRestrictions: {
          title: "القيود على الاستخدام",
          description: "يُمنع استخدام الموقع في الأنشطة التالية:",
          items: [
            "أي أنشطة غير قانونية أو احتيالية",
            "انتهاك حقوق الملكية الفكرية",
            "تحميل محتوى ضار أو فيروسات",
            "محاولة اختراق الموقع أو الخوادم",
            "إرسال رسائل بريد إلكتروني مزعجة",
            "التدخل في تشغيل الموقع",
            "انتحال شخصية الآخرين",
          ],
        },
        termsModifications: {
          title: "التعديلات على الشروط",
          description: "نحتفظ بحق تعديل هذه الشروط والأحكام:",
          items: [
            "إشعار العملاء بالتغييرات قبل 30 يوماً",
            "نشر النسخة المحدثة على الموقع",
            "إرسال تنبيهات عبر البريد الإلكتروني",
            "الاستمرار في الاستخدام يعني القبول",
            "حق العملاء في إلغاء الحساب",
          ],
        },
        agreementTermination: {
          title: "فسخ الاتفاقية",
          byCustomer: {
            title: "من قبل العميل:",
            items: [
              "إغلاق الحساب في أي وقت",
              "طلب حذف البيانات الشخصية",
              "التوقف عن استخدام الخدمات",
            ],
          },
          byCompany: {
            title: "من قبل الشركة:",
            items: [
              "عند مخالفة الشروط والأحكام",
              "في حالة الاشتباه في النشاط الاحتيالي",
              "عند التوقف عن تقديم الخدمة",
              "إشعار مسبق بـ 30 يوماً",
            ],
          },
        },
        disputeResolution: {
          title: "حل النزاعات",
          amicable: {
            title: "الحل الودي:",
            items: [
              "التواصل المباشر مع خدمة العملاء",
              "محاولة الوصول لحل مرضي",
              "فترة 30 يوماً للحل الودي",
            ],
          },
          arbitration: {
            title: "التحكيم:",
            items: [
              "اللجوء للتحكيم في حالة عدم الحل الودي",
              "التحكيم وفق القوانين السعودية",
              "مركز التحكيم التجاري المعتمد",
            ],
          },
        },
        governingLaw: {
          title: "القانون المطبق",
          description: "تخضع هذه الشروط والأحكام للقوانين التالية:",
          items: [
            "القوانين المعمول بها في المملكة العربية السعودية",
            "نظام التجارة الإلكترونية",
            "نظام حماية المستهلك",
            "نظام حماية البيانات الشخصية",
            "الأنظمة المتعلقة بحقوق الملكية الفكرية",
          ],
        },
        contactInfo: {
          title: "معلومات الاتصال",
          description: "للاستفسارات حول هذه الشروط والأحكام:",
          companyInfo: {
            companyName: "اسم الشركة: متجر أزالوف للكتب الرومانسية",
            address: "العنوان: [عنوان الشركة]",
            phone: "الهاتف: +966 XX XXX XXXX",
            email: "البريد الإلكتروني: legal@azalove.com",
            customerService: "خدمة العملاء: support@azalove.com",
            commercialRecord: "السجل التجاري: [رقم السجل التجاري]",
            taxNumber: "الرقم الضريبي: [الرقم الضريبي]",
          },
        },
        finalProvisions: {
          title: "الأحكام الختامية",
          items: [
            "إذا كان أي جزء من هذه الشروط غير قانوني، فإن باقي الشروط تبقى سارية",
            "عدم إنفاذ أي شرط لا يعني التنازل عن ذلك الشرط",
            "هذه الشروط تمثل الاتفاقية الكاملة بين الطرفين",
            "أي تنازل عن أي حق يجب أن يكون مكتوباً",
            "الترجمة الإنجليزية متاحة للمرجع فقط، النسخة العربية هي المعتمدة",
          ],
        },
        consentAcknowledgment: {
          title: "إقرار بالموافقة",
          description:
            "باستخدام موقع أزالوف للكتب الرومانسية وتقديم أي طلب شراء، فإنكم تقرون بأنكم قد قرأتم وفهمتم ووافقتم على جميع الشروط والأحكام المذكورة أعلاه. كما تقرون بأنكم تبلغون من العمر 18 عاماً أو أكثر وأنكم تملكون الأهلية القانونية للدخول في هذه الاتفاقية.",
        },
      },
    },
    promoBlock: {
      defaultTitle: "احصل على المزيد",
      defaultDiscountText: "تخفيضات -25%",
      defaultDescription: "عند الطلب بقيمة 500 جنيه مصري أو أكثر",
      defaultButtonText: "تسوق الان",
      defaultButtonLink: "#",
      defaultImageSrc: "/media/offer.png",
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
        cancel: "حذف",
      },
    },
    common: {
      loading: "جاري التحميل...",
      error: "حدث خطأ",
      notFound: "غير موجود",
      backToHome: "العودة للرئيسية",
      home: "الرئيسية",
      shop: "التسوق",
    },
    shop: {
      no_products_match_filters: "لا توجد منتجات تطابق الفلاتر المحددة",
      no_products_available: "لا توجد منتجات متاحة حاليًا",
      try_changing_filters: "جرب تغيير الفلاتر أو المراجعة لاحقًا",
      try_later_or_contact: "جرب المراجعة لاحقًا أو اتصل بنا للمساعدة",
    },
    error: {
      loading_products: "حدث خطأ أثناء تحميل المنتجات",
    },
    contact: {
      title: "اتصل بنا",
      subtitle: "معلومات الاتصال",
      contactInfo: "معلومات الاتصال",
      contactInfoDescription: "للتواصل معنا يمكنك استخدام أي من الطرق التالية:",
      breadcrumb: {
        home: "الرئيسية",
        contactUs: "اتصل بنا",
      },
      form: {
        name: "الاسم",
        namePlaceholder: "أدخل اسمك...",
        email: "البريد الإلكتروني",
        emailPlaceholder: "أدخل بريدك الإلكتروني...",
        phone: "رقم الهاتف",
        phonePlaceholder: "أدخل رقم هاتفك...",
        subject: "الموضوع",
        subjectPlaceholder: "أدخل الموضوع...",
        message: "الرسالة",
        messagePlaceholder: "أكتب رسالتك هنا...",
        submit: "إرسال الرسالة",
        sending: "جاري الإرسال...",
      },
      messages: {
        success: "تم إرسال رسالتك بنجاح!",
        successDescription: "تم إرسال رسالتك بنجاح. شكراً لك!",
        error: "فشل إرسال الرسالة",
        errorDescription:
          "حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.",
      },
    },
    cookiePolicy: {
      title: "سياسة ملفات تعريف الارتباط",
      lastUpdated: "آخر تحديث",
      breadcrumb: {
        home: "الرئيسية",
        cookiePolicy: "سياسة ملفات تعريف الارتباط",
      },
      sections: {
        introduction: {
          title: "مقدمة",
          content:
            "نحن في أزالوف نسعى لتوفير تجربة قراءة مميزة لعشاق الكتب الرومانسية من خلال موقعنا الإلكتروني. نستخدم ملفات تعريف الارتباط (الكوكيز) لتحسين تجربة التصفح وتخصيص المحتوى وفهم كيفية استخدام موقعنا. توضح هذه السياسة كيفية استخدامنا لملفات تعريف الارتباط وحقوقكم في إدارتها. نحن ملتزمون بحماية خصوصيتكم وشفافية استخدام بياناتكم.",
        },
        whatAreCookies: {
          title: "ما هي ملفات تعريف الارتباط؟",
          content:
            "ملفات تعريف الارتباط هي ملفات نصية صغيرة تُحفظ على جهازكم عندما تزورون موقعنا. تساعدنا هذه الملفات على:",
          benefits: [
            "تذكر تفضيلاتكم في القراءة والكتب المفضلة",
            "الحفاظ على محتويات سلة التسوق بين الزيارات",
            "تسجيل الدخول التلقائي لحسابكم",
            "تحليل استخدام الموقع لتحسين الخدمات",
            "عرض إعلانات مخصصة للكتب الرومانسية",
            "تقديم توصيات كتب مناسبة لأذواقكم",
          ],
        },
        cookieTypes: {
          title: "أنواع ملفات تعريف الارتباط",
          essential: {
            title: "الكوكيز الأساسية (ضرورية)",
            description: "ضرورية لتشغيل الموقع بشكل صحيح ولا يمكن إيقافها:",
            items: [
              "كوكيز الأمان وحماية الموقع",
              "كوكيز جلسة تسجيل الدخول",
              "كوكيز سلة التسوق والدفع",
              "كوكيز تفضيلات اللغة",
              "كوكيز الموافقة على الخصوصية",
            ],
          },
          performance: {
            title: "كوكيز الأداء والتحليلات",
            description: "تساعدنا على فهم كيفية تفاعلكم مع الموقع:",
            items: [
              "Google Analytics لتحليل الزيارات",
              "إحصائيات الصفحات الأكثر زيارة",
              "تتبع الكتب الأكثر مشاهدة",
              "قياس أداء الموقع وسرعة التحميل",
              "تحليل مسار المستخدم في الموقع",
            ],
          },
          functional: {
            title: "كوكيز الوظائف",
            description: "تحسن تجربة التصفح وتخصيص المحتوى:",
            items: [
              "تذكر تفضيلات عرض الكتب",
              "حفظ قائمة الكتب المفضلة",
              "تذكر إعدادات الخط وحجم النص",
              "تخصيص لوحة المعلومات الشخصية",
              "حفظ عوامل التصفية والبحث",
            ],
          },
          marketing: {
            title: "كوكيز التسويق والإعلان",
            description: "تساعدنا في عرض إعلانات مناسبة لاهتماماتكم:",
            items: [
              "إعلانات مخصصة للكتب الرومانسية",
              "توصيات الكتب بناءً على تاريخ التصفح",
              "إعلانات المؤلفين والإصدارات الجديدة",
              "عروض خاصة وخصومات مخصصة",
              "تتبع فعالية الحملات الإعلانية",
            ],
          },
        },
        thirdParty: {
          title: "كوكيز الأطراف الثالثة",
          content: "نستخدم خدمات من أطراف ثالثة قد تضع كوكيز على موقعنا:",
          googleAnalytics: {
            title: "Google Analytics",
            items: [
              "تحليل إحصائيات الزيارات",
              "فهم سلوك المستخدمين",
              "تحسين أداء الموقع",
              "يمكن إيقافها من إعدادات المتصفح",
            ],
          },
          socialMedia: {
            title: "منصات التواصل الاجتماعي",
            items: [
              "Facebook وInstagram للمشاركة",
              "تسجيل الدخول عبر الحسابات الاجتماعية",
              "عرض المحتوى المتعلق بالكتب",
              "التفاعل مع منشورات الكتب",
            ],
          },
          paymentServices: {
            title: "خدمات الدفع",
            items: [
              "PayPal وApple Pay",
              "البطاقات الائتمانية",
              "محافظ رقمية محلية",
              "تشفير معلومات الدفع",
            ],
          },
        },
        howWeUse: {
          title: "كيف نستخدم الكوكيز",
          shopping: {
            title: "تحسين تجربة التسوق:",
            items: [
              "حفظ الكتب في سلة التسوق",
              "تذكر تفضيلات الدفع",
              "عرض الكتب المشاهدة مؤخراً",
              "توصيات كتب مخصصة",
            ],
          },
          personalization: {
            title: "تخصيص المحتوى:",
            items: [
              "عرض كتب حسب اهتماماتكم",
              "تخصيص الصفحة الرئيسية",
              "إشعارات الكتب الجديدة",
              "عروض خاصة مخصصة",
            ],
          },
          analytics: {
            title: "تحليل الأداء:",
            items: [
              "قياس شعبية الكتب",
              "تحليل معدل التحويل",
              "فهم تفضيلات القراء",
              "تحسين محرك البحث",
            ],
          },
        },
        management: {
          title: "إدارة الكوكيز",
          websiteSettings: {
            title: "إعدادات الموقع:",
            items: [
              "مركز إعدادات الخصوصية في حسابكم",
              "تحكم في أنواع الكوكيز المقبولة",
              "إيقاف الكوكيز التسويقية",
              "حذف الكوكيز المحفوظة",
            ],
          },
          browserSettings: {
            title: "إعدادات المتصفح:",
            items: [
              "Chrome: الإعدادات الخصوصية والأمان",
              "Firefox: الإعدادات الخصوصية والأمان",
              "Safari: التفضيلات الخصوصية",
              "Edge: الإعدادات الخصوصية والخدمات",
            ],
          },
          impact: {
            title: "تأثير إيقاف الكوكيز:",
            items: [
              "فقدان محتويات سلة التسوق",
              "عدم تذكر تفضيلاتكم",
              "ضرورة تسجيل الدخول في كل زيارة",
              "عدم تخصيص توصيات الكتب",
            ],
          },
        },
        retention: {
          title: "مدة الاحتفاظ بالكوكيز",
          items: [
            "كوكيز الجلسة: تُحذف عند إغلاق المتصفح",
            "كوكيز دائمة: تبقى لمدة محددة (عادة سنة واحدة)",
            "كوكيز التحليلات: تُحذف بعد 26 شهراً",
            "كوكيز التسويق: تُحذف بعد 13 شهراً",
            "كوكيز التفضيلات: تُحذف بعد سنتين",
          ],
        },
        rights: {
          title: "حقوقكم وخياراتكم",
          yourRights: {
            title: "حقوقكم تشمل:",
            items: [
              "الموافقة على أو رفض الكوكيز",
              "حذف الكوكيز المحفوظة",
              "تعديل إعدادات الكوكيز",
              "الوصول إلى المعلومات المحفوظة",
              "سحب الموافقة في أي وقت",
            ],
          },
          controlOptions: {
            title: "خيارات التحكم:",
            items: [
              "قبول جميع الكوكيز",
              "قبول الكوكيز الضرورية فقط",
              "تخصيص أنواع الكوكيز المقبولة",
              "إيقاف الكوكيز التسويقية",
              "مراجعة الإعدادات بشكل دوري",
            ],
          },
        },
        children: {
          title: "الأطفال والكوكيز",
          content: "نحن لا نجمع عمداً معلومات من الأطفال دون سن 13 عاماً:",
          items: [
            "الموقع مخصص للبالغين",
            "الكتب الرومانسية للقراء الناضجين",
            "نطلب تأكيد العمر عند التسجيل",
            "نحذف فوراً أي بيانات للأطفال",
            "ننصح الأهالي بمراقبة استخدام الأطفال للإنترنت",
          ],
        },
        updates: {
          title: "تحديثات السياسة",
          content: "قد نحدث سياسة الكوكيز من وقت لآخر:",
          items: [
            "إشعار عبر البريد الإلكتروني بالتحديثات",
            "نشر التحديثات على الموقع",
            "إعطاء مهلة 30 يوماً قبل تطبيق التغييرات",
            "طلب موافقة جديدة إذا لزم الأمر",
            "الاحتفاظ بنسخة من السياسات السابقة",
          ],
        },
        compliance: {
          title: "الامتثال القانوني",
          content: "نلتزم بالقوانين واللوائح المحلية والدولية:",
          items: [
            "نظام حماية البيانات الشخصية السعودي",
            "اللائحة الأوروبية لحماية البيانات (GDPR)",
            "قانون خصوصية المستهلك في كاليفورنيا",
            "معايير الأمان الدولية",
            "أفضل الممارسات في حماية البيانات",
          ],
        },
        contact: {
          title: "التواصل معنا",
          content: "لأي استفسار حول ملفات تعريف الارتباط أو الخصوصية:",
          email: "البريد الإلكتروني: privacy@azalove.com",
          whatsapp: "واتساب: +966 XX XXX XXXX",
          dpo: "مسؤول حماية البيانات: dpo@azalove.com",
          address: "العنوان: [عنوان الشركة]",
          workingHours: "ساعات العمل: الأحد - الخميس، 9 صباحاً - 6 مساءً",
        },
      },
    },
    dashboard: {
      title: "لوحة التحكم",
      subtitle: "الأقسام",
      tabs: {
        profile: "الملف الشخصي",
        orders: "الطلبات",
        favorites: "المفضلة",
        cart: "عربة الشراء",
        addresses: "العناوين",
      },
    },
    maintenance: {
      loading: "جاري التحميل...",
      title: "الموقع قيد الصيانة",
      subtitle:
        "نعتذر عن الإزعاج، نقوم حالياً بتحديث وتحسين الموقع لخدمتك بشكل أفضل",
      messageCard: {
        title: "رسالة الصيانة",
        defaultMessage:
          "نقوم بإجراء تحديثات مهمة على الموقع لتحسين الأداء وإضافة ميزات جديدة. نتوقع العودة قريباً مع تجربة مستخدم محسنة!",
      },
      status: {
        estimatedTime: {
          title: "الوقت المتوقع",
          value: "2-4 ساعات",
        },
        maintenanceType: {
          title: "نوع الصيانة",
          value: "تحديث النظام",
        },
        contact: {
          title: "التواصل",
          value: "متاح للدعم",
        },
      },
      actions: {
        refreshPage: "تحديث الصفحة",
        backToHome: "العودة للرئيسية",
      },
      contactInfo: {
        title: "للتواصل والدعم",
        email: "البريد الإلكتروني:",
      },
    },
  },
  en: {
    auth: {
      login: {
        title: "Login",
        description: "Log in to access your account",
        email: "Email",
        emailPlaceholder: "Enter your email...",
        password: "Password",
        passwordPlaceholder: "Enter your password...",
        rememberMe: "Remember me",
        forgotPassword: "Forgot password?",
        loginButton: "Login",
        loading: "Loading...",
        noAccount: "Don't have an account?",
        createAccount: "Create new account",
      },
      register: {
        title: "Create New Account",
        description: "Create a new account to access all features",
        firstName: "First Name",
        firstNamePlaceholder: "Enter your first name...",
        lastName: "Last Name",
        lastNamePlaceholder: "Enter your last name...",
        email: "Email",
        emailPlaceholder: "Enter your email...",
        password: "Password",
        passwordPlaceholder: "Enter your password...",
        confirmPassword: "Confirm Password",
        confirmPasswordPlaceholder: "Re-enter your password...",
        agreeToTerms: "I agree to the Terms and Conditions",
        registerButton: "Create Account",
        loading: "Loading...",
        haveAccount: "Have an account?",
        signIn: "Sign In",
      },
      social: {
        orSignInWith: "Or sign in with",
        google: "Google",
        facebook: "Facebook",
      },
      messages: {
        loginSuccess: "Login successful!",
        loginSuccessDescription: "Login successful. Welcome back!",
        loginFailed: "Login failed",
        loginFailedDescription: "Incorrect email or password.",
        registerSuccess: "Account created successfully!",
        registerSuccessDescription: "Account created successfully. Welcome!",
        registerFailed: "Account creation failed",
        registerFailedDescription:
          "Email already in use or passwords do not match.",
      },
    },
    invoice: {
      title: "Invoice",
      description: "Invoice Details",
      invoiceNumber: "Invoice Number",
      date: "Invoice Date",
      paymentMethod: "Payment Method",
      amountDue: "Amount Due",
      billTo: "Bill To",
      billFrom: "Bill From",
      items: "Items",
      quantity: "Quantity",
      price: "Price",
      totalAmount: "Total Amount",
      subtotal: "Subtotal",
      tax: "Tax",
      total: "Total",
      thankYou: "Thank You",
      thankYouMessage:
        "We hope you have a wonderful day filled with love and happiness.",
      footer: {
        address: "Bill From Address",
        email: "Bill From Email",
        phone: "Bill From Phone",
        website: "Bill From Website",
      },
    },
    blog: {
      relatedPosts: "Related Posts",
      notFound: "Post Not Found",
      notFoundDescription:
        "Sorry, we couldn't find the post you were looking for.",
      goBack: "Go Back",
      noProductsFound: "No products found",
      noProductsDescription: "Sorry, no products are available at the moment.",
      author: "Author",
      publishedOn: "Published on",
      categories: "Categories",
      readMore: "Read More",
      loading: "Loading...",
      error: "An error occurred",
      errorDescription: "An error occurred while loading the products.",
      home: "Home",
      blog: "Blog",
      loadError: "Error loading posts",
      loadErrorDescription:
        "Sorry, an error occurred while loading the posts. Please try again later.",
      reload: "Reload",
      noBlogsFound: "No blogs found currently",
      noBlogsDescription:
        "Please check back later or contact us for assistance",
      noFilteredBlogs: "No blogs match the specified filters",
      noFilteredBlogsDescription:
        "Please try changing the filters or check back later",
      tryLater: "Please try again later",
      contactUs: "Contact us for assistance",
      showingResults: "Showing",
      noResults: "No results",
      of: "of",
      results: "results",
      categoryLoadError: "Error loading posts",
      categoryLoadErrorDescription:
        "Sorry, an error occurred while loading the posts. Please try again later.",
      noCategoryBlogs: "No blogs found currently",
      noCategoryBlogsDescription:
        "Please check back later or contact us for assistance",
      categoryArticles: "Category Articles",
    },
    categories: {
      latestCategories: "Latest Categories",
      errorLoadingCategories: "Error loading categories",
      noCategoriesFound: "No categories found currently",
      categories: "Categories",
      category: "Category",
      viewCategory: "View Category",
      exploreCategories: "Explore Categories",
      shopNow: "Shop Now",
    },
    checkout: {
      title: "Checkout",
      subtitle: "Secure Checkout",
      secureCheckout: "Confirm Payment",
      steps: {
        shipping: "Shipping",
        shippingDescription: "Choose shipping method and delivery address",
        payment: "Payment",
        paymentDescription: "Choose payment method and confirm order",
        confirmation: "Confirmation",
        confirmationDescription: "Complete order details and payment",
      },
      shipping: {
        title: "Shipping Address",
        subtitle: "Choose a saved address or add a new one",
        chooseShippingAddress: "Choose a saved address",
        useNewAddress: "Add a new address",
        shippingInfo: "Shipping Information",
        useSavedAddress: "Use a saved address",
        noSavedAddresses: "No saved addresses",
        noSavedAddressesDescription: "Add a new address to use it next time",
        addNewAddress: "Add New Address",
        loadingAddresses: "Loading addresses...",
        errorLoadingAddresses: "Error loading addresses",
        email: "Email",
        firstName: "First Name",
        lastName: "Last Name",
        address: "Address",
        city: "City",
        postalCode: "Postal Code",
        country: "Country",
        phoneNumber: "Phone Number",
        default: "Default",
        back: "Back",
        continueToPayment: "Proceed to Payment",
        continueToPaymentButton: "Confirm Payment",
      },
      payment: {
        title: "Payment Details",
        subtitle: "Choose payment method and confirm order",
        cardNumber: "Card Number",
        cardNumberPlaceholder: "Enter card number...",
        expiryDate: "Expiry Date",
        expiryDatePlaceholder: "Enter expiry date...",
        cvv: "CVV",
        cvvPlaceholder: "Enter CVV...",
        cardholderName: "Cardholder Name",
        cardholderNamePlaceholder: "Enter cardholder name...",
        billingAddress: "Billing Address",
        sameAsShipping: "Same as Shipping Address",
        differentBillingAddress: "Different Billing Address",
        back: "Back",
        confirmPayment: "Confirm Payment",
        processing: "Processing...",
        secureCardInformation: "Secure Card Information",
      },
      confirmation: {
        title: "Order Confirmation",
        subtitle: "Complete order details and payment",
        orderConfirmed: "Order confirmed successfully!",
        orderConfirmedDescription: "Order confirmed successfully. Thank you!",
        orderNumber: "Order Number",
        estimatedDelivery: "Estimated Delivery",
        thankYou: "Thank You",
        thankYouMessage:
          "We hope you have a wonderful day filled with love and happiness.",
        continueShopping: "Continue Shopping",
        viewOrder: "View Order",
        orderDetails: "Order Details",
        orderDate: "Order Date",
        whatsNext: "What's next?",
        orderConfirmationEmailSent:
          "Order confirmation email sent to your email.",
        orderProcessedWithin24Hours: "Order processed within 24 hours.",
        trackingInfoSentViaEmail: "Tracking information sent to your email.",
        downloadReceipt: "Download Receipt",
      },
    },
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
        cancel: "Delete",
      },
    },
    common: {
      loading: "Loading...",
      error: "An error occurred",
      notFound: "Not found",
      backToHome: "Back to home",
      home: "Home",
      shop: "Shop",
    },
    shop: {
      no_products_match_filters: "No products match the specified filters",
      no_products_available: "No products available currently",
      try_changing_filters: "Try changing the filters or check back later",
      try_later_or_contact:
        "Try checking back later or contact us for assistance",
    },
    error: {
      loading_products: "An error occurred while loading products",
    },
    contact: {
      title: "Contact Us",
      subtitle: "Contact Information",
      contactInfo: "Contact Information",
      contactInfoDescription:
        "For contact, you can use any of the following methods:",
      breadcrumb: {
        home: "Home",
        contactUs: "Contact Us",
      },
      form: {
        name: "Name",
        namePlaceholder: "Enter your name...",
        email: "Email",
        emailPlaceholder: "Enter your email...",
        phone: "Phone Number",
        phonePlaceholder: "Enter your phone number...",
        subject: "Subject",
        subjectPlaceholder: "Enter subject...",
        message: "Message",
        messagePlaceholder: "Write your message here...",
        submit: "Send Message",
        sending: "Sending...",
      },
      messages: {
        success: "Your message has been sent successfully!",
        successDescription:
          "Your message has been sent successfully. Thank you!",
        error: "Failed to send message",
        errorDescription:
          "An error occurred while sending the message. Please try again.",
      },
    },
    cookiePolicy: {
      title: "Cookie Policy",
      lastUpdated: "Last updated",
      breadcrumb: {
        home: "Home",
        cookiePolicy: "Cookie Policy",
      },
      sections: {
        introduction: {
          title: "Introduction",
          content:
            "At Azalove, we strive to provide an exceptional reading experience for romance book lovers through our website. We use cookies to improve browsing experience, personalize content, and understand how our site is used. This policy explains how we use cookies and your rights to manage them. We are committed to protecting your privacy and transparency in using your data.",
        },
        whatAreCookies: {
          title: "What are Cookies?",
          content:
            "Cookies are small text files stored on your device when you visit our website. These files help us:",
          benefits: [
            "Remember your reading preferences and favorite books",
            "Maintain shopping cart contents between visits",
            "Automatic login to your account",
            "Analyze site usage to improve services",
            "Display personalized ads for romance books",
            "Provide book recommendations suitable for your tastes",
          ],
        },
        cookieTypes: {
          title: "Types of Cookies",
          essential: {
            title: "Essential Cookies (Required)",
            description:
              "Necessary for the website to function properly and cannot be disabled:",
            items: [
              "Security and site protection cookies",
              "Login session cookies",
              "Shopping cart and payment cookies",
              "Language preference cookies",
              "Privacy consent cookies",
            ],
          },
          performance: {
            title: "Performance and Analytics Cookies",
            description: "Help us understand how you interact with the site:",
            items: [
              "Google Analytics for visit analysis",
              "Most visited page statistics",
              "Most viewed books tracking",
              "Site performance and loading speed measurement",
              "User path analysis on the site",
            ],
          },
          functional: {
            title: "Functional Cookies",
            description:
              "Improve browsing experience and content personalization:",
            items: [
              "Remember book display preferences",
              "Save favorite books list",
              "Remember font and text size settings",
              "Personalize personal dashboard",
              "Save filters and search factors",
            ],
          },
          marketing: {
            title: "Marketing and Advertising Cookies",
            description: "Help us display ads suitable for your interests:",
            items: [
              "Personalized ads for romance books",
              "Book recommendations based on browsing history",
              "Author and new release ads",
              "Special offers and personalized discounts",
              "Track advertising campaign effectiveness",
            ],
          },
        },
        thirdParty: {
          title: "Third-Party Cookies",
          content:
            "We use services from third parties that may place cookies on our site:",
          googleAnalytics: {
            title: "Google Analytics",
            items: [
              "Analyze visit statistics",
              "Understand user behavior",
              "Improve site performance",
              "Can be disabled from browser settings",
            ],
          },
          socialMedia: {
            title: "Social Media Platforms",
            items: [
              "Facebook and Instagram for sharing",
              "Login through social accounts",
              "Display book-related content",
              "Interact with book posts",
            ],
          },
          paymentServices: {
            title: "Payment Services",
            items: [
              "PayPal and Apple Pay",
              "Credit cards",
              "Local digital wallets",
              "Payment information encryption",
            ],
          },
        },
        howWeUse: {
          title: "How We Use Cookies",
          shopping: {
            title: "Improve Shopping Experience:",
            items: [
              "Save books in shopping cart",
              "Remember payment preferences",
              "Display recently viewed books",
              "Personalized book recommendations",
            ],
          },
          personalization: {
            title: "Content Personalization:",
            items: [
              "Display books according to your interests",
              "Personalize homepage",
              "New book notifications",
              "Personalized special offers",
            ],
          },
          analytics: {
            title: "Performance Analysis:",
            items: [
              "Measure book popularity",
              "Analyze conversion rates",
              "Understand reader preferences",
              "Improve search engine",
            ],
          },
        },
        management: {
          title: "Cookie Management",
          websiteSettings: {
            title: "Website Settings:",
            items: [
              "Privacy settings center in your account",
              "Control accepted cookie types",
              "Disable marketing cookies",
              "Delete saved cookies",
            ],
          },
          browserSettings: {
            title: "Browser Settings:",
            items: [
              "Chrome: Privacy and Security Settings",
              "Firefox: Privacy and Security Settings",
              "Safari: Privacy Preferences",
              "Edge: Privacy and Services Settings",
            ],
          },
          impact: {
            title: "Impact of Disabling Cookies:",
            items: [
              "Loss of shopping cart contents",
              "Not remembering your preferences",
              "Need to login on every visit",
              "No personalized book recommendations",
            ],
          },
        },
        retention: {
          title: "Cookie Retention Period",
          items: [
            "Session cookies: Deleted when browser is closed",
            "Persistent cookies: Remain for a specified period (usually one year)",
            "Analytics cookies: Deleted after 26 months",
            "Marketing cookies: Deleted after 13 months",
            "Preference cookies: Deleted after two years",
          ],
        },
        rights: {
          title: "Your Rights and Options",
          yourRights: {
            title: "Your rights include:",
            items: [
              "Consent to or reject cookies",
              "Delete saved cookies",
              "Modify cookie settings",
              "Access saved information",
              "Withdraw consent at any time",
            ],
          },
          controlOptions: {
            title: "Control options:",
            items: [
              "Accept all cookies",
              "Accept only essential cookies",
              "Customize accepted cookie types",
              "Disable marketing cookies",
              "Review settings periodically",
            ],
          },
        },
        children: {
          title: "Children and Cookies",
          content:
            "We do not knowingly collect information from children under 13:",
          items: [
            "Site is intended for adults",
            "Romance books for mature readers",
            "We request age confirmation upon registration",
            "We immediately delete any children's data",
            "We advise parents to monitor children's internet use",
          ],
        },
        updates: {
          title: "Policy Updates",
          content: "We may update our cookie policy from time to time:",
          items: [
            "Email notification of updates",
            "Publish updates on the website",
            "Give 30-day notice before applying changes",
            "Request new consent if necessary",
            "Keep copies of previous policies",
          ],
        },
        compliance: {
          title: "Legal Compliance",
          content:
            "We comply with local and international laws and regulations:",
          items: [
            "Saudi Personal Data Protection Law",
            "European Data Protection Regulation (GDPR)",
            "California Consumer Privacy Act",
            "International security standards",
            "Best practices in data protection",
          ],
        },
        contact: {
          title: "Contact Us",
          content: "For any inquiries about cookies or privacy:",
          email: "Email: privacy@azalove.com",
          whatsapp: "WhatsApp: +966 XX XXX XXXX",
          dpo: "Data Protection Officer: dpo@azalove.com",
          address: "Address: [Company Address]",
          workingHours: "Working Hours: Sunday - Thursday, 9 AM - 6 PM",
        },
      },
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
      beFirstToShare:
        "Be the first to share your experience with this product!",
      shareExperience: "Share Your Experience",
      helpOthersDiscover:
        "Help others discover this amazing product by sharing your thoughts",
      yourRating: "Your Rating",
      yourReview: "Your Review",
      submitReview: "Submit Review",
      cancel: "Delete",
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
      faq: "FAQ",
    },
    products: {
      error: {
        title: "Error Loading Products",
        description:
          "We encountered a problem while loading products. Please refresh the page or contact technical support if the problem persists.",
      },
      noProducts: {
        title: "No Products Available",
        description:
          "There are no products in this category at the moment. Check back later or explore other categories to discover beautiful love stories.",
      },
    },
    relatedBooks: {
      loading: "Finding books for you...",
      title: "Books Related to Your Preferences",
      noBooksFound:
        "No books found matching your preferences. Try adjusting your selections.",
    },
    returnRefund: {
      breadcrumb: {
        home: "Home",
        title: "Return & Refund Policy",
      },
      title: "Return & Refund Policy",
      lastUpdated: "Last Updated",
      sections: {
        introduction:
          "At Azalove, we strive to enrich your library with the most beautiful love and romance stories. This return and refund policy outlines your rights to return romance books and receive refunds. We are committed to providing an exceptional reading experience and offer an easy and fair return and refund process for all our romance literature lovers.",
        returnPeriod: {
          title: "Return Period",
          description:
            "You have the right to return romance books within the following periods:",
          items: {
            paperBooks: "Paper Books: 30 days from receipt date",
            illustratedBooks:
              "Illustrated Books & Graphic Novels: 21 days from receipt date",
            bookSets: "Book Sets: 30 days from receipt date",
            importedBooks: "Imported Books: 14 days from receipt date",
            rareBooks: "Rare & Limited Books: 7 days from receipt date",
          },
          note: "Note: The return period is calculated from the book receipt date, not the purchase date.",
        },
        returnConditions: {
          title: "Return Conditions",
          description:
            "To ensure acceptance of your romance book return request, the following conditions must be met:",
          items: [
            "The book must be in its original condition without damage",
            "No tears or writing on book pages",
            "Retain original cover and bookmarks if present",
            "No folded or creased pages",
            "Provide proof of purchase (invoice or order number)",
            "Book unread or partially read only",
            'Book in "new" or "very good" condition',
          ],
        },
        nonReturnable: {
          title: "Non-Returnable Books",
          description:
            "The following books are not returnable for special reasons:",
          items: [
            "Downloaded digital books (PDF, ePub)",
            "Author-signed books",
            "Personalized books with names",
            "Books damaged due to misuse",
            "Books purchased in final clearance sales",
            "Fully read books",
            "Books past the return period",
            "Gift cards and book vouchers",
          ],
        },
        returnProcess: {
          title: "Return Process",
          steps: {
            title: "Book Return Steps:",
            items: [
              "Log into your Azalove account",
              'Go to "My Library" or "My Orders" section',
              "Select the book to return",
              'Click "Request Book Return"',
              "Fill out the return form with return reason",
              "Take a photo of the book showing its condition",
              "Pack the book in protective packaging",
              "Use the free return label",
              "Send the book via mail or shipping company",
            ],
          },
          tips: {
            title: "Book Protection Tips:",
            items: [
              "Use bubble wrap or sturdy cardboard",
              "Place book in plastic bag to protect from moisture",
              "Avoid folding or pressing the package",
              "You'll receive a tracking number for your return",
              "Processing takes 2-3 business days from receipt",
            ],
          },
        },
        returnCosts: {
          title: "Return Costs",
          description: "Book return shipping costs:",
          items: {
            freeReturn: "Free Return: In case of printing or binding defects",
            returnFees: "Return Fees: 15 SAR for individual books",
            reducedFees: "Reduced Fees: 25 SAR for book sets",
            specialOffer:
              "Special Offer: Free return for first 3 books for each new customer.",
          },
        },
        refunds: {
          title: "Refunds",
          methods: {
            title: "Refund Methods:",
            items: [
              "Refund to original payment method",
              "Credit in Azalove site for romance books",
              "Gift card for new book purchases",
              "Donate book value to public library (optional)",
            ],
          },
          timelines: {
            title: "Refund Timelines:",
            items: {
              creditCards: "Credit Cards: 3-7 business days",
              prepaidCards: "Prepaid Cards: 2-5 business days",
              digitalWallets: "Digital Wallets: 1-2 business days",
              siteCredit: "Site Credit: Immediate after book inspection",
              giftCards: "Gift Cards: Immediate after processing",
            },
          },
        },
        replacement: {
          title: "Replacement",
          description:
            "We provide book replacement service in the following cases:",
          items: [
            "Replace damaged or defective printing books",
            "Replace book with newer edition from same author",
            "Replace book with another part of same series",
            "Replace book with another book of same price category",
            "Replace regular edition with premium edition (with price difference)",
          ],
          benefits:
            "Replacement Benefits: Free shipping for replacement book, and free consultation to choose romance books that suit your taste.",
        },
        specialCases: {
          title: "Special Cases",
          defective: {
            title: "Defective Books:",
            items: [
              "Immediate return with full refund",
              "Free shipping for replacement book",
              "Free additional book as apology",
              "Priority access to new releases",
            ],
          },
          wrongOrders: {
            title: "Wrong Orders:",
            items: [
              "Free return with full refund",
              "Send correct book for free",
              "20% discount on next orders",
              "Free membership to reading club",
            ],
          },
        },
        tracking: {
          title: "Return Tracking",
          description: "You can track your book return status through:",
          items: [
            '"My Library" section in your account',
            '"Return Requests" section',
            "Email notifications",
            "App alerts",
            "Live chat with customer service",
            "Book reviews and customer ratings",
          ],
        },
        giftReturns: {
          title: "Gift Book Returns",
          description: "For romance books gifted from our site:",
          items: [
            "Gifted books can be returned within 45 days",
            "Refund as credit in Azalove site",
            "Book can be replaced with another book for free",
            "Gifter can request financial refund",
            "New gift card of same value",
            "Free gift wrapping for replacement book",
          ],
        },
        contact: {
          title: "Contact Us",
          description:
            "For any inquiries about romance book returns, please contact us:",
          items: {
            email: "Email: books@azalove.com",
            whatsapp: "WhatsApp: +966 XX XXX XXXX",
            liveChat: "Live Chat: Available from 9 AM to 11 PM",
            readingConsultations: "Reading Consultations: Available 24/7",
            bookClub: "Book Club: Weekly sessions to discuss books",
          },
        },
      },
    },
    dashboard: {
      title: "Dashboard",
      subtitle: "Tabs",
      tabs: {
        profile: "Profile",
        orders: "Orders",
        favorites: "Favorites",
        cart: "Cart",
        addresses: "Addresses",
      },
    },
    shippingDelivery: {
      breadcrumb: {
        home: "Home",
        title: "Shipping & Delivery Policy",
      },
      title: "Shipping & Delivery Policy",
      lastUpdated: "Last Updated",
      sections: {
        introduction:
          "At Azalove, we strive to deliver the most beautiful love and romance stories to your doorstep as quickly as possible with the highest quality. This shipping and delivery policy outlines all details related to delivering romance books, from shipping schedules to delivery costs. We are committed to protecting your books during transit and ensuring they arrive in perfect condition for you to enjoy reading.",
        deliveryAreas: {
          title: "Delivery Areas",
          domestic: {
            title: "Within Saudi Arabia:",
            items: {
              riyadh: "Riyadh: Fast delivery within 24-48 hours",
              jeddahMecca: "Jeddah and Mecca: 2-3 business days",
              dammamKhobar: "Dammam and Khobar: 2-3 business days",
              medina: "Medina: 2-3 business days",
              otherRegions: "Other regions: 3-5 business days",
              remoteAreas: "Remote areas: 5-7 business days",
            },
          },
          international: {
            title: "Outside Saudi Arabia:",
            items: {
              gccCountries: "GCC Countries: 5-7 business days",
              arabCountries: "Arab Countries: 7-14 business days",
              worldwide: "Worldwide: 14-21 business days",
            },
          },
        },
        shippingTimes: {
          title: "Shipping Times",
          processing: {
            title: "Processing Times:",
            items: {
              availableBooks: "Available Books: 1-2 business days",
              importedBooks: "Imported Books: 3-5 business days",
              rareBooks: "Rare Books: 5-10 business days",
              bookSets: "Book Sets: 2-3 business days",
              customBooks: "Custom Books: 7-14 business days",
            },
          },
          workingDays: {
            title: "Working Days:",
            description:
              "We process orders from Sunday to Thursday, 9 AM to 6 PM. Orders submitted after 3 PM on Thursday will be processed on the following Sunday.",
          },
        },
        shippingCosts: {
          title: "Shipping Costs",
          domestic: {
            title: "Within Saudi Arabia:",
            items: {
              freeShipping: "Free Shipping: For orders over 150 SAR",
              standardShipping: "Standard Shipping: 25 SAR (2-3 days)",
              expressShipping: "Express Shipping: 35 SAR (24-48 hours)",
              urgentShipping: "Urgent Shipping: 50 SAR (same day in Riyadh)",
              bookClubMembers: "Book Club Members: Always free shipping",
            },
          },
          international: {
            title: "Outside Saudi Arabia:",
            items: {
              gccCountries: "GCC Countries: 45 SAR",
              arabCountries: "Arab Countries: 65 SAR",
              worldwide: "Worldwide: 85 SAR",
              freeShipping: "Free Shipping: For orders over 500 SAR",
            },
          },
        },
        shippingMethods: {
          title: "Shipping Methods",
          partners: {
            title: "Shipping Partners:",
            items: {
              expressShipping: "Express Shipping: Aramex",
              standardShipping: "Standard Shipping: Saudi Post",
              localShipping: "Local Shipping: SMSA",
              internationalShipping: "International Shipping: DHL",
            },
          },
          deliveryOptions: {
            title: "Delivery Options:",
            items: {
              homeDelivery: "Home Delivery: To your door",
              officeDelivery: "Office Delivery: During business hours",
              pickupPoints: "Pickup Points: From shipping company branches",
              personalPickup:
                "Personal Pickup: From company location (by appointment)",
            },
          },
        },
        packaging: {
          title: "Packaging and Protection",
          description:
            "We ensure your romance books are protected with the best packaging methods:",
          items: [
            "Shock-resistant bubble wrap",
            "Reinforced cardboard boxes designed for books",
            "Protection from moisture and weather elements",
            '"Fragile - Please Handle with Care" labels',
            "Protective separators between multiple books",
            "Free gift wrapping for special occasions",
            "Personal messages with gifted books",
          ],
        },
        tracking: {
          title: "Order Tracking",
          howToTrack: {
            title: "How to track your order:",
            steps: [
              "Log into your Azalove account",
              'Go to "My Orders" section',
              "Click on the order number",
              "Follow shipping and delivery status",
              "Receive instant notifications via SMS",
            ],
          },
          orderStatuses: {
            title: "Order Statuses:",
            items: {
              processing: "Processing: Order is being prepared",
              preparing: "Preparing: Books are being prepared for shipping",
              shipped: "Shipped: Order is on its way to you",
              outForDelivery: "Out for Delivery: Will arrive today",
              delivered: "Delivered: Successfully arrived",
            },
          },
        },
        freeDelivery: {
          title: "Free Delivery Offers",
          description: "Enjoy free delivery in the following cases:",
          items: [
            "Orders over 150 SAR within Saudi Arabia",
            "Orders over 500 SAR outside Saudi Arabia",
            "Premium Book Club members",
            "Orders during Love Month (February)",
            "Weekend offers (Friday and Saturday)",
            "Recurring orders (more than 5 books monthly)",
            "New customers (first 3 orders)",
          ],
        },
        fastDelivery: {
          title: "Fast Delivery",
          sameDay: {
            title: "Same Day Delivery Service:",
            items: [
              "Available in Riyadh only",
              "For orders placed before 12 PM",
              "Additional fee of 50 SAR",
              "Free for orders over 300 SAR",
            ],
          },
          eveningDelivery: {
            title: "Evening Delivery Service:",
            items: [
              "Delivery from 6 PM to 10 PM",
              "Perfect for working professionals and students",
              "Additional fee of 25 SAR",
              "Appointment must be scheduled in advance",
            ],
          },
        },
        recipientUnavailable: {
          title: "Recipient Unavailable",
          description: "If recipient is unavailable during delivery:",
          items: [
            "A notification card will be left",
            "Call to registered number",
            "Free redelivery attempt (once)",
            "Order held at nearest pickup point",
            "Notification via SMS and email",
            "7-day pickup deadline before return",
          ],
        },
        specialOrders: {
          title: "Special Orders",
          rareBooks: {
            title: "Rare and Limited Books:",
            items: [
              "Free and fully insured shipping",
              "Special shock-resistant packaging",
              "Detailed tracking with continuous notifications",
              "Photo documentation before and after shipping",
            ],
          },
          giftBooks: {
            title: "Gifted Books:",
            items: [
              "Elegant free gift wrapping",
              "Personal messages written in beautiful handwriting",
              "Custom delivery timing for occasions",
              "Hide prices from invoices",
            ],
          },
        },
        deliveryProblems: {
          title: "Delivery Problems",
          delays: {
            title: "In case of delivery delays:",
            items: [
              "Immediate notification of delay reason",
              "50% discount on shipping fees",
              "Free additional book as apology",
              "Priority in next orders",
            ],
          },
          damages: {
            title: "In case of book damage:",
            items: [
              "Immediate free replacement",
              "Full shipping cost coverage",
              "Appropriate compensation based on book value",
              "Improved packaging methods",
            ],
          },
        },
        customerTips: {
          title: "Customer Tips",
          description: "To ensure an exceptional delivery experience:",
          items: [
            "Verify delivery address accuracy",
            "Provide reachable phone number",
            "Specify best delivery time",
            "Request office delivery if not home",
            "Join reading club for additional benefits",
            "Track order status via app",
            "Contact us immediately upon order receipt",
          ],
        },
        contact: {
          title: "Contact Us",
          description:
            "For any shipping and delivery inquiries, please contact us:",
          items: {
            email: "Email: shipping@azalove.com",
            whatsapp: "WhatsApp: +966 XX XXX XXXX",
            customerService: "Customer Service: Available 9 AM to 9 PM",
            emergency: "Emergency: Available 24/7 for urgent orders",
            tracking: "Order Tracking: Available on website and app",
          },
        },
      },
    },
    termsAndConditions: {
      breadcrumb: {
        home: "Home",
        title: "Terms and Conditions",
      },
      title: "Terms and Conditions",
      lastUpdated: "Last Updated",
      sections: {
        introduction:
          "Welcome to Azalove e-commerce website. These terms and conditions govern your use of our website and the services provided through it. By using our website, you agree to comply with these terms and conditions. If you do not agree to any part of these terms, please do not use our website.",
        definitions: {
          title: "Definitions",
          items: {
            website: "Website: Refers to the Azalove website",
            user: "User: Any person who uses or accesses the website",
            services: "Services: All services provided through the website",
            content:
              "Content: All texts, images, and information displayed on the website",
          },
        },
        websiteUsage: {
          title: "Website Usage",
          description:
            "You are allowed to use this website for personal and legitimate commercial purposes only. You are prohibited from:",
          prohibited: [
            "Using the website for any illegal or unauthorized purpose",
            "Publishing or transmitting any harmful or offensive content",
            "Violating intellectual property rights of any third party",
            "Attempting unauthorized access to website systems",
            "Using the website to send unsolicited messages",
          ],
        },
        accounts: {
          title: "Accounts and Registration",
          description:
            "To use some website services, you may need to create an account. When creating an account, you must:",
          requirements: [
            "Provide accurate and complete information",
            "Maintain confidentiality of login information",
            "Notify us immediately of any unauthorized use of your account",
            "Update your personal information when needed",
          ],
        },
        orders: {
          title: "Orders and Payments",
          description: "When placing an order through our website:",
          items: [
            "All orders are subject to availability confirmation and acceptance",
            "Displayed prices include VAT",
            "We reserve the right to reject any order for any reason",
            "Payment is required before order processing",
            "We accept various payment methods displayed on the website",
          ],
        },
        shipping: {
          title: "Shipping and Delivery",
          description: "Shipping and delivery information:",
          items: [
            "We ship to addresses specified in Saudi Arabia",
            "Delivery times vary by location and product",
            "Shipping fees are calculated at checkout",
            "Customer is responsible for providing correct delivery address",
            "We reserve the right to change shipping companies",
          ],
        },
        returns: {
          title: "Returns and Exchanges",
          description: "Return and exchange policy:",
          items: [
            "Products can be returned within 14 days of receipt",
            "Products must be in their original condition",
            "Some products may not be returnable",
            "Return fees may apply depending on condition",
            "Refunds are processed within 5-7 business days",
          ],
        },
        intellectualProperty: {
          title: "Intellectual Property",
          description:
            "All content on this website, including texts, images, logos, and designs, is protected by copyright and intellectual property rights. No content may be copied, distributed, or modified without prior written permission.",
        },
        privacy: {
          title: "Privacy",
          description:
            "We are committed to protecting your privacy. Your personal information is used only to provide our services and improve your experience. We do not share your information with third parties except with your consent or when legally necessary. Please review the privacy policy for more details.",
        },
        disclaimer: {
          title: "Disclaimer",
          description:
            'The website and services are provided "as is" without any warranties. We are not responsible for:',
          items: [
            "Any direct or indirect damages",
            "Loss of data or profits",
            "Service interruption or technical errors",
            "Third-party content",
            "Incorrect use of products",
          ],
        },
        governingLaw: {
          title: "Governing Law",
          description:
            "These terms and conditions are subject to the laws of Saudi Arabia. Any dispute arising from the use of this website is subject to the jurisdiction of Saudi courts.",
        },
        modifications: {
          title: "Modifications",
          description:
            "We reserve the right to modify these terms and conditions at any time. Modifications become effective immediately upon publication on the website. Your continued use of the website after modifications means you agree to the updated terms.",
        },
        contact: {
          title: "Contact",
          description:
            "If you have any questions about these terms and conditions, please contact us via:",
          items: {
            email: "Email: info@azalove.com",
            phone: "Phone: +966 XX XXX XXXX",
            address: "Address: Saudi Arabia",
          },
        },
      },
    },
    termsConditions: {
      breadcrumb: {
        home: "Home",
        title: "Terms and Conditions",
      },
      title: "Terms and Conditions",
      lastUpdated: "Last Updated",
      sections: {
        introduction:
          "Welcome to Azalove Romance Bookstore. These terms and conditions govern your use of our website and purchase of romance books from our store. By using our website or placing a purchase order, you agree to comply with these terms and conditions. We are committed to providing the best shopping experience for romance literature lovers while ensuring the rights of all parties.",
        definitions: {
          title: "Definitions",
          description:
            "In these terms and conditions, the following terms mean:",
          items: {
            azalove:
              '"Azalove" or "we" or "company": Azalove Romance Bookstore',
            customer:
              '"Customer" or "you": The person who uses the website or purchases our products',
            website: '"Website": Azalove\'s website and mobile application',
            products: '"Products": Romance books and related products',
            order: '"Order": Purchase order for products from our website',
            services: '"Services": All services provided through the website',
          },
        },
        acceptance: {
          title: "Acceptance of Terms",
          description: "By using our website, you agree to:",
          items: [
            "Comply with all mentioned terms and conditions",
            "Provide accurate and up-to-date information",
            "Use the website for legal purposes only",
            "Respect intellectual property rights",
            "Not misuse the services provided",
            "Comply with local and international laws",
          ],
        },
        productsServices: {
          title: "Products and Services",
          productTypes: {
            title: "Product Types:",
            items: [
              "Printed romance books",
              "Digital books (PDF, ePub)",
              "Romance audiobooks",
              "Book collections and novel series",
              "Rare books and limited editions",
              "Author-signed books",
            ],
          },
          additionalServices: {
            title: "Additional Services:",
            items: [
              "Personalized book recommendations",
              "Romance reading club",
              "Book reviews and ratings",
              "Gift wrapping",
              "Specialized customer service",
              "New release notifications",
            ],
          },
        },
        pricingPayment: {
          title: "Pricing and Payment",
          pricing: {
            title: "Pricing:",
            items: [
              "All prices are listed in Saudi Riyal",
              "Prices include VAT",
              "Prices may change without prior notice",
              "The applied price is the price at order confirmation",
              "Shipping fees are separate from book prices",
            ],
          },
          paymentMethods: {
            title: "Payment Methods:",
            items: [
              "Credit cards (Visa, Mastercard)",
              "Prepaid cards",
              "Digital wallets (Apple Pay, PayPal)",
              "Bank transfer",
              "Cash on delivery (in specified areas)",
            ],
          },
        },
        ordersConfirmation: {
          title: "Orders and Confirmation",
          orderProcess: {
            title: "Order Process:",
            items: [
              "Select books and add to shopping cart",
              "Review order and quantity",
              "Enter shipping and billing information",
              "Choose payment method",
              "Confirm order and payment",
              "Receive order confirmation message",
            ],
          },
          orderConfirmation: {
            title: "Order Confirmation:",
            items: [
              "Order confirmation will be sent within 24 hours",
              "Order can be cancelled before shipping",
              "We reserve the right to reject suspicious orders",
              "In case of book unavailability, you will be notified immediately",
            ],
          },
        },
        shippingDelivery: {
          title: "Shipping and Delivery",
          description:
            "Please review the shipping and delivery policy for complete details about:",
          items: [
            "Available delivery areas",
            "Expected delivery times",
            "Shipping costs",
            "Free shipping conditions",
            "Tracking and monitoring methods",
          ],
        },
        returnsRefunds: {
          title: "Returns and Refunds",
          description:
            "Please review the return and refund policy for detailed information about:",
          items: [
            "Allowed return periods",
            "Book return conditions",
            "Refund process",
            "Non-returnable books",
            "Return costs",
          ],
        },
        userAccounts: {
          title: "User Accounts",
          accountCreation: {
            title: "Account Creation:",
            items: [
              "Must provide accurate and correct information",
              "Must be 18 years or older",
              "Responsibility to maintain password confidentiality",
              "Notify us immediately in case of unauthorized use",
            ],
          },
          accountUsage: {
            title: "Account Usage:",
            items: [
              "Account cannot be shared with others",
              "Update information when needed",
              "Comply with store policies",
              "Company's right to suspend violating accounts",
            ],
          },
        },
        intellectualProperty: {
          title: "Intellectual Property Rights",
          websiteContent: {
            title: "Website Content:",
            items: [
              "All content is protected by copyright",
              "Content cannot be copied or republished without permission",
              "Images and descriptions are website property",
              "Reviews and ratings are shared property",
            ],
          },
          soldBooks: {
            title: "Sold Books:",
            items: [
              "Copyright remains with authors and publishers",
              "Purchase does not give commercial resale rights",
              "Digital books for personal use only",
              "Prevention of unauthorized copying or distribution",
            ],
          },
        },
        liabilityWarranties: {
          title: "Liability and Warranties",
          productWarranties: {
            title: "Product Warranties:",
            items: [
              "Warranty of printing and binding quality",
              "Warranty of book safety upon arrival",
              "Warranty of bibliographic information accuracy",
              "Warranty of advertised book availability",
            ],
          },
          liabilityLimits: {
            title: "Liability Limits:",
            items: [
              "We do not guarantee uninterrupted service",
              "We are not responsible for indirect damages",
              "Liability is limited to order value",
              "We are not responsible for book usage",
            ],
          },
        },
        privacyDataProtection: {
          title: "Privacy and Data Protection",
          description:
            "We are committed to protecting your privacy according to the following privacy policies:",
          items: [
            "Privacy Policy",
            "Cookie Policy",
            "Compliance with data protection laws",
            "Encryption of sensitive information",
            "No sale of personal data",
          ],
        },
        usageRestrictions: {
          title: "Usage Restrictions",
          description:
            "The following activities are prohibited on the website:",
          items: [
            "Any illegal or fraudulent activities",
            "Violation of intellectual property rights",
            "Uploading harmful content or viruses",
            "Attempting to hack the website or servers",
            "Sending spam emails",
            "Interfering with website operation",
            "Impersonating others",
          ],
        },
        termsModifications: {
          title: "Terms Modifications",
          description:
            "We reserve the right to modify these terms and conditions:",
          items: [
            "Notify customers of changes 30 days in advance",
            "Publish updated version on the website",
            "Send alerts via email",
            "Continued use means acceptance",
            "Customers' right to cancel account",
          ],
        },
        agreementTermination: {
          title: "Agreement Termination",
          byCustomer: {
            title: "By Customer:",
            items: [
              "Close account at any time",
              "Request deletion of personal data",
              "Stop using services",
            ],
          },
          byCompany: {
            title: "By Company:",
            items: [
              "When terms and conditions are violated",
              "In case of suspected fraudulent activity",
              "When service provision stops",
              "30 days prior notice",
            ],
          },
        },
        disputeResolution: {
          title: "Dispute Resolution",
          amicable: {
            title: "Amicable Resolution:",
            items: [
              "Direct communication with customer service",
              "Attempt to reach satisfactory solution",
              "30-day period for amicable resolution",
            ],
          },
          arbitration: {
            title: "Arbitration:",
            items: [
              "Resort to arbitration if amicable resolution fails",
              "Arbitration according to Saudi laws",
              "Approved commercial arbitration center",
            ],
          },
        },
        governingLaw: {
          title: "Governing Law",
          description:
            "These terms and conditions are subject to the following laws:",
          items: [
            "Laws in force in Saudi Arabia",
            "E-commerce system",
            "Consumer protection system",
            "Personal data protection system",
            "Intellectual property rights regulations",
          ],
        },
        contactInfo: {
          title: "Contact Information",
          description: "For inquiries about these terms and conditions:",
          companyInfo: {
            companyName: "Company Name: Azalove Romance Bookstore",
            address: "Address: [Company Address]",
            phone: "Phone: +966 XX XXX XXXX",
            email: "Email: legal@azalove.com",
            customerService: "Customer Service: support@azalove.com",
            commercialRecord: "Commercial Record: [Commercial Record Number]",
            taxNumber: "Tax Number: [Tax Number]",
          },
        },
        finalProvisions: {
          title: "Final Provisions",
          items: [
            "If any part of these terms is illegal, the remaining terms remain valid",
            "Non-enforcement of any term does not mean waiver of that term",
            "These terms represent the complete agreement between parties",
            "Any waiver of any right must be in writing",
            "English translation is available for reference only, Arabic version is authoritative",
          ],
        },
        consentAcknowledgment: {
          title: "Consent Acknowledgment",
          description:
            "By using Azalove Romance Bookstore website and placing any purchase order, you acknowledge that you have read, understood, and agreed to all the terms and conditions mentioned above. You also acknowledge that you are 18 years or older and have the legal capacity to enter into this agreement.",
        },
      },
    },
    promoBlock: {
      defaultTitle: "Get More",
      defaultDiscountText: "Discounts -25%",
      defaultDescription: "When ordering for 500 Egyptian pounds or more",
      defaultButtonText: "Shop Now",
      defaultButtonLink: "#",
      defaultImageSrc: "/media/offer.png",
    },
    maintenance: {
      loading: "Loading...",
      title: "Website Under Maintenance",
      subtitle:
        "We apologize for the inconvenience, we are currently updating and improving the website to serve you better",
      messageCard: {
        title: "Maintenance Message",
        defaultMessage:
          "We are performing important updates on the website to improve performance and add new features. We expect to be back soon with an improved user experience!",
      },
      status: {
        estimatedTime: {
          title: "Estimated Time",
          value: "2-4 hours",
        },
        maintenanceType: {
          title: "Maintenance Type",
          value: "System Update",
        },
        contact: {
          title: "Contact",
          value: "Support Available",
        },
      },
      actions: {
        refreshPage: "Refresh Page",
        backToHome: "Back to Home",
      },
      contactInfo: {
        title: "For Contact and Support",
        email: "Email:",
      },
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
