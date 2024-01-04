<?php
	if(!defined('DATALIFEENGINE')) die("Hacking attempt!");
	
	$header = "Повышение своей крутости";
	$content = "
	<div class='uk-alert uk-alert-danger' style='background: rgba(0, 0, 0, 0.09);color: black;'>Вступить в одну из групп и стать значительно круче можно в своем <a href='$DURL/cabinet?loc=power'>Личном Кабинете</a>.<br/>Новая группа выдается вам на 30 суток, это <b>720 часов удовольствия на всех наших серверах</b>!</div>
	
	<table class='uk-table uk-table-hover uk-table-striped uk-table-condensed'>
		<thead>        
			<tr style='background: rgba(77, 34, 88, 0.12);'>        
				<th><b>Возможности приватов</b></th>                    
				<th width='85px' class='uk-text-center simpleName' style='width: 50px'><b>Дерев.</b></th>                 
				<th width='85px' class='uk-text-center vipName'><b>ЖЕЛЕЗНЫЙ</b></th>                     
				<th width='85px' class='uk-text-center premiumName'><b>ЗОЛОТОЙ</b></th>            
				<th width='85px' class='uk-text-center deluxeName'>АЛМАЗНЫЙ</th>        
			</tr>    
		</thead>
		<tbody>
			<tr>            
				<td>Приват</td>                   
				<td width='85px' class='uk-text-center'>100 тыс.</td>  
				<td width='85px' class='uk-text-center vipCell'>150 тысяч</td>            
				<td width='85px' class='uk-text-center premiumCell'>200 тысяч</td>            
				<td width='85px' class='uk-text-center deluxeCell'><b>600 тысяч</b></td>        
			</tr>        
			<tr>            
				<td>Количество приватов</td>                 
				<td class='uk-text-center'>2</td>             
				<td class='uk-text-center vipCell'>4</td>            
				<td class='uk-text-center premiumCell'>6</td>            
				<td class='uk-text-center deluxeCell'>10</td>        
			</tr>
			<tr>            
				<td>Стандартные флаги на приват <i class='uk-icon-question-circle' data-uk-tooltip='' title='pvp - Пвп на регионе&lt;br&gt;fire-spread - Распространение огня&lt;br&gt;lava-flow - Разлив лавы&lt;br&gt;water-flow - Разлив воды&lt;br&gt;use - Использование люков, плит'></i></td>                  
				<td class='uk-text-center'><i class='uk-icon-check uk-icon-small'></i></td>  
				<td class='uk-text-center vipCell'><i class='uk-icon-check uk-icon-small'></i></td>               
				<td class='uk-text-center premiumCell'><i class='uk-icon-check uk-icon-small'></i></td>            
				<td class='uk-text-center deluxeCell'><i class='uk-icon-check uk-icon-small' ></i></td>        
			</tr>
			<tr>            
				<td>Пакет флагов на приват #1 <i class='uk-icon-question-circle' data-uk-tooltip='' title='pvp - Пвп на регионе&lt;br&gt;fire-spread - Распространение огня&lt;br&gt;lava-flow - Разлив лавы&lt;br&gt;water-flow - Разлив воды&lt;br&gt;use - Использование люков, плит<br/><br/>greeting - Приветствие&lt;br&gt;mob-spawning - Спавн мобов&lt;br&gt;potion-splash - Зелья'></i></td>                  
				<td class='uk-text-center'><i style='opacity: 0.2'  class='uk-icon-times uk-icon-small'></i></td>              
				<td class='uk-text-center vipCell'><i class='uk-icon-check uk-icon-small'></i></td>           
				<td class='uk-text-center premiumCell'><i class='uk-icon-check uk-icon-small'></i></td>            
				<td class='uk-text-center deluxeCell'><i class='uk-icon-check uk-icon-small' ></i></td>        
			</tr>      
			<tr>            
				<td>Пакет флагов на приват #2 <i class='uk-icon-question-circle' data-uk-tooltip='' title='pvp - Пвп на регионе&lt;br&gt;fire-spread - Распространение огня&lt;br&gt;lava-flow - Разлив лавы&lt;br&gt;water-flow - Разлив воды&lt;br&gt;use - Использование люков, плит<br/><br/>greeting - Приветствие&lt;br&gt;mob-spawning - Спавн мобов&lt;br&gt;potion-splash - Зелья<br/><br/>entry - Вход на регион&lt;br&gt;greeting - Приветствие&lt;br&gt;enderman-grief - Гриф эндерменов&lt;br&gt;mob-damage - Урон от мобов&lt;br&gt;snow-fall - Выпадение снега&lt;br&gt;damage-animals - Урон мобам'></i></td>                     
				<td class='uk-text-center'><i style='opacity: 0.2' class='uk-icon-times uk-icon-small'></i></td>            
				<td class='uk-text-center vipCell'><i style='opacity: 0.2'  class='uk-icon-times uk-icon-small'></i></td>             
				<td class='uk-text-center premiumCell'><i class='uk-icon-check uk-icon-small'></i></td>            
				<td class='uk-text-center deluxeCell'><i class='uk-icon-check uk-icon-small' ></i></td>        
			</tr>        
			<tr>            
				<td>Пакет флагов на приват #3 <i class='uk-icon-question-circle' data-uk-tooltip='' title='pvp - Пвп на регионе&lt;br&gt;fire-spread - Распространение огня&lt;br&gt;lava-flow - Разлив лавы&lt;br&gt;water-flow - Разлив воды&lt;br&gt;use - Использование люков, плит<br/><br/>greeting - Приветствие&lt;br&gt;mob-spawning - Спавн мобов&lt;br&gt;potion-splash - Зелья<br/><br/>entry - Вход на регион&lt;br&gt;greeting - Приветствие&lt;br&gt;enderman-grief - Гриф эндерменов&lt;br&gt;mob-damage - Урон от мобов&lt;br&gt;snow-fall - Выпадение снега&lt;br&gt;damage-animals - Урон мобам<br/><br/>invincible - Бессмертие&lt;br&gt;ice-melt - Таянье льда&lt;br&gt;enderman-grief - Гриф эндерменов&lt;br&gt;'></i></td>                    
				<td class='uk-text-center'><i style='opacity: 0.2' class='uk-icon-times uk-icon-small'></i></td>           
				<td class='uk-text-center vipCell'><i style='opacity: 0.2'  class='uk-icon-times uk-icon-small'></i></td>              
				<td class='uk-text-center premiumCell'><i style='opacity: 0.2' class='uk-icon-times uk-icon-small'></i></td>            
				<td class='uk-text-center deluxeCell'><i class='uk-icon-check uk-icon-small' ></i></td>        
			</tr> 
		</tbody>
	</table>
	
	<table class='uk-table uk-table-hover uk-table-striped uk-table-condensed'>
		<thead>        
			<tr style='background: rgba(77, 34, 88, 0.12);'>        
				<th><b>Дополнительные команды</b></th>                    
				<th width='85px' class='uk-text-center simpleName' style='width: 50px'><b>Дерев.</b></th>                 
				<th width='85px' class='uk-text-center vipName'><b>ЖЕЛЕЗНЫЙ</b></th>                     
				<th width='85px' class='uk-text-center premiumName'><b>ЗОЛОТОЙ</b></th>            
				<th width='85px' class='uk-text-center deluxeName'>АЛМАЗНЫЙ</th>        
			</tr>  
		</thead>
		<tbody>
			<tr>     
				<td>Запрос телепорта к игроку <b>/call</b></td>                      
				<td class='uk-text-center'><i style='opacity: 0.2' class='uk-icon-times uk-icon-small'></i></td>      
				<td class='uk-text-center vipCell'><i class='uk-icon-check uk-icon-small'></i></td>               
				<td class='uk-text-center premiumCell'><i class='uk-icon-check uk-icon-small'></i></td>            
				<td class='uk-text-center deluxeCell'><i class='uk-icon-check uk-icon-small' ></i></td>         
			</tr>
			<tr>            
				<td><div style='display: inline-block;margin-right: 7px;' data-uk-tooltip title='Запрещено злоупотребление командой. В случае нарушения вы получите перманентный бан.'><i class='uk-icon-shield uk-text-danger'></i></div>Возвращение на место смерти <b>/back</b></td>                      
				<td class='uk-text-center'><i style='opacity: 0.2' class='uk-icon-times uk-icon-small'></i></td>             
				<td class='uk-text-center vipCell'><i class='uk-icon-check uk-icon-small'></i></td>            
				<td class='uk-text-center premiumCell'><i class='uk-icon-check uk-icon-small'></i></td>            
				<td class='uk-text-center deluxeCell'><i class='uk-icon-check uk-icon-small' ></i></td>        
			</tr>
			<tr>            
				<td><div style='display: inline-block;margin-right: 7px;' data-uk-tooltip title='Запрещено злоупотребление командой. В случае нарушения вы получите перманентный бан.'><i class='uk-icon-shield uk-text-danger'></i></div>Возможность вылечить себя <b>/heal</b></td>                      
				<td class='uk-text-center'><i style='opacity: 0.2' class='uk-icon-times uk-icon-small'></i></td>             
				<td class='uk-text-center vipCell'><i style='opacity: 0.2'  class='uk-icon-times uk-icon-small'></i></td>            
				<td class='uk-text-center premiumCell'><i class='uk-icon-check uk-icon-small'></i></td>             
				<td class='uk-text-center deluxeCell'><i class='uk-icon-check uk-icon-small' ></i></td>        
			</tr>
			<tr>            
				<td>Возможность утолить голод <b>/feed</b></td>                      
				<td class='uk-text-center'><i style='opacity: 0.2' class='uk-icon-times uk-icon-small'></i></td>             
				<td class='uk-text-center vipCell'><i style='opacity: 0.2'  class='uk-icon-times uk-icon-small'></i></td>            
				<td class='uk-text-center premiumCell'><i class='uk-icon-check uk-icon-small'></i></td>             
				<td class='uk-text-center deluxeCell'><i class='uk-icon-check uk-icon-small' ></i></td>        
			</tr>
			<tr>            
				<td>Возможность потушить себя <b>/ext</b></td>                      
				<td class='uk-text-center'><i style='opacity: 0.2' class='uk-icon-times uk-icon-small'></i></td>             
				<td class='uk-text-center vipCell'><i style='opacity: 0.2'  class='uk-icon-times uk-icon-small'></i></td>            
				<td class='uk-text-center premiumCell'><i class='uk-icon-check uk-icon-small'></i></td>             
				<td class='uk-text-center deluxeCell'><i class='uk-icon-check uk-icon-small' ></i></td>        
			</tr>
			<tr>            
				<td>Возможность летать <b>/fly</b></td>                      
				<td class='uk-text-center'><i style='opacity: 0.2' class='uk-icon-times uk-icon-small'></i></td>             
				<td class='uk-text-center vipCell'><i style='opacity: 0.2'  class='uk-icon-times uk-icon-small'></i></td>            
				<td class='uk-text-center premiumCell'><i class='uk-icon-check uk-icon-small'></i></td>             
				<td class='uk-text-center deluxeCell'><i class='uk-icon-check uk-icon-small' ></i></td>        
			</tr>
			<tr>            
				<td><div style='display: inline-block;margin-right: 7px;' data-uk-tooltip title='Запрещено злоупотребление командой. В случае нарушения вы получите перманентный бан.'><i class='uk-icon-shield uk-text-danger'></i></div>Вылечить других <b>/heal ник</b></td>                      
				<td class='uk-text-center'><i style='opacity: 0.2' class='uk-icon-times uk-icon-small'></i></td>             
				<td class='uk-text-center vipCell'><i style='opacity: 0.2'  class='uk-icon-times uk-icon-small'></i></td>            
				<td class='uk-text-center premiumCell'><i style='opacity: 0.2'  class='uk-icon-times uk-icon-small'></i></td>             
				<td class='uk-text-center deluxeCell'><i class='uk-icon-check uk-icon-small' ></i></td>        
			</tr>
			<tr>            
				<td data-uk-tooltip='' title='Внимание! При PvP /god автоматом отключается'><div style='display: inline-block;margin-right: 7px;' data-uk-tooltip title='Запрещено злоупотребление командой. В случае нарушения вы получите перманентный бан.'><i class='uk-icon-shield uk-text-danger'></i></div>Включить бессмертие <b>/god</b></td>               
				<td class='uk-text-center'><i style='opacity: 0.2' class='uk-icon-times uk-icon-small'></i></td>             
				<td class='uk-text-center vipCell'><i style='opacity: 0.2'  class='uk-icon-times uk-icon-small'></i></td>            
				<td class='uk-text-center premiumCell'><i style='opacity: 0.2' class='uk-icon-times uk-icon-small'></i></td>            
				<td class='uk-text-center deluxeCell'><i class='uk-icon-check uk-icon-small' ></i></td>        
			</tr> 			
			<tr>            
				<td data-uk-tooltip='' title='Личное время на серверах!'>Изменить время суток <b>/ptime</b></td>               
				<td class='uk-text-center'><i style='opacity: 0.2' class='uk-icon-times uk-icon-small'></i></td>             
				<td class='uk-text-center vipCell'><i style='opacity: 0.2'  class='uk-icon-times uk-icon-small'></i></td>            
				<td class='uk-text-center premiumCell'><i style='opacity: 0.2' class='uk-icon-times uk-icon-small'></i></td>            
				<td class='uk-text-center deluxeCell'><i class='uk-icon-check uk-icon-small' ></i></td>        
			</tr>
			<tr>            
				<td>Восстановить инструменты <b>/repair</b></td>                      
				<td class='uk-text-center'><i style='opacity: 0.2' class='uk-icon-times uk-icon-small'></i></td>             
				<td class='uk-text-center vipCell'><i style='opacity: 0.2'  class='uk-icon-times uk-icon-small'></i></td>            
				<td class='uk-text-center premiumCell'><i style='opacity: 0.2' class='uk-icon-times uk-icon-small'></i></td>             
				<td class='uk-text-center deluxeCell'><i class='uk-icon-check uk-icon-small' ></i></td>        
			</tr>
			<tr>            
				<td>Виртуальный верстак <b>/workbench</b></td>                      
				<td class='uk-text-center'><i style='opacity: 0.2' class='uk-icon-times uk-icon-small'></i></td>             
				<td class='uk-text-center vipCell'><i style='opacity: 0.2'  class='uk-icon-times uk-icon-small'></i></td>            
				<td class='uk-text-center premiumCell'><i style='opacity: 0.2' class='uk-icon-times uk-icon-small'></i></td>             
				<td class='uk-text-center deluxeCell'><i class='uk-icon-check uk-icon-small' ></i></td>        
			</tr>
			<tr>            
				<td><div style='display: inline-block;margin-right: 7px;' data-uk-tooltip title='Запрещено злоупотребление командой. В случае нарушения вы получите перманентный бан.'><i class='uk-icon-shield uk-text-danger'></i></div>Телепортация к себе <b>/tpahere</b></td>                      
				<td class='uk-text-center'><i style='opacity: 0.2' class='uk-icon-times uk-icon-small'></i></td>             
				<td class='uk-text-center vipCell'><i style='opacity: 0.2'  class='uk-icon-times uk-icon-small'></i></td>            
				<td class='uk-text-center premiumCell'><i style='opacity: 0.2' class='uk-icon-times uk-icon-small'></i></td>             
				<td class='uk-text-center deluxeCell'><i class='uk-icon-check uk-icon-small' ></i></td>        
			</tr>
		</tbody>
	</table>
	
	<table class='uk-table uk-table-hover uk-table-striped uk-table-condensed'>
		<thead>        
			<tr style='background: rgba(77, 34, 88, 0.12);'>        
				<th><b>Доступные наборы</b></th>                    
				<th width='85px' class='uk-text-center simpleName' style='width: 50px'><b>Дерев.</b></th>                 
				<th width='85px' class='uk-text-center vipName'><b>ЖЕЛЕЗНЫЙ</b></th>                     
				<th width='85px' class='uk-text-center premiumName'><b>ЗОЛОТОЙ</b></th>            
				<th width='85px' class='uk-text-center deluxeName'>АЛМАЗНЫЙ</th>        
			</tr>    
		</thead>
		<tbody>
			  			
			<tr>            
				<td><div style='display: inline-block;margin-right: 7px;' data-uk-tooltip title='Набор включает в себя набор основной брони и инструментов<br/><br/>Раз в 48 часов.'><i class='uk-icon-clock-o uk-text-success'></i></div>Набор инструментов и брони<div style='margin-left: 19px;'><a href='#showkit1' data-uk-modal=\"{'center': 'true'}\">Посмотреть доступные наборы</a></div></td>              
				<td class='uk-text-center'><i style='opacity: 0.2'  class='uk-icon-times uk-icon-small'></i></td>                       
				<td class='uk-text-center vipCell'><i class='uk-icon-check uk-icon-small'></i></td>  
				<td class='uk-text-center premiumCell'><i class='uk-icon-check uk-icon-small'></i></td>            
				<td class='uk-text-center deluxeCell'><i class='uk-icon-check uk-icon-small' ></i></td>        
			</tr> 
			<tr>            
				<td><div style='display: inline-block;margin-right: 7px;' data-uk-tooltip title='Набор включает в себя зачарованный сет инструментов и брони<br/><br/>Раз в неделю.'><i class='uk-icon-clock-o uk-text-success'></i></div>Зачарованные инструменты и броня<div style='margin-left: 19px;'><a href='#showkit2' data-uk-modal=\"{'center': 'true'}\">Посмотреть доступные наборы</a></div></td>              
				<td class='uk-text-center'><i style='opacity: 0.2'  class='uk-icon-times uk-icon-small'></i></td>            
				<td class='uk-text-center vipCell'><i style='opacity: 0.2'  class='uk-icon-times uk-icon-small'></i></td>              
				<td class='uk-text-center premiumCell'><i class='uk-icon-check uk-icon-small'></i></td>            
				<td class='uk-text-center deluxeCell'><i class='uk-icon-check uk-icon-small' ></i></td>        
			</tr> 
			<tr>            
				<td><div style='display: inline-block;margin-right: 7px;' data-uk-tooltip title='Уникальный набор для каждого сервера. Подробнее на странице описания серверов.<br/><br/>Набор доступен раз в месяц.'><i class='uk-icon-clock-o uk-text-success'></i></div>Уникальный набор на все сервера<div style='margin-left: 19px;'><a href='#showkit' data-uk-modal=\"{'center': 'true'}\">Посмотреть доступные наборы</a></div></td>               
				<td class='uk-text-center'><i style='opacity: 0.2' class='uk-icon-times uk-icon-small'></i></td>             
				<td class='uk-text-center vipCell'><i style='opacity: 0.2'  class='uk-icon-times uk-icon-small'></i></td>            
				<td class='uk-text-center premiumCell'><i style='opacity: 0.2' class='uk-icon-times uk-icon-small'></i></td>            
				<td class='uk-text-center deluxeCell'><i class='uk-icon-check uk-icon-small' ></i></td>        
			</tr> 
		</tbody>
	</table>
	
	<div id='showkit' class='uk-modal'>
	    <div class='uk-modal-dialog'>
	        <a class='uk-modal-close uk-close'></a>
	        <h3><center>Доступные наборы для Алмазных Аккаунтов</center></h3>
	        <div class='uk-alert'><center>Нами подготовлены наборы для каждого из наших серверов.<br/>Вы можете получить набор введя <b>/kit diamond</b> раз в 31 день</center></div>
			
	        <div class='uk-panel' style='background: rgba(40, 79, 98, 0.07);padding: 20px;margin-bottom: 20px;'><center>Набор для серверов ветки <b>TechnoMagic</b><br/><img src='$DURL/uploads/shopimg/kit/TechnoMagicDiamond.png'></center></div>
	    </div>
	</div>
	
	<div id='showkit2' class='uk-modal'>
	    <div class='uk-modal-dialog'>
	        <a class='uk-modal-close uk-close'></a>
	        <h3><center>Доступные наборы для Золотых и Алмазных Аккаунтов</center></h3>
	        <div class='uk-alert'><center>Нами подготовлены наборы для каждого из наших серверов.<br/>Вы можете получить набор введя <b>/kit gold</b> раз в 31 день</center></div>
	        
	        <div class='uk-panel' style='background: rgba(40, 79, 98, 0.07);padding: 20px;margin-bottom: 20px;'><center>Набор для серверов ветки <b>TechnoMagic</b><br/><img src='$DURL/uploads/shopimg/kit/TechnoMagicGold.png'></center></div>
	    </div>
	</div>
	
	<div id='showkit1' class='uk-modal'>
	    <div class='uk-modal-dialog'>
	        <a class='uk-modal-close uk-close'></a>
	        <h3><center>Доступные наборы для Железных, Золотых и Алмазных Аккаунтов</center></h3>
	        <div class='uk-alert'><center>Нами подготовлены наборы для каждого из наших серверов.<br/>Вы можете получить набор введя <b>/kit Ingot</b> раз в 31 день</center></div>
	        
	        <div class='uk-panel' style='background: rgba(40, 79, 98, 0.07);padding: 20px;margin-bottom: 20px;'><center>Набор для серверов ветки <b>TechnoMagic</b><br/><img src='$DURL/uploads/shopimg/kit/TechnoMagicIngot.png'></center></div>
	    </div>
	</div>
	
	<table class='uk-table uk-table-hover uk-table-striped uk-table-condensed'>
		<thead>        
			<tr style='background: rgba(77, 34, 88, 0.12);'>        
				<th><b>Прочие возможности</b></th>                    
				<th width='85px' class='uk-text-center simpleName' style='width: 50px'><b>Дерев.</b></th>                 
				<th width='85px' class='uk-text-center vipName'><b>ЖЕЛЕЗНЫЙ</b></th>                     
				<th width='85px' class='uk-text-center premiumName'><b>ЗОЛОТОЙ</b></th>            
				<th width='85px' class='uk-text-center deluxeName'>АЛМАЗНЫЙ</th>        
			</tr>   
		</thead>    
		<tfoot>        
			<tr>        
				<td></td>                      
				<td class='uk-text-center' style='font-size: 15px'></td>            
				<td class='uk-text-center' style='font-size: 15px' colspan='3'><a href='$DURL/cabinet?loc=power'><button type='button' class='uk-button' style='width: 100%'>Узнать расценки</button></a></td>  
			</tr>    
		</tfoot>    
		<tbody>  			
			<tr>            
				<td>Смена плаща</td>                       
				<td class='uk-text-center'><i class='uk-icon-check uk-icon-small'></i></td>  
				<td class='uk-text-center vipCell'><i class='uk-icon-check uk-icon-small'></i></td>           
				<td class='uk-text-center premiumCell'><i class='uk-icon-check uk-icon-small'></i></td>            
				<td class='uk-text-center deluxeCell'><i class='uk-icon-check uk-icon-small' ></i></td>        
			</tr>
			<tr>            
				<td data-uk-tooltip='' title='Восстановление инвентаря не происходит в PvP режиме!'>Восстановление инвентаря</td>                      
				<td class='uk-text-center'><i style='opacity: 0.2' class='uk-icon-times uk-icon-small'></i></td>   
				<td class='uk-text-center vipCell'><i class='uk-icon-check uk-icon-small'></i></td>             
				<td class='uk-text-center premiumCell'><i class='uk-icon-check uk-icon-small'></i></td>            
				<td class='uk-text-center deluxeCell'><i class='uk-icon-check uk-icon-small' ></i></td>        
			</tr> 	
			<tr>            
				<td>Писать на табличке цветом</td>                     
				<td class='uk-text-center'><i style='opacity: 0.2'  class='uk-icon-times uk-icon-small'></i></td>             
				<td class='uk-text-center vipCell'><i class='uk-icon-check uk-icon-small'></i></td>            
				<td class='uk-text-center premiumCell'><i class='uk-icon-check uk-icon-small'></i></td>            
				<td class='uk-text-center deluxeCell'><i class='uk-icon-check uk-icon-small' ></i></td>        
			</tr>  			
			<tr>            
				<td data-uk-tooltip='' title='' data-cached-title='Высокое разрешение картинки.'>Смена плаща <b>HD</b></td>    
				<td class='uk-text-center'><i style='opacity: 0.2'  class='uk-icon-times uk-icon-small'></i></td>              
				<td class='uk-text-center vipCell'><i style='opacity: 0.2'  class='uk-icon-times uk-icon-small'></i></td>           
				<td class='uk-text-center premiumCell'><i class='uk-icon-check uk-icon-small'></i></td>            
				<td class='uk-text-center deluxeCell'><i class='uk-icon-check uk-icon-small' ></i></td>        
			</tr>      
			<tr>            
				<td>Восстановление опыта после смерти</td>                    
				<td class='uk-text-center'><i style='opacity: 0.2' class='uk-icon-times uk-icon-small'></i></td>            
				<td class='uk-text-center vipCell'><i style='opacity: 0.2'  class='uk-icon-times uk-icon-small'></i></td>             
				<td class='uk-text-center premiumCell'><i class='uk-icon-check uk-icon-small'></i></td>            
				<td class='uk-text-center deluxeCell'><i class='uk-icon-check uk-icon-small' ></i></td>        
			</tr>           
			<tr>            
				<td data-uk-tooltip='' title='' data-cached-title='Высокое разрешение картинки.'>Смена скина <b>HD</b></td>        
				<td class='uk-text-center'><i style='opacity: 0.2' class='uk-icon-times uk-icon-small'></i></td>            
				<td class='uk-text-center vipCell'><i style='opacity: 0.2'  class='uk-icon-times uk-icon-small'></i></td>             
				<td class='uk-text-center premiumCell'><i class='uk-icon-check uk-icon-small'></i></td>            
				<td class='uk-text-center deluxeCell'><i class='uk-icon-check uk-icon-small' ></i></td>        
			</tr>    
			<tr>            
				<td>Возможность надеть на голову блок</td>                       
				<td class='uk-text-center'><i style='opacity: 0.2' class='uk-icon-times uk-icon-small'></i></td>             
				<td class='uk-text-center vipCell'><i style='opacity: 0.2'  class='uk-icon-times uk-icon-small'></i></td>            
				<td class='uk-text-center premiumCell'><i class='uk-icon-check uk-icon-small'></i></td>            
				<td class='uk-text-center deluxeCell'><i class='uk-icon-check uk-icon-small' ></i></td>        
			</tr>        
			<tr>            
				<td>Восстановление голода</td>                      
				<td class='uk-text-center'><i style='opacity: 0.2' class='uk-icon-times uk-icon-small'></i></td>           
				<td class='uk-text-center vipCell'><i style='opacity: 0.2'  class='uk-icon-times uk-icon-small'></i></td>              
				<td class='uk-text-center premiumCell'><i class='uk-icon-check uk-icon-small'></i></td>            
				<td class='uk-text-center deluxeCell'><i class='uk-icon-check uk-icon-small' ></i></td>        
			</tr>             
			<tr>            
				<td>Писать в чат цветом</td>                      
				<td class='uk-text-center'><i style='opacity: 0.2' class='uk-icon-times uk-icon-small'></i></td>           
				<td class='uk-text-center vipCell'><i style='opacity: 0.2'  class='uk-icon-times uk-icon-small'></i></td>              
				<td class='uk-text-center premiumCell'><i class='uk-icon-check uk-icon-small'></i></td>            
				<td class='uk-text-center deluxeCell'><i class='uk-icon-check uk-icon-small' ></i></td>        
			</tr> 
			<tr>            
				<td>Количество варпов</td>            
				<td class='uk-text-center'><i style='opacity: 0.2'  class='uk-icon-times uk-icon-small'></i></td>                     
				<td class='uk-text-center vipCell'>4</td>            
				<td class='uk-text-center premiumCell'>10</td>            
				<td class='uk-text-center deluxeCell'><b>25</b></td>        
			</tr> 
			<tr>            
				<td>Приветствие при телепортации в точку варпа</td>                      
				<td class='uk-text-center'><i style='opacity: 0.2' class='uk-icon-times uk-icon-small'></i></td>             
				<td class='uk-text-center vipCell'><i style='opacity: 0.2'  class='uk-icon-times uk-icon-small'></i></td>            
				<td class='uk-text-center premiumCell'><i style='opacity: 0.2' class='uk-icon-times uk-icon-small'></i></td>            
				<td class='uk-text-center deluxeCell'><i class='uk-icon-check uk-icon-small' ></i></td>        
			</tr> 
			<tr>            
				<td>Передача варпа игроку</td>                      
				<td class='uk-text-center'><i style='opacity: 0.2' class='uk-icon-times uk-icon-small'></i></td>             
				<td class='uk-text-center vipCell'><i style='opacity: 0.2'  class='uk-icon-times uk-icon-small'></i></td>            
				<td class='uk-text-center premiumCell'><i style='opacity: 0.2' class='uk-icon-times uk-icon-small'></i></td>            
				<td class='uk-text-center deluxeCell'><i class='uk-icon-check uk-icon-small' ></i></td>        
			</tr> 
			<tr>            
				<td>Скидка в Онлайн-магазине <b>30%</b></td>                      
				<td class='uk-text-center'><i style='opacity: 0.2' class='uk-icon-times uk-icon-small'></i></td>            
				<td class='uk-text-center vipCell'><i style='opacity: 0.2'  class='uk-icon-times uk-icon-small'></i></td>             
				<td class='uk-text-center premiumCell'><i style='opacity: 0.2' class='uk-icon-times uk-icon-small'></i></td>            
				<td class='uk-text-center deluxeCell'><i class='uk-icon-check uk-icon-small' ></i></td>        
			</tr>          
			<tr>            
				<td>Ожидание телепортации в дом/warp</td>                     
				<td class='uk-text-center'><i style='opacity: 0.2'  class='uk-icon-times uk-icon-small'></i></td>  
				<td class='uk-text-center vipCell'>5 сек.</td>            
				<td class='uk-text-center premiumCell'>Мгновенно</td>            
				<td class='uk-text-center deluxeCell' data-uk-tooltip='' title='Это тоже самое что и у золотого аккаунта, но лучше звучит.'><b>Молниеносно</b></td>        
			</tr>       
			<tr>            
				<td data-uk-tooltip='' title='Для получения дополнительного здоровья вам нужен опыт,&lt;br&gt; 5 опыта - +5 здоровья и так до 20 уровня опыта (+20 здоровья)'>Увеличение здоровья до 40: <i class='uk-icon-question'></i></td>          
				<td class='uk-text-center'><i style='opacity: 0.2' class='uk-icon-times uk-icon-small'></i></td>            
				<td class='uk-text-center vipCell'><i style='opacity: 0.2'  class='uk-icon-times uk-icon-small'></i></td>             
				<td class='uk-text-center premiumCell'><i style='opacity: 0.2' class='uk-icon-times uk-icon-small'></i></td>            
				<td class='uk-text-center deluxeCell'><i class='uk-icon-check uk-icon-small' ></i></td>        
			</tr> 
			<tr>            
				<td><b>Возможность зайти на полный сервер</b></td>               
				<td class='uk-text-center'><i style='opacity: 0.2' class='uk-icon-times uk-icon-small'></i></td>             
				<td class='uk-text-center vipCell'><i style='opacity: 0.2'  class='uk-icon-times uk-icon-small'></i></td>            
				<td class='uk-text-center premiumCell'><i style='opacity: 0.2' class='uk-icon-times uk-icon-small'></i></td>            
				<td class='uk-text-center deluxeCell'><i class='uk-icon-check uk-icon-small' ></i></td>        
			</tr>			
		</tbody>
	</table>               
	<br/><br/>
	(*) - Инвентарь сохраняется всегда, однако на PVP серверах при гибели в поединке ваш инвентарь будет опустошен и выкинут на землю.<br/>
	(**) - Запрещено злоупотреблять полетами на PVP серверах. В случае вступления в PVP поединок режим полета автоматически отключается.<br/>
	(***) - В режиме бессмертия (God) у вас нет возможности наносить урон в PVP поединках и другим сущностям.<br/><br/>
	Продление статуса или апгрейд на вышестоящий статус в Личном кабинете происходит со скидкой!<br/><br/>

	При окончании срока Donate статуса плащи и префиксы автоматически стираются, возможность использования расширенных команд и пакетов отключается. Все игровые зарегистрированные регионы остаются во владении, сменить флаги недоступные простому игроку не будет возможности. При удалении приватных регионов зарегистрировать новые регионы нельзя, если количество регионов во владении больше или равно тому числу регионов, которые доступны обычному игроку.
	";
	
	$tpl->load_template('modules.tpl');
	$tpl->set('{header}', $header);
	$tpl->set('{content}', $content);
	$tpl->compile('content');
	$tpl->clear();