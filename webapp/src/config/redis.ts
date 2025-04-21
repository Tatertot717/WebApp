import { createClient } from "redis";

let client: ReturnType<typeof createClient> | null = null;

export const getRedisClient = async () => {
  if (!client) {
    client = createClient({
      url: process.env.REDIS_URL || "redis://localhost:6379",
    });
    client.on("error", (err) => console.error("Redis error:", err));
    await client.connect();
  }
  return client;
};
