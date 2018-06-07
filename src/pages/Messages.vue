<template>
    <MainLayout>
        <div class="message-page page-wrap">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <h2>__("chat_messages")</h2>
                        <div class="card" v-if="getUserDetails.isGuest">
                            <div class="head-title">__("seo_login_page")</div>
                            <div class="card-content">
                                <p><i class="material-icons">check_circle</i> __("chat_guest_msg")</p>
                                <button type="button" class="btn" data-toggle="modal" data-target="#login_modal">__("user_sign_in") / __("user_sign_up")</button>
                            </div>
                        </div>
                        <ul class="chat-list" v-if="!getUserDetails.isGuest">
                            <li class="chat-item" v-for="conversation in conversations"  v-bind:key="conversation.channelId">
                                <div class="user-img" v-on:click="loadMessagesForConversation(conversation.userId)"><img  v-bind:src="conversation.profileImageUrl"  alt="profile-img"></div>
                                <div class="chat-wrap">
                                    <div class="user-info" v-on:click="loadMessagesForConversation(conversation.userId)">
                                        <div class="user-name" v-text="conversation.channelName"></div>
                                        <div class="user-last-msg" v-text="conversation.lastMessage"></div>
                                    </div>
                                    <div class="chat-info" v-bind:class="{unread : conversation.isUnread}" v-on:click="loadMessagesForConversation(conversation.userId)">
                                        <div class="chat-time" v-text="conversation.lastMessageTimeDisplay"></div>
                                        <span class="blocked" v-if="blockedUserStatus[conversation.userId] == true"><i class="material-icons">block</i></span>
                                    </div>
                                    <button class="options-btn" type="button" id="msg-user-more-option" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="material-icons">more_vert</i>
                                    </button>
                                    <div class="dropdown-menu" aria-labelledby="OptionsDropdownMenu" v-on:click="setToBeDeletedChannelData(conversation.channelId, conversation.messageId)">
                                        <button type="button" class="btn report-btn" data-toggle="modal" data-target="#messagesConfirmation">__("pratilipi_delete_content")</button>
                                        <button type="button" class="btn report-btn" v-if="blockedUserStatus[conversation.userId] != true" v-on:click="blockUser(conversation.userId)">__("chat_block_user")</button>
                                        <button type="button" class="btn report-btn" v-if="blockedUserStatus[conversation.userId] == true" v-on:click="unblockUser(conversation.userId)">__("chat_unblock_user")</button>
                                    </div>
                                </div>
                            </li>
                            <li class="no-messages" v-if="loadingConversations != true && conversations.length == 0">__("chat_no_msgs")</li>
                        </ul>

                        <!-- Message Confirmation Modal -->
                        <div class="modal fade confirmation" id="messagesConfirmation" tabindex="-1" role="dialog" aria-labelledby="confirmationLabel" aria-hidden="true">
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

                        <Spinner  v-if="loadingConversations == true && !getUserDetails.isGuest && conversations.length == 0"></Spinner>
                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<script>
    import MainLayout from '@/layout/main-layout.vue';
    import mixins from '@/mixins'
    import Spinner from '@/components/Spinner.vue';
    import { mapGetters, mapActions } from 'vuex';
    import $ from 'jquery'

    export default {

        data(){
            return {
                conversations: [],
                channelLastMessage: {},
                channelLastReadMessage: {},
                fetchedChannelMetadataData: {},
                loadingConversations: true,
                listenerCallbacks: [],
                toDeleteChannelId: '',
                toDeleteChannelLastMessage: '',
                blockedUserStatus: {}
            }
        },
        mixins: [
            mixins
        ],
        methods: {

            ...mapActions('messages', [
                'saveConversationsDataToCache',
                'clearConversationsDataCache',
                'removeChannelFromCache'
            ]),

            loadChannelMetadata(channelId){
                const self = this;
                self.firebaseGrowthDB.ref('/CHATS').child('channel_metadata').child(channelId).once('value').then(function(snapshot){
                    if(snapshot.val() == undefined){
                        /* TODO Something wrong */
                    }
                    let userInChannel = false;
                    let otherUserId = 0;
                    let conversationDisplayName = "";
                    let conversationImageUrl = "";
                    $.each(snapshot.val().users, function(user, userDetails){
                        if(user == self.getUserDetails.userId){
                            userInChannel = true;
                        } else {
                            otherUserId = user;
                            conversationDisplayName = userDetails.displayName;
                            conversationImageUrl = userDetails.profileImageUrl;
                        }
                        // console.log(user, userDetails);
                    });
                    if(userInChannel != true){
                        /* TODO Something wrong */
                        return;
                    }
                    self.firebaseGrowthDB.ref('/CHATS').child('user_profile').child(otherUserId).once('value').then(function(snapshot){
                        if(snapshot.val() != undefined){
                            conversationDisplayName = snapshot.val().displayName;
                            conversationImageUrl = snapshot.val().profileImageUrl;
                        }
                        var conversationImageUrlScaled = self.getImageUrl(conversationImageUrl,100);
                        self.fetchedChannelMetadataData[channelId] = {'otherUserId' : otherUserId, conversationDisplayName : conversationDisplayName, conversationImageUrl : conversationImageUrlScaled};
                        self.attachLastReadListener(channelId);
                        self.attachLastMessageListener(channelId);
                        self.watchBlockedConversation(otherUserId);
                    });
                });
            },


            attachLastReadListener(channelId){
                const self = this;
                const lastReadRef = self.firebaseGrowthDB.ref('/CHATS').child('user_channels').child(self.getUserDetails.userId).child(channelId).child('lastReadMessage');
                let lastReadCallback = lastReadRef.on('value', function(snapshot){
                    if(self.channelLastMessage[channelId] != undefined){
                        if(snapshot.val() == self.channelLastMessage[channelId].messageId){
                            self.channelLastMessage[channelId].isUnread = false;
                        }
                    }
                    self.channelLastReadMessage[channelId] = snapshot.val();
                    for(let i=0; i < self.conversations.length; i++) {
                        if(self.conversations[i].channelId == channelId) {
                            if(self.conversations[i].messageId == snapshot.val()) {
                                self.conversations[i].isUnread = false;
                            }
                        }
                    }
                });
                self.listenerCallbacks.push({ref: lastReadRef, callback: lastReadCallback, type:"value"});
            },


            attachLastMessageListener(channelId){
                const self = this;
                const lastMessageRef = self.firebaseGrowthDB.ref('/CHATS').child('messages').child(channelId).limitToLast(1);
                let lastMessageCallback = lastMessageRef.on('child_added', function(snapshot){
                    const message = snapshot.val();
                    // console.log("Messages : Last message added : ",message, " for channel : ", channelId);
                    self.removeConversationForChannel(channelId);
                    let isMessageUnread = true;
                    if((message.senderId == self.getUserDetails.userId) || (self.channelLastReadMessage[channelId] == snapshot.key)){
                        isMessageUnread = false;
                    }
                    const messageTimeDisplay = self.parseDateDisplay(message.sendTime);
                    const messageReceived = {channelId : channelId, messageId : snapshot.key, userId : self.fetchedChannelMetadataData[channelId].otherUserId, channelName : self.fetchedChannelMetadataData[channelId].conversationDisplayName, profileImageUrl : self.fetchedChannelMetadataData[channelId].conversationImageUrl, senderId : message.senderId, lastMessage : message.messageText, lastMessageTime : message.sendTime, lastMessageTimeDisplay : messageTimeDisplay, isUnread : isMessageUnread};
                    self.channelLastMessage[channelId] = messageReceived;
                    self.conversations.unshift(messageReceived);
                    self.conversations.sort(function (l, r) { return l.lastMessageTime > r.lastMessageTime ? -1 : 1 })
                });
                self.listenerCallbacks.push({ref: lastMessageRef, callback: lastMessageCallback, type:"child_added"});
            },

            removeConversationForChannel(channelId) {
                const self = this;
                for(let i = 0; i< self.conversations.length; i++) {
                    if(self.conversations[i].channelId == channelId) {
                        self.conversations.splice(i, 1);
                        break;
                    }
                }
            },


            parseDateDisplay(sentTime){
                const self = this;
                const currentDate = new Date();
                const currentDateStart = currentDate.setHours(0,0,0,0);
                let timeToDisplay = "";
                const messageDate = new Date(sentTime);
                const messageDateKey = messageDate.toLocaleDateString();
                if(+messageDate >= +currentDateStart){
                    timeToDisplay = new Date(sentTime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                }
                else {
                    let yesterdayDate = new Date();
                    yesterdayDate.setTime(currentDate.getTime() - (24*3600000));
                    let yesterdayDateStart = yesterdayDate.setHours(0,0,0,0);
                    if(+messageDate >= +yesterdayDateStart){
                        timeToDisplay = "YESTERDAY";
                    }
                    else {
                        timeToDisplay = messageDateKey;
                    }
                }
                return timeToDisplay;
            },


            loadWatchedChannels(){
                const self = this;
                setTimeout(() => {
                    self.loadingConversations = false;
                }, 4000);
                const watchedChannelRef = self.firebaseGrowthDB.ref('/CHATS').child('user_watched_channels').child(self.getUserDetails.userId);
                let watchedChannelAddedCallback = watchedChannelRef.on('child_added', function(snapshot){
                    let channelId = snapshot.key;
                    self.loadChannelMetadata(channelId);
                });
                let watchedChannelRemovedCallback = watchedChannelRef.on('child_removed', function(snapshot){
                    //console.log("Watching channel removed : ", snapshot.key);
                    self.removeConversationForChannel(snapshot.key);
                    self.firebaseGrowthDB.ref('/CHATS').child('messages').child(snapshot.key).off();
                });
                self.listenerCallbacks.push({ref: watchedChannelRef, callback: watchedChannelAddedCallback, type:"child_added"});
                self.listenerCallbacks.push({ref: watchedChannelRef, callback: watchedChannelRemovedCallback, type:"child_removed"});
            },


            clearConversationsFromCache(){
                const self = this;
                self.conversations.forEach( function (conversation){
                    if(conversation.isLoadedFromCache != undefined && conversation.isLoadedFromCache == true){
                        self.removeConversationForChannel(conversation.channelId);
                    }
                });
            },


            loadConversationsFromCache(){
                const self = this;
                if((self.conversationListCached != undefined) && (self.conversationListCached.length > 0)){
                    self.conversationListCached.forEach( function (conversation){
                        const conversationObj = { ...conversation };
                        conversationObj.isLoadedFromCache = true;
                        self.conversations.push(conversationObj);
                    });
                    self.channelLastMessage = { ...self.channelLastMessageCached };
                    self.channelLastReadMessage = { ...self.channelLastReadMessageCached };
                    self.fetchedChannelMetadataData = { ...self.fetchedChannelMetadataDataCached };
                    self.clearConversationsDataCache();
                }
                setTimeout(self.clearConversationsFromCache, 4000);
            },


            updateUserProfile(){
                const self = this;
                //TODO FIGURE OUT TO DO THIS ONCE PER SESSION
                // if((appViewModel.p2pChat != undefined) && (appViewModel.p2pChat.updatedUserProfile == true)){
                //     console.log("User profile already updated for this session. Skipping update");
                //     return;
                // }
                self.firebaseGrowthDB.ref('/CHATS').child('user_profile').child(self.getUserDetails.userId).once('value').then(function(snapshot){
                    if(snapshot.val() == undefined || snapshot.val.displayName != self.getUserDetails.displayName() || snapshot.val.profileImageUrl != self.getUserDetails.profileImageUrl()){
                        var userProfile = {displayName : self.getUserDetails.displayName, profileImageUrl : self.getUserDetails.profileImageUrl, profileUrl: self.getUserDetails.profilePageUrl};
                        self.firebaseGrowthDB.ref('/CHATS').child('user_profile').child(self.getUserDetails.userId).set(userProfile, function(error){
                            //TODO Figure out error handling
                            // if(error == undefined){
                            //     if(appViewModel.p2pChat == undefined){
                            //         appViewModel.p2pChat = {};
                            //     }
                            //     appViewModel.p2pChat.updatedUserProfile = true;
                            // }
                        });
                    }
                });
            },

            loadMessagesForConversation(userId){
                this.$router.push('/messages/' + userId );

                this.triggerAnanlyticsEvent('STARTCHAT_ALLCHATS_P2PCHAT', 'CONTROL', {
                    'USER_ID': this.getUserDetails.userId,
                    'RECEIVER_ID': userId
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

            setToBeDeletedChannelData(channelId, lastDeliveredMessageId) {
                const self = this;
                console.log("Setting to be deleted channel data. Channel Id : ", channelId, " Last Delivered message : ", lastDeliveredMessageId);
                self.toDeleteChannelId = channelId;
                self.toDeleteChannelLastMessage = lastDeliveredMessageId;
                console.log("Setting to be deleted channel data. Channel Id : ", self.toDeleteChannelId, " Last Delivered message : ", self.toDeleteChannelLastMessage);
            },

            deleteConversation() {
                const self = this;
                self.removeChannelFromCache({channelId: self.toDeleteChannelId});
                self.removeConversationForChannel(self.toDeleteChannelId);
                let deleteConversationUpdates = {};
                deleteConversationUpdates['/CHATS/user_watched_channels/' + this.getUserDetails.userId + '/' + self.toDeleteChannelId] = {};
                deleteConversationUpdates['/CHATS/user_channels/' + this.getUserDetails.userId + '/' + self.toDeleteChannelId + '/lastDeletedMessage'] = self.toDeleteChannelLastMessage;
                self.firebaseGrowthDB.ref().update(deleteConversationUpdates, function (error) {
                    if (error) {
                        console.log("Error updating data:", error);
                    }
                });
                $('#messagesConfirmation').modal('hide');

                this.triggerAnanlyticsEvent('DELETECHAT_ALLCHATS_P2PCHAT', 'CONTROL', {
                    'USER_ID': this.getUserDetails.userId,
                    'RECEIVER_ID': self.fetchedChannelMetadataData[self.toDeleteChannelId].otherUserId
                });
            },

            watchBlockedConversation (otherUserId) {
                const self = this;
                const userBlockedRef = this.firebaseGrowthDB.ref('/CHATS').child('blocked_users').child(this.getUserDetails.userId).child(otherUserId);
                let userBlockedCallback = userBlockedRef.on('value', function (snapshot) {
                    console.log("Changed blocked status for user : ",otherUserId ,"Value : ", snapshot.val());
                    let isUserBlockedBySelf = snapshot.val();
                    if(isUserBlockedBySelf == true) {
                        self.$set(self.blockedUserStatus, otherUserId ,true);
                    }
                    else {
                        self.$set(self.blockedUserStatus, otherUserId ,false);
                    }
                });
                self.listenerCallbacks.push({ref: userBlockedRef, callback: userBlockedCallback, type:"value"});
            },

            blockUser (otherUserId) {
                this.firebaseGrowthDB.ref('CHATS').child('blocked_users').child(this.getUserDetails.userId).child(otherUserId).set(true);

                this.triggerAnanlyticsEvent('BLOCKUSER_ALLCHATS_P2PCHAT', 'CONTROL', {
                    'USER_ID': this.getUserDetails.userId,
                    'RECEIVER_ID': otherUserId
                });
            },


            unblockUser (otherUserId) {
                this.firebaseGrowthDB.ref('/CHATS').child('blocked_users').child(this.getUserDetails.userId).child(otherUserId).set(false);

                this.triggerAnanlyticsEvent('UNBLOCKUSER_ALLCHATS_P2PCHAT', 'CONTROL', {
                    'USER_ID': this.getUserDetails.userId,
                    'RECEIVER_ID': otherUserId
                });
            },

            initializeFirebaseAndStartListening() {
                const self = this;
                import('firebase').then((firebase) => {
                    self.firebaseGrowthDB = firebase.app("FirebaseGrowth").database();
                    // console.log("Firebase growth initialized for page");
                    self.loadConversationsFromCache();
                    self.loadWatchedChannels();
                    self.updateUserProfile();
                });
            }

        },

        created() {
            if (this.getUserDetails.isGuest) {
                this.$router.go('/login');
            }
            console.log('GROWTH DB LOADING STATE: ', this.getFirebaseGrowthDBLoadingState);
        },

        mounted() {
            if (this.getUserDetails.isGuest) {
                this.$router.go('/login');
            }
            const self = this;
            console.log("Mounted Firebase status : ",this.getFirebaseGrowthDBLoadingState )
            if (this.getFirebaseGrowthDBLoadingState) {
                this.initializeFirebaseAndStartListening();
            }
        },

        watch: {
            'getFirebaseGrowthDBLoadingState'(loaded) {
                console.log("Watch Firebase status : ",this.getFirebaseGrowthDBLoadingState )
                if (loaded) {
                    this.initializeFirebaseAndStartListening();
                }
            }
        },

        beforeDestroy() {
            // console.log("Destroy callback : Messages")
            this.listenerCallbacks.forEach((entry) => {
                entry.ref.off(entry.type, entry.callback);
            });
            this.saveConversationsDataToCache({
                conversations: this.conversations,
                channelLastMessage: this.channelLastMessage,
                channelLastReadMessage: this.channelLastReadMessage,
                fetchedChannelMetadataData: this.fetchedChannelMetadataData
            });
        },

        components: {
            MainLayout,
            Spinner
        },

        computed: {
            ...mapGetters([
                'getUserDetails',
                'getFirebaseGrowthDBLoadingState',
            ]),

            ...mapGetters('messages', [
                'conversationListCached',
                'channelLastMessageCached',
                'channelLastReadMessageCached',
                'fetchedChannelMetadataDataCached'
            ])
        }

    }
</script>

<style lang="scss" scoped>
    .message-page {
        margin-top: 85px;
        text-align: left;
        min-height: 700px;
        @media screen and (max-width: 992px){
            margin-top: 65px;
            text-align: center;
        }
        h2 {
            font-size: 22px;
            font-weight: bold;
            text-align: left;
            border-left: 3px solid #d0021b;
            padding-left: 10px;
            margin: 10px 0;
            @media screen and (max-width: 768px){
                font-size: 18px;
            }
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
                    width: calc(100% - 100px);
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
                    float: left;
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
                .options-btn {
                    width: 30px;
                    float: right;
                    position: relative;
                    z-index: 2;
                    color: #9e9e9e;
                    background: none;
                    border: 0;
                    &:focus, &:active {
                        outline: none;
                        box-shadow: none;
                        border: 0;
                    }
                }
                .blocked {
                    i {
                        font-size: 13px;
                        margin: 4px;
                        color: #9e9e9e;
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
        }
        .tab-menu {
            border-bottom: 1px solid #e9e9e9;
            padding: 8px 0 0;
            text-align: left;
            overflow: hidden;
            width: 100%;
            overflow-x: auto;
            white-space: nowrap;
            li {
                color: #555;
                font-size: 13px;
                border-bottom: 2px solid #fff;
                padding: 5px 5px 11px;
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
            }
        }
        .no-messages {
            margin: 10px 0;
            color: #555;
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
    }
</style>
