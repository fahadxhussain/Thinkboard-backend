import {Ratelimit} from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import dotenv from 'dotenv';

dotenv.config();

// Create a ratelimiter that allows only 10 requests per 20 seconds
// This is useful to prevent abuse of the API, like too many requests in a short time
const rateLimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(10, '20 s'),
})

export default rateLimit;