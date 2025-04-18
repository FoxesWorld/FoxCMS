var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// options/Settings.js
var Settings;
var init_Settings = __esm({
  "options/Settings.js"() {
    Settings = class {
      constructor() {
      }
      async parseSettings() {
        let response = await foxEngine.sendPostAndGetAnswer({
          admPanel: "cfgParse"
        }, "TEXT");
        $("#adminContent").html(response);
      }
      async addContent() {
      }
    };
  }
});

// modules/JsonArrConfig.js
var JsonArrConfig;
var init_JsonArrConfig = __esm({
  "modules/JsonArrConfig.js"() {
    JsonArrConfig = class {
      constructor(instance, submitHandler, buildField) {
        this.postData;
        ;
        this.jsonAttributes = this.getFieldNames(instance.formFields);
        this.submitHandler = submitHandler;
        if (buildField) {
          this.buildField = buildField;
        }
        this.editRows = true;
        this.charactersToRemove = ["\n", "	"];
      }
      calculateTextareaHeight(value) {
        const minHeight = 100;
        const calculatedHeight = Math.max(minHeight, value.length / 2);
        return calculatedHeight;
      }
      getFieldNames(formFields) {
        return formFields.map((field) => field.fieldName);
      }
      async openFormWindow(configArray, serverName, postData) {
        this.postData = postData;
        try {
          let JsonArray;
          if (configArray) {
            if (typeof configArray === "string") {
              JsonArray = JSON.parse(configArray);
            } else {
              JsonArray = configArray;
            }
          } else {
            this.loadFormIntoDialog("", serverName);
            return;
          }
          const builtFormHtml = await this.genJsonCfgForm(JsonArray);
          this.loadFormIntoDialog(builtFormHtml, serverName);
          setTimeout(() => {
            $("#submitBtn").click(async () => {
              await this.submitHandler($("#submitBtn"), serverName);
            });
            $("#jsonConfigForm").on("click", ".removeBtn", (e) => {
              const index = $(e.currentTarget).data("index");
              $("#jsonConfigForm tbody tr:eq(" + index + ")").remove();
              this.updateArrayIndexes();
            });
            $("#addRowBtn").click(() => {
              this.addRow();
              this.updateArrayIndexes();
            });
          }, 1e3);
        } catch (error) {
          console.error("An error occurred:", error.message);
        }
      }
      async genJsonCfgForm(JsonArray) {
        return Promise.all(JsonArray.map((element, index) => this.genFormRow(index, element))).then((rows) => {
          const builtFormHtml = `<form id="jsonConfigForm">
                    <table cellpadding="${this.jsonAttributes.length}" class="table table-bordered table-striped">
                        <thead class="thead-dark">
                            <tr>
                                <th>#</th>
                                ${this.jsonAttributes.map((attribute) => `<th>${attribute}</th>`).join("")}
                                ${this.editRows ? "<th>Action</th>" : ""}
                            </tr>
                        </thead>
                        <tbody>
                            ${rows.join("")}
                        </tbody>
                    </table>
                    <div class="buttonGroup">
                        <button type="button" id="submitBtn" class="btn btn-success">Save</button>
                        ${this.editRows ? '<button type="button" id="addRowBtn" class="btn btn-primary">Add Row</button>' : ""}
                    </div>
                </form>`;
          return builtFormHtml;
        });
      }
      async genFormRow(index, row) {
        const rowHeight = this.calculateRowHeight(row);
        let formHtml = `<tr>
                            <td>${index + 1}</td>`;
        if (this.buildField) {
          formHtml += await this.buildFieldInput(row);
        } else {
          formHtml += this.buildDefaultInput(index, row, rowHeight);
        }
        if (this.editRows) {
          formHtml += `<td><button type="button" class="btn btn-danger removeBtn" data-index="${index}">Remove</button></td></tr>`;
        }
        return formHtml;
      }
      async buildFieldInput(row) {
        let html = "";
        for (let i = 0; i < this.buildField.inputFields.length; i++) {
          const { fieldName, fieldType, optionsArray } = this.buildField.inputFields[i];
          if (row[fieldName] !== void 0) {
            const inputValue = row[fieldName] || "";
            const inputHtml = await this.buildField.createInputBlock(fieldName, inputValue, fieldType, optionsArray);
            html += `<td>${inputHtml}</td>`;
          }
        }
        return html;
      }
      buildDefaultInput(index, row, rowHeight) {
        return this.jsonAttributes.map((attribute) => {
          const inputValue = row[attribute] || "";
          const isTextarea = inputValue.length > 60;
          const inputType = isTextarea ? "textarea" : "input";
          const inputHeight = isTextarea ? rowHeight : this.calculateTextareaHeight(inputValue);
          return `<td>
                        <div class="input_block">
                            <${inputType} class="input" id="${attribute}_input${index}" name="${attribute}" data-index="${index}" style="${isTextarea ? "height: " + inputHeight + "px; width: 100%; box-sizing: border-box;" : "height: " + inputHeight / 2 + "px;"}"
                                ${inputType === "input" ? `value="${inputValue}"` : ""}>
                                ${inputType === "textarea" ? `${this.removeCharacters(inputValue)}` : ""}
                            </${inputType}>
                        </div>
                    </td>`;
        }).join("");
      }
      calculateRowHeight(row) {
        const heights = this.jsonAttributes.map((attribute) => this.calculateTextareaHeight(row[attribute] || ""));
        return Math.max(...heights) * 2;
      }
      async addRow() {
        const rowCount = $("#jsonConfigForm tbody tr").length;
        const newRow = {};
        this.jsonAttributes.forEach((attribute) => {
          newRow[attribute] = "";
        });
        const newHtml = await this.genFormRow(rowCount, newRow);
        if ($("#jsonConfigForm tbody tr").length === rowCount) {
          const $newRow = $(newHtml).css("display", "none");
          $("#jsonConfigForm tbody").append($newRow);
          $newRow.fadeIn(200);
          $("#jsonConfigForm").off("click", ".removeBtn").on("click", ".removeBtn", (e) => {
            const indexToRemove = $(e.currentTarget).data("index");
            const $row = $("#jsonConfigForm tbody tr").eq(indexToRemove);
            $row.fadeOut(200, () => {
              $row.remove();
              this.updateArrayIndexes();
            });
          });
        }
      }
      updateArrayIndexes() {
        $("#jsonConfigForm tbody tr").each((i, tr) => {
          $(tr).find("td:first").text(i + 1);
          $(tr).find(".removeBtn").attr("data-index", i);
        });
      }
      loadFormIntoDialog(formHtml, dialogTitle) {
        foxEngine.modalApp.showModalApp("100%", dialogTitle, formHtml, () => {
        });
      }
      async updateJsonConfig(sendKey) {
        const formDataArray = [];
        $("#jsonConfigForm tbody tr").each(function() {
          const formData = {};
          $(this).find("input, select, textarea").each(function() {
            const fieldName = $(this).attr("name");
            if (fieldName) {
              let fieldValue;
              if ($(this).is(":checkbox")) {
                fieldValue = $(this).prop("checked") ? true : false;
              } else {
                fieldValue = $(this).val();
              }
              formData[fieldName] = fieldValue;
            }
          });
          if (Object.keys(formData).length > 0) {
            formDataArray.push(formData);
          }
        });
        let req = {
          ...this.postData
        };
        req[sendKey] = JSON.stringify(formDataArray);
        let answer = await foxEngine.sendPostAndGetAnswer(req, "JSON");
        return answer;
      }
      removeCharacters(value) {
        let cleanedValue = value;
        this.charactersToRemove.forEach((char) => {
          cleanedValue = cleanedValue.replace(new RegExp(char, "g"), "");
        });
        return cleanedValue;
      }
      setEditRows(editRows) {
        this.editRows = editRows;
      }
    };
  }
});

