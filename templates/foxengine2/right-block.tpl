{if !$isMobile}
<aside class="col-4 d-none d-lg-block d-sm-none">
	<div class="row rightBlock">
		<div class="card">
			<div id="userBlock">

			</div>

			<div class="card text-white mb-3">
				<div class="cardTitle">
					<img class="img-fluid" src="{$tplDir}/assets/icons/monitor.png" uk-img />
					Мониторинг
				</div>
				<div id="servers"></div>
			</div>

			<div class="card text-white mb-3">
				<div class="cardTitle">
					<img class="img-fluid" src="{$tplDir}/assets/icons/monitor.png" uk-img />
					Голосуй
				</div>

				<h3 style="margin: 0 auto;color: antiquewhite;padding: 15;">
				<div class="importantText">
					<strong>Coming Soon!</strong>
				</div>
				</h3>
				
		<!--<div class="right-block-content">
            <div class="right-block-vote-items">
                    <a href="https://mcrate.su/rate/9012" target="_blank"><em>Голосуй за нас на <span>McRate</span></em> <i class="vote-item-ico1"></i></a>
                    <a href="https://topcraft.ru/servers/10656/" target="_blank"><em>Голосуй за нас на <span>TopCraft</span></em> <i class="vote-item-ico2"></i></a>
                    <a href="https://mctop.su/servers/6204/" target="_blank"><em>Голосуй за нас на <span>McTop</span></em> <i class="vote-item-ico3"></i></a>
            </div>
   		 </div> -->
			</div>

			<div class="card text-white mb-3">
				 <div class="cardTitle">
					<img class="img-fluid" src="{$tplDir}/assets/icons/lastuser.png" uk-img />
					Последняя регистрация
				</div>
				<div id="lastUser"></div>
			</div>
		</div>
	</div>
</aside>
{/if}
