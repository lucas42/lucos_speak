# lucos Speak
A client side API for text-to-speech

## Dependencies
* nodejs
* [mespeak](http://www.masswerk.at/mespeak/) (Bundled in the project, liscening: GPL)
* [lucos core](https://github.com/lucas42/lucos_core)

## Running
The web server is designed to be run within [lucos_services](https://github.com/lucas42/lucos_services), but can be run standalone by running server.js with nodejs.  It currently runs on port 8014.

## Using from other modules
Use of this speech API is easiest to do through the clientside [lucos.js](https://github.com/lucas42/lucos_core/blob/master/lucos.js) library.