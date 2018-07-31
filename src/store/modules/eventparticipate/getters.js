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

    getEventPratilipiCreateOrUpdateStateSuccess: state => state.eventPratilipiCreateOrUpdateState,
    getEventPratilipiLoadingState: state => state.eventPratilipiLoadingState,
    getEventPratilipiData: state => state.eventPratilipi,
    getEventPratilipiCoverImage: state => {
        if(state.eventPratilipi.coverImage) return state.eventPratilipi.coverImage;
        else return 'https://0.ptlp.co/pratilipi/cover'
    },
    getContentLoadingState: state => state.contentLoadingState,
    getEventPratilipDescUpdateState: state => state.eventPratilipDescUpdateState,
    getContents: state => state.contents,
    getEventData: state => state.event,
    getEventLoadingState: state => state.eventDataLoadingState,
    getDraftedEventPratilipiLoadingState: state => state.draftedEventPratilipis.loading_state,
    getDraftedEventPratilipi: state => state.draftedEventPratilipis.data,
    getEventPratilipiImageUploadLoadingState: state => state.pratilipi_image_upload_state,


    getPratilipiOfEvent: state => state.eventForPratilipi.data,
    getPratilipiOfEventLoadingState: state => state.eventForPratilipi.loading_state,


}
