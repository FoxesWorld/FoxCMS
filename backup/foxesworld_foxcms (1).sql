-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Май 12 2024 г., 15:33
-- Версия сервера: 10.11.3-MariaDB-1
-- Версия PHP: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `foxesworld_foxcms`
--

-- --------------------------------------------------------

--
-- Структура таблицы `antiBrute`
--

CREATE TABLE `antiBrute` (
  `id` int(11) NOT NULL,
  `time` varchar(255) DEFAULT NULL,
  `recordTime` datetime(4) NOT NULL DEFAULT current_timestamp(4),
  `ip` varchar(16) DEFAULT NULL,
  `attempts` int(16) NOT NULL DEFAULT 0
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Структура таблицы `badgesList`
--

CREATE TABLE `badgesList` (
  `id` int(4) NOT NULL,
  `badgeName` varchar(64) DEFAULT NULL,
  `description` varchar(512) DEFAULT NULL,
  `img` varchar(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `badgesList`
--

INSERT INTO `badgesList` (`id`, `badgeName`, `description`, `img`) VALUES
(1, 'Staff', 'Команда FoxesCraft', '/uploads/badges/staff.svg'),
(2, 'BugHunter', 'Охотник за багами', '/uploads/badges/bugHunter1.svg'),
(3, 'Support', 'Поддержка FoxesCraft', '/uploads/badges/support.svg'),
(4, 'earlyUser', 'За раннюю регистрацию', '/uploads/badges/earlyUser.svg'),
(5, 'arasaka', 'Сила — в преемственности', '/uploads/badges/arasaka.svg'),
(6, 'badRep', 'Плохая репутация', '/uploads/badges/badRep.svg');

-- --------------------------------------------------------

--
-- Структура таблицы `groupAssociation`
--

CREATE TABLE `groupAssociation` (
  `id` int(4) NOT NULL,
  `groupName` varchar(256) DEFAULT 'Noob',
  `groupNum` int(4) NOT NULL DEFAULT 4,
  `groupType` varchar(64) NOT NULL DEFAULT 'user',
  `badgeName` varchar(128) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `groupAssociation`
--

INSERT INTO `groupAssociation` (`id`, `groupName`, `groupNum`, `groupType`, `badgeName`) VALUES
(1, 'Admin', 1, 'admin', NULL),
(2, 'Гостевичок', 5, 'guest', NULL),
(3, 'Лис', 4, 'user', NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `groupPermissions`
--

CREATE TABLE `groupPermissions` (
  `id` int(4) NOT NULL,
  `groupName` varchar(32) NOT NULL DEFAULT 'user',
  `permName` varchar(64) DEFAULT NULL,
  `permValue` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `groupPermissions`
--

INSERT INTO `groupPermissions` (`id`, `groupName`, `permName`, `permValue`) VALUES
(1, 'admin', 'allowedColors', '#e4005d9e,#3cc9489e,#e72f00ad,#2656caad'),
(2, 'user', 'allowedColors', '#e4005d9e,#3cc9489e,#2656caad,#26caad,#c7c02cb5');

-- --------------------------------------------------------

--
-- Структура таблицы `regCodes`
--

CREATE TABLE `regCodes` (
  `id` int(4) NOT NULL,
  `name` varchar(64) NOT NULL,
  `code` varchar(64) NOT NULL,
  `groupNum` int(2) NOT NULL DEFAULT 4
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `regCodes`
--

INSERT INTO `regCodes` (`id`, `name`, `code`, `groupNum`) VALUES
(1, 'test', 'test', 6);

-- --------------------------------------------------------

--
-- Структура таблицы `servers`
--

CREATE TABLE `servers` (
  `id` int(4) NOT NULL,
  `enabled` varchar(16) NOT NULL DEFAULT 'true',
  `serverGroups` varchar(32) NOT NULL DEFAULT '1,4',
  `serverName` varchar(64) NOT NULL,
  `serverVersion` varchar(64) NOT NULL,
  `host` varchar(64) NOT NULL,
  `port` int(32) NOT NULL,
  `jreVersion` varchar(32) NOT NULL DEFAULT 'jre-8-271-x64',
  `ignoreDirs` varchar(128) DEFAULT 'config,saves',
  `modsInfo` longtext DEFAULT '[]',
  `serverImage` varchar(128) DEFAULT NULL,
  `serverDescription` varchar(512) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `servers`
--

INSERT INTO `servers` (`id`, `enabled`, `serverGroups`, `serverName`, `serverVersion`, `host`, `port`, `jreVersion`, `ignoreDirs`, `modsInfo`, `serverImage`, `serverDescription`) VALUES
(10, 'true', '1,4,5', 'Twilight', '1.16.5-Forge', 'foxescraft.ru', 25569, 'jre-11-x64', 'config,saves,test', '[{\"modName\":\"Ambient Environment\",\"modPicture\":\"                                                                                                                                                                                                                                                                                                                                                                    https://ru-minecraft.ru/uploads/posts/2019-09/1569288819_ambient-environment-1.jpg                                                                                                                                                                                                                                                                                                \\n                            \",\"modDesc\":\"                                                                                                                                                                                                                    Ambient Environment - это косметический мод, который придает игровой среде большую реалистичность. Он изменяет цвет и оттенок травы, листвы и воды в зависимости от освещения, создавая более живописный и разнообразный ландшафт. Этот мод придает игровой природе дополнительную глубину и красоту.                                                                                                                                                                \\n                            \"},{\"modName\":\"Better Village\",\"modPicture\":\"                                                                                                                                                                                                                                                                                                                                                                    https://static2.cubixworld.net/mods/images/main/1665780449821.jpg                                                                                                                                                                                                                                                                                                \\n                            \",\"modDesc\":\"                                                                                                                                                                                                                    Better Village - мод, направленный на разнообразие деревень в игре. Он вносит изменения в структуру и дизайн деревенских поселений, делая их более уникальными и интересными для исследования игроками. Этот мод призван обогатить игровой мир разнообразием архитектурных стилей и контентом.                                                                                                                                                                \\n                            \"},{\"modName\":\"Mutant Beast\",\"modPicture\":\"                                                                                                                                                                                                                                                                                                                                                                                                        https://minecraft-inside.ru/uploads/files/2019-09/Mutant_Beasts.png                                                                                                                                                                                                                                                                                                                                \\n                            \",\"modDesc\":\"                                                                                                                                                                                                                    Mutant Beast - это модификация, вдохновленная популярным модом Mutant Creatures. Он добавляет в игру мобов-мутантов, представляющих собой мутированные версии обычных мобов с уникальными моделями и характеристиками. Этот мод приносит в игру новых вызывающих опасность существ, которые могут стать как союзниками, так и опасными противниками.                                                                                                                                                                \\n                            \"},{\"modName\":\"Dynamic Trees\",\"modPicture\":\"                                                                                                                                                                                                                                                                                                                                https://content.invisioncic.com/r268468/monthly_2021_12/1871885200_matureoaktree.PNG.d4ddd872ab5803115c5da2f88bf0111b.PNG                                                                                                                                                                                                                                                                \\n                            \",\"modDesc\":\"                                                                                                                                                                                                                    Dynamic Trees - мод, который добавляет в игру реалистичные деревья с физикой рубки. В отличие от простого руба, каждое дерево в этом моде обладает уникальной структурой и свойствами, что делает их более реалистичными и интерактивными для игроков. Этот мод изменяет способ, которым игроки взаимодействуют с деревьями, создавая более погружающий игровой опыт.                                                                                                                                                                \\n                            \"},{\"modName\":\"Twilight Forest\",\"modPicture\":\"                                                                                                                                                                                                                                                                                            https://vsegda-pomnim.com/uploads/posts/2022-04/1648933995_50-vsegda-pomnim-com-p-sumerechnii-les-foto-57.jpg                                                                                                                                                                                                                                \\n                            \",\"modDesc\":\"                                                                                                                                                                                                                    Twilight Forest - это основной мод сборки, который добавляет в игру новое измерение под названием \\\"Сумеречный лес\\\". Это загадочное место, наполненное различными биомами, существами и подземными лабиринтами, которые игроки могут исследовать. Этот мод расширяет игровой мир, предлагая новые приключения и возможности для исследования.                                                                                                                                                                \\n                            \"},{\"modName\":\"Better Animals Plus\",\"modPicture\":\"                                https://minecraft-inside.ru/uploads/files/2022-12/79490_63a55ca8c6ac1.png\\n                            \",\"modDesc\":\"                                BA  разнообразит игровой мир новыми существами (реальными и выдуманными). Он добавит как пассивных, так и враждебных мобов, появится даже мини-босс. Все новые мобы обладают своей необычной эстетикой и красивой 3D моделью.\\n                            \"}]', '/templates/foxengine2/assets/img/servers/twilight.jpg', 'Готов ли ты отправиться в невероятное приключение в мистическом мире <b style=\"color: purple\">Twilight</b>? Здесь тебя ждут захватывающие битвы, эпические квесты и бесконечные возможности для самовыражения.\n        <p class=\"alert alert-success\" role=\"alert\">\nПрисоединяйся к нам прямо сейчас и стань частью этой удивительной истории!</p>'),
(17, 'true', '1', 'Underground', '1.12.2-Forge', 'foxescraft.ru', 25567, 'jre-8-271-x64', 'config,saves', '[{\"modName\":\"gggg\",\"modPicture\":\"https://files.vgtimes.ru/download/posts/2020-02/1580645043_yv4kf_4yioqtwhli3n7r3g.jpg\",\"modDesc\":\"ghghghgh\"}]', '/templates/foxengine2/assets/img/servers/underground.png', 'Test222'),
(18, 'true', '1,4,5', 'New', '1.12.2-Forge', 'foxescraft.ru', 25570, 'jre-8-271-x64', 'config,saves', '[{\"modName\":\"Client Fixer\",\"modPicture\":\"                                                                                                                                                                                                                                                                https://minecraft-inside.ru/uploads/files/2021-12/61b5ff2b65a99.jpg                                                                                                                                                                                                    \\n                            \",\"modDesc\":\"Исправляет шрифт на более приятный\"}]', '/templates/foxengine2/assets/img/servers/test.png', 'Тестовый сервер на котором <b>polyarnik</b> тестирует различные плагины.\n<p class=\"alert alert-warning\" role=\"alert\">\n Внимние сервер склонен умирать!\n</p>'),
(19, 'true', '1', 'test', '1.7.10-Forge', 'foxescraft.ru', 25567, 'jre-8-271-x64', 'config,saves', '[]', '/templates/foxengine2/assets/img/servers/hitech.png', 'Поиграли и хватит!');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `user_id` int(2) NOT NULL,
  `login` varchar(16) NOT NULL,
  `password` varchar(64) NOT NULL,
  `email` varchar(128) NOT NULL,
  `user_group` int(4) NOT NULL DEFAULT 4,
  `realname` varchar(32) NOT NULL,
  `hash` varchar(64) NOT NULL,
  `reg_date` varchar(32) NOT NULL,
  `last_date` varchar(32) NOT NULL,
  `profilePhoto` varchar(128) NOT NULL,
  `logged_ip` varchar(128) DEFAULT NULL,
  `userStatus` varchar(128) DEFAULT NULL,
  `land` varchar(64) DEFAULT NULL,
  `colorScheme` varchar(32) NOT NULL DEFAULT '#B5B8B1',
  `token` varchar(64) DEFAULT NULL,
  `reg_ip` varchar(64) DEFAULT NULL,
  `units` varchar(512) NOT NULL DEFAULT '[{"crystals": 0},{"units": 0}]',
  `uuid` varchar(32) DEFAULT NULL,
  `badges` text NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`user_id`, `login`, `password`, `email`, `user_group`, `realname`, `hash`, `reg_date`, `last_date`, `profilePhoto`, `logged_ip`, `userStatus`, `land`, `colorScheme`, `token`, `reg_ip`, `units`, `uuid`, `badges`) VALUES
(1, 'AidenFox', '$2y$10$SuxSHqM5ooEp/2mF.H.jTu5LFGOl2NC1NOPS4TnTIYBfgP6uWtQa2', 'lisssicin@yandex.ru', 1, 'Aiden', '889767950699c75535047544b50fe62b', '1676888597', '1715517187', '/uploads/users/AidenFox/profilePhoto.png', '178.176.78.162', 'FoxEngine Founder', 'United Kingdom', '#3cc9489e', '2a26ea64b59211054efa0e6ab819e16b', NULL, '[{\"crystals\": 200},{\"units\": 1000}]', '436246fdf1d0f84b5b2ca7e0646aecc9', '[{\"badgeName\":\"Support\",\"acquiredDate\":\"1676840400000\",\"description\":\"Поддержка FoxesCraft\"},{\"badgeName\":\"Staff\",\"acquiredDate\":\"1715374800000\",\"description\":\"Команда FoxesCraft\"},{\"badgeName\":\"BugHunter\",\"acquiredDate\":\"1696194000000\",\"description\":\"Охотник за багами\"},{\"badgeName\":\"earlyUser\",\"acquiredDate\":\"1699477200000\",\"description\":\"За раннюю регистрацию\"},{\"badgeName\":\"arasaka\",\"acquiredDate\":\"1699477200000\",\"description\":\"Сабуро Арасака\"}]'),
(2, 'anonymous', '', 'foxesworld.co.uk', 5, 'Анонимчик', '', '1676888597', '76767', '/uploads/users/anonymous/avatar.jpg', NULL, NULL, NULL, '#B5B8B1', NULL, NULL, '0', NULL, ''),
(3, 'MorelloFox', '$2y$10$gZhbuMruQgFKgXnogXl9ieflz2iRmkz6lkAI1ZiwtNy7DCYSfPAei', 'lisssicin@ya.ru', 4, 'Хайки', 'e87d5652a88d2e78aa3460bf98802e64', '1696252454', '1696252523', '/uploads/users/MorelloFox/profilePhoto.jpg', '31.173.85.243', 'Главный Фармер', 'Твоя мамаша', '#B5B8B1', NULL, '31.173.85.243', '0', NULL, '[{\"badgeName\":\"BugHunter\",\"acquiredDate\":\"1715288400000\",\"description\":\"Hunter\"}]'),
(11, 'Haiky', '$2y$10$ZIbUbNtZn9GRpr8btajUj.nLASC7Q9DBgtsNJvSBniFWJrpsb9QWm', 'haiky@mail.ru', 4, 'Хоупс', '1eab5237ece784608120fbb2f80ed340', '1699047906', '1699047976', '/templates/foxengine2/assets/img/no-photo.jpg', '178.162.44.5', NULL, NULL, '#B5B8B1', NULL, '178.162.44.5', '0', '5253163115899a74d1f5392e6aaf1dae', '[{\"badgeName\":\"earlyUser\",\"acquiredDate\":\"1699477200000\",\"description\":\"За раннюю регистрацию\"}]'),
(12, 'Jesus', '$2y$10$ryvEmg3UGdx7oshqGsARw.6xwDdvRSDWENaryFiLM9YzntatZI9Zm', 'liuss@ya.ru', 4, 'Хайки V', 'c4692c96ac551b378f0909fcdaa3c53b', '1699263101', '1715444890', '/uploads/users/Jesus/profilePhoto.png', '178.176.78.162', 'Jesus', 'Россия Z', '#c7c02cb5', '7a926edfc5d27c3272da27d54014b2fe', '109.252.12.109', '0', 'e9829608dd90ff6b8bf7cb50746eae78', ''),
(17, 'DallasFox', '$2y$10$swgnNiDWbRAqWfhG/sbwHudfUG/3W25lA8TZ0p87scFzisi7OYYxm', 'sklyurov98@mail.ru', 4, 'Даллас', 'a6c370a2a6046a4f72f208add3c0d375', '1699558853', '1699558922', '/uploads/users/DallasFox/profilePhoto.png', '45.91.163.11', 'Начальник Геодезической службы', 'Россия', '#B5B8B1', NULL, '45.91.163.11', '0', NULL, ''),
(21, 'miomoor', '$2y$10$nER5gFOGQYfq3hYDUKOmB.tLwUz2qPfKGCn9TRIG/GpHA2IuFmNmS', 'tt@gg.rr', 4, 'Агро', '19d2f27478f0e8245b503928006daee2', '1702469352', '1702472364', '/templates/foxengine2/assets/img/no-photo.jpg', '109.252.3.17', NULL, NULL, '#B5B8B1', NULL, '109.252.3.17', '0', NULL, '[{\"badgeName\":\"arasaka\",\"acquiredDate\":\"1715806800000\",\"description\":\"Сила — в преемственности\"}]'),
(22, 'Swift_Fox', '$2y$10$VQAMC9Z4G2mt3ptmTFviOurInm1hxkQi6lzOf8rhfk5Q/MyRaGr3m', 'gneffer2001@gmail.com', 1, 'Гоблин', 'bb56253c174c87177c6cdc3c13517d0f', '1702474360', '1714096487', '/uploads/users/Swift_Fox/profilePhoto.jpg', '49.143.123.207', 'Первый', 'South Korea', '#3cc9489e', '', '49.143.123.207', '0', '545787180b6f3fdcabe6fb349f8adaa4', '[{\"acquiredDate\":1702474361,\"badgeName\":\"earlyUser\"}, {\"badgeName\":\"Support\",\"acquiredDate\":\"1702474361\"},{\"badgeName\":\"Staff\",\"acquiredDate\":\"1702474361\"}]'),
(23, 'RaKaLuS', '$2y$10$.Hulj62.ahjVMjlE6W6uoOxagnblB9NrB6FwRonJcIWzEyEDj8eze', 'sir.d-i-a2014@mail.ru', 4, 'Хач трюкач', 'eb1ac23c024bc867b5b420b1d401cfe4', '1702630649', '1704544613', '/templates/foxengine2/assets/img/no-photo.jpg', '90.188.77.246', NULL, NULL, '#B5B8B1', '', '90.188.77.246', '0', '412cbd342e8a3f2a959433d35e3da858', '[{\"badgeName\":\"earlyUser\",\"acquiredDate\":\"1702630650\",\"description\":\"За раннюю регистрацию\"},{\"badgeName\":\"badRep\",\"acquiredDate\":\"1676888597\",\"description\":\"\"}]'),
(24, 'Aenph1r', '$2y$10$jPuI1djwncR3frU/KNdJl.71H99cigErWuEu8YWBgYy8h9GlNEm16', 'konstantinthecool@gmail.com', 4, 'Дурилка', 'ecdfc2f32e76a2d7f9db16efdf563a84', '1703506143', '1705067941', '/templates/foxengine2/assets/img/no-photo.jpg', '94.51.79.169', NULL, NULL, '#B5B8B1', '', '94.51.66.237', '0', '7abbd2cba14c3d8eb6aacfce62b1e335', '[{\"badgeName\":\"earlyUser\",\"acquiredDate\":\"1703451600000\",\"description\":\"За раннюю регистрацию\"}]'),
(25, 'Grace', '$2y$10$lXOXXSKgDIWvLmau2gYZV.QiGL3GnxswBxPm8k4sd9.TMypkfRzJm', 'johnjonathangrace@gmail.com', 4, 'Rasta', 'e15593d46869d743537e3c1b8e69dad1', '1703521140', '1703523234', '/templates/foxengine2/assets/img/no-photo.jpg', '185.130.83.149', 'Yes', 'Ад', '#2656caad', 'cd7fc62a050b6beb7787ed33e6090cbf', '185.130.83.149', '0', '68727d15820a3c2ebc29636a8ba6d666', '[{\"acquiredDate\":1703521140,\"badgeName\":\"earlyUser\"}]'),
(26, 'Wiibel', '$2y$10$05GuVa88gtSGhCW1F6nCLeR80hSXQn3.5QTECVL/cDH9JfqnF53DO', 'fazzussdisc@gmail.com', 4, 'Дурилка', 'b4dd0ae110cd50839d61fc2503293f06', '1703782982', '1707485916', '/templates/foxengine2/assets/img/no-photo.jpg', '82.215.122.106', NULL, NULL, '#B5B8B1', 'dd07f6d4c931a0623d7f7161612a4098', '82.215.122.106', '0', '3668b37aa43462d8a2c549a776aae077', '[{\"acquiredDate\":1703782983,\"badgeName\":\"earlyUser\"}]'),
(27, 'Fixys', '$2y$10$9feFZRiG5X9E4cX.IJjRdua6lFzf54IO5JH63JACRWCPMVqKS2Cha', 'kakaskryto@mail.ru', 4, 'Хайки', '44a8d0df03134f3bf21691b0646ae08d', '1703866056', '1711983438', '/templates/foxengine2/assets/img/no-photo.jpg', '37.212.202.237', NULL, NULL, '#B5B8B1', '', '37.212.198.100', '0', 'a298ae809269c24b5734490a75fb35f6', '[{\"acquiredDate\":1703866056,\"badgeName\":\"earlyUser\"}]'),
(28, 'Kapyssta', '$2y$10$2nf6MLaS1sNP0UYn.NWH2uPuDnJCZB/YnAEKJEhmpsRv2loKr6KaO', 'kapysta285@gmail.com', 4, 'Бычок', 'de75b88247846f905f83d0da509b62ed', '1703866527', '1709929785', '/templates/foxengine2/assets/img/no-photo.jpg', '188.32.144.22', NULL, NULL, '#B5B8B1', '8a15f3d16404b943857effc3e5b1939f', '188.32.144.22', '0', 'cd116e0734318ad1bc1e2bdd9c0101bd', '[{\"badgeName\":\"earlyUser\",\"acquiredDate\":\"1715202000000\",\"description\":\"За раннюю регистрацию\"}]'),
(29, 'Sensei', '$2y$10$MRAj7lo1RuYGRYRrbAzMMeRKS2RdUsgKFztVPJ7qDxuT6TV7ixroe', 'Time9335@vk.com', 4, 'Дурилка', '08867f3b99769b95269a808dd9487c7a', '1703867363', '1709986934', '/templates/foxengine2/assets/img/no-photo.jpg', '91.243.107.58', NULL, NULL, '#B5B8B1', '', '91.243.110.87', '0', 'e558734d5a4fb68a183e67c9b07a983b', '[{\"badgeName\":\"earlyUser\",\"acquiredDate\":\"1703867364\",\"description\":\"За раннюю регистрацию\"}]'),
(30, '12Sensei12', '$2y$10$ThkowDBHHanByqP4Uh91kO4iDyEEN4ywscAn7DcTFlBS4LgkJ7nya', 'Time133377@mail.ru', 4, 'Sensei', 'caac89664f1544f6cf5f766d15f889d9', '1703868177', '1711469608', '/uploads/users/12Sensei12/profilePhoto.png', '91.243.100.242', 'Online', 'Home', '#e4005d9e', '', '91.243.110.87', '0', 'dc12967efe1af7e817f62da01e6acbf0', '[{\"badgeName\":\"earlyUser\",\"acquiredDate\":\"1703868177\",\"description\":\"За раннюю регистрацию\"}]'),
(31, 'dogiso', '$2y$10$YP2dc3aX83m8Zs19ZNnAZeE0zSiuhr/iUPWlB82vl8O6wz0bs9QWO', 'danila.sabunin212@mail.ru', 4, 'Далабеб', '9d8c0bdc4dea9e80224afb374f81e9d5', '1703873375', '1710007410', '/templates/foxengine2/assets/img/no-photo.jpg', '77.222.119.114', 'Агресив', 'Болото', '#e4005d9e', '', '77.222.112.242', '0', 'fe927e42128eaf0bec6c9601c4757d21', '[{\"badgeName\":\"earlyUser\",\"acquiredDate\":\"1703797200000\",\"description\":\"За раннюю регистрацию\"}]'),
(32, 'lisssicin', '$2y$10$xelETh6f2FWgsm7UyOCOeutGj/V/qu/KYaNwnBRsGCGBP5vuR61de', 'test15@inbox.ru', 4, 'Иван', '328219949b8579286b67253004cec0bb', '1704285594', '1709364776', '/templates/foxengine2/assets/img/no-photo.jpg', '178.176.77.11', 'lisssicin', 'Moscow', '#26caad', '', '178.176.75.146', '0', 'd76857af9bdb0d9641c63ab17a662c58', '[{\"badgeName\":\"BugHunter\",\"acquiredDate\":\"1715374800000\",\"description\":\"Hunter\"}]'),
(33, 'Senta', '$2y$10$DgPQjRaJkt3oD8pmfVImBuhJD6LXN6lCryykrTjFSMO7jZJTXQY0m', 'strojkovtema@gmail.com', 4, 'Оронч', '6ee283b85ec39815498602d35f5e4bbe', '1704536426', '1704717138', '/templates/foxengine2/assets/img/no-photo.jpg', '80.234.72.253', NULL, NULL, '#B5B8B1', '', '109.169.130.104', '0', '5557bc844e1b79d907d4c2107b80f510', '[{\"badgeName\":\"earlyUser\",\"acquiredDate\":\"1704536427\",\"description\":\"За раннюю регистрацию\"}]'),
(34, 'Ichmo0', '$2y$10$5VJhGBXmum9l8NtBfnqt1u149A.DWD2hctbulP/QJvODrYMbdOjnq', 'raiskiyorex2001@mail.ru', 4, 'Виражар-волшебство', '1ed70d47c6999f1ac8c0bd8acd729ecb', '1704555884', '1709995656', '/templates/foxengine2/assets/img/no-photo.jpg', '89.250.7.90', NULL, NULL, '#B5B8B1', '3cdcd8a0d1b9f22b1f59c5c56368d5b1', '89.189.121.152', '0', '9a4e2dcf3a7f05e91b2f91e724f221a6', '[{\"acquiredDate\":1704555885,\"badgeName\":\"earlyUser\"}]'),
(35, 'mura', '$2y$10$BAbMe1SBRg7RZfSGt5nztO9EDjFVE4qwaUibqzY9G3EB8JLzi7Ldi', 'wtulka2@gmail.com', 4, 'Хоупс', '6eb9b058166203a4fbac9dd1f26bfa5b', '1704556359', '1704566589', '/templates/foxengine2/assets/img/no-photo.jpg', '188.234.32.15', NULL, NULL, '#B5B8B1', '', '188.234.20.48', '0', '9df79be2ca0795b0641e8aa3d3f21ffc', '[{\"acquiredDate\":1704556359,\"badgeName\":\"earlyUser\"}]'),
(36, 'L8izaRD', '$2y$10$4ZfIJtKmhB8tt3B9rXw0hOBpkBNgXdV7r0RQP7JxGCSUNVwZZIIqm', 'romapetreshov@gmail.com', 4, 'Герцог-гармония', 'f25e72739749e76f401838fefa3a8936', '1704557662', '1704574044', '/templates/foxengine2/assets/img/no-photo.jpg', '178.45.61.250', NULL, NULL, '#B5B8B1', '', '178.45.61.250', '0', '4ec3a95c6693b519da454faf7fea3db9', '[{\"badgeName\":\"earlyUser\",\"acquiredDate\":\"1704488400000\",\"description\":\"За раннюю регистрацию\"},{\"badgeName\":\"badRep\",\"acquiredDate\":\"1714510800000\",\"description\":\"\"}]'),
(37, 'kris1090', '$2y$10$2qQE9oGE9ItaIjC5CssfmuW2TOKpo4iXHZnLs19HO6JSmt/IJyjSe', 'Vewikar@mail.ru', 4, 'kris', '541eab3e03fd478d91db15fffae5b9cf', '1704615655', '1704616578', '/templates/foxengine2/assets/img/no-photo.jpg', '91.243.110.87', 'sos', 'France', '#e4005d9e', NULL, '91.243.110.87', '0', 'a023dfb778d1511f14a082fc29fc5483', ''),
(38, 'kris10902', '$2y$10$sxACfh.GwxJ99imrSOE3j.HZCFn.gOSLv.lBpXZARNUaYHFMG5LW.', 'artemmataz480@gmail.com', 4, 'Шутюга-шарлатан', 'f631bce7cb6d90e1c88818e5e722c009', '1704616411', '1705836337', '/templates/foxengine2/assets/img/no-photo.jpg', '194.85.210.119', NULL, NULL, '#B5B8B1', '', '194.85.210.114', '0', '91b0497b7bcb0314edfe295ee3b466fe', '[{\"acquiredDate\":1704615655,\"badgeName\":\"earlyUser\"}]'),
(39, 'voenkom', '$2y$10$6VTuswPQGUi3.zCfgAcgueoHcD4yncQRbkx6uiXPU3xFoLNYIkmIa', 'shotinapisal@mail.ru', 4, 'Брильянтюг-блиц', '7473aba6b2659d2edb0f9d14890bbb06', '1704730755', '1705602662', '/templates/foxengine2/assets/img/no-photo.jpg', '87.117.63.183', NULL, NULL, '#B5B8B1', '', '46.61.125.147', '0', '6ffad5356d983dfa9120fc7dbf69a254', ''),
(40, 'staspopkill', '$2y$10$y6AImhQGMqTGSu.FgQ93m.CuRME914/d.3alJYWj7pLgrP0o1i0lG', 'staspopkill@gmail.com', 4, 'Стасик', '57bbedeb81d73d9d265748bc440e17c9', '1705078613', '1707652971', '/templates/foxengine2/assets/img/no-photo.jpg', '194.85.210.109', 'Главный Инженер', 'Россия', '#e72f00ad', '', '194.85.210.101', '0', '806969a9d804c8ef50ac3763c94bc0a2', ''),
(41, 'alcor', '$2y$10$s64aFiQLvZHJAwCqAmYIEeBggnHpurIB1lzFquCWYGSMxXtw5gPYy', 'test@gg.ru', 4, 'Смехорочка', '92758971e89e963875ebf859eb82cb7b', '1706294237', '1706294806', '/templates/foxengine2/assets/img/no-photo.jpg', '109.252.3.17', 'null', 'null', '#B5B8B1', NULL, '109.252.3.17', '0', '6ced00272896bb52c5d0fbb91ef94ba9', '[{\"acquiredDate\":1706294237,\"badgeName\":\"earlyUser\"}]'),
(42, 'polyarnik', '$2y$10$2KtxW9GusUYafKvPChNUY.yXdYH8JB.sb9mi3O8xz5eRKa/6EmaAO', 'kovik777a@mail.ru', 4, 'Тень-труд', '729d1821b056ce341348116a6f1cd41b', '1708767988', '1715028118', '/templates/foxengine2/assets/img/no-photo.jpg', '188.162.132.9', 'AidenFox', 'null', '#B5B8B1', '', '95.153.181.169', '0', '86417f52315329c7964b55c5fc6d5500', '[{\"badgeName\":\"earlyUser\",\"acquiredDate\":\"1708767988\",\"description\":\"За раннюю регистрацию\"},{\"badgeName\":\"Staff\",\"acquiredDate\":\"1676888597\",\"description\":\"\"}]'),
(43, 'bober', '$2y$10$aiMUvEN84JlDCfeZtsl3vujD8.1Cp0lwTP89v3x3pH6c/gkZ4yzZq', 'kimvasa321@gmail.com', 4, 'Пламя', 'd50f2dcaac32fe331539ffac0ae859bc', '1712475341', '1712475487', '/templates/foxengine2/assets/img/no-photo.jpg', '49.143.123.207', NULL, NULL, '#B5B8B1', NULL, '49.143.123.207', '0', '43e0ab313ea599d05161f324cb5e038e', '[{\"acquiredDate\":1712475342,\"badgeName\":\"earlyUser\"}]'),
(44, 'Nikko', '$2y$10$4T3D.qkYKOZc2u3wR/D.IO3A0zVVyBDxaee.E3kwqffhjXPfsd.au', 'littlesatanist66@gmail.com', 4, 'Усач Убивач', '869c166c345306754505026cd818f698', '1712600792', '1712601233', '/templates/foxengine2/assets/img/no-photo.jpg', '109.252.2.90', NULL, NULL, '#B5B8B1', '', '109.252.2.90', '0', 'd49fc1f8035887255cae96a77e586949', '[{\"acquiredDate\":1712600792,\"badgeName\":\"earlyUser\"}]'),
(45, 'Haiky_', '$2y$10$mIcGYxp7nrC8eEIWGUU6buMEVBknRxkam7Ty948jSKRfEpGTvlWjq', 'ferm32@mail.ru', 4, 'Тень', '658c0943cc9c2a67045a9a5f1adb5ce2', '1715196468', '1715291819', '/templates/foxengine2/assets/img/no-photo.jpg', '178.162.44.5', NULL, NULL, '#B5B8B1', '', '178.162.44.5', '0', '9930e31c536406ecb9ba5e3477b1cdc3', '[{\"acquiredDate\":1715196468,\"badgeName\":\"earlyUser\"}]');

-- --------------------------------------------------------

--
-- Структура таблицы `usersession`
--

CREATE TABLE `usersession` (
  `id` int(4) NOT NULL,
  `user` varchar(128) DEFAULT NULL,
  `accessToken` varchar(512) DEFAULT NULL,
  `serverId` varchar(256) DEFAULT NULL,
  `userMd5` varchar(256) DEFAULT NULL,
  `passMd5` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `usersession`
--

INSERT INTO `usersession` (`id`, `user`, `accessToken`, `serverId`, `userMd5`, `passMd5`) VALUES
(3, 'RaKaLuS', 'eb1ac23c024bc867b5b420b1d401cfe4', '-6c2a836191f4685a38596a8d69b033c4ced4266b', '412cbd342e8a3f2a959433d35e3da858', '9836b48dae5ac4a1e375b932c613004d'),
(4, 'Swift_Fox', '07c0f47c6853ea2fbffbbaf33c825f05', NULL, '545787180b6f3fdcabe6fb349f8adaa4', '5d9acc79dac04e7f953bf2f03848746b'),
(5, 'Aenph1r', 'f9e583f47060581a11ef63678f8b5cf3', '82320655188cba38f852c11f3df3c2a2c25acd6', '7abbd2cba14c3d8eb6aacfce62b1e335', '2c9576c430caea1e324bcb05428aadc4'),
(6, 'Grace', 'e15593d46869d743537e3c1b8e69dad1', '6a76ff46dfe173bf56593cbb6f60d223247c0aa8', '68727d15820a3c2ebc29636a8ba6d666', 'd30789fe619eb2d816a4cff249d086b5'),
(9, 'Jesus', 'c4692c96ac551b378f0909fcdaa3c53b', '66fac567d05a3a08495330f1baa8a8a9edfda367', 'e9829608dd90ff6b8bf7cb50746eae78', '5838691dbcc7e5da137cb267de8586cc'),
(10, 'Wiibel', 'b4dd0ae110cd50839d61fc2503293f06', NULL, '3668b37aa43462d8a2c549a776aae077', '8f0dce357af74b0098cfae16080ae8af'),
(11, 'Sensei', '08867f3b99769b95269a808dd9487c7a', NULL, 'e558734d5a4fb68a183e67c9b07a983b', '1bbc6e368891cb8721bbd38558e95418'),
(12, '12Sensei12', 'caac89664f1544f6cf5f766d15f889d9', '-55d103b88d60e0697413916640c3aecc5c371e13', 'dc12967efe1af7e817f62da01e6acbf0', '9e00d600dfa8daf8c4c006260f4b78b3'),
(14, 'lisssicin', '328219949b8579286b67253004cec0bb', '-164cec111379b94271b86c2472a684a4579d8942', 'd76857af9bdb0d9641c63ab17a662c58', '6ec62f750668ccce7d77a6693ce0d3b9'),
(15, 'Fixys', '44a8d0df03134f3bf21691b0646ae08d', '-1985bf09bdca3125eeb62b6351cc9db7b7374315', 'a298ae809269c24b5734490a75fb35f6', '07a649a21514f77fe683e3892167d850'),
(16, 'Senta', '6ee283b85ec39815498602d35f5e4bbe', '2df310d44925fcea4bc1a40fc568c0b7cc5aa4ec', '5557bc844e1b79d907d4c2107b80f510', '4bddb9f84bf24fe82fb47d19528a3e5e'),
(17, 'dogiso', '9d8c0bdc4dea9e80224afb374f81e9d5', '-6050c498ad12a8ab53007597443dce4f676ae57d', 'fe927e42128eaf0bec6c9601c4757d21', 'b17e9265598a440644c40bae7474b46f'),
(18, 'Ichmo0', '1ed70d47c6999f1ac8c0bd8acd729ecb', NULL, '9a4e2dcf3a7f05e91b2f91e724f221a6', '4fc13f83614ff8ba717c87b0104f0566'),
(19, 'mura', '6eb9b058166203a4fbac9dd1f26bfa5b', NULL, '9df79be2ca0795b0641e8aa3d3f21ffc', '85bc5637ec03d24ae02e53935e58687b'),
(20, 'L8izaRD', 'f25e72739749e76f401838fefa3a8936', NULL, '4ec3a95c6693b519da454faf7fea3db9', '65e067172488eaca065a35288e70d354'),
(22, 'AidenFox', '889767950699c75535047544b50fe62b', '-12bc7018406529467cfe1876932ce4fa9bf5c388', '436246fdf1d0f84b5b2ca7e0646aecc9', 'c929eceb3487ee60d283c6fbed44442e'),
(23, 'kris10902', 'f631bce7cb6d90e1c88818e5e722c009', '42c04fba16c96b7b6ec2197f2e05bc114b4f0ed1', '91b0497b7bcb0314edfe295ee3b466fe', '68d078e4d47c84dbe944f8cb66418c4f'),
(24, 'voenkom', '7473aba6b2659d2edb0f9d14890bbb06', '-7e2f99e97bd43ed6ddd0264e19ec0dd11de8da5b', '6ffad5356d983dfa9120fc7dbf69a254', '162362922b4eaa5e39d1a8fc042641db'),
(25, 'staspopkill', '57bbedeb81d73d9d265748bc440e17c9', '18945d8a1911afffc2f83bebd223d160b596fe76', '806969a9d804c8ef50ac3763c94bc0a2', 'caffa7e1eb4e3e94ea03f26d9f55962a'),
(26, 'polyarnik', '729d1821b056ce341348116a6f1cd41b', 'e376fd2a79962828b4eeb3efa50f274d870b0b7', '86417f52315329c7964b55c5fc6d5500', 'db7482ee8af30812564af1f1bae33877'),
(27, 'Kapyssta', 'de75b88247846f905f83d0da509b62ed', NULL, 'cd116e0734318ad1bc1e2bdd9c0101bd', '3db2aa1020ceccc476c8d90a6b928717'),
(28, 'Nikko', '869c166c345306754505026cd818f698', '113ce4465473bf439633c5db0a49cf20780c9516', 'd49fc1f8035887255cae96a77e586949', '16ced09ea4c82fc33183193f1d3a8cfe'),
(29, 'Haiky_', '658c0943cc9c2a67045a9a5f1adb5ce2', '-700bd347744b4204955fb93dbeaf481d35b9bcb', '9930e31c536406ecb9ba5e3477b1cdc3', 'caa904ec807debc251ce52b60421b102');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `antiBrute`
--
ALTER TABLE `antiBrute`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `badgesList`
--
ALTER TABLE `badgesList`
  ADD UNIQUE KEY `id` (`id`);

--
-- Индексы таблицы `groupAssociation`
--
ALTER TABLE `groupAssociation`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `groupPermissions`
--
ALTER TABLE `groupPermissions`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `regCodes`
--
ALTER TABLE `regCodes`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `servers`
--
ALTER TABLE `servers`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `uuid` (`uuid`);

--
-- Индексы таблицы `usersession`
--
ALTER TABLE `usersession`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `antiBrute`
--
ALTER TABLE `antiBrute`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110;

--
-- AUTO_INCREMENT для таблицы `badgesList`
--
ALTER TABLE `badgesList`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `groupAssociation`
--
ALTER TABLE `groupAssociation`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `groupPermissions`
--
ALTER TABLE `groupPermissions`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `regCodes`
--
ALTER TABLE `regCodes`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `servers`
--
ALTER TABLE `servers`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT для таблицы `usersession`
--
ALTER TABLE `usersession`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
