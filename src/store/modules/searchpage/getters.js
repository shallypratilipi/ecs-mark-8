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
    
    getPratilipiListLoadingState: state => state.pratilipi.loading_state,
    getPratilipiListCursor: state => state.pratilipi.cursor,
    getPratilipiListData: state => state.pratilipi.data,
    getAuthorListLoadingState: state => state.author.loading_state,
    getAuthorListCursor: state => state.author.cursor,
    getAuthorListData: state => state.author.data,
    getTrendingWords: state => state.trending.data
}
