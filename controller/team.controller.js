import { captainRepository, teamMemberRepository } from "../database/schema.js";

// Create a captain individually
const createCaptain = async (req, res) => {
  try {
    const uid = req.uid;
    const { name, email, mobile_number, entry_no, sport, gender} = req.body;

    if (!uid || !name || !email || !sport || !gender) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newCaptain = await captainRepository.save({
      uid,
      name,
      email,
      mobile_number,
      entry_no,
      sport,
      gender,
    });

    return res.status(201).json({ message: "Captain created successfully", captain: newCaptain });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a team member for a specific captain
const createTeamMember = async (req, res) => {
  try {
    const { cid } = req.params;
    const { name, email, mobile_number, entry_no, sport, gender } = req.body;

    if (!name || !email || !sport || !gender) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const captain = await captainRepository.findOne({ where: { cid } });
    if (!captain) {
      return res.status(404).json({ message: "Captain not found" });
    }

    const newMember = await teamMemberRepository.save({
      cid,
      name,
      email,
      mobile_number,
      entry_no,
      sport,
      gender,
    });

    return res.status(201).json({ message: "Team member added successfully", teamMember: newMember });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// use min and max of sports
const createMultipleTeamMembers = async (req, res) => {
  try {
    const { cid } = req.params;
    const { team_members } = req.body; // Expecting an array of team members

    if(!cid) {
      return res.status(400).json({ message: "Please provide a captain id" });
    }

    if (!team_members || !Array.isArray(team_members) || team_members.length === 0) {
      return res.status(400).json({ message: "Please provide an array of team members" });
    }

    const captain = await captainRepository.findOne({ where: { cid } });
    if (!captain) {
      return res.status(404).json({ message: "Captain not found" });
    }

    const members = team_members.map(member => ({
      cid,
      name: member.name,
      email: member.email,
      mobile_number: member.mobile_number,
      entry_no: member.entry_no,
      sport: member.sport,
      gender: member.gender,
    }));

    const newMembers = await teamMemberRepository.save(members);

    return res.status(201).json({ message: "Multiple team members added successfully", teamMembers: newMembers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a captain along with team members (Existing)
const createCaptainWithTeam = async (req, res) => {
  try {
    const { uid, name, email, mobile_number, entry_no, sport, category, id_url, noc_url, team_members } = req.body;

    if (!uid || !name || !email || !sport || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newCaptain = await captainRepository.save({
      uid,
      name,
      email,
      mobile_number,
      entry_no,
      sport,
      category,
      id_url,
      noc_url,
      registration_status: "Pending",
    });

    if (team_members && team_members.length > 0) {
      const members = team_members.map(member => ({
        ...member,
        cid: newCaptain.cid,
      }));
      await teamMemberRepository.save(members);
    }

    return res.status(201).json({ message: "Captain and team created successfully", captain: newCaptain });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete entire team along with captain
const deleteTeamWithCaptain = async (req, res) => {
  try {
    const { cid } = req.params;
    
    const captain = await captainRepository.findOne({ where: { cid } });

    if (!captain) {
      return res.status(404).json({ message: "Captain not found" });
    }

    await captainRepository.remove(captain);
    
    return res.status(200).json({ message: "Captain and team deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update captain details
const updateCaptain = async (req, res) => {
  try {
    const { cid } = req.params;
    const updates = req.body;

    const existingCaptain = await captainRepository.findOne({ where: { cid } });

    if (!existingCaptain) {
      return res.status(404).json({ message: "Captain not found" });
    }

    await captainRepository.update({ cid }, updates);

    return res.status(200).json({ message: "Captain updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update team member details
const updateTeamMember = async (req, res) => {
  try {
    const { mid } = req.params;
    const updates = req.body;

    const existingMember = await teamMemberRepository.findOne({ where: { mid } });

    if (!existingMember) {
      return res.status(404).json({ message: "Team member not found" });
    }

    await teamMemberRepository.update({ mid }, updates);

    return res.status(200).json({ message: "Team member updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all captains
const getAllCaptains = async (req, res) => {
  try {
    const captains = await captainRepository.find();

    return res.status(200).json({ captains });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get team members of a captain
const getTeamMembersByCaptain = async (req, res) => {
  try {
    const { cid } = req.params;
    
    const teamMembers = await teamMemberRepository.find({ where: { cid } });

    return res.status(200).json({ teamMembers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const uploadIdOrNoc = async (req,res)=>{
  try{
    const {type,typeId,idOrNoc} = req.body;
    const uid = req.uid;


    if(!req.imglink){
      return res.status(400).json({message:"Please provide image link"});
    }

    if(!type || !typeId || !idOrNoc){
      return res.status(400).json({message:"Please provide type and typeId"});
    }

    if(type !== "member" && type !== "captain"){
      return res.status(400).json({message:"Invalid type"});
    }

    if(idOrNoc !== "id" && idOrNoc !== "noc"){
      return res.status(400).json({message:"Invalid idOrNoc"});
    }

    if(type==="captain"){
      const captain = await captainRepository.findOne({where:{uid,cid:typeId}});
      if(!captain){
        return res.status(404).json({message:"Captain not found"});
      }

      if(idOrNoc==="id"){
        captain.id_url = req.imglink;
      }
      if(idOrNoc==="noc"){
        captain.noc_url= req.imglink;
      }
        
      await captainRepository.save(captain);
    }



    if(type==="member"){
      const member = await teamMemberRepository.findOne({where:{mid:typeId}});
      if(!member){
        return res.status(404).json({message:"Member not found"});
      }

      if(idOrNoc==="id"){
        member.id_url = req.imglink;
      }
      if(idOrNoc==="noc"){
        member.noc_url= req.imglink;
      }
        
      await teamMemberRepository.save(member);
    }

    return res.status(200).json({message:`${idOrNoc} uploaded successfully for ${type}`});
  }catch(error){
    console.error(error);
    res.status(500).json({message:"Internal server error"});
  }
}

export { 
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
};
