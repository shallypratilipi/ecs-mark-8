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

    setStaticPageDataLoadingTrue(state) {
        state.loading_state = 'LOADING';
    },
    
    setStaticPageDataLoadingSuccess(state, staticPageData) {
        state.data = staticPageData;
        state.loading_state = 'LOADING_SUCCESS';
    },
    
    setStaticPageDataLoadingError(state) {
        state.loading_state = 'LOADING_ERROR';
    }
}
