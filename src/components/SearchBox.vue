<template>
    <div class="search-dropdown">
        <span class="close-search" @click="closeDropdown"><i class="material-icons">close</i></span>
        <ul class="search-options">
            <li>
                <router-link
                :to="{ name: 'Search_Page', query: { q: searchText } }">
                    {{ searchText }}
                </router-link>
            </li>
        </ul>
        <div class="trending">
            <div class="title">__("search_trending_heading")</div>
            <div class="tags">
                <router-link
                :to="{ name: 'Search_Page', query: { q: eachTrendingWord } }"
                @click.native="triggerEvent(eachTrendingWord)"
                 v-for="(eachTrendingWord, index) in getTrendingWords" :key="index">
                    #{{ eachTrendingWord }}
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import mixins from '@/mixins'
import constants from '@/constants'

export default {
    props: {
        searchText: {
            type: String,
            required: true
        }
    },
    mixins: [
        mixins
    ],
    computed: {
        ...mapGetters('searchpage', [
            'getTrendingWords'
        ]),
        ...mapGetters([
            'getUserDetails'
        ])
    },
    methods: {
        ...mapActions('searchpage', [
            'fetchTrendingSearch'
        ]),
        closeDropdown() {
            $(".search-dropdown").hide();
        },
        triggerEvent(trendingWord) {
            this.triggerAnanlyticsEvent(`SEARCH_TRENDSEARCH_SEARCH`, 'CONTROL', {
                'USER_ID': this.getUserDetails.userId,
                'ENTITY_VALUE': trendingWord
            });
        }
    },
    created() {
        const currentLocale = process.env.LANGUAGE;
        constants.LANGUAGES.forEach((eachLanguage) => {
            if (eachLanguage.shortName === currentLocale) {
                this.fetchTrendingSearch(eachLanguage.fullName.toUpperCase());
            }
        });
    }
}
</script>

<style lang="scss" scoped>
    .search-dropdown {
        background: #fff;
        border: 1px solid #ced4da;
        border-top: 0;
        position: absolute;
        z-index: 2;
        margin: -5px 0 0 -1px;
        width: 100%;
        box-sizing: content-box;
        border-bottom-left-radius: 3px;
        border-bottom-right-radius: 3px;
        display: none;
        .search-options {
            padding: 0;
            margin: 0;
            list-style: none;
            text-align: left;
            font-size: 14px;
            border-bottom: 1px solid #eee;
            a {
                padding: 5px 10px;
                display: block;
            }
        }
        .close-search {
            position: absolute;
            top: 11px;
            right: 3px;
            background: #fff;
            height: 18px;
            padding: 0 4px;
            cursor: pointer;
            i {
                font-size: 16px;
            }
        }
        .title {
            font-size: 12px;
            font-weight: bold;
            text-align: left;
            border-left: 3px solid #d0021b;
            padding-left: 5px;
            margin: 10px 0 0 5px;
        }
        .tags {
            text-align: left;
            padding: 5px 5px 10px;
            a {
                padding: 5px;
                font-size: 12px;
            }
        }
    }
</style>
