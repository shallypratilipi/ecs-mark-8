<template>
    <div>
        <div class="forms" id="signup" v-if="currentStep === 'LANDED_LOGIN'">
            <div class="pratilipi-logo">
                <img src="../assets/pratilipi_logo.png" />
                <br>
                <span>__("welcome_pratilipi")</span>
                <p class="subtitle">__("about_pratilipi")</p>
            </div>
            <div class="social-login">
                <FacebookLogin></FacebookLogin>
                <GoogleLogin></GoogleLogin>
            </div>
            <div class="or">__("or")</div>
            <p class="validation_error" v-if="(getLoginError && getLoginError.message)">
                <i class="material-icons">error</i>
                <span v-if="(getLoginError && getLoginError.message)">{{ getLoginError.message | getTranslatedLoginErrorMessage }}</span>
            </p>
            <div class="form-group">
                <p class="validation_error" v-if="emailIsInvalid || (getLoginError && getLoginError.email)">
                    <i class="material-icons">error</i>
                    <span v-if="(getLoginError && getLoginError.email)">{{ getLoginError.email }}</span>
                    <span v-else>__("email_entered_incorrectly")</span>
                </p>
                <input type="email" @keyup.enter="checkEmailAndGoToSecondStep" :class="{error: emailIsInvalid || (getLoginError && getLoginError.email) }" v-model="email" class="form-control" :placeholder="'__("user_email")'">
                <button type="button" @click="checkEmailAndGoToSecondStep">
                    <span>__("user_sign_in")</span>
                    <i class="material-icons">keyboard_arrow_right</i>
                </button>
            </div>
        </div>

        <div class="forms" id="signup-form" v-if="currentStep === 'REGISTRATION'">
            <form>
                <p class="validation_error" v-if="(getLoginError && getLoginError.message)">
                    <i class="material-icons">error</i>
                    <span v-if="(getLoginError && getLoginError.message)">{{ getLoginError.message | getTranslatedLoginErrorMessage }}</span>
                </p>
                <div class="form-group">
                    <p class="validation_error" v-if="nameIsInvalid || (getLoginError && getLoginError.name)">
                        <i class="material-icons">error</i>
                        <span v-if="(getLoginError && getLoginError.name)">{{ getLoginError.name }}</span>
                        <span v-else>__("name_required")</span>
                    </p>
                    <input type="text" :class="{error: nameIsInvalid || (getLoginError && getLoginError.name) }" v-model="name" class="form-control" :placeholder="'__("user_full_name")'">
                </div>
                <div class="form-group">
                    <p class="validation_error" v-if="emailIsInvalid || (getLoginError && getLoginError.email)">
                        <i class="material-icons">error</i>
                        <span v-if="(getLoginError && getLoginError.email)">{{ getLoginError.email }}</span>
                        <span v-else>__("email_entered_incorrectly")</span>
                    </p>
                    <input type="email" :class="{error: emailIsInvalid || (getLoginError && getLoginError.email) }" v-model="email" class="form-control" :placeholder="'__("user_email")'">
                </div>
                <div class="form-group">
                    <p class="validation_error" v-if="passwordIsInvalid || (getLoginError && getLoginError.password)">
                        <i class="material-icons">error</i>
                        <span v-if="(getLoginError && getLoginError.password)">{{ getLoginError.password }}</span>
                        <span v-else>__("password_minimum")</span>
                    </p>
                    <input autocomplete="new-password" :class="{error: passwordIsInvalid || (getLoginError && getLoginError.password) }" v-model="password" type="password" class="form-control" :placeholder="'__("user_password")'">
                </div>


                <button type="button" @click="verifyAndSignupUser({ name, email, password, language: getCurrentLanguage().fullName.toUpperCase() })" class="btn sign-in">__("user_sign_up")</button>
                <div class="or">__("or")</div>
                <button type="button" @click="goToSignin()" class="btn sign-up">__("user_sign_in")</button>

                <span class="terms-section">__("register_part_1") <a href="/privacy-policy" target="_blank">__("footer_privacy_policy")</a> __("register_part_2") <a href="/terms-of-service" target="_blank">__("footer_terms_of_service")</a> __("register_part_3")</span>
                <!-- <div class="terms-section">
                    <span>__("user_is_registered")</span>
                    <a href="#" v-on:click="tabsignin" data-tab="signin">__("user_to_sign_in")</a>
                </div> -->
            </form>
        </div>

        <div class="forms" id="signin-form" v-if="currentStep === 'LOGIN'">
            <form id="formToSubmit">
                <p class="validation_error" v-if="(getLoginError && getLoginError.message)">
                    <i class="material-icons">error</i>
                    <span v-if="(getLoginError && getLoginError.message)">{{ getLoginError.message | getTranslatedLoginErrorMessage }}</span>
                </p>
                <div class="form-group">
                    <p class="validation_error" v-if="emailIsInvalid || (getLoginError && getLoginError.email)">
                        <i class="material-icons">error</i>
                        <span v-if="(getLoginError && getLoginError.email)">{{ getLoginError.email }}</span>
                        <span v-else>__("email_entered_incorrectly")</span>
                    </p>
                    <input type="email" :class="{error: emailIsInvalid || (getLoginError && getLoginError.email) }" class="form-control" v-model="email" :placeholder="'__("user_email")'">
                </div>
                <div class="form-group">
                    <p class="validation_error" v-if="passwordIsInvalid || (getLoginError && getLoginError.password)">
                        <i class="material-icons">error</i>
                        <span v-if="(getLoginError && getLoginError.password)">{{ getLoginError.password }}</span>
                        <span v-else>__("password_minimum")</span>
                    </p>
                    <input type="password" :class="{error: passwordIsInvalid || (getLoginError && getLoginError.password) }" class="form-control" v-model="password" :placeholder="'__("user_password")'">
                    <a v-if="!openForgotPasswordInTab" @click="triggerEventAndOpenForgotPasswordModal" href="#" class="forgot-pass">__("user_forgot_password")</a>
                    <router-link v-else :to="'/login#forgot-pass'" target="_blank" class="forgot-pass">__("user_forgot_password")</router-link>
                </div>

                <button type="button" @click="validateAndLoginUser({email, password})" class="btn sign-in">__("user_sign_in")</button>
                <div class="or">__("or")</div>
                <button type="button" @click="goToSignup()" class="btn sign-up">__("user_sign_up")</button>
                <ForgetPassword></ForgetPassword>
                <!-- <div class="terms-section">
                    <span>__("user_is_new")</span>
                    <a href="#" v-on:click="tabsignup" data-tab="signup">__("user_sign_up_for_pratilipi")</a>
                </div> -->
            </form>
        </div>

        <div class="spinner-overlay" v-if="getLoginLoadingState === 'LOADING'">
            <Spinner></Spinner>
        </div>
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import GoogleLogin from '@/components/GoogleLogin';
import FacebookLogin from '@/components/FacebookLogin';
import Spinner from '@/components/Spinner.vue';
import ForgetPassword from '@/components/ForgetPasswordModal';
import mixins from '@/mixins';

