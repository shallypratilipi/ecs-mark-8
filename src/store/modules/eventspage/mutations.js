export default {

    setEventsDataLoadingTrue(state) {
        state.events.loading_state = 'LOADING';
    },

    setEventsDataLoadingSuccess(state, data) {
        state.events.loading_state = 'LOADING_SUCCESS';
        state.events.data = state.events.data.concat(data.eventList);

        state.events.found = data.found;
        state.events.offset = data.offset;
    },

    setEventsDataLoadingError(state) {
        state.events.loading_state = 'LOADING_ERROR';
    },

    refreshState(state){
       state.events.data = [];
       state.events.offset = 0;
       state.events.found = 0;
       state.events.loading_state = 'LOADING';
    }
}

