export const API_BASE_URL = "http://localhost:3001/api/v1";

export const API_ENDPOINTS_FROM_NEXT = {
  CATEGORIES: "/api/home/categories",
  BLOGS_HOME: "/api/home/blogs",
  PRODUCTS_BEST_SELLING: "/api/home/products/best-selling",
  PRODUCTS_IS_FEATURED: "/api/home/products/is-featured",
  PRODUCTS_SLIDER: "/api/home/products/slider",
  PRODUCTS_IS_NEW: "/api/home/products/is-new",
  SHOP: "/api/shop",
  BLOGS: "/api/blogs",
  ADDRESSES: "/api/addresses/addresses",
  ADDRESS_UPDATE: "/api/addresses/address-update",
  ADDRESS_CREATE: "/api/addresses/address-create",
  ADDRESS_DELETE: "/api/addresses/address-delete",
  ADDRESS_SET_DEFAULT: "/api/addresses/address-set-default",
};

export const API_ENDPOINTS_FROM_SERVER = {
  CATEGORIES: `/category/front`,
  PRODUCTS: `/product/front`,
  BLOGS: `/blog/front`,
};

export const API_ENDPOINTS_FROM_SERVER_DASHBOARD = {
  ADDRESSES: `/address`,
  ADDRESS_UPDATE: `/address/update`,
  ADDRESS_CREATE: `/address/store`,
  ADDRESS_DELETE: `/address/delete`,
};
