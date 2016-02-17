var Observable = require("data/observable").Observable;

function Quote(info) {
    info = info || {};

    var quoteViewModel = new Observable({
        quoteText: info.quoteText || "",
        author: info.author || "",
        authorImageUrl: info.authorImageUrl || ""
    });

    quoteViewModel.createNew = function() {
        // Implement here the login http logic
        var promis = new Promise(
            function(resolve, reject) {
                resolve("Quote created");
        });
        return promis;
    };

    quoteViewModel.shareQuote = function() {
        // Implement here the register http logic
        var promis = new Promise(
            function(resolve, reject) {
                resolve("Quote shared");
        });
        return promis;
    };

    return quoteViewModel;
}

module.exports = Quote;
