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

    setSectionDataLoadingTrue(state) {
        state.sections.loading_state = 'LOADING';
    },

    setSectionData(state, sectionData) {
        console.log(state);
        state.sections.loading_state = 'LOADING_SUCCESS';
        state.sections.data = sectionData.sections;
    },

    setSectionDataLoadingError(state) {
        state.sections.loading_state = 'LOADING_ERROR';
        state.sections.data = [];
    },

    addPratilipiToLibrarySuccess(state, data) {
        console.log(data);
        for (var i = 0; i < state.sections.data.length; i++) {
            const eachSection = state.sections.data[i].pratilipiList;
            console.log(eachSection);
            const pratilipiAddedToLib = eachSection.find(eachPratilipi => eachPratilipi.pratilipiId === data.referenceId);
            if (pratilipiAddedToLib) {
                pratilipiAddedToLib.addedToLib = true
                break;
            }
        }
    },

    addPratilipiToLibraryError(state) {

    },

    removePratilipiFromLibrarySuccess(state, data) {
        console.log(data);
        for (var i = 0; i < state.sections.data.length; i++) {
            const eachSection = state.sections.data[i].pratilipiList;
            console.log(eachSection);
            const pratilipiAddedToLib = eachSection.find(eachPratilipi => eachPratilipi.pratilipiId === data.referenceId);
            if (pratilipiAddedToLib) {
                pratilipiAddedToLib.addedToLib = false
                break;
            }
        }
    },

    removePratilipiFromLibraryError(state) {

    },

    setHomePageBannerLoadingTrue(state){
        state.banners.loading_state = 'LOADING';
    },
    setHomePageBannerLoadingSuccess(state, data){
        state.banners.loading_state = 'LOADING_SUCCESS';
        state.banners.data = data.bannerList;
    },
    setHomePageBannerLoadingError(state){
        state.banners.loading_state = 'LOADING_ERROR';
        state.banners.data = [];
    },
}
