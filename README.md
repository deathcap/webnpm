# webnpm

[Browserify](http://browserify.org) the [Node Package Manager](https://www.npmjs.com) for running in a web browser

![screenshot](http://i.imgur.com/xmKHPh3.png "Screenshot")

Warning: very incomplete and extremely experimental, mostly nothing works

Usage:

    npm install
    npm start

Navigate to the URL in your web browser, and open the developer console.
The APIs for [browserify](https://github.com/substack/node-browserify)
and [npm](https://github.com/npm/npm) are available in the global
`browserify` and `npm` objects, respectively. For example, you can run:

    npm.commands.version()
    npm.commands.substack()
    npm.commands.xmas()

    npm.commands.list()
    npm.commands.config(['list'])
    npm.commands.config(['get', 'registry']

    npm.commands.owner(['ls', 'npm'])
    npm.commands.view(['voxel-engine'])

## License

MIT

