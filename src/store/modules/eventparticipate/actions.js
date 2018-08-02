import DataAccessor from '@/utils/DataAccessor'

export default {

    fetchEventPratilipiData({ commit, state }, eventPratilipiId) {
        commit('setEventPratilipiDataLoadingTrue');
        console.log("Getting called multiple timrs");
        DataAccessor.getEventPratilipiById(eventPratilipiId, (eventPratilipiData) => {
            if (eventPratilipiData.status === 200) {
                console.log("Getting called multiple times inside");
                // commit('setEventPratilipiDataLoadingSuccess', eventPratilipiData.response);
            } else {
                // commit('setEventPratilipiDataLoadingError');
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
        console.log("DANGH " + eventId + " " + title + " " + titleEn + " " + type + " " + language);
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
        DataAccessor.bulkSaveChapters(eventPratilipiId, encodeURIComponent(JSON.stringify({ encodedContent: encodeURIComponent(JSON.stringify(finalContents)) })), (contentData) => {
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

    createPratilipiAndEvent({commit, state}, {title, titleEn, language, type}) {
        console.log(titleEn)
        DataAccessor.createOrUpdatePratilipi({
            title,
            titleEn,
            language,
            type,
            state: 'DRAFTED'
        }, (data) => {
            console.log("MY DATA IS: ", data);
            commit('setPratilipiCreatedSuccess', data);
        }, (error) => {
            console.log("DANGGGGGGGG:::", error);
        })
    },

    createNewEvent({commit, state}, {eventId, userId, authorId, pratilipiId}) {
        console.log("FROM ACTION: " + eventId + " " + authorId + " " + " " + userId + " " + pratilipiId);

        DataAccessor.addNewEventEntry({
            title,
            titleEn,
            language,
            type,
            state: 'DRAFTED'
        }, (data) => {
            console.log("MY DATA IS: ", data);
            commit('setPratilipiCreatedSuccess', data);

        }, (error) => {
            console.log("DANGGGGGGGG:::", error);
        })
    },

    createFirstChapter({commit, state}, {pratilipiId, chapterNo}) {
        console.log("pratilipiId: " + pratilipiId + " chapterNo " + chapterNo + " Creating Chapter ");
        DataAccessor.addNewChapterToPratilipi({
            pratilipiId,
            chapterNo
        }, (data) => {
            console.log("NEW CHAPTER ADDED");
        })
    },


    fetchContentForEventEntry({commit, state}, {pratilipiId, chapterNo}) {
        DataAccessor.getContentOfEventEntry(pratilipiId, chapterNo, (data) => {
            console.log("FETCHED DATA");
        })
    },

    // createNewEvent ({ commit, state },  {eventId, userId, authorId, pratilipiId}) {
    //     DataAccessor.addNewEventEntry({
    //         eventId,
    //         userId,
    //         authorId,
    //         pratilipiId
    //     }, (data) => {
    //         console.log("MY ENTRY IS: " ,data);,

    //     }, (error) => {
    //         console.log("DANGGGGGGGG::: 2" , error);
    //     })
    // },

    saveEventContentByChapter({commit, state}, {chapterNo, chapterTitle, content, pratilipiId}) {
        console.log("SAVING CHAPTER CONTENT" + chapterNo + " " + content);
        DataAccessor.saveContentOfEventEntry({
            "chapterNo": chapterNo,
            "chapterTitle": chapterTitle,
            "content": content,
            "pratilipiId": pratilipiId
        })

    },

    resetNewEntryState({commit, state}) {
        console.log("EBTERIN");
        commit('resetEntryState');
    },
    createNewEventFromPratilipi({commit, state}, {eventId, userId, authorId, pratilipiId}) {
        console.log("FROM ACTION: " + eventId + " " + authorId + " " + userId + " " + pratilipiId);
        DataAccessor.addNewEventEntryFromPratilipi({
            eventId,
            userId,
            authorId,
            pratilipiId
        })
        // DataAccessor.updateEventPratilipi(eventPratilipiId, {
        //     title, titleEn, type
        // }, (eventPratilipiData) => {
        //     if (eventPratilipiData) {
        //         commit('setEventPratilipiCreateOrUpdateStateSuccess', eventPratilipiData);
        //     } else {
        //         commit('setEventPratilipiCreateOrUpdateStateError');
        //     }
        // });
    },

}
