import { mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 200 }).notNull(),
	email: varchar("email", { length: 255 }).notNull().unique(),
});
