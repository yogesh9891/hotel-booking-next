import jwt from "jsonwebtoken";
import { CONFIG } from "./Config";

export const generateAccessJwt = async (obj) => {
    console.log(CONFIG.JWT_ACCESS_TOKEN_SECRET, "CONFIG.JWT_ACCESS_TOKEN_SECRET",obj)

    return jwt.sign(
        {
            ...obj,
            // exp: Math.floor(Date.now() / 1000) + (7200)            //valid for 2 hr
            exp: Math.floor(Date.now() / 1000) + 6048000, //valid for 7 days
        },
        CONFIG.JWT_ACCESS_TOKEN_SECRET
    );
};

export const generateRefreshJwt = async (obj) => {
    return jwt.sign(
        {
            ...obj,
            exp: Math.floor(Date.now() / 1000) + 604800, //7 days
        },
        CONFIG.JWT_REFRESH_ACCESS_TOKEN_SECRET
    );
};




