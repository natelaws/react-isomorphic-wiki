var Hapi = require('hapi');

var server = new Hapi.Server({});
server.connection({port: 3001});

// Don't do anything when requiring .scss files on the server side
// Webpack will bundle then into a .css file for the client side
require.extensions['.scss'] = function (module, filename) {
    //module._compile('', filename);
};


export function start() {

    server.register(require('./plugins'), (err) => {
        if (err) {
            throw err; // something bad happened loading the plugin
        }

        server.route(require('./routes'));

        server.start(() => server.log('info', 'Server running at: ' + server.info.uri));
    });
}