export default {
    name: 'Registration-Form',
    mixins: [
        mixins
    ],
    data() {
        return {
            email: '',
            password: '',
            name: '',
            emailIsInvalid: false,
            passwordIsInvalid: false,
            nameIsInvalid: false
        }
    },
    props: {
        openForgotPasswordInTab: {
            type: Boolean,
            required: false,
            default: false
        },
        currentStep: {
            required: true,
            type: String
        },
        changeCurrentStep: {
            required: true,
            type: Function
        }
    },
    methods: {
        ...mapActions([
            'signupUser',
            'checkIfUserValid'
        ]),
        goToSignup() {
            this.changeCurrentStep('LANDED_LOGIN');
        },
        goToSignin() {
            this.changeCurrentStep('LOGIN');
        },
        checkEmailAndGoToSecondStep() {
            console.log('this is getting fired');

            this.emailIsInvalid = !this.validateEmail(this.email);

            if (this.emailIsInvalid) {
                return;
            }

            this.checkIfUserValid(this.email);
        },
        verifyAndSignupUser(data) {
            const { name, email, password } = data;

            this.nameIsInvalid = !this.validateUsername(name);
            this.emailIsInvalid = !this.validateEmail(email);
            this.passwordIsInvalid = !this.validatePassword(password);

            if (!this.emailIsInvalid && !this.passwordIsInvalid && !this.nameIsInvalid) {
                this.signupUser(data);
            }
        },
        validateAndLoginUser({ email, password }) {


            this.emailIsInvalid = !this.validateEmail(email);
            this.passwordIsInvalid = !this.validatePassword(password);
            if (!this.emailIsInvalid && !this.passwordIsInvalid) {
                this.loginUser({ email, password });
            }
        },
        tabsignin(event) {
            event.preventDefault();
            var tab_id = $(event.currentTarget).attr('data-tab');
            $(".login-menu a").removeClass("active");
            $(".signin").addClass("active");
            $(".forms").hide();
            $("#" + tab_id).show();
        },
        triggerEventAndOpenForgotPasswordModal() {
            this.openForgotPasswordModal();
            this.triggerAnanlyticsEvent('LANDED_FORGOTPM_FORGOTP', 'CONTROL', {});
        }
    },
    watch: {
        'currentStep'() {
            this.nameIsInvalid = false;
            this.emailIsInvalid = false;
            this.passwordIsInvalid = false;
        },

        'getEmailCheckingStatus.loading_state'(loadingState) {
            if (loadingState === 'LOADING_SUCCESS' && this.getEmailCheckingStatus.is_valid) {
                this.changeCurrentStep('LOGIN');
            } else if(loadingState === 'LOADING_SUCCESS' && !this.getEmailCheckingStatus.is_valid) {
                this.changeCurrentStep('REGISTRATION');
            } else if(loadingState === 'LOADING_ERROR') {
                this.emailIsInvalid = true;
            }
        }
    },
    computed: {
        ...mapGetters([
            'getLoginError',
            'getLoginLoadingState',
            'getEmailCheckingStatus'
        ])
    },
    components: {
        GoogleLogin,
        FacebookLogin,
        Spinner,
        ForgetPassword
    },
    created() {
    }
}
</script>

