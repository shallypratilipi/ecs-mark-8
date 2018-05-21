<template>
    <MainLayout>
        <div class="blog-page page-wrap">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="card blog-info">
                            <div class="head-title">{{ getBlogData.title }}</div>
                            <div class="date-published" v-if="getBlogDataLoadingStatus === 'LOADING_SUCCESS'">{{ getBlogData.creationDateMillis | convertDate }}</div>
                            <div class="desc" v-html="getBlogData.content"></div>
                            <Spinner v-if="getBlogDataLoadingStatus === 'LOADING'"></Spinner>
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
        ...mapGetters('blogpage', [
            'getBlogData',
            'getBlogDataLoadingStatus'
        ])
    },
    methods: {
        ...mapActions('blogpage', [
            'fetchBlogData'
        ])
    },
    watch: {
        '$route.params.blog_id' (blog_id) {
            this.fetchBlogData(blogId);
        }
    },
    created() {
        const { blog_id } = this.$route.params;
        this.fetchBlogData(`/blog/${blog_id}`);
        
    }
}
</script>

<style lang="scss">
.blog-page {
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
