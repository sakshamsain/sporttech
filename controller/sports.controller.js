import {sportsRepository} from "../database/schema.js";

const addSport = async (req, res) => {

    const {name,category,min_players,max_players,registration_fee,fee_type} = req.body;

    if (!name || !category || !min_players || !max_players || !registration_fee || !fee_type) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {

        const newSport = await sportsRepository.save({
            name,
            category,
            min_players,
            max_players,
            registration_fee,
            fee_type
        });

        return res.status(201).json({ message: "Sport added successfully", sport: newSport });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
        
    }
}

export {addSport}