"use client";
import { BrandSVG } from "@/components/ui/brand-svg";
import { useTranslation } from "@/hooks/use-translation";
import Link from "next/link";

function TermsAndConditions() {
  const { t } = useTranslation();

  return (
    <>
      <header className="container px-6 py-4 border-t border-b border-[#eae8e4]">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                {t("termsAndConditions.breadcrumb.home")}
              </Link>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-gray-500">/</span>
              <span className="text-gray-700">
                {t("termsAndConditions.breadcrumb.title")}
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
              svgName="artboard-50"
              size="xl"
              animate={true}
              className="mx-auto mb-6"
            />
          </div>

          <div className="mb-8">
            <h1 className="text-4xl mb-4 font-web text-right">
              {t("termsAndConditions.title")}
            </h1>
            <p className="font-web text-gray-600 text-right">
              {t("termsAndConditions.lastUpdated")}:{" "}
              {new Date().toLocaleDateString("ar-EG")}
            </p>
          </div>

          <div className="space-y-8 text-right">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("termsAndConditions.sections.introduction")}
              </h2>
              <p className="font-web leading-relaxed text-gray-700">
                {t("termsAndConditions.sections.introduction")}
              </p>
            </section>

            {/* Definitions */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("termsAndConditions.sections.definitions.title")}
              </h2>
              <div className="space-y-3">
                <div className="font-web text-gray-700">
                  <strong>
                    {t("termsAndConditions.sections.definitions.items.website")}
                  </strong>
                </div>
                <div className="font-web text-gray-700">
                  <strong>
                    {t("termsAndConditions.sections.definitions.items.user")}
                  </strong>
                </div>
                <div className="font-web text-gray-700">
                  <strong>
                    {t(
                      "termsAndConditions.sections.definitions.items.services"
                    )}
                  </strong>
                </div>
                <div className="font-web text-gray-700">
                  <strong>
                    {t("termsAndConditions.sections.definitions.items.content")}
                  </strong>
                </div>
              </div>
            </section>

            {/* Website Usage */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("termsAndConditions.sections.websiteUsage.title")}
              </h2>
              <div className="space-y-3">
                <p className="font-web text-gray-700">
                  {t("termsAndConditions.sections.websiteUsage.description")}
                </p>
                <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                  <li>
                    {t("termsAndConditions.sections.websiteUsage.prohibited.0")}
                  </li>
                  <li>
                    {t("termsAndConditions.sections.websiteUsage.prohibited.1")}
                  </li>
                  <li>
                    {t("termsAndConditions.sections.websiteUsage.prohibited.2")}
                  </li>
                  <li>
                    {t("termsAndConditions.sections.websiteUsage.prohibited.3")}
                  </li>
                  <li>
                    {t("termsAndConditions.sections.websiteUsage.prohibited.4")}
                  </li>
                </ul>
              </div>
            </section>

            {/* Accounts and Registration */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("termsAndConditions.sections.accounts.title")}
              </h2>
              <div className="space-y-3">
                <p className="font-web text-gray-700">
                  {t("termsAndConditions.sections.accounts.description")}
                </p>
                <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                  <li>
                    {t("termsAndConditions.sections.accounts.requirements.0")}
                  </li>
                  <li>
                    {t("termsAndConditions.sections.accounts.requirements.1")}
                  </li>
                  <li>
                    {t("termsAndConditions.sections.accounts.requirements.2")}
                  </li>
                  <li>
                    {t("termsAndConditions.sections.accounts.requirements.3")}
                  </li>
                </ul>
              </div>
            </section>

            {/* Orders and Payments */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("termsAndConditions.sections.orders.title")}
              </h2>
              <div className="space-y-3">
                <p className="font-web text-gray-700">
                  {t("termsAndConditions.sections.orders.description")}
                </p>
                <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                  <li>{t("termsAndConditions.sections.orders.items.0")}</li>
                  <li>{t("termsAndConditions.sections.orders.items.1")}</li>
                  <li>{t("termsAndConditions.sections.orders.items.2")}</li>
                  <li>{t("termsAndConditions.sections.orders.items.3")}</li>
                  <li>{t("termsAndConditions.sections.orders.items.4")}</li>
                </ul>
              </div>
            </section>

            {/* Shipping and Delivery */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("termsAndConditions.sections.shipping.title")}
              </h2>
              <div className="space-y-3">
                <p className="font-web text-gray-700">
                  {t("termsAndConditions.sections.shipping.description")}
                </p>
                <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                  <li>{t("termsAndConditions.sections.shipping.items.0")}</li>
                  <li>{t("termsAndConditions.sections.shipping.items.1")}</li>
                  <li>{t("termsAndConditions.sections.shipping.items.2")}</li>
                  <li>{t("termsAndConditions.sections.shipping.items.3")}</li>
                  <li>{t("termsAndConditions.sections.shipping.items.4")}</li>
                </ul>
              </div>
            </section>

            {/* Returns and Exchanges */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("termsAndConditions.sections.returns.title")}
              </h2>
              <div className="space-y-3">
                <p className="font-web text-gray-700">
                  {t("termsAndConditions.sections.returns.description")}
                </p>
                <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                  <li>{t("termsAndConditions.sections.returns.items.0")}</li>
                  <li>{t("termsAndConditions.sections.returns.items.1")}</li>
                  <li>{t("termsAndConditions.sections.returns.items.2")}</li>
                  <li>{t("termsAndConditions.sections.returns.items.3")}</li>
                  <li>{t("termsAndConditions.sections.returns.items.4")}</li>
                </ul>
              </div>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("termsAndConditions.sections.intellectualProperty.title")}
              </h2>
              <p className="font-web text-gray-700">
                {t(
                  "termsAndConditions.sections.intellectualProperty.description"
                )}
              </p>
            </section>

            {/* Privacy */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("termsAndConditions.sections.privacy.title")}
              </h2>
              <p className="font-web text-gray-700">
                {t("termsAndConditions.sections.privacy.description")}
              </p>
            </section>

            {/* Disclaimer */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("termsAndConditions.sections.disclaimer.title")}
              </h2>
              <div className="space-y-3">
                <p className="font-web text-gray-700">
                  {t("termsAndConditions.sections.disclaimer.description")}
                </p>
                <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                  <li>{t("termsAndConditions.sections.disclaimer.items.0")}</li>
                  <li>{t("termsAndConditions.sections.disclaimer.items.1")}</li>
                  <li>{t("termsAndConditions.sections.disclaimer.items.2")}</li>
                  <li>{t("termsAndConditions.sections.disclaimer.items.3")}</li>
                  <li>{t("termsAndConditions.sections.disclaimer.items.4")}</li>
                </ul>
              </div>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("termsAndConditions.sections.governingLaw.title")}
              </h2>
              <p className="font-web text-gray-700">
                {t("termsAndConditions.sections.governingLaw.description")}
              </p>
            </section>

            {/* Modifications */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("termsAndConditions.sections.modifications.title")}
              </h2>
              <p className="font-web text-gray-700">
                {t("termsAndConditions.sections.modifications.description")}
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("termsAndConditions.sections.contact.title")}
              </h2>
              <p className="font-web text-gray-700">
                {t("termsAndConditions.sections.contact.description")}
              </p>
              <div className="mt-4 space-y-2 font-web text-gray-700">
                <p>{t("termsAndConditions.sections.contact.items.email")}</p>
                <p>{t("termsAndConditions.sections.contact.items.phone")}</p>
                <p>{t("termsAndConditions.sections.contact.items.address")}</p>
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}

export default TermsAndConditions;
