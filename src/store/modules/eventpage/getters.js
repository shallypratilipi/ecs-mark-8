export default {

    getEventDataLoadingState: state => state.event.loading_state,
    getEventData: state => state.event.data,

    getDraftData: state => state.event.drafts,
    getSubmissionData: state => state.event.submissions,

    getEventPratilipis: state => state.pratilipiList.data,
    getEventPratilipisCursor: state => state.pratilipiList.cursor,
    getEventPratilipisLoadingState: state => state.pratilipiList.loading_state,

    getUserEventDataLoadingState: state => state.userEventPratilipis.loading_state,
}
