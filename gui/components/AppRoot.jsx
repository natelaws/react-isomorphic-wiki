var React = require('react');
var {RouteHandler} = require('react-router');

require('./base.scss');

var AppRoot = React.createClass({

    render() {
        console.log(this.props);
        return (<div>
            test...
            <RouteHandler {...this.props} />

        </div>);
    }
});


module.exports = AppRoot;
