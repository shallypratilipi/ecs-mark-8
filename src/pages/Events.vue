<template>
    <MainLayout>
        <div class="static-page page-wrap">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <h2>__("event_events")</h2>
                        <div class="page-content event-list row">
                            <div class="col-md-4 col-sm-12" v-for="each_event in getEventsData" :key="each_event.eventId">
                                <!--<router-link @click.native="triggerEvent(each_event.eventId)" :to="{ name: 'Event_Page', params: { event_slug: each_event.pageUrl.split('/').pop(), event_data: each_event } }">-->
                                    <!--<div class="event-display-box">-->
                                        <!--<div class="book-type" :class="each_event.eventState">-->
                                            <!--{{ each_event.eventState | getPratilipiTypeInNativeLanguage }}-->
                                        <!--</div>-->
                                        <!--<div class="event-img show-status"-->
                                          <!--v-bind:style="{ backgroundImage: 'url(' + each_event.bannerImageUrl  + ')' }">-->

                                        <!--</div>-->
                                        <!--<p class="event-name">{{ each_event.name }} </p>-->
                                    <!--</div>-->
                                <!--</router-link>-->
                                <EventCard :eventData="each_event">

                                </EventCard>
                            </div>
                            <Spinner v-if="getEventsLoadingState === 'LOADING'"></Spinner>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<script>
import MainLayout from '@/layout/main-layout.vue';
import constants from '@/constants';
import Spinner from '@/components/Spinner.vue';
import EventCard from '@/components/EventCard.vue'
import mixins from '@/mixins';
import {mapGetters, mapActions} from 'vuex';

export default {
    components: {
        MainLayout,
        Spinner,
        EventCard
    },
    mixins: [
        mixins
    ],
    computed: {
        ...mapGetters('eventspage', [
            'getEventsLoadingState',
            'getEventsData'
        ]),
        ...mapGetters([
            'getUserDetails'
        ])
    },
    data() {
        return {
            isEventActive: false,
            showText: false,
            eachEventId: null
        }
    },
    methods: {
        ...mapActions('eventspage', [
            'fetchListOfEvents'
        ]),
        showTextOverlay(eventId) {
            this.showText = !this.showText;
            this.eachEventId = eventId;
            console.log("Changing: " + this.showText);
        },

    },

    created() {
        const currentLocale = process.env.LANGUAGE;
        constants.LANGUAGES.forEach((eachLanguage) => {
            if (eachLanguage.shortName === currentLocale) {
                this.fetchListOfEvents(eachLanguage.fullName.toUpperCase())
            }
        });
    },
    mounted() {
        this.triggerAnanlyticsEvent('LANDED_EVENTLISTM_EVENTLIST', 'CONTROL', {
            'USER_ID': this.getUserDetails.userId
        });
    },

}
</script>

<style lang="scss" scoped>
.static-page {
    margin-top: 85px;
    text-align: left;
    min-height: 700px;
    @media screen and (max-width: 992px ) {
        margin-top: 65px;
    }
    h2 {
        font-size: 24px;
        font-weight: bold;
        text-align: left;
        border-left: 3px solid #d0021b;
        padding-left: 10px;
        margin: 10px 0;
    }
    .event-list {
        text-align: left;
        @media screen and (max-width: 992px ) {
            text-align: center;
        }
        .event-section {
            margin-left: 13px;
            display: none;
        }
        ul {
            @media screen and (max-width: 992px ) {
                padding: 0;
            }
        }
        li {
            width: 300px;
            background: #fff;
            border: 1px solid #e9e9e9;
            height: 252px;
            margin: 10px;
            color: #d0021b;
            display: inline-block;
            @media screen and (max-width: 768px ) {
                width: 100%;
                max-width: 340px;
                height: 150px;
            }
            a {
                color: #212121;
                &:hover {
                    text-decoration: none;
                }
            }
            .event-img {
                width: 100%;
                height: 210px;
                display: block;
                background-size: cover;
                background-position: right center;
                @media screen and (max-width: 768px ) {
                    height: 100px;
                }
            }
            .event-name {
                text-align: center;
                font-size: 14px;
                display: block;
                height: 40px;
                line-height: 40px;
                color: #d00b12;
                @media screen and (max-width: 768px ) {
                    height: 50px;
                    line-height: 50px;
                }
            }
        }

        .book-type {
            width: 100%;
            height: 50px;

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
    }
}
</style>
