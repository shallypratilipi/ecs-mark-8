export default {
    setEventPratilipiPublishLoadingTrue(state) {
        state.eventPratilipiPublishSate = 'LOADING'
    },

    setEventPratilipiPublishLoadingSuccess(state, data) {
        state.eventPratilipiPublishSate = 'LOADING_SUCCESS';
        state.pratilipiPublishingId = data.pratilipiId;
    },


    setEventPratilipiPublishLoadingError(state) {
        state.eventPratilipiPublishSate = 'LOADING_ERROR'
    },
}
