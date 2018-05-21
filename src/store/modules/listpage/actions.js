import DataAccessor from '@/utils/DataAccessor'

export default {

    fetchInitialListPagePratilipis({ commit, state }, { listName, language, resultCount }) {
        commit('setListPageInitialDataLoadingTrue');
        DataAccessor.getPratilipiListByListName(listName, null, null, resultCount, language, function(data) {
            if (data.status === 200) {
                commit('setListPageInitialDataLoadingSuccess', data.response);
            } else {
                commit('setListPageInitialDataLoadingError');
            }
        });
    },

    fetchMorePratilipisForListPage({ commit, state }, { listName, language, resultCount }) {
        commit('setListPageDynamicLoadingTrue');
        DataAccessor.getPratilipiListByListName(listName, state.cursor, null, resultCount, language, function(data) {
            if (data.status === 200) {
                commit('setListPageDynamicLoadingSuccess', data.response);
            } else {
                commit('setListPageDynamicLoadingError');
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
