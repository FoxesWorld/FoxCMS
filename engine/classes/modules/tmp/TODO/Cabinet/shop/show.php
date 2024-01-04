<?php
	if(!defined('FOXXEY')) die("Hacking attempt!");
	$select = $db->super_query("SELECT * FROM shop_list WHERE id='$shopid'");
	if($select['shopname']) {
		
		if($_GET['item']) {
			$itemid = $db->safesql($_GET['item']);
			$check = $db->query("SELECT * FROM shop_items WHERE id='{$itemid}'");
			if($db->num_rows($check)) {
				$content = "
					<script>
						showItem = true;
						showenId = $itemid;
						$('.shop-show-item').attr('disabled', true);
						$.post('/shop', { action: 'show', player: playerName, hash: userHash, uuid:playerUUID, uuidHash:uuidHash, id: $itemid }, function(data) {
							if(data['status']) UIkit.notify(data['text'], {pos:'top-center', timeout: 5000, status: 'danger'});
							else {
								$('#currentStack').val('1');
								$('#shopOutput').html(data);
								var modal = UIkit.modal('#itemSh', {center: true});
								if (modal.isActive()) modal.hide();
								else modal.show();
								showItem = false
								$('.shop-show-item').attr('disabled', false);
							}
						});
					</script>
				";
			}
		}
		$shopname = $select['shopname'];
		$order = $db->safesql($_GET['order']);
		$search = $db->safesql($_GET['search']);
		$category = $db->safesql($_GET['category']);
		if(isset($_GET['only_disc'])) {
			$only_disc = " AND until>'".time()."' AND percent>0 AND discount_from<'".time()."'";
			$checked_disc = "checked";
		}
		else $only_disc = "";
		if($order >= 1 && $order <= 8) $or[$order] = "selected"; else $or[1] = "selected";
		$category_query = "";
		$check = $db->query("SELECT * FROM shop_category");
		if($db->num_rows($check)) {
			while($get = $db->get_row($check)) {
				$info = $db->query("SELECT * FROM shop_items WHERE category LIKE '%|{$get['id']}|%'");
				if($db->num_rows($info)) {
					if($category == $get['id']) {
						$cats .= "<option selected value='{$get['id']}'>{$get['catname']}</option>";
						$category_query = "AND category LIKE '%|$category|%'";
					}
					else $cats .= "<option value='{$get['id']}'>{$get['catname']}</option>";
				}
			}
		}
		
		if($order > 1 || $category >= 1 || mb_strlen($search, 'utf-8') >= 3 || $only_disc) $filterSettings = "<div id='showSettings' style='opacity: 0.9' class='uk-text-success'><i class='uk-icon-cog'></i> <b>Фильтр вывода и поиск товаров</b></div>";
		else $filterSettings = "<div id='showSettings'><i class='uk-icon-cog'></i> Фильтр вывода и поиск товаров</div>";
		
		$header = "<a href='$DURL/shop'><i class='uk-icon-chevron-circle-left'></i></a> $header <i class='uk-icon-angle-right'></i> $shopname сервера";
		$content .= "
			$filterSettings
			<div id='shopSettings' style='display: none'>
				<form action method='get'>
					<input type='hidden' name='shopid' value='$shopid'>
					<input type='hidden' name='act' value='show'>
					<table class='uk-width-1-1 uk-table uk-table-striped'>
						<tr>
							<td>Сортировка товаров</td>
							<td>
								<select class='uk-width-1-1' name='order'>
									<option {$or[1]} value='1'>По порядку (1...9)</option>
									<option {$or[2]} value='2'>По порядку (9...1)</option>
									<option {$or[3]} value='3'>По алфавиту (А...Я)</option>
									<option {$or[4]} value='4'>По алфавиту (Я...А)</option>
									<option {$or[5]} value='5'>По цене (От меньшей к большей)</option>
									<option {$or[6]} value='6'>По цене (От большей к меньшей)</option>
									<option {$or[7]} value='7'>По популярности (От меньшей к большей)</option>
									<option {$or[8]} value='8'>По популярности (От большей к меньшей)</option>
								</select>
							</td>
						</tr>
						<tr>
							<td>Выберите категорию товара</td>
							<td>
								<select class='uk-width-1-1' name='category'>
									<option value='0'>---- Все товары ----</option>
									$cats
								</select>
							</td>
						</tr>
						<tr>
							<td>Поиск по названию/ID<div class='uk-text-small'>Поиск только по разделу $shopname</div></td>
							<td><input type='text' class='uk-width-1-1' id='search' placeholder='Минимум три символа' name='search' value='$search'></td>
						</tr>
						<tr>
							<td>Скидки</td>
							<td>
								<label><input type='checkbox' name='only_disc' $checked_disc> Показывать только товары со скидками</label>
							</td>
						</tr>
						<tr>
							<td>&nbsp;</td>
							<td><input type='submit' class='uk-button uk-width-1-1' name='filter' value='Отфильтровать'></td>
						</tr>
					</table>
				</form>
			</div>
		";
		
		if($member_id['name']) {
			$check = $db->query("SELECT * FROM shop_sets WHERE shopid='$shopid' LIMIT 1");
			if($db->num_rows($check)) {
				$content .= "
					<div class='shop_sets' onclick=\"location.href='$DURL/shop?shopid=$shopid&act=sets'\">
						<table class='uk-width-1-1'>
							<tr>
								<td width='90px'><img src='$DURL/uploads/sets/diamond_set.png' width='70px'></td>
								<td>
									<div style='font-size: 14pt;font-weight: bold;'>Перейти в магазин наборов раздела $shopname</div>
									<div style='font-size: 12px; margin-top: 6px;'>Мы подготовили для вас наборы, которые выходят намного дешевле, чем покупать все отдельно!</div>
								</td>
							</tr>
						</table>
					</div>
				";
			}
		}
		
		$check = $db->query("SELECT * FROM shop_commands WHERE shopid='$shopid' LIMIT 1");
		if($db->num_rows($check)) {
			$content .= "
				<div class='shop_sets' onclick=\"location.href='$DURL/shop?shopid=$shopid&act=cmds'\">
					<table class='uk-width-1-1'>
						<tr>
							<td width='90px'><img src='$DURL/uploads/Computer_Chip.png' width='70px'></td>
							<td>
								<div style='font-size: 14pt;font-weight: bold;'><div style='font-size: 17px; padding: 6PX;border-radius: 5px;margin-right: 10px;padding-bottom: 4px;' class='uk-badge uk-badge-danger'>НОВИНКА!</div>Перейти в магазин дополнений для $shopname</div>
								<div style='font-size: 12px; margin-top: 6px;'>Хочешь стать еще круче? Получи доступ к <b>особым дополнениям</b> на сервере!</div>
							</td>
						</tr>
					</table>
				</div>
			";
		}
		
		if(mb_strlen($search, 'utf-8') >= 3) $search_query = "AND itemname LIKE '%$search%'$category_query$only_disc OR itemid='$search' AND shopid='$shopid'$category_query$only_disc"; else $search_query = "";
		if($order == 1) $query = "SELECT * FROM shop_items WHERE shopid='$shopid' $category_query $search_query $only_disc ORDER BY id ASC";
		else if($order == 2) $query = "SELECT * FROM shop_items WHERE shopid='$shopid' $category_query $search_query $only_disc ORDER BY id DESC";
		else if($order == 3) $query = "SELECT * FROM shop_items WHERE shopid='$shopid' $category_query $search_query $only_disc ORDER BY itemname ASC";
		else if($order == 4) $query = "SELECT * FROM shop_items WHERE shopid='$shopid' $category_query $search_query $only_disc ORDER BY itemname DESC";
		else if($order == 5) $query = "SELECT * FROM shop_items WHERE shopid='$shopid' $category_query $search_query $only_disc ORDER BY price ASC";
		else if($order == 6) $query = "SELECT * FROM shop_items WHERE shopid='$shopid' $category_query $search_query $only_disc ORDER BY price DESC";
		else if($order == 7) $query = "SELECT * FROM shop_items WHERE shopid='$shopid' $category_query $search_query $only_disc ORDER BY buy_times ASC";
		else if($order == 8) $query = "SELECT * FROM shop_items WHERE shopid='$shopid' $category_query $search_query $only_disc ORDER BY buy_times DESC";
		else $query = "SELECT * FROM shop_items WHERE shopid='$shopid' $category_query $search_query $only_disc ORDER BY buy_times DESC";
		
		$perpage = 15;
		$page = $db->safesql($_GET['page']);
		$select = $db->query($query);
		$totalitems = $db->num_rows($select);
		if($totalitems) {
			$totalpages = ceil($totalitems/$perpage);
			if(!$page) $page = 1;
			if($page > ceil($totalitems/$perpage)) $page = ceil($totalitems/$perpage);
			$start = ($page - 1) * $perpage;
			
			$select = $db->query($query." LIMIT $start,$perpage");
			$content .= "<div id='shopListOutput'>";
			if($db->num_rows($select)) {
				while($get = $db->get_row($select)) {
					$categoy = "";
					$ex = explode("||", $get['category']);
					for($i = 0; $i < count($ex); $i++) {
						$catid = str_replace("|", "", $ex[$i]);
						$check = $db->super_query("SELECT * FROM shop_category WHERE id='$catid'");
						$categoy .= " {$check['catname']} ";
					}
					$categoy = str_replace("  ", ",", $categoy);
					$word = get_count($get['stack'], "штука", "штуки", "штук");
					$price = getPrice($get['id'], $member_id);
					if($get['canen']) $canen = "<span class='uk-text-success'>Возможно</span>";
					else $canen = "<span style='opacity: 0.7'>Нельзя</span>";
					if($member_id['user_group'] == 1 || isCan($member_id['uuid'], "mladmin")) $admin_button = "<button type='button' class='uk-button admin_settings_button' data-id='{$get['id']}'><i class='uk-icon-cog'></i></button>";
					$disabled = "";
					$btn = "<button type='button' class='uk-button shop-show-item' data-id='{$get['id']}'>Подробнее</button>";
					if(!$get['can_buy']) {
						$btn = "<button type='button' class='uk-button' data-uk-tooltip title='Товар временно снят с продажи' disabled>Подробнее</button>"; 
						$disabled = "<i class='uk-icon-ban uk-text-danger' data-uk-tooltip title='Товар временно снят с продажи'></i> ";
					}

					$content .= "
					<div class='shop-item' id='shop-item-{$get['id']}'>
						<table class='uk-width-1-1'>
							<tr>
								<td width='50px'><img src='{$get['icon']}' width='40px'></td>
								<td valign='top' width='220px'>
									$disabled{$get['itemname']}
									<div class='uk-text-primary uk-text-small'>$categoy</div>
								</td>
								<td valign='top' align='right' width='100px'>
									{$price['text']}
									<div class='uk-text-primary uk-text-small'>За <b>{$get['stack']} $word</b></div>
								</td>
								<td valign='top' align='right' width='100px'>
									$canen
									<div class='uk-text-primary uk-text-small'>Зачарование</div>
								</td>
								<td valign='top' align='right' width='150px'>
									$btn$admin_button
								</td>
							</tr>
						</table>
					</div>
					";
				}
				
				$prevpage = $page-1;
				$nextpage = $page+1;
				if($page == 1) $first_page = ""; else $first_page = "<button type='button' class='uk-button changepage' data-page='1'>1</button>"; 
				if($page == $totalpages) $last_page = ""; else $last_page = "<button type='button' class='uk-button changepage' data-page='$totalpages'>$totalpages</button>"; 
				
				if($page > 1) $prev_page = "<button type='button' class='uk-button changepage' data-page='$prevpage'>Предыдущая страница</button>"; 
				else $prev_page = "<button type='button' class='uk-button disabledButton' disabled>Предыдущая страница</button>";
				
				if($page < $totalpages) $next_page = "<button type='button' class='uk-button changepage' data-page='$nextpage'>Следующая страница</button>"; 
				else $next_page = "<button type='button' class='uk-button disabledButton' disabled>Следующая страница</button>";
				$content .= "
					<table style='margin-top: 10px' class='uk-width-1-1'>
						<tr>
							<td>$first_page$prev_page</td>
							<td align='center'>$page из $totalpages</td>
							<td align='right'>$next_page$last_page</td>
						</tr>
					</table>
				";
			}
			$content .= "</div><input type='hidden' value='0' id='currentStack'><div id='shopOutput'></div>";
		}
		else {
			if($search_query) $content .= $percentWhy = returnNotifer("К сожалению по вашему запросу ничего не найдено.<br/><a href='$DURL/shop'>Вернуться на главную страницу онлайн магазина</a> или измените настройки фильтра вывода товаров.<script>$('#shopSettings').show()</script>", 'times');
			else $content .= $percentWhy = returnNotifer("К сожалению ничего не найдено.<br/><a href='$DURL/shop'>Вернуться на главную страницу онлайн магазина</a>.", 'times');
		}
	}
	else header("Location: $DURL/shop");