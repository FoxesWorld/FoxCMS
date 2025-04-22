   <div id="button-up" style="display: block;">
        <i class="fas fa-arrow-up" aria-hidden="true"></i>
    </div>
<footer class="bar">
   <div class="container footer--flex">
   
	<div class="footer-copyright d-lg-block d-none">
		{$siteTitle} {$siteStatus} <b>{$year}</b>
		<span>Powered by {$webserviceName} v.{$ServiceVersion}<img class="img-fluid" uk-img /></span>
	</div>

	  
	  <div style="margin: 0px 15px;">
			<h5>© 2016-{$year} FoxesCraft.RU</h5>
			<noindex>
				Все права сохранены. Копирование материалов без разрешения администрации запрещено.<br>
				Мы предоставляем бесплатный ознакомительный вариант игры <a href="https://minecraft.net/" target="_blank" rel="nofollow noopener">Minecraft</a>.
			</noindex>
			<div class="pt-1">
				<a id="admin_contact" href="mailto:{$contactEmail}">{$contactEmail}</a>
				<a href="#" onclick="foxEngine.page.loadPage('rules'); return false;">Правила</a> ·
				<a href="#" onclick="foxEngine.page.loadPage('privacyPolicy'); return false;">Политика конфиденциальности</a>
			</div>
		</div>

      <ul class="footer-end">
	  
	  <div class="ms-end">
			<div class="social-icon-list py-1" id="socialLinksBlock">
			
			</div>
			{literal}
				<script type="module">
				document.addEventListener('DOMContentLoaded', function () {
					const block = document.getElementById('socialLinksBlock');
					const links = {
					  'telegram': { title: 'Telegram', slug: 'https://t.me/+VyduZeS0IwhkMWFi' },
					  'vk': { title: 'ВКонтакте', slug: 'https://vk.com/foxesworlds1' },
					  'discord': { title: 'Discord', slug: 'https://discord.gg/t59KW4ESWV' },
					  'youtube': { title: 'YouTube', slug: 'https://www.youtube.com/channel/UCzAKXn6Kbizv7dspREdqztQ' },
					  'github': { title: 'GitHub', slug: 'https://github.com/FoxesWorld' }
					};

					for (const [key, social] of Object.entries(links)) {
					  const a = document.createElement('a');
					  a.classList.add('social-icon', 'tip', key);
					  a.title = social.title;
					  a.rel = 'nofollow noopener';
					  a.target = '_blank';
					  a.href = social.slug;
					  a.innerHTML = '<i class="fa-brands fa-' + key + '" />';
					  block.appendChild(a);
					}
				}, { once: true });
				</script>
			{/literal}
			<div class="mt-1 text-end user-select-none">
				
			</div>
		</div>
      </ul>
   </div>
</footer>