<template>
    <MainLayout>
        <div class="pratilipi-page page-wrap">
            <div class="container">
                <div class="row" v-if="getPratilipiLoadingState === 'LOADING_SUCCESS'">
                    <div class="book-details col-md-12 col-lg-5 p-0">
                        <div class="card">
                            <div class="book-image" v-bind:style="{ backgroundImage: 'url(' + getPratilipiData.coverImageUrl  + ')' }">
                                <button class="update-img" v-if="getPratilipiData.hasAccessToUpdate" @click="uploadImage('pratilipi-image')"><i class="material-icons">camera_alt</i></button>
                                <input type="file" hidden name="pratilipiimage" @change="triggerPratilipiImageUpload($event)" accept="image/*" id="pratilipiimage-uploader">
                                <div class="uploading" v-if="getImageUploadLoadingState === 'LOADING'">
                                    <Spinner></Spinner> 
                                </div>
                            </div>
                            <div class="book-title">{{ getPratilipiData.title }} <button class="edit" @click="editPratilipiTitle" v-if="getPratilipiData.hasAccessToUpdate"><i class="material-icons">mode_edit</i></button></div>
                            <router-link
                              :to="getPratilipiData.author.pageUrl"
                              @click.native="triggerClickAuthorNameEvent"
                              class="author-name">
                              <span>{{ getPratilipiData.author.name }}</span>
                            </router-link>
                            <MessageButton
                                 v-if="getAuthorDetails.user && getAuthorDetails.user.userId && getUserDetails.userId !== getAuthorDetails.user.userId"
                                :authorId="getAuthorDetails.authorId"
                                :getRouteToMessageUserState="getRouteToMessageUserState"
                                :triggerRouteToMessageUser="triggerRouteToMessageUser"
                                :authorUserId="getAuthorDetails.user.userId"
                                :profileImageUrl="getAuthorDetails.profileImageUrl"
                                :fullName="getAuthorDetails.fullName"
                                :pageUrl="getAuthorDetails.pageUrl"
                                :className="'message-icon'"
                                :hideText="true"
                                :screenName="'BOOK'"
                                :locationName="'BOOKM'"
                                ></MessageButton>
                            <div class="book-stats">
                                <span class="avg-rating stars-green"><span class="rating-text">{{ getPratilipiData.averageRating | round(1) }}</span> <i class="material-icons">star_rate</i></span>
                                <span class="review-count">{{ getPratilipiData.ratingCount }} __("rating_ratings")</span>
                            </div>
                            <div class="book-stats">
                                <span class="read-time">__("pratilipi_reading_time"): {{ getPratilipiData.readingTime | showInMinutesOrHours }}</span>
                            </div>
                            <div class="book-stats">
                                <span class="read-count">__("pratilipi_count_reads"): {{ getPratilipiData.readCount }}</span>
                                <span class="date">__("pratilipi_listing_date"): {{ getPratilipiData.listingDateMillis | convertDate }}</span>
                            </div>
                            <div class="main-actions"  v-if="getUserPratilipiLoadingState === 'LOADING_SUCCESS'">
                                <div class="book-edit-actions" v-if="getPratilipiData.hasAccessToUpdate">
                                    <span v-if="getPratilipiData.state === 'PUBLISHED'">
                                        <button @click="askConfirmationAndUnpublishOrPublishBook({ bookState: 'DRAFTED' })">__("pratilipi_move_to_drafts")</button>
                                    </span>
                                    <span>
                                        <button v-if="isMobile()" @click="showAlertToGoToDesktop"><i class="material-icons">mode_edit</i> __("pratilipi_edit_content")</button>
                                        <a v-else @click="triggerEditBookEvent" :href="getPratilipiData.writePageUrl"><button><i class="material-icons">mode_edit</i> __("pratilipi_edit_content")</button></a>
                                    </span>
                                    <span v-if="getPratilipiData.state === 'DRAFTED'">
                                        <button @click="triggerEventAndUnpublishOrPublishBook({ bookState: 'PUBLISHED' })">__("pratilipi_publish_it")</button>
                                        <button @click="confirmAndDeletePratilipi"><i class="material-icons">delete</i> __("pratilipi_delete_content")</button>
                                    </span>
                                </div>
                                <span v-if="!getPratilipiData.hasAccessToUpdate">
                                    <button v-if="!getUserPratilipiData.addedToLib" class="library-btn" @click="addPratilipiToLibrary(getPratilipiData.pratilipiId)">
                                        <span>
                                            <i class="material-icons">bookmark_border</i>
                                            <i class="material-icons stacked white">add</i>
                                        </span>
                                        __("library")
                                    </button>

                                    <button v-if="getUserPratilipiData.addedToLib" class="library-btn" @click="removeFromLibraryAndTriggerAnalytics(getPratilipiData.pratilipiId)">
                                        <span>
                                            <i class="material-icons added-to-lib">bookmark</i>
                                            <i class="material-icons stacked grey">check</i>
                                        </span>
                                        __("library")
                                    </button>
                                </span>

                                <router-link
                                  v-if="getPratilipiData.hasAccessToUpdate && getPratilipiData.state === 'DRAFTED'"
                                  :to="getPratilipiData.readPageUrl"
                                  class="read-btn">
                                  <span>__("writer_preview")</span>
                                </router-link>
                                <router-link
                                  v-else
                                  :to="getPratilipiData.readPageUrl"
                                  @click.native="logReadEvent"
                                  class="read-btn">
                                  <span>__("read")</span>
                                </router-link>
                            </div>
                            <BookShareStrip
                            :data="getPratilipiData"
                            :type="'PRATILIPI'"></BookShareStrip>
                        </div>
                        <BookTags 
                            v-if="getPratilipiData.hasAccessToUpdate"
                            :selectedPratilipiType="selectedPratilipiType"     
                            :isTagSelected="isTagSelected" 
                            :selectedTags="selectedTags" 
                            :pratilipiData="getPratilipiData"
                            :changePratilipiType="changePratilipiType"
                            :getSystemTags="getSystemTags"
                            :addOrRemoveFromListOfSelectedTag="addOrRemoveFromListOfSelectedTag"
                            :suggestedTags="suggestedTags"
                            :removeSuggestedTag="removeSuggestedTag"
                            :newSuggestedTag="newSuggestedTag"
                            :updateNewSuggestedTag="updateNewSuggestedTag" 
                            :addToSuggestedTag="addToSuggestedTag"
                            :saveTypeAndCategories="saveTypeAndCategories"
                            :fetchSystemTags="fetchSystemTags"
                            ></BookTags>
                    </div>
                    <div class="book-synopsis col-md-12 col-lg-7 p-0">
                        <div class="card">
                            <div v-if="getPratilipiData.summary.trim() || getPratilipiData.state === 'DRAFTED' || getPratilipiData.hasAccessToUpdate">
                                <div class="head-title">__("pratilipi_summary") 
                                    <button class="edit" @click="editPratilipiSummary" v-if="getPratilipiData.hasAccessToUpdate"><i class="material-icons">mode_edit</i></button>
                                </div>
                                <p class="text show-more-height">{{ getPratilipiData.summary }}</p>
                                <button type="button" v-if="showShowMoreOfSummary" class="show_more" name="button" data-toggle="modal" data-target="#book_summary_modal">__("view_more")</button>
                            </div>
                            <!-- SUMMARY MODAL -->
                            <div class="modal fade summary-modal" id="book_summary_modal" tabindex="-1" role="dialog" aria-labelledby="summary-modalLabel" aria-hidden="true">
                              <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h5 class="modal-title">__("pratilipi_summary")</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                    </button>
                                  </div>
                                  <div class="modal-body social">
                                     <p>{{ getPratilipiData.summary }}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <AboutAuthor :authorId="getPratilipiData.author.authorId" :pratilipiData="getPratilipiData"></AboutAuthor>
                        </div>
                        <div class="card">
                            <div class="head-title">__("review_heading")</div>
                            <Reviews 
                                :pratilipiId="getPratilipiData.pratilipiId" 
                                :authorId="getPratilipiData.author.authorId" 
                                :userPratilipiData="getUserPratilipiData"
                                :haveInfiniteScroll="false"
                                screenName="BOOK"
                                screenLocation="RATEREV"
                                :pratilipiData="getPratilipiData"
                                v-if="getPratilipiLoadingState === 'LOADING_SUCCESS'">
                            </Reviews>
                            <button type="button" class="load_more" name="button" @click="openReviewModal">__("view_more")</button>
                            <!-- Reviews MODAL -->
                            <div class="review-popout" v-if="getPratilipiLoadingState === 'LOADING_SUCCESS'">
                                <button type="button" class="close-review" name="button" @click="closeReviewModal"><i class="material-icons">close</i></button>
                                <Reviews 
                                    :pratilipiId="getPratilipiData.pratilipiId" 
                                    :authorId="getPratilipiData.author.authorId" 
                                    :haveInfiniteScroll="true"
                                    screenName="BOOK"
                                    screenLocation="RATEREV"
                                    :pratilipiData="getPratilipiData"
                                    :userPratilipiData='getUserPratilipiData'>
                                </Reviews>
                            </div>
                            <div class="overlay-1" @click="closeReviewModal"></div>
                        </div>
                    </div>
                    <div class="book-recomendations col-md-12 p-0">
                        <div class="card">
                            <Recommendation
                                :contextId="getPratilipiData.pratilipiId"
                                :context="'summaryPage'"
                                screenName="BOOK"
                                screenLocation="RECOMMENDBOOK"
                                v-if="getPratilipiData && getPratilipiData.pratilipiId">
                            </Recommendation>
                        </div>
                    </div>
                </div>
                <Spinner v-if="getPratilipiLoadingState === 'LOADING'"></Spinner>
                <ServerError :action="'pratilipipage/fetchPratilipiDetailsAndUserPratilipiData'" :data="$route.params.slug_id" v-if="getPratilipiLoadingState === 'LOADING_ERROR'"></ServerError>
            </div>
            <ChatBanner></ChatBanner>
        </div>
    </MainLayout>