// modules/BuildField.js
var BuildField;
var init_BuildField = __esm({
  "modules/BuildField.js"() {
    BuildField = class {
      constructor(classInstance, options = {}) {
        this.classInstance = classInstance;
        this.inputFields = classInstance.formFields || [];
        this.initAwait = options.initAwait || 600;
        this.defaultHandlers = {
          label: this.createLabel.bind(this),
          text: this.createTextInput.bind(this),
          number: this.createNumberInput.bind(this),
          dropdown: this.createDropdown.bind(this),
          checkbox: this.createCheckboxInput.bind(this),
          textarea: this.createTextareaInput.bind(this),
          tagify: this.createTagifyInput.bind(this),
          date: this.createDatePickerInput.bind(this)
        };
        this.handlers = { ...this.defaultHandlers, ...options.customHandlers || {} };
      }
      /**
       * Унифицированный метод для создания блока с плавающей меткой.
       * Использует постоянный id для полей, где это необходимо.
       * @param {string} fieldName - имя поля.
       * @param {string} value - значение.
       * @param {string} type - тип инпута.
       * @param {string} [id=fieldName] - идентификатор элемента.
       * @returns {string} HTML-код блока.
       */
      _createFloatingInput(fieldName, value, type = "text", id = fieldName) {
        return `
            <div class="form-floating mb-3">
                <input type="${type}" class="form-control" name="${fieldName}" id="${id}" placeholder="%lang|${fieldName}%" value="${value}">
                <label for="${id}">${fieldName}</label>
            </div>`;
      }
      /**
       * Унифицированный метод для отложенного выполнения.
       * @param {function} callback - функция, которую следует выполнить.
       * @param {number} [delay=this.initAwait] - задержка в мс.
       */
      _runAfterDelay(callback, delay = this.initAwait) {
        setTimeout(callback, delay);
      }
      /**
       * Выполнить инициализацию элемента только один раз.
       * @param {string} key - уникальный ключ для данного инициализатора (например, id элемента).
       * @param {HTMLElement} el - DOM-элемент, который инициализируется.
       * @param {function} initFn - функция инициализации.
       */
      _initializeOnce(key, el, initFn) {
        if (el && !el.dataset.initializedFor) {
          initFn();
          el.dataset.initializedFor = key;
        }
      }
      /**
       * Создание HTML-структуры формы для каждой строки данных.
       * @param {Array} data - массив объектов с данными.
       * @returns {Promise<string>} HTML строк таблицы.
       */
      async buildFormFields(data) {
        const rows = await Promise.all(data.map(async (rowData) => {
          let rowHtml = "<tr>";
          for (const field of this.inputFields) {
            const { fieldName, fieldType, optionsArray } = field;
            const value = rowData[fieldName];
            rowHtml += `<td>${await this.createInputBlock(fieldName, value, fieldType, optionsArray)}</td>`;
          }
          rowHtml += "</tr>";
          return rowHtml;
        }));
        return rows.join("");
      }
      /**
       * Построение таблицы с формами на основании шаблона.
       * @param {Array} fields - массив определений полей.
       * @param {Array} data - данные для таблицы.
       * @param {string} rowTemplate - шаблон строки.
       * @returns {Promise<string>} HTML таблицы.
       */
      async buildTable(fields, data, rowTemplate) {
        const rows = await Promise.all(data.map(async (rowData, index) => {
          const rowHtml = await this.renderRow(fields, { ...rowData, index }, rowTemplate);
          return `<tr>${rowHtml}</tr>`;
        }));
        return rows.join("");
      }
      /**
       * Создание блока ввода посредством вызова соответствующего обработчика.
       * @param {string} fieldName 
       * @param {string} value 
       * @param {string} fieldType 
       * @param {Array} [optionsArray] 
       * @returns {string} HTML-код блока ввода.
       */
      async createInputBlock(fieldName, value, fieldType, optionsArray) {
        const handler = this.handlers[fieldType];
        if (handler) {
          return handler(fieldName, value, optionsArray);
        } else {
          console.error(`Unknown input type for field: ${fieldName}`);
          return "";
        }
      }
      /**
       * Создание простой метки.
       * @param {string} fieldName 
       * @param {string} value 
       * @returns {string}
       */
      createLabel(fieldName, value) {
        return `<b>${value}</b>`;
      }
      createTextInput(fieldName, value) {
        return this._createFloatingInput(fieldName, value, "text");
      }
      createNumberInput(fieldName, value) {
        return this._createFloatingInput(fieldName, value, "number");
      }
      /**
       * Создание выпадающего списка.
       * @param {string} fieldName 
       * @param {string} value 
       * @param {Array} optionsArray 
       * @returns {string}
       */
      createDropdown(fieldName, value, optionsArray = []) {
        const options = optionsArray.map(
          (option2) => `<option value="${option2}" ${option2 === value ? "selected" : ""}>${option2}</option>`
        ).join("");
        return `
            <div class="form-floating mb-3">
                <select id="${fieldName}" name="${fieldName}" class="form-select">
                    ${options}
                </select>
                <label for="${fieldName}">${fieldName}</label>
            </div>`;
      }
      /**
       * Создание чекбокса с отложенной инициализацией Switchery.
       * Используется постоянный id, равный fieldName.
       * @param {string} key 
       * @param {string} value 
       * @returns {string}
       */
      createCheckboxInput(key, value) {
        const isChecked = value === "true" ? "checked" : "";
        const id = key;
        const html = `
            <div class="form-floating mb-3">
                <input type="checkbox" id="${id}" class="form-control ${id}-checkbox" name="${key}" ${isChecked} />
                <label for="${id}">${key}</label>
            </div>`;
        this._runAfterDelay(() => {
          const el = document.getElementById(id);
          this._initializeOnce(`${id}_switchery`, el, () => {
            new Switchery(el);
          });
        });
        return html;
      }
      /**
           * Создание текстовой области с использованием CodeMirror.
           * Для textarea используется id в виде fieldName + '_textarea'
           * @param {string} fieldName 
           * @param {string} value 
           * @returns {string}
           
      createTextareaInput(fieldName, value) {
          const textareaId = `${fieldName}_textarea`;
          const safeValue = typeof value === "string" ? value : "";
      
          this._runAfterDelay(() => {
              const textarea = document.getElementById(textareaId);
              this._initializeOnce(`${textareaId}_cm`, textarea, () => {
                  const editor = CodeMirror.fromTextArea(textarea, {
                      mode: "htmlmixed",
                      lineNumbers: false, 
                      theme: "default",
                      viewportMargin: Infinity,
                      lineWrapping: true
                  });
      			console.log(editor);
      
                  editor.setSize("100%", "auto");
                  window.addEventListener('resize', () => editor.setSize("100%", "auto"));
                  editor.refresh();
                  editor.getWrapperElement().classList.add("codeHtml", "mb-3");
      
                  // Sync CodeMirror -> textarea on change
                  //editor.on("change", () => {
      			//	console.log(editor.getValue());
                  //    textarea.value = editor.getValue();
                  //});
      
                  // Extra sync on form submit
                  textarea.form?.addEventListener("submit", () => {
                      textarea.value = editor.getValue();
                  });
              });
          });
      
          return `
              <div class="mb-3" style="display: flex">
                  <label for="${textareaId}" class="form-label">${fieldName}</label>
                  <textarea id="${textareaId}" name="${fieldName}" class="form-control d-none" style="display: none;">${safeValue}</textarea>
              </div>`;
      }*/
      createTextareaInput(fieldName, value) {
        const textareaId = `${fieldName}_textarea`;
        const safeValue = typeof value === "string" ? value : "";
        return `
        <div class="mb-3">
            <label for="${textareaId}" class="form-label">${fieldName}</label>
            <textarea 
                id="${textareaId}" 
                name="${fieldName}" 
                class="form-control" 
                rows="10"
                style="resize: vertical;">${safeValue}</textarea>
        </div>`;
      }
      /**
       * Создание поля ввода с Tagify.
       * Для каждого поля tagify используется постоянный id: fieldName + '_tagify'
       * @param {string} fieldName 
       * @param {string} value 
       * @returns {string}
       */
      createTagifyInput(fieldName, value, uniqueSuffix = Math.random().toString(36).substring(2, 8)) {
        const id = `${fieldName}_tagify_${uniqueSuffix}`;
        this._runAfterDelay(() => {
          const input = document.getElementById(id);
          this._initializeOnce(`${id}_tagify`, input, () => {
            new Tagify(input, {
              originalInputValueFormat: (valuesArr) => valuesArr.map((item) => item.value).join(","),
              delimiters: ","
            });
          });
        });
        return this._createFloatingInput(fieldName, value, "text", id);
      }
      /**
       * Создание поля выбора даты с использованием flatpickr.
       * Для каждого date-picker используется уникальный id.
       * @param {string} fieldName 
       * @param {string} value 
       * @param {number|string} [uniqueSuffix] - Уникальный суффикс для id
       * @returns {string}
       */
      createDatePickerInput(fieldName, value, uniqueSuffix = Math.random().toString(36).substring(2, 8)) {
        const id = `${fieldName}_date_${uniqueSuffix}`;
        const unixInputId = `${id}_unix`;
        const html = `
		<div class="form-floating mb-3">
			<input type="hidden" name="${fieldName}" id="${unixInputId}" value="${value}" />
			<input type="text" class="form-control" id="${id}" readonly />
			<label for="${id}">${fieldName}:</label>
		</div>`;
        this._runAfterDelay(() => {
          const input = document.getElementById(id);
          this._initializeOnce(`${id}_flatpickr`, input, () => {
            const dateValue = new Date(parseInt(value, 10)) || /* @__PURE__ */ new Date();
            flatpickr(input, {
              enableTime: true,
              dateFormat: "d.m.Y H:i",
              defaultDate: dateValue,
              onChange: (selectedDates) => {
                if (selectedDates.length > 0) {
                  document.getElementById(unixInputId).value = selectedDates[0].getTime();
                }
              }
            });
          });
        });
        return html;
      }
      /**
       * Генерация строки таблицы с полями, заменяя плейсхолдеры в шаблоне.
       * @param {Array} fields - массив определений полей.
       * @param {Object} rowData - данные строки.
       * @param {string} template - шаблон строки.
       * @returns {Promise<string>} HTML строки.
       */
      async renderRow(fields, rowData, template) {
        const replacements = {};
        for (const field of fields) {
          const { fieldName, fieldType } = field;
          const value = rowData[fieldName];
          replacements[fieldName] = await this.createInputBlock(fieldName, value, fieldType);
        }
        return foxEngine.replaceTextInTemplate(template, replacements);
      }
      /**
       * Валидация данных формы на основе правил валидации каждого поля.
       * @param {Array} fields - массив определений полей.
       * @param {Object} data - данные формы.
       * @returns {Array} массив сообщений об ошибках.
       */
      validateForm(fields, data) {
        const errors = [];
        fields.forEach((field) => {
          const { fieldName, validation } = field;
          const value = data[fieldName];
          if (validation) {
            if (validation.required && !value) {
              errors.push(`${fieldName} is required.`);
            }
            if (validation.regex && !validation.regex.test(value)) {
              errors.push(`${fieldName} has an invalid format.`);
            }
          }
        });
        return errors;
      }
    };
  }
});

