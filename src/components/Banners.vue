<template>
    <div class="banner-section container">
        <slick ref="slick" :options="slickOptions" class="slick-banner">
            <div class="banners" v-for="each_banner in banners" v-bind:key="each_banner.bannerId">
                <router-link
                    :to="{ path: each_banner.actionUrl }"
                     @click.native="triggerAnalyticsEvent(each_banner.bannerId)">
                    <img :src="getHighResolutionImage(each_banner.imageUrl)" alt="">
                </router-link>
            </div>
        </slick>
    </div>
</template>

<script>
import Slick from 'vue-slick'
import mixins from '@/mixins';
import inViewport from 'vue-in-viewport-mixin';
import { mapGetters } from 'vuex'

export default {
    props: {
        banners: {
            type: Array,
            required: true
        },
        'in-viewport-once': {
            default: true
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
    data() {
        return {
            slickOptions: {
                slidesToShow: 1,
                infinite: false,
                adaptiveHeight: false,
                variableWidth: false,
                arrows: true,
                dots: false,
                draggable: true,
                edgeFriction: 0.30,
                swipe: true,
                autoplay: true,
                autoplaySpeed: 4000,
                prevArrow: '<div class="back"><i class="material-icons" aria-hidden="true">keyboard_arrow_left</i></div>',
                nextArrow: '<div class="forward"><i class="material-icons" aria-hidden="true">keyboard_arrow_right</i></div>',
            }
        }
    },
    methods: {
        next() {
            this.$refs.slick.next()
        },
        prev() {
            this.$refs.slick.prev()
        },
        reInit() {
            // Helpful if you have to deal with v-for to update dynamic lists
            this.$refs.slick.reSlick()
        },

        triggerAnalyticsEvent(bannerId) {
            this.triggerAnanlyticsEvent(`CLICKBANNER_BANNERS_HOME`, 'CONTROL', {
                'USER_ID': this.getUserDetails.userId,
                'PARENT_ID': bannerId
            });
        },
        triggerEvent() {
            console.log("next");
        }

    },
    mounted() {
        this.reInit();
        const that = this;
        $('.slick-banner').on('swipe', function(event, slick, direction) {
            that.triggerAnanlyticsEvent(`SWIPE_BANNERS_HOME`, 'CONTROL', {
                'USER_ID': that.getUserDetails.userId,
                'PARENT_ID': $($(event.target).find('img')[slick.currentSlide]).attr('src')
            });
        });
        $('.slick-banner').on('click','.slick-arrow', function() {
            that.triggerAnanlyticsEvent(`SWIPE_BANNERS_HOME`, 'CONTROL', {
                'USER_ID': that.getUserDetails.userId
            });
        });
    },
    components: {
        Slick
    },
    watch: {
        'inViewport.now': function(visible) {
            if (visible) {
                this.triggerAnanlyticsEvent(`VIEWED_BANNERS_HOME`, 'CONTROL', {
                    'USER_ID': this.getUserDetails.userId
                });
                
            }
        }
    }
}
</script>

<style lang="scss">
@import '../../node_modules/slick-carousel/slick/slick.css';
.banner-section {
    position: relative;
    width: calc(100% - 50px);
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 0 5px;
    .banners {
        img {
            max-width: 100%;
            margin: 0 auto;
        }
    }
    .back,.forward {
        position: absolute;
        top: 45%;
        @media screen and (max-width: 576px ) {
            top: 37%;
        }
        z-index: 2;
        background-color: #fff;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        color: #000;
        border: 1px solid #e9e9e9;
        cursor: pointer;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -o-user-select: none;
        transition: all .3s, visibility 0s;
        -ms-transition: all .3s, visibility 0s;
        -webkit-transition: all .3s, visibility 0s;
        -moz-transition: all .3s, visibility 0s;
        i {
            height: 40px;
            line-height: 40px;
            font-size: 26px;
        }
        @media screen and (min-width: 768px ) {
            &:hover {
                background: #9E9E9E;
                border-color: #9E9E9E;
                box-shadow: 0 0px 2px rgba(0,0,0,0.2);
                color: #fff;
            }
        }
        &.slick-disabled {
            i {
                opacity: 0.2;
            }
            &:hover {
                background: #fff;
                border-color: #fff;
                i {
                    color: #212121;
                }
            }
        }
    }
    .back {
        margin-left: -15px;
    }
    .forward {
        right: -15px;
    }
}
</style>
