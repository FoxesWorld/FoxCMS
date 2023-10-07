class Settings {
  constructor() {
  }

  async parseSettings() {
    try {
      const response = await request.sendPost({
        admPanel: "cfgParse"
      });

      if (response.status === 200) {
        const responseData = await response.text();
        $("#adminContent").html(responseData);
      } else {
        console.error('HTTP error:', response.status);
        throw new Error(`HTTP Error: ${response.status}`);
      }
    } catch (error) {
      console.error('An error occurred:', error.message);
    }
  }
}
