CREATE TABLE `counter` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`count` integer DEFAULT 0,
	`created_at` integer DEFAULT (strftime('%s', 'now')),
	`updated_at` integer DEFAULT (strftime('%s', 'now'))
);
