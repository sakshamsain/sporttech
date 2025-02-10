import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import Admin from "../model/admin.model.js";
import Team_Member from "../model/team_members.model.js";
import User from "../model/user.model.js";
import Sport from "../model/sports.model.js";
import Captain from "../model/captain.model.js";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL, 
  // synchronize: true,  
  // logging: true,
  entities: [ Admin,Captain,Sport,Captain,User,Team_Member], // Path to your entity files
  ssl: {
    rejectUnauthorized: false, // Required for Supabase
  },

});


AppDataSource.initialize()
  .then(() => console.log("✅ Database connected!"))
  .catch((err) => console.error("❌ Error connecting to DB", err));

export default AppDataSource;