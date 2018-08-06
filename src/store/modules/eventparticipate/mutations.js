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
        state.eventPratilipi = data;
        state.eventPratilipiCreateOrUpdateState = 'LOADING_SUCCESS';
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
    	state.contents.content = data.content;
    	state.contentLoadingState = 'LOADING_SUCCESS';
    },

    setContentLoadingTrue(state) {
        state.contentLoadingState = 'LOADING';
    },

    setContentLoadingError(state) {
        state.contentLoadingState = 'LOADING_ERROR';
    },

    setContentIndexLoadingSuccess(state, data) {
        state.contents.index = data.index;
        state.contentIndexLoadingState = 'LOADING_SUCCESS';
    },

    setContentIndexLoadingTrue(state) {
        state.contentIndexLoadingState = 'LOADING';
    },

    setContentIndexLoadingError(state) {
        state.contentIndexLoadingState = 'LOADING_ERROR';
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
    setEventDataLoadingSuccess(state, eventData) {
        state.event.data = eventData.event;
        if (eventData.entries.yourDrafted && eventData.entries.yourDrafted.length > 0) {
            state.event.drafts = eventData.entries.yourDrafted;
        }

        if (eventData.entries.yourDrafted && eventData.entries.yourSubmitted.length > 0) {
            state.event.submissions = eventData.entries.yourSubmitted;
        }

        if (eventData.entries.allSubmitted && eventData.entries.allSubmitted.length > 0){
            state.event.participations = eventData.entries.allSubmitted;
        }

        state.event.loading_state = 'LOADING_SUCCESS';
        state.eventDataLoadingState = 'LOADING_SUCCESS';
    },
    setEventDataLoadingError(state) {
        state.eventDataLoadingState = 'LOADING_ERROR';
    },

    setPratilipiImageUploadingTrue(state) {
        state.pratilipi_image_upload_state = 'LOADING';
    },
    setPratilipiImageUploadingSuccess(state, data) {
        state.eventPratilipi.coverImage = data.coverImageUrl;
        state.pratilipi_image_upload_state = 'LOADING_SUCCESS';
        console.log("image url ", state.eventPratilipi.coverImage);
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
    setPratilipiCreatedSuccess(state, data) {
        state.eventForPratilipi.loading_state = 'LOADING_SUCCESS';
        state.eventForPratilipi.data = data;

        console.log("FROM MUTATION : ", state.eventForPratilipi.data);
    },
    resetEntryState(state) {
        state.eventForPratilipi.loading_state = 'LOADING';
    },

    setEventEntryCreatingTrue(state) {
        state.eventEntryCreatingState = 'LOADING';
    },

    setEventEntryCreatingSuccess(state, data) {
        state.eventPratilipiEntryId = data.eventEntryId;
        state.eventEntryCreatingState = 'LOADING_SUCCESS';
    },

    setEventEntryCreatingError(state) {
        state.eventEntryCreatingState = 'LOADING_ERROR';
    },

    setChapterCreatingTrue(state) {
        state.eventChapterCreatingState = 'LOADING';
    },

    setChapterCreatingSuccess(state, data) {
        state.eventChapterCreatingState = 'LOADING_SUCCESS';
        state.contents.index = data.index;
    },

    setChapterCreatingError(state) {
        state.eventChapterCreatingState = 'LOADING_ERROR';
    },

    setChapterDeletingTrue(state) {
        state.eventChapterDeletingState = 'LOADING';
    },

    setChapterDeletingSuccess(state, data) {
        state.eventChapterDeletingState = 'LOADING_SUCCESS';
        state.contents.index = data.index;
    },

    setChapterDeletingError(state) {
        state.eventChapterDeletingState = 'LOADING_ERROR';
    },

    setEntrySubmissionTrue(state) {
        state.eventEntrySubmissionState = 'LOADING';
    },

    setEntrySubmissionSuccess(state, data) {
        state.eventEntrySubmissionState = 'LOADING_SUCCESS';
    },

    setEntrySubmissionError(state) {
        state.eventEntrySubmissionState = 'LOADING_ERROR';
    },

    setContentUpdatingTrue(state) {
        state.eventContentUpdatingState = 'LOADING';
    },

    setContentUpdatingSuccess(state, data) {
        state.contents.index[data.chapterNo-1]['title'] = data.chapterTitle;
        state.eventContentUpdatingState = 'LOADING_SUCCESS';
    },

    setContentUpdatingError(state) {
        state.eventContentUpdatingState = 'LOADING_ERROR';
    }

}
