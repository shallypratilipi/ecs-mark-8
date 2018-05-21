export default {
    setRecommendationLoadingTrue(state) {
        state.loading_state = 'LOADING';
    },

    setRecommendation(state, sectionData) {
        console.log(state);
        state.loading_state = 'LOADING_SUCCESS';
        state.data = sectionData.pratilipiList;
        state.title = sectionData.title;
    },

    setRecommendationLoadingError(state) {
        state.loading_state = 'LOADING_ERROR';
        state.data = [];
        state.title = '';
    },

    addPratilipiToLibrarySuccess(state, data) {
        const pratilipiAddedToLib = state.data.find(eachPratilipi => eachPratilipi.pratilipiId === data.referenceId);
        if (pratilipiAddedToLib) {
            pratilipiAddedToLib.addedToLib = true
        }
    },

    addPratilipiToLibraryError(state) {

    },

    removePratilipiFromLibrarySuccess(state, data) {
        const pratilipiAddedToLib = state.data.find(eachPratilipi => eachPratilipi.pratilipiId === data.referenceId);
        if (pratilipiAddedToLib) {
            pratilipiAddedToLib.addedToLib = false
        }
    },

    removePratilipiFromLibraryError(state) {

    }
}
