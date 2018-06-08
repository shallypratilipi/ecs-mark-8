<template>
    <div>
        <slot></slot>
        <LoginModal></LoginModal>
        <ShareModal></ShareModal>
        <Alert :isReader="true"></Alert>
    </div>
</template>

<script>
import LoginModal from '@/components/LoginModal.vue';
import ShareModal from '@/components/Share.vue';
import Alert from '@/components/Alert.vue';
import constants from '@/constants';
import mixins from '@/mixins';

import { mapGetters, mapActions } from 'vuex'

export default {
    components: {
        LoginModal,
        ShareModal,
        Alert
    },
    mixins: [
        mixins
    ],
    computed: {
        ...mapGetters([
            'getUserDetails',
            'getNotificationCount'
        ])
    },
    methods: {
        ...mapActions([
            'fetchUserDetails',
            'fetchInitialNotifications'
        ])
    },
    watch: {
        'getUserDetails.userId'(newValue) {
            if (newValue) {
                this.fetchInitialNotifications({ language: this.getCurrentLanguage().fullName.toUpperCase(), resultCount: 10 });
            }
        }
    }
}
</script>

<style lang="scss">

</style>