// options/userOptions/EditBalance.js
var EditBalance;
var init_EditBalance = __esm({
  "options/userOptions/EditBalance.js"() {
    init_JsonArrConfig();
    init_BuildField();
    EditBalance = class {
      constructor() {
        this.formFields = [
          { fieldName: "units", fieldType: "number" },
          { fieldName: "crystals", fieldType: "number" }
        ];
        this.buildField = new BuildField(this);
        this.jsonArrConfig = new JsonArrConfig(
          this,
          //.formFields.map(f => f.fieldName),
          this.submitHandler.bind(this),
          this.buildField
        );
        this.jsonArrConfig.setEditRows(false);
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
            setTimeout(() => {
              $("#dialog").dialog("close");
              foxEngine.user.showUserProfile(user);
            }, 500);
          }
        } catch (error) {
          console.error("An error occurred during submission:", error.message);
        }
      }
      /**
       * Открывает окно редактирования баланса.
       * Загружает данные баланса для указанного логина и передаёт их в окно формы.
       * @param {string} login - Логин пользователя.
       */
      async openEditWindow(login) {
        if (!login) {
          console.error("Login \u043D\u0435 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D");
          return;
        }
        try {
          const userBalance = await this.loadUserBalance(login);
          if (!userBalance || !Array.isArray(userBalance)) {
            console.error("\u041D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 \u043E\u0442\u0432\u0435\u0442 \u0441\u0435\u0440\u0432\u0435\u0440\u0430:", userBalance);
            return;
          }
          const balanceData = {
            units: userBalance.find((item) => item.units)?.units || 0,
            crystals: userBalance.find((item) => item.crystals)?.crystals || 0
          };
          console.log("Form data being passed to openFormWindow:", balanceData);
          this.jsonArrConfig.openFormWindow(
            [balanceData],
            // Оборачиваем объект в массив, чтобы форма могла корректно вставить значения
            login,
            { admPanel: "editUserBalance", userLogin: login }
          );
        } catch (error) {
          console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0435 \u0431\u0430\u043B\u0430\u043D\u0441\u0430:", error.message);
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
          console.log("Loaded user balance:", balance);
          return balance;
        } catch (error) {
          console.error(`\u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u0431\u0430\u043B\u0430\u043D\u0441\u0430 \u0434\u043B\u044F ${login}:`, error.message);
          throw error;
        }
      }
    };
  }
});

