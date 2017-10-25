const path = require('path');
const ExtractTextPlugin= require('extract-text-webpack-plugin');
const AbsolutePath = path.join(__dirname, 'public');


module.exports=(env)=>{
    const isProduction = env === 'production';
    const CSSExtract = new ExtractTextPlugin('styles.css');

    console.log(env);

    return {
        entry:'./src/app.js',
        // entry:'./src/playground/hoc.js',
        output: {
            path: AbsolutePath,
            filename: 'bundle.js'
        },
    
        module:{
            rules:[
                {
                    loader: 'babel-loader',
                    test: /\.js$/,
                    exclude: /node_modules/
                },
                {
                    test: /\.s?css$/,
                    use: CSSExtract.extract({
                        use: [
                             'css-loader',

                            'sass-loader'
                        ]
                    })
                }
            ]
        },
        plugins:[
            CSSExtract
        ],
        devtool: isProduction? 'source-map': 'cheap-module-eval-source-map',
        devServer:{
            contentBase: AbsolutePath,
            historyApiFallback: true
        }
    
    };
};
