import { JsonArrConfig } from '../../modules/JsonArrConfig.js';
import { BuildField } from '../../modules/BuildField.js';

export class EditBalance {

    constructor() {
        // Определяем поля формы баланса
        this.formFields = [
            { fieldName: 'units', fieldType: 'number' },
            { fieldName: 'crystals', fieldType: 'number' }
        ];

        // Создаем экземпляры вспомогательных классов
        this.buildField = new BuildField(this);
        this.jsonArrConfig = new JsonArrConfig(
            this,//.formFields.map(f => f.fieldName),
            this.submitHandler.bind(this),
            this.buildField,
			{addRow: false, delRow: false}
        );
        // Режим редактирования строк отключен, так как баланс редактируется как объект
        //this.jsonArrConfig.setEditRows(false);
    }

    /**
     * Обработчик отправки данных баланса.
     * Ожидает успешный ответ от сервера и, в случае успеха, уведомляет пользователя, закрывает окно и обновляет профиль.
     * @param {Object} button - Кнопка отправки с методом notify для уведомлений.
     * @param {string} user - Логин пользователя, чей баланс редактируется.
     */
    async submitHandler(button, user) {
        try {
            const answer = await this.jsonArrConfig.updateJsonConfig("balance");
            button.notify(answer.message, answer.type);

            if (answer.success) {
                // Только при успешном обновлении закрываем окно и обновляем профиль
                setTimeout(() => {
                    $("#dialog").dialog('close');
                    foxEngine.user.showUserProfile(user);
                }, 500);
            }
        } catch (error) {
            console.error('An error occurred during submission:', error.message);
        }
    }

    /**
     * Открывает окно редактирования баланса.
     * Загружает данные баланса для указанного логина и передаёт их в окно формы.
     * @param {string} login - Логин пользователя.
     */
    async openEditWindow(login) {
        if (!login) {
            console.error('Login не определен');
            return;
        }

        try {
            // Загружаем данные баланса с сервера
            const userBalance = await this.loadUserBalance(login);
            if (!userBalance || !Array.isArray(userBalance)) {
                console.error('Некорректный ответ сервера:', userBalance);
                return;
            }

            // Создаем объект с данными баланса
            const balanceData = {
                units: userBalance.find(item => item.units)?.units || 0,
                crystals: userBalance.find(item => item.crystals)?.crystals || 0
            };

            console.log('Form data being passed to openForm:', balanceData);  // Логируем данные

            // Открываем окно формы редактирования с переданными данными и параметрами для сервера
            this.jsonArrConfig.openForm(
                [balanceData], // Оборачиваем объект в массив, чтобы форма могла корректно вставить значения
                login,
                { admPanel: "editUserBalance", userLogin: login }
            );
        } catch (error) {
            console.error('Ошибка при загрузке баланса:', error.message);
        }
    }

    /**
     * Загружает баланс пользователя с сервера.
     * @param {string} login - Логин пользователя.
     * @returns {Promise<Object>} Данные баланса.
     */
    async loadUserBalance(login) {
        try {
            const balance = await foxEngine.sendPostAndGetAnswer(
                { admPanel: "loadUserBalance", userLogin: login },
                "JSON"
            );
            console.log('Loaded user balance:', balance);  // Логируем результат
            return balance;
        } catch (error) {
            console.error(`Ошибка загрузки баланса для ${login}:`, error.message);
            throw error;
        }
    }
}
