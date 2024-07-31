const nextConfig = {
  images: {
    domains: ["localhost", "mi-huerto.com", "api.mi-huerto.com"],
  },
  env: {
    API_URL: "http://localhost:3005/v1/api",
    SERVER_URL: "https://api.mi-huerto.com/",
  },
  redirects: async () => {
    return [
      { source: "/", destination: "/authentication/login", permanent: true },
    ];
  },
};

module.exports = nextConfig;
