<template>
    <ReadLayout>

        <!-- Reader Data loading -->
        <Spinner v-if="getPratilipiLoadingState === 'LOADING'"></Spinner>

        <!-- Reader Data Loaded error -->
        <ServerError class="read-page-server-error" :action="'readerv2page/fetchReaderData'" :data="currentChapterSlugId" v-if="getPratilipiLoadingState === 'LOADING_ERROR'"></ServerError>

        <!-- Reader Data Loaded success -->
        <div 
            class="read-page" 
            :class="getReaderReadingModeStyle"
            v-if="getPratilipiLoadingState === 'LOADING_SUCCESS'">

            <!-- Reader Header -->
            <div class="header-section" :class="getReaderReadingModeStyle">
                <div class="container">
                    <div class="row">
                        <div class="exit-reader tool-icon-1">
                            <router-link :to="getPratilipiData.pageUrl">
                                <i class="material-icons">arrow_back</i>
                            </router-link>
                        </div>
                        <div class="book-name tool-icon-8" @click="openSidebar">
                            <span>{{ getPratilipiData.title }}</span>
                            <i class="material-icons">arrow_drop_down</i>
                        </div>
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
                                    <button type="button" class="btn report-btn" data-toggle="modal" data-target="#readerReportModal">
                                        __("report_button")
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Reader Header Nav bar -->
            <nav id="sidebar">
                <div id="dismiss" @click="closeSidebar">
                    <i class="material-icons">close</i>
                </div>
                <div class="book-info">
                    <div class="book-cover"><img :src="getPratilipiData.coverImageUrl" alt="getPratilipiData.displayTitle"></div>
                    <div class="book-name">{{ getPratilipiData.title }}</div>
                    <router-link :to="getAuthorData.pageUrl" class="author-link">
                        <span class="auth-name">{{ getAuthorData.displayName }}</span>
                    </router-link>
                    <div class="follow-btn-w-count" v-if="!getAuthorData.following">
                        <button @click="followPratilipiAuthor" >
                            <i class="material-icons">person_add</i>__("author_follow")
                        </button><span><b>{{ getAuthorData.followCount }}</b></span>
                    </div>
                    <div class="follow-btn-w-count" v-else>
                        <button @click="unfollowPratilipiAuthor"><i class="material-icons">check</i> __("author_following")</button><span><b>{{ getAuthorData.followCount }}</b></span>
                    </div>
                </div>
                <div class="book-index">
                    <ul>
                        <li
                            v-for="eachIndex in getIndexData"
                            :key="eachIndex.chapterId"
                            :class="{ isActive: eachIndex.slugId === currentChapterSlugId }">
                                <router-link
                                    :to="{path: eachIndex.pageUrl}"
                                    @click.native="triggerEventAndCloseSidebar(eachIndex.chapterNo)">
                                    {{ eachIndex.title || '__("writer_chapter") '  + eachIndex.chapterNo }}
                                </router-link>
                        </li>
                    </ul>
                </div>
            </nav>

            <!-- Reader Options Modal -->
            <div class="modal fade" id="readerOptions" tabindex="-1" role="dialog" aria-labelledby="readerOptionsLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-body">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <i class="material-icons">close</i>
                            </button>
                            <div class="options">
                                <div class="option" v-if="getPratilipiData.contentType === 'PRATILIPI'">
                                    <span>__("reader_font_size"):</span>
                                    <div class="buttons">
                                        <button type="button" name="button" @click="increaseFont" :disabled="fontSize >= maxFontSize"><i class="material-icons">add</i></button>
                                        <button type="button" name="button" @click="decreaseFont" :disabled="fontSize <= minFontSize"><i class="material-icons">remove</i></button>
                                    </div>
                                </div>
                                <div class="option">
                                    <span>__("reader_background"):</span>
                                    <div class="buttons">
                                        <button type="button" id="whiteThemeButton" name="button" @click="themeWhite" :disabled="readingMode === 'WHITE'"><icon name="file-text-o" scale="1.5"></icon></button>
                                        <button type="button" id="blackThemeButton" name="button" @click="themeNight" :disabled="readingMode === 'NIGHT'"><icon name="file-text" scale="1.5"></icon></button>
                                        <button type="button" id="yellowThemeButton" name="button" @click="themeSepia" :disabled="readingMode === 'SEPIA'" class="yellow"><icon name="file-text-o" scale="1.5"></icon></button>
                                    </div>
                                </div>
                                <div class="option" v-if="getPratilipiData.contentType === 'PRATILIPI'">
                                    <span>__("reader_line_spacing"):</span>
                                    <div class="buttons">
                                        <button type="button" name="button" @click="lineHeightSm" :disabled="lineHeight === 'SMALL'"><span class="lh-icon lh-sm-icon"></span></button>
                                        <button type="button" name="button" @click="lineHeightMd" :disabled="lineHeight === 'MEDIUM'"><span class="lh-icon lh-md-icon"></span></button>
                                        <button type="button" name="button" @click="lineHeightLg" :disabled="lineHeight === 'LARGE'"><span class="lh-icon lh-lg-icon"></span></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Report Modal -->
            <div class="modal fade" id="readerReportModal" tabindex="-1" role="dialog" aria-hidden="true">
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
                                    <label for="readerReportModalName">__("name")</label>
                                    <input id="readerReportModalName" class="form-control" :value="reportName" @input="reportName = $event.target.value" placeholder="__('name')" />
                                    <label for="readerReportModalEmail">__("email")</label>
                                    <input id="readerReportModalEmail" class="form-control" :value="reportEmail" @input="reportEmail = $event.target.value" placeholder="__('email')" />
                                    <label for="readerReportModalContentText">__("report_issue")</label>
                                    <TranslatingInputTextArea id="readerReportModalContentText" :value="reportContentText" :oninput="updateReportContentText"  placeholder="__('report_issue')" class="modal-textarea"></TranslatingInputTextArea>
                                </div>
                                <button type="button" class="btn btn-primary btn-submit" @click="submitReport">__("submit")</button>
                                <button type="button" class="cancel" data-dismiss="modal" aria-label="Close" @click="resetReportValues">__("cancel")</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Content -->
            <div class="book-content">
                <div class="container">
                    <div class="row">
                        <Spinner v-if="!getPratilipiContent[currentChapterSlugId]"></Spinner>
                        <div class="col-12 p-0" v-else>
                            <h1
                                class="chapter-title p-lr-15"
                                v-if="getPratilipiContent[currentChapterSlugId].title">
                                    {{ getPratilipiContent[currentChapterSlugId].title }}
                            </h1>
                            <h1
                                class="chapter-title p-lr-15"
                                v-else-if="getIndexData.length > 1">
                                    {{ '__("writer_chapter") ' + getIndexData.filter(index => index.slugId === currentChapterSlugId)[0].chapterNo }}
                            </h1>
                            <h1
                                class="chapter-title p-lr-15"
                                v-else>
                                    {{ getPratilipiData.displayTitle }}
                            </h1>
                            <!--
                                TODO: Better Implementation
                                Hack to update renderedChapterIdSlug = currentChapterSlugId when rendered
                                v-if="renderedChapterIdSlug = currentChapterSlugId"
                            -->
                            <div class="content-section p-lr-15"
                                :class="getContentSectionStyle"
                                v-if="renderedChapterIdSlug = currentChapterSlugId" 
                                v-html="getPratilipiContent[currentChapterSlugId].content">
                            </div>
                            <div class="book-navigation p-lr-15" v-if="getPratilipiContentLoadingState === 'LOADING_SUCCESS'">
                                <div class="prev" v-if="getIndexData[0].slugId !== currentChapterSlugId" @click="goToPreviousChapter">__("reader_prev_chapter")</div>
                                <div class="next" v-if="getIndexData[getIndexData.length -1].slugId !== currentChapterSlugId" @click="goToNextChapter">__("reader_next_chapter")</div>
                            </div>
                            <div @click="hideStripAndRedirect" class="next-strip-container">
                                <NextPratilipiStrip
                                    :pratilipi='getPratilipiData.nextPratilipi'
                                    v-if="isNextPratilipiEnabled"
                                ></NextPratilipiStrip>
                            </div>
                            <ShareStrip
                                v-if="getIndexData[getIndexData.length -1].slugId === currentChapterSlugId"
                                :data="getPratilipiData"
                                :type="'PRATILIPI'">
                            </ShareStrip>
                            <div class="book-bottom-ratings p-lr-15">
                                <Reviews
                                    :pratilipiId="getPratilipiData.pratilipiId"
                                    :authorId="getAuthorData.authorId"
                                    :userPratilipiData='getUserPratilipiData'
                                    :haveInfiniteScroll="true"
                                    screenName="READER"
                                    screenLocation="BOOKEND"
                                    :pratilipiData="Object.assign({}, getPratilipiData, {author: getAuthorData})"
                                    v-if="getIndexData[getIndexData.length -1].slugId === currentChapterSlugId && !openRateReaderm && !openRateRev && getUserPratilipiLoadingState === 'LOADING_SUCCESS'">
                                </Reviews>
                            </div>
                            <div class="book-bottom-webpush-subscribe">
                                   <div class="webpush-container">
                                    <div class="webpush-inner-container">
                                       <WebPushStrip
                                            screenName="READER"
                                            title="__('web_push_title')"
                                            message="__('web_push_message_3')"
                                            v-if="getIndexData[getIndexData.length -1].slugId === currentChapterSlugId && isWebPushStripEnabled">
                                        </WebPushStrip>
                                    </div>
                                </div>
                            </div>
                            <div class="book-recomendations p-r-10" v-if="getIndexData[getIndexData.length -1].slugId === currentChapterSlugId">
                                <Recommendation
                                    :contextId="getPratilipiData.pratilipiId"
                                    :context="'summaryPage'"
                                    :themeColor="readingMode"
                                    screenName="READER"
                                    screenLocation="RECOMMENDBOOK"
                                    v-if="getPratilipiLoadingState === 'LOADING_SUCCESS'">
                                </Recommendation>
                            </div>
                            <div class="go-to-home-screen">
                                <button class="btn btn-sm btn-danger" v-if="isMobile() && getIndexData[getIndexData.length -1].slugId === currentChapterSlugId" @click="navigateToHome">
                                    __("reader_goto_home_page")
                                </button>
                            </div>
                            <WebPushModal
                                title="__('web_push_title')"
                                message="__('web_push_message_2')"
                                screenName="READER"
                                :includeDisableButton=true
                                v-if="getIndexData[getIndexData.length -1].slugId === currentChapterSlugId && isWebPushModalEnabled"></WebPushModal>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div class="footer-section" :class="getReaderReadingModeStyle">
                <div class="container">
                    <div class="row">
                        <div class="review-count" @click="openReviewModal">
                            <i class="material-icons">comment</i>
                            <span>{{ getPratilipiData.reviewCount }}</span>
                        </div>
                        <div class="rating-count" @click="openRatingModal">
                            <i class="material-icons">star_rate</i>
                            <span>{{ getPratilipiData.ratingCount }}</span>
                        </div>
                        <div class="add-to-lib">
                            <span v-if="getUserPratilipiData.addedToLib" @click="removePratilipiFromLibrary">
                                <i class="material-icons">bookmark</i>
                                <i class="material-icons stacked">check</i>
                            </span>
                            <span v-else @click="addPratilipiToLibrary">
                                <i class="material-icons">bookmark_border</i>
                                <i class="material-icons stacked grey">add</i>
                            </span>
                        </div>
                        <div class="whatsapp-share-btn" v-if="isMobile()">
                            <a :href="getWhatsAppUri" @click="triggerWaEndShareEvent" class="whatsapp" target="_blank" rel="noopener" aria-label="google">
                                <span class="social-icon"><icon name="whatsapp"></icon></span>
                            </a>
                        </div>
                        <div class="share-btn" @click="openShareModal">
                            <i class="material-icons">share</i>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Review Popup -->
            <div class="container">
                <div class="row">
                    <div class="review-popout reader-review-popout" v-if="getPratilipiLoadingState === 'LOADING_SUCCESS' && getUserPratilipiLoadingState === 'LOADING_SUCCESS'">
                        <button type="button" class="close-review" name="button" @click="closeReviewModal"><i class="material-icons">close</i></button>
                        <Reviews
                            :pratilipiId="getPratilipiData.pratilipiId"
                            :authorId="getAuthorData.authorId"
                            :haveInfiniteScroll="true"
                            screenName="READER"
                            screenLocation="RATEREV"
                            :pratilipiData="Object.assign({}, getPratilipiData, {author: getAuthorData})"
                            v-if="openRateRev"
                            :userPratilipiData='getUserPratilipiData'>
                        </Reviews>
                    </div>
                    <div class="rating-popout" v-if="getPratilipiLoadingState === 'LOADING_SUCCESS' && getUserPratilipiLoadingState === 'LOADING_SUCCESS'">
                        <button type="button" class="close-review" name="button" @click="closeRatingModal"><i class="material-icons">close</i></button>
                        <Reviews
                            :pratilipiId="getPratilipiData.pratilipiId"
                            :authorId="getAuthorData.authorId"
                            :haveInfiniteScroll="false"
                            screenName="READER"
                            screenLocation="READERM"
                            :pratilipiData="Object.assign({}, getPratilipiData, {author: getAuthorData})"
                            v-if="openRateReaderm"
                            :userPratilipiData='getUserPratilipiData'>
                        </Reviews>
                    </div>
                </div>
            </div>

            <OpenInApp v-if="isAndroid() && readerPercentScrolled < 102 && getPratilipiLoadingState === 'LOADING_SUCCESS'" :isVisible="shouldShowOpenInAppStrip" :pratilipiData="getPratilipiData"></OpenInApp>
            <div class="overlay" @click="closeSidebar"></div>
            <div class="overlay-1" @click="closeReviewModal"></div>
            <div class="overlay-2" @click="closeRatingModal"></div>
            <div class="reader-progress"><div class="progress-bar"></div></div>

        </div>
    </ReadLayout>
