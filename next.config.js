/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV == 'production'

const nextConfig = {
    basePath: "/frontend-challenge-9",
    output: "export",
    images: {
        unoptimized: true,
    }
}

module.exports = nextConfig
