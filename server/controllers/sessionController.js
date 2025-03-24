import jwt from 'jsonwebtoken';

// Secret key used for signing the token (keep it private)
const secretKey = 'your-secret-key';

// Function to create a JWT token
export const  generateToken = async(req,res) => {
    const user = req.body;
    const payload = {
        id: user.id,  // Add user info (you can add more data if necessary)
        username: user.username,
        email: user.email,
    };

    const token = jwt.sign(payload, secretKey, {
        expiresIn: '100min', // Token expiration (optional)
    });

    res.status(200).json({ token });
}

export const verifyToken = async(req,res) => {
    const data = req.body;
    try {
        const session = jwt.verify(data.token, secretKey);
        res.status(200).json({ session,"result":"valid" });
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Unauthorized',result:"invalid" });
    }
}