// options/userOptions/EditBadges.js
var EditBadges;
var init_EditBadges = __esm({
  "options/userOptions/EditBadges.js"() {
    init_JsonArrConfig();
    init_BuildField();
    EditBadges = class {
      constructor() {
        this.allBadges = [];
        this.formFields = [
          { fieldName: "badgeName", fieldType: "dropdown", optionsArray: this.allBadges },
          { fieldName: "acquiredDate", fieldType: "date" },
          { fieldName: "description", fieldType: "text" }
        ];
        this.buildField = new BuildField(this);
        this.jsonArrConfig = new JsonArrConfig(
          this,
          this.submitHandler.bind(this),
          this.buildField
        );
      }
      async loadBadgesConfig(button, data, user) {
        if (data) {
          this.jsonArrConfig.openModsInfoWindow(data, user);
        } else {
          button.notify(`${user} has no badges!`, "warn");
        }
      }
      async getAllBadges() {
        const response = await foxEngine.sendPostAndGetAnswer(
          { admPanel: "getAllBadges" },
          "JSON"
        );
        if (Array.isArray(response)) {
          this.allBadges = response.map((badge) => badge.badgeName);
          console.log("[BadgeManager] Returning badge names:", this.allBadges);
        } else {
          console.error("[BadgeManager] Unexpected response format:", response);
          this.allBadges = [];
        }
      }
      async openEditWindow(login) {
        if (!this.allBadges.length) {
          await this.getAllBadges();
        }
        this.formFields.forEach((field) => {
          if (field.fieldName === "badgeName") {
            field.optionsArray = this.allBadges;
          }
        });
        if (login) {
          try {
            const badgesArray = await foxEngine.user.badgeManager.getBadgesArray(login);
            console.log(badgesArray);
            this.jsonArrConfig.openFormWindow(
              badgesArray,
              login,
              { admPanel: "editUserBadges", userLogin: login }
            );
          } catch (error) {
            console.error("An error occurred:", error.message);
          }
        } else {
          console.error("Login is undefined");
        }
      }
      async submitHandler(button, user) {
        const answer = await this.jsonArrConfig.updateJsonConfig("badges");
        button.notify(answer.message, answer.type);
        setTimeout(async () => {
          foxEngine.modalApp.closeModalApp();
          foxEngine.user.showUserProfile(user);
        }, 500);
      }
    };
  }
});

// options/userOptions/EditUserOnline.js
var EditUserOnline;
var init_EditUserOnline = __esm({
  "options/userOptions/EditUserOnline.js"() {
    init_JsonArrConfig();
    init_BuildField();
    EditUserOnline = class {
      constructor() {
        this.formFields = [
          { fieldName: "serverName", fieldType: "text" },
          { fieldName: "totalTime", fieldType: "number" },
          { fieldName: "startTimestamp", fieldType: "date" },
          { fieldName: "lastUpdated", fieldType: "date" },
          { fieldName: "lastSession", fieldType: "number" },
          { fieldName: "lastPlayed", fieldType: "number" }
        ];
        this.buildField = new BuildField(this);
        this.jsonArrConfig = new JsonArrConfig(
          this,
          this.submitHandler.bind(this),
          this.buildField
        );
      }
      async openEditWindow(login) {
        if (login) {
          try {
            const badgesArray = await foxEngine.sendPostAndGetAnswer({
              "admPanel": "getUserPlayTime",
              "login": login
            }, "JSON");
            console.log(badgesArray);
            this.jsonArrConfig.openFormWindow(
              badgesArray,
              login,
              { admPanel: "editUserOnline", userLogin: login }
            );
          } catch (error) {
            console.error("An error occurred:", error.message);
          }
        } else {
          console.error("Login is undefined");
        }
      }
      async submitHandler(button, user) {
        const answer = await this.jsonArrConfig.updateJsonConfig("serversOnline");
        button.notify(answer.message, answer.type);
        setTimeout(async () => {
          foxEngine.modalApp.closeModalApp();
          foxEngine.user.showUserProfile(user);
        }, 500);
      }
    };
  }
});

// options/Users.js
var Users;
var init_Users = __esm({
  "options/Users.js"() {
    init_JsonArrConfig();
    init_BuildField();
    init_EditBalance();
    init_EditBadges();
    init_EditUserOnline();
    Users = class {
      constructor(adminPanel2) {
        this.adminPanel = adminPanel2;
        this.userArr = [];
        this.allBadges = [];
        this.contentAdded = false;
        this.editBadges = new EditBadges();
        this.editBalance = new EditBalance();
        this.editUserOnline = new EditUserOnline();
      }
      async parseUsers(input = "*") {
        try {
          if (input === "") {
            input = "*";
          }
          if (!this.contentAdded) {
            this.addContent();
            this.contentAdded = true;
          }
          let usersArray = await foxEngine.sendPostAndGetAnswer({
            admPanel: "usersList",
            userMask: input
          }, "JSON");
          $("#usersList").html("");
          if (usersArray !== null) {
            let userTpl = this.adminPanel.templateCache["userRow"];
            for (let j = 0; j < usersArray.length; j++) {
              let singleUser = usersArray.at(j);
              let login = singleUser[j].login;
              let email = singleUser[j].email;
              let lastdate = singleUser[j].last_date;
              let avatar = singleUser[j].profilePhoto;
              let badges = singleUser[j].badges;
              this.userArr[login] = {
                email,
                lastdate,
                badges
              };
              let userHtml = await foxEngine.replaceTextInTemplate(userTpl, {
                index: j,
                login,
                avatar,
                email,
                lastdate,
                badges
              });
              $("#usersList").append(userHtml);
            }
            $("#usersList").on("click", ".editUserBadges", async (event) => {
              const login = $(event.currentTarget).data("login");
              if (login) {
                await adminPanel.users.editBadges.openEditWindow(login);
              } else {
                console.error("Login is undefined");
              }
            });
            $("#usersList").on("click", ".editBalance", async (event) => {
              const login = $(event.currentTarget).data("login");
              if (login) {
                await adminPanel.users.editBalance.openEditWindow(login);
              } else {
                console.error("Login is undefined");
              }
            });
            $("#usersList").on("click", ".editServersOnline", async (event) => {
              const login = $(event.currentTarget).data("login");
              if (login) {
                await adminPanel.users.editUserOnline.openEditWindow(login);
              } else {
                console.error("Login is undefined");
              }
            });
          } else {
            const userHtml = `<tr><td colspan="4"><div class="alert alert-warning" role="alert">No Users like <b>${input}</b></div></td></tr>`;
            foxEngine.page.loadData(userHtml, "#usersList");
          }
        } catch (error) {
          console.error("An error occurred:", error.message);
        }
      }
      userTemplate(template, data) {
        return template.replace(/\${(.*?)}/g, (match, p1) => data[p1.trim()]);
      }
      //@Deprecated
      getUserData(login) {
        return this.userArr[login];
      }
      async addContent() {
        if (!$("#adminContent > table").length) {
          const contentHtml = this.adminPanel.templateCache["userTable"];
          $("#adminContent").html(contentHtml);
        }
      }
    };
  }
});

