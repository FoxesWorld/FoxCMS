CREATE TABLE IF NOT EXISTS `users` (
	`user_id` `user_id` INT(8) NOT NULL AUTO_INCREMENT;
	`login` varchar(16) NOT NULL,
	`password` varchar(128) NOT NULL,
	`email` varchar(64) NOT NULL,
	`user_group` int(4) NOT NULL,
	`realname` varchar(32) NOT NULL,
	`hash` varchar(64) NOT NULL,
	`reg_date` varchar(32) NOT NULL,
	`last_date` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;