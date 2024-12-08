CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(200) NOT NULL,
	`email` varchar(255) NOT NULL,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `collocations` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`word_id` bigint unsigned NOT NULL,
	`text` varchar(100) NOT NULL,
	`translation` varchar(200),
	CONSTRAINT `collocations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `examples` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`word_id` bigint unsigned NOT NULL,
	`text` varchar(200) NOT NULL,
	`translation` varchar(300),
	CONSTRAINT `examples_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `words` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`user_id` bigint unsigned NOT NULL,
	`word` varchar(50) NOT NULL,
	`position` double unsigned,
	`translation` varchar(100),
	`frequency` tinyint unsigned NOT NULL,
	`pronunciation` varchar(200),
	`roles` varchar(100),
	`meaning` varchar(300),
	`etymology` varchar(200),
	`other` varchar(500),
	`img` varchar(250),
	CONSTRAINT `words_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `collocations` ADD CONSTRAINT `collocations_word_id_words_id_fk` FOREIGN KEY (`word_id`) REFERENCES `words`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `examples` ADD CONSTRAINT `examples_word_id_words_id_fk` FOREIGN KEY (`word_id`) REFERENCES `words`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `words` ADD CONSTRAINT `words_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;