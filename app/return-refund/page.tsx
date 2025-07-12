"use client";
import Link from "next/link";

function ReturnRefund() {
  return (
    <>
      <header className="container px-6 py-4 border-t border-b border-[#eae8e4]">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                الرئيسيه
              </Link>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-gray-500">/</span>
              <span className="text-gray-700">سياسة الإرجاع والاسترداد</span>
            </li>
          </ol>
        </nav>
      </header>

      <section className="container py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl mb-4 font-web text-right">
              سياسة الإرجاع والاسترداد
            </h1>
            <p className="font-web text-gray-600 text-right">
              آخر تحديث: {new Date().toLocaleDateString("ar-EG")}
            </p>
          </div>

          <div className="space-y-8 text-right">
            {/* مقدمة */}
            <section>
              <h2 className="text-2xl font-web mb-4">مقدمة</h2>
              <p className="font-web leading-relaxed text-gray-700">
                نحن في أزالوف نسعى لإثراء مكتبتكم بأجمل قصص الحب والرومانسية.
                توضح سياسة الإرجاع والاسترداد هذه حقوقكم في إرجاع الكتب
                الرومانسية واسترداد الأموال. نحن ملتزمون بتقديم تجربة قراءة
                مميزة، ونوفر عملية إرجاع واسترداد سهلة وعادلة لجميع عملائنا من
                عشاق الأدب الرومانسي.
              </p>
            </section>

            {/* فترة الإرجاع */}
            <section>
              <h2 className="text-2xl font-web mb-4">فترة الإرجاع</h2>
              <div className="space-y-3">
                <p className="font-web text-gray-700">
                  يحق لك إرجاع الكتب الرومانسية خلال الفترات التالية:
                </p>
                <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                  <li>
                    <strong>الكتب الورقية:</strong> 30 يوماً من تاريخ الاستلام
                  </li>
                  <li>
                    <strong>الكتب المصورة والروايات المصورة:</strong> 21 يوماً
                    من تاريخ الاستلام
                  </li>
                  <li>
                    <strong>مجموعات الكتب:</strong> 30 يوماً من تاريخ الاستلام
                  </li>
                  <li>
                    <strong>الكتب المستوردة:</strong> 14 يوماً من تاريخ الاستلام
                  </li>
                  <li>
                    <strong>الكتب النادرة والمحدودة:</strong> 7 أيام من تاريخ
                    الاستلام
                  </li>
                </ul>
                <p className="font-web text-gray-700 mt-3">
                  <strong>ملاحظة:</strong> يتم حساب فترة الإرجاع من تاريخ استلام
                  الكتاب وليس من تاريخ الشراء.
                </p>
              </div>
            </section>

            {/* شروط الإرجاع */}
            <section>
              <h2 className="text-2xl font-web mb-4">شروط الإرجاع</h2>
              <p className="font-web text-gray-700 mb-3">
                لضمان قبول طلب إرجاع الكتب الرومانسية، يجب أن تتوفر الشروط
                التالية:
              </p>
              <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                <li>أن يكون الكتاب في حالته الأصلية بدون تلف</li>
                <li>عدم وجود تمزق أو كتابة على صفحات الكتاب</li>
                <li>احتفاظ بالغلاف الأصلي والعلامات المرجعية إن وجدت</li>
                <li>عدم ثني أو تجعد الصفحات</li>
                <li>تقديم إثبات الشراء (فاتورة أو رقم الطلب)</li>
                <li>الكتاب غير مقروء أو مقروء جزئياً فقط</li>
                <li>وجود الكتاب في حالة "جديد" أو "جيد جداً"</li>
              </ul>
            </section>

            {/* المنتجات غير القابلة للإرجاع */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                الكتب غير القابلة للإرجاع
              </h2>
              <p className="font-web text-gray-700 mb-3">
                الكتب التالية غير قابلة للإرجاع لأسباب خاصة:
              </p>
              <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                <li>الكتب الرقمية المحملة (PDF، ePub)</li>
                <li>الكتب الموقعة من المؤلفين</li>
                <li>الكتب المخصصة بأسماء شخصية</li>
                <li>الكتب المتضررة بسبب سوء الاستخدام</li>
                <li>الكتب المشتراة في عروض التصفية النهائية</li>
                <li>الكتب التي تم قراءتها بالكامل</li>
                <li>الكتب التي مر عليها أكثر من فترة الإرجاع المحددة</li>
                <li>البطاقات الهدايا وقسائم الكتب</li>
              </ul>
            </section>

            {/* عملية الإرجاع */}
            <section>
              <h2 className="text-2xl font-web mb-4">عملية الإرجاع</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-web mb-2">خطوات إرجاع الكتب:</h3>
                  <ol className="list-decimal pr-6 space-y-2 font-web text-gray-700">
                    <li>قم بتسجيل الدخول إلى حسابك في أزالوف</li>
                    <li>اذهب إلى قسم "مكتبتي" أو "طلباتي"</li>
                    <li>اختر الكتاب المراد إرجاعه</li>
                    <li>انقر على "طلب إرجاع الكتاب"</li>
                    <li>املأ نموذج الإرجاع مع سبب الإرجاع</li>
                    <li>التقط صورة للكتاب توضح حالته</li>
                    <li>احزم الكتاب في مغلف واقي</li>
                    <li>استخدم ملصق الإرجاع المجاني</li>
                    <li>أرسل الكتاب عبر البريد أو شركة الشحن</li>
                  </ol>
                </div>
                <div>
                  <h3 className="text-xl font-web mb-2">نصائح لحماية الكتب:</h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>استخدم مغلف فقاعي أو كرتون مقوى</li>
                    <li>ضع الكتاب في كيس بلاستيكي لحمايته من الرطوبة</li>
                    <li>تجنب الثني أو الضغط على الطرد</li>
                    <li>ستتلقى رقم تتبع لطلب الإرجاع</li>
                    <li>المعالجة تتم خلال 2-3 أيام عمل من الاستلام</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* تكاليف الإرجاع */}
            <section>
              <h2 className="text-2xl font-web mb-4">تكاليف الإرجاع</h2>
              <div className="space-y-3">
                <p className="font-web text-gray-700 mb-3">
                  تكاليف شحن الكتب للإرجاع:
                </p>
                <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                  <li>
                    <strong>إرجاع مجاني:</strong> في حالة وجود عيب في الطباعة أو
                    التجليد
                  </li>
                  <li>
                    <strong>إرجاع مجاني:</strong> في حالة إرسال كتاب خاطئ
                  </li>
                  <li>
                    <strong>إرجاع مجاني:</strong> للطلبات التي تزيد عن 200 ريال
                  </li>
                  <li>
                    <strong>إرجاع مجاني:</strong> لأعضاء نادي القراء المميزين
                  </li>
                  <li>
                    <strong>رسوم الإرجاع:</strong> 15 ريال للكتب الفردية
                  </li>
                  <li>
                    <strong>رسوم مخفضة:</strong> 25 ريال لمجموعات الكتب
                  </li>
                </ul>
                <p className="font-web text-gray-700 mt-3">
                  <strong>عرض خاص:</strong> إرجاع مجاني لأول 3 كتب لكل عميل
                  جديد.
                </p>
              </div>
            </section>

            {/* عمليات الاسترداد */}
            <section>
              <h2 className="text-2xl font-web mb-4">عمليات الاسترداد</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-web mb-2">طرق الاسترداد:</h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>الاسترداد إلى نفس طريقة الدفع الأصلية</li>
                    <li>رصيد في موقع أزالوف للكتب الرومانسية</li>
                    <li>بطاقة هدايا لشراء كتب جديدة</li>
                    <li>التبرع بقيمة الكتاب لمكتبة عامة (اختياري)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-web mb-2">مواعيد الاسترداد:</h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>
                      <strong>البطاقات الائتمانية:</strong> 3-7 أيام عمل
                    </li>
                    <li>
                      <strong>البطاقات مدفوعة مسبقاً:</strong> 2-5 أيام عمل
                    </li>
                    <li>
                      <strong>المحافظ الرقمية:</strong> 1-2 أيام عمل
                    </li>
                    <li>
                      <strong>رصيد الموقع:</strong> فوري بعد فحص الكتاب
                    </li>
                    <li>
                      <strong>بطاقات الهدايا:</strong> فوري بعد المعالجة
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* الاستبدال */}
            <section>
              <h2 className="text-2xl font-web mb-4">الاستبدال</h2>
              <div className="space-y-3">
                <p className="font-web text-gray-700 mb-3">
                  نوفر خدمة استبدال الكتب في الحالات التالية:
                </p>
                <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                  <li>استبدال الكتاب التالف أو المعيب في الطباعة</li>
                  <li>استبدال الكتاب بإصدار أحدث من نفس المؤلف</li>
                  <li>استبدال الكتاب بجزء آخر من نفس السلسلة</li>
                  <li>استبدال الكتاب بكتاب آخر من نفس فئة السعر</li>
                  <li>استبدال الطبعة العادية بالطبعة المميزة (مع دفع الفرق)</li>
                </ul>
                <p className="font-web text-gray-700 mt-3">
                  <strong>مميزات الاستبدال:</strong> شحن مجاني للكتاب البديل،
                  واستشارة مجانية لاختيار كتب رومانسية تناسب ذوقك.
                </p>
              </div>
            </section>

            {/* حالات خاصة */}
            <section>
              <h2 className="text-2xl font-web mb-4">حالات خاصة</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-web mb-2">الكتب المعيبة:</h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>إرجاع فوري مع استرداد كامل</li>
                    <li>شحن مجاني للكتاب البديل</li>
                    <li>كتاب إضافي مجاني كاعتذار</li>
                    <li>أولوية في الحصول على الإصدارات الجديدة</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-web mb-2">الطلبات الخاطئة:</h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>إرجاع مجاني مع استرداد كامل</li>
                    <li>إرسال الكتاب الصحيح مجاناً</li>
                    <li>خصم 20% على الطلبة التالية</li>
                    <li>انضمام مجاني لنادي القراء</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* تتبع الإرجاع */}
            <section>
              <h2 className="text-2xl font-web mb-4">تتبع الإرجاع</h2>
              <p className="font-web text-gray-700 mb-3">
                يمكنك تتبع حالة إرجاع الكتب من خلال:
              </p>
              <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                <li>قسم "مكتبتي" في حسابك</li>
                <li>قسم "طلبات الإرجاع"</li>
                <li>الإشعارات عبر البريد الإلكتروني</li>
                <li>التنبيهات في التطبيق</li>
                <li>الدردشة المباشرة مع خدمة العملاء</li>
                <li>مراجعات الكتب وتقييمات العملاء</li>
              </ul>
            </section>

            {/* إرجاع الهدايا */}
            <section>
              <h2 className="text-2xl font-web mb-4">إرجاع الكتب المُهداة</h2>
              <p className="font-web text-gray-700 mb-3">
                للكتب الرومانسية المُهداة من موقعنا:
              </p>
              <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                <li>يمكن إرجاع الكتب المُهداة خلال 45 يوماً</li>
                <li>الاسترداد يتم كرصيد في موقع أزالوف</li>
                <li>يمكن استبدال الكتاب بكتاب آخر مجاناً</li>
                <li>يمكن للمُهدي طلب الاسترداد المالي</li>
                <li>بطاقة هدايا جديدة بنفس القيمة</li>
                <li>تغليف هدايا مجاني للكتاب البديل</li>
              </ul>
            </section>

            {/* التواصل */}
            <section>
              <h2 className="text-2xl font-web mb-4">التواصل معنا</h2>
              <p className="font-web text-gray-700 mb-3">
                لأي استفسار حول إرجاع الكتب الرومانسية، يرجى التواصل معنا:
              </p>
              <div className="space-y-2 font-web text-gray-700">
                <p>البريد الإلكتروني: books@azalove.com</p>
                <p>واتساب: +966 XX XXX XXXX</p>
                <p>الدردشة المباشرة: متاحة من 9 صباحاً إلى 11 مساءً</p>
                <p>استشارات القراءة: متاحة 24/7</p>
                <p>نادي القراء: جلسات أسبوعية لمناقشة الكتب</p>
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}

export default ReturnRefund;
