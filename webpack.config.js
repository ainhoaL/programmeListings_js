var path = require('path');

module.exports = {
    context: path.join(__dirname, 'bld'),
    entry:  {
        javascript: './main.js',
        html: './index.html'
    },

    module: {
	    loaders: [{
            test: /\.html$/,
            loader: 'file',
			query: {
				name:'[name].[ext]'
			}
        }]
    },

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
}
