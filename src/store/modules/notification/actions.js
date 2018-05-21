import DataAccessor from '@/utils/DataAccessor'
import $ from 'jquery'

export default {
    // checkout({ commit, state }, products) {
    //     const savedCartItems = [...state.added]
    //     commit('setCheckoutStatus', null)
    //     // empty cart
    //     commit('setCartItems', { items: [] })
    //     shop.buyProducts(
    //         products,
    //         () => commit('setCheckoutStatus', 'successful'),
    //         () => {
    //             commit('setCheckoutStatus', 'failed')
    //             // rollback to the cart saved before sending the request
    //             commit('setCartItems', { items: savedCartItems })
    //         }
    //     )
    // },

    // addProductToCart({ state, commit }, product) {
    //     commit('setCheckoutStatus', null)
    //     if (product.inventory > 0) {
    //         const cartItem = state.added.find(item => item.id === product.id)
    //         if (!cartItem) {
    //             commit('pushProductToCart', { id: product.id })
    //         } else {
    //             commit('incrementItemQuantity', cartItem)
    //         }
    //         // remove 1 item from stock
    //         commit('decrementProductInventory', { id: product.id })
    //     }
    // }
    fetchInitialNotifications({ commit, state }, { language, resultCount }) {
        commit('setInitialNotificationLoadingTrue');
        DataAccessor.getNotificationList(null, resultCount, language, (data) => {
            if (data.status === 200) {
                commit('setInitialNotificationLoadingSuccess', data.response);
            } else {
                commit('setInitialNotificationLoadingError');
            }
        })
    },

    fetchMoreNotifications({ commit, state }, { language, resultCount }) {
        commit('setMoreNotificationLoadingTrue');
        DataAccessor.getNotificationList(state.cursor, resultCount, language, (data) => {
            if (data.status === 200) {
                commit('setMoreNotificationLoadingSuccess', data.response);
            } else {
                commit('setMoreNotificationLoadingError');
            }
        })
    },

    changeNotificationStatusToRead({ commit, state }, notificationId) {
        const notification = state.data.find(eachNotification => eachNotification.notificationId === notificationId);
        if (notification.state === 'READ') {
            return;
        }
        DataAccessor.updateNotificationState(notificationId, 'READ', (successData) => {
            commit('setNotificationReadStateSuccess', notificationId);
        }, (failure) => {
            commit('setNotificationReadStateError');
        })
    },





    //Message Notifications

    getImageUrl({ dispatch, state }, {imageUrl, width, compressed }) {
        if( imageUrl == null ) return null;
        if( imageUrl.startsWith( "http://" ) && imageUrl.indexOf( "ptlp.co" ) !== -1 )
            imageUrl = "https://" + imageUrl.substr(7);

        if( width != null ) imageUrl = imageUrl + ( imageUrl.indexOf( "?" ) > -1 ? "&" : "?" ) + "width=" + width;
        if( compressed != null ) imageUrl = imageUrl + ( imageUrl.indexOf( "?" ) > -1 ? "&" : "?" ) + "quality=" + ( compressed ? "low" : "high" );
        function canUseWebP() {
            var elem = document.createElement( 'canvas' );
            if( !!(elem.getContext && elem.getContext('2d')) ) {
                return elem.toDataURL( 'image/webp' ).indexOf( 'data:image/webp' ) == 0;
            }
            return false;
        }
        if( window.canUseWebp == null ) {
            window.canUseWebp = canUseWebP();
        }
        let supportedImageType = window.canUseWebp ? "webp" : "jpg";
        imageUrl = imageUrl + ( imageUrl.indexOf( "?" ) > -1 ? "&" : "?" ) + "type=" + supportedImageType;
        return imageUrl;
    },

    loadChannelMessageNotifications({ dispatch, commit, state }, {firebaseGrowthDB, channelId, userId}) {
        firebaseGrowthDB.ref('/CHATS').child('channel_metadata').child(channelId).once('value').then(function(snapshot) {
            if(snapshot.val() == undefined) {
            /* TODO Something wrong */
            }
            var userInChannel = false;
            var otherUserId = 0;
            var conversationDisplayName = "";
            var conversationImageUrl = "";
            $.each(snapshot.val().users, function(user, userDetails) {
                if(user == userId) {
                    userInChannel = true;
                } else {
                    otherUserId = user;
                    conversationDisplayName = userDetails.displayName;
                    conversationImageUrl = userDetails.profileImageUrl;
                }
                console.log(user, userDetails);
            });
            if(userInChannel != true) {
            /* TODO Something wrong */
                return;
            }
            firebaseGrowthDB.ref('/CHATS').child('user_profile').child(otherUserId).once('value').then(function(snapshot) {
                if(snapshot.val() != undefined) {
                    conversationDisplayName = snapshot.val().displayName;
                    conversationImageUrl = snapshot.val().profileImageUrl;
                }
                var conversationImageUrlScaled = "";
                var width = 100;
                dispatch('getImageUrl', {imageUrl : conversationImageUrl, width: width}).then((imageUrl) => {
                    conversationImageUrlScaled = imageUrl;
                    let channelMetadata = {'otherUserId' : otherUserId, conversationDisplayName : conversationDisplayName, conversationImageUrl : conversationImageUrlScaled};
                    commit('setChannelMetadata',{channelId, channelMetadata});
                    dispatch('attachLastReadListener',{firebaseGrowthDB, channelId, userId});
                    dispatch('attachLastMessageListener',{firebaseGrowthDB, channelId, userId});
                });
            });
        });
    },

    attachLastReadListener ({ commit, state }, {firebaseGrowthDB, channelId, userId}) {
        firebaseGrowthDB.ref('/CHATS').child('user_channels').child(userId).child(channelId).child('lastReadMessage').on('value', function(snapshot) {
            var messageId = snapshot.val();
            commit('setLastReadMessageForChannel', {channelId, messageId});
        });
    },

    attachLastMessageListener ({ dispatch, commit, state }, {firebaseGrowthDB, channelId, userId}) {
        var channelMessagesRef = firebaseGrowthDB.ref('/CHATS').child('messages').child(channelId).orderByKey();
        if(state.channelLastReadMessage[channelId] != null) {
            channelMessagesRef = channelMessagesRef.startAt(self.channelLastReadMessage[channelId]);
        }
        channelMessagesRef.limitToLast(1).on('child_added', function(snapshot) {
            var message = snapshot.val();
            //console.log("Last message added : ",message, " for channel : ", channelId);
            commit('removeMessageForChannel', channelId)
            if((message.senderId == userId) || (state.channelLastReadMessage[channelId] == snapshot.key)) {
                return;
            }
            var currentDate = new Date();
            var currentDateStart = currentDate.setHours(0,0,0,0);
            var timeToDisplay = "";
            var messageDate = new Date(message.sendTime);
            var messageDateKey = messageDate.toLocaleDateString();
            if(+messageDate >= +currentDateStart) {
                timeToDisplay = new Date(message.sendTime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
            }
            else {
                let yesterdayDate = new Date();
                yesterdayDate.setTime(currentDate.getTime() - (24 * 3600000));
                var yesterdayDateStart = yesterdayDate.setHours(0, 0, 0, 0);
                if (+messageDate >= +yesterdayDateStart) {
                    timeToDisplay = "YESTERDAY";
                }
                else {
                    timeToDisplay = messageDateKey;
                }
            }
            var isUnread = true;
            var messageTimeDisplay = timeToDisplay;
            if(state.channelLastReadMessage[channelId] == snapshot.key) {
                isUnread = false;
            }
            var messageReceived = {channelId : channelId, messageId : snapshot.key, userId : state.fetchedChannelMetadataData[channelId].otherUserId, channelName : state.fetchedChannelMetadataData[channelId].conversationDisplayName, profileImageUrl : state.fetchedChannelMetadataData[channelId].conversationImageUrl, senderId : message.senderId, lastMessage : message.messageText, lastMessageTime : message.sendTime, lastMessageTimeDisplay : messageTimeDisplay, isUnread: isUnread};
            commit('addMessageNotification',messageReceived);
        }, function() {}, self);
    },

    attachMessageNotificationListener({ dispatch, state }, userId) {
        const self = this;
        console.log("Attaching message notification listener");
        import('firebase').then((firebase) => {
            setTimeout(function () {
                let firebaseGrowthDB = firebase.app("FirebaseGrowth").database();
                //console.log("Firebase growth initialized for page: ", firebaseGrowthDB);
                firebaseGrowthDB.ref('/CHATS').child('user_watched_channels').child(userId).on('child_added', function (snapshot) {
                    let channelId = snapshot.key;
                    dispatch('loadChannelMessageNotifications', {firebaseGrowthDB, channelId, userId});
                }, function () {
                }, self);
            }, 3000);
        });
    }

}
