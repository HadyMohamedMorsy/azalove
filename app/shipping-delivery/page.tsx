"use client";
import { BrandSVG } from "@/components/ui/brand-svg";
import Link from "next/link";

function ShippingDelivery() {
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
              <span className="text-gray-700">سياسة الشحن والتوصيل</span>
            </li>
          </ol>
        </nav>
      </header>

      <section className="container py-10 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Brand Identity SVG Header */}
          <div className="text-center mb-12">
            <BrandSVG
              svgName="artboard-49"
              size="xl"
              animate={true}
              className="mx-auto mb-6"
            />
          </div>

          <div className="mb-8">
            <h1 className="text-4xl mb-4 font-web text-right">
              سياسة الشحن والتوصيل
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
                نحن في أزالوف نسعى لإيصال أجمل قصص الحب والرومانسية إلى باب
                منزلكم بأسرع وقت ممكن وبأفضل جودة. توضح سياسة الشحن والتوصيل هذه
                جميع التفاصيل المتعلقة بتوصيل الكتب الرومانسية، من مواعيد الشحن
                إلى تكاليف التوصيل. نحن ملتزمون بحماية كتبكم أثناء النقل وضمان
                وصولها في حالة مثالية لتستمتعوا بقراءتها.
              </p>
            </section>

            {/* مناطق التوصيل */}
            <section>
              <h2 className="text-2xl font-web mb-4">مناطق التوصيل</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-web mb-2">
                    داخل المملكة العربية السعودية:
                  </h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>
                      <strong>الرياض:</strong> توصيل سريع خلال 24-48 ساعة
                    </li>
                    <li>
                      <strong>جدة ومكة المكرمة:</strong> 2-3 أيام عمل
                    </li>
                    <li>
                      <strong>الدمام والخبر:</strong> 2-3 أيام عمل
                    </li>
                    <li>
                      <strong>المدينة المنورة:</strong> 2-3 أيام عمل
                    </li>
                    <li>
                      <strong>بقية المناطق:</strong> 3-5 أيام عمل
                    </li>
                    <li>
                      <strong>المناطق النائية:</strong> 5-7 أيام عمل
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-web mb-2">خارج المملكة:</h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>
                      <strong>دول الخليج:</strong> 5-7 أيام عمل
                    </li>
                    <li>
                      <strong>الدول العربية:</strong> 7-14 يوم عمل
                    </li>
                    <li>
                      <strong>بقية العالم:</strong> 14-21 يوم عمل
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* أوقات الشحن */}
            <section>
              <h2 className="text-2xl font-web mb-4">أوقات الشحن</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-web mb-2">أوقات المعالجة:</h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>
                      <strong>الكتب المتوفرة:</strong> 1-2 يوم عمل
                    </li>
                    <li>
                      <strong>الكتب المستوردة:</strong> 3-5 أيام عمل
                    </li>
                    <li>
                      <strong>الكتب النادرة:</strong> 5-10 أيام عمل
                    </li>
                    <li>
                      <strong>مجموعات الكتب:</strong> 2-3 أيام عمل
                    </li>
                    <li>
                      <strong>الكتب المخصصة:</strong> 7-14 يوم عمل
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-web mb-2">أيام العمل:</h3>
                  <p className="font-web text-gray-700">
                    نقوم بمعالجة الطلبات من الأحد إلى الخميس، من الساعة 9 صباحاً
                    إلى 6 مساءً. الطلبات المقدمة بعد الساعة 3 مساءً يوم الخميس
                    ستتم معالجتها يوم الأحد التالي.
                  </p>
                </div>
              </div>
            </section>

            {/* تكاليف الشحن */}
            <section>
              <h2 className="text-2xl font-web mb-4">تكاليف الشحن</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-web mb-2">داخل المملكة:</h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>
                      <strong>الشحن المجاني:</strong> للطلبات أكثر من 150 ريال
                    </li>
                    <li>
                      <strong>الشحن العادي:</strong> 25 ريال (2-3 أيام)
                    </li>
                    <li>
                      <strong>الشحن السريع:</strong> 35 ريال (24-48 ساعة)
                    </li>
                    <li>
                      <strong>الشحن المستعجل:</strong> 50 ريال (نفس اليوم في
                      الرياض)
                    </li>
                    <li>
                      <strong>أعضاء نادي القراء:</strong> شحن مجاني دائماً
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-web mb-2">خارج المملكة:</h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>
                      <strong>دول الخليج:</strong> 45 ريال
                    </li>
                    <li>
                      <strong>الدول العربية:</strong> 65 ريال
                    </li>
                    <li>
                      <strong>بقية العالم:</strong> 85 ريال
                    </li>
                    <li>
                      <strong>الشحن المجاني:</strong> للطلبات أكثر من 500 ريال
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* طرق الشحن */}
            <section>
              <h2 className="text-2xl font-web mb-4">طرق الشحن</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-web mb-2">شركاء الشحن:</h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>
                      <strong>الشحن السريع:</strong> شركة أرامكس
                    </li>
                    <li>
                      <strong>الشحن العادي:</strong> البريد السعودي
                    </li>
                    <li>
                      <strong>الشحن المحلي:</strong> شركة سمسا
                    </li>
                    <li>
                      <strong>الشحن الدولي:</strong> شركة DHL
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-web mb-2">خيارات التوصيل:</h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>
                      <strong>التوصيل للمنزل:</strong> إلى باب المنزل
                    </li>
                    <li>
                      <strong>التوصيل للمكتب:</strong> خلال ساعات العمل
                    </li>
                    <li>
                      <strong>نقاط الاستلام:</strong> من فروع شركات الشحن
                    </li>
                    <li>
                      <strong>الاستلام الشخصي:</strong> من مقر الشركة (بموعد
                      مسبق)
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* التغليف والحماية */}
            <section>
              <h2 className="text-2xl font-web mb-4">التغليف والحماية</h2>
              <div className="space-y-3">
                <p className="font-web text-gray-700 mb-3">
                  نحرص على حماية كتبكم الرومانسية بأفضل طرق التغليف:
                </p>
                <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                  <li>تغليف فقاعي مقاوم للصدمات</li>
                  <li>صناديق كرتونية مقوية مخصصة للكتب</li>
                  <li>حماية من الرطوبة والعوامل الجوية</li>
                  <li>ملصقات "هش - يُرجى المحافظة عليه"</li>
                  <li>فاصل حماية بين الكتب المتعددة</li>
                  <li>تغليف هدايا مجاني للمناسبات الخاصة</li>
                  <li>رسائل شخصية مع الكتب المُهداة</li>
                </ul>
              </div>
            </section>

            {/* تتبع الطلبات */}
            <section>
              <h2 className="text-2xl font-web mb-4">تتبع الطلبات</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-web mb-2">كيفية تتبع طلبك:</h3>
                  <ol className="list-decimal pr-6 space-y-2 font-web text-gray-700">
                    <li>سجل الدخول إلى حسابك في أزالوف</li>
                    <li>اذهب إلى قسم "طلباتي"</li>
                    <li>انقر على رقم الطلب</li>
                    <li>تابع حالة الشحن والتوصيل</li>
                    <li>استلم إشعارات فورية عبر الرسائل النصية</li>
                  </ol>
                </div>
                <div>
                  <h3 className="text-xl font-web mb-2">حالات الطلب:</h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>
                      <strong>قيد المعالجة:</strong> جاري تحضير الطلب
                    </li>
                    <li>
                      <strong>جاري التحضير:</strong> يتم تجهيز الكتب للشحن
                    </li>
                    <li>
                      <strong>تم الشحن:</strong> الطلب في الطريق إليكم
                    </li>
                    <li>
                      <strong>خارج للتوصيل:</strong> سيصل اليوم
                    </li>
                    <li>
                      <strong>تم التوصيل:</strong> وصل بنجاح
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* التوصيل المجاني */}
            <section>
              <h2 className="text-2xl font-web mb-4">عروض التوصيل المجاني</h2>
              <div className="space-y-3">
                <p className="font-web text-gray-700 mb-3">
                  استمتع بالتوصيل المجاني في الحالات التالية:
                </p>
                <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                  <li>طلبات أكثر من 150 ريال داخل المملكة</li>
                  <li>طلبات أكثر من 500 ريال خارج المملكة</li>
                  <li>أعضاء نادي القراء المميزين</li>
                  <li>الطلبات في شهر الحب (فبراير)</li>
                  <li>عروض نهاية الأسبوع (الجمعة والسبت)</li>
                  <li>الطلبات المتكررة (أكثر من 5 كتب شهرياً)</li>
                  <li>العملاء الجدد (أول 3 طلبات)</li>
                </ul>
              </div>
            </section>

            {/* التوصيل السريع */}
            <section>
              <h2 className="text-2xl font-web mb-4">التوصيل السريع</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-web mb-2">
                    خدمة التوصيل نفس اليوم:
                  </h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>متاحة في الرياض فقط</li>
                    <li>للطلبات المقدمة قبل الساعة 12 ظهراً</li>
                    <li>رسوم إضافية 50 ريال</li>
                    <li>مجانية للطلبات أكثر من 300 ريال</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-web mb-2">
                    خدمة التوصيل في المساء:
                  </h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>توصيل من الساعة 6 مساءً حتى 10 مساءً</li>
                    <li>مثالية للعاملين والطلاب</li>
                    <li>رسوم إضافية 25 ريال</li>
                    <li>يجب تحديد موعد مسبق</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* عدم توفر المستلم */}
            <section>
              <h2 className="text-2xl font-web mb-4">عدم توفر المستلم</h2>
              <div className="space-y-3">
                <p className="font-web text-gray-700 mb-3">
                  في حالة عدم توفر المستلم أثناء التوصيل:
                </p>
                <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                  <li>سيتم ترك بطاقة إشعار</li>
                  <li>الاتصال بالرقم المسجل</li>
                  <li>إعادة محاولة التوصيل مجاناً (مرة واحدة)</li>
                  <li>حفظ الطلب في أقرب نقطة استلام</li>
                  <li>إشعار عبر الرسائل النصية والبريد الإلكتروني</li>
                  <li>مهلة 7 أيام للاستلام قبل الإرجاع</li>
                </ul>
              </div>
            </section>

            {/* الطلبات الخاصة */}
            <section>
              <h2 className="text-2xl font-web mb-4">الطلبات الخاصة</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-web mb-2">
                    الكتب النادرة والمحدودة:
                  </h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>شحن مجاني ومؤمن بالكامل</li>
                    <li>تغليف خاص مقاوم للصدمات</li>
                    <li>تتبع مفصل مع إشعارات مستمرة</li>
                    <li>توثيق بالصور قبل وبعد الشحن</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-web mb-2">الكتب المُهداة:</h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>تغليف هدايا أنيق مجاني</li>
                    <li>رسائل شخصية مكتوبة بخط جميل</li>
                    <li>توقيت توصيل مخصص حسب المناسبة</li>
                    <li>إخفاء الأسعار من الفواتير</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* مشاكل التوصيل */}
            <section>
              <h2 className="text-2xl font-web mb-4">مشاكل التوصيل</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-web mb-2">
                    في حالة تأخير التوصيل:
                  </h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>إشعار فوري بسبب التأخير</li>
                    <li>خصم 50% من رسوم الشحن</li>
                    <li>كتاب إضافي مجاني كاعتذار</li>
                    <li>أولوية في الطلبات التالية</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-web mb-2">في حالة تلف الكتب:</h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>استبدال فوري مجاني</li>
                    <li>تحمل كامل تكاليف الشحن</li>
                    <li>تعويض مناسب حسب قيمة الكتاب</li>
                    <li>تحسين طرق التغليف</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* نصائح للعملاء */}
            <section>
              <h2 className="text-2xl font-web mb-4">نصائح للعملاء</h2>
              <div className="space-y-3">
                <p className="font-web text-gray-700 mb-3">
                  لضمان تجربة توصيل مميزة:
                </p>
                <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                  <li>تأكد من صحة عنوان التوصيل</li>
                  <li>اترك رقم هاتف يمكن الوصول إليه</li>
                  <li>حدد أفضل وقت للتوصيل</li>
                  <li>اطلب التوصيل للمكتب إذا لم تكن في المنزل</li>
                  <li>اشترك في نادي القراء للحصول على مزايا إضافية</li>
                  <li>تابع حالة الطلب عبر التطبيق</li>
                  <li>تواصل معنا فور استلام الطلب</li>
                </ul>
              </div>
            </section>

            {/* التواصل */}
            <section>
              <h2 className="text-2xl font-web mb-4">التواصل معنا</h2>
              <p className="font-web text-gray-700 mb-3">
                لأي استفسار حول الشحن والتوصيل، يرجى التواصل معنا:
              </p>
              <div className="space-y-2 font-web text-gray-700">
                <p>البريد الإلكتروني: shipping@azalove.com</p>
                <p>واتساب: +966 XX XXX XXXX</p>
                <p>خدمة العملاء: متاحة من 9 صباحاً إلى 9 مساءً</p>
                <p>الطوارئ: متاحة 24/7 للطلبات المستعجلة</p>
                <p>تتبع الطلبات: متاح على الموقع والتطبيق</p>
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}

export default ShippingDelivery;
