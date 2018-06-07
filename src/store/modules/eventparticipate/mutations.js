export default {
    setEventPratilipiDataLoadingTrue(state) {
    	state.eventPratilipiLoadingState = 'LOADING';
    },

    setEventPratilipiDataLoadingSuccess(state, data) {
        state.eventPratilipi = data;
        state.eventPratilipiLoadingState = 'LOADING_SUCCESS';
    },

    setEventPratilipiDataLoadingError(state) {
    	state.eventPratilipiLoadingState = 'LOADING_ERROR';
    },

    setEventPratilipiCreateOrUpdateStateTrue(state) {
        state.eventPratilipiCreateOrUpdateState = 'LOADING';
    },
    setEventPratilipiCreateOrUpdateStateSuccess(state, data) {
        state.eventPratilipiCreateOrUpdateState = 'LOADING_SUCCESS';
        state.eventPratilipi = data;
    },
    setEventPratilipiCreateOrUpdateStateError(state) {
        state.eventPratilipiCreateOrUpdateState = 'LOADING_ERROR';
    },

    setContentCreateOrUpdateStateTrue(state) {
    	state.contentCreateOrUpdateState = 'LOADING';
    },

    setContentCreateOrUpdateStateSuccess(state, data) {
    	state.contents = data;
    	state.contentCreateOrUpdateState = 'LOADING_SUCCESS';
    },

    setContentLoadingSuccess(state, data) {
    	state.contents = data;
    	state.contentLoadingState = 'LOADING_SUCCESS';
        console.log('Im working');
    },

    setContentLoadingTrue(state) {
        state.contentLoadingState = 'LOADING';
    },

    setEventPratilipiDescUpdateStateTrue(state) {
        state.eventPratilipDescUpdateState = 'LOADING';
    },
    setEventPratilipiDescUpdateStateSuccess(state, data) {
        state.eventPratilipi = data;
        state.eventPratilipDescUpdateState = 'LOADING_SUCCESS';
    },
    setEventPratilipiDescUpdateStateError(state) {
        state.eventPratilipDescUpdateState = 'LOADING_ERROR';
    },

    setEventDataLoadingTrue(state) {
        state.eventDataLoadingState = 'LOADING';
    },
    setEventDataLoadingSuccess(state, data) {
        state.event = data;
        state.eventDataLoadingState = 'LOADING_SUCCESS';
    },
    setEventDataLoadingError(state) {
        state.eventDataLoadingState = 'LOADING_ERROR';
    },

    setPratilipiImageUploadingTrue(state) {
        state.pratilipi_image_upload_state = 'LOADING';
    },
    setPratilipiImageUploadingSuccess(state, data) {
        state.pratilipi_image_upload_state = 'LOADING_SUCCESS';
        state.eventPratilipi.coverImage = data.url;
    },
    setPratilipiImageUploadingError(state) {
        state.pratilipi_image_upload_state = 'LOADING_ERROR';
    },

    setUserEventPratilipiDraftedDataLoadingTrue(state) {
        state.draftedEventPratilipis.loading_state = 'LOADING';
    },
    setUserEventPratilipiDraftedDataLoadingSuccess(state, data) {
        state.draftedEventPratilipis.loading_state = 'LOADING_SUCCESS';
        state.draftedEventPratilipis.data = data;
    },
    setUserEventPratilipiDraftedDataLoadingError(state) {
        state.draftedEventPratilipis.loading_state = 'LOADING_ERROR';
    },
}
