"use client";
import { useTranslation } from "@/hooks/use-translation";
import Link from "next/link";

function TermsConditions() {
  const { t } = useTranslation();

  return (
    <>
      <header className="container px-6 py-4 border-t border-b border-[#eae8e4]">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                {t("termsConditions.breadcrumb.home")}
              </Link>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-gray-500">/</span>
              <span className="text-gray-700">
                {t("termsConditions.breadcrumb.title")}
              </span>
            </li>
          </ol>
        </nav>
      </header>

      <section className="container py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl mb-4 font-web text-right">
              {t("termsConditions.title")}
            </h1>
            <p className="font-web text-gray-600 text-right">
              {t("termsConditions.lastUpdated")}:{" "}
              {new Date().toLocaleDateString("ar-EG")}
            </p>
          </div>

          <div className="space-y-8 text-right">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("termsConditions.sections.introduction")}
              </h2>
              <p className="font-web leading-relaxed text-gray-700">
                {t("termsConditions.sections.introduction")}
              </p>
            </section>

            {/* Definitions */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("termsConditions.sections.definitions.title")}
              </h2>
              <div className="space-y-3">
                <p className="font-web text-gray-700 mb-3">
                  {t("termsConditions.sections.definitions.description")}
                </p>
                <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                  <li>
                    <strong>
                      {t("termsConditions.sections.definitions.items.azalove")}
                    </strong>
                  </li>
                  <li>
                    <strong>
                      {t("termsConditions.sections.definitions.items.customer")}
                    </strong>
                  </li>
                  <li>
                    <strong>
                      {t("termsConditions.sections.definitions.items.website")}
                    </strong>
                  </li>
                  <li>
                    <strong>
                      {t("termsConditions.sections.definitions.items.products")}
                    </strong>
                  </li>
                  <li>
                    <strong>
                      {t("termsConditions.sections.definitions.items.order")}
                    </strong>
                  </li>
                  <li>
                    <strong>
                      {t("termsConditions.sections.definitions.items.services")}
                    </strong>
                  </li>
                </ul>
              </div>
            </section>

            {/* Acceptance of Terms */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("termsConditions.sections.acceptance.title")}
              </h2>
              <div className="space-y-3">
                <p className="font-web text-gray-700 mb-3">
                  {t("termsConditions.sections.acceptance.description")}
                </p>
                <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                  <li>{t("termsConditions.sections.acceptance.items.0")}</li>
                  <li>{t("termsConditions.sections.acceptance.items.1")}</li>
                  <li>{t("termsConditions.sections.acceptance.items.2")}</li>
                  <li>{t("termsConditions.sections.acceptance.items.3")}</li>
                  <li>{t("termsConditions.sections.acceptance.items.4")}</li>
                  <li>{t("termsConditions.sections.acceptance.items.5")}</li>
                </ul>
              </div>
            </section>

            {/* Products and Services */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("termsConditions.sections.productsServices.title")}
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-web mb-2">
                    {t(
                      "termsConditions.sections.productsServices.productTypes.title"
                    )}
                  </h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>
                      {t(
                        "termsConditions.sections.productsServices.productTypes.items.0"
                      )}
                    </li>
                    <li>
                      {t(
                        "termsConditions.sections.productsServices.productTypes.items.1"
                      )}
                    </li>
                    <li>
                      {t(
                        "termsConditions.sections.productsServices.productTypes.items.2"
                      )}
                    </li>
                    <li>
                      {t(
                        "termsConditions.sections.productsServices.productTypes.items.3"
                      )}
                    </li>
                    <li>
                      {t(
                        "termsConditions.sections.productsServices.productTypes.items.4"
                      )}
                    </li>
                    <li>
                      {t(
                        "termsConditions.sections.productsServices.productTypes.items.5"
                      )}
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-web mb-2">
                    {t(
                      "termsConditions.sections.productsServices.additionalServices.title"
                    )}
                  </h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>
                      {t(
                        "termsConditions.sections.productsServices.additionalServices.items.0"
                      )}
                    </li>
                    <li>
                      {t(
                        "termsConditions.sections.productsServices.additionalServices.items.1"
                      )}
                    </li>
                    <li>
                      {t(
                        "termsConditions.sections.productsServices.additionalServices.items.2"
                      )}
                    </li>
                    <li>
                      {t(
                        "termsConditions.sections.productsServices.additionalServices.items.3"
                      )}
                    </li>
                    <li>
                      {t(
                        "termsConditions.sections.productsServices.additionalServices.items.4"
                      )}
                    </li>
                    <li>
                      {t(
                        "termsConditions.sections.productsServices.additionalServices.items.5"
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Pricing and Payment */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("termsConditions.sections.pricingPayment.title")}
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-web mb-2">
                    {t("termsConditions.sections.pricingPayment.pricing.title")}
                  </h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>
                      {t(
                        "termsConditions.sections.pricingPayment.pricing.items.0"
                      )}
                    </li>
                    <li>
                      {t(
                        "termsConditions.sections.pricingPayment.pricing.items.1"
                      )}
                    </li>
                    <li>
                      {t(
                        "termsConditions.sections.pricingPayment.pricing.items.2"
                      )}
                    </li>
                    <li>
                      {t(
                        "termsConditions.sections.pricingPayment.pricing.items.3"
                      )}
                    </li>
                    <li>
                      {t(
                        "termsConditions.sections.pricingPayment.pricing.items.4"
                      )}
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-web mb-2">
                    {t(
                      "termsConditions.sections.pricingPayment.paymentMethods.title"
                    )}
                  </h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>
                      {t(
                        "termsConditions.sections.pricingPayment.paymentMethods.items.0"
                      )}
                    </li>
                    <li>
                      {t(
                        "termsConditions.sections.pricingPayment.paymentMethods.items.1"
                      )}
                    </li>
                    <li>
                      {t(
                        "termsConditions.sections.pricingPayment.paymentMethods.items.2"
                      )}
                    </li>
                    <li>
                      {t(
                        "termsConditions.sections.pricingPayment.paymentMethods.items.3"
                      )}
                    </li>
                    <li>
                      {t(
                        "termsConditions.sections.pricingPayment.paymentMethods.items.4"
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Orders and Confirmation */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("termsConditions.sections.ordersConfirmation.title")}
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-web mb-2">
                    {t(
                      "termsConditions.sections.ordersConfirmation.orderProcess.title"
                    )}
                  </h3>
                  <ol className="list-decimal pr-6 space-y-2 font-web text-gray-700">
                    <li>
                      {t(
                        "termsConditions.sections.ordersConfirmation.orderProcess.items.0"
                      )}
                    </li>
                    <li>
                      {t(
                        "termsConditions.sections.ordersConfirmation.orderProcess.items.1"
                      )}
                    </li>
                    <li>
                      {t(
                        "termsConditions.sections.ordersConfirmation.orderProcess.items.2"
                      )}
                    </li>
                    <li>
                      {t(
                        "termsConditions.sections.ordersConfirmation.orderProcess.items.3"
                      )}
                    </li>
                    <li>
                      {t(
                        "termsConditions.sections.ordersConfirmation.orderProcess.items.4"
                      )}
                    </li>
                    <li>
                      {t(
                        "termsConditions.sections.ordersConfirmation.orderProcess.items.5"
                      )}
                    </li>
                  </ol>
                </div>
                <div>
                  <h3 className="text-xl font-web mb-2">
                    {t(
                      "termsConditions.sections.ordersConfirmation.orderConfirmation.title"
                    )}
                  </h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>
                      {t(
                        "termsConditions.sections.ordersConfirmation.orderConfirmation.items.0"
                      )}
                    </li>
                    <li>
                      {t(
                        "termsConditions.sections.ordersConfirmation.orderConfirmation.items.1"
                      )}
                    </li>
                    <li>
                      {t(
                        "termsConditions.sections.ordersConfirmation.orderConfirmation.items.2"
                      )}
                    </li>
                    <li>
                      {t(
                        "termsConditions.sections.ordersConfirmation.orderConfirmation.items.3"
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Shipping and Delivery */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("termsConditions.sections.shippingDelivery.title")}
              </h2>
              <div className="space-y-3">
                <p className="font-web text-gray-700 mb-3">
                  {t("termsConditions.sections.shippingDelivery.description")}{" "}
                  <Link
                    href="/shipping-delivery"
                    className="text-yellow-600 hover:text-yellow-700 underline"
                  >
                    {t("shippingDelivery.breadcrumb.title")}
                  </Link>{" "}
                  {t("termsConditions.sections.shippingDelivery.description")}
                </p>
                <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                  <li>
                    {t("termsConditions.sections.shippingDelivery.items.0")}
                  </li>
                  <li>
                    {t("termsConditions.sections.shippingDelivery.items.1")}
                  </li>
                  <li>
                    {t("termsConditions.sections.shippingDelivery.items.2")}
                  </li>
                  <li>
                    {t("termsConditions.sections.shippingDelivery.items.3")}
                  </li>
                  <li>
                    {t("termsConditions.sections.shippingDelivery.items.4")}
                  </li>
                </ul>
              </div>
            </section>

            {/* Returns and Refunds */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("termsConditions.sections.returnsRefunds.title")}
              </h2>
              <div className="space-y-3">
                <p className="font-web text-gray-700 mb-3">
                  {t("termsConditions.sections.returnsRefunds.description")}{" "}
                  <Link
                    href="/return-refund"
                    className="text-yellow-600 hover:text-yellow-700 underline"
                  >
                    {t("returnRefund.breadcrumb.title")}
                  </Link>{" "}
                  {t("termsConditions.sections.returnsRefunds.description")}
                </p>
                <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                  <li>
                    {t("termsConditions.sections.returnsRefunds.items.0")}
                  </li>
                  <li>
                    {t("termsConditions.sections.returnsRefunds.items.1")}
                  </li>
                  <li>
                    {t("termsConditions.sections.returnsRefunds.items.2")}
                  </li>
                  <li>
                    {t("termsConditions.sections.returnsRefunds.items.3")}
                  </li>
                  <li>
                    {t("termsConditions.sections.returnsRefunds.items.4")}
                  </li>
                </ul>
              </div>
            </section>

            {/* User Accounts */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("termsConditions.sections.userAccounts.title")}
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-web mb-2">
                    {t(
                      "termsConditions.sections.userAccounts.accountCreation.title"
                    )}
                  </h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>
                      {t(
                        "termsConditions.sections.userAccounts.accountCreation.items.0"
                      )}
                    </li>
                    <li>
                      {t(
                        "termsConditions.sections.userAccounts.accountCreation.items.1"
                      )}
                    </li>
                    <li>
                      {t(
                        "termsConditions.sections.userAccounts.accountCreation.items.2"
                      )}
                    </li>
                    <li>
                      {t(
                        "termsConditions.sections.userAccounts.accountCreation.items.3"
                      )}
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-web mb-2">
                    {t(
                      "termsConditions.sections.userAccounts.accountUsage.title"
                    )}
                  </h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>
                      {t(
                        "termsConditions.sections.userAccounts.accountUsage.items.0"
                      )}
                    </li>
                    <li>
                      {t(
                        "termsConditions.sections.userAccounts.accountUsage.items.1"
                      )}
                    </li>
                    <li>
                      {t(
                        "termsConditions.sections.userAccounts.accountUsage.items.2"
                      )}
                    </li>
                    <li>
                      {t(
                        "termsConditions.sections.userAccounts.accountUsage.items.3"
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("termsConditions.sections.intellectualProperty.title")}
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-web mb-2">
                    {t(
                      "termsConditions.sections.intellectualProperty.websiteContent.title"
                    )}
                  </h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>
                      {t(
                        "termsConditions.sections.intellectualProperty.websiteContent.items.0"
                      )}
                    </li>
                    <li>
                      {t(
                        "termsConditions.sections.intellectualProperty.websiteContent.items.1"
                      )}
                    </li>
                    <li>
                      {t(
                        "termsConditions.sections.intellectualProperty.websiteContent.items.2"
                      )}
                    </li>
                    <li>
                      {t(
                        "termsConditions.sections.intellectualProperty.websiteContent.items.3"
                      )}
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-web mb-2">
                    {t(
                      "termsConditions.sections.intellectualProperty.soldBooks.title"
                    )}
                  </h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>
                      {t(
                        "termsConditions.sections.intellectualProperty.soldBooks.items.0"
                      )}
                    </li>
                    <li>
                      {t(
                        "termsConditions.sections.intellectualProperty.soldBooks.items.1"
                      )}
                    </li>
                    <li>
                      {t(
                        "termsConditions.sections.intellectualProperty.soldBooks.items.2"
                      )}
                    </li>
                    <li>
                      {t(
                        "termsConditions.sections.intellectualProperty.soldBooks.items.3"
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Liability and Warranties */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("termsConditions.sections.liabilityWarranties.title")}
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-web mb-2">
                    {t(
                      "termsConditions.sections.liabilityWarranties.productWarranties.title"
                    )}
                  </h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>
                      {t(
                        "termsConditions.sections.liabilityWarranties.productWarranties.items.0"
                      )}
                    </li>
                    <li>
                      {t(
                        "termsConditions.sections.liabilityWarranties.productWarranties.items.1"
                      )}
                    </li>
                    <li>
                      {t(
                        "termsConditions.sections.liabilityWarranties.productWarranties.items.2"
                      )}
                    </li>
                    <li>
                      {t(
                        "termsConditions.sections.liabilityWarranties.productWarranties.items.3"
                      )}
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-web mb-2">
                    {t(
                      "termsConditions.sections.liabilityWarranties.liabilityLimits.title"
                    )}
                  </h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>
                      {t(
                        "termsConditions.sections.liabilityWarranties.liabilityLimits.items.0"
                      )}
                    </li>
                    <li>
                      {t(
                        "termsConditions.sections.liabilityWarranties.liabilityLimits.items.1"
                      )}
                    </li>
                    <li>
                      {t(
                        "termsConditions.sections.liabilityWarranties.liabilityLimits.items.2"
                      )}
                    </li>
                    <li>
                      {t(
                        "termsConditions.sections.liabilityWarranties.liabilityLimits.items.3"
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Privacy and Data Protection */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("termsConditions.sections.privacyDataProtection.title")}
              </h2>
              <div className="space-y-3">
                <p className="font-web text-gray-700 mb-3">
                  {t(
                    "termsConditions.sections.privacyDataProtection.description"
                  )}
                </p>
                <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                  <li>
                    <Link
                      href="/privacy-policy"
                      className="text-yellow-600 hover:text-yellow-700 underline"
                    >
                      {t(
                        "termsConditions.sections.privacyDataProtection.items.0"
                      )}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/cookie-policy"
                      className="text-yellow-600 hover:text-yellow-700 underline"
                    >
                      {t(
                        "termsConditions.sections.privacyDataProtection.items.1"
                      )}
                    </Link>
                  </li>
                  <li>
                    {t(
                      "termsConditions.sections.privacyDataProtection.items.2"
                    )}
                  </li>
                  <li>
                    {t(
                      "termsConditions.sections.privacyDataProtection.items.3"
                    )}
                  </li>
                  <li>
                    {t(
                      "termsConditions.sections.privacyDataProtection.items.4"
                    )}
                  </li>
                </ul>
              </div>
            </section>

            {/* Usage Restrictions */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("termsConditions.sections.usageRestrictions.title")}
              </h2>
              <div className="space-y-3">
                <p className="font-web text-gray-700 mb-3">
                  {t("termsConditions.sections.usageRestrictions.description")}
                </p>
                <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                  <li>
                    {t("termsConditions.sections.usageRestrictions.items.0")}
                  </li>
                  <li>
                    {t("termsConditions.sections.usageRestrictions.items.1")}
                  </li>
                  <li>
                    {t("termsConditions.sections.usageRestrictions.items.2")}
                  </li>
                  <li>
                    {t("termsConditions.sections.usageRestrictions.items.3")}
                  </li>
                  <li>
                    {t("termsConditions.sections.usageRestrictions.items.4")}
                  </li>
                  <li>
                    {t("termsConditions.sections.usageRestrictions.items.5")}
                  </li>
                  <li>
                    {t("termsConditions.sections.usageRestrictions.items.6")}
                  </li>
                </ul>
              </div>
            </section>

            {/* Terms Modifications */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("termsConditions.sections.termsModifications.title")}
              </h2>
              <div className="space-y-3">
                <p className="font-web text-gray-700 mb-3">
                  {t("termsConditions.sections.termsModifications.description")}
                </p>
                <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                  <li>
                    {t("termsConditions.sections.termsModifications.items.0")}
                  </li>
                  <li>
                    {t("termsConditions.sections.termsModifications.items.1")}
                  </li>
                  <li>
                    {t("termsConditions.sections.termsModifications.items.2")}
                  </li>
                  <li>
                    {t("termsConditions.sections.termsModifications.items.3")}
                  </li>
                  <li>
                    {t("termsConditions.sections.termsModifications.items.4")}
                  </li>
                </ul>
              </div>
            </section>

            {/* Agreement Termination */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("termsConditions.sections.agreementTermination.title")}
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-web mb-2">
                    {t(
                      "termsConditions.sections.agreementTermination.byCustomer.title"
                    )}
                  </h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>
                      {t(
                        "termsConditions.sections.agreementTermination.byCustomer.items.0"
                      )}
                    </li>
                    <li>
                      {t(
                        "termsConditions.sections.agreementTermination.byCustomer.items.1"
                      )}
                    </li>
                    <li>
                      {t(
                        "termsConditions.sections.agreementTermination.byCustomer.items.2"
                      )}
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-web mb-2">
                    {t(
                      "termsConditions.sections.agreementTermination.byCompany.title"
                    )}
                  </h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>
                      {t(
                        "termsConditions.sections.agreementTermination.byCompany.items.0"
                      )}
                    </li>
                    <li>
                      {t(
                        "termsConditions.sections.agreementTermination.byCompany.items.1"
                      )}
                    </li>
                    <li>
                      {t(
                        "termsConditions.sections.agreementTermination.byCompany.items.2"
                      )}
                    </li>
                    <li>
                      {t(
                        "termsConditions.sections.agreementTermination.byCompany.items.3"
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Dispute Resolution */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("termsConditions.sections.disputeResolution.title")}
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-web mb-2">
                    {t(
                      "termsConditions.sections.disputeResolution.amicable.title"
                    )}
                  </h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>
                      {t(
                        "termsConditions.sections.disputeResolution.amicable.items.0"
                      )}
                    </li>
                    <li>
                      {t(
                        "termsConditions.sections.disputeResolution.amicable.items.1"
                      )}
                    </li>
                    <li>
                      {t(
                        "termsConditions.sections.disputeResolution.amicable.items.2"
                      )}
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-web mb-2">
                    {t(
                      "termsConditions.sections.disputeResolution.arbitration.title"
                    )}
                  </h3>
                  <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                    <li>
                      {t(
                        "termsConditions.sections.disputeResolution.arbitration.items.0"
                      )}
                    </li>
                    <li>
                      {t(
                        "termsConditions.sections.disputeResolution.arbitration.items.1"
                      )}
                    </li>
                    <li>
                      {t(
                        "termsConditions.sections.disputeResolution.arbitration.items.2"
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("termsConditions.sections.governingLaw.title")}
              </h2>
              <div className="space-y-3">
                <p className="font-web text-gray-700 mb-3">
                  {t("termsConditions.sections.governingLaw.description")}
                </p>
                <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                  <li>{t("termsConditions.sections.governingLaw.items.0")}</li>
                  <li>{t("termsConditions.sections.governingLaw.items.1")}</li>
                  <li>{t("termsConditions.sections.governingLaw.items.2")}</li>
                  <li>{t("termsConditions.sections.governingLaw.items.3")}</li>
                  <li>{t("termsConditions.sections.governingLaw.items.4")}</li>
                </ul>
              </div>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("termsConditions.sections.contactInfo.title")}
              </h2>
              <div className="space-y-3">
                <p className="font-web text-gray-700 mb-3">
                  {t("termsConditions.sections.contactInfo.description")}
                </p>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="space-y-2 font-web text-gray-700">
                    <p>
                      <strong>
                        {t(
                          "termsConditions.sections.contactInfo.companyInfo.companyName"
                        )}
                      </strong>
                    </p>
                    <p>
                      <strong>
                        {t(
                          "termsConditions.sections.contactInfo.companyInfo.address"
                        )}
                      </strong>
                    </p>
                    <p>
                      <strong>
                        {t(
                          "termsConditions.sections.contactInfo.companyInfo.phone"
                        )}
                      </strong>
                    </p>
                    <p>
                      <strong>
                        {t(
                          "termsConditions.sections.contactInfo.companyInfo.email"
                        )}
                      </strong>
                    </p>
                    <p>
                      <strong>
                        {t(
                          "termsConditions.sections.contactInfo.companyInfo.customerService"
                        )}
                      </strong>
                    </p>
                    <p>
                      <strong>
                        {t(
                          "termsConditions.sections.contactInfo.companyInfo.commercialRecord"
                        )}
                      </strong>
                    </p>
                    <p>
                      <strong>
                        {t(
                          "termsConditions.sections.contactInfo.companyInfo.taxNumber"
                        )}
                      </strong>
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Final Provisions */}
            <section>
              <h2 className="text-2xl font-web mb-4">
                {t("termsConditions.sections.finalProvisions.title")}
              </h2>
              <div className="space-y-3">
                <ul className="list-disc pr-6 space-y-2 font-web text-gray-700">
                  <li>
                    {t("termsConditions.sections.finalProvisions.items.0")}
                  </li>
                  <li>
                    {t("termsConditions.sections.finalProvisions.items.1")}
                  </li>
                  <li>
                    {t("termsConditions.sections.finalProvisions.items.2")}
                  </li>
                  <li>
                    {t("termsConditions.sections.finalProvisions.items.3")}
                  </li>
                  <li>
                    {t("termsConditions.sections.finalProvisions.items.4")}
                  </li>
                </ul>
              </div>
            </section>

            {/* Consent Acknowledgment */}
            <section className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <h2 className="text-2xl font-web mb-4">
                {t("termsConditions.sections.consentAcknowledgment.title")}
              </h2>
              <p className="font-web text-gray-700 leading-relaxed">
                {t(
                  "termsConditions.sections.consentAcknowledgment.description"
                )}
              </p>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}

export default TermsConditions;