// options/Permissions.js
var Permissions;
var init_Permissions = __esm({
  "options/Permissions.js"() {
    init_JsonArrConfig();
    init_BuildField();
    Permissions = class {
      constructor(adminPanel2) {
        this.adminPanel = adminPanel2;
        this.contentHtml = "";
        this.formFields = [
          { fieldName: "index", fieldType: "label" },
          { fieldName: "groupName", fieldType: "text" },
          { fieldName: "permName", fieldType: "text" },
          { fieldName: "permValue", fieldType: "tagify" }
        ];
        this.buildField = new BuildField(this);
        this.isSubmitting = false;
        this.forms = [];
      }
      async addContent() {
        try {
          const tableTemplate = this.adminPanel.templateCache["permTable"];
          this.contentHtml = tableTemplate;
          $("#adminContent").html(this.contentHtml);
          this.initEventListeners();
        } catch (error) {
          console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0435 \u0448\u0430\u0431\u043B\u043E\u043D\u0430 \u0442\u0430\u0431\u043B\u0438\u0446\u044B:", error);
        }
      }
      async parsePermissions(input = "*") {
        if (!this.contentHtml) {
          await this.addContent();
        }
        try {
          const data = await foxEngine.sendPostAndGetAnswer(
            { admPanel: "showPermissions", userMask: input },
            "JSON"
          );
          const formFieldsHtml = await this.buildField.buildFormFields(data);
          $("#permList").html(formFieldsHtml);
        } catch (error) {
          console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0438 \u0438\u043B\u0438 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0435 \u0434\u0430\u043D\u043D\u044B\u0445 \u0440\u0430\u0437\u0440\u0435\u0448\u0435\u043D\u0438\u0439:", error);
        }
      }
      collectFormData() {
        const rows = $("#permList tr");
        const permissionsData = [];
        rows.each(function() {
          const groupName = $(this).find('input[name="groupName"]').val()?.trim();
          const permName = $(this).find('input[name="permName"]').val()?.trim();
          const permValue = $(this).find('input[name="permValue"]').val()?.trim();
          if (groupName && permName && permValue) {
            permissionsData.push({ groupName, permName, permValue });
          }
        });
        return permissionsData;
      }
      async submitForm(event) {
        event.preventDefault();
        const submitButton = event.submitter || $(event.target).find('[type="submit"]').get(0);
        if (!submitButton) {
          console.error('\u041A\u043D\u043E\u043F\u043A\u0430 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0438 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430. \u0423\u0431\u0435\u0434\u0438\u0442\u0435\u0441\u044C, \u0447\u0442\u043E \u0444\u043E\u0440\u043C\u0430 \u0438\u043C\u0435\u0435\u0442 \u043A\u043D\u043E\u043F\u043A\u0443 \u0441 type="submit".');
          return;
        }
        if (this.isSubmitting) {
          console.log("\u0424\u043E\u0440\u043C\u0430 \u0443\u0436\u0435 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u0442\u0441\u044F. \u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043F\u043E\u0434\u043E\u0436\u0434\u0438\u0442\u0435.");
          return;
        }
        this.isSubmitting = true;
        const formData = this.collectFormData();
        if (formData.length === 0) {
          alert("\u0424\u043E\u0440\u043C\u0430 \u043F\u0443\u0441\u0442\u0430. \u0417\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u043F\u0435\u0440\u0435\u0434 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u043E\u0439.");
          this.isSubmitting = false;
          return;
        }
        submitButton.disabled = true;
        try {
          const response = await foxEngine.sendPostAndGetAnswer(
            {
              admPanel: "editPermissions",
              refreshPage: false,
              playSound: false,
              permissions: JSON.stringify(formData)
            },
            "JSON"
          );
          $(submitButton).notify(response.message, response.type);
        } catch (error) {
          console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0435 \u0434\u0430\u043D\u043D\u044B\u0445:", error);
          alert("\u041F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0435 \u0434\u0430\u043D\u043D\u044B\u0445. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0441\u043D\u043E\u0432\u0430 \u043F\u043E\u0437\u0436\u0435.");
        } finally {
          submitButton.disabled = false;
          this.isSubmitting = false;
        }
      }
      addRow() {
        const newRow = document.createElement("tr");
        this.formFields.forEach((field) => {
          const cell = document.createElement("td");
          const inputBlock = document.createElement("div");
          inputBlock.className = "input_block";
          const label = document.createElement("label");
          label.className = "label";
          label.setAttribute("for", field.fieldName);
          label.textContent = "";
          let input;
          if (field.fieldName === "index") {
            input = document.createElement("span");
            input.textContent = document.querySelectorAll("#permList tr").length + 1;
            input.className = "index";
          } else {
            input = document.createElement("input");
            input.type = field.fieldType === "tagify" ? "text" : field.fieldType;
            input.name = field.fieldName;
            input.className = "input";
            input.value = "";
          }
          inputBlock.appendChild(label);
          inputBlock.appendChild(input);
          cell.appendChild(inputBlock);
          newRow.appendChild(cell);
        });
        const deleteCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "\u0423\u0434\u0430\u043B\u0438\u0442\u044C";
        deleteButton.className = "btn btn-danger btn-sm";
        deleteButton.addEventListener("click", () => this.deleteRow(newRow));
        deleteCell.appendChild(deleteButton);
        newRow.appendChild(deleteCell);
        const tableBody = document.querySelector("#permList");
        if (tableBody) {
          tableBody.appendChild(newRow);
          const tagifyInputs = newRow.querySelectorAll(".tagify");
          tagifyInputs.forEach((input) => new Tagify(input));
        } else {
          console.error("#permList \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D.");
        }
      }
      deleteRow(row) {
        const tableBody = document.querySelector("#permList");
        if (tableBody) {
          tableBody.removeChild(row);
          Array.from(tableBody.querySelectorAll("tr")).forEach((row2, index) => {
            const indexSpan = row2.querySelector(".index");
            if (indexSpan) {
              indexSpan.textContent = index + 1;
            }
          });
        } else {
          console.error("\u0422\u0430\u0431\u043B\u0438\u0446\u0430 #permList \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430.");
        }
      }
      initEventListeners() {
        console.log("\u0418\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u0447\u0438\u043A\u043E\u0432 \u0441\u043E\u0431\u044B\u0442\u0438\u0439...");
        this.formInit(500);
        const formElement = $("#permissionsForm");
        if (formElement.length > 0) {
          formElement.on("submit", (event) => this.submitForm(event));
        } else {
          console.error("#permissionsForm \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D \u0432 DOM");
        }
        const addRowButton = document.querySelector("#addRowButton");
        if (addRowButton) {
          addRowButton.addEventListener("click", () => this.addRow());
        } else {
          console.warn("\u041A\u043D\u043E\u043F\u043A\u0430 \u0434\u043B\u044F \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u044F \u0441\u0442\u0440\u043E\u043A\u0438 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430.");
        }
      }
      formInit(awaitms) {
        setTimeout(() => {
          this.forms = document.querySelectorAll("form");
          if (this.forms.length > 0) {
            console.log(`\u041D\u0430\u0439\u0434\u0435\u043D\u043E \u0444\u043E\u0440\u043C: ${this.forms.length}`);
            this.forms.forEach((form) => {
              form.onsubmit = async (event) => {
                event.preventDefault();
                try {
                  const data = this.collectFormData();
                  data.formId = form.id;
                  await this.submitForm(event);
                } catch (error) {
                  console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0438 \u0444\u043E\u0440\u043C\u044B:", error);
                }
              };
            });
          } else {
            console.warn("\u0424\u043E\u0440\u043C\u044B \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B \u043D\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435.");
          }
        }, awaitms);
      }
    };
  }
});

