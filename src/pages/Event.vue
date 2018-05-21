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
                            <Spinner v-if="getEventDataLoadingState === 'LOADING'"></Spinner>
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
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<script>
import MainLayout from '@/layout/main-layout.vue';
import PratilipiComponent from '@/components/Pratilipi.vue';
import Spinner from '@/components/Spinner.vue';
import constants from '@/constants'
import mixins from '@/mixins';
import { mapGetters, mapActions } from 'vuex'

export default {
    components: {
        MainLayout,
        PratilipiComponent,
        Spinner
    },
    data() {
        return {
            scrollPosition: null
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
            'getEventPratilipisCursor'
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
            'removeFromLibrary'
        ]),
        updateScroll() {
            this.scrollPosition = window.scrollY;
        }
    },
    watch: {
        'getEventData.eventId' (eventId) {
            if (eventId) {
                this.fetchInitialEventPratilipis({ eventId, resultCount: 20 });
                this.triggerAnanlyticsEvent('LANDED_EVENTM_EVENT', 'CONTROL', {
                    'USER_ID': this.getUserDetails.userId,
                    'PARENT_ID': this.getEventData.eventId
                });
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
        }
    },
    created() {
        const { event_data, event_slug } = this.$route.params;
        if (event_data) {
            this.cacheEventData(event_data);
        } else {
            this.fetchEventDetails(event_slug);
        }
        
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
