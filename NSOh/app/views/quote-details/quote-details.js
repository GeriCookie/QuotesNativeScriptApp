var QuoteDetailsViewModel = require("../../view-models/quote-detail-view-model");
var frameModule = require("ui/frame");
var config = require("../../shared/config");
var page;
var vm;

function onNavigatedTo(args) {
    var context = args.context;
    var id = context.id;
    vm = QuoteDetailsViewModel.create(id);
    page = args.object;
    page.bindingContext = vm;
}

function getQuotesByAuthor() {
    var navigationEntry = {
        moduleName: "views/quotesByAuthor/quotesByAuthor",
        context: {
            authorName: vm.author,
            authorPicture: vm.imageUrl
        },
        animated: true
    };
    frameModule.topmost().navigate(navigationEntry);
}

function getQuotesByTag(args) {
    var tag = args.object.text;
    var navigationEntry = {
        moduleName: "views/quotesByTag/quotesByTag",
        context: {
            tag: tag
        },
        animated: true
    };
    frameModule.topmost().navigate(navigationEntry);
}

function shareUnshareTap(args) {
  var sender = args.object.page;
  var quote = sender.bindingContext;
    if (config.token) {
        quote.markFavorite(quote.id).then(function(inFavorites) {
            quote.inFavorites = inFavorites;
        });
    } else {
        frameModule.topmost().navigate("views/login/login");
    }
}

exports.onNavigatedTo = onNavigatedTo;
exports.getQuotesByAuthor = getQuotesByAuthor;
exports.getQuotesByTag = getQuotesByTag;
exports.shareUnshareTap = shareUnshareTap;
