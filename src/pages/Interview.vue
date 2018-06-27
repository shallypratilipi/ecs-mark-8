<template>
    <MainLayout>
        <div class="interview-page page-wrap">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="card blog-info">
                            <div class="head-title">{{ getInterviewData.title }}</div>
                            <div class="date-published" v-if="getInterviewDataLoadingStatus === 'LOADING_SUCCESS'">{{ getInterviewData.creationDateMillis | convertDate }}</div>
                            <div class="desc" v-html="getInterviewData.content"></div>
                            <Spinner v-if="getInterviewDataLoadingStatus === 'LOADING'"></Spinner>
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
import { mapGetters, mapActions } from 'vuex'

export default {
    components: {
        MainLayout,
        Spinner
    },
    computed: {
        ...mapGetters('interviewpage', [
            'getInterviewData',
            'getInterviewDataLoadingStatus'
        ])
    },
    methods: {
        ...mapActions('interviewpage', [
            'fetchInterviewData'
        ])
    },
    watch: {
        '$route.params.slug' (slug) {
            this.fetchInterviewData(slug);
        }
    },
    created() {
        const { slug } = this.$route.params;
        this.fetchInterviewData(`/author-interviews/${slug}`);

    }
}
</script>

<style lang="scss">
.interview-page {
    margin-top: 85px;
    text-align: left;
    background: #f8f8f8;
    min-height: 700px;
    @media screen and (max-width: 992px ) {
        margin-top: 65px;
    }
    .card {
        border-radius: 0;
        margin: 10px 0;
        padding: 0;
        text-align: left;
        .head-title {
            font-size: 22px;
            font-weight: bold;
            text-align: left;
            border-left: 3px solid #d0021b;
            padding-left: 10px;
            margin: 10px 0 0;
        }
        .date-published {
            font-size: 12px;
            margin: 5px 0 5px 10px;
        }
        .desc {
            text-align: left;
            padding: 10px;
            font-size: 14px;
            img {
                max-width: 100%;
                margin: 10px;
                height: auto !important;
            }
        }
    }
}
</style>
