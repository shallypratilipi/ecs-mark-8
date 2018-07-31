import DataAccessor from '@/utils/DataAccessor'

export default {

    cacheEventData({ commit, state }, eventData) {
        commit('setEventDataFromCache', eventData);
    },

    fetchEventDetails({commit, state}, eventId) {
        console.log(eventId);
        commit('setEventDataLoadingTrue');
        DataAccessor.getEventDetailById(eventId, (eventData) => {
            if (eventData) {
                console.log("DANG", eventData.response);
                commit('setEventDataLoadingSuccess', eventData.response);
            } else {
                commit('setEventDataLoadingError');
            }
        });
    },

    fetchInitialEventPratilipis({ commit, state }, { eventId, resultCount }) {
        commit('setInitialEventPratilipiLoadingTrue');
        DataAccessor.getPratilipiListByEventId(eventId, null, null, resultCount, (data) => {
            if (data.status === 200) {
                commit('setInitialEventPratilipiLoadingSuccess', data.response);
            } else {
                commit('setInitialEventPratilipiLoadingError');
            }
        });
    },


    fetchMorePratilipisForEvent({ commit, state }, {  eventId, resultCount }) {
        commit('setDynamicEventPratilipiLoadingTrue');
        DataAccessor.getPratilipiListByEventId(eventId, state.pratilipiList.cursor, null, resultCount, (data) => {
            if (data.status === 200) {
                commit('setDynamicEventPratilipiLoadingSuccess', data.response);
            } else {
                commit('setDynamicEventPratilipiLoadingError');
            }
        });
    },

    addToLibrary({ commit, state }, pratilipiId) {
        DataAccessor.addOrRemoveFromLibrary(pratilipiId, true, (response) => {
            commit('alert/triggerAlertView', '__('added_to_library')', { root: true });
            setTimeout(() => {
                commit('alert/triggerAlertHide', null, { root: true });
            }, 3000);
            commit('addPratilipiToLibrarySuccess', response);
        }, (error) => {
            commit('addPratilipiToLibraryError');
        })
    },

    removeFromLibrary({ commit, state }, pratilipiId) {
        DataAccessor.addOrRemoveFromLibrary(pratilipiId, false, (response) => {
            commit('alert/triggerAlertView', '__('removed_from_library')', { root: true });
            setTimeout(() => {
                commit('alert/triggerAlertHide', null, { root: true });
            }, 3000);
            commit('removePratilipiFromLibrarySuccess', response);
        }, (error) => {
            commit('removePratilipiFromLibraryError');
        })
    },

    fetchEventPratilipis({ commit, state }, eventId) {
        commit('setUserEventPratilipiDataLoadingTrue');
        DataAccessor.getEventPratilipiList(eventId, (eventPratilipiData) => {
            if (eventPratilipiData.status === 200) {
                commit('setUserEventPratilipiDataLoadingSuccess', eventPratilipiData.response.pratilipis);
            } else {
                commit('setUserEventPratilipiDataLoadingError');
            }
        });
    },

    deleteEntryFromEvent({commit, state}, {eventId, eventEntryId}) {
        console.log("Delete:" + eventId + "  " + eventEntryId);
        DataAccessor.deleteEntryOfEvent(eventId, eventEntryId, (data) => {
            console.log("About to commit" + data.status);

            if (data.status === 200) {
                console.log("About to commit");
                commit('resetDraftList');
                // commit('setInitialEventPratilipiLoadingSuccess', data.response);
            } else {
                // commit('setInitialEventPratilipiLoadingError');
            }
        });


    },

    moveEntryToDrafts({commit, state}, {eventId, eventEntryId}) {
        console.log("Move to drafts: " + eventId + "  " + eventEntryId);
    },

    publishEntryForEvent({commit, state}, {eventId, eventEntryId}) {

        console.log("Publish : " + eventId + "  " + eventEntryId);

        DataAccessor.publishEntryOfEvent(eventId, eventEntryId, (data) => {
            if (data.status === 200) {
                // commit('setInitialEventPratilipiLoadingSuccess', data.response);
            } else {
                // commit('setInitialEventPratilipiLoadingError');
            }
        });
    },


}
