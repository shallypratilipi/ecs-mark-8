export default {
    setEventPratilipiDataLoadingTrue(state) {
    	state.eventPratilipi.loading_state = 'LOADING';
        state.eventPratilipi.data = [];
    },

    setEventPratilipiDataLoadingSuccess(state, data) {
        state.eventPratilipi.data = data;
        state.eventPratilipi.loading_state = 'LOADING_SUCCESS';
    },

    setEventPratilipiDataLoadingError(state) {
    	state.eventPratilipi.loading_state = 'LOADING_ERROR';
    },

    setEventPratilipiPublishLoading(state, id) {
        const eventPratilipi = state.eventPratilipi.data.find(eachEventPratilipi => eachEventPratilipi._id === id);
        eventPratilipi.state = 'SUBMITTING';
    },

    setEventPratilipiPublishSuccess(state, data) {

        const eventPratilipi = state.eventPratilipi.data.find(eachEventPratilipi => eachEventPratilipi._id === data._id);
        eventPratilipi.pratilipiSlug = data.pratilipiSlug;
        eventPratilipi.state = data.state;
    },
    setEventPratilipiPublishError(state) {

    },

    setEventPratilipiCountLoadingTrue(state) {

    },
    setEventPratilipiCountLoadingSuccess(state, count) {
        state.eventPratilipi.count = count;
    },
    setEventPratilipiCountLoadingError(state) {

    },

    setAuthorDataTrue(state) {
        state.author.loading_state = 'LOADING';
    },
    setAuthorDataSuccess(state, data) {
        state.author.data = data;
        state.author.loading_state = 'LOADING_SUCCESS';
    },
    setAuthorDataError(state) {
        state.author.loading_state = 'LOADING_ERROR';
    },
    setEventsDataLoadingTrue(state) {
        state.events.loading_state = 'LOADING';
    },

    setEventsDataLoadingSuccess(state, data) {
        state.events.loading_state = 'LOADING_SUCCESS';
        state.events.data = data.eventList;
    },

    setEventsDataLoadingError(state) {
        state.events.loading_state = 'LOADING_ERROR';
        state.events.data = [];
    },

    setSingleEventPratilipiDataLoadingTrue(state) {
        state.singleEventPratilipi.loading_state = 'LOADING';
        state.singleEventPratilipi.data = {};
    },

    setSingleEventPratilipiDataLoadingSuccess(state, data) {
        state.singleEventPratilipi.data = data;
        state.singleEventPratilipi.loading_state = 'LOADING_SUCCESS';
    },

    setSingleEventPratilipiDataLoadingError(state) {
        state.singleEventPratilipi.loading_state = 'LOADING_ERROR';
    },

    setEventPratilipiUpdateSuccess(state, data) {

        const eventPratilipi = state.eventPratilipi.data.find(eachEventPratilipi => eachEventPratilipi._id === data._id);
        eventPratilipi.adminViewed = data.adminViewed;
        eventPratilipi.adminReviewed = data.adminReviewed;
        eventPratilipi.adminDeleted = data.adminDeleted;
    },
    setEventPratilipiUpdateError(state) {

    }
}
