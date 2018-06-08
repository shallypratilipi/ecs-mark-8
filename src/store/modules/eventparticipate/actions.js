import DataAccessor from '@/utils/DataAccessor'

export default {

    fetchEventPratilipiData({ commit, state }, eventPratilipiId) {
        commit('setEventPratilipiDataLoadingTrue');
        DataAccessor.getEventPratilipiById(eventPratilipiId, (eventPratilipiData) => {
            if (eventPratilipiData.status === 200) {
                commit('setEventPratilipiDataLoadingSuccess', eventPratilipiData.response);
            } else {
                commit('setEventPratilipiDataLoadingError');
            }
        });
    },

    fetchDraftedUserEventPratilipis({ commit, state }, eventId) {
        commit('setUserEventPratilipiDraftedDataLoadingTrue');
        DataAccessor.getDraftedEventPratilipis(eventId, (eventPratilipiData) => {
            if (eventPratilipiData.status === 200) {
                commit('setUserEventPratilipiDraftedDataLoadingSuccess', eventPratilipiData.response.pratilipis);
            } else {
                commit('setUserEventPratilipiDraftedDataLoadingError');
            }
        });
    },

    createEventPratilipiData({ commit, state }, { eventId, title, titleEn, type, language }) {
        commit('setEventPratilipiCreateOrUpdateStateTrue');
        DataAccessor.createEventPratilipi({
            eventId, title, titleEn, type, language
        }, (eventPratilipiData) => {
            if (eventPratilipiData) {
                commit('setEventPratilipiCreateOrUpdateStateSuccess', eventPratilipiData);
            } else {
                commit('setEventPratilipiCreateOrUpdateStateError');
            }
        });
    },

    updateEventPratilipiData({ commit, state }, { eventPratilipiId, title, titleEn, type }) {
        commit('setEventPratilipiCreateOrUpdateStateTrue');
        DataAccessor.updateEventPratilipi(eventPratilipiId, {
            title, titleEn, type
        }, (eventPratilipiData) => {
            if (eventPratilipiData) {
                commit('setEventPratilipiCreateOrUpdateStateSuccess', eventPratilipiData);
            } else {
                commit('setEventPratilipiCreateOrUpdateStateError');
            }
        });
    },

    updateDescriptionAndTags({ commit }, { eventPratilipiId, description, state }) {
        commit('setEventPratilipiDescUpdateStateTrue');
        DataAccessor.updateEventPratilipiDesc(eventPratilipiId, {
            description, state
        }, (eventPratilipiData) => {
            if (eventPratilipiData) {
                commit('setEventPratilipiDescUpdateStateSuccess', eventPratilipiData);
            } else {
                commit('setEventPratilipiDescUpdateStateError');
            }
        });
    },

    updatePratilipiContent({ commit, state }, { eventPratilipiId, contents }) {
        const finalContents = [];

        contents.forEach((eachChapter, index) => {
            finalContents.push({
                chapterTitle: eachChapter.title,
                chapterNo: index + 1,
                content: encodeURIComponent(eachChapter.content)
            });
        })
        DataAccessor.bulkSaveChapters(eventPratilipiId, JSON.stringify(finalContents), (contentData) => {
            if (contentData) {
                commit('setContentCreateOrUpdateStateSuccess', contentData);
            } else {
                commit('setContentCreateOrUpdateStateError');
            }
        });
    },

    fetchPratilipiContent({ commit, state }, eventPratilipiId) {
        commit('setContentLoadingTrue');
        DataAccessor.getEventPratilipiContent(eventPratilipiId, (contentData) => {
            if (contentData.status === 200) {
                commit('setContentLoadingSuccess', contentData.response.contents);
            } else {
                console.log('ERROR: ');
                console.log(contentData)
                // commit('setContentLoadingError');
            }
        });
    },

    fetchEventDetails({ commit, state }, eventId) {
        console.log(eventId);
        commit('setEventDataLoadingTrue');
        DataAccessor.getEventBySlug(eventId, (eventData) => {
            if (eventData) {
                commit('setEventDataLoadingSuccess', eventData);
            } else {
                commit('setEventDataLoadingError');
            }
        });
    },

    uploadEventPratilipiImage({ commit, state }, formData ) {
        commit('setPratilipiImageUploadingTrue');
        DataAccessor.uploadEventPratilipiImage(formData, (successData) => {
            console.log('Now I can die in peace');
            commit('setPratilipiImageUploadingSuccess', successData);
        }, (errorData) => {
            console.log('My life is wasted');
            commit('setPratilipiImageUploadingError');
        });
    },
}
