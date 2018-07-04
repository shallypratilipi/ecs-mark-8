<template>
    <div class="message-button" v-bind:class="[className]" @click="messageUser">
        <i class="material-icons">chat</i> <span v-if="!hideText">__("chat_message")</span>
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import inViewport from 'vue-in-viewport-mixin';
import mixins from '@/mixins';

export default {
    name: 'Message-Button',
    props: {
        authorId: {
            type: Number,
            required: true
        },
        getRouteToMessageUserState: {
            type: Boolean
        },
        triggerRouteToMessageUser: {
            type: Function,
            required: true
        },
        authorUserId: {
            type: Number,
            required: true
        },
        profileImageUrl: {
            type: String,
            required: true
        },
        fullName: {
            type: String,
            required: true
        },
        pageUrl: {
            type: String,
            required: true
        },
        className: {
            type: String
        },
        hideText: {
            type: Boolean
        },
        screenName: {
            type: String,
            required: true
        },
        locationName: {
            type: String,
            required: true
        },
        experimentId: {
            type: String,
            default: 'CONTROL'
        }
    },
    mixins: [
        mixins
    ],
    computed: {
        ...mapGetters([
            'getUserDetails'
        ])
    },
    methods: {
        ...mapActions('pratilipipage', [
            'fetchAuthorDetails'
        ]),
        ...mapActions([
            'setAfterLoginAction'
        ]),
        goToMessageUserPage() {
            this.$router.push({path : '/messages/' + this.authorUserId, query : {profileImageUrl:this.profileImageUrl, displayName: this.fullName, profileUrl: this.pageUrl}});
        },
        messageUser() {
            this.triggerAnanlyticsEvent(`STARTCHAT_${this.locationName}_${this.screenName}`, this.experimentId, {
                'USER_ID': this.getUserDetails.userId,
                'RECEIVER_ID': this.authorId
            });

            if (this.getUserDetails.isGuest) {
                this.setAfterLoginAction({ action: `${this.$route.meta.store}/triggerRouteToMessageUser`, data: true });
                this.openLoginModal(this.$route.meta.store, 'STARTCHAT', 'USER_USERM');
            } else {
                this.goToMessageUserPage();
            }
        }
    },
    components: {

    },
    watch: {
        'getRouteToMessageUserState'(state) {
            console.log(state);
            if (state) {
                this.triggerRouteToMessageUser(false);
                this.goToMessageUserPage();
            }
        }
    },
    created() {
        if (this.getRouteToMessageUserState) {
            this.triggerRouteToMessageUser(false);
            this.goToMessageUserPage();
        }
    }
}
</script>

<style  lang="scss" scoped>
    .message-button {
        background: #fff;
        color: #d0021b;
        display: inline-block;
        border-radius: 3px;
        vertical-align: middle;
        font-size: 14px;
        text-align: center;
        padding: 5px 10px;
        border: 1px solid #d0021b;
        cursor: pointer;
        float: left;
        margin: 5px 10px 10px;
        height: 35px;
        transition: all 0.5s;
        &:hover {
            background: #d0021b;
            color: #fff;
        }
        i {
            vertical-align: middle;
            padding-right: 5px;
            font-size: 18px;
        }
        &.message-icon {
            display: inline-block;
            float: none;
            margin: 0 0 0 10px;
            border-radius: 50%;
            width: 35px;
            padding: 0;
            line-height: 32px;
            i {
                padding: 0;
            }
        }
        &.profile-page-msg {
            float: none;
            margin-top: 10px;
        }
    }
</style>
