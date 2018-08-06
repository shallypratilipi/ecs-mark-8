const SpeechToTextUtil = (function () {
    return {
        isSupported: function () {
            return 'webkitSpeechRecognition' in window
        },
        getRecognition: function (continuous, interimResults, onStart, onEnd, onError, onResult) {
            /* https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/onaudioend */
            /* https://www.google.com/intl/en/chrome/demos/speech.html */

            let recognition = new webkitSpeechRecognition()
            recognition.continuous = continuous || false
            recognition.interimResults = interimResults || false
            recognition.lang = `${process.env.LANGUAGE}-IN`

            recognition.onstart = onStart
            recognition.onend = onEnd
            recognition.onerror = onError
            recognition.onresult = (event) => {
                if (typeof (event.results) === 'undefined') {
                    recognition.stop()
                    onResult(event, null)
                } else {
                    let string = ''
                    for (var i = event.resultIndex; i < event.results.length; ++i) string += event.results[i][0].transcript
                    onResult(event, string)
                }
            }
            return recognition
        }
    }
})()

export default SpeechToTextUtil
