const { Driver, Team } = require("../db");

const _postDriver = async (forename, surname, description, image, nationality, dob, Teams) => {
    console.log("Teams received:", Teams);

    const verification = await Driver.findOne({ where: { forename, surname }, });

    if (!verification) {
        try {
            const newDriver = await Driver.create({ forename, surname, description, image, nationality, dob });

            const foundTeams = await Team.findAll({
                where: { name: Teams },
            });
            console.log("Team Models:", foundTeams);

            await newDriver.addTeams(foundTeams);

            const driverTeam = await Driver.findByPk(newDriver.id, {
                include: Team,
            });
            console.log("Driver with Teams:", driverTeam);

            return newDriver; 
        } catch (error) {
            console.error("Error creating driver:", error);
            throw error;
        }
    } else {
        throw new Error("This Driver already exists");
    }
};

module.exports = _postDriver;