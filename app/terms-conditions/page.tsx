"use client";
import Link from "next/link";

function TermsConditions() {
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
              <span className="text-gray-700">الشروط والأحكام</span>
            </li>
          </ol>
        </nav>
      </header>

      <section className="container py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl mb-4 font-web text-right">
              الشروط والأحكام
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
                مرحباً بكم في متجر أزالوف للكتب الرومانسية. هذه الشروط والأحكام
                تنظم استخدامكم لموقعنا الإلكتروني وشراء الكتب الرومانسية من
                متجرنا. من خلال استخدام موقعنا أو تقديم طلب شراء، فإنكم توافقون
                على الالتزام بهذه الشروط والأحكام. نحن ملتزمون بتقديم أفضل تجربة
                تسوق لعشاق الأدب الرومانسي مع ضمان حقوق جميع الأطراف.
              </p>
            </section>

            {/* التعريفات */}
            <section>
              <h2 className="text-2xl font-web mb-4">التعريفات</h2>
              <div className="space-y-3">
                <p className="font-web text-gray-700 mb-3">
                  في هذه الشروط والأحكام، تعني المصطلحات التالية:
                </p>
                <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                  <li>
                    <strong>"أزالوف" أو "نحن" أو "الشركة":</strong> متجر أزالوف
                    للكتب الرومانسية
                  </li>
                  <li>
                    <strong>"العميل" أو "أنتم":</strong> الشخص الذي يستخدم
                    الموقع أو يشتري منتجاتنا
                  </li>
                  <li>
                    <strong>"الموقع":</strong> الموقع الإلكتروني لأزالوف
                    والتطبيق المحمول
                  </li>
                  <li>
                    <strong>"المنتجات":</strong> الكتب الرومانسية والمنتجات ذات
                    الصلة
                  </li>
                  <li>
                    <strong>"الطلب":</strong> طلب شراء المنتجات من موقعنا
                  </li>
                  <li>
                    <strong>"الخدمات":</strong> جميع الخدمات المقدمة من خلال
                    الموقع
                  </li>
                </ul>
              </div>
            </section>

            {/* قبول الشروط */}
            <section>
              <h2 className="text-2xl font-web mb-4">قبول الشروط</h2>
              <div className="space-y-3">
                <p className="font-web text-gray-700 mb-3">
                  باستخدام موقعنا الإلكتروني، فإنكم توافقون على:
                </p>
                <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                  <li>الالتزام بجميع الشروط والأحكام المذكورة</li>
                  <li>تقديم معلومات صحيحة وحديثة</li>
                  <li>استخدام الموقع لأغراض قانونية فقط</li>
                  <li>احترام حقوق الملكية الفكرية</li>
                  <li>عدم إساءة استخدام الخدمات المقدمة</li>
                  <li>الامتثال للقوانين المحلية والدولية</li>
                </ul>
              </div>
            </section>

            {/* المنتجات والخدمات */}
            <section>
              <h2 className="text-2xl font-web mb-4">المنتجات والخدمات</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-web mb-2">أنواع المنتجات:</h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>الكتب الرومانسية المطبوعة</li>
                    <li>الكتب الرقمية (PDF، ePub)</li>
                    <li>الكتب الصوتية الرومانسية</li>
                    <li>مجموعات الكتب وسلاسل الروايات</li>
                    <li>الكتب النادرة والطبعات المحدودة</li>
                    <li>الكتب الموقعة من المؤلفين</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-web mb-2">الخدمات الإضافية:</h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>توصيات كتب مخصصة</li>
                    <li>نادي القراء الرومانسي</li>
                    <li>مراجعات وتقييمات الكتب</li>
                    <li>تغليف الهدايا</li>
                    <li>خدمة العملاء المتخصصة</li>
                    <li>إشعارات الإصدارات الجديدة</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* الأسعار والدفع */}
            <section>
              <h2 className="text-2xl font-web mb-4">الأسعار والدفع</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-web mb-2">الأسعار:</h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>جميع الأسعار مدرجة بالريال السعودي</li>
                    <li>الأسعار تشمل ضريبة القيمة المضافة</li>
                    <li>قد تتغير الأسعار دون إشعار مسبق</li>
                    <li>السعر المطبق هو السعر وقت تأكيد الطلب</li>
                    <li>رسوم الشحن منفصلة عن أسعار الكتب</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-web mb-2">طرق الدفع:</h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>البطاقات الائتمانية (فيزا، ماستركارد)</li>
                    <li>البطاقات مدفوعة مسبقاً</li>
                    <li>المحافظ الرقمية (Apple Pay، PayPal)</li>
                    <li>التحويل البنكي</li>
                    <li>الدفع عند الاستلام (في المناطق المحددة)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* الطلبات والتأكيد */}
            <section>
              <h2 className="text-2xl font-web mb-4">الطلبات والتأكيد</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-web mb-2">عملية الطلب:</h3>
                  <ol className="list-decimal pr-6 space-y-2 font-web text-gray-700">
                    <li>اختيار الكتب وإضافتها لسلة التسوق</li>
                    <li>مراجعة الطلب والكمية</li>
                    <li>إدخال معلومات الشحن والفوترة</li>
                    <li>اختيار طريقة الدفع</li>
                    <li>تأكيد الطلب والدفع</li>
                    <li>استلام رسالة تأكيد الطلب</li>
                  </ol>
                </div>
                <div>
                  <h3 className="text-xl font-web mb-2">تأكيد الطلب:</h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>سيتم إرسال تأكيد الطلب خلال 24 ساعة</li>
                    <li>يمكن إلغاء الطلب قبل الشحن</li>
                    <li>نحتفظ بحق رفض الطلبات المشبوهة</li>
                    <li>في حالة عدم توفر الكتاب، سيتم إشعاركم فوراً</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* الشحن والتسليم */}
            <section>
              <h2 className="text-2xl font-web mb-4">الشحن والتسليم</h2>
              <div className="space-y-3">
                <p className="font-web text-gray-700 mb-3">
                  يرجى مراجعة{" "}
                  <Link
                    href="/shipping-delivery"
                    className="text-yellow-600 hover:text-yellow-700 underline"
                  >
                    سياسة الشحن والتوصيل
                  </Link>{" "}
                  للحصول على تفاصيل كاملة حول:
                </p>
                <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                  <li>مناطق التوصيل المتاحة</li>
                  <li>أوقات التسليم المتوقعة</li>
                  <li>تكاليف الشحن</li>
                  <li>شروط التوصيل المجاني</li>
                  <li>طرق التتبع والمراقبة</li>
                </ul>
              </div>
            </section>

            {/* الإرجاع والاسترداد */}
            <section>
              <h2 className="text-2xl font-web mb-4">الإرجاع والاسترداد</h2>
              <div className="space-y-3">
                <p className="font-web text-gray-700 mb-3">
                  يرجى مراجعة{" "}
                  <Link
                    href="/return-refund"
                    className="text-yellow-600 hover:text-yellow-700 underline"
                  >
                    سياسة الإرجاع والاسترداد
                  </Link>{" "}
                  للحصول على معلومات تفصيلية حول:
                </p>
                <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                  <li>فترات الإرجاع المسموحة</li>
                  <li>شروط إرجاع الكتب</li>
                  <li>عملية الاسترداد</li>
                  <li>الكتب غير القابلة للإرجاع</li>
                  <li>تكاليف الإرجاع</li>
                </ul>
              </div>
            </section>

            {/* حسابات المستخدمين */}
            <section>
              <h2 className="text-2xl font-web mb-4">حسابات المستخدمين</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-web mb-2">إنشاء الحساب:</h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>يجب تقديم معلومات صحيحة ودقيقة</li>
                    <li>يجب أن تكون 18 عاماً أو أكثر</li>
                    <li>مسؤولية الحفاظ على سرية كلمة المرور</li>
                    <li>إشعارنا فوراً في حالة الاستخدام غير المصرح به</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-web mb-2">استخدام الحساب:</h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>لا يمكن مشاركة الحساب مع الآخرين</li>
                    <li>تحديث المعلومات عند الحاجة</li>
                    <li>الامتثال لسياسات المتجر</li>
                    <li>حق الشركة في إيقاف الحسابات المخالفة</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* حقوق الملكية الفكرية */}
            <section>
              <h2 className="text-2xl font-web mb-4">حقوق الملكية الفكرية</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-web mb-2">محتوى الموقع:</h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>جميع المحتويات محمية بحقوق الطبع والنشر</li>
                    <li>لا يمكن نسخ أو إعادة نشر المحتوى دون إذن</li>
                    <li>الصور والوصوف ملكية خاصة بالموقع</li>
                    <li>المراجعات والتقييمات ملكية مشتركة</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-web mb-2">الكتب المباعة:</h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>حقوق الطبع والنشر تبقى للمؤلفين والناشرين</li>
                    <li>الشراء لا يعطي حق إعادة البيع التجاري</li>
                    <li>الكتب الرقمية للاستخدام الشخصي فقط</li>
                    <li>منع النسخ أو التوزيع غير المشروع</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* المسؤولية والضمانات */}
            <section>
              <h2 className="text-2xl font-web mb-4">المسؤولية والضمانات</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-web mb-2">ضمانات المنتجات:</h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>ضمان جودة الطباعة والتجليد</li>
                    <li>ضمان سلامة الكتب عند الوصول</li>
                    <li>ضمان صحة المعلومات الببليوغرافية</li>
                    <li>ضمان توفر الكتب المعلنة</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-web mb-2">حدود المسؤولية:</h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>لا نضمن استمرارية الخدمة دون انقطاع</li>
                    <li>لا نتحمل مسؤولية الأضرار غير المباشرة</li>
                    <li>المسؤولية محدودة بقيمة الطلب</li>
                    <li>لا نتحمل مسؤولية استخدام الكتب</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* الخصوصية وحماية البيانات */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                الخصوصية وحماية البيانات
              </h2>
              <div className="space-y-3">
                <p className="font-web text-gray-700 mb-3">
                  نحن ملتزمون بحماية خصوصيتكم وفقاً لسياسات الخصوصية التالية:
                </p>
                <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                  <li>
                    <Link
                      href="/privacy-policy"
                      className="text-yellow-600 hover:text-yellow-700 underline"
                    >
                      سياسة الخصوصية
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/cookie-policy"
                      className="text-yellow-600 hover:text-yellow-700 underline"
                    >
                      سياسة ملفات تعريف الارتباط
                    </Link>
                  </li>
                  <li>الامتثال لقوانين حماية البيانات</li>
                  <li>تشفير المعلومات الحساسة</li>
                  <li>عدم بيع البيانات الشخصية</li>
                </ul>
              </div>
            </section>

            {/* القيود على الاستخدام */}
            <section>
              <h2 className="text-2xl font-web mb-4">القيود على الاستخدام</h2>
              <div className="space-y-3">
                <p className="font-web text-gray-700 mb-3">
                  يُمنع استخدام الموقع في الأنشطة التالية:
                </p>
                <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                  <li>أي أنشطة غير قانونية أو احتيالية</li>
                  <li>انتهاك حقوق الملكية الفكرية</li>
                  <li>تحميل محتوى ضار أو فيروسات</li>
                  <li>محاولة اختراق الموقع أو الخوادم</li>
                  <li>إرسال رسائل بريد إلكتروني مزعجة</li>
                  <li>التدخل في تشغيل الموقع</li>
                  <li>انتحال شخصية الآخرين</li>
                </ul>
              </div>
            </section>

            {/* التعديلات على الشروط */}
            <section>
              <h2 className="text-2xl font-web mb-4">التعديلات على الشروط</h2>
              <div className="space-y-3">
                <p className="font-web text-gray-700 mb-3">
                  نحتفظ بحق تعديل هذه الشروط والأحكام:
                </p>
                <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                  <li>إشعار العملاء بالتغييرات قبل 30 يوماً</li>
                  <li>نشر النسخة المحدثة على الموقع</li>
                  <li>إرسال تنبيهات عبر البريد الإلكتروني</li>
                  <li>الاستمرار في الاستخدام يعني القبول</li>
                  <li>حق العملاء في إلغاء الحساب</li>
                </ul>
              </div>
            </section>

            {/* فسخ الاتفاقية */}
            <section>
              <h2 className="text-2xl font-web mb-4">فسخ الاتفاقية</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-web mb-2">من قبل العميل:</h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>إغلاق الحساب في أي وقت</li>
                    <li>طلب حذف البيانات الشخصية</li>
                    <li>التوقف عن استخدام الخدمات</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-web mb-2">من قبل الشركة:</h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>عند مخالفة الشروط والأحكام</li>
                    <li>في حالة الاشتباه في النشاط الاحتيالي</li>
                    <li>عند التوقف عن تقديم الخدمة</li>
                    <li>إشعار مسبق بـ 30 يوماً</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* حل النزاعات */}
            <section>
              <h2 className="text-2xl font-web mb-4">حل النزاعات</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-web mb-2">الحل الودي:</h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>التواصل المباشر مع خدمة العملاء</li>
                    <li>محاولة الوصول لحل مرضي</li>
                    <li>فترة 30 يوماً للحل الودي</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-web mb-2">التحكيم:</h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>اللجوء للتحكيم في حالة عدم الحل الودي</li>
                    <li>التحكيم وفق القوانين السعودية</li>
                    <li>مركز التحكيم التجاري المعتمد</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* القانون المطبق */}
            <section>
              <h2 className="text-2xl font-web mb-4">القانون المطبق</h2>
              <div className="space-y-3">
                <p className="font-web text-gray-700 mb-3">
                  تخضع هذه الشروط والأحكام للقوانين التالية:
                </p>
                <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                  <li>القوانين المعمول بها في المملكة العربية السعودية</li>
                  <li>نظام التجارة الإلكترونية</li>
                  <li>نظام حماية المستهلك</li>
                  <li>نظام حماية البيانات الشخصية</li>
                  <li>الأنظمة المتعلقة بحقوق الملكية الفكرية</li>
                </ul>
              </div>
            </section>

            {/* معلومات الاتصال */}
            <section>
              <h2 className="text-2xl font-web mb-4">معلومات الاتصال</h2>
              <div className="space-y-3">
                <p className="font-web text-gray-700 mb-3">
                  للاستفسارات حول هذه الشروط والأحكام:
                </p>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="space-y-2 font-web text-gray-700">
                    <p>
                      <strong>اسم الشركة:</strong> متجر أزالوف للكتب الرومانسية
                    </p>
                    <p>
                      <strong>العنوان:</strong> [عنوان الشركة]
                    </p>
                    <p>
                      <strong>الهاتف:</strong> +966 XX XXX XXXX
                    </p>
                    <p>
                      <strong>البريد الإلكتروني:</strong> legal@azalove.com
                    </p>
                    <p>
                      <strong>خدمة العملاء:</strong> support@azalove.com
                    </p>
                    <p>
                      <strong>السجل التجاري:</strong> [رقم السجل التجاري]
                    </p>
                    <p>
                      <strong>الرقم الضريبي:</strong> [الرقم الضريبي]
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* الأحكام الختامية */}
            <section>
              <h2 className="text-2xl font-web mb-4">الأحكام الختامية</h2>
              <div className="space-y-3">
                <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                  <li>
                    إذا كان أي جزء من هذه الشروط غير قانوني، فإن باقي الشروط
                    تبقى سارية
                  </li>
                  <li>عدم إنفاذ أي شرط لا يعني التنازل عن ذلك الشرط</li>
                  <li>هذه الشروط تمثل الاتفاقية الكاملة بين الطرفين</li>
                  <li>أي تنازل عن أي حق يجب أن يكون مكتوباً</li>
                  <li>
                    الترجمة الإنجليزية متاحة للمرجع فقط، النسخة العربية هي
                    المعتمدة
                  </li>
                </ul>
              </div>
            </section>

            {/* إقرار بالموافقة */}
            <section className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <h2 className="text-2xl font-web mb-4">إقرار بالموافقة</h2>
              <p className="font-web text-gray-700 leading-relaxed">
                باستخدام موقع أزالوف للكتب الرومانسية وتقديم أي طلب شراء، فإنكم
                تقرون بأنكم قد قرأتم وفهمتم ووافقتم على جميع الشروط والأحكام
                المذكورة أعلاه. كما تقرون بأنكم تبلغون من العمر 18 عاماً أو أكثر
                وأنكم تملكون الأهلية القانونية للدخول في هذه الاتفاقية.
              </p>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}

export default TermsConditions;
