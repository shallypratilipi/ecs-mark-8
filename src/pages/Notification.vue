<template>
    <MainLayout>
        <div class="notification-page page-wrap">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <ul class="tab-menu">
                            <li @click="tabchange" class="active" data-tab="notifications">__("notification_notifications")</li>
                            <li @click="tabchange" data-tab="messages">__("chat_messages") <span class="message-dot" v-if="messageNotificationList.length > 0"></span></li>
                        </ul>
                        <router-link
                        class="notification-settings"
                        :to="'/settings?action=notification'"
                        v-if="!getUserDetails.isGuest">
                            <i class="material-icons">settings</i>
                        </router-link>

                        <div class="tab-content" id="notifications">
                            <div class="card" v-if="getUserDetails.isGuest">
                                <div class="head-title">__("seo_login_page")</div>
                                <div class="card-content">
                                    <p><i class="material-icons">check_circle</i> __("user_login_to_view_notifications")</p>
                                    <p><i class="material-icons">check_circle</i> __("android_banner_notification_1")</p>
                                    <p><i class="material-icons">check_circle</i> __("android_banner_notification_2")</p>
                                    <button type="button" class="btn" data-toggle="modal" data-target="#login_modal">__("user_sign_in") / __("user_sign_up")</button>
                                </div>
                            </div>
                            <ul v-if="getNotificationLoadingState === 'LOADING_SUCCESS' || getNotifications.length > 0" class="notifications">
                                <li v-for="each_notification in getNotifications" :key="each_notification.notificationId" :class="each_notification.state.toLowerCase()">
                                    <router-link
                                    :to="each_notification.sourceUrl"
                                    @click.native="changeNotificationStatusToRead(each_notification.notificationId)">
                                        <span class="notif-display-image"><img :src="each_notification.displayImageUrl" alt="notification"></span>
                                        <span class="message-wrap">
                                            <span class="notif-message" v-html="each_notification.message"></span>
                                            <span class="notif-date">{{ each_notification.lastUpdatedMillis | convertDate }}</span>
                                        </span>
                                        <span class="notif-source-image" v-if="each_notification.sourceImageUrl"><img :src="each_notification.sourceImageUrl" alt="notification"></span>
                                    </router-link>
                                </li>
                            </ul>
                            <p class="message" v-if="getNotificationLoadingState === 'LOADING_SUCCESS' && getNotifications.length == 0">__("notifications_no_notifications")</p>
                            <p class="message" v-if="getNotificationLoadingState === 'LOADING_ERROR'">
                                <ServerError :action="'fetchInitialNotifications'" :data="{language: getCurrentLanguage().fullName.toUpperCase(), resultCount: 20}" :message="'__('notifications_load_failed')'"></ServerError>
                            </p>
                        </div>

                        <div class="tab-content" id="messages">
                            <div class="card" v-if="getUserDetails.isGuest">
                                <div class="head-title">__("seo_login_page")</div>
                                <div class="card-content">
                                    <p><i class="material-icons">check_circle</i> __("chat_guest_msg")</p>
                                    <button type="button" class="btn" data-toggle="modal" data-target="#login_modal">__("user_sign_in") / __("user_sign_up")</button>
                                </div>
                            </div>
                            <ul class="chat-list" v-if="!getUserDetails.isGuest">
                                <li class="chat-item" v-for="messageNotification in messageNotificationList" v-bind:key="messageNotification.messageId">
                                    <router-link @click.native="triggerConversationEvent(messageNotification.userId)"
                                        :to="'/messages/' + messageNotification.userId">
                                    <div>
                                        <div class="user-img"><img v-bind:src="messageNotification.profileImageUrl" alt="profile-img"></div>
                                        <div class="chat-wrap">
                                            <div class="user-info">
                                                <div class="user-name" v-text="messageNotification.channelName"></div>
                                                <div class="user-last-msg" v-text="messageNotification.lastMessage"></div>
                                            </div>
                                            <div class="chat-info" v-bind:class="{'unread' : messageNotification.isUnread == true}">
                                                <div class="chat-time" v-text="messageNotification.lastMessageTimeDisplay">11:30 PM</div>
                                            </div>
                                        </div>
                                    </div>
                                    </router-link>
                                </li>
                                <li class="no-messages" v-if="messageNotificationList.length == 0">__("chat_no_unread_msgs")</li>
                            </ul>

                            <router-link
                            class="show-more"
                            @click.native="triggerAllMessagesEvent"
                            :to="{ name: 'Messages_Page'}"
                            v-if="!getUserDetails.isGuest">
                            __("chat_show_all")
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<script>
import MainLayout from '@/layout/main-layout.vue';
import ServerError from '@/components/ServerError.vue';
import { mapGetters, mapActions } from 'vuex';
import constants from '@/constants';
import mixins from '@/mixins';

