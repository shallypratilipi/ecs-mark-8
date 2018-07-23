<template>
    <div class="follow-wrap">
        <div class="follow">
            <router-link :to="authorData.pageUrl" @click.native="triggerUserClick">
                <div class="follow-img" v-bind:style="{ backgroundImage: 'url(' + authorData.profileImageUrl + (authorData.profileImageUrl.endsWith('/author/image') ? '?' : '&')  + 'width=100)' }"></div>
                <div v-if="authorData.displayName || authorData.displayName === ''" class="follow-name">{{ authorData.displayName }}</div>
                <div v-else class="follow-name">{{ authorData.displayName }}</div>
            </router-link>
            <div class="follow-count">__("author_followers"):
                <span v-if="authorData.followCount !== undefined">{{ authorData.followCount}}</span>
                <span v-else>0 </span>
            </div>

            <span class="button-container">
                <span v-if="authorData.authorId === undefined && authorData.authorId !== getUserDetails.authorId">
                    <button class="btn btn-light follow-link"
                        v-if="authorData.following === false"
                        @click="verifyAndFollowOrUnfollowAuthor({ authorId: authorData.authorId, following: false })">
                        <i class="material-icons">person_add</i>
                        __("author_follow")
                    </button>
                    <button v-else @click="verifyAndFollowOrUnfollowAuthor({ authorId: authorData.authorId, following: true })" class="btn btn-light follow-link">
                        <i class="material-icons">check</i>
                        __("author_following")
                    </button>
                </span>
                <span v-if="authorData.authorId !== undefined && authorData.authorId !== getUserDetails.authorId">
                    <button class="btn btn-light follow-link"
                    v-if="authorData.following === false"
                    @click="verifyAndFollowOrUnfollowAuthor({ authorId: authorData.authorId, following: false })">
                        <i class="material-icons">person_add</i> __("author_follow")
                    </button>
                    <button v-else @click="verifyAndFollowOrUnfollowAuthor({ authorId: authorData.authorId, following: true })" class="btn btn-light follow-link">
                        <i class="material-icons">check</i> __("author_following")
                    </button>
                </span>
            </span>

        </div>
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import mixins from '@/mixins';

export default {
    name: 'Author-Card',
    props: {
        authorData: {
            type: Object,
            required: true
        },
        followOrUnfollowAuthor: {
            type: Function,
            required: true
        },
        inFollowersTab: {
            type: Boolean
        },
        inFollowingTab: {
            type: Boolean
        },
        screenName: {
            type: String,
            required: true
        },
        screenLocation: {
            type: String,
            required: true
        }
    },
    mixins: [
        mixins
    ],
    data() {
        return {

        }
    },
    computed: {
        ...mapGetters([
            'getUserDetails'
        ])
    },
    methods: {
        ...mapActions([
            'setAfterLoginAction'
        ]),
        verifyAndFollowOrUnfollowAuthor(data) {
            let action = !data.following ? 'FOLLOW' : 'UNFOLLOW';
            this.triggerAnanlyticsEvent(`${action}_${this.screenLocation}_${this.screenName}`, 'CONTROL', {
                'USER_ID': this.getUserDetails.userId,
                'ENTITY_VALUE': this.authorData.followCount !== undefined ? this.authorData.followCount : this.authorData.author.followCount,
                'PARENT_ID': this.authorData.userId !== undefined ? this.authorData.userId : this.authorData.user !== undefined ? this.authorData.user.userId : null,
                'AUTHOR_ID': this.authorData.authorId !== undefined ? this.authorData.authorId : this.authorData.author.authorId
            });
            if (this.getUserDetails.isGuest) {
                if (this.inFollowingTab) {
                    this.setAfterLoginAction({ action: `${this.$route.meta.store}/followOrUnfollowFollowing`, data });
                } else if (this.inFollowersTab) {
                    this.setAfterLoginAction({ action: `${this.$route.meta.store}/followOrUnfollowFollowers`, data });
                } else {
                    this.setAfterLoginAction({ action: `${this.$route.meta.store}/followOrUnfollowAuthor`, data });
                }

                this.openLoginModal(this.$route.meta.store, 'FOLLOW', 'USERRESULT');
            } else {
                this.followOrUnfollowAuthor(data);
            }
        },
        triggerUserClick() {
            this.triggerAnanlyticsEvent(`CLICKUSER_${this.screenLocation}_${this.screenName}`, 'CONTROL', {
                'USER_ID': this.getUserDetails.userId,
                'ENTITY_VALUE': this.authorData.followCount !== undefined ? this.authorData.followCount : this.authorData.author.followCount,
                'PARENT_ID': this.authorData.userId !== undefined ? this.authorData.userId : this.authorData.user !== undefined ? this.authorData.user.userId : null,
                'AUTHOR_ID': this.authorData.authorId !== undefined ? this.authorData.authorId : this.authorData.author.authorId
            });
        }
    },
    components: {

    },
    created() {
        this.authorData.followCount = this.authorData.followCount || this.authorData.followersCount;
        this.authorData.following = this.authorData.following || this.authorData.following;
        this.authorData.pageUrl = this.authorData.pageUrl || this.authorData.author.pageUrl;
        this.authorData.profileImageUrl = this.authorData.profileImageUrl || this.authorData.author.profileImageUrl;
        this.authorData.displayName = this.authorData.name || this.authorData.author.displayName;
        this.authorData.authorId = this.authorData.authorId || this.authorData.author.id;
        this.authorData.userId = this.authorData.userId || this.authorData.user !== undefined ? this.authorData.user.id : null;
        console.log("Author card authorID"+this.authorData)
    }
}
</script>

<style  lang="scss" scoped>
.follow-wrap {
    display: inline-block;
    overflow: hidden;
}
.follow {
    border: 1px solid #e9e9e9;
    width: 150px;
    display: inline-block;
    margin: 4px;
    position: relative;
    text-align: center;
    a {
        color: #d0021b;
    }
    .follow-img {
        display: block;
        width: 100px;
        height: 100px;
        margin: 10px auto;
        border-radius: 50%;
        background: #eee;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }
    .follow-name {
        font-size: 12px;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 100%;
        min-height: 23px;
        overflow: hidden;
        padding: 0 5px 5px;
    }
    .follow-link {
        background: #d0021b;
        color: #fff;
        font-size: 12px;
        margin: 10px 0;
        i {
            font-size: 16px;
            vertical-align: middle;
        }
    }
    span.button-container {
        height: 50px;
        display: block;
    }
    .follow-count {
        font-size: 11px;
        margin: 0;
        span {
            font-weight: bold;
        }
    }
}
</style>
