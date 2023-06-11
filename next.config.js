/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["i.ibb.co", "avatars.githubusercontent.com"],
  },
  async rewrites() {
    return [
      {
        source: "/imgbb/:path*",
        destination: "https://api.imgbb.com/:path*"
      },
    ]
  },
}

module.exports = nextConfig
