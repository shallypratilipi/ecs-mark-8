<template>
    <MessageLayout>
        <div class="message-page page-wrap">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12 p-0">
                        <div class="chat-header individual">
                            <div class="back-btn"><i class="material-icons" v-on:click="redirectToMessagesPage()">arrow_back</i></div>
                            <div class="user-img" :style="{ backgroundImage: 'url(' + conversationImageUrlScaled + ')' }"></div>
                            <div class="user-name" v-text="conversationDisplayName">Rahul</div>
                            <button class="options" type="button" id="chat-user-more-option" data-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false">
                                <i class="material-icons">more_vert</i>
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <button type="button" class="btn report-btn"  v-on:click="redirectToOtherUserProfile()">__("chat_view_profile")</button>
                                <button type="button" class="btn report-btn" data-toggle="modal" data-target="#confirmation" v-if="messageList.length > 0">__("pratilipi_delete_content")</button>
                                <button type="button" class="btn report-btn" v-if="isUserBlockedBySelf != true" v-on:click="blockUser()">__("chat_block_user")
                                </button>
                                <button type="button" class="btn report-btn" v-if="isUserBlockedBySelf == true" v-on:click="unblockUser()">__("chat_unblock_user")
                                </button>
                            </div>
                        </div>
                        <Spinner v-if="loadingMessages == true"></Spinner>
                        <div id="p2p-chat-body" class="chat-body">
                            <div id="all-messages" class="all-messages">
                                <div v-for="message in messageList" v-bind:key="message.messageId">
                                    <div class="chat-date" v-if="message.isFirstMessageOfDay"><span
                                        v-text="message.dayDefenition">TODAY</span>
                                    </div>
                                    <div class="chat-msg"
                                         v-bind:class="{'sender' : message.isMessageBySelf == false, 'self' : message.isMessageBySelf == true}" v-bind:id="message.messageId">
                                        <span class="msg-text" v-html="message.messageText" v-linkified></span>
                                        <div class="extra-info">
                                            <span class="time" v-text="message.messageTime">16:40</span>
                                            <span class="status sent error" v-if="failedMessages.indexOf(message.messageId) > -1"><i class="material-icons">error</i></span>
                                            <span class="status sending" v-if="pendingMessages.indexOf(message.messageId) > -1"><i class="material-icons">access_time</i></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="typing-wrap" v-if="isOtherUserTyping">
                                <div class="typing">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                            <div class="message-blocked fixed-msg" v-if="isUserBlockedBySelf == true" id="unblock-user-panel-message">
                                __("chat_unblock_user_msg")
                                <button type="button" class="btn report-btn btn-on-fixed-msg" v-on:click="unblockUser()">__("chat_unblock_user")</button>
                            </div>
                            <div class="message-blocked fixed-msg" v-if="isBlockedByOtherUser == true && isUserBlockedBySelf != true" id="user-blocked-panel-message">
                                __("chat_stopped_msg")
                            </div>
                        </div>

                        <div class="chat-box" v-if="!isConversationBlocked">
                            <div class="type-message">
                                <textarea id="text-message" :placeholder="'__("chat_textbox_placeholder")'" @keydown="enterToSend"
                                          v-bind:disabled="isConversationBlocked == true"
                                          :value="toSendMessageText"
                                          @input="updateToSendMessageText"></textarea>
                            </div>
                            <button type="button" name="button" class="send-message"
                                    v-bind:disabled="isConversationBlocked == true || toSendMessageText.trim().length == 0"
                                    v-on:click.prevent="sendMessageToFirebase()"><i class="material-icons">send</i></button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Message Confirmation Modal -->
            <div class="modal fade confirmation" id="confirmation" tabindex="-1" role="dialog" aria-labelledby="confirmationLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">__("pratilipi_delete_content")?</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <i class="material-icons">close</i>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="form-group">
                                    <label>__("chat_delete_msg")</label>
                                </div>
                                <button type="button" class="btn btn-submit" data-dismiss="modal" aria-label="Close">__("cancel")</button>
                                <button type="button" @click="deleteConversation" class="cancel">__("pratilipi_confirm_delete_content_okay")</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </MessageLayout>
</template>

<script>
import MessageLayout from '@/layout/message-layout.vue';
import mixins from '@/mixins'
import Spinner from '@/components/Spinner.vue';
import { mapGetters, mapActions } from 'vuex'
import $ from 'jquery'
import firebase from 'firebase'

