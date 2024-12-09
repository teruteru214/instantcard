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
CREATE TABLE `roles` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(50) NOT NULL,
	CONSTRAINT `roles_id` PRIMARY KEY(`id`),
	CONSTRAINT `roles_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `word_roles` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`word_id` bigint unsigned NOT NULL,
	`role_id` bigint unsigned NOT NULL,
	CONSTRAINT `word_roles_id` PRIMARY KEY(`id`)
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
	`meaning` varchar(300),
	`etymology` varchar(200),
	`other` varchar(500),
	`img` varchar(250),
	CONSTRAINT `words_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `collocations` ADD CONSTRAINT `collocations_word_id_words_id_fk` FOREIGN KEY (`word_id`) REFERENCES `words`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `examples` ADD CONSTRAINT `examples_word_id_words_id_fk` FOREIGN KEY (`word_id`) REFERENCES `words`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `word_roles` ADD CONSTRAINT `word_roles_word_id_words_id_fk` FOREIGN KEY (`word_id`) REFERENCES `words`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `word_roles` ADD CONSTRAINT `word_roles_role_id_roles_id_fk` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `words` ADD CONSTRAINT `words_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `idx_collocations_word` ON `collocations` (`word_id`);--> statement-breakpoint
CREATE INDEX `idx_examples_word_id` ON `examples` (`word_id`);--> statement-breakpoint
CREATE INDEX `idx_word_roles` ON `word_roles` (`word_id`,`role_id`);--> statement-breakpoint
CREATE INDEX `idx_words_user_word` ON `words` (`user_id`,`word`);