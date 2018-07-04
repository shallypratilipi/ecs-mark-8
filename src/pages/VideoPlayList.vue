<template>
    <MainLayout> 
        <div class="static-page page-wrap">
            <div class="container">
                <div class="row" v-if="getVideoDetailsData.length>0">
                    <div class="col-md-12">
                        <h2>__("seo_videoseries_list_page") </h2>
                       </v-container>
                          <iframe 
                                        :src="getVideoDetailsData[0].videoEmbedUrl  " >
                           </iframe>
                           <h3 class="videoseries-list-title" > {{getVideoDetailsData[0].name}} </h3>
                           <p class="videoseries-list-description" >
                               {{getVideoDetailsData[0].description}}
                           </p>
                           <h7>नया एपिसोड</h7>
                           <div class="row">
                           <div class="col-md-6">
                           <iframe  class="latest-video" 
                                        :src="getVideoDetailsLatestData[0].videoEmbedUrl" >
                           </iframe>
                           <br>
                           </div>
                           <div class="col-md-6" >
                           <h3 class="videoseries-list-title"  v-if="getVideoDetailsLatestData.length>0"> {{getVideoDetailsLatestData[0].name}} </h3>
                             <p class="videoseries-list-description"  v-if="getVideoDetailsLatestData.length>0">
                               {{getVideoDetailsLatestData[0].description}}
                           </p>
                           </div>
                           </div>
                        <div class="page-content videoseries-list">
                            <ul> 
                                <li v-for="each_event in getListOfVideoPlayListdata" >
                                <router-link :to="{ name: 'Videos_Page', params: { videos_slug: each_event.pageUrl.split('/').pop() } }">
                                    <img  class="videoseries-img" :src=" each_event.imageUrl ">
                                        <span class="videoseries-name"> {{ each_event.displayTitle }}</span>
                                </router-link>
                                </li>
                            </ul>   
                            <p class="load-more" @click="loadMoreVideos" v-if="getListOfVideoPlayListdata.length<getListOfVideoPlayListTotal">Load More</p>
                        </div>
                    </div>
                </div>
            </div>
                            <Spinner v-if="getVideoPlayListsLoadingState ==='LOADING'"></Spinner>

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
        offset: 0,
    },

    computed: {
         ...mapGetters('videoseries', [
            'getVideoPlayListsLoadingState',
            'getVideoPlayListsData',
            'getListOfVideoPlayListLoadingState',
            'getListOfVideoPlayListdata',
            'getVideoDetailsData',
            'getVideoDetailsLatestData',
            'getListOfVideoPlayListTotal',
            'getListOfVideoPlayListOffset',



        ]),
        
    },
    methods: {
         ...mapActions('videoseries', [
            'fetchListOfVideoPlaylists',
            'fetchListOfVideoPlayListdata',
            'fetchVideoDetails',
            'fetchVideoDetailsLatest', 
            'resetVideoList'

        ]),

    loadMoreVideos(){
        console.log("Cool I am getting fired" + this.offset);
        this.offset += 10;
        const { videoseries_data, videoseries_slug } = this.$route.params;
        var videoseries_slug_offset = videoseries_slug + "&offset=" + this.offset;
        this.fetchListOfVideoPlayListdata(videoseries_slug_offset);
    }
    }, 
      watch: {
        'getVideoPlayListsLoadingState'(state) {
            console.log("changing", state);
        },
         '$route.params'() {
            console.log("Heyyyyyyyyyy");
            // console.log("Hola1998", this.getListOfVideoPlayListdata);;
         }


    },
    created() {
        this.resetVideoList()
        this.offset = 0;
          const currentLocale = process.env.LANGUAGE;
        constants.LANGUAGES.forEach((eachLanguage) => {
            if (eachLanguage.shortName === currentLocale) {
                this.fetchListOfVideoPlaylists(eachLanguage.fullName.toUpperCase())
            }
        });
        const { videoseries_data, videoseries_slug } = this.$route.params;
        console.log("Offset is: UUU" + this.offset);
        var videoseries_slug_offset = videoseries_slug + "&offset=" + this.offset;
        this.fetchListOfVideoPlayListdata(videoseries_slug_offset);
        var videoseries_slug_latest = videoseries_slug + "&sortType=latest&offset=0&limit=1";
        this.fetchVideoDetailsLatest(videoseries_slug_latest);
        this.fetchVideoDetails(videoseries_slug);
        console.log("Value I am looking for : " , this.getListOfVideoPlayListTotal);
        console.log("The only log I need: ", );
    },
    mounted() {
     
    }
}

</script>

<style lang="scss" scoped>
.videoseries-list-title{
font-size: 22px;
padding-top: 40px;
}
.load-more {
    font-size: 16 px;
    color: blue;
    cursor: pointer;
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
