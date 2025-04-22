import { BaseJsonEditor } from '../modules/BaseJsonEditor.js';

export class GroupAssoc extends BaseJsonEditor {
	constructor() {
		const formFields = [
			{ fieldName: 'groupName', fieldType: 'tagify' },
			{ fieldName: 'groupNum', fieldType: 'number' },
			{ fieldName: 'groupType', fieldType: 'text' },
			{ fieldName: 'groupColor', fieldType: 'color' }
		];

		const panelConfig = {
			load:   { key: 'sysRequest', value: 'getGroups' },
			update: { key: 'admPanel', value: 'groupAssocUpdate' },
			title:  'GroupAssociations'
		};

		super(null, formFields, panelConfig, { addRow: true, delRow: true });
	}
}
