<template>
    <MainLayout>
        <div class="static-page page-wrap">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <h2>Preview Submission</h2>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <div class="submission-cover-img" :style="{ backgroundImage: 'url(' + getSingleEventPratilipi.coverImage + ')' }"></div>
                    </div>
                    <div class="col-md-8 submission-info">
                        <div class="submission-title"><span>Title:</span> {{ getSingleEventPratilipi.title }}</div>
                        <div class="submission-title-en"><span>Title En:</span> {{ getSingleEventPratilipi.titleEn }}</div>
                        <!-- <div class="submission-author"><span>Author:</span> <router-link :to="'/submissions/'" target="_blank">Author Name</router-link></div> -->
                        <div class="submission-type"><span>Type:</span> {{ getSingleEventPratilipi.type }}</div>
                        <div class="submission-state"><span>State:</span> {{ getSingleEventPratilipi.state }}</div>
                        <div class="submission-description"><span>Description:</span> {{ getSingleEventPratilipi.description }}</div>
                    </div>
                </div>

                <div class="row submission-content">
                    <div class="col-md-2">
                        <div class="chapters">
                            <div class="chapter">Chapters:</div>
                            <p v-for="eachChapter in getSingleEventPratilipi.contents" :key="eachChapter.chapterNo" :class="{ active: selectedChapter === eachChapter.chapterNo }" @click="selectChapter(eachChapter.chapterNo)">{{ eachChapter.chapterTitle || eachChapter.chapterNo }}</p>
                        </div>
                    </div>
                    <div class="col-md-10">
                        <div v-html="contentToShow" class="content"></div>
                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<script>
import MainLayout from '@/layout/main-layout.vue';
import constants from '@/constants';
import Spinner from '@/components/Spinner.vue';
import { mapGetters, mapActions } from 'vuex'

export default {
    components: {
        MainLayout,
        Spinner
    },
    data() {
        return {
            contentToShow: "",
            selectedChapter: 1
        }
    },
    computed: {
        ...mapGetters('admineventsubmissions', [
            'getSingleEventPratilipiLoadingStatus',
            'getSingleEventPratilipi'
        ])
    },
    methods: {
        ...mapActions('admineventsubmissions', [
            'fetchSingleEventPratilipi'
        ]),
        selectChapter(chapterNo) {
            this.selectedChapter = chapterNo;
            const that = this;
            this.getSingleEventPratilipi.contents.forEach((eachChapter) => {
                if (eachChapter.chapterNo === chapterNo) {
                    that.contentToShow = eachChapter.content;
                }
            });
        }
    },
    watch: {
        'getSingleEventPratilipiLoadingStatus'(state) {
            const that = this;
            if (state === 'LOADING_SUCCESS') {
                that.selectedChapter = 1;
                this.getSingleEventPratilipi.contents.forEach((eachChapter) => {
                    if (eachChapter.chapterNo === 1) {
                        that.contentToShow = eachChapter.content;
                    }
                });
            }
        }
    },
    created() {
        this.fetchSingleEventPratilipi(this.$route.params.eventPratilipiId);
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
        font-size: 20px;
        font-weight: bold;
        text-align: left;
        border-left: 3px solid #d0021b;
        padding-left: 10px;
        margin: 10px 0 20px;
        @media screen and (max-width: 992px ) {
            font-size: 18px;
        }
    }
    .submission-cover-img {
        height: 210px;
        overflow: hidden;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        background-color: #e9e9e9;
    }
    .submission-info {
        font-size: 14px;
        div {
            margin: 0 0 15px;
            span {
                font-weight: 700;
            }
        }
    }
    .submission-content {
        margin-top: 20px;
        .chapters {
            background: #e9e9e9;
            padding: 10px;
            .chapter {
                font-weight: 700;
                margin: 5px 0;
            }
            p {
                vertical-align: middle;
                color: #007bff;
                font-weight: 700;
                font-size: 14px;
                margin: 5px 0;
                cursor: pointer;
                &.active {
                    color: #d00b12;
                }
            }
        }
        .content {
            padding: 10px;
        }
    }
}
</style>
<style>
p {
    word-break: break-word !important;
}
</style>
