module.exports = [
    {
        register: require('lout')
    },
    {
        register: require('hapi-swagger'),
        options: {
            basePath: 'http://localhost:3001',
            endpoint: '/swagger'
        }
    },
    {
        register: require('good'),
        options: {
            reporters: [{
                reporter: require('good-console'),
                events: {log: '*', response: '*', request: '*'}
            }]
        }
    }

];
