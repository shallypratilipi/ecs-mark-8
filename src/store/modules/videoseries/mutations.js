export default {
    // setVideoPlaylistsDataLoadingTrue(state) {
    //     state.videoPlayLists.loading_state = 'LOADING';
    // },

    setVideoPlaylistsDataLoadingSuccess(state, data) {
        console.log("I am a mutator and my loading state Start: ", state.videoPlayLists.loading_state);

        state.videoPlayLists.loading_state = 'LOADING_SUCCESS';
        state.videoPlayLists.data = data.data;
        console.log("I am a mutator: ", state.videoPlayLists.data);
        console.log("I am a mutator and my loading state End: ", state.videoPlayLists.loading_state);

    },

    setListOfVideoPlayListDataLoadingSuccess(state, data) {
        state.listOfVideoPlayList.loading_state = 'LOADING_SUCCESS';
        state.listOfVideoPlayList.data = state.listOfVideoPlayList.data.concat(data.data);
        state.listOfVideoPlayList.offset = data.offset;
        state.listOfVideoPlayList.total = data.total;
        console.log("I am a mutator: Total: ", state.listOfVideoPlayList.total + " Offset: "  + state.listOfVideoPlayList.offset);
    },
    setVideoDetailsDataLoadingSuccess(state, data) {
        state.videoDetails.loading_state = 'LOADING_SUCCESS';
        state.videoDetails.data = data.data;
        console.log("Wow ji", state.videoDetails.data);
    },

    setLatestVideoDetailsDataLoadingSuccess(state, data) {
        state.videoDetailsLatest.loading_state = 'LOADING_SUCCESS';
        state.videoDetailsLatest.data = data.data;
        console.log("Wow2s ji", state.videoDetailsLatest.data);
    },

    setCurrentVideoPlayDataLoadingSuccess(state, data) {
        console.log("Loading state before 100" + state.currentVideoDetails.loading_state);
        state.currentVideoDetails.loading_state = "LOADING_SUCCESS";
        console.log("Loading state after 100" + state.currentVideoDetails.loading_state);
        state.currentVideoDetails.data = data.data;
        state.currentVideoDetails.previous = data.previous;
        state.currentVideoDetails.next = data.next;
    },

    setOtherVideoLoadingSuccess(state, data) {
        state.otherVideos.loading_state = "LOADING_SUCCESS",
        state.otherVideos.data = data.data
    },
    resetVideoList(state) {
        state.listOfVideoPlayList.data = [];
    }
}
