import DataAccessor from '@/utils/DataAccessor'

export default {

    fetchInterviewData({ commit, state }, pageUri) {
        commit('setInterviewDataLoadingTrue');
        DataAccessor.getAuthorInterviewByUri(pageUri, function(response) {
            if (response) {
                console.log(response);
                commit('setInterviewDataLoadingSuccess', response);
            } else {
                commit('setInterviewDataLoadingError');
            }
        });
    }
}
