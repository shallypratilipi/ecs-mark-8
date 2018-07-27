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

    setEventDataFromCache(state, eventData) {
        state.event.loading_state = 'LOADING_SUCCESS';
        state.event.data = eventData;
    },

    setEventDataLoadingTrue(state) {
        state.event.loading_state = 'LOADING';
        state.event.data = {};
    },

    setEventDataLoadingSuccess(state, eventData) {
        state.event.loading_state = 'LOADING_SUCCESS';
        state.event.data = eventData.event;
        console.log("eventData : ", eventData);
        state.event.drafts = eventData.entries.yourDrafted;
        state.event.submissions = eventData.entries.yourSubmitted;
    },

    setEventDataLoadingError(state) {
        state.event.loading_state = 'LOADING_ERROR';
        state.event.data = {};
    },

    setInitialEventPratilipiLoadingTrue(state) {
        state.pratilipiList.loading_state = 'LOADING';
        state.pratilipiList.data = [];
    },

    setInitialEventPratilipiLoadingSuccess(state, data) {
        state.pratilipiList.loading_state = 'LOADING_SUCCESS';
        state.pratilipiList.data = data.pratilipiList;
        state.pratilipiList.cursor = data.cursor;
    },

    setInitialEventPratilipiLoadingError(state) {
        state.pratilipiList.loading_state = 'LOADING_ERROR';
        state.pratilipiList.data = [];
    },

    setDynamicEventPratilipiLoadingTrue(state) {
        state.pratilipiList.loading_state = 'LOADING';
    },

    setDynamicEventPratilipiLoadingSuccess(state, data) {
        state.pratilipiList.loading_state = 'LOADING_SUCCESS';

        if (!data.pratilipiList || data.pratilipiList.length === 0) {
            state.pratilipiList.cursor = null;
        } else {
            state.pratilipiList.loading_state = "LOADING_SUCCESS";
            state.pratilipiList.data = state.pratilipiList.data.concat(data.pratilipiList);
            state.pratilipiList.cursor = data.cursor;
        }
    },

    setDynamicEventPratilipiLoadingError(state) {
        state.loading_state = 'LOADING_ERROR';
    },

    addPratilipiToLibrarySuccess(state, data) {
        const pratilipiAddedToLib = state.pratilipiList.data.find(eachPratilipi => eachPratilipi.pratilipiId === data.referenceId);
        if (pratilipiAddedToLib) {
            pratilipiAddedToLib.addedToLib = true
        }
    },

    addPratilipiToLibraryError(state) {

    },

    removePratilipiFromLibrarySuccess(state, data) {
        const pratilipiAddedToLib = state.pratilipiList.data.find(eachPratilipi => eachPratilipi.pratilipiId === data.referenceId);
        if (pratilipiAddedToLib) {
            pratilipiAddedToLib.addedToLib = false
        }
    },

    removePratilipiFromLibraryError(state) {

    },

    setUserEventPratilipiDataLoadingTrue(state) {
        state.userEventPratilipis.loading_state = 'LOADING';
    },
    setUserEventPratilipiDataLoadingSuccess(state, eventPratilipis) {
        state.userEventPratilipis.loading_state = 'LOADING_SUCCESS';
        state.userEventPratilipis.data = eventPratilipis;
    },
    setUserEventPratilipiDataLoadingError(state) {
        state.userEventPratilipis.loading_state = 'LOADING_ERROR';
    }
}
