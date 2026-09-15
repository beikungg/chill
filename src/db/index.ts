/**
 * Connect to PostgreSQL Database (Supabase/Neon/Local PostgreSQL)
 * https://orm.drizzle.team/docs/tutorials/drizzle-with-supabase
 */
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

type Db = ReturnType<typeof drizzle>;

let instance: Db | undefined;

/**
 * Opens the connection on first use.
 *
 * This used to run at module scope, which meant importing anything that
 * transitively reached `@/db` threw without DATABASE_URL set. Next.js loads
 * every route module while collecting page data, so a deployment that only
 * serves the marketing pages still failed to build over a database it never
 * queries. Connecting on demand keeps the requirement where it belongs: on the
 * code paths that actually talk to Postgres (auth, payments).
 */
function connect(): Db {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      'DATABASE_URL is not set. It is required for the features that read or ' +
        'write the database, such as authentication and payments.'
    );
  }

  // Disable prefetch as it is not supported for "Transaction" pool mode
  return drizzle(postgres(connectionString, { prepare: false }));
}

/**
 * Stands in for the Drizzle client so existing `import db from '@/db'` callers
 * keep working unchanged. Every property access resolves against the real
 * client, created the first time one is needed.
 */
const db = new Proxy({} as Db, {
  get(_target, property, receiver) {
    instance ??= connect();
    return Reflect.get(instance, property, receiver);
  },
  has(_target, property) {
    instance ??= connect();
    return Reflect.has(instance, property);
  },
}) as Db;

/**
 * Connect to Neon Database
 * https://orm.drizzle.team/docs/tutorials/drizzle-with-neon
 */
// import { drizzle } from 'drizzle-orm/neon-http';
// const db = drizzle(process.env.DATABASE_URL!);

/**
 * Database connection with Drizzle
 * https://orm.drizzle.team/docs/connect-overview
 *
 * Drizzle <> PostgreSQL
 * https://orm.drizzle.team/docs/get-started-postgresql
 *
 * Get Started with Drizzle and Neon
 * https://orm.drizzle.team/docs/get-started/neon-new
 *
 * Drizzle with Neon Postgres
 * https://orm.drizzle.team/docs/tutorials/drizzle-with-neon
 *
 * Drizzle <> Neon Postgres
 * https://orm.drizzle.team/docs/connect-neon
 *
 * Drizzle with Supabase Database
 * https://orm.drizzle.team/docs/tutorials/drizzle-with-supabase
 */

export { db };
export default db;
