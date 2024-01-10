class Settings {
    constructor() {}

    async parseSettings() {
        let response = await foxEngine.sendPostAndGetAnswer({
            admPanel: "cfgParse"
        }, "TEXT");

        $("#adminContent").html(response);
    }
}
export { Settings };