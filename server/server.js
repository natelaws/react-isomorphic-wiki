var Hapi = require('hapi');

var server = new Hapi.Server({});
server.connection({port: 3001});


module.exports.start = function () {

    server.register(require('./plugins'), function (err) {
        if (err) {
            throw err; // something bad happened loading the plugin
        }

        server.route(require('./routes'));

        server.start(function () {
            server.log('info', 'Server running at: ' + server.info.uri);
        });
    });
};
