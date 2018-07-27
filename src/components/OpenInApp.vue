<template>
    <div class="reader-read-in-app-helper">
        <div class="download-in-app-helper"  v-if="shouldShow">
            <p class="read-in-app-text" @click="downloadApp">
                __('reader_read_in_app_helper_text')
            </p>
        </div>
    </div>
</template>

<script>
import mixins from '@/mixins';
import inViewport from 'vue-in-viewport-mixin';
import { mapGetters } from 'vuex'

export default {
    props: {
        isVisible: {
            type: Boolean,
            default: true
        },
        pratilipiData: {
            type: Object,
            required: true
        },
        'in-viewport-once': {
            default: true
        },
    },
    data() {
        return {
            shouldShow: this.isVisible,
            fireViewedEvent : true,
        }
    },
    mixins: [
        mixins,
        inViewport
    ],
    computed: {
        ...mapGetters([
            'getUserDetails'
        ])
    },
    methods: {
        closeBanner() {
            this.shouldShow = false;
            const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.pratilipiData);
            this.triggerAnanlyticsEvent(`DISMISS_OPENAPP_READER`, 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId
            });
        },
        downloadApp() {
            const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.pratilipiData);
            this.triggerAnanlyticsEvent(`GETANDROID_OPENAPP_READER`, 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId
            });
            this.openInNewTab(this.getAndroidIntentUri({
                'utm_source': 'web_reader',
                'utm_medium': 'ReadInAppHelper'
            }));
        }
    },
    watch: {
        'isVisible' : function () {
            const that = this;
            if (this.isVisible && !this.shouldShow) {
                this.shouldShow = this.isVisible;

                setTimeout(function () {
                    that.shouldShow = false;
                }, 5000);
            }

            if (this.fireViewedEvent){
                this.fireViewedEvent = false;
                const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.pratilipiData);
                this.triggerAnanlyticsEvent(`VIEWANDROID_OPENAPP_READER`, 'CONTROL', {
                    ...pratilipiAnalyticsData,
                    'USER_ID': this.getUserDetails.userId
                });
            }

        }
    },
    mounted() {
        console.log(this);
    }
}
</script>

<style lang="scss" scoped>
.reader-read-in-app-helper {
    position: fixed;
    width: 100%;
    bottom: 60px;

    .download-in-app-helper {
        background-color: #266a1f;
        border-radius: 23px;
        margin-left: auto;
        margin-right: auto;
        position: relative;
        width: fit-content;
        padding: 10px;
        opacity: 0.92;
        height: 46px;
        color: white;

        .read-in-app-close{
            float: right;
            background: none;
            border: none;
            color: white;
            height: 100%;
            padding-top: 3px;
        }

        .read-in-app-text {
            text-align: center;
            font-size: 20px;
            padding: 3px;
            padding-top: 0px;
        }
    }
}
</style>
