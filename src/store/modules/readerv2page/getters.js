export default {
    getPratilipiData: state => state.pratilipi.data,
    getPratilipiLoadingState: state => state.pratilipi.loading_state,
    getAuthorData: state => state.author.data,
    getAuthorDataLoadingState: state => state.author.loading_state,
    getIndexData: state => state.index.data,
    getIndexLoadingState: state => state.index.loading_state,
    getPratilipiContent: state => state.content.data,
    getPratilipiContentLoadingState: state => state.content.loading_state,
    getUserPratilipiData: state => state.userPratilipi.data,
    getUserPratilipiLoadingState: state => state.userPratilipi.loading_state
}