// options/serverOptions/EditServerMods.js
var EditServerMods;
var init_EditServerMods = __esm({
  "options/serverOptions/EditServerMods.js"() {
    init_JsonArrConfig();
    EditServerMods = class {
      constructor() {
        this.serverAttributes = ["modName", "modPicture", "modDesc"];
        this.formFields = [
          { fieldName: "modName", fieldType: "text" },
          { fieldName: "modPicture", fieldType: "text" },
          { fieldName: "modDesc", fieldType: "text" }
        ];
        this.jsonArrConfig = new JsonArrConfig(this, this.submitHandler.bind(this));
      }
      async submitHandler(button, serverName) {
        let answer = await this.jsonArrConfig.updateJsonConfig("modsInfo");
        button.notify(answer.message, answer.type);
        if (answer.type === "success") {
          setTimeout(() => {
            $("#dialog").dialog("close");
            foxEngine.servers.loadServerPage(serverName);
          }, 500);
        }
      }
      openModsInfo(responses, serverName) {
        $("#viewModsInfoBtn").click(() => {
          this.jsonArrConfig.openFormWindow(responses.modsInfo, responses.serverName, { admPanel: "editServer", serverName });
        });
      }
    };
  }
});

// options/serverOptions/EditServer.js
var EditServer;
var init_EditServer = __esm({
  "options/serverOptions/EditServer.js"() {
    init_BuildField();
    init_JsonArrConfig();
    init_EditServerMods();
    EditServer = class {
      constructor(serversInstance) {
        this.serversInstance = serversInstance;
        this.formFields = serversInstance.formFields;
        this.versions = [];
        this.serverPictures = [];
        this.javaVersions = [];
        this.buildField = new BuildField(this);
        this.jsonArrConfig = new JsonArrConfig(this, {}, this.buildField);
        this.editServerMods = new EditServerMods();
      }
      async loadServerOptions(serverName) {
        try {
          await this.loadAllOptions();
          const serverData = await this.getServerData(serverName);
          this.createDialogIfNeeded();
          this.updateFieldOptions();
          const formHtml = await this.generateFormHtml(serverName, serverData);
          this.jsonArrConfig.loadFormIntoDialog(formHtml, serverName);
          this.setupEventListeners(serverName, serverData);
        } catch (error) {
          console.error("An error occurred while loading server options:", error.message);
        }
      }
      async deleteServer(serverId) {
        const response = await foxEngine.sendPostAndGetAnswer(
          {
            admPanel: "deleteServer",
            serverId
          },
          "JSON"
        );
        if (response.type === "success") {
          setTimeout(() => {
            this.serversInstance.parseServers();
            foxEngine.servers.parseOnline();
          }, 500);
        }
      }
      async getServerData(serverName) {
        const query = { admPanel: "parseServers" };
        if (serverName?.trim()) {
          query.server = `serverName = '${serverName}'`;
        }
        return await foxEngine.sendPostAndGetAnswer(query, "JSON");
      }
      createDialogIfNeeded() {
      }
      async loadAllOptions() {
        const [versions, javaVersions, serverPictures] = await Promise.all([
          this.parseAvailableVersions(),
          this.parseAvailableJava(),
          this.parseAvailablePictures()
        ]);
        this.versions = versions;
        this.javaVersions = javaVersions;
        this.serverPictures = serverPictures;
      }
      async parseAvailableVersions() {
        return await foxEngine.sendPostAndGetAnswer({ admPanel: "getGameVersions" }, "JSON");
      }
      async parseAvailableJava() {
        return await foxEngine.sendPostAndGetAnswer({ admPanel: "getJavaVersions" }, "JSON");
      }
      async parseAvailablePictures() {
        return await foxEngine.sendPostAndGetAnswer({ admPanel: "getServerPictures" }, "JSON");
      }
      updateFieldOptions() {
        for (const field of this.formFields) {
          switch (field.fieldName) {
            case "serverVersion":
              field.optionsArray = this.versions;
              break;
            case "jreVersion":
              field.optionsArray = this.javaVersions;
              break;
            case "serverImage":
              field.optionsArray = this.serverPictures;
              break;
          }
        }
      }
      async generateFormHtml(serverName, serverData) {
        const serverEndFormTpl = this.serversInstance.adminPanel.templateCache["serverEndForm"];
        const formStart = `<form id="serverOptionsForm" class="form-floating" method="POST" action="/" autocomplete="off">`;
        const formFields = await this.buildField.buildFormFields(serverData);
        const formEnd = await this.serversInstance.adminPanel.foxEngine.replaceTextInTemplate(serverEndFormTpl, {
          serverName,
          id: serverData.id
        });
        return formStart + formFields + formEnd;
      }
      /**
       * Устанавливает обработчики событий формы.
       * Важно: метод вызывается после вставки HTML в диалог.
       */
      setupEventListeners(serverName, serverData) {
        setTimeout(() => {
          const $form = $("#serverOptionsForm");
          if (!$form.length) {
            console.warn("Form element not found for server options.");
            return;
          }
          $("#viewModsInfoBtn").off("click").on("click", () => {
            const serverObject = Array.isArray(serverData) ? serverData[0] : serverData;
            this.editServerMods.openModsInfo(serverObject, serverName);
          });
          $form.off("submit").on("submit", (event) => {
            event.preventDefault();
            setTimeout(() => {
              this.serversInstance.parseServers();
              foxEngine.servers.parseOnline();
            }, 500);
          });
          const $serverImageDropdown = $form.find('[name="serverImage"]');
          const $previewImage = $("#previewImage");
          if ($serverImageDropdown.length && $previewImage.length) {
            $serverImageDropdown.off("change").on("change", (e) => {
              this.setImage(e.target.value, $previewImage);
            });
          }
          let img = serverData[0]["serverImage"];
          this.setImage(img, $previewImage);
        }, 500);
      }
      async openAddServerDialog() {
        try {
          await this.loadAllOptions();
          this.createDialogIfNeeded();
          this.updateFieldOptions();
          const emptyData = {
            id: null,
            serverName: "",
            host: "",
            port: "",
            ignoreDirs: [],
            enabled: false,
            checkLib: false,
            serverGroups: [],
            serverDescription: "",
            serverVersion: "",
            jreVersion: "",
            serverImage: ""
          };
          const dataArray = [emptyData];
          const formStart = `<form id="serverOptionsForm" class="form-floating" method="POST" action="/" autocomplete="off">`;
          const nameFieldHtml = `
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="serverName" name="serverName" placeholder="\u0418\u043C\u044F \u0441\u0435\u0440\u0432\u0435\u0440\u0430" value="">
                    <label for="serverName">\u0418\u043C\u044F \u0441\u0435\u0440\u0432\u0435\u0440\u0430</label>
                </div>
            `;
          const otherFieldsHtml = await this.buildField.buildFormFields(dataArray);
          const serverEndFormTpl = this.serversInstance.adminPanel.templateCache["addServerEndForm"];
          const formEnd = await this.serversInstance.adminPanel.foxEngine.replaceTextInTemplate(serverEndFormTpl, {
            serverName: "",
            id: ""
          });
          const fullHtml = formStart + nameFieldHtml + otherFieldsHtml + formEnd;
          this.jsonArrConfig.loadFormIntoDialog(fullHtml, "new");
          this.setupEventListeners("new", dataArray);
        } catch (error) {
          console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043E\u0442\u043A\u0440\u044B\u0442\u0438\u0438 \u043E\u043A\u043D\u0430 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u044F \u0441\u0435\u0440\u0432\u0435\u0440\u0430:", error);
        }
      }
      setImage(imageUrl, $previewImage) {
        if (!($previewImage instanceof jQuery)) {
          $previewImage = $("#previewImage");
        }
        if (imageUrl) {
          $previewImage.attr("src", imageUrl).css("display", "block");
        } else {
          $previewImage.attr("src", "").css("display", "none");
        }
      }
    };
  }
});

