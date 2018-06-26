<template>
    <div class="webpush-strip">
        <div class="container" v-if="isVisible">
            <div v-if="title" class="title">{{title}}</div>
            <div v-if="message" class="message-container">
                <div v-if="includeIcon" class="icon"><i class="material-icons">notifications</i></div>
                <div class="message">{{message}}</div>
            </div>
            <div class="bottom-button-container">
                <button type="button" v-if="includeDisableButton" @click="disableWebPush()" class="btn">__("web_push_cancel")</button>
                <button type="button" @click="enableWebPush()" class="btn">__("web_push_allow")</button>
            </div>
            <button v-if="includeCloseButton" class="close-button" @click="closeWebPush()">
                <i class="material-icons">close</i>
            </button>
        </div>
    </div>
</template>

<script>

import inViewport from 'vue-in-viewport-mixin'
import mixins from '@/mixins'
import { mapGetters } from 'vuex'
import WebPushUtil from '@/utils/WebPushUtil'

export default {
    mixins: [
        mixins,
        inViewport
    ],
    props: {
        screenName: {
            type: String,
            required: true
        },
        title: {
            type: String
        },
        message: {
            type: String
        },
        includeIcon: {
            type: Boolean,
            default: false
        },
        includeDisableButton: {
            type: Boolean,
            default: false
        },
        includeCloseButton: {
            type: Boolean,
            default: false
        },
        'in-viewport-once': {
            default: true
        },
        'in-viewport-offset-top': {
            default: -350
        }
    },
    data() {
        return {
            isVisible: true
        }
    },
    methods: {
        enableWebPush() {
            this.isVisible = false
            this.$emit('WebPushEnabled')
            this.triggerAnanlyticsEvent(`ENABLED_WEBPUSHSTRIP_${this.screenName}`, 'CONTROL', {'USER_ID': this.getUserDetails.userId, 'ACTION_COUNT': WebPushUtil.getNthActionCount()})
            WebPushUtil.enabledOnCustomPrompt(this.$route.meta.store)
        },
        disableWebPush() {
            this.isVisible = false
            this.$emit('WebPushDisabled')
            this.triggerAnanlyticsEvent(`DISABLED_WEBPUSHSTRIP_${this.screenName}`, 'CONTROL', {'USER_ID': this.getUserDetails.userId, 'ACTION_COUNT': WebPushUtil.getNthActionCount()})
            WebPushUtil.disabledOnCustomPrompt(this.$route.meta.store)
        },
        closeWebPush() {
            this.isVisible = false
            this.$emit('WebPushClosed')
            this.triggerAnanlyticsEvent(`CLOSED_WEBPUSHSTRIP_${this.screenName}`, 'CONTROL', {'USER_ID': this.getUserDetails.userId, 'ACTION_COUNT': WebPushUtil.getNthActionCount()})
            WebPushUtil.disabledOnCustomPrompt(this.$route.meta.store)
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
    .webpush-strip {
        .container {
            @include css-prefix('display', 'flex');
            @include css-prefix('flex-direction', 'row');
            @include css-prefix('flex-wrap', 'wrap');
            background: inherit;
            position: relative;
            width: 100%;
            margin: 0 auto;
            padding: 12px;
            box-sizing: border-box;
            // title and message-container has same padding from sides
            // div.title => padding: 0 12px;
            // div.message-container => padding: 0 4px;
            // div.message => padding: 0 8px;
            // padding: 0 12px; = padding: 0 4px; + padding: 0 8px;
            div.title {
                padding: 0 12px;
                margin-bottom: 6px;
                text-align: left;
                width: 100%;
                font-size: 16px;
            }
            div.message-container {
                @include css-prefix('display', 'flex');
                @include css-prefix('flex-direction', 'row');
                @include css-prefix('align-items', 'center');
                padding: 0 4px;
                width: 100%;
                div.icon {
                    line-height: normal;
                    padding: 0;
                    margin: 0;
                    font-size: 0;
                    height: initial;
                    i {
                        font-size: 48px;
                    }                    
                }
                div.message {
                    text-align: left;
                    font-size: 14px;
                    padding: 0 8px;
                }
            }
            div.bottom-button-container {
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
            button.close-button {
                position: absolute;
                right: 12px;
                border: none;
                outline: none;
                background: transparent;
                cursor: pointer;
                padding: 0;
                margin: 0;
                i.material-icons {
                    font-size: 18px;
                }
            }
        }
    }
</style>
