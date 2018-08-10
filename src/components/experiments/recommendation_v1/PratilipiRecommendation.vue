<template>
    <div class="pratilipi-wrap">
        <div class="pratilipi">
            <router-link :to="redirectToReader ? pratilipiData.readPageUrl : pratilipiData.pageUrl" @click.native="triggerReadPratilipiEvent" :title="pratilipiData.title">
                <div class="pratilipi-image" v-lazy:background-image="pratilipiImageObject"></div>
                <div class="pratilipi-details">
                    <h2>{{ pratilipiData.title }}</h2>
                    <div class="stats-container">
                        <div class="icons"><i class="material-icons">star</i></div>
                        <span class="margin-right-10">{{ pratilipiData.averageRating | round(1) }}</span>
                        <div class="icons"><i class="material-icons">remove_red_eye</i></div>
                        <span>{{ pratilipiData.readCount | round(1) }}</span>
                    </div>
                    <p v-if="pratilipiData.cardSummary" class="summary">{{ pratilipiData.cardSummary }}</p>
                </div>
                <!-- <div class="recommendation" v-lazy:background-image="pratilipiImageObject">
                    <span class="title">{{ pratilipiData.title }}</span>
                    <div class="stats-container">
                        <div class="icons"><i class="material-icons">star</i></div>
                        <span class="margin-right-10">{{ pratilipiData.averageRating | round(1) }}</span>
                        <div class="icons"><i class="material-icons">remove_red_eye</i></div>
                        <span>{{ pratilipiData.readCount | round(1) }}</span>
                    </div>
                    <p v-if="pratilipiData.cardSummary" class="summary">{{ pratilipiData.cardSummary }}</p>
                </div> -->
            </router-link>
        </div>
    </div>
</template>

<script>
import mixins from '@/mixins';
import PratilipiImage from '@/components/PratilipiImage';
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'Pratilipi',
    props: {
        pratilipiData: {
            type: Object,
            required: true
        },
        addToLibrary: {
            type: Function
        },
        removeFromLibrary: {
            type: Function
        },
        hideAddToLibrary: {
            type: Boolean
        },
        hideAuthorName: {
            type: Boolean
        },
        redirectToReader: {
            type: Boolean,
            required: false,
            default: false
        },
        screenName: {
            type: String,
            required: true
        },
        screenLocation: {
            type: String,
            required: true
        },
        experimentId: {
            type: String
        }
    },
    mixins: [
        mixins
    ],
    data() {
        return {
            pratilipiImageObject: {
                src: this.getHighResolutionImage(this.pratilipiData.coverImageUrl),
                loading: this.getLowResolutionImage(this.pratilipiData.coverImageUrl)
             },
        }
    },
    computed: {
        ...mapGetters([
            'getUserDetails'
        ])
    },
    methods: {
        ...mapActions([
            'setShareDetails',
            'setAfterLoginAction'
        ]),
        addPratilipiToLibrary(pratilipiId) {
            const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.pratilipiData);
            this.triggerAnanlyticsEvent(`LIBRARYADD_${this.screenLocation}_${this.screenName}`, 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId
            });
            if (this.getUserDetails.isGuest) {
                // throw popup modal
                console.log(this.$route);
                this.setAfterLoginAction({ action: `${this.$route.meta.store}/addToLibrary`, data: pratilipiId });
                this.openLoginModal(this.$route.meta.store, 'LIBRARYADD', this.screenLocation);
            } else {
                this.addToLibrary(pratilipiId);
            }
        },
        triggerAnalyticsAndRemovePratilipiFromLibrary(pratilipiId) {
            const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.pratilipiData);
            this.triggerAnanlyticsEvent(`LIBRARYREMOVE_${this.screenLocation}_${this.screenName}`, 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId
            });
            this.removeFromLibrary(pratilipiId);
        },
        triggerReadPratilipiEvent() {
            const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.pratilipiData);
            let action = this.redirectToReader && this.screenLocation === 'LIBRARY' ? 'READBOOK' : 'CLICKBOOK';
            this.triggerAnanlyticsEvent(`${action}_${this.screenLocation}_${this.screenName}`, this.experimentId ? this.experimentId : 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId
            });
        },
        imageHasBeenRendered() {
            console.log('has been rendered');
        },
        openShareModal() {
            const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.pratilipiData);
            this.triggerAnanlyticsEvent(`CLICKSHRBOOK_${this.screenLocation}_${this.screenName}`, 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId
            });
            this.setShareDetails({ data: this.pratilipiData, type: 'PRATILIPI', screen_name: this.screenName, screen_location: this.screenLocation });
            $('#share_modal').modal('show');
        }
    },
    components: {
        PratilipiImage
    }
}
</script>

