import { useGeneralSettings } from "@/contexts/general-settings-context";

export const useCurrency = () => {
  const { settings } = useGeneralSettings();

  const formatCurrency = (amount: number | null | undefined): string => {
    // Handle null, undefined, or non-numeric values
    if (amount === null || amount === undefined || isNaN(amount)) {
      return settings?.currency_symbol
        ? `${settings.currency_symbol}0.00`
        : "$0.00";
    }

    // Ensure amount is a number
    const numericAmount = Number(amount);

    if (!settings?.currency_symbol) {
      return `$${numericAmount.toFixed(2)}`;
    }

    // For RTL languages like Arabic, put currency symbol after the number
    const isRTL =
      typeof document !== "undefined" && document.documentElement.dir === "rtl";

    if (isRTL) {
      return `${numericAmount.toFixed(2)} ${settings.currency_symbol}`;
    } else {
      return `${settings.currency_symbol}${numericAmount.toFixed(2)}`;
    }
  };

  const getCurrencySymbol = (): string => {
    return settings?.currency_symbol || "$";
  };

  const getDefaultCurrency = (): string => {
    return settings?.default_currency || "USD";
  };

  const getTaxRate = (): number => {
    return settings?.tax_rate || 0;
  };

  const calculateTax = (amount: number | null | undefined): number => {
    if (amount === null || amount === undefined || isNaN(amount)) {
      return 0;
    }
    const taxRate = getTaxRate();
    return (Number(amount) * taxRate) / 100;
  };

  const calculateTotalWithTax = (amount: number | null | undefined): number => {
    if (amount === null || amount === undefined || isNaN(amount)) {
      return 0;
    }
    return Number(amount) + calculateTax(amount);
  };

  return {
    formatCurrency,
    getCurrencySymbol,
    getDefaultCurrency,
    getTaxRate,
    calculateTax,
    calculateTotalWithTax,
    currencySymbol: settings?.currency_symbol || "$",
    defaultCurrency: settings?.default_currency || "USD",
    taxRate: settings?.tax_rate || 0,
  };
};
