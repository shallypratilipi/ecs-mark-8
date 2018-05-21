<template>
    <div class="pratilipi-wrap">
        <div class="pratilipi">
            <router-link :to="redirectToReader ? pratilipiData.readPageUrl : pratilipiData.pageUrl" @click.native="triggerReadPratilipiEvent" :title="pratilipiData.title">
                <div class="recommendation" :style="{ backgroundImage: 'url(' + pratilipiData.coverImageUrl + ')' }">
                    <span class="title">{{ pratilipiData.title }}</span>
                    <div class="stats-container">
                        <div class="icons"><i class="material-icons">star</i></div>
                        <span class="margin-right-10">{{ pratilipiData.averageRating | round(1) }}</span>
                        
                        <div class="icons"><i class="material-icons">remove_red_eye</i></div>
                        <span>{{ pratilipiData.readCount | round(1) }}</span>
                    </div>
                    <p v-if="pratilipiData.cardSummary" class="summary">{{ pratilipiData.cardSummary }}</p>
                </div>
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
        }
    },
    mixins: [
        mixins
    ],
    data() {
        return {
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
            this.triggerAnanlyticsEvent(`${action}_${this.screenLocation}_${this.screenName}`, 'CONTROL', {
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
    a:hover, a:focus {
        text-decoration: none;
        outline: none;
    }
    .list-page .pratilipi-wrap, .event-list .pratilipi-wrap, .event-list .pratilipi-wrap .pratilipi, .author-page .pratilipi-wrap, .search-page .pratilipi-wrap {
        display: inline-block;
    }
    .pratilipi {
        width: 350px;
        margin: 10px;
        background: #fff;
        border: 1px solid #e9e9e9;
        position: relative;
        @media screen and (max-width: 768px ) {
            width: 260px;
            margin: 10px 8px;
        }
        .book-type {
            font-size: 11px;
            line-height: 20px;
            font-weight: 700;
            color: #fff;
            padding: 0 20px 3px;
            background: #4CAF50;
            position: absolute;
            top: 15px;
            left: -10px;
            z-index: 1;
            height: 21px;
            &:before {
                content: '';
                position: absolute;
                border-left: 0px solid transparent;
                border-right: 10px solid transparent;
                border-top: 21px solid #4CAF50;
                bottom: -3px;
                left: 50%;
                margin-left: 0px;
                left: 100%;
                padding-bottom: 3px;
            }
            &:after {
                content: '';
                position: absolute;
                border-top: 0 solid transparent;
                border-bottom: 10px solid transparent;
                border-right: 10px solid #4CAF50;
                top: 100%;
                left: -10px;
                left: 0;
            }
            span {
                content: '';
                position: absolute;
                border-top: 0 solid transparent;
                border-bottom: 10px solid transparent;
                border-right: 10px solid rgba(0, 0, 0, 0.2);
                top: 100%;
                left: -10px;
                left: 0;
                z-index: 9;
            }
            &.ARTICLE {
                background: #42bab0;
            }
            &.ARTICLE:before {
                border-top: 21px solid #42bab0;
            }
            &.ARTICLE:after {
                border-right: 10px solid #42bab0;
            }
            &.POEM {
                background: #FF9800;
            }
            &.POEM:before {
                border-top: 21px solid #FF9800;
            }
            &.POEM:after {
                border-right: 10px solid #FF9800;
            }
        }
        .pratilipi-image {
            margin: 5px;
            height: 150px;
            background-size: cover;
            background-position: center;
            position: relative;
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
            text-align: left;
            padding: 0 10px;
            position: relative;
            span {
                display: block;
                color: #212121;
                width: 100%;
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
                height: 55px;
                overflow: hidden;
                margin: 5px 0 10px;
            }
        }
        .stats {
            border-top: 1px solid #e9e9e9;
            margin-top: 5px;
            overflow: hidden;
            text-align: center;
            .rating, .read-count, .read-time {
                float: left;
                width: 32%;
                padding: 10px 2px;
                font-size: 12px;
                color: #212121;
                .icons {
                    display: inline-block;
                    vertical-align: middle;
                    padding-right: 4px;
                    i {
                        font-size: 13px;
                    }
                }
            }
            .read-count, .read-time {
                border-left: 1px solid #e9e9e9;
                padding: 10px 0;
            }
            .read-time {
                font-size: 12px;
            }
        }
        
        // Old Recomendation Styles
        .recommendation {
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            color: #fff;
            height: 250px;
            position: relative;
            overflow: hidden;
            box-shadow: rgba(0, 0, 0, 0.5) 0px 80px 80px -20px inset, rgba(0, 0, 0, 0.8) 0px -110px 100px -10px inset;
            span.title {
                overflow: hidden;
                width: 100%;
                max-width: 100%;
                white-space: nowrap;
                text-overflow: ellipsis;
                padding: 5px 10px 0;
                font-size: 21px;
                line-height: 30px;
                text-align: left;
                display: block;
            }
            .stats-container {
                padding: 4px 10px;
                font-size: 13px;
                text-align: left;
                .icons {
                    display: inline-block;
                    vertical-align: middle;
                    i {
                        font-size: 13px;
                    }
                }
            }
            .margin-right-10 {
                margin-right: 10px;
            }
            p.summary {
                text-align: left;
                font-size: 15px;
                line-height: 23px;
                position: absolute;
                bottom: 0;
                padding: 0 10px 0 10px;
                margin: 0 0 5px;
                height: 92px;
                white-space: normal;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 4;
                -webkit-box-orient: vertical;
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
