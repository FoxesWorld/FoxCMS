<?php
if (!defined('FOXXEY')) {
    die("Hacking attempt!");
}

$username = $member_id['name'];
setlocale(LC_NUMERIC, "C");
if ($username) {
    $header = "Онлайн магазин";
    // $group = getGroup($member_id['uuid']);
    $shopid = $db->safesql($_GET['shopid']);
    if (isset($_POST['action'])) {
        include_once __dir__ . "/post_ajax.php";
    } else {
        //if($member_id['name'] == 'Genocide') include_once("reload.php");
        if ($_GET['filter']) {
            $order = $db->safesql($_GET['order']);
            $category = $db->safesql($_GET['category']);
            $search = $db->safesql($_GET['search']);
            if (isset($_GET['only_disc'])) {
                $only_disc = "&only_disc=true";
            }

            if ($order > 1) {
                $order = "&order=$order";
            } else {
                $order = "";
            }

            if ($category) {
                $category = "&category=$category";
            } else {
                $category = "";
            }

            if (mb_strlen($_GET['search'], 'utf-8') >= 3) {
                $search = "&search=$search";
            } else {
                $search = "";
            }

            if ($shopid) {
                header("Location: $DURL/shop?act=show&shopid={$shopid}$order$category$search$only_disc");
            } else {
                header("Location: $DURL/shop");
            }

            die();
        }
        $action = $db->safesql($_GET['act']);
        if (!$action) {
            include_once "list.php";
        } else if ($action == 'show') {
            include_once "show.php";
        } else if ($action == 'sets') {
            include_once "sets.php";
        } else if ($action == 'cmds') {
            include_once "cmds.php";
        } else if ($action == 'plan') {
            include_once "plan.php";
        } else if ($action == 'chests') {
            include_once "chests.php";
        } else if ($action == 'add' && ($member_id['user_group'] == 1 || isCan($member_id['uuid'], "mladmin"))) {
            include_once "admin_add.php";
        } else if ($action == 'cats' && ($member_id['user_group'] == 1 || isCan($member_id['uuid'], "mladmin"))) {
            include_once "admin_cats.php";
        } else if ($action == 'disc' && ($member_id['user_group'] == 1 || isCan($member_id['uuid'], "mladmin"))) {
            include_once "admin_disc.php";
        } else if ($action == 'addp' && ($member_id['user_group'] == 1 || isCan($member_id['uuid'], "mladmin"))) {
            include_once "admin_add_pokemon.php";
        } else if ($action == 'addp' && ($member_id['user_group'] == 1 || isCan($member_id['uuid'], "mladmin"))) {
            include_once "sets.php";
        } else {
            include_once "list.php";
        }

        if (!$action && ($member_id['user_group'] == 1 || isCan($member_id['uuid'], "mladmin"))) {
            $content .= "<br/>
					<div><i class='uk-icon-angle-right'></i> <a href='$DURL/shop?act=add'>Добавить новый товар</a></div>
					<div><i class='uk-icon-angle-right'></i> <a href='$DURL/shop?act=addp'>Добавить новую команду</a></div>
					<div><i class='uk-icon-angle-right'></i> <a href='$DURL/shop?act=cats'>Управление категориями</a></div>
					<div><i class='uk-icon-angle-right'></i> <a href='$DURL/shop?act=disc'>Управление скидками</a></div>
				";
        }
        $content .= "<script src='$DURL/loadscript/shop'></script>";
        if ($member_id['user_group'] == 1 || isCan($member_id['uuid'], "mladmin")) {
            $content .= "<script src='$DURL/loadscript/shop_admin'></script>";
        }

        $tpl->load_template('modules.tpl');
        $tpl->set('{header}', $header);
        $tpl->set('{content}', $content);
        $tpl->set('Array', '');
        $tpl->compile('content');
        $tpl->clear();
    }
} else {
    header("Location: $DURL");
}
