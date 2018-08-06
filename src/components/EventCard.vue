<template>
    <div class="event-wrap">
        <div class="pratilipi" itemscope>

            <div class="event-type" :class="eventData.eventState">
                {{ eventData.eventState }} <span></span>
            </div>
            <router-link :to="eventData.slug" @click.native="triggerEventClickedEvent" :title="eventData.name">
                <PratilipiImage :coverImageUrl="eventData.bannerImageUrl "></PratilipiImage>
            </router-link>

            <router-link :to="eventData.slug" @click.native="triggerEventClickedEvent" :title="eventData.name">
                <div class="event-details">
                    <span class="title" itemprop="name">{{ eventData.name }}</span>
                    <!--<span v-if="!hideAuthorName" class="author" itemprop="author" itemscope itemtype="http://schema.org/Person"><span itemprop="name">{{ pratilipiData.author.name }}</span></span>-->
                    <!--<p v-if="pratilipiData.cardSummary" class="summary">{{ pratilipiData.cardSummary }}</p>-->
                </div>
                <!--<div class="stats">
                    <div class="rating">
                        <i class="material-icons">star</i>
                        <span itemprop="aggregateRating" itemscope itemtype="http://schema.org/AggregateRating">
			    <span itemprop="ratingValue">
                            {{ pratilipiData.averageRating | round(1) }}
			    </span>
                        </span>
                        <meta itemprop="ratingCount" v-bind:content="pratilipiData.ratingCount" />
                    </div>
                    <div class="read-count">
                        <i class="material-icons">remove_red_eye</i>
                        <span>
                            {{ pratilipiData.readCount | round(1) }}
                        </span>
                    </div>
                    <div class="read-time">
                        <i class="material-icons">access_time</i>
                        <span>
                            <time itemprop="timeRequired" v-bind:datetime="pratilipiData.readingTime | readingTimeSchemaOrgFormat">
                            {{ pratilipiData.readingTime | showInMinutesOrHours }}
			                </time>
                        </span>
                    </div>
                </div>-->
            </router-link>
        </div>
    </div>
</template>

<script>
    import mixins from '@/mixins';
    import PratilipiImage from '@/components/PratilipiImage';
    import { mapActions, mapGetters } from 'vuex'

    export default {
        name: 'EventCard',
        props: {
            eventData: {
                type: Object,
                required: true
            },
        },
        mixins: [
            mixins
        ],
        data() {
            return {
                websiteUrl:null,
            }
        },
        computed: {
            ...mapGetters([
                'getUserDetails'
            ])
        },
        methods: {
            triggerEventClickedEvent(data) {
                this.triggerAnanlyticsEvent(`CLICKEVENT_EVENTLISTM_EVENTLIST`, 'CONTROL', {
                    'USER_ID': this.getUserDetails.userId,
                    'PARENT_ID': data
                });
            }
        },
        created() {
            this.websiteUrl = window.location.origin;
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
    .list-page .event-wrap, .event-list .event-wrap, .event-list .event-wrap .pratilipi, .author-page .event-wrap, .search-page .event-wrap {
        display: inline-block;
    }
    .pratilipi {
        width: 300px;
        margin: 10px;
        background: #fff;
        border: 1px solid #e9e9e9;
        position: relative;
        @media screen and (max-width: 768px ) {
            width: 260px;
            margin: 10px 8px;
        }
        .event-type {
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
            &.SUBMISSION {
                background: #42bab0;
            }
            &.SUBMISSION:before {
                border-top: 21px solid #42bab0;
            }
            &.SUBMISSION:after {
                border-right: 10px solid #42bab0;
            }
            &.ONGOING {
                background: #FF9800;
            }
            &.ONGOING:before {
                border-top: 21px solid #FF9800;
            }
            &.ONGOING:after {
                border-right: 10px solid #FF9800;
            }

            &.FINISHED {
                background: #FF9800;
            }
            &.FINISHED:before {
                border-top: 21px solid #FF9800;
            }
            &.FINISHED:after {
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

        .event-details {
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
            display: flex;
            flex-wrap: wrap;
            .rating, .read-count, .read-time {
                flex-grow: 1;
                flex-basis: 33%;
                padding: 10px 2px;
                font-size: 12px;
                color: #212121;
                i {
                    font-size: 13px;
                    display: inline-block;
                    vertical-align: middle;
                    padding-right: 4px;
                }
                span {
                    vertical-align: middle;
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
    }
    .language-ta .pratilipi .stats .read-time, .language-te .pratilipi .stats .read-time, .language-ml .pratilipi .stats .read-time, .language-kn .pratilipi .stats .read-time {
        font-size: 10px;
        @media screen and (max-width: 768px ) {
            font-size: 8.5px;
        }
    }
</style>
