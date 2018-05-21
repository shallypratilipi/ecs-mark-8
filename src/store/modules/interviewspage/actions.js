import DataAccessor from '@/utils/DataAccessor'

export default {

    fetchInitialListOfInterviews({ commit, state }, { language, resultCount }) {
        commit('setInitialInterviewsDataLoadingTrue');
        console.log(language);
        DataAccessor.getAuthorInterviewListByUri(language, null, null, resultCount, function(response) {
            if (response) {
                console.log(response);
                commit('setInitialInterviewsDataLoadingSuccess', response);
            } else {
                commit('setInitialInterviewsDataLoadingError');
            }
        });
    },

    fetchMoreInterviews({ commit, state }, { language, resultCount }) {
        commit('setMoreInterviewsDataLoadingTrue');
        console.log(language);
        DataAccessor.getBlogPostListByUri(language, null, state.cursor, resultCount, function(response) {
            if (response) {
                commit('setMoreInterviewsDataLoadingSuccess', response);
            } else {
                commit('setMoreInterviewsDataLoadingError');
            }
        });  
    }
}
