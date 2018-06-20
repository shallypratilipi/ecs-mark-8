import DataAccessor from '@/utils/DataAccessor'

export default {
    fetchAuthorDetails({ commit, state }, authorId) {
        commit('setAuthorDataLoadingTrue');
        DataAccessor.getAuthorById(authorId, function(authorData) {
            if (authorData) {
                commit('setAuthorDataLoadingSuccess', authorData);
            } else {
                commit('setAuthorDataLoadingError');
            }
        });
    },

    updateUserDetails({ commit, state }, userData) {
        commit('setUpdateUserLoadingTrue');
        const { email, phone } = userData;
        const { userId } = state.author.data.user;
        DataAccessor.createOrUpdateUser(userId, email, phone, (data) => {
            commit('setUpdateUserLoadingSuccess');
            commit('setUserDataLoadingSuccess', data, { root: true });
        }, () => {
            commit('setUserDataLoadingError', { root: true });
        });
    },

    updateAuthorDetails({ commit, state }, authorData) {
        commit('setUpdateAuthorLoadingTrue');
        DataAccessor.createOrUpdateAuthor(authorData, (response) => {
            commit('setUpdateAuthorLoadingSuccess', response);
            commit('alert/triggerAlertView', '__('updated_author_info_success')', { root: true });
            setTimeout(() => {
                commit('alert/triggerAlertHide', null, { root: true });
            }, 3000);
        }, () => {
            commit('setUpdateAuthorLoadingError');
        });
    },

    updateUserPassword({ commit, state }, { oldPassword, newPassword }) {
        DataAccessor.updateUserPassword(oldPassword, newPassword, (response) => {
            commit('alert/triggerAlertView', '__('password_change_success')', { root: true });
            setTimeout(() => {
                commit('alert/triggerAlertHide', null, { root: true });
            }, 3000);

            commit('setUpdateAuthorLoadingSuccess', response);
        }, () => {
            commit('alert/triggerAlertView', 'Password reset failed', { root: true });
            setTimeout(() => {
                commit('alert/triggerAlertHide', null, { root: true });
            }, 3000);

            commit('setUpdateAuthorLoadingError');
        });  
    },

    // This is for unsubscribe non logged in page
    updateMarketingNewsletter({ commit, state }, { uuid, newsletterFrequency, newsletterUnsubscribeReason }) {
        commit('setMarketingFrequencyLoadingTrue');
        DataAccessor.postMarketingNewsletterUnsubscribe(uuid, newsletterFrequency, newsletterUnsubscribeReason, (data) => {
            commit('setMarketingFrequencyLoadingSuccess');
        }, () => {
            commit('setMarketingFrequencyLoadingError');
        });
    }
}
