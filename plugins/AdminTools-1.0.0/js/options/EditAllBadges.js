import { BaseJsonEditor } from '../modules/BaseJsonEditor.js';

export class EditAllBadges extends BaseJsonEditor {
	constructor(adminPanel) {
		const formFields = [
			{ fieldName: 'badgeName', fieldType: 'text' },
			{ fieldName: 'description', fieldType: 'text' },
			{ fieldName: 'img', fieldType: 'text' },
			{ fieldName: 'img', fieldType: 'image' }
		];

		const panelConfig = {
			load:   { key: 'admPanel', value: 'getAllBadges' },
			update: { key: 'admPanel', value: 'allBadgesUpdate' },
			title:  'AllBadges'
		};

		super(adminPanel, formFields, panelConfig);
	}
}
