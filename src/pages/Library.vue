<template>
    <MainLayout>
        <div class="list-page page-wrap">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <h2>__('my_library')</h2>
                        <PratilipiComponent
                        :pratilipiData="pratilipiData"
                        :key="pratilipiData.pratilipiId"
                        v-for="pratilipiData in getPratilipiListData"
                        v-if="getPratilipiListLoadingState === 'LOADING_SUCCESS' || getPratilipiListData.length !== 0"
                        :addToLibrary="addToLibrary"
                        :removeFromLibrary="removeFromLibrary"
                        :screenName="'LIBRARY'"
                        :screenLocation="'LIBRARYM'"
                        ></PratilipiComponent>
                        <Spinner v-if="getPratilipiListLoadingState === 'LOADING'"></Spinner>
                        <p class="message" v-if="getPratilipiListLoadingState === 'LOADING_SUCCESS' && getPratilipiListData.length == 0">__("empty_library")</p>
                        <div class="card" v-if="getUserDetails.isGuest">
                            <div class="head-title">__("seo_login_page")</div>
                            <div class="card-content">
                                <p><i class="material-icons">check_circle</i> __("user_login_to_view_library")</p>
                                <p><i class="material-icons">check_circle</i> __("android_banner_library_2")</p>
                                <button type="button" class="btn" data-toggle="modal" data-target="#login_modal">__("user_sign_in") / __("user_sign_up")</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<script>
import MainLayout from '@/layout/main-layout.vue';
import Spinner from '@/components/Spinner.vue';
import PratilipiComponent from '@/components/Pratilipi.vue';
import constants from '@/constants'
import mixins from '@/mixins';
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'Library-Page',
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
        ...mapGetters('librarypage', [
            'getPratilipiListLoadingState',
            'getPratilipiListData',
            'getPratilipiListTotalCount',
            'getPratilipiListCursor'
        ]),
        ...mapGetters([
            'getUserDetails'
        ])
    },
    methods: {
        ...mapActions('librarypage', [
            'fetchInitialLibraryPagePratilipis',
            'fetchMorePratilipisForLibraryPage',
            'addToLibrary',
            'removeFromLibrary'
        ]),
        updateScroll() {
            this.scrollPosition = window.scrollY
        }
    },
    created() {
        console.log(this.$route)

        this.fetchInitialLibraryPagePratilipis(20);
    },
    watch: {
        'scrollPosition'(newScrollPosition){
            const nintyPercentOfList = ( 75 / 100 ) * $('.list-page').innerHeight();
            // const { list_page_url } = this.$route.params;

            if (newScrollPosition > nintyPercentOfList && this.getPratilipiListLoadingState !== 'LOADING' && this.getPratilipiListCursor !== null) {
                
                this.fetchMorePratilipisForLibraryPage(20);
            }
        }
    },
    mounted() {
        window.addEventListener('scroll', this.updateScroll);
        this.triggerAnanlyticsEvent('LANDED_LIBRARYM_LIBRARY', 'CONTROL', {
            'USER_ID': this.getUserDetails.userId
        });
    },
    destroyed() {
        window.removeEventListener('scroll', this.updateScroll);
    },
    components: {
        MainLayout,
        PratilipiComponent,
        Spinner
    }
}
</script>

<style lang="scss" scoped>
.list-page {
    margin-top: 85px;
    text-align: left;
    min-height: 700px;
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
    p.message {
        margin: 15px 15px 15px 0;
        font-size: 14px;
        color: #555;
    }
    .card {
        border-radius: 0;
        margin: 20px 0;
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
        .card-content {
            padding: 5px 10px 10px;
            text-align: left;
            p {
                text-align: left;
                font-size: 14px;
                margin: 10px 0;
                i {
                    font-size: 16px;
                    vertical-align: middle;
                    color: #9E9E9E;
                    padding-right: 5px;
                }
            }
            button {
                background: #d00b12;
                color: #fff;
                margin: 10px 0;
            }
        }
    }
}
</style>
