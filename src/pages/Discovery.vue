<template>
    <MainLayout>
        <div class="discovery-page page-wrap">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12">
                        <h2>__('search_explore_categories')</h2>

                        <div class="category-list" v-for="each_category_section in category_sections" :key="each_category_section.title">
                            <h4 class="category-section">{{ each_category_section.title }}</h4>
                            <ul>
                                <li v-for="each_category in each_category_section.categories"
                                    :key="each_category.categoryUrl">
                                    <router-link
                                    :to="{ path: each_category.categoryUrl }" @click.native="triggerAnanlyticsEventForClick(each_category.categoryUrl)"
                                    class="category-img"
                                    v-bind:style="{ backgroundImage: 'url(https://0.ptlp.co/resource-all/android-category-banners/' + each_category.imageFileName  + ')' }">
                                        <span class="category-name">{{ each_category.title }}</span>
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<script>
import MainLayout from '@/layout/main-layout.vue';
import Constants from '@/constants';
import mixins from '@/mixins';
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'Pratilipi',
    data() {
        return {
            user_id: null,
            category_sections: []
        }
    },
    computed: {
        ...mapGetters([
            'getUserDetails'
        ])
    },
    methods: {
        triggerAnanlyticsEventForClick(categoryUrl){
            this.triggerAnanlyticsEvent('CLICKCATEGORY_TOPICS_DISCOVER', 'CONTROL', {
                'USER_ID': this.getUserDetails.userId,
                'PARENT_ID': categoryUrl
            });
        }
    },
    mixins: [
        mixins
    ],
    created() {
        this.category_sections = Constants.CATEGORY_DATA.sections;
        console.log(Constants);
    },
    mounted() {
        this.triggerAnanlyticsEvent('LANDED_DISCOVERM_DISCOVER', 'CONTROL', {
            'USER_ID': this.getUserDetails.userId
        });
    },
    components: {
        MainLayout
    }
}
</script>

<style lang="scss" scoped>
.discovery-page {
    margin-top: 85px;
    min-height: 700px;
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
        @media screen and (max-width: 768px ) {
            font-size: 18px;
        }
    }
    .category-list {
        text-align: left;
        @media screen and (max-width: 992px ) {
            text-align: center;
        }
        .category-section {
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
            height: 200px;
            margin: 10px;
            color: #d0021b;
            display: inline-block;
            @media screen and (max-width: 768px ) {
                width: 100%;
                max-width: 340px;
                height: 150px;
                margin: 10px 2px;
            }
            a {
                color: #212121;
                &:hover {
                    text-decoration: none;
                }
            }
            .category-img {
                width: 100%;
                height: 200px;
                display: block;
                background-size: cover;
                background-position: right center;
                position: relative;
                @media screen and (max-width: 768px ) {
                    height: 150px;
                }
            }
            .category-name {
                text-align: center;
                font-size: 15px;
                display: block;
                height: 40px;
                line-height: 40px;
                color: #fff;
                background: rgba(0,0,0,0.7);
                position: absolute;
                bottom: 0;
                width: 100%;
                @media screen and (max-width: 768px ) {
                    height: 50px;
                    line-height: 50px;
                }
            }
        }
    }
}
</style>
