/* eslint-disable no-undef */
const CircularDependencyPlugin = require('circular-dependency-plugin')
const { version } = require('./package.json')

module.exports = {
	publicRuntimeConfig: {
		VERSION: version
	},
	webpack: (config) => {
		config.plugins.push(
			new CircularDependencyPlugin({
				exclude: /node_modules/,
				failOnError: true,
				allowAsyncCycles: false,
				onDetected({ paths, compilation }) {
					compilation.errors.push(new Error(paths.join(' -> ')))
				}
			})
		)

		return config
	}
}
