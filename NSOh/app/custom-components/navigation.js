var frameModule = require("ui/frame");
var config = require("../shared/config");

function goToLogin() {
    frameModule.topmost().navigate("views/login/login");
}

function goToQuotesList() {
    frameModule.topmost().navigate("views/quotes/quotes");
}

function goToShared() {
    frameModule.topmost().navigate("views/updates/updates");
}

function goToMyFollowingList() {
  console.log("in my following initial");
  if (config.token) {
    console.log("in my following if initial");
    frameModule.topmost().navigate("views/my-following-updates/my-following-updates");
  } else {
    console.log("in my following else initial");
    frameModule.topmost().navigate("views/login/login");
  }
}

function goToMyQuotesList() {
  console.log("in my following initial");
  if (config.token) {
    console.log("in my following if initial");
    frameModule.topmost().navigate("views/my-quotes/my-quotes");
  } else {
    console.log("in my following else initial");
    frameModule.topmost().navigate("views/login/login");
  }
}


exports.goToLogin = goToLogin;
exports.goToQuotesList = goToQuotesList;
exports.goToShared = goToShared;
exports.goToMyFollowingList = goToMyFollowingList;
exports.goToMyQuotesList = goToMyQuotesList;
