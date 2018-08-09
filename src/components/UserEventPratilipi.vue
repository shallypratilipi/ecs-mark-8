<template>
    <div class="pratilipi-wrap" :class="{ 'event-participate-page': isEventParticipatePage }">
        <div class="pratilipi">
            <router-link :to="'pratilipiData.readUrl'" v-if="pratilipiData.eventState != 'SUBMISSION'">
                <PratilipiImage :coverImageUrl="pratilipiData.coverImageUrl"></PratilipiImage>
            </router-link>
            <router-link :to="'pratilipiData.readUrl'" v-else>
                <PratilipiImage :coverImageUrl="pratilipiData.coverImageUrl"></PratilipiImage>
            </router-link>
            <div class="pratilipi-details container">
                <div class="row">
                    <div class="col-8">
                        <span class="title" itemprop="name">{{ pratilipiData.title }}</span>
                    </div>
                    <div class="col-4" v-if="pratilipiData.hasAccessToUpdate">
                        <button class="btn more-options" type="button" id="moreOptions2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click.prevent="showMoreOptions()">
                            <i class="material-icons">more_vert</i>
                        </button>
                        <div class="dropdown-menu" aria-labelledby="EventMoreOptions" @click.prevent="">

                            <button class="btn options-btn" v-if="pratilipiData.submissionState == 'SUBMITTED'" @click.prevent="moveToDrafts()">__('pratilipi_move_to_drafts')</button>
                            <button class="btn options-btn " v-if="pratilipiData.submissionState == 'DRAFT'" @click.prevent="publishEntry()">__('review_submit_review')</button>
                            <button type="button" class="btn options-btn" @click.prevent="deleteEventEntry()">
                                __('pratilipi_delete_content')
                            </button>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <span class="author" itemprop="author" itemscope itemtype="http://schema.org/Person"><span itemprop="name">{{ pratilipiData.author.displayName }}</span></span>
                    </div>
                    <div class="col-6">
                        <span class="date" v-if="pratilipiData.submissionState == 'SUBMITTED'" > {{ pratilipiData.submissionDate | convertDate }}</span>
                    </div>
                </div>
                <div class="row" v-if="pratilipiData.eventState != 'SUBMISSION'">
                    <div class="col-12">
                        <div class="stats">
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
                        </div>
                    </div>
                </div>
            </div>
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
        isEventParticipatePage: {
            type: Boolean
        },
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
            'getUserDetails',
        ]),
    },
    methods: {
        ...mapActions([
            'setShareDetails',
            'setAfterLoginAction'
        ]),
        ...mapActions('pratilipimodal', [
            'setPratilipiModalData',
        ]),
         ...mapActions('eventpage', [
            'deleteEntryFromEvent',
            'moveEntryToDrafts',
            'publishEntryForEvent',
        ]),
        publishEntry() {
            this.publishEntryForEvent({eventId : this.pratilipiData.eventId, eventEntryId : this.pratilipiData.eventEntryId});
        },
        moveToDrafts() {
            this.moveEntryToDrafts({eventId : this.pratilipiData.eventId, eventEntryId : this.pratilipiData.eventEntryId})
        },
        deleteEventEntry() {
            this.deleteEntryFromEvent({eventId : this.pratilipiData.eventId, eventEntryId : this.pratilipiData.eventEntryId});
        },
        showMoreOptions() {
            console.log("Call Analytics");
        }

    },
    watch : {
    },
    created(){
    },
    components: {
        PratilipiImage
    }
}
</script>

<style lang="scss" scoped>
.more-options {
                float: right;
                padding: 0;
                background: none;
                i {
                    font-size: 18px;
                }
            }
.dropdown-menu {
                padding: 0;
                .options-btn {
                    font-size: 12px;
                    display: block;
                    padding: 10px;
                    background: none;
                    width: 100%;
                    text-align: left;
                }
            }
    a:hover, a:focus {
        text-decoration: none;
        outline: none;
    }
    .event-list .pratilipi-wrap, .static-page .pratilipi-wrap {
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
        .pratilipi-details {
            text-align: left;
            padding: 0 10px;
            position: relative;
            span {
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
            .date {
                color: #212121;
                font-size: 12px;
                overflow: hidden;
                margin: 5px 0 10px;
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
                        display: inline !important;
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
    }
    .event-participate-page {
        .pratilipi {
            width: 210px;
            .pratilipi-image {
                height: 100px;
            }
        }
    }
</style>
