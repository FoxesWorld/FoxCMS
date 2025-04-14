export class ApiService {
    constructor(foxEngine) {
        this.foxEngine = foxEngine;
    }

    async request(payload, type = 'JSON') {
        try {
            return await this.foxEngine.sendPostAndGetAnswer(payload, type);
        } catch (err) {
            console.error('ApiService error:', err);
            throw err;
        }
    }
}