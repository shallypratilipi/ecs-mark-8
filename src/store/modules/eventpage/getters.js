export default {

    getEventDataLoadingState: state => state.event.loading_state,
    getEventData: state => state.event.data,

    getDraftData: state => state.event.drafts,
    getSubmissionData: state => state.event.submissions,

    getEventPratilipis: state => state.pratilipiList.data,
    getEventPratilipisFound: state => state.pratilipiList.found,
    getEventPratilipisOffset: state => state.pratilipiList.offset,

    getUserEventDataLoadingState: state => state.userEventPratilipis.loading_state,
    getPratilipiPublishingState: state => state.eventPratilipiPublishSate,
}
