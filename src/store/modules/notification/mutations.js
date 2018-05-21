export default {
    // pushProductToCart(state, { id }) {
    //     state.added.push({
    //         id,
    //         quantity: 1
    //     })
    // },

    // incrementItemQuantity(state, { id }) {
    //     const cartItem = state.added.find(item => item.id === id)
    //     cartItem.quantity++
    // },

    // setCartItems(state, { items }) {
    //     state.added = items
    // },

    // setCheckoutStatus(state, status) {
    //     state.checkoutStatus = status
    // }

    setInitialNotificationLoadingTrue(state) {
        state.loading_state = 'LOADING';
        state.data = [];
        state.cursor = null;
    },

    setInitialNotificationLoadingSuccess(state, data) {
        state.loading_state = 'LOADING_SUCCESS';
        state.data = data.notificationList;
        state.cursor = data.cursor;
    },

    setInitialNotificationLoadingError(state) {
        state.loading_state = 'LOADING_ERROR';
    },

    setMoreNotificationLoadingTrue(state) {
        state.loading_state = 'LOADING';
    },
    setMoreNotificationLoadingSuccess(state, data) {
        state.loading_state = 'LOADING_SUCCESS';
        if (!data.notificationList || data.notificationList.length === 0) {
            state.cursor = null;
        } else {
            state.data = state.data.concat(data.notificationList);
            state.cursor = data.cursor;
        }
    },

    setMoreNotificationLoadingError(state) {
        state.loading_state = 'LOADING_ERROR';
    },

    setNotificationReadStateSuccess(state, notificationId) {
        const notification = state.data.find(eachNotification => eachNotification.notificationId === notificationId);
        notification.state = 'READ';
    },

    setNotificationReadStateError() {

    },






    //Message Notifications
    setChannelMetadata(state, {channelId, channelMetadata}) {
        state.fetchedChannelMetadataData[channelId] = channelMetadata;
    },

    addMessageNotification(state, messageReceived) {
        state.messageNotificationList.unshift(messageReceived);
    },

    setLastReadMessageForChannel(state, {channelId, messageId}) {
        state.channelLastReadMessage[channelId] = messageId;
        for (var i=0; i < state.messageNotificationList.length; i++) {
            if(state.messageNotificationList[i].channelId == channelId) {
                if(state.messageNotificationList[i].messageId == messageId) {
                    state.messageNotificationList.splice(i,1);
                }
                break;
            }
        }
    },

    removeMessageForChannel(state, channelId) {
        for (var i=0; i < state.messageNotificationList.length; i++) {
            if(state.messageNotificationList[i].channelId == channelId) {
                state.messageNotificationList.splice(i,1);
                return;
            }
        };
    }

}
