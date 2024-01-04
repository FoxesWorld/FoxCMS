<?php
if (!defined('FOXXEY')) die("Hacking attempt!");

class Skin extends Cabinet {
	
	function __construct(){
		if (HDSkin($member_id['uuid'])) 
			$info = returnNotifer("У вас есть возможность установить себе HD скин с разрешением от 64х32 до 2048x1024", 'check', '', 'margin-top: 10px;');
		else $info = returnNotifer("HD скин могут устанавливать владельцы Золотого и Алмазного аккаунтов.", 'times', 'false', 'margin-top: 10px;');
		if (HDCape($member_id['uuid'])) $infoCape = returnNotifer("У вас есть возможность установить себе HD плащ с разрешением от 64х32 до 2048x1024", 'check', '', 'margin-top: 10px;');
		else $infoCape = returnNotifer("HD плащ могут устанавливать владельцы Железного, Золотого и Алмазного аккаунтов.", 'times', 'false', 'margin-top: 10px;');

		if (!file_exists($_SERVER['DOCUMENT_ROOT'] . "/uploads/".init::$usrArray['login']."/skin.png")) $disabled = "disabled";
		if (!file_exists($_SERVER['DOCUMENT_ROOT'] . "/uploads/".init::$usrArray['login']."/cape.png")) {
			$disabled_cape = "disabled";
			$cape_info = "<div style='margin-top: 7px' class='uk-text-muted uk-text-small'>Сейчас у вас нет плаща, вы видите только свой скин.</div>";
		} else $cape_info = "<div style='margin-top: 7px' class='uk-text-primary uk-text-small'>Слева вы видите себя с плащем на спине.</div>";

		if ($member_id['hd_forever']) {
			$hd_info_skin = "<div style='margin-top: 20px;' class='uk-text-success'><i class='uk-icon-check-circle'></i> Вы можете устанавливать HD скин (навсегда)</div>";
			$hd_info_cape = "<div style='margin-top: 20px;' class='uk-text-success'><i class='uk-icon-check-circle'></i> Вы можете устанавливать HD плащ (навсегда)</div>";
		} else if ($member_id['hd_can'] > time()) {
			if (!isCan($member_id['uuid'], 'gold') && isCan($member_id['uuid'], 'diamond')) $hd_info_skin = "<div style='margin-top: 20px;' class='uk-text-success'><i class='uk-icon-check-circle'></i> Доступ к HD закончится через " . showDateDo($member_id['hd_can']) . "</div>";
		} else if (!isCan($member_id['uuid'], 'gold') && !isCan($member_id['uuid'], 'diamond')) $hd_info_skin = "<div style='margin-top: 20px;'><i class='uk-icon-info-circle'></i> <a id='iwanthd' class='uk-text-primary'>Я хочу HD скин, что мне для этого нужно?</a></div>";
		$skincon = "
				<div class='innerContent'>
					<table class='uk-width-1-1'>
						<tr>
							<td valign='top' width='280px'>
								<img src='$DURL/skin-7-$username' id='frontSkinID'>
								<img src='$DURL/skin-8-$username' id='backSkinID'>
							</td>
							<td valign='top'>
								<b>Скин</b> - ваш внешний вид на наших серверах. Именно так вас будут видеть все наши игроки. Красивые скины привлекают внимание и выделяются среди обыкновенных.
								<div id='skin_info'>$info</div>
								
								<form id='uploadSkin' action method='post'>
									<div class='uk-form-file uk-width-1-1'>
										<button class='uk-button uk-width-1-1' type='button' style='margin-top: 15px' id='loadSkin'>Загрузить новый скин</button>
										<input type='file' name='skin_upload' id='skin_upload' accept='.png'>
									</div>
								</form>
								<button class='uk-button uk-width-1-1' type='button' style='margin-top: 5px; opacity: 0.9' id='removeSkin' $disabled>Вернуть скин по-умолчанию</button>
								$hd_info_skin
							</td>
						</tr>
					</table>
				</div>
				
				<div class='innerContent' style='margin-top: 20px;'>
					<table class='uk-width-1-1'>
						<tr>
							<td valign='top' width='280px'>
								<img src='$DURL/skin-1-$username' id='backCapeID'>
								<img src='$DURL/skin-2-$username' id='frontCapeID'>
							</td>
							<td valign='top'>
								<b>Плащ</b> - отображается на спине вашего персонажа. Плащ поможет вам выразить свою индивидуальность или причастность к определенной группе игроков (напр. клан).
								$cape_info
								<div id='cape_info'>$infoCape</div>
								
								<form id='uploadCape' action method='post'>
									<div class='uk-form-file uk-width-1-1'>
										<button class='uk-button uk-width-1-1' type='button' style='margin-top: 15px' id='loadCape'>Загрузить новый плащ</button>
										<input type='file' name='cape_upload' id='cape_upload' accept='.png'>
									</div>
								</form>
								<button class='uk-button uk-width-1-1' type='button' style='margin-top: 5px; opacity: 0.9' id='removeCape' $disabled_cape>Удалить плащ</button>
								$hd_info_cape
							</td>
						</tr>
					</table>
				</div>
				<div id='offerhd_content'></div>
			";
	}
}

