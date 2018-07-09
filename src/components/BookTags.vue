<template>
    <div class="card">
        <div class="tags-section" v-if="pratilipiData.hasAccessToUpdate">
            <div class="head-title">__("tags_categories") <button class="edit" @click="showTags"><i class="material-icons">mode_edit</i></button></div>
            <div class="tags">
                <span v-for="each_tag in pratilipiData.tags" :key="each_tag.id">{{ each_tag.name}}</span>
                <span v-for="(each_tag, index) in pratilipiData.suggestedTags" :key="index">{{ each_tag }}</span>
            </div>
            <div class="edit-tags">
                <div class="desc">__("tags_select_for_max_people")</div>
                <div class="tag-sections">
                    <div class="tag-section-title">__("tags_content_type")</div>
                    <div class="tag-section-body">
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="pratilipi-type" :checked="selectedPratilipiType === 'POEM'" @change="changePratilipiType" id="radio-POEM" value="POEM">
                            <label class="form-check-label" for="radio-POEM">__("_pratilipi_type_poem")</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="pratilipi-type" :checked="selectedPratilipiType === 'STORY'" @change="changePratilipiType" id="radio-STORY" value="STORY">
                            <label class="form-check-label" for="radio-STORY">__("_pratilipi_type_story")</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="pratilipi-type" :checked="selectedPratilipiType === 'ARTICLE'" @change="changePratilipiType" id="radio-ARTICLE" value="ARTICLE">
                            <label class="form-check-label" for="radio-ARTICLE">__("_pratilipi_type_article")</label>
                        </div>
                    </div>
                </div>
                <div class="tag-sections">
                    <div class="tag-section-title">__("tags_categories")</div>
                    <div class="tag-section-body" v-if="getSystemTags[selectedPratilipiType]">
                        <!-- <span class="all-tags active" v-for="each_tag in pratilipiData.tags" :key="each_tag.id">{{ each_tag.name}}</span> -->
                        <span class="all-tags" 
                            :class="{'active': isTagSelected(each_tag.id)}" 
                            v-for="each_tag in getSystemTags[selectedPratilipiType].categories" 
                            :key="each_tag.id"
                            @click="addOrRemoveFromListOfSelectedTag(each_tag, isTagSelected(each_tag.id))">{{ each_tag.name }}</span>
                    </div>
                </div>
                <div class="tag-sections">
                    <div class="tag-section-title">__("tags_add_custom_category")</div>
                    <div class="tag-section-body">
                        <div class="new-tags">
                            <span class="all-tags active new-tag" 
                                v-for="(eachSuggestedTags, index) in suggestedTags"
                                :key="index">{{ eachSuggestedTags }}
                                <i class="material-icons" @click="removeSuggestedTag(index)">remove_circle</i>
                            </span>
                        </div>
                        <div class="form-inline">
                            <div class="form-group">
                                <TranslatingInput :value="newSuggestedTag" :oninput="updateNewSuggestedTag"></TranslatingInput>
                            </div>
                            <button type="button" class="btn add-category" @click="addToSuggestedTag"><i class="material-icons">send</i></button>
                        </div>
                    </div>
                </div>
                <button type="button" @click="saveTypeAndCategoriesAndCloseSection({ suggestedTags, type: selectedPratilipiType, tags: selectedTags })" class="btn btn-save">__("save")</button>
                <button type="button" @click="cancelTags" class="btn btn-light">__("cancel")</button>
                <div class="clear"></div>
            </div>
        </div>
    </div>
</template>


