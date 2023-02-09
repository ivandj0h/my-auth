import { createClient } from "redis";

const redisURI = process.env.REDIS_URI || "redis://localhost:6379";
const redisClient = createClient({ url: redisURI });

const redisConnection = async () => {
    try {
        await redisClient.connect();
        console.log('Connected to Redis...');
    } catch (error: any) {
        console.log(error.message);
        setTimeout(redisConnection, 5000);
    }
}

export default redisConnection;