export default {
    name: 'Pratilipi',
    data() {
        return {
            user_id: null,
            scrollPosition: null
        }
    },
    mixins: [
        mixins
    ],
    computed: {
        ...mapGetters([
            'getNotifications',
            'getNotificationLoadingState',
            'getNotificationCursor',
            'getUserDetails',

            'messageNotificationList',
            'fetchedChannelMetadataData',
            'channelLastReadMessage'
        ])
    },
    methods: {
        ...mapActions([
            'changeNotificationStatusToRead',
            'fetchMoreNotifications',
            'loadMessagesForConversation'
        ]),
        updateScroll() {
            this.scrollPosition = window.scrollY
        },
        tabchange(event) {
            event.preventDefault();
            var tab_id = $(event.currentTarget).attr('data-tab');
            $(".tab-menu li").removeClass("active");
            $(event.currentTarget).addClass("active");
            $(".tab-content").hide();
            $("#" + tab_id).show();

            if (tab_id === 'messages') {
                this.triggerAnanlyticsEvent('LANDED_NEWCHATS_NOTIFS', 'CONTROL', {
                    'USER_ID': this.getUserDetails.userId
                });
                $(".notification-settings").hide();
            }
            if (tab_id === 'notifications') {
                $(".notification-settings").show();
            }
        },
        triggerConversationEvent(receiver_id) {
            this.triggerAnanlyticsEvent('STARTCHAT_NEWCHATS_NOTIFS', 'CONTROL', {
                'USER_ID': this.getUserDetails.userId,
                'RECEIVER_ID': receiver_id
            });
        },
        triggerAllMessagesEvent() {
            this.triggerAnanlyticsEvent('VIEWALLCHATS_NEWCHATS_NOTIFS', 'CONTROL', {
                'USER_ID': this.getUserDetails.userId
            });
        }
    },
    created() {

    },
    watch: {
        'scrollPosition'(newScrollPosition){
            const nintyPercentOfList = ( 40 / 100 ) * $('.notification-page').innerHeight();
            // const { list_page_url } = this.$route.params;

            if (newScrollPosition > nintyPercentOfList && this.getNotificationLoadingState !== 'LOADING' && this.getNotificationLoadingState !== 'LOADING_ERROR' && this.getNotificationCursor !== null) {
                const currentLocale = process.env.LANGUAGE;
                constants.LANGUAGES.forEach((eachLanguage) => {
                    if (eachLanguage.shortName === currentLocale) {
                        this.fetchMoreNotifications({
                            language: eachLanguage.fullName.toUpperCase(),
                            resultCount: 20
                        });
                    }
                });

            }
        }
    },
    mounted() {
        window.addEventListener('scroll', this.updateScroll);
        this.triggerAnanlyticsEvent('LANDED_NOTIFSM_NOTIFS', 'CONTROL', {
            'USER_ID': this.getUserDetails.userId
        });
    },
    destroyed() {
        window.removeEventListener('scroll', this.updateScroll);
    },
    components: {
        MainLayout,
        ServerError
    }
}
</script>