</template>

<script>
import ReadLayout from '@/layout/Reader-layout.vue';
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
import ServerError from '@/components/ServerError.vue';
import Spinner from '@/components/Spinner.vue';
import TranslatingInputTextArea from '@/components/TranslatingInputTextArea.vue';
import WebPushUtil from '@/utils/WebPushUtil';
import { mapGetters, mapActions } from 'vuex';
import constants from '@/constants';
import LoadingState from '@/enum/LoadingState'

const READER_FONT_SIZE_COOKIE_NAME = 'reader_font_size'
const READER_LINE_HEIGHT_COOKIE_NAME = 'reader_line_height'
const READER_READING_MODE_COOKIE_NAME = 'reader_reading_mode'

const ReaderLineHeight = {
    SMALL: 'SMALL',
    MEDIUM: 'MEDIUM',
    LARGE: 'LARGE'
}

const ReaderReadingMode = {
    WHITE: 'WHITE',
    NIGHT: 'NIGHT',
    SEPIA: 'SEPIA'
}

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
        NextPratilipiStrip,
        ServerError,
        TranslatingInputTextArea
    },
    mixins: [
        mixins
    ],
    data() {
        return {
            /* reader */
            fontSize: Number(this.getCookie(READER_FONT_SIZE_COOKIE_NAME) || 16),
            minFontSize: 12,
            maxFontSize: 32,
            lineHeight: this.getCookie(READER_LINE_HEIGHT_COOKIE_NAME) || ReaderLineHeight.MEDIUM,
            readingMode: this.getCookie(READER_READING_MODE_COOKIE_NAME) || ReaderReadingMode.WHITE,
            language: constants.LANGUAGES.filter((eachLanguage) => eachLanguage.shortName === process.env.LANGUAGE)[0].fullName.toUpperCase(),

            /* content */
            currentChapterSlugId: null,
            renderedChapterIdSlug: null,

            /* report content text */
            reportName: '',
            reportEmail: '',
            reportContentText: '',

            /* modal flags */
            openRateRev: false,
            openRateReaderm: false,

            /* web push */
            webPushModalTriggered: false,
            isWebPushStripEnabled: false,
            isWebPushModalEnabled: false,

            /* user pratilipi calc */
            maxReadPercentage: 0,
            maxReadPercentageLastUpdated: Date.now(),
            maxReadPercentageCompleted: false,

            /* scroll */
            scrollPosition: 0,
            readerPercentScrolled: 0,

            scrollCounter: 0,
            scrollDirection: null,            

            /* open in app strip */
            shouldShowOpenInAppStrip: false,

            /* content serialisation */
            isNextPratilipiEnabled: false,

            /* metaDescription */
            metaDescription: ''
        }
    },
    methods: {
        ...mapActions('readerv2page', [
            'fetchReaderData',
            'fetchContentData',
            'addToLibrary',
            'removeFromLibrary',
            'followAuthor',
            'unFollowAuthor',
            'postReadingPercentage',
            'submitPrailipiReport'
        ]),
        ...mapActions('alert', [
            'triggerAlert'
        ]),
        ...mapActions([
            'setShareDetails',
            'setAfterLoginAction'
        ]),

        /* analytics */
        _triggerReaderAnalyticsEvent(eventName, entityValue, parentId) {
            let pratilipiData = this.getPratilipiData
            pratilipiData['author'] = this.getAuthorData
            let options = {
                ...this.getPratilipiAnalyticsData(pratilipiData),
                'USER_ID': this.getUserDetails.userId
            }
            if (entityValue) {
                options['ENTITY_VALUE'] = entityValue
            }
            if (parentId) {
                options['PARENT_ID'] = parentId
            }
            this.triggerAnanlyticsEvent(eventName, 'CONTROL', options)
        },

        /* reader */
        increaseFont() {
            if (this.fontSize + 2 <= this.maxFontSize) {
                this.fontSize += 2
                this.setCookie(READER_FONT_SIZE_COOKIE_NAME, this.fontSize, 7, '/read')
            }
            this._triggerReaderAnalyticsEvent('READERFONT_SETTINGS_READER', this.fontSize)
        },
        decreaseFont() {
            if (this.fontSize -2 >= this.minFontSize) {
                this.fontSize -= 2
                this.setCookie(READER_FONT_SIZE_COOKIE_NAME, this.fontSize, 7, '/read')
            }
            this._triggerReaderAnalyticsEvent('READERFONT_SETTINGS_READER', this.fontSize)
        },
        lineHeightSm() {
            this.lineHeight = ReaderLineHeight.SMALL
            this.setCookie(READER_LINE_HEIGHT_COOKIE_NAME, this.lineHeight, 7, '/read')
            this._triggerReaderAnalyticsEvent('READERGAP_SETTINGS_READER', 'LESS')
        },
        lineHeightMd() {
            this.lineHeight = ReaderLineHeight.MEDIUM
            this.setCookie(READER_LINE_HEIGHT_COOKIE_NAME, this.lineHeight, 7, '/read')
            this._triggerReaderAnalyticsEvent('READERGAP_SETTINGS_READER', 'NORMAL')
        },
        lineHeightLg() {
            this.lineHeight = ReaderLineHeight.LARGE
            this.setCookie(READER_LINE_HEIGHT_COOKIE_NAME, this.lineHeight, 7, '/read')
            this._triggerReaderAnalyticsEvent('READERGAP_SETTINGS_READER', 'HIGH')
        },
        themeWhite() {
            this.readingMode = ReaderReadingMode.WHITE
            this.setCookie(READER_READING_MODE_COOKIE_NAME, this.readingMode, 7, '/read')
            this._triggerReaderAnalyticsEvent('READERBACKGROUND_SETTINGS_READER', 'WHITE')
        },
        themeNight() {
            this.readingMode = ReaderReadingMode.NIGHT
            this.setCookie(READER_READING_MODE_COOKIE_NAME, this.readingMode, 7, '/read')
            this._triggerReaderAnalyticsEvent('READERBACKGROUND_SETTINGS_READER', 'NIGHT')
        },
        themeSepia() {
            this.readingMode = ReaderReadingMode.SEPIA
            this.setCookie(READER_READING_MODE_COOKIE_NAME, this.readingMode, 7, '/read')
            this._triggerReaderAnalyticsEvent('READERBACKGROUND_SETTINGS_READER', 'SEPIA')
        },

        /* content */
        goToPreviousChapter() {
            const currentChapterIndex = this.getIndexData.map(indexData => indexData.slugId).indexOf(this.currentChapterSlugId)
            if (currentChapterIndex > 0) {
                // indexData.chapterNo is 1-indexed, currentChapterIndex is 0-indexed
                const path = this.getIndexData.filter(indexData => indexData.chapterNo - 1 === currentChapterIndex - 1)[0].pageUrl
                this.$router.push({path})
            }
            this._triggerReaderAnalyticsEvent('CHANGECHAPTER_READERM_READER', null, currentChapterIndex)
        },
        goToNextChapter() {
            const currentChapterIndex = this.getIndexData.map(indexData => indexData.slugId).indexOf(this.currentChapterSlugId)
            if (currentChapterIndex < this.getIndexData.length) {
                // indexData.chapterNo is 1-indexed, currentChapterIndex is 0-indexed
                const path = this.getIndexData.filter(indexData => indexData.chapterNo - 1 === currentChapterIndex + 1)[0].pageUrl
                this.$router.push({path})
            }
            this._triggerReaderAnalyticsEvent('CHANGECHAPTER_READERM_READER', null, currentChapterIndex)
        },
        navigateToHome() {
            this._triggerReaderAnalyticsEvent('GOTOHOME_RECOMMENDBOOK_READER')
            this.$router.push('/')
        },

        /* library */
        addPratilipiToLibrary() {
            this._triggerReaderAnalyticsEvent('LIBRARYADD_READERM_READER')
            if (this.getUserDetails.isGuest) {
                this.setAfterLoginAction({action: `${this.$route.meta.store}/addToLibrary`})
                this.openLoginModal(this.$route.meta.store, 'LIBRARYADD', 'READERM')
            } else {
                this.addToLibrary()
            }
        },
        removePratilipiFromLibrary() {
            this._triggerReaderAnalyticsEvent('LIBRARYREMOVE_READERM_READER')
            this.removeFromLibrary()
        },

        /* follow */
        followPratilipiAuthor() {
            this._triggerReaderAnalyticsEvent('FOLLOW_INDEX_READER', this.getAuthorData.followCount)
            if (this.getUserDetails.isGuest) {
                this.setAfterLoginAction({action: `${this.$route.meta.store}/followAuthor`})
                this.openLoginModal(this.$route.meta.store, 'FOLLOW', 'READERM')
            } else {
                this.followAuthor()
            }
        },
        unfollowPratilipiAuthor() {
            this._triggerReaderAnalyticsEvent('UNFOLLOW_INDEX_READER', this.getAuthorData.followCount)
            this.unFollowAuthor()
        },

        /* rating */
        openRatingModal() {
            if (this.getUserDetails.authorId !== this.getAuthorData.authorId) {
                this.openRateReaderm = true
                $(".rating-popout").addClass("show")
                $('.overlay-2').fadeIn()
                $('.overlay-1').fadeOut()
                $(".review-popout").removeClass("show")
                $("body").addClass("modal-open")
            }
        },
        closeRatingModal() {
            this.openRateReaderm = false
            $(".rating-popout").removeClass("show")
            $('.overlay-2').fadeOut()
            $("body").removeClass("modal-open")
        },

        /* review */
        openReviewModal() {
            if (this.getUserDetails.authorId !== this.getAuthorData.authorId) {
                $(".review-popout").addClass("show")
                $('.overlay-1').fadeIn()
                $('.overlay-2').fadeOut()
                $(".rating-popout").removeClass("show")
                $("body").addClass("modal-open")
                this.openRateRev = true
            }
        },
        closeReviewModal() {
            this.openRateRev = false
            $(".review-popout").removeClass("show")
            $('.overlay-1').fadeOut()
            $("body").removeClass("modal-open")
        },

        /* sidebar */
        openSidebar() {
            $('#sidebar').addClass('active')
            $('.overlay').fadeIn()
        },
        closeSidebar() {
            $('#sidebar').removeClass('active')
            $('.overlay').fadeOut()
        },
        triggerEventAndCloseSidebar(chapterNo) {
            this._triggerReaderAnalyticsEvent('CHANGECHAPTER_INDEX_READER', null, chapterNo)
            $('#sidebar').removeClass('active')
            $('.overlay').fadeOut()
        },

        /* report */
        updateReportContentText(value) {
            this.reportContentText = value
        },
        resetReportValues() {
            this.reportName = this.getUserDetails.displayName || ''
            this.reportEmail = this.getUserDetails.email || ''
            this.reportContentText = ''
        },

        submitReport() {
            const 
                name = this.reportName.trim(),
                email = this.reportEmail.trim(),
                message = this.reportContentText.trim(),
                pratilipiId = this.getPratilipiData.pratilipiId,
                language = this.language,
                dataType = 'PRATILIPI'

            if (name === '') {
                this.triggerAlert({message: '__("user_name_empty")', timer: 1000})
                return
            }

            if (email === '') {
                this.triggerAlert({message: '__("user_email_empty")', timer: 1000})
                return
            }

            if (!this.validateEmail(email)) {
                this.triggerAlert({message: '__("user_email_invalid")', timer: 1000})
                return
            }

            if (message === '') {
                this.triggerAlert({message: '__("report_title")', timer: 1000})
                return
            }

            // ux actions
            this.submitPrailipiReport({name, email, message, pratilipiId, language, dataType})
            this.triggerAlert({message: '__("success_generic_message")', timer: 3000})
            $('#readerReportModal').modal('hide')

            // resetting values
            this.resetReportValues()
        },

        /* settings */
        triggerSettingsEvent() {
            this._triggerReaderAnalyticsEvent('LANDED_SETTINGS_READER')
        },

        /* share */
        openShareModal() {
            this._triggerReaderAnalyticsEvent('CLICKSHRBOOK_READERM_READER')
            this.setShareDetails({ data: this.getPratilipiData, type: 'PRATILIPI', screen_name: 'READER', screen_location: 'READERM' })
            $('#share_modal').modal('show')
        },

        /* content serialisation */
        hideStripAndRedirect() {
            this.isNextPratilipiEnabled = false
            this._triggerReaderAnalyticsEvent('CLICK_NEXTPRATILIPI_READER')
            this.$router.push({path: this.getPratilipiData.nextPratilipi.newReadPageUrl || this.getPratilipiData.nextPratilipi.readPageUrl})
        },

        /* whatsapp share */
        triggerWaEndShareEvent() {
            this._triggerReaderAnalyticsEvent('SHAREBOOKWA_BOOKEND_READER', 'WHATSAPP')
        },

        /* scroll */
        updateScroll() {
            this.scrollPosition = window.scrollY
            const wintop = $(window).scrollTop()
            const docheight = $('.book-content').height() + Number($('.book-content').css('marginTop').replace('px', '')) + Number($('.book-content').css('marginBottom').replace('px', ''))
            const winheight = $(window).height()
            const readerPercentScrolled = (wintop / (docheight - winheight)) * 100
            if (!isNaN(readerPercentScrolled)) {
                this.readerPercentScrolled = Math.max(readerPercentScrolled, 0)
                $('.reader-progress .progress-bar').css('width', `${this.readerPercentScrolled}%`)
            }
        }

    },
    computed: {
        ...mapGetters('readerv2page', [
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
            'getUserDetails',
            'getWhatsAppUri'
        ]),
        getContentSectionStyle() {
            const classMap = {
                [ReaderLineHeight.SMALL]: 'lh-sm',
                [ReaderLineHeight.MEDIUM]: 'lh-md',
                [ReaderLineHeight.LARGE]: 'lh-lg'
            }
            return `font-${this.fontSize} ${classMap[this.lineHeight]}`
        },
        getReaderReadingModeStyle() {
            const classMap = {
                [ReaderReadingMode.WHITE]: 'theme-white',
                [ReaderReadingMode.NIGHT]: 'theme-black',
                [ReaderReadingMode.SEPIA]: 'theme-yellow'
            }
            return classMap[this.readingMode]
        }
    },
    created() {
        this.currentChapterSlugId = window.location.pathname.split('/').pop().split('-').pop()
    },
    mounted() {
        $('.read-page').bind("contextmenu", e => e.preventDefault())
        window.addEventListener('scroll', this.updateScroll)
    },
    watch: {
        '$route.params.slug' (chapterSlug) {
            this.currentChapterSlugId = chapterSlug.split('/').pop().split('-').pop()
        },
        'currentChapterSlugId' () {
            if (this.getIndexData.filter(indexData => indexData.slugId === this.currentChapterSlugId).length) {
                this.fetchContentData(this.currentChapterSlugId)
            } else {
                this.fetchReaderData(this.currentChapterSlugId)                
            }
        },
        'renderedChapterIdSlug' () {
            const self = this
            setTimeout(() => {
                const windowHeight = $(window).height()
                const documentHeight = $('.content-section').height()
                let maxReadPercentage = windowHeight/documentHeight * 100
                if (maxReadPercentage > 100) {
                    maxReadPercentage = 100
                }
                self.maxReadPercentage = maxReadPercentage
                self.maxReadPercentageCompleted = maxReadPercentage === 100
            })

            // setting the title of the page
            let documentTitle = ''
            let chapterMeta = this.getIndexData.filter(indexData => indexData.slugId === this.renderedChapterIdSlug)[0]
            if (chapterMeta.title) {
                documentTitle += chapterMeta.title + ' | '
            }
            documentTitle += (this.getPratilipiData.title && this.getPratilipiData.titleEn) ? 
                `${this.getPratilipiData.title} | ${this.getPratilipiData.titleEn}` : this.getPratilipiData.displayTitle
            document.title = documentTitle
        },
        'getPratilipiData.pratilipiId' (pratilipiId) {
            // pratilipi title seo
            const pratilipiTitle = (this.getPratilipiData.title && this.getPratilipiData.titleEn) ? 
                `${this.getPratilipiData.title} | ${this.getPratilipiData.titleEn}` : this.getPratilipiData.displayTitle

            // removing meta description from head section
            if ($('meta[name="description"]')) {
                this.metaDescription = $('meta[name="description"]').attr('content')
                $('meta[name="description"]').remove()
            }

            // setting og tags
            $('meta[property="og:title"]').remove()
            $('meta[property="og:description"]').remove()
            $('meta[property="og:image"]').remove()
            $('meta[property="og:url"]').remove()
            $('head').append(`<meta property='og:title' content='${pratilipiTitle}'>`)
            $('head').append(`<meta property='og:description' content='${this.getPratilipiData.summary ? (this.getPratilipiData.summary + ' « ' + this.getAuthorData.fullName) : this.getPratilipiData.summary}'>`)
            $('head').append(`<meta property='og:image' content='${this.getPratilipiData.coverImageUrl}'>`)
            $('head').append(`<meta property='og:url' content='${this.getPratilipiData.pageUrl}'>`)

            // default value for webPushModalTriggered is false
            this.webPushModalTriggered = false

            // setting up values for isWebPushStripEnabled and isWebPushModalEnabled
            this.isWebPushStripEnabled = this.getPratilipiData.state === "PUBLISHED" && WebPushUtil.canShowCustomPrompt() && (parseInt(this.getCookie('bucketId')) || 0) >= 20 && (parseInt(this.getCookie('bucketId')) || 0) < 30
            this.isWebPushModalEnabled =  this.getPratilipiData.state === "PUBLISHED" && WebPushUtil.canShowCustomPrompt() && (parseInt(this.getCookie('bucketId')) || 0) >= 30 && (parseInt(this.getCookie('bucketId')) || 0) < 60
        },
        'getUserDetails.userId' (newUserId, oldUserId) {
            this.reportName = this.getUserDetails.displayName || ''
            this.reportEmail = this.getUserDetails.email || ''
            // First initialisation
            if (oldUserId === undefined) {
                // Do Nothing
            } else {
                // user state change in reader
                this.fetchReaderData(this.currentChapterSlugId)
            }
        },
        'scrollPosition'(newScrollPosition, prevScrollPosition) {
            if (newScrollPosition > 60 && this.scrollDirection === 'DOWN') {
                $('.header-section').addClass('nav-up')
                $('.reader-progress').addClass('progress-up')
            } else if(newScrollPosition <= 60) {
                $('.header-section').removeClass('nav-up')
                $('.reader-progress').removeClass('progress-up')
            }
            if (newScrollPosition < prevScrollPosition) {
                this.scrollCounter++
                this.scrollDirection = 'UP'
            } else {
                this.scrollDirection = 'DOWN'
            }
            if (this.scrollCounter > 5) {
                $('.header-section').removeClass('nav-up')
                $('.reader-progress').removeClass('progress-up')
                this.scrollCounter = 0
            }

            if (this.scrollDirection === 'UP' && !this.shouldShowOpenInAppStrip){
                this.shouldShowOpenInAppStrip = true
            }

            if (this.scrollDirection === 'DOWN') {
                this.shouldShowOpenInAppStrip = false
            }

        },
        'readerPercentScrolled'() {
            // webpush modal trigger
            if (this.getIndexData[this.getIndexData.length -1].slugId === this.currentChapterSlugId && this.readerPercentScrolled > 80 && !this.webPushModalTriggered) {
                this.webPushModalTriggered = true
                this.openWebPushModal()
            }
            // next pratilipi trigger
            if (this.getIndexData[this.getIndexData.length -1].slugId == this.currentChapterSlugId && !this.isNextPratilipiEnabled) {
                this.isNextPratilipiEnabled = this.getPratilipiData.state === "PUBLISHED" && this.getPratilipiData.nextPratilipi && this.getPratilipiData.nextPratilipi.pratilipiId
                if (this.isNextPratilipiEnabled) {
                    this._triggerReaderAnalyticsEvent('VIEWNEXTPRATILIPI_READERM_READER')
                }
            }
            // maxReadPercentage trigger
            if (this.readerPercentScrolled > this.maxReadPercentage) {
                this.maxReadPercentage = this.readerPercentScrolled
            }
        },
        'maxReadPercentage' () {
            if (this.getUserDetails.userId !== 0 && !this.maxReadPercentageCompleted) {
                if (Date.now() > (this.maxReadPercentageLastUpdated + 500)) {
                    // maxRead => local variable
                    let maxRead = this.maxReadPercentage
                    // calculating slack in terms of % -> lot of divs on last chapter
                    // record maxReadPercentage as 100% if user had gone through the whole content, not whole reader
                    const netBookContentHeight = $('.book-content').height()
                    const netContentSectionHeight = $('.content-section').height()
                    if (netBookContentHeight && netContentSectionHeight) {
                        maxRead += Math.max(0, 100 - (netContentSectionHeight/netBookContentHeight * 100))
                    }
                    // bad maxRead
                    if (maxRead > 100) {
                        maxRead = 100
                        this.maxReadPercentageCompleted = true
                    }
                    this.postReadingPercentage({
                        chapterNo: this.getIndexData.filter(indexData => indexData.slugId === this.currentChapterSlugId)[0].chapterNo,
                        maxRead
                    })
                    this.maxReadPercentageLastUpdated = Date.now()
                }
            }
        },
        'getPratilipiLoadingState'(status) {
            if (status === LoadingState.LOADING_SUCCESS) {
                this._triggerReaderAnalyticsEvent('LANDED_READERM_READER')
            }
        }
    },
    destroyed() {
        // Removing og tags
        $('meta[property="og:title"]').remove()
        $('meta[property="og:description"]').remove()
        $('meta[property="og:image"]').remove()
        $('meta[property="og:url"]').remove()

        // adding meta description of the page
        $('head').append(`<meta name="description" content="${this.metaDescription}">`)

        window.removeEventListener('scroll', this.updateScroll)
    }
}
</script>

