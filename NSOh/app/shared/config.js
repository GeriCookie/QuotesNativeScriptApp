var applicationSettingsModule = require('application-settings');

var configObject = {
  apiUrl: "https://quotes-server-app.herokuapp.com",
  invalidateToken: function() {
    this.token = "";
  }
};

Object.defineProperty(configObject, "token", {
  get: function() {
    return applicationSettingsModule.getString("token");
  },
  set: function(token) {
    return applicationSettingsModule.setString("token", token);
  }
});

module.exports = configObject;
