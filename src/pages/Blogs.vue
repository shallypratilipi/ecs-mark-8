<template>
    <MainLayout>
        <div class="static-page page-wrap">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="page-title">__("seo_blog_page")</div>
                        <div class="page-content blog-section">
                            <ul>
                                <li v-for="eachBlog in getBlogsData" :key="eachBlog.eventId" class="card">
                                    <router-link :to="{ name: 'Blog_Page', params: { blog_id: eachBlog.pageUrl.split('/').pop() } }">
                                        <div class="head-title">{{ eachBlog.title }}</div>
                                        <div class="date-published">{{ eachBlog.creationDateMillis | convertDate }}</div>
                                        <div class="blog-summary">{{ eachBlog.content }}</div>
                                        <div class="view-more">__("view_more")</div>
                                    </router-link>
                                </li>
                            </ul>
                            <Spinner v-if="getBlogsLoadingState === 'LOADING'"></Spinner>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<script>
import MainLayout from '@/layout/main-layout.vue';
import constants from '@/constants'
import Spinner from '@/components/Spinner.vue';
import { mapGetters, mapActions } from 'vuex'

export default {
    components: {
        MainLayout,
        Spinner
    },
    data() {
        return {
            scrollPosition: null
        }
    },
    computed: {
        ...mapGetters('blogspage', [
            'getBlogsLoadingState',
            'getBlogsData',
            'getBlogsDataCursor'
        ])
    },
    methods: {
        ...mapActions('blogspage', [
            'fetchInitialListOfBlogs',
            'fetchMoreBlogs'
        ]),
        updateScroll() {
            this.scrollPosition = window.scrollY
        }
    },
    watch: {
        'scrollPosition'(newScrollPosition){
            const nintyPercentOfList = ( 75 / 100 ) * $('.static-page').innerHeight();

            console.log(nintyPercentOfList)
            if (newScrollPosition > nintyPercentOfList && this.getBlogsLoadingState !== 'LOADING' && this.getBlogsDataCursor) {
                
                const currentLocale = process.env.LANGUAGE;
                constants.LANGUAGES.forEach((eachLanguage) => {
                    if (eachLanguage.shortName === currentLocale) {
                        this.fetchMoreBlogs({ 
                            language: eachLanguage.fullName.toUpperCase(), 
                            resultCount: 20
                        });
                    }
                });
            }
        }
    },
    created() {
        const currentLocale = process.env.LANGUAGE;
        constants.LANGUAGES.forEach((eachLanguage) => {
            if (eachLanguage.shortName === currentLocale) {
                this.fetchInitialListOfBlogs({ language: eachLanguage.fullName.toUpperCase(), resultCount: 20 })
            }
        });
    },
    mounted() {
        window.addEventListener('scroll', this.updateScroll);
    },
    destroyed() {
        window.removeEventListener('scroll', this.updateScroll);
    }
}
</script>

<style lang="scss" scoped>
.static-page {
    margin-top: 85px;
    text-align: left;
    background: #f8f8f8;
    min-height: 700px;
    @media screen and (max-width: 992px ) {
        margin-top: 65px;
    }
    .page-title {
        text-align: left;
        font-size: 24px;
        font-weight: bold;
        text-align: left;
        border-left: 3px solid #d0021b;
        padding-left: 10px;
        margin: 10px 0;
        @media screen and (max-width: 768px ) {
            font-size: 18px;
        }
    }
    .blog-section {
        ul {
            padding: 0;
        }
        .card {
            border-radius: 0;
            margin: 10px;
            a {
                color: #2c3e50;
                .head-title {
                    font-size: 18px;
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
                .blog-summary {
                    font-size: 14px;
                    padding: 0 10px;
                    margin: 5px 0;
                    height: 90px;
                    line-height: 22px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 4;
                    -webkit-box-orient: vertical;
                }
                &:hover {
                    text-decoration: none;
                }
                .view-more {
                    color: #d0021b;
                    padding: 0 10px 10px;
                    font-size: 14px;
                    text-align: right;
                }
            }
        }
    }
}
</style>
