<template>
    <MainLayout>
        <div class="event-page page-wrap">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="card event-info">
                            <div class="head-title">{{ getEventData.name }}</div>
                            <img :src="getEventData.bannerImageUrl" alt="">
                            <div class="desc" v-html="getEventData.description"></div>
                            <button v-if="canParticipate" type="button" class="participate_btn" name="button" @click="goToEventParticipate">__('event_participate')</button>
                        </div>
                    </div>
                    <div class="col-md-12" v-if="getDraftData.length > 0">
                        <!-- v-if="getUserEventDraftData.length > 0 && canParticipate " -->
                        <div class="page-content event-list card" id="yourDrafts">
                            <div class="head-title">__('event_participate_your_drafts')</div>
                            <router-link v-for="pratilipiData in getDraftData" :key="pratilipiData.eventEntryId"
                                         :to='"/event/" + $route.params.event_slug + "/participate/" + pratilipiData.pratilipiId'>
                                <UserEventPratilipiComponent
                                :pratilipiData="{
                                    author: pratilipiData.author,
                                    title: pratilipiData.displayTitle,
                                    coverImageUrl: 'https://0.ptlp.co' + pratilipiData.coverImageUrl || 'https://0.ptlp.co/pratilipi/cover',
                                    type: pratilipiData.type,
                                    description: pratilipiData.description,
                                    submissionDate: pratilipiData.submissionDate,
                                    submissionType: 'SUBMITTED',
                                    eventEntryId: pratilipiData.eventEntryId,
                                    eventId: getEventData.eventId
                                }"
                                ></UserEventPratilipiComponent>
                            </router-link>
                        </div>
                    </div>
                    <div class="col-md-12 loader-overflow">
                        <!-- <DummyLoader v-if="getEventPratilipisLoadingState === 'LOADING'"></DummyLoader> -->
                    </div>
                    <div class="col-md-12" v-if="getSubmissionData.length > 0">
                        <!-- v-if="getUserEventData.length > 0 && canParticipate " -->
                        <div class="page-content event-list card" id="yourEntries">
                            <div class="head-title">__('event_participate_your_submissions')</div>
                            <router-link v-for="pratilipiData in getSubmissionData" :key="pratilipiData.eventEntryId"
                                         :to='"/event/" + $route.params.event_slug + "/participate/" + pratilipiData.pratilipiId'>
                                <UserEventPratilipiComponent
                                :pratilipiData="{
                                    author: pratilipiData.author,
                                    title: pratilipiData.displayTitle,
                                    coverImageUrl: 'https://0.ptlp.co' + pratilipiData.coverImageUrl || 'https://0.ptlp.co/pratilipi/cover',
                                    type: pratilipiData.type,
                                    description: pratilipiData.description,
                                    submissionDate: pratilipiData.submissionDate,
                                    submissionType: 'DRAFT',
                                    eventEntryId: pratilipiData.eventEntryId,
                                    eventId: getEventData.eventId
                                }"
                                ></UserEventPratilipiComponent>
                            </router-link>
                        </div>
                    </div>
                    <div class="col-md-12" v-if="getEventPratilipisLoadingState === 'LOADING_SUCCESS' && getEventPratilipis.length !== 0">
                        <div class="page-content event-list card">
                            <div class="head-title">__("event_entries")</div>
                            <PratilipiComponent
                                :pratilipiData="pratilipiData"
                                :key="pratilipiData.pratilipiId"
                                v-for="pratilipiData in getEventPratilipis"
                                :addToLibrary="addToLibrary"
                                :removeFromLibrary="removeFromLibrary"
                                :screenName="'EVENT'"
                                :screenLocation="'EVENTRIES'"
                                ></PratilipiComponent>
                            <Spinner v-if="getEventPratilipisLoadingState === 'LOADING'"></Spinner>
                        </div>
                    </div>
                    <Spinner v-if="getEventDataLoadingState === 'LOADING'"></Spinner>
                </div>
                <router-link v-if="getEventData.eventState == 'SUBMISSION'"
                    :to="{path: `${getEventData.slug}/participate/`}">
                    <button class="btn btn-danger">__('event_participate')</button>
                </router-link>
            </div>
        </div>
    </MainLayout>
</template>

