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
    
    setInputModalSaveAction(state, { action, data, prefilled_value, prefilled_value_two, initial_value, pratilipi_data }) {
        state.action = action;
        state.data = data;
        state.prefilled_value = prefilled_value;
        state.prefilled_value_two = prefilled_value_two;
        state.initial_value = initial_value;
        state.pratilipi_data = pratilipi_data;
    },

    setConfirmModalAction(state, { action, data, message }) {
        state.action = action;
        state.data = data;
        state.message = message;
    },

    setModalHeading(state, heading) {
        state.heading = heading;
    },

    updatePrefilledValue(state, value) {
        state.prefilled_value = value;
    },

    updatePrefilledValueTwo(state, value) {
        state.prefilled_value_two = value;
    }
}
