<template>
    <span>
        <div class="chat-banner">
            <button class="close_btn" @click="closeBanner"><i class="material-icons">close</i></button>
            <div class="chat-banner-wrapper">
                <p>
                    <i class="material-icons">chat</i>
                    <span>__("chat_banner_send_messages")</span>
                </p>
                <button class="check_now" type="button" name="button" @click="scrollToMessage">__("chat_banner_start_chatting")</button>
            </div>
        </div>
    </span>
</template>

<script>
import mixins from '@/mixins';
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            showAndroidBanner: this.getCookie( "USER_NOTIFIED_APP_LAUNCHED" ) == null || this.getCookie( "USER_NOTIFIED_APP_LAUNCHED" ) == "true",
            showBanner: this.getCookie( "USER_NOTIFIED_CHAT_LAUNCHED" ) == null || this.getCookie( "USER_NOTIFIED_CHAT_LAUNCHED" ) == "true",
            click_count: this.getCookie( "CHAT_LAUNCHED_CLICKED" ) == null ? 0 : parseInt( this.getCookie( "CHAT_LAUNCHED_CLICKED" ) || 0 ),
            cross_count: this.getCookie( "CHAT_LAUNCHED_CROSSED" ) == null ? 0 : parseInt( this.getCookie( "CHAT_LAUNCHED_CROSSED" ) || 0 )
        }
    },
    mixins: [
        mixins
    ],
    computed: {
        ...mapGetters([
            'getUserDetails'
        ])
    },
    methods: {
        closeBanner() {
            $(".chat-banner").hide();
            this.cross_count++;
            this.execCookieLogic();
            
            this.triggerAnanlyticsEvent(`DISMISS_CHATBANNER_BOOK`, 'CONTROL', {
                'USER_ID': this.getUserDetails.userId
            });
        },
        scrollToMessage() {
            $('html, body').animate({
                scrollTop: $(".about-author").offset().top
            }, 500, ()=> {
                $('.message-button').addClass('fade-it');
                setTimeout(function () { 
                    $('.message-button').removeClass('fade-it');
                }, 1000);
                this.hideBannerFromView();
            });
            
            this.triggerAnanlyticsEvent(`CHECK_CHATBANNER_BOOK`, 'CONTROL', {
                'USER_ID': this.getUserDetails.userId
            });
            
            this.click_count++;
            this.execCookieLogic();
        },
        execCookieLogic() {
            if( this.click_count >= 3 ) {
                this.setCookie( "USER_NOTIFIED_CHAT_LAUNCHED", 'false', 365, "/" );
                return;
            }
            if( this.click_count > 0 && this.click_count < 3 ) {
                if( this.cross_count > 2 )
                    this.cross_count = 0;
                if( this.cross_count == 0 )
                    this.setCookie( "USER_NOTIFIED_CHAT_LAUNCHED", 'false', 3, "/" );
                if( this.cross_count == 1 )
                    this.setCookie( "USER_NOTIFIED_CHAT_LAUNCHED", 'false', 7, "/" );
                if( this.cross_count == 2 )
                    this.setCookie( "USER_NOTIFIED_CHAT_LAUNCHED", 'false', 30, "/" );
            }
            else {
                if( this.cross_count < 3 ){
                    console.log('hello');
                    this.setCookie( "USER_NOTIFIED_CHAT_LAUNCHED", 'false', null, "/" );
                }
                if( this.cross_count >= 3 && this.cross_count < 6)
                    this.setCookie( "USER_NOTIFIED_CHAT_LAUNCHED", 'false', 2, "/" );
                if( this.cross_count >= 6 )
                    this.setCookie( "USER_NOTIFIED_CHAT_LAUNCHED", 'false', 7, "/" );
            }

            this.setCookie( "CHAT_LAUNCHED_CLICKED", this.click_count, 365, "/" );
            this.setCookie( "CHAT_LAUNCHED_CROSSED", this.cross_count, 365, "/" );
        },
        hideBannerFromView() {
            $(".chat-banner").hide();
        },
    },
    mounted() {
        if (!this.showBanner || this.showAndroidBanner) {
            this.hideBannerFromView();
        }
    },
    watch: {
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
    }
}
</script>

<style lang="scss" scoped>
    .chat-banner {
        background: #e9e9e9;
        color: #444;
        box-shadow: 0 -2px 2px rgba(0, 0, 0, 0.2);
        position: fixed;
        bottom: 0;
        width: 100%;
        z-index: 11;
        padding: 10px 20px;
        text-align: left;
        display: none;
        @media screen and (max-width: 992px ) {
            bottom: 51px;
            display: block;
        }
        button.close_btn {
            position: absolute;
            background: none;
            color: #000;
            border: 0;
            right: 5px;
            top: 5px;
            z-index: 12;
            padding: 0;
        }
        h4 {
            font-size: 16px;
            font-weight: bold;
        }
        p {
            font-size: 14px;
            margin-bottom: 0;
            text-align: left;
            i {
                display: inline-block;
                font-size: 30px;
                width: 30px;
                margin-right: 10px;
                vertical-align: middle;
                color: #d0021b;
            }
            span {
                display: inline-block;
                width: calc(100% - 70px);
                vertical-align: text-bottom;
            }
        }
        button.check_now {
            background: #4caf4f;
            color: #fff;
            display: inline-block;
            border-radius: 3px;
            vertical-align: middle;
            font-size: 14px;
            text-align: center;
            padding: 5px 10px;
            border: 0;
            font-weight: bold;
            cursor: pointer;
            margin: 5px 10px;
            height: 30px;
            width: 90%;
            max-width: 330px;
            outline: none;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
        }
    }
    .chat-banner-wrapper {
        max-width: 350px;
        margin: 0 auto;
    }
</style>
<style media="screen">
@keyframes yellow-fade {
  from {
    background: #f96;
  }
  to {
    background: #fff;
  }
}
.fade-it {
  -webkit-animation: yellow-fade 2s ease-in-out 0s;
  -moz-animation: yellow-fade 2s ease-in-out 0s;
  -o-animation: yellow-fade 2s ease-in-out 0s;
  animation: yellow-fade 2s ease-in-out 0s;
}
</style>
