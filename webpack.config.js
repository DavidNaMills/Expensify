const path = require('path');
const ExtractTextPlugin= require('extract-text-webpack-plugin');
const AbsolutePath = path.join(__dirname, 'public', 'dist');


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
                            {
                                loader: 'css-loader',
                                options: {
                                    sourceMap:true
                                }
                            },
                            {
                                loader:'sass-loader',
                                options: {
                                    sourceMap:true
                                }
                            }
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
            historyApiFallback: true,
            publicPath:'/dist/'
        }
    
    };
};
