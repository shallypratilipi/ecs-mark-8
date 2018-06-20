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
    

    setSearchPageInitialDataLoadingTrue(state){
        state.pratilipi.loading_state = 'LOADING';
        state.pratilipi.data = [];
        state.pratilipi.cursor = null;
        state.author.data = [];
        state.author.cursor = null;
    },
    setSearchPageInitialDataLoadingSuccess(state, data){

        state.pratilipi.loading_state = 'LOADING_SUCCESS';
        state.author.loading_state = 'LOADING_SUCCESS';

        if (data.pratilipi.pratilipiList && data.pratilipi.pratilipiList.length > 0) {
            state.pratilipi.data = data.pratilipi.pratilipiList;
            state.pratilipi.cursor = data.pratilipi.pratilipiCursor;
        }

        if (data.author.authorList && data.author.authorList.length > 0) {
            state.author.data = data.author.authorList;
            state.author.cursor = data.author.authorCursor;
        }
        
    },
    setSearchPagePratilipiDynamicLoadingTrue(state){
        state.pratilipi.loading_state = 'LOADING';
    },
    setSearchPagePratilipiDynamicLoadingSuccess(state, data){
        state.pratilipi.loading_state = 'LOADING_SUCCESS';

        if (!data.pratilipi || !data.pratilipi.pratilipiList || data.pratilipi.pratilipiList.length === 0) {
            state.pratilipi.cursor = null;
        } else {
            state.pratilipi.data = state.pratilipi.data.concat(data.pratilipi.pratilipiList);
            state.pratilipi.cursor = data.pratilipi.pratilipiCursor;
        }
    },
    setSearchPagePratilipiDynamicLoadingError(state){
        state.loading_state = 'LOADING_ERROR';
    },

    addPratilipiToLibrarySuccess(state, data) {
        const pratilipiAddedToLib = state.pratilipi.data.find(eachPratilipi => eachPratilipi.pratilipiId === data.referenceId);
        if (pratilipiAddedToLib) {
            pratilipiAddedToLib.addedToLib = true
        }
    },

    addPratilipiToLibraryError(state) {

    },

    removePratilipiFromLibrarySuccess(state, data) {
        const pratilipiAddedToLib = state.pratilipi.data.find(eachPratilipi => eachPratilipi.pratilipiId === data.referenceId);
        if (pratilipiAddedToLib) {
            pratilipiAddedToLib.addedToLib = false
        }
    },

    removePratilipiFromLibraryError(state) {

    },

    setFollowUnfollowLoadingDataLoadingTrue(state) {

    },

    setFollowUnfollowLoadingDataLoadingSuccess(state, data){
        const authorFollowedOrUnfollowed = state.author.data.find(eachAuthor => eachAuthor.authorId == data.referenceId);
        authorFollowedOrUnfollowed.following = data.following;
        if (data.following) {
            authorFollowedOrUnfollowed.followCount++;    
        } else {
            authorFollowedOrUnfollowed.followCount--;
        }
    },

    setFollowUnfollowLoadingDataLoadingError(state) {

    },

    setTrendingSearchLoadingTrue(state) {
        state.trending.loading_state = 'LOADING';
    },
    setTrendingSearchLoadingSuccess(state, data) {
        state.trending.loading_state = 'LOADING_SUCCESS';
        state.trending.data = data.trending_keywords;
    },
    setTrendingSearchLoadingError(state) {
        state.trending.loading_state = 'LOADING_ERROR';
    }
}
