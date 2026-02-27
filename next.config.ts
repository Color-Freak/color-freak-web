import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'placehold.co' },
      { hostname: 'images.unsplash.com' },
      { hostname: 'm.media-amazon.com' }, // Imagens da Amazon
      { hostname: 'seeklogo.com' },       // Logo da Lola
      { hostname: 'lolacosmetics.com.br' },
      { hostname: 'img.freepik.com' },
      { hostname: 'scontent-gru1-2.cdninstagram.com' },
    ],
  },
};

export default nextConfig;