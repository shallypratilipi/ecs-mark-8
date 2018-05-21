export default {
    // checkoutStatus: state => state.checkoutStatus,

    // cartProducts: (state, getters, rootState) => {
    //     return state.added.map(({ id, quantity }) => {
    //         const product = rootState.products.all.find(product => product.id === id)
    //         return {
    //             title: product.title,
    //             price: product.price,
    //             quantity
    //         }
    //     })
    // },

    // cartTotalPrice: (state, getters) => {
    //     return getters.cartProducts.reduce((total, product) => {
    //         return total + product.price * product.quantity
    //     }, 0)
    // }

    getNotifications: state => state.data,
    getNotificationLoadingState: state => state.loading_state,
    getNotificationCursor: state => state.cursor,


    //Message Notifications
    messageNotificationList: state => state.messageNotificationList,
    fetchedChannelMetadataData: state => state.fetchedChannelMetadataData,
    channelLastReadMessage: state => state.channelLastReadMessage

}
