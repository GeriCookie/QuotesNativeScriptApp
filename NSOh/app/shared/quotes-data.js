var quote = {
    quoteText: "\"Hate cannot drive out hate: only love can do that.\"",
    author: "Martin Luther King Jr.",
    authorImageUrl: "http://d.alternativeto.net/dist/icons/nativescript_77321.jpg?width=64&height=64&mode=crop&upscale=false",
    shared: true,
    tags: "freedom"
};

var quote2 = {
    quoteText: "\"Another very clever writing.\"",
    author: "Martin Luther King Jr.",
    authorImageUrl: "http://d.alternativeto.net/dist/icons/nativescript_77321.jpg?width=64&height=64&mode=crop&upscale=false",
    shared: true,
    tags: "fight"
};

var quote3 = {
    quoteText: "\"This one is the best one.\"",
    author: "Martin Luther King Jr.",
    authorImageUrl: "http://d.alternativeto.net/dist/icons/nativescript_77321.jpg?width=64&height=64&mode=crop&upscale=false",
    shared: true,
    tags: "luck"
};

var quote4 = {
    quoteText: "\"Hate cannot drive out hate: only love can do that.\"",
    author: "Martin Luther King Jr.",
    authorImageUrl: "http://d.alternativeto.net/dist/icons/nativescript_77321.jpg?width=64&height=64&mode=crop&upscale=false",
    shared: false,
    tags: "fight"
};

var quote5 = {
    quoteText: "\"Hate cannot drive out hate: only love can do that.\"",
    author: "Martin Luther King Jr.",
    authorImageUrl: "http://d.alternativeto.net/dist/icons/nativescript_77321.jpg?width=64&height=64&mode=crop&upscale=false",
    shared: false,
    tags: "fight"
};

var quote6 = {
    quoteText: "\"Hate cannot drive out hate: only love can do that.\"",
    author: "Martin Luther King Jr.",
    authorImageUrl: "http://d.alternativeto.net/dist/icons/nativescript_77321.jpg?width=64&height=64&mode=crop&upscale=false",
    shared: false,
    tags: "fight"
};

var quote7 = {
    quoteText: "\"Hate cannot drive out hate: only love can do that.\"",
    author: "Martin Luther King Jr.",
    authorImageUrl: "http://d.alternativeto.net/dist/icons/nativescript_77321.jpg?width=64&height=64&mode=crop&upscale=false",
    shared: true,
    tags: "freedom"
};

var quote8 = {
    quoteText: "\"Hate cannot drive out hate: only love can do that.\"",
    author: "Martin Luther King Jr.",
    authorImageUrl: "http://d.alternativeto.net/dist/icons/nativescript_77321.jpg?width=64&height=64&mode=crop&upscale=false",
    shared: false,
    tags: "freedom"
};

var quote9 = {
    quoteText: "\"Hate cannot drive out hate: only love can do that.\"",
    author: "Martin Luther King Jr.",
    authorImageUrl: "http://d.alternativeto.net/dist/icons/nativescript_77321.jpg?width=64&height=64&mode=crop&upscale=false",
    shared: true,
    tags: "freedom"
};

var quote10 = {
    quoteText: "\"Hate cannot drive out hate: only love can do that.\"",
    author: "Martin Luther King Jr.",
    authorImageUrl: "http://d.alternativeto.net/dist/icons/nativescript_77321.jpg?width=64&height=64&mode=crop&upscale=false",
    shared: false,
    tags: "freedom"
};

var list = [];
list.push(quote);
list.push(quote2);
list.push(quote3);
list.push(quote4);
list.push(quote5);
list.push(quote6);
list.push(quote7);
list.push(quote8);
list.push(quote9);
list.push(quote10);

function getShared() {
    var result = [];
    var i;
    for (i = 0; i < list.length; i +=1) {
        if (list[i].shared) {
            result.push(list[i]);
        }
    }

    return result;
}

function getByTag(tag) {
    var result = [];
    var i;
    for (i = 0; i < list.length; i +=1) {
        var currentQuote = list[i];
        if (currentQuote.tags == tag) {
            result.push(currentQuote);
        }
    }

    return result;
}

exports.all = list;
exports.shared = getShared;
exports.byTag = getByTag;