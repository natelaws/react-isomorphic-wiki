var React = require('react');

require('./base.scss');

var AppRoot = React.createClass({

    render() {
        console.log(this.props);
        return <h1>test...</h1>
    }
});


module.exports = AppRoot;
