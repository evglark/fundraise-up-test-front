const path = require("path");

module.exports = (env, argv) => {
    console.log(0, argv.mode, path.join(__dirname, 'public'));

    return ({
        mode: argv.mode || 'development',
        devtool: argv.mode === 'development' ? 'source-map' : false,
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'main.js',
        },
        devServer: {
            hot: true,
            compress: true,
            port: 9000,
        },
    });
};
