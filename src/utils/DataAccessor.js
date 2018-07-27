import { httpUtil, formatParams } from './HttpUtil';


const API_PREFIX = (window.location.origin.indexOf(".pratilipi.com") > -1 || window.location.origin.indexOf(".ptlp.co")) > -1 ? "/api" : "https://gamma.pratilipi.com";

// const API_PREFIX  = "https://hindi-devo.ptlp.co";
/* Search */
const SEARCH_PREFIX = "/search/v2.0";
const SEARCH_TRENDING_API = "/trending_search";
const SEARCH_CORE_API = "/search";

/* Recommendation Api */
const RECOMMENDATION_PREFIX = "/recommendations/v2.1";
const RECOMMENDATION_PRATILIPI_API = "/pratilipis";

const PAGE_API = "/page";
const PAGE_CONTENT_API = "/page/content";
const PRATILIPI_API = "/pratilipi?_apiVer=2";
const PRATILIPI_LIST_API = "/pratilipi/list?_apiVer=3";
const PRATILIPI_CONTENT_API = "/pratilipi/content";
const PRATILIPI_CONTENT_INDEX_API = "/pratilipi/content/index";
const PRATILIPI_TAGS_UPDATE_API = "/pratilipi/tags/update";
const PRATILIPI_NEW_API = "/pratilipis";
const USER_PRATILIPI_API = "/userpratilipi";
const USER_PRATILIPI_LIBRARY_LIST_API = "/userpratilipi/library/list";
const AUTHOR_API = "/author";

const AUTHOR_NEW_API = "/authors";
const USER_API = "/user?_apiVer=2";
const USER_LOGIN_API = "/user/login";
const USER_LOGIN_FACEBOOK_API = "/user/login/facebook";
const USER_LOGIN_GOOGLE_API = "/user/login/google";
const USER_REGISTER_API = "/user/register";
const USER_PASSWORD_UPDATE_API = "/user/passwordupdate";
const USER_LOGOUT_API = "/user/logout";
const NOTIFICATION_API = "/notifications/v1.0";
const NOTIFICATION_LIST_API = "/notifications/v1.0";
const NAVIGATION_LIST_API = "/navigation/list";
const USER_PRATILIPI_REVIEW_LIST_API = "/userpratilipi/review/list";
const COMMENT_LIST_API = "/comment/list";
const USER_PRATILIPI_REVIEW_API = "/userpratilipi/review";
const USER_AUTHOR_FOLLOW_POST_API = "/follows/v2.0/authors";
const USER_AUTHOR_FOLLOW_GET_API = "/follows/v2.0/isFollowing";
const USER_PRATILIPI_LIBRARY_API = "/userpratilipi/library";
const COMMENT_API = "/comment";
const VOTE_API = "/vote";
const INIT_API = "/init?_apiVer=2";
const INIT_BANNER_LIST_API = "/init/banner/list";
const USER_AUTHOR_FOLLOWERS_LIST_API = "/follows/v2.0/authors";
const USER_AUTHOR_FOLLOWING_LIST_API = "/follows/v2.0/users";
const EVENT_API = "/event";
const EVENTS_API = "/events/v2.0";
const EVENT_LIST_API = "/event/list";
const BLOG_POST_API = "/blogpost";
const BLOG_POST_LIST_API = "/blogpost/list";
const CONTACT_API = "/contact";
const TAGS_API = "/pratilipi/v2/categories/system";
const USER_EMAIL_API = "/user/email";
const TOP_AUTHORS_API = "/author/list/readcount";
const WEB_DEVICES_API = "/web-push/fcmToken";
const MARKETING_API = "/marketing/v1.0/newsletter/unsubscribe";

const EVENT_PARTICIPATE_PREFIX = '/event-participate';
const EVENT_PARTICIPATE_PREFIX_ADMIN = '/event-participate/admin';
const EVENT_PARTICIPATE_GET = '/metadata';
const EVENT_PARTICIPATE_LIST = '/list';
const EVENT_PARTICIPATE_CREATE = '/metadata';
const EVENT_PARTICIPATE_UPDATE = '/metadata';
const EVENT_PARTICIPATE_CONTENT = '/content';
const EVENT_PARTICIPATE_PUBLISH = '/publish';

const INIT_VIDEOSERIES_LIST_API = "/init/v2.0/videoseries";
const INIT_VIDEOSERIES_PLAYLIST = "/init/v2.0/videos";
const INIT_VIDEOSERIES_DETAILS = "/init/v2.0/videoseries/";
const INIT_OTHER_VIDEOS = "/init/v2.0/videos/other";

const BLOGS_API = "/oasis/blogs/v1.0";
const BLOGS_LIST_API = "/oasis/blogs/v1.0/list";
const AUTHOR_INTERVIEWS_API = "/oasis/author-interviews/v1.0";
const AUTHOR_INTERVIEWS_LIST_API = "/oasis/author-interviews/v1.0/list";
const READ_PERCENTAGE_API = "/user_pratilipi/v2.0/user_pratilipis";

const READER_BATCH_API = "/web/v1.0/reader/readerBatch";
const READER_CHAPTER_API = "/web/v1.0/reader/readerChapter";

const INIT_API_VAPSI = "/init/v2.0/vapsi";

const EVENT_AUTOMATION_LIST = "https://hindi-devo.ptlp.co/api/event/list";

const request = function(name, api, params) {
    return {
        "name": name,
        "api": api,
        "params": params != null ? encodeURIComponent(formatParams(params)) : null
    };
};

const processRequests = function(requests) {
    let params = {};
    for (let i = 0; i < requests.length; i++) {
        let request = requests[i];
        params[request.name] = request.api;
        if (request.params != null)
            params[request.name] += encodeURIComponent(request.api.indexOf("?") > -1 ? "&" : "?") + request.params;
    }
    return JSON.stringify(params);
};

