var Observable = require("data/observable").Observable;

function User(info) {
    info = info || {};

    var userViewModel = new Observable({
        email: info.email || "",
        password: info.password || "",
        imageUrl: info.imageUrl || ""
    });

    userViewModel.login = function() {
        // Implement here the login http logic
        var promis = new Promise(
            function(resolve, reject) {
                resolve("Fake username");
        });
        return promis;
    };

    userViewModel.register = function() {
        // Implement here the register http logic
        var promis = new Promise(
            function(resolve, reject) {
                resolve("Fake username");
        });
        return promis;
    };

    return userViewModel;
}

module.exports = User;
