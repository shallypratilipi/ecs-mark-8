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

    setEventsDataLoadingTrue(state) {
        state.events.loading_state = 'LOADING';
    },

    setEventsDataLoadingSuccess(state, data) {
        state.events.loading_state = 'LOADING_SUCCESS';
        state.events.data = data.events;
    },

    setEventsDataLoadingError(state) {
        state.events.loading_state = 'LOADING_ERROR';
        state.events.data = [];
    }
}
