import axios from 'axios';

export const workoutMiddleware = async (req, res, next) => {
    const { token } = req.body;

    // Validate token presence
    if (!token) {
        return res.status(400).json({ error: 'Authorization token required' });
    }
    console.log({token});

    try {
        // Verify token with authentication server
        const response = await axios.post(
            'http://192.168.1.7:3200/api/session/verifytoken',
            { token },
            {
                headers: {
                    'X-API-Secret': process.env.SERVER_SECRET // Standard header name
                },

            }
        );

        // Handle response from auth server
        if ( response.data.result === 'valid') {
            console.log('Token verifiedddddddddddddddddddddddddddddd');
            return next(); // Successful verification
        }

        // Forward specific error codes from auth server
        return res.status(response.status || 401).json({
            error: response.data.error || 'Invalid authorization token'
        });

    } catch (error) {
        // Detailed error logging for debugging
      //  console.error('Token verification failed:', error.message);

        // Handle different error types appropriately
        if (error.response) {
            // Forward auth server's response
            return res.status(error.response.status).json({
                error: error.response.data.error || 'Authorization service error'
            });
        }

        // Handle network/connection errors
        return res.status(503).json({
            error: 'Authorization service unavailable'
        });
    }
};