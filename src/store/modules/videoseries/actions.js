import DataAccessor from '@/utils/DataAccessor'

export default {

    fetchListOfVideoPlaylists({ commit, state }, language) {
        commit('setEventsDataLoadingTrue');
        console.log(language);
        console.log("I am reaching here "+ language);
        DataAccessor.getVideoseriesList(language, function(data) {
            console.log("I am in0");
            if (data.status === 200) {
                commit('setVideoPlaylistsDataLoadingSuccess', data.response);
            } else {
                commit('setEventsDataLoadingError');
            }
            console.log("Heya hola",data.response.data);
        });
    }, 
    resetVideoList({commit,state}){
        commit("resetVideoList");
        
        // console.log("Heya I am here in mutator: OMG" , state.listOfVideoPlayList );

    },
    fetchListOfVideoPlayListdata({ commit, state }, videoseries_slug) {
        // commit('setEventsDataLoadingTrue');
 
        DataAccessor.getVideoPlayList(videoseries_slug, function(data) {
            console.log("I am in1");
            if (data.status === 200) {
                commit('setListOfVideoPlayListDataLoadingSuccess', data.response);
                console.log("I need to see this now  ", data);

                console.log("I need to see this ", data.response);
            } else {
                commit('setEventsDataLoadingError');
            }
            console.log("Heya hola 22222",data.response.data);
        });
    },
     fetchVideoDetails({ commit, state }, videoseries_slug) {
        // commit('setEventsDataLoadingTrue');
        console.log("OMG OMG OMG" + videoseries_slug);
        console.log("I am reaching here in fetchVideoDetails "+ videoseries_slug);
        DataAccessor.getVideoDetails(videoseries_slug, function(data) {
            console.log("I am in2");
            if (data.status === 200) {
                console.log("I am safe are you?", data.response);
                commit('setVideoDetailsDataLoadingSuccess', data.response);
            } else {
                commit('setEventsDataLoadingError');
            }
            console.log("Heya hola 3333",data.response.data);
        });
    },

       fetchVideoDetailsLatest({ commit, state }, videoseries_slug_latest) {
        // commit('setEventsDataLoadingTrue');
        console.log("OMG OMG OMG" + videoseries_slug_latest);
        console.log("I am reaching here in fetchVideoDetails "+ videoseries_slug_latest);
        DataAccessor.getLatestVideo (videoseries_slug_latest, function(data) {
            console.log("I am in3");
            if (data.status === 200) {
                console.log("UNSAFE", data.response);
                commit('setLatestVideoDetailsDataLoadingSuccess', data.response);
            } else {
                commit('setEventsDataLoadingError');
            }
            console.log("Heya hola 3333",data.response.data);
        });
    },

    
    fetchCurrentVideoPlay({ commit, state }, videos_slug) {
        console.log("OMG OMG OMG" + videos_slug);
        console.log("I am reaching here in fetchCurrentVideoPlay "+ videos_slug);
        DataAccessor.getCurrentVideoPlay(videos_slug, function(data) {
            console.log("I am in7");
            if (data.status === 200) {
                console.log("UNSAFE defo", data.response);
                commit('setCurrentVideoPlayDataLoadingSuccess', data.response);
            } else {
                commit('setEventsDataLoadingError');
            }
            console.log("Heya hola 3333",data.response.data);
        });
    },

        fetchOtherVideos({ commit, state }, videos_slug) {
        console.log("OMG OMG OMG" + videos_slug);
        console.log("I am reaching here in fetchCurrentVideoPlay "+ videos_slug);
        DataAccessor.getOtherVideos(videos_slug, function(data) {
            console.log("I am in7");
            if (data.status === 200) {
                console.log("UNSAFE sure", data.response);
                commit('setOtherVideoLoadingSuccess', data.response);
            } else {
                // commit('setEventsDataLoadingError');
            }
            // console.log("Heya hola 3333",data.response.data);
        });
    },

}
