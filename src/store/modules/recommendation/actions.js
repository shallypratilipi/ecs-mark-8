import DataAccessor from '@/utils/DataAccessor'

export default {
    
    addToLibrary({ commit, state }, pratilipiId) {
        DataAccessor.addOrRemoveFromLibrary(pratilipiId, true, (response) => {
            commit('alert/triggerAlertView', '__("added_to_library")', { root: true });
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
            commit('alert/triggerAlertView', '__("removed_from_library")', { root: true });
            setTimeout(() => {
                commit('alert/triggerAlertHide', null, { root: true });
            }, 3000);
            commit('removePratilipiFromLibrarySuccess', response);
        }, (error) => {
            commit('removePratilipiFromLibraryError');
        })
    },

    fetchRecommendation({ commit, state }, { contextId, context, resultCount }) {
        commit('setRecommendationLoadingTrue');
        DataAccessor.getPratilipiRecommendation(contextId, context, resultCount, (data) => {
            if (data.status === 200) {
                commit('setRecommendation', data.response);
            } else {
                commit('setRecommendationLoadingError');
            }
        })
    }
}
