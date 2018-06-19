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

    setAuthorDataLoadingTrue(state) {
        state.author.loading_state = 'LOADING';
    },
    
    setAuthorDataLoadingSuccess(state, authorData) {
        state.author.data = authorData;
        state.author.loading_state = 'LOADING_SUCCESS';
    },
    
    setAuthorDataLoadingError(state) {
        state.author.loading_state = 'LOADING_ERROR';
    },

    setUpdateUserLoadingTrue(state) {
        state.author.user_update_state = 'LOADING';
    },
    setUpdateUserLoadingSuccess(state) {
        state.author.user_update_state = 'LOADING_SUCCESS';
    },
    setUpdateUserLoadingError(state) {
        state.author.user_update_state = 'LOADING_ERROR';
    },
    setUpdateAuthorLoadingTrue(state) {
        state.author.author_update_state = 'LOADING';
    },
    setUpdateAuthorLoadingSuccess(state, data) {
        state.author.author_update_state = 'LOADING_SUCCESS';
        state.author.data = data;
    },
    setUpdateAuthorLoadingError(state) {
        state.author.author_update_state = 'LOADING_ERROR';
    },
    setMarketingFrequencyLoadingTrue(state) {
        state.marketing_frequency = "LOADING";
    },
    setMarketingFrequencyLoadingSuccess(state) {
        state.marketing_frequency = "LOADING_SUCCESS";
    },
    setMarketingFrequencyLoadingError(state) {
        state.marketing_frequency = "LOADING_ERROR";
    }
}
