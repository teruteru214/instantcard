import { defineConfig } from "drizzle-kit";

export default defineConfig({
	dialect: "mysql",
	schema: "./app/db/schema/*",
	out: "./app/db/drizzle",

	dbCredentials: {
		url: `${process.env.DATABASE_URL}?ssl={"rejectUnauthorized":true}`,
	},

	introspect: {
		casing: "camel",
	},

	migrations: {
		prefix: "timestamp",
		table: "__drizzle_migrations__",
	},

	strict: true, // 型チェックを厳密化
	verbose: true, // デバッグ用に詳細なログを有効化
});
