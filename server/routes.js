var Joi = require('joi');

var routes = [{
    // server static files
    path: '/static/{param*}',
    method: 'GET',
    handler: {
        proxy: {
            host: 'localhost',
            port: 8885
        }
    },
    config: {
        auth: false
    }
}, {
    method: 'GET',
    path: '/two',
    handler: function (request, reply) {
        reply('Hello, world! two');
    },
    config: {
        description: 'Landing page',
        tags: ['api']
    }
}, {
    method: 'GET',
    path: '/hello/{user?}',
    handler: function (request, reply) {
        var user = request.params.user ? encodeURIComponent(request.params.user) : 'stranger';
        reply('Hello ' + user + '!');
    },
    config: {
        validate: {
            params: {
                user: Joi.string().min(3).max(10).description("The user name")
            },
            query: {
                foo: Joi.string().min(1).max(4).optional()
            }
        },
        description: 'Say hello!',
        notes: 'The user parameter defaults to \'stranger\' if unspecified',
        tags: ['api', 'greeting']

    }
}, {    // default route which most things fall under
    path: '/{p*}',
    method: 'GET',  //TODO consider also handling POST for full isomorphic?
    handler: require('./handlers/react')
}
];

module.exports = routes;
