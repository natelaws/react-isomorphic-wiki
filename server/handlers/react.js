require('node-jsx').install({extension: '.jsx', harmony: true});

var React = require('react');
var Router = require('react-router');

var routes = require('../../gui/routes.jsx'); //react-router definition
var htmlComponent = require('../../gui/Html.jsx');

module.exports = function renderReact(request, reply) {
    //console.log(request.url.path);

    var server = request.server;

    var router = Router.create({
        routes: routes,
        location: request.url.path,
        onAbort: function (redirect) {
            server.log('warn', 'on abort ' + redirect);

            //cb({redirect});
        },
        onError: function (err) {
            server.log('error', 'Routing Error');
            server.log('error', err);
        }
    });

    //if (request.auth.isAuthenticated) {
    //    console.log('auth', request.auth);
    //}

    router.run(function (Handler, state) {

        Handler = React.createFactory(Handler);

        //if (state.routes[state.routes.length - 1].name === 'not-found') {
        //    return reply('<!DOCTYPE html>' + React.renderToString(Handler())).code(404);
        //}

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

        var res = '<!DOCTYPE html>' + React.renderToStaticMarkup(React.createFactory(htmlComponent)(props));
        var rep = reply(res);

        if (state.routes[state.routes.length - 1].name === 'not-found') {
            rep.code(404);
        }

        return rep;
    });
};