<style lang="scss" scoped>
.notification-page {
    margin-top: 85px;
    text-align: left;
    min-height: 700px;
    @media screen and (max-width: 992px ) {
        margin-top: 65px;
    }
    h2 {
        font-size: 24px;
        font-weight: bold;
        text-align: left;
        border-left: 3px solid #d0021b;
        padding-left: 10px;
        margin: 10px 0;
        position: relative;
    }
    .notification-settings {
        position: absolute;
        right: 10px;
        top: 8px;
        color: #2c3e50;
        z-index: 2;
        i {
            vertical-align: middle;
        }
    }
    p.message {
        margin: 15px 15px 15px 0;
        font-size: 14px;
        color: #555;
    }
    .card {
        border-radius: 0;
        margin: 20px 0;
        padding: 0;
        text-align: center;
        .head-title {
            font-size: 18px;
            font-weight: bold;
            text-align: left;
            border-left: 3px solid #d0021b;
            padding-left: 10px;
            margin: 10px 0 0;
        }
        .card-content {
            padding: 5px 10px 10px;
            text-align: left;
            p {
                text-align: left;
                font-size: 14px;
                margin: 10px 0;
                i {
                    font-size: 16px;
                    vertical-align: middle;
                    color: #9E9E9E;
                    padding-right: 5px;
                }
            }
            button {
                background: #d00b12;
                color: #fff;
                margin: 10px 0;
            }
        }
    }
    .notifications {
        padding: 0;
        margin: 20px 0;
        li {
            list-style: none;
            margin: 10px 0;
            padding: 10px 0;
            border-bottom: 1px solid #e9e9e9;
            position: relative;
            z-index: 1;
            &.unread {
                background: rgba(208, 2, 27, 0.1);
            }
            a {
                text-decoration: none;
                color: #212121;
                display: block;
                font-size: 14px;
                .notif-display-image {
                    width: 30px;
                    height: 30px;
                    overflow: hidden;
                    position: relative;
                    display: inline-block;
                    border-radius: 50%;
                    margin: 0 5px;
                    vertical-align: top;
                    img {
                        max-width: 100%;
                    }
                }
                .message-wrap {
                    width: calc(100% - 100px);
                    display: inline-block;
                }
                .notif-date {
                    display: block;
                    font-size: 12px;
                    margin-top: 5px;
                }
                .notif-source-image {
                    width: 40px;
                    height: 60px;
                    overflow: hidden;
                    position: relative;
                    display: inline-block;
                    margin: 0 5px;
                    vertical-align: top;
                    img {
                        max-width: 100%;
                    }
                }
            }
        }
    }
    .tab-menu {
        border-bottom: 1px solid #e9e9e9;
        padding: 8px 0 0;
        margin: 0;
        text-align: left;
        overflow: hidden;
        width: 100%;
        overflow-x: auto;
        white-space: nowrap;
        cursor: pointer;
        position: relative;
        z-index: 1;
        li {
            color: #555;
            font-size: 13px;
            border-bottom: 2px solid #fff;
            padding: 5px 25px 11px;
            display: inline-block;
            a {
                color: #555;
            }
            &.active {
                color: #d0021b;
                border-color: #d0021b;
            }
            &:hover {
                text-decoration: none;
                color: #d0021b;
            }
            span.message-dot {
                width: 6px;
                height: 6px;
                background: #d0021b;
                display: inline-block;
                border-radius: 50%;
                vertical-align: top;
                position: absolute;
                margin: 2px;
            }
        }
    }
}

#notifications {
    display: block;
}
.tab-content {
    display: none;
    .chat-list {
        margin: 0;
        padding: 0;
        width: 100%;
        overflow: hidden;
        background: #fff;
        .chat-item {
            list-style: none;
            overflow: hidden;
            padding: 5px 0;
            .user-img {
                float: left;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                overflow: hidden;
                margin: 7px 0;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .chat-wrap {
                border-bottom: 1px solid #E1E1E1;
                float: left;
                width: calc(100% - 75px);
                padding: 12px 0;
                margin-left: 15px;
                text-align: left;
            }
            .user-info {
                float: left;
                width: calc(100% - 65px);
                margin-right: 5px;
                .user-name {
                    font-size: 15px;
                    color: #4A4A4A;
                    line-height: 18px;
                    font-weight: 700;
                    width: 100%;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .user-last-msg {
                    color: #757575;
                    font-size: 14px;
                    width: 100%;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
            .chat-info {
                float: right;
                width: 60px;
                text-align: right;
                color: #9B9B9B;
                font-size: 11px;
                &.unread .chat-time {
                    color: #D0021B;
                }
                &.unread::after {
                    content: "";
                    display: block;
                    color: #D0021B;
                    width: 10px;
                    height: 10px;
                    background: #D0021B;
                    float: right;
                    margin: 5px 0;
                    border-radius: 50%;
                }
            }
        }
    }
}
.show-more {
    display: block;
    text-align: center;
    margin: 10px 0;
    font-size: 14px;
    color: #d00c12;
}
.no-messages {
    margin: 10px 0;
    color: #555;
    text-align: center;
}
</style>
