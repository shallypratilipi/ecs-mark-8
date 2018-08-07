export default {
    // pushProductToCart(state, { id }) {
    //     state.added.push({
    //         id,
    //         quantity: 1
    //     })
    // },

    // incrementItemQuantity(state, { id }) {
    //     const cartItem = state.added.find(item => item.id === id)
    //     cartItem.quantity++
    // },

    // setCartItems(state, { items }) {
    //     state.added = items
    // },

    // setCheckoutStatus(state, status) {
    //     state.checkoutStatus = status
    // }

    setEventDataFromCache(state, eventData) {
        state.event.loading_state = 'LOADING_SUCCESS';
        state.event.data = eventData;
    },

    setEventDataLoadingTrue(state) {
        state.event.loading_state = 'LOADING';
        state.event.data = {};
    },

    setEventDataLoadingSuccess(state, eventData) {
        state.event.loading_state = 'LOADING_SUCCESS';
        state.event.data = eventData.event;
        if (eventData.entries.yourDrafted && eventData.entries.yourDrafted.length > 0) {
            state.event.drafts = eventData.entries.yourDrafted;
        }

        if (eventData.entries.yourSubmitted && eventData.entries.yourSubmitted.length > 0) {
            state.event.submissions = eventData.entries.yourSubmitted;
        }

        if (eventData.entries.allSubmitted && eventData.entries.allSubmitted.length > 0){
            state.event.participations = eventData.entries.allSubmitted;
        }

    },
    resetDraftList(state) {
        state.event.drafts.splice(index, 1);
    },

    setEventDataLoadingError(state) {
        state.event.loading_state = 'LOADING_ERROR';
        state.event.data = {};
    },

    setInitialEventPratilipiLoadingTrue(state) {
        state.pratilipiList.loading_state = 'LOADING';
        state.pratilipiList.data = [];
    },

    setInitialEventPratilipiLoadingSuccess(state, data) {
        state.pratilipiList.loading_state = 'LOADING_SUCCESS';
        state.pratilipiList.data = data.pratilipiList;
        state.pratilipiList.cursor = data.cursor;
    },

    setInitialEventPratilipiLoadingError(state) {
        state.pratilipiList.loading_state = 'LOADING_ERROR';
        state.pratilipiList.data = [];
    },

    setDynamicEventPratilipiLoadingTrue(state) {
        state.pratilipiList.loading_state = 'LOADING';
    },

    setDynamicEventPratilipiLoadingSuccess(state, data) {
        state.pratilipiList.loading_state = 'LOADING_SUCCESS';

        if (!data.pratilipiList || data.pratilipiList.length === 0) {
            state.pratilipiList.cursor = null;
        } else {
            state.pratilipiList.loading_state = "LOADING_SUCCESS";
            state.pratilipiList.data = state.pratilipiList.data.concat(data.pratilipiList);
            state.pratilipiList.cursor = data.cursor;
        }
    },

    setDynamicEventPratilipiLoadingError(state) {
        state.loading_state = 'LOADING_ERROR';
    },

    addPratilipiToLibrarySuccess(state, data) {
        const pratilipiAddedToLib = state.pratilipiList.data.find(eachPratilipi => eachPratilipi.pratilipiId === data.referenceId);
        if (pratilipiAddedToLib) {
            pratilipiAddedToLib.addedToLib = true
        }
    },

    addPratilipiToLibraryError(state) {

    },

    removePratilipiFromLibrarySuccess(state, data) {
        const pratilipiAddedToLib = state.pratilipiList.data.find(eachPratilipi => eachPratilipi.pratilipiId === data.referenceId);
        if (pratilipiAddedToLib) {
            pratilipiAddedToLib.addedToLib = false
        }
    },

    removePratilipiFromLibraryError(state) {

    },

    setUserEventPratilipiDataLoadingTrue(state) {
        state.userEventPratilipis.loading_state = 'LOADING';
    },
    setUserEventPratilipiDataLoadingSuccess(state, eventPratilipis) {
        state.userEventPratilipis.loading_state = 'LOADING_SUCCESS';
        state.userEventPratilipis.data = eventPratilipis;
    },
    setUserEventPratilipiDataLoadingError(state) {
        state.userEventPratilipis.loading_state = 'LOADING_ERROR';
    },

    setCancelEventPratilipiParticipationLoadingTrue(state) {
        state.cancelEventPratilipiParticipationSate = 'LOADING'
    },

    setCancelEventPratilipiParticipationLoadingSuccess(state, data) {
        state.cancelEventPratilipiParticipationSate = 'LOADING_SUCCESS';
        state.event.submissions.forEach((pratilipi, index) => {
           if(data.eventEntryId == pratilipi.eventEntryId){
               console.log(JSON.stringify(pratilipi), index);
               state.event.submissions.splice(index, 1);
               state.event.drafts.push(pratilipi);
           }
        });
    },


    setCancelEventPratilipiParticipationLoadingError(state) {
        state.cancelEventPratilipiParticipationSate = 'LOADING_ERROR'
    },

    setEventPratilipiSubmissionLoadingTrue(state) {
        state.eventPratilipiSubmissionSate = 'LOADING'
    },

    setEventPratilipiSubmissionLoadingSuccess(state, data) {
        state.eventPratilipiSubmissionSate = 'LOADING_SUCCESS';
        state.event.drafts.forEach((pratilipi, index) => {
            if(data.eventEntryId == pratilipi.eventEntryId){
                console.log(JSON.stringify(pratilipi), index);
                state.event.drafts.splice(index, 1);
                state.event.submissions.push(pratilipi);
            }
        });
    },


    setEventPratilipiSubmissionLoadingError(state) {
        state.eventPratilipiSubmissionSate = 'LOADING_ERROR'
    },

    setEventPratilipiPublishLoadingTrue(state) {
        state.eventPratilipiPublishSate = 'LOADING'
    },

    setEventPratilipiPublishLoadingSuccess(state, data) {
        state.eventPratilipiPublishSate = 'LOADING_SUCCESS';
    },


    setEventPratilipiPublishLoadingError(state) {
        state.eventPratilipiPublishSate = 'LOADING_ERROR'
    },

    setEventPratilipiDeletionLoadingTrue(state) {
        state.eventPratilipiDeletionSate = 'LOADING'
    },

    setEventPratilipiDeletionLoadingSuccess(state, data) {
        state.eventPratilipiDeletionSate = 'LOADING_SUCCESS';
        state.event.drafts.forEach((pratilipi, index) => {
            if(data.eventEntryId == pratilipi.eventEntryId){
                console.log(JSON.stringify(pratilipi), index);
                state.event.drafts.splice(index, 1);
            }
        });

        state.event.submissions.forEach((pratilipi, index) => {
            if(data.eventEntryId == pratilipi.eventEntryId){
                console.log(JSON.stringify(pratilipi), index);
                state.event.submissions.splice(index, 1);
            }
        });
    },


    setEventPratilipiDeletionLoadingError(state) {
        state.eventPratilipiDeletionSate = 'LOADING_ERROR'
    }
}
