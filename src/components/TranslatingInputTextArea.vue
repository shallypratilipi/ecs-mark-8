<template>
    <span class="translate-input-wrapper">
        <textarea class="form-control" type="text"
            :value="value" 
            @keyup.up="goUpInSuggestions"
            @keyup.down="goDownInSuggestions"
            @input="getTranslation"
            @keyup.enter="selectSuggestion"
            :placeholder="placeholder"
            name="" ></textarea>
        <ul class="translations" v-if="suggestions.length > 0">
            <li v-for="(eachSuggestion, index) in suggestions" :class="{ 'active': index === selectedSuggestion }" :key="index" @click="selectTranslatedWord(eachSuggestion)">{{ eachSuggestion }}</li>
        </ul>
        <button class="voice-input-button"
            v-bind:class="{ 'is-active': voiceRecognitionActive }"
            @click="voiceInput"
            v-if="isSpeechToTextEnabled">
            <i class="material-icons">keyboard_voice</i>
        </button>
    </span>
</template>

<script>
import mixins from '@/mixins'
import SpeechToTextUtil from '@/utils/SpeechToTextUtil'
import { mapGetters } from 'vuex'

export default {
    name: 'tranliteration',
    mixins: [
        mixins
    ],
    props: {
        value: {
            type: String,
            default: ''
        },
        oninput: {
            type: Function,
            required: true
        },
        screenLocation: {
            type: String,
            required: true
        },
        placeholder: {
            type: String
        },
        enableSpeechToText: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            /* transliteration */
            suggestions: [],
            selectedSuggestion: 0,

            /* speech to text */
            recognition: null,
            isSpeechToTextEnabled: false,
            voiceRecognitionActive: false
        }
    },
    computed: {
        ...mapGetters([
            'getUserDetails'
        ])
    },
    mounted() {
        this.isSpeechToTextEnabled = SpeechToTextUtil.isSupported() && this.enableSpeechToText
    },
    methods: {
        getTranslation(e) {
            this.oninput(e.target.value);
            const fullString = e.target.value;
            const lastWord = fullString.split(' ').pop();

            const that = this;
            if (lastWord === '') {
                this.suggestions = [];
                this.selectedSuggestion = 0;
            }

            if (lastWord.trim().length > 0) {
                this.translateWord(lastWord, (suggestions) => {
                    that.suggestions = suggestions
                });
            }
        },
        selectTranslatedWord(selectedWord) {
            const currentText = this.value;
            const words = currentText.split(' ');
            words.pop();
            words.push(selectedWord.trim());
            const textWithoutLastWord = words.join(' ');
            this.oninput(textWithoutLastWord);
            this.suggestions = [];
            this.selectedSuggestion = 0;
        },
        goUpInSuggestions() {
            if (this.suggestions.length === 0) {
                return;
            }

            const totalSuggestions = this.suggestions.length;
            if (this.selectedSuggestion === 0) {
                return;
            }
            this.selectedSuggestion--;
        },
        goDownInSuggestions() {
            if (this.suggestions.length === 0) {
                return;
            }

            const totalSuggestions = this.suggestions.length;
            if (this.selectedSuggestion >= (totalSuggestions - 1)) {
                return;
            }
            this.selectedSuggestion++;
        },
        selectSuggestion() {
            this.selectTranslatedWord(this.suggestions[this.selectedSuggestion]);
        },
        voiceInput(e) {
            // closing suggestions if its open
            this.suggestions = []
 
            // clicking on the button reloads the page for some reason. Hence e.preventDefault()
            e.preventDefault()

            if (SpeechToTextUtil.isSupported()) {
                if (!this.recognition) {
                    const self = this
                    const onStart = () => {
                        self.voiceRecognitionActive = true
                        const screenName = self.getAnalyticsPageSource(self.$route.meta.store)
                        self.triggerAnanlyticsEvent(`VOICEINPUTSTART_${self.screenLocation}_${screenName}`, 'CONTROL', {
                            'USER_ID': self.getUserDetails.userId
                        })
                    }
                    const onResult = (event, res) => {
                        self.voiceRecognitionActive = false
                        self.oninput(self.value + res + ' ')
                        const screenName = self.getAnalyticsPageSource(self.$route.meta.store)
                        self.triggerAnanlyticsEvent(`VOICEINPUTSTOP_${self.screenLocation}_${screenName}`, 'CONTROL', {
                            'USER_ID': self.getUserDetails.userId,
                            'ENTITY_VALUE': res
                        })
                    }
                    const onError = (error) => {
                        self.voiceRecognitionActive = false
                        const screenName = self.getAnalyticsPageSource(self.$route.meta.store)
                        self.triggerAnanlyticsEvent(`VOICEINPUTERROR_${self.screenLocation}_${screenName}`, 'CONTROL', {
                            'USER_ID': self.getUserDetails.userId
                        })
                    }
                    const onEnd = (error) => {
                        self.voiceRecognitionActive = false
                        const screenName = self.getAnalyticsPageSource(self.$route.meta.store)
                        self.triggerAnanlyticsEvent(`VOICEINPUTSTOP_${self.screenLocation}_${screenName}`, 'CONTROL', {
                            'USER_ID': self.getUserDetails.userId,
                            'ENTITY_VALUE': ''
                        })
                    }
                    this.recognition = SpeechToTextUtil.getRecognition(false, false, onStart, onEnd, onError, onResult)
                }
                if (!this.voiceRecognitionActive) {
                    this.recognition.start()
                } else {
                    this.recognition.stop()
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.translate-input-wrapper {
    position: relative;
    display: block;
    .translations {
        padding: 0;
        margin: 0;
        position: absolute;
        background: #fff;
        z-index: 9999;
        width: 100%;
        border: 1px solid #ced4da;
        border-top: 0;
        text-align: left;
        li {
            list-style: none;
            padding: 3px 10px;
            border-left: 1px solid #e9e9e9;
            border-right: 1px solid #e9e9e9;
                overflow-y: scroll;

            &.active {
                background: #e9e9e9;
            }
        }
    }
    .voice-input-button {
        position: absolute;
        right: 0;
        bottom: 2px;
        background: transparent;
        border: none;
        color: #444;
        outline: none;
        z-index: 999;
    }
    .voice-input-button.is-active {
        color: #d0021b;
        -webkit-animation: half-fade-show 1s infinite ease-in-out;
        animation: half-fade-show 1s infinite ease-in-out;
    }
}
@-webkit-keyframes half-fade-show {
    0% { opacity: 0.5; }
    20% { opacity: 0.6; }
    40% { opacity: 0.8; }
    60% { opacity: 1; }
    80% { opacity: 0.8; }
    100% { opacity: 0.5; }
}

@keyframes half-fade-show {
    0% { opacity: 0.5; }
    20% { opacity: 0.6; }
    40% { opacity: 0.8; }
    60% { opacity: 1; }
    80% { opacity: 0.8; }
    100% { opacity: 0.5; }
}
</style>
