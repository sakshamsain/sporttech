import { captainRepository, userRepository, sportsRepository, teamMemberRepository } from "../database/schema.js";
import { cookie_config } from "../utils/constant.utils.js";
import { Not } from "typeorm";



// Registration of user
const registerUser = async (req, res) => {
    const { name, email, college_name, category, mobile_number } = req.body;

    if (!name || !email || !college_name || !category || !mobile_number) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }

    try {
        // Check if the email already exists
        const existingEmailUser = await userRepository.findOne({ where: { email } });
        if (existingEmailUser) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        // Check if the mobile number already exists
        const existingMobileUser = await userRepository.findOne({ where: { mobile_number } });
        if (existingMobileUser) {
            return res.status(400).json({ message: "User already exists with this mobile number" });
        }

        // Create the new user data
        const data = {
            name,
            email,
            college_name,
            category,
            mobile_number
        };

        // Save the new user to the database
        const newUser = await userRepository.save(data);

        // Set the cookie and send a success response
        res.cookie('uid', newUser.uid, cookie_config).status(201).json({ message: "User registered successfully", newUser });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


// update of user
const updateUser = async (req, res) => {

    const uid = req.uid;

    const { name, college_name, category, mobile_number } = req.body;

    try {
        const existingUser = await userRepository.findOne({
            where: { uid }
        })

        if (!existingUser) {
            return res.status(400).json({ message: "User not found with this email or mobile number" });
        }

        const updatedUser = await userRepository.update(
            { uid },
            {
                name: name || existingUser.name,
                college_name: college_name || existingUser.college_name,
                category: category || existingUser.category,
                mobile_number: mobile_number || existingUser.mobile_number,
            }
        );

        if (!updatedUser || updatedUser.affected === 0) {
            return res.status(400).json({ message: "User not updated " });
        }

        return res.status(201).json({ message: "User Updated successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });

    }
}

//get user
const getUser = async (req, res) => {
    const uid = req.uid;

    try {
        const user = await userRepository.findOne({
            where: { uid }
        })

        if (!user) {
            return res.status(400).json({ message: "User not found with this email or mobile number" });
        }

        return res.status(201).json({ message: "User found successfully", user });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });

    }
}

// get total bill_amount
const getBillAmount = async (req, res) => {
    const uid = req.uid;

    try {
        const getCaptains = await captainRepository.find({
            where: {
                uid,
                registration_status: "Pending",
                id_url: Not(""),
                noc_url: Not("")
            }
        });

        if (getCaptains.length === 0) {
            return res.status(400).json({ message: "All bills Cleared" });
        }

        // Process billing calculations for each captain
        const BillJson = await Promise.all(
            getCaptains.map(async (captain) => {
                const sport = captain.sport;
                const category = captain.gender;

                
                const sportDetail = await sportsRepository.findOne({ where: { name: sport, category } });

                if (!sportDetail) {
                    return null; // Handle missing sport details
                }
                

                const teamMembers = await teamMemberRepository.count({
                    where: { cid: captain.cid, id_url: Not(""), noc_url: Not("") }
                });    

                return {
                    sport: sportDetail.name,
                    category: sportDetail.category,
                    total_registeredMembers: parseInt(teamMembers) + 1,
                    fee_type: sportDetail.fee_type,
                    amount: sportDetail.fee_type === "F"
                        ? sportDetail.registration_fee
                        : sportDetail.registration_fee * (parseInt(teamMembers) + 1)
                };
            })
        );

        // Filter out any null values (in case of missing sport details)
        const filteredBillJson = BillJson.filter((bill) => bill !== null);

        return res.status(201).json({
            message: "User found successfully",
            bills: filteredBillJson
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


//upload payment proof
const uploadPaymentProof = async (req, res) => {

    const uid = req.uid;

    try {

        const user = await userRepository.findOne({ where: { uid } });

        user.receipt_photo = req.imglink || null;

        const updatedUser = await userRepository.save(user);

        if (!updatedUser) {
            return res.status(400).json({ message: "Payment proof not uploaded" });
        }

        return res.status(201).json({ message: "Payment proof uploaded successfully", recieptLink: updatedUser.receipt_photo });


    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }


}

export { registerUser, updateUser, getUser, uploadPaymentProof, getBillAmount };