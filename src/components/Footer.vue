<template>
    <div class="footer-wrap">
        <div class="top-footer">
            <div class="container">
                <div class="row">
                    <div class="col-md-4">
                        <div class="foot-title">__("footer_mobile_app")</div>
                        <div class="foot-items">
                            <a @click.prevent="triggerEvent" href="#" target="_blank">
                                <img src="../assets/google-play-badge.png" alt="google-play" class="google-play-badge">
                            </a>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="foot-title">__("footer_contact_us")</div>
                        <div class="foot-items">
                            <a :href="'tel:' + '__('footer_contact_number')'.replace(' ', '')"><i class="material-icons material-icons-16 vertical-middle">phone</i>__("footer_contact_number")</a>
                            <a :href="'mailto:' + '__('footer_contact_email')'"><i class="material-icons material-icons-16 vertical-middle">mail</i>__("footer_contact_email")</a>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="foot-title">__("footer_follow_us_on_social_media")</div>
                        <div class="foot-items social">
                            <a @click="triggerFbEvent" :href="'__('facebook_page')'" class="fb" target="_blank"><icon name="facebook-f"></icon></a>
                            <a @click="triggerTwEvent" :href="'__('twitter_page')'" class="twitter" target="_blank"><icon name="twitter"></icon></a>
                            <a @click="triggerGpEvent" :href="'__('googleplus_page')'" class="google" target="_blank"><icon name="google-plus"></icon></a>
                            <a @click="triggerLnEvent" :href="'__('linkedin_page')'" class="linkedin" target="_blank"><icon name="linkedin"></icon></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <footer>
            <div class="container">
                <div class="row">
                    <div class="col-sm-12">
                        <button class="show-more" @click="toggleTopFooter"><i class="material-icons">arrow_drop_down</i></button>
                        <p>
                            © {{ new Date().getFullYear() }} Nasadiya Tech. Pvt. Ltd. |
                            <router-link
                                :to="{ name: 'About_Page' }">__("footer_about_us")</router-link> |
                            <router-link
                                :to="{ name: 'Career_Page' }">__("footer_work_with_us")</router-link> |
                            <router-link
                                :to="{ name: 'Privacy_Page' }">__("footer_privacy_policy")</router-link> |
                            <router-link
                                :to="{ name: 'Terms_Page' }">__("footer_terms_of_service")</router-link>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
    import 'vue-awesome/icons/facebook-f'
    import 'vue-awesome/icons/twitter'
    import 'vue-awesome/icons/google-plus'
    import 'vue-awesome/icons/linkedin'
    import mixins from '@/mixins'
    import { mapGetters, mapActions } from 'vuex'

    export default {
        mixins: [
            mixins
        ],
        computed: {
            ...mapGetters([
                'getUserDetails'
            ])
        },
        methods: {
            toggleTopFooter() {
                $(".show-more").toggleClass("shown");
                $(".top-footer").toggleClass("shown");
                $("html, body").animate({ scrollTop: $(document).height() }, "slow");
            },
            triggerEvent() {
                const SCREEN_NAME = this.getAnalyticsPageSource(this.$route.meta.store);
                this.triggerAnanlyticsEvent('GETANDROID_FOOTER_GLOBAL', 'CONTROL', {
                    'USER_ID': this.getUserDetails.userId,
                    SCREEN_NAME
                });
                window.open('https://play.google.com/store/apps/details?id=com.pratilipi.mobile.android&utm_source=web_footer&utm_campaign=app_download')
            },
            triggerFbEvent() {
                const SCREEN_NAME = this.getAnalyticsPageSource(this.$route.meta.store);
                this.triggerAnanlyticsEvent('LIKEPRATFB_FOOTER_GLOBAL', 'CONTROL', {
                    'USER_ID': this.getUserDetails.userId,
                    'ENTITY_VALUE': 'FACEBOOK',
                    SCREEN_NAME
                });
            },
            triggerTwEvent() {
                const SCREEN_NAME = this.getAnalyticsPageSource(this.$route.meta.store);
                this.triggerAnanlyticsEvent('LIKEPRATTW_FOOTER_GLOBAL', 'CONTROL', {
                    'USER_ID': this.getUserDetails.userId,
                    'ENTITY_VALUE': 'TWITTER',
                    SCREEN_NAME
                });
            },
            triggerGpEvent() {
                const SCREEN_NAME = this.getAnalyticsPageSource(this.$route.meta.store);
                this.triggerAnanlyticsEvent('LIKEPRATGP_FOOTER_GLOBAL', 'CONTROL', {
                    'USER_ID': this.getUserDetails.userId,
                    'ENTITY_VALUE': 'GOOGLEPLUS',
                    SCREEN_NAME
                });
            },
            triggerLnEvent() {
                const SCREEN_NAME = this.getAnalyticsPageSource(this.$route.meta.store);
                this.triggerAnanlyticsEvent('LIKEPRATLINKD_FOOTER_GLOBAL', 'CONTROL', {
                    'USER_ID': this.getUserDetails.userId,
                    'ENTITY_VALUE': 'LINKEDIN',
                    SCREEN_NAME
                });
            },
        }
    }
