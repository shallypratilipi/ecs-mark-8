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
    
    getAuthorData: state => state.author.data,
    getAuthorDataLoadingState: state => state.author.loading_state,

    getPublishedContents: state => state.published_contents.data,
    getPublishedContentsLoadingState: state => state.published_contents.loading_state,
    getPublishedContentsTotalCount: state => state.published_contents.numberFound,
    getPublishedContentsCursor: state => state.published_contents.cursor,

    getLibraryList: state => state.library.data,
    getLibraryListLoadingState: state => state.library.loading_state,
    getLibraryListTotalCount: state => state.library.numberFound,

    getAuthorFollowing: state => state.following.data,
    getAuthorFollowingLoadingState: state => state.following.loading_state,
    getAuthorFollowingCursor: state => state.following.cursor,

    getAuthorFollowers: state => state.followers.data,
    getAuthorFollowersLoadingState: state => state.followers.loading_state,
    getAuthorFollowersCursor: state => state.followers.cursor,
    
    getCoverImageLoadingState: state => state.author.cover_image_upload_state,
    getProfileImageLoadingState: state => state.author.profile_image_upload_state,
}
