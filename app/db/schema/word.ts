import {
	bigint,
	double,
	index,
	mysqlTable,
	serial,
	tinyint,
	varchar,
} from "drizzle-orm/mysql-core";
import { users } from "./user";

export const words = mysqlTable(
	"words",
	{
		id: serial("id").primaryKey(),
		userId: bigint("user_id", { mode: "number", unsigned: true })
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		word: varchar("word", { length: 50 }).notNull(),
		position: double("position", { unsigned: true }),
		translation: varchar("translation", { length: 100 }),
		frequency: tinyint("frequency", { unsigned: true }).notNull(),
		pronunciation: varchar("pronunciation", { length: 200 }),
		meaning: varchar("meaning", { length: 300 }),
		etymology: varchar("etymology", { length: 200 }),
		other: varchar("other", { length: 500 }),
		img: varchar("img", { length: 250 }),
	},
	(table) => ({
		userWordIndex: index("idx_words_user_word").on(table.userId, table.word),
	}),
);

export const wordRoles = mysqlTable(
	"word_roles",
	{
		id: serial("id").primaryKey(),
		wordId: bigint("word_id", { mode: "number", unsigned: true })
			.notNull()
			.references(() => words.id, { onDelete: "cascade" }),
		roleId: bigint("role_id", { mode: "number", unsigned: true })
			.notNull()
			.references(() => roles.id, { onDelete: "cascade" }),
	},
	(table) => ({
		wordRoleIndex: index("idx_word_roles").on(table.wordId, table.roleId),
	}),
);

export const roles = mysqlTable("roles", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 50 }).notNull().unique(),
});

export const collocations = mysqlTable(
	"collocations",
	{
		id: serial("id").primaryKey(),
		wordId: bigint("word_id", { mode: "number", unsigned: true })
			.notNull()
			.references(() => words.id, { onDelete: "cascade" }),
		text: varchar("text", { length: 100 }).notNull(),
		translation: varchar("translation", { length: 200 }),
	},
	(table) => ({
		wordCollocationIndex: index("idx_collocations_word").on(table.wordId),
	}),
);

export const examples = mysqlTable(
	"examples",
	{
		id: serial("id").primaryKey(),
		wordId: bigint("word_id", { mode: "number", unsigned: true })
			.notNull()
			.references(() => words.id, { onDelete: "cascade" }),
		text: varchar("text", { length: 200 }).notNull(),
		translation: varchar("translation", { length: 300 }),
	},
	(table) => ({
		wordIdIndex: index("idx_examples_word_id").on(table.wordId),
	}),
);