</script>

<style lang="scss" scoped>
    .footer-wrap {
        position: relative;
    }
    .top-footer {
        background: #212121;
        color: #fff;
        padding: 15px 0 5px;
        text-align: left;
        margin-top: 20px;
        .foot-title {
            font-size: 15px;
            position: relative;
            padding-bottom: 7px;
            @media screen and (max-width: 768px ) {
                font-size: 13px;
            }
            &:before {
                position: absolute;
                left: 0;
                bottom: 0;
                height: 2px;
                background: #d00b12;
                width: 50px;
                content: "";
            }
        }
        .foot-items {
            margin: 20px 0;
            @media screen and (max-width: 768px ) {
                margin: 5px 0 20px;
            }
            a {
                display: block;
                color: #fff;
                font-size: 14px;
                margin-top: 10px;
                @media screen and (max-width: 768px ) {
                    font-size: 12px;
                }
                i {
                    font-size: 14px;
                    vertical-align: middle;
                    padding-right: 10px;
                }
            }
            &.social a {
                display: inline-block;
                width: 30px;
                height: 30px;
                background: #3b5998;
                border-radius: 50%;
                text-align: center;
                line-height: 30px;
                margin-right: 5px;
                .fa-icon {
                    vertical-align: middle;
                }
                &:hover {
                    text-decoration: none;
                    border-bottom: 1px solid;
                }
            }
            &.social a.twitter {
                background: #00aced;
            }
            &.social a.google {
                background: #dd4b39;
            }
            &.social a.linkedin {
                background: #007bb6;
            }
            img.google-play-badge {
                width: 150px;
                margin-left: -10px;
                @media screen and (max-width: 768px ) {
                    width: 110px;
                }
            }
        }
        @media screen and (max-width: 992px ) {
            display: none;
            z-index: 10;
            transition: all 0.3s;
        }
        &.shown {
            @media screen and (max-width: 992px ) {
                display: block;
            }
        }
    }
    .show-more {
        margin: 0;
        padding: 0;
        text-align: center;
        background: rgba(255,255,255,0.1);
        border: 0;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        float: right;
        margin-left: 10px;
        cursor: pointer;
        transition: all 0.3s;
        i {
            color: #fff;
            vertical-align: middle;
            width: 30px;
            height: 30px;
            line-height: 30px;
        }
        &:focus {
            outline: none;
        }
        &.shown {
            -webkit-transform: rotate(180deg);
            -moz-transform: rotate(180deg);
            -o-transform: rotate(180deg);
            -ms-transform: rotate(180deg);
            transform: rotate(180deg);
        }
        @media screen and (min-width: 992px ) {
            display: none;
        }
    }
    footer {
        background: #191919;
        color: #fefefe;
        font-size: 13px;
        padding: 10px 0;
        @media screen and (max-width: 992px ) {
            margin-bottom: 48px;
        }
        p {
            margin: 0;
            a {
                color: #fefefe;
            }
        }
    }
</style>
