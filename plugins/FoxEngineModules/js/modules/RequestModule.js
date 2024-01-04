// requestModule.js

const RequestModule = (function () {
	
	/**
     * Sends a POST request and returns the response.
     * @param {Object} requestBody - The request body to be sent.
     * @returns {Promise} A promise that resolves to the response of the request.
     */
    async function sendPostAndGetAnswer(requestBody) {
        try {
            let response = await sendPost(requestBody);
            await waitForResponse(response);

            return response;
        } catch (error) {
            console.error('Error while sending POST request and getting answer:', error);
            throw error;
        }
    }

    /**
     * Sends a POST request with the specified request body.
     * @param {Object} requestBody - The request body to be sent.
     * @returns {Promise} A promise that resolves to the response of the request.
     */
    async function sendPost(requestBody) {
        try {
            let response = await request.send_post(requestBody);
            await waitForResponse(response);

            return response;
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }

    /**
     * Waits for the response to be ready.
     * @param {Object} response - The response object.
     * @returns {Promise} A promise that resolves when the response is ready.
     */
    function waitForResponse(response) {
        return new Promise(resolve => {
            response.addEventListener("load", () => {
                resolve();
            });
        });
    }

    /**
     * Parses the response as JSON.
     * @param {string} responseText - The response text to be parsed.
     * @returns {Object} The parsed JSON object.
     */
    function parseResponseJSON(responseText) {
        try {
            return JSON.parse(responseText);
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }

    /**
     * Parses the response as an HTML document.
     * @param {string} responseText - The response text to be parsed.
     * @returns {Document} The parsed HTML document.
     */
    function parseResponseHTML(responseText) {
        try {
            return new DOMParser().parseFromString(responseText, 'text/html');
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }

    return {
        sendPost,
        waitForResponse,
        parseResponseJSON,
        parseResponseHTML,
		sendPostAndGetAnswer
    };
})();

export { RequestModule };
