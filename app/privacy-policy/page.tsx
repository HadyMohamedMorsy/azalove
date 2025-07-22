"use client";
import { BrandSVG } from "@/components/ui/brand-svg";
import Link from "next/link";

function PrivacyPolicy() {
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
              <span className="text-gray-700">سياسة الخصوصية</span>
            </li>
          </ol>
        </nav>
      </header>

      <section className="container py-10 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Brand Identity SVG Header */}
          <div className="text-center mb-12">
            <BrandSVG 
              svgName="artboard-46" 
              size="xl" 
              animate={true}
              className="mx-auto mb-6"
            />
          </div>

          <div className="mb-8">
            <h1 className="text-4xl mb-4 font-web text-right">
              سياسة الخصوصية
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
                نحن في أزالوف نلتزم بحماية خصوصيتك وأمان معلوماتك الشخصية. توضح
                سياسة الخصوصية هذه كيفية جمع واستخدام وحماية المعلومات التي
                تقدمها لنا عند استخدام موقعنا الإلكتروني وخدماتنا. نحن نتعامل مع
                معلوماتك بأقصى درجات الحرص والمسؤولية.
              </p>
            </section>

            {/* المعلومات التي نجمعها */}
            <section>
              <h2 className="text-2xl font-web mb-4">المعلومات التي نجمعها</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-web mb-2">المعلومات الشخصية</h3>
                  <p className="font-web text-gray-700 mb-2">
                    نقوم بجمع المعلومات التالية عند التسجيل أو الشراء:
                  </p>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>الاسم الكامل</li>
                    <li>عنوان البريد الإلكتروني</li>
                    <li>رقم الهاتف</li>
                    <li>عنوان الشحن والفوترة</li>
                    <li>معلومات الدفع (مشفرة)</li>
                    <li>تفضيلات التسوق</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-web mb-2">المعلومات التقنية</h3>
                  <p className="font-web text-gray-700 mb-2">
                    نجمع تلقائياً معلومات تقنية عند زيارة موقعنا:
                  </p>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>عنوان IP</li>
                    <li>نوع المتصفح ونسخته</li>
                    <li>نظام التشغيل</li>
                    <li>الصفحات التي زرتها</li>
                    <li>وقت ومدة الزيارة</li>
                    <li>مصدر الإحالة</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* كيفية استخدام المعلومات */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                كيفية استخدام المعلومات
              </h2>
              <p className="font-web text-gray-700 mb-3">
                نستخدم المعلومات التي نجمعها للأغراض التالية:
              </p>
              <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                <li>معالجة وتنفيذ طلباتك</li>
                <li>تقديم خدمة العملاء والدعم الفني</li>
                <li>إرسال تحديثات حول طلباتك</li>
                <li>تحسين تجربة التسوق</li>
                <li>إرسال العروض والتحديثات (بموافقتك)</li>
                <li>منع الاحتيال وضمان الأمان</li>
                <li>تحليل سلوك المستخدمين لتحسين الخدمة</li>
                <li>الامتثال للمتطلبات القانونية</li>
              </ul>
            </section>

            {/* مشاركة المعلومات */}
            <section>
              <h2 className="text-2xl font-web mb-4">مشاركة المعلومات</h2>
              <p className="font-web text-gray-700 mb-3">
                نحن لا نبيع أو نؤجر معلوماتك الشخصية. قد نشارك معلوماتك في
                الحالات التالية:
              </p>
              <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                <li>مع شركات الشحن والتوصيل لتنفيذ الطلبات</li>
                <li>مع مقدمي خدمات الدفع الآمنة</li>
                <li>مع مزودي الخدمات التقنية الموثوقين</li>
                <li>عند الطلب من السلطات القانونية</li>
                <li>لحماية حقوقنا وسلامة مستخدمينا</li>
                <li>في حالة دمج أو بيع الشركة</li>
              </ul>
            </section>

            {/* حماية المعلومات */}
            <section>
              <h2 className="text-2xl font-web mb-4">حماية المعلومات</h2>
              <p className="font-web text-gray-700 mb-3">
                نتخذ تدابير أمنية صارمة لحماية معلوماتك:
              </p>
              <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                <li>تشفير SSL لجميع المعاملات</li>
                <li>خوادم آمنة ومحمية</li>
                <li>التحديث المستمر للأنظمة الأمنية</li>
                <li>الوصول المحدود للمعلومات</li>
                <li>مراقبة مستمرة للأنشطة المشبوهة</li>
                <li>نسخ احتياطية آمنة للبيانات</li>
              </ul>
            </section>

            {/* ملفات تعريف الارتباط */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                ملفات تعريف الارتباط (Cookies)
              </h2>
              <div className="space-y-3">
                <p className="font-web text-gray-700">
                  نستخدم ملفات تعريف الارتباط لتحسين تجربتك على موقعنا:
                </p>
                <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                  <li>ملفات تعريف الارتباط الضرورية لتشغيل الموقع</li>
                  <li>ملفات تعريف الارتباط لتذكر تفضيلاتك</li>
                  <li>ملفات تعريف الارتباط لتحليل الأداء</li>
                  <li>ملفات تعريف الارتباط للإعلانات المستهدفة</li>
                </ul>
                <p className="font-web text-gray-700">
                  يمكنك التحكم في ملفات تعريف الارتباط من خلال إعدادات متصفحك.
                </p>
              </div>
            </section>

            {/* حقوقك */}
            <section>
              <h2 className="text-2xl font-web mb-4">حقوقك</h2>
              <p className="font-web text-gray-700 mb-3">
                لديك الحقوق التالية فيما يتعلق بمعلوماتك الشخصية:
              </p>
              <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                <li>الحق في معرفة المعلومات المحفوظة عنك</li>
                <li>الحق في تصحيح المعلومات غير الصحيحة</li>
                <li>الحق في حذف معلوماتك (في حالات معينة)</li>
                <li>الحق في تقييد معالجة معلوماتك</li>
                <li>الحق في نقل معلوماتك</li>
                <li>الحق في الاعتراض على معالجة معلوماتك</li>
                <li>الحق في إلغاء الاشتراك في التسويق</li>
              </ul>
            </section>

            {/* الاحتفاظ بالبيانات */}
            <section>
              <h2 className="text-2xl font-web mb-4">الاحتفاظ بالبيانات</h2>
              <p className="font-web text-gray-700">
                نحتفظ بمعلوماتك الشخصية للفترة اللازمة لتحقيق الأغراض المذكورة
                في هذه السياسة، أو كما يتطلب القانون. بعد انتهاء هذه الفترة،
                سيتم حذف معلوماتك بشكل آمن أو إخفاء هويتها.
              </p>
            </section>

            {/* خصوصية الأطفال */}
            <section>
              <h2 className="text-2xl font-web mb-4">خصوصية الأطفال</h2>
              <p className="font-web text-gray-700">
                موقعنا غير مخصص للأطفال دون سن 18 عاماً. نحن لا نجمع معلومات
                شخصية من الأطفال دون علم أو موافقة والديهم. إذا علمنا أننا جمعنا
                معلومات من طفل دون موافقة والديه، سنقوم بحذف هذه المعلومات
                فوراً.
              </p>
            </section>

            {/* التغييرات على السياسة */}
            <section>
              <h2 className="text-2xl font-web mb-4">التغييرات على السياسة</h2>
              <p className="font-web text-gray-700">
                قد نحدث هذه السياسة من وقت لآخر. سنقوم بإشعارك بأي تغييرات
                جوهرية عبر البريد الإلكتروني أو إشعار على الموقع. التغييرات تصبح
                سارية فور نشرها على الموقع.
              </p>
            </section>

            {/* التواصل معنا */}
            <section>
              <h2 className="text-2xl font-web mb-4">التواصل معنا</h2>
              <p className="font-web text-gray-700 mb-3">
                إذا كان لديك أي أسئلة حول سياسة الخصوصية أو ترغب في ممارسة
                حقوقك، يرجى التواصل معنا عبر:
              </p>
              <div className="space-y-2 font-web text-gray-700">
                <p>البريد الإلكتروني: privacy@azalove.com</p>
                <p>الهاتف: +966 XX XXX XXXX</p>
                <p>العنوان: المملكة العربية السعودية</p>
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}

export default PrivacyPolicy;
