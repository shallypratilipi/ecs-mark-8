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
    getImageUploadLoadingState: state => state.pratilipi.pratilipi_image_upload_state,
    getAuthorDetails: state => state.author.data,
    getAuthorDetailsLoadingState: state => state.author.loading_state,
    getUserAuthorDetails: state => state.userAuthor.data,
    getSystemTags: state => state.system_tags.data,
    getSystemTagsLoadingState: state => state.system_tags.loading_state,
    getRouteToMessageUserState: state => state.route_to_message_user
}
