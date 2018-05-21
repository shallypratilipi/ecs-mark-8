import DataAccessor from '@/utils/DataAccessor'

export default {

    fetchBlogData({ commit, state }, pageUri) {
        commit('setBlogDataLoadingTrue');
        DataAccessor.getBlogPostByUri(pageUri, function(response) {
            if (response) {
                console.log(response);
                commit('setBlogDataLoadingSuccess', response);
            } else {
                commit('setBlogDataLoadingError');
            }
        });
    }
}
