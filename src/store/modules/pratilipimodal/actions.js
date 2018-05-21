import DataAccessor from '@/utils/DataAccessor'

export default {

    setPratilipiModalData({ commit, state }, pratilipiData) {
        commit('setPratilipiModalDataLoadingSuccess', pratilipiData);
    },

    fetchPratilipiData({ commit, state }, pratilipiId) {
        DataAccessor.getPratilipiById(pratilipiId, true, function(pratilipiData, userPratilipiData) {
            if (pratilipiData) {
                commit('setPratilipiModalDataLoadingSuccess', pratilipiData);
            } else {
                commit('setPratilipiModalDataLoadingError');    
            }
            if (userPratilipiData) {
                commit('setPratilipiUserDataLoadingSuccess', userPratilipiData);
            } else {
                commit('setPratilipiUserDataLoadingError');    
            }
        });
    },

    addToLibrary({ commit, state }) {
        commit('alert/triggerAlertView', '__("added_to_library")', { root: true });
        setTimeout(() => {
            commit('alert/triggerAlertHide', null, { root: true });
        }, 3000);
        DataAccessor.addOrRemoveFromLibrary(state.pratilipi.data.pratilipiId, true, (response) => {
            commit('homepage/addPratilipiToLibrarySuccess', response, { root: true });
            commit('addPratilipiToLibrarySuccess', response);
        }, (error) => {
            commit('addPratilipiToLibraryError');
        })
    },

    removeFromLibrary({ commit, state }) {
        commit('alert/triggerAlertView', '__("removed_from_library")', { root: true });
        setTimeout(() => {
            commit('alert/triggerAlertHide', null, { root: true });
        }, 3000);
        DataAccessor.addOrRemoveFromLibrary(state.pratilipi.data.pratilipiId, false, (response) => {
            commit('homepage/removePratilipiFromLibrarySuccess', response, { root: true });
            commit('removePratilipiFromLibrarySuccess', response);
        }, (error) => {
            commit('removePratilipiFromLibraryError');
        })
    }

}
