/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     loader: "cloudinary",
//     path: "https://res.cloudinary.com/drprikq7j/image/upload",
//   },
// };

// export default nextConfig;

const nextConfig = {
  typescript:{
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com", "s.gravatar.com", "lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;
