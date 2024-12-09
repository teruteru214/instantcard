import { connect } from "@tidbcloud/serverless";
import { drizzle } from "drizzle-orm/tidb-serverless";
import * as schema from "./schema";

export const getDb = (env: { DATABASE_URL: string }) => {
	const client = connect({ url: env.DATABASE_URL });
	return drizzle({ client, schema });
};
