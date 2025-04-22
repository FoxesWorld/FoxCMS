import { BaseJsonEditor } from '../modules/BaseJsonEditor.js';

export class EditInfoBox extends BaseJsonEditor {
	constructor(adminPanel) {
		const formFields = [
			{ fieldName: 'group_name', fieldType: 'text' },
			{ fieldName: 'start_timestamp', fieldType: 'date' },
			{ fieldName: 'end_timestamp', fieldType: 'date' },
			{ fieldName: 'title', fieldType: 'text' },
			{ fieldName: 'text', fieldType: 'textarea' },
			{ fieldName: 'image', fieldType: 'text' },
			{ fieldName: 'image', fieldType: 'image' },
			{ fieldName: 'button_text', fieldType: 'text' },
			{ fieldName: 'button_url', fieldType: 'text' }
		];

		const panelConfig = {
			load: { key: 'sysRequest', value: 'infoBox' },
			update: { key: 'admPanel', value: 'infoBoxUpdate' },
			title: 'InfoBox'
		};

		super(adminPanel, formFields, panelConfig);
	}
}