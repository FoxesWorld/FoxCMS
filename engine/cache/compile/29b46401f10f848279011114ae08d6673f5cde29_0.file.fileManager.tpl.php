<?php
/* Smarty version 4.0.4, created on 2022-05-05 16:39:49
  from '/Avalon/sites/FoxRadio/www/templates/bootstrap/fileManager.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_6273d3a53b64b0_79464583',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '29b46401f10f848279011114ae08d6673f5cde29' => 
    array (
      0 => '/Avalon/sites/FoxRadio/www/templates/bootstrap/fileManager.tpl',
      1 => 1651757970,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:upload.tpl' => 1,
  ),
),false)) {
function content_6273d3a53b64b0_79464583 (Smarty_Internal_Template $_smarty_tpl) {
?>					<td class="fullWidth" colspan="2">
						<div class="container shadow" id="pageData">
							userFiles
						</div>
					</td>	
						<tr>
							<td colspan="2">
								<?php $_smarty_tpl->_subTemplateRender('file:upload.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
							</td>
							
							<td>
								<div id="fileInfo" colspan="2" class="shadow">
								
								</div>
							</td>
						</tr>
					<?php }
}
