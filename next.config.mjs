 /** @type {import('next').NextConfig} */
const nextConfig = {
        env: {
          BASE_URL: "https://kerakollapi.zeroprompts.com/api/",
          API_USERNAME: "admin",
          API_PASSWORD: "admin@123",
          COUPON_URL: "http://localhost:62819/coupon.aspx"
        }
};

export default nextConfig;


