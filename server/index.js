var Hapi = require('hapi');
var Good = require('good');
var Joi = require('joi');

var server = new Hapi.Server();
server.connection({port: 3000});


server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hello, world!');
    },
    config: {
        description: 'Landing page'
    }
});



server.route({
    method: 'GET',
    path: '/hello/{user?}',
    handler: function (request, reply) {
        var user = request.params.user ? encodeURIComponent(request.params.user) : 'stranger';
        reply('Hello ' + user + '!');
    },
    config: {
        validate: {
            params: {
                user: Joi.string().min(3).max(10)
            },
            query: {
                foo: Joi.string().min(1).max(4).optional()
            }
        },
        description: 'Say hello!',
        notes: 'The user parameter defaults to \'stranger\' if unspecified',
        tags: ['api', 'greeting']

    }
});


server.register({register: require('lout')}, function (err) {
});

server.register({
    register: Good,
    options: {
        reporters: [{
            reporter: require('good-console'),
            args: [{log: '*', response: '*'}]
        }]
    }
}, function (err) {
    if (err) {
        throw err; // something bad happened loading the plugin
    }

    server.start(function () {
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});
