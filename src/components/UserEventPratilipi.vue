<template>
    <div class="pratilipi-wrap" :class="{ 'event-participate-page': isEventParticipatePage }">
        <div class="pratilipi">
            <PratilipiImage :coverImageUrl="pratilipiData.coverImageUrl"></PratilipiImage>
            <div class="pratilipi-details">
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
                <span class="title" itemprop="name">{{ pratilipiData.title }}</span>
                <span class="author" itemprop="author" itemscope itemtype="http://schema.org/Person"><span itemprop="name">{{ pratilipiData.author.displayName }}</span></span>
                <p class="date" v-if="pratilipiData.submissionState == 'SUBMITTED'" >__("pratilipi_listing_date"): {{ pratilipiData.submissionDate | convertDate }}</p>
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
        ...mapGetters('eventPratilipi', [
            'getPratilipiPublishingState',
            'getPratilipiPublishedId'
        ])
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
        ...mapActions('eventPratilipi', [
            'publishPratilipi',
        ]),
        publishEntry() {
             this.publishPratilipi({pratilipiId : this.pratilipiData.pratilipiId, eventId : this.pratilipiData.eventId});
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
      'getPratilipiPublishingState'(state){
          if(state == 'LOADING_SUCCESS' && this.getPratilipiPublishedId == this.pratilipiData.pratilipiId){
              this.publishEntryForEvent({eventId : this.pratilipiData.eventId, eventEntryId : this.pratilipiData.eventEntryId});
          }

          if(state == 'LOADING_ERROR'){

          }
      }
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
            .date {
                color: #212121;
                font-size: 12px;
                overflow: hidden;
                margin: 5px 0 10px;
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
