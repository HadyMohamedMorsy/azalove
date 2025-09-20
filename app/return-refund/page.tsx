"use client";
import { BrandSVG } from "@/components/ui/brand-svg";
import { useTranslation } from "@/hooks/use-translation";
import Link from "next/link";

function ReturnRefund() {
  const { t } = useTranslation();

  return (
    <>
      <header className="container px-6 py-4 border-t border-b border-[#eae8e4]">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                {t("returnRefund.breadcrumb.home")}
              </Link>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-gray-500">/</span>
              <span className="text-gray-700">
                {t("returnRefund.breadcrumb.title")}
              </span>
            </li>
          </ol>
        </nav>
      </header>

      <section className="container py-10 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Brand Identity SVG Header */}
          <div className="text-center mb-12">
            <BrandSVG
              svgName="artboard-49-1"
              size="xl"
              animate={true}
              className="mx-auto mb-6"
            />
          </div>

          <div className="mb-8">
            <h1 className="text-4xl mb-4 font-web text-right">
              {t("returnRefund.title")}
            </h1>
            <p className="font-web text-gray-600 text-right">
              {t("returnRefund.lastUpdated")}:{" "}
              {new Date().toLocaleDateString("ar-EG")}
            </p>
          </div>

          <div className="space-y-8 text-right">
            {/* مقدمة */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("returnRefund.sections.introduction")}
              </h2>
              <p className="font-web leading-relaxed text-gray-700">
                {t("returnRefund.sections.introduction")}
              </p>
            </section>

            {/* فترة الإرجاع */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("returnRefund.sections.returnPeriod.title")}
              </h2>
              <div className="space-y-3">
                <p className="font-web text-gray-700">
                  {t("returnRefund.sections.returnPeriod.description")}
                </p>
                <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                  <li>
                    <strong>
                      {t("returnRefund.sections.returnPeriod.items.paperBooks")}
                    </strong>
                  </li>
                  <li>
                    <strong>
                      {t(
                        "returnRefund.sections.returnPeriod.items.illustratedBooks"
                      )}
                    </strong>
                  </li>
                  <li>
                    <strong>
                      {t("returnRefund.sections.returnPeriod.items.bookSets")}
                    </strong>
                  </li>
                  <li>
                    <strong>
                      {t(
                        "returnRefund.sections.returnPeriod.items.importedBooks"
                      )}
                    </strong>
                  </li>
                  <li>
                    <strong>
                      {t("returnRefund.sections.returnPeriod.items.rareBooks")}
                    </strong>
                  </li>
                </ul>
                <p className="font-web text-gray-700 mt-3">
                  <strong>
                    {t("returnRefund.sections.returnPeriod.note")}
                  </strong>
                </p>
              </div>
            </section>

            {/* شروط الإرجاع */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("returnRefund.sections.returnConditions.title")}
              </h2>
              <p className="font-web text-gray-700 mb-3">
                {t("returnRefund.sections.returnConditions.description")}
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
                {t("returnRefund.sections.nonReturnable.title")}
              </h2>
              <p className="font-web text-gray-700 mb-3">
                {t("returnRefund.sections.nonReturnable.description")}
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
              <h2 className="text-2xl font-web mb-4">
                {t("returnRefund.sections.returnProcess.title")}
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-web mb-2">
                    {t("returnRefund.sections.returnProcess.steps.title")}
                  </h3>
                  <ol className="list-decimal pr-6 space-y-2 font-web text-gray-700">
                    <li>قم بتسجيل الدخول إلى حسابك في أزلــوڤ</li>
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
                  <h3 className="text-xl font-web mb-2">
                    {t("returnRefund.sections.returnProcess.tips.title")}
                  </h3>
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
              <h2 className="text-2xl font-web mb-4">
                {t("returnRefund.sections.returnCosts.title")}
              </h2>
              <div className="space-y-3">
                <p className="font-web text-gray-700 mb-3">
                  {t("returnRefund.sections.returnCosts.description")}
                </p>
                <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                  <li>
                    <strong>
                      {t("returnRefund.sections.returnCosts.items.freeReturn")}
                    </strong>
                  </li>
                  <li>
                    <strong>
                      {t("returnRefund.sections.returnCosts.items.returnFees")}
                    </strong>
                  </li>
                  <li>
                    <strong>
                      {t("returnRefund.sections.returnCosts.items.reducedFees")}
                    </strong>
                  </li>
                </ul>
                <p className="font-web text-gray-700 mt-3">
                  <strong>
                    {t("returnRefund.sections.returnCosts.items.specialOffer")}
                  </strong>
                </p>
              </div>
            </section>

            {/* عمليات الاسترداد */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("returnRefund.sections.refunds.title")}
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-web mb-2">
                    {t("returnRefund.sections.refunds.methods.title")}
                  </h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>الاسترداد إلى نفس طريقة الدفع الأصلية</li>
                    <li>رصيد في موقع أزلــوڤ للكتب الرومانسية</li>
                    <li>بطاقة هدايا لشراء كتب جديدة</li>
                    <li>التبرع بقيمة الكتاب لمكتبة عامة (اختياري)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-web mb-2">
                    {t("returnRefund.sections.refunds.timelines.title")}
                  </h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>
                      <strong>
                        {t(
                          "returnRefund.sections.refunds.timelines.items.creditCards"
                        )}
                      </strong>
                    </li>
                    <li>
                      <strong>
                        {t(
                          "returnRefund.sections.refunds.timelines.items.prepaidCards"
                        )}
                      </strong>
                    </li>
                    <li>
                      <strong>
                        {t(
                          "returnRefund.sections.refunds.timelines.items.digitalWallets"
                        )}
                      </strong>
                    </li>
                    <li>
                      <strong>
                        {t(
                          "returnRefund.sections.refunds.timelines.items.siteCredit"
                        )}
                      </strong>
                    </li>
                    <li>
                      <strong>
                        {t(
                          "returnRefund.sections.refunds.timelines.items.giftCards"
                        )}
                      </strong>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* الاستبدال */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("returnRefund.sections.replacement.title")}
              </h2>
              <div className="space-y-3">
                <p className="font-web text-gray-700 mb-3">
                  {t("returnRefund.sections.replacement.description")}
                </p>
                <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                  <li>استبدال الكتاب التالف أو المعيب في الطباعة</li>
                  <li>استبدال الكتاب بإصدار أحدث من نفس المؤلف</li>
                  <li>استبدال الكتاب بجزء آخر من نفس السلسلة</li>
                  <li>استبدال الكتاب بكتاب آخر من نفس فئة السعر</li>
                  <li>استبدال الطبعة العادية بالطبعة المميزة (مع دفع الفرق)</li>
                </ul>
                <p className="font-web text-gray-700 mt-3">
                  <strong>
                    {t("returnRefund.sections.replacement.benefits")}
                  </strong>
                </p>
              </div>
            </section>

            {/* حالات خاصة */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("returnRefund.sections.specialCases.title")}
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-web mb-2">
                    {t("returnRefund.sections.specialCases.defective.title")}
                  </h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>إرجاع فوري مع استرداد كامل</li>
                    <li>شحن مجاني للكتاب البديل</li>
                    <li>كتاب إضافي مجاني كاعتذار</li>
                    <li>أولوية في الحصول على الإصدارات الجديدة</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-web mb-2">
                    {t("returnRefund.sections.specialCases.wrongOrders.title")}
                  </h3>
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
              <h2 className="text-2xl font-web mb-4">
                {t("returnRefund.sections.tracking.title")}
              </h2>
              <p className="font-web text-gray-700 mb-3">
                {t("returnRefund.sections.tracking.description")}
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
              <h2 className="text-2xl font-web mb-4">
                {t("returnRefund.sections.giftReturns.title")}
              </h2>
              <p className="font-web text-gray-700 mb-3">
                {t("returnRefund.sections.giftReturns.description")}
              </p>
              <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                <li>يمكن إرجاع الكتب المُهداة خلال 45 يوماً</li>
                <li>الاسترداد يتم كرصيد في موقع أزلــوڤ</li>
                <li>يمكن استبدال الكتاب بكتاب آخر مجاناً</li>
                <li>يمكن للمُهدي طلب الاسترداد المالي</li>
                <li>بطاقة هدايا جديدة بنفس القيمة</li>
                <li>تغليف هدايا مجاني للكتاب البديل</li>
              </ul>
            </section>

            {/* التواصل */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("returnRefund.sections.contact.title")}
              </h2>
              <p className="font-web text-gray-700 mb-3">
                {t("returnRefund.sections.contact.description")}
              </p>
              <div className="space-y-2 font-web text-gray-700">
                <p>{t("returnRefund.sections.contact.items.email")}</p>
                <p>{t("returnRefund.sections.contact.items.whatsapp")}</p>
                <p>{t("returnRefund.sections.contact.items.liveChat")}</p>
                <p>
                  {t(
                    "returnRefund.sections.contact.items.readingConsultations"
                  )}
                </p>
                <p>{t("returnRefund.sections.contact.items.bookClub")}</p>
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}

export default ReturnRefund;
