import mongoose, { type Mongoose } from "mongoose";

/**
 * Minimal shape of our cached mongoose connection across hot reloads in dev.
 * We keep it on `globalThis` so Next.js Fast Refresh / server reloads don't
 * create new connections on every request.
 */
type MongooseCache = {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
};

/**
 * Augment the global scope to store a cached connection.
 * This is safe because this file is only evaluated on the server.
 */
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

// Reuse an existing cache if present, otherwise initialize it once.
const cache: MongooseCache = globalThis.mongooseCache ?? {
  conn: null,
  promise: null,
};

globalThis.mongooseCache = cache;

/**
 * Establish (or reuse) a MongoDB connection via Mongoose.
 *
 * - In production: a single connection is reused by the runtime.
 * - In development: the connection is cached on `globalThis` to survive
 *   module reloads and avoid exhausting the DB with too many connections.
 */
export async function connectToDatabase(): Promise<Mongoose> {
  // Use a server-side environment variable. Do NOT expose it with NEXT_PUBLIC_.
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error(
      "Missing MONGODB_URI environment variable. Add it to your .env.local file.",
    );
  }

  // If we already have an established connection, reuse it.
  if (cache.conn) return cache.conn;

  // If a connection is currently being established, await the same promise.
  if (!cache.promise) {
    cache.promise = mongoose
      .connect(uri, {
        // Avoid buffering commands when MongoDB is down/unreachable.
        bufferCommands: false,
      })
      .then((m) => m);
  }

  cache.conn = await cache.promise;
  return cache.conn;
}
