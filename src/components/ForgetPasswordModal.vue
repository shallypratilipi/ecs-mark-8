<template>
    <div class="modal fade" id="forgotPassModal" tabindex="-1" role="dialog" aria-labelledby="forgotPassModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="forgotPassModalLabel">__("user_forgot_password")</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div id="password_reset">
                        <form>
                            <div class="form-group">
                                <input type="email" @input="forgotten_password_email = $event.target.value" class="form-control" id="forgotEmail" :placeholder="'__("user_email")'">
                            </div>
                            <button type="button" @click="triggerEventAndSendPasswordResetEmail(forgotten_password_email)" class="btn sign-in">__("user_reset_password")</button>
                        </form>
                    </div>
                </div>
                <div class="spinner-overlay" v-if="getForgotPasswordUpdateState === 'LOADING'">
                    <Spinner></Spinner> 
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import mixins from '@/mixins';
import Spinner from '@/components/Spinner.vue';
import { mapGetters, mapActions } from 'vuex'
export default {
    mixins: [
        mixins
    ],
    data() {
        return {
            forgotten_password_email: ''
        }
    },
    components: {
        Spinner
    },
    methods: {
        ...mapActions([
            'sendPasswordResetEmail'
        ]),
        triggerEventAndSendPasswordResetEmail(data) {
            this.triggerAnanlyticsEvent('REQUESTPASSWORD_EMAIL_FORGOTP', 'CONTROL', {
                'USER_ID': this.getUserDetails.userId
            });
            this.sendPasswordResetEmail(data);
        }
    },
    computed: {
        ...mapGetters([
            'getForgotPasswordUpdateState',
            'getUserDetails'
        ])
    },
    created() {
        
    },
    mounted() {
        
    }
}
</script>

<style lang="scss" scoped>
#forgotPassModal {
    .forms {
        margin: 15px 10px;
        text-align: left;
        display: none;
        .forgot-pass {
            font-size: 12px;
            margin-right: 10px;
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
}
</style>