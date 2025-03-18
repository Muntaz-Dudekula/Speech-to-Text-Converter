function speechToTextConversion() {
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.lang = 'en-IN';
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    var diagnostic = document.getElementById('text');
    var playButton = document.getElementById("playButton");
    var isRecording = false;

    playButton.onclick = function () {
        if (!isRecording) {
            playButton.src = "record-button-thumb.png";
            recognition.start();
        } else {
            playButton.src = "mic.png";
            recognition.stop();
        }
        isRecording = !isRecording;
    };

    recognition.onresult = function (event) {
        var last = event.results.length - 1;
        var convertedText = event.results[last][0].transcript;
        diagnostic.value = convertedText;
        console.log('Confidence: ' + event.results[last][0].confidence);
    };

    recognition.onnomatch = function () {
        diagnostic.value = 'I didn\'t recognize that.';
    };

    recognition.onerror = function (event) {
        diagnostic.value = 'Error occurred in recognition: ' + event.error;
    };
}
