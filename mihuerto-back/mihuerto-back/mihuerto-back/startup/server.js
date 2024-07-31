const express = require("express");
const http = require("http");
const bodyParser = require('body-parser');
let _express = null;
let _config = null;
let _server = null;
module.exports = class Server {
  constructor({ config, router }) {
    _config = config;
    _express = express();
    _express.use(bodyParser.json({ limit: '500mb' }));
    _express.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));
    _express.use('/uploads', express.static('uploads'));
    _express.use(router);

    _express.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send('Something broke!');
    });

    _server = http.createServer(_express);
  }
  start() {
    return new Promise((resolve) => {
      _server.listen(_config.PORT, async () => {
        console.log(
          `${_config.APPLICATION_NAME} on port ${_config.PORT} ${_config.API_URL} `
        );
      });
      resolve();
    });
  }
};
