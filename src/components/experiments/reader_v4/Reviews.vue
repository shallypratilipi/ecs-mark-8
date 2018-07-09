<template>
    <div class="comments-container">
        <ul @scroll="updateScroll" :class="{'y-scrolling': haveInfiniteScroll }" class="comments-list" v-if="getReviewsLoadingState === 'LOADING_SUCCESS' || getReviewsData.length > 0">
            <OwnReview 
                :userPratilipiData="userPratilipiData" 
                :authorId="authorId"
                :screenName="screenName"
                :pratilipiData="pratilipiData"
                :screenLocation="screenLocation"></OwnReview>
            <li class="all-reviews" v-if="getReviewsData.length > 0">__("pratilipi_count_reviews")</li>
            <li class="no-results" v-if="getReviewsData.length === 0">__("pratilipi_no_reviews")</li>
            <Review 
                v-if="haveInfiniteScroll && getReviewsData.length > 0"
                v-for="eachReview in getReviewsData" 
                :loadCommentsOfReview="loadCommentsOfReview"
                :likeOrDislikeReview="likeOrDislikeReview" 
                :userPratilipiData="userPratilipiData"
                :eachReview="eachReview" :key="eachReview.userPratilipiId"
                :authorId="authorId"
                :createComment="verifyAndCreateComment"
                :deleteComment="deleteComment"
                :likeOrDislikeComment="verifyAndLikeComment"
                :updateComment="updateComment"
                :screenName="screenName"
                :screenLocation="'REVIEWS'"
                :pratilipiData="pratilipiData"
                ></Review>
            <Review 
                v-if="!haveInfiniteScroll && getReviewsData.length > 0"
                v-for="eachReview in getReviewsData.slice(0, 2)" 
                :loadCommentsOfReview="loadCommentsOfReview"
                :likeOrDislikeReview="likeOrDislikeReview" 
                :userPratilipiData="userPratilipiData"
                :eachReview="eachReview" :key="eachReview.userPratilipiId"
                :authorId="authorId"
                :createComment="verifyAndCreateComment"
                :deleteComment="deleteComment"
                :likeOrDislikeComment="verifyAndLikeComment"
                :updateComment="updateComment"
                :screenName="screenName"
                :screenLocation="'REVIEWS'"
                :pratilipiData="pratilipiData"
                ></Review>
            
        </ul>
        <Spinner v-if="getReviewsLoadingState === 'LOADING'"></Spinner>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Spinner from '@/components/Spinner.vue';
import Review from '@/components/Review.vue';
import mixins from '@/mixins';
import OwnReview from '@/components/experiments/reader_v4/OwnReview.vue';

export default {
    props: {
        pratilipiId: {
            type: Number,
            required: true
        },
        authorId: {
            type: Number,
            required: true
        },
        userPratilipiData: {
            type: Object
        },
        haveInfiniteScroll: {
            type: Boolean,
            required: true
        },
        screenName: {
            type: String,
            required: true
        },
        screenLocation: {
            type: String,
            required: true
        },
        pratilipiData: {
            type: Object,
            required: true
        }
    },
    mixins: [
        mixins
    ],
    computed: {
        ...mapGetters('reviews', [
            'getReviewsLoadingState',
            'getReviewsData',
            'getReviewsCursor'
        ]),
        ...mapGetters([
            'getUserDetails'
        ])
    },
    methods: {
        ...mapActions('reviews', [
            'fetchPratilipiReviews',
            'loadMoreReviews',
            'loadCommentsOfReview',
            'likeOrDislikeReview',
            'createComment',
            'updateComment',
            'deleteComment',
            'likeOrDislikeComment'
        ]),
        ...mapActions([
            'setAfterLoginAction'
        ]),
        verifyAndCreateComment(data) {
            if (this.getUserDetails.isGuest) {
                // throw popup modal
                this.setAfterLoginAction({ action: `reviews/createComment`, data });
                this.openLoginModal(this.$route.meta.store, 'REVIEW', this.screenLocation);
            } else {
                this.createComment(data);
            }
        },
        verifyAndLikeComment(data) {
            if (this.getUserDetails.isGuest) {
                // throw popup modal
                this.setAfterLoginAction({ action: `reviews/likeOrDislikeComment`, data });
                this.openLoginModal(this.$route.meta.store, 'LIKE', this.screenLocation);
            } else {
                this.likeOrDislikeComment(data);
            }
        },
        updateScroll(e) {
            if (this.getReviewsCursor === null || this.getReviewsLoadingState === 'LOADING') {
                return;
            }
            const nintyPercentOfList = ( 75 / 100 ) * e.target.scrollHeight;

            if (e.target.scrollTop + e.target.offsetHeight > nintyPercentOfList) {
                this.loadMoreReviews({ resultCount: 3, pratilipiId: this.pratilipiId })
            }
        },
    },
    created() {
        this.fetchPratilipiReviews({ pratilipiId: this.pratilipiId, resultCount: this.haveInfiniteScroll ? 4 : 2 });
    },
    components: {
        Spinner,
        Review,
        OwnReview
    }
}

</script>

<style lang="scss" scoped>
.comments-container {
    margin: 0 auto 15px;
    width: 100%;
    max-width: 700px;
    h1 {
        font-size: 36px;
        color: #283035;
        font-weight: 400;
    }
    h1 a {
        font-size: 18px;
        font-weight: 700;
    }
}
.read-page .comments-container {
    max-height: none;
    overflow: visible;
}
.comments-list {
    margin-top: 10px;
    position: relative;
    padding-left: 5px;
    li.all-reviews, li.no-results {
        font-size: 12px;
        font-weight: bold;
        color: #6c757d;
        margin: 0 0 10px 5px;
        list-style: none;
    }
    li.no-results {
        text-align: center;
        font-size: 13px;
    }
}
.y-scrolling {
    overflow: hidden;
    height: 470px;  
    overflow-y: auto;
}
.show-more {
    text-align: center;
    font-size: 14px;
    width: 100%;
    display: block;
    color: #d0021b;
    background: none;
    border: 0;
    &:focus {
        outline: none;
    }
}
.book-bottom-ratings .y-scrolling {
    height: auto;
}
.reader-review-popout .y-scrolling {
    height: calc(60vh - 30px);
}
</style>
