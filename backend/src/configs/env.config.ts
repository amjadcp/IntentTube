import dotenv from 'dotenv';
dotenv.config();
 
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';
export const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL || '';
export const SESSION_SECRET = process.env.SESSION_SECRET || 'intent-tube-secret'; 
export const FRONTEND_DOMAIN = process.env.FRONTEND_DOMAIN || 'localhost:5173';