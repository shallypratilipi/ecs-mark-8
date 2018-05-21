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

    setInterviewDataLoadingTrue(state) {
        state.loading_state = 'LOADING';
        state.data = {};
    },

    setInterviewDataLoadingSuccess(state, data) {
        state.loading_state = 'LOADING_SUCCESS';
        state.data = data;
    },

    setInterviewDataLoadingError(state) {
        state.loading_state = 'LOADING_ERROR';
        state.data = {};
    }
}
