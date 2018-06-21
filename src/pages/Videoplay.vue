<template>
    <MainLayout> 
        <div class="static-page page-wrap">
            <div class="container">
                <div class="row">
                    <div class="col-md-12" v-if="getCurrentVideoPlayData.length>0">

                        <h2>__("seo_videoseries_list_page") </h2>
                          <iframe  
                                        :src="getCurrentVideoPlayData[0].videoEmbedUrl  " >
                           </iframe>
                           <h3 class="videoseries-list-title"> {{getCurrentVideoPlayData[0].name}} </h3>
                           <p class="videoseries-list-description">
                               {{getCurrentVideoPlayData[0].description}}
                           </p>
                           <p class="next-video" v-if="getNextVideoPlayData!=null"> 
                           <router-link :to="{ name: 'Videos_Page', params: { videos_slug: getNextVideoPlayData.split('/').pop()} }">
                           Next
                           </router-link>
                           </p>
                           <p class="previous-video" v-if="getPreviousVideoPlayData!=null"> 
                            <router-link :to="{ name: 'Videos_Page', params: { videos_slug: getPreviousVideoPlayData.split('/').pop()} }">       
                           Prev
                        </router-link>
                           </p>
                            <div class="page-content videoseries-list">
                            <ul style="flex-direction: row "> 
                                <li v-for="each_event in getOtherVideos" style="">
                                <router-link :to="{ name: 'Videos_Page', params: { videos_slug: each_event.pageUrl.split('/').pop() } }">
                                    <img  class="videoseries-img" :src=" each_event.imageUrl ">
                                    <!-- <video width="320" height="240" controls>
                                    <source src="https://www.youtube.com/embed/2EgmDovRQY">
                                    </video> -->
                                        <span class="videoseries-name"> {{ each_event.displayTitle }}</span>
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
import constants from '@/constants'
import Spinner from '@/components/Spinner.vue';
import mixins from '@/mixins';
import { mapGetters, mapActions } from 'vuex';
import Slick from 'vue-slick'


export default {
    components: {
        MainLayout,
        Spinner
    },
    mixins: [
        mixins
    ],
    computed: {
         ...mapGetters('videoseries', [
            'getVideoPlayListsLoadingState',
            'getVideoPlayListsData',
            'getListOfVideoPlayListLoadingState',
            'getListOfVideoPlayListdata',
            'getVideoDetailsData',
            'getVideoDetailsLatestData',
            'getCurrentVideoPlayData',
            'getNextVideoPlayData',
            'getPreviousVideoPlayData',
            'getCurrentVideoLoadingState',
            'getOtherVideos'

        ]),
        
    },
    methods: {
         ...mapActions('videoseries', [
            'fetchListOfVideoPlaylists',
            'fetchListOfVideoPlayListdata',
            'fetchVideoDetails',
            'fetchVideoDetailsLatest',
            'fetchCurrentVideoPlay',
            'fetchOtherVideos'
        ]),
        
    }, 
     watch: {
        '$route.params'() {
        const {videos_slug } = this.$route.params;
        console.log("Rebirth from wather" + videos_slug);
        this.fetchCurrentVideoPlay(videos_slug);
        this.fetchOtherVideos(videos_slug);
        },
        'getCurrentVideoLoadingState' (state) {
        console.log("abcd", this.getCurrentVideoLoadingState);
        if(this.getCurrentVideoLoadingState == 'LOADING_SUCCESS'){
            console.log("abcd Now fire me");
        }
     
        }

    },
    created() {
        const {videos_slug } = this.$route.params;
        console.log("abcd from created", this.getCurrentVideoLoadingState);
        this.fetchCurrentVideoPlay(videos_slug);
        console.log("abcd", this.getCurrentVideoLoadingState);
        this.fetchOtherVideos(videos_slug);
    },
    mounted() {
     
    }
}
</script> 

<style lang="scss" scoped>
.videoseries-list-title{
font-size: 22px;
padding-top: 40px;
display: inline;
}
.videoseries-list-description{
    font-size: 18px;
    margin-bottom: 40px;
}
iframe {
    width: 100%;
    height: 400px;
}
.latest-video{
    width: 100%;
    height: 300px;
}
.next-video {
    float: right;
}
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
        margin-top: 40px;
        @media screen and (max-width: 992px ) {
            text-align: center;
        }
        ul {
            @media screen and (max-width: 992px ) {
                padding: 0;
            }
        }
        li,iframe {
            width: 300px;
            background: #fff;
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
