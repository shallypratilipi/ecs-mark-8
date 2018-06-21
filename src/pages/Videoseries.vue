<template>
    <MainLayout> 
        <div class="static-page page-wrap">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <h2>__("seo_videoseries_list_page") </h2>
                        <div class="page-content videoseries-list">
                            <ul> 
                                <li v-for="each_event in getVideoPlayListsData" >
                                <router-link :to="{ name: 'VideoPlayList_Page', params: { videoseries_slug: each_event.pageUrl.split('/').pop(), videoseries_data: each_event } }">
                                         <span class="videoseries-img" v-bind:style="{ backgroundImage: 'url(' +each_event.hqImageUrl+ ')' }"></span>
                                        <span class="videoseries-name"> {{ each_event.displayTitle }}</span>
                                        </router-link>
                                </li>
                            </ul>   
                            <Spinner v-if="getVideoPlayListsLoadingState=== 'LOADING'"></Spinner>
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
import mixins from '@/mixins';
import { mapGetters, mapActions } from 'vuex'

export default {
    components: {
        MainLayout,
        Spinner
    },
    mixins: [
        mixins
    ],
    data: {
    numbers: [ 1, 2, 3, 4, 5 ]
    },

    computed: {
         ...mapGetters('videoseries', [
            'getVideoPlayListsLoadingState',
            'getVideoPlayListsData'
        ]),
        
    },
    methods: {
         ...mapActions('videoseries', [
            'fetchListOfVideoPlaylists'
        ]),
        
    }, 
    created() {
          const currentLocale = process.env.LANGUAGE;
        constants.LANGUAGES.forEach((eachLanguage) => {
            if (eachLanguage.shortName === currentLocale) {
                this.fetchListOfVideoPlaylists(eachLanguage.fullName.toUpperCase())
            }
        });
       
    },
    mounted() {
     
    }
}
</script>

<style lang="scss" scoped>
.static-page {
    margin-top: 85px;
    text-align: left;
    min-height: 700px;
    @media screen and (max-width: 992px ) {
        margin-top: 65px;
    }
    h2 {
        font-size: 24px;
        font-weight: bold;
        text-align: left;
        border-left: 3px solid #d0021b;
        padding-left: 10px;
        margin: 10px 0;
    }
    .videoseries-list {
        text-align: left;
        @media screen and (max-width: 992px ) {
            text-align: center;
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
            .videoseries-img {
                width: 100%;
                height: 210px;
                display: block;
                background-size: cover;
                background-position: right center;
                @media screen and (max-width: 768px ) {
                    height: 100px;
                }
            }
            .videoseries-name {
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
}
</style>