export default {

    data() {
        return {
            firebaseGrowthDB: {},
            channelId: "",
            messageList: [],
            toSendMessageText: "",
            isUserBlockedBySelf: false,
            isBlockedByOtherUser: false,
            conversationImageUrl: "",
            conversationImageUrlScaled: "",
            conversationDisplayName: "",
            otherUserId: "",
            otherUserProfileUrl: "",
            isChannelInSelfWatchlist: false,
            isChannelInOtherUserWatchlist: false,
            firstMessageOfDayCheckMap: new Map(),
            isConnectedToServer: false,
            pendingMessages: [],
            failedMessages: [],
            loadingMessages: true,
            listenerCallbacks: [],
            otherUserLastTypedTime: null,
            isOtherUserTyping: false,
            otherUserTypingWatcherInterval: null,
            lastMessageTimeByOtherUser: null
        }
    },
    mixins: [
        mixins
    ],
    computed: {
        ...mapGetters([
            'getUserDetails',
            'getFirebaseGrowthDBLoadingState'
        ]),

        ...mapGetters('messages', [
            'fetchedChannelMetadataDataCached',
        ]),

        isConversationBlocked: function () {
            return this.isUserBlockedBySelf || this.isBlockedByOtherUser;
        }
    },

    methods: {

        ...mapActions('messages', [
            'removeChannelFromCache'
        ]),

        loadConversationsList() {
            redirect('/messages');
        },

        updateToSendMessageText(event) {
            this.toSendMessageText = event.target.value;
        },

        loadMessagesInConversation() {
            const self = this;
            const otherUserWatchedChannelRef = this.firebaseGrowthDB.ref('/CHATS').child('user_watched_channels').child(self.otherUserId).child(self.channelId);
            const otherUserWatchedChannelCallback  = otherUserWatchedChannelRef.on('value', function (snapshot) {
                //console.log("Changed other user watched channel status : ", snapshot.val());
                if (snapshot.val() == true) {
                    self.isChannelInOtherUserWatchlist = true;
                } else {
                    self.isChannelInOtherUserWatchlist = false;
                }
            });
            self.listenerCallbacks.push({ref: otherUserWatchedChannelRef, callback: otherUserWatchedChannelCallback, type:"value"});
            const currentUserWatchedChannelRef = this.firebaseGrowthDB.ref('/CHATS').child('user_watched_channels').child(this.getUserDetails.userId).child(self.channelId);
            const currentUserWatchedChannelCallback = currentUserWatchedChannelRef.on('value', function (snapshot) {
                //console.log("Changed self user watched channel status : ", snapshot.val());
                if (snapshot.val() == true) {
                    self.isChannelInSelfWatchlist = true;
                } else {
                    self.isChannelInSelfWatchlist = false;
                }
            });
            self.listenerCallbacks.push({ref: currentUserWatchedChannelRef, callback: currentUserWatchedChannelCallback, type:"value"});
            //console.log('Loading conversations from firebase DB for channel : ', self.channelId);
            this.firebaseGrowthDB.ref('/CHATS').child('user_channels').child(this.getUserDetails.userId).child(self.channelId).once('value').then(function (snapshot) {
                if (snapshot.val() != undefined) {
                    // console.log("Last read message : ", snapshot.val().lastReadMessage);
                    // console.log("Last deleted message : ", snapshot.val().lastDeletedMessage);
                    self.lastDeletedMessageId = snapshot.val().lastDeletedMessage;
                }
                self.attachMessagesListner();
            });

        },


        parseDateDisplay(sentTime) {
            const self = this;
            let currentDate = new Date();
            let currentDateStart = currentDate.setHours(0, 0, 0, 0);
            let isFirstMessageOfDay = false;
            let dayDefenition = "";
            let messageDate = new Date(sentTime);
            let messageDateKey = messageDate.toLocaleDateString();
            if (!self.firstMessageOfDayCheckMap.has(messageDateKey)) {
                self.firstMessageOfDayCheckMap.set(messageDateKey, true);
                isFirstMessageOfDay = true;
                if (+messageDate >= +currentDateStart) {
                    dayDefenition = "__('chat_today')";
                }
                else {
                    let yesterdayDate = new Date();
                    yesterdayDate.setTime(currentDate.getTime() - (24 * 3600000));
                    let yesterdayDateStart = yesterdayDate.setHours(0, 0, 0, 0);
                    if (+messageDate >= +yesterdayDateStart) {
                        dayDefenition = "__('chat_yesterday')";
                    }
                    else {
                        dayDefenition = messageDateKey;
                    }
                }
            }
            return {isFirstMessageOfDay: isFirstMessageOfDay, dayDefenition: dayDefenition};
        },


        attachMessagesListner () {
            const self = this;
            self.attachMessageChildAddedListener();
            self.attachLastReadUpdater();
            self.loadingMessages = false;
        },


        attachMessageChildAddedListener () {
            const self = this;
            var channelMessagesRef = this.firebaseGrowthDB.ref('/CHATS').child('messages').child(self.channelId).orderByKey();
            if (self.lastDeletedMessageId != undefined) {
                channelMessagesRef = channelMessagesRef.startAt(self.lastDeletedMessageId);
            }
            const messageListenerCallback = channelMessagesRef.on('child_added', function (snapshot) {
                if (self.lastDeletedMessageId == snapshot.key) {
                    //console.log("Skipping the first message, since firebase by default doesnt have a exclusive range query");
                    return;
                }
                //console.log("Message User : Message added : ", snapshot.key, " for channel : ", self.channelId);
                self.isOtherUserTyping = false;
                var toPushMessage = self.buildMessage(snapshot);
                if(toPushMessage.isMessageBySelf != true) {
                    self.lastMessageTimeByOtherUser = new Date();
                }
                self.messageList.push(toPushMessage);
                self.lastDeliveredMessageId = snapshot.key;
                self.$nextTick(() => {self.scrollIntoView(snapshot.key);});
            });
            self.listenerCallbacks.push({ref: channelMessagesRef, callback: messageListenerCallback, type:'child_added'});
        },

        scrollIntoView (elementId) {
            $('#' + elementId)[0].scrollIntoView();
        },


        attachLastReadUpdater () {
            const self = this;
            const lastReadRef = this.firebaseGrowthDB.ref('/CHATS').child('messages').child(self.channelId).limitToLast(1);
            let lastReadCallback = lastReadRef.on('child_added', function (snapshot) {
                //console.log("Message User : Last Read message added : ", snapshot.key, " for channel : ", self.channelId, " Updating the last read message for user");
                self.firebaseGrowthDB.ref('/CHATS').child('user_channels').child(self.getUserDetails.userId).child(self.channelId).child('lastReadMessage').set(snapshot.key);
            });
            self.listenerCallbacks.push({ref: lastReadRef, callback: lastReadCallback, type:"child_added"});
        },


        buildMessage (snapshot) {
            const self = this;
            var message = snapshot.val();
            //console.log("Message added : ", message, " for channel : ", self.channelId);
            var isMessageBySelf = false;
            if (message.senderId == this.getUserDetails.userId) {
                isMessageBySelf = true;
            }
            var dateDisplayParsed = self.parseDateDisplay(message.sendTime);
            var messageTime = new Date(message.sendTime).toLocaleString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            });
            //console.log('Message Time : ', messageTime);
            var toPushMessage = {
                messageId: snapshot.key,
                isMessageBySelf: isMessageBySelf,
                messageText: message.messageText,
                messageTime: messageTime
            };
            toPushMessage.isFirstMessageOfDay = dateDisplayParsed.isFirstMessageOfDay;
            toPushMessage.dayDefenition = dateDisplayParsed.dayDefenition;
            return toPushMessage;
        },


        watchBlockedConversation () {
            const self = this;
            const userBlockedRef = this.firebaseGrowthDB.ref('/CHATS').child('blocked_users').child(this.getUserDetails.userId).child(self.otherUserId);
            let userBlockedCallback = userBlockedRef.on('value', function (snapshot) {
                //console.log("Changed blocked status Value : ", snapshot.val());
                self.isUserBlockedBySelf = snapshot.val();
                if(self.isUserBlockedBySelf == true) {
                    self.$nextTick(() => {
                        self.scrollIntoView("unblock-user-panel-message");
                    });
                }
            });
            self.listenerCallbacks.push({ref: userBlockedRef, callback: userBlockedCallback, type:"value"});
            const otherUserBlockedRef = this.firebaseGrowthDB.ref('/CHATS').child('blocked_users').child(self.otherUserId).child(this.getUserDetails.userId);
            let otherUserBlockedCallback = otherUserBlockedRef.on('value', function (snapshot) {
                self.isBlockedByOtherUser = snapshot.val();
                //console.log("Changed blocked status Value for other user : ", snapshot.val());
                if(self.isUserBlockedBySelf != true && self.isBlockedByOtherUser == true) {
                    self.$nextTick(() => {
                        self.scrollIntoView("user-blocked-panel-message");
                    });
                }
            });
            self.listenerCallbacks.push({ref: otherUserBlockedRef, callback: otherUserBlockedCallback, type:"value"});
        },

        watchOtherUserTyping() {
            var self = this;
            var lastTypedTimeRef = self.firebaseGrowthDB.ref('/CHATS').child('channel_metadata').child(self.channelId).child('users').child(self.otherUserId).child('lastTypedTime');
            let lastTypedCallback = lastTypedTimeRef.on('value', function(snapshot) {
                self.otherUserLastTypedTime = new Date(snapshot.val());
            });
            self.listenerCallbacks.push({ref: lastTypedTimeRef, callback: lastTypedCallback, type:"value"});
        },

        updateOtherUserTypingStatus() {
            var self = this;
            if(self.otherUserLastTypedTime == null) {
                return;
            }
            let twoSecondBeforeDate = new Date();
            twoSecondBeforeDate.setTime(twoSecondBeforeDate.getTime() - (2000));
            if(self.lastMessageTimeByOtherUser != null && +self.lastMessageTimeByOtherUser > +self.otherUserLastTypedTime) {
                self.isOtherUserTyping = false;
                return;
            }
            if (+self.otherUserLastTypedTime >= +twoSecondBeforeDate ) {
                self.isOtherUserTyping = true;
                self.$nextTick(() => {
                    $('.chat-body').scrollTop($('.chat-body')[0].scrollHeight);
                });
            } else {
                self.isOtherUserTyping = false;
            }
        },

        getChannelIdForConversation (otherUser) {
            if (this.getUserDetails.userId < otherUser) {
                return this.getUserDetails.userId + '_' + otherUser;
            }
            else {
                return otherUser + '_' + this.getUserDetails.userId;
            }
        },


        loadChannelDetails () {
            const self = this;
            this.firebaseGrowthDB.ref('/CHATS').child('channel_metadata').child(this.channelId).once('value').then(function (snapshot) {
                if (snapshot.val() == undefined) {
                    //TODO Needs to add the store data here
                    self.createChannelAndRenderChat();
                }
                else {
                    self.renderChatData(snapshot.val().users);
                }
            });
        },


        createChannelAndRenderChat () {
            const self = this;
            var channelUsersData = {};
            if(this.$route.query.profileImageUrl == undefined || this.$route.query.profileImageUrl.length == 0
                || this.$route.query.displayName == undefined || this.$route.query.displayName.length == 0
                || this.$route.query.profileUrl == undefined || this.$route.query.profileUrl.length == 0) {
                self.$router.push('/messages');
            }
            channelUsersData[self.otherUserId] = {
                profileImageUrl: this.$route.query.profileImageUrl,
                displayName:this.$route.query.displayName,
                profileUrl: this.$route.query.profileUrl
            };
            channelUsersData[this.getUserDetails.userId] = {
                profileImageUrl: this.getUserDetails.profileImageUrl,
                displayName: this.getUserDetails.displayName,
                profileUrl: this.getUserDetails.profilePageUrl
            };
            this.firebaseGrowthDB.ref('/CHATS/channel_metadata/' + self.channelId).set({users: channelUsersData}, function (error) {
                if (error) {
                    self.$router.push('/messages');
                    //console.log("Channel metadata could not be saved. Error : " + error);
                }
                else {
                    self.renderChatData(channelUsersData);
                }
            });

        },


        readOtherUserProfileData () {
            const self = this;
            this.firebaseGrowthDB.ref('/CHATS').child('user_profile').child(self.otherUserId).once('value').then(function (snapshot) {
                if (snapshot.val() == undefined) {
                    //console.log("No profile data present for the other user. Using data from channel metadata");
                    return;
                }
                else {
                    let otherUserProfile = snapshot.val();
                    if (otherUserProfile.displayName != self.conversationDisplayName()) {
                        self.conversationDisplayName(otherUserProfile.displayName);
                    }
                    if (otherUserProfile.profileImageUrl != self.conversationImageUrl()) {
                        self.conversationImageUrl = otherUserProfile.profileImageUrl;
                        let scaledProfileImageUrl = self.getImageUrl(otherUserProfile.profileImageUrl, 100);
                        self.conversationImageUrlScaled = scaledProfileImageUrl;
                    }
                    if (otherUserProfile.profileUrl != self.otherUserProfileUrl) {
                        self.otherUserProfileUrl = otherUserProfile.profileUrl;
                    }
                }
            });
        },

        getImageUrl( imageUrl, width, compressed ) {
            const self = this;
            if( imageUrl == null ) return null;
            if( imageUrl.startsWith( "http://" ) && imageUrl.indexOf( "ptlp.co" ) !== -1 )
                imageUrl = "https://" + imageUrl.substr(7);

            if( width != null ) imageUrl = imageUrl + ( imageUrl.indexOf( "?" ) > -1 ? "&" : "?" ) + "width=" + width;
            if( compressed != null ) imageUrl = imageUrl + ( imageUrl.indexOf( "?" ) > -1 ? "&" : "?" ) + "quality=" + ( compressed ? "low" : "high" );
            imageUrl = imageUrl + ( imageUrl.indexOf( "?" ) > -1 ? "&" : "?" ) + "type=" + self.getSupportedImageType();
            return imageUrl;
        },

        getSupportedImageType() {
            function canUseWebP() {
                var elem = document.createElement( 'canvas' );
                if( !!(elem.getContext && elem.getContext('2d')) ) {
                    return elem.toDataURL( 'image/webp' ).indexOf( 'data:image/webp' ) == 0;
                }
                return false;
            }
            if( window.canUseWebp == null )
                window.canUseWebp = canUseWebP();

            return window.canUseWebp ? "webp" : "jpg";

        },

        renderChatData (channelUsersData) {
            const self = this;
            let userInChannel = false;
            $.each(channelUsersData, function (user, userData) {
                if (user == self.getUserDetails.userId) {
                    userInChannel = true;
                }
                else if (user == self.otherUserId) {
                    self.conversationDisplayName = userData.displayName;
                    self.conversationImageUrl = userData.profileImageUrl;
                    let scaledProfileImageUrl = self.getImageUrl(userData.profileImageUrl, 100);
                    self.conversationImageUrlScaled = scaledProfileImageUrl;
                    self.otherUserProfileUrl = userData.profileUrl;
                }
                //console.log(user, userData);
            });
            if (userInChannel != true) {
                this.$router.push('/messages');
            }
            self.loadMessagesInConversation();
            self.watchBlockedConversation();
            self.readOtherUserProfileData();
            self.watchOtherUserTyping();
            self.otherUserTypingWatcherInterval = setInterval(self.updateOtherUserTypingStatus, 1000);
        },


        setAllMessagesPending() {
            const self = this;
            self.pendingMessages = [].concat(self.pendingMessages.slice(), self.failedMessages.slice());
            self.failedMessages = [];
        },

        setAllMessagesFailed() {
            const self = this;
            self.failedMessages = [].concat(self.pendingMessages.slice(), self.failedMessages.slice());
            self.pendingMessages = [];
        },

        sendMessageToFirebase () {
            const self = this;
            let addChannelToWatchlistUpdate = {};
            let watchlistUpdateNeeded = false;
            if (self.isChannelInSelfWatchlist != true) {
                addChannelToWatchlistUpdate['/CHATS/user_watched_channels/' + this.getUserDetails.userId + '/' + self.channelId] = true;
                watchlistUpdateNeeded = true;
            }
            if (self.isChannelInOtherUserWatchlist != true) {
                addChannelToWatchlistUpdate['/CHATS/user_watched_channels/' + self.otherUserId + '/' + self.channelId] = true;
                watchlistUpdateNeeded = true;
            }
            if (watchlistUpdateNeeded == true) {
                this.firebaseGrowthDB.ref().update(addChannelToWatchlistUpdate, function (error) {
                    if (error) {
                        //console.log("Error updating data:", error);
                    }
                });
            }
            let messagePushRef = this.firebaseGrowthDB.ref('/CHATS').child('messages').child(self.channelId).push();
            let messageId = messagePushRef.key;
            if(self.isConnectedToServer) {
                self.pendingMessages.push(messageId);
            } else {
                self.failedMessages.push(messageId);
            }
            let messageTextTrimmed = self.toSendMessageText.trim();
            messagePushRef.set({
                senderId: this.getUserDetails.userId + "",
                messageText: messageTextTrimmed,
                sendTime: firebase.database.ServerValue.TIMESTAMP
            }, function (error) {
                if (error) {
                    //console.log("Message : " + messageId + " could not be saved.", error);
                    self.failedMessages.push(messageId);
                } else {
                    //console.log("Message : " + messageId + " saved successfully.");
                    self.removeValueFromArray(self.pendingMessages, messageId);
                    self.removeValueFromArray(self.failedMessages, messageId);
                }
            });
            self.toSendMessageText = "";
            
            this.triggerAnanlyticsEvent('SENDMESSAGE_USERCHAT_P2PCHAT', 'CONTROL', {
                'USER_ID': this.getUserDetails.userId,
                'RECEIVER_ID': this.otherUserId
            });
        },

        removeValueFromArray(arr, val) {
            var index = arr.indexOf(val)
            if(index > -1) {
                arr.splice(index, 1);
            }
        },

        updateLastTypedTimeInFirebase() {
            var self = this;
            this.firebaseGrowthDB.ref('/CHATS/channel_metadata/' + self.channelId + '/users/' + this.getUserDetails.userId + '/lastTypedTime').set(firebase.database.ServerValue.TIMESTAMP);
        },


        blockUser () {
            this.firebaseGrowthDB.ref('CHATS').child('blocked_users').child(this.getUserDetails.userId).child(this.otherUserId).set(true);
            
            this.triggerAnanlyticsEvent('BLOCKUSER_USERCHAT_P2PCHAT', 'CONTROL', {
                'USER_ID': this.getUserDetails.userId,
                'RECEIVER_ID': this.otherUserId
            });
        },


        unblockUser () {
            const self = this;
            this.firebaseGrowthDB.ref('/CHATS').child('blocked_users').child(this.getUserDetails.userId).child(self.otherUserId).set(false);
            
            this.triggerAnanlyticsEvent('UNBLOCKUSER_USERCHAT_P2PCHAT', 'CONTROL', {
                'USER_ID': this.getUserDetails.userId,
                'RECEIVER_ID': this.otherUserId
            });
        },

        deleteConversation() {
            const self = this;
            self.removeChannelFromCache({channelId: self.channelId});
            let deleteConversationUpdates = {};
            deleteConversationUpdates['/CHATS/user_watched_channels/' + this.getUserDetails.userId + '/' + self.channelId] = {};
            deleteConversationUpdates['/CHATS/user_channels/' + this.getUserDetails.userId + '/' + self.channelId + '/lastDeletedMessage'] = self.lastDeliveredMessageId;
            this.firebaseGrowthDB.ref().update(deleteConversationUpdates, function (error) {
                if (error) {
                    //console.log("Error updating data:", error);
                }
            });
            $('#confirmation').modal('hide');
            self.messageList = [];
            
            this.triggerAnanlyticsEvent('DELETECHAT_USERCHAT_P2PCHAT', 'CONTROL', {
                'USER_ID': this.getUserDetails.userId,
                'RECEIVER_ID': this.otherUserId
            });
            
            this.$router.push('/messages');
        },


        redirectToOtherUserProfile() {
            this.$router.push(this.otherUserProfileUrl);
            this.triggerAnanlyticsEvent('CLICKUSER_USERCHAT_P2PCHAT', 'CONTROL', {
                'USER_ID': this.getUserDetails.userId,
                'RECEIVER_ID': this.otherUserId
            });
        },

        redirectToMessagesPage() {
            this.$router.push('/messages');
            
            this.triggerAnanlyticsEvent('VIEWALLCHATS_USERCHAT_P2PCHAT', 'CONTROL', {
                'USER_ID': this.getUserDetails.userId,
                'RECEIVER_ID': this.otherUserId
            });
        },
        initializeFirebaseAndStartListening() {
            const self = this;
            self.otherUserId = this.$route.params.channel_id;
            self.channelId = this.getChannelIdForConversation(self.otherUserId);
            //console.log("Channel Id : ", self.channelId);
            if(this.fetchedChannelMetadataDataCached) {
                if(self.fetchedChannelMetadataDataCached[self.channelId] != undefined) {
                    self.conversationDisplayName = self.fetchedChannelMetadataDataCached[self.channelId].conversationDisplayName;
                    self.conversationImageUrl= self.fetchedChannelMetadataDataCached[self.channelId].conversationImageUrl;
                    if(self.conversationImageUrl != undefined && self.conversationImageUrl.length > 0) {
                        self.conversationImageUrlScaled = self.getImageUrl(self.conversationImageUrl, 100);
                    }
                }
            }
            import('firebase').then((firebase) => {
                self.firebaseGrowthDB = firebase.app("FirebaseGrowth").database();
                //console.log("Firebase growth initialized for page");
                // console.log("Fetched cache channel metadata : ", self.fetchedChannelMetadataDataCached);
                self.loadChannelDetails();
                let connectedRef = self.firebaseGrowthDB.ref(".info/connected");
                connectedRef.on("value", function (snap) {
                    if (snap.val() == true) {
                        //console.log("connected to internet");
                        self.isConnectedToServer = true;
                        self.setAllMessagesPending();
                    } else {
                        self.isConnectedToServer = false;
                        //console.log("not connected to internet");
                        self.setAllMessagesFailed()
                    }
                });
            });
        },

        enterToSend(event) {
            if(event.which === 13 && !event.shiftKey && this.toSendMessageText != "" && !this.isMobile()) {
                event.preventDefault();
                this.sendMessageToFirebase();
                this.toSendMessageText = "";
            }
        },

        onResizeWindow() {
            $('.chat-body').css({ height: (window.innerHeight - 110) });
            $('.chat-body').scrollTop($('.chat-body')[0].scrollHeight);
        }
    },

    mounted() {
        if (this.getFirebaseGrowthDBLoadingState) {
            this.initializeFirebaseAndStartListening();
        }
        if(this.isMobile()) {
            $('.chat-body').css({ height: (window.innerHeight - 110) });
            $(window).on('resize', this.onResizeWindow);
        }

        $('.modal-backdrop').hide();
        $('body').removeClass("modal-open");
    },

    watch: {
        'getFirebaseGrowthDBLoadingState'(loaded) {
            if (loaded) {
                this.initializeFirebaseAndStartListening();
            }
        },

        'toSendMessageText'(newMessageToSend) {
            this.updateLastTypedTimeInFirebase();
        },
        'getUserDetails.isGuest'(isGuest) {
            if (isGuest) {
                this.$router.push('/login');
            }
        }
    },

    beforeDestroy() {
        //console.log("Destroy callback : Message User")
        var self = this;
        clearInterval(self.otherUserTypingWatcherInterval);
        self.listenerCallbacks.forEach((entry) => {
            // console.log("Entry : ", entry);
            entry.ref.off(entry.type, entry.callback);
        });
        $(window).off('resize', this.onResizeWindow);
    },

    components: {
        MessageLayout,
        Spinner
    }

}

