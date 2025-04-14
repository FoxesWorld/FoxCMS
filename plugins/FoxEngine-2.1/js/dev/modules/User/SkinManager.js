export class SkinManager {
    constructor(foxEngine, apiService) {
        this.foxEngine = foxEngine;
        this.apiService = apiService;
    }

    async getSkin(login, side) {
        return this.apiService.request({ sysRequest: 'skinPreview', login, side }, 'TEXT');
    }

    async getUserSkinSet(login) {
        return Promise.all([
            this.getSkin(login, 'front'),
            this.getSkin(login, 'back')
        ]);
    }
}

