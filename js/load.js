var lucos = require("_lucos");
lucos.disableNavBar();
lucos.waitFor('ready', function () {
			  
	// Keep track of whether the user has speech enabled (use localStorage for persistance if possible)
	var speechOn = localStorage.getItem("speechon") == "true";

	// Do a quick check whether audio can be played without user interaction
	var testAud = document.createElement("audio");
	testAud.setAttribute("style", "visibility: hidden");
	testAud.src = 'data:audio/mpeg;base64,//MUxAAAAANIAUAAAExBTUUzLjk2LjFV//MUxAsAAANIAYAAAFVVVVVVVVVVVVVV';
	document.body.appendChild(testAud);

	testAud.play();

	// If it doesn't play without user interaction, turn off speech until the user clicks a button
	if (testAud.paused) speechOn = false;
	testAud.pause();
	document.body.removeChild(testAud);

	// Create a button so the user can toggle speech on and off
	var speakButton = document.createElement("button");
	function updateButton() {
		if (speechOn) {
			speakButton.addClass("speechon");
			speakButton.innerText = "Enabled";

			// Just speak an empty string to make sure the browser knows that the user wants audio
			window.meSpeak.speak("");
		} else {
			speakButton.removeClass("speechon");
			speakButton.innerText = "Disabled";
		}
	}
	speakButton.addEventListener("click", function () {
		speechOn = !speechOn;
		localStorage.setItem("speechon", speechOn);
		updateButton();
	}, false);
	speakButton.addClass("speakButton");

	// Load the meSpeak library and the default voice
	window.meSpeak.loadConfig("/config.json");
	window.meSpeak.loadVoice('/voice/en.json');
			  
	// Listen for speak events
	lucos.listen("speak", function (params, source) {
		if (!speechOn) return;
		try {
			window.meSpeak.speak(params.text);
		} catch (e) {
			console.warn(e);
		}
	 });
	updateButton();
	document.body.appendChild(speakButton);
	if (window != window.parent) lucos.send("api_ready", {methods: ["speak"]}, window.parent);
});
