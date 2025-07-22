"use client";
import { BrandSVG } from "@/components/ui/brand-svg";
import Link from "next/link";

function TermsAndConditions() {
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
          {/* Brand Identity SVG Header */}
          <div className="text-center mb-12">
            <BrandSVG
              svgName="artboard-50"
              size="xl"
              animate={true}
              className="mx-auto mb-6"
            />
          </div>

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
                مرحباً بك في موقع أزالوف للتجارة الإلكترونية. هذه الشروط
                والأحكام تحكم استخدامك لموقعنا الإلكتروني والخدمات المقدمة من
                خلاله. باستخدام موقعنا، فإنك توافق على الالتزام بهذه الشروط
                والأحكام. إذا كنت لا توافق على أي جزء من هذه الشروط، فيرجى عدم
                استخدام موقعنا.
              </p>
            </section>

            {/* تعريفات */}
            <section>
              <h2 className="text-2xl font-web mb-4">التعريفات</h2>
              <div className="space-y-3">
                <div className="font-web text-gray-700">
                  <strong>الموقع:</strong> يشير إلى موقع أزالوف الإلكتروني
                </div>
                <div className="font-web text-gray-700">
                  <strong>المستخدم:</strong> أي شخص يستخدم الموقع أو يصل إليه
                </div>
                <div className="font-web text-gray-700">
                  <strong>الخدمات:</strong> جميع الخدمات المقدمة من خلال الموقع
                </div>
                <div className="font-web text-gray-700">
                  <strong>المحتوى:</strong> جميع النصوص والصور والمعلومات
                  المعروضة على الموقع
                </div>
              </div>
            </section>

            {/* استخدام الموقع */}
            <section>
              <h2 className="text-2xl font-web mb-4">استخدام الموقع</h2>
              <div className="space-y-3">
                <p className="font-web text-gray-700">
                  يُسمح لك باستخدام هذا الموقع للأغراض الشخصية والتجارية
                  المشروعة فقط. يُحظر عليك:
                </p>
                <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                  <li>استخدام الموقع لأي غرض غير قانوني أو غير مصرح به</li>
                  <li>نشر أو نقل أي محتوى ضار أو مؤذي</li>
                  <li>انتهاك حقوق الملكية الفكرية لأي طرف ثالث</li>
                  <li>محاولة الوصول غير المصرح به إلى أنظمة الموقع</li>
                  <li>استخدام الموقع لإرسال رسائل غير مرغوب فيها</li>
                </ul>
              </div>
            </section>

            {/* الحسابات والتسجيل */}
            <section>
              <h2 className="text-2xl font-web mb-4">الحسابات والتسجيل</h2>
              <div className="space-y-3">
                <p className="font-web text-gray-700">
                  لاستخدام بعض خدمات الموقع، قد تحتاج إلى إنشاء حساب. عند إنشاء
                  حساب، يجب عليك:
                </p>
                <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                  <li>تقديم معلومات دقيقة وكاملة</li>
                  <li>الحفاظ على سرية معلومات تسجيل الدخول</li>
                  <li>إشعارنا فوراً بأي استخدام غير مصرح به لحسابك</li>
                  <li>تحديث معلوماتك الشخصية عند الحاجة</li>
                </ul>
              </div>
            </section>

            {/* الطلبات والمدفوعات */}
            <section>
              <h2 className="text-2xl font-web mb-4">الطلبات والمدفوعات</h2>
              <div className="space-y-3">
                <p className="font-web text-gray-700">
                  عند تقديم طلب عبر موقعنا:
                </p>
                <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                  <li>جميع الطلبات تخضع لتأكيد التوفر والقبول</li>
                  <li>الأسعار المعروضة شاملة ضريبة القيمة المضافة</li>
                  <li>نحتفظ بالحق في رفض أي طلب لأي سبب</li>
                  <li>الدفع مطلوب قبل معالجة الطلب</li>
                  <li>نقبل وسائل الدفع المختلفة المعروضة على الموقع</li>
                </ul>
              </div>
            </section>

            {/* الشحن والتسليم */}
            <section>
              <h2 className="text-2xl font-web mb-4">الشحن والتسليم</h2>
              <div className="space-y-3">
                <p className="font-web text-gray-700">
                  معلومات الشحن والتسليم:
                </p>
                <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                  <li>
                    نقوم بالشحن إلى العناوين المحددة في المملكة العربية السعودية
                  </li>
                  <li>أوقات التسليم تختلف حسب الموقع والمنتج</li>
                  <li>رسوم الشحن تُحسب عند الدفع</li>
                  <li>العميل مسؤول عن تقديم عنوان تسليم صحيح</li>
                  <li>نحتفظ بالحق في تغيير شركات الشحن</li>
                </ul>
              </div>
            </section>

            {/* الإرجاع والاستبدال */}
            <section>
              <h2 className="text-2xl font-web mb-4">الإرجاع والاستبدال</h2>
              <div className="space-y-3">
                <p className="font-web text-gray-700">
                  سياسة الإرجاع والاستبدال:
                </p>
                <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                  <li>يمكن إرجاع المنتجات خلال 14 يوم من تاريخ الاستلام</li>
                  <li>يجب أن تكون المنتجات في حالتها الأصلية</li>
                  <li>بعض المنتجات قد تكون غير قابلة للإرجاع</li>
                  <li>رسوم الإرجاع قد تُطبق حسب الحالة</li>
                  <li>المبالغ المستردة تُعاد خلال 5-7 أيام عمل</li>
                </ul>
              </div>
            </section>

            {/* الملكية الفكرية */}
            <section>
              <h2 className="text-2xl font-web mb-4">الملكية الفكرية</h2>
              <p className="font-web text-gray-700">
                جميع المحتويات الموجودة على هذا الموقع، بما في ذلك النصوص والصور
                والشعارات والتصاميم، محمية بحقوق الطبع والنشر وحقوق الملكية
                الفكرية. لا يُسمح بنسخ أو توزيع أو تعديل أي محتوى دون إذن خطي
                مسبق.
              </p>
            </section>

            {/* الخصوصية */}
            <section>
              <h2 className="text-2xl font-web mb-4">الخصوصية</h2>
              <p className="font-web text-gray-700">
                نحن نلتزم بحماية خصوصيتك. معلوماتك الشخصية تُستخدم فقط لتقديم
                خدماتنا وتحسين تجربتك. لا نشارك معلوماتك مع أطراف ثالثة إلا
                بموافقتك أو عند الضرورة القانونية. يُرجى مراجعة سياسة الخصوصية
                للمزيد من التفاصيل.
              </p>
            </section>

            {/* إخلاء المسؤولية */}
            <section>
              <h2 className="text-2xl font-web mb-4">إخلاء المسؤولية</h2>
              <div className="space-y-3">
                <p className="font-web text-gray-700">
                  الموقع والخدمات المقدمة "كما هي" دون أي ضمانات. نحن لا نتحمل
                  المسؤولية عن:
                </p>
                <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                  <li>أي أضرار مباشرة أو غير مباشرة</li>
                  <li>فقدان البيانات أو الأرباح</li>
                  <li>انقطاع الخدمة أو الأخطاء التقنية</li>
                  <li>محتوى الأطراف الثالثة</li>
                  <li>استخدام المنتجات بطريقة غير صحيحة</li>
                </ul>
              </div>
            </section>

            {/* القانون المطبق */}
            <section>
              <h2 className="text-2xl font-web mb-4">القانون المطبق</h2>
              <p className="font-web text-gray-700">
                تخضع هذه الشروط والأحكام لقوانين المملكة العربية السعودية. أي
                نزاع ينشأ عن استخدام هذا الموقع يخضع للاختصاص القضائي للمحاكم
                السعودية.
              </p>
            </section>

            {/* التعديلات */}
            <section>
              <h2 className="text-2xl font-web mb-4">التعديلات</h2>
              <p className="font-web text-gray-700">
                نحتفظ بالحق في تعديل هذه الشروط والأحكام في أي وقت. التعديلات
                تصبح سارية فور نشرها على الموقع. استمرار استخدامك للموقع بعد
                التعديلات يعني موافقتك على الشروط المحدثة.
              </p>
            </section>

            {/* التواصل */}
            <section>
              <h2 className="text-2xl font-web mb-4">التواصل</h2>
              <p className="font-web text-gray-700">
                إذا كان لديك أي أسئلة حول هذه الشروط والأحكام، يرجى التواصل معنا
                عبر:
              </p>
              <div className="mt-4 space-y-2 font-web text-gray-700">
                <p>البريد الإلكتروني: info@azalove.com</p>
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

export default TermsAndConditions;
