<footer class="bar">
   <div class="container footer--flex">
      <div class="footer-copyright">
         {$siteTitle} {$siteStatus} <b>{$year}</b>
		 <span>Powered by {$webserviceName} v.{$ServiceVersion}<img class="img-fluid" uk-img /></span>
      </div>

      <ul class="footer-end">
	  
	  <div class="ms-auto">
			<div class="social-icon-list py-1" id="socialLinksBlock">
			
			</div>
			{literal}
				<script type="module">
				document.addEventListener('DOMContentLoaded', function () {
					const block = document.getElementById('socialLinksBlock');
					const links = {
					  'vk': { title: 'ВКонтакте', slug: 'https://vk.com/foxesworlds1' },
					  'discord': { title: 'Discord', slug: 'https://discord.gg/MkWUjBzt3Y' },
					  'github': { title: 'GitHub', slug: 'https://github.com/FoxesWorld' },
					};

					for (const [key, social] of Object.entries(links)) {
					  const a = document.createElement('a');
					  a.classList.add('social-icon', 'tip', key);
					  a.setAttribute('data-toggle', 'tooltip');
					  a.title = social.title;
					  a.rel = 'nofollow noopener';
					  a.target = '_blank';
					  a.href = social.slug;
					  a.innerHTML = `<i class="fa-brands fa-${key}"></i>`;
					  block.appendChild(a);
					  $('[data-toggle="tooltip"]').tooltip({
                        placement: 'bottom',
                        trigger: "hover"
                    });
					}
				}, { once: true });
				</script>
			{/literal}
			<div class="mt-1 text-end user-select-none">
				
			</div>
		</div>
		<!-- <li><i class="fa fa-envelope-o"></i> Почта: <b>{$contactEmail}</b></li> -->
		<li class="d-none d-md-flex">
			<a href="https://webmaster.yandex.ru/siteinfo/?site=foxescraft.ru">
				<img width="88" height="31" alt="" border="0" src="https://yandex.ru/cycounter?foxescraft.ru&theme=light&lang=ru"/>
			</a>
		</li>
      </ul>
   </div>
</footer>