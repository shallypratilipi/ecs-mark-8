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

    setDraftedContentsLoadingTrue(state) {
        state.drafts.loading_state = 'LOADING';
        state.drafts.data = [];
        state.drafts.cursor = null;
        state.drafts.numberFound = 0;
    },

    setDraftedContentsLoadingSuccess(state, response) {
        state.drafts.loading_state = 'LOADING_SUCCESS';
        state.drafts.data = response.pratilipiList;
        state.drafts.cursor = response.cursor;
        state.drafts.numberFound = response.numberFound;
    },

    setDraftedContentsLoadingError(state) {
        state.drafts.loading_state = 'LOADING_ERROR';
        state.drafts.data = [];
        state.drafts.cursor = null;
        state.drafts.numberFound = 0;
    },

    setDraftedContentsDynamicLoadingTrue(state) {
        state.drafts.loading_state = 'LOADING';
    },

    setDraftedContentsDynamicLoadingSuccess(state, response) {
        state.drafts.loading_state = 'LOADING_SUCCESS';
        state.drafts.data = state.drafts.data.concat(response.pratilipiList);
        state.drafts.cursor = response.cursor;
    },

    setDraftedContentsDynamicLoadingError(state) {
        
    }
}
