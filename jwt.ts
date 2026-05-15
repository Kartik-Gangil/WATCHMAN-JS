import jwt from 'jsonwebtoken';

const GenToken = async (payload: any, options?: jwt.SignOptions, secret?: string) => {
    const token = jwt.sign(
        payload,
        secret || process.env.JWT_SECRET!,
        options || { expiresIn: "1h" }
    );
    return token;
}

const VerifyToken = async (token: string, secret?: string) => {
    try {
        const decoded = jwt.verify(token, secret || process.env.JWT_SECRET!);
        return decoded;
    } catch (err) {
        throw new Error('Invalid token');
    }
}

export { GenToken, VerifyToken };