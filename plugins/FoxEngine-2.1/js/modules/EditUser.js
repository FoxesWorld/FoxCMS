import { User } from './User.js';

export class EditUser extends User {
  constructor(foxEngine) {
    super(foxEngine);
  }

  /**
   * Инициализация редактора: скины + UI‑контролы
   */
  async initialize(login) {
    this.login = login;
    await this.drawSkins(login);
    //this.loadColors();
    //this.initColorPicker();
    this.initTabListeners();
  }

  /**
   * Рендер палитры цветов (единожды)
   
  loadColors() {
    const allowed = [...this.foxEngine.replaceData.allowedColors];
    const $val    = $('#colourVal');
    let selected  = $val.val() || allowed[0];
    if (!allowed.includes(selected)) allowed.push(selected);
    $val.val(selected);

    const container = document.getElementById('profileColors');
    container.innerHTML = '';
    const frag = document.createDocumentFragment();

    allowed.forEach((color, idx) => {
      const isChecked = color === selected;
      const label     = document.createElement('label');
      label.htmlFor   = `ColorInput_${idx}`;
      label.innerHTML = `
        <div class="colorBlock ${isChecked ? 'checked' : ''}" id="Color${idx}"
             style="background-color:${color}">
          <input type="radio" name="colorPicker" id="ColorInput_${idx}"
                 value="${color}" ${isChecked ? 'checked' : ''} hidden>
          <div class="innerDiv" style="display:${isChecked?'block':'none'}">
            <i class="fa fa-check"></i>
          </div>
        </div>`;
      frag.appendChild(label);
    });

    container.appendChild(frag);
  }

  /**
   * Делегированный выбор цвета:
   *  - переключает .checked
   *  - прячет/показывает innerDiv
   *  - записывает в #colourVal
   
  initColorPicker() {
    $('#profileColors').on('click', '.colorBlock', event => {
      const $block = $(event.currentTarget);
      // сброс у всех
      $('#profileColors .colorBlock').removeClass('checked').find('.innerDiv').hide();
      // пометка текущего
      $block.addClass('checked').find('.innerDiv').show();
      // запись в скрытое поле
      const color = $block.find('input[name="colorPicker"]').val();
      $('#colourVal').val(color);
    });
  } */

  initTabListeners() {
    $('.tabs .tab_caption').on('click', 'li:not(.active)', event => {
      this.openTab($(event.currentTarget).index());
    });
  }

  toggleEditView() {
    const $v = $('#view'), $e = $('#edit');
    $v.is(':visible') ? $v.fadeOut('slow', () => $e.fadeIn('slow')): $e.fadeOut('slow', () => $v.fadeIn('slow'));
  }

  openTab(idx) {
    if ($('#view').is(':visible')) this.toggleEditView();
    const $caps = $('.tabs .tab_caption li'),
          $cont = $('.tabs .tab_content');
    $caps.removeClass('active').eq(idx).addClass('active');
    $cont.removeClass('active').eq(idx).addClass('active');
  }

  async uploadFile(button, type) {
    try {
      const files = window[`${type}Files`] || {};
      const fd    = new FormData();
      Object.entries(files).forEach(([k,f]) => fd.append(k,f));
      fd.append('sysRequest','uploadFile');
      fd.append('type',type);
      fd.append('login',this.login);
      fd.append('csrf_token',this.foxEngine.replaceData.hash);

      const resp = await fetch('/', { method:'POST', body:fd, credentials:'same-origin' });
      const json = await resp.json();
      button.notify(json.message, json.type);
      if (json.type==='success') await this.drawSkins(this.login);
    } catch (err) {
      console.error('EditUser.uploadFile error:', err);
      button.notify('Ошибка при загрузке файла','error');
    }
  }

  async deleteFile(button, type) {
    try {
      const json = await this.apiRequest({ sysRequest:'deleteFile', type, login:this.login });
      button.notify(json.message, json.type);
      if (json.type==='success') await this.drawSkins(this.login);
    } catch (err) {
      console.error('EditUser.deleteFile error:', err);
      button.notify('Ошибка при удалении файла','error');
    }
  }

  /** Асинхронно перерисовываем скины (унаследованный parseUserLook + img‑src) */
  async drawSkins(login) {
    try {
      await this.parseUserLook(login);
      const { front, back } = this.userSkin;
      $('#skin_image_front').attr('src', `data:image/png;base64,${front}`);
      $('#skin_image_back').attr('src',  `data:image/png;base64,${back}`);
    } catch (err) {
      console.error('EditUser.drawSkins error:', err);
    }
  }
}
