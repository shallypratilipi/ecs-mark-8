<template>
    <MainLayout>
        <div class="static-page page-wrap">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="head-title">{{ getEventData.name }}</div>
                    </div>
                </div>
                <div class="row" v-if="getDraftedEventPratilipi.length > 0 && getEventLoadingState === 'LOADING_SUCCESS' && currentStep === 1 && !$route.params.eventPratilipiId">
                    <div  class="col-md-12">
                        <p class="drafted-msg">__('event_participate_drafted_item_edit')</p>
                        <div class="drafted-items">
                            <UserEventPratilipiComponent
                                :pratilipiData="{
                                    title: pratilipiData.title,
                                    coverImageUrl: pratilipiData.coverImageUrl || 'https://0.ptlp.co/pratilipi/cover',
                                    type: pratilipiData.type,
                                    description: pratilipiData.description,
                                    createdAt: pratilipiData.createdAt
                                }"
                                @click.native="goToSecondStepToEdit(pratilipiData.eventId, pratilipiData._id)"
                                :key="pratilipiData._id"
                                v-for="pratilipiData in getDraftedEventPratilipi"
                                :isEventParticipatePage="true"
                                ></UserEventPratilipiComponent>
                        </div>
                    </div>
                </div>
                <div id="mySidenav" class="sidenav">
                    <a href="javascript:void(0)" class="closebtn" @click="closeNav">&times;</a>
                    <a class="chapters" :class="{ 'selected-chapter': selectedChapter === index }" v-for="(eachChapter, index) in chapters" :key="index">
                        <span class="chapter-title" @click="selectChapter(index)">
                            <span v-if="chapters[index].title">{{chapters[index].title}}</span>
                            <span v-else>__('writer_chapter') &nbsp; &nbsp; {{ index + 1 }}</span>
                        </span>
                        <i class="material-icons chapter-delete" @click="deleteChapter(index)">delete</i>
                    </a>

                    <a class="chapter-add" @click="addChapter">
                        <i class="material-icons">add</i>
                    </a>
                </div>
                <!-- Add all page content inside this div if you want the side nav to push page content to the right (not used if you only want the sidenav to sit on top of the page -->
                <div id="main" v-show="getEventLoadingState === 'LOADING_SUCCESS'">
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
                        <div class="step step-4" :class="{ active: currentStep === 4 }">
                            <div class="step-number">
                                <span>4</span>
                                <i class="material-icons">check</i>
                            </div>
                            <p>__("writer_finish")</p>
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
                                <button class="next" @click="createEventPratilipi">__("writer_to_next_screen")</button>
                            </div>
                        </div>
                    </div>


                    <div v-if="currentStep == 2">
                        <div class="row">
                            <div class="col-12 chapter">
                                <div class="follow-btn-w-count" @click="openNav"><!-- Follow Button -->
                                    <button>
                                        <i class="material-icons">list</i>
                                    </button><span><b>__('writer_chapter')</b></span>
                                </div>
                                <TranslatingInput :value="chapters[selectedChapter].title" placeholder="__('writer_add_chapter_title')" :oninput="updateTitle"></TranslatingInput>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="writer-wrapper">
                                    <!-- Use any element to open the sidenav -->
                                    <div class="writer-area" contenteditable="true"></div>
                                    <ul class="word-suggestions-dropdown" :class="{hidden: suggestions.length === 0}">
                                        <li :class="{ active: index === selectedSuggestion }" @click="selectSuggestion(eachSuggestion)" :key="index" v-for="(eachSuggestion, index ) in suggestions">{{ eachSuggestion }}</li>
                                    </ul>

                                    <ul class="word-suggestions" v-if="false">
                                        <li @click="selectSuggestion(eachSuggestion)" :key="index" v-for="(eachSuggestion, index ) in suggestions">{{ eachSuggestion }}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="row writer-navigation">
                            <div class="col-6">
                                <button class="prev" @click="goToFirstStepForEdit">__("back")</button>
                            </div>
                            <div class="col-6 text-right">
                                <button class="next" @click="saveContentAndGoToThirdStep">__("writer_to_next_screen")</button>
                            </div>
                        </div>
                    </div>

                    <div v-if="currentStep == 3">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="book-image" v-bind:style="{ backgroundImage: 'url(' + getEventPratilipiCoverImage + ')' }">
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

                                <!-- <div class="tag-sections">
                                    <div class="head-title">__("tags_categories")</div>
                                    <div class="tag-section-body">
                                        <span class="all-tags active" v-for="each_tag in pratilipiData.tags" :key="each_tag.id">{{ each_tag.name}}</span>
                                        <span class="all-tags"
                                            v-for="each_tag in [ {id: 1, name: 'test1'}, {id: 2, name: 'test2'}, {id: 3, name: 'test3'}, {id: 4, name: 'test4'} ]"
                                            :key="each_tag.id">{{ each_tag.name }}</span>
                                    </div>
                                </div> -->
                            </div>

                        </div>
                        <div class="row writer-navigation">
                            <div class="col-6">
                                <button class="prev" @click="goToSecondStepForEdit">__("back")</button>
                            </div>
                            <div class="col-6 text-right">
                                <button class="next" @click="saveMetaInformationAndFinalSubmit">__('event_participate_finish')</button>
                            </div>
                        </div>
                    </div>

                    <div v-if="currentStep == 4">
                        <div class="row">
                            <div class="circle-loader">
                                <div class="checkmark draw"></div>
                            </div>
                        </div>
                        <div class="row accepted-msg" v-if="showAcceptedMessage">
                            <div class="col-12">
                                <p>__('event_participate_accepted_message')</p>
                                <p><router-link :to="getEventData.pageUrl + '#yourEntries'">__('event_participate_check_your_entry_here')</router-link></p>
                            </div>
                        </div>
                    </div>

                </div>
                <Spinner v-if="getEventLoadingState === 'LOADING'"></Spinner>
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
import { mapGetters, mapActions } from 'vuex'

export default {
    components: {
        MainLayout,
        TranslatingInput,
        Spinner,
        UserEventPratilipiComponent
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
            'getEventData',
            'getEventLoadingState',
            'getDraftedEventPratilipiLoadingState',
            'getDraftedEventPratilipi',
            'getEventPratilipiCoverImage',
            'getEventPratilipiImageUploadLoadingState'
        ])
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
            titleIsMissing: false
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
            'fetchDraftedUserEventPratilipis'
        ]),

        ...mapActions([
            'setAfterLoginAction',
            'setConfirmModalAction'
        ]),

        updateCurrentTitle(value) {
            this.title = value;
        },

        createEventPratilipi() {
            // this.currentStep = 2;

            if (!this.title || this.title.trim() === '') {
                this.titleIsMissing = true;
                return;
            }

            this.titleIsMissing = false;
            if (this.getUserDetails.isGuest) {
                const { eventId } = this.getEventData;
                this.setAfterLoginAction({ action: `eventparticipate/createEventPratilipiData`, data: {
                    eventId,
                    title: this.title.trim(),
                    titleEn: this.titleEn,
                    type: this.type,
                    language: this.getCurrentLanguage().fullName.toUpperCase()
                }});
                this.openLoginModal(this.$route.meta.store, 'EVENTPARTICIPATECREATE', 'EVENTPARTICIPATE');
                return;
            }


            if(this.$route.params.eventSlug && this.$route.params.eventPratilipiId) {
                this.updateEventPratilipiData({
                    eventPratilipiId: this.$route.params.eventPratilipiId,
                    title: this.title,
                    titleEn: this.titleEn,
                    type: this.type
                });
            } else {
                const { eventId } = this.getEventData;
                this.createEventPratilipiData({
                    eventId,
                    title: this.title,
                    titleEn: this.titleEn,
                    type: this.type,
                    language: this.getCurrentLanguage().fullName.toUpperCase()
                });
            }
        },

        saveContentAndGoToThirdStep() {
            this.updatePratilipiContent({ eventPratilipiId: this.$route.params.eventPratilipiId, contents: this.chapters });
            this.$router.push({
                query: { step : 3 }
            });
        },

        autoSaveContents() {
            this.updatePratilipiContent({ eventPratilipiId: this.$route.params.eventPratilipiId, contents: this.chapters });
        },

        saveMetaInformationAndFinalSubmit() {
            // this.updateDescriptionAndTags({ eventPratilipiId: this.$route.params.eventPratilipiId, description: this.description, state: 'SUBMITTED' });

            this.setConfirmModalAction({
                action: `eventparticipate/updateDescriptionAndTags`,
                heading: 'event_participate_confirm_submission',
                message: 'event_participate_cannot_change_drafts',
                data: { eventPratilipiId: this.$route.params.eventPratilipiId, description: this.description || '', state: 'SUBMITTED' }
            });
            this.openPrimaryConfirmationModal();
        },

        goToFirstStep() {
            $('.circle-loader').removeClass('load-complete');
            $('.checkmark').hide();
            this.currentStep = 1;
        },

        goToFirstStepForEdit() {
            this.$router.push({
                path: `/event/${this.$route.params.eventSlug}/participate/${this.$route.params.eventPratilipiId}?step=1`,
                params: {
                    eventId: this.getEventData.eventId
                }
            });
        },

        goToSecondStepForEdit() {
            this.$router.push({
                query: { step : 2 }
            });
        },

        goToSecondStep() {
            $('.circle-loader').removeClass('load-complete');
            $('.checkmark').hide();
            this.currentStep = 2;
        },

        goToThirdStep() {
            $('.circle-loader').removeClass('load-complete');
            $('.checkmark').hide();
            this.currentStep = 3;
        },

        goToFourthStep() {
            const that = this;
            this.currentStep = 4;
            setTimeout(() => {
                $('.circle-loader').addClass('load-complete');
                $('.checkmark').show();
                that.showAcceptedMessage = true;
            }, 1000);
        },

        goToSecondStepToEdit(eventId, pratilipiEventId) {
            console.log(`/event/${this.$route.params.eventSlug}/participate/${pratilipiEventId}?step=2`)
            this.$router.push({
                path: `/event/${this.$route.params.eventSlug}/participate/${pratilipiEventId}?step=2`
            });
        },

        addChapter() {
            this.chapters.push({
                title: '',
                content: ''
            });
            this.selectedChapter = this.chapters.length - 1;
            tinymce.activeEditor.setContent(this.chapters[this.selectedChapter].content);

        },

        uploadCoverImage() {
            $('#pratilipiimage-uploader').click();
        },

        triggerPratilipiImageUpload(event) {
            const formData = new FormData();
            formData.append('file', event.target.files[0], event.target.files[0].name);
            formData.append('eventPratilipiId', this.getEventPratilipiData._id);
            this.uploadEventPratilipiImage(formData);
        },

        selectChapter(index) {
            this.selectedChapter = index;
            tinymce.activeEditor.setContent(this.chapters[index].content);
            this.closeNav();
        },

        updateTitle(value) {
            this.chapters[this.selectedChapter].title = value;
        },

        deleteChapter(index) {
            if (this.chapters.length === 1) {
                alert('You need to have atleast one chapter');
                return;
            }

            // if (index === this.chapters.length) {}
            if (index === this.chapters.length - 1) {
                this.selectedChapter = index - 1;
            }

            if (this.selectedChapter >= this.chapters.length - 1) {
                this.selectedChapter = this.selectedChapter - 1;
            }

            this.chapters.splice(index, 1);
        },

        openNav() {
            document.getElementById("mySidenav").style.width = "250px";
            $(".backdrop").fadeIn();
        },

        /* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
        closeNav() {
            document.getElementById("mySidenav").style.width = "0";
            document.getElementById("main").style.marginLeft = "0";
            $(".backdrop").hide();
        },
        uploadOnServer() {
            var field_name = "#" + $( '#field_name' ).val();
            var fd = new FormData();;
            var blob = $('#image_input').get(0).files[0];
            fd.append( 'file', blob );
            fd.append( 'eventPratilipiId', this.getEventPratilipiData._id );
            // fd.append( 'pratilipiId', pratilipiId );
            // fd.append( 'pageNo', cur_page );

            $.ajax({
                type:'POST',
                url: `https://gamma.pratilipi.com/event-participate/images?type=CONTENT`,
                data: fd,
                cache: true,
                contentType: false,
                processData: false,
                headers: {
                    'accesstoken': this.getCookie('access_token')
                },
                success: function( data ) {
                    $('#image_input').val("");
                    $( field_name ).val( data.url );
                },
                error: function( data ) {
                    alert( 'HTTP Error: ' + data.status );
                    return;
                }
            });
        },
        arr_diff(a1, a2) {

            var a = [], diff = [];

            for (var i = 0; i < a1.length; i++) {
                a[a1[i]] = true;
            }

            for (var i = 0; i < a2.length; i++) {
                if (a[a2[i]]) {
                    delete a[a2[i]];
                } else {
                    a[a2[i]] = true;
                }
            }

            for (var k in a) {
                diff.push(k);
            }

            return diff;
        },

        selectSuggestion(suggestion, fromSpace) {
            const editorRange = tinymce.activeEditor.selection.getRng();
            var node = editorRange.commonAncestorContainer; // relative node to the selection
            const range = document.createRange(); // create a new range object for the deletion
            range.selectNodeContents(node);

            if (fromSpace) {
                range.setStart(node, editorRange.endOffset - this.wordToTranslate.length); // current caret pos - 3
            } else {
                range.setStart(node, editorRange.endOffset - this.wordToTranslate.length); // current caret pos - 3
            }

            range.setEnd(node, editorRange.endOffset); // current caret pos
            range.deleteContents();

            // tinymce.activeEditor.focus();
            const suggestionNode = document.createTextNode(suggestion);
            const spaceNode = document.createTextNode('\u00A0');
            editorRange.insertNode(spaceNode);
            editorRange.insertNode(suggestionNode);
            this.lastTranslatedWord = suggestion;

            tinymce.activeEditor.focus();
            tinymce.activeEditor.selection.select(spaceNode, true);
            tinymce.activeEditor.selection.collapse(false);
            this.suggestions = [];
        },

        setAndLocateSuggestionDropdown() {
            const ed = tinymce.activeEditor;
            var tinymcePosition = $(ed.getContainer()).position();
            var toolbarPosition = $(ed.getContainer()).find(".mce-toolbar").first();

            var nodePosition = $(ed.selection.getNode()).position();
            var textareaTop = 0;
            var textareaLeft = 0;

            if (ed.selection.getRng().getClientRects().length > 0) {
                textareaTop = ed.selection.getRng().getClientRects()[0].top + ed.selection.getRng().getClientRects()[0].height;
                textareaLeft = ed.selection.getRng().getClientRects()[0].x;
            } else {
                textareaTop = parseInt($(ed.selection.getNode()).css("font-size")) + nodePosition.top;
                textareaLeft = nodePosition.left;
            }

            var position = $(ed.getContainer()).offset();
            var caretPosition = {
                top:  tinymcePosition.top + toolbarPosition.innerHeight() + textareaTop,
                left: textareaLeft
            }
            $(".word-suggestions-dropdown").css("top", caretPosition.top + 10);

            const suggesterWidth = $(".word-suggestions-dropdown").width();
            if ((suggesterWidth + caretPosition.left) >= ($(window).width() - 35)) {
                $(".word-suggestions-dropdown").css("left", "auto");
                $(".word-suggestions-dropdown").css("right", "0");
            }
            else {
                $(".word-suggestions-dropdown").css("left", caretPosition.left);
                $(".word-suggestions-dropdown").css("right", "auto");
            }
        },

        initializeTinyMCE() {
            const that = this;
            tinymce.init({
                selector: '.writer-area',  // change this value according to your HTML,
                // inline: true,
                block_formats: 'Paragraph=p;',
                plugins: ['autoresize autolink lists link image', 'paste'],
                menubar: false,
                statusbar: false,
                toolbar: 'bold italic underline | CustomLeftAlign CustomCenterAlign CustomRightAlign | CustomBlockquote link imageCustom | Ulist Olist',
                // height: '50vh',
                // min_height: '600',
                language: process.env.LANGUAGE,
                link_context_toolbar: false,
                anchor_bottom: false,
                anchor_top: false,
                default_link_target: "_blank",
                allow_unsafe_link_target: false,
                target_list: false,
                link_title: false,
                paste_data_images: true,
                paste_as_text: false,
                paste_auto_cleanup_on_paste: true,
                paste_webkit_styles: "none",
                paste_remove_styles_if_webkit: false,
                paste_text_linebreaktype: "p",

                browser_spellcheck: false,
                allow_conditional_comments: false,
                allow_html_in_named_anchor: false,

                forced_root_block: 'p',
                force_br_newlines: false,
                force_p_newlines: true,
                remove_trailing_brs: false,
                autoresize_min_height: 300,
                autoresize_bottom_margin: 100,

                formats: {
                    bold:
                    {
                        inline: 'b',
                        exact: true
                    },
                    italic:
                    {
                        inline: 'i',
                        exact: true
                    },
                    underline:
                    {
                        inline: 'u',
                        exact: true
                    },
                    blockquote:
                    {
                        block: 'blockquote'
                    },
                    img:
                    {
                        block: 'img'
                    },
                    alignleft:
                    {
                        selector: 'p,li',
                        styles:
                        {
                            textAlign: 'left'
                        }
                    },
                    aligncenter:
                    {
                        selector: 'p,li',
                        styles:
                        {
                            textAlign: 'center'
                        }
                    },
                    alignright:
                    {
                        selector: 'p,li',
                        styles:
                        {
                            textAlign: 'right'
                        }
                    },
                },
                images_upload_handler: function( blobInfo, success, failure ) {
                    var fd = new FormData();
                    fd.append( 'file', blobInfo.blob() );
                    fd.append( 'eventPratilipiId', that.getEventPratilipiData._id );
                    $.ajax({
                        type:'POST',
                        url: `https://gamma.pratilipi.com/event-participate/images?type=CONTENT`,
                        data: fd,
                        cache: true,
                        contentType: false,
                        processData: false,
                        success: function( data ) {
                            var parsed_data = JSON.parse( data );
                            _this.parent_object.setNewImageFlag( true );
                            success( parsed_data.url );
                        },
                        error: function( data ) {
                            alert( 'HTTP Error: ' + data.status );
                            return;
                        }
                    });
                },
                file_browser_callback: function( field_name, url, type, win ) {
                    if( type=='image' ) {
                        $( '#field_name' ).val( field_name );
                        $( "#image_input" ).click();
                    }
                },
                paste_postprocess: function( plugin, args ) {
                    $( args.node ).find( "a:has(img)" ).replaceWith( function() {
                        return $(this).find( "img" );
                    });
                    $( args.node ).find( "div" ).replaceWith( function() {
                        if( $(this).text().length ) {
                            return "<p>" + $(this).html() + '</p>';
                        } else {
                            return "";
                        }
                    });
                    $( args.node ).find( "h1,h2,h3,h4,h5,h6" ).replaceWith( function() {
                        if( $(this).text().length ) {
                            if( $(this).closest( "p,blockquote,li" ).length ) {
                                return "<b>" + $(this).html() + '</b>';
                            } else {
                                return "<p><b>" + $(this).html() + "</b></p>";
                            }
                        } else {
                            return "";
                        }
                    });
                },
                setup: function(ed) {
                    if(that.isMobile()) {
                        ed.on("focus", function(event) {
                            that.writerInFocus = true;
                        });
                        ed.on("blur", function(event) {
                            that.writerInFocus = false;
                        });
                    }

                    ed.on('keydown', (event) => {

                        if (event.code === 'Escape') {
                            that.suggestions = [];
                            that.selectedSuggestion = 0;
                        }

                        if (event.code === 'Space' || event.code === 'Enter') {
                            if (that.suggestions.length > 0) {
                                that.selectSuggestion(that.suggestions[that.selectedSuggestion], true);
                                event.preventDefault();
                            }
                            that.suggestions = [];
                            that.selectedSuggestion = 0;
                        }

                        if (event.code === 'ArrowDown' && that.suggestions.length > 0) {
                            event.preventDefault();
                            if (that.selectedSuggestion + 1 >= that.suggestions.length) {
                                return;
                            }
                            that.selectedSuggestion++;
                        }

                        if (event.code === 'ArrowUp' && that.suggestions.length > 0) {
                            event.preventDefault();
                            if (that.selectedSuggestion - 1 < 0) {
                                return;
                            }
                            that.selectedSuggestion--;
                        }

                    });

                    ed.on("mousedown", () => {
                        that.suggestions = [];
                        that.selectedSuggestion = 0;
                    });

                    ed.on("keyup", function(event){
                        that.setAndLocateSuggestionDropdown();
                        that.chapters[that.selectedChapter].content = tinymce.activeEditor.getContent();

                        if (event.code === 'Space' || event.code === 'Enter' || (event.code === 'ArrowDown' && that.suggestions.length > 0) || (event.code === 'ArrowUp' && that.suggestions.length > 0)) {
                            return;
                        }

                        const words = event.target.innerText.split(/\n| |\u00A0/).map(function(item) {
                            return item.trim();
                        });


                        // console.log('---------------------------------');
                        // console.log('OLD LIST:', [...that.wordList]);
                        // console.log('NEW LIST:', words);
                        // console.log('DIFF: ', that.arr_diff(words, that.wordList));

                        const changedWords = that.arr_diff(words, that.wordList);
                        if (changedWords.length === 0) {
                            // that.suggestions = [];
                        } else if (changedWords.length > 0 && changedWords[0] === '') {
                            that.suggestions = [];
                        } else if( that.lastTranslatedWord === changedWords[0]) {
                            //
                        } else {
                            const wordToTranslate = changedWords[0];
                            that.wordToTranslate = wordToTranslate;
                            that.translateWord(changedWords[0], (suggestions) => {
                                suggestions.push(wordToTranslate);
                                that.selectedSuggestion = 0;
                                that.suggestions = suggestions;
                            });
                        }
                        // console.log('---------------------------------');

                        that.wordList = [ ...words ];


                        // console.log(caretPosition);
                        // console.log(event.code);
                        // console.log($(tinymce.activeEditor.selection.getNode()).text());
                        // console.log(tinymce.activeEditor.selection.getEnd());
                        // console.log(tinymce.activeEditor.selection.getRng());
                        // // console.log($(ed.getContainer()).position());
                        // const range = tinymce.activeEditor.selection.getRng()
                        // console.log($(tinymce.activeEditor.selection.getNode()).position());
                        // console.log($(tinymce.activeEditor.selection.getNode()).width());
                        // console.log(range);
                        // range.insertNode($('.suggestion').get(0));

                    });

                    ed.on('init', (event) => {
                        console.log(that.chapters[that.selectedChapter]);
                        console.log('CHAPTERS: ', that.chapters);
                        tinymce.activeEditor.setContent(that.chapters[that.selectedChapter].content);
                    });

                    ed.on('dirty', (event) => {
                        console.log('dirty');
                        setTimeout(() => {
                            console.log('setting dirty');
                            // ed.setDirty(true);
                            that.autoSaveContents();
                            tinymce.triggerSave();
                        }, 20000);
                    });

                    ed.addButton('CustomLeftAlign', {
                        icon: 'mce-ico mce-i-alignleft',
                        tooltip: "Align left",
                        cmd: "JustifyLeft",
                        onpostrender: monitorAlignmentChange
                    });
                    ed.addButton('CustomCenterAlign', {
                        icon: 'mce-ico mce-i-aligncenter',
                        tooltip: "Align center",
                        cmd: "JustifyCenter",
                        onpostrender: monitorAlignmentChange
                    });
                    ed.addButton('CustomRightAlign', {
                        icon: 'mce-ico mce-i-alignright',
                        tooltip: "Align right",
                        cmd: "JustifyRight",
                        onpostrender: monitorAlignmentChange
                    });
                    ed.addButton('imageCustom', {
                        icon: 'image',
                        tooltip: "Insert/edit image",
                        cmd: "mceImage",
                        onpostrender: monitorImageChange
                    });

                    function monitorImageChange() {
                        var btn = this;
                        ed.on('NodeChange', function(e) {
                            var parents = e.parents.map(lowercasedElemName);
                            btn.disabled(parents.includes("blockquote") ||
                                parents.includes("li") ||
                                parents.includes("u") ||
                                parents.includes("i") ||
                                parents.includes("b") ||
                                parents.includes("a"));
                        });
                    }

                    function lowercasedElemName(elem) {
                        return elem.nodeName.toLowerCase();
                    }

                    function monitorAlignmentChange() {
                        var btn = this;
                        ed.on('NodeChange', function(e) {
                            var parents = e.parents.map(lowercasedElemName);
                            btn.disabled(parents.includes("blockquote") || parents.includes("img"));
                        });
                    }
                },
                valid_elements : 'p[style],img[src|width|height],blockquote,b,i,u,a[href|target=_blank],br,b/strong,i/em,ol,ul,li',
                extended_valid_elements: 'img[src|width|height],p[style],blockquote,ul,ol,li[style],a[href|target=_blank],br',
                valid_children : 'body[p|img|blockquote|ol|ul],-body[br],p[b|i|u|a[href]|br],-p[img],blockquote[b|i|u|a[href]|br],-blockquote[blockquote|img|p],ol[li],ul[li],-ul[ul|ol|img],li[b|i|u|a[href]|br],-li[img|blockquote|p]',
                invalid_elements : "div",
                valid_styles: { 'p': 'text-align', 'li': 'text-align' },

                image_description: false,
                image_dimensions: false
            });
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
        loadTinyMCE(callback) {
            const script = document.createElement('script');
            // script.setAttribute('async', '');
            // script.setAttribute('defer', '');
            // script.id = 'tinymcescript';
            script.setAttribute('src', 'https://0.ptlp.co/third-party/tinymce-4.5.1/tinymce.min.js');
            console.log(script);
            script.onload = function() {
                document.getElementsByTagName('head')[0].appendChild(script);
                console.log('loading tinymce');
                callback();
            }

            document.head.appendChild(script);
        }
    },
    watch: {
        'currentStep'(stepNumber){
            if (stepNumber === 2) {
                setTimeout(( ) => {
                    this.initializeTinyMCE()
                }, 10);
            } else {
                tinymce.remove();
            }
        },
        'getEventPratilipiCreateOrUpdateStateSuccess'(state) {
            if (state === 'LOADING_SUCCESS') {
                this.$router.push({
                    path: `/event/${this.$route.params.eventSlug}/participate/${this.getEventPratilipiData._id}`,
                    query: {
                        step: 2
                    }
                });
            }
        },
        'getEventPratilipiLoadingState'(state) {
            if (state === 'LOADING_SUCCESS') {
                this.title = this.getEventPratilipiData.title;
                this.titleEn = this.getEventPratilipiData.titleEn;
                this.type = this.getEventPratilipiData.type;
                this.description = this.getEventPratilipiData.description;
            }

            if (state === 'LOADING_ERROR') {
                this.$router.push({
                    path: `/event/${this.$route.params.eventSlug}/participate/`
                })
            }
        },

        'getEventPratilipDescUpdateState'(state) {
            if (state === 'LOADING_SUCCESS') {
                this.$router.push({
                    query: { step : 4 }
                });
            }
        },

        'getContentLoadingState'(state) {
            const that = this;
            function compare(a,b) {
                if (a.chapterNo < b.chapterNo)
                    return -1;
                if (a.chapterNo > b.chapterNo)
                    return 1;
                return 0;
            }
            if (state === 'LOADING_SUCCESS') {


                const tempChapters = [ ...this.getContents ];
                tempChapters.sort(compare);

                that.chapters = [];
                tempChapters.forEach((eachChapter) => {
                    that.chapters.push({
                        title: eachChapter.chapterTitle,
                        content: eachChapter.content
                    });
                });

                if (that.chapters.length === 0) {
                    this.chapters.push({
                        title: '',
                        content: ''
                    });
                }
                const activeEditor = tinymce.activeEditor;
                if(activeEditor) activeEditor.setContent(this.chapters[this.selectedChapter].content);
            }
        },
        '$route.query.step'(step) {

            if (!step) {
                this.goToFirstStep();
            }


            if (step == 2) {
                this.fetchPratilipiContent(this.$route.params.eventPratilipiId);
                this.goToSecondStep();
                setTimeout(() => {
                    this.checkWordSuggester();
                }, 500);
            }
            this.fetchEventPratilipiData(this.$route.params.eventPratilipiId);

            if (step == 1) {
                console.log(this.$route.params);
                if (this.$route.params.eventSlug != undefined && this.$route.params.eventPratilipiId != undefined) {
                    this.fetchEventPratilipiData(this.$route.params.eventPratilipiId);
                    this.goToFirstStep();
                }
            }

            if (step == 3) {
                this.goToThirdStep();
            }

            if (step == 4) {
                this.goToFourthStep();
            }
        },

        'getEventLoadingState'(state) {
            if (state === 'LOADING_ERROR') {
                alert('Invalid event id');
                this.$router.push('/event');
            }

            if (state === 'LOADING_SUCCESS') {
                this.fetchDraftedUserEventPratilipis(this.getEventData.eventId);
            }
        },

        'writerInFocus'(inFocus) {
            if (inFocus || this.inputInFocus) {
                $(".footer-menu").css("height", "0")
            } else {
                $(".footer-menu").css("height", "51px")
            }
        },
        'inputInFocus'(inFocus) {
            if (inFocus || this.writerInFocus) {
                $(".footer-menu").css("height", "0")
            } else {
                $(".footer-menu").css("height", "51px")
            }
        },
        'scrollPosition'(newScrollPosition) {
            this.checkWordSuggester();
        }
    },
    created() {
        this.chapters.push({
            title: '',
            content: ''
        });


        this.loadTinyMCE(() => {
            this.fetchEventDetails(this.$route.params.eventSlug);
            console.log('FROM PARTICIPATE PAGE: ', this.$route.params);
            if (!this.$route.params.eventPratilipiId) {
                this.currentStep = 1;
            }


            if (this.$route.params.eventSlug && this.$route.params.eventPratilipiId && this.$route.query.step == 2) {
                this.fetchPratilipiContent(this.$route.params.eventPratilipiId);
                this.fetchEventPratilipiData(this.$route.params.eventPratilipiId);
                this.goToSecondStep();
            }
            if (this.$route.params.eventSlug != undefined && this.$route.params.eventPratilipiId != undefined && this.$route.query.step == 1) {
                this.fetchEventPratilipiData(this.$route.params.eventPratilipiId);
                this.goToFirstStepForEdit();
            }

            if (this.$route.params.eventSlug != undefined && this.$route.params.eventPratilipiId != undefined && this.$route.query.step == 3) {
                this.fetchEventPratilipiData(this.$route.params.eventPratilipiId);
                this.goToThirdStep();
            }

            if (this.$route.params.eventSlug != undefined && this.$route.params.eventPratilipiId != undefined && this.$route.query.step == 4) {
                this.goToFourthStep();
            }
        });
    },
    mounted() {
        const that = this;

        $('.backdrop').click(() => {
            this.closeNav();
        });

        $('#image_input').on( "change", function() {
            that.uploadOnServer();
        });

        // Hide Footer when keyboard comes
        if (this.isMobile()) {
            $(document).on('focus', 'input', function() {
                that.inputInFocus = true;
            });
            $(document).on('blur', 'input', function() {
                that.inputInFocus = false;
            });
        }

        window.addEventListener('scroll', this.updateScroll);
        setTimeout(() => {
            this.checkWordSuggester();
        }, 500);
    },
    destroyed() {
        window.removeEventListener('scroll', this.updateScroll);
    }
}
</script>

<style lang="scss" scoped>
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
            width: 25%;
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
