var React = require('react');
var {Route, NotFoundRoute, DefaultRoute} = require('react-router');

module.exports = [
    <Route name="home" path="/" handler={require('./components/AppRoot.jsx')}>

        <Route path="/doc/*/edit" handler={require('./components/Doc/DocEdit.jsx')} />
        <Route path="/doc/*" handler={require('./components/Doc/Doc.jsx')} />
        <NotFoundRoute name="not-found" handler={require('./components/NotFound.jsx')} />
    </Route>
];
