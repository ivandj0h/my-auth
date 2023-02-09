import jwt, { SignOptions } from "jsonwebtoken";
import config from "config";

export const signJWT = (
    payload: object,
    options: SignOptions = {}) => {
    const privateKey = Buffer.from(
        config.get<string>("accessTokenPrivateKey"),
        "base64"
    ).toString("ascii");

    return jwt.sign(payload, privateKey, {
        algorithm: "RS256",
        ...(options && options)
    });
}

export const verifyJWT = <T>(token: string): T | null => {
    try {
        const publicKey = Buffer.from(
            config.get<string>("accessTokenPublicKey"),
            "base64"
        ).toString("ascii");

        return jwt.verify(token, publicKey) as T;
        } catch (e){
    return null;
    }
}