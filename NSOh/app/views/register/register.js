var UserViewModel = require("../../view-models/user-view-model");
var frameModule = require("ui/frame");
var dialogsModule = require("ui/dialogs");
var view = require("ui/core/view");
var cameraModule = require("camera");
var imageSource = require("image-source");
var imageModule = require("ui/image");
var user;
var page;
var topmost;
var title;

function pageLoaded(args) {
    user = UserViewModel.create();
    // user.set("username", "");
    // user.set("password", "");
    // user.set("image", "");
    page = args.object;
    page.bindingContext = user;

    topmost = frameModule.topmost();

    title = view.getViewById(page, "title");
    title.on("tap", function(args) {
        topmost.navigate("views/initial/initial");
    });
}

function takePicture() {
    cameraModule.takePicture({
        width: 100,
        keepAspectRatio: true
    }).then(function(picture) {
        user.set("image", picture.toBase64String());
        var hopatropa = new imageSource.ImageSource();
        hopatropa.loadFromBase64(user.image);
        var image = new imageModule.Image();
        image.imageSource = hopatropa;
        var parent = view.getViewById(page, 'stack');
        parent.addChild(image);
    });
}

function completeRegistration() {
    console.dir(user);
    user.register()
        .then(function() {
            dialogsModule
                .alert("Your account was successfully created.")
                .then(function() {
                    topmost.navigate("views/login/login");
                }).catch(function() {
                    dialogsModule.alert({
                        message: "Unfortunately we were unable to create your account.",
                        okButtonText: "OK"
                    });
                });
        });
}

function register() {
    completeRegistration();
}

exports.pageLoaded = pageLoaded;
exports.register = register;
exports.takePicture = takePicture;
