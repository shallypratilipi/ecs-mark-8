<template>
    <li>
        <div class="comment-main-level">
            <div class="comment-avatar">
                <router-link :to="eachReview.userProfilePageUrl" @click.native="triggerClickReviewUser(eachReview.userId)"><img :src="getLowResolutionImage(eachReview.userImageUrl)" alt="author"></router-link>
            </div>
            <div class="comment-box">
                <div class="comment-head">
                    <div class="comment-meta">
                        <h6 class="comment-name">
                            <router-link :to="eachReview.userProfilePageUrl" @click.native="triggerClickReviewUser(eachReview.userId)">{{ eachReview.userName }}</router-link>
                        </h6>
                        <button class="btn more-options" type="button" id="ReviewMoreOptions" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="material-icons">more_vert</i>
                        </button>
                        <div class="dropdown-menu" aria-labelledby="ReviewMoreOptions">
                            <button type="button" class="btn options-btn" data-toggle="modal" data-target="#reportModal">
                                __("report_button")
                            </button>
                        </div>
                    </div>
                    <div class="rating">
                        <i class="material-icons" v-for="index in eachReview.rating" :key="index + Math.random()">star</i>
                        <i class="material-icons" v-for="index in 5 - eachReview.rating" :key="index + Math.random()">star_border</i>
                    </div>
                    <span class="review-date">{{ eachReview.reviewDateMillis | convertDate }}</span>
                </div>
                <div class="comment-content">
                    {{ eachReview.review }}
                </div>
                <div class="comment-footer">
                    <button type="button" :class="{ 'active': eachReview.isLiked }" @click="checkUserAndlikeOrDislikeReview({userPratilipiId: eachReview.userPratilipiId, isLiked: eachReview.isLiked, likeCount: eachReview.likeCount })" name="button"><span class="counter">{{ eachReview.likeCount }}</span><i class="material-icons">thumb_up</i></button>
                    <button type="button" name="button" @click="toggleComments({ resultCount: eachReview.commentCount * 2, parentId: eachReview.userPratilipiId, reviewUserName: eachReview.userName })"><span class="counter">{{ eachReview.commentCount }}</span><i class="material-icons">message</i></button>
                </div>
            </div>
        </div>
        <Spinner v-if="eachReview.comments.loading_state === 'LOADING'"></Spinner>

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
                        <form>
                            <div class="form-group">
                                <label for="reportModalTextarea">__("report_issue")</label>
                                <textarea class="form-control" id="reportModalTextarea" rows="3"
                                          placeholder="__('report_issue')"></textarea>
                            </div>
                            <button type="button" class="btn btn-primary btn-submit" @click="submitReport">
                                __("submit")
                            </button>
                            <button type="button" class="cancel" data-dismiss="modal" aria-label="Close">__("cancel")
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>


        <ul class="comments-list reply-list">
            <li
                v-for="eachComment in eachReview.comments.data" :key="eachComment.commentId"
                v-if="eachReview.comments && eachReview.comments.data && eachReview.comments.data.length > 0 && eachReview.comments.loading_state === 'LOADING_SUCCESS'">
                <div class="comment-avatar">
                    <router-link :to="eachComment.user.profilePageUrl" @click.native="triggerClickCommentUser(eachComment.user.userId)"><img :src="eachComment.user.profileImageUrl" alt="author"></router-link>
                </div>
                <div class="comment-box">
                    <div class="comment-head">
                        <h6 class="comment-name" :class="{ 'by-author': eachComment.user.author.authorId === authorId }">
                            <router-link :to="eachComment.user.profilePageUrl" @click.native="triggerClickCommentUser(eachComment.user.userId)">{{ eachComment.user.displayName }}</router-link>
                        </h6>
                        <button class="btn more-options" type="button" id="moreOptions2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="material-icons">more_vert</i>
                        </button>
                        <div class="dropdown-menu" aria-labelledby="moreOptions2">
                            <button v-if="eachComment.user.userId === getUserDetails.userId" type="button" @click="editComment(eachComment.commentId, eachComment.content)" class="btn options-btn" data-toggle="modal" data-target="">
                                __("review_edit_review")
                            </button>
                            <button v-if="eachComment.user.userId === getUserDetails.userId" type="button" @click="deleteComment(eachComment.commentId)" class="btn options-btn" data-toggle="modal" data-target="">
                                __("review_delete_review")
                            </button>
                            <button v-if="eachComment.user.userId !== getUserDetails.userId" type="button"
                                    class="btn options-btn" data-toggle="modal" data-target="#reportModal">
                                __("report_button")
                            </button>
                        </div>
                        <span class="review-date"> {{ eachComment.creationDateMillis | convertDate }} </span>
                    </div>
                    <div class="comment-content non-editable">
                        {{ eachComment.content }}
                    </div>
                    <div style="display: none" :class="['comment-content editable', String(eachComment.commentId)]">
                        <form>
                            <div class="form-group">
                                <label for="writeReply">__("review_edit_review")</label>
                                <textarea class="form-control" :value='eachComment.content' @input="updatedComment = $event.target.value" rows="2" placeholder="__('comment_reply_comment_help')"></textarea>
                            </div>
                            <button type="button" class="btn btn-primary" @click="updateCommentAndToggle({ commentId: eachComment.commentId, content: updatedComment })">__("save")</button>
                            <button type="button" class="btn btn-light" @click="cancelCommentInput(eachComment.commentId)">__("cancel")</button>
                        </form>
                    </div>
                    <div class="comment-footer">
                        <button type="button" :class="{ 'active': eachComment.isLiked}" @click="triggerEventAndlikeOrDislikeComment({ commentId: eachComment.commentId, isLiked: eachComment.isLiked, likeCount: eachComment.likeCount })" name="button"><span class="counter">{{ eachComment.likeCount }}</span><i class="material-icons">thumb_up</i></button>
                        <button type="button" @click="replyToComment(eachComment)" name="button"><span class="counter"></span><i class="material-icons">message</i></button>
                    </div>
                </div>
            </li>
            <li class="add-reply">
                <div class="comment-avatar"><img :src="userPratilipiData.userId == 0 ? defaultAuthorImage : userPratilipiData.userImageUrl" alt="author"></div>
                <div class="comment-box">
                    <div class="comment-head">
                        <h6 class="comment-name"><a href="#">{{userPratilipiData.userName}}</a></h6>
                    </div>
                    <div class="comment-content">
                        <form>
                            <div class="form-group">
                                <label for="writeReply">__("comment_reply_to_comment")</label>
                                <textarea class="form-control" :value='newComment' @input="newComment = $event.target.value" rows="2" placeholder="__('comment_reply_comment_help')"></textarea>
                            </div>
                            <button type="button" class="btn btn-primary" @click="triggerEventAndCreateComment(eachReview)">__("save")</button>
                            <button type="button" class="btn btn-light" @click="closeReply">__("cancel")</button>
                        </form>
                    </div>
                </div>
            </li>
        </ul>
    </li>