<script>
import Spinner from '@/components/Spinner.vue';
import TranslatingInput from '@/components/TranslatingInput.vue';
import mixins from '@/mixins';
import constants from '@/constants'
import inViewport from 'vue-in-viewport-mixin';
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'Pratilipi-BookTags',
    props: {
        selectedPratilipiType: {
            type: String,
            default: 'POEM'
        },
        pratilipiData: {
            type: Object,
            required: true
        },
        isTagSelected: {
            type: Function,
            required: true
        },
        getSystemTags: {
            type: Object,
            required: true
        },
        addOrRemoveFromListOfSelectedTag: {
            type: Function,
            required: true
        },
        suggestedTags: {
            type: Array,
            required: true
        },
        removeSuggestedTag: {
            type: Function,
            required: true
        },
        newSuggestedTag: {
            type: String
        },
        updateNewSuggestedTag: {
            type: Function,
            required: true
        },
        addToSuggestedTag: {
            type: Function,
            required: true
        },
        saveTypeAndCategories: {
            type: Function,
            required: true
        },
        changePratilipiType: {
            type: Function,
            required: true
        },
        selectedTags: {
            type: Array,
            required: true
        },
        fetchSystemTags: {
            type: Function,
            required: true
        },
        'in-viewport-once': {
            default: true
        }
    },
    mixins: [
        mixins,
        inViewport
    ],
    computed: {
        ...mapGetters([
            'getUserDetails'
        ])
    },
    methods: {
        saveTypeAndCategoriesAndCloseSection(data) {
            const existingTagIds = this.pratilipiData.tags ? this.pratilipiData.tags.map(eachTag => eachTag.id) : [];
            const newTagIds = data.tags.map(eachTag => eachTag.id);

            if (existingTagIds.sort().toString() !== newTagIds.sort().toString() && existingTagIds.length === 0) {

                const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.pratilipiData);
                if (this.pratilipiData.hasAccessToUpdate) {
                    this.triggerAnanlyticsEvent(`NEWBOOKINFO_CATTAG_BOOK`, 'CONTROL', {
                        ...pratilipiAnalyticsData,
                        'USER_ID': this.getUserDetails.userId
                    });
                }
            }

            if (existingTagIds.sort().toString() !== newTagIds.sort().toString() && existingTagIds.length > 0) {

                const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.pratilipiData);
                if (this.pratilipiData.hasAccessToUpdate) {
                    this.triggerAnanlyticsEvent(`UPDATEBOOKINFO_CATTAG_BOOK`, 'CONTROL', {
                        ...pratilipiAnalyticsData,
                        'USER_ID': this.getUserDetails.userId
                    });
                }
            }

            this.saveTypeAndCategories(data);
            this.cancelTags();
        },
        showTags() {
            $(".edit-tags").fadeIn();
            $(".tags").hide();
        },
        cancelTags() {
            $(".edit-tags").hide();
            $(".tags").fadeIn();
        },
    },
    components: {
        Spinner,
        TranslatingInput
    },
    created() {
        this.fetchSystemTags(this.pratilipiData.language);
    },
    watch: {
        'inViewport.now'(visible) {
            if (visible) {
                const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.pratilipiData);
                if (this.pratilipiData.hasAccessToUpdate) {
                    this.triggerAnanlyticsEvent(`VIEWED_CATTAG_BOOK`, 'CONTROL', {
                        ...pratilipiAnalyticsData,
                        'USER_ID': this.getUserDetails.userId
                    });
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.card {
    .head-title {
        text-align: left;
        font-weight: bold;
        font-size: 18px;
        border-left: 3px solid #d0021b;
        padding-left: 10px;
        margin: 10px 0;
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
.clear {
    clear: both;
}
.tags-section {
    .tags {
        text-align: left;
        span {
            display: inline-block;
            background: #e9e9e9;
            border-radius: 15px;
            color: #6c757d;
            margin: 5px 0 10px 10px;
            padding: 5px 12px;
            font-size: 14px;
        }
    }
    .edit-tags {
        font-size: 14px;
        padding: 10px;
        display: none;
        .desc {
            font-size: 13px;
            color: #212121;
            text-align: left;
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
        button {
            font-size: 14px;
            margin: 5px 4px 10px 0;
            float: right;
            &.btn-save {
                background: #d0021b;
                color: #fff;
            }
        }
    }
}
</style>
