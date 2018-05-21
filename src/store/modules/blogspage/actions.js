import DataAccessor from '@/utils/DataAccessor'

export default {

    fetchInitialListOfBlogs({ commit, state }, { language, resultCount }) {
        commit('setInitialBlogsDataLoadingTrue');
        console.log(language);
        DataAccessor.getBlogPostListByUri(language, null, null, resultCount, function(response) {
            if (response) {
                console.log(response);
                commit('setInitialBlogsDataLoadingSuccess', response);
            } else {
                commit('setInitialBlogsDataLoadingError');
            }
        });
    },

    fetchMoreBlogs({ commit, state }, { language, resultCount }) {
        commit('setMoreBlogsDataLoadingTrue');
        console.log(language);
        DataAccessor.getBlogPostListByUri(language, null, state.cursor, resultCount, function(response) {
            if (response) {
                commit('setMoreBlogsDataLoadingSuccess', response);
            } else {
                commit('setMoreBlogsDataLoadingError');
            }
        });  
    }
}
