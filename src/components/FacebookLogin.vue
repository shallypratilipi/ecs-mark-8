<template>
    <button @click="loginToFacebook" type="button" name="button" class="fb"><icon name="facebook-f"></icon>__("facebook")</button>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import mixins from '@/mixins';

export default {
    name: 'Facebook-Login-Button',
    mixins: [
        mixins
    ],
    methods: {
        ...mapActions([
            'loginUserWithFacebookAccessToken'
        ]),
        loginToFacebook() {
            const that = this;
            FB.login( function( fbResponse ) {
                if( fbResponse == null || fbResponse.authResponse == null ) {
                    return;
                }
                that.loginUserWithFacebookAccessToken({ facebookAccessToken: fbResponse.authResponse.accessToken, language: that.getCurrentLanguage().fullName.toUpperCase() });
            }, { scope: 'public_profile,email,user_birthday' } );
        }
    },
    components: {

    },
    created() {
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