const processGetResponse = function(response, status, aCallBack) {
    if (status !== 200 && status !== 404) {
        if (process.env.REALM !== 'PROD') {
            import('raven-js').then((Raven) => {
                Raven.captureMessage('Server Exception', {
                    level: 'error', // one of 'info', 'warning', or 'error'
                    extra: {
                        language: process.env.LANGUAGE,
                        status,
                        response: response.message,
                        method: 'GET'
                    }
                });
            });
        }
    }

    if (aCallBack != null)
        aCallBack(status == 200 ? {
            status,
            response
        } : {
            status,
            response
        });
};

const processPostResponse = function(response, status, successCallBack, errorCallBack) {
    if (status == 200 && successCallBack != null)
        successCallBack(response);
    else if (status != 200 && errorCallBack != null) {

        if (process.env.REALM !== 'PROD') {
            import('raven-js').then((Raven) => {
                Raven.captureMessage('Server Exception', {
                    level: 'error', // one of 'info', 'warning', or 'error'
                    extra: {
                        language: process.env.LANGUAGE,
                        status,
                        response: response.message,
                        method: 'POST'
                    }
                });
            });
        }
        errorCallBack(response);
    }
};


/* DataAccessor */
export default {

    getPageType: (pageUri, aCallBack) => {
        httpUtil.get(API_PREFIX + PAGE_API,
            null,
            { uri: pageUri },
            function(response, status) { processGetResponse(response, status, aCallBack) });
    },

    getPratilipiByUri: (pageUri, includeUserPratilipi, aCallBack) => {

        var requests = [];
        requests.push(new request("req1", PAGE_API, { "uri": pageUri }));
        requests.push(new request("req2", PRATILIPI_API, { "pratilipiId": "$req1.primaryContentId" }));

        if (includeUserPratilipi)
            requests.push(new request("req3", USER_PRATILIPI_API, { "pratilipiId": "$req1.primaryContentId" }));

        httpUtil.get(API_PREFIX, null, { "requests": processRequests(requests) },
            function(response, status) {
                if (aCallBack != null) {
                    var pratilipi = response.req2 && response.req2.status == 200 ? response.req2.response : null;
                    var userpratilipi = includeUserPratilipi && response.req3 && response.req3.status == 200 ? response.req3.response : null;
                    aCallBack(pratilipi, userpratilipi);
                }
            });
    },

    getPratilipiBySlug: (slug, includeUserPratilipi, aCallBack) => {
        var requests = [];
        requests.push(new request("req1", PRATILIPI_NEW_API, { "slug": slug, "nextPratilipi" : true}));

        if (includeUserPratilipi)
            requests.push(new request("req2", USER_PRATILIPI_API, { "pratilipiId": "$req1.pratilipiId" }));

        httpUtil.get(API_PREFIX, null, { "requests": processRequests(requests) },
            function(response, status) {
                if (aCallBack != null) {
                    var pratilipi = response.req1 && response.req1.status == 200 ? response.req1.response : null;
                    var userpratilipi = includeUserPratilipi && response.req2 && response.req2.status == 200 ? response.req2.response : null;
                    aCallBack(pratilipi, userpratilipi);
                }
            });
    },

    getPratilipiById: (pratilipiId, includeUserPratilipi, aCallBack) => {

        var requests = [];
        requests.push(new request("req1", PRATILIPI_API, { "pratilipiId": pratilipiId }));

        if (includeUserPratilipi)
            requests.push(new request("req2", USER_PRATILIPI_API, { "pratilipiId": pratilipiId }));

        httpUtil.get(API_PREFIX, null, { "requests": processRequests(requests) },
            function(response, status) {
                if (aCallBack != null) {
                    var pratilipi = response.req1 && response.req1.status == 200 ? response.req1.response : null;
                    var userpratilipi = includeUserPratilipi && response.req2 && response.req2.status == 200 ? response.req2.response : null;
                    aCallBack(pratilipi, userpratilipi);
                }
            });
    },

    getPratilipiAndIndex: (pratilipiId, includeUserPratilipi, aCallBack) => {
        if (pratilipiId == null) return;

        var requests = [];
        requests.push(new request("req1", PRATILIPI_API, { "pratilipiId": pratilipiId , "nextPratilipi" : true }));
        requests.push(new request("req2", PRATILIPI_CONTENT_INDEX_API, { "pratilipiId": pratilipiId }));
        if (includeUserPratilipi)
            requests.push(new request("req3", USER_PRATILIPI_API, { "pratilipiId": pratilipiId }));

        httpUtil.get(API_PREFIX, null, { "requests": processRequests(requests) },
            function(response, status) {
                if (aCallBack != null) {
                    var pratilipi = response.req1 && response.req1.status == 200 ? response.req1.response : null;
                    var index = response.req2 && response.req2.status == 200 ? response.req2.response : null;
                    var userpratilipi = response.req3 && response.req3.status == 200 ? response.req3.response : null;
                    aCallBack(pratilipi, index, userpratilipi);
                }
            });
    },

    getAuthorByUri: (pageUri, includeUserAuthor, aCallBack) => {

        var requests = [];
        requests.push(new request("req1", PAGE_API, { "uri": pageUri }));
        requests.push(new request("req2", AUTHOR_API, { "authorId": "$req1.primaryContentId" }));

        if (includeUserAuthor)
            requests.push(new request("req3", USER_AUTHOR_FOLLOW_GET_API, { "referenceId": "$req1.primaryContentId", "referenceType": "AUTHOR" }));

        httpUtil.get(API_PREFIX, null, { "requests": processRequests(requests) },
            function(response, status) {
                if (aCallBack != null) {
                    var author = response.req2 && response.req2.status == 200 ? response.req2.response : null;
                    var userauthor = includeUserAuthor && response.req3 && response.req3.status == 200 ? response.req3.response : null;
                    aCallBack(author, userauthor);
                }
            });
    },

    getAuthorBySlug: (pageUri, aCallBack) => {

        var requests = [];
        requests.push(new request("req1", AUTHOR_NEW_API, { "slug": pageUri }));

        httpUtil.get(API_PREFIX, null, { "requests": processRequests(requests) },
            function(response, status) {
                if (aCallBack != null) {
                    var author = response.req1 && response.req1.status == 200 ? response.req1.response : null;
                    aCallBack(author, author);
                }
            });
    },

    getAuthorById: (authorId, aCallBack) => {

        var requests = [];
        requests.push(new request("req1", AUTHOR_API, { "authorId": authorId }));

        httpUtil.get(API_PREFIX, null, { "requests": processRequests(requests) },
            function(response, status) {
                if (aCallBack != null) {
                    var author = response.req1 && response.req1.status == 200 ? response.req1.response : null;
                    aCallBack(author);
                }
            });
    },

    getUserPratilipiByPratilipiId: (pratilipiId, aCallBack) => {
        httpUtil.get(API_PREFIX + USER_PRATILIPI_API, null, {pratilipiId}, function (response, status) {
            processGetResponse(response, status, aCallBack)
        })
    },

    // Reader V2

    getReaderBatch: (chapterSlug, aCallBack) => {
        httpUtil.get(API_PREFIX + READER_BATCH_API, null, {chapterSlug}, function (response, status) {
            // TODO: Remove asap
            if (status === 200) {
                for (let i = 0; i < response.contentIndex.length; i++) {
                    let {pageUrl} = response.contentIndex[i]
                    pageUrl = pageUrl.split(' ').join('-')
                    if (!pageUrl.startsWith('/read/')) {
                        pageUrl = `/read/${pageUrl}`
                    }
                    response.contentIndex[i].pageUrl = pageUrl
                    response.contentIndex[i].slugId = pageUrl.split('/').pop().split('-').pop()
                    response.contentIndex[i].chapterNo = i + 1
                    delete response.contentIndex[i].slug
                }
                if (response.chapterData.pageUrl) {
                    response.chapterData.slugId = response.chapterData.pageUrl.split('/').pop().split('-').pop()
                    delete response.chapterData.pageUrl
                    delete response.chapterData.pratilipiId
                }
            }
            // Local Testing for IMAGE contents
            if (status === 200) {
                if ((window.location.origin.indexOf('.pratilipi.com') === -1 && window.location.origin.indexOf('.ptlp.co')) === -1) {
                    response.chapterData.content = response.chapterData.content.replace(/\/api\/pratilipi\/content/g, 'https://hindi.pratilipi.com/api/pratilipi/content')
                }
            }
            processGetResponse(response, status, aCallBack)
        })
    },

    getReaderChapter: (chapterSlug, aCallBack) => {
        httpUtil.get(API_PREFIX + READER_CHAPTER_API, null, {chapterSlug}, function (response, status) {
            // TODO: Remove asap
            if (status === 200) {
                if (response.pageUrl) {
                    response.slugId = response.pageUrl.split('/').pop().split('-').pop()
                    delete response.pageUrl
                    delete response.pratilipiId
                }
            }
            // Local Testing for IMAGE contents
            if (status === 200) {
                if ((window.location.origin.indexOf('.pratilipi.com') === -1 && window.location.origin.indexOf('.ptlp.co')) === -1) {
                    response.content = response.content.replace(/\/api\/pratilipi\/content/g, 'https://hindi.pratilipi.com/api/pratilipi/content')
                }
            }
            processGetResponse(response, status, aCallBack)
        })
    },

    getEventByUri: (pageUri, aCallBack) => {

        var requests = [];
        requests.push(new request("req1", PAGE_API, { "uri": pageUri }));
        requests.push(new request("req2", EVENT_API, { "eventId": "$req1.primaryContentId" }));

        httpUtil.get(API_PREFIX, null, { "requests": processRequests(requests) },
            function(response, status) {
                if (aCallBack != null) {
                    var event = response.req2.status == 200 ? response.req2.response : null;
                    aCallBack(event);
                }
            });
    },

    getEventBySlug: (slug, aCallBack) => {
        httpUtil.get('http://www.mocky.io/v2/5b5848573000002117fe4e45',
            null,null,
            function(response, status) { processGetResponse(response, status, aCallBack)
             });


        // var requests = [];
        // requests.push(new request("req1", EVENTS_API, { "slug": slug }));

        // httpUtil.get(API_PREFIX, null, { "requests": processRequests(requests) },
        //     function(response, status) {
        //         if (aCallBack != null) {
        //             var event = response.req1.status == 200 ? response.req1.response : null;
        //             aCallBack(event);
        //         }
        //     });
    },

    getEventById: (eventId, aCallBack) => {
        if (eventId == null) return;
        httpUtil.get(API_PREFIX + EVENT_API,
            null, { "eventId": eventId },
            function(response, status) { processGetResponse(response, status, aCallBack) });
    },

    getEventList: (language, aCallBack) => {
        httpUtil.get("https://hindi-devo.ptlp.co/api/event/list?language=HINDI",
            null,
            null,
            function(response, status) { processGetResponse(response, status, aCallBack)
             });
    },

    getVideoseriesList : ( language, aCallBack ) => {
    httpUtil.get( API_PREFIX + INIT_VIDEOSERIES_LIST_API,
            null,
            { "language": language },
            function( response, status ) { processGetResponse( response, status, aCallBack );
            } );
    },

    getOtherVideos : ( videos_slug, aCallBack ) => {
    httpUtil.get( API_PREFIX + INIT_OTHER_VIDEOS,
            null,
            { "slug": videos_slug },
            function( response, status ) { processGetResponse( response, status, aCallBack );
            } );
    },

    getVideoPlayList : ( videoseries_slug , aCallBack ) => {
    httpUtil.get( API_PREFIX + INIT_VIDEOSERIES_PLAYLIST,
            null,
            { "slug": videoseries_slug },
            function( response, status ) { processGetResponse( response, status, aCallBack );
            } );
    },

     getVideoDetails : ( videoseries_slug, aCallBack ) => {
        var params = {};
        httpUtil.get( API_PREFIX + INIT_VIDEOSERIES_DETAILS + videoseries_slug ,
            null,
            params,
            function( response, status ) {
             processGetResponse( response, status, aCallBack );
            } );
    },
    getCurrentVideoPlay : ( videos_slug, aCallBack ) => {
        var params = {};
    httpUtil.get( API_PREFIX + INIT_VIDEOSERIES_PLAYLIST + '/' + videos_slug ,
            null,
            params,
            function( response, status ) {
             processGetResponse( response, status, aCallBack );
            } );
    },
    getLatestVideo : ( videoseries_slug_latest, aCallBack ) => {
        var params = {};

    httpUtil.get( API_PREFIX + INIT_VIDEOSERIES_PLAYLIST ,
            null,
            { "slug": videoseries_slug_latest },
            function( response, status ) {
             processGetResponse( response, status, aCallBack );
            } );
    },

    getBlogPostByUri: (slug, aCallBack) => {
	      var params = {
		        "slug": slug
	      }
	      httpUtil.get(API_PREFIX + BLOGS_API, null, params, function (response, status) {
    			  var blogpost = status == 200 ? response : null;
			      aCallBack(blogpost);
        });
    },

    getBlogPostListByUri: (language, state, cursor, resultCount, aCallBack) => {
        var params = {
            "language": language
        }
        params["state"] = state != null ? state : "PUBLISHED";
        if (cursor != null) params["cursor"] = cursor;
        if (resultCount != null) params["resultCount"] = resultCount;
	httpUtil.get(API_PREFIX + BLOGS_LIST_API,
            null,
            params,
            function(response, status) {
		var blogpost = status == 200 ? response : null;
                aCallBack(blogpost);
	    });
    },

    getAuthorInterviewByUri: (slug, aCallBack) => {
        var params = {
                "slug": slug
        }
        httpUtil.get(API_PREFIX + AUTHOR_INTERVIEWS_API,
                null,
                params,
                function (response, status) {
                        var blogpost = status == 200 ? response : null;
                        aCallBack(blogpost);
                });
    },

    getAuthorInterviewListByUri: (language, state, cursor, resultCount, aCallBack) => {
        var params = {
            "language": language
        };
        params["state"] = state != null ? state : "PUBLISHED";
        if (cursor != null) params["cursor"] = cursor;
        if (resultCount != null) params["resultCount"] = resultCount;

	      httpUtil.get(API_PREFIX + AUTHOR_INTERVIEWS_LIST_API,
            null,
            params,
            function(response, status) {
                var blogpost = status == 200 ? response : null;
                aCallBack(blogpost);
            });
    },

    getUser: (aCallBack) => {
        httpUtil.get(API_PREFIX + USER_API,
            null,
            null,
            function(response, status) { processGetResponse(response, status, aCallBack) });
    },

    getUserById: (userId, aCallBack) => {
        if (userId == null) return;
        httpUtil.get(API_PREFIX + USER_API,
            null, { "userId": userId },
            function(response, status) { processGetResponse(response, status, aCallBack) });
    },

    getNotificationList: (cursor, resultCount, language, aCallBack) => {
        var params = { "language": language };
        if (cursor != null) params["cursor"] = cursor;
        if (resultCount != null) params["resultCount"] = resultCount;
        httpUtil.get(API_PREFIX + NOTIFICATION_LIST_API,
            null,
            params,
            function(response, status) { processGetResponse(response, status, aCallBack) });
    },

    getNavigationList: (aCallBack) => {
        httpUtil.get(API_PREFIX + NAVIGATION_LIST_API,
            null, { "language": "${ language }" },
            function(response, status) { processGetResponse(response, status, aCallBack) });
    },

    getReviewList: (pratilipiId, cursor, offset, resultCount, aCallBack) => {
        if (pratilipiId == null) return;
        var params = { "pratilipiId": pratilipiId };
        if (cursor != null) params["cursor"] = cursor;
        if (offset != null) params["offset"] = offset;
        if (resultCount != null) params["resultCount"] = resultCount;
        httpUtil.get(API_PREFIX + USER_PRATILIPI_REVIEW_LIST_API,
            null,
            params,
            function(response, status) { processGetResponse(response, status, aCallBack) });
    },

    getReviewCommentList: (userPratilipiId, cursor, resultCount, aCallBack) => {
        if (userPratilipiId == null) return;
        var params = { "parentType": "REVIEW", "parentId": userPratilipiId };
        if (cursor != null) params["cursor"] = cursor;
        if (resultCount != null) params["resultCount"] = resultCount;
        httpUtil.get(API_PREFIX + COMMENT_LIST_API,
            null,
            params,
            function(response, status) { processGetResponse(response, status, aCallBack) });
    },

    getPratilipiListByListName: (listName, cursor, offset, resultCount, language, aCallBack) => {
        if (listName == null) return;
        var params = { "listName": listName, "state": "PUBLISHED", "language": language };
        if (cursor != null) params["cursor"] = cursor;
        if (offset != null) params["offset"] = offset;
        if (resultCount != null) params["resultCount"] = resultCount;
        httpUtil.get(API_PREFIX + PRATILIPI_LIST_API,
            null,
            params,
            function(response, status) { processGetResponse(response, status, aCallBack)});
    },

    getPratilipiListBySearchQuery: (searchQuery, cursor, offset, resultCount, language, aCallBack) => {
        if (searchQuery == null) return;
        var params = { "searchQuery": searchQuery, "state": "PUBLISHED", "language": language };
        if (cursor != null) params["cursor"] = cursor;
        if (offset != null) params["offset"] = offset;
        if (resultCount != null) params["resultCount"] = resultCount;
        httpUtil.get(API_PREFIX + PRATILIPI_LIST_API,
            null,
            params,
            function(response, status) { processGetResponse(response, status, aCallBack) });
    },

    getPratilipiListByAuthor: (authorId, state, cursor, offset, resultCount, aCallBack) => {
        if (authorId == null) return;
        var params = { "authorId": authorId, "state": state != null ? state : "PUBLISHED" };
        if (state == "DRAFTED") params["orderByListingDate"] = false;
        if (cursor != null) params["cursor"] = cursor;
        if (offset != null) params["offset"] = offset;
        if (resultCount != null) params["resultCount"] = resultCount;
        httpUtil.get(API_PREFIX + PRATILIPI_LIST_API,
            null,
            params,
            function(response, status) { processGetResponse(response, status, aCallBack) });
    },

    getPratilipiListByEventId: (eventId, cursor, offset, resultCount, aCallBack) => {
        if (eventId == null) return;
        var params = { "eventId": eventId, "state": "PUBLISHED" };
        if (cursor != null) params["cursor"] = cursor;
        if (offset != null) params["offset"] = offset;
        if (resultCount != null) params["resultCount"] = resultCount;
        httpUtil.get(API_PREFIX + PRATILIPI_LIST_API,
            null,
            params,
            function(response, status) { processGetResponse(response, status, aCallBack) });
    },

    getUserLibraryList: (cursor, resultCount, aCallBack) => {
        var params = {};
        if (cursor != null) params["cursor"] = cursor;
        if (resultCount != null) params["resultCount"] = resultCount;
        httpUtil.get(API_PREFIX + USER_PRATILIPI_LIBRARY_LIST_API,
            null,
            params,
            function(response, status) { processGetResponse(response, status, aCallBack) });
    },

    getHomePageSections: (language, aCallBack) => {
        httpUtil.get(API_PREFIX + INIT_API,
            null, { language },
            function(response, status) { processGetResponse(response, status, aCallBack) });
    },

    getHomePageBanners: (language, aCallBack) => {
        httpUtil.get(API_PREFIX + INIT_BANNER_LIST_API,
            null, { "language": language },
            function(response, status) { processGetResponse(response, status, aCallBack) });
    },

    getAuthorFollowers: (authorId, cursor, offset, resultCount, aCallBack) => {
        if (authorId == null) return;
        var params = { "authorId": authorId };
        if (cursor != null) params["cursor"] = cursor;
        if (offset != null) params["offset"] = offset;
        if (resultCount != null) params["resultCount"] = resultCount;
        httpUtil.get(API_PREFIX + USER_AUTHOR_FOLLOWERS_LIST_API + '/' + authorId + '/followers',
            null,
            params,
            function(response, status) { processGetResponse(response, status, aCallBack) });
    },

    getUserFollowing: (userId, cursor, offset, resultCount, aCallBack) => {
        if (userId == null) return;
        var params = { "userId": userId };
        if (cursor != null) params["cursor"] = cursor;
        if (offset != null) params["offset"] = offset;
        if (resultCount != null) params["resultCount"] = resultCount;
        httpUtil.get(API_PREFIX + USER_AUTHOR_FOLLOWING_LIST_API + '/' + userId + '/following',
            null,
            params,
            function(response, status) { processGetResponse(response, status, aCallBack) });
    },

    getPageContent: (pageName, language, aCallBack) => {
        if (pageName == null) return;
        httpUtil.get(API_PREFIX + PAGE_CONTENT_API,
            null, { "pageName": pageName, "language": language },
            function(response, status) { processGetResponse(response, status, aCallBack) });
    },

    getPratilipiContent: (pratilipiId, chapterNo, oldContent, aCallBack) => {
        if (pratilipiId == null) return; /* chapterNo can be null for IMAGE contents */
        httpUtil.get(API_PREFIX + PRATILIPI_CONTENT_API,
            null, { "pratilipiId": pratilipiId, "chapterNo": chapterNo, "_apiVer": oldContent ? 1 : 3 },
            function(response, status) { processGetResponse(response, status, aCallBack) });
    },

    getPratilipiRecommendation: ( contextId, context, resultCount, aCallBack ) => {
        if( contextId == null ) return;
        httpUtil.get( API_PREFIX + RECOMMENDATION_PREFIX + RECOMMENDATION_PRATILIPI_API,
            null,
            { "contextId": contextId, "context": context, "resultCount": resultCount },
            function( response, status ) { processGetResponse( response, status, aCallBack ) } );
    },


    /* POST Methods */
    createOrUpdateUser: (userId, email, phone, successCallBack, errorCallBack) => {
        if (userId == null) return;
        var params = { "userId": userId };
        if (email != null) params["email"] = email;
        if (phone != null) params["phone"] = phone;
        httpUtil.post(API_PREFIX + USER_API,
            null,
            params,
            function(response, status) { processPostResponse(response, status, successCallBack, errorCallBack) });
    },

    createOrUpdateAuthor: (author, successCallBack, errorCallBack) => {
        if (author == null || author.authorId == null) return;
        if (author.dateOfBirth) {
            const dateObj = new Date(author.dateOfBirth);
            let date = dateObj.getDate();
            let month = dateObj.getMonth();
            month++;
            let year = dateObj.getFullYear();
            author.dateOfBirth = date + "-" + month + "-" + year;
        }
        httpUtil.post(API_PREFIX + AUTHOR_API,
            null,
            author,
            function(response, status) { processPostResponse(response, status, successCallBack, errorCallBack) });
    },

    createOrUpdateReview: (pratilipiId, rating, review, successCallBack, errorCallBack) => {
        if (pratilipiId == null) return;
        var params = { "pratilipiId": pratilipiId };
        if (rating != null) params["rating"] = rating;
        if (review != null) {
            params["review"] = review;
            params["reviewState"] = "PUBLISHED";
        }
        httpUtil.post(API_PREFIX + USER_PRATILIPI_REVIEW_API,
            null,
            params,
            function(response, status) { processPostResponse(response, status, successCallBack, errorCallBack) });
    },

    createOrUpdateReviewComment: (userPratilipiId, commentId, content, successCallBack, errorCallBack) => {
        if (userPratilipiId == null && commentId == null) return;
        var params = { "state": "ACTIVE" };
        if (userPratilipiId != null) {
            params["parentId"] = userPratilipiId;
            params["parentType"] = "REVIEW";
        }
        if (commentId != null) params["commentId"] = commentId;
        if (content != null) params["content"] = content;
        httpUtil.post(API_PREFIX + COMMENT_API,
            null,
            params,
            function(response, status) { processPostResponse(response, status, successCallBack, errorCallBack) });
    },

    followOrUnfollowAuthor: (authorId, following, successCallBack, errorCallBack) => {
        if (authorId == null || following == null) return;
        httpUtil.post(API_PREFIX + USER_AUTHOR_FOLLOW_POST_API + '/' + authorId,
            null, { "authorId": authorId, "state": following ? "FOLLOWING" : "UNFOLLOWED" },
            function(response, status) { processPostResponse(response, status, successCallBack, errorCallBack) });
    },

    addOrRemoveFromLibrary: (pratilipiId, addedToLib, successCallBack, errorCallBack) => {
        if (pratilipiId == null || addedToLib == null) return;
        httpUtil.post(API_PREFIX + USER_PRATILIPI_LIBRARY_API,
            null, { "pratilipiId": pratilipiId, "addedToLib": addedToLib },
            function(response, status) { processPostResponse(response, status, successCallBack, errorCallBack) });
    },

    likeOrDislikeReview: (userPratilipiId, isLiked, successCallBack, errorCallBack) => {
        if (userPratilipiId == null || isLiked == null) return;
        httpUtil.post(API_PREFIX + VOTE_API,
            null, { "parentId": userPratilipiId, "parentType": "REVIEW", "type": isLiked ? "LIKE" : "NONE" },
            function(response, status) { processPostResponse(response, status, successCallBack, errorCallBack) });
    },

    likeOrDislikeComment: (commentId, isLiked, successCallBack, errorCallBack) => {
        if (commentId == null || isLiked == null) return;
        httpUtil.post(API_PREFIX + VOTE_API,
            null, { "parentId": commentId, "parentType": "COMMENT", "type": isLiked ? "LIKE" : "NONE" },
            function(response, status) { processPostResponse(response, status, successCallBack, errorCallBack) });
    },

    deleteReview: (pratilipiId, successCallBack, errorCallBack) => {
        if (pratilipiId == null) return;
        var params = { "pratilipiId": pratilipiId, "reviewState": "DELETED" };
        httpUtil.post(API_PREFIX + USER_PRATILIPI_REVIEW_API,
            null,
            params,
            function(response, status) { processPostResponse(response, status, successCallBack, errorCallBack) });
    },

    deleteComment: (commentId, successCallBack, errorCallBack) => {
        if (commentId == null) return;
        httpUtil.post(API_PREFIX + COMMENT_API,
            null, { "commentId": commentId, "state": "DELETED" },
            function(response, status) { processPostResponse(response, status, successCallBack, errorCallBack) });
    },

    createOrUpdatePratilipi: (pratilipi, successCallBack, errorCallBack) => {
        if (pratilipi == null) return;
        if (pratilipi["pratilipiId"] == null) pratilipi["oldContent"] = false;
        httpUtil.post(API_PREFIX + PRATILIPI_API,
            null,
            pratilipi,
            function(response, status) { processPostResponse(response, status, successCallBack, errorCallBack) });
    },

    loginUser: (email, password, successCallBack, errorCallBack) => {
        if (email == null || password == null) return;
        httpUtil.post(API_PREFIX + USER_LOGIN_API,
            null, { "email": email, "password": password },
            function(response, status) { processPostResponse(response, status, successCallBack, errorCallBack) });
    },

    loginGoogleUser: (googleIdToken, language, successCallBack, errorCallBack) => {
        if (googleIdToken == null) return;
        httpUtil.post(API_PREFIX + USER_LOGIN_GOOGLE_API,
            null, { "googleIdToken": googleIdToken, "language": language },
            function(response, status) { processPostResponse(response, status, successCallBack, errorCallBack) });
    },

    loginFacebookUser: (fbUserAccessToken, language, successCallBack, errorCallBack) => {
        if (fbUserAccessToken == null) return;
        httpUtil.post(API_PREFIX + USER_LOGIN_FACEBOOK_API,
            null, { "fbUserAccessToken": fbUserAccessToken, "language": language },
            function(response, status) { processPostResponse(response, status, successCallBack, errorCallBack) });
    },

    registerUser: (name, email, password, language, successCallBack, errorCallBack) => {
        if (name == null || email == null || password == null) return;
        httpUtil.post(API_PREFIX + USER_REGISTER_API,
            null, { "name": name, "email": email, "password": password, "language": language },
            function(response, status) { processPostResponse(response, status, successCallBack, errorCallBack) });
    },

    updateUserPassword: (password, newPassword, successCallBack, errorCallBack) => {
        if (password == null || newPassword == null) return;
        httpUtil.post(API_PREFIX + USER_PASSWORD_UPDATE_API,
            null, { "password": password, "newPassword": newPassword },
            function(response, status) { processPostResponse(response, status, successCallBack, errorCallBack) });
    },

    forgotPassword: (email, successCallBack, errorCallBack) => {
        if (email == null) return;
        httpUtil.post(API_PREFIX + USER_EMAIL_API,
            null, { "email": email, "sendPasswordResetMail": true },
            function(response, status) { processPostResponse(response, status, successCallBack, errorCallBack) });
    },

    resetUserPassword: (email, verificationToken, newPassword, successCallBack, errorCallBack) => {
        if (email == null || verificationToken == null || newPassword == null) return;
        httpUtil.post(API_PREFIX + USER_PASSWORD_UPDATE_API,
            null, { "email": email, "verificationToken": verificationToken, "newPassword": newPassword },
            function(response, status) { processPostResponse(response, status, successCallBack, errorCallBack) });
    },

    logoutUser: (successCallBack, errorCallBack) => {
        httpUtil.get(API_PREFIX + USER_LOGOUT_API,
            null,
            null,
            function(response, status) {
                status == 200 ? successCallBack(response) : errorCallBack(response); /* Logout is different from all other cases */
            });
    },

    updateNotificationState: (notificationId, state, successCallBack, errorCallBack) => {
        if (notificationId == null || state == null) return;
        httpUtil.patch(API_PREFIX + NOTIFICATION_API + "/" + notificationId,
            null, { "state": state },
            function(response, status) { processPostResponse(response, status, successCallBack, errorCallBack) });
    },

    getTags: (language, aCallBack) => {
        if (language == null) return;
        httpUtil.get(API_PREFIX + TAGS_API,
            null, { "language": language },
            function(response, status) { processGetResponse(response, status, aCallBack) });
    },

    updatePratilipiTags: (pratilipiId, type, tagIds, suggestedTags, successCallBack, errorCallBack) => {
        if (pratilipiId == null) return;
        httpUtil.post(API_PREFIX + PRATILIPI_TAGS_UPDATE_API,
            null, { "pratilipiId": pratilipiId, "type": type, "tagIds": JSON.stringify(tagIds), "suggestedTags": JSON.stringify(suggestedTags) },
            function(response, status) { processPostResponse(response, status, successCallBack, errorCallBack) });
    },

    reportContent: (name, email, phone, message, dataType, dataId, language, successCallBack, errorCallBack) => {
        if (name == null || name.trim() == "") return;
        if ((email == null || email.trim() == "") && (phone == null || phone.trim() == "")) return;
        if (message == null || message.trim() == "") return;
        let team = "AEE_" + language;
        var body = {
            "name": name,
            "team": team,
            "message": message,
            "language": language
        };
        if (email != null) body["email"] = email;
        if (phone != null) body["phone"] = phone;
        if (dataType != null && dataId != null) {
            body["data"] = JSON.stringify({
                "type": dataType,
                "id": dataId
            });
        }
        httpUtil.post(API_PREFIX + CONTACT_API,
            null,
            body,
            function(response, status) { processPostResponse(response, status, successCallBack, errorCallBack) });
    },

    getYesterdayTopAuthors: (language, resultCount, aCallBack) => {
        if (language == null) return;
        httpUtil.get(API_PREFIX + TOP_AUTHORS_API,
            null, { "language": language, "resultCount": resultCount || 20 },
            function(response, status) { processGetResponse(response, status, aCallBack) });
    },
    uploadCoverImage: (formData, authorId, successCallBack, errorCallBack) => {
        if (formData == null) return;
        if (authorId == null) return;

        httpUtil.postMultipart(API_PREFIX + '/author/cover?authorId=' + authorId,
            null,
            formData,
            function(response, status) { processPostResponse(response, status, successCallBack, errorCallBack) });
    },

    uploadProfileImage: (formData, authorId, successCallBack, errorCallBack) => {
        if (formData == null) return;
        if (authorId == null) return;

        httpUtil.postMultipart(API_PREFIX + '/author/image?authorId=' + authorId,
            null,
            formData,
            function(response, status) { processPostResponse(response, status, successCallBack, errorCallBack) });
    },

    uploadPratilipiImage: (formData, pratilipiId, successCallBack, errorCallBack) => {
        if (formData == null) return;
        if (pratilipiId == null) return;




        httpUtil.postMultipart(API_PREFIX + '/pratilipi/cover?pratilipiId=' + pratilipiId,
            null,
            formData,
            function(response, status) { processPostResponse(response, status, successCallBack, errorCallBack) });
    },

    uploadEventPratilipiImage: (formData, successCallBack, errorCallBack) => {
        httpUtil.postMultipart(API_PREFIX + '/event-participate/images?type=' + 'PRATILIPI',
            null,
            formData,
            function(response, status) { processPostResponse(response, status, successCallBack, errorCallBack) });
    },

    getTrendingSearchKeywords: function( language, aCallBack ) {
        httpUtil.get( API_PREFIX + SEARCH_PREFIX + SEARCH_TRENDING_API,
            null,
            { "language": language },
            function( response, status ) { processGetResponse( response, status, aCallBack ) } );
    },

    getInitialSearchResults: function( searchQuery, language, aCallBack ) {

        if( searchQuery == null ) return;
        httpUtil.get( API_PREFIX +  SEARCH_PREFIX + SEARCH_CORE_API,
            null,
            { "language": language, "text": searchQuery.trim() },
            function( response, status ) { processGetResponse( response, status, aCallBack ) } );
    },

    getPratilipiSearchResults: function( searchQuery, cursor, resultCount, language, aCallBack ) {
        if( searchQuery == null || cursor == null ) return;
        httpUtil.get( API_PREFIX + SEARCH_CORE_API,
            null,
            { "language": language,
                "text": searchQuery.trim(),
                "pratilipiCursor": cursor,
                "pratilipiResultCount": resultCount != null ? resultCount : 20,
                "authorResultCount": 0 },
            function( response, status ) { processGetResponse( response, status, aCallBack ) } );
    },


    getEventPratilipiById: (eventPratilipiId, aCallBack) => {
        httpUtil.get( API_PREFIX + EVENT_PARTICIPATE_PREFIX + EVENT_PARTICIPATE_GET,
            null,
            {
                eventPratilipiId
            },
            function( response, status ) { processGetResponse( response, status, aCallBack ) });
    },

    getEventPratilipiList: (eventId, aCallBack) => {
        httpUtil.get( API_PREFIX + EVENT_PARTICIPATE_PREFIX + EVENT_PARTICIPATE_LIST,
            null,
            { eventId },
            function( response, status ) { processGetResponse( response, status, aCallBack ) });
    },

    getDraftedEventPratilipis: (eventId, aCallBack) => {
        httpUtil.get( API_PREFIX + EVENT_PARTICIPATE_PREFIX + EVENT_PARTICIPATE_LIST,
            null,
            { eventId, state: 'DRAFTED' },
            function( response, status ) { processGetResponse( response, status, aCallBack ) });
    },

    createEventPratilipi: ({ language, title, titleEn, type, eventId }, successCallBack, errorCallBack) => {
        httpUtil.post( API_PREFIX + EVENT_PARTICIPATE_PREFIX + EVENT_PARTICIPATE_CREATE,
            null,
            {
                language,
                title,
                titleEn,
                eventId,
                type
            },
            function( response, status ) { processPostResponse( response, status, successCallBack, errorCallBack) } );
    },
    updateEventPratilipi: (eventPratilipiId, { language, title, titleEn, type }, successCallBack, errorCallBack) => {
        httpUtil.post( API_PREFIX + EVENT_PARTICIPATE_PREFIX + EVENT_PARTICIPATE_UPDATE,
            null,
            {
                language,
                title,
                titleEn,
                type,
                eventPratilipiId
            },
            function( response, status ) { processPostResponse( response, status, successCallBack, errorCallBack ) } );
    },

    updateEventPratilipiDesc: (eventPratilipiId, { description, state }, successCallBack, errorCallBack) => {
        httpUtil.post( API_PREFIX + EVENT_PARTICIPATE_PREFIX + EVENT_PARTICIPATE_UPDATE,
            null,
            {
                description,
                eventPratilipiId,
                state
            },
            function( response, status ) { processPostResponse( response, status, successCallBack, errorCallBack ) } );
    },

    bulkSaveChapters: (eventPratilipiId, contents, successCallBack, errorCallBack) => {
        httpUtil.post( API_PREFIX + EVENT_PARTICIPATE_PREFIX + EVENT_PARTICIPATE_CONTENT,
            null,
            { contents: encodeURIComponent(contents), eventPratilipiId },
            function( response, status ) { processPostResponse( response, status, successCallBack, errorCallBack ) } );
    },
    getEventPratilipiContent: (eventPratilipiId, aCallBack) => {
        httpUtil.get( API_PREFIX + EVENT_PARTICIPATE_PREFIX + EVENT_PARTICIPATE_CONTENT,
            null,
            {
                eventPratilipiId
            },
            function( response, status ) { processGetResponse( response, status, aCallBack ) });
    },

    getAdminEventPratilipis: (query, aCallBack) => {
        httpUtil.get( API_PREFIX + EVENT_PARTICIPATE_PREFIX_ADMIN + EVENT_PARTICIPATE_LIST,
            null,
            query,
            function( response, status ) { processGetResponse( response, status, aCallBack ) });
    },

    getAdminEventPratilipi: (eventPratilipiId, aCallBack) => {
        httpUtil.get( API_PREFIX + EVENT_PARTICIPATE_PREFIX_ADMIN + EVENT_PARTICIPATE_GET,
            null,
            { eventPratilipiId },
            function( response, status ) { processGetResponse( response, status, aCallBack ) });
    },

    publishAdminEventPratilipi: (id, successCallBack, errorCallBack) => {
        httpUtil.post( API_PREFIX + EVENT_PARTICIPATE_PREFIX_ADMIN + EVENT_PARTICIPATE_PUBLISH,
            null,
            { id },
            function( response, status ) { processPostResponse( response, status, successCallBack, errorCallBack ) } );
    },

    getAuthorByUserId: (userId, aCallBack) => {
        httpUtil.get( API_PREFIX + AUTHOR_NEW_API,
            null,
            {
                userId
            },
            function( response, status ) { processGetResponse( response, status, aCallBack ) });
    },

    updateAdminEventPratilipi: (data, successCallBack, errorCallBack) => {
        httpUtil.post( API_PREFIX + EVENT_PARTICIPATE_PREFIX_ADMIN + EVENT_PARTICIPATE_UPDATE,
            null,
            data,
            function( response, status ) { processPostResponse( response, status, successCallBack, errorCallBack ) } );
    },

    createOrUpdateFCMToken: (fcmToken, language, successCallBack, errorCallBack) => {
        httpUtil.post( API_PREFIX + WEB_DEVICES_API,
            null,
            { fcmToken: JSON.stringify(fcmToken), language },
            function( response, status ) { processPostResponse( response, status, successCallBack, errorCallBack ) } );
    },

    postMarketingNewsletterUnsubscribe: (uuid, newsletterFrequency, newsletterUnsubscribeReason, successCallBack, errorCallBack) => {
        httpUtil.post( API_PREFIX + MARKETING_API,
            null,
            { uuid, newsletterFrequency, newsletterUnsubscribeReason },
            function( response, status ) { processPostResponse( response, status, successCallBack, errorCallBack ) } );
    },

    postReadingPercent: (pratilipiId, chapterNo, percentageScrolled, index, successCallBack, errorCallBack) => {
        for (var key in index) {
            delete index[key].title;
        }
        let params = {
            "pratilipiId": pratilipiId,
            "chapterNo": chapterNo,
            "percentageScrolled": percentageScrolled,
            "index": JSON.stringify(index),
            "agent": "Web"
        };
        httpUtil.post(API_PREFIX + READ_PERCENTAGE_API,
            null,
            params,
            function (response, status) {
                processPostResponse(response, status, successCallBack, errorCallBack)
            });
    },

    getJokeOfTheDay: (language, aCallBack) => {
        httpUtil.get(API_PREFIX + INIT_API_VAPSI,
            null,
            {
                "language": language,
                "vapsiType": "JOKE"
            },
            function (response, status) {
                processGetResponse(response, status, aCallBack);
            });
    },

    getQuoteOfTheDay: (language, aCallBack) => {
        httpUtil.get(API_PREFIX + INIT_API_VAPSI,
            null,
            {
                "language": language,
                "vapsiType": "QUOTE"
            },
            function (response, status) {
                processGetResponse(response, status, aCallBack);
            });
    },

    getHoroscopeOfTheDay: (language, aCallBack) => {
        httpUtil.get(API_PREFIX + INIT_API_VAPSI,
            null,
            {
                "language": language,
                "vapsiType": "HOROSCOPE"
            },
            function (response, status) {
                processGetResponse(response, status, aCallBack);
            });
    }
};
