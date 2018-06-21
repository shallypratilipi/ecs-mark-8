export default {
    getVideoPlayListsLoadingState: state => state.videoPlayLists.loading_state,
    getVideoPlayListsData: state => state.videoPlayLists.data,

    getListOfVideoPlayListLoadingState: state => state.listOfVideoPlayList.loading_state,
    getListOfVideoPlayListdata: state => state.listOfVideoPlayList.data,
    getListOfVideoPlayListTotal: state => state.listOfVideoPlayList.total,
    getListOfVideoPlayListOffset: state => state.listOfVideoPlayList.offset,


    getVideoDetailsLoadingState: state => state.videoDetails.loading_state,
    getVideoDetailsData: state => state.videoDetails.data,

    getVideoDetailsLatestData: state => state.videoDetailsLatest.data,
    


    getCurrentVideoPlayData: state => state.currentVideoDetails.data,
    getNextVideoPlayData: state => state.currentVideoDetails.next,
    getPreviousVideoPlayData: state => state.currentVideoDetails.previous,
    getCurrentVideoLoadingState: state => state.currentVideoDetails.loading_state,

    getOtherVideos: state => state.otherVideos.data,


}
 