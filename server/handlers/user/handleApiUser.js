var lowdb = require('lowdb');
var db = lowdb('db.json');

var Boom = require('boom');

var TABLE = 'users';

module.exports = function handleApiUser(request, reply) {

    var method = request.method;

    var id = request.params.id ? encodeURIComponent(request.params.id) : '';

    if (method === 'get') {
        reply(db(TABLE));
        return;
    }
    else if (method === 'post') {
        var payload = request.payload;
        db(TABLE).push(payload);

        reply(payload).code(201);
        return;
    }
    else if (method === 'put') {

        if (!db(TABLE).find({id: id})) {
            reply(Boom.notFound());
            return;
        }

        var chain = db(TABLE).chain().find({id: id}).assign(request.payload);

        reply(chain.value());
        return;
    }
    else if (method === 'delete') {

        if (!db(TABLE).find({id: id})) {
            reply(Boom.notFound());
            return;
        }

        db(TABLE).remove({id: id});

        reply();
        return;
    }

    reply(Boom.badImplementation());
};
