import DataAccessor from '@/utils/DataAccessor'

export default {

    fetchInitialDraftedContents({ commit, state }, { authorId, resultCount }) {
        commit('setDraftedContentsLoadingTrue');
        DataAccessor.getPratilipiListByAuthor(authorId, 'DRAFTED', null, null, resultCount, (data) => {
            if (data.status === 200) {
                commit('setDraftedContentsLoadingSuccess', data.response);
            } else {
                commit('setDraftedContentsLoadingError');
            }
        })
    },

    fetchMoreDraftedContents({ commit, state }, { authorId, resultCount }) {
        commit('setDraftedContentsDynamicLoadingTrue');
        DataAccessor.getPratilipiListByAuthor(authorId, 'DRAFTED', state.drafts.cursor, null, resultCount, (data) => {
            if (data.status === 200) {
                commit('setDraftedContentsDynamicLoadingSuccess', data.response);
            } else {
                commit('setDraftedContentsDynamicLoadingError');
            }
        });
    },

    createPratilipiAndGoToWriter({ commit, state }, { title, titleEn, language, type }) {
        console.log(titleEn)
        DataAccessor.createOrUpdatePratilipi({
            title,
            titleEn,
            language,
            type,
            state: 'DRAFTED'
        }, (data) => {
            console.log("MY DATA IS: ", data);
            window.location = data.writePageUrl;
        }, (error) => {
            console.log(error);
        })
    }
}
