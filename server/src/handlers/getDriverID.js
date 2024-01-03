const { _getDriverIDdb, _getDriverIDapi } = require("../controllers/_getDriverID");
const { validate: validateUuid } = require('uuid');

const getDriverID = async (req, res) => {
    const { id } = req.params;

    try {
        if(isNaN(id)) {
            if (!validateUuid(id)) return res.status(400).json({ error: 'Invalid UUID format' });
        
            const driverDB = await _getDriverIDdb(id);
            if(driverDB) return res.status(200).json(driverDB);
            else return res.status(404).json(`Driver with ID: ${id} not found in DB`);
        } else {
            const driverAPI = await _getDriverIDapi(id);
            if(driverAPI) return res.status(200).json(driverAPI);
            else return res.status(404).json(`Driver with ID: ${id} not found in API`);
        };
    } catch(error){
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};

module.exports = getDriverID;