<template>
    <div class="page-not-found">
        <div class="container">
            <div class="not-found-image">
                <div class="title">__("page_not_found_heading")</div>
                <router-link
                :to="{ name: 'Home'}"
                class="desc">
                    __("page_not_found_description")
                </router-link>
            </div>
            <div class="head-title">__("writer_select_category")</div>
            <div class="category-list" v-for="each_category_section in category_sections" :key="each_category_section.title">
                <h4 class="category-section">{{ each_category_section.title }}</h4>
                <ul>
                    <li v-for="each_category in each_category_section.categories" :key="each_category.categoryUrl" v-if="each_category.pratilipiListData.listName">
                        <router-link
                        :to="{ path: each_category.categoryUrl }">
                            <span class="category-img" v-bind:style="{ backgroundImage: 'url(https://0.ptlp.co/resource-all/android-category-banners/' + each_category.imageFileName  + ')' }"></span>
                            <span class="category-name">{{ each_category.title }}</span>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import Constants from '@/constants';

export default {
    name: 'Pratilipi',
    data() {
        return {
            user_id: null,
            category_sections: []
        }
    },
    computed: {
        
    },
    methods: {
        
    },
    created() {
        this.category_sections = Constants.CATEGORY_DATA.sections;
    }
}
</script>

<style lang="scss" scoped>
.page-not-found {
    background: #fff;
    margin: 0 0 10px;
    text-align: left;
    position: relative;
    @media screen and (max-width: 992px ) {
        margin-top: 0;
    }
    .container {
        padding: 0;
    }
    .not-found-image {
        background: #fff url(../assets/404.jpg) no-repeat right top;
        background-size: contain;
        height: 275px;
        width: 100%;
        margin: -10px 0 30px;
        position: relative;
        .title {
            font-size: 22px;
            font-weight: bold;
            padding: 50px 10px 5px;
            max-width: 500px;
            @media screen and (max-width: 576px ) {
                max-width: 300px;
                padding-top: 20px;
            }
        }
        .desc {
            margin: 0 10px;
            font-size: 14px;
            max-width: 500px;
            color: #2c3e50;
            display: block;
            @media screen and (max-width: 576px ) {
                max-width: 270px;
            }
            &:hover {
                text-decoration: none;
            }
        }
    }
    .head-title {
        font-size: 18px;
        font-weight: bold;
        text-align: left;
        border-left: 3px solid #d0021b;
        padding-left: 10px;
        margin: 10px 0 0 10px;
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
        height: 252px;
        margin: 10px;
        color: #d0021b;
        display: inline-block;
        @media screen and (max-width: 768px ) {
            width: 100%;
            max-width: 340px;
            height: 150px;
        }
        a {
            color: #212121;
            &:hover {
                text-decoration: none;
            }
        }
        .category-img {
            width: 100%;
            height: 210px;
            display: block;
            background-size: cover;
            background-position: right center;
            @media screen and (max-width: 768px ) {
                height: 100px;
            }
        }
        .category-name {
            text-align: center;
            font-size: 14px;
            display: block;
            height: 40px;
            line-height: 40px;
            color: #d00b12;
            @media screen and (max-width: 768px ) {
                height: 50px;
                line-height: 50px;
            }
        }
    }
}
</style>
