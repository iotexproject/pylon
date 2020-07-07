const { config } = require("dotenv");
config();

let iotexCore = process.env.IOTEX_CORE;
if (!iotexCore) {
  console.warn(
    "cannot find IOTEX_CORE environment variable and fallback to https://api.iotex.one"
  );
  iotexCore = "https://api.iotex.one";
}

module.exports = {
  project: "pylon",
  server: {
    routePrefix: "",
    port: process.env.PORT || 5000,
    proxy: false,
    staticDir: "./dist",
    delayInitMiddleware: false,
    cookie: {
      secrets: ["insecure plain text", "insecure secret here"]
    },
    noSecurityHeadersRoutes: {
      "/api-gateway/": true,
      "/api/": true
    },
    noCsrfRoutes: {
      "/api-gateway/": true,
      "/api/": true
    }
  },
  ssm: {
    enabled: false
  },
  gateways: {
    logger: {
      enabled: true,
      level: "debug"
    },
    mongoose: {
      uri: process.env.MONGODB_URI
    }
  },
  analytics: {
    googleTid: "TODO: replace with your googleTid"
  },
  csp: {
    "default-src": ["none"],
    "manifest-src": ["self"],
    "style-src": ["self", "unsafe-inline", "https://fonts.googleapis.com/css"],
    "frame-src": [],
    "connect-src": [
      "self",
      "https://www.google-analytics.com/",
      "wss://local.iotex.io:64102/",
      "https://api.testnet.iotex.one/",
      "https://api.iotex.one/",
      ...(process.env.API_GATEWAY_URL ? [process.env.API_GATEWAY_URL] : [])
    ],
    "child-src": ["self"],
    "font-src": ["self", "data:", "https://fonts.gstatic.com/"],
    "img-src": ["*", "data:"],
    "media-src": ["self"],
    "object-src": ["self"],
    "script-src": ["self", "unsafe-eval", "https://www.google-analytics.com/"]
  },
  iotexCore
};
