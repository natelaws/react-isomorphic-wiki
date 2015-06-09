var React = require('react');
var Router = require('react-router');

var Doc = React.createClass({
    mixins: [Router.State],

    getInitialState() {
        return {

        };
    },

    componentWillMount() {

    },

    render() {

        console.log(this.props, this.getPathname(), this.getParams());
        return (<div>
            edit {this.getPathname()} {this.getParams().splat}
        </div>);
    }
});


module.exports = Doc;
