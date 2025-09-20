/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ["admin.azalove.com", "api.azalove.com"],
    domains: ["localhost"],
  },
  env: {
    // MAIN_DOMAIN: "https://admin.azalove.com/",
    // NEXT_PUBLIC_API_URL: "https://api.azalove.com/api/v1",
    MAIN_DOMAIN: "http://localhost:3001/",
    NEXT_PUBLIC_API_URL: "http://localhost:3001/api/v1",
  },
};

module.exports = nextConfig;
