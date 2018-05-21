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

    setPratilipiDataLoadingTrue(state) {
        state.pratilipi.loading_state = 'LOADING';
    },

    setPratilipiDataLoadingSuccess(state, pratilipiData) {
        state.pratilipi.loading_state = 'LOADING_SUCCESS';
        state.pratilipi.data = pratilipiData;
    },

    setPratilipiDataLoadingError(state) {
        state.pratilipi.loading_state = 'LOADING_ERROR';
        state.pratilipi.data = {};
    },


    addPratilipiToLibrarySuccess(state) {
        state.userPratilipi.data.addedToLib = true;
    },
    
    addPratilipiToLibraryError(state) {

    },

    removePratilipiFromLibrarySuccess(state) {
        state.userPratilipi.data.addedToLib = false;
    },
    
    removePratilipiFromLibraryError(state) {

    },

    setPratilipiUserDataLoadingTrue(state) {
        state.userPratilipi.loading_state = 'LOADING';
    },

    setPratilipiUserDataLoadingSuccess(state, pratilipiUserData) {
        state.userPratilipi.loading_state = 'LOADING_SUCCESS';
        state.userPratilipi.data = pratilipiUserData;
    },

    setPratilipiUserDataLoadingError(state) {
        state.userPratilipi.loading_state = 'LOADING_ERROR';
        state.userPratilipi.data = {};
    },


    setRecommendationLoadingTrue(state) {
        state.recommendations.loading_state = 'LOADING';
    },

    setRecommendationLoadingSuccess(state, recommendations) {
        state.recommendations.loading_state = 'LOADING_SUCCESS';
        state.recommendations.data = recommendations;
    },

    setRecommendationLoadingError(state) {
        state.recommendations.loading_state = 'LOADING_ERROR';
        state.recommendations.data = [];
    },

    setPratilipiImageUploadingTrue(state) {
        state.pratilipi.pratilipi_image_upload_state = 'LOADING';
    },
    setPratilipiImageUploadingSuccess(state, data) {
        state.pratilipi.pratilipi_image_upload_state = 'LOADING_SUCCESS';
        state.pratilipi.data.coverImageUrl = data.coverImageUrl;
    },
    setPratilipiImageUploadingError(state) {
        state.pratilipi.pratilipi_image_upload_state = 'LOADING_ERROR';
    },

    setPratilipiRatingUpdateLoading(state) {

    },
    setPratilipiRatingUpdateSuccess(state, value) {
        state.userPratilipi.data.rating = value;
        state.userPratilipi.data.reviewDateMillis = value ? Date.now() : null;
    },
    setPratilipiRatingUpdateError(state) {

    },


    setPratilipiReviewUpdateLoading(state){

    },
    setPratilipiReviewUpdateSuccess(state, value){
        state.userPratilipi.data.review = value;
        state.userPratilipi.data.reviewDateMillis = value ? Date.now() : null;
    },
    setPratilipiReviewUpdateError(state){

    },

    setAuthorDetailsLoadingTrue(state) {
        state.author.loading_state = 'LOADING';
    },
    
    setAuthorDetailsLoadingSuccess(state, authorData) {
        state.author.data = authorData;
        state.author.loading_state = 'LOADING_SUCCESS';
    },
    
    setAuthorDetailsLoadingError(state) {
        state.author.loading_state = 'LOADING_ERROR';
    },

    setUserAuthorDataLoadingTrue(state) {
        state.userAuthor.loading_state = 'LOADING';
    },
    
    setUserAuthorDataLoadingSuccess(state, authorData) {
        state.userAuthor.data = authorData;
        state.userAuthor.loading_state = 'LOADING_SUCCESS';
    },
    
    setUserAuthorDataLoadingError(state) {
        state.userAuthor.loading_state = 'LOADING_ERROR';
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

    setPratilipiSummaryUpdateSuccess(state, data) {
        state.pratilipi.data.summary = data.summary;
    },
    
    setPratilipiSummaryUpdateError(state) {

    },

    setPratilipiTitleUpdateSuccess(state, data) {
        state.pratilipi.data.title = data.title;
        state.pratilipi.data.titleEn = data.titleEn;
    },
    setPratilipiTitleUpdateError(state) {

    },

    setPratilipiStateUpdateSuccess(state, data) {
        state.pratilipi.data.state = data.state;
    },
    setPratilipiStateUpdateError(state) {

    },

    setFollowUnfollowLoadingDataLoadingError(state) {

    },

    setPratilipiDeleteSuccess(state) {
        state.pratilipi.data.state = 'DELETED';
    },
    setPratilipiDeleteError(state) {

    },

    setSystemTagsLoadingTrue(state) {
        state.system_tags.loading_state = 'LOADING';
    },
    setSystemTagsLoadingSuccess(state, data) {
        state.system_tags.loading_state = 'LOADING_SUCCESS';
        state.system_tags.data = data;
    },
    setSystemTagsLoadingError(state) {
        state.system_tags.loading_state = 'LOADING_ERROR';
    },

    removeTagsFromPratilipi(state, data) {
        const currentTags = state.pratilipi.data.tags;

        let indexToRemove = null;
        currentTags.forEach((eachTag, index) => {
            if (eachTag.id === data.id) {
                indexToRemove = index;
            }
        });

        if (indexToRemove != null) {
            currentTags.splice(indexToRemove, 1);
        }
    },

    addTagsToPratilipi(state, data) {
        state.pratilipi.data.tags.push(data);
    },

    setUpdatedTypeAndCategoriesSuccess(state, data) {
        state.pratilipi.data.tags = data.tags;
        state.pratilipi.data.suggestedTags = data.suggestedTags;
        state.pratilipi.data.type = data.type;
    },
    setUpdatedTypeAndCategoriesError(state) {

    }
}
