<template>
    <ReadLayout>
        <div class="read-page">
            <div class="header-section" v-if="shouldLoadHeaderAndSetPageTheme()">
                <div class="container">
                    <div class="row">
                        <div class="exit-reader tool-icon-1">
                            <router-link :to="getPratilipiData.pageUrl"><i class="material-icons">arrow_back</i></router-link>
                        </div>
                        <div class="book-name tool-icon-8" @click="openSidebar"><span>{{ getPratilipiData.title }}</span> <i class="material-icons">arrow_drop_down</i></div>
                        <div class="right-icons">
                            <div class="settings tool-icon-1">
                                <button type="button" class="btn" data-toggle="modal" data-target="#readerOptions" @click="triggerSettingsEvent">
                                    <i class="material-icons">settings</i>
                                </button>
                            </div>
                            <div class="more-options tool-icon-1">
                                <button class="btn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="material-icons">more_vert</i>
                                </button>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <button type="button" class="btn report-btn" data-toggle="modal" data-target="#reportModal">
                                        __("report_button")
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Reader Options Modal -->
            <div class="modal fade" id="readerOptions" tabindex="-1" role="dialog" aria-labelledby="readerOptionsLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-body">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <i class="material-icons">close</i>
                            </button>
                            <div class="options">
                                <div class="option">
                                    <span>__("reader_font_size"):</span>
                                    <div class="buttons">
                                        <button type="button" name="button" @click="increaseFont"><i class="material-icons">add</i></button>
                                        <button type="button" name="button" @click="decreaseFont"><i class="material-icons">remove</i></button>
                                    </div>
                                </div>
                                <div class="option">
                                    <span>__("reader_background"):</span>
                                    <div class="buttons">
                                        <button type="button" id="whiteThemeButton" name="button" @click="themeWhite"><icon name="file-text-o" scale="1.5"></icon></button>
                                        <button type="button" id="blackThemeButton" name="button" @click="themeBlack"><icon name="file-text" scale="1.5"></icon></button>
                                        <button type="button" id="yellowThemeButton" name="button" @click="themeYellow"  class="yellow"><icon name="file-text-o" scale="1.5"></icon></button>
                                    </div>
                                </div>
                                <div class="option">
                                    <span>__("reader_line_spacing"):</span>
                                    <div class="buttons">
                                        <button type="button" name="button" @click="lineHeightSm"><span class="lh-icon lh-sm-icon"></span></button>
                                        <button type="button" name="button" @click="lineHeightMd"><span class="lh-icon lh-md-icon"></span></button>
                                        <button type="button" name="button" @click="lineHeightLg"><span class="lh-icon lh-lg-icon"></span></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Report Modal -->
            <div class="modal fade" id="reportModal" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">__("report_title")</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <i class="material-icons">close</i>
                            </button>
                        </div>
                        <div class="modal-body">
                                <div class="form-group">
                                    <label for="reportModalTextarea">__("report_issue")</label>
                                    <textarea class="form-control" id="reportModalTextarea" rows="3" placeholder="__('report_issue')"></textarea>
                                </div>
                                <button type="button" class="btn btn-primary btn-submit" @click="submitReport">__("submit")</button>
                                <button type="button" class="cancel" data-dismiss="modal" aria-label="Close">__("cancel")</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="book-content">
                <div class="container">
                    <div class="row">
                        <div class="col-12 p-0" v-if="getPratilipiContent.length > 0 && getPratilipiData.pratilipiId == $route.query.id">
                            <h2
                                class="chapter-title p-lr-15"
                                v-for="eachIndex in getIndexData"
                                :key="eachIndex.chapterId"

                                v-if="eachIndex.chapterNo == selectedChapter && (getPratilipiContent.length > 1 || eachIndex.title)">
                                  {{ eachIndex.title || chapter + eachIndex.chapterNo }}
                            </h2>
                            <h2
                                v-for="eachIndex in getIndexData"
                                v-if="eachIndex.chapterNo == selectedChapter && getPratilipiContent.length == 1 && !eachIndex.title"
                                class="chapter-title p-lr-15">
                                {{getPratilipiData.displayTitle}}
                            </h2>
                            <div class="content-section lh-md p-lr-15"
                                 :class="fontStyleObject"
                                 v-for="eachChapter in getPratilipiContent"
                                 v-if="eachChapter.chapterNo == selectedChapter"
                                 :key="eachChapter.chapterNo"
                                 v-html="eachChapter.content">
                            </div>
                            <Spinner v-if="getPratilipiContentLoadingState !== 'LOADING_SUCCESS'"></Spinner>
                            <div class="book-navigation p-lr-15" v-if="getPratilipiContentLoadingState === 'LOADING_SUCCESS'">
                                <div class="prev" v-if="selectedChapter != 1" @click="goToPreviousChapter">__("reader_prev_chapter")</div>
                                <div class="next" v-if="selectedChapter != getIndexData.length" @click="goToNextChapter">__("reader_next_chapter")</div>
                            </div>
                            <div @click="hideStripAndRedirect" class="next-strip-container">
                                <NextPratilipiStrip
                                    :pratilipi='getPratilipiData.nextPratilipi'
                                    v-if="isNextPratilipiEnabled && getPratilipiData.nextPratilipi.pratilipiId>0"
                                ></NextPratilipiStrip>
                            </div>

                           <ShareStrip
                                v-if="selectedChapter == getIndexData.length"
                                :data="getPratilipiData"
                                :type="'PRATILIPI'">
                            </ShareStrip>

                            <div class="book-bottom-ratings p-lr-15">
                                <Reviews
                                    :pratilipiId="getPratilipiData.pratilipiId"
                                    :authorId="getPratilipiData.author.authorId"
                                    :userPratilipiData='getUserPratilipiData'
                                    :haveInfiniteScroll="true"
                                    screenName="READER"
                                    screenLocation="BOOKEND"
                                    :pratilipiData="getPratilipiData"
                                    v-if="selectedChapter == getIndexData.length && !openRateReaderm && !openRateRev ">
                                </Reviews>
                            </div>

                            <div class="book-bottom-webpush-subscribe">
                                   <div class="webpush-container">
                                    <div class="webpush-inner-container">
                                       <WebPushStrip
                                            screenName="READER"
                                            title="__('web_push_title')"
                                            message="__('web_push_message_3')"
                                            v-if="selectedChapter == getIndexData.length && isWebPushStripEnabled">
                                        </WebPushStrip>
                                    </div>
                                </div>
                            </div>

                            <div class="book-recomendations p-r-10" v-if="selectedChapter == getIndexData.length">
                                <Recommendation
                                    :contextId="getPratilipiData.pratilipiId"
                                    :context="'summaryPage'"
                                    :themeColor="readingMode"
                                    screenName="READER"
                                    screenLocation="RECOMMENDBOOK"
                                    v-if="getPratilipiData && getPratilipiData.pratilipiId"
                                >
                                </Recommendation>
                            </div>

                            <WebPushModal
                                title="__('web_push_title')"
                                message="__('web_push_message_2')"
                                screenName="READER"
                                :includeDisableButton=true
                                v-if="selectedChapter == getIndexData.length && isWebPushModalEnabled"></WebPushModal>
                        </div>
                    </div>
                </div>
            </div>

            <div class="footer-section">
                <div class="container">
                    <div class="row">
                        <div class="review-count col-3" @click="openReviewModal">
                            <i class="material-icons">comment</i>
                            <span>{{ getPratilipiData.reviewCount }}</span>
                        </div>
                        <div class="rating-count col-3" @click="openRatingModal">
                            <i class="material-icons">star_rate</i>
                            <span>{{ getPratilipiData.ratingCount }}</span>
                        </div>
                        <div class="add-to-lib col-3">
                            <span v-if="getUserPratilipiData.addedToLib" @click="triggerAnanlyticsEventAndRemoveFromLibrary">
                                <i class="material-icons">bookmark</i>
                                <i class="material-icons stacked">check</i>
                            </span>
                            <span v-else @click="addPratilipiToLibrary(getPratilipiData.pratilipiId)">
                                <i class="material-icons">bookmark_border</i>
                                <i class="material-icons stacked grey">add</i>
                            </span>
                        </div>
                        <div class="share-btn col-3" @click="openShareModal">
                            <i class="material-icons">share</i>
                        </div>
                    </div>
                </div>
            </div>

            <nav id="sidebar" v-if="getPratilipiLoadingState === 'LOADING_SUCCESS'">
                <div id="dismiss" @click="closeSidebar">
                    <i class="material-icons">close</i>
                </div>
                <div class="book-info">
                    <div class="book-cover"><img :src="getPratilipiData.coverImageUrl" alt=""></div>
                    <div class="book-name">{{ getPratilipiData.title }}</div>
                    <router-link :to="getPratilipiData.author.pageUrl" class="author-link">
                        <span class="auth-name">{{ getPratilipiData.author.displayName }}</span>
                    </router-link>
                    <div class="follow-btn-w-count" v-if="!getAuthorData.following"><!-- Follow Button -->
                        <button @click="checkLoginStatusAndFollowOrUnfollowAuthor" >
                            <i class="material-icons">person_add</i>__("author_follow")
                        </button><span><b>{{ getAuthorData.followCount }}</b></span>
                    </div>
                    <div class="follow-btn-w-count" v-else><!-- Following Button -->
                        <button @click="checkLoginStatusAndFollowOrUnfollowAuthor"><i class="material-icons">check</i> __("author_following")</button><span><b>{{ getAuthorData.followCount }}</b></span>
                    </div>
                </div>
                <div class="book-index">
                    <ul>
                        <li
                            v-for="eachIndex in getIndexData"
                            :key="eachIndex.chapterId"
                            :class="{ isActive: eachIndex.chapterNo === selectedChapter }">
                                <router-link
                                    :to="{ path: '/read', query: { id: String(getPratilipiData.pratilipiId), chapterNo: eachIndex.chapterNo } }"
                                    @click.native="triggerEventAndCloseSidebar(eachIndex.chapterNo)">
                                    {{ eachIndex.title || chapter  + eachIndex.chapterNo }}
                                </router-link>
                        </li>
                    </ul>
                </div>
            </nav>

            <div class="container">
                <div class="row">
                    <div class="review-popout reader-review-popout" v-if="getPratilipiLoadingState === 'LOADING_SUCCESS'">
                        <button type="button" class="close-review" name="button" @click="closeReviewModal"><i class="material-icons">close</i></button>
                        <Reviews
                            :pratilipiId="getPratilipiData.pratilipiId"
                            :authorId="getPratilipiData.author.authorId"
                            :haveInfiniteScroll="true"
                            screenName="READER"
                            screenLocation="RATEREV"
                            :pratilipiData="getPratilipiData"
                            v-if="openRateRev"
                            :userPratilipiData='getUserPratilipiData'>
                        </Reviews>
                    </div>

                    <div class="rating-popout" v-if="getPratilipiLoadingState === 'LOADING_SUCCESS'">
                        <button type="button" class="close-review" name="button" @click="closeRatingModal"><i class="material-icons">close</i></button>
                        <Reviews
                            :pratilipiId="getPratilipiData.pratilipiId"
                            :authorId="getPratilipiData.author.authorId"
                            :haveInfiniteScroll="false"
                            screenName="READER"
                            screenLocation="READERM"
                            :pratilipiData="getPratilipiData"
                            v-if="openRateReaderm"
                            :userPratilipiData='getUserPratilipiData'>
                        </Reviews>
                    </div>
                </div>
            </div>
            <OpenInApp v-if="isAndroid() && getPratilipiLoadingState === 'LOADING_SUCCESS'" :isVisible="shouldShowOpenInAppStrip" :pratilipiData="getPratilipiData"></OpenInApp>
            <div class="overlay" @click="closeSidebar"></div>
            <div class="overlay-1" @click="closeReviewModal"></div>
            <div class="overlay-2" @click="closeRatingModal"></div>
            <div class="reader-progress"><div class="progress-bar"></div></div>
        </div>
    </ReadLayout>
