var UserViewModel = require("../../view-models/user-view-model");
var frameModule = require("ui/frame");
var dialogsModule = require("ui/dialogs");
var view = require("ui/core/view");
var cameraModule = require("camera");
var user = UserViewModel.create();
var page;
var topmost;
var title;

function pageLoaded(args) {
    page = args.object;

    page.bindingContext = user;
    user.set("username", "");
    user.set("password", "");
    user.set("image", "");

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
        console.log(user.image);
    });
}

function completeRegistration() {
    user.register()
        .then(function() {
            console.log("IN Complete registration");
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
    console.log("IN REGISTER");
    completeRegistration();
}

exports.pageLoaded = pageLoaded;
exports.register = register;
exports.takePicture = takePicture;
