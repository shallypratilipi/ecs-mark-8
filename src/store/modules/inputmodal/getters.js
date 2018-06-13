export default {

    getModalActionAndData: state =>  state,

    getModalTitle: state => {
        switch (state.heading) {
            case 'report_title':
                return '__("report_title")';
            case 'edit_pratilipi_summary':
            	return '__("edit_pratilipi_summary")';
            case 'edit_pratilipi_title':
            	return '__("edit_pratilipi_title")';
            case 'pratilipi_delete_content':
                return '__("pratilipi_delete_content")';
            case 'event_participate_confirm_submission':
                return '__("event_participate_confirm_submission")';
            case 'author_about':
                return '__("author_about")';
        }
    },

    getInputModalSubheadings: state => {
    	switch (state.heading) {
            case 'report_title':
                return ['__("report_title")'];
            case 'edit_pratilipi_summary':
            	return ['__("write_summary")'];
            case 'edit_pratilipi_title':
            	return ['__("writer_input_title")', '__("writer_input_title_en")'];
            default:
            	return []
        }
    },

    getModalMessage: state => {
        switch (state.message) {
            case 'pratilipi_confirm_delete_content':
                return '__("pratilipi_confirm_delete_content")';
        }
    }
}