// options/Servers.js
var Servers;
var init_Servers = __esm({
  "options/Servers.js"() {
    init_EditServer();
    Servers = class {
      constructor(adminPanel2) {
        this.adminPanel = adminPanel2;
        this.formFields = [
          { fieldName: "host", fieldType: "text" },
          { fieldName: "port", fieldType: "number" },
          { fieldName: "ignoreDirs", fieldType: "tagify" },
          { fieldName: "enabled", fieldType: "checkbox" },
          { fieldName: "checkLib", fieldType: "checkbox" },
          { fieldName: "serverGroups", fieldType: "tagify" },
          { fieldName: "serverDescription", fieldType: "textarea" },
          { fieldName: "serverVersion", fieldType: "dropdown", optionsArray: this.versions },
          { fieldName: "jreVersion", fieldType: "dropdown", optionsArray: this.javaVersions },
          { fieldName: "serverImage", fieldType: "dropdown", optionsArray: this.serverPictures }
        ];
        this.editServer = new EditServer(this);
      }
      async getServerData(server) {
        const query = {
          admPanel: "parseServers"
        };
        if (server && server.trim() !== "") {
          query.server = `serverName = '${server}'`;
        }
        return await foxEngine.sendPostAndGetAnswer(query, "JSON");
      }
      async parseServers() {
        try {
          const servers = await this.getServerData("");
          if (servers.length > 0) {
            await this.displayServers(servers);
          } else {
            const noServersHtml = this.adminPanel.templateCache["noServers"];
            foxEngine.page.loadData(noServersHtml, "#adminContent");
          }
        } catch (error) {
          console.error("An error occurred:", error.message);
        }
      }
      async displayServers(servers) {
        const serversList = $("#serversList");
        serversList.html("");
        const serverRowTpl = this.adminPanel.templateCache["serverRow"];
        for (let index = 0; index < servers.length; index++) {
          const server = servers[index];
          let icon;
          if (server.enabled == "true") {
            icon = `<i style="color: green" class="fa-thin fa-check"></i>`;
          } else {
            icon = `<i style="color: red" class="fa-regular fa-xmark-large fa-fw"></i>`;
          }
          const serverHtml = await foxEngine.replaceTextInTemplate(serverRowTpl, {
            index: server.id,
            //index + 1
            serverName: server.serverName,
            serverVersion: server.serverVersion,
            serverVstyle: server.serverVersion.split("-")[0].replaceAll(".", ""),
            serverDescription: server.serverDescription,
            enabled: icon,
            serverGroups: server.serverGroups
          });
          serversList.append(serverHtml);
        }
        $(".editServerButt").click((event) => {
          const serverName = $(event.currentTarget).attr("data-serverName");
          this.editServer.loadServerOptions(serverName);
        });
        $(".deleteServerButt").click((event) => {
          console.log($(event.currentTarget).attr("data-id"));
          const serverName = $(event.currentTarget).attr("data-serverName");
          const serverId = $(event.currentTarget).attr("data-serverId");
          foxEngine.confirmDialog?.(
            `\u0412\u044B \u0443\u0432\u0435\u0440\u0435\u043D\u044B, \u0447\u0442\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u0441\u0435\u0440\u0432\u0435\u0440 <b>${serverName}</b>?`,
            async () => {
              this.editServer.deleteServer(serverId);
            },
            {
              title: "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u0435 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u044F",
              confirmText: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C",
              cancelText: "\u041E\u0442\u043C\u0435\u043D\u0430"
            }
          ) || confirm(`\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0441\u0435\u0440\u0432\u0435\u0440 ${serverName}?`) && this.editServer.deleteServer(serverId);
        });
        $("#addServerButton").click((event) => {
          this.editServer.openAddServerDialog();
        });
      }
      async addContent() {
        const adminContent = $("#adminContent");
        adminContent.html(" ");
        if (!adminContent.find("> table").length) {
          const tableHeader = this.adminPanel.templateCache["serversTable"];
          adminContent.html(tableHeader);
        }
      }
    };
  }
});

// options/EditInfoBox.js
var EditInfoBox;
var init_EditInfoBox = __esm({
  "options/EditInfoBox.js"() {
    init_JsonArrConfig();
    init_BuildField();
    EditInfoBox = class {
      constructor(adminPanel2) {
        this.formFields = [
          { fieldName: "group_name", fieldType: "text" },
          { fieldName: "start_timestamp", fieldType: "date" },
          { fieldName: "end_timestamp", fieldType: "date" },
          { fieldName: "title", fieldType: "text" },
          { fieldName: "text", fieldType: "textarea" },
          { fieldName: "image", fieldType: "text" },
          { fieldName: "button_text", fieldType: "text" },
          { fieldName: "button_url", fieldType: "text" }
        ];
        this.buildField = new BuildField(this);
        this.jsonArrConfig = new JsonArrConfig(
          this,
          //.formFields.map(f => f.fieldName),
          this.submitHandler.bind(this),
          this.buildField
        );
      }
      async openEditWindow() {
        try {
          console.log("\u0417\u0430\u043F\u0440\u043E\u0441 \u043D\u0430 \u0441\u0435\u0440\u0432\u0435\u0440...");
          const infoBoxArray = await foxEngine.sendPostAndGetAnswer(
            { sysRequest: "infoBox" },
            "JSON"
          );
          console.log("\u041E\u0442\u0432\u0435\u0442 \u043E\u0442 \u0441\u0435\u0440\u0432\u0435\u0440\u0430:", infoBoxArray);
          if (infoBoxArray && Array.isArray(infoBoxArray) && infoBoxArray.length > 0) {
            this.jsonArrConfig.openFormWindow(
              infoBoxArray,
              "InfoBox",
              { admPanel: "infoBoxUpdate" }
            );
          } else {
            console.warn("\u041D\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0445 \u0434\u043B\u044F \u043E\u0442\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F");
          }
        } catch (error) {
          console.error("An error occurred while loading infobox:", error.message);
        }
      }
      async submitHandler(button, user) {
        const answer = await this.jsonArrConfig.updateJsonConfig("infoBoxUpdate");
        button.notify(answer.message, answer.type);
        setTimeout(() => {
          foxEngine.modalApp.closeModalApp();
        }, 500);
      }
    };
  }
});

