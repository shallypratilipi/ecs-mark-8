<template>
    <MainLayout>
        <div class="login-page page-wrap">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <h2>__("join_pratilipi")</h2>
                        <p class="subtitle">__("about_pratilipi")</p>
                    </div>
                    <div class="col-lg-6 col-md-12">
                        <div class="card">
                            <div class="login-menu">
                                <a href="#" class="signup active" v-on:click="tabsignup" data-tab="signup">__("user_sign_up")</a>
                                <a href="#" class="signin" v-on:click="tabsignin" data-tab="signin">__("user_sign_in")</a>
                            </div>
                            
                            <Login></Login>
                            <Register></Register>
                            
                            <!-- Modal -->
                            <!--<ForgetPasswordModal></ForgetPasswordModal>-->

                        </div>
                    </div>

                    <div class="col-lg-6 col-md-12">
                        <div class="card">
                            <div class="head-title">__("login_benifits")</div>
                            <p><i class="material-icons">check_circle</i> __("pratilipi_feature_1")</p>
                            <p><i class="material-icons">check_circle</i> __("pratilipi_feature_2")</p>
                            <p><i class="material-icons">check_circle</i> __("pratilipi_feature_3")</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<script>
import MainLayout from '@/layout/main-layout.vue';
import Spinner from '@/components/Spinner.vue';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
// import ForgetPasswordModal from '@/components/ForgetPasswordModal.vue';
import mixins from '@/mixins';
import 'vue-awesome/icons/facebook-f'
import 'vue-awesome/icons/google'

import { mapGetters, mapActions } from 'vuex'

