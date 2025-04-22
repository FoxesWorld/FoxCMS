export class BadgeManager {
    constructor(foxEngine, apiService) {
        this.foxEngine = foxEngine;
        this.apiService = apiService;
        this.lastUser = null;
        this.loadedBadgeKeys = new Set();
        this.cachedBadges = []; // <--- хранит массив бейджей
    }

    getBadgeKey(badge) {
        return badge.id
            ? String(badge.id)
            : `${badge.badgeName}_${Math.floor(new Date(badge.acquiredDate).getTime() / 1000)}`;
    }

    reset() {
        this.loadedBadgeKeys.clear();
        this.cachedBadges = [];
    }

    async loadBadges(user) {
        if (this.lastUser !== user) {
            this.reset();
            this.lastUser = user;
        }

        const container = document.getElementById('userBadges');
        if (!container) {
            this.foxEngine.log('Badge container not found', 'WARN');
            return;
        }

        const tpl = this.foxEngine.templateCache["badge"];
        if (!tpl) {
            console.error('Badge template missing');
            return;
        }

        const badges = await this.apiService.request({ user_doaction: 'GetBadges', userDisplay: user });
        this.cachedBadges = badges;

        if (!badges.length && !this.loadedBadgeKeys.size) {
            document.getElementById('badgesWrapper').remove();
            return;
        }

        const fragment = document.createDocumentFragment();
        for (const badge of badges) {
            const badgeKey = this.getBadgeKey(badge);
            if (this.loadedBadgeKeys.has(badgeKey)) continue;

            const html = await this.foxEngine.replaceTextInTemplate(tpl, {
                BadgeId: badgeKey,
                BadgeDesc: badge.description,
                AcquiredDateFormatted: this.foxEngine.utils.getFormattedDate(badge.acquiredDate),
                BadgeName: badge.badgeName,
                BadgeImg: badge.badgeImg
            });

            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html.trim();
            const badgeElement = tempDiv.firstElementChild;
            if (badgeElement) {
                badgeElement.dataset.badgeId = badgeKey;
                fragment.appendChild(badgeElement);
                this.loadedBadgeKeys.add(badgeKey);
            }
        }

        container.appendChild(fragment);
        $(container).find('[data-toggle="tooltip"]').tooltip(
		 {
			placement: 'bottom',
			trigger: 'hover',
			container: 'body',
			delay: {show: 100, hide: 100}
		  })
		  .on('click', function () {
			$(this).tooltip('hide');
		  });
    }

async getBadgesArray(user) {
    if (!user) return [];

    this.foxEngine.log(`[BadgeManager] Fetching badges array for ${user}`);
    
    try {
        const badges = await this.apiService.request({ user_doaction: 'GetBadges', userDisplay: user });

        const result = badges.map(badge => ({
            badgeId: badge.id || `${badge.badgeName}_${Math.floor(new Date(badge.acquiredDate).getTime() / 1000)}`,
            badgeName: badge.badgeName,
            description: badge.description,
            acquiredDate: badge.acquiredDate,
            badgeImg: badge.badgeImg
        }));

        this.foxEngine.log(`[BadgeManager] Returning API badges array:`, result);
        return result;
    } catch (error) {
        console.error(`[BadgeManager] Failed to fetch badges for ${user}:`, error);
        return [];
    }
}


}