<style lang="scss" scoped>

$theme-white-background-color: #ffffff;
$theme-white-color: #2c3e50;

$theme-black-background-color: #000000;
$theme-black-color: #ffffff;

$theme-yellow-background-color: #F4ECD8;
$theme-yellow-color: #2c3e50;

.read-page {
    margin: 0;
    padding: 0;
    position: relative;
    min-height: 100vh;
    .loading-wrap {
        background: transparent;
    }
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
            margin: 0 auto;
            max-width: 750px;
        }
        .p-lr-15 {
            padding: 0 15px;
        }
        .p-r-10 {
            padding: 0 10px 0 0;
        }
        h1.chapter-title {
            font-size: 24px;
            text-align: center;
            padding-top: 10px;
            width: 100%;
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
        padding: 10px;
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
        .container {
            .row {
                display: flex;
                justify-content: space-between;
                cursor: pointer;
                padding: 0 5px;
                -moz-user-select: -moz-none;
                -moz-user-select: none;
                -o-user-select: none;
                -khtml-user-select: none;
                -webkit-user-select: none;
                -ms-user-select: none;
                user-select: none;
                .whatsapp-share-btn {
                    a.whatsapp {
                        font-size: 14px;
                        .social-icon {
                            text-align: center;
                        }
                        .fa-icon {
                            width: 24px;
                            height: 24px;
                        }
                        &:hover {
                            text-decoration: none;
                        }
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
    #readerReportModal {
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
    .next-strip-container {
        margin: 0 auto;
        margin-bottom: 10px;
        display: flex;
        justify-content: center;
        width: 100%;
        cursor: pointer;
        overflow: hidden;
    }
    .go-to-home-screen {
        text-align: center;
        margin-bottom: 10px;
        button {
            width: 50%;
            height: 30px;
        }
    }
}
.theme-white {
    background: $theme-white-background-color !important;
    color: $theme-white-color !important;
    .social-icon svg {
        color: $theme-white-color !important;
    }
}
.theme-black {
    background: $theme-black-background-color !important;
    color: $theme-black-color !important;
    .header-section i, .footer-section i {
        color: $theme-black-color !important;
    }
    .social-icon svg {
        color: $theme-black-color !important;
    }
    .modal {
        color: $theme-white-color !important;
        .header-section i, .footer-section i {
            color: $theme-white-color !important;
        }
    }
    .reader-progress {
        background: $theme-black-background-color;
    }
}
.theme-yellow {
    background: $theme-yellow-background-color !important;
    color: $theme-yellow-color !important;
    .reader-progress {
        background: $theme-yellow-background-color;
    }
    .social-icon svg {
        color: $theme-yellow-color !important;
    }
}
</style>

<style lang="scss">

$theme-white-background-color: #ffffff;
$theme-white-color: #2c3e50;

$theme-black-background-color: #000000;
$theme-black-color: #ffffff;

$theme-yellow-background-color: #F4ECD8;
$theme-yellow-color: #2c3e50;

.read-page.theme-white {
    .book-content {
        .book-recomendations .container-fluid, 
        .comment-box,
        .book-bottom-webpush-subscribe .webpush-container .webpush-inner-container {
            background: $theme-white-background-color !important;
            color: $theme-white-color !important;
        }
    }
}
.read-page.theme-black {
    .book-content {
        .book-recomendations .container-fluid, 
        .comment-box,
        .book-bottom-webpush-subscribe .webpush-container .webpush-inner-container {
            background: $theme-black-background-color !important;
            color: $theme-black-color !important;
        }
    }
}
.read-page.theme-yellow {
    .book-content {
        .book-recomendations .container-fluid, 
        .comment-box,
        .book-bottom-webpush-subscribe .webpush-container .webpush-inner-container {
            background: $theme-yellow-background-color !important;
            color: $theme-yellow-color !important;
        }
    }
}
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
        .comments-list li.ownReview, .translate-input-wrapper .translations li  {
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
}
.read-page-server-error.server_error {
    margin: 0 !important;
    width: 100% !important;
    height: 100vh !important;
    position: fixed !important;
    padding: 0 10px !important;
}
</style>
