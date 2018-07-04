<template>
    <!-- Report Modal -->
    <div class="modal fade reportModal" id="reportModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ getModalTitle }}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <i class="material-icons">close</i>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label for="reportModalTextarea">{{ getModalTitle }}</label>
                            <textarea :value="getModalActionAndData.prefilled_value" @input="updatePrefilledValue($event.target.value)" class="form-control" rows="3"></textarea>
                        </div>
                        <button type="button" class="btn btn-submit" @click="dispatchActionAndCloseModal">__("submit")</button>
                        <button type="button" class="cancel" data-dismiss="modal" aria-label="Close">__("cancel")</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import mixins from '@/mixins';
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            
        }
    },
    computed: {
        ...mapGetters([
            'getModalTitle',
            'getModalActionAndData',
            'getUserDetails',
        ])
    },
    mixins: [
        mixins
    ],
    methods: {
        ...mapActions([
            'dispatchAction',
            'updatePrefilledValue'
        ]),
        dispatchActionAndCloseModal() {
            if (this.getModalActionAndData.action === 'pratilipipage/saveOrUpdateSummary') {
                if (!this.getModalActionAndData.initial_value) {
                    const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getModalActionAndData.pratilipi_data);
                    this.triggerAnanlyticsEvent(`NEWBOOKINFO_SUMMARY_BOOK`, 'CONTROL', {
                        ...pratilipiAnalyticsData,
                        'USER_ID': this.getUserDetails.userId
                    });
                } else {
                    const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getModalActionAndData.pratilipi_data);
                    this.triggerAnanlyticsEvent(`UPDATEBOOKINFO_SUMMARY_BOOK`, 'CONTROL', {
                        ...pratilipiAnalyticsData,
                        'USER_ID': this.getUserDetails.userId
                    });
                }
            }
            $('#reportModal').modal('hide');
            this.dispatchAction();
        }
    }
}
</script>


<style lang="scss" scoped>
.reportModal {
    text-align: left;
    max-width: 350px;
    margin: 50px auto;
    .modal-body {
        padding-top: 0;
    }
    .form-group {
        font-size: 14px;
    }
    .btn-submit {
        background: #d0021b;
        color: #fff;
        border: 0;
        font-size: 14px;
        float: right;
    }
    .cancel {
        background: none;
        border: 0;
        float: right;
        font-size: 12px;
        line-height: 33px;
    }
}
</style>