</template>

<script>
import MainLayout from '@/layout/main-layout.vue';
import Recommendation from '@/components/Recommendation.vue';
import AboutAuthor from '@/components/experiments/book_v1/AboutAuthor.vue';
import Spinner from '@/components/Spinner.vue';
import Reviews from '@/components/Reviews.vue';
import BookShareStrip from '@/components/BookShareStrip.vue';
import ServerError from '@/components/ServerError.vue';
import BookTags from '@/components/BookTags.vue';
import ChatBanner from '@/components/ChatBanner.vue';
import MessageButton from '@/components/MessageButton.vue';
import mixins from '@/mixins';
import constants from '@/constants'
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'Pratilipi',
    data() {
        return {
            pratilipi_id: null,
            pratilipiData: null,
            newReview: null,
            selectedPratilipiType: null,
            selectedTags: [],
            suggestedTags: [],
            newSuggestedTag: '',
            showShowMoreOfSummary: false,
            hasLandedBeenTriggered: false
        }
    },
    mixins: [
        mixins
    ],
    computed: {
        ...mapGetters('pratilipipage', [
            'getPratilipiData',
            'getUserPratilipiData',
            'getPratilipiLoadingState',
            'getUserPratilipiLoadingState',
            'getImageUploadLoadingState',
            'getSystemTags',
            'getSystemTagsLoadingState',
            'getAuthorDetails',
            'getRouteToMessageUserState'
        ]),
        ...mapGetters([
            'getUserDetails'
        ])
    },
    methods: {
        ...mapActions('pratilipipage', [
            'fetchPratilipiDetailsAndUserPratilipiData',
            'fetchUserPratilipiData',
            'addToLibrary',
            'removeFromLibrary',
            'uploadPratilipiImage',
            'fetchSystemTags',
            'unpublishOrPublishBook',
            'removeTagsFromPratilipi',
            'addTagsToPratilipi',
            'saveTypeAndCategories',
            'triggerRouteToMessageUser'
        ]),
        ...mapActions([
            'setShareDetails',
            'setAfterLoginAction',
            'setInputModalSaveAction',
            'setConfirmModalAction'
        ]),
        ...mapActions('alert', [
            'triggerAlert'
        ]),
        logReadEvent() {
            const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
            this.triggerAnanlyticsEvent('READBOOK_BOOKM_BOOK', 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId
            });
        },
        showAlertToGoToDesktop() {
            const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
            this.triggerAnanlyticsEvent(`EDITBOOK_BOOKM_BOOK`, 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId
            });
            this.triggerAlert({ message: '__("write_on_desktop_only")', timer: 3000 });
        },
        triggerEditBookEvent() {
            const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
            this.triggerAnanlyticsEvent(`EDITBOOK_BOOKM_BOOK`, 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId
            });
        },
        triggerEventAndUnpublishOrPublishBook() {
            const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
            this.triggerAnanlyticsEvent(`PUBLISHBOOK_BOOKM_BOOK`, 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId
            });
            this.unpublishOrPublishBook({ bookState: 'PUBLISHED' });
        },
        editPratilipiSummary() {
            this.setInputModalSaveAction({ 
                action: `${this.$route.meta.store}/saveOrUpdateSummary`, 
                heading: 'edit_pratilipi_summary',
                prefilled_value: this.getPratilipiData.summary,
                initial_value: this.getPratilipiData.summary,
                pratilipi_data: this.getPratilipiData,
                data: {
                    pratilipiId: this.getPratilipiData.pratilipiId
                }
            });
            this.openInputModal();
        },
        changePratilipiType(event) {
            this.selectedPratilipiType = event.target.value;
        },
        isTagSelected(tagId) {
            let isSelected = false;
            const that = this;
            this.selectedTags.forEach((eachTag) => {
                if (eachTag.id === tagId) {
                    isSelected = true;
                }
            });

            return isSelected;
        },
        addToSuggestedTag() {
            if (this.newSuggestedTag && this.newSuggestedTag.trim().length > 0) {
                this.suggestedTags.push(this.newSuggestedTag);    
                

                const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
                this.triggerAnanlyticsEvent(`ADDTAG_CATTAG_BOOK`, 'CONTROL', {
                    ...pratilipiAnalyticsData,
                    'USER_ID': this.getUserDetails.userId,
                    'PARENT_ID': this.newSuggestedTag
                });
                this.newSuggestedTag = '';
            }
        },
        updateNewSuggestedTag(value) {
            this.newSuggestedTag = value;
        },
        removeSuggestedTag(indexToRemove){
            
            const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
            this.triggerAnanlyticsEvent(`REMOVETAG_CATTAG_BOOK`, 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId,
                'PARENT_ID': this.suggestedTags[indexToRemove]
            });

            this.suggestedTags.splice(indexToRemove, 1);
        },
        addOrRemoveFromListOfSelectedTag(tagData, isDeselectOperation) {
            console.log(isDeselectOperation);
            if (this.selectedTags.length === 3 && !isDeselectOperation) {
                this.triggerAlert({ message: '__("tags_select_best_three")', timer: 3000 });
                return;
            }

            if (isDeselectOperation) {
                const currentTags = this.selectedTags; 

                let indexToRemove = null;
                currentTags.forEach((eachTag, index) => {
                    if (eachTag.id === tagData.id) {
                        indexToRemove = index;
                    }
                });

                if (indexToRemove != null) {
                    currentTags.splice(indexToRemove, 1);
                }
                const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
                this.triggerAnanlyticsEvent(`REMOVECATEGORY_CATTAG_BOOK`, 'CONTROL', {
                    ...pratilipiAnalyticsData,
                    'USER_ID': this.getUserDetails.userId,
                    'PARENT_ID': tagData.id
                });
            } else {
                const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
                this.triggerAnanlyticsEvent(`ADDCATEGORY_CATTAG_BOOK`, 'CONTROL', {
                    ...pratilipiAnalyticsData,
                    'USER_ID': this.getUserDetails.userId,
                    'PARENT_ID': tagData.id
                });
                this.selectedTags.push(tagData);
            }
        },
        editPratilipiTitle() {
            const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
            this.triggerAnanlyticsEvent(`EDITTITLE_BOOKTITLE_BOOK`, 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId
            });
            this.setInputModalSaveAction({ 
                action: `${this.$route.meta.store}/saveOrUpdateTitle`, 
                heading: 'edit_pratilipi_title',
                prefilled_value: this.getPratilipiData.title,
                prefilled_value_title: this.getPratilipiData.titleEn,
                data: {
                    pratilipiId: this.getPratilipiData.pratilipiId
                }
            });
            this.openMultiInputModal();
        },
        confirmAndDeletePratilipi() {
            const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
            this.triggerAnanlyticsEvent(`DELETEBOOK_BOOKM_BOOK`, 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId
            });
            this.setConfirmModalAction({ 
                action: `${this.$route.meta.store}/deletePratilipi`, 
                heading: 'pratilipi_delete_content',
                message: 'pratilipi_confirm_delete_content',
                data: {
                    pratilipiId: this.getPratilipiData.pratilipiId
                }
            });
            this.openConfirmationModal();
        },
        askConfirmationAndUnpublishOrPublishBook({bookState}) {
            const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
            this.triggerAnanlyticsEvent(`UNPUBLISHBOOK_BOOKM_BOOK`, 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId
            });
            this.setConfirmModalAction({
                action: `${this.$route.meta.store}/unpublishOrPublishBook`, 
                heading: 'pratilipi_delete_content',
                message: 'pratilipi_confirm_delete_content',
                data: {
                    pratilipiId: this.getPratilipiData.pratilipiId,
                    bookState
                }
            });
            this.openConfirmationModal();
        },
        addPratilipiToLibrary(pratilipiId) {
            const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
            this.triggerAnanlyticsEvent(`LIBRARYADD_BOOKM_BOOK`, 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId
            });
            if (this.getUserDetails.isGuest) {
                this.setAfterLoginAction({ action: `${this.$route.meta.store}/addToLibrary`, data: pratilipiId });
                this.openLoginModal(this.$route.meta.store, 'LIBRARYADD', 'BOOKM');
            } else {
                this.addToLibrary(pratilipiId);
            }
        },
        removeFromLibraryAndTriggerAnalytics(pratilipiId) {
            const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
            this.triggerAnanlyticsEvent(`LIBRARYREMOVE_BOOKM_BOOK`, 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId
            });
            this.removeFromLibrary(pratilipiId);
        },
        openShareModal() {
            const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
            this.triggerAnanlyticsEvent(`CLICKSHRBOOK_BOOKM_BOOK`, 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId
            });
            this.setShareDetails({ data: this.getPratilipiData, type: 'PRATILIPI', screen_name: 'BOOK', screen_location: 'BOOKM' })
            $('#share_modal').modal('show');
        },
        uploadImage(imageType) {
            switch(imageType) {
                case 'pratilipi-image':
                    $('#pratilipiimage-uploader').click();
                    if (this.getPratilipiData.coverImageUrl.endsWith('/pratilipi/cover')) {
                        const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
                        this.triggerAnanlyticsEvent(`NEWBOOKINFO_BOOKCOVER_BOOK`, 'CONTROL', {
                            ...pratilipiAnalyticsData,
                            'USER_ID': this.getUserDetails.userId
                        });
                    }
                    else {
                        const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
                        this.triggerAnanlyticsEvent(`UPDATEBOOKINFO_BOOKCOVER_BOOK`, 'CONTROL', {
                            ...pratilipiAnalyticsData,
                            'USER_ID': this.getUserDetails.userId
                        });
                    }
                    break;
            }
            
        },
        triggerPratilipiImageUpload(event) {
            const formData = new FormData();
            formData.append('ko_unique_6', event.target.files[0], event.target.files[0].name);
            this.uploadPratilipiImage(formData);
        },
        triggerClickAuthorNameEvent() {
            const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
            this.triggerAnanlyticsEvent(`CLICKUSER_BOOKM_BOOK`, 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId,
                'PARENT_ID': this.getAuthorDetails.user.userId,
                'AUTHOR_ID': this.getPratilipiData.author.authorId
            });
        },
        openReviewModal() {
            $(".review-popout").addClass("show");
            $('.overlay-1').fadeIn();
            $(".rating-popout").removeClass("show");
            $("body").addClass("modal-open");
        },
        closeReviewModal() {
            $(".review-popout").removeClass("show");
            $('.overlay-1').fadeOut();
            $("body").removeClass("modal-open");
        },
        detectOverflow() {
            const element = $('.show-more-height');
            const offsetHeight = element.prop('offsetHeight');
            const scrollHeight = element.prop('scrollHeight');

            if (offsetHeight < scrollHeight) {
                // your element have overflow
                this.showShowMoreOfSummary = true;
            } else {
                // your element doesn't have overflow
                this.showShowMoreOfSummary = false;
            }   
        }
    },
    created() {
        const slug_id = this.$route.params.slug_id;
        const pratilipiData = this.$route.params.pratilipiData;
        this.selectedPratilipiType = this.getPratilipiData.type;
        this.selectedTags = this.getPratilipiData.tags ? [ ...this.getPratilipiData.tags ] : [];
        this.suggestedTags = this.getPratilipiData.suggestedTags;
        document.title = this.getPratilipiData.title;

        this.fetchPratilipiDetailsAndUserPratilipiData(slug_id);
    },
    components: {
        MainLayout,
        Recommendation,
        AboutAuthor,
        Spinner,
        BookTags,
        Reviews,
        ServerError,
        BookShareStrip,
        ChatBanner,
        MessageButton
    },
    watch: {
        '$route.params.slug_id' (slug_id) {
            this.fetchPratilipiDetailsAndUserPratilipiData(slug_id);
        },
        'getPratilipiData.state'(state) {
            if (state === 'DELETED') {
                this.$router.push(this.getUserDetails.profilePageUrl);
            }
        },
        'getPratilipiData.pratilipiId'(newId){
            this.selectedPratilipiType = this.getPratilipiData.type;
            this.selectedTags = this.getPratilipiData.tags ? [ ...this.getPratilipiData.tags ] : [];
            this.suggestedTags = this.getPratilipiData.suggestedTags;
            document.title = this.getPratilipiData.title;
        },
        'getPratilipiLoadingState'(status) {
            if (status === 'LOADING_SUCCESS' && !this.hasLandedBeenTriggered) {
                const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
                this.triggerAnanlyticsEvent('LANDED_BOOKM_BOOK', 'CONTROL', {
                    ...pratilipiAnalyticsData,
                    'USER_ID': this.getUserDetails.userId
                });
                this.hasLandedBeenTriggered = true;
                const that = this;
                setTimeout(() => {
                    that.detectOverflow();
                }, 0);
                
            }
        },
        'getUserDetails.userId'() {
            this.fetchPratilipiDetailsAndUserPratilipiData(this.$route.params.slug_id);
        },
        selectedPratilipiType(newType) {
            if (newType === this.getPratilipiData.type) {
                this.selectedTags = this.getPratilipiData.tags ? [ ...this.getPratilipiData.tags ] : [];
            } else {
                this.selectedTags = [];
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .pratilipi-page {
        background: #f8f8f8;
        margin-top: 85px;
        min-height: 700px;
        @media screen and (max-width: 992px ) {
            margin-top: 65px;
        }
        .col-md-12.p-0 {
            padding: 0;
        }
        .card {
            margin: 10px;
            display: block;
            text-align: left;
            border-radius: 0;
            .share-icon {
                outline: none;
                border: 0;
                background: #9E9E9E;
                color: #fff;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                padding: 0;
                cursor: pointer;
                position: absolute;
                top: 10px;
                right: 10px;
                z-index: 2;
                i {
                    height: 40px;
                    width: 40px;
                    font-size: 18px;
                    line-height: 40px;
                }
            }
            .head-title {
                text-align: left;
                font-weight: bold;
                font-size: 18px;
                border-left: 3px solid #d0021b;
                padding-left: 10px;
                margin: 10px 0;
            }
            p {
                text-align: left;
                margin: 10px 10px 5px;
                font-size: 14px;
                max-height: initial;
                &.show-more-height {
                    max-height: 65px;
                    overflow: hidden;
                }
            }
            .show_more, .load_more {
                color: #d0021b;
                width: 100%;
                background: none;
                border: 0;
                outline: none;
                text-align: right;
                font-size: 14px;
                margin: 0 0 10px;
                cursor: pointer;
            }
            .load_more {
                text-align: center;
            }
            button.edit {
                background: none;
                border: 0;
                i {
                    font-size: 18px;
                    vertical-align: middle;
                }
                &:focus {
                    outline: none;
                }
            }
        }
        .book-details {
            .card {
                text-align: center;
                margin: 5px 10px 0;
            }
            .book-image {
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center;
                margin: 10px 0 5px;
                width: 100%;
                height: 200px;
                position: relative;
            }
            .update-img {
                position: absolute;
                bottom: 0;
                left: 45%;
                background: rgba(255,255,255,0.4);
                border: 0;
                outline: none;
                cursor: pointer;
                padding: 5px 10px;
                text-align: center;
                i {
                    vertical-align: middle;
                    font-size: 18px;
                }
            }
            .uploading {
                background: rgba(0,0,0,0.7);
                height: 100%;
                z-index: 3;
                position: relative;
                .spinner {
                    padding-top: 80px;
                }
            }
            .book-title {
                font-size: 18px;
                font-weight: bold;
            }
            .author-name {
                margin: 2px 0;
                display: inline-block;
                color: #d0021b;
                font-size: 15px;
            }
            .book-stats {
                font-size: 13px;
                margin: 2px 0;
                .avg-rating {
                    background-color: #37be5f;
                    color: #fff;
                    margin: 0 5px 5px 0;
                    padding: 3px 7px;
                    border-radius: 2px;
                    display: inline-block;
                    font-size: 12px;
                    vertical-align: middle;
                    .rating-text {
                        vertical-align: middle;
                    }
                    .material-icons {
                        font-size: 12px;
                        width: 16px;
                        padding-left: 5px;
                        vertical-align: middle;
                    }
                    &.stars-green {
                        background: #37be5f;
                    }
                    &.stars-orange {
                        background: #ffb500;
                    }
                    &.stars-red {
                        background: #ff6d13;
                    }
                }
                .review-count {
                    font-size: 12px;
                    margin-left: 5px;
                    span {
                        padding-left: 5px;
                    }
                }
                .read-count {
                    border-right: 1px solid;
                    padding-right: 5px;
                    margin: 0;
                    line-height: 12px;
                    display: inline-block;
                }
                .date {
                    display: inline-block;
                    padding-left: 5px;
                    display: inline-block;
                }
            }
            .main-actions {
                width: 100%;
                background: #fff;
                .book-edit-actions {
                    display: block;
                    margin: 10px 0 0;
                    button {
                        background: #e9e9e9;
                        color: #212121;
                        border: 0;
                        font-size: 12px;
                        padding: 5px 10px;
                        margin: 2px 5px;
                        i {
                            font-size: 16px;
                            vertical-align: middle;
                        }
                    }
                }
                .library-btn, .read-btn {
                    display: inline-block;
                    width: 48%;
                    height: 52px;
                    line-height: 52px;
                    font-size: 17px;
                    text-align: center;
                    background: #fff;
                    color: #fff;
                    font-weight: 700;
                    border: 0;
                    outline: none;
                    padding: 0;
                    margin: 5px 0 10px;
                    cursor: pointer;
                    &:hover {
                        text-decoration: none;
                        opacity: 0.8;
                    }
                }
                .library-btn {
                    background: #fff;
                    color: #555;
                    border: 1px solid #9e9e9e;
                    &:hover {
                        opacity: 1;
                    }
                    span {
                        position: relative;
                        display: inline-block;
                        vertical-align: middle;
                    }
                    i {
                        height: 40px;
                        line-height: 40px;
                        font-size: 30px;
                        color: #555;
                        vertical-align: middle;
                        &.stacked {
                            position: absolute;
                            top: -1px;
                            left: -1px;
                            margin-left: 14px;
                            font-size: 11px;
                            color: #555;
                            font-weight: bold;
                            &.white {
                                color: #555;
                                margin-left: 10px;
                                margin-top: 7px;
                                left: 0;
                            }
                            &.grey {
                                color: #9e9e9e;
                                margin-left: 9px;
                                margin-top: 8px;
                                left: 0;
                            }
                        }
                    }
                }
                .read-btn {
                    background: #d0021b;
                    border: 1px solid #d0021b;
                }
            }
        }
        .add-review {
            display: block;
            margin: 4px 10px;
            clear: both;
            overflow: hidden;
        }
        .overlay-1 {
            position: fixed;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.7);
            z-index: 8;
            display: none;
            top: 0;
            left: 0;
        }
        .review-popout {
            height: 500px;
            width: 96%;
            max-width: 700px;
            position: fixed;
            margin-bottom: 0;
            margin-left: 0;
            left: 50%;
            transform: translateX(-50%);
            bottom: -700vh;
            overflow: hidden;
            overflow-y: auto;
            text-align: left;
            background: #fff;
            box-shadow: 0 -1px 2px rgba(0,0,0,0.5);
            transition: all 0.5s;
            z-index: 9;
            @media screen and (max-width: 992px ) {
                margin-bottom: 51px;
            }
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
    }
</style>
