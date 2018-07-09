<template>
    <!-- Report Modal -->
    <div class="modal fade multiinput" id="multiinput" tabindex="-1" role="dialog" aria-labelledby="multiinputLabel" aria-hidden="true">
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
                            <label>{{ getInputModalSubheadings[0] }}</label>
                            <TranslatingInput :value="getModalActionAndData.prefilled_value" :oninput="updatePrefilledValue"></TranslatingInput>
                        </div>
                        <div class="form-group">
                            <label>{{ getInputModalSubheadings[1] }}</label>
                            <input type="text" :value="getModalActionAndData.prefilled_value_two" class="form-control" @input="updatePrefilledValueTwo($event.target.value)" :placeholder="'__("writer_input_title_en")'">
                        </div>
                        <button type="button" class="btn btn-submit" @click="dispatchMultipleInputActionAndCloseModal">__("submit")</button>
                        <button type="button" class="cancel" data-dismiss="modal" aria-label="Close">__("cancel")</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TranslatingInput from '@/components/TranslatingInput.vue';
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
            'getInputModalSubheadings'
        ])
    },
    methods: {
        ...mapActions([
            'dispatchMultipleInputAction',
            'updatePrefilledValue',
            'updatePrefilledValueTwo'
        ]),
        dispatchMultipleInputActionAndCloseModal() {
            $('#multiinput').modal('hide');
            this.dispatchMultipleInputAction();
        }
    },
    components: {
        TranslatingInput
    },
}
</script>


<style lang="scss" scoped>
.multiinput {
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
