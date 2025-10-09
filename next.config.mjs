/** @type {import('next').NextConfig} */
const nextConfig = {
  // Compresión y optimización básica
  compress: true,
  poweredByHeader: false,
  
  // Configuración de imágenes
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/webp'],
    minimumCacheTTL: 60,
  },
  
  // Headers de seguridad básicos
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
