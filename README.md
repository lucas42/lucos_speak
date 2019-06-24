# lucos Speak
A client side API for text-to-speech

## Dependencies
* docker
* docker-compose

## Build-time Dependencies
* nodejs
* [mespeak](http://www.masswerk.at/mespeak/) (Bundled in the project, liscening: GPL)
* [lucos core](https://github.com/lucas42/lucos_core)

## Running
`nice -19 docker-compose up -d --no-build`

## Building
The build is configured to run in Dockerhub when a commit is pushed to the master branch in github.

## Using from other modules
Use of this speech API is easiest to do through the clientside [lucos.js](https://github.com/lucas42/lucos_core/blob/master/lucos.js) library.