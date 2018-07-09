<template>
    <div class="modal fade share-modal" id="share_modal" tabindex="-1" role="dialog" aria-labelledby="share_modalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">__("share")</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body social">
              <a :href="getFacebookShareUrl" @click="triggerFbShareEvent" class="fb" target="_blank" rel="noopener">
                  <span class="social-icon"><icon name="facebook-f"></icon></span>
                  __("facebook")
              </a>
              <a :href="getTwitterUrl" @click="triggerTwShareEvent" class="twitter" target="_blank" rel="noopener">
                 <span class="social-icon"><icon name="twitter"></icon></span>
                 __("twitter")
              </a>
              <a :href="getGooglePlusUrl" @click="triggerGpShareEvent" class="google" target="_blank" rel="noopener">
                  <span class="social-icon"><icon name="google-plus"></icon></span>
                  __("google_plus")
              </a>
              <a :href="getWhatsAppUri" @click="triggerWaShareEvent" class="whatsapp" target="_blank" rel="noopener">
                  <span class="social-icon"><icon name="whatsapp"></icon></span>
                  __("whatsapp")
              </a>
              <a v-if="false" class="link" @click="copyUrlToClipboard">
                  <span class="social-icon"><icon name="link"></icon></span>
                  copy link
              </a>
              <input type="text" :value="getContentUri" id="shareUri" hidden>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import 'vue-awesome/icons/facebook-f'
import 'vue-awesome/icons/twitter'
import 'vue-awesome/icons/google-plus'
import 'vue-awesome/icons/whatsapp'
import 'vue-awesome/icons/link'

import { mapGetters } from 'vuex'
import mixins from '@/mixins';

export default {
    name: 'Share-Modal',
    computed: {
        ...mapGetters([
            'getFacebookShareUrl',
            'getTwitterUrl',
            'getGooglePlusUrl',
            'getWhatsAppUri',
            'getContentUri',
            'getScreenDetails',
            'getUserDetails',
            'getPratilipiData'
        ]),
    },
    mixins: [
        mixins
    ],
    methods: {
        copyUrlToClipboard() {
            
            var txt = $('#shareUri').val();
            if(!txt || txt == ''){
                return;
            }
            var textArea = document.createElement("textarea");

            textArea.style.position = 'fixed';
            textArea.style.top = 0;
            textArea.style.left = 0;
            textArea.style.width = '2em';
            textArea.style.height = '2em';
            textArea.style.padding = 0;
            textArea.style.border = 'none';
            textArea.style.outline = 'none';
            textArea.style.boxShadow = 'none';
            textArea.style.background = 'transparent';
            textArea.value = $('#shareUri').val();
            document.body.appendChild(textArea);
            textArea.select();

            console.log(textArea.value);
            try {
                var successful = document.execCommand('copy');
                var msg = successful ? 'successful' : 'unsuccessful';
                console.log('Copying text command was ' + msg);
            } catch (err) {
                console.log('Oops, unable to copy');
            }
            document.body.removeChild(textArea);

            /* Select the text field */
            // copyText.select();
            // window.clipboardData.setData('Text', 'test hello');
            // /* Copy the text inside the text field */
            // document.execCommand("copy");
        },
        copyTextToClipboard(text) {
            console.log(text);
            
        },
        triggerFbShareEvent() {
            let pratilipiAnalyticsData = {};
            if (this.getPratilipiData) {
                pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
            }
            let action = !this.getPratilipiData ? 'SHAREUSERFB' : 'SHAREBOOKFB';
            this.triggerAnanlyticsEvent(`${action}_${this.getScreenDetails.screen_location}_${this.getScreenDetails.screen_name}`, 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId,
                'ENTITY_VALUE': 'FACEBOOK',
                'PARENT_ID': this.$route.params[this.$route.meta.id_prop]
            });
        },
        triggerGpShareEvent() {
            let pratilipiAnalyticsData = {};
            if (this.getPratilipiData) {
                pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
            }
            let action = !this.getPratilipiData ? 'SHAREUSERGP' : 'SHAREBOOKGP';
            this.triggerAnanlyticsEvent(`${action}_${this.getScreenDetails.screen_location}_${this.getScreenDetails.screen_name}`, 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId,
                'ENTITY_VALUE': 'GOOGLEPLUS',
                'PARENT_ID': this.$route.params[this.$route.meta.id_prop]
            });
        },
        triggerTwShareEvent() {
            let pratilipiAnalyticsData = {};
            if (this.getPratilipiData) {
                pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
            }
            let action = !this.getPratilipiData ? 'SHAREUSERTW' : 'SHAREBOOKTW';
            this.triggerAnanlyticsEvent(`${action}_${this.getScreenDetails.screen_location}_${this.getScreenDetails.screen_name}`, 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId,
                'ENTITY_VALUE': 'TWITTER',
                'PARENT_ID': this.$route.params[this.$route.meta.id_prop]
            });
        },
        triggerWaShareEvent() {
            let pratilipiAnalyticsData = {};
            if (this.getPratilipiData) {
                pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
            }
            let action = !this.getPratilipiData ? 'SHAREUSERWA' : 'SHAREBOOKWA';
            this.triggerAnanlyticsEvent(`${action}_${this.getScreenDetails.screen_location}_${this.getScreenDetails.screen_name}`, 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId,
                'ENTITY_VALUE': 'WHATSAPP',
                'PARENT_ID': this.$route.params[this.$route.meta.id_prop]
            });
        }
    }
}
</script>

<style lang="scss" scoped>
    .share-modal {
        max-width: 320px;
        margin: -196px auto 0;
        top: 50%;
        .social a {
            vertical-align: middle;
            color: #2c3e50;
            display: block;
            text-align: left;
            margin: 0 10px 20px;
            font-size: 14px;
            .social-icon {
                display: inline-block;
                width: 40px;
                height: 40px;
                background: #3b5998;
                color: #fff;
                border-radius: 50%;
                text-align: center;
                line-height: 40px;
                margin-right: 15px;
            }
            .fa-icon {
                vertical-align: middle;
            }
            &:hover {
                text-decoration: none;
            }
        }
        .social a.twitter .social-icon  {
            background: #00aced;
        }
        .social a.google .social-icon { 
            background: #dd4b39;
        }
        .social a.whatsapp .social-icon {
            background: #48C631;
        }
        .social a.link .social-icon {
            background: #2c3e50;
        }
    }
</style>
