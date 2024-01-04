<?php
	$count = 0;
	if(!defined('DATALIFEENGINE')) die("Hacking attempt!");
	if($member_id['name']) {
		
		$select = $db->query("SELECT * FROM shop_items WHERE percent>0 AND until>".time());
		$array = array();
		if($db->num_rows($select)) {
			while($get = $db->get_row($select)) {
				array_push($array, $get['id']);
			}
		}
		
		if(count($array)) {
			shuffle($array);
			for($i = 0; $i < 5; $i++) {
				$rnd = rand(0, count($array)-1);
				$id = $array[$rnd];
				$select = $db->super_query("SELECT * FROM shop_items WHERE id='$id'");
				if(!$select['id']) continue;
				$price = getPrice($id, $member_id);
				$word = get_count($select['stack'], "штуку", "штуки", "штук");
				$count++;
				if($count != 1) $op = " style='display: none'"; else $op = "";
				$check = $db->super_query("SELECT * FROM shop_list WHERE id='{$select['shopid']}'");
				$specialcontent_right .= "
					<div id='specialcontent_part' data-id='$count' $op>
						<center>
							<div class='special_name'>{$select['itemname']}</div>
							<div style='margin-top: 10px;'><img src='{$select['icon']}' width='100px'></div>
							<div style='margin-top: 10px; font-size: 20px;' class='special_discr'>
								{$price['text']}
								<div style='font-size: 13px;'>За {$select['stack']} $word</div>
								<div class='special_shopname'>{$check['shopname']}</div>
							</div>
							<a href='$DURL/shop?shopid={$select['shopid']}&act=show&item={$select['id']}'><button style='margin-top: 10px;' type='button' class='uk-width-1-1 uk-button'>Подробнее</button></a>
						</center>
					</div>
				";
				
				if($count%2 != 0 && $count%3 != 0 ) {
					if(!isCan($member_id['uuid'], 'diamond')) {
						$count++;
						$specialcontent_right .= "
							<div id='specialcontent_part' data-id='$count' style='display: none'>
								<center>
									<div class='special_name'>АЛМАЗНЫЙ АККАУНТ</div>
									<div><img src='$DURL/uploads/accs/diamond_acc.png' width='143px'></div>
									<div class='special_discr'>
										Хотите, чтобы ваша игра стала максимально интересной и насыщенной? Тогда прокачайте свой аккаунт до престижного и самого функционального - Алмазного аккаунта!
									</div>
									<a href='$DURL/cabinet?loc=power'><button style='margin-top: 10px;' type='button' class='uk-width-1-1 uk-button'>Подробнее</button></a>
								</center>
							</div>
						";
					}
				}
				else if($count%2 == 0) {
					if(!isCan($member_id['uuid'], 'diamond') && !isCan($member_id['uuid'], 'gold')) {
						$count++;
						$specialcontent_right .= "
							<div id='specialcontent_part' data-id='$count' style='display: none'>
								<center>
									<div class='special_name'>ЗОЛОТОЙ АККАУНТ</div>
									<div><img src='$DURL/uploads/accs/gold_acc.png' width='143px'></div>
									<div class='special_discr'>
										Менее функциональнее Алмазного аккаунта, но гораздо функциональнее Деревянного! Прокачайте свой аккаунт, насладитесь новыми возможностями!
									</div>
									<a href='$DURL/cabinet?loc=power'><button style='margin-top: 10px;' type='button' class='uk-width-1-1 uk-button'>Подробнее</button></a>
								</center>
							</div>
						";
					}
				}
				else if($count%3 == 0) {
					$count++;
					$specialcontent_right .= "
						<div id='specialcontent_part' data-id='$count' style='display: none'>
							<center>
								<div class='special_name'>РЕЖИМ ПОЛЕТА</div>
								<div><img src='http://paradisecloud.ru/uploads/shopimg/need/bat_left.png' width='143px'></div>
								<div class='special_discr'>
									Хотите летать на наших серверах без каких-либо ограничений? Просто взять и взлететь как эта прелестная летучая мышь!<br/>Это очень просто!
								</div>
								<a href='$DURL/cabinet?loc=power'><button style='margin-top: 10px;' type='button' class='uk-width-1-1 uk-button'>Подробнее</button></a>
							</center>
						</div>
					";
				}
			}
		}
		else {
			if(!isCan($member_id['uuid'], 'diamond')) {
				$count++;
				$specialcontent_right .= "
					<div id='specialcontent_part' data-id='$count'>
						<center>
							<div class='special_name'>АЛМАЗНЫЙ АККАУНТ</div>
							<div><img src='$DURL/uploads/accs/diamond_acc.png' width='143px'></div>
							<div class='special_discr'>
								Хотите, чтобы ваша игра стала максимально интересной и насыщенной? Тогда прокачайте свой аккаунт до престижного и самого функционального - Алмазного аккаунта!
							</div>
							<a href='$DURL/cabinet?loc=power'><button style='margin-top: 10px;' type='button' class='uk-width-1-1 uk-button'>Подробнее</button></a>
						</center>
					</div>
				";
			}
			
			if(!isCan($member_id['uuid'], 'diamond') && !isCan($member_id['uuid'], 'gold')) {
				$count++;
				$specialcontent_right .= "
					<div id='specialcontent_part' data-id='$count' style='display: none'>
						<center>
							<div class='special_name'>ЗОЛОТОЙ АККАУНТ</div>
							<div><img src='$DURL/uploads/accs/gold_acc.png' width='143px'></div>
							<div class='special_discr'>
								Менее функциональнее Алмазного аккаунта, но гораздо функциональнее Деревянного! Прокачайте свой аккаунт, насладитесь новыми возможностями!
							</div>
							<a href='$DURL/cabinet?loc=power'><button style='margin-top: 10px;' type='button' class='uk-width-1-1 uk-button'>Подробнее</button></a>
						</center>
					</div>
				";
			}
		}
		
		if($count) {
			echo "
				<div class='block'>
					<div class='block-content'  style='z-index: 1'>
						<div class='block-title'>Наши предложения</div>
						<div id='specialcontent_right' data-count='$count'>$specialcontent_right</div>
					</div>
				</div>
			";
		}
	}