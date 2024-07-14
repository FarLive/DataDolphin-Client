const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://symbolic-truth-426104-r0.wl.r.appspot.com/',
      changeOrigin: true,
    })
  );
};
