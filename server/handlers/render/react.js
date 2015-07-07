var React = require('react');
var Router = require('react-router');

var routes = require('../../../gui/routes.jsx'); //react-router definition
var htmlComponent = React.createFactory(require('../../../gui/Html.jsx'));

module.exports = function renderReact(request, reply) {



    var router = Router.create({
        routes: routes,
        location: request.url.path,
        onAbort: function (redirect) {
            request.log('warn', 'on abort ' + redirect);

            //TODO
            //return reply.redirect(redirect);
        },
        onError: function (err) {
            request.log('error', 'Routing Error');
            request.log('error', err);

            //TODO
        }
    });

    //if (request.auth.isAuthenticated) {
    //    console.log('auth', request.auth);
    //}

    router.run(function (Handler, state) {

        Handler = React.createFactory(Handler);

        var data = {"test": true};

        if (request.auth.isAuthenticated) {
            data.user = request.auth.credentials;
        }

        if (request.query && request.query.next && request.query.next.indexOf('/') === 0) { //must start with a '/'
            data.next = request.query.next;
        }

        var props = {
            data: JSON.stringify(data),
            markup: React.renderToString(Handler(data))
        };

        var res = '<!DOCTYPE html>' + React.renderToStaticMarkup(htmlComponent(props));
        var rep = reply(res);

        if (state.routes[state.routes.length - 1].name === 'not-found') {
            rep.code(404);
        }

        return rep;
    });
};

