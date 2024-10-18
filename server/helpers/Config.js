import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

export const CONFIG = {
    MONGOURI: process.env.MONGOURI,
    PORT: process.env.PORT,
    JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET,
    JWT_REFRESH_ACCESS_TOKEN_SECRET: process.env.JWT_REFRESH_ACCESS_TOKEN_SECRET,
    RMS_URL: process.env.RMS_URL,
    RMS_AGENT_ID: process.env.RMS_AGENT_ID,
    RMS_AGENT_PASSWORD: process.env.RMS_AGENT_PASSWORD,
    RMS_CLIENT_ID: process.env.RMS_CLIENT_ID,
    RMS_CLIENT_PASSWORD: process.env.RMS_CLIENT_PASSWORD,
    RMS_TEST_MODE: process.env.RMS_TEST_MODE,
    RMS_AGENT_BOOK_ID: process.env.RMS_AGENT_BOOK_ID,
    RMS_AGENT_RATE_ID: process.env.RMS_AGENT_RATE_ID,
};
