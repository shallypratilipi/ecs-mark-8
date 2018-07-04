export default {
    getEventPratilipisLoadingStatus: state => state.eventPratilipi.loading_state,
    getEventPratilipis: state => state.eventPratilipi.data,
    getEventPratilipiCount: state => state.eventPratilipi.count,
    getAuthorDataLoadingState: state => state.author.loading_state,
    getAuthorData: state => state.author.data,
    getEventsLoadingState: state => state.events.loading_state,
    getEventsData: state => state.events.data,
    getSingleEventPratilipiLoadingStatus: state => state.singleEventPratilipi.loading_state,
    getSingleEventPratilipi: state => state.singleEventPratilipi.data,
}
