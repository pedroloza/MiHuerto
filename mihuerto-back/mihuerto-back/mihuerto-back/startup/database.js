const { default: mongoose } = require("mongoose");
let _server = null;
let _mongoURI = null;
module.exports = class Database {
  constructor({ Server, config }) {
    _server = Server;
    _mongoURI = config.DB_BACKOFIICE_URL;
  }

  connect() {
    mongoose
      .connect(_mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        readPreference: "secondaryPreferred",
      })
      .then(() => _server.start())
      .catch(console.log);
  }
};
