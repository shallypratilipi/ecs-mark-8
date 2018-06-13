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
  setUpdateAuthorLoadingSuccess(state, data) {
        state.author.author_update_state = 'LOADING_SUCCESS';
        state.author.data = data;
    },
    setPublishedContentsLoadingTrue(state) {
        state.published_contents.loading_state = 'LOADING';
        state.published_contents.data = [];
        state.published_contents.cursor = null;
        state.published_contents.numberFound = 0;
    },

    setPublishedContentsLoadingSuccess(state, response) {
        state.published_contents.loading_state = 'LOADING_SUCCESS';
        state.published_contents.data = response.pratilipiList;
        state.published_contents.cursor = response.cursor;
        state.published_contents.numberFound = response.numberFound;
    },

    setPublishedContentsLoadingError(state) {
        state.published_contents.loading_state = 'LOADING_ERROR';
        state.published_contents.data = [];
        state.published_contents.cursor = null;
        state.published_contents.numberFound = 0;
    },

    setPublishedContentsDynamicLoadingTrue(state) {
        state.published_contents.loading_state = 'LOADING';
    },

    setPublishedContentsDynamicLoadingSuccess(state, response) {
        state.published_contents.loading_state = 'LOADING_SUCCESS';
        if (response.pratilipiList && response.pratilipiList.length > 0) {
            state.published_contents.data = state.published_contents.data.concat(response.pratilipiList);
            state.published_contents.cursor = response.cursor;
        } else {
            state.published_contents.cursor = null;
        }
    },

    setPublishedContentsDynamicLoadingError(state) {

    },

    setAuthorDataLoadingTrue(state) {
        state.author.loading_state = 'LOADING';
    },
    setAuthorDataLoadingSuccess(state, authorData) {
        state.author.loading_state = 'LOADING_SUCCESS';
        state.author.data = authorData;
    },
    setAuthorDataLoadingError(state) {
        state.author.loading_state = 'LOADING_ERROR';
    },


    setInitialAuthorFollowingDataLoadingTrue(state){
        state.following.loading_state = 'LOADING';
        state.following.data = [];
        state.following.cursor = null;
        state.following.numberFound = 0;
    },

    setInitialAuthorFollowingDataLoadingSuccess(state, data){
        state.following.loading_state = 'LOADING_SUCCESS';
        state.following.data = data.authorList;
        state.following.cursor = data.cursor;
        state.following.numberFound = data.numberFound;
    },

    setInitialAuthorFollowingDataLoadingError(state){
        state.following.loading_state = 'LOADING_ERROR';
    },

    setInitialAuthorFollowersDataTrue(state){
        state.followers.loading_state = 'LOADING';
        state.followers.data = [];
        state.followers.cursor = null;
        state.followers.numberFound = 0;
    },

    setInitialAuthorFollowersDataSuccess(state, data){
        state.followers.loading_state = 'LOADING_SUCCESS';
        state.followers.data = data.userList;
        state.followers.cursor = data.cursor;
        state.followers.numberFound = data.numberFound;
    },

    setInitialAuthorFollowersDataError(state){
        state.followers.loading_state = 'LOADING_ERROR';
    },


    setMoreAuthorFollowingDataLoadingTrue(state) {
        state.following.loading_state = 'LOADING';
    },
    setMoreAuthorFollowingDataLoadingSuccess(state, response) {
        state.following.loading_state = 'LOADING_SUCCESS';
        if (response.authorList && response.authorList.length > 0) {
            state.following.data = state.following.data.concat(response.authorList);
            state.following.cursor = response.cursor;
        } else {
            state.following.cursor = null;
        }

    },
    setMoreAuthorFollowingDataLoadingError(state) {
        state.following.loading_state = 'LOADING_ERROR';
    },
    setMoreAuthorFollowersDataTrue(state) {
        state.followers.loading_state = 'LOADING';
    },
    setMoreAuthorFollowersDataSuccess(state, response) {
        state.followers.loading_state = 'LOADING_SUCCESS';
        if (response.userList && response.userList.length > 0) {
            state.followers.data = state.followers.data.concat(response.userList);
            state.followers.cursor = response.cursor;
        } else {
            state.followers.cursor = null;
        }

    },
    setMoreAuthorFollowersDataError(state) {
        state.followers.loading_state = 'LOADING_ERROR';
    },


    setLibraryListInitialDataLoadingTrue(state) {
        state.library.loading_state = 'LOADING';
        state.library.data = [];
        state.library.cursor = null;
        state.library.numberFound = 0;
    },

    setLibraryListInitialDataLoadingSuccess(state, data) {
        state.library.loading_state = 'LOADING_SUCCESS';
        state.library.data = data.pratilipiList;
        state.library.cursor = data.cursor;
        state.library.numberFound = data.numberFound;
    },

    setLibraryListInitialDataLoadingError(state) {
        state.library.loading_state = 'LOADING_ERROR';
        state.library.data = [];
        state.library.cursor = null;
        state.library.numberFound = 0;
    },

    removePratilipiFromLibrarySuccess(state, data) {
        state.library.data = state.library.data.filter(eachPratilipi => eachPratilipi.pratilipiId !== data.referenceId);
    },

    removePratilipiFromLibraryPublishedSuccess(state, data) {
        state.library.data = state.library.data.filter(eachPratilipi => eachPratilipi.pratilipiId !== data.referenceId);
        const pratilipiAddedToLib = state.published_contents.data.find(eachPratilipi => eachPratilipi.pratilipiId === data.referenceId);
        if (pratilipiAddedToLib) {
            pratilipiAddedToLib.addedToLib = false;
        }
    },
    addPratilipiToLibrarySuccess(state, data) {
        const pratilipiAddedToLib = state.published_contents.data.find(eachPratilipi => eachPratilipi.pratilipiId === data.referenceId);
        if (pratilipiAddedToLib) {
            pratilipiAddedToLib.addedToLib = true;
            state.library.data.push(pratilipiAddedToLib);
        }
    },

    removePratilipiFromLibraryPublishedError() {},
    addPratilipiToLibraryError() {},

    removePratilipiFromLibraryError() {

    },

    setFollowUnfollowLoadingDataLoadingTrue(state) {

    },

    setFollowUnfollowLoadingDataLoadingSuccess(state, data){
        state.author.data.following = data.following;
        if (data.following) {
            state.author.data.followCount++;
        } else {
            state.author.data.followCount--;
        }
    },

    setFollowUnfollowLoadingDataLoadingError(state) {

    },

    setFollowUnfollowFollowingLoadingDataLoadingTrue(state) {

    },
    setFollowUnfollowFollowingLoadingDataLoadingSuccess(state, data) {
        const authorFollowedOrUnfollowed = state.following.data.find(eachAuthor => eachAuthor.authorId === data.authorId);
        authorFollowedOrUnfollowed.following = data.following;
        if (data.following) {
            authorFollowedOrUnfollowed.followCount++;
        } else {
            authorFollowedOrUnfollowed.followCount--;
        }
    },
    setFollowUnfollowFollowingLoadingDataLoadingError(state) {

    },
    setFollowUnfollowFollowersLoadingDataLoadingTrue(state) {

    },
    setFollowUnfollowFollowersLoadingDataLoadingSuccess(state, data) {
        const authorFollowedOrUnfollowed = state.followers.data.find(eachAuthor => eachAuthor.author.authorId === data.authorId);
        authorFollowedOrUnfollowed.author.following = data.following;
        if (data.following) {
            authorFollowedOrUnfollowed.author.followCount++;
        } else {
            authorFollowedOrUnfollowed.author.followCount--;
        }
    },
    setFollowUnfollowFollowersLoadingDataLoadingError(state) {

    },

    setCoverImageUploadingTrue(state) {
        state.author.cover_image_upload_state = 'LOADING';
    },
    setCoverImageUploadingSuccess(state, data) {
        state.author.cover_image_upload_state = 'LOADING_SUCCESS';
        state.author.data.coverImageUrl = data.coverImageUrl;
    },
    setCoverImageUploadingError(state) {
        state.author.cover_image_upload_state = 'LOADING_ERROR';
    },

    setProfileImageUploadingTrue(state) {
        state.author.profile_image_upload_state = 'LOADING';
    },
    setProfileImageUploadingSuccess(state, data) {
        state.author.profile_image_upload_state = 'LOADING_SUCCESS';
        state.author.data.imageUrl = data.coverImageUrl;
    },
    setProfileImageUploadingError(state) {
        state.author.profile_image_upload_state = 'LOADING_ERROR';
    },

    setRouteToMessageUser(state, routeState) {
        state.route_to_message_user = routeState;
    },
     setInputModalSaveAction(state, { action, data, prefilled_value, prefilled_value_two, initial_value, pratilipi_data }) {
        state.action = action;
        state.data = data;
        state.prefilled_value = prefilled_value;
        state.prefilled_value_two = prefilled_value_two;
        state.initial_value = initial_value;
        state.pratilipi_data = pratilipi_data;
    },
    
}
