import DataAccessor from '@/utils/DataAccessor'

export default {

    fetchListOfEvents({ commit, state }, language) {
        commit('setEventsDataLoadingTrue');
        console.log(language);
        DataAccessor.getEventList(language, function(data) {
            if (data.status === 200) {
                commit('setEventsDataLoadingSuccess', data.response);
                console.log("Fetching" , data);
            } else {
                commit('setEventsDataLoadingError');
            }
        });
    }
}
