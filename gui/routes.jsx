var React = require('react');
var {Route, NotFoundRoute, DefaultRoute} = require('react-router');

module.exports = [
    <Route name="home" path="/" handler={require('./components/AppRoot.jsx')}>

    </Route>,
    <NotFoundRoute name="not-found" handler={require('./components/NotFound.jsx')} />
];
