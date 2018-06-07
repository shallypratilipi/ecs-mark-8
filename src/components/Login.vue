<template>
    <div>
        <div class="forms" id="signin">
            <div class="social-login">
                <FacebookLogin></FacebookLogin>
                <GoogleLogin></GoogleLogin>
            </div>
            <div class="or">__("or")</div>
            <form>
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
                </div>
                <button type="button" @click="validateAndLoginUser({email, password})" class="btn sign-in">__("user_sign_in")</button>
                <a v-if="!openForgotPasswordInTab" @click="triggerEventAndOpenForgotPasswordModal" href="#" class="forgot-pass">__("user_forgot_password")</a>



                <router-link v-else :to="'/login#forgot-pass'" target="_blank" class="forgot-pass">__("user_forgot_password")</router-link>
                <ForgetPassword></ForgetPassword>
                <div class="terms-section">
                    <span>__("user_is_new")</span>
                    <a href="#" v-on:click="tabsignup" data-tab="signup">__("user_sign_up_for_pratilipi")</a>
                </div>
            </form>
        </div>
        <div class="spinner-overlay" v-if="getLoginLoadingState === 'LOADING'">
            <Spinner></Spinner> 
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import mixins from '@/mixins';
import Spinner from '@/components/Spinner.vue';
import GoogleLogin from '@/components/GoogleLogin';
import FacebookLogin from '@/components/FacebookLogin';
import ForgetPassword from '@/components/ForgetPasswordModal'
export default {
    name: 'Login-Form',
    mixins: [
        mixins
    ],
    props: {
        openForgotPasswordInTab: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    data() {
        return {
            email: '',
            password: '',
            emailIsInvalid: false,
            passwordIsInvalid: false
        }
    },
    computed: {
        ...mapGetters([
            'getLoginError',
            'getLoginLoadingState',
            'getUserDetails'
        ])
    },
    methods: {
        ...mapActions([
            'loginUser'
        ]),
        tabsignup(event) {
            event.preventDefault();        
            var tab_id = $(event.currentTarget).attr('data-tab');
            $(".login-menu a").removeClass("active");
            $(".signup").addClass("active");
            $(".forms").hide();
            $("#" + tab_id).show();
        },
        validateAndLoginUser({ email, password }) {
            
            
            this.emailIsInvalid = !this.validateEmail(email);
            this.passwordIsInvalid = !this.validatePassword(password);
            if (!this.emailIsInvalid && !this.passwordIsInvalid) {
                this.loginUser({ email, password });
            }
        },
        triggerEventAndOpenForgotPasswordModal() {
            console.log("Modal fun activated");
            // this.openForgotPasswordModal();
            $('#forgotPassModal').modal('show');

            this.triggerAnanlyticsEvent('LANDED_FORGOTPM_FORGOTP', 'CONTROL', {
                'USER_ID': this.getUserDetails.userId
            });
        }
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