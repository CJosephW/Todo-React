const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    module:{
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use:{
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html%/,
                use:[
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                  // Creates `style` nodes from JS strings
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                  {
                      loader: 'sass-loader',
                      options : {
                          implementation: require('sass')
                      }
                  }
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        })
    ]

};