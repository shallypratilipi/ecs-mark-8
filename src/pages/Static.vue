<template>
    <MainLayout>
        <div class="static-page page-wrap">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <h2 v-if="getStaticPageLoadingStatus === 'LOADING_SUCCESS'">{{ getStaticPageData.title }}</h2>
                        <div class="page-content" v-if="getStaticPageLoadingStatus === 'LOADING_SUCCESS'" v-html="getStaticPageData.content">
                        </div>
                        <Spinner v-if="getStaticPageLoadingStatus === 'LOADING'"></Spinner>
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
import { mapGetters, mapActions } from 'vuex'

export default {
    components: {
        MainLayout,
        Spinner
    },
    computed: {
        ...mapGetters('staticpage', [
            'getStaticPageData',
            'getStaticPageLoadingStatus'
        ])
    },
    methods: {
        ...mapActions('staticpage', [
            'fetchStaticPageContent'
        ]),
    },
    watch: {
        '$route.path' (path) {
            let pageName = '';
            switch(path) {
                case '/about/pratilipi':
                    pageName = 'about_pratilipi';
                    break;
                case '/work-with-us':
                    pageName = 'work-with-us';
                    break;
                case '/privacy-policy':
                    pageName = 'privacy-policy';
                    break;
                case '/terms-of-service':
                    pageName = 'terms-of-service';
                    break;
            }

            const currentLocale = process.env.LANGUAGE;
            constants.LANGUAGES.forEach((eachLanguage) => {
                if (eachLanguage.shortName === currentLocale) {
                    this.fetchStaticPageContent({ pageName, language: eachLanguage.fullName.toUpperCase() })
                }
            });
        }
    },
    created() {
        console.log(this.$route)
        let pageName = '';
        switch(this.$route.path) {
            case '/about/pratilipi':
                pageName = 'about_pratilipi';
                break;
            case '/work-with-us':
                pageName = 'work-with-us';
                break;
            case '/privacy-policy':
                pageName = 'privacy-policy';
                break;
            case '/terms-of-service':
                pageName = 'terms-of-service';
                break;
        }

        const currentLocale = process.env.LANGUAGE;
        constants.LANGUAGES.forEach((eachLanguage) => {
            if (eachLanguage.shortName === currentLocale) {
                this.fetchStaticPageContent({ pageName, language: eachLanguage.fullName.toUpperCase() })
            }
        });
        
    }
}
</script>

<style lang="scss" scoped>
.static-page {
    margin-top: 85px;
    text-align: left;
    min-height: 600px;
    @media screen and (max-width: 992px ) {
        margin-top: 65px;
    }
    h2 {
        font-size: 22px;
        font-weight: bold;
        text-align: left;
        border-left: 3px solid #d0021b;
        padding-left: 10px;
        margin: 10px 0;
        @media screen and (max-width: 992px ) {
            font-size: 18px;
        }
    }
}
</style>
<style>
p {
    word-break: break-word !important;
}
</style>
