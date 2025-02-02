import Redis from 'ioredis';

const redis = new Redis();

redis.on('error', (error) => {
    console.error('Redis connection error:', error);
});

redis.on('connect', () => {
    console.log('Redis connected successfully');
});

export default redis;
