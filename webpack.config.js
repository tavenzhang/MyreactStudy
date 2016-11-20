/**
 * Created by yvan on 16/9/13.
 */
var fs = require('fs');
var path = require('path');
var webpack = require('webpack');

var config = {

	debug: true,

	devtool: 'source-map',

	entry: {
		//'index.ios': ['./src/main.js'],
		'index.ios': ['./index.ios.js'],
		//'index.android': ['./index.android.js'],
	},

	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name].js',
	},

	resolve: {
		//modulesDirectories: ['node_modules'],//只有在有很复杂的路径下，才考虑使用 moduledirectories
		extensions: ['', '.js', '.jsx', '.json', '.es6'],
		//root: path.join(__dirname, '../app')
		//配置别名，在项目中可缩减引用路径
		alias: {
			//'weui': path.resolve(dir, "/node_modules/weui/dist/weui.min.css")
			//moment: "moment/min/moment-with-locales.min.js"
		}
	},

	module: {
		loaders: [
			{
				test: /\.(js|es6|jsx)$/,
				include: [
					path.resolve(__dirname, ''),
					path.resolve(__dirname, 'node_modules/react-native/Libraries/react-native'),
					path.resolve(__dirname, 'node_modules/react-native-navbar'),
				],
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					presets: ['es2015', 'stage-0', 'react'],
					//presets: ['stage-0'],
					plugins: []
				}
			},
			{
				test: /\.png$/,
				loader: "url-loader",
				query: { mimetype: "image/png" }
			},
			{ test: /\.(less|css)$/, loader: 'style!css!less' }
		]
	},

	plugins: [],

};

// Hot loader
if (process.env.HOT) {
	config.devtool = 'eval'; // Speed up incremental builds
	config.entry['index.ios'].unshift('react-native-webpack-server/hot/entry');
	config.entry['index.ios'].unshift('webpack/hot/only-dev-server');
	config.entry['index.ios'].unshift('webpack-dev-server/client?http://localhost:8082');
	config.output.publicPath = 'http://localhost:8082/';
	config.plugins.unshift(new webpack.HotModuleReplacementPlugin());
	config.module.loaders[0].query.plugins.push(["react-transform", {
		"transforms": [
			{
				//一个React转换装置，该装置通过引用Hot Module Replacement API使热重载 React 的类成为可能
				"transform": "react-transform-hmr",
				// 如果你使用React Native，這裡要改用"react-native"
				"imports": ["react-native"],
				"locals": ["module"]
			},
			//{
			//	//呈现React组件的错误信息
			//	"transform": "react-transform-catch-errors",
			//	//捕获异常时用redbox-react来对错误进行更加友好的反馈
			//	"imports": ["react", "redbox-react"]
			//}
		]
	}]);
	//config.module.loaders[0].query.extra = {
	//	'react-transform': {
	//		transforms: [{
	//			transform: 'react-transform-hmr',
	//			imports: ['react-native'],
	//			locals: ['module']
	//		}]
	//	}
	//};
}

// Production config
if (process.env.NODE_ENV === 'production') {
	config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
	config.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = config;