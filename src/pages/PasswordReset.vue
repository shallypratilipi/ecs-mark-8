<template>
    <MainLayout>
        <div class="static-page page-wrap">
            <div class="container">
                <div class="row">
                    <div class="col-md-12 col-lg-8">
                        <div class="card">
                            <div class="head-title">__("user_reset_password")</div>
                            <form>
                                <div class="form-row">
                                    <div class="form-group col-md-12">
                                        <label for="pratilipi-settings-new-password">__('user_new_password')</label>
                                         <p class="validation_error" v-if="passwordConfirm || passwordIsInvalid">
                                            <i class="material-icons">error</i>
                                            <span v-if="passwordConfirm">__("password_do_not_match")</span>
                                            <span v-else="passwordIsInvalid">__("password_minimum")</span>

                                        </p>
                                        <input type="password" class="form-control" @input="newPassword = $event.target.value" id="pratilipi-settings-new-password" placeholder="__('user_new_password')">
                                    </div>
                                    <div class="form-group col-md-12">
                                        <label for="pratilipi-settings-confirm-password">__('user_confirm_password') *</label>
                                           <p class="validation_error" v-if="passwordConfirm || passwordIsInvalid">
                                            <i class="material-icons">error</i>
                                            <span v-if="passwordConfirm">__("password_do_not_match")</span>
                                            <span v-else="passwordIsInvalid">__("password_minimum")</span>

                                        </p>
                                        <input type="password" class="form-control" @input="newPasswordVerify = $event.target.value" id="pratilipi-settings-confirm-password" placeholder="__('user_confirm_password')">
                                    </div>
                                </div>
                                <button type="button" class="btn btn-primary update-btn" @click="verifyAndResetPassword(newPasswordVerify, newPassword)">__("save_changes")</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<script>
import MainLayout from '@/layout/main-layout.vue';
import { mapGetters, mapActions } from 'vuex'
import mixins from '@/mixins';
import Spinner from '@/components/Spinner.vue';


export default {
    components: {
        MainLayout,
    },
       mixins: [
        mixins
    ],
    data() {
        return {
            newPasswordVerify: '',
            newPassword: ''  ,
            passwordIsInvalid: false,
            passwordConfirm: false,
        }
    },
    computed: {
        ...mapGetters([
            'getUserDetails'
        ])
    },
    methods: {
        ...mapActions([
            'resetUserPassword'
        ]),
         ...mapActions('alert', [
            'triggerAlert'
        ]),
        verifyAndResetPassword(newPassword, newPasswordVerify) {
            this.passwordConfirm = !this.validateFirstAndSecondPassword(this.newPassword,this.newPasswordVerify);
            this.passwordIsInvalid = !this.validatePassword(newPassword);
        if(!this.passwordConfirm && !this.passwordIsInvalid)
        {
              this.resetUserPassword({
                    email: this.$route.query.email,
                    idToken: this.$route.query.token, 
                    newPassword
                });
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.static-page {
    margin-top: 85px;
    text-align: left;
    background: #f8f8f8;
    min-height: 700px;
    @media screen and (max-width: 992px ) {
        margin-top: 65px;
    }
    .col-lg-8 {
        margin: 0 auto;
    }
    .card {
        border-radius: 0;
        margin: 10px 0;
        padding: 0;
        text-align: left;
        .head-title {
            font-size: 22px;
            font-weight: bold;
            text-align: left;
            border-left: 3px solid #d0021b;
            padding-left: 10px;
            margin: 10px 0 0;
            @media screen and (max-width: 992px ) {
                    font-size: 18px;
            }
        }
        form {
            padding: 10px;
            font-size: 14px;
            .update-btn {
                background: #d00b12;
                color: #fff;
                margin-right: 10px;
                border: 0;
            }
        }
    }
}
</style>
