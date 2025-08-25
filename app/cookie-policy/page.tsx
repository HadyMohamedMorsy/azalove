"use client";
import { BrandSVG } from "@/components/ui/brand-svg";
import { useLocale } from "@/hooks/use-locale";
import { useTranslation } from "@/hooks/use-translation";
import { translations } from "@/lib/translations";
import Link from "next/link";

function CookiePolicy() {
  const { t } = useTranslation();
  const { locale } = useLocale();
  const cookiePolicy = translations[locale].cookiePolicy;

  return (
    <>
      <header className="container px-6 py-4 border-t border-b border-[#eae8e4]">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                {t("cookiePolicy.breadcrumb.home")}
              </Link>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-gray-500">/</span>
              <span className="text-gray-700">
                {t("cookiePolicy.breadcrumb.cookiePolicy")}
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
              svgName="artboard-39"
              size="xl"
              animate={true}
              className="mx-auto mb-6"
            />
          </div>

          <div className="mb-8">
            <h1 className="text-4xl mb-4 font-web text-right">
              {t("cookiePolicy.title")}
            </h1>
            <p className="font-web text-gray-600 text-right">
              {t("cookiePolicy.lastUpdated")}:{" "}
              {new Date().toLocaleDateString("ar-EG")}
            </p>
          </div>

          <div className="space-y-8 text-right">
            {/* مقدمة */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("cookiePolicy.sections.introduction.title")}
              </h2>
              <p className="font-web leading-relaxed text-gray-700">
                {t("cookiePolicy.sections.introduction.content")}
              </p>
            </section>

            {/* ما هي ملفات تعريف الارتباط */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("cookiePolicy.sections.whatAreCookies.title")}
              </h2>
              <div className="space-y-4">
                <p className="font-web text-gray-700">
                  {t("cookiePolicy.sections.whatAreCookies.content")}
                </p>
                <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                  {cookiePolicy.sections.whatAreCookies.benefits.map(
                    (benefit, index) => (
                      <li key={index}>{benefit}</li>
                    )
                  )}
                </ul>
              </div>
            </section>

            {/* أنواع الكوكيز */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("cookiePolicy.sections.cookieTypes.title")}
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-web mb-3">
                    {t("cookiePolicy.sections.cookieTypes.essential.title")}
                  </h3>
                  <p className="font-web text-gray-700 mb-2">
                    {t(
                      "cookiePolicy.sections.cookieTypes.essential.description"
                    )}
                  </p>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    {cookiePolicy.sections.cookieTypes.essential.items.map(
                      (item, index) => (
                        <li key={index}>{item}</li>
                      )
                    )}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-web mb-3">
                    {t("cookiePolicy.sections.cookieTypes.performance.title")}
                  </h3>
                  <p className="font-web text-gray-700 mb-2">
                    {t(
                      "cookiePolicy.sections.cookieTypes.performance.description"
                    )}
                  </p>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    {cookiePolicy.sections.cookieTypes.performance.items.map(
                      (item, index) => (
                        <li key={index}>{item}</li>
                      )
                    )}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-web mb-3">
                    {t("cookiePolicy.sections.cookieTypes.functional.title")}
                  </h3>
                  <p className="font-web text-gray-700 mb-2">
                    {t(
                      "cookiePolicy.sections.cookieTypes.functional.description"
                    )}
                  </p>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    {cookiePolicy.sections.cookieTypes.functional.items.map(
                      (item, index) => (
                        <li key={index}>{item}</li>
                      )
                    )}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-web mb-3">
                    {t("cookiePolicy.sections.cookieTypes.marketing.title")}
                  </h3>
                  <p className="font-web text-gray-700 mb-2">
                    {t(
                      "cookiePolicy.sections.cookieTypes.marketing.description"
                    )}
                  </p>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    {cookiePolicy.sections.cookieTypes.marketing.items.map(
                      (item, index) => (
                        <li key={index}>{item}</li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </section>

            {/* الأطراف الثالثة */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("cookiePolicy.sections.thirdParty.title")}
              </h2>
              <div className="space-y-4">
                <p className="font-web text-gray-700">
                  {t("cookiePolicy.sections.thirdParty.content")}
                </p>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-web mb-2">
                      {t(
                        "cookiePolicy.sections.thirdParty.googleAnalytics.title"
                      )}
                    </h3>
                    <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                      {cookiePolicy.sections.thirdParty.googleAnalytics.items.map(
                        (item, index) => (
                          <li key={index}>{item}</li>
                        )
                      )}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-web mb-2">
                      {t("cookiePolicy.sections.thirdParty.socialMedia.title")}
                    </h3>
                    <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                      {cookiePolicy.sections.thirdParty.socialMedia.items.map(
                        (item, index) => (
                          <li key={index}>{item}</li>
                        )
                      )}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-web mb-2">
                      {t(
                        "cookiePolicy.sections.thirdParty.paymentServices.title"
                      )}
                    </h3>
                    <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                      {cookiePolicy.sections.thirdParty.paymentServices.items.map(
                        (item, index) => (
                          <li key={index}>{item}</li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* كيفية استخدام الكوكيز */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("cookiePolicy.sections.howWeUse.title")}
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-web mb-2">
                    {t("cookiePolicy.sections.howWeUse.shopping.title")}
                  </h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    {cookiePolicy.sections.howWeUse.shopping.items.map(
                      (item, index) => (
                        <li key={index}>{item}</li>
                      )
                    )}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-web mb-2">
                    {t("cookiePolicy.sections.howWeUse.personalization.title")}
                  </h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    {cookiePolicy.sections.howWeUse.personalization.items.map(
                      (item, index) => (
                        <li key={index}>{item}</li>
                      )
                    )}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-web mb-2">
                    {t("cookiePolicy.sections.howWeUse.analytics.title")}
                  </h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    {cookiePolicy.sections.howWeUse.analytics.items.map(
                      (item, index) => (
                        <li key={index}>{item}</li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </section>

            {/* إدارة الكوكيز */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("cookiePolicy.sections.management.title")}
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-web mb-2">
                    {t(
                      "cookiePolicy.sections.management.websiteSettings.title"
                    )}
                  </h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    {cookiePolicy.sections.management.websiteSettings.items.map(
                      (item, index) => (
                        <li key={index}>{item}</li>
                      )
                    )}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-web mb-2">
                    {t(
                      "cookiePolicy.sections.management.browserSettings.title"
                    )}
                  </h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    {cookiePolicy.sections.management.browserSettings.items.map(
                      (item, index) => (
                        <li key={index}>{item}</li>
                      )
                    )}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-web mb-2">
                    {t("cookiePolicy.sections.management.impact.title")}
                  </h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    {cookiePolicy.sections.management.impact.items.map(
                      (item, index) => (
                        <li key={index}>{item}</li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </section>

            {/* مدة الاحتفاظ */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("cookiePolicy.sections.retention.title")}
              </h2>
              <div className="space-y-3">
                <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                  {cookiePolicy.sections.retention.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </section>

            {/* الحقوق والخيارات */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("cookiePolicy.sections.rights.title")}
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-web mb-2">
                    {t("cookiePolicy.sections.rights.yourRights.title")}
                  </h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    {cookiePolicy.sections.rights.yourRights.items.map(
                      (item, index) => (
                        <li key={index}>{item}</li>
                      )
                    )}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-web mb-2">
                    {t("cookiePolicy.sections.rights.controlOptions.title")}
                  </h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    {cookiePolicy.sections.rights.controlOptions.items.map(
                      (item, index) => (
                        <li key={index}>{item}</li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </section>

            {/* الأطفال */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("cookiePolicy.sections.children.title")}
              </h2>
              <div className="space-y-3">
                <p className="font-web text-gray-700">
                  {t("cookiePolicy.sections.children.content")}
                </p>
                <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                  {cookiePolicy.sections.children.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </section>

            {/* التحديثات */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("cookiePolicy.sections.updates.title")}
              </h2>
              <div className="space-y-3">
                <p className="font-web text-gray-700 mb-3">
                  {t("cookiePolicy.sections.updates.content")}
                </p>
                <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                  {cookiePolicy.sections.updates.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </section>

            {/* الامتثال القانوني */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("cookiePolicy.sections.compliance.title")}
              </h2>
              <div className="space-y-3">
                <p className="font-web text-gray-700 mb-3">
                  {t("cookiePolicy.sections.compliance.content")}
                </p>
                <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                  {cookiePolicy.sections.compliance.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </section>

            {/* التواصل */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("cookiePolicy.sections.contact.title")}
              </h2>
              <p className="font-web text-gray-700 mb-3">
                {t("cookiePolicy.sections.contact.content")}
              </p>
              <div className="space-y-2 font-web text-gray-700">
                <p>{t("cookiePolicy.sections.contact.email")}</p>
                <p>{t("cookiePolicy.sections.contact.whatsapp")}</p>
                <p>{t("cookiePolicy.sections.contact.dpo")}</p>
                <p>{t("cookiePolicy.sections.contact.address")}</p>
                <p>{t("cookiePolicy.sections.contact.workingHours")}</p>
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}

export default CookiePolicy;
