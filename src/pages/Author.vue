<template>
    <MainLayout>
        <div class="author-page page-wrap">
            <div class="container">
                <div class="page-content">
                    <div class="row">
                        <div class="col-md-12 profile-top" v-if="getAuthorDataLoadingState === 'LOADING_SUCCESS'">
                            <div class="profile-cover" :style="{ backgroundImage: 'url(' + getAuthorData.coverImageUrl + ')' }">
                                <div class="cover-options">
                                    <router-link
                                    :to="{ name: 'Settings_Page'}"
                                    @click.native="triggerSettingsEvent"
                                    v-if="getUserDetails.userId === getAuthorData.user.userId">
                                        <i class="material-icons">settings</i>
                                    </router-link>
                                    <button type="button" name="button" @click="openShareModal"><i class="material-icons">share</i></button>
                                </div>
                                <button class="update-img" v-if="getUserDetails.userId === getAuthorData.user.userId" @click="uploadImage('cover-image')"><i class="material-icons">camera_alt</i></button>
                                <input type="file" hidden name="coverimage" @change="triggerCoverImageUpload($event)" accept="image/*" id="coverimage_uploader">
                                <div class="uploading" v-if="getCoverImageLoadingState === 'LOADING'">
                                    <Spinner></Spinner>
                                </div>
                            </div>

                            <div class="profile-image">
                                <img :src="getAuthorData.imageUrl + '?width=150'" alt="profile">
                                <button class="update-img" v-if="getUserDetails.userId === getAuthorData.user.userId" @click="uploadImage('profile-image')"><i class="material-icons">camera_alt</i></button>
                                <input type="file" hidden name="profileimage" @change="triggerProfileImageUpload($event)" accept="image/*" id="profile_uploader">
                                <div class="uploading" v-if="getProfileImageLoadingState === 'LOADING'">
                                    <Spinner></Spinner>
                                </div>
                            </div>
                            <div class="profile-user-name">{{ getAuthorData.name }}</div>
                            <div class="profile-read-by">__("author_readby_count")</div>
                            <div class="profile-summary" v-if="getAuthorData.summary || getAuthorData.hasAccessToUpdate">
                                <div class="head-title">
                                    <span>__("author_about")</span>
                                    <button class="edit" @click="editAuthorSummary" v-if="getUserDetails.userId === getAuthorData.user.userId">
                                        <i class="material-icons">mode_edit</i>
                                    </button>
                                </div>
                                <p>{{ getAuthorData.summary }}</p>
                                <button v-if="showShowMoreOfSummary" type="button" class="view-more" name="button" data-toggle="modal" data-target="#summary_modal">__("view_more")</button>
                            </div>
                            <div class="modal fade summary-modal" id="summary_modal" tabindex="-1" role="dialog" aria-labelledby="summary-modalLabel" aria-hidden="true">
                              <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h5 class="modal-title">__("pratilipi_summary")</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                    </button>
                                  </div>
                                  <div class="modal-body social">
                                     <p>{{ getAuthorData.summary }}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="follow-btn-w-count" v-if="!getAuthorData.following && getUserDetails.userId !== getAuthorData.user.userId" @click="triggerEventAndFollowOrUnfollowAuthor"><!-- Follow Button -->
                                <button><i class="material-icons">person_add</i> __("author_follow")</button><span><b>{{ getAuthorData.followCount }}</b></span>
                            </div>
                            <div class="follow-btn-w-count" v-if="getAuthorData.following && getUserDetails.userId !== getAuthorData.user.userId" @click="triggerEventAndFollowOrUnfollowAuthor"><!-- Following Button -->
                                <button><i class="material-icons">check</i> __("author_following")</button><span><b>{{ getAuthorData.followCount }}</b></span>
                            </div>

                            <!-- Message Button -->
                            <div class="message-btn" v-if="getUserDetails.userId !== getAuthorData.user.userId" @click="messageUser">
                                <i class="material-icons">message</i> __("chat_message")
                            </div>
                        </div>
                        <Spinner v-if="getAuthorDataLoadingState === 'LOADING'"></Spinner>
                        <div class="col-md-12 profile-bottom" v-if="getAuthorDataLoadingState === 'LOADING_SUCCESS'">
                            <div class="profile-menu">
                                <a href="#" v-if="getUserDetails.userId === getAuthorData.user.userId" v-on:click="tabchange" class="active" data-tab="library">__("library")</a>
                                <a href="#" id="menu-published" v-on:click="tabchange" data-tab="published"><span>{{ getAuthorData.contentPublished }}</span>__("author_published_contents")</a>
                                <a href="#" v-on:click="tabchange" data-tab="followers"><span>{{ getAuthorData.followCount }}</span>__("author_followers")</a>
                                <a href="#" v-on:click="tabchange" data-tab="following"><span>{{ getAuthorData.user.followCount }}</span>__("author_following")</a>
                            </div>
                            <div class="bottom-contents">
                                <div class="list published-contents" id="published">
                                    <PratilipiComponent
                                    :pratilipiData="pratilipiData"
                                    :key="pratilipiData.pratilipiId"
                                    v-for="pratilipiData in getPublishedContents"
                                    v-if="publishedContentsLoadingState === 'LOADING_SUCCESS' || getPublishedContents.length !== 0"
                                    :hideAddToLibrary="getAuthorData.authorId === getUserDetails.authorId"
                                    :hideAuthorName="true"
                                    :removeFromLibrary="removeFromLibraryPublished"
                                    :addToLibrary="addToLibraryPublished"
                                    :screenName=" getUserDetails.authorId === getAuthorData.authorId ? 'MYPROFILE' : 'USER'"
                                    :screenLocation="'PUBLISHED'"
                                    ></PratilipiComponent>
                                    <p class="message" v-if="publishedContentsLoadingState === 'LOADING_SUCCESS' && getPublishedContents.length == 0">__("author_no_contents_published")</p>
                                </div>
                                <div class="list library" id="library">
                                    <PratilipiComponent
                                    :pratilipiData="pratilipiData"
                                    :key="pratilipiData.pratilipiId"
                                    v-for="pratilipiData in getLibraryList"
                                    v-if="getLibraryListLoadingState === 'LOADING_SUCCESS' || getLibraryList.length !== 0"
                                    :hideAuthorName="true"
                                    :redirectToReader="true"
                                    :removeFromLibrary="removeFromLibrary"
                                    :screenName=" getUserDetails.authorId === getAuthorData.authorId ? 'MYPROFILE' : 'USER'"
                                    :screenLocation="'LIBRARY'"
                                    ></PratilipiComponent>
                                    <p class="message" v-if="getLibraryListLoadingState === 'LOADING_SUCCESS' && getLibraryList.length == 0">__("empty_library")</p>
                                    <router-link
                                    :to="{ name: 'Library_Page' }"
                                    v-if="getLibraryListLoadingState === 'LOADING_SUCCESS' && getLibraryList.length !== 0"
                                    class="view_more">
                                        <div class="view_more_card" v-if="getLibraryListTotalCount>10" >
                                            <i class="material-icons">keyboard_arrow_right</i>
                                            <span>__("view_more")</span>
                                        </div>
                                    </router-link>
                                </div>
                                <div class="list followers" id="followers">
                                    <AuthorCard  v-for="each_follower in getAuthorFollowers"
                                        :authorData="each_follower"
                                        :key="each_follower.userId"
                                        :screenName=" getUserDetails.authorId === getAuthorData.authorId ? 'MYPROFILE' : 'USER'"
                                        :screenLocation="'FOLLOWERS'"
                                        :followOrUnfollowAuthor="followOrUnfollowFollowers"
                                        :inFollowersTab="true"></AuthorCard>
                                        <p class="message" v-if="getAuthorFollowersLoadingState === 'LOADING_SUCCESS' && getAuthorFollowers.length == 0 && getUserDetails.userId === getAuthorData.user.userId">__("user_no_followers")</p>
                                        <p class="message" v-if="getAuthorFollowersLoadingState === 'LOADING_SUCCESS' && getAuthorFollowers.length == 0 && getUserDetails.userId !== getAuthorData.user.userId">__("author_no_followers")</p>
                                    <Spinner v-if="getAuthorFollowersLoadingState === 'LOADING'"></Spinner>
                                </div>
                                <div class="list following" id="following">
                                    <AuthorCard v-for="each_following in getAuthorFollowing"
                                        :authorData="each_following"
                                        :key="each_following.userId"
                                        :screenName=" getUserDetails.authorId === getAuthorData.authorId ? 'MYPROFILE' : 'USER'"
                                        :screenLocation="'FOLLOWINGS'"
                                        :followOrUnfollowAuthor="followOrUnfollowFollowing"
                                        :inFollowingTab="true"></AuthorCard>
                                    <p class="message" v-if="getAuthorFollowingLoadingState === 'LOADING_SUCCESS' && getAuthorFollowing.length == 0 && getUserDetails.userId === getAuthorData.user.userId">__("user_no_following")</p>
                                    <p class="message" v-if="getAuthorFollowingLoadingState === 'LOADING_SUCCESS' && getAuthorFollowing.length == 0 && getUserDetails.userId !== getAuthorData.user.userId">__("author_no_following")</p>
                                    <Spinner v-if="getAuthorFollowingLoadingState === 'LOADING'"></Spinner>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<script>
