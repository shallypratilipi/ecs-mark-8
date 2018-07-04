<template>
    <MainLayout>
        <div class="search-page page-wrap">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <h2>__("search_results")</h2>
                        <div class="head-title" v-if="getAuthorListData.length !== 0">__("search_results_authors")</div>
                        <div class="author-section" v-if="getAuthorListData.length !== 0">
                            <slick ref="slick" :options="slickOptions">
                                <AuthorCard v-for="eachAuthor in getAuthorListData"
                                    :key="eachAuthor.authorId"
                                    :authorData="eachAuthor"
                                    :screenName="'SEARCH'"
                                    :screenLocation="'USERRESULT'"
                                    :followOrUnfollowAuthor="followOrUnfollowAuthor"></AuthorCard>
                            </slick>
                        </div>
                        <div class="books-section">
                            <div class="head-title" v-if="getPratilipiListLoadingState === 'LOADING_SUCCESS' || getPratilipiListData.length !== 0">__("search_results_contents")</div>
                            <PratilipiComponent
                            :pratilipiData="pratilipiData"
                            :key="pratilipiData.pratilipiId"
                            v-for="pratilipiData in getPratilipiListData"
                            v-if="getPratilipiListLoadingState === 'LOADING_SUCCESS' || getPratilipiListData.length !== 0"
                            :addToLibrary="addToLibrary"
                            :removeFromLibrary="removeFromLibrary"
                            :screenName="'SEARCH'"
                            :screenLocation="'PRATILIPIRESULT'"
                            ></PratilipiComponent>
                            <Spinner v-if="getPratilipiListLoadingState === 'LOADING'"></Spinner>
                            <p class="message" v-if="getPratilipiListLoadingState === 'LOADING_SUCCESS' && getPratilipiListData.length == 0">__("search_no_results_found")</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<script>
import MainLayout from '@/layout/main-layout.vue';
import Spinner from '@/components/Spinner.vue';
import AuthorCard from '@/components/AuthorCard.vue';
import PratilipiComponent from '@/components/Pratilipi.vue';
import constants from '@/constants'
import Slick from 'vue-slick'
import { mapGetters, mapActions } from 'vuex'

export default {
    components: {
        MainLayout,
        Spinner,
        AuthorCard,
        PratilipiComponent,
        Slick
    },
    data() {
        return {
            slickOptions: {
                infinite: false,
                adaptiveHeight: false,
                variableWidth: true,
                draggable: true,
                edgeFriction: 0.30,
                swipe: true,
                prevArrow: '<div class="back"><i class="material-icons" aria-hidden="true">keyboard_arrow_left</i></div>',
                nextArrow: '<div class="forward"><i class="material-icons" aria-hidden="true">keyboard_arrow_right</i></div>'
            }
        }
    },
    computed: {
        ...mapGetters('searchpage', [
            'getPratilipiListLoadingState',
            'getPratilipiListCursor',
            'getPratilipiListData',
            'getAuthorListLoadingState',
            'getAuthorListCursor',
            'getAuthorListData'
        ])
    },
    methods: {
        ...mapActions('searchpage', [
            'fetchInitialSearchResult',
            'fetchMorePratilipisForSearchPage',
            'addToLibrary',
            'removeFromLibrary',
            'followOrUnfollowAuthor'
        ]),
        updateScroll() {
            this.scrollPosition = window.scrollY
        }
    },
    watch: {
        'scrollPosition'(newScrollPosition){
            const nintyPercentOfList = ( 75 / 100 ) * $('.search-page').innerHeight();
            const { list_page_url } = this.$route.params;

            if (newScrollPosition > nintyPercentOfList && this.getPratilipiListLoadingState !== 'LOADING' && this.getPratilipiListCursor !== null) {

                const currentLocale = process.env.LANGUAGE;
                constants.LANGUAGES.forEach((eachLanguage) => {
                    if (eachLanguage.shortName === currentLocale) {
                        this.fetchMorePratilipisForSearchPage({
                            searchQuery: this.$route.query.q,
                            language: eachLanguage.fullName.toUpperCase(),
                            resultCount: 10
                        });
                    }
                });
            }
        },
        '$route.query.q'(newValue) {
            console.log(newValue)

            const currentLocale = process.env.LANGUAGE;
            constants.LANGUAGES.forEach((eachLanguage) => {
                if (eachLanguage.shortName === currentLocale) {
                    this.fetchInitialSearchResult({
                        searchQuery: this.$route.query.q,
                        language: eachLanguage.fullName.toUpperCase(),
                    });
                }
            });
        }
    },
    mounted() {
        window.addEventListener('scroll', this.updateScroll);
    },
    destroyed() {
        window.removeEventListener('scroll', this.updateScroll);
    },
    created() {
        if (this.$route.query.q) {
            const currentLocale = process.env.LANGUAGE;
            constants.LANGUAGES.forEach((eachLanguage) => {
                if (eachLanguage.shortName === currentLocale) {
                    this.fetchInitialSearchResult({ 
                        searchQuery: this.$route.query.q,
                        language: eachLanguage.fullName.toUpperCase(),
                    });
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.search-page {
    margin-top: 85px;
    text-align: left;
    min-height: 700px;
    @media screen and (max-width: 992px ) {
        margin-top: 65px;
        text-align: center;
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
    .head-title {
        font-size: 16px;
        font-weight: bold;
        text-align: left;
        border-left: 3px solid #d0021b;
        padding-left: 10px;
        margin: 10px 0 5px;
    }
    p.message {
        margin: 15px 15px 15px 0;
        font-size: 14px;
        color: #555;
    }
    .author-section {
        width: 100%;
        text-align: left;
        position: relative;
    }
}
</style>
<style lang="scss">
	.back, .forward {
		position: absolute;
		top: 45%;
		z-index: 2;
		background-color: #fff;
		border-radius: 50%;
		width: 40px;
		height: 40px;
		color: #000;
		border: 1px solid #e9e9e9;
        text-align: center;
		cursor: pointer;
		-moz-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
		-o-user-select: none;
		transition: all .3s, visibility 0s;
		-ms-transition: all .3s, visibility 0s;
		-webkit-transition: all .3s, visibility 0s;
		-moz-transition: all .3s, visibility 0s;
		i {
			height: 40px;
			line-height: 40px;
			font-size: 26px;
		}
		@media screen and (min-width: 768px ) {
			&:hover {
				background: #9E9E9E;
				border-color: #9E9E9E;
				box-shadow: 0 0px 2px rgba(0,0,0,0.2);
				color: #fff;
			}
		}
		&.slick-disabled {
			i {
				opacity: 0.2;
			}
            &:hover {
                background: #fff;
                border-color: #fff;
                i {
                    color: #212121;
                }
            }
		}
	}
	.back {
		margin-left: -5px;
	}
	.forward {
		right: -15px;
	}
</style>
<style lang="scss">
    @import '../../node_modules/slick-carousel/slick/slick.css';
</style>
