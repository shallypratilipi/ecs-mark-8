import DataAccessor from '@/utils/DataAccessor'

export default {

    fetchListOfEvents({ commit, state }, {language, limit, offset}) {
        commit('setEventsDataLoadingTrue');
        DataAccessor.getEventList(language, limit, offset, function(data) {
            if (data.status === 200) {
                commit('setEventsDataLoadingSuccess', data.response);
            } else {
                commit('setEventsDataLoadingError');
            }
        });
    },
    refreshState({ commit, state }){
        commit('refreshState');
    }
}
