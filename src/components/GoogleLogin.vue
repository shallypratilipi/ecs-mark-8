<template>
    <button @click="loginToGoogle" type="button" name="button" class="google"><icon name="google"></icon>__("user_sign_in_with_google")</button>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import mixins from '@/mixins';

export default {
    name: 'Google-Login-Button',
    mixins: [
        mixins
    ],
    methods: {
        ...mapActions([
            'loginUserWithGoogleToken'
        ]),
        loginToGoogle() {
            const that = this;

            const googleClientId = process.env.GOOGLE_CLIENT_ID;
            gapi.auth2.init({
                client_id: `${googleClientId}`,
                cookiepolicy: 'single_host_origin',
                ux_mode: 'popup',
                prompt: 'select_account'
            }).then(() => {
                const GoogleAuth = gapi.auth2.getAuthInstance();
                GoogleAuth.signIn().then( function( googleUser ) {
                    console.log(GoogleAuth.currentUser.get());
                    that.loginUserWithGoogleToken({ googleIdToken: googleUser.getAuthResponse().id_token, language: that.getCurrentLanguage().fullName.toUpperCase() });
                }, function( error ) {
                    console.log( JSON.stringify( error, undefined, 2 ) );
                });
            });
        }
    },
    components: {
        
    },
    created() {

        if (document.getElementById('google-client-jssdk')) {
            return;
        }
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s);
            js.id = id;
            js.src = "//apis.google.com/js/api.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'google-client-jssdk'));
        document.getElementById('google-client-jssdk').onload = () => {
            gapi.load( 'auth2', () => {});
        }
    }
}
</script>

<style  lang="scss" scoped>
button.fb, button.google {
    background: #3b5998;
    color: #fff;
    display: block;
    width: 100%;
    height: 45px;
    max-width: 400px;
    margin: 10px auto;
    border-radius: 3px;
    border: 0;
    outline: none;
    text-align: left;
    font-size: 14px;
    cursor: pointer;
    &:hover {
        opacity: 0.9;
    }
    .fa-icon {
        vertical-align: middle;
        margin: 0 15px;
    }
}
button.google {
    background: #DD4B39;
}
</style>
