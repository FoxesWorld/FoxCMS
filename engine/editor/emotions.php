<?php
/*
=====================================================
 DataLife Engine - by SoftNews Media Group 
-----------------------------------------------------
 https://dle-news.ru/
-----------------------------------------------------
 Copyright (c) 2004-2023 SoftNews Media Group
=====================================================
 This code is protected by copyright
=====================================================
 File: emotions.php
-----------------------------------------------------
 Use: Smiles for WYSIWYG
=====================================================
*/

error_reporting(7);
ini_set('display_errors', true);
ini_set('html_errors', false);

define('ENGINE_DIR', '..');
include ENGINE_DIR . '/data/const.php';
include ENGINE_DIR . '/data/config.php';
// include ROOT_DIR . '/language/' . $config['langs'] . '/website.lng';

date_default_timezone_set($config['date_adjust']);

// Установка домашнего URL, если не задан
if (empty($config['http_home_url'])) {
    $config['http_home_url'] = "https://" . $_SERVER['HTTP_HOST'] . strtok($_SERVER['PHP_SELF'], "engine/editor/emotions.php");
}

/**
 * Генерация HTML для изображения смайлика
 */
/**
 * Генерация HTML для классического смайлика
 */
function generate_smiley_image(string $smile, array $config): string {
    $basePath  = ROOT_DIR . "/engine/data/emoticons/";
    $urlPath   = "/templates/assets/{$config['siteSettings']['siteTpl']}/emoticons/";
    $extensions = ['png', 'gif'];

    foreach ($extensions as $ext) {
        $file   = "{$basePath}{$smile}.{$ext}";
        $file2x = "{$basePath}{$smile}@2x.{$ext}";

        if (file_exists($file)) {
            $src    = "{$urlPath}{$smile}.{$ext}";
            $srcset = file_exists($file2x)
                ? " srcset=\"{$urlPath}{$smile}@2x.{$ext} 2x\""
                : "";
            return "<img alt=\"{$smile}\" class=\"emoji\" src=\"{$src}\"{$srcset} />";
        }
    }

    return "";
}

/**
 * Генерация HTML‑контейнера для JSON‑эмоджи с поиском файлов по расширениям
 *
 * @param array $emojiData Массив из json_decode(emoji.json)
 * @param array $lang      Языковые строки
 * @param array $config    Конфигурация DLE
 * @return string          HTML-код
 */
function generate_emoji_output(array $emojiData, array $lang, array $config): string {
    // Папка на диске, где лежат картинки в шаблоне
    $basePath   = ROOT_DIR . "/templates/{$config['siteSettings']['siteTpl']}/assets/emoticons/";
    // URL для вставки в src
    $urlPath    = "/templates/{$config['siteSettings']['siteTpl']}/assets/emoticons/";
    $extensions = ['png', 'gif'];

    $output = '<div class="emoji_box"><div class="last_emoji"></div>';

    foreach ($emojiData as $category) {
        // Пропускаем категории без эмодзи
        if (empty($category->emoji) || !is_array($category->emoji)) {
            continue;
        }

        $catKey        = $category->category;
        $categoryTitle = $lang["emoji_{$catKey}"] ?? $catKey;

        // Открываем блок категории
        $output .= "<div class=\"emoji_category\"><b>{$categoryTitle}</b>";
        $output .= "<div class=\"emoji_list\">";

        foreach ($category->emoji as $symbol) {
            $code = strtoupper($symbol->code);
            $name = htmlspecialchars($symbol->name ?? '', ENT_QUOTES, 'UTF-8');

            $imgTag = '';
            foreach ($extensions as $ext) {
                $file = "{$basePath}{$catKey}/{$symbol->name}.{$ext}";
                if (file_exists($file)) {
                    $src    = "{$urlPath}{$catKey}/{$symbol->name}.{$ext}";
                    $imgTag = "<img src=\"{$src}\" alt=\"{$name}\" class=\"emoji\" />";
                    break;
                }
            }

            // Выводим блок эмодзи (возможно пустой, если картинка не найдена — Unicode подставится скриптом)
            $output .= "<div class=\"emoji_symbol\" data-emoji=\"{$code}\" data-name=\"{$name}\">"
                     . $imgTag
                     . "</div>";
        }

        // Закрываем список
        $output .= "</div></div>";
    }

    // Закрываем общий блок
    $output .= '</div>';
    return $output;
}



/**
 * Генерация emoji-скрипта
 */
/**
 * Генерация JS‑кода для вставки эмоджи
 */
function get_emoji_script(array $lang): string {
    // Экранируем текст для JS
    $last = addslashes($lang['emoji_last'] ?? '');

    return <<<JS
<script>
function dle_smiley(img) {
    active_editor.emoticons.insert(img);
}

var text_last_emoji = "{$last}";
display_editor_last_emoji();

function emojiFromHex(hex) {
    try {
        if (hex.toLowerCase().startsWith('f0')) {
            var bytes = hex.match(/.{1,2}/g).map(function(b){ return parseInt(b, 16); });
            return new TextDecoder().decode(new Uint8Array(bytes));
        } else {
            return String.fromCodePoint(parseInt(hex, 16));
        }
    } catch (e) {
        return null;
    }
}

// Проходим по всем контейнерам и вставляем <a> с правильными параметрами
document.querySelectorAll('.emoji_list .emoji_symbol').forEach(function(el){
    var code  = el.getAttribute('data-emoji');
    var name  = el.getAttribute('data-name') || '';
    var emoji = emojiFromHex(code);

    if (emoji) {
        // Конкатенируем строки, экранируем одиночные кавычки
        var safeEmoji = emoji.replace(/'/g, "\\'");
        var safeCode  = code.replace(/'/g, "\\'");
        var safeName  = name.replace(/"/g, '&quot;');

        el.innerHTML = '<a onclick="insert_editor_emoji(\\'' + safeEmoji + '\\', \\''
                     + safeCode + '\\'); return false;" title="' + safeName + '">'
                     + safeEmoji + '</a>';
    } else {
        el.parentNode.removeChild(el);
    }
});
</script>
JS;
}


// Основной вывод
if (!$config['emoji']) {
    $emoji_data = json_decode(file_get_contents(TEMPLATE_DIR .''.$config['siteSettings']['siteTpl']. "/assets/emoticons/emoji.json"));
    $output = generate_emoji_output($emoji_data, $lang, $config);
    $emoji_script = get_emoji_script($lang);

} else {
	/*
    $i = 0;
    $emoji_script = "";
    $output = "<table style=\"width:100%;border: 0px;padding: 0px;\"><tr>";

    $smilies = array_map('trim', explode(",", $config['smilies']));
    $count_smilies = count($smilies);

    foreach ($smilies as $smile) {
        $i++;
        $sm_image = generate_smiley_image($smile, $config);

        $output .= "<td style=\"padding:5px;text-align: center;\" align=\"center\">
                        <a href=\"#\" onclick=\"dle_smiley(':$smile:'); return false;\" ontouchstart=\"dle_smiley(':$smile:'); return false;\">
                            {$sm_image}
                        </a>
                    </td>";

        if ($i % 7 == 0 && $i < $count_smilies) $output .= "</tr><tr>";
    }

    $output .= "</tr></table>";
	*/
}

echo <<<HTML
{$output}
<script>
<!--
    function dle_smiley(finalImage) {
        active_editor.emoticons.insert(finalImage);
    }
    {$emoji_script}
-->
</script>
HTML;
?>