</template>

<script>
import ReadLayout from '@/layout/Reader-layout.vue';
import Spinner from '@/components/Spinner.vue';
import mixins from '@/mixins';
import 'vue-awesome/icons/file-text'
import 'vue-awesome/icons/file-text-o'
import 'vue-awesome/icons/facebook-f'
import 'vue-awesome/icons/twitter'
import 'vue-awesome/icons/google-plus'
import 'vue-awesome/icons/whatsapp'
import 'vue-awesome/icons/link'
import Reviews from '@/components/Reviews.vue';
import WebPushStrip from '@/components/WebPushStrip.vue';
import WebPushModal from '@/components/WebPushModal.vue';
import Recommendation from '@/components/Recommendation.vue';
import OpenInApp from '@/components/OpenInApp.vue';
import ShareStrip from '@/components/ShareStrip.vue';
import NextPratilipiStrip from '@/components/NextPratilipiStrip.vue'
import WebPushUtil from '@/utils/WebPushUtil';
import { mapGetters, mapActions } from 'vuex';
import constants from '@/constants';


export default {
    components: {
        ReadLayout,
        Spinner,
        Reviews,
        WebPushStrip,
        WebPushModal,
        Recommendation,
        ShareStrip,
        OpenInApp,
        NextPratilipiStrip
    },
    mixins: [
        mixins
    ],
    data() {
        return {
            fontSize: 16,
            selectedChapter: 1,
            scrollPosition: null,
            scrollDirection: null,
            percentScrolled: null,
            counter: 0,
            openRateRev: false,
            openRateReaderm: false,
            rateRev: 'RATEREV',
            shouldShowOpenInAppStrip: false,
            webPushModalTriggered: false,
            isWebPushStripEnabled: false,
            isWebPushModalEnabled: false,
            maxRead: 0,
            chapterCount: 0,
            recordTime: null,
            language: '',
            readingMode: 'white',
            isNextPratilipiEnabled: false,
            chapter: '__("writer_chapter") ',
        }
    },
    methods: {
        ...mapActions('readerpage', [
            'fetchPratilipiDetails',
            'fetchPratilipiContentForHTML',
            'clearCachedContents',
            'addToLibrary',
            'removeFromLibrary',
            'fetchPratilipiContentForIMAGE',
            'fetchAuthorDetails',
            'followOrUnfollowAuthor',
            'submitPrailipiReport',
            'postReadingPercentage'
        ]),
        ...mapActions('alert', [
            'triggerAlert'
        ]),
        ...mapActions([
            'setShareDetails',
            'setAfterLoginAction'
        ]),
        recordMaxRead(maxRead) {
            if (!this.getUserDetails.isGuest && !isNaN(maxRead)) {
                if (this.$route.query.chapterNo) {
                    this.chapterCount = Number(this.$route.query.chapterNo);
                }
                else {
                    this.chapterCount = 1;
                }
                let pratilipiId = this.getPratilipiData.pratilipiId;
                let chapterCount = this.chapterCount;
                let indexData = this.getIndexData;
                this.postReadingPercentage({pratilipiId, chapterCount, maxRead, indexData});
            }
        },
        shouldLoadHeaderAndSetPageTheme() {
            if (this.getPratilipiLoadingState === 'LOADING_SUCCESS' && this.getPratilipiData ) {
                    switch (this.readingMode) {
                        case 'black':
                            this.themeBlack();
                            break;
                        case 'yellow':
                            this.themeYellow();
                            break;
                        case 'white':
                            this.themeWhite();
                            break;
                    }
                return true;
            }
        },  
        fireAnalyticsForWhiteTheme() {
            const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
            this.triggerAnanlyticsEvent('READERBACKGROUND_SETTINGS_READER', 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId,
                'ENTITY_VALUE': 'WHITE'
            });
        },
        fireAnalyticsForBlackTheme() {
            const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
            this.triggerAnanlyticsEvent('READERBACKGROUND_SETTINGS_READER', 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId,
                'ENTITY_VALUE': 'NIGHT'
            });
        },
        fireAnalyticsForYellowTheme() {
            const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
            this.triggerAnanlyticsEvent('READERBACKGROUND_SETTINGS_READER', 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId,
                'ENTITY_VALUE': 'SEPIA'
            });
        },
        fireAnalyticsForWhiteTheme() {
            const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
            this.triggerAnanlyticsEvent('READERBACKGROUND_SETTINGS_READER', 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId,
                'ENTITY_VALUE': 'WHITE'
            });
        },
        fireAnalyticsForBlackTheme() {
            const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
            this.triggerAnanlyticsEvent('READERBACKGROUND_SETTINGS_READER', 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId,
                'ENTITY_VALUE': 'NIGHT'
            });
        },
        fireAnalyticsForYellowTheme() {
            const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
            this.triggerAnanlyticsEvent('READERBACKGROUND_SETTINGS_READER', 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId,
                'ENTITY_VALUE': 'SEPIA'
            });
        },
        submitReport() {
            let user = this.getUserDetails;
            let message = $('#reportModalTextarea').val().toString();
            let name = user.displayName;
            let email = user.email;
            let pratilipiId = this.getPratilipiData.pratilipiId;
            let language = this.language;
            let dataType = "PRATILIPI";
            this.submitPrailipiReport({name, email, message, pratilipiId, language, dataType});
            $('#reportModal').modal('hide');
            this.triggerAlert({ message: '__("success_generic_message")', timer: 3000 });
            $("#reportModalTextarea").val("");
        },
        addPratilipiToLibrary(pratilipiId) {
            const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
            this.triggerAnanlyticsEvent(`LIBRARYADD_READERM_READER`, 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId
            });
            if (this.getUserDetails.isGuest) {
                // throw popup modal
                this.setAfterLoginAction({ action: `${this.$route.meta.store}/addToLibrary`, data: pratilipiId });
                this.openLoginModal(this.$route.meta.store, 'LIBRARYADD', 'READERM');
            } else {
                this.addToLibrary(pratilipiId);
            }
        },
        triggerAnanlyticsEventAndRemoveFromLibrary() {
            const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
            this.triggerAnanlyticsEvent(`LIBRARYREMOVE_READERM_READER`, 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId
            });
            this.removeFromLibrary()
        },
        triggerSettingsEvent() {
            const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
            this.triggerAnanlyticsEvent('LANDED_SETTINGS_READER', 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId
            });
        },
        checkLoginStatusAndFollowOrUnfollowAuthor() {
            const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
            let action = !this.getAuthorData.following ? 'FOLLOW' : 'UNFOLLOW';
            this.triggerAnanlyticsEvent(`${action}_INDEX_READER`, 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId,
                'ENTITY_VALUE': this.getAuthorData.followCount
            });
            if (this.getUserDetails.isGuest) {
                // throw popup modal
                this.setAfterLoginAction({ action: `${this.$route.meta.store}/followOrUnfollowAuthor` });
                this.openLoginModal(this.$route.meta.store, 'FOLLOW', 'READERM');
            } else {
                this.followOrUnfollowAuthor();
            }
        },
        goToPreviousChapter() {
            const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
            this.triggerAnanlyticsEvent('CHANGECHAPTER_READERM_READER', 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId,
                'PARENT_ID': this.selectedChapter
            });

            this.$router.push({ path: '/read', query: { id: String(this.getPratilipiData.pratilipiId), chapterNo: this.selectedChapter - 1 } });
        },
        goToNextChapter() {
            const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
            this.triggerAnanlyticsEvent('CHANGECHAPTER_READERM_READER', 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId,
                'PARENT_ID': this.selectedChapter
            });

            this.$router.push({ path: '/read', query: { id: String(this.getPratilipiData.pratilipiId), chapterNo: this.selectedChapter + 1 } });
        },
        increaseFont() {
            if (this.fontSize !== 32) {
                this.fontSize += 2;
            }
            const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
            this.triggerAnanlyticsEvent('READERFONT_SETTINGS_READER', 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId,
                'ENTITY_VALUE': this.fontSize
            });
        },
        decreaseFont() {
            if (this.fontSize !== 12) {
                this.fontSize -= 2;
            }
            const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
            this.triggerAnanlyticsEvent('READERFONT_SETTINGS_READER', 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId,
                'ENTITY_VALUE': this.fontSize
            });
        },
        lineHeightSm() {
            $(".book-content .content-section").removeClass("lh-sm lh-md lh-lg");
            $(".book-content .content-section").addClass("lh-sm");
            const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
            this.triggerAnanlyticsEvent('READERGAP_SETTINGS_READER', 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId,
                'ENTITY_VALUE': 'LESS'
            });
        },
        lineHeightMd() {
            $(".book-content .content-section").removeClass("lh-sm lh-md lh-lg");
            $(".book-content .content-section").addClass("lh-md");
            const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
            this.triggerAnanlyticsEvent('READERGAP_SETTINGS_READER', 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId,
                'ENTITY_VALUE': 'NORMAL'
            });
        },
        lineHeightLg() {
            $(".book-content .content-section").removeClass("lh-sm lh-md lh-lg");
            $(".book-content .content-section").addClass("lh-lg");
            const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
            this.triggerAnanlyticsEvent('READERGAP_SETTINGS_READER', 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId,
                'ENTITY_VALUE': 'HIGH'
            });
        },
        themeWhite() {
            this.readingMode = 'white';
            $(".read-page").removeClass("theme-white theme-black theme-yellow");
            $(".read-page").addClass("theme-white");
            $(".header-section").removeClass("theme-white theme-black theme-yellow");
            $(".header-section").addClass("theme-white");

            $(".footer-section").removeClass("theme-white theme-black theme-yellow");
            $(".footer-section").addClass("theme-white");
            $(".container-fluid").css({"background-color": "white",});
            $(".comment-box").css({"background-color": "#f8f8f8",});
            $(".book-bottom-webpush-subscribe").removeClass("bg-black");
            $(".book-bottom-webpush-subscribe").addClass("bg-grey");
        },
        themeBlack() {
            this.readingMode = 'black';
            $(".read-page").removeClass("theme-white theme-black theme-yellow");
            $(".read-page").addClass("theme-black");

            $(".header-section").removeClass("theme-white theme-black theme-yellow");
            $(".header-section").addClass("theme-black");
            $(".footer-section").removeClass("theme-white theme-black theme-yellow");
            $(".footer-section").addClass("theme-black");
            $(".container-fluid").css({"background-color": "black",});
            $(".comment-box").css({"background-color": "black",});

            $(".book-bottom-webpush-subscribe").removeClass("bg-grey");
            $(".book-bottom-webpush-subscribe").addClass("bg-black");
        },
        themeYellow() {
            this.readingMode = 'yellow';
            $(".read-page").removeClass("theme-white theme-black theme-yellow");
            $(".read-page").addClass("theme-yellow");
            $(".header-section").removeClass("theme-white theme-black theme-yellow");
            $(".header-section").addClass("theme-yellow");
            $(".footer-section").removeClass("theme-white theme-black theme-yellow");
            $(".footer-section").addClass("theme-yellow");
            $(".container-fluid").css({"background-color": "#F4ECD8",});
            $(".comment-box").css({"background-color": "#f8f8f8",});
            $(".book-bottom-webpush-subscribe").removeClass("bg-black");
-           $(".book-bottom-webpush-subscribe").addClass("bg-grey");
        },
        openReviewModal() {
            $(".review-popout").addClass("show");
            $('.overlay-1').fadeIn();
            $('.overlay-2').fadeOut();
            $(".rating-popout").removeClass("show");
            $("body").addClass("modal-open");
            this.openRateRev = true;
        },
        openRatingModal() {
            if (this.getUserDetails.authorId === this.getPratilipiData.author.authorId) {
                return;
            }
            this.openRateReaderm = true;
            $(".rating-popout").addClass("show");
            $('.overlay-2').fadeIn();
            $('.overlay-1').fadeOut();
            $(".review-popout").removeClass("show");
            $("body").addClass("modal-open");
        },
        closeReviewModal() {
            $(".review-popout").removeClass("show");
            $('.overlay-1').fadeOut();
            $("body").removeClass("modal-open");
            this.openRateRev = false;
        },
        closeRatingModal() {
            this.openRateReaderm = false;
            $(".rating-popout").removeClass("show");
            $('.overlay-2').fadeOut();
            $("body").removeClass("modal-open");
        },
        openSidebar() {
            $('#sidebar').addClass('active');
            $('.overlay').fadeIn();
        },
        closeSidebar() {
            $('#sidebar').removeClass('active');
            $('.overlay').fadeOut();
        },
        triggerEventAndCloseSidebar(data) {
            const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
            this.triggerAnanlyticsEvent('CHANGECHAPTER_INDEX_READER', 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId,
                'PARENT_ID': data
            });
            $('#sidebar').removeClass('active');
            $('.overlay').fadeOut();
        },
        openShareModal() {
            const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
            this.triggerAnanlyticsEvent(`CLICKSHRBOOK_READERM_READER`, 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId
            });
            this.setShareDetails({ data: this.getPratilipiData, type: 'PRATILIPI', screen_name: 'READER', screen_location: 'READERM' });
            $('#share_modal').modal('show');
        },
        updateScroll() {
            this.scrollPosition = window.scrollY
            let wintop = $(window).scrollTop(), docheight = $('.book-content').height(), winheight = $(window).height()
            this.percentScrolled = (wintop / (docheight - winheight)) * 100;
        },

        // move this inside next pratilipi component
        hideStripAndRedirect(){
            this.isNextPratilipiEnabled = false;
            const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
            this.triggerAnanlyticsEvent(`CLICK_NEXTPRATILIPI_READER`, 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId});
            this.$router.push({ path: '/read', query: { id: String(this.getPratilipiData.nextPratilipi.pratilipiId)} });
        }
    },
    computed: {
        fontStyleObject() {
            const fontStyleObject = {};
            fontStyleObject['font-' + this.fontSize] = true
            return fontStyleObject
        },
        ...mapGetters('readerpage', [
            'getPratilipiData',
            'getPratilipiLoadingState',
            'getUserPratilipiData',
            'getUserPratilipiLoadingState',
            'getIndexData',
            'getIndexLoadingState',
            'getPratilipiContent',
            'getPratilipiContentLoadingState',
            'getAuthorData',
            'getAuthorDataLoadingState'
        ]),
        ...mapGetters([
            'getUserDetails'
        ])
    },
    created() {
        this.recordTime = new Date();
        this.fetchPratilipiDetails(this.$route.query.id);
        if (this.getPratilipiData && this.getPratilipiData.author) {
            this.fetchAuthorDetails();
        }
        if (this.$route.query.chapterNo) {
            this.selectedChapter = Number(this.$route.query.chapterNo);
        }

        const currentLocale = process.env.LANGUAGE;
        constants.LANGUAGES.forEach((eachLanguage) => {
            if (eachLanguage.shortName === currentLocale) {
                this.language = eachLanguage.fullName.toUpperCase();
            }
        });
    },
    mounted() {
        $('.read-page').bind("contextmenu",function(e){
            e.preventDefault();
        });
        window.addEventListener('scroll', this.updateScroll);
        let that = this;
        setTimeout(function () {
            let docheight = $('.book-content').height();
            let winheight = $(window).height();
            that.maxRead = ((winheight / docheight) * 100);
            that.recordMaxRead(that.maxRead);
        }, 1000);
        setTimeout(function() {
            $("#whiteThemeButton").on('click', function () {
                that.fireAnalyticsForWhiteTheme();
            });
            $("#blackThemeButton").on('click', function () {
                that.fireAnalyticsForBlackTheme();
            });
            $("#yellowThemeButton").on('click', function () {
                that.fireAnalyticsForYellowTheme();
            });
        }, 500)
    },

    watch: {
        '$route' (newValue) {
            let that = this;
            setTimeout(function () {
                let docheight = $('.book-content').height();
                let winheight = $(window).height();
                that.maxRead = ((winheight / docheight) * 100);
                that.recordMaxRead(that.maxRead);
           }, 1000);
        },
        '$route.query.id'(newValue) {
            this.fetchPratilipiDetails(newValue);
        },
        '$route.query.chapterNo'(newValue) {
            if (!newValue) {
                this.selectedChapter = 1;
                return;
            }
            if (this.getPratilipiData.contentType === 'PRATILIPI') {
                this.fetchPratilipiContentForHTML({ pratilipiId: this.getPratilipiData.pratilipiId, chapterNo: Number(newValue) });
                this.selectedChapter = newValue;
            }
            if (this.getPratilipiData.contentType === 'IMAGE') {
                if (this.getPratilipiData.pratilipiId != this.$route.query.id) {
                    this.fetchPratilipiContentForIMAGE({ pratilipiId: this.getPratilipiData.pratilipiId, chapterNo: Number(newValue) });
                }
                this.selectedChapter = newValue;
            }
        },
        'getPratilipiData.pratilipiId'(newId, oldId) {
            this.clearCachedContents();
            if (this.getPratilipiData.contentType === 'PRATILIPI') {
                this.fetchPratilipiContentForHTML({ pratilipiId: newId, chapterNo: this.$route.query.chapterNo ? Number(this.$route.query.chapterNo) : 1 });
            }
            if (this.getPratilipiData.contentType === 'IMAGE') {
                this.fetchPratilipiContentForIMAGE({ pratilipiId: newId, chapterNo: this.$route.query.chapterNo ? Number(this.$route.query.chapterNo) : 1 });
            }
            this.fetchAuthorDetails();
            // default value for webPushModalTriggered is false
            this.webPushModalTriggered = false;
            // setting up values for isWebPushStripEnabled and isWebPushModalEnabled
            this.isWebPushStripEnabled = this.getPratilipiData.state === "PUBLISHED" && WebPushUtil.canShowCustomPrompt() && (parseInt(this.getCookie('bucketId')) || 0) >= 20 && (parseInt(this.getCookie('bucketId')) || 0) < 30;
            this.isWebPushModalEnabled =  this.getPratilipiData.state === "PUBLISHED" && WebPushUtil.canShowCustomPrompt() && (parseInt( this.getCookie('bucketId')) || 0) >= 30 && (parseInt(this.getCookie('bucketId')) || 0) < 60;
        },
        'getUserDetails.userId'() {
            this.fetchPratilipiDetails(this.$route.query.id);
        },
        'scrollPosition'(newScrollPosition, prevScrollPosition){
            if (newScrollPosition > 60 && this.scrollDirection === 'DOWN') {
                $('.header-section').addClass('nav-up');
                $('.reader-progress').addClass('progress-up');
            } else if(newScrollPosition <= 60) {
                $('.header-section').removeClass('nav-up');
                $('.reader-progress').removeClass('progress-up');
            }
            if (newScrollPosition < prevScrollPosition) {
                this.counter++;
                this.scrollDirection = 'UP';
            } else {
                this.scrollDirection = 'DOWN';
            }
            if (this.counter > 5) {
                $('.header-section').removeClass('nav-up');
                $('.reader-progress').removeClass('progress-up');
                this.counter = 0;
            }

            if (this.scrollDirection === 'UP' && !this.shouldShowOpenInAppStrip){
                this.shouldShowOpenInAppStrip = true;
            }

            if (this.scrollDirection === 'DOWN') {
                this.shouldShowOpenInAppStrip = false;
            }
        },
        'percentScrolled'(newPercentScrolled, prevPercentScrolled) {
            if (this.maxRead < newPercentScrolled) {
                this.maxRead = newPercentScrolled;
                if (new Date() - this.recordTime > 1000) {
                    this.recordMaxRead(this.maxRead);
                    this.recordTime = new Date();
                }
            }
            $(".reader-progress .progress-bar").css("width",newPercentScrolled+"%")
            if (this.selectedChapter == this.getIndexData.length && newPercentScrolled > 80 && !this.webPushModalTriggered) {
                this.webPushModalTriggered = true
                this.openWebPushModal()
            }

            if (this.selectedChapter == this.getIndexData.length && !this.isNextPratilipiEnabled) {
                this.isNextPratilipiEnabled = this.getPratilipiData.state === "PUBLISHED" && this.getPratilipiData.nextPratilipi && this.getPratilipiData.nextPratilipi.pratilipiId > 0;
            if (this.isNextPratilipiEnabled) {
                        const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
                        this.triggerAnanlyticsEvent(`VIEWNEXTPRATILIPI_READERM_READER`, 'CONTROL', {
                        ...pratilipiAnalyticsData,
                        'USER_ID': this.getUserDetails.userId
                        });
                    }
                }
            },
        'getPratilipiLoadingState'(status) {
            if (status === 'LOADING_SUCCESS') {
                const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
                this.triggerAnanlyticsEvent('LANDED_READERM_READER', 'CONTROL', {
                    ...pratilipiAnalyticsData,
                    'USER_ID': this.getUserDetails.userId
                });
            }
        }
    },
    destroyed() {
        window.removeEventListener('scroll', this.updateScroll);
    }
}
</script>

