const http = require('http');
const addonInterface = require('./addon');
const { getRouter } = require('stremio-addon-sdk');

const router = getRouter(addonInterface);

http.createServer((req, res) => {
  router(req, res, () => {
    res.writeHead(404);
    res.end();
  });
}).listen(7000, () => {
  console.log('Add-on running on http://localhost:7000/manifest.json');
});
