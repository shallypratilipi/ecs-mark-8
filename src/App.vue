<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    import '@/static_scripts/google_analytics.js'
    import '@/static_scripts/facebook_analytics.js'
    import constants from '@/constants'

    import mixins from '@/mixins';
    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: 'App',
        methods: {

            ...mapActions('searchpage', [
                'fetchTrendingSearch'
            ]),
            ...mapActions([
                'fetchUserDetails',
                'fetchInitialNotifications',
                'setNotificationCount',
                'attachMessageNotificationListener',
                'setFirebaseGrowthDBInitialisedTrue'
                
            ]),

            setGuestUserProperties() {
                this.setAnalyticsUserProperty('USER_ID', "0");
                this.setAnalyticsUserProperty('IS_LOGGED_IN', "NO");
            },

            setLoggedInUserProperties() {
                this.setAnalyticsUserProperty('USER_ID', this.getUserDetails.userId || "0");
                this.setAnalyticsUserProperty('IS_LOGGED_IN', "YES");
                this.setAnalyticsUserProperty('AUTHOR_ID', this.getUserDetails.authorId);
            },

            initializeFbAsyncInit() {
                const that = this;
                window.fbAsyncInit = function() {
                    FB.init({
                        appId: process.env.FACEBOOK_APP_ID,
                        cookie: true,
                        xfbml: true,
                        autoLogAppEvents: false,
                        version: process.env.FACEBOOK_SDK_VERSION
                    });

                    window.fbApiInit = true;
                    FB.AppEvents.logPageView();
                    if (!that.getUserDetails.isGuest) {
                        that.setLoggedInUserProperties();
                    } else {
                        that.setGuestUserProperties();
                    }
                    that.setAnalyticsUserProperty('ENVIRONMENT', 'PROD');
                    that.setAnalyticsUserProperty('CONTENT_LANGUAGE', that.getCurrentLanguage().fullName.toUpperCase());
                };
            }
        },
        computed: {
            ...mapGetters([
                'getUserDetails'
            ])
        },
        mixins: [
            mixins
        ],
        watch: {
            'getUserDetails.isGuest'(isGuest) {
                if (!isGuest) {
                    const that = this;
                    this.fetchInitialNotifications({ language: this.getCurrentLanguage().fullName.toUpperCase(), resultCount: 10 });
                    import('firebase').then((firebase) => {
                        if (firebase.apps.length === 0) {
                            const config = {
                                apiKey: process.env.FIREBASE_API_KEY,
                                authDomain: process.env.FIREBASE_AUTH_DOMAIN,
                                databaseURL: process.env.FIREBASE_DATABASE_URL,
                                storageBucket: process.env.FIREBASE_STORAGE_BUCKET
                            };
                            firebase.initializeApp(config);

                            firebase.auth().onAuthStateChanged( function( fbUser ) {
                                if( fbUser ) {
                                    console.log("Firebase Default App Login Success ");
                                    var newNotificationCountNode = firebase.database().ref( "NOTIFICATION" ).child( fbUser.uid ).child( "newNotificationCount" );
                                    newNotificationCountNode.on( 'value', function( snapshot ) {
                                        var newNotificationCount = snapshot.val() != null ? snapshot.val() : 0;
                                        that.setNotificationCount(newNotificationCount);
                                    });
                                } else {
                                    console.log("Non Logged-In FB User. Firebase token : ", that.getUserDetails.firebaseToken);
                                    firebase.auth().signInWithCustomToken( that.getUserDetails.firebaseToken ).catch(function(error) {
                                        console.log("Error in Firebase logging in. ", error);
                                    });
                                }
                            });

                            const configGrowth = {
                                apiKey: process.env.FIREBASE_API_KEY,
                                authDomain: process.env.FIREBASE_AUTH_DOMAIN,
                                databaseURL: process.env.FIREBASE_GROWTH_DATABASE_URL,
                                projectId: process.env.FIREBASE_PROJECT_ID,
                                storageBucket: process.env.FIREBASE_STORAGE_BUCKET
                            };

                            var growthFirebaseApp = firebase.initializeApp(configGrowth, "FirebaseGrowth");

                            firebase.auth(growthFirebaseApp).onAuthStateChanged( function( fbUser ) {
                                if( fbUser ) {
                                    console.log("Firebase Growth App Login Success ");
                                    that.setFirebaseGrowthDBInitialisedTrue();
                                    that.attachMessageNotificationListener(that.getUserDetails.userId);
                                } else {
                                    console.log("Non Logged-In FB User. Firebase token : ", that.getUserDetails.firebaseToken);
                                    firebase.auth(growthFirebaseApp).signInWithCustomToken( that.getUserDetails.firebaseToken ).catch(function(error) {
                                        console.log("Error in Firebase logging in. ", error);
                                    });
                                }
                            });
                        }

                    });
                    this.setLoggedInUserProperties();
                } else {
                    this.setGuestUserProperties();
                }

                this.initializeFbAsyncInit();
            }
        },
        created() {
            this.fetchUserDetails();
            const that = this;
            if (this.getUserDetails.isGuest !== undefined || this.getUserDetails.isGuest !== null) {
                this.initializeFbAsyncInit();
            }
            const currentLocale = process.env.LANGUAGE;
            constants.LANGUAGES.forEach((eachLanguage) => {
            if (eachLanguage.shortName === currentLocale) {
                this.fetchTrendingSearch(eachLanguage.fullName.toUpperCase());
            }
            });
        },


    }
</script>

<style>
    #app {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #212121;
    }

    html, body {
        margin: 0;
    }
</style>