<style lang="scss" scoped>
    .next-strip-container {
        margin: 0 auto;
        margin-bottom: 10px;
        display: flex;
        justify-content: center;
        width: 100%;
        cursor: pointer;
        overflow: hidden;
    }
.read-page {
    margin: 0;
    padding: 0;
    position: relative;
    min-height: 100vh;
    .header-section {
        box-shadow: 0 1px 1px rgba(0,0,0,0.2);
        padding: 10px 0;
        position: fixed;
        top: 0;
        z-index: 2;
        width: 100%;
        background: #fff;
        .row {
            display: block;
        }
        .tool-icon-1 {
            width: 40px;
            float: left;
            padding: 0 5px;
            i {
                vertical-align: middle;
            }
        }
        .tool-icon-8 {
            max-width: 700px;
            float: left;
            width: 80%;
            cursor: pointer;
            span, i {
                vertical-align: middle;
            }
            @media screen and (max-width: 768px ) {
                width: 68%;
            }
            @media screen and (max-width: 410px ) {
                width: 59%;
            }
        }
        .right-icons {
            float: right;
            width: 86px;
        }
        .exit-reader {
            margin-right: 5px;
            a {
                color: #2c3e50;
            }
        }
        .book-name {
            text-align: left;
            max-width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap
        }
        .more-options .btn, .settings .btn {
            padding: 0;
            background: transparent;
            &:focus {
                box-shadow: none;
            }
        }
        .more-options {
            .dropdown-menu {
                padding: 0;
                .report-btn {
                    padding: 10px;
                    width: 100%;
                    text-align: left;
                }
            }
        }
        .col-1 i {
            vertical-align: middle;
        }
        &.nav-up {
            @media screen and (max-width: 768px ) {
                top: -75px;
            }
        }
    }
    .reader-progress {
        left:0;
        width: 100%;
        height: 2px;
        margin-bottom: 0px;
        position: fixed;
        top: 47px;
        overflow: hidden;
        background-color: white;
        content: "";
        display: table;
        table-layout: fixed;
        z-index: 1;
        .progress-bar {
            width: 0%;
            float: left;
            height: 100%;
            z-index:9;
            max-width: 100%;
            background-color: #d0021b;
            -webkit-transition: width .3s ease;
            -o-transition: width .3s ease;
            transition: width .3s ease;
        }
        &.progress-up {
            @media screen and (max-width: 768px ) {
                top: 0;
            }
        }
    }
    .book-content {
        margin: 49px 0;
        font-size: 16px;
        padding: 0;
        text-align: justify;
        -moz-user-select: -moz-none;
        -moz-user-select: none;
        -o-user-select: none;
        -khtml-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
        .content-section {
            min-height: 400px;
        }
        .p-lr-15 {
            padding: 0 15px;
        }
        .p-r-10 {
            padding: 0 10px 0 0;
        }
        h2.chapter-title {
            font-size: 24px;
            text-align: center;
            padding-top: 10px;
            @media screen and (max-width: 768px ) {
                font-size: 18px;
            }
        }
        .book-navigation {
            display: block;
            clear: both;
            width: 100%;
            overflow: hidden;
            margin: 10px 0 30px;
            div {
                display: block;
                float: left;
                color: #212121;
                background: #e9e9e9;
                font-size: 14px;
                padding: 5px 10px;
                border-radius: 15px;
                cursor: pointer;
                &.next {
                    float: right;
                }
            }
        }
    }
    .footer-section {
        box-shadow: 0 -1px 1px rgba(0,0,0,0.2);
        padding: 10px 0;
        position: fixed;
        bottom: 0;
        z-index: 12;
        width: 100%;
        background: #fff;
        i {
            vertical-align: middle;
            max-width: 24px;
        }
        span {
            font-size: 14px;
            vertical-align: middle;
        }
        .col-3 {
            cursor: pointer;
            padding: 0 5px;
            -moz-user-select: -moz-none;
            -moz-user-select: none;
            -o-user-select: none;
            -khtml-user-select: none;
            -webkit-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }
        .add-to-lib {
            i {
                font-size: 25px;
                max-width: 25px;
                margin-top: 1px;
            }
            span {
                position: relative;
                max-width: 25px;
                display: block;
                margin: 0 auto;
                .stacked {
                    position: absolute;
                    top: 5px;
                    left: 0;
                    margin-left: 7px;
                    font-size: 11px;
                    color: #fff;
                    font-weight: bold;
                    &.grey {
                        color: #212121;
                    }
                }
            }
        }
    }
    #sidebar {
        width: 300px;
        position: fixed;
        top: 0;
        left: -310px;
        height: 100vh;
        z-index: 999;
        background: #fff;
        color: #fff;
        transition: all 0.3s;
        overflow-y: scroll;
        box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.2);
        &.active {
            left: 0;
        }
        #dismiss {
            width: 35px;
            height: 35px;
            line-height: 35px;
            text-align: center;
            position: absolute;
            top: 10px;
            right: 10px;
            cursor: pointer;
            color: #2c3e50;
            z-index: 2;
            -webkit-transition: all 0.3s;
            -o-transition: all 0.3s;
            transition: all 0.3s;
            &:hover {
                opacity: 0.9;
            }
        }
        .book-info {
            position: relative;
            text-align: center;
            color: #2c3e50;
            font-size: 14px;
            border-bottom: 1px solid #e9e9e9;
            padding-bottom: 10px;
            margin-bottom: 10px;
            .book-cover {
                width: 150px;
                height: 150px;
                margin: 10px auto;
                img {
                    max-width: 100%;
                    max-height: 100%;
                }
            }
            .book-name {
                font-size: 18px;
                font-weight: bold;
                margin: 0;
            }
            .author-link {
                color: #d0021b;
                margin-bottom: 10px;
                .auth-name {
                    text-align: left;
                    display: inline-block;
                    margin: 0 10px;
                    font-size: 14px;
                    vertical-align: middle;
                }
                &:hover {
                    text-decoration: none;
                }
            }
        }
        .book-index {
            text-align: left;
            font-size: 14px;
            ul {
                padding: 0 0 0 20px;
                li {
                    padding: 5px;
                    a {
                        color: #212121;
                    }
                    &.isActive a {
                        font-weight: bold;
                    }
                }
            }
        }
        .follow-btn-w-count {
            color: #fff;
            margin: 10px;
            font-size: 14px;
            position: relative;
            text-align: center;
            display: block;
            clear: both;
            overflow: hidden;
            cursor: pointer;
            button {
                background: #d0021b;
                border: 1px solid #d0021b;
                border: 1px solid #d0021b;
                border-top-left-radius: 3px;
                border-bottom-left-radius: 3px;
                outline: none;
                color: #fff;
                margin: 0;
                padding: 5px 10px;
                display: inline-block;
                clear: both;
                cursor: pointer;
            }
            i {
                vertical-align: middle;
                padding-right: 5px;
                font-size: 18px;
            }
            span {
                background: #fff;
                color: #d0021b;
                display: inline-block;
                border: 1px solid #d0021b;
                padding: 5px 10px;
                border-top-right-radius: 3px;
                border-bottom-right-radius: 3px;
                b {
                    font-size: 12px;
                }
            }
        }
    }
    .overlay, .overlay-1, .overlay-2 {
        position: fixed;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.7);
        z-index: 998;
        display: none;
        top: 0;
        left: 0;
    }
    .overlay-1, .overlay-2 {
        z-index: 9;
    }
    #readerOptions {
        max-width: 350px;
        margin: 50px auto;
    }
    .options {
        margin: 20px 0 0;
        .option {
            text-align: left;
            font-size: 14px;
            border-bottom: 1px solid #fff;
            padding-bottom: 10px;
            margin-bottom: 5px;
            .buttons {
                display: inline-block;
                vertical-align: middle;
                margin: 0 15px 0 0;
                button {
                    border: 0;
                    background: #fff;
                    cursor: pointer;
                    i {
                        font-size: 20px;
                        vertical-align: middle;
                    }
                    &:focus {
                        outline: none;
                    }
                    .fa-icon {
                        vertical-align: middle;
                    }
                    &.yellow .fa-icon {
                        background: #F4ECD8;
                    }
                }
            }
            .lh-icon {
                height: 24px;
                width: 24px;
                display: block;
                margin: auto;
                background-color: transparent;
                background-repeat: no-repeat;
                cursor: pointer;
                &.active {
                    opacity: 0.5;
                }
            }
            .lh-sm-icon {
                background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTEwLjMgMy4zaDEydjJoLTEyek0xMC4zIDE5LjNoMTJ2MmgtMTJ6TTEwLjMgMTEuM2gxMnYyaC0xMnpNMTAuMyAxNS4zaDEydjJoLTEyek0xMC4zIDcuM2gxMnYyaC0xMnpNNC4zIDguM0gxLjhsMy41IDMuNSAzLjUtMy41SDYuM3YtNWgtMk0xLjggMTYuNGwzLjUtMy41IDMuNSAzLjVINi4zdjVoLTJ2LTUiLz48L3N2Zz4=);
            }
            .lh-md-icon {
                background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTMuNCAzLjRoMTcuM3YySDMuNHpNMy40IDE5LjRoMTcuM3YySDMuNHpNMy40IDE0aDE3LjN2MkgzLjR6TTMuNCA4LjdoMTcuM3YySDMuNHoiLz48L3N2Zz4=);
            }
            .lh-lg-icon {
                background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTkuOSAzLjNoMTJ2MmgtMTJ6TTkuOSAxOS4zaDEydjJoLTEyek05LjkgMTEuM2gxMnYyaC0xMnpNMy45IDYuOEgxLjRsMy41LTMuNSAzLjUgMy41SDUuOXY1aC0yTTEuNCAxNy45bDMuNSAzLjUgMy41LTMuNUg1Ljl2LTVoLTJ2NSIvPjwvc3ZnPg==);
            }
        }
    }
    .book-content {
        .font-12 {
            font-size: 12px;
        }
        .font-14 {
            font-size: 14px;
        }
        .font-16 {
            font-size: 16px;
        }
        .font-18 {
            font-size: 18px;
        }
        .font-20 {
            font-size: 20px;
        }
        .font-22 {
            font-size: 22px;
        }
        .font-24 {
            font-size: 24px;
        }
        .font-26 {
            font-size: 26px;
        }
        .font-28 {
            font-size: 28px;
        }
        .font-30 {
            font-size: 30px;
        }
        .font-32 {
            font-size: 32px;
        }
        .lh-sm {
            line-height: 1.4em;
        }
        .lh-md {
            line-height: 1.7em;
        }
        .lh-lg {
            line-height: 2em;
        }
    }
    #reportModal {
        text-align: left;
        max-width: 350px;
        margin: 50px auto;
        .form-group {
            font-size: 14px;
        }
        .btn-submit {
            background: #d0021b;
            border: 0;
            font-size: 14px;
            float: right;
        }
        .cancel {
            background: none;
            border: 0;
            float: right;
            font-size: 12px;
            line-height: 33px;
        }
    }
    .review-popout, .rating-popout {
        height: 60vh;
        width: 96%;
        max-width: 700px;
        position: fixed;
        margin-bottom: 46px;
        margin-left: 0;
        bottom: -700vh;
        left: 50%;
        transform: translateX(-50%);
        overflow: hidden;
        overflow-y: auto;
        text-align: left;
        background: #fff;
        box-shadow: 0 -1px 2px rgba(0,0,0,0.5);
        transition: all 0.5s;
        z-index: 10;
        .close-review {
            position: absolute;
            top: 5px;
            right: 5px;
            z-index: 9;
            background: #fff;
            border: 0;
        }
        &.show {
            bottom: 0;
        }
    }
    .rating-popout {
        height: auto;
        z-index: 11;
        min-height: 150px;
    }
}
.theme-white {
    background: #fff !important;
    color: #2c3e50 !important;
}
.theme-black {
    background: #000 !important;
    color: #fff !important;
    i {
        color: #fff !important;
    }
    .modal {
        color: #2c3e50 !important;
        i {
            color: #2c3e50 !important;
        }
    }
    .reader-progress {
        background: #000;
    }
}
.theme-yellow {
    background: #F4ECD8 !important;
    color: #2c3e50 !important;
    .reader-progress {
        background: #F4ECD8;
    }
}
</style>
<style lang="scss">
.rating-popout {
    .all-reviews, .show-more, .write-review-btn {
        display: none !important;
    }
    .comments-list li {
        display: none !important;
        &:first-child {
            display: block !important;
        }
        .comment-box .rate-now .rating {
            width: 200px;
            label:before {
                font-size: 35px;
            }
        }
    }
}
.book-content {
    img {
        width: 100%;
        max-width: 100%;
        height: auto !important;
    }
    .book-bottom-ratings {
        margin: 10px 0;
        .write-review-btn, .all-reviews, .comments-list li, .show-more {
            display: none !important;
        }
        .comments-list {
            padding-left: 0;
        }
        .comments-list li.ownReview  {
            display: block !important;
        }
    }
    .book-bottom-webpush-subscribe {
        position: relative;
        margin: 10px 0;
        padding: 0 15px;
         .webpush-container {
            max-width: 700px;
            margin: auto;
            .webpush-inner-container {
                margin: 0 5px;
                background: #f8f8f8;
            }
        }
    }
    .book-bottom-webpush-subscribe.bg-grey {
        .webpush-container .webpush-inner-container {
            background: #f8f8f8;
        }
    }
   .book-bottom-webpush-subscribe.bg-black {
       .webpush-container .webpush-inner-container {
           background: black;
        }
    }
}
</style>
