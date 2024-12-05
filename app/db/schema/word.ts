import {
	bigint,
	double,
	mysqlTable,
	serial,
	tinyint,
	varchar,
} from "drizzle-orm/mysql-core";
import { users } from "./user";

export const words = mysqlTable("words", {
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
});

export const collocations = mysqlTable("collocations", {
	id: serial("id").primaryKey(),
	wordId: bigint("word_id", { mode: "number", unsigned: true })
		.notNull()
		.references(() => words.id, { onDelete: "cascade" }),
	text: varchar("text", { length: 100 }).notNull(),
	translation: varchar("translation", { length: 200 }),
});

export const examples = mysqlTable("examples", {
	id: serial("id").primaryKey(),
	wordId: bigint("word_id", { mode: "number", unsigned: true })
		.notNull()
		.references(() => words.id, { onDelete: "cascade" }),
	text: varchar("text", { length: 200 }).notNull(),
	translation: varchar("translation", { length: 300 }),
});
