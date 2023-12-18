// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');

const isProduction = true

const config = {
    entry: './SDK/index.js',
    output: {
        path: path.resolve(__dirname, '../dist'),
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        
        
    } else {
        config.mode = 'development';
    }
    return config;
};
