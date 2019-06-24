var fs = require('fs')
   url = require('url'),
   querystring = require('querystring'),
   http = require('http'),
   resources = require('../core/resources.js');

/* Add the resource files used on the client */
resources.add('mespeak', 'js', 'mespeak/mespeak.js');
//resources.add('config_data', 'json', 'mespeak/mespeak_config.json');
//resources.add('voice_en', 'json', 'mespeak/voices/en/en.json');
resources.add('load', 'js', 'js/load.js');
//resources.add('video', 'js', 'video.js');
resources.add('css', 'css', 'style.css');

http.ServerResponse.prototype.sendError = function sendError(code, message, headers) {
	if (!headers) headers = {};
	if (!('Content-Type' in headers)) headers['Content-Type'] = 'text/html';
	this.writeHead(code, headers);
	this.write('<br/><strong>Error:</strong> '+message);
	this.end();
};


http.ServerResponse.prototype.sendFile = function sendFile(filename, mimetype, modifications) {
	var res = this;
	fs.readFile(filename, function(err, data) {
		if (err) res.sendError(500, 'File "'+filename+'" can\'t be read from disk');
		else {
			if (typeof modifications == 'function') data = modifications.call(data);
			res.writeHead(200, {'Content-Type': mimetype || 'text/html' });
			res.write(data);
			res.end();
		}
	});
};
http.createServer(function _handleRequest(req, res) {
	var cookies = {};
	var agentid = null;
	if (req.headers.cookie) {
		cookies = querystring.parse(req.headers.cookie, '; ');
	}
	var url_parts = url.parse(req.url, true);
	var path = url_parts.pathname;
	var params = url_parts.query;
	switch (path) {
		case "/speak.manifest":
			res.sendFile("manifest", "text/cache-manifest");
			break;
		case "/favicon.ico":
			res.sendFile("favicon.ico", "image/png");
			break;
		case "/icon":
			res.sendFile("icon.png", "image/png");
			break;
		case "/demo":
			res.sendFile("mespeak/index.html", "text/html");
			break;
		case "/demo.js":
			res.sendFile("mespeak/mespeak.js", "text/javascript");
			break;
                case "/config.json":
                        res.sendFile("mespeak/mespeak_config.json", "text/json");
                        break;
                case "/voice/en.json":
                        res.sendFile("mespeak/voices/en/en.json", "text/json");
                        break;
		case "/":
			fs.readFile('../core/bootloader.js', function _gotbootloader(err, bootloader) {
				res.sendFile("index.xhtml", "application/xhtml+xml", function () {
					return this.toString()
						.replace("$now$", new Date().toTimeString())
						.replace("$bootloader$", bootloader.toString());
				});
			});
			break;
		case "/resources":
			resources.load(res, params.v);
			break;
		case "/preload":
			res.sendFile("../core/preload.xhtml", "application/xhtml+xml", function () {
					return this.toString()
						.replace("$manifest$", "/time.manifest");
				});
			break;
		case "/_info":
			const output = {
				system: 'lucos_speak',
				checks: {},
				metrics: {},
			};
			res.writeHead(200, {'Content-Type': 'application/json' });
			res.write(JSON.stringify(output));
			res.end();
			break;
		default:
			res.sendError(404, 'File Not Found');
	}
		
}).listen(8014);
console.log('Server running at http://127.0.0.1:8014/');
