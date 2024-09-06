   <div id="button-up" style="display: block;">
        <i class="fas fa-arrow-up" aria-hidden="true"></i>
    </div>
<footer class="bar">
   <div class="container footer--flex">
   
	  
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
					  'telegram': { title: 'Telegram', slug: 'https://t.me/foxesworld' },
					  'vk': { title: 'ВКонтакте', slug: 'https://vk.com/foxesworlds1' },
					  'discord': { title: 'Discord', slug: 'https://discord.gg/MkWUjBzt3Y' },
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
		
		<li class="d-none d-md-flex">
			<a href="https://webmaster.yandex.ru/siteinfo/?site=foxescraft.ru">
				<img width="88" height="31" alt="" border="0" src="https://yandex.ru/cycounter?foxescraft.ru&theme=light&lang=ru"/>
			</a>
		</li>
      </ul>
   </div>
</footer>