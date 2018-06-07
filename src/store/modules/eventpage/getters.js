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
    





    getEventDataLoadingState: state => state.event.loading_state,
    getEventData: state => state.event.data,

    getEventPratilipis: state => state.pratilipiList.data,
    getEventPratilipisCursor: state => state.pratilipiList.cursor,
    getEventPratilipisLoadingState: state => state.pratilipiList.loading_state,

    getUserEventDataLoadingState: state => state.userEventPratilipis.loading_state,
    getUserEventData: state => { return state.userEventPratilipis.data.filter(eachPratilipi => eachPratilipi.state === 'SUBMITTED') },
    getUserEventDraftData: state => { return state.userEventPratilipis.data.filter(eachPratilipi => eachPratilipi.state === 'DRAFTED') }
}
