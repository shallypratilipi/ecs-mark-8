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
    getDraftedEventPratilipi: state => state.event.drafts,
    getSubmittedEventPratilipi: state => state.event.submissions,
    getEventPratilipiImageUploadLoadingState: state => state.pratilipi_image_upload_state,
    getEventEntrySubmitState: state => state.eventEntrySubmissionState,
    getContentUpdatingState: state => state.eventContentUpdatingState,
    getEventEntryCreationState: state => state.eventEntryCreatingState,
    getEventPratilipiEntryId: state => state.eventPratilipiEntryId,

}
