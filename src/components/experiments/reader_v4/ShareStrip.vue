<template>
    <div class="social-share">
        <a :href="getWhatsAppUri" @click="triggerWaEndShareEvent" class="whatsapp" target="_blank">
            <span class="social-icon"><icon name="whatsapp"></icon></span>
        </a>
        <a :href="getFacebookShareUrl" @click="triggerFbEndShareEvent" class="fb" target="_blank">
            <span class="social-icon"><icon name="facebook-f"></icon></span>
        </a>
        <a :href="getTwitterUrl" @click="triggerTwEndShareEvent" class="twitter" target="_blank">
           <span class="social-icon"><icon name="twitter"></icon></span>
        </a>
        <a :href="getGooglePlusUrl" @click="triggerGpEndShareEvent" class="google" target="_blank">
            <span class="social-icon"><icon name="google-plus"></icon></span>
        </a>
        <a class="link" v-if="false" >
            <span class="social-icon"><icon name="link"></icon></span>
        </a>
        <input type="text" id="inlineShareUri" hidden>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import mixins from '@/mixins';

export default {
    name: 'Social-Share-Strip',
    mixins: [
        mixins
    ],
    computed: {
        ...mapGetters([
            'getFacebookShareUrl',
            'getTwitterUrl',
            'getGooglePlusUrl',
            'getWhatsAppUri',
            'getContentUri',
            'getUserDetails',
            'getPratilipiData'
        ]),
    },
    props: {
        data: {
            type: Object,
            required: true
        },
        type: {
            type: String,
            required: true
        }
    },
    methods: {
        ...mapActions([
            'setShareDetails'
        ]),
        triggerFbEndShareEvent() {
            let pratilipiAnalyticsData = {};
            if (this.getPratilipiData) {
                pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
            }
            this.triggerAnanlyticsEvent(`SHAREBOOKFB_BOOKEND_READER`, 'WGEN008', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId,
                'ENTITY_VALUE': 'FACEBOOK'
            });
        },
        triggerGpEndShareEvent() {
            let pratilipiAnalyticsData = {};
            if (this.getPratilipiData) {
                pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
            }
            this.triggerAnanlyticsEvent(`SHAREBOOKGP_BOOKEND_READER`, 'WGEN008', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId,
                'ENTITY_VALUE': 'GOOGLEPLUS'
            });
        },
        triggerTwEndShareEvent() {
            let pratilipiAnalyticsData = {};
            if (this.getPratilipiData) {
                pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
            }
            this.triggerAnanlyticsEvent(`SHAREBOOKTW_BOOKEND_READER`, 'WGEN008', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId,
                'ENTITY_VALUE': 'TWITTER'
            });
        },
        triggerWaEndShareEvent() {
            let pratilipiAnalyticsData = {};
            if (this.getPratilipiData) {
                pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
            }
            this.triggerAnanlyticsEvent(`SHAREBOOKWA_BOOKEND_READER`, 'WGEN008', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId,
                'ENTITY_VALUE': 'WHATSAPP'
            });
        }
    },
    components: {
        
    },
    created() {
        this.setShareDetails({ data: this.data, type: this.type })
    }
}
</script>

<style  lang="scss" scoped>
.social-share {
    width: 280px;
    margin: 0 auto;
    text-align: center;
    span.text {
        font-size: 14px;
        color: #555;
        display: block;
        margin-bottom: 5px;
    }
    a {
        vertical-align: middle;
        color: #2c3e50;
        display: inline-block;
        text-align: left;
        margin: 0 0 5px;
        font-size: 14px;
        .social-icon {
            display: inline-block;
            width: 35px;
            height: 35px;
            background: #3b5998;
            color: #fff;
            border-radius: 50%;
            text-align: center;
            line-height: 35px;
            margin-right: 5px;
        }
        .fa-icon {
            vertical-align: middle;
        }
        &:hover {
            text-decoration: none;
        }
    }
}
.social-share a.twitter .social-icon  {
    background: #00aced;
}
.social-share a.google .social-icon { 
    background: #dd4b39;
}
.social-share a.whatsapp .social-icon {
    background: #48C631;
}
.social-share a.link .social-icon {
    background: #2c3e50;
}
</style>