export default {
    components: {
        MainLayout,
        Spinner,
        Login,
        Register,
        // ForgetPasswordModal
    },
    mixins: [
        mixins
    ],
    data() {
        return {
            email: '',
            password: ''
        }
    },
    computed: {
        ...mapGetters([
            'getUserDetails',
            'getSignupSource',
            'getLoginSource'
        ])
    },
    watch:{
        'getUserDetails.isGuest'(isGuest) {

            switch(this.getLoginSource) {
                case 'EMAIL':
                    this.triggerAnanlyticsEvent('SIGNINSUC_EMAIL_LOGIN', 'CONTROL', {
                        'USER_ID': this.getUserDetails.userId
                    });
                    break;
            }

            switch(this.getSignupSource) {
                case 'EMAIL':
                    this.triggerAnanlyticsEvent('SIGNUPSUC_EMAIL_REGISTER', 'CONTROL', {
                        'USER_ID': this.getUserDetails.userId
                    });
                    break;
                case 'FACEBOOK':
                    this.triggerAnanlyticsEvent('SIGNUPSUC_FACEBOOK_REGISTER', 'CONTROL', {
                        'USER_ID': this.getUserDetails.userId
                    });
                    break;
                case 'GOOGLE':
                    this.triggerAnanlyticsEvent('SIGNUPSUC_GOOGLE_REGISTER', 'CONTROL', {
                        'USER_ID': this.getUserDetails.userId
                    });
                    break;
            }

            if (!isGuest) {
                this.$router.push(this.getUserDetails.profilePageUrl);
            }
        },
        '$route.hash'(newHash) {
            console.log(newHash);

            if (newHash === '#forgot-pass') {
                this.openForgotPasswordModal();
                this.triggerAnanlyticsEvent('LANDED_FORGOTPM_FORGOTP', 'CONTROL', {
                    'USER_ID': this.getUserDetails.userId
                });
            }
        },
        'getLoginSource'(source) {

        }
    },
    methods: {
        ...mapActions([
            'loginUser',
            'sendPasswordResetEmail'
        ]),
        tabsignup(event) {
            event.preventDefault();
            var tab_id = $(event.currentTarget).attr('data-tab');
            $(".login-menu a").removeClass("active");
            $(".signup").addClass("active");
            $(".forms").hide();
            $("#" + tab_id).show();

            this.triggerAnanlyticsEvent('LANDED_REGISTERM_REGISTER', 'CONTROL', {
                'USER_ID': this.getUserDetails.userId
            });
        },
        tabsignin(event) {
            event.preventDefault();        
            var tab_id = $(event.currentTarget).attr('data-tab');
            $(".login-menu a").removeClass("active");
            $(".signin").addClass("active");
            $(".forms").hide();
            $("#" + tab_id).show();

            this.triggerAnanlyticsEvent('LANDED_LOGINM_LOGIN', 'CONTROL', {
                'USER_ID': this.getUserDetails.userId
            });
        }
    },
    created() {
        if ( this.getUserDetails && this.getUserDetails.isGuest !== undefined && this.getUserDetails.isGuest !== true) {
            this.$router.push(this.getUserDetails.profilePageUrl)
        }
    },
    mounted() {
        if (this.$route.hash === '#forgot-pass') {
            this.openForgotPasswordModal();
            this.triggerAnanlyticsEvent('LANDED_FORGOTPM_FORGOTP', 'CONTROL', {
                'USER_ID': this.getUserDetails.userId
            });
        }
        this.triggerAnanlyticsEvent('LANDED_REGISTERM_REGISTER', 'CONTROL', {
            'USER_ID': this.getUserDetails.userId
        });

        // Hide Footer when keyboard comes
        if (this.isMobile()) {
            $(document).on('focus', 'input', function() {
                $(".footer-menu").css("height", "0")
            });
            $(document).on('blur', 'input', function() {
                $(".footer-menu").css("height", "51px")
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.login-page {
    margin-top: 85px;
    text-align: left;
    background: #f8f8f8;
    min-height: 700px;
    @media screen and (max-width: 992px ) {
        text-align: center;
        margin-top: 65px;
    }
    h2 {
        font-size: 20px;
        font-weight: bold;
        text-align: left;
        border-left: 3px solid #d0021b;
        padding-left: 10px;
        margin: 10px 0;
    }
    p.subtitle {
        text-align: left;
        font-size: 14px;
        padding: 0 10px;
        margin-bottom: 5px;
    }
    .head-title {
        font-size: 16px;
        font-weight: bold;
        text-align: left;
        border-left: 3px solid #d0021b;
        padding-left: 10px;
        margin: 10px 0 5px;
    }
    .col-md-12 {
        padding: 0;
    }
    .card {
        border-radius: 0;
        margin: 10px;
        padding-bottom: 10px;
        p {
            text-align: left;
            font-size: 14px;
            margin: 10px 10px 0;
            i {
                font-size: 16px;
                vertical-align: middle;
                color: #9E9E9E;
                padding-right: 5px;
            }
        }
    }
    .login-menu {
        border-bottom: 1px solid #e9e9e9;
        padding: 8px 0 10px;
        text-align: left;
        overflow: hidden;
        width: 100%;
        overflow-x: auto;
        white-space: nowrap;
        a {
            color: #555;
            font-size: 13px;
            border-bottom: 2px solid #fff;
            padding: 5px 5px 11px;
            span {
                font-size: 12px;
                font-weight: bold;
                padding: 0 2px;
                margin-right: 5px;
                display: inline-block;
                text-align: center;
            }
            &.active {
                color: #d0021b;
                border-color: #d0021b;
                span {
                    color: #d0021b;
                }
            }
            &:hover {
                text-decoration: none;
                color: #d0021b;
            }
        }
    }
    .forms {
        margin: 15px 10px;
        text-align: left;
        display: none;
        &#signup {
            display: block;
        }
        .or {
            display: flex;
            flex: 1;
            width: 100%;
            margin: 20px auto;
            line-height: 1em;
            font-size: 12px;
        }
        .or::before, .or::after {
            content: '';
            flex-grow: 1;
            margin: 0px 10px;
            background: linear-gradient(to right, #e9e9e9, #e9e9e9);
            background-size: 100% 1px;
            background-position: 0% 50%;
            background-repeat: repeat-x;
        }
        .or::before {
            margin-left: 0;
        }
        .or::after {
            margin-right: 0;
        }
        .forgot-pass, .footlink {
            font-size: 12px;
            margin-right: 10px;
            color: #212529;
        }
        .footlink {
            display: inline-block;
            margin: 10px 0;
        }
        .terms-section {
            font-size: 12px;
            display: block;
            margin: 10px 0;
            color: #212529;
        }
    }
    .sign-in {
        background: #d00b12;
        color: #fff;
        margin-right: 10px;
        &:hover {
            opacity: 0.9;
        }
    }
    #forgotPassModal {
        text-align: left;
        margin-top: 150px;
    }
    .social-login {
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
    }
}
</style>
