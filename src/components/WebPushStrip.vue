<template v-if="isVisible">
    <div class="container">
        <div class="inner-container">
            <div class="message">{{message}}</div>
            <div class="button-holder">
                <button v-if="includeDisableButton" @click="disableWebPush()" class="btn">Don't Allow</button>
                <button @click="enableWebPush()" class="btn">Allow</button>
            </div>
        </div>
    </div>
</template>

<script>

import inViewport from 'vue-in-viewport-mixin'
import mixins from '@/mixins'
import { mapGetters } from 'vuex'
import WebPushUtil from '@/utils/WebpushUtil'

export default {
    mixins: [
        mixins,
        inViewport
    ],
    props: {
        message: {
            type: String,
            required: true
        },
        screenName: {
            type: String,
            required: true
        },
        includeDisableButton: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isVisible: WebPushUtil.canShowCustomPrompt()
        }
    },
    methods: {
        enableWebPush() {
            this.isVisible = false
            this.triggerAnanlyticsEvent(`ENABLED_WEBPUSHSTRIP_${this.screenName}`, 'CONTROL', {'USER_ID': this.getUserDetails.userId, 'ACTION_COUNT': WebPushUtil.getNthActionCount()})
            WebPushUtil.enabledOnCustomPrompt()
        },
        disableWebPush() {
            this.isVisible = false
            this.triggerAnanlyticsEvent(`DISABLED_WEBPUSHSTRIP_${this.screenName}`, 'CONTROL', {'USER_ID': this.getUserDetails.userId, 'ACTION_COUNT': WebPushUtil.getNthActionCount()})
            WebPushUtil.disabledOnCustomPrompt()
        }
    },
    computed: {
        ...mapGetters([
            'getUserDetails'
        ])
    },
    watch: {
        'inViewport.now'(visible) {
            if (visible) {
                this.triggerAnanlyticsEvent(`VIEWED_WEBPUSHSTRIP_${this.screenName}`, 'CONTROL', {'USER_ID': this.getUserDetails.userId})
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    @mixin css-prefix($property, $value) {
    -webkit-#{$property}: #{$value};
    -khtml-#{$property}: #{$value};
        -moz-#{$property}: #{$value};
        -ms-#{$property}: #{$value};
        -o-#{$property}: #{$value};
            #{$property}: #{$value};
    }
    .container {
        margin: 0 auto;
        padding: 0;
        width: 100%;
        max-width: 700px;
        .inner-container {
            @include css-prefix('display', 'flex');
            @include css-prefix('flex-direction', 'row');
            flex-wrap: wrap;
            box-sizing: border-box;
            margin: 0 5px;
            padding: 15px;
            font-size: 14px;
            background: #f8f8f8;
            position: relative;
            div.message {
                padding: 0 12px;
                margin-bottom: 12px;
                text-align: left;
                width: 100%;
            }
            div.button-holder {
                margin-left: auto;
                button {
                    text-align: center;
                    border: none;
                    outline: none;
                    color: #d0021b;
                    background: transparent;
                    cursor: pointer;
                    padding: 0.375rem 0.5rem;
                }
            }
        }
    }
</style>
