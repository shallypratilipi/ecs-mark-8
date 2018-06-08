<template>
    <!-- Confirmation Modal -->
    <div>


        <div class="modal fade confirmation" id="confirmation" tabindex="-1" role="dialog" aria-labelledby="confirmationLabel" aria-hidden="true">
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
                                <label>{{ getModalMessage }}</label>
                            </div>
                            <button type="button" class="btn btn-submit" data-dismiss="modal" aria-label="Close">__("cancel")</button>
                            <button type="button" @click="dispatchActionAndCloseModal" class="cancel">__("pratilipi_confirm_delete_content_okay")</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade confirmation" id="confirmation-primary" tabindex="-1" role="dialog" aria-labelledby="confirmationLabel" aria-hidden="true">
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
                                <label>{{ getModalMessage }}</label>
                            </div>
                            <button type="button" @click="dispatchActionAndCloseModal" class="btn btn-submit">__("pratilipi_confirm_delete_content_okay")</button>
                            <button type="button" class="cancel" data-dismiss="modal" aria-label="Close">__("cancel")</button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
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
                'getModalMessage'
            ])
        },
        methods: {
            ...mapActions([
                'dispatchAction',
                'updatePrefilledValue'
            ]),
            dispatchActionAndCloseModal() {
                $('#confirmation').modal('hide');
                $('#confirmation-primary').modal('hide');
                this.dispatchAction();
            }
        }
    }
</script>


<style lang="scss" scoped>
    .confirmation {
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
            background: #e9e9e9;
            border: 0;
            float: right;
            font-size: 12px;
            line-height: 33px;
            margin-right: 10px;
            padding: 0 10px;
            border-radius: 3px;
        }
    }
</style>
