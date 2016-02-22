'use strict'
var config = require('../shared/config');
var Observable = require("data/observable").Observable;
var ObservableArray = require('data/observable-array').ObservableArray;
var fetchModule = require('fetch');
var config = require('../shared/config');
var imageSource = require("image-source");
var fs = require("file-system");
var enums = require("ui/enums");

class Update extends Observable {
    constructor() {
        super();

        this.updates = new ObservableArray([]);
        this.currentPage = 0;
        this.loadUpdates();

    }

    loadUpdates() {
        this.currentPage += 1;
        var url = `${config.apiUrl}/api/updates?page=${this.currentPage}`;
        let that = this;
        return fetchModule.fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(handleErrors)
            .then(function(response) {
                return response.json();
            })
            .then(function(newUpdates) {
                newUpdates.forEach(function(up) {
                    if (up.user.image) {
                        var hopatropa = new imageSource.ImageSource();
                        hopatropa.loadFromBase64(up.user.image);
                        var folder = fs.knownFolders.documents();
                        var imageName = up.user.username + ".png";
                        var path = fs.path.join(folder.path, imageName);
                        var saved = hopatropa.saveToFile(path, enums.ImageFormat.png);
                        up.userImageUrl = path;
                    }

                    that.updates.push(new Observable(up));
                });
            });

    }
}

function handleErrors(response) {
    if (!response.ok) {
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response;
}


module.exports = {
    create: function() {
        return new Update();
    }
};
