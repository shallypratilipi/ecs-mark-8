<template>
    <MainLayout>
        <div class="home-page page-wrap">
            <Banners v-if="getHomePageBannersLoadingState === 'LOADING_SUCCESS'"
                :banners="getHomePageBanners"
            ></Banners>
            <DummyLoader v-if="getHomePageLoadingState === 'LOADING'"></DummyLoader>
            <PratilipiListComponent v-if="getHomePageLoadingState === 'LOADING_SUCCESS'" v-bind:key="eachSection.listPageUrl" v-for="eachSection in getHomePageSections"
                :pratilipiList="eachSection.pratilipiList" 
                :title="eachSection.title"
                :listPageUrl="eachSection.listPageUrl"
                :screenName="'HOME'"
                :screenLocation="'COLLECTIONS'"
                v-bind="{ addToLibrary, removeFromLibrary }"
            ></PratilipiListComponent>
            <ServerError :action="'homepage/getListOfSections'" :data="getCurrentLanguage().fullName.toUpperCase()" v-if="getHomePageLoadingState === 'LOADING_ERROR'"></ServerError>
        </div>
    </MainLayout>
</template>

<script>
import Spinner from '@/components/Spinner.vue';
import DummyLoader from '@/components/DummyLoader.vue';
import PratilipiListComponent from '@/components/experiments/home_v2/PratilipiList.vue';
import MainLayout from '@/layout/main-layout.vue';
import Banners from '@/components/Banners.vue';
import ServerError from '@/components/ServerError.vue';
import constants from '@/constants'
import mixins from '@/mixins'


import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'Home',
    data() {
        return {
            sectionList: []
        }
    },
    mixins: [
        mixins
    ],
    computed: {
        ...mapGetters('homepage', [
            'getHomePageSections',
            'getHomePageLoadingState',
            'getHomePageBanners',
            'getHomePageBannersLoadingState'
        ]),
        ...mapGetters([
            'getUserDetails'
        ])

    },
    methods: {
        ...mapActions('homepage', [
            'getListOfSections',
            'addToLibrary',
            'removeFromLibrary',
            'fetchBanners'
        ]),
    },
    components: {
        Spinner,
        PratilipiListComponent,
        MainLayout,
        Banners,
        ServerError,
        DummyLoader
    },
    created() {
        this.fetchBanners(this.getCurrentLanguage().fullName.toUpperCase());
        this.getListOfSections(this.getCurrentLanguage().fullName.toUpperCase());
        
    },
    mounted() {
        this.triggerAnanlyticsEvent('LANDED_HOMEM_HOME', 'WGEN018', {
            'USER_ID': this.getUserDetails.userId
        });
    }
}
</script>

<style  lang="scss" scoped>
    .home-page {
        margin-top: 85px;
        min-height: 700px;
        @media screen and (max-width: 992px ) {
            margin-top: 65px;
        }
    }
</style>