import MainLayout from '@/layout/main-layout.vue';
import PratilipiComponent from '@/components/Pratilipi.vue';
import AuthorCard from '@/components/AuthorCard.vue';
import Spinner from '@/components/Spinner.vue';
import mixins from '@/mixins';
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
    name: 'Pratilipi',
    mixins: [
        mixins
    ],
    data() {
        return {
            user_id: null,
            scrollPosition: null,
            showShowMoreOfSummary: false
        }
    },
    computed: {
        ...mapGetters([
            'getUserDetails'
        ]),
        ...mapGetters('authorpage', [
            'getAuthorData',
            'getAuthorDataLoadingState',
            'getAuthorFollowing',
            'getAuthorFollowers',
            'getAuthorFollowingCount',
            'getPublishedContents',
            'getAuthorFollowingLoadingState',
            'getAuthorFollowersLoadingState',
            'getLibraryList',
            'getLibraryListLoadingState',
            'getPublishedContentsCursor',
            'getAuthorFollowingCursor',
            'getAuthorFollowersCursor',
            'getProfileImageLoadingState',
            'getCoverImageLoadingState',
            'getLibraryListTotalCount',
            'getRouteToMessageUserState'

        ]),
        ...mapState({
            publishedContents: state => state.authorpage.published_contents.data,
            publishedContentsLoadingState: state => state.authorpage.published_contents.loading_state,
            publishedContentsCursor: state => state.authorpage.published_contents.cursor
        })
    },
    methods: {
        ...mapActions('authorpage', [
            'fetchInitialPublishedContents',
            'fetchMorePublishedContents',
            'fetchAuthorDetails',
            'fetchInitialAuthorFollowingUsers',
            'fetchMoreAuthorFollowingUsers',
            'fetchInitialAuthorFollowerUsers',
            'fetchMoreAuthorFollowerUsers',
            'fetchInitialLibraryList',
            'removeFromLibrary',
            'followOrUnfollowAuthor',
            'followOrUnfollowFollowing',
            'followOrUnfollowFollowers',
            'uploadCoverImage',
            'uploadProfileImage',
            'removeFromLibraryPublished',
            'addToLibraryPublished',
            'triggerRouteToMessageUser'
        ]),
        ...mapActions([
            'setShareDetails',
            'setAfterLoginAction'
        ]),
        tabchange(event) {
            event.preventDefault();
            var tab_id = $(event.currentTarget).attr('data-tab');
            $(".profile-menu a").removeClass("active");
            $(event.currentTarget).addClass("active");
            $(".bottom-contents .list").hide();
            $("#" + tab_id).show();
            if (tab_id === 'followers') {
                if (this.getUserDetails.author.authorId !== this.getAuthorData.authorId) {
                    this.triggerAnanlyticsEvent('LANDED_FOLLOWERS_USER', 'CONTROL', {
                        'USER_ID': this.getUserDetails.userId,
                        'PARENT_ID': this.getAuthorData.user.userId,
                        'AUTHOR_ID': this.getAuthorData.authorId
                    });
                }
                else if (this.getUserDetails.author.authorId === this.getAuthorData.authorId) {
                    this.triggerAnanlyticsEvent('LANDED_FOLLOWERS_MYPROFILE', 'CONTROL', {
                        'USER_ID': this.getUserDetails.userId
                    });
                }
            }
            else if (tab_id === 'following') {
                if (this.getUserDetails.author.authorId !== this.getAuthorData.authorId) {
                    this.triggerAnanlyticsEvent('LANDED_FOLLOWINGS_USER', 'CONTROL', {
                        'USER_ID': this.getUserDetails.userId,
                        'PARENT_ID': this.getAuthorData.user.userId,
                        'AUTHOR_ID': this.getAuthorData.authorId
                    });
                }
                else if (this.getUserDetails.author.authorId === this.getAuthorData.authorId) {
                    this.triggerAnanlyticsEvent('LANDED_FOLLOWINGS_MYPROFILE', 'CONTROL', {
                        'USER_ID': this.getUserDetails.userId
                    });
                }
            }
        },
        goToPublishedContentsTab() {
            $(".profile-menu a").removeClass("active");
            $('#menu-published').addClass("active");
            $(".bottom-contents .list").hide();
            $("#published").show();
        },
        updateScroll() {
            this.scrollPosition = window.scrollY;
        },
        uploadImage(imageType) {
            console.log('imageType', imageType);
            switch(imageType) {
                case 'cover-image':
                    $('#coverimage_uploader').click();
                    if (this.getAuthorData.coverImageUrl.endsWith('/author/cover')) {
                        this.triggerAnanlyticsEvent(`NEWUSERINFO_COVERPIC_MYPROFILE`, 'CONTROL', {
                            'USER_ID': this.getUserDetails.userId
                        });
                    }
                    else {
                        this.triggerAnanlyticsEvent(`UPDATEUSERINFO_COVERPIC_MYPROFILE`, 'CONTROL', {
                            'USER_ID': this.getUserDetails.userId
                        });
                    }
                    break;
                case 'profile-image':
                    $('#profile_uploader').click();
                    if (this.getAuthorData.imageUrl.endsWith('/author/image')) {
                        this.triggerAnanlyticsEvent(`NEWUSERINFO_PROFILEPIC_MYPROFILE`, 'CONTROL', {
                            'USER_ID': this.getUserDetails.userId
                        });
                    }
                    else {
                        this.triggerAnanlyticsEvent(`UPDATEUSERINFO_PROFILEPIC_MYPROFILE`, 'CONTROL', {
                            'USER_ID': this.getUserDetails.userId
                        });
                    }
                    break;
            }

        },
        triggerSettingsEvent() {
            this.triggerAnanlyticsEvent(`CLICKSETTINGS_MYPROFILEM_MYPROFILE`, 'CONTROL', {
                'USER_ID': this.getUserDetails.userId
            });
        },
        triggerEventAndFollowOrUnfollowAuthor() {
            let action = !this.getAuthorData.following ? 'FOLLOW' : 'UNFOLLOW';
            this.triggerAnanlyticsEvent(`${action}_USERM_USER`, 'CONTROL', {
                'USER_ID': this.getUserDetails.userId,
                'ENTITY_VALUE': this.getAuthorData.followCount,
                'AUTHOR_ID': this.getAuthorData.authorId
            });

            if (this.getUserDetails.isGuest) {
                // throw popup modal
                console.log(this.$route);
                this.setAfterLoginAction({ action: `${this.$route.meta.store}/followOrUnfollowAuthor` });
                this.openLoginModal(this.$route.meta.store, action, this.screenLocation);
            } else {
                this.followOrUnfollowAuthor();
            }
        },

        messageUser() {
            this.triggerAnanlyticsEvent('STARTCHAT_USERM_USER', 'CONTROL', {
                'USER_ID': this.getUserDetails.userId,
                'RECEIVER_ID': this.getAuthorData.authorId
            });

            if (this.getUserDetails.isGuest) {
                this.setAfterLoginAction({ action: `${this.$route.meta.store}/triggerRouteToMessageUser`, data: true });
                this.openLoginModal(this.$route.meta.store, 'STARTCHAT', 'USER_USERM');
            } else {
                this.$router.push({path : '/messages/' + this.getAuthorData.user.userId, query : {profileImageUrl:this.getAuthorData.profileImageUrl, displayName: this.getAuthorData.fullName, profileUrl: this.getAuthorData.pageUrl}});
            }
        },

        openShareModal() {
            if (this.getUserDetails.author.authorId === this.getAuthorData.authorId) {
                this.triggerAnanlyticsEvent(`CLICKSHRUSER_MYPROFILEM_MYPROFILE`, 'CONTROL', {
                    'USER_ID': this.getUserDetails.userId,
                    'AUTHOR_ID': this.getAuthorData.authorId
                });
                this.setShareDetails({ data: this.getAuthorData, type: 'AUTHOR', screen_name: 'MYPROFILE', screen_location: 'MYPROFILEM' });
            }
            else {
                this.triggerAnanlyticsEvent(`CLICKSHRUSER_USERM_USER`, 'CONTROL', {
                    'USER_ID': this.getUserDetails.userId,
                    'AUTHOR_ID': this.getAuthorData.authorId
                });
                this.setShareDetails({ data: this.getAuthorData, type: 'AUTHOR', screen_name: 'USER', screen_location: 'USERM' });
            }
            $('#share_modal').modal('show');
        },
        triggerCoverImageUpload(event) {
            const formData = new FormData();
            formData.append('ko_unique_2', event.target.files[0], event.target.files[0].name);
            this.uploadCoverImage(formData);
        },
        triggerProfileImageUpload(event) {
            const formData = new FormData();
            formData.append('ko_unique_4', event.target.files[0], event.target.files[0].name);
            this.uploadProfileImage(formData);
        },
        editAuthorSummary() {
            this.openInputModal();
        },
        detectOverflow() {
            const element = $('.profile-summary p');
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
    watch: {
        'getRouteToMessageUserState'(state) {
            if (state) {
                this.triggerRouteToMessageUser(false);
                this.$router.push({path : '/messages/' + this.getAuthorData.user.userId, query : {profileImageUrl:this.getAuthorData.profileImageUrl, displayName: this.getAuthorData.fullName, profileUrl: this.getAuthorData.pageUrl}});
            }
        },
        'getAuthorData.authorId'(newValue) {

            if (newValue) {
                this.fetchInitialPublishedContents({
                    authorId: newValue,
                    resultCount: 10
                });

                this.fetchInitialAuthorFollowingUsers({
                    userId: this.getAuthorData.user.userId,
                    resultCount: 20
                });

                this.fetchInitialAuthorFollowerUsers({
                    authorId: newValue,
                    resultCount: 20
                });

                if (this.getUserDetails.author.authorId === this.getAuthorData.authorId) {
                    this.fetchInitialLibraryList(10);
                }

            }
        },
        '$route.params.user_slug' (user_slug) {
            this.fetchAuthorDetails(user_slug);
        },
        'scrollPosition'(newScrollPosition){
            const nintyPercentOfList = ( 50 / 100 ) * $('.author-page').innerHeight();

            if (newScrollPosition > nintyPercentOfList) {
                if (this.publishedContentsLoadingState !== 'LOADING' && this.getPublishedContentsCursor) {
                    this.fetchMorePublishedContents({
                        authorId: this.getAuthorData.authorId,
                        resultCount: 10
                    });
                }
                if (this.getAuthorFollowingLoadingState !== 'LOADING' && this.getAuthorFollowingCursor) {
                    this.fetchMoreAuthorFollowingUsers({
                        userId: this.getAuthorData.user.userId,
                        resultCount: 5
                    });
                }
                if (this.getAuthorFollowersLoadingState !== 'LOADING' && this.getAuthorFollowersCursor) {
                    this.fetchMoreAuthorFollowerUsers({
                        authorId: this.getAuthorData.authorId,
                        resultCount: 5
                    });
                }
            }
        },
        getAuthorDataLoadingState(state) {
            if (state === 'LOADING_SUCCESS') {
                if (decodeURI(this.$route.path) !== this.getUserDetails.profilePageUrl) {
                    setTimeout(() => {
                        this.goToPublishedContentsTab();
                    }, 0);

                }

                if (decodeURI(this.$route.path) !== this.getUserDetails.profilePageUrl) {
                    this.triggerAnanlyticsEvent('LANDED_USERM_USER', 'CONTROL', {
                        'USER_ID': this.getUserDetails.userId,
                        'PARENT_ID': this.getAuthorData.user.userId,
                        'AUTHOR_ID': this.getAuthorData.authorId
                    });
                }

                if (decodeURI(this.$route.path) === this.getUserDetails.profilePageUrl) {
                    this.triggerAnanlyticsEvent('LANDED_MYPROFILEM_MYPROFILE', 'CONTROL', {
                        'USER_ID': this.getUserDetails.userId
                    });
                }

                const that = this;
                setTimeout(() => {
                    that.detectOverflow();
                }, 0);
            }
        }
    },
    created() {
        const { user_slug } = this.$route.params;
        this.fetchAuthorDetails(user_slug);
    },
    components: {
        MainLayout,
        PratilipiComponent,
        AuthorCard,
        Spinner
    },
    mounted() {
        window.addEventListener('scroll', this.updateScroll);
        if (decodeURI(this.$route.path) !== this.getUserDetails.profilePageUrl && this.getUserDetails.profilePageUrl !== undefined) {
            this.goToPublishedContentsTab();
        }
    },
    destroyed() {
        window.removeEventListener('scroll', this.updateScroll);
    },
}
</script>

<style lang="scss" scoped>
.author-page {
    background: #fff;
    margin-top: 85px;
    text-align: left;
    min-height: 700px;
    @media screen and (max-width: 992px ) {
        margin-top: 65px;
    }
    .profile-top {
        padding: 0;
        text-align: center;
        .profile-cover {
            width: 100%;
            height: 150px;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            position: relative;
            .cover-options {
                position: absolute;
                top: 10px;
                right: 10px;
                button, a {
                    background: rgba(255,255,255,0.7);
                    border: 0;
                    display: inline-block;
                    color: #2c3e50;
                    outline: none;
                    cursor: pointer;
                    padding: 5px 10px;
                    text-align: center;
                    i {
                        vertical-align: middle;
                        font-size: 18px;
                        height: 24px;
                        line-height: 23px;
                    }
                }
            }
        }
        .profile-image {
            width: 130px;
            height: 130px;
            background: #fff;
            border: 1px solid #e9e9e9;
            padding: 4px;
            margin: -80px auto 0;
            border-radius: 50%;
            position: relative;
            img {
                width: 120px;
                height: 120px;
                border-radius: 50%;
            }
            .update-img {
                bottom: 5px;
                left: 45px;
            }
            .uploading {
                margin: -1px 0 0 -3px;
                .spinner {
                    padding-top: 50px;
                }
            }
        }
        .update-img {
            position: absolute;
            bottom: 0;
            right: 0;
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
            position: absolute;
            top: 0;
            width: 100%;
            .spinner {
                padding-top: 80px;
            }
        }
        .follow-btn-w-count {
            color: #fff;
            margin: 10px auto;
            font-size: 14px;
            position: relative;
            text-align: center;
            display: inline-block;
            vertical-align: middle;
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
        .message-btn {
            background: #fff;
            color: #d0021b;
            display: inline-block;
            border-radius: 3px;
            vertical-align: middle;
            font-size: 14px;
            text-align: center;
            padding: 5px 10px;
            margin-left: 10px;
            border: 1px solid #d0021b;
            cursor: pointer;
            i {
                vertical-align: middle;
                padding-right: 5px;
                font-size: 18px;
            }
        }
        .profile-user-name {
            font-weight: bold;
            margin: 5px 0 0;
        }
        .profile-read-by {
            font-size: 12px;
            margin: 5px 0;
            color: #555;
        }
        .profile-summary {
            overflow: hidden;
            .head-title {
                text-align: left;
                font-weight: bold;
                font-size: 16px;
                margin-left: 10px;
                span {
                    vertical-align: middle;
                }
                button{
                    vertical-align: baseline;
                    background: none;
                    border: 0;
                    padding: 0 10px;
                    &:focus {
                        outline: none;
                    }
                    i {
                        font-size: 18px;
                        vertical-align: middle;
                        line-height: 19px;
                    }
                }

            }
            p {
                margin: 2px 5px 5px 10px;
                font-size: 14px;
                color: #555;
                height: 61px;
                text-align: left;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
            }
            .view-more {
                text-align: center;
                background: #fff;
                color: #d00b12;
                border: 0;
                outline: none;
                cursor: pointer;
                font-size: 12px;
                float: right;
                margin: 0 10px 5px;
            }
        }
        .stats-section {
            margin: 20px 0;
            text-align: center;
            border-top: 1px solid #e9e9e9;
            border-bottom: 1px solid #e9e9e9;
            font-size: 12px;
            color: #555;
            display: none;
            div {
                display: inline-block;
                width: 32%;
                border-right: 1px solid #e9e9e9;
                padding: 5px;
                &:last-child {
                    border-right: 0;
                }
                span {
                    display: block;
                    font-size: 14px;
                    font-weight: bold;
                }
            }
        }
        .summary-modal {
            text-align: left;
            font-size: 14px;
            margin: 50px 0 0;
            .modal-title {
                font-size: 14px;
            }
        }
    }
    .profile-bottom {
        margin: 10px 0;
        position: relative;
        .profile-menu {
            border-bottom: 1px solid #e9e9e9;
            padding: 8px 0 10px;
            text-align: left;
            overflow: hidden;
            width: 100%;
            overflow-x: auto;
            white-space: nowrap;
            a {
                color: #555;
                font-size: 13px;
                border-bottom: 2px solid #fff;
                padding: 5px 5px 11px;
                span {
                    font-size: 12px;
                    font-weight: bold;
                    padding: 0 2px;
                    margin-right: 5px;
                    display: inline-block;
                    text-align: center;
                }
                &.active {
                    color: #d0021b;
                    border-color: #d0021b;
                    span {
                        color: #d0021b;
                    }
                }
                &:hover {
                    text-decoration: none;
                    color: #d0021b;
                }
            }
        }
        .list {
            display: none;
            margin: 10px 0;
            @media screen and (max-width: 768px ) {
                text-align: center;
            }
            &#library {
                display: block;
            }
            p.message {
                margin: 15px 15px 15px 0;
                font-size: 14px;
                color: #555;
            }
        }
        a.view_more {
			position: relative;
            display: inline-block;
            vertical-align: text-bottom;
			.view_more_card {
				width: 294px;
				background: #fff;
				border: 1px solid #e9e9e9;
				height: 233px;
				margin: 0 10px;
				color: #d0021b;
                text-align: center;
                display: inline-block;
                @media screen and (max-width: 760px) {
                width: 255px;

                }
				i {
					height: 190px;
					line-height: 190px;
					width: 100%;
					font-size: 50px;
					border-bottom: 1px solid #e9e9e9;
				}
				span {
					height: 41px;
					line-height: 37px;
					display: block;
				}
			}
			&:hover {
				text-decoration: none;
			}
		}
    }
}
</style>
