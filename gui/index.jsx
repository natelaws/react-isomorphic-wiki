var React = require('react');

var Router = require('react-router');
var routes = require('./routes.jsx');


window.React = React; // expose for dev tools

Router.run(routes, Router.HistoryLocation, function (Handler) {
    //console.log(state);
    React.render(<Handler {...window.BOOTSTRAP}/>, document.getElementById('app-root'));
});
