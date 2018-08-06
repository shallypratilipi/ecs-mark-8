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

    setReaderPratilipiDataLoadingTrue(state) {
        state.pratilipi.loading_state = 'LOADING';
    },

    setReaderPratilipiDataLoadingSuccess(state, pratilipiData) {
        state.pratilipi.loading_state = 'LOADING_SUCCESS';
        state.pratilipi.data = pratilipiData;
    },

    setReaderPratilipiDataLoadingError(state) {
        state.pratilipi.loading_state = 'LOADING_ERROR';
        state.pratilipi.data = {};
    },

    setReaderPratilipiIndexDataLoadingTrue(state) {
        state.index.loading_state = 'LOADING'
    },
    setReaderPratilipiIndexDataLoadingSuccess(state, data) {
        state.index.loading_state = 'LOADING_SUCCESS';
        state.index.data = data.index;
    },
    setReaderPratilipiIndexDataLoadingError(state) {
        state.index.loading_state = 'LOADING_ERROR';
        state.index.data = [];
    },


    setReaderPratilipiUserDataLoadingTrue(state) {
        state.userPratilipi.loading_state = 'LOADING';
    },

    setReaderPratilipiUserDataLoadingSuccess(state, pratilipiUserData) {
        state.userPratilipi.loading_state = 'LOADING_SUCCESS';
        state.userPratilipi.data = pratilipiUserData;
    },

    setReaderPratilipiUserDataLoadingError(state) {
        state.userPratilipi.loading_state = 'LOADING_ERROR';
        state.userPratilipi.data = {};
    },

    clearCachedContents(state) {
        state.content.data = [];
    },

    setContentLoadingTrue(state) {
        state.content.loading_state = 'LOADING';
    },

    setContentLoadingSuccess(state, data) {
        const chapterToFind = state.content.data.find((eachChapter) => eachChapter.chapterNo === data.chapterNo);
        if (chapterToFind) {
            return;
        }
        state.content.data.push(data);
        state.content.loading_state = 'LOADING_SUCCESS';
    },
    setContentLoadingError(state) {
        state.content.loading_state = 'LOADING_ERROR';
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

    setImageContentLoadingSuccess(state, data) {
        const { chapters } = data.content;
        const API_PREFIX = (window.location.origin.indexOf(".pratilipi.com") > -1 || window.location.origin.indexOf(".ptlp.co")) > -1 ? "/api" : "https://hindi-devo.ptlp.co/api";
        const contents = [];
        chapters.forEach((eachChapter, index) => {
            const chapterNo = index + 1;
            const eachContentObject = {
                chapterNo,
                chapterTitle: null,
                content: `<img alt='story' src='${API_PREFIX}/pratilipi/content/image?pratilipiId=${data.pratilipiId}&name=${chapterNo}'/>`
            }
            state.content.data.push(eachContentObject);
        });
        state.content.loading_state = 'LOADING_SUCCESS';
        console.log(state.content.data);
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
    setPratilipiReviewRatingUpdateSuccess(state, value){
        state.userPratilipi.data.review = value.review;
        state.userPratilipi.data.rating = value.rating;
        state.userPratilipi.data.reviewDateMillis = Date.now();
    },
    setPratilipiReviewRating(state, value){
        state.userPratilipi.data.review = value.review;
        state.userPratilipi.data.rating = value.rating;
    },
    setPratilipiReviewUpdateError(state){

    }
}
