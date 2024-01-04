<?php
 class Cabinet extends init {
	 
	 function __construct() {
		if (init::$usrArray['login']) {
			$hash = md5(init::$usrArray['password'] . init::$usrArray['login']);
			$uuidhash = md5(init::$usrArray['uuid'] . init::$usrArray['login'] . init::$usrArray['uuid']);
			echo "<script>var playerName = '{init::$usrArray['login']}';var userHash = '{$hash}';var uuidHash = '{$uuidhash}';var playerUUID = '{init::$usrArray['uuid']}';</script>";
		}
		$sel = $db->query("SELECT * FROM donate_group WHERE uuid='{init::$usrArray['uuid']}'");
		foreach ($sel as $s) {
			// print_r($s);
			if ($s['end_date'] > 0 && $s['end_date'] < time()) {
				$select = $db->super_query("SELECT * FROM donate_group WHERE uuid='{init::$usrArray['uuid']}'");
				include $_SERVER['DOCUMENT_ROOT'] . "/engine/data/mineconf.php";
				foreach ($_servers as $v) {
					if ($v['id'] == $s['serverid']) {
						$pex_prefix = $v['pex_prefix'];
					}

				}
				$db->query("DELETE FROM donate_group WHERE uuid='{init::$usrArray['uuid']}' AND serverid='{$s['serverid']}'");
				$db->query("DELETE FROM donate_prefix WHERE uuid='{init::$usrArray['uuid']}' AND serverid='{$s['serverid']}'");
				$db->query("DELETE FROM `{$pex_prefix}permissions_inheritance` WHERE child='{init::$usrArray['uuid']}' AND type='1'");
				$db->query("DELETE FROM `{$pex_prefix}permissions` WHERE name='{init::$usrArray['uuid']}' AND type='1' AND permission='group-{$select['group_name']}-until'");
				$db->query("DELETE FROM `{$pex_prefix}permissions` WHERE name='{init::$usrArray['uuid']}' AND permission='suffix' AND type='1'");
				$db->query("DELETE FROM `{$pex_prefix}permissions` WHERE name='{init::$usrArray['uuid']}' AND permission='prefix' AND type='1'");
			}
		}
	 }
 }
// INSERT INTO `donate_group` (`id`, `uuid`, `serverid`, `group_name`, `buy_date`, `end_date`) VALUES (NULL, '89072d82-6f3f-11e9-ab3c-ac1f6b48c444', '1', 'diamond', '1561907982 ', '1661907982 ');
