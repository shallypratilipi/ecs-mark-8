<template>
    <span class="translate-input-wrapper">
        <input type="text" class="form-control" 
            :value="value" 
            @keyup.up="goUpInSuggestions"
            @keyup.down="goDownInSuggestions"
            @input="getTranslation"
            @keyup.enter="selectSuggestion"
            :placeholder="placeholder"
            name="" >
        <ul class="translations">
            <li v-for="(eachSuggestion, index) in suggestions" :class="{ 'active': index === selectedSuggestion }" :key="index" @click="selectTranslatedWord(eachSuggestion)">{{ eachSuggestion }}</li>
        </ul>
    </span>
</template>

<script>
import mixins from '@/mixins'

export default {
    name: 'tranliteration',
    mixins: [
        mixins
    ],
    props: {
        value: {
            type: String
        },
        oninput: {
            type: Function,
            required: true
        },
        placeholder: {
            type: String
        }
    },
    computed: {

    },
    data() {
        return {
            suggestions: [],
            selectedSuggestion: 0
        }
    },
    watch:{
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
            words.push(selectedWord);
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
        }
    }
}
</script>

<style lang="scss" scoped>
.translate-input-wrapper {
    position: relative;
    display: block;
}
    .translations {
        padding: 0;
        margin: 0;
        position: absolute;
        background: #fff;
        z-index: 100;
        width: 100%;
        border: 1px solid #ced4da;
        border-top: 0;
        li {
            list-style: none;
            padding: 3px 10px;
            border-left: 1px solid #e9e9e9;
            border-right: 1px solid #e9e9e9;
            &.active {
                background: #e9e9e9;
            }
        }
    }
</style>
