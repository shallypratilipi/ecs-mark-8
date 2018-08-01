<template>
    <div class="modal fade" id="webPushModal" tabindex="-1" role="dialog" aria-labelledby="webPushModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="webPushModalLabel">{{title}}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="message-container">{{message}}</div>
                </div>
                <div class="modal-footer">
                    <button type="button" v-if="includeDisableButton" @click="disableWebPush()" class="btn">__("web_push_cancel")</button>
                    <button type="button" @click="enableWebPush()" class="btn btn-submit">__("web_push_allow")</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import mixins from '@/mixins'
import { mapGetters } from 'vuex'
import WebPushUtil from '@/utils/WebPushUtil'

export default {
    mixins: [
        mixins
    ],
    data() {
        return {
            action: null
        }
    },
    props: {
        title: {
            type: String,
            required: true
        },
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
        },
        'in-viewport-once': {
            default: true
        }
    },
    methods: {
        enableWebPush() {
            this.action = "ENABLED"
            $('#webPushModal').modal('hide')
            WebPushUtil.enabledOnCustomPrompt(this.$route.meta.store)
        },
        disableWebPush() {
            this.action = "DISABLED"
            $('#webPushModal').modal('hide')
            WebPushUtil.disabledOnCustomPrompt(this.$route.meta.store)
        }
    },
    mounted() {
        $('#webPushModal').on('shown.bs.modal', (e) => {
            this.triggerAnanlyticsEvent(`VIEWED_WEBPUSHPOPUP_${this.screenName}`, 'CONTROL', {'USER_ID': this.getUserDetails.userId})
        })
        $('#webPushModal').on('hide.bs.modal', (e) => {
            if (this.action === "ENABLED") {
                this.triggerAnanlyticsEvent(`ENABLED_WEBPUSHPOPUP_${this.screenName}`, 'CONTROL', {'USER_ID': this.getUserDetails.userId, 'ACTION_COUNT': WebPushUtil.getNthActionCount()})
            } else if (this.action === "DISABLED") {
                this.triggerAnanlyticsEvent(`DISABLED_WEBPUSHPOPUP_${this.screenName}`, 'CONTROL', {'USER_ID': this.getUserDetails.userId, 'ACTION_COUNT': WebPushUtil.getNthActionCount()})
            } else {
                this.action = "DISABLED"
                WebPushUtil.disabledOnCustomPrompt(this.$route.meta.store)
                this.triggerAnanlyticsEvent(`CLOSED_WEBPUSHPOPUP_${this.screenName}`, 'CONTROL', {'USER_ID': this.getUserDetails.userId, 'ACTION_COUNT': WebPushUtil.getNthActionCount()})
            }
        })
    },
    computed: {
        ...mapGetters([
            'getUserDetails'
        ])
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
    .modal {
        margin: 50px auto;
        .modal-body {
            .message-container {
                text-align: left;
            }
        }
        .modal-footer {
            border: none;
            .btn-submit {
                background: #d0021b;
                color: #fff;
                border: 0;
            }
        }
    }
</style>
