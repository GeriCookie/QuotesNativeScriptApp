'use strict'
var config = require('../shared/config');
var Observable = require("data/observable").Observable;
var ObservableArray = require('data/observable-array').ObservableArray;
var fetchModule = require('fetch');
var config = require('../shared/config');

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
        // .then(function(json) {
        //   console.dir("HEREEEE");
        //   console.dir(json);
        //   return json.result;
        // })
        .then(function(newUpdates) {
          //console.dir(newUpdates);
          newUpdates.forEach(up => that.updates.push(new Observable(up)));
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
