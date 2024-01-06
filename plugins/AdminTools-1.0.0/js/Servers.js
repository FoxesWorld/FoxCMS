class Servers {
    constructor() {
        this.servers = [];
    }

    async parseServers() {
        try {
            this.addContent();

            let servers = await foxEngine.sendPostAndGetAnswer({
                sysRequest: "parseServers"
            }, "JSON");

            if (servers.length > 0) {
                this.displayServers(servers);
            } else {
                const noServersHtml = `<div class="noServers"><h1>No Servers available</h1></div>`;
                foxEngine.loadData(noServersHtml, "#adminContent");
            }

        } catch (error) {
            console.error('An error occurred:', error.message);
        }
    }

    displayServers(servers) {
        const serversList = $("#serversList");
        serversList.html("");

        servers.forEach((server, index) => {
            const {
                serverName,
                serverVersion,
                serverDescription
            } = server;

            const serverHtml = `
        <tr>
          <th scope="row">${index + 1}</th>
          <td class="${serverName}"><a href="#" onclick="return false;">${serverName}</a></td>
          <td>${serverVersion}</td>
          <td>${serverDescription}</td>
          <td><button onclick="=foxEngine.showServerProfile('${serverName}'); return false;">Edit</button></td>
        </tr>`;
            serversList.append(serverHtml);
        });
    }

    addContent() {
        const adminContent = $("#adminContent");
        adminContent.html(" ");

        if (!adminContent.find("> table").length) {
            adminContent.html(`
        <table class="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">ServerName</th>
              <th scope="col">Version</th>
              <th scope="col">Description</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="serversList"></tbody>
        </table>
      `);
        }
    }
}