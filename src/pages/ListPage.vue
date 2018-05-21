<template>
    <MainLayout>
        <div class="list-page page-wrap">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <h2>{{ getPratilipiListTitle }}</h2>
                        <PratilipiComponent
                        :pratilipiData="pratilipiData"
                        :key="pratilipiData.pratilipiId"
                        v-for="pratilipiData in getPratilipiListData"
                        v-if="getPratilipiListLoadingState === 'LOADING_SUCCESS' || getPratilipiListData.length !== 0"
                        :addToLibrary="addToLibrary"
                        :removeFromLibrary="removeFromLibrary"
                        :screenName="'CATEGORY'"
                        :screenLocation="'CATEGORYM'"
                        ></PratilipiComponent>
                        <DummyLoader v-if="getPratilipiListLoadingState === 'LOADING'" :sectionCount="1" :className="{list: true}"></DummyLoader>
                    </div>
                </div>
            </div>
        </div>
        <PageNotFound v-if="(getPratilipiListLoadingState === 'LOADING_ERROR' || getPratilipiListData.length === 0 ) && getPratilipiListLoadingState !== 'LOADING'"></PageNotFound>
    </MainLayout>
</template>

<script>
import MainLayout from '@/layout/main-layout.vue';
import Spinner from '@/components/Spinner.vue';
import DummyLoader from '@/components/DummyLoader.vue';
import PratilipiComponent from '@/components/Pratilipi.vue';
import PageNotFound from '@/components/404.vue';
import constants from '@/constants'
import mixins from '@/mixins';
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'List-Page',
    data() {
        return {
            user_id: null,
            scrollPosition: null
        }
    },
    mixins: [
        mixins
    ],
    computed: {
        ...mapGetters('listpage', [
            'getPratilipiListLoadingState',
            'getPratilipiListData',
            'getPratilipiListTotalCount',
            'getPratilipiListTitle',
            'getPratilipiListCursor'
        ]),
        ...mapGetters([
            'getUserDetails'
        ])
    },
    methods: {
        ...mapActions('listpage', [
            'fetchInitialListPagePratilipis',
            'fetchMorePratilipisForListPage',
            'addToLibrary',
            'removeFromLibrary'
        ]),
        updateScroll(e) {
            this.scrollPosition = window.scrollY
        }
    },
    created() {
        console.log(this.$route)

        const { list_page_url } = this.$route.params;

        const currentLocale = process.env.LANGUAGE;
        constants.LANGUAGES.forEach((eachLanguage) => {
            if (eachLanguage.shortName === currentLocale) {
                this.fetchInitialListPagePratilipis({
                    language: eachLanguage.fullName.toUpperCase(),
                    listName: list_page_url,
                    resultCount: 20
                });
            }
        });
    },
    watch: {
        'scrollPosition'(newScrollPosition){
            const sbHeight = window.innerHeight * (window.innerHeight / document.body.offsetHeight)
            const nintyPercentOfList = ( 50 / 100 ) * $('.list-page').innerHeight();
            const { list_page_url } = this.$route.params;

            if (newScrollPosition + sbHeight > nintyPercentOfList && this.getPratilipiListLoadingState !== 'LOADING' && this.getPratilipiListCursor !== null) {
                
                const currentLocale = process.env.LANGUAGE;
                constants.LANGUAGES.forEach((eachLanguage) => {
                    if (eachLanguage.shortName === currentLocale) {
                        this.fetchMorePratilipisForListPage({
                            language: eachLanguage.fullName.toUpperCase(),
                            listName: list_page_url,
                            resultCount: 20
                        });
                    }
                });
            }
        },
        '$route.params.list_page_url'(list_page_url) {
            const currentLocale = process.env.LANGUAGE;
            constants.LANGUAGES.forEach((eachLanguage) => {
                if (eachLanguage.shortName === currentLocale) {
                    this.fetchInitialListPagePratilipis({
                        language: eachLanguage.fullName.toUpperCase(),
                        listName: list_page_url,
                        resultCount: 20
                    });
                }
            });
        }
    },
    mounted() {
        const { list_page_url } = this.$route.params;
        this.triggerAnanlyticsEvent(`LANDED_CATEGORYM_CATEGORY`, 'CONTROL', {
            'USER_ID': this.getUserDetails.userId,
            'PARENT_ID': list_page_url
        });
        window.addEventListener('scroll', this.updateScroll);
    },
    destroyed() {
        window.removeEventListener('scroll', this.updateScroll);
    },
    components: {
        MainLayout,
        PratilipiComponent,
        Spinner,
        PageNotFound,
        DummyLoader
    }
}
</script>

<style lang="scss" scoped>
.list-page {
    margin-top: 85px;
    text-align: left;
    @media screen and (max-width: 992px ) {
        margin-top: 65px;
        text-align: center;
    }
    h2 {
        font-size: 24px;
        font-weight: bold;
        text-align: left;
        border-left: 3px solid #d0021b;
        padding-left: 10px;
        margin: 10px 0;
    }
}
</style>
