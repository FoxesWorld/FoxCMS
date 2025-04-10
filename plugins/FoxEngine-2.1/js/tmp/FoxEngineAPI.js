// API.js
import { FoxEngine } from './FoxEngine.js';

export class FoxEngineAPI {
    /**
     * @param {Object} engineConfig - Объект конфигурации для движка.
     * Пример:
     * {
     *   replaceData: {
     *     assets: '/assets/',
     *     secureKey: 'yourSecureKey',
     *     login: 'userLogin',
     *     user_group: '2',
     *     // ... другие поля
     *   },
     *   userFields: {
     *     // поля пользователя, если требуется
     *   }
     * }
     */
    constructor(engineConfig) {
        this.engine = new FoxEngine(engineConfig.replaceData, engineConfig.userFields);
    }

    /**
     * Метод для отправки запроса через движок.
     * @param {Object} requestData - Объект с данными для запроса.
     * @param {string} [answerType="JSON"] - Тип ожидаемого ответа ("JSON", "HTML" или "TEXT").
     * @returns {Promise<any>} - Результат запроса.
     */
    async query(requestData, answerType = "JSON") {
        try {
            const result = await this.engine.sendPostAndGetAnswer(requestData, answerType);
            return result;
        } catch (error) {
            console.error("Ошибка выполнения запроса в API:", error);
            throw error;
        }
    }
}
