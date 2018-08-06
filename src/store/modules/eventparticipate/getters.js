export default {

    getEventPratilipiCreateOrUpdateStateSuccess: state => state.eventPratilipiCreateOrUpdateState,
    getEventPratilipiLoadingState: state => state.eventPratilipiLoadingState,
    getEventPratilipiData: state => state.eventPratilipi,
    getEventPratilipiCoverImage: state => state.eventPratilipi.coverImage,
    getEventChapterCreatingState: state => state.eventChapterCreatingState,
    getEventChapterDeletingState: state => state.eventChapterDeletingState,
    getContentLoadingState: state => state.contentLoadingState,
    getContentIndexLoadingState: state => state.contentIndexLoadingState,
    getEventPratilipDescUpdateState: state => state.eventPratilipDescUpdateState,
    getContents: state => state.contents,
    getEventData: state => state.event.data,
    getEventLoadingState: state => state.eventDataLoadingState,
    getDraftedEventPratilipiLoadingState: state => state.draftedEventPratilipis.loading_state,
    getDraftedEventPratilipi: state => state.draftedEventPratilipis.data,
    getEventPratilipiImageUploadLoadingState: state => state.pratilipi_image_upload_state,
    getPratilipiOfEvent: state => state.eventForPratilipi.data,
    getPratilipiOfEventLoadingState: state => state.eventForPratilipi.loading_state,
    getEventEntrySubmitState: state => state.eventEntrySubmissionState,
    getContentUpdatingState: state => state.eventContentUpdatingState,

}
