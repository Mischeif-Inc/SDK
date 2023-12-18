const path = require('path');

const isProduction = true;

const config = {
    entry: './SDK/index.js',
    output: {
        library: 'SDK',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        path: path.resolve(__dirname, '../dist'),
        filename: 'sdk.bundle.js',
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