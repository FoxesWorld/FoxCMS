export class UserPlaytimeProcessor {
    constructor(serversColorMap = {}) {
        this.serversColorMap = serversColorMap;
    }

    parseServersOnline(serversOnline) {
        try {
            const raw = JSON.parse(serversOnline || '[]');

            const normalize = s => ({
                serverName: s.serverName || '',
                totalTime: Number(s.totalTime) || 0,
                lastPlayed: Number(s.lastPlayed) || 0,
                startTimestamp: Number(s.startTimestamp) || 0,
                lastUpdated: Number(s.lastUpdated) || 0
            });

            if (Array.isArray(raw)) {
                return raw.filter(s => s.serverName).map(normalize);
            }

            if (raw.servers && typeof raw.servers === 'object') {
                return Object.entries(raw.servers).map(([name, srv]) => normalize({ serverName: name, ...srv }));
            }

            return [];
        } catch {
            return [];
        }
    }

    calculateTotalPlaytime(serversOnline, selectedServer) {
        const servers = this.parseServersOnline(serversOnline);
        const now = Math.floor(Date.now() / 1000);

        const getServerPlaytime = s => {
            const base = s.totalTime || 0;
            const isActive = s.startTimestamp && (!s.lastUpdated || s.lastUpdated < now);
            return isActive ? base + (now - s.startTimestamp) : base;
        };

        if (selectedServer === 'all') {
            return servers.reduce((sum, s) => sum + getServerPlaytime(s), 0);
        }

        const server = servers.find(s => s.serverName === selectedServer);
        return server ? getServerPlaytime(server) : 0;
    }

    getLastLogin(serversOnline, selectedServer) {
        const servers = this.parseServersOnline(serversOnline);
        const relevant = selectedServer === 'all'
            ? servers.reduce((a, b) => ((a.lastPlayed || 0) > (b.lastPlayed || 0) ? a : b), { lastPlayed: 0 })
            : servers.find(s => s.serverName === selectedServer) || { lastPlayed: 0 };
        return relevant.lastPlayed || 0;
    }

    formatPlaytimeText(seconds) {
        const s = Math.round(seconds);
        const h = Math.floor(s / 3600);
        const m = Math.floor((s % 3600) / 60);
        const sec = s % 60;

        const parts = [];
        if (h > 0) parts.push(`${h} ${this.declineWord(h, 'час', 'часа', 'часов')}`);
        if (m > 0) parts.push(`${m} ${this.declineWord(m, 'минута', 'минуты', 'минут')}`);
        if (sec > 0) parts.push(`${sec} ${this.declineWord(sec, 'секунда', 'секунды', 'секунд')}`);

        return parts.join(' ') || `0 ${this.declineWord(0, 'секунда', 'секунды', 'секунд')}`;
    }

    declineWord(number, ...forms) {
        const n = Math.abs(number) % 100;
        const n1 = n % 10;
        if (n > 10 && n < 20) return forms[2];
        if (n1 > 1 && n1 < 5) return forms[1];
        if (n1 === 1) return forms[0];
        return forms[2];
    }

    sortUsersByPlaytime(users, selectedServer) {
        return users.sort((a, b) =>
            this.calculateTotalPlaytime(b.serversOnline, selectedServer) -
            this.calculateTotalPlaytime(a.serversOnline, selectedServer)
        );
    }

    extractServersSet(users) {
        const set = new Set();
        for (const u of users) {
            const parsed = this.parseServersOnline(u.serversOnline);
            for (const s of parsed) set.add(s.serverName);
        }
        return set;
    }
}
