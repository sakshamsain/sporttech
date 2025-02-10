import { AppDataSource } from "./dbConnection.js";
import Admin from "../model/admin.model.js"; 
import User from "../model/user.model.js";
import Captain from "../model/captain.model.js";
import TeamMember from "../model/team_members.model.js"
import Sports from "../model/sports.model.js";


const adminRepository = AppDataSource.getRepository(Admin);
const userRepository = AppDataSource.getRepository(User);
const captainRepository = AppDataSource.getRepository(Captain);
const teamMemberRepository = AppDataSource.getRepository(TeamMember);
const sportsRepository = AppDataSource.getRepository(Sports);

export { adminRepository, userRepository, captainRepository, teamMemberRepository, sportsRepository };