// options/EditAllBadges.js
var EditAllBadges;
var init_EditAllBadges = __esm({
  "options/EditAllBadges.js"() {
    init_JsonArrConfig();
    init_BuildField();
    EditAllBadges = class {
      constructor(adminPanel2) {
        this.adminPanel = adminPanel2;
        this.formFields = [
          { fieldName: "badgeName", fieldType: "text" },
          { fieldName: "description", fieldType: "text" },
          { fieldName: "img", fieldType: "text" }
        ];
        this.buildField = new BuildField(this);
        this.jsonArrConfig = new JsonArrConfig(
          this,
          //.formFields.map(f => f.fieldName),
          this.submitHandler.bind(this),
          this.buildField
        );
      }
      async openEditWindow() {
        try {
          console.log("\u0417\u0430\u043F\u0440\u043E\u0441 \u043D\u0430 \u0441\u0435\u0440\u0432\u0435\u0440...");
          const allBadgesArray = await foxEngine.sendPostAndGetAnswer(
            { admPanel: "getAllBadges" },
            "JSON"
          );
          console.log("\u041E\u0442\u0432\u0435\u0442 \u043E\u0442 \u0441\u0435\u0440\u0432\u0435\u0440\u0430:", allBadgesArray);
          if (allBadgesArray && Array.isArray(allBadgesArray) && allBadgesArray.length > 0) {
            this.jsonArrConfig.openFormWindow(
              allBadgesArray,
              "AllBadges",
              { admPanel: "allBadgesUpdate" }
            );
          } else {
            console.warn("\u041D\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0445 \u0434\u043B\u044F \u043E\u0442\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F");
          }
        } catch (error) {
          console.error("An error occurred while loading infobox:", error.message);
        }
      }
      async submitHandler(button, user) {
        const answer = await this.jsonArrConfig.updateJsonConfig("allBadgesUpdate");
        button.notify(answer.message, answer.type);
        setTimeout(() => {
          foxEngine.modalApp.closeModalApp();
        }, 500);
      }
    };
  }
});

// AdminPanel.js
var require_AdminPanel = __commonJS({
  "AdminPanel.js"(exports, module) {
    init_Settings();
    init_Users();
    init_Permissions();
    init_Servers();
    init_EditInfoBox();
    init_EditAllBadges();
    var AdminPanel = class {
      constructor(foxEngine2, templateConfig) {
        this.foxEngine = foxEngine2;
        this.templateConfig = templateConfig;
        this.loadAdminTemplates();
        this.selectoption = { thisAdmoption: "", thatAdmoption: "" };
        this.settings = new Settings();
        this.users = new Users(this);
        this.permissions = new Permissions(this);
        this.servers = new Servers(this);
        this.editInfoBox = new EditInfoBox(this);
        this.editAllBadges = new EditAllBadges(this);
      }
      setAdmOption(option2) {
        $(".admOpt-" + option2).addClass("active");
        if (option2 != this.selectoption.thisAdmoption) {
          this.selectoption.thatAdmoption = this.selectoption.thisAdmoption;
          $(".admOpt-" + this.selectoption.thatAdmoption).removeClass("active");
        }
        this.selectoption.thisAdmoption = option2;
        this.foxEngine.foxesInputHandler.formInit(500);
      }
      async loadAdmOpt(option) {
        eval("this." + option + ".parse" + this.capitalizeFirstLetter(option) + "();");
        eval("this." + option + ".addContent();");
        this.setAdmOption(option);
      }
      capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
      async loadAdminTemplates() {
        const templates = this.templateConfig.templates;
        if (!templates) {
          this.foxEngine.log("\u041D\u0435\u0442 \u043F\u0443\u0442\u0435\u0439 \u0434\u043E \u0448\u0430\u0431\u043B\u043E\u043D\u043E\u0432 \u0432 \u043A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u0438", "WARN");
          return;
        }
        if (!this.templateCache) {
          this.templateCache = {};
        }
        const self = this;
        const templatePromises = Object.entries(templates).map(async ([key, path]) => {
          try {
            const rawHtml = await this.foxEngine.loadTemplate(path, true);
            self.templateCache[key] = rawHtml;
            this.foxEngine.log(`\u0428\u0430\u0431\u043B\u043E\u043D \u0430\u0434\u043C\u0438\u043D\u043F\u0430\u043D\u0435\u043B\u0438 ${key} \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D`);
          } catch (error) {
            this.foxEngine.log(`\u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u0448\u0430\u0431\u043B\u043E\u043D\u0430 \u0434\u043B\u044F "${key}" \u0441 \u043F\u0443\u0442\u0451\u043C "${path}":`, "ERROR");
          }
        });
        await Promise.all(templatePromises);
      }
    };
    var adminTemplates = {
      "templates": {
        "userTable": "/templates/" + replaceData["template"] + "/foxEngine/admin/users/userTable.tpl",
        "userRow": "/templates/" + replaceData["template"] + "/foxEngine/admin/users/userRow.tpl",
        "serverRow": "/templates/" + replaceData["template"] + "/foxEngine/admin/servers/serverRow.tpl",
        "serversTable": "/templates/" + replaceData["template"] + "/foxEngine/admin/servers/serversTable.tpl",
        "noServers": "/templates/" + replaceData["template"] + "/foxEngine/admin/servers/noServers.tpl",
        "serverEndForm": "/templates/" + replaceData["template"] + "/foxEngine/admin/servers/editServerEnd.tpl",
        "addServerEndForm": "/templates/" + replaceData["template"] + "/foxEngine/admin/servers/addServerEnd.tpl",
        "permRow": "/templates/" + replaceData["template"] + "/foxEngine/admin/permissions/permRow.tpl",
        "permTable": "/templates/" + replaceData["template"] + "/foxEngine/admin/permissions/permTable.tpl"
      }
    };
    document.addEventListener("DOMContentLoaded", () => {
      const adminPanel2 = new AdminPanel(window.foxEngine, adminTemplates);
      window.adminPanel = adminPanel2;
    });
  }
});
export default require_AdminPanel();
//# sourceMappingURL=AdminPanel.js.map
