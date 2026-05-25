interface RateLimitEntry {
  count: number;
  resetAt: number;
}

interface RateLimitConfig {
  windowMs: number;
  max: number;
}

const store = new Map<string, RateLimitEntry>();

export function rateLimit(identifier: string, config: RateLimitConfig): boolean {
  const now = Date.now();
  const entry = store.get(identifier);

  if (!entry || now > entry.resetAt) {
    store.set(identifier, { count: 1, resetAt: now + config.windowMs });
    return true;
  }

  if (entry.count >= config.max) return false;

  entry.count++;
  return true;
}

export function getRateLimitHeaders(
  identifier: string,
  config: RateLimitConfig,
): Record<string, string> {
  const entry = store.get(identifier);
  if (!entry) return {};
  return {
    "X-RateLimit-Limit": String(config.max),
    "X-RateLimit-Remaining": String(Math.max(0, config.max - entry.count)),
    "X-RateLimit-Reset": String(Math.ceil(entry.resetAt / 1000)),
  };
}