<style lang="scss" scoped>
    a:hover, a:focus, a {
        text-decoration: none;
        outline: none;
        color: #212121;
    }
    .list-page .pratilipi-wrap, .event-list .pratilipi-wrap, .event-list .pratilipi-wrap .pratilipi, .author-page .pratilipi-wrap, .search-page .pratilipi-wrap {
        display: inline-block;
    }
    .pratilipi {
        background: #fff;
        margin: 10px 0px;
        padding-bottom: 10px;
        border-bottom: 1px solid #e9e9e9;
        position: relative;
        .pratilipi-image {
            width: 29%;
            height: 200px;
            background-size: cover;
            background-position: center;
            display: inline-block;
            vertical-align: middle;
        }
        .image-mask {
            position: absolute;
            top: 0;
            margin: 5px;
            transition: all 0.5s, visibility 0s;
            -ms-transition: all 0.5s, visibility 0s;
            -webkit-transition: all 0.5s, visibility 0s;
            -moz-transition: all 0.5s, visibility 0s;
            opacity: 1;
            background: none;
            text-align: right;
            width: auto;
            height: auto;
            right: 0;
            left: auto;
            button {
                padding: 0;
                margin: 5px 5px 0 0;
                text-align: center;
                width: 40px;
                height: 40px;
                font-size: 14px;
                background: #fff;
                color: #2c3e50;
                border-radius: 50%;
                cursor: pointer;
                outline: none;
                border: 1px solid #e9e9e9;
                z-index: 2;
                position: relative;
                float: right;
                &.add-library i {
                    font-size: 23px;
                }
                i {
                    height: 40px;
                    line-height: 40px;
                    font-size: 18px;
                    &.stacked {
                        position: absolute;
                        top: -1px;
                        left: -1px;
                        margin-left: 14px;
                        font-size: 11px;
                        color: #fff;
                        font-weight: bold;
                        &.grey {
                            color: #212121;
                            margin-left: 13.5px;
                            margin-top: -1px;
                            left: 0;
                        }
                    }
                }
            }
        }
        &:hover .image-mask {
            opacity: 1;
        }

        .pratilipi-details {
            width: 70%;
            display: inline-block;
            vertical-align: top;
            text-align: left;
            padding: 0 10px;
            position: relative;

            h2 {
                font-size: 1.2rem;
            }
            span {
                display: block;
                color: #212121;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                &.title {
                    font-size: 17px;
                }
                &.author {
                    font-size: 13px;
                    color: #555555;
                }
            }
            .summary {
                color: #212121;
                font-size: 12px;
                height: 110px;
                overflow: hidden;
                margin: 5px 0 10px;
                text-align: justify;
            }
            .stats-container {
                padding: 10px 0px;
                font-size: 13px;
                text-align: left;
                .icons {
                    display: inline-block;
                    vertical-align: middle;
                    i {
                        font-size: 13px;
                    }
                }
                span {
                    display: inline-block;
                    vertical-align: middle;
                    padding-right: 10px;
                }
            }
        }
    }
    .language-ta .pratilipi .stats .read-time, .language-te .pratilipi .stats .read-time, .language-ml .pratilipi .stats .read-time, .language-kn .pratilipi .stats .read-time {
        font-size: 10px;
        @media screen and (max-width: 768px ) {
            font-size: 8.5px;
        }
    }
</style>
