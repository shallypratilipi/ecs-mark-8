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

    setLibraryPageInitialDataLoadingTrue(state) {
        state.loading_state = 'LOADING';
        state.data = [];
        state.cursor = null;
        state.numberFound = 0;
    },

    setLibraryPageInitialDataLoadingSuccess(state, data) {
        state.loading_state = 'LOADING_SUCCESS';
        state.data = data.pratilipiList;
        state.cursor = data.cursor;
        state.numberFound = data.numberFound;
    },

    setLibraryPageInitialDataLoadingError(state) {
        state.loading_state = 'LOADING_ERROR';
        state.data = [];
        state.cursor = null;
        state.numberFound = 0;
    },

    setLibraryPageDynamicLoadingTrue(state) {
        state.loading_state = 'LOADING';
    },
    setLibraryPageDynamicLoadingSuccess(state, data) {
        state.loading_state = 'LOADING_SUCCESS';

        if (!data.pratilipiList || data.pratilipiList.length === 0) {
            state.cursor = null;
        } else {
            state.data = state.data.concat(data.pratilipiList);
            state.cursor = data.cursor;
        }
    },

    addPratilipiToLibrarySuccess(state, data) {
        const pratilipiAddedToLib = state.data.find(eachPratilipi => eachPratilipi.pratilipiId === data.referenceId);
        if (pratilipiAddedToLib) {
            pratilipiAddedToLib.addedToLib = true
        }
    },

    addPratilipiToLibraryError(state) {

    },

    removePratilipiFromLibrarySuccess(state, data) {
        state.data = state.data.filter(eachPratilipi => eachPratilipi.pratilipiId !== data.referenceId);
        state.cursor--;
    },

    removePratilipiFromLibraryError(state) {

    }
}