<style  lang="scss" scoped>
.forms {
    margin: 15px 10px;
    text-align: left;
    display: none;
    &#signup {
        display: block;
    }
    &#signup-form {
        display: block;
        .btn {
            width: 100%;
        }
    }
    &#signin-form {
        display: block;

        .btn.sign-in {
            margin-top: 10px;
            width: 100%;
        }

        .btn.sign-up {
            width: 100%;
        }
    }

    .pratilipi-logo {
        text-align: center;
        img {
            display: inline-block;
            height: 25%;
            width: 25%;
            padding-bottom: 10px;
        }

        p.subtitle {
            text-align: center;
            font-size: 12px;
            padding: 10px 0 10px 10px;
            margin-bottom: 5px;
        }
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

    .form-group {
        position: relative;
        i {
            display: inline-block;
            vertical-align: middle;
        }

        input {
            padding-right: 30%;
        }
        button {
            vertical-align: middle;
            display: inline-block;
            position: absolute;
            right: 0;
            bottom: 0;
            color: #d00b12;
            padding: 5px;

            span {
                font-size: 14px;
            }
        }
    }
    .forgot-pass, .footlink {
        font-size: 12px;
        color: #212529;
    }
    .forgot-pass {
        float: right;
        padding-top: 5px;
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
.validation_error {
    margin: 5px 5px 5px 0;
    font-size: 12px;
    color: #d00b12;
    i {
        font-size: 16px;
        vertical-align: middle;
    }
    span {
        vertical-align: middle;
    }
}
.form-control.error {
    border-color: #d00b12;
}
.spinner-overlay {
    position: absolute;
    top: 0;
    background: rgba(255,255,255,0.8);
    width: 100%;
    height: 100%;
    .spinner {
        top: 42%;
        position: absolute;
    }
}
</style>
