import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Private LAN ranges, so phone testing keeps working after the DHCP lease changes
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "172.20.*.*", "*.local"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tgu-website-images.oss-cn-shanghai.aliyuncs.com",
      },
    ],
  },
};

export default nextConfig;
