const path = require('path');
const webpack = require('webpack');

module.exports = [
    {
        name: 'server',
        entry: './src/server.js',
        target: 'node',
        output: {
            path: __dirname + '/dist/server',
            filename: 'bundle.js',
        },
        externals: ['express'],
        testEnvironment: 'node'
    },
    
    // {
    //     name: 'client',
    //     entry: './src/client.js',
    //     // target: 'web', // by default
    //     output: {
    //         path: __dirname + '/dist/client',
    //         filename: 'bundle.js',
    //     },
    // }
];