<template>
    <div class="writer-container">
        <div class="static-page page-wrap">
            <div class="container">
                <div id="mySidenav" class="sidenav">
                    <a href="javascript:void(0)" class="closebtn" @click="closeNav">&times;</a>
                    <a class="chapters" :class="{ 'selected-chapter': selectedChapter === index }" v-for="(eachChapter, index) in getContents.index" :key="index">
                        <span class="chapter-title" @click="selectChapter(index)">
                            <span v-if="getContents.index[index].title">{{ decodeURIComponent(getContents.index[index].title)}}</span>
                            <span v-else>__('writer_chapter') &nbsp; &nbsp; {{ index + 1 }}</span>
                        </span>
                        <i class="material-icons chapter-delete" @click="deleteContentChapter(getContents.index[index].chapterNo)">delete</i>
                    </a>

                    <a class="chapter-add" @click="addChapter">
                        <i class="material-icons">add</i>
                    </a>
                </div>
                <!-- Add all page content inside this div if you want the side nav to push page content to the right (not used if you only want the sidenav to sit on top of the page -->
                <div id="main">
                    <div>
                        <div class="row">
                            <div class="col-12 chapter">
                                <div class="follow-btn-w-count" @click="openNav"><!-- Follow Button -->
                                    <button>
                                        <i class="material-icons">list</i>
                                    </button><span><b>__('writer_chapter')</b></span>
                                </div>
                                <TranslatingInput :value="contentTitle" placeholder="__('writer_add_chapter_title')" :oninput="updateTitle"></TranslatingInput>
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
                        <button class="btn btn-info" style="float: right;" @click="autoSaveContents">__("save_changes")</button>

                    </div>
                </div>
                <Spinner v-if="getEventLoadingState === 'LOADING'"></Spinner>
            </div>
            <div class="backdrop"></div>
        </div>
        <input name="image" id="image_input" type="file" accept="image/*" style="display: none;">
        <input type="hidden" id="field_name" value="" />
    </div>
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
            'getEventPratilipiImageUploadLoadingState',
            'getPratilipiOfEvent',
            'getContentIndexLoadingState',
            'getEventChapterCreatingState',
            'getEventChapterDeletingState',
            'getContentUpdatingState'
        ])
    },
    mixins: [
        mixins
    ],
    props: {
        pratilipiId: {
            type: String,
            required: true
        }
    },
    data() {
        return {
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
            content: '',
            contentTitle: '',
            deletingChapterIndex: -1
        }
    },
    methods: {

        ...mapActions('eventparticipate', [
            'fetchEventPratilipiData',
            'createEventPratilipiData',
            'createChapter',
            'deleteChapter',
            'updateEventPratilipiData',
            'updatePratilipiContent',
            'fetchPratilipiContent',
            'updateDescriptionAndTags',
            'fetchEventDetails',
            'uploadEventPratilipiImage',
            'fetchDraftedUserEventPratilipis',
            'fetchPratilipiIndex',
            'saveEventContentByChapter',
            'fetchContentForEventEntry'
        ]),
        ...mapActions('alert', [
            'triggerAlert'
        ]),

        ...mapActions([
            'setAfterLoginAction',
            'setConfirmModalAction'
        ]),
        deleteContentChapter(index) {
            console.log("DELETING" + index);
            let indexLength = this.getContents.index.length;
            if (indexLength === 1) {
                alert('You need to have atleast one chapter');
                return;
            }

            this.deletingChapterIndex = index;
            this.deleteChapter({
                "pratilipiId" : this.pratilipiId,
                "chapterNo" : index,
            });
        },

        updateCurrentTitle(value) {
            this.title = value;
        },

        saveContentAndGoToThirdStep() {
            this.autoSaveContents;
            let url = '/event/' + this.$route.params.eventSlug + '/participate/' + this.pratilipiId + '/submit';
            this.$router.push({
                path: url
            })
        },

        autoSaveContents() {
            console.log("1998: ", this.selectedChapter, this.contentTitle);
            console.log("1998: ", this.content, this.pratilipiId);

            this.saveEventContentByChapter({
                chapterNo: this.selectedChapter + 1,
                chapterTitle: encodeURIComponent(this.contentTitle),
                content:  encodeURIComponent(this.content),
                pratilipiId: this.pratilipiId
            });

            this.triggerAlert({message: '__("writer_changes_saved")', timer: 3000});
        },

        addChapter() {
            this.createChapter({
                "pratilipiId" : this.pratilipiId,
                "chapterNo" : this.getContents.index.length + 1,
            });
        },

        selectChapter(index) {
            console.log("trying to select chapter", index);
            const that = this;
            this.selectedChapter = index;
            this.contentTitle = this.getContents.index[index].title;
            this.fetchPratilipiContent({
                "eventPratilipiId": that.pratilipiId,
                "chapterNo" : index + 1,
            });
            this.closeNav();
        },

        updateTitle(value) {
            this.contentTitle = value;
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
        uploadOnServer(ed) {
            const that =  this;
            console.log("trying to upload on server");
            var field_name = "#" + $( '#field_name' ).val();
            var fd = new FormData();
            var blob = $('#image_input').get(0).files[0];
            fd.append( 'file', blob );
            fd.append( 'pratilipiId', this.pratilipiId);
            fd.append( 'pageNo', this.selectedChapter + 1 );
            let imageUrl = 'https://hindi-devo.ptlp.co/api/pratilipi/content/image?pratilipiId=' + this.pratilipiId + '&pageNo=' + ( this.selectedChapter + 1 );
            $.ajax({
                type:'POST',
                url: imageUrl,
                data: fd,
                cache: true,
                contentType: false,
                processData: false,
                headers: {
                    'accesstoken': this.getCookie('access_token')
                },
                success: function( data ) {
                    console.log("data recieved is ", JSON.stringify(data));
                    $('#image_input').val("");
                    $( field_name ).val( data.url );
                    // https://hindi.pratilipi.com/api/pratilipi/content/image?pratilipiId=6755373518925316&name=cf14122b-24e3-45b1-b216-4ba80a7d33f5
                    ed.insertContent('<img src="https://hindi-devo.ptlp.co/api/pratilipi/content/image?pratilipiId='+that.pratilipiId +'&name='+data.name+'"/>');
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
                entity_encoding: 'raw',

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
                    fd.append( 'pratilipiId', that.pratilipiId);
                    fd.append( 'pageNo', that.selectedChapter + 1 );
                    let imageUrl = 'https://hindi-devo.ptlp.co/api/pratilipi/content/image?pratilipiId=' + that.pratilipiId + '&pageNo=' + ( that.selectedChapter + 1 );
                    $.ajax({
                        type:'POST',
                        url: imageUrl,
                        data: fd,
                        cache: true,
                        contentType: false,
                        processData: false,
                        success: function( data ) {
                            console.log("data recieved is ", JSON.stringify(data));
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
                    console.log("calling image callback");
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

                    $('#image_input').on( "change", function() {
                        that.uploadOnServer(ed);
                    });

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
                        that.content = tinymce.activeEditor.getContent({format : 'raw'});

                        if (event.code === 'Space' || event.code === 'Enter' || (event.code === 'ArrowDown' && that.suggestions.length > 0) || (event.code === 'ArrowUp' && that.suggestions.length > 0)) {
                            return;
                        }

                        const words = event.target.innerText.split(/\n| |\u00A0/).map(function(item) {
                            return item.trim();
                        });

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

                    });

                    ed.on('init', (event) => {
                        tinymce.activeEditor.setContent(that.getContents.content);
                    });

                    ed.on('dirty', (event) => {
                        console.log('dirty');
                        setTimeout(() => {
                            that.autoSaveContents
                            tinymce.triggerSave();
                        }, 2000);
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

        'getContentLoadingState'(state) {
            if (state === 'LOADING_SUCCESS') {
                this.content = this.getContents.content;
                let editor = tinymce.activeEditor;
                console.log("content loaded", this.content);
                if(editor){
                    editor.setContent(this.content);
                }
            }
        },

        'getContentIndexLoadingState'(state) {
            if (state === 'LOADING_SUCCESS') {
                console.log("index is ", this.getContents.index);
                if ( this.getContents.index.length == 0 ) {
                    this.createChapter({pratilipiId: this.pratilipiId , chapterNo: 1});
                } else {
                    this.contentTitle = this.getContents.index[0].title
                }
            }
        },

        'getEventLoadingState'(state) {
            if (state === 'LOADING_ERROR') {
                alert('Invalid event id');
                this.$router.push('/event');
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
        },

        'getEventChapterCreatingState'(state){
            if(state === 'LOADING_SUCCESS'){
                this.selectedChapter = this.getContents.index.length - 1;
                this.contentTitle = "";
                let editor = tinymce.activeEditor;
                if (editor) {
                    editor.setContent("");
                }
            }
        },
        'getEventChapterDeletingState'(state){
            if (state === 'LOADING_SUCCESS') {
                if (this.selectedChapter == this.deletingChapterIndex) {
                    this.selectedChapter = this.selectedChapter - 1;
                }
            }
        },
        'getContentUpdatingState'(state){

        }
    },
    created() {
        const that = this;
        this.loadTinyMCE(() => {

            that.initializeTinyMCE();

            that.fetchPratilipiIndex(that.pratilipiId);
            that.fetchEventPratilipiData(that.pratilipiId);
            that.fetchPratilipiContent({
                "eventPratilipiId": that.pratilipiId,
                "chapterNo" :1
            });


            that.checkWordSuggester();

            $('.backdrop').click(() => {
                that.closeNav();
            });

            // Hide Footer when keyboard comes
            if (that.isMobile()) {
                $(document).on('focus', 'input', function() {
                    that.inputInFocus = true;
                });
                $(document).on('blur', 'input', function() {
                    that.inputInFocus = false;
                });
            }

            window.addEventListener('scroll', that.updateScroll);
            setTimeout(() => {
                that.checkWordSuggester();
            }, 500);

        });
    },
    mounted() {

    },
    destroyed() {
        this.autoSaveContents;
        window.removeEventListener('scroll', this.updateScroll);
    }
}
</script>

<style lang="scss" scoped>
.writer-container {
    margin-bottom: -90px;
}
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
