{if !$isMobile}
<div class="col-4 d-none d-md-block">
<div class="row rightBlock">
<div class="card">
    <div id="userBlock">
		{include file='profileBlock.tpl'}
    </div>

  	
      	<div class="card text-white  mb-3">
      	  <div class="cardTitle">Мониторинг</div>
			<div id="servers">
			</div>
      	</div>
   		
      	<div class="card text-white  mb-3">
      	  <div class="cardTitle">Последняя регистрация</div>
			<div id="lastUser">
			
			</div>
      	</div>
		<!--
			<div class="widgets">

				<a href="https://discord.com/invite/mxV4uYq" title="Перейти на сервер Discord">
					<div class="social-widget discord-widget">
						<img src="{$tplDir}/assets/icons/svg/discord.svg" alt="Discord">
						<div class="social-status" title="Текущий онлайн сервера">
							<i class="fa fa-circle" aria-hidden="true"></i> 2217            </div>
					</div>
				</a>
			</div>
		-->
</div>
</div>
</div>
{/if}