import { adminRepository } from "../database/schema.js";
import bcrypt from 'bcrypt';

async function adminSignup (req, res) {
    const { email, mobile_number, name, password } = req.body;
  
    // Input validation
    if (!email || !mobile_number || !name || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    const existingAdmin = await adminRepository.findOne({ where: { email } });
    
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists with this email' });
    }
  
    try {
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create new admin
      const admin = {};
      admin.email = email;
      admin.mobile_number = mobile_number;
      admin.name = name;
      admin.password = hashedPassword;
  
      // Save admin to the database
      await adminRepository.save(admin);
  
      return res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };


async function getAdmin(req,res){
  const admin = await adminRepository.find();
  return res.status(200).json(admin);

}

export {adminSignup,getAdmin}