</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import mixins from '@/mixins'
import Spinner from '@/components/Spinner.vue';
import constants from '@/constants';


export default {
    mixins: [
        mixins
    ],
    data() {
        return {
            newComment: '',
            x: '',
            updatedComment: '',
            language: ''
        }
    },
    props: {
        eachReview: {
            type: Object,
            required: true
        },
        likeOrDislikeReview: {
            type: Function,
            required: true
        },
        likeOrDislikeComment: {
            type: Function,
            required: true
        },
        loadCommentsOfReview: {
            type: Function,
            required: true
        },
        userPratilipiData: {
            type: Object,
            required: true
        },
        createComment: {
            type: Function,
            required: true
        },
        updateComment: {
            type: Function,
            required: true
        },
        authorId: {
            type: Number,
            required: true
        },
        deleteComment: {
            type: Function,
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
    methods: {
        cancelReview(e) {
            $(".review-box").fadeOut();
        },
        closeReply() {
            $(this.$el).find(".add-reply").hide();
        },
        cancelCommentInput(commentId) {
            $(this.$el).find(".comment-content.editable." + commentId).toggle();
        },
        toggleComments(data) {
            $(this.$el).find(".reply-list").toggleClass("show-comments");
            $(this.$el).find(".add-reply").show();
            if ($(this.$el).find(".reply-list").hasClass("show-comments")) {
                this.loadCommentsOfReview(data);
            }
            this.newComment = `@${data.reviewUserName} `;
        },
        submitReport() {
            if (this.getUserDetails.isGuest) {
                this.openLoginModal(this.$route.meta.store, 'REVIEW', 'LOGIN');
                return;
            }
            const currentLocale = process.env.LANGUAGE;
            constants.LANGUAGES.forEach((eachLanguage) => {
                if (eachLanguage.shortName === currentLocale) {
                    this.language = eachLanguage.fullName.toUpperCase();
                }
            });

            let user = this.getUserDetails;
            let message = $('#reportModalTextarea').val().toString();
            let name = user.displayName;
            let email = user.email;
            let pratilipiId = this.pratilipiData.pratilipiId;
            let language = this.language;
            let dataType = "REVIEW";
            console.log(user + " " + message);
            this.submitPrailipiReport({name, email, message, pratilipiId, language, dataType});
            $('#reportModal').modal('hide');
            this.triggerAlert({message: '__("success_generic_message")', timer: 3000});
            $("#reportModalTextarea").val("");
        },
        triggerEventAndCreateComment(review) {
            const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.pratilipiData);
            this.triggerAnanlyticsEvent(`COMMENT_${this.screenLocation}_${this.screenName}`, 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId,
                'PARENT_ID': review.userPratilipiId
            });

            this.createComment({
                userPratilipiId: review.userPratilipiId,
                content: this.newComment
            });
            this.newComment = '';
        },
        editComment(commentId, content) {
            this.updatedComment = content;
            $(this.$el).find(".comment-content.editable." + commentId).toggle();
        },
        updateCommentAndToggle(data) {
            const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.pratilipiData);
            this.triggerAnanlyticsEvent(`EDITCOMMENT_COMMENTS_BOOK`, 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId,
                'ENTITY_STATE': 'UPDATE'
            });

            $(this.$el).find(".comment-content.editable." + data.commentId).toggle();
            this.updateComment(data);
        },
        replyToComment(eachComment) {
            const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.pratilipiData);
            this.triggerAnanlyticsEvent(`REPLY_COMMENTS_BOOK`, 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId,
                'PARENT_ID': eachComment.commentId
            });

            this.newComment = `@${eachComment.user.displayName} `;
            $(this.$el).find(".add-reply").show();
            $(this.$el).find(".add-reply .comment-content textarea").focus();
        },
        checkUserAndlikeOrDislikeReview(data) {
            if (this.getUserDetails.isGuest) {
                // throw popup modal
                this.setAfterLoginAction({ action: `reviews/likeOrDislikeReview`, data: data.userPratilipiId });
                this.openLoginModal(this.$route.meta.store, 'LIKE', 'REVIEWS');
            } else {
                this.likeOrDislikeReview(data.userPratilipiId);
            }

            let action = !data.isLiked ? 'LIKE' : 'UNLIKE';
            const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.pratilipiData);
            this.triggerAnanlyticsEvent(`${action}_REVIEWS_${this.screenName}`, 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId,
                'PARENT_ID': data.userPratilipiId,
                'ENTITY_VALUE': data.likeCount
            });
        },
        triggerEventAndlikeOrDislikeComment(data) {
            let action = !data.isLiked ? 'LIKE' : 'UNLIKE';
            const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.pratilipiData);
            this.triggerAnanlyticsEvent(`${action}_COMMENTS_${this.screenName}`, 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId,
                'PARENT_ID': data.commentId,
                'ENTITY_VALUE': data.likeCount
            });

            this.likeOrDislikeComment(data);
        },
        triggerClickReviewUser(data) {
            const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.pratilipiData);
            this.triggerAnanlyticsEvent(`CLICKUSER_REVIEWS_${this.screenName}`, 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId,
                'PARENT_ID': data,
                'AUTHOR_ID': this.pratilipiData.author.authorId
            });
        },
        triggerClickCommentUser(data) {
            const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.pratilipiData);
            this.triggerAnanlyticsEvent(`CLICKUSER_COMMENTS_${this.screenName}`, 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId,
                'PARENT_ID': data,
                'AUTHOR_ID': this.pratilipiData.author.authorId
            });
        },
        ...mapActions([
            'setAfterLoginAction',
            'setInputModalSaveAction'
        ]),
        ...mapActions('alert', [
            'triggerAlert'
        ]),
        ...mapActions('readerpage', [
            'submitPrailipiReport'
        ]),
        ...mapGetters('readerpage', [
            'getPratilipiData'
        ])
    },
    computed: {
        ...mapGetters([
            'getUserDetails'
        ])
    },
    components: {
        Spinner
    }
}

