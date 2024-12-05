import { connect } from "@tidbcloud/serverless";
import { drizzle } from "drizzle-orm/tidb-serverless";
import * as schema from "./schema";

const client = connect({ url: process.env.DATABASE_URL });

export const db = drizzle({ client, schema });
