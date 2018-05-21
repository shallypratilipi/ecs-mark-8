<template>
    <div :class="currentLocale">
        <Header :isHidden="true" :hideFooter="true" :userDetails="getUserDetails"></Header>
        <slot></slot>
        <LoginModal></LoginModal>
        <ConfirmationModal></ConfirmationModal>
        <Alert></Alert>
    </div>
</template>

<script>
import Header from '@/components/Header.vue';
import LoginModal from '@/components/LoginModal.vue';
import ConfirmationModal from '@/components/ConfirmationModal.vue';
import Alert from '@/components/Alert.vue';

import constants from '@/constants'
import mixins from '@/mixins'

import { mapGetters, mapActions } from 'vuex'

export default {
    computed: {
        ...mapGetters([
            'getUserDetails',
            'getNotificationCount'
        ])
    },
    data() {
        return {
            currentLocale: ''
        }
    },
    mixins: [
        mixins
    ],
    methods: {
        ...mapActions([
            'fetchUserDetails',
            'fetchInitialNotifications'
        ])
    },
    components: {
        Header,
        LoginModal,
        ConfirmationModal,
        Alert
    },
    watch: {
        'getUserDetails.userId'(newValue) {
            if (newValue) {
                this.fetchInitialNotifications({ language: this.getCurrentLanguage().fullName.toUpperCase(), resultCount: 10 });
            }
        }
    },
    created() {
        this.currentLocale = 'language-' + process.env.LANGUAGE;
    }
}
</script>

<style lang="scss">
.modal-body {
    max-height: calc(100vh - 200px);
    overflow-y: auto;
}
</style>
