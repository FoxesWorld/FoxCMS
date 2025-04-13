<?php
/* Smarty version 4.0.4, created on 2025-04-13 17:34:36
  from '/var/www/FoxCMS/templates/foxengine2/balanceBox.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_67fbcb7c18b562_84511694',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'cf09ae559265a197a75a3e834ae7babe7ea9f822' => 
    array (
      0 => '/var/www/FoxCMS/templates/foxengine2/balanceBox.tpl',
      1 => 1732783354,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_67fbcb7c18b562_84511694 (Smarty_Internal_Template $_smarty_tpl) {
?><style>

.mantine-19edbak {
    box-sizing: border-box;
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    background-color: rgb(233, 236, 239);
    cursor: pointer;
    margin-bottom: 4px;
    margin-right: -4px;
    margin-left: -4px;
    padding: 12px;
}

.balanceBox {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
	font-family: 'Intro-Black';
}

.balanceBox > img {
    height: 32px;
    width: auto;
}

.balanceBox .balanceUnits {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
    -webkit-tap-highlight-color: transparent;
    color: rgb(245, 159, 0);
    font-size: inherit;
    line-height: 1.55;
    text-decoration: none;
    text-transform: uppercase;
}

.balanceBox .balanceCrystals {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
    -webkit-tap-highlight-color: transparent;
    color: rgb(77, 171, 247);
    font-size: inherit;
    line-height: 1.55;
    text-decoration: none;
    text-transform: uppercase;
}

.paymentButton {
    padding: 0px 12px;
    appearance: none;
    text-align: left;
    text-decoration: none;
    box-sizing: border-box;
    height: 22px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
    -webkit-tap-highlight-color: transparent;
    display: inline-block;
    width: auto;
    border-radius: 32px;
    font-weight: 600;
    position: relative;
    line-height: 1;
    font-size: 12px;
    user-select: none;
    cursor: pointer;
    border: 1px solid transparent;
    background-color: rgb(254, 254, 254);
    color: rgb(34, 139, 230);
}

.paymentButton:hover {
background: #8ccfcf;
color: #242c33;
transition: 0.5s;
}
</style>
				<li class="balance">
					<hr class="dropdown-divider" />
					<div class="mantine-Group-root mantine-19edbak">
						<div class="mantine-Group-root balanceBox">
							<div class="mantine-Text-root balanceUnits">
								<div class="mantine-Group-root balanceBox">
									<img src="<?php echo $_smarty_tpl->tpl_vars['tplDir']->value;?>
/assets/icons/units.png" alt="Units Icon" uk-img />
									<div class="mantine-Text-root mantine-synlz8" id="units" data-element="moneyDisplay">0</div>
								</div>
							</div>
							<div class="mantine-Text-root balanceCrystals">
								<div class="mantine-Group-root balanceBox">
									<img src="<?php echo $_smarty_tpl->tpl_vars['tplDir']->value;?>
/assets/icons/crystals.png" alt="Crystals Icon" uk-img />
									<div class="mantine-Text-root mantine-synlz8" id="crystals" data-element="bonusDisplay">0</div>
								</div>
							</div>
						</div>
						<?php if ($_smarty_tpl->tpl_vars['user_group']->value != 5) {?>
						<button class="mantine-UnstyledButton-root mantine-Button-root paymentButton" type="button" onclick="addFunds(); return false;">
							<div class="mantine-3xbgk5 mantine-Button-inner">
								<span class="mantine-qo1k2 mantine-Button-label">Пополнить Счёт</span>
							</div>
						</button>
						<?php }?>
					</div>
				</li><?php }
}
