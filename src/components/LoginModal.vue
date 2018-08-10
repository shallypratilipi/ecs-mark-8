<template>
    <!-- Modal -->
    <div class="modal fade summary-modal" id="login_modal" tabindex="-1" role="dialog" aria-labelledby="summary-modalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-body login">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <button type="button" v-if="currentStep !== 'LANDED_LOGIN'" class="back" @click="goToFirstStep">
                        <span aria-hidden="true"><i class="material-icons">arrow_back</i></span>
                    </button>
                    <div class="login-menu">
                        <a href="#" class="signup active" v-if="currentStep === 'REGISTRATION'" data-tab="signup">__("user_sign_up")</a>
                        <a href="#" class="signin active" v-else data-tab="signin">__("user_sign_in")</a>
                    </div>
                    <Login :openForgotPasswordInTab="true"></Login>
                    <Register :currentStep="currentStep" :changeCurrentStep="changeCurrentStep" :openForgotPasswordInTab="true"></Register>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Login from '@/components/Login';
import mixins from '@/mixins';
import Register from '@/components/AppLogin';

export default {
    name: 'login-modal',
    data() {
        return {
            email: '',
            password: '',
            currentStep: 'LANDED_LOGIN'
        }
    },
    computed: {
        ...mapGetters([
            'getUserDetails',
            'getLoginSource',
            'getSignupSource'
        ])
    },
    mixins: [
        mixins
    ],
    watch:{
        'getUserDetails.isGuest'(value) {
            if (!value) {
                $('#login_modal').modal('hide');
                $(".overlay, .overlay-1, .overlay-2").hide();

                switch(this.getLoginSource) {
                    case 'EMAIL':
                        this.triggerAnanlyticsEvent('SIGNINSUC_EMAIL_GLOBAL', 'CONTROL', {
                            'USER_ID': this.getUserDetails.userId
                        });
                        break;
                }

                switch(this.getSignupSource) {
                    case 'EMAIL':
                        this.triggerAnanlyticsEvent('SIGNUPSUC_EMAIL_GLOBAL', 'CONTROL', {
                            'USER_ID': this.getUserDetails.userId
                        });
                        break;
                    case 'FACEBOOK':
                        this.triggerAnanlyticsEvent('SIGNUPSUC_FACEBOOK_GLOBAL', 'CONTROL', {
                            'USER_ID': this.getUserDetails.userId
                        });
                        break;
                    case 'GOOGLE':
                        this.triggerAnanlyticsEvent('SIGNUPSUC_GOOGLE_GLOBAL', 'CONTROL', {
                            'USER_ID': this.getUserDetails.userId
                        });
                        break;
                }
            }
        }
    },
    methods: {
        ...mapActions([
            'loginUser'
        ]),
        changeCurrentStep(step) {
            this.currentStep = step;
        },
        goToFirstStep() {
            this.currentStep = 'LANDED_LOGIN';
        },
        tabsignup(event) {
            event.preventDefault();
            var tab_id = $(event.currentTarget).attr('data-tab');
            $(".login-menu a").removeClass("active");
            $(".signup").addClass("active");
            $(".forms").hide();
            $("#" + tab_id).show();

            this.triggerAnanlyticsEvent('LANDED_REGISTERM_GLOBAL', 'CONTROL', {
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

            this.triggerAnanlyticsEvent('LANDED_LOGINM_GLOBAL', 'CONTROL', {
                'USER_ID': this.getUserDetails.userId
            });
        }
    },
    components: {
        Login,
        Register
    }
}

</script>

<style lang="scss" scoped>
div#login_modal {
    margin-top: 40px;
}
button.close {
    position: absolute;
    right: 10px;
    top: 5px;
}
button.back {
    position: absolute;
    left: 10px;
    border: none;
    background: transparent;
    top: 5px;

    i {
        text-shadow: 0 1px 0 #fff;
        font-size: 16px;
    }
}
.modal-body.login {
    padding: 0 10px;
    max-height: initial;
}
.login-menu {
    border-bottom: 1px solid #e9e9e9;
    padding: 8px 0 10px;
    text-align: center;
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
</style>
