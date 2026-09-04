/* eslint no-console: ["error", { allow: ["error"] }] */
export default function applyConfig(config) {
  const { settings } = config;
  const corsProxyPath = settings.corsProxyPath || '/cors-proxy';

  const env_destinations = (process.env.RAZZLE_ALLOWED_CORS_DESTINATIONS || '')
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  // Update allowed_cors_destinations with RAZZLE_ALLOWED_CORS_DESTINATIONS
  config.settings.allowed_cors_destinations = [
    ...(config.settings.allowed_cors_destinations || []),
    ...env_destinations,
  ];

  if (__SERVER__) {
    const proxy = require('http-proxy-middleware');
    const express = require('express');
    const middleware = express.Router();
    const options = {
      logLevel: 'silent',
      followRedirects: true,
      changeOrigin: true,
      target: 'http://volto-cors-proxy.eea.europa.eu',
      router: (req) => {
        const allowed_cors_destinations = [
          ...config.settings.allowed_cors_destinations,
        ];

        const url = new URL(req.params['0']);
        const target =
          allowed_cors_destinations.indexOf(url.hostname) > -1
            ? `${url.protocol}//${url.hostname}${
                url.port ? `:${url.port}` : ''
              }`
            : null;
        return target;
      },
      pathRewrite: (path, req) => {
        const reqpath = path.slice(corsProxyPath.length + 1);
        const url = new URL(reqpath);
        const rewpath = `${url.pathname}${url.search || ''}`;
        return rewpath;
      },
      onError: (err, req, res) => {
        console.error('proxy error', err);
        throw new Error(err);
      },
    };
    middleware.all(`${corsProxyPath}/*`, proxy.createProxyMiddleware(options));
    middleware.id = 'cors-proxy';
    settings.expressMiddleware.push(middleware);
  }

  return config;
}
