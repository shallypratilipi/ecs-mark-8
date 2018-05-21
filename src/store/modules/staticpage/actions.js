import DataAccessor from '@/utils/DataAccessor'

export default {
    fetchStaticPageContent({ commit, state }, { pageName, language }) {
        commit('setStaticPageDataLoadingTrue');
        DataAccessor.getPageContent(pageName, language, function(data) {
            if (data.status === 200) {
                commit('setStaticPageDataLoadingSuccess', data.response);
            } else {
                commit('setStaticPageDataLoadingError');    
            }
        });
    }
}
