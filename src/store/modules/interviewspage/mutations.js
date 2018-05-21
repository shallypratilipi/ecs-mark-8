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

    setInitialInterviewsDataLoadingTrue(state) {
        state.loading_state = 'LOADING';
        state.data = [];
    },

    setInitialInterviewsDataLoadingSuccess(state, data) {
        state.loading_state = 'LOADING_SUCCESS';
        state.data = data.blogPostList;
        state.cursor = data.cursor;
    },

    setInitialInterviewsDataLoadingError(state) {
        state.loading_state = 'LOADING_ERROR';
        state.data = [];
    },

    setMoreInterviewsDataLoadingTrue(state) {
        state.loading_state = 'LOADING';  
    },
    setMoreInterviewsDataLoadingSuccess(state, data) {
        state.loading_state = 'LOADING_SUCCESS';
        if (data.blogPostList && data.blogPostList.length > 0) {
            state.data = state.data.concat(data.blogPostList);
            state.cursor = data.cursor;
        } else {
            state.cursor = null;
        }
    },
    setMoreInterviewsDataLoadingError(state) {
        state.loading_state = 'LOADING_ERROR';
    }
}