<script>
import MainLayout from '@/layout/main-layout.vue';
import PratilipiComponent from '@/components/Pratilipi.vue';
import UserEventPratilipiComponent from '@/components/UserEventPratilipi.vue';
import Spinner from '@/components/Spinner.vue';
import constants from '@/constants'
import mixins from '@/mixins';
import { mapGetters, mapActions } from 'vuex';
import DummyLoader from '@/components/DummyLoader.vue';


export default {
    components: {
        MainLayout,
        PratilipiComponent,
        UserEventPratilipiComponent,
        Spinner,
        DummyLoader
    },
    data() {
        return {
            scrollPosition: null,
            canParticipate: false
        }
    },
    mixins: [
        mixins
    ],
    computed: {
        ...mapGetters('eventpage', [
            'getEventData',
            'getEventDataLoadingState',
            'getEventPratilipis',
            'getEventPratilipisLoadingState',
            'getEventPratilipisCursor',
            'getUserEventData',
            'getUserEventDraftData',
            'getUserEventDataLoadingState',
            'getDraftData',
            'getSubmissionData'

        ]),
        ...mapGetters([
            'getUserDetails'
        ])
    },
    methods: {
        ...mapActions('eventpage', [
            'cacheEventData',
            'fetchEventDetails',
            'fetchInitialEventPratilipis',
            'fetchMorePratilipisForEvent',
            'addToLibrary',
            'removeFromLibrary',
            'fetchEventPratilipis'
        ]),
        updateScroll() {
            this.scrollPosition = window.scrollY;
        },
        goToEventParticipate() {
            this.$router.push(`/event/${this.$route.params.event_slug}/participate/`);
        },
    },
    watch: {
        'getEventData.eventId' (eventId) {
            this.$route.params.eventId = this.getEventData.eventId;
            if (eventId) {
                this.triggerAnanlyticsEvent('LANDED_EVENTM_EVENT', 'CONTROL', {
                    'USER_ID': this.getUserDetails.userId,
                    'PARENT_ID': this.getEventData.eventId
                });

                if (this.isCurrentEvent(eventId)) {
                    this.canParticipate = true;
                }
            }
        },
        'scrollPosition'(newScrollPosition){
            const nintyPercentOfList = ( 80 / 100 ) * $('.event-page').innerHeight();
            const { eventId } = this.getEventData;

            if (newScrollPosition > nintyPercentOfList &&
                this.getEventPratilipisLoadingState !== 'LOADING' &&
                this.getEventPratilipisCursor !== null) {

                this.fetchMorePratilipisForEvent({ eventId, resultCount: 20 });
            }
        },
        'getEventDataLoadingState'(state) {
            if (state === 'LOADING_SUCCESS') {
                var hash = window.location.hash;
                console.log(window.location.hash);
                if (hash == "#yourEntries") {
                    setTimeout(() => {
                        $('html, body').animate({
                            scrollTop: $("#yourEntries").offset().top
                        }, 1000);
                    }, 500);
                }
            }
        }
    },
    created() {
        const { event_data, event_slug } = this.$route.params;
        this.fetchEventDetails(event_slug.split("-").pop());
    },
    mounted() {
        window.addEventListener('scroll', this.updateScroll);
    },
    destroyed() {
        window.removeEventListener('scroll', this.updateScroll);
    },
}
</script>

<style lang="scss" scoped>
.loader-overflow {
    overflow: hidden;
}
.event-page {
    margin-top: 85px;
    text-align: left;
    background: #f8f8f8;
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
    .card {
        border-radius: 0;
        margin: 10px 0;
        padding: 0;
        text-align: center;
        .head-title {
            font-size: 18px;
            font-weight: bold;
            text-align: left;
            border-left: 3px solid #d0021b;
            padding-left: 10px;
            margin: 10px 0 0;
        }
        &.event-info img {
            max-width: 100%;
            margin: 10px;
        }
        .desc {
            text-align: left;
            padding: 10px;
            font-size: 14px;
        }
        .participate_btn {
            background: #d0021b;
            color: #fff;
            max-width: 250px;
            margin: 10px;
            padding: 5px;
            border-radius: 3px;
            outline: none;
            border: 0;
            font-size: 14px;
            cursor: pointer;
        }
    }
    .event-list {
        text-align: left;
        display: block;
        @media screen and (max-width: 992px ) {
            text-align: center;
        }
    }
}
</style>
