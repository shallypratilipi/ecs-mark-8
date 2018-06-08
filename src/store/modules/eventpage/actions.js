import DataAccessor from '@/utils/DataAccessor'

export default {

    cacheEventData({ commit, state }, eventData) {
        commit('setEventDataFromCache', eventData);
    },
    
    fetchEventDetails({ commit, state }, eventSlug) {
        console.log(eventSlug);
        commit('setEventDataLoadingTrue');
        DataAccessor.getEventBySlug(eventSlug, (eventData) => {
            if (eventData) {
                commit('setEventDataLoadingSuccess', eventData);
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
}
