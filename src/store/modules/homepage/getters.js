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
    
    getHomePageSections: state => state.sections.data,
    getHomePageLoadingState: state => state.sections.loading_state,
    getHomePageBanners: state => state.banners.data,
    getHomePageBannersLoadingState: state => state.banners.loading_state,
    getJokeOfTheDay: state => state.joke.data,
    getQuoteOfTheDay: state => state.quote.data,
}