</script>

<style lang="scss" scoped>
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
.comments-container {
    margin: 0 0 15px;
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
.comments-list {
    margin-top: 10px;
    position: relative;
    padding-left: 5px;
    li {
        margin-bottom: 15px;
        display: block;
        position: relative;
        &:after {
            content: '';
            display: block;
            clear: both;
            height: 0;
            width: 0;
        }
    }
    .comment-avatar {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        position: relative;
        z-index: 1;
        float: left;
        border: 3px solid #FFF;
        -webkit-box-shadow: 0 1px 2px rgba(0,0,0,0.2);
        -moz-box-shadow: 0 1px 2px rgba(0,0,0,0.2);
        box-shadow: 0 1px 2px rgba(0,0,0,0.2);
        overflow: hidden;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .comment-box {
        width: calc(100% - 70px);
        margin-right: 10px;
        float: right;
        position: relative;
        -webkit-box-shadow: 0 1px 1px rgba(0,0,0,0.15);
        -moz-box-shadow: 0 1px 1px rgba(0,0,0,0.15);
        box-shadow: 0 1px 1px rgba(0,0,0,0.15);
        &:before, &:after {
            content: '';
            height: 0;
            width: 0;
            position: absolute;
            display: block;
            border-width: 10px 12px 10px 0;
            border-style: solid;
            border-color: transparent #FCFCFC;
            top: 8px;
            left: -11px;
        }
        &:before {
            border-width: 11px 13px 11px 0;
            border-color: transparent rgba(0,0,0,0.05);
            left: -12px;
        }
        .comment-head {
            background: #FCFCFC;
            padding: 10px 12px;
            border-bottom: 1px solid #E5E5E5;
            overflow: hidden;
            -webkit-border-radius: 4px 4px 0 0;
            -moz-border-radius: 4px 4px 0 0;
            border-radius: 4px 4px 0 0;
            @media screen and (max-width: 768px ) {
                padding: 4px 5px 4px 10px;
            }
            .comment-meta {
                float: left;
                width: 100%;
            }
            .comment-name {
                color: #283035;
                font-size: 13px;
                font-weight: 700;
                float: left;
                margin: 0 5px 5px 0;
                width: calc(100% - 25px);
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                @media screen and (max-width: 768px ) {
                    margin: 0 5px 2px 0;
                }
                a {
                    color: #283035;
                }
            }
            span.review-date {
                float: left;
                color: #999;
                font-size: 12px;
                position: relative;
            }
            .more-options {
                float: right;
                padding: 0;
                background: none;
                i {
                    font-size: 18px;
                }
            }
            .dropdown-menu {
                padding: 0;
                .options-btn {
                    font-size: 12px;
                    display: block;
                    padding: 10px;
                    background: none;
                    width: 100%;
                    text-align: left;
                }
            }
            .rating {
                float: left;
                margin-right: 10px;
                i {
                    float: left;
                    color: #aeadae;
                    font-size: 14px;
                    margin: 0;
                }
            }
        }
        .comment-content {
            background: #FFF;
            padding: 12px;
            font-size: 14px;
            color: #595959;
            -webkit-border-radius: 0 0 4px 4px;
            -moz-border-radius: 0 0 4px 4px;
            border-radius: 0 0 4px 4px;
            @media screen and (max-width: 768px ) {
                padding: 4px 7px;
                font-size: 13px;
            }
            &.editable {
                overflow: hidden;
                .btn {
                    font-size: 12px;
                    float: right;
                    padding: 4px 7px;
                    margin-bottom: 5px;
                    &.btn-primary {
                        background: #d0021b;
                        border: 0;
                        margin-left: 5px;
                    }
                }
            }
        }
        .comment-footer {
            border-top: 0px solid #e5e5e5;
            padding: 5px;
            @media screen and (max-width: 768px ) {
                padding: 0px 5px;
            }
            button {
                background: none;
                border: 0;
                padding: 2px 0;
                &:focus {
                    outline: none;
                }
                &.active {
                    color: #d0021b;
                    i {
                        color: #d0021b;
                    }
                }
            }
            span {
                font-size: 12px;
                vertical-align: middle;
                padding: 0 4px;
            }
            i {
                font-size: 16px;
                color: #6c757d;
                margin: 0 8px 0 4px;
                vertical-align: middle;
                cursor: pointer;
            }
            .write-reply {
                font-size: 12px;
                padding: 0 5px;
            }
        }
    }
}
.reply-list:before, .reply-list:after {display: none;}
.reply-list {
    padding-left: 40px;
    clear: both;
    margin-top: 15px;
    display: none;
    .comment-avatar {
        width:35px;
        height: 35px;
    }
    &.show-comments {
        display: block;
    }
}
.comment-main-level:after {
    content: '';
    width: 0;
    height: 0;
    display: block;
    clear: both;
}
.reply-list .comment-box {
    width: calc(100% - 60px);
}
.comment-box .comment-name.by-author:after {
    content: '__("author_author")';
    background: #283035;
    color: #FFF;
    font-size: 12px;
    padding: 2px 5px;
    font-weight: 700;
    margin-left: 10px;
    display: inline-block;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
}
.comments-list li .add-reply {
    list-style: none;
    textarea, label {
        font-size: 13px;
    }
    .btn {
        font-size: 12px;
        float: right;
        padding: 4px 7px;
        margin-bottom: 5px;
        &.btn-primary {
            background: #d0021b;
            border: 0;
            margin-left: 5px;
        }
    }
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
</style>
