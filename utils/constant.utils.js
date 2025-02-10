// Sports Name 
import dotenv from 'dotenv';

dotenv.config();

export const SPORTS_NAME = [
    "Athletics",
    "Badminton",
    "Basketball",
    "Chess",
    "Cricket",
    "Football",
    "Hockey",
    "Lawn Tennis",
    "Squash",
    "Table Tennis",
    "Volleyball",
    "Weightlifting",
    
]

export const cookie_config = {
    maxAge: 1000 * 60 * 60 * 24,  // Cookie expires in 1 hour (in milliseconds)
    httpOnly: true,   // Prevents JavaScript from accessing the cookie
    secure: process.env.NODE_ENV === 'production',  // Only sends cookie over HTTPS in production
    sameSite: 'Strict'  // Ensures the cookie is not sent with cross-site requests
  }