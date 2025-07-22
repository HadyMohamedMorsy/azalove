"use client";
import { BrandSVG } from "@/components/ui/brand-svg";
import Link from "next/link";

function CookiePolicy() {
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
              <span className="text-gray-700">سياسة ملفات تعريف الارتباط</span>
            </li>
          </ol>
        </nav>
      </header>

      <section className="container py-10 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Brand Identity SVG Header */}
          <div className="text-center mb-12">
            <BrandSVG
              svgName="artboard-39"
              size="xl"
              animate={true}
              className="mx-auto mb-6"
            />
          </div>

          <div className="mb-8">
            <h1 className="text-4xl mb-4 font-web text-right">
              سياسة ملفات تعريف الارتباط
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
                نحن في أزالوف نسعى لتوفير تجربة قراءة مميزة لعشاق الكتب
                الرومانسية من خلال موقعنا الإلكتروني. نستخدم ملفات تعريف
                الارتباط (الكوكيز) لتحسين تجربة التصفح وتخصيص المحتوى وفهم كيفية
                استخدام موقعنا. توضح هذه السياسة كيفية استخدامنا لملفات تعريف
                الارتباط وحقوقكم في إدارتها. نحن ملتزمون بحماية خصوصيتكم وشفافية
                استخدام بياناتكم.
              </p>
            </section>

            {/* ما هي ملفات تعريف الارتباط */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                ما هي ملفات تعريف الارتباط؟
              </h2>
              <div className="space-y-4">
                <p className="font-web text-gray-700">
                  ملفات تعريف الارتباط هي ملفات نصية صغيرة تُحفظ على جهازكم
                  عندما تزورون موقعنا. تساعدنا هذه الملفات على:
                </p>
                <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                  <li>تذكر تفضيلاتكم في القراءة والكتب المفضلة</li>
                  <li>الحفاظ على محتويات سلة التسوق بين الزيارات</li>
                  <li>تسجيل الدخول التلقائي لحسابكم</li>
                  <li>تحليل استخدام الموقع لتحسين الخدمات</li>
                  <li>عرض إعلانات مخصصة للكتب الرومانسية</li>
                  <li>تقديم توصيات كتب مناسبة لأذواقكم</li>
                </ul>
              </div>
            </section>

            {/* أنواع الكوكيز */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                أنواع ملفات تعريف الارتباط
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-web mb-3">
                    الكوكيز الأساسية (ضرورية)
                  </h3>
                  <p className="font-web text-gray-700 mb-2">
                    ضرورية لتشغيل الموقع بشكل صحيح ولا يمكن إيقافها:
                  </p>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>كوكيز الأمان وحماية الموقع</li>
                    <li>كوكيز جلسة تسجيل الدخول</li>
                    <li>كوكيز سلة التسوق والدفع</li>
                    <li>كوكيز تفضيلات اللغة</li>
                    <li>كوكيز الموافقة على الخصوصية</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-web mb-3">
                    كوكيز الأداء والتحليلات
                  </h3>
                  <p className="font-web text-gray-700 mb-2">
                    تساعدنا على فهم كيفية تفاعلكم مع الموقع:
                  </p>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>Google Analytics لتحليل الزيارات</li>
                    <li>إحصائيات الصفحات الأكثر زيارة</li>
                    <li>تتبع الكتب الأكثر مشاهدة</li>
                    <li>قياس أداء الموقع وسرعة التحميل</li>
                    <li>تحليل مسار المستخدم في الموقع</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-web mb-3">كوكيز الوظائف</h3>
                  <p className="font-web text-gray-700 mb-2">
                    تحسن تجربة التصفح وتخصيص المحتوى:
                  </p>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>تذكر تفضيلات عرض الكتب</li>
                    <li>حفظ قائمة الكتب المفضلة</li>
                    <li>تذكر إعدادات الخط وحجم النص</li>
                    <li>تخصيص لوحة المعلومات الشخصية</li>
                    <li>حفظ عوامل التصفية والبحث</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-web mb-3">
                    كوكيز التسويق والإعلان
                  </h3>
                  <p className="font-web text-gray-700 mb-2">
                    تساعدنا في عرض إعلانات مناسبة لاهتماماتكم:
                  </p>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>إعلانات مخصصة للكتب الرومانسية</li>
                    <li>توصيات الكتب بناءً على تاريخ التصفح</li>
                    <li>إعلانات المؤلفين والإصدارات الجديدة</li>
                    <li>عروض خاصة وخصومات مخصصة</li>
                    <li>تتبع فعالية الحملات الإعلانية</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* الأطراف الثالثة */}
            <section>
              <h2 className="text-2xl font-web mb-4">كوكيز الأطراف الثالثة</h2>
              <div className="space-y-4">
                <p className="font-web text-gray-700">
                  نستخدم خدمات من أطراف ثالثة قد تضع كوكيز على موقعنا:
                </p>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-web mb-2">Google Analytics</h3>
                    <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                      <li>تحليل إحصائيات الزيارات</li>
                      <li>فهم سلوك المستخدمين</li>
                      <li>تحسين أداء الموقع</li>
                      <li>يمكن إيقافها من إعدادات المتصفح</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-web mb-2">
                      منصات التواصل الاجتماعي
                    </h3>
                    <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                      <li>Facebook وInstagram للمشاركة</li>
                      <li>تسجيل الدخول عبر الحسابات الاجتماعية</li>
                      <li>عرض المحتوى المتعلق بالكتب</li>
                      <li>التفاعل مع منشورات الكتب</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-web mb-2">خدمات الدفع</h3>
                    <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                      <li>PayPal وApple Pay</li>
                      <li>البطاقات الائتمانية</li>
                      <li>محافظ رقمية محلية</li>
                      <li>تشفير معلومات الدفع</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* كيفية استخدام الكوكيز */}
            <section>
              <h2 className="text-2xl font-web mb-4">كيف نستخدم الكوكيز</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-web mb-2">تحسين تجربة التسوق:</h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>حفظ الكتب في سلة التسوق</li>
                    <li>تذكر تفضيلات الدفع</li>
                    <li>عرض الكتب المشاهدة مؤخراً</li>
                    <li>توصيات كتب مخصصة</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-web mb-2">تخصيص المحتوى:</h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>عرض كتب حسب اهتماماتكم</li>
                    <li>تخصيص الصفحة الرئيسية</li>
                    <li>إشعارات الكتب الجديدة</li>
                    <li>عروض خاصة مخصصة</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-web mb-2">تحليل الأداء:</h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>قياس شعبية الكتب</li>
                    <li>تحليل معدل التحويل</li>
                    <li>فهم تفضيلات القراء</li>
                    <li>تحسين محرك البحث</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* إدارة الكوكيز */}
            <section>
              <h2 className="text-2xl font-web mb-4">إدارة الكوكيز</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-web mb-2">إعدادات الموقع:</h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>مركز إعدادات الخصوصية في حسابكم</li>
                    <li>تحكم في أنواع الكوكيز المقبولة</li>
                    <li>إيقاف الكوكيز التسويقية</li>
                    <li>حذف الكوكيز المحفوظة</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-web mb-2">إعدادات المتصفح:</h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>Chrome: الإعدادات الخصوصية والأمان</li>
                    <li>Firefox: الإعدادات الخصوصية والأمان</li>
                    <li>Safari: التفضيلات الخصوصية</li>
                    <li>Edge: الإعدادات الخصوصية والخدمات</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-web mb-2">
                    تأثير إيقاف الكوكيز:
                  </h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>فقدان محتويات سلة التسوق</li>
                    <li>عدم تذكر تفضيلاتكم</li>
                    <li>ضرورة تسجيل الدخول في كل زيارة</li>
                    <li>عدم تخصيص توصيات الكتب</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* مدة الاحتفاظ */}
            <section>
              <h2 className="text-2xl font-web mb-4">مدة الاحتفاظ بالكوكيز</h2>
              <div className="space-y-3">
                <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                  <li>
                    <strong>كوكيز الجلسة:</strong> تُحذف عند إغلاق المتصفح
                  </li>
                  <li>
                    <strong>كوكيز دائمة:</strong> تبقى لمدة محددة (عادة سنة
                    واحدة)
                  </li>
                  <li>
                    <strong>كوكيز التحليلات:</strong> تُحذف بعد 26 شهراً
                  </li>
                  <li>
                    <strong>كوكيز التسويق:</strong> تُحذف بعد 13 شهراً
                  </li>
                  <li>
                    <strong>كوكيز التفضيلات:</strong> تُحذف بعد سنتين
                  </li>
                </ul>
              </div>
            </section>

            {/* الحقوق والخيارات */}
            <section>
              <h2 className="text-2xl font-web mb-4">حقوقكم وخياراتكم</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-web mb-2">حقوقكم تشمل:</h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>الموافقة على أو رفض الكوكيز</li>
                    <li>حذف الكوكيز المحفوظة</li>
                    <li>تعديل إعدادات الكوكيز</li>
                    <li>الوصول إلى المعلومات المحفوظة</li>
                    <li>سحب الموافقة في أي وقت</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-web mb-2">خيارات التحكم:</h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>قبول جميع الكوكيز</li>
                    <li>قبول الكوكيز الضرورية فقط</li>
                    <li>تخصيص أنواع الكوكيز المقبولة</li>
                    <li>إيقاف الكوكيز التسويقية</li>
                    <li>مراجعة الإعدادات بشكل دوري</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* الأطفال */}
            <section>
              <h2 className="text-2xl font-web mb-4">الأطفال والكوكيز</h2>
              <div className="space-y-3">
                <p className="font-web text-gray-700">
                  نحن لا نجمع عمداً معلومات من الأطفال دون سن 13 عاماً:
                </p>
                <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                  <li>الموقع مخصص للبالغين</li>
                  <li>الكتب الرومانسية للقراء الناضجين</li>
                  <li>نطلب تأكيد العمر عند التسجيل</li>
                  <li>نحذف فوراً أي بيانات للأطفال</li>
                  <li>ننصح الأهالي بمراقبة استخدام الأطفال للإنترنت</li>
                </ul>
              </div>
            </section>

            {/* التحديثات */}
            <section>
              <h2 className="text-2xl font-web mb-4">تحديثات السياسة</h2>
              <div className="space-y-3">
                <p className="font-web text-gray-700 mb-3">
                  قد نحدث سياسة الكوكيز من وقت لآخر:
                </p>
                <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                  <li>إشعار عبر البريد الإلكتروني بالتحديثات</li>
                  <li>نشر التحديثات على الموقع</li>
                  <li>إعطاء مهلة 30 يوماً قبل تطبيق التغييرات</li>
                  <li>طلب موافقة جديدة إذا لزم الأمر</li>
                  <li>الاحتفاظ بنسخة من السياسات السابقة</li>
                </ul>
              </div>
            </section>

            {/* الامتثال القانوني */}
            <section>
              <h2 className="text-2xl font-web mb-4">الامتثال القانوني</h2>
              <div className="space-y-3">
                <p className="font-web text-gray-700 mb-3">
                  نلتزم بالقوانين واللوائح المحلية والدولية:
                </p>
                <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                  <li>نظام حماية البيانات الشخصية السعودي</li>
                  <li>اللائحة الأوروبية لحماية البيانات (GDPR)</li>
                  <li>قانون خصوصية المستهلك في كاليفورنيا</li>
                  <li>معايير الأمان الدولية</li>
                  <li>أفضل الممارسات في حماية البيانات</li>
                </ul>
              </div>
            </section>

            {/* التواصل */}
            <section>
              <h2 className="text-2xl font-web mb-4">التواصل معنا</h2>
              <p className="font-web text-gray-700 mb-3">
                لأي استفسار حول ملفات تعريف الارتباط أو الخصوصية:
              </p>
              <div className="space-y-2 font-web text-gray-700">
                <p>البريد الإلكتروني: privacy@azalove.com</p>
                <p>واتساب: +966 XX XXX XXXX</p>
                <p>مسؤول حماية البيانات: dpo@azalove.com</p>
                <p>العنوان: [عنوان الشركة]</p>
                <p>ساعات العمل: الأحد - الخميس، 9 صباحاً - 6 مساءً</p>
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}

export default CookiePolicy;
