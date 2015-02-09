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

Requires a browser implementing the [Filesystem API](http://www.html5rocks.com/en/tutorials/file/filesystem/)
(tested on Chrome version 40).

## License

MIT

