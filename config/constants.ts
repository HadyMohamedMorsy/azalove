export const PRODUCT_SELECT = [
  "id",
  "name",
  "slug",
  "cover",
  "rating",
] as const;

export const SKU_SELECT = [
  "id",
  "sku",
  "price",
  "quantity",
  "discount",
  "discountType",
] as const;

export const CATEGORY_SELECT = ["id", "name", "slug", "icon"] as const;

export const BLOG_SELECT = [
  "id",
  "title",
  "subTitle",
  "slug",
  "views",
  "thumb",
  "shortDescription",
  "isFeatured",
  "createdAt",
] as const;

export const PAYMENT_METHOD_SELECT = [
  "id",
  "name",
  "icon",
  "slug",
] as const;

export const BANK_SELECT = [
  "id",
  "accountName",
  "accountNumber",
  "featuredImage",
  "branchName",
  "bankName",
  "iban",
  "swiftCode",
  "is_active",
] as const;
