<template>
    <div class="modal fade" id="pratilipiPublishShareModal" tabindex="-1" role="dialog" aria-labelledby="pratilipiPublishModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="pratilipiPublishModalLabel">__("pratilipi_publish_share_heading")</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="book-image-container">
                        <div class="book-image" v-bind:style="{ backgroundImage: 'url(' + pratilipi.coverImageUrl  + ')' }"></div>
                    </div>
                    <div class="message-container">
                        <div class="message">{{getShareDescription}}</div>
                        <div class="share-icons">
                            <a :href="getWhatsAppUri" @click="triggerWaShareEvent" class="whatsapp" target="_blank" rel="noopener" aria-label="whatsapp">
                                <span class="social-icon"><icon name="whatsapp"></icon></span>
                            </a>
                            <a :href="getFacebookShareUrl" @click="triggerFbShareEvent" class="fb" target="_blank" rel="noopener" aria-label="facebook">
                                <span class="social-icon"><icon name="facebook-f"></icon></span>
                            </a>
                            <a :href="getTwitterUrl" @click="triggerTwShareEvent" class="twitter" target="_blank" rel="noopener" aria-label="twitter">
                            <span class="social-icon"><icon name="twitter"></icon></span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import 'vue-awesome/icons/facebook-f'
import 'vue-awesome/icons/twitter'
import 'vue-awesome/icons/google-plus'
import 'vue-awesome/icons/whatsapp'
import 'vue-awesome/icons/link'

import { mapGetters } from 'vuex'
import mixins from '@/mixins'

export default {
    computed: {
        ...mapGetters([
            'getFacebookShareUrl',
            'getTwitterUrl',
            'getWhatsAppUri',
            'getUserDetails'
        ]),
        getShareDescription () {
            return '__("pratilipi_publish_share_description")'.replace('$pratilipiTitle', this.pratilipi.displayTitle)
        }
    },
    mixins: [
        mixins
    ],
    props: {
        pratilipi: {
            type: Object,
            required: true
        },
        screenName: {
            type: String,
            required: true
        }
    },
    methods: {
        _triggerAnalyticsEvent (action, entityValue) {
            let options = {
                ...this.getPratilipiAnalyticsData(this.pratilipi),
                'USER_ID': this.getUserDetails.userId,
                'PARENT_ID': this.pratilipi.pratilipiId
            }
            if (entityValue) {
                options['ENTITY_VALUE'] = entityValue
            }
            this.triggerAnanlyticsEvent(`${action}_PUBLISHSHAREMODAL_${this.screenName}`, 'CONTROL', options)
        },
        triggerFbShareEvent() {
            this._triggerAnalyticsEvent('SHARE', 'FACEBOOK')
        },
        triggerTwShareEvent() {
            this._triggerAnalyticsEvent('SHARE', 'TWITTER')
        },
        triggerWaShareEvent() {
            this._triggerAnalyticsEvent('SHARE', 'WHATSAPP')
        }
    },
    mounted() {
        $('#pratilipiPublishShareModal').on('shown.bs.modal', (e) => {
            this._triggerAnalyticsEvent('OPEN')
        })
        $('#pratilipiPublishShareModal').on('hide.bs.modal', (e) => {
            this._triggerAnalyticsEvent('CLOSE')
        })
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
            display: flex;
            justify-content: space-between;
            .book-image-container {
                display: flex;
                justify-content: center;
                .book-image {
                    background-repeat: no-repeat;
                    background-size: cover;
                    background-position: center;
                    position: relative;
                    width: 200px;
                    height: 200px;
                    @media screen and (max-width: 576px) {
                        width: 100px;
                        height: 100px;
                    }
                    .progress-bar-read {
                        height: 8px;
                        position: absolute;
                        bottom: 0;
                        width: 100%;
                        display: block;
                    }
                    .reader-progress {
                        height: 8px;
                        background-color: red;
                    }
                }
            }
            .message-container {
                padding: 0 10px;
                width: 100%;
                .message {
                    text-align: left;
                }
                .share-icons {
                    border: none;
                    display: flex;
                    flex-direction: row;
                    margin: 10px -4px;
                    .btn-submit {
                        background: #d0021b;
                        color: #fff;
                        border: 0;
                    }
                    a {
                        font-size: 14px;
                        margin: 0 4px;
                        .social-icon {
                            width: 35px;
                            height: 35px;
                            background: #3b5998;
                            color: #fff;
                            border-radius: 50%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            text-decoration: none;
                            cursor: pointer;
                        }
                    }
                    a.twitter .social-icon  {
                        background: #00aced;
                    }
                    a.google .social-icon { 
                        background: #dd4b39;
                    }
                    a.whatsapp .social-icon {
                        background: #48C631;
                    }
                    a.link .social-icon {
                        background: #2c3e50;
                    }
                }
            }
        }
    }
</style>
