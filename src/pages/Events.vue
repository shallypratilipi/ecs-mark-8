<template>
    <MainLayout>
        <div class="static-page page-wrap">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <h2>__("event_events")</h2>
                        <div class="page-content event-list">
                            <ul>
                                <li v-for="each_event in getEventsData" :key="each_event.eventId"
                                    v-bind:class="{ eventFinished: (each_event.eventState != `SUBMISSION`) }"
                                    v-on:mouseover="showTextOverlay(each_event.eventId)"
                                    v-on:mouseout="showTextOverlay(each_event.eventId)"
                                >
                                    <router-link @click.native="triggerEvent(each_event.eventId)" :to="{ name: 'Event_Page', params: { event_slug: each_event.pageUrl.split('/').pop(), event_data: each_event } }">
                                        <span class="event-img show-status"
                                              v-bind:style="{ backgroundImage: 'url(' + each_event.bannerImageUrl  + ')' }"
                                        ></span>
                                        <span class="event-name">{{ each_event.name }} </span>
                                        <span
                                            v-if="showText && eachEventId == each_event.eventId && each_event.eventState != `SUBMISSION`"
                                            class="show-overlay">Event Closed</span>
                                        <span
                                            v-if="showText && eachEventId == each_event.eventId && each_event.eventState == `SUBMISSION`"
                                            class="show-overlay">Event Open</span>
                                    </router-link>
                                    <br><br>
                                    <!--  -->
                                </li>
                            </ul>
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
import mixins from '@/mixins';
import {mapGetters, mapActions} from 'vuex';

export default {
    components: {
        MainLayout,
        Spinner
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
        triggerEvent(data) {
            this.triggerAnanlyticsEvent(`CLICKEVENT_EVENTLISTM_EVENTLIST`, 'CONTROL', {
                'USER_ID': this.getUserDetails.userId,
                'PARENT_ID': data
            });
        }
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
    .eventFinished {
        opacity: 0.5;
    }

    .show-status {
        z-index: 99999 !important;
    }

    .show-status:hover {
        background: #008CBA !important;
    }

    .show-overlay {
        position: relative;
        bottom: 150px;
        right: -100px;
        font-size: 16px;
        color: white;
    }
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
    }
}
</style>
