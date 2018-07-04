<template>
    <!-- Report Modal -->
    <div class="modal fade reportModal" id="reportModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">__("report_title")</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <i class="material-icons">close</i>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label for="reportModalTextarea">__("report_issue")</label>
                            <textarea class="form-control" rows="3" placeholder="__('report_issue')"></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary btn-submit">__("submit")</button>
                        <button type="button" class="cancel" data-dismiss="modal" aria-label="Close">__("cancel")</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.reportModal {
    text-align: left;
    max-width: 350px;
    margin: 50px auto;
    .form-group {
        font-size: 14px;
    }
    .btn-submit {
        background: #d0021b;
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
