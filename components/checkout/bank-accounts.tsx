"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useFetch } from "@/hooks/use-fetch";
import { Bank } from "@/types/payment";
import { Building2, Copy, MapPin } from "lucide-react";
import { useState } from "react";

interface BankAccountsProps {
  onBankSelect?: (bank: Bank) => void;
  selectedBank?: Bank;
}

export function BankAccounts({
  onBankSelect,
  selectedBank,
}: BankAccountsProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Use useFetch for bank accounts
  const {
    data: banksData,
    loading: banksLoading,
    error: banksError,
  } = useFetch<Bank[]>("/api/bank/front");

  // Extract data from response
  const banks = banksData || [];
  const loading = banksLoading;
  const error = banksError;

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (banks.length === 0 && !loading) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500 mb-2">لا توجد حسابات بنكية متاحة</div>
        <p className="text-sm text-gray-400">
          يرجى التواصل معنا للحصول على معلومات الحسابات البنكية
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 mb-2">خطأ في تحميل الحسابات البنكية</div>
        <button
          onClick={() => window.location.reload()}
          className="text-blue-600 hover:underline"
        >
          حاول مرة أخرى
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-azalove-50 border border-azalove-200 rounded-lg p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-azalove-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-azalove-600" />
            </div>
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-royal-800 mb-2">
              تعليمات الدفع
            </h4>
            <p className="text-base text-royal-700 leading-relaxed">
              اختر أحد الحسابات البنكية التالية وقم بتحويل المبلغ المطلوب. سيتم
              تأكيد طلبك فور وصول التحويل.
            </p>
          </div>
        </div>
      </div>

      <div>
        <div className="grid gap-4">
          {banks.map((bank) => (
            <Card
              key={bank.id}
              className="transition-all duration-200 hover:border-azalove-300 hover:shadow-md border-cream-200"
            >
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Bank Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-azalove-50 to-azalove-100 rounded-lg flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-azalove-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-royal-900">
                          {bank.bankName}
                        </h3>
                        <p className="text-sm text-royal-600">
                          {bank.accountName}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-400">
                        {bank.is_active ? "متاح" : "غير متاح"}
                      </div>
                    </div>
                  </div>

                  {/* Bank Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Account Number */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-royal-700">
                        رقم الحساب
                      </label>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 p-3 bg-cream-100 rounded-lg font-mono text-sm text-royal-800">
                          {bank.accountNumber}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(
                              bank.accountNumber,
                              `account-${bank.id}`
                            );
                          }}
                          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                      {copiedField === `account-${bank.id}` && (
                        <p className="text-xs text-green-600">تم النسخ!</p>
                      )}
                    </div>

                    {/* IBAN */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-royal-700">
                        رقم الآيبان
                      </label>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 p-3 bg-cream-100 rounded-lg font-mono text-sm text-royal-800">
                          {bank.iban}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(bank.iban, `iban-${bank.id}`);
                          }}
                          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                      {copiedField === `iban-${bank.id}` && (
                        <p className="text-xs text-green-600">تم النسخ!</p>
                      )}
                    </div>

                    {/* Swift Code */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-royal-700">
                        رمز السويفت
                      </label>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 p-3 bg-cream-100 rounded-lg font-mono text-sm text-royal-800">
                          {bank.swiftCode}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(bank.swiftCode, `swift-${bank.id}`);
                          }}
                          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                      {copiedField === `swift-${bank.id}` && (
                        <p className="text-xs text-green-600">تم النسخ!</p>
                      )}
                    </div>

                    {/* Branch Name */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-royal-700">
                        اسم الفرع
                      </label>
                      <div className="p-3 bg-cream-100 rounded-lg text-sm text-royal-800">
                        {bank.branchName}
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center space-x-2 text-sm text-royal-600">
                    <MapPin className="w-4 h-4" />
                    <span>
                      {bank.area?.name && `${bank.area.name}, `}
                      {bank.city?.name && `${bank.city.name}, `}
                      {bank.region?.name && `${bank.region.name}, `}
                      {bank.country?.name}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
