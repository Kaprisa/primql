DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`name` varchar(64) NOT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

LOCK TABLES `roles` WRITE;
INSERT INTO `roles` VALUES (1, 'admin'), (2, 'user'), (3, 'editor');
UNLOCK TABLES;


DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role` (
`user_id` int(11) NOT NULL,
`role_id` int(11) NOT NULL,
PRIMARY KEY (`user_id`,`role_id`),
KEY `role_id` (`role_id`),
CONSTRAINT `user_role_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
CONSTRAINT `user_role_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `user_role` WRITE;
INSERT INTO user_role SET user_id = 1, role_id = 2;
INSERT INTO user_role SET user_id = 2, role_id = 2;
INSERT INTO user_role SET user_id = 3, role_id = 3;
INSERT INTO user_role SET user_id = 4, role_id = 3;
INSERT INTO user_role SET user_id = 5, role_id = 1;
UNLOCK TABLES;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`name` varchar(64) NOT NULL,
`email` varchar(32) NOT NULL,
`password` varchar(256) NOT NULL,
PRIMARY KEY (`id`),
UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
INSERT INTO users SET id = 1, name = 'first' , email = '1@gmail.com', password = 'password';
INSERT INTO users SET id = 2, name = 'guest' , email = 'email@gmail.com', password = 'password';
INSERT INTO users SET id = 3, name = 'gmail' , email = 'gmail57@gmail.com', password = 'password';
INSERT INTO users SET id = 4, name = 'hello' , email = 'hello@gmail.com', password = 'password';
INSERT INTO users SET id = 5, name = 'root' , email = 'root@gmail.com', password = 'password';
UNLOCK TABLES;
