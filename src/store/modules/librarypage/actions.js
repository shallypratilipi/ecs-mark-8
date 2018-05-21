import DataAccessor from '@/utils/DataAccessor'

export default {

    fetchInitialLibraryPagePratilipis({ commit, state }, resultCount) {
        commit('setLibraryPageInitialDataLoadingTrue');
        DataAccessor.getUserLibraryList(null, resultCount, function(data) {
            if (data.status === 200) {
                commit('setLibraryPageInitialDataLoadingSuccess', data.response);
            } else {
                commit('setLibraryPageInitialDataLoadingError');
            }
        });
    },

    fetchMorePratilipisForLibraryPage({ commit, state }, resultCount) {
        commit('setLibraryPageDynamicLoadingTrue');
        DataAccessor.getUserLibraryList(state.cursor, resultCount, function(data) {
            if (data.status === 200) {
                commit('setLibraryPageDynamicLoadingSuccess', data.response);
            } else {
                commit('setLibraryPageDynamicLoadingError');
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
}
