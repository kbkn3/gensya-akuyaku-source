CREATE TABLE `getter` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`count` integer DEFAULT 0,
	`created_at` integer DEFAULT (strftime('%s', 'now'))
);
