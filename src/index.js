export default (config) => {
  const { settings } = config;
  const corsProxyPath = settings.corsProxyPath || '/cors-proxy';

  if (__SERVER__) {
    const env_destinations = (
      process.env.RAZZLE_ALLOWED_CORS_DESTINATIONS || ''
    )
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const allowed_cors_destinations = [
      ...(settings.allowed_cors_destinations || []),
      ...env_destinations,
    ];

    const proxy = require('http-proxy-middleware');
    const express = require('express');
    const middleware = express.Router();
    const options = {
      changeOrigin: true,
      target: 'http://it-does-not-matter-what-it-says.com',
      router: (req) => {
        const url = new URL(req.params['0']);
        const target = `${url.protocol}//${url.hostname}${
          url.port ? `:${url.port}` : ''
        }`;
        return allowed_cors_destinations.indexOf(target) > -1 ? target : null;
      },
      pathRewrite: (path, req) => {
        const reqpath = path.slice(corsProxyPath.length + 1);
        const url = new URL(reqpath);
        const rewpath = `${url.pathname}${url.search || ''}`;
        return rewpath;
      },
    };
    middleware.all(`${corsProxyPath}/*`, proxy.createProxyMiddleware(options));
    middleware.id = 'cors-proxy';
    settings.expressMiddleware.push(middleware);
  }

  return config;
};
