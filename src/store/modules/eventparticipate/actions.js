import DataAccessor from '@/utils/DataAccessor'

export default {

    fetchEventPratilipiData({ commit, state }, eventPratilipiId) {
        console.log("call extra");
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
            eventId, title, titleEn, type, language, "state" : "EVENT"
        }, (eventPratilipiData) => {
            if (eventPratilipiData) {
                commit('setEventPratilipiCreateOrUpdateStateSuccess', eventPratilipiData);
            } else {
                commit('setEventPratilipiCreateOrUpdateStateError');
            }
        });
    },

    updateEventPratilipiData({ commit, state }, { pratilipiId, title, eventId ,titleEn, type }) {
        commit('setEventPratilipiCreateOrUpdateStateTrue');
        DataAccessor.createOrUpdatePratilipi({"pratilipiId" : pratilipiId, "title" : title, "titleEn" : titleEn, "type" : type, "eventId" : eventId}, (eventPratilipiData) => {
            if (eventPratilipiData) {
                commit('setEventPratilipiCreateOrUpdateStateSuccess', eventPratilipiData);
            } else {
                commit('setEventPratilipiCreateOrUpdateStateError');
            }
        });
    },

    updateDescriptionAndTags({ commit }, { eventPratilipiId, description, state }) {
        commit('setEventPratilipiDescUpdateStateTrue');
        DataAccessor.createOrUpdatePratilipi({"pratilipiId" : eventPratilipiId, "summary" : description, "state" : state}, (eventPratilipiData) => {
            if (eventPratilipiData) {
                commit('setEventPratilipiDescUpdateStateSuccess', eventPratilipiData);
            } else {
                commit('setEventPratilipiDescUpdateStateError');
            }
        });
    },

    createPratilipiAndEvent({commit, state}, {title, titleEn, eventId ,language, type}) {
        commit('setEventPratilipiCreateOrUpdateStateTrue');
        DataAccessor.createOrUpdatePratilipi({title, titleEn, language, eventId, type, state: 'EVENT'}, (data) => {
            commit('setEventPratilipiCreateOrUpdateStateSuccess', data);
        }, (error) => {
            commit('setEventPratilipiCreateOrUpdateStateError', data);
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
        DataAccessor.bulkSaveChapters(eventPratilipiId, encodeURIComponent(JSON.stringify({ encodedContent: encodeURIComponent(JSON.stringify(finalContents)) })), (contentData) => {
            if (contentData) {
                commit('setContentCreateOrUpdateStateSuccess', contentData);
            } else {
                commit('setContentCreateOrUpdateStateError');
            }
        });
    },

    fetchPratilipiContent({ commit, state },{ eventPratilipiId, chapterNo}) {
        commit('setContentLoadingTrue');

        DataAccessor.getEventPratilipiContent(eventPratilipiId, chapterNo, (contentData) => {
            if (contentData.status === 200) {
                commit('setContentLoadingSuccess', contentData.response);
            } else {
                commit('setContentLoadingError');
            }
        });
    },
    fetchPratilipiIndex({ commit, state }, eventPratilipiId) {
        commit('setContentIndexLoadingTrue');
        DataAccessor.getPratilipiIndex(eventPratilipiId, (contentData) => {
            if (contentData.status === 200) {
                commit('setContentIndexLoadingSuccess', contentData.response);
            } else {
                commit('setContentIndexLoadingError');
            }
        });
    },

    fetchEventDetails({ commit, state }, eventslug) {
        commit('setEventDataLoadingTrue');
        DataAccessor.getEventBySlug(eventslug, 0, 0,(data) => {
            if (data.status === 200) {
                commit('setEventDataLoadingSuccess', data.response);
            } else {
                commit('setEventDataLoadingError');
            }
        });
    },

    uploadEventPratilipiImage({ commit, state }, {formData, pratilipiId} ) {
        commit('setPratilipiImageUploadingTrue');
        DataAccessor.uploadPratilipiImage(formData, pratilipiId,(successData) => {
            commit('setPratilipiImageUploadingSuccess', successData);
        }, (errorData) => {
            commit('setPratilipiImageUploadingError');
        });
    },

    saveEventContentByChapter({commit, state}, {chapterNo, chapterTitle, content, pratilipiId}) {
        commit('setContentUpdatingTrue');
        DataAccessor.saveContentOfEventEntry({
            "chapterNo": chapterNo,
            "chapterTitle": chapterTitle,
            "content": content,
            "pratilipiId": pratilipiId
        },( data ) => {
            commit('setContentUpdatingSuccess', {chapterTitle, chapterNo});
        },( error ) => {
            commit('setContentUpdatingError');
        });
    },
    createNewEventEntry({commit, state}, {eventId, userId, authorId, pratilipiId}) {
        commit('setEventEntryCreatingTrue');
        DataAccessor.addNewEventEntryFromPratilipi( eventId, userId, authorId, pratilipiId, (data) => {
            console.log("createNewEventFromPratilipi", data);
           commit('setEventEntryCreatingSuccess', data);
        }, (data) => {
            commit('setEventEntryCreatingError');
        });
    },

    createChapter({commit, state}, {pratilipiId, chapterNo}) {
        commit('setChapterCreatingTrue');
        DataAccessor.addNewChapterToPratilipi(pratilipiId, chapterNo, (data) => {
            commit('setChapterCreatingSuccess', data);
        }, (data) => {
            commit('setChapterCreatingError');
        });
    },

    deleteChapter({commit, state}, {pratilipiId, chapterNo}) {
        commit('setChapterDeletingTrue');
        DataAccessor.deleteChapterToPratilipi(pratilipiId, chapterNo, (data) => {
            commit('setChapterDeletingSuccess', data);
        }, (data) => {
            commit('setChapterDeletingError');
        });
    },
    submitEventEntry({commit, state}, {eventId, eventEntryId}){
        commit('setEntrySubmissionTrue');
        DataAccessor.submitEntryToEvent(eventId, eventEntryId, (data) => {
            commit('setEntrySubmissionSuccess', data);
        }, (data) => {
            commit('setEntrySubmissionError');
        });
    }
}
