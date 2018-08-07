<template>
    <MainLayout>
        <div class="static-page page-wrap">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="head-title">{{ getEventData.name }}</div>
                    </div>
                </div>
                <!-- Add all page content inside this div if you want the side nav to push page content to the right (not used if you only want the sidenav to sit on top of the page -->
                <div id="main" v-show="getEventLoadingState === 'LOADING_SUCCESS' || currentStep != 1">
                    <div class="step-container">
                        <div class="row steps">
                            <div class="step step-1" :class="{ active: currentStep === 1 }">
                                <div class="step-number">
                                    <span>1</span>
                                    <i class="material-icons">check</i>
                                </div>
                                <p>__("writer_add_content_title")</p>
                            </div>
                            <div class="step step-2" :class="{ active: currentStep === 2 }">
                                <div class="step-number">
                                    <span>2</span>
                                    <i class="material-icons">check</i>
                                </div>
                                <p>__("writer_table_of_contents")</p>
                            </div>
                            <div class="step step-3" :class="{ active: currentStep === 3 }">
                                <div class="step-number">
                                    <span>3</span>
                                    <i class="material-icons">check</i>
                                </div>
                                <p>__("writer_editor_image")</p>
                            </div>
                        </div>
                    </div>


                    <div v-if="currentStep == 1">
                        <div class="row">
                            <div class="col-md-5 mb-10">
                                <div class="event-image" :style="{ backgroundImage: 'url(' + getEventData.bannerImageUrl + ')' }"></div>
                            </div>
                            <div class="col-md-7">
                                <form>
                                    <div class="form-group">
                                        <label for="pratilipi_write_title_input">__("writer_input_title") *</label>
                                        <p class="validation_error" v-if="titleIsMissing">
                                            <i class="material-icons">error</i>
                                            <span>This is a madatory field</span>
                                        </p>
                                        <TranslatingInput :classObj="{ error: titleIsMissing }" :value="title" :oninput="updateCurrentTitle" :placeholder="'__("writer_input_title")'"></TranslatingInput>
                                    </div>
                                    <div class="form-group">
                                        <label for="pratilipi_write_title_en_input">__("writer_input_title_en")</label>
                                        <input type="text" :value="titleEn" @input="($event) => { titleEn = $event.target.value}" class="form-control" id="pratilipi_write_title_en_input" :placeholder="'__("writer_input_title_en")'">
                                    </div>
                                    <div class="form-group">
                                        <label for="pratilipi_write_type">__("write_type")</label>
                                        <select class="form-control" id="pratilipi_write_type" v-model="type">
                                            <option disabled value="">__('write_type')</option>
                                            <option value="POEM">__('_pratilipi_type_poem')</option>
                                            <option value="STORY">__('_pratilipi_type_story')</option>
                                            <option value="ARTICLE">__('_pratilipi_type_article')</option>
                                        </select>
                                    </div>
                                    <label class="form-check-label" for="agree-terms-conditions">__("writer_accept_copyright")</label>
                                    <a href="/terms-of-service" class="terms-link" target="_blank">__("writer_read_copyright")</a>
                                </form>
                            </div>
                        </div>
                        <div class="row writer-navigation">
                            <div class="col-6">
                            </div>
                            <div class="col-6 text-right">
                                <button class="next" @click="createPratilipiAndEventFromStep1">__("writer_to_next_screen") here</button>
                            </div>
                        </div>
                    </div>


                    <div v-if="currentStep == 2">
                        <WriteModule v-if="this.$route.params.eventPratilipiId" :pratilipiId="this.$route.params.eventPratilipiId"></WriteModule>
                        <div class="row writer-navigation">
                            <div class="col-6">
                                <button class="prev" @click="goToFirstStepForEdit">__("back")</button>
                            </div>
                            <div class="col-6 text-right">
<!--                                 <button class="save" @click="autoSaveContents">__("save_changes")</button>
 -->                                <button class="next" @click="saveContentAndGoToThirdStep">__("writer_to_next_screen")</button>
                            </div>
                        </div>
                    </div>

                    <div v-if="currentStep == 3">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="book-image" v-bind:style="{ backgroundImage: 'url(https://2.ptlp.co' + getEventPratilipiData.coverImageUrl + ')' }">
                                    <button class="update-img" @click="uploadCoverImage"><i class="material-icons">camera_alt</i></button>
                                    <input type="file" hidden name="pratilipiimage" accept="image/*" @change="triggerPratilipiImageUpload" id="pratilipiimage-uploader">
                                    <div class="uploading" v-if="getEventPratilipiImageUploadLoadingState === 'LOADING'">
                                        <Spinner></Spinner>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-8">
                                <div class="head-title">__("pratilipi_summary")</div>
                                <br>
                                <TranslatingInput :value="description" :oninput="(value) => { description = value}" :placeholder="'__("edit_pratilipi_summary")'"></TranslatingInput>
                            </div>
                        </div>
                        <div class="row writer-navigation">
                            <div class="col-6">
                                <button class="prev" @click="goToSecondStepForEdit">__("back")</button>
                            </div>
                            <div v-if="(getEventData.eventId || getEventPratilipiData.eventId) && getEventPratilipiData.hasAccessToUpdate" class="col-6 text-right">
                                <!--<button class="save" @click="autoSaveContents">__("save_changes")</button>-->
                                <button class="next" @click="saveMetaInformationAndFinalSubmit">__('event_participate_finish')</button>
                            </div>
                        </div>
                    </div>

                </div>
                <!--<Spinner v-if="getEventLoadingState === 'LOADING'"></Spinner>-->
            </div>
            <div class="backdrop"></div>
        </div>
        <input name="image" id="image_input" type="file" accept="image/*" style="display: none;">
        <input type="hidden" id="field_name" value="" />
    </MainLayout>
</template>

<script>
import MainLayout from '@/layout/main-layout.vue';
import constants from '@/constants';
import mixins from '@/mixins';
import TranslatingInput from '@/components/TranslatingInput.vue';
import UserEventPratilipiComponent from '@/components/UserEventPratilipi.vue';
import Spinner from '@/components/Spinner.vue';
import { mapGetters, mapActions } from 'vuex';
import WriteModule from '@/components/Writer.vue';

export default {
    components: {
        MainLayout,
        TranslatingInput,
        Spinner,
        UserEventPratilipiComponent,
        WriteModule
    },
    computed: {
        ...mapGetters([
            'getUserDetails'
        ]),
        ...mapGetters('eventparticipate', [
            'getEventPratilipiCreateOrUpdateStateSuccess',
            'getEventPratilipiLoadingState',
            'getEventPratilipiData',
            'getContentLoadingState',
            'getEventPratilipDescUpdateState',
            'getContents',
            'getEventLoadingState',
            'getDraftedEventPratilipi',
            'getEventPratilipiCoverImage',
            'getEventPratilipiImageUploadLoadingState',
            'getEventDetails',
            'getEventData',
            'getEventEntrySubmitState',
            'getEventChapterCreatingState',
            'getSubmittedEventPratilipi',
            'getEventEntryCreationState',
            'getEventPratilipiEntryId'
        ]),
    },
    mixins: [
        mixins
    ],
    data() {
        return {
            currentStep: 1,
            constants,
            description: '',
            showAcceptedMessage: false,
            title: '',
            titleEn: '',
            type: 'STORY',
            selectedChapter: 0,
            chapters: [],
            suggestions: [],
            currentWord: '',
            wordToTranslate: '',
            lastTranslatedWord: '',
            wordList: [],
            writerInFocus: false,
            inputInFocus: false,
            scrollPosition: null,
            selectedSuggestion: 0,
            titleIsMissing: false,
            pratilipiId: '',
        }
    },
    methods: {

        ...mapActions('eventparticipate', [
            'fetchEventPratilipiData',
            'createEventPratilipiData',
            'updateEventPratilipiData',
            'updatePratilipiContent',
            'fetchPratilipiContent',
            'updateDescriptionAndTags',
            'fetchEventDetails',
            'uploadEventPratilipiImage',
            'fetchDraftedUserEventPratilipis',
            'createPratilipiAndEvent',
            "resetNewEntryState",
            'createNewEventEntry',
            'createChapter',
            'submitEventEntry'
        ]),
        ...mapActions('alert', [
            'triggerAlert'
        ]),

        ...mapActions([
            'setAfterLoginAction',
            'setConfirmModalAction'
        ]),

        updateCurrentTitle(value) {
            this.title = value;
        },

        createPratilipiAndEventFromStep1() {

             if (!this.title || this.title.trim() === '') {
                this.titleIsMissing = true;
                return;
            }

            this.titleIsMissing = false;

            if(this.$route.params.eventSlug && this.$route.params.eventPratilipiId) {

                if (this.getUserDetails.isGuest) {
                    this.setAfterLoginAction({ action: `eventparticipate/updateEventPratilipiData`, data: {
                            pratilipiId : this.pratilipiId,
                            title: this.title.trim(),
                            titleEn: this.titleEn.trim(),
                            type: this.type,
                            language: this.getCurrentLanguage().fullName.toUpperCase(),
                            eventId: this.getEventPratilipiData.eventId,
                        }});
                    this.openLoginModal(this.$route.meta.store, 'EVENTPARTICIPATECREATE', 'EVENTPARTICIPATE');
                    return;
                }

                this.updateEventPratilipiData({
                    pratilipiId : this.pratilipiId,
                    title: this.title.trim(),
                    titleEn: this.titleEn.trim(),
                    type: this.type,
                    language: this.getCurrentLanguage().fullName.toUpperCase(),
                    eventId: this.getEventPratilipiData.eventId,
                });
            } else {

                if (this.getUserDetails.isGuest) {
                    this.setAfterLoginAction({ action: `eventparticipate/createPratilipiAndEvent`, data: {
                            title: this.title.trim(),
                            titleEn: this.titleEn.trim(),
                            language: this.getCurrentLanguage().fullName.toUpperCase(),
                            type: this.type,
                            eventId: this.getEventData.eventId,
                        }});
                    this.openLoginModal(this.$route.meta.store, 'EVENTPARTICIPATECREATE', 'EVENTPARTICIPATE');
                    return;
                }

                this.createPratilipiAndEvent({
                    title: this.title.trim(),
                    titleEn: this.titleEn,
                    language: this.getCurrentLanguage().fullName.toUpperCase(),
                    type: this.type,
                    eventId: this.getEventData.eventId,
                });
            }

        },
        routeToNextStep() {
            console.log("this.getPratilipiOfEvent.pratilipiId " + this.getEventPratilipiData.pratilipiId);
            let url = '/event/' + this.$route.params.eventSlug + '/participate/' + this.getEventPratilipiData.pratilipiId;
            this.$router.push(url);
        },

        saveContentAndGoToThirdStep() {
            this.goToThirdStep;
            this.$router.push({
                path: `/event/${this.$route.params.eventSlug}/participate/${this.$route.params.eventPratilipiId}/submit`,
            });
        },

        saveMetaInformationAndFinalSubmit() {

            this.setConfirmModalAction({
                action: `eventparticipate/updateDescriptionAndTags`,
                heading: 'event_participate_confirm_submission',
                message: 'event_participate_cannot_change_drafts',
                data: { eventPratilipiId: this.pratilipiId, description: this.description || '', state: 'PUBLISHED' }
            });
            this.openPrimaryConfirmationModal();
        },

        goToFirstStep() {
            $('.circle-loader').removeClass('load-complete');
            $('.checkmark').hide();
        },

        goToFirstStepForEdit() {
            this.goToFirstStep;
            this.$router.push({
                path: `/event/${this.$route.params.eventSlug}/participate/${this.$route.params.eventPratilipiId}/edit`,
            });
        },

        goToSecondStepForEdit() {
            this.goToSecondStep;
            this.$router.push({
                path: `/event/${this.$route.params.eventSlug}/participate/${this.$route.params.eventPratilipiId}`,
            });
        },

        goToSecondStep() {
            $('.circle-loader').removeClass('load-complete');
            $('.checkmark').hide();
        },

        goToThirdStep() {
            $('.circle-loader').removeClass('load-complete');
            $('.checkmark').hide();
        },

        uploadCoverImage() {
            $('#pratilipiimage-uploader').click();
        },

        triggerPratilipiImageUpload(event) {
            const formData = new FormData();
            formData.append('file', event.target.files[0], event.target.files[0].name);
            formData.append('eventPratilipiId', this.pratilipiId);
            this.uploadEventPratilipiImage({ "formData" : formData, "pratilipiId" : this.pratilipiId});
        },
        updateScroll() {
            this.scrollPosition = window.scrollY
        },

        checkWordSuggester() {
            if (this.isMobile()) {
                if ((this.scrollPosition + $(window).height()) > $('.writer-navigation').position().top) {
                    $(".word-suggestions").removeClass("fixed");
                }
                else {
                    $(".word-suggestions").addClass("fixed");
                }
            }
        },
        getCurrentPratilipiEntryId(){
            let eventEntryId = 0;

            if(this.getEventPratilipiEntryId > 0){
                console.log("entry id is", this.getEventPratilipiEntryId);
                return this.getEventPratilipiEntryId;
            }

            this.getDraftedEventPratilipi.forEach((pratilipi, index) => {
                if (pratilipi.pratilipiId == this.getEventPratilipiData.pratilipiId){
                    eventEntryId = pratilipi.eventEntryId;
                }
            });

            this.getSubmittedEventPratilipi.forEach((pratilipi, index) => {
                if (pratilipi.pratilipiId == this.getEventPratilipiData.pratilipiId){
                    eventEntryId = pratilipi.eventEntryId;
                }
            });

            return eventEntryId;
        }
    },
    watch: {
        'getEventEntryCreationState'(state){
            if (state == 'LOADING_SUCCESS'){
                if (this.currentStep == 1){
                    this.routeToNextStep();
                }
            }
        },
        'getEventChapterCreatingState'(state) {
            console.log("entering state");
            if (state == 'LOADING_SUCCESS') {
                let eventId = this.getEventData.eventId;
                let authorId = this.getUserDetails.authorId;
                let userId = this.getUserDetails.userId;
                let pratilipiId = this.getEventPratilipiData.pratilipiId;

                this.createNewEventEntry({
                    "eventId": eventId,
                    "pratilipiId": pratilipiId,
                    "authorId": authorId,
                    "userId": userId
                });
            }
        },
        'getEventPratilipiCreateOrUpdateStateSuccess'(state) {
            console.log("starting", 1);
            if(state == 'LOADING_SUCCESS') {
                let pratilipiId = this.getEventPratilipiData.pratilipiId;
                if (this.$route.params.eventSlug && this.$route.params.eventPratilipiId) {
                    this.$router.push({
                        path: `/event/${this.$route.params.eventSlug}/participate/${this.getEventPratilipiData.pratilipiId}`,
                    });
                } else {
                    this.createChapter({pratilipiId: pratilipiId, chapterNo: 1});
                }

            }

            if(state == 'LOADING_ERROR') {
                if (this.$route.params.eventSlug && this.$route.params.eventPratilipiId) {
                    this.$router.push({
                        path: `/event/${this.$route.params.eventSlug}/participate/${this.getEventPratilipiData.pratilipiId}/edit`,
                    });
                }
            }
        },
        'getEventPratilipiLoadingState'(state) {
            console.log("starting", 3);
            if (state === 'LOADING_SUCCESS') {
                this.title = this.getEventPratilipiData.title;
                this.titleEn = this.getEventPratilipiData.titleEn;
                this.type = this.getEventPratilipiData.type;
                this.description = this.getEventPratilipiData.summary;
            }

            if (state === 'LOADING_ERROR') {
                this.$router.push({
                    path: `/event/${this.$route.params.eventSlug}/participate/`
                })
            }
        },

        '$route'(route) {
            console.log("starting", 6);
            console.log("starting", this.$route.hash);

            if(this.$route.hash == '#confirmation-primary'){
                return;
            }

            if(this.$route.params.eventSlug && this.$route.params.eventPratilipiId && this.$route.path.includes('/edit')){
                this.pratilipiId = this.$route.params.eventPratilipiId;
                this.fetchEventPratilipiData(this.pratilipiId);

                this.currentStep = 1;
            } else if (this.$route.params.eventSlug && this.$route.params.eventPratilipiId && this.$route.path.includes('/submit')) {
                this.pratilipiId = this.$route.params.eventPratilipiId;
                if (this.getEventPratilipiEntryId == 0) {
                    this.fetchEventDetails(this.$route.params.eventSlug.split("-").pop());
                } else if (!this.getEventData.eventId && !this.getEventPratilipiData.eventId){
                    this.fetchEventDetails(this.$route.params.eventSlug.split("-").pop());
                }

                if (!this.getEventPratilipiData.pratilipiId)
                    this.fetchEventPratilipiData(this.pratilipiId);

                this.currentStep = 3;
            } else if (this.$route.params.eventSlug && this.$route.params.eventPratilipiId) {
                this.pratilipiId = this.$route.params.eventPratilipiId;
                this.currentStep = 2;
            } else {

                if(!this.getEventData.eventId){
                    this.fetchEventDetails(this.$route.params.eventSlug.split("-").pop());
                }

                this.currentStep = 1;
            }

        },

        'getEventLoadingState'(state) {
            if (state === 'LOADING_ERROR') {
                this.$router.push('/event');
            }

            if (state === 'LOADING_SUCCESS') {
                console.log(JSON.stringify(this.getEventData))
            }
        },

        'writerInFocus'(inFocus) {
            console.log("starting", 8);
            if (inFocus || this.inputInFocus) {
                $(".footer-menu").css("height", "0")
            } else {
                $(".footer-menu").css("height", "51px")
            }
        },
        'inputInFocus'(inFocus) {
            console.log("starting", 9);
            if (inFocus || this.writerInFocus) {
                $(".footer-menu").css("height", "0")
            } else {
                $(".footer-menu").css("height", "51px")
            }
        },
        'scrollPosition'(newScrollPosition) {
            console.log("starting", 10);
            this.checkWordSuggester();
        },
        'getEventPratilipDescUpdateState'(state){
            if (state === 'LOADING_SUCCESS') {
                if (this.currentStep == 3) {
                    this.submitEventEntry({
                        "eventId": this.getEventData.eventId || this.getEventPratilipiData.eventId,
                        "eventEntryId": this.getCurrentPratilipiEntryId()
                    });
                }
            }
        },
        'getEventEntrySubmitState'(state) {
            console.log("entry submission state ius ", state);
            if (state === 'LOADING_SUCCESS'){
                this.$router.push({
                    path: `/event/${this.$route.params.eventSlug}/`
                });
            }
        },
    },
    created() {

        if(this.$route.params.eventSlug && this.$route.params.eventPratilipiId && this.$route.path.includes('/edit')){
            this.currentStep = 1;
            this.pratilipiId = this.$route.params.eventPratilipiId;
            this.fetchEventDetails(this.$route.params.eventSlug.split("-").pop());
            this.fetchEventPratilipiData(this.pratilipiId);
        } else if (this.$route.params.eventSlug && this.$route.params.eventPratilipiId && this.$route.path.includes('/submit')) {
            this.currentStep = 3;
            this.pratilipiId = this.$route.params.eventPratilipiId;
            this.fetchEventDetails(this.$route.params.eventSlug.split("-").pop());
            this.fetchEventPratilipiData(this.pratilipiId);
        } else if (this.$route.params.eventSlug && this.$route.params.eventPratilipiId) {
            this.currentStep = 2;
            this.pratilipiId = this.$route.params.eventPratilipiId;
        } else {
            this.currentStep = 1;
            this.fetchEventDetails(this.$route.params.eventSlug.split("-").pop());
        }

    },
    mounted() {

    },
    destroyed() {
        window.removeEventListener('scroll', this.updateScroll);
    }
}
</script>

<style lang="scss" scoped>
.step-container {
    width: Auto; margin: 0 auto;
}
.static-page {
    margin-top: 85px;
    text-align: left;
    min-height: 600px;
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
        @media screen and (max-width: 992px ) {
            font-size: 18px;
        }
    }

    // Define vars we'll be using
    $brand-success: #d0021b;
    $loader-size: 7em;
    $check-height: $loader-size/2;
    $check-width: $check-height/2;
    $check-left: ($loader-size/6 + $loader-size/12);
    $check-thickness: 3px;
    $check-color: $brand-success;
    .circle-loader {
        margin: auto;
        margin-top: 30px;
        margin-bottom: $loader-size/2;
        border: 1px solid rgba(0, 0, 0, 0.2);
        border-left-color: $check-color;
        animation: loader-spin 1.2s infinite linear;
        position: relative;
        display: inline-block;
        vertical-align: top;
        border-radius: 50%;
        width: $loader-size;
        height: $loader-size;
    }
    .load-complete {
        -webkit-animation: none;
        animation: none;
        border-color: $check-color;
        transition: border 500ms ease-out;
    }
     .checkmark {
        display: none;
         &.draw:after {
             animation-duration: 800ms;
             animation-timing-function: ease;
             animation-name: checkmark;
             transform: scaleX(-1) rotate(135deg);
        }
         &:after {
             opacity: 1;
             height: $check-height;
             width: $check-width;
             transform-origin: left top;
             border-right: $check-thickness solid $check-color;
             border-top: $check-thickness solid $check-color;
             content: '';
             left: $check-left;
             top: $check-height;
             position: absolute;
        }
    }
     @keyframes loader-spin {
         0% {
             transform: rotate(0deg);
        }
         100% {
             transform: rotate(360deg);
        }
    }
     @keyframes checkmark {
         0% {
             height: 0;
             width: 0;
             opacity: 1;
        }
         20% {
             height: 0;
             width: $check-width;
             opacity: 1;
        }
         40% {
             height: $check-height;
             width: $check-width;
             opacity: 1;
        }
         100% {
             height: $check-height;
             width: $check-width;
             opacity: 1;
        }
    }


    .btn-submit {
        background: #d0021b;
        color: #fff;
        border: 0;
        font-size: 14px;
        float: right;
    }
    .mb-10 {
        margin-bottom: 10px;
    }
    .event-image, .book-image {
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        margin: 0;
        width: 100%;
        height: 100%;
        min-height: 200px;
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

    .tag-sections {
        margin: 10px 0;
        text-align: left;
        .tag-section-title {
            font-size: 16px;
            font-weight: bold;
            padding: 10px 0;
        }
        .tag-section-body {
            font-size: 16px;
            .all-tags {
                display: inline-block;
                background: #fff;
                border: 1px solid #e9e9e9;
                border-radius: 15px;
                color: #212121;
                margin: 5px 4px;
                padding: 5px 10px;
                font-size: 14px;
                cursor: pointer;
                &.active {
                    background: #e9e9e9;
                }
                &.new-tag {
                    i {
                        font-size: 18px;
                        vertical-align: middle;
                        padding-left: 5px;
                    }
                }
            }
            .form-group {
                margin-bottom: 0;
            }
            .form-control {
                font-size: 14px;
            }
            .add-category {
                background: none;
                padding: 0;
                margin-left: 10px;
                i {
                    vertical-align: middle;
                }
            }
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

    .description-input{
        width: 100%;
        border: none;
        border-bottom-width: 2px;
        border-bottom-color: #b2beb5;
        border-bottom-style: solid;
    }

    /* The side navigation menu */
    .sidenav {
        height: 100%; /* 100% Full-height */
        width: 0; /* 0 width - change this with JavaScript */
        position: fixed; /* Stay in place */
        z-index: 101; /* Stay on top */
        top: 0; /* Stay at the top */
        left: 0;
        background-color: #FFF; /* Black*/
        overflow-x: hidden; /* Disable horizontal scroll */
        padding-top: 60px; /* Place content 60px from the top */
        transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
        -webkit-box-shadow: 5px 0px 31px 0px rgba(0,0,0,0.68);
        -moz-box-shadow: 5px 0px 31px 0px rgba(0,0,0,0.68);
        box-shadow: 5px 0px 31px 0px rgba(0,0,0,0.68);

        .chapter-title {
            display: inline-block;
            width: 80%;
        }

        .chapter-delete {
            display: inline-block;
            font-size: 1.2em;
            vertical-align: middle;
            float: right;
            cursor: pointer;
        }

        .chapter-delete:hover {
            color: red;
        }

        .chapter-add {
            text-align: center;
            color: #fff;

            i {
                background: #d0021b;
                display: inline-block;
                clear: both;
                width: 100%;
                border: 1px solid #d0021b;
                border-radius: 3px;
                padding: 5px;
                cursor: pointer;
            }
        }
    }

    /* The navigation menu links */
    .sidenav a {
        padding: 8px 20px 8px 32px;
        text-decoration: none;
        color: #000;
        display: block;
        transition: 0.3s;
        font-size: 0.9em;
    }

    .sidenav a.chapters.selected-chapter{
        background: #DCDCDC;
    }

    /* When you mouse over the navigation links, change their color */
    .sidenav a.chapters:hover {
        background: #DCDCDC;
    }

    /* Position and style the close button (top right corner) */
    .sidenav .closebtn {
        position: absolute;
        top: 0;
        right: 10px;
        font-size: 25px;
        margin-left: 50px;
    }

    /* Style page content - use this if you want to push the page content to the right when you open the side navigation */
    #main {
        transition: margin-left .5s;
        padding: 10px 0;
        .chapter {
            margin: 0 0 20px;
            .follow-btn-w-count {
                color: #fff;
                font-size: 14px;
                position: relative;
                text-align: center;
                display: inline-block;
                clear: both;
                overflow: hidden;
                cursor: pointer;
                float: left;
                @media screen and (max-width: 450px) {
                    margin-bottom: 10px;
                }
                button {
                    background: #d0021b;
                    border: 1px solid #d0021b;
                    border: 1px solid #d0021b;
                    border-top-left-radius: 3px;
                    border-bottom-left-radius: 3px;
                    outline: none;
                    color: #fff;
                    margin: 0;
                    padding: 8px;
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
                    padding: 8px;
                    border-top-right-radius: 3px;
                    border-bottom-right-radius: 3px;
                    b {
                        font-size: 12px;
                    }
                }
            }
            .translate-input-wrapper {
                float: right;
                width: calc(100% - 150px);
                @media screen and (max-width: 450px) {
                    float: none;
                    width: 100%;
                    clear: both;
                }
            }
        }
    }

    /* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
    @media screen and (max-height: 450px) {
        .sidenav {padding-top: 15px;}
        .sidenav a {font-size: 18px;}
    }
    .steps {
        text-align: left;
        position: relative;
        margin: 0 0 20px;
        .step {
            display: inline-block;
            width: 33%;
            z-index: 1;
            position: relative;
            &:after {
                content:'';
                position: absolute;
                width:100%;
                height:2px;
                background-color: #ddd;
                top: 20px;
                left: -50%;
                z-index: -1;
            }
            &:first-child:after {
                content:none;
            }
            p {
                font-size: 12px;
                text-align: center;
                margin: 5px 0;
                line-height: 16px;
            }
            span {
                // display: none;
            }
            i {
                vertical-align: middle;
                font-size: 18px;
                line-height: 40px;
                display: none;
            }
        }
        .step-1 {
            z-index: 4;
        }
        .step-2 {
            z-index: 3;
        }
        .step-3 {
            z-index: 2;
        }
        .step-number {
            width: 40px;
            height: 40px;
            text-align: center;
            font-size: 14px;
            border-radius: 50%;
            line-height: 40px;
            margin: 0 auto;
            background: #e9e9e9;
        }
        .active .step-number {
            background: #d0021b;
            color: #fff;
        }
    }
    .writer-navigation {
        margin: 10px 0;
        .col-6 {
            padding: 0;
            button {
                font-size: 14px;
                background: #9e9e9e;
                color: #fff;
                border: 0;
                box-sizing: none;
                outline: none;
                border-radius: 15px;
                padding: 5px 10px;
                cursor: pointer;
                &.next {
                    background: #d0021b;
                }
                &.save {
                    background: #59546f;
                }
            }
        }
    }
    .writer-wrapper {
        position: relative;
    }
    .word-suggestions {
        margin: 0;
        padding: 5px;
        list-style: none;
        position: absolute;
        bottom: 0;
        left: 0;
        background: #e9e9e9;
        width: 100%;
        border: 1px solid rgba(0,0,0,0.2);
        li {
            display: inline-block;
            padding: 0 5px;
            color: #000;
            background: #fff;
            margin: 4px;
            padding: 5px;
        }
        &.fixed {
            position: fixed;
            margin: 0 15px;
            width: calc(100% - 30px);
        }
    }
    .word-suggestions-dropdown {
        margin: 0;
        padding: 0;
        list-style: none;
        position: absolute;
        background: #fff;
        padding: 5px;
        border: 1px solid #e9e9e9;
        li {
            display: block;
            padding: 5px;
            &.active {
                background: #e9e9e9;
            }
        }
        &.hidden {
            padding: 0;
            border: 0;
        }
    }
    .accepted-msg {
        p {
            width: 100%;
            text-align: center;
            font-size: 14px;
            a {
                color: #d0021b;
            }
        }
    }
    .backdrop {
        background: rgba(0,0,0,0.5);
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 100;
        display: none;
    }
    .drafted-msg {
        font-size: 14px;
        margin: 5px 10px;
    }
    .drafted-items {
        overflow-x: auto;
        white-space: nowrap;
    }
    .validation_error {
        margin: 5px 5px 5px 0;
        font-size: 12px;
        color: #d00b12;
        i {
            font-size: 16px;
            vertical-align: middle;
        }
        span {
            vertical-align: middle;
        }
    }
    .form-control.error {
        border-color: #d00b12;
    }
}
</style>
<style>
p {
    word-break: break-word !important;
}
</style>
