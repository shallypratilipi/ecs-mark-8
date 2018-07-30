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
    
    getPratilipiListLoadingState: state => state.loading_state,
    getPratilipiListCursor: state => state.cursor,
    getPratilipiListData: state => state.data,
    getPratilipiListTotalCount: state => state.numberFound,
    getPratilipiListTitle: state => state.title,
    getPageTitle: state => state.titleEn === "" || state.titleEn === null || state.titleEn === "undefined" || state.titleEn === "null" || state.titleEn === undefined ? state.title : state.title+" | "+state.titleEn

}
