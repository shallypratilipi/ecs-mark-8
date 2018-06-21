<template>
    <!-- Writer Modal -->
    <div class="modal fade writermodal" id="writermodal" tabindex="-1" role="dialog" aria-labelledby="writermodalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="writermodalLabel">__("writer_add_content_title")</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <i class="material-icons">close</i>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label for="pratilipi_write_language">__("writer_select_language")</label>
                            <select class="form-control" id="pratilipi_write_language" v-model="language"  >
                                <option disabled value="">__('writer_select_language')</option>
                                <option :value="eachLanguage.fullName.toUpperCase()"  v-for="eachLanguage in constants.LANGUAGES"  :key="eachLanguage.shortName"> 
                                     {{ eachLanguage.languageNative }}

                                </option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="pratilipi_write_title_input">__("writer_input_title") *</label>
                            <TranslatingInput :value="title" :oninput="updatePrefilledValue" :placeholder="'__("writer_input_title")'"></TranslatingInput>
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
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="agree-terms-conditions">
                            <label class="form-check-label" for="agree-terms-conditions">__("writer_accept_copyright")</label>
                        </div>
                        <a href="/terms-of-service" class="terms-link" target="_blank">__("writer_read_copyright")</a>
                        <button type="button" @click="createPratilipiAndGoToWriter({ title, titleEn, type, language })" class="btn btn-submit">__("writer_to_next_screen")</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import constants from '@/constants';
import { mapGetters, mapActions } from 'vuex'
import TranslatingInput from '@/components/TranslatingInput.vue';

export default {
    data() {
        return {
            constants,
            title: '',
            titleEn: '',
            language: '',
            type: '',
            isCreated: false,
        }
    },
    methods: {
        updatePrefilledValue(value) {
            this.title = value;
        },
        ...mapActions('writepage', [
            'createPratilipiAndGoToWriter'
        ])
    },

      created() {
        this.isCreated = true;
        const currentLocale = process.env.LANGUAGE;
        constants.LANGUAGES.forEach((eachLanguage) => {
            if (eachLanguage.shortName == currentLocale) {
                this.language= eachLanguage.fullName.toUpperCase() ;
            }
        });
    },
    components: {
        TranslatingInput
    },


    watch: {
        language(value) {
            if(!this.isCreated){
             switch(value.toLowerCase()) {

                case 'hindi': window.location="https://hindi.pratilipi.com/create";
                                break;
                case 'bengali': window.location="https://bengali.pratilipi.com/create";
                                break;
                case 'gujarati': window.location="https://gujarati.pratilipi.com/create";
                                break;
                case 'bengali': window.location="https://bengali.pratilipi.com/create";
                                break;
                case 'kannada': window.location="https://kannada.pratilipi.com/create";
                                break;
                case 'malayalam': window.location="https://malayalam.pratilipi.com/create";
                                break;
                case 'marathi': window.location="https://marathi.pratilipi.com/create";
                                break;
                case 'tamil': window.location="https://tamil.pratilipi.com/create";
                                break;
                case 'telugu': window.location="https://telugu.pratilipi.com/create";
                                break;
                }    
            }
            else {
                this.isCreated = false;
            }
                    
        },
    }
    
}
</script>

<style lang="scss" scoped>
.writermodal {
    text-align: left;
    max-width: 800px;
    margin: 50px auto;
    .modal-header {
        padding: 15px 15px 10px;
    }
    .form-group {
        font-size: 14px;
    }
    .form-check label {
        font-size: 12px;
        padding-left: 5px;
    }
    .terms-link {
        font-size: 12px;
        color: #212121;
        border-bottom: 1px solid;
        &:hover {
            text-decoration: none;
        }
    }
    .btn-submit {
        background: #d0021b;
        color: #fff;
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
</style>
