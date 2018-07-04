<template>
    <span>
        <div class="app-banner container" v-if="isAndroid()">
            <div class="row">
                <button class="close" @click="closeBanner"><i class="material-icons">close</i></button>
                <div class="col-2 logo">
                    <img src="../assets/pratilipi_logo.png" alt="logo">
                </div>
                <div class="col-10 app-info">
                    <span class="name">__("pratilipi_android_application")</span>
                    <span class="stars"><img class="rating-image" src="../assets/Stars-for-App-Install-Strip.png" alt="rating"></span>
                </div>
            </div>
            <div class="row">
                <div class="col-12 app-desc">__("read_stories_without_internet")</div>
            </div>
            <div class="row">
                <div class="col-12">
                    <button name="button" class="download-now" @click="downloadApp">__("android_download")</button>
                </div>
            </div>
        </div>
    </span>
</template>

<script>
import mixins from '@/mixins';
import inViewport from 'vue-in-viewport-mixin';
import { mapGetters } from 'vuex'

export default {
    props: {
        'in-viewport-once': {
            default: true
        },
    },
    data() {
        return {
            showBanner: this.getCookie( "USER_NOTIFIED_APP_LAUNCHED" ) == null || this.getCookie( "USER_NOTIFIED_APP_LAUNCHED" ) == "true",
            click_count: this.getCookie( "APP_LAUNCHED_CLICKED" ) == null ? 0 : parseInt( this.getCookie( "APP_LAUNCHED_CLICKED" ) || 0 ),
            cross_count: this.getCookie( "APP_LAUNCHED_CROSSED" ) == null ? 0 : parseInt( this.getCookie( "APP_LAUNCHED_CROSSED" ) || 0 )
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
            this.hideBannerFromView();
            this.cross_count++;
            
            const SCREEN_NAME = this.getAnalyticsPageSource(this.$route.meta.store);
            this.triggerAnanlyticsEvent(`DISMISS_APPBANNER_GLOBAL`, 'CONTROL', {
                'USER_ID': this.getUserDetails.userId,
                SCREEN_NAME
            });
        },
        hideBannerFromView() {
            if (!this.isAndroid()) {
                return;
            }
            $(".app-banner").hide();
            $(".page-wrap").css("margin-top", "65px");
        },
        downloadApp() {
            this.click_count++;
            const SCREEN_NAME = this.getAnalyticsPageSource(this.$route.meta.store);
            this.triggerAnanlyticsEvent(`GETANDROID_APPBANNER_GLOBAL`, 'CONTROL', {
                'USER_ID': this.getUserDetails.userId,
                SCREEN_NAME
            });
            this.openInNewTab(this.getAndroidIntentUri({
                'utm_source': 'pratilipi_main_web',
                'utm_medium': 'web_bottom_strip',
                'utm_campaign': 'app_download'
            }));
        },
        execCookieLogic() {
            if( this.click_count >= 3 ) {
                this.setCookie( "USER_NOTIFIED_APP_LAUNCHED", 'false', 365, "/" );
                return;
            }
            if( this.click_count > 0 && this.click_count < 3 ) {
                if( this.cross_count > 2 )
                    this.cross_count = 0;
                if( this.cross_count == 0 )
                    this.setCookie( "USER_NOTIFIED_APP_LAUNCHED", 'false', 3, "/" );
                if( this.cross_count == 1 )
                    this.setCookie( "USER_NOTIFIED_APP_LAUNCHED", 'false', 7, "/" );
                if( this.cross_count == 2 )
                    this.setCookie( "USER_NOTIFIED_APP_LAUNCHED", 'false', 30, "/" );
            }
            else {
                if( this.cross_count < 3 ){
                    console.log('hello');
                    this.setCookie( "USER_NOTIFIED_APP_LAUNCHED", 'false', null, "/" );
                }
                if( this.cross_count >= 3 && this.cross_count < 6)
                    this.setCookie( "USER_NOTIFIED_APP_LAUNCHED", 'false', 2, "/" );
                if( this.cross_count >= 6 )
                    this.setCookie( "USER_NOTIFIED_APP_LAUNCHED", 'false', 7, "/" );
            }

            this.setCookie( "APP_LAUNCHED_CLICKED", this.click_count, 365, "/" );
            this.setCookie( "APP_LAUNCHED_CROSSED", this.cross_count, 365, "/" );
        }
    },
    watch: {
        'inViewport.now': function(visible) {
            if (visible && this.showBanner && this.isAndroid()) {
                const SCREEN_NAME = this.getAnalyticsPageSource(this.$route.meta.store);
                this.triggerAnanlyticsEvent(`VIEWED_APPBANNER_GLOBAL`, 'CONTROL', {
                    'USER_ID': this.getUserDetails.userId,
                    SCREEN_NAME
                });
            }
        },
        'showBanner': function(shouldShow) {
            if (!shouldShow) {
                this.hideBannerFromView();
            }
            this.execCookieLogic();
        },
        'click_count': function() {
            this.execCookieLogic();
        },
        'cross_count': function() {
            this.execCookieLogic();
        }
    },
    mounted() {
        if ($('.app-banner').is(":visible") == true) {
            $("#app .page-wrap").css("margin-top", "10px");
        }
        if (!this.showBanner) {
            this.hideBannerFromView();
        }
    }
}
</script>

<style lang="scss" scoped>
    .app-banner {
        margin-top: 70px;
        box-shadow: 0 1px 1px rgba(0,0,0,0.2);
        position: relative;
        z-index: 2;
        button.close {
            position: absolute;
            right: 5px;
            top: 5px;
            z-index: 2;
        }
        .logo {
            padding: 0;
            img {
                width: 100%;
                max-width: 40px;
            }
        }
        .app-info {
            padding: 0;
            text-align: left;
            font-size: 16px;
            .name {
                font-weight: bold;
            }
            .stars {
                width: 90px;
                display: block;
                img {
                    max-width: 100%;
                    vertical-align: top;
                }
            }
        }
        .app-desc {
            font-size: 16px;
            text-align: center;
            line-height: 18px;
        }
        button.download-now {
            background: #4caf4f;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
            border: 0;
            outline: none;
            padding: 5px 10px;
            border-radius: 3px;
            width: 80%;
            margin: 5px 0 10px;
            box-shadow: 0 1px 2px rgba(0,0,0,0.4);
        }
    }
</style>
