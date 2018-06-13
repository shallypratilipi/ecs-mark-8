<template>
    <MainLayout>
        <div class="static-page page-wrap">
            <div class="container">
                <Spinner v-if="isLoading"></Spinner>
                <div class="row">
                    <div class="col-md-12">
                        <h2>__(newsletter_unsubscribe_heading)</h2>
                        <div class="page-content">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-check">
                           <input v-model="unSubscribeOption" id="radio-option-1" class="form-check-input" type="radio" name="newsletter-option" value="TOO_MANY_EMAILS">
                           <label class="form-check-label" for="radio-option-1">__(newsletter_reason_too_many_emails)</label>
                       </div>
                       <div class="form-check">
                           <input v-model="unSubscribeOption" id="radio-option-2" class="form-check-input" type="radio" name="newsletter-option" value="CONTENT_IRRELEVANT">
                           <label class="form-check-label" for="radio-option-2">__(newsletter_reason_content_irrelevant)</label>
                       </div>
                       <div class="form-check">
                           <input v-model="unSubscribeOption" id="radio-option-3" class="form-check-input" type="radio" name="newsletter-option" value="NO_TIME_TO_READ">
                           <label class="form-check-label" for="radio-option-3">__(newsletter_reason_no_time_to_read)</label>
                       </div>
                       <div>
                            <button type="button" @click="unSubscribeUser" :disabled="!unSubscribeOption"  class="btn btn-save">__(newsletter_unsubscribe_button)</button>
                       </div>
                    </div>
                    <div class="col-md-6">
                        <img style="width: 100%" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABQQEBkSGScXFycyJh8mMi4mJiYmLj41NTU1NT5EQUFBQUFBREREREREREREREREREREREREREREREREREREREQBFRkZIBwgJhgYJjYmICY2RDYrKzZERERCNUJERERERERERERERERERERERERERERERERERERERERERERERERERP/CABEIAZABkAMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAwQBBQYCB//aAAgBAQAAAADswAAAAAAAAAAGKi2yAAAAAAAUeAX+n22QAAAAAAHH6kiv9ZfyAAAAAAYPnvgIdx1VnUajc7XIAAAANbzcPlFTsgxFFi5H9DnGMgAAAcxoBhkA8+sT7KCvXu9vkAAAFL5/OMMgAC73GQAAAY4GvliOTIGGPQeOu3YAAAIOFsUc4i8WQ84xF7zJ4kK266DagAABj5z4xLFTsS+sY8R3bmtx6jzMFX6NaAAADjtU8+Z4fPnzfv7iSShyElW1KeLvZWcgAABreEmr9Vi5XpbWXzW2JxNfcamVij9OnAAAAx87hm7WvmV7KVDdeqHiLl7BW+mewAAAHM8x0G083APOlzuPdTibTGPpAAAABH8x6LYbEDRbK3400O64S5jFvvQAAABymy0O/shF8y63pRT4uxHnedcAAAANBb4vfbsGpuWho+fi9ux3gAAAA1lS+j8zADltTso9Z9NmAAAAHjlt61kl8Aa3S9TFzXd5AAAADlN4AAKmNf1WQAAAA1lDZtZKXgGIfGu6oAAAAGOV3Pvx7VdbvANXZ1HVTgAAAAR8l0OR4ewg0m42/oAAAAAh5XdTgFDl++sAAAAAA887W3MoVNBW3VHtcgAAAAAxz+isyeo4vUG780eh2IAAAAAY0+nvvHnKqvefLpgAAAAAr8BYnr7KwandMRx9WAAAAAMcRqPUM8fQ2Wr3DHiv1wAAAABjluZkq2jHT+KW0eMVevyAAAABjRcf6xQ2BHvPWutW7Dnfo3oAAAADX6Pm5KkOxEvQaXqdZrNpo+12IAAAAPPJe+W8Re7MpV6W/s4eTz73nQgAAAA5y7W11Dz68eKvmLa9k01Ors/fUAAAABjko9nsAK+sr9D55y/lF1YAAAAR/PuxlABqa85D1gAAAAY5XdUYcY9e/csmc+dHcFbrwAAAAczr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">
                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<script>
import MainLayout from '@/layout/main-layout.vue';
import constants from '@/constants';
import Spinner from '@/components/Spinner.vue';
import { mapGetters, mapActions } from 'vuex'

export default {
    components: {
        MainLayout,
        Spinner
    },
    data() {
        return {
            unSubscribeOption: null,
            isLoading: false
        }
    },
    computed: {
        
    },
    methods: {

        unSubscribeUser() {
            const that = this;
            this.isLoading=true;
            const {userId} = this.$route.query;
            if(!userId) {
                that.isLoading=false;
                alert("Invalid URL");
                return;
            }
            import('firebase').then(async (firebase) => {
              if (firebase.apps.length === 0) {
                const config = {
                                apiKey: process.env.FIREBASE_API_KEY,
                                authDomain: process.env.FIREBASE_AUTH_DOMAIN,
                                databaseURL: process.env.FIREBASE_DATABASE_URL,
                                storageBucket: process.env.FIREBASE_STORAGE_BUCKET
                            };
               firebase.initializeApp(config);
              }
               
               let node = firebase.database().ref( "PREFERENCE" ).child( userId );
               await node.update({
                   newsletterUnsubscribeReason: that.unSubscribeOption,
                   newsletterFrequency: "NEVER",
                   lastUpdated: firebase.database.ServerValue.TIMESTAMP
               })
               .then(()=> {
                  that.isLoading=false;
                  alert("You have been successfully unsubscribed.");
                  that.$router.push('/');
               })
               .catch(()=> {
                  that.isLoading=false;
                  alert("There was some error. Please try again")
               });
           })
           .catch(() => {
              that.isLoading=false;
              alert("There was some error. Please try again")
           });
        }
        
    },
    watch: {
        
    },
    created() {
        
    }
}
</script>

<style lang="scss" scoped>
.static-page {
    margin-top: 85px;
    text-align: left;
    min-height: 600px;
    @media screen and (max-width: 992px ) {
        margin-top: 65px;
    }
    h2 {
        font-size: 22px;
        font-weight: bold;
        text-align: left;
        border-left: 3px solid #d0021b;
        padding-left: 10px;
        margin: 10px 0;
        @media screen and (max-width: 992px ) {
            font-size: 18px;
        }
    }
    button {
       font-size: 14px;
       margin: 5px 4px 10px 0;
       float: left;
       &.btn-save {
           background: #d0021b;
           color: #fff;
       }
   }
   .form-check {
        padding: 5px 0px;
        label{
            padding-left: 5px;
        }
   }
}
</style>
<style>
p {
    word-break: break-word !important;
}
</style>
