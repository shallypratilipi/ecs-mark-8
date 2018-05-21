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
    
    getPratilipiData: state => state.pratilipi.data,
    getPratilipiLoadingState: state => state.pratilipi.loading_state,
    getUserPratilipiData: state => state.userPratilipi.data,
    getUserPratilipiLoadingState: state => state.userPratilipi.loading_state,
    getIndexData: state => state.index.data,
    getIndexLoadingState: state => state.index.loading_state,
    getPratilipiContent: state => state.content.data,
    getPratilipiContentLoadingState: state => state.content.loading_state,
    getAuthorData: state => state.author.data,
    getAuthorDataLoadingState: state => state.author.loading_state,
}
