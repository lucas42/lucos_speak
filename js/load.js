lucos.waitFor('ready', function () {
	window.meSpeak.loadConfig("/config.json");
	window.meSpeak.loadVoice('/voice/en.json');
        lucos.listen("speak", function (params, source) {
		try {
			window.meSpeak.speak(params.text);
		} catch (e) {
			console.warn(e);
		}
        });
        if (window != window.parent) lucos.send("api_ready", {methods: ["speak"]}, window.parent);
});
