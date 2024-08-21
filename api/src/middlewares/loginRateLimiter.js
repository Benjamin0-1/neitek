const limiter = require('express-rate-limit');

const loginRateLimiter = limiter({
    windowMs: 1 * 60 * 1000, 
    max: 5,
    message: { error: 'Too many login attempts, please try again later' }
});

export default loginRateLimiter;
