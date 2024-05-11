<?php
/* Smarty version 4.0.4, created on 2024-05-11 21:35:45
  from '/var/www/FoxCMS/templates/foxengine2/test.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_663fba81b4bbf9_46602356',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '3735d14c514bd23173cfe95d4778f394a2407e96' => 
    array (
      0 => '/var/www/FoxCMS/templates/foxengine2/test.tpl',
      1 => 1715451274,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_663fba81b4bbf9_46602356 (Smarty_Internal_Template $_smarty_tpl) {
?><ul class="user-panel js-user-panel">
			<li class="d-flex align-items-center">
			<a href="https://redserver.su/profile/600314-aidenfox"><img class="user-photo user-photo-small d-block" src="https://static.redserver.su/storage/photos/2024-05/600314-b2deccb9-thumb.jpg" alt="" id="userPhoto"></a>
		</li>
		<li class="dropdown-center">
			<a class="regular-btn dropdown-toggle user-select-none show" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="true">
				AidenFox <i class="fa-solid fa-chevron-down caret-icon"></i>
			</a>

			
			<div class="dropdown-menu fade dropdown-menu-popover p-2 show" style="width: 340px; position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(515px, 70px);" data-popper-placement="bottom">
				<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
					<div class="filled-box p-1 text-center lh-sm">
						<b class="fs-5" data-element="moneyDisplay">0</b><br>
						<span class="text-muted">Монеты</span>
					</div>
					<div class="filled-box p-1 text-center lh-sm">
						<b class="fs-5" data-element="bonusDisplay">0</b><br>
						<span class="text-muted">Бонусы</span>
					</div>
				</div>

				<div class="profile-action-wrapper my-2">
					<a class="profile-action-btn" href="https://redserver.su/profile/600314-aidenfox">
						<i class="fa-regular fa-address-card menu-icon"></i> Мой профиль
					</a>
					<a class="profile-action-btn" href="https://redserver.su/settings">
						<i class="fa-regular fa-gear menu-icon"></i> Настройки аккаунта
					</a>
											<a class="profile-action-btn" href="https://redserver.su/vote">
							<i class="fa-regular fa-gift menu-icon"></i> Бонус за голосование
						</a>
																													</div>

				<form action="https://redserver.su/logout" method="post">
					<button type="submit" class="btn w-100">
						<i class="fa-regular fa-arrow-right-from-bracket me-1"></i>Выйти из аккаунта
					</button>
					<input type="hidden" name="_token" value="LaInOmnOVxNCAlRS6aAfAnjsRTbhLi8V3nMbt3U7" autocomplete="off">
				</form>
			</div>
		</li>
		<li class="nav-sep"></li>
		<li class="dropdown-center">
			<a class="regular-btn regular-btn-icon dropdown-toggle" title="Сообщения" data-bs-toggle="dropdown" data-bs-auto-close="outside">
				<i class="fa-solid fa-envelope"></i>
				<span data-element="notificationsCounter" class="unread-counter d-none">0</span>
			</a>

			
			<div class="dropdown-menu fade dropdown-menu-popover p-2" style="width: 380px;">
				<h3 class="p-1 mb-0">Сообщения</h3>
				<div class="text-center">
					<i class="fa-regular fa-pen-ruler text-light fs-1 d-block mb-2"></i>
					<p class="form-text">
						Эта функция пока не реализована на сайте. Личные сообщения доступны на форуме.
					</p>
					<a class="btn w-100" href="https://redserver.su/go/messenger">Перейти на форум <i class="fa-regular fa-arrow-right"></i></a>
				</div>
			</div>
		</li>
		<li class="dropdown-center">
						<a href="https://redserver.su/notifications" class="regular-btn regular-btn-icon dropdown-toggle" title="Уведомления" data-bs-toggle="dropdown" data-bs-auto-close="outside">
				<i class="fa-solid fa-bell"></i>
				<span data-element="notificationsCounter" class="unread-counter d-none">0</span>
			</a>

			
			<div class="dropdown-menu fade dropdown-menu-popover p-0" style="width: 380px;" data-element="notificationsPane">
				<div class="p-3 pb-2">
					<h3 class="mb-0">Уведомления</h3>
				</div>
				<div class="scrollable-box" data-element="notificationsList">
					<div class="d-flex justify-content-center py-2">
						<div class="circle-loader"></div>
					</div>
				</div>
				<div class="p-2">
					<a href="https://redserver.su/notifications" class="btn w-100">
						<i class="fa-regular fa-list-ul me-1"></i>Все уведомления
					</a>
				</div>
			</div>
		</li>
				<li class="nav-sep"></li>
		<li>
			<a href="https://redserver.su/personal" class="btn"><i class="fa-regular fa-user-circle me-1"></i>Личный кабинет</a>
		</li>
	</ul><?php }
}
