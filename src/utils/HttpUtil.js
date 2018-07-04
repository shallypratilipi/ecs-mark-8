/* HttpUtil */
const httpUtil = {

    get: (aUrl, headers, params, aCallback) => {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() {
            if (anHttpRequest.readyState == 4 && aCallback != null)
                aCallback(processResponseText(anHttpRequest.responseText), anHttpRequest.status);
        };
        anHttpRequest.open("GET", aUrl + (aUrl.indexOf("?") > -1 ? "&" : "?") + formatParams(params), true);
        anHttpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        /**
        Need to look for an alternative
        **/

        if ((window.location.origin.indexOf(".pratilipi.com") === -1 && window.location.origin.indexOf(".ptlp.co")) === -1) {
            headers = headers || {};
            headers["AccessToken"] = headers["AccessToken"] || getCookie("access_token");
        }

        if (headers != null) {
            for (var key in headers)
                if (headers.hasOwnProperty(key))
                    anHttpRequest.setRequestHeader(key, headers[key]);
        }
        anHttpRequest.send(null);
    },

    post: (aUrl, headers, params, aCallback) => {
        if ('onLine' in navigator) {
            if (!navigator['onLine']) {
                aCallback({ "message": "${ _strings.could_not_connect_server }" }, 0);
                return;
            }
        }
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() {
            if (anHttpRequest.readyState == 4 && aCallback != null)
                aCallback(processResponseText(anHttpRequest.responseText), anHttpRequest.status);
        };
        anHttpRequest.open("POST", aUrl, true);
        anHttpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        /**
        Need to look for an alternative
        **/
        if ((window.location.origin.indexOf(".pratilipi.com") === -1 && window.location.origin.indexOf(".ptlp.co")) === -1) {
            headers = headers || {};
            headers["AccessToken"] = headers["AccessToken"] || getCookie("access_token");
        }

        if (headers != null) {
            for (var key in headers)
                if (headers.hasOwnProperty(key))
                    anHttpRequest.setRequestHeader(key, headers[key]);
        }
        anHttpRequest.send(formatParams(params));
    },

    postMultipart: (aUrl, headers, formData, aCallback) => {
        if ('onLine' in navigator) {
            if (!navigator['onLine']) {
                aCallback({ "message": "${ _strings.could_not_connect_server }" }, 0);
                return;
            }
        }
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() {
            if (anHttpRequest.readyState == 4 && aCallback != null)
                aCallback(processResponseText(anHttpRequest.responseText), anHttpRequest.status);
        };
        anHttpRequest.open("POST", aUrl);

        /**
        Need to look for an alternative
        **/
        if ((window.location.origin.indexOf(".pratilipi.com") === -1 && window.location.origin.indexOf(".ptlp.co")) === -1) {
            headers = headers || {};
            headers["AccessToken"] = headers["AccessToken"] || getCookie("access_token");
        }

        if (headers != null) {
            for (var key in headers)
                if (headers.hasOwnProperty(key))
                    anHttpRequest.setRequestHeader(key, headers[key]);
        }
        anHttpRequest.send(formData);
    },

    patch: (aUrl, headers, params, aCallback) => {
        if ('onLine' in navigator) {
            if (!navigator['onLine']) {
                aCallback({ "message": "${ _strings.could_not_connect_server }" }, 0);
                return;
            }
        }
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() {
            if (anHttpRequest.readyState == 4 && aCallback != null)
                aCallback(processResponseText(anHttpRequest.responseText), anHttpRequest.status);
        };
        anHttpRequest.open("PATCH", aUrl, true);
        anHttpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        /*
        Need to look for an alternative
        */
        if ((window.location.origin.indexOf(".pratilipi.com") === -1 && window.location.origin.indexOf(".ptlp.co")) === -1) {
            headers = headers || {};
            headers["AccessToken"] = headers["AccessToken"] || getCookie("access_token");
        }
        

        if (headers != null) {
            for (var key in headers)
                if (headers.hasOwnProperty(key))
                    anHttpRequest.setRequestHeader(key, headers[key]);
        }
        anHttpRequest.send(formatParams(params));
    }

};


function processResponseText(repsonseText) {
    var res = {};
    try {
        res = JSON.parse(repsonseText);
    } catch (err) {
        res["message"] = "__('server_error_message')";
    }
    return res;
};


function formatParams(params) {
    if (params == null) return "";
    if (typeof(params) === "string") return params;
    return Object.keys(params).map(function(key) { return key + "=" + params[key] }).join("&");
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return null;
}

export { httpUtil, formatParams };
