/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["https://admin.azalove.com", "https://api.azalove.com"],
  },
  env: {
    MAIN_DOMAIN: "https://admin.azalove.com/",
    NEXT_PUBLIC_API_URL: "https://api.azalove.com/api/v1",
  },
};

module.exports = nextConfig;
