var React = require('react');

var Html = React.createClass({

    render: function () {

        return (<html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <title></title>

                <link rel="stylesheet" href={"/static/build/main.css"}/>

            </head>
            <body>
                <div id="app-root" dangerouslySetInnerHTML={{__html: this.props.markup}} />

                <script dangerouslySetInnerHTML={{__html: `var BOOTSTRAP = ${this.props.data};`}}/>
                <script src={"/static/build/bundle.js"}/>

            </body>
        </html>);
    }

});

module.exports = Html;
