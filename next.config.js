/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "http://localhost:3001"],
  },
  env: {
    MAIN_DOMAIN: "http://localhost:3001/",
    NEXT_PUBLIC_API_URL: "http://localhost:3001/api/v1",
  },
};

module.exports = nextConfig;
