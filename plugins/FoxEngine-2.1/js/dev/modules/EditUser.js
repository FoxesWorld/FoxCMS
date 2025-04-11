import { User } from './User.js';

export class EditUser extends User {
  constructor(foxEngine) {
    super(foxEngine);
  }

  async initialize(login) {
    this.login = login;
    await this.drawSkins(login);
    this.initTabListeners();
  }

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
