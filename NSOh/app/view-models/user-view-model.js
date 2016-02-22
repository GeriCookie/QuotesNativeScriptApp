'use strict'
var config = require("../shared/config");
var Observable = require("data/observable").Observable;


class UserViewModel extends Observable {
    constructor() {
        super();
        this.username = "";
        this.password = "";
        this.image = "";
    }

    login() {
        return fetch(config.apiUrl + "/api/users/auth", {
            method: "PUT",
            body: JSON.stringify({
                username: this.get("username"),
                passHash: this.get("password")
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(handleErrors)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            config.token = data.token;
        });
    }

    register() {
        console.log("*************************************************");
        console.log("In view Model");
        console.log(this.get("image"));
        return fetch(config.apiUrl + "/api/users", {
            method: "POST",
            body: JSON.stringify({
                username: this.get("username"),
                passHash: this.get("password"),
                image: this.get("image")
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(handleErrors)
        .then(function(response) {
            return response.json();
        }).then(function(data) {
            config.token = data.token;
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
        return new UserViewModel();
    }
}
