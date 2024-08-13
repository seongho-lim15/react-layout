const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/item',
    createProxyMiddleware({
      target: 'http://localhost:8080', // 실제 API 서버 주소로 변경
      changeOrigin: true,
    })
  );
};