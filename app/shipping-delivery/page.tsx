"use client";
import { BrandSVG } from "@/components/ui/brand-svg";
import { useTranslation } from "@/hooks/use-translation";
import Link from "next/link";

function ShippingDelivery() {
  const { t } = useTranslation();

  return (
    <>
      <header className="container px-6 py-4 border-t border-b border-[#eae8e4]">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                {t("shippingDelivery.breadcrumb.home")}
              </Link>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-gray-500">/</span>
              <span className="text-gray-700">
                {t("shippingDelivery.breadcrumb.title")}
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
              svgName="artboard-49"
              size="xl"
              animate={true}
              className="mx-auto mb-6"
            />
          </div>

          <div className="mb-8">
            <h1 className="text-4xl mb-4 font-web text-right">
              {t("shippingDelivery.title")}
            </h1>
            <p className="font-web text-gray-600 text-right">
              {t("shippingDelivery.lastUpdated")}:{" "}
              {new Date().toLocaleDateString("ar-EG")}
            </p>
          </div>

          <div className="space-y-8 text-right">
            {/* Introduction */}
            <section>
              <p className="font-web leading-relaxed text-gray-700">
                {t("shippingDelivery.sections.introduction")}
              </p>
            </section>

            {/* Delivery Areas */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("shippingDelivery.sections.deliveryAreas.title")}
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-web mb-2">
                    {t(
                      "shippingDelivery.sections.deliveryAreas.domestic.title"
                    )}
                  </h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>
                      {t(
                        "shippingDelivery.sections.deliveryAreas.domestic.items.riyadh"
                      )}
                    </li>
                    <li>
                      {t(
                        "shippingDelivery.sections.deliveryAreas.domestic.items.jeddahMecca"
                      )}
                    </li>
                    <li>
                      {t(
                        "shippingDelivery.sections.deliveryAreas.domestic.items.dammamKhobar"
                      )}
                    </li>
                    <li>
                      {t(
                        "shippingDelivery.sections.deliveryAreas.domestic.items.medina"
                      )}
                    </li>
                    <li>
                      {t(
                        "shippingDelivery.sections.deliveryAreas.domestic.items.otherRegions"
                      )}
                    </li>
                    <li>
                      {t(
                        "shippingDelivery.sections.deliveryAreas.domestic.items.remoteAreas"
                      )}
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-web mb-2">
                    {t(
                      "shippingDelivery.sections.deliveryAreas.international.title"
                    )}
                  </h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>
                      {t(
                        "shippingDelivery.sections.deliveryAreas.international.items.gccCountries"
                      )}
                    </li>
                    <li>
                      {t(
                        "shippingDelivery.sections.deliveryAreas.international.items.arabCountries"
                      )}
                    </li>
                    <li>
                      {t(
                        "shippingDelivery.sections.deliveryAreas.international.items.worldwide"
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Shipping Times */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("shippingDelivery.sections.shippingTimes.title")}
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-web mb-2">
                    {t(
                      "shippingDelivery.sections.shippingTimes.processing.title"
                    )}
                  </h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>
                      {t(
                        "shippingDelivery.sections.shippingTimes.processing.items.availableBooks"
                      )}
                    </li>
                    <li>
                      {t(
                        "shippingDelivery.sections.shippingTimes.processing.items.importedBooks"
                      )}
                    </li>
                    <li>
                      {t(
                        "shippingDelivery.sections.shippingTimes.processing.items.rareBooks"
                      )}
                    </li>
                    <li>
                      {t(
                        "shippingDelivery.sections.shippingTimes.processing.items.bookSets"
                      )}
                    </li>
                    <li>
                      {t(
                        "shippingDelivery.sections.shippingTimes.processing.items.customBooks"
                      )}
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-web mb-2">
                    {t(
                      "shippingDelivery.sections.shippingTimes.workingDays.title"
                    )}
                  </h3>
                  <p className="font-web text-gray-700">
                    {t(
                      "shippingDelivery.sections.shippingTimes.workingDays.description"
                    )}
                  </p>
                </div>
              </div>
            </section>

            {/* Shipping Costs */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("shippingDelivery.sections.shippingCosts.title")}
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-web mb-2">
                    {t(
                      "shippingDelivery.sections.shippingCosts.domestic.title"
                    )}
                  </h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>
                      {t(
                        "shippingDelivery.sections.shippingCosts.domestic.items.freeShipping"
                      )}
                    </li>
                    <li>
                      {t(
                        "shippingDelivery.sections.shippingCosts.domestic.items.standardShipping"
                      )}
                    </li>
                    <li>
                      {t(
                        "shippingDelivery.sections.shippingCosts.domestic.items.expressShipping"
                      )}
                    </li>
                    <li>
                      {t(
                        "shippingDelivery.sections.shippingCosts.domestic.items.urgentShipping"
                      )}
                    </li>
                    <li>
                      {t(
                        "shippingDelivery.sections.shippingCosts.domestic.items.bookClubMembers"
                      )}
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-web mb-2">
                    {t(
                      "shippingDelivery.sections.shippingCosts.international.title"
                    )}
                  </h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>
                      {t(
                        "shippingDelivery.sections.shippingCosts.international.items.gccCountries"
                      )}
                    </li>
                    <li>
                      {t(
                        "shippingDelivery.sections.shippingCosts.international.items.arabCountries"
                      )}
                    </li>
                    <li>
                      {t(
                        "shippingDelivery.sections.shippingCosts.international.items.worldwide"
                      )}
                    </li>
                    <li>
                      {t(
                        "shippingDelivery.sections.shippingCosts.international.items.freeShipping"
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Shipping Methods */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("shippingDelivery.sections.shippingMethods.title")}
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-web mb-2">
                    {t(
                      "shippingDelivery.sections.shippingMethods.partners.title"
                    )}
                  </h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>
                      {t(
                        "shippingDelivery.sections.shippingMethods.partners.items.expressShipping"
                      )}
                    </li>
                    <li>
                      {t(
                        "shippingDelivery.sections.shippingMethods.partners.items.standardShipping"
                      )}
                    </li>
                    <li>
                      {t(
                        "shippingDelivery.sections.shippingMethods.partners.items.localShipping"
                      )}
                    </li>
                    <li>
                      {t(
                        "shippingDelivery.sections.shippingMethods.partners.items.internationalShipping"
                      )}
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-web mb-2">
                    {t(
                      "shippingDelivery.sections.shippingMethods.deliveryOptions.title"
                    )}
                  </h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>
                      {t(
                        "shippingDelivery.sections.shippingMethods.deliveryOptions.items.homeDelivery"
                      )}
                    </li>
                    <li>
                      {t(
                        "shippingDelivery.sections.shippingMethods.deliveryOptions.items.officeDelivery"
                      )}
                    </li>
                    <li>
                      {t(
                        "shippingDelivery.sections.shippingMethods.deliveryOptions.items.pickupPoints"
                      )}
                    </li>
                    <li>
                      {t(
                        "shippingDelivery.sections.shippingMethods.deliveryOptions.items.personalPickup"
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Packaging */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("shippingDelivery.sections.packaging.title")}
              </h2>
              <div className="space-y-3">
                <p className="font-web text-gray-700 mb-3">
                  {t("shippingDelivery.sections.packaging.description")}
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

            {/* Tracking */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("shippingDelivery.sections.tracking.title")}
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-web mb-2">
                    {t("shippingDelivery.sections.tracking.howToTrack.title")}
                  </h3>
                  <ol className="list-decimal pr-6 space-y-2 font-web text-gray-700">
                    <li>سجل الدخول إلى حسابك في أزلــوڤ</li>
                    <li>اذهب إلى قسم "طلباتي"</li>
                    <li>انقر على رقم الطلب</li>
                    <li>تابع حالة الشحن والتوصيل</li>
                    <li>استلم إشعارات فورية عبر الرسائل النصية</li>
                  </ol>
                </div>
                <div>
                  <h3 className="text-xl font-web mb-2">
                    {t(
                      "shippingDelivery.sections.tracking.orderStatuses.title"
                    )}
                  </h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>
                      {t(
                        "shippingDelivery.sections.tracking.orderStatuses.items.processing"
                      )}
                    </li>
                    <li>
                      {t(
                        "shippingDelivery.sections.tracking.orderStatuses.items.preparing"
                      )}
                    </li>
                    <li>
                      {t(
                        "shippingDelivery.sections.tracking.orderStatuses.items.shipped"
                      )}
                    </li>
                    <li>
                      {t(
                        "shippingDelivery.sections.tracking.orderStatuses.items.outForDelivery"
                      )}
                    </li>
                    <li>
                      {t(
                        "shippingDelivery.sections.tracking.orderStatuses.items.delivered"
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Free Delivery */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("shippingDelivery.sections.freeDelivery.title")}
              </h2>
              <div className="space-y-3">
                <p className="font-web text-gray-700 mb-3">
                  {t("shippingDelivery.sections.freeDelivery.description")}
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

            {/* Fast Delivery */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("shippingDelivery.sections.fastDelivery.title")}
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-web mb-2">
                    {t("shippingDelivery.sections.fastDelivery.sameDay.title")}
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
                    {t(
                      "shippingDelivery.sections.fastDelivery.eveningDelivery.title"
                    )}
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

            {/* Recipient Unavailable */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("shippingDelivery.sections.recipientUnavailable.title")}
              </h2>
              <div className="space-y-3">
                <p className="font-web text-gray-700 mb-3">
                  {t(
                    "shippingDelivery.sections.recipientUnavailable.description"
                  )}
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

            {/* Special Orders */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("shippingDelivery.sections.specialOrders.title")}
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-web mb-2">
                    {t(
                      "shippingDelivery.sections.specialOrders.rareBooks.title"
                    )}
                  </h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>شحن مجاني ومؤمن بالكامل</li>
                    <li>تغليف خاص مقاوم للصدمات</li>
                    <li>تتبع مفصل مع إشعارات مستمرة</li>
                    <li>توثيق بالصور قبل وبعد الشحن</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-web mb-2">
                    {t(
                      "shippingDelivery.sections.specialOrders.giftBooks.title"
                    )}
                  </h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>تغليف هدايا أنيق مجاني</li>
                    <li>رسائل شخصية مكتوبة بخط جميل</li>
                    <li>توقيت توصيل مخصص حسب المناسبة</li>
                    <li>إخفاء الأسعار من الفواتير</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Delivery Problems */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("shippingDelivery.sections.deliveryProblems.title")}
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-web mb-2">
                    {t(
                      "shippingDelivery.sections.deliveryProblems.delays.title"
                    )}
                  </h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>إشعار فوري بسبب التأخير</li>
                    <li>خصم 50% من رسوم الشحن</li>
                    <li>كتاب إضافي مجاني كاعتذار</li>
                    <li>أولوية في الطلبات التالية</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-web mb-2">
                    {t(
                      "shippingDelivery.sections.deliveryProblems.damages.title"
                    )}
                  </h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>استبدال فوري مجاني</li>
                    <li>تحمل كامل تكاليف الشحن</li>
                    <li>تعويض مناسب حسب قيمة الكتاب</li>
                    <li>تحسين طرق التغليف</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Customer Tips */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("shippingDelivery.sections.customerTips.title")}
              </h2>
              <div className="space-y-3">
                <p className="font-web text-gray-700 mb-3">
                  {t("shippingDelivery.sections.customerTips.description")}
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

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("shippingDelivery.sections.contact.title")}
              </h2>
              <p className="font-web text-gray-700 mb-3">
                {t("shippingDelivery.sections.contact.description")}
              </p>
              <div className="space-y-2 font-web text-gray-700">
                <p>{t("shippingDelivery.sections.contact.items.email")}</p>
                <p>{t("shippingDelivery.sections.contact.items.whatsapp")}</p>
                <p>
                  {t("shippingDelivery.sections.contact.items.customerService")}
                </p>
                <p>{t("shippingDelivery.sections.contact.items.emergency")}</p>
                <p>{t("shippingDelivery.sections.contact.items.tracking")}</p>
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}

export default ShippingDelivery;