</script>

<style lang="scss" scoped>
    .message-page {
        margin-top: 0;
        text-align: left;
        position: relative;
        @media screen and (max-width: 992px) {
            text-align: center;
        }
        h2 {
            font-size: 22px;
            font-weight: bold;
            text-align: left;
            border-left: 3px solid #d0021b;
            padding-left: 10px;
            margin: 10px 0;
            @media screen and (max-width: 768px) {
                font-size: 18px;
            }
        }
        .chat-header {
            background: #f8f9fa;
            height: 50px;
            padding: 5px 0;
            width: 100%;
            color: #000;
            position: relative;
            z-index: 2;
            box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
            .back-btn {
                float: left;
                color: #000;
                padding: 0 10px;
                i {
                    line-height: 40px;
                }
            }
            .title {
                float: left;
                font-size: 21px;
                line-height: 40px;
                padding-left: 5px;
            }
        }
        .chat-header.individual {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            .user-img {
                float: left;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                overflow: hidden;
                background: #e9e9e9;
                background-size: cover;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .user-name {
                float: left;
                line-height: 40px;
                margin-left: 10px;
                font-size: 16px;
                text-overflow: ellipsis;
                white-space: nowrap;
                max-width: 60%;
                overflow: hidden;
                @media screen and (max-width: 345px) {
                    max-width: 56%;
                }
            }
            .options {
                float: right;
                border: 0;
                padding: 0;
                background: none;
                &:focus {
                    outline: none;
                    box-shadow: none;
                }
                i {
                    line-height: 40px;
                    padding: 0 10px;
                }
            }
            .dropdown-menu {
                text-align: right;
                min-width: 200px;
                button {
                    display: block;
                    background: none;
                    text-align: right;
                    width: 100%;
                    font-size: 13px;
                }
            }
        }

        .chat-body {
            text-align: center;
            overflow-y: scroll;
            background: #f9f9f9;
            height: calc(100vh - 110px);
            margin-top: 55px;
            .chat-date {
                text-align: center;
                margin: 7px 0;
                clear: both;
                display: inline-block;
                width: 100%;
                span {
                    font-size: 13px;
                    color: #686868;
                    padding: 3px 5px;
                    background: #D4EAF4;
                    box-shadow: 0 1px 1px 0 rgba(164, 152, 135, 0.32), 0 0 1px 0 #A39F98;
                    border-radius: 4px;
                }
            }
            .all-messages {
                overflow: hidden;
                margin-bottom: 10px;
            }
            .message-blocked {
                display: block;
                clear: both;
                margin: 10px 5px;
                font-size: 14px;
                color: #555;
                text-align: center;
                font-style: italic;
            }
            .typing-wrap {
                background-color: #fff;
                width: 50px;
                line-height: 16px;
                display: block;
                border-radius: 5px;
                padding: 5px;
                text-align: left;
                box-shadow: 0 1px 1px 0 rgba(164, 152, 135, 0.32), 0 0 1px 0 #A39F98;
                margin: 5px 20px 10px;
                position: relative;
                .typing {
                    text-align: center;
                    span {
                        display: inline-block;
                        background-color: #9e9e9e;
                        width: 5px;
                        height: 5px;
                        border-radius: 50%;
                        margin-right: 0px;
                        vertical-align: middle;
                        animation: typeSwing 1s infinite;

                        &:nth-child(2) {
                            animation-delay: 0.15s;
                        }
                        &:nth-child(3) {
                            animation-delay: 0.3s;
                            margin-right: 0;
                        }
                    }
                }
                @keyframes typeSwing {
                    10% {
                        transform: translateY(-10px);
                        background-color: #9E9DA2;
                    }
                    50% {
                        transform: translateY(0);
                        background-color: #B6B5BA;
                    }
                }
                &:before {
                    background-color: #fff;
                    content: "\A0";
                    display: block;
                    height: 16px;
                    position: absolute;
                    top: -1px;
                    transform: rotate(45deg) skew(-45deg);
                    -moz-transform: rotate(45deg) skew(-45deg);
                    -ms-transform: rotate(45deg) skew(-45deg);
                    -o-transform: rotate(45deg) skew(-45deg);
                    -webkit-transform: rotate(45deg) skew(-45deg);
                    width: 20px;
                    box-shadow: -1px 1px 1px 0 rgba(164, 152, 135, 0.32);
                    left: -5px;
                }
            }
            .fixed-msg {
                position: fixed;
                bottom: 0px;
                background: #e9e9e9;
                margin: 0;
                width: 100%;
                text-align: center;
                padding: 4px 0;
                min-height: 55px;
                .btn-on-fixed-msg {
                    display: block;
                    margin: 5px auto;
                    padding: 5px 10px;
                    font-size: 13px;
                    color: #D1021B;
                }
            }
            .chat-msg {
                background-color: #fff;
                border-radius: 5px;
                box-shadow: 0 1px 1px 0 rgba(164, 152, 135, 0.32), 0 0 1px 0 #A39F98;
                display: inline-block;
                padding: 10px 15px;
                position: relative;
                vertical-align: top;
                text-align: left;
                color: #000000;
                line-height: 16px;
                font-size: 14px;
                clear: both;
                &::before {
                    background-color: #fff;
                    content: "\00a0";
                    display: block;
                    height: 16px;
                    position: absolute;
                    top: -1px;
                    transform: rotate(45deg) skew(-45deg);
                    -moz-transform: rotate(45deg) skew(-45deg);
                    -ms-transform: rotate(45deg) skew(-45deg);
                    -o-transform: rotate(45deg) skew(-45deg);
                    -webkit-transform: rotate(45deg) skew(-45deg);
                    width: 20px;
                }
                &.sender {
                    float: left;
                    margin: 5px 45px 5px 20px;
                }
                &.sender::before {
                    box-shadow: -1px 1px 1px 0 rgba(164, 152, 135, 0.32);
                    left: -5px;
                }
                &.self {
                    background-color: #FFBAC2;
                    float: right;
                    margin: 5px 20px 5px 45px;
                }
                &.self::before {
                    background-color: #FFBAC2;
                    box-shadow: 1px -1px 1px 0 rgba(164, 152, 135, 0.32);
                    right: -5px;
                    transform: rotate(1deg) skew(-45deg);
                    -moz-transform: rotate(1deg) skew(-45deg);
                    -ms-transform: rotate(1deg) skew(-45deg);
                    -o-transform: rotate(1deg) skew(-45deg);
                    -webkit-transform: rotate(1deg) skew(-45deg);
                    top: 0;
                }
                .msg-text {
                    position: relative;
                    white-space: pre-line;
                }
                .extra-info {
                    display: inline-block;
                    font-size: 11px;
                    margin-left: 5px;
                    color: rgba(0, 0, 0, 0.5);
                    position: relative;
                    vertical-align: baseline;
                    .status {
                        vertical-align: middle;
                        margin-left: 4px;
                        i {
                            font-size: 14px;
                        }
                        &.error {
                            color: #D0021B;
                        }
                    }
                }
            }
        }

        .chat-box {
            position: fixed;
            bottom: 0;
            width: 100%;
            height: 45px;
            background: #f9f9f9;
            margin-bottom: 10px;
            .type-message {
                background: #fff;
                margin: 0 5px;
                width: calc(100% - 75px) !important;
                position: relative;
                #text-message {
                    outline: none;
                    padding: 10px;
                    overflow-y: scroll;
                    height: 45px;
                    width: 100%;
                    display: inline-block;
                    font-size: 14px;
                    margin-top: 2px;
                    resize: none;
                    border: 1px solid #e9e9e9;
                    background: #fff;
                    border-radius: 4px;
                    &:disabled {
                        background: #e9e9e9;
                    }
                }
            }
            .send-message {
                width: 45px;
                height: 45px;
                background: #D1021B;
                color: #fff;
                border-radius: 50%;
                margin-right: 5px;
                position: absolute;
                bottom: 0px;
                right: 5px;
                border: 0;
                i {
                    vertical-align: middle;
                }
                &:active, &:focus {
                    border: 0;
                    outline: none;
                    box-shadow: none;
                }
            }
        }
    }
    .confirmation {
        text-align: left;
        max-width: 350px;
        margin: 50px auto;
        .modal-body {
            padding-top: 0;
        }
        .form-group {
            font-size: 14px;
        }
        .btn-submit {
            background: #d0021b;
            color: #fff;
            border: 0;
            font-size: 14px;
            float: right;
        }
        .cancel {
            background: #e9e9e9;
            border: 0;
            float: right;
            font-size: 12px;
            line-height: 33px;
            margin-right: 10px;
            padding: 0 10px;
            border-radius: 3px;
        }
    }
    .spinner {
        margin-top: 60px;
    }
</style>
<style lang="scss">
    .msg-text a {
        color: #007bff;
    }
</style>
