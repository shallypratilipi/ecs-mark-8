export default {
    published_contents: {
        loading_state: 'LOADING',
        data: [],
        cursor: null,
        numberFound: 0
    },
    following: {
        loading_state: 'LOADING',
        data: [],
        cursor: null,
        numberFound: 0
    },
    followers: {
        loading_state: 'LOADING',
        data: [],
        cursor: null,
        numberFound: 0
    },
    author: {
    	loading_state: 'LOADING',
        cover_image_upload_state: 'LOADING_SUCCESS',
        profile_image_upload_state: 'LOADING_SUCCESS',
    	data: {}
    },
    library: {
        loading_state: 'LOADING',
        data: [],
        numberFound: 0,
        cursor: null
    },
    route_to_message_user: false

}
