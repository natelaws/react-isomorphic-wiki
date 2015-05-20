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
    path: '/api/user',
    handler: require('./handlers/user/handleApiUser'),
    config: {
        description: 'Get users',
        tags: ['api']
    }
}, {
    method: 'GET',
    path: '/api/user/{id}',
    handler: require('./handlers/user/handleApiUser'),
    config: {
        validate: {
            params: {
                id: Joi.string().optional().description("The user id")
            }
        },
        description: 'Get user',
        tags: ['api']
    }
}, {
    method: 'POST',
    path: '/api/user',
    handler: require('./handlers/user/handleApiUser'),
    config: {
        validate: {
            payload: {
                id: Joi.string(),
                name: Joi.string()
            }
        },
        description: 'Create user',
        tags: ['api']
    }
}, {
    method: 'PUT',
    path: '/api/user/{id}',
    handler: require('./handlers/user/handleApiUser'),
    config: {
        validate: {
            params: {
                id: Joi.string().description("The user id")
            },
            payload: {
                id: Joi.string(),
                test: Joi.string(),
                name: Joi.string()

            }
        },
        description: 'Edit user',
        tags: ['api']
    }
}, {
    method: 'DELETE',
    path: '/api/user/{id}',
    handler: require('./handlers/user/handleApiUser'),
    config: {
        validate: {
            params: {
                id: Joi.string().description("The user id")
            }
        },
        description: 'Delete user',
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
    handler: require('./handlers/render/react')
}
];

module.exports = routes;
