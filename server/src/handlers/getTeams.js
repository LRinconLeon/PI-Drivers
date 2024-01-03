const _getTeams = require("../controllers/_getTeams");

const getTeams = async (req, res) => {
    try {
        const allTeams = await _getTeams();
        if(allTeams) return res.status(200).json(allTeams);
        else return res.status(404).json('No Teams found');
    } catch(error){
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};

module.exports = getTeams;