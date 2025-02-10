import express from "express";
import userAuth from '../middleware/userAuth.js';
import {
  createCaptain,
  createTeamMember,
  createCaptainWithTeam,
  deleteTeamWithCaptain,
  updateCaptain,
  updateTeamMember,
  getAllCaptains,
  getTeamMembersByCaptain,
  createMultipleTeamMembers,
  uploadIdOrNoc
} from "../controller/team.controller.js";
import {upload}  from "../middleware/multer.middelware.js"
import {uploadImageMiddleware} from '../middleware/Image.middleware.js';

const router = express.Router();
router.post("/create/captain", userAuth, createCaptain); // Create a captain individually
router.post("/create/team-member/:cid", userAuth, createTeamMember); // Create team member for a captain
router.post("/create/team-members/:cid", userAuth, createMultipleTeamMembers); // Create multiple team members for a captain
router.post("/create", userAuth, createCaptainWithTeam); // Create captain and team together
router.delete("/delete/:cid", userAuth, deleteTeamWithCaptain); // Delete entire team with captain
router.put("/update/captain/:cid", userAuth, updateCaptain); // Update captain
router.put("/update/team-member/:mid", userAuth, updateTeamMember); // Update team member
router.get("/captains", userAuth, getAllCaptains); // Get all captains
router.get("/team-members/:cid", userAuth, getTeamMembersByCaptain); // Get team members of a captain
router.post("/upload/id-or-noc", userAuth,upload.single("image"),uploadImageMiddleware("IdorNoc"),uploadIdOrNoc); // Upload ID or NOC
export default router;
