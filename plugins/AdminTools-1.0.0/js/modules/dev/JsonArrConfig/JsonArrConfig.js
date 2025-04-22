import { AbstractJsonConfig } from './AbstractJsonConfig.js';

export class JsonArrConfig extends AbstractJsonConfig {
	constructor(fieldDefinitions, onSubmit, buildField) {
		super(onSubmit);

		// Храним весь массив полей (имя + тип)
		this.fieldDefinitions = fieldDefinitions;

		// Автоматически извлекаем только имена
		this.fieldNames = fieldDefinitions.map(f => f.fieldName);

		this.buildField = buildField;
	}

	/**
	 * Открывает модальное окно с формой, используя сохранённые параметры.
	 * @param {Array<Object>} dataArr - Массив JSON объектов
	 * @param {string} title - Заголовок формы
	 * @param {Object} extraPayload - Дополнительные данные для submit-запроса
	 */
	open(dataArr, title = "Form", extraPayload = {}) {
		this.openFormWindow(dataArr, title, extraPayload);
	}

	/**
	 * Генерация HTML-полей формы.
	 * @param {Object} entry - Данные одной записи JSON
	 * @returns {HTMLElement[]} - Список HTML элементов
	 */
	buildFields(entry = {}) {
		return this.fieldDefinitions.map(def => {
			return this.buildField.createField(def, entry[def.fieldName]);
		});
	}

	/**
	 * Обновление конфигурации JSON на сервере.
	 * @param {string} updateKey - Ключ маршрута или цели обновления
	 */
	async updateJsonConfig(updateKey) {
		const formData = this.collectFormData(this.fieldNames);
		return await foxEngine.sendPostAndGetAnswer({ [updateKey]: formData }, "JSON");
	}